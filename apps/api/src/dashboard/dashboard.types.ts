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
