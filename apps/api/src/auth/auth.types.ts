export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string;
  refreshTokenExpiresAt: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  selectedCourses: string[];
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface ProfileResponse {
  user: AuthUser;
}

export interface LogoutResponse {
  success: true;
}

export interface JwtAccessPayload {
  sub: string;
  email: string;
  sessionId: string;
  type: 'access';
}

export interface JwtRefreshPayload {
  sub: string;
  sessionId: string;
  type: 'refresh';
}

export interface RequestUser {
  userId: string;
  email: string;
  sessionId: string;
}

export interface RequestContext {
  userAgent: string | null;
  ipAddress: string | null;
}
