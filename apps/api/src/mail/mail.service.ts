import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { AppConfigService } from '../config/app-config.service';
import { Course } from '../auth/dto/register.dto';

const COURSE_PRICE = 4500;

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);

  constructor(
    private readonly mailerService: MailerService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async sendRegistrationConfirmation(
    email: string,
    name: string,
    selectedCourses: Course[],
  ): Promise<void> {
    if (!this.appConfigService.isSmtpConfigured()) {
      this.logger.log(
        `SMTP not configured, skipping registration email to ${email}`,
      );
      return;
    }

    try {
      const courseList = selectedCourses
        .map((course) => {
          let displayName: string = course;
          if (course === Course.WebDev) displayName = 'Web Development';
          if (course === Course.Graphics) displayName = 'Graphics Design';
          if (course === Course.VideoEditing) displayName = 'Video Editing';
          return `<li>${displayName} - $${COURSE_PRICE.toLocaleString()}</li>`;
        })
        .join('\n');

      const totalPrice = selectedCourses.length * COURSE_PRICE;

      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
          <h2 style="color: #2d8659;">Welcome to Kukunet Digital, ${name}!</h2>
          <p>Your registration was successful! You are now eligible to proceed with payment.</p>
          <h3 style="color: #2d8659;">Your Selected Courses:</h3>
          <ul style="list-style: none; padding: 0;">
            ${courseList}
          </ul>
          <hr style="border: 1px solid #eee;" />
          <h3 style="text-align: right; color: #2d8659;">Total: $${totalPrice.toLocaleString()}</h3>
          <p>If you have any questions, please reply to this email.</p>
          <p style="color: #888; font-size: 12px;">This email was sent from Kukunet Digital</p>
        </div>
      `;

      await this.mailerService.sendMail({
        to: email,
        subject: 'Registration Successful - Kukunet Digital',
        html,
      });

      this.logger.log(`Registration confirmation email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send registration confirmation email to ${email}`,
        error.stack,
      );
    }
  }
}
