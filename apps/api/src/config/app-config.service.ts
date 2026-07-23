import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  getPort(): number {
    return this.getPositiveInteger('PORT', 3000);
  }

  getDatabaseUrl(): string | null {
    const databaseUrl = this.configService.get<string>('DATABASE_URL');
    return databaseUrl?.trim() ? databaseUrl : null;
  }

  getJwtAccessSecret(): string {
    return this.getRequiredString('JWT_ACCESS_SECRET');
  }

  getJwtRefreshSecret(): string {
    return this.getRequiredString('JWT_REFRESH_SECRET');
  }

  getJwtAccessTtlSeconds(): number {
    return this.getPositiveInteger('JWT_ACCESS_TTL_SECONDS', 900);
  }

  getJwtRefreshTtlSeconds(): number {
    return this.getPositiveInteger('JWT_REFRESH_TTL_SECONDS', 604800);
  }

  getBcryptSaltRounds(): number {
    return this.getPositiveInteger('BCRYPT_SALT_ROUNDS', 12);
  }

  getSmtpHost(): string {
    return this.getRequiredString('SMTP_HOST');
  }

  getSmtpPort(): number {
    return this.getPositiveInteger('SMTP_PORT', 587);
  }

  getSmtpUser(): string {
    return this.getRequiredString('SMTP_USER');
  }

  getSmtpPassword(): string {
    return this.getRequiredString('SMTP_PASSWORD');
  }

  getSmtpFrom(): string {
    return this.configService.get<string>('SMTP_FROM') || 'dagimhailu2@gmail.com';
  }

  getSmtpReplyTo(): string {
    return this.configService.get<string>('SMTP_REPLY_TO') || 'dagimhailu2@gmail.com';
  }

  private getRequiredString(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value?.trim()) {
      throw new Error(`${key} is not configured.`);
    }

    return value;
  }

  private getPositiveInteger(key: string, fallbackValue?: number): number {
    const rawValue = this.configService.get<string>(key);

    if (!rawValue?.trim()) {
      if (fallbackValue !== undefined) {
        return fallbackValue;
      }

      throw new Error(`${key} is not configured.`);
    }

    const parsedValue = Number.parseInt(rawValue, 10);

    if (!Number.isSafeInteger(parsedValue) || parsedValue <= 0) {
      throw new Error(`${key} must be a positive integer.`);
    }

    return parsedValue;
  }
}
