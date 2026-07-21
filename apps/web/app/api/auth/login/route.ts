import { NextRequest } from 'next/server';
import { proxyAuthExchange } from '../../../../lib/auth-proxy';

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | Record<string, unknown>
    | null;

  if (body === null) {
    return Response.json({ message: 'Invalid request body.' }, { status: 400 });
  }

  return proxyAuthExchange(request, '/auth/login', body);
}
