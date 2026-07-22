'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, BookOpen, Home, User } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  const [clickedTab, setClickedTab] = useState<string | null>(null);

  // Reset clicked animation after a short delay
  useEffect(() => {
    if (clickedTab) {
      const timer = setTimeout(() => setClickedTab(null), 150);
      return () => clearTimeout(timer);
    }
  }, [clickedTab]);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-[var(--border)] bg-[var(--bg-2)] px-6 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-lg transition-colors duration-300"
      aria-label="Main navigation"
    >
      <div className="flex justify-between items-center px-2">
        {tabs.map(({ href, label, icon: Icon, exact }) => {
          const active = isActive(pathname, href, exact);
          const isClicked = clickedTab === href;

          return (
            <Link
              key={href}
              href={href}
              onClick={() => setClickedTab(href)}
              className={`flex flex-col items-center gap-1 transition-all duration-200 ease-out relative ${
                active
                  ? 'text-emerald-500'
                  : 'text-neutral-500 hover:text-neutral-300'
              }`}
              aria-current={active ? 'page' : undefined}
            >
              {/* Active tab background highlight */}
              {active && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-1 bg-emerald-500 rounded-b-full" />
              )}

              <div
                className={`transition-transform duration-150 ${
                  isClicked ? 'scale-90' : 'scale-100'
                }`}
              >
                <Icon
                  className={`w-7 h-7 ${
                    active ? 'stroke-[3px]' : 'stroke-[2px]'
                  }`}
                />
              </div>

              <span
                className={`text-[13px] font-semibold transition-colors duration-150 ${
                  active ? 'text-emerald-500' : 'text-neutral-500'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
