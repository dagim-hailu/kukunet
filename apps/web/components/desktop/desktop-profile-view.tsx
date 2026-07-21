'use client';

import { useDashboard } from '../../app/dashboard/layout';

export function DesktopProfileView() {
  const { profile } = useDashboard();

  if (!profile) return null;

  const stats = [
    { label: 'Courses', value: '4', accent: 'text-emerald-500 font-bold' },
    { label: 'Quizzes done', value: '12', accent: 'text-cyan-500 font-bold' },
    { label: 'Streak', value: '5 days', accent: 'text-amber-500 font-bold' },
  ];

  const menuItems = [
    { label: 'My Certificates', detail: 'Download and share earned credentials.' },
    { label: 'Notifications', detail: 'Manage alerts for classes and deadlines.' },
    { label: 'Privacy & Security', detail: 'Review sessions, passwords, and access.' },
  ];

  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 text-center shadow-sm">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-2 border-[var(--green)] bg-[var(--green)]/15 text-3xl font-semibold text-[var(--green)]">
          {profile.user.name.charAt(0).toUpperCase()}
        </div>
        <h1 className="mt-5 font-[family-name:var(--font-outfit)] text-4xl font-semibold text-[var(--text)]">
          {profile.user.name}
        </h1>
        <p className="mt-2 text-[var(--text-2)]">{profile.user.email}</p>
        <p className="mt-1 text-sm text-[var(--text-3)]">Student Developer</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-3)] p-4">
              <div className={`font-[family-name:var(--font-outfit)] text-2xl font-semibold ${stat.accent}`}>
                {stat.value}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--text-3)]">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 shadow-sm">
        <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-3)]">Account actions</p>
        <div className="mt-6 grid gap-4">
          {menuItems.map((item) => (
            <article
              key={item.label}
              className="rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-3)] px-5 py-5 transition hover:border-[var(--green)]/40"
            >
              <h2 className="font-[family-name:var(--font-outfit)] text-2xl text-[var(--text)]">{item.label}</h2>
              <p className="mt-2 text-sm text-[var(--text-2)]">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
