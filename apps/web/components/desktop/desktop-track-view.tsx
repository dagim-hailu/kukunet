'use client';

import { useState } from 'react';
import { useDashboard } from '../../app/dashboard/layout';
import type { Course } from '../../lib/types';

const courseTrackMap: Record<Course, { name: string; detail: string; progress: number; status: 'In progress' | 'Review' | 'Locked' }> = {
  Python: { name: 'Python Programming', detail: 'Up next', progress: 45, status: 'In progress' },
  AI: { name: 'AI & Machine Learning', detail: '3/5 modules correct', progress: 15, status: 'Review' },
  WebDev: { name: 'Web Development', detail: '4 of 6 goals today', progress: 66, status: 'In progress' },
  Graphics: { name: 'Graphics Design', detail: 'Project due soon', progress: 40, status: 'In progress' },
};

export function DesktopTrackView() {
  const { profile } = useDashboard();
  const [activeTab, setActiveTab] = useState<'core' | 'electives'>('core');
  
  if (!profile) return null;

  const selectedCourses = profile.user.selectedCourses;
  const filteredTracks = selectedCourses.map(course => courseTrackMap[course]);

  return (
    <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--bg-2)] p-8 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-[var(--text-3)]">Learning track</p>
          <h1 className="mt-3 font-[family-name:var(--font-outfit)] text-4xl font-semibold tracking-[-0.05em] text-[var(--text)]">
            Your Learning Path
          </h1>
          <p className="mt-2 text-[var(--text-2)]">{filteredTracks.length} courses · Personalized path</p>
        </div>
        <div className="flex gap-4 border-b border-[var(--border)]">
          {(['core', 'electives'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-semibold capitalize transition ${
                activeTab === tab
                  ? 'border-b-2 border-[var(--green)] text-[var(--green)]'
                  : 'text-[var(--text-3)] hover:text-[var(--text)]'
              }`}
            >
              {tab === 'core' ? 'Core Tracks' : 'Electives'}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'core' ? (
        <>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <article className="rounded-[1.5rem] border border-emerald-500/30 bg-emerald-500/10 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-emerald-600 font-bold">Quiz</p>
              <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-2xl text-[var(--text)]">Test your skills</h2>
              <p className="mt-2 text-sm text-[var(--text-2)]">Quick assessments across your active modules.</p>
            </article>
            <article className="rounded-[1.5rem] border border-cyan-500/30 bg-cyan-500/10 p-6">
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-600 font-bold">Summarize</p>
              <h2 className="mt-3 font-[family-name:var(--font-outfit)] text-2xl text-[var(--text)]">Review notes</h2>
              <p className="mt-2 text-sm text-[var(--text-2)]">Condensed summaries for each completed lesson.</p>
            </article>
          </div>

          <div className="mt-8">
            <h2 className="font-[family-name:var(--font-outfit)] text-2xl text-[var(--text)]">Continue learning</h2>
            <div className="mt-4 grid gap-3">
              {filteredTracks.map((course) => (
                <article
                  key={course.name}
                  className="flex flex-col gap-4 rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-3)] p-5 sm:flex-row sm:items-center"
                >
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-outfit)] text-xl text-[var(--text)]">{course.name}</h3>
                    <p className="mt-1 text-sm text-[var(--text-2)]">{course.detail}</p>
                    <div className="mt-3 h-2 rounded-full bg-[var(--border)]">
                      <div
                        className="h-full rounded-full bg-[var(--green)]"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] ${
                      course.status === 'Locked'
                        ? 'bg-[var(--border)] text-[var(--text-3)]'
                        : course.status === 'Review'
                          ? 'bg-amber-500/15 text-amber-600'
                          : 'bg-emerald-500/15 text-emerald-600'
                    }`}
                  >
                    {course.status}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </>
      ) : (
        <p className="mt-8 rounded-[1.25rem] border border-[var(--border)] bg-[var(--bg-3)] px-5 py-8 text-center text-[var(--text-2)]">
          Elective cohort tracks will show up here once you choose a core focus.
        </p>
      )}
    </div>
  );
}
