'use client';

import { useDashboard } from '../../app/dashboard/layout';
import type { Course } from '../../lib/types';

const weeklyHours = [2, 5, 1.5, 6, 3, 0.5, 0];
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const courseProgressMap: Record<Course, { name: string; percent: number; color: string }> = {
  Python: { name: 'Python Programming', percent: 45, color: 'bg-purple-400' },
  AI: { name: 'AI & Machine Learning', percent: 15, color: 'bg-amber-400' },
  WebDev: { name: 'Web Development', percent: 66, color: 'bg-emerald-400' },
  Graphics: { name: 'Graphics Design', percent: 40, color: 'bg-cyan-400' },
};

export function DesktopProgressView() {
  const { profile } = useDashboard();
  const maxHours = Math.max(...weeklyHours, 1);
  
  if (!profile) return null;
  
  const selectedCourses = profile.user.selectedCourses;
  const filteredProgress = selectedCourses.map(course => courseProgressMap[course]);

  return (
    <div className="grid gap-8">
      <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 shadow-sm">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-3)]">Progress overview</p>
            <h1 className="mt-3 font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-[-0.05em] text-[var(--text)]">
              Learning metrics
            </h1>
          </div>
          <span className="rounded-full border border-[var(--green)]/30 bg-[var(--green)]/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--green)]">
            This week
          </span>
        </div>

        <div className="mt-8 flex items-end justify-between gap-3 h-40">
          {weeklyHours.map((hours, index) => (
            <div key={days[index]} className="flex flex-1 flex-col items-center gap-2">
              <div className="flex w-full flex-1 items-end">
                <div
                  className={`w-full rounded-t-md ${hours > 0 ? 'bg-[var(--green)]' : 'bg-[var(--bg-3)]'}`}
                  style={{ height: `${Math.max((hours / maxHours) * 100, hours > 0 ? 8 : 2)}%` }}
                />
              </div>
              <span className="text-xs text-[var(--text-3)]">{days[index]}</span>
              <span className="text-sm font-semibold text-[var(--text)]">{hours}h</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 shadow-sm">
        <h2 className="font-[family-name:var(--font-outfit)] text-2xl text-[var(--text)]">Course completion</h2>
        <div className="mt-6 grid gap-5">
          {filteredProgress.map((course) => (
            <article key={course.name}>
              <div className="mb-2 flex items-center justify-between gap-4">
                <h3 className="text-lg text-[var(--text)]">{course.name}</h3>
                <span className="text-sm font-semibold text-[var(--text-2)]">{course.percent}%</span>
              </div>
              <div className="h-3 rounded-full bg-[var(--bg-3)]">
                <div
                  className={`h-full rounded-full ${course.color}`}
                  style={{ width: `${course.percent}%` }}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
