import { NextRequest } from 'next/server';
import { proxyAuthExchange } from '../../../../lib/auth-proxy';

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
    return await proxyAuthExchange(request, '/auth/register', body);
  } catch (error) {
    console.error("REGISTRATION_FAILURE_LOG:", error);
    return Response.json({
      message: 'Internal server error during registration',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined,
    }, { status: 500 });
  }
}
