import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SessionsRepository } from '../auth/sessions.repository';
import { RequestUser } from '../auth/auth.types';
import { UsersRepository } from '../users/users.repository';
import {
  DashboardActivityItem,
  DashboardQuickAction,
  DashboardStatusItem,
  DashboardSummaryResponse,
} from './dashboard.types';

@Injectable()
export class DashboardService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly sessionsRepository: SessionsRepository,
  ) {}

  async getSummary(
    requestUser: RequestUser,
  ): Promise<DashboardSummaryResponse> {
    const user = await this.usersRepository.findById(requestUser.userId);

    if (user === null) {
      throw new UnauthorizedException('Authenticated user was not found.');
    }

    const [activeSessions, recentSessions] = await Promise.all([
      this.sessionsRepository.countActiveSessionsForUser(user.id),
      this.sessionsRepository.findRecentSessionsForUser(user.id, 4),
    ]);
    const seed = this.getSeedValue(user.id);
    const lifecycleDays = Math.max(
      1,
      Math.ceil((Date.now() - user.createdAt.getTime()) / 86_400_000),
    );
    const recentActivity = this.toRecentActivity(recentSessions);
    const lastActivity = recentActivity[0];
    const overviewMetrics = [
      {
        label: 'Active initiatives',
        value: String(3 + (seed % 5)),
        detail: 'Priority workstreams tracked this week',
        trend: 'up' as const,
      },
      {
        label: 'Automation coverage',
        value: `${78 + (seed % 18)}%`,
        detail: 'Core delivery steps running through KUKUNET',
        trend: 'steady' as const,
      },
      {
        label: 'Workspace age',
        value: `${lifecycleDays}d`,
        detail: 'Days since the account was provisioned',
        trend: 'up' as const,
      },
      {
        label: 'Security score',
        value: `${90 + (seed % 9)} / 100`,
        detail: 'Session hygiene and access policy status',
        trend: 'up' as const,
      },
    ];
    const accountHealth: DashboardStatusItem[] = [
      {
        label: 'Identity protection',
        status: 'healthy',
        detail:
          activeSessions > 1
            ? `${activeSessions} active sessions are currently signed in.`
            : 'Single active session with refresh rotation enabled.',
      },
      {
        label: 'Recent access',
        status: lastActivity === undefined ? 'attention' : 'healthy',
        detail:
          lastActivity?.detail ??
          'No recent session activity is available for this account yet.',
      },
      {
        label: 'Profile readiness',
        status: user.name.trim().length >= 3 ? 'healthy' : 'attention',
        detail:
          user.name.trim().length >= 3
            ? 'Customer-facing profile details are ready for dashboard use.'
            : 'Profile details should be completed before onboarding teammates.',
      },
    ];
    const quickActions: DashboardQuickAction[] = [
      {
        label: 'Review profile',
        description: 'Confirm account details and profile information.',
        href: '/dashboard#profile',
      },
      {
        label: 'Audit sessions',
        description: 'Inspect recent access and security posture.',
        href: '/dashboard#security',
      },
      {
        label: 'Plan next launch',
        description: 'Use the workspace checklist to prepare the next release.',
        href: '/dashboard#actions',
      },
    ];

    return {
      greeting: `Welcome back, ${user.name.split(' ')[0] ?? user.name}.`,
      generatedAt: new Date().toISOString(),
      activeSessions,
      overviewMetrics,
      accountHealth,
      quickActions,
      recentActivity,
    };
  }

  private toRecentActivity(
    sessions: Awaited<
      ReturnType<SessionsRepository['findRecentSessionsForUser']>
    >,
  ): DashboardActivityItem[] {
    return sessions.map((session, index) => ({
      title:
        index === 0 ? 'Latest session refreshed' : 'Secure session recorded',
      detail: [
        session.userAgent ?? 'Unknown client',
        session.ipAddress ?? 'Unknown IP',
      ].join(' · '),
      timestamp: session.lastUsedAt.toISOString(),
    }));
  }

  private getSeedValue(value: string): number {
    return Array.from(value).reduce(
      (accumulator, character) => accumulator + character.charCodeAt(0),
      0,
    );
  }
}
