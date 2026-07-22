'use client';

import { Share2 } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';
import { useDashboard } from '../../app/dashboard/layout';
import type { Course } from '../../lib/types';

const weeklyBars: Array<{
  label: string;
  height: string;
  active: boolean;
  color?: string;
}> = [
  { label: 'M', height: 'h-8', active: false },
  { label: 'T', height: 'h-16', active: true, color: 'bg-emerald-500' },
  { label: 'W', height: 'h-6', active: false },
  { label: 'T', height: 'h-20', active: true, color: 'bg-emerald-500' },
  { label: 'F', height: 'h-11', active: false },
  { label: 'S', height: 'h-4', active: false, color: 'bg-cyan-500' },
  { label: 'S', height: 'h-0.5', active: false },
];

const courseProgressMap: Record<Course, { name: string; percent: number; color: string; textColor: string; dimmed: boolean }> = {
  Python: { name: 'Python Programming', percent: 45, color: 'bg-purple-500', textColor: 'text-purple-400', dimmed: false },
  AI: { name: 'AI & Machine Learning', percent: 15, color: 'bg-amber-500', textColor: 'text-amber-500', dimmed: false },
  WebDev: { name: 'Web Development', percent: 66, color: 'bg-emerald-500', textColor: 'text-emerald-400', dimmed: false },
  Graphics: { name: 'Graphics Design', percent: 40, color: 'bg-cyan-400', textColor: 'text-cyan-400', dimmed: false },
};

export function MobileProgressView() {
  const { profile } = useDashboard();
  
  if (!profile) return null;
  
  const selectedCourses = profile.user.selectedCourses;
  const filteredProgress = selectedCourses.map(course => courseProgressMap[course]);

  return (
    <div className="flex flex-col min-h-full bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none px-6 pt-6 pb-4">
        <div className="flex justify-between items-start mb-6 flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">Progress</h1>
            <p className="text-sm text-muted mt-1">Your learning metrics at a glance</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => alert('Sharing progress report...')}
              className="p-1 hover:opacity-80 transition"
              aria-label="Share metrics"
            >
              <Share2 className="w-6 h-6 text-neutral-400" />
            </button>
          </div>
        </div>

        <div className="bg-dashboard-card border border-neutral-800/60 rounded-2xl p-4 mb-6 flex-shrink-0">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-neutral-300">Study Time (Hours)</h3>
            <span className="text-[13px] text-emerald-500 font-bold bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/30">
              This Week
            </span>
          </div>
          <div className="flex items-end justify-between h-28 pt-2 px-1">
            {weeklyBars.map((bar, index) => (
              <div key={`${bar.label}-${index}`} className="flex flex-col items-center gap-1.5 w-8">
                <div
                  className={`w-full rounded-t-sm ${bar.height} ${
                    bar.color ?? (bar.active ? 'bg-emerald-500 shadow-md shadow-emerald-500/10' : 'bg-neutral-800')
                  }`}
                />
                <span className={`text-[12px] ${bar.active ? 'text-emerald-400 font-medium' : 'text-muted'}`}>
                  {bar.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-base font-semibold tracking-wide mb-3">Course Completion</h2>
        <div className="space-y-4">
          {filteredProgress.map((course) => (
            <div key={course.name}>
              <div className="flex justify-between items-baseline mb-1">
                <span className={`text-sm font-medium ${course.dimmed ? 'text-neutral-400' : 'text-neutral-300'}`}>
                  {course.name}
                </span>
                <span className={`text-[14px] font-bold ${course.textColor}`}>{course.percent}%</span>
              </div>
              <div className="w-full bg-neutral-800 h-3 rounded-full overflow-hidden">
                <div className={`${course.color} h-full rounded-full`} style={{ width: `${course.percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
