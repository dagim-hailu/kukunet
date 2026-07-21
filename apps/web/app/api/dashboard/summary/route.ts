import { NextRequest } from 'next/server';
import { proxyProtectedGet } from '../../../../lib/auth-proxy';
import type { DashboardSummaryResponse } from '../../../../lib/types';

export async function GET(request: NextRequest) {
  return proxyProtectedGet<DashboardSummaryResponse>(
    request,
    '/dashboard/summary',
  );
}
