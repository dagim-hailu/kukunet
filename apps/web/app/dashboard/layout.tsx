'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { MobileBottomNav } from '../../components/mobile/mobile-bottom-nav';
import { DesktopDashboardLayout } from '../../components/desktop/desktop-dashboard-layout';
import type { DashboardSummaryResponse, ProfileResponse } from '../../lib/types';

interface DashboardContextType {
  profile: ProfileResponse | null;
  summary: DashboardSummaryResponse | null;
  isLoading: boolean;
  error: string | null;
  handleLogout: () => Promise<void>;
  isLoggingOut: boolean;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardLayout');
  }
  return context;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [summary, setSummary] = useState<DashboardSummaryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
            setError(message);
            setIsLoading(false);
          }
          return;
        }

        const [pData, sData] = await Promise.all([
          profileResponse.json() as Promise<ProfileResponse>,
          summaryResponse.json() as Promise<DashboardSummaryResponse>,
        ]);

        if (!isCancelled) {
          setProfile(pData);
          setSummary(sData);
          setIsLoading(false);
        }
      } catch {
        if (!isCancelled) {
          setError('A network error interrupted the dashboard request.');
          setIsLoading(false);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-6">
        <div className="w-full max-w-xs bg-[#212121] border border-neutral-800 rounded-3xl p-6 text-center shadow-xl">
          <p className="text-sm text-rose-400 mb-4">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-xl"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <DashboardContext.Provider value={{ profile, summary, isLoading, error, handleLogout, isLoggingOut }}>
      {/* Mobile: full-viewport layout with fixed bottom navigation */}
      <div className="md:hidden min-h-[100dvh] bg-[#121212] flex flex-col">
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>
        <MobileBottomNav />
      </div>

      {/* Desktop: sidebar workspace layout */}
      <div className="hidden md:block">
        <DesktopDashboardLayout>{children}</DesktopDashboardLayout>
      </div>
    </DashboardContext.Provider>
  );
}
