import 'server-only';

import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import type { AuthResponse, AuthTokens } from './types';

const ACCESS_TOKEN_COOKIE = 'kukunet_access_token';
const REFRESH_TOKEN_COOKIE = 'kukunet_refresh_token';
const ACCESS_EXPIRY_COOKIE = 'kukunet_access_expires_at';
const REFRESH_EXPIRY_COOKIE = 'kukunet_refresh_expires_at';

function getBackendBaseUrl(): string {
  return process.env.API_BASE_URL?.trim() || 'http://127.0.0.1:3001';
}

async function parseJsonSafely<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function buildCookieOptions(expiresAt: string) {
  return {
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(expiresAt),
  };
}

export function setAuthCookies(
  response: NextResponse,
  tokens: AuthTokens,
): void {
  response.cookies.set(
    ACCESS_TOKEN_COOKIE,
    tokens.accessToken,
    buildCookieOptions(tokens.accessTokenExpiresAt),
  );
  response.cookies.set(
    REFRESH_TOKEN_COOKIE,
    tokens.refreshToken,
    buildCookieOptions(tokens.refreshTokenExpiresAt),
  );
  response.cookies.set(
    ACCESS_EXPIRY_COOKIE,
    tokens.accessTokenExpiresAt,
    buildCookieOptions(tokens.accessTokenExpiresAt),
  );
  response.cookies.set(
    REFRESH_EXPIRY_COOKIE,
    tokens.refreshTokenExpiresAt,
    buildCookieOptions(tokens.refreshTokenExpiresAt),
  );
}

export function clearAuthCookies(response: NextResponse): void {
  for (const cookieName of [
    ACCESS_TOKEN_COOKIE,
    REFRESH_TOKEN_COOKIE,
    ACCESS_EXPIRY_COOKIE,
    REFRESH_EXPIRY_COOKIE,
  ]) {
    response.cookies.set(cookieName, '', {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 0,
    });
  }
}

function getForwardHeaders(request: NextRequest): Headers {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
  });
  const userAgent = request.headers.get('user-agent');
  const forwardedFor = request.headers.get('x-forwarded-for');

  if (userAgent) {
    headers.set('user-agent', userAgent);
  }

  if (forwardedFor) {
    headers.set('x-forwarded-for', forwardedFor);
  }

  return headers;
}

async function toErrorResponse(response: Response): Promise<NextResponse> {
  const payload = await parseJsonSafely<{ message?: string | string[] }>(response);
  const message = Array.isArray(payload?.message)
    ? payload?.message.join(' ')
    : payload?.message || 'The request could not be completed.';

  return NextResponse.json({ message }, { status: response.status });
}

export async function proxyAuthExchange(
  request: NextRequest,
  endpoint: string,
  body: unknown,
): Promise<NextResponse> {
  const response = await fetch(`${getBackendBaseUrl()}${endpoint}`, {
    method: 'POST',
    headers: getForwardHeaders(request),
    body: JSON.stringify(body),
    cache: 'no-store',
  });

  if (!response.ok) {
    return toErrorResponse(response);
  }

  const payload = await parseJsonSafely<AuthResponse>(response);

  if (payload === null) {
    return NextResponse.json(
      { message: 'The authentication response was invalid.' },
      { status: 502 },
    );
  }

  const nextResponse = NextResponse.json(
    {
      user: payload.user,
    },
    { status: response.status },
  );
  setAuthCookies(nextResponse, payload.tokens);
  return nextResponse;
}

async function refreshWithToken(
  request: NextRequest,
  refreshToken: string,
): Promise<AuthResponse | null> {
  const response = await fetch(`${getBackendBaseUrl()}/auth/refresh`, {
    method: 'POST',
    headers: getForwardHeaders(request),
    body: JSON.stringify({ refreshToken }),
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  return parseJsonSafely<AuthResponse>(response);
}

export async function proxyProtectedGet<T>(
  request: NextRequest,
  endpoint: string,
): Promise<NextResponse> {
  const cookieStore = await cookies();
  const currentAccessToken = cookieStore.get(ACCESS_TOKEN_COOKIE)?.value ?? null;
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;
  let accessToken = currentAccessToken;
  let refreshedSession: AuthResponse | null = null;

  if (!accessToken && refreshToken) {
    refreshedSession = await refreshWithToken(request, refreshToken);
    accessToken = refreshedSession?.tokens.accessToken ?? null;
  }

  if (!accessToken) {
    const response = NextResponse.json(
      { message: 'Authentication is required.' },
      { status: 401 },
    );
    clearAuthCookies(response);
    return response;
  }

  let response = await fetch(`${getBackendBaseUrl()}${endpoint}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    cache: 'no-store',
  });

  if (response.status === 401 && refreshToken) {
    refreshedSession = await refreshWithToken(request, refreshToken);

    if (refreshedSession !== null) {
      accessToken = refreshedSession.tokens.accessToken;
      response = await fetch(`${getBackendBaseUrl()}${endpoint}`, {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        cache: 'no-store',
      });
    }
  }

  if (!response.ok) {
    const errorResponse = await toErrorResponse(response);

    if (response.status === 401) {
      clearAuthCookies(errorResponse);
    }

    return errorResponse;
  }

  const payload = await parseJsonSafely<T>(response);

  if (payload === null) {
    return NextResponse.json(
      { message: 'The protected response was invalid.' },
      { status: 502 },
    );
  }

  const nextResponse = NextResponse.json(payload, { status: response.status });

  if (refreshedSession !== null) {
    setAuthCookies(nextResponse, refreshedSession.tokens);
  }

  return nextResponse;
}

export async function proxyLogout(request: NextRequest): Promise<NextResponse> {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get(REFRESH_TOKEN_COOKIE)?.value ?? null;

  if (refreshToken) {
    await fetch(`${getBackendBaseUrl()}/auth/logout`, {
      method: 'POST',
      headers: getForwardHeaders(request),
      body: JSON.stringify({ refreshToken }),
      cache: 'no-store',
    });
  }

  const response = NextResponse.json({ success: true });
  clearAuthCookies(response);
  return response;
}

export async function hasSessionCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  return (
    cookieStore.has(ACCESS_TOKEN_COOKIE) || cookieStore.has(REFRESH_TOKEN_COOKIE)
  );
}
