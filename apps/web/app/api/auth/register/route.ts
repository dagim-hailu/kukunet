import { NextRequest } from 'next/server';
import { proxyAuthExchange } from '../../../../lib/auth-proxy';
import { sendRegistrationEmail } from '../../../../lib/email-service';

export async function POST(request: NextRequest) {
  try {
    console.log("REGISTRATION_REQUEST_LOG: Starting registration request");
    const body = (await request.json().catch(() => null)) as
      | Record<string, unknown>
      | null;

    if (body === null) {
      console.log("REGISTRATION_FAILURE_LOG: Invalid request body");
      return Response.json({ message: 'Invalid request body.' }, { status: 400 });
    }

    console.log("REGISTRATION_REQUEST_LOG: Forwarding to backend with body:", JSON.stringify(body, null, 2));
    const response = await proxyAuthExchange(request, '/auth/register', body);

    if (response.ok) {
      const email = typeof body.email === 'string' ? body.email : '';
      const name = typeof body.name === 'string' ? body.name : 'Member';
      const selectedCourses = Array.isArray(body.selectedCourses)
        ? (body.selectedCourses as string[])
        : [];
      const category = typeof body.chosenCategory === 'string'
        ? (body.chosenCategory as 'kids' | 'adult')
        : null;
      const customDetail = typeof body.customFieldVal === 'string'
        ? body.customFieldVal
        : undefined;

      if (email) {
        sendRegistrationEmail({
          name,
          email,
          selectedCourses,
          category,
          customDetail,
        }).catch((err) => {
          console.error("REGISTRATION_EMAIL_ASYNC_ERROR:", err);
        });
      }
    }

    return response;
  } catch (error) {
    console.error("REGISTRATION_FAILURE_LOG:", error);
    return Response.json({
      message: 'Internal server error during registration',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    }, { status: 500 });
  }
}
