import { NextRequest } from 'next/server';
import { proxyLogout } from '../../../../lib/auth-proxy';

export async function POST(request: NextRequest) {
  return proxyLogout(request);
}
