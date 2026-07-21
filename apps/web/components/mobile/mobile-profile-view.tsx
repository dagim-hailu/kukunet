'use client';

import {
  BellRing,
  BookOpenCheck,
  ChevronRight,
  LogOut,
  Settings,
  Shield,
  User,
} from 'lucide-react';
import { useDashboard } from '../../app/dashboard/layout';

export function MobileProfileView() {
  const { profile, handleLogout, isLoggingOut } = useDashboard();
  const displayName = profile?.user.name ?? 'Student';

  return (
    <div className="flex flex-col min-h-full bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none px-6 pt-6 pb-4">
        <div className="flex justify-between items-start mb-6 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Profile</h1>
            <p className="text-xs text-muted mt-1">Manage your account settings</p>
          </div>
          <button
            type="button"
            onClick={() => alert('Settings configuration is managed from the desktop sidebar workspace panels.')}
            className="p-1 hover:opacity-80 transition"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5 text-neutral-400" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center mb-6 flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-emerald-950 border-2 border-emerald-500 flex items-center justify-center mb-3 shadow-xl">
            <User className="w-10 h-10 text-emerald-400" />
          </div>
          <h2 className="text-base font-bold tracking-wide">{displayName}</h2>
          <p className="text-xs text-muted">Student Developer</p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 mb-6 text-center flex-shrink-0">
          <div className="bg-dashboard-card border border-neutral-800/40 rounded-xl p-2.5">
            <span className="block text-sm font-bold text-emerald-400">4</span>
            <span className="text-[9px] text-muted font-medium">Courses</span>
          </div>
          <div className="bg-dashboard-card border border-neutral-800/40 rounded-xl p-2.5">
            <span className="block text-sm font-bold text-cyan-400">12</span>
            <span className="text-[9px] text-muted font-medium">Quizzes Done</span>
          </div>
          <div className="bg-dashboard-card border border-neutral-800/40 rounded-xl p-2.5">
            <span className="block text-sm font-bold text-amber-500">5 Days</span>
            <span className="text-[9px] text-muted font-medium">Streak</span>
          </div>
        </div>

        <div className="space-y-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => alert('My Certificates: No certificates issued yet.')}
            className="w-full flex items-center justify-between bg-dashboard-card hover:bg-neutral-800/60 border border-neutral-800/40 rounded-xl p-3.5 transition group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <BookOpenCheck className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition" />
              <span className="text-xs font-semibold text-neutral-300">My Certificates</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>

          <button
            type="button"
            onClick={() => alert('Notifications: All clear.')}
            className="w-full flex items-center justify-between bg-dashboard-card hover:bg-neutral-800/60 border border-neutral-800/40 rounded-xl p-3.5 transition group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <BellRing className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition" />
              <span className="text-xs font-semibold text-neutral-300">Notifications</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>

          <button
            type="button"
            onClick={() => alert('Security: Handled by session HTTP-only cookie rotation.')}
            className="w-full flex items-center justify-between bg-dashboard-card hover:bg-neutral-800/60 border border-neutral-800/40 rounded-xl p-3.5 transition group cursor-pointer text-left"
          >
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-neutral-400 group-hover:text-emerald-400 transition" />
              <span className="text-xs font-semibold text-neutral-300">Privacy & Security</span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-between bg-rose-950/15 hover:bg-rose-950/25 border border-rose-900/30 rounded-xl p-3.5 transition group cursor-pointer text-left disabled:opacity-50"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 text-rose-400 group-hover:text-rose-300 transition" />
              <span className="text-xs font-semibold text-rose-300">
                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
              </span>
            </div>
            <ChevronRight className="w-4 h-4 text-neutral-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
