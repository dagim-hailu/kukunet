'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from './logo';
import type {
  DashboardSummaryResponse,
  ProfileResponse,
} from '../lib/types';

interface DashboardState {
  profile: ProfileResponse | null;
  summary: DashboardSummaryResponse | null;
  error: string | null;
  isLoading: boolean;
}

function formatTimestamp(value: string): string {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function DashboardShell() {
  const router = useRouter();
  const [state, setState] = useState<DashboardState>({
    profile: null,
    summary: null,
    error: null,
    isLoading: true,
  });
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      try {
        const [profileResponse, summaryResponse] = await Promise.all([
          fetch('/api/auth/profile', { cache: 'no-store' }),
          fetch('/api/dashboard/summary', { cache: 'no-store' }),
        ]);

        if (profileResponse.status === 401 || summaryResponse.status === 401) {
          router.replace('/login');
          router.refresh();
          return;
        }

        if (!profileResponse.ok || !summaryResponse.ok) {
          const message =
            ((await profileResponse.json().catch(() => null)) as { message?: string } | null)
              ?.message ||
            ((await summaryResponse.json().catch(() => null)) as { message?: string } | null)
              ?.message ||
            'The dashboard could not be loaded.';

          if (!isCancelled) {
            setState({
              profile: null,
              summary: null,
              error: message,
              isLoading: false,
            });
          }

          return;
        }

        const [profile, summary] = await Promise.all([
          profileResponse.json() as Promise<ProfileResponse>,
          summaryResponse.json() as Promise<DashboardSummaryResponse>,
        ]);

        if (!isCancelled) {
          setState({
            profile,
            summary,
            error: null,
            isLoading: false,
          });
        }
      } catch {
        if (!isCancelled) {
          setState({
            profile: null,
            summary: null,
            error: 'A network error interrupted the dashboard request.',
            isLoading: false,
          });
        }
      }
    }

    void loadData();

    return () => {
      isCancelled = true;
    };
  }, [router]);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } finally {
      router.replace('/');
      router.refresh();
    }
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <header className="section-shell py-6">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] px-6 py-5 backdrop-blur lg:flex-row lg:items-center lg:justify-between shadow-sm">
          <Logo light />
          <nav className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-2)]">
            <a href="#overview" className="btn-secondary">
              Overview
            </a>
            <a href="#security" className="btn-secondary">
              Security
            </a>
            <a href="#actions" className="btn-secondary">
              Actions
            </a>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-full border border-rose-300/30 px-5 py-2.5 text-rose-500 transition hover:border-rose-400 hover:bg-rose-500/10 disabled:opacity-70"
            >
              {isLoggingOut ? 'Signing out...' : 'Logout'}
            </button>
          </nav>
        </div>
      </header>

      <section className="section-shell section-spacing">
        {state.isLoading ? (
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            {[0, 1].map((item) => (
              <div
                key={item}
                className="h-72 animate-pulse rounded-[2rem] border border-white/10 bg-white/4"
              />
            ))}
          </div>
        ) : state.error ? (
          <div className="rounded-[2rem] border border-rose-300/20 bg-rose-400/10 px-6 py-5 text-rose-200">
            {state.error}
          </div>
        ) : state.profile && state.summary ? (
          <div className="grid gap-8">
            <section
              id="overview"
              className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]"
            >
              <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-3)]">
                  Authenticated workspace
                </p>
                <h1 className="mt-4 font-[family-name:var(--font-outfit)] text-5xl font-semibold tracking-[-0.05em] text-[var(--text)]">
                  {state.summary.greeting}
                </h1>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-2)]">
                  Your secure dashboard is live. Review current metrics, inspect
                  health checks, and move into the next client-facing action with
                  a consistent premium interface.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--bg-3)] p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-3)]">
                      Profile
                    </p>
                    <div className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-semibold text-[var(--text)]">
                      {state.profile.user.name}
                    </div>
                    <div className="mt-2 text-[var(--text-2)]">{state.profile.user.email}</div>
                  </div>
                  <div className="rounded-[1.5rem] border border-[var(--green)]/30 bg-[var(--green)]/10 p-5">
                    <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-3)]">
                      Active sessions
                    </p>
                    <div className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-semibold text-[var(--text)]">
                      {state.summary.activeSessions}
                    </div>
                    <div className="mt-2 text-[var(--text-2)]">
                      Generated {formatTimestamp(state.summary.generatedAt)}
                    </div>
                  </div>
                </div>
              </div>

              <div id="profile" className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-3)]">
                  Quick links
                </p>
                <div className="mt-6 grid gap-4">
                  {state.summary.quickActions.map((action) => (
                    <Link
                      key={action.label}
                      href={action.href}
                      className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--bg-3)] px-5 py-5 transition hover:-translate-y-0.5 hover:border-[var(--green)]/40"
                    >
                      <div className="font-[family-name:var(--font-outfit)] text-2xl text-[var(--text)]">
                        {action.label}
                      </div>
                      <div className="mt-2 text-sm text-[var(--text-2)]">
                        {action.description}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            <section className="grid gap-5 lg:grid-cols-4">
              {state.summary.overviewMetrics.map((metric) => (
                <article
                  key={metric.label}
                  className="rounded-[1.75rem] border border-[var(--border)] bg-[var(--bg-2)] p-6 shadow-sm"
                >
                  <p className="text-sm uppercase tracking-[0.2em] text-[var(--text-3)]">
                    {metric.label}
                  </p>
                  <div className="mt-4 font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-[-0.04em] text-[var(--text)]">
                    {metric.value}
                  </div>
                  <div
                    className={`mt-3 text-sm ${
                      metric.trend === 'up' ? 'text-emerald-500 font-medium' : 'text-[var(--text-2)]'
                    }`}
                  >
                    {metric.detail}
                  </div>
                </article>
              ))}
            </section>

            <section id="security" className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
              <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-3)]">
                  Account health
                </p>
                <div className="mt-6 grid gap-4">
                  {state.summary.accountHealth.map((item) => (
                    <article
                      key={item.label}
                      className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--bg-3)] p-5"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="font-[family-name:var(--font-outfit)] text-2xl text-[var(--text)]">
                          {item.label}
                        </h2>
                        <span
                          className={`rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] font-medium ${
                            item.status === 'healthy'
                              ? 'bg-emerald-500/15 text-emerald-600'
                              : 'bg-amber-500/15 text-amber-600'
                          }`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-[var(--text-2)]">
                        {item.detail}
                      </p>
                    </article>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 shadow-sm">
                <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-3)]">
                  Recent activity
                </p>
                <div className="mt-6 grid gap-4">
                  {state.summary.recentActivity.map((item) => (
                    <article
                      key={`${item.title}-${item.timestamp}`}
                      className="rounded-[1.4rem] border border-[var(--border)] bg-[var(--bg-3)] p-5"
                    >
                      <h2 className="font-[family-name:var(--font-outfit)] text-2xl text-[var(--text)]">
                        {item.title}
                      </h2>
                      <p className="mt-3 text-sm leading-6 text-[var(--text-2)]">
                        {item.detail}
                      </p>
                      <div className="mt-4 text-xs uppercase tracking-[0.22em] text-[var(--text-3)]">
                        {formatTimestamp(item.timestamp)}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="actions" className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 shadow-sm">
              <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-3)]">
                    Next steps
                  </p>
                  <h2 className="mt-5 font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-[-0.05em] text-[var(--text)]">
                    Final review is ready to walk through.
                  </h2>
                  <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--text-2)]">
                    The marketing site, auth proxy, secure API, and protected
                    dashboard now line up as a single review-ready product
                    experience.
                  </p>
                </div>
                <div className="grid gap-4">
                  <Link href="/" className="btn-secondary justify-center">
                    Return to landing page
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="inline-flex items-center justify-center rounded-full bg-sky-300 px-6 py-3 font-medium text-slate-950 transition hover:-translate-y-0.5 hover:bg-sky-200 disabled:opacity-70"
                  >
                    {isLoggingOut ? 'Signing out...' : 'End secure session'}
                  </button>
                </div>
              </div>
            </section>
          </div>
        ) : null}
      </section>
    </main>
  );
}
