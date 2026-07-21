import { NextRequest } from 'next/server';
import { proxyProtectedGet } from '../../../../lib/auth-proxy';
import type { ProfileResponse } from '../../../../lib/types';

export async function GET(request: NextRequest) {
  return proxyProtectedGet<ProfileResponse>(request, '/auth/profile');
}
