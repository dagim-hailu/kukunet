export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

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
}

export interface AuthResponse {
  user: AuthUser;
  tokens: AuthTokens;
}

export interface AuthSessionResponse {
  user: AuthUser;
}

export interface ProfileResponse {
  user: AuthUser;
}

export interface LogoutResponse {
  success: true;
}

export interface DashboardMetric {
  label: string;
  value: string;
  detail: string;
  trend: 'up' | 'steady';
}

export interface DashboardStatusItem {
  label: string;
  status: 'healthy' | 'attention';
  detail: string;
}

export interface DashboardQuickAction {
  label: string;
  description: string;
  href: string;
}

export interface DashboardActivityItem {
  title: string;
  detail: string;
  timestamp: string;
}

export interface DashboardSummaryResponse {
  greeting: string;
  generatedAt: string;
  activeSessions: number;
  overviewMetrics: DashboardMetric[];
  accountHealth: DashboardStatusItem[];
  quickActions: DashboardQuickAction[];
  recentActivity: DashboardActivityItem[];
}
