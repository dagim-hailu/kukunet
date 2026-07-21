import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApplicationConfigModule } from './config/config.module';
import { DatabaseModule } from './database/database.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [AppController],
  imports: [
    ApplicationConfigModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    DashboardModule,
    HealthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
