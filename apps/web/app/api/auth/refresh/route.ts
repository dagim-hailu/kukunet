import { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { clearAuthCookies, proxyAuthExchange } from '../../../../lib/auth-proxy';

export async function POST(request: NextRequest) {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('kukunet_refresh_token')?.value;

  if (!refreshToken) {
    const response = NextResponse.json(
      { message: 'Authentication is required.' },
      { status: 401 },
    );
    clearAuthCookies(response);
    return response;
  }

  return proxyAuthExchange(request, '/auth/refresh', { refreshToken });
}
