'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, Home, User } from 'lucide-react';

const tabs = [
  { href: '/dashboard', label: 'Home', icon: Home, exact: true },
  { href: '/dashboard/track', label: 'Track', icon: BookOpen, exact: false },
  { href: '/dashboard/progress', label: 'Progress', icon: BarChart3, exact: false },
  { href: '/dashboard/profile', label: 'Profile', icon: User, exact: false },
] as const;

function isActive(pathname: string, href: string, exact: boolean): boolean {
  if (exact) return pathname === href;
  return pathname.startsWith(href);
}

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-2)] px-6 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg transition-colors duration-300"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center px-2">
        {tabs.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(pathname, href, exact);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 transition ${
                active ? 'text-emerald-500' : 'text-neutral-500 hover:text-neutral-300'
              }`}
            >
              <Icon className="w-5 h-5" strokeWidth={2} />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
