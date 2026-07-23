import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHash, randomUUID, timingSafeEqual } from 'node:crypto';
import { AppConfigService } from '../config/app-config.service';
import { User } from '../database/schema';
import { UsersRepository } from '../users/users.repository';
import { MailService } from '../mail/mail.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import {
  AuthResponse,
  AuthTokens,
  AuthUser,
  JwtAccessPayload,
  JwtRefreshPayload,
  LogoutResponse,
  ProfileResponse,
  RequestContext,
  RequestUser,
} from './auth.types';
import { SessionsRepository } from './sessions.repository';
import { PasswordHasherService } from './services/password-hasher.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sessionsRepository: SessionsRepository,
    private readonly passwordHasherService: PasswordHasherService,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
    private readonly mailService: MailService,
  ) {}

  async register(
    registerDto: RegisterDto,
    requestContext: RequestContext,
  ): Promise<AuthResponse> {
    try {
      if (registerDto.password !== registerDto.confirmPassword) {
        throw new BadRequestException('Password confirmation does not match.');
      }

      const email = this.normalizeEmail(registerDto.email);
      const name = this.normalizeName(registerDto.name);
      const existingUser = await this.usersRepository.findByEmail(email);

      if (existingUser !== null) {
        throw new ConflictException('An account with this email already exists.');
      }

      const passwordHash = await this.passwordHasherService.hashPassword(
        registerDto.password,
      );
      const user = await this.usersRepository.create({
        id: randomUUID(),
        email,
        name,
        passwordHash,
        selectedCourses: registerDto.selectedCourses,
      });
      const tokens = await this.issueTokens(user, requestContext);

      // Send registration confirmation email (fire and forget)
      this.mailService.sendRegistrationConfirmation(
        user.email,
        user.name,
        user.selectedCourses,
      ).catch((error) => {
        // Just log it, don't fail the registration
        console.error('Failed to send registration email:', error);
      });

      return {
        user: this.toAuthUser(user),
        tokens,
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  async login(
    loginDto: LoginDto,
    requestContext: RequestContext,
  ): Promise<AuthResponse> {
    const email = this.normalizeEmail(loginDto.email);
    const user = await this.usersRepository.findByEmail(email);

    if (user === null) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await this.passwordHasherService.comparePassword(
      loginDto.password,
      user.passwordHash,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const tokens = await this.issueTokens(user, requestContext);

    return {
      user: this.toAuthUser(user),
      tokens,
    };
  }

  async refresh(
    refreshToken: string,
    requestContext: RequestContext,
  ): Promise<AuthResponse> {
    const refreshPayload = await this.verifyRefreshToken(refreshToken);
    const session = await this.sessionsRepository.findActiveSessionById(
      refreshPayload.sessionId,
    );

    if (
      session === null ||
      session.userId !== refreshPayload.sub ||
      !this.refreshTokenMatches(refreshToken, session.refreshTokenHash)
    ) {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    const user = await this.usersRepository.findById(refreshPayload.sub);

    if (user === null) {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    const tokens = await this.issueTokens(user, requestContext, session.id);

    return {
      user: this.toAuthUser(user),
      tokens,
    };
  }

  async logout(refreshToken: string): Promise<LogoutResponse> {
    try {
      const refreshPayload = await this.verifyRefreshToken(refreshToken);
      await this.sessionsRepository.revokeSession(refreshPayload.sessionId);
    } catch {
      return { success: true };
    }

    return { success: true };
  }

  async getProfile(requestUser: RequestUser): Promise<ProfileResponse> {
    const user = await this.usersRepository.findById(requestUser.userId);

    if (user === null) {
      throw new UnauthorizedException('Authenticated user was not found.');
    }

    return {
      user: this.toAuthUser(user),
    };
  }

  async validateAccessToken(accessToken: string): Promise<RequestUser> {
    let payload: JwtAccessPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtAccessPayload>(
        accessToken,
        {
          secret: this.appConfigService.getJwtAccessSecret(),
        },
      );
    } catch {
      throw new UnauthorizedException('Invalid access token.');
    }

    this.assertAccessPayload(payload);

    const user = await this.usersRepository.findById(payload.sub);

    if (user === null) {
      throw new UnauthorizedException('Invalid access token.');
    }

    return {
      userId: user.id,
      email: user.email,
      sessionId: payload.sessionId,
    };
  }

  private async issueTokens(
    user: User,
    requestContext: RequestContext,
    existingSessionId?: string,
  ): Promise<AuthTokens> {
    const accessTokenTtlSeconds =
      this.appConfigService.getJwtAccessTtlSeconds();
    const refreshTokenTtlSeconds =
      this.appConfigService.getJwtRefreshTtlSeconds();
    const sessionId = existingSessionId ?? randomUUID();
    const accessTokenExpiresAt = new Date(
      Date.now() + accessTokenTtlSeconds * 1000,
    );
    const refreshTokenExpiresAt = new Date(
      Date.now() + refreshTokenTtlSeconds * 1000,
    );

    const accessToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        email: user.email,
        sessionId,
        type: 'access',
      } satisfies JwtAccessPayload,
      {
        secret: this.appConfigService.getJwtAccessSecret(),
        expiresIn: `${accessTokenTtlSeconds}s`,
      },
    );
    const refreshToken = await this.jwtService.signAsync(
      {
        sub: user.id,
        sessionId,
        type: 'refresh',
      } satisfies JwtRefreshPayload,
      {
        secret: this.appConfigService.getJwtRefreshSecret(),
        expiresIn: `${refreshTokenTtlSeconds}s`,
      },
    );
    const refreshTokenHash = this.hashRefreshToken(refreshToken);

    if (existingSessionId === undefined) {
      await this.sessionsRepository.createSession({
        sessionId,
        userId: user.id,
        refreshTokenHash,
        userAgent: requestContext.userAgent,
        ipAddress: requestContext.ipAddress,
        expiresAt: refreshTokenExpiresAt,
      });
    } else {
      const rotatedSession = await this.sessionsRepository.rotateSession(
        sessionId,
        {
          refreshTokenHash,
          userAgent: requestContext.userAgent,
          ipAddress: requestContext.ipAddress,
          expiresAt: refreshTokenExpiresAt,
        },
      );

      if (rotatedSession === null) {
        throw new UnauthorizedException('Refresh session is not available.');
      }
    }

    return {
      accessToken,
      refreshToken,
      accessTokenExpiresAt: accessTokenExpiresAt.toISOString(),
      refreshTokenExpiresAt: refreshTokenExpiresAt.toISOString(),
    };
  }

  private async verifyRefreshToken(
    refreshToken: string,
  ): Promise<JwtRefreshPayload> {
    let payload: JwtRefreshPayload;

    try {
      payload = await this.jwtService.verifyAsync<JwtRefreshPayload>(
        refreshToken,
        {
          secret: this.appConfigService.getJwtRefreshSecret(),
        },
      );
    } catch {
      throw new UnauthorizedException('Invalid refresh token.');
    }

    this.assertRefreshPayload(payload);
    return payload;
  }

  private hashRefreshToken(refreshToken: string): string {
    return createHash('sha256').update(refreshToken).digest('hex');
  }

  private refreshTokenMatches(
    refreshToken: string,
    storedRefreshTokenHash: string,
  ): boolean {
    const providedRefreshTokenHash = this.hashRefreshToken(refreshToken);

    if (providedRefreshTokenHash.length !== storedRefreshTokenHash.length) {
      return false;
    }

    return timingSafeEqual(
      Buffer.from(providedRefreshTokenHash, 'utf8'),
      Buffer.from(storedRefreshTokenHash, 'utf8'),
    );
  }

  private assertAccessPayload(payload: JwtAccessPayload): void {
    if (
      payload.type !== 'access' ||
      !this.isNonEmptyString(payload.sub) ||
      !this.isNonEmptyString(payload.email) ||
      !this.isNonEmptyString(payload.sessionId)
    ) {
      throw new UnauthorizedException('Invalid access token.');
    }
  }

  private assertRefreshPayload(payload: JwtRefreshPayload): void {
    if (
      payload.type !== 'refresh' ||
      !this.isNonEmptyString(payload.sub) ||
      !this.isNonEmptyString(payload.sessionId)
    ) {
      throw new UnauthorizedException('Invalid refresh token.');
    }
  }

  private isNonEmptyString(value: string | undefined): value is string {
    return typeof value === 'string' && value.trim().length > 0;
  }

  private normalizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  private normalizeName(name: string): string {
    const normalizedName = name.trim();

    if (normalizedName.length === 0) {
      throw new BadRequestException('Name is required.');
    }

    return normalizedName;
  }

  private toAuthUser(user: User): AuthUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      selectedCourses: user.selectedCourses,
    };
  }
}
