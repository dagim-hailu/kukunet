'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, Home, User } from 'lucide-react';
import { Logo } from '../logo';
import { ThemeToggle } from '../theme-toggle';
import { useDashboard } from '../../app/dashboard/layout';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home, exact: true },
  { href: '/dashboard/track', label: 'Track', icon: BookOpen, exact: false },
  { href: '/dashboard/progress', label: 'Progress', icon: BarChart3, exact: false },
  { href: '/dashboard/profile', label: 'Profile', icon: User, exact: false },
] as const;

function isActive(pathname: string, href: string, exact: boolean): boolean {
  if (exact) return pathname === href;
  return pathname.startsWith(href);
}

export function DesktopDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { handleLogout, isLoggingOut } = useDashboard();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <header className="section-shell py-6">
        <div className="flex flex-col gap-4 rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] px-6 py-5 backdrop-blur lg:flex-row lg:items-center lg:justify-between shadow-sm">
          <Logo light />
          <div className="flex flex-wrap items-center gap-3">
            <ThemeToggle />
            <Link href="/" className="btn-secondary text-sm">
              Landing
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="rounded-full border border-rose-300/30 px-5 py-2.5 text-sm text-rose-500 transition hover:border-rose-400 hover:bg-rose-500/10 disabled:opacity-70"
            >
              {isLoggingOut ? 'Signing out...' : 'Logout'}
            </button>
          </div>
        </div>
      </header>

      <div className="section-shell pb-12">
        <div className="grid gap-8 lg:grid-cols-[240px_1fr]">
          <aside className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-4 h-fit shadow-sm">
            <p className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-[var(--text-3)]">Workspace</p>
            <nav className="mt-2 space-y-1">
              {navItems.map(({ href, label, icon: Icon, exact }) => {
                const active = isActive(pathname, href, exact);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                      active
                        ? 'bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30 font-medium'
                        : 'text-[var(--text-2)] hover:bg-[var(--bg-3)] hover:text-[var(--text)]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </nav>
          </aside>

          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}
