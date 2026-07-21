import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AccessTokenGuard } from './guards/access-token.guard';
import { SessionsRepository } from './sessions.repository';
import { PasswordHasherService } from './services/password-hasher.service';

@Module({
  imports: [JwtModule.register({}), UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordHasherService,
    SessionsRepository,
    AccessTokenGuard,
  ],
  exports: [AuthService, SessionsRepository, AccessTokenGuard],
})
export class AuthModule {}
