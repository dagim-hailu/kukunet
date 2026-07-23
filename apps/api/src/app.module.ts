import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ApplicationConfigModule } from './config/config.module';
import { AppConfigService } from './config/app-config.service';
import { DatabaseModule } from './database/database.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { HealthModule } from './health/health.module';
import { UsersModule } from './users/users.module';
import { MailModule } from './mail/mail.module';

@Module({
  controllers: [AppController],
  imports: [
    ApplicationConfigModule,
    MailerModule.forRootAsync({
      useFactory: (appConfigService: AppConfigService) => ({
        transport: {
          host: appConfigService.getSmtpHost(),
          port: appConfigService.getSmtpPort(),
          secure: appConfigService.getSmtpPort() === 465,
          auth: {
            user: appConfigService.getSmtpUser(),
            pass: appConfigService.getSmtpPassword(),
          },
        },
        defaults: {
          from: `"Kukunet Digital" <${appConfigService.getSmtpFrom()}>`,
          replyTo: appConfigService.getSmtpReplyTo(),
        },
      }),
      inject: [AppConfigService],
    }),
    MailModule,
    DatabaseModule,
    UsersModule,
    AuthModule,
    DashboardModule,
    HealthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
