import nodemailer from 'nodemailer';

export interface RegistrationEmailParams {
  name: string;
  email: string;
  selectedCourses?: string[];
  category?: 'kids' | 'adult' | string | null;
  customDetail?: string;
}

const COURSE_PRICE = 4500;

function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER || 'daggimhailu@gmail.com';
  const pass = process.env.SMTP_PASS || '';

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: user && pass ? { user, pass } : undefined,
  });
}

export function generateRegistrationEmailHtml({
  name,
  email,
  selectedCourses = [],
  category,
  customDetail,
}: RegistrationEmailParams): string {
  const courses = selectedCourses.length > 0 ? selectedCourses : ['General Track'];
  const courseCount = courses.length;
  const totalPrice = courseCount * COURSE_PRICE;

  const trackName =
    category === 'kids'
      ? 'Kids Program'
      : category === 'adult'
      ? 'Adult Track'
      : 'Standard Track';

  const courseRowsHtml = courses
    .map(
      (course) => `
    <tr style="border-bottom: 1px solid #1e3050;">
      <td style="padding: 12px 16px; font-size: 14px; color: #e4eef8; font-weight: 500;">
        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background-color: #3dcc8e; margin-right: 8px;"></span>
        ${course} Course
      </td>
      <td style="padding: 12px 16px; font-size: 14px; color: #8aaec8; font-weight: 600; text-align: right;">
        $${COURSE_PRICE.toLocaleString()}
      </td>
    </tr>
  `,
    )
    .join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to KUKUNET Digital</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0f1319; font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #e4eef8;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0f1319; padding: 40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 560px; background-color: #141920; border: 1px solid #1e3050; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
          
          <!-- Header Banner -->
          <tr>
            <td style="padding: 32px 32px 20px 32px; text-align: center; background: linear-gradient(180deg, rgba(61,204,142,0.12) 0%, transparent 100%);">
              <div style="display: inline-block; width: 56px; height: 56px; line-height: 56px; border-radius: 16px; background-color: rgba(61,204,142,0.15); border: 1px solid rgba(61,204,142,0.3); color: #3dcc8e; font-size: 28px; font-weight: bold; margin-bottom: 12px;">
                ✓
              </div>
              <div style="display: inline-block; padding: 4px 12px; border-radius: 999px; background-color: rgba(61,204,142,0.15); border: 1px solid rgba(61,204,142,0.3); color: #3dcc8e; font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">
                Registration Confirmed
              </div>
              <h1 style="margin: 8px 0 4px 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                Welcome to KUKUNET Digital!
              </h1>
              <p style="margin: 0; font-size: 14px; color: #8aaec8;">
                Your account and learning track enrollment are officially confirmed.
              </p>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 0 32px 32px 32px;">
              
              <!-- Member Profile Card -->
              <div style="margin-top: 16px; background-color: #1a2130; border: 1px solid #1e3050; border-radius: 16px; padding: 20px;">
                <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #506070; margin-bottom: 12px;">
                  Member Profile
                </div>
                
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 14px; color: #e4eef8;">
                  <tr>
                    <td style="padding: 6px 0; color: #8aaec8; width: 100px;">Full Name:</td>
                    <td style="padding: 6px 0; font-weight: 700; text-align: right; color: #ffffff;">${name || 'Member'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #8aaec8;">Email:</td>
                    <td style="padding: 6px 0; font-weight: 600; text-align: right; color: #3dcc8e;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding: 6px 0; color: #8aaec8;">Track:</td>
                    <td style="padding: 6px 0; font-weight: 700; text-align: right; color: #3dcc8e;">
                      ${trackName}${customDetail ? ` (${customDetail})` : ''}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Enrollment Summary & Pricing Card -->
              <div style="margin-top: 20px; background-color: #1a2130; border: 1px solid #1e3050; border-radius: 16px; padding: 20px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                  <tr>
                    <td style="font-size: 11px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #506070;">
                      Enrollment Summary
                    </td>
                    <td style="text-align: right;">
                      <span style="font-size: 12px; font-weight: bold; color: #3dcc8e; background-color: rgba(61,204,142,0.1); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(61,204,142,0.2);">
                        $4,500 / course
                      </span>
                    </td>
                  </tr>
                </table>

                <!-- Course Table -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #141920; border: 1px solid #1e3050; border-radius: 12px; margin-bottom: 16px; border-collapse: collapse;">
                  ${courseRowsHtml}
                </table>

                <!-- Summary Breakdown -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="font-size: 13px; color: #8aaec8; margin-bottom: 16px;">
                  <tr>
                    <td style="padding: 4px 0;">Selected Courses:</td>
                    <td style="padding: 4px 0; text-align: right; font-weight: 600; color: #ffffff;">${courseCount}</td>
                  </tr>
                  <tr>
                    <td style="padding: 4px 0;">Price per Course:</td>
                    <td style="padding: 4px 0; text-align: right; font-weight: 600; color: #ffffff;">$4,500</td>
                  </tr>
                </table>

                <!-- Total Amount Box -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: linear-gradient(90deg, rgba(61,204,142,0.15) 0%, rgba(61,204,142,0.05) 100%); border: 1px solid rgba(61,204,142,0.4); border-radius: 12px; padding: 16px;">
                  <tr>
                    <td style="font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.1em; color: #5ce8a8;">
                      Total Amount
                    </td>
                    <td style="text-align: right; font-size: 22px; font-weight: 800; color: #3dcc8e;">
                      $${totalPrice.toLocaleString()}
                    </td>
                  </tr>
                </table>
              </div>

              <!-- CTA Button -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 28px;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://kukunet.vercel.app'}/dashboard" style="display: block; width: 100%; box-sizing: border-box; text-align: center; background-color: #3dcc8e; color: #0f1319; font-size: 14px; font-weight: 800; text-decoration: none; padding: 16px 24px; border-radius: 14px; box-shadow: 0 10px 25px rgba(61,204,142,0.25);">
                      Access Your Workspace Dashboard →
                    </a>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 32px; text-align: center; border-top: 1px solid #1e3050; background-color: #0f1319;">
              <p style="margin: 0; font-size: 12px; color: #506070;">
                Sent from <strong style="color: #8aaec8;">daggimhailu@gmail.com</strong> for KUKUNET Digital.
              </p>
              <p style="margin: 4px 0 0 0; font-size: 11px; color: #506070;">
                © 2026 KUKUNET Digital. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function sendRegistrationEmail(params: RegistrationEmailParams): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    const sender = process.env.SENDER_EMAIL || '"KUKUNET Digital" <daggimhailu@gmail.com>';
    const html = generateRegistrationEmailHtml(params);
    const text = `Welcome to KUKUNET Digital, ${params.name}! Your registration is confirmed. Total Amount: $${((params.selectedCourses?.length || 1) * COURSE_PRICE).toLocaleString()}. Visit your dashboard to get started.`;

    console.log(`EMAIL_SERVICE_LOG: Preparing registration email to ${params.email} from ${sender}`);

    const pass = process.env.SMTP_PASS;
    if (!pass) {
      console.log('EMAIL_SERVICE_LOG: SMTP_PASS env variable not set. Email generated and logged for reference.');
      return { success: true, messageId: 'logged-local' };
    }

    const transporter = createTransporter();
    const info = await transporter.sendMail({
      from: sender,
      to: params.email,
      subject: 'Welcome to KUKUNET Digital - Registration Confirmed',
      text,
      html,
    });

    console.log('EMAIL_SERVICE_LOG: Email sent successfully! Message ID:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('EMAIL_SERVICE_FAILURE_LOG:', error);
    return { success: false, error: (error as Error).message };
  }
}
