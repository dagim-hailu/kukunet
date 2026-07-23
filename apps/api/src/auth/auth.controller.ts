/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import {
  AuthResponse,
  LogoutResponse,
  ProfileResponse,
  RequestContext,
} from './auth.types';
import type { RequestUser } from './auth.types';
import { LoginDto } from './dto/login.dto';
import { LogoutDto } from './dto/logout.dto';
import { RefreshDto } from './dto/refresh.dto';
import { RegisterDto } from './dto/register.dto';
import { AccessTokenGuard } from './guards/access-token.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Req() request: Request,
  ): Promise<AuthResponse> {
    this.logger.log("REGISTRATION_REQUEST_LOG: Starting registration for", registerDto.email);
    try {
      const result = await this.authService.register(
        registerDto,
        this.getRequestContext(request),
      );
      this.logger.log("REGISTRATION_SUCCESS_LOG: Registration successful for", registerDto.email);
      return result;
    } catch (error) {
      this.logger.error("REGISTRATION_FAILURE_LOG:", error);
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() loginDto: LoginDto,
    @Req() request: Request,
  ): Promise<AuthResponse> {
    return this.authService.login(loginDto, this.getRequestContext(request));
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Body() refreshDto: RefreshDto,
    @Req() request: Request,
  ): Promise<AuthResponse> {
    return this.authService.refresh(
      refreshDto.refreshToken,
      this.getRequestContext(request),
    );
  }

  @UseGuards(AccessTokenGuard)
  @Get('profile')
  async getProfile(
    @CurrentUser() requestUser: RequestUser,
  ): Promise<ProfileResponse> {
    return this.authService.getProfile(requestUser);
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(@Body() logoutDto: LogoutDto): Promise<LogoutResponse> {
    return this.authService.logout(logoutDto.refreshToken);
  }

  private getRequestContext(request: Request): RequestContext {
    const forwardedForHeader = request.headers['x-forwarded-for'];
    const resolvedForwardedFor = Array.isArray(forwardedForHeader)
      ? forwardedForHeader[0]
      : forwardedForHeader;
    const ipAddress: string | null =
      typeof resolvedForwardedFor === 'string'
        ? (resolvedForwardedFor.split(',')[0]?.trim() ?? null)
        : (request.ip ?? null);

    const userAgentHeader = request.headers['user-agent'];
    const userAgent: string | null = Array.isArray(userAgentHeader)
      ? (userAgentHeader[0] ?? null)
      : (userAgentHeader ?? null);

    return {
      ipAddress: ipAddress?.slice(0, 64) ?? null,
      userAgent: userAgent?.slice(0, 255) ?? null,
    };
  }
}
