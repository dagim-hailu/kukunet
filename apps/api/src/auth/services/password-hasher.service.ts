import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AppConfigService } from '../../config/app-config.service';

@Injectable()
export class PasswordHasherService {
  constructor(private readonly appConfigService: AppConfigService) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.appConfigService.getBcryptSaltRounds());
  }

  async comparePassword(
    password: string,
    passwordHash: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, passwordHash);
  }
}
