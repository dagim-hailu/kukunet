'use client';

import { useState } from 'react';
import {
  Binary,
  ClipboardCheck,
  Code2,
  Edit3,
  FileText,
  Palette,
  Terminal,
} from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';

const courses = [
  {
    name: 'HTML, CSS, JS',
    detail: '4 of 6 goals today',
    icon: Code2,
    iconBg: 'bg-emerald-950/40 border-emerald-900/20',
    iconColor: 'text-emerald-400',
    action: 'Start',
    actionClass: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    disabled: false,
  },
  {
    name: 'Graphics Design',
    detail: 'Project due soon',
    icon: Palette,
    iconBg: 'bg-cyan-950/40 border-cyan-900/20',
    iconColor: 'text-cyan-400',
    action: 'Start',
    actionClass: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    disabled: false,
  },
  {
    name: 'AI Prompt Engineering',
    detail: '3/5 modules correct',
    icon: Terminal,
    iconBg: 'bg-amber-950/30 border-amber-900/20',
    iconColor: 'text-amber-500',
    action: 'Review',
    actionClass: 'bg-amber-900/30 hover:bg-amber-900/40 text-amber-500 border border-amber-900/40',
    disabled: false,
  },
  {
    name: 'Python',
    detail: 'Up next',
    icon: Binary,
    iconBg: 'bg-purple-950/40 border-purple-900/20',
    iconColor: 'text-purple-400',
    action: 'Locked',
    actionClass: 'bg-neutral-800 text-neutral-400 border border-neutral-700',
    disabled: true,
  },
] as const;

export function MobileTrackView() {
  const [activeTab, setActiveTab] = useState<'core' | 'electives'>('core');

  return (
    <div className="flex flex-col min-h-full bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none px-6 pt-6 pb-4">
        <div className="flex justify-between items-start mb-4 flex-shrink-0">
          <div>
            <h1 className="text-3xl font-bold tracking-wide">Track</h1>
            <p className="text-sm text-muted mt-1">Full stack track · 25% done</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => alert('Editing track settings...')}
              className="p-1 hover:opacity-80 transition"
              aria-label="Edit track"
            >
              <Edit3 className="w-6 h-6 text-neutral-400" />
            </button>
          </div>
        </div>

        <div className="flex gap-6 border-b border-neutral-800 mb-5 text-base flex-shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('core')}
            className={`pb-2 font-semibold transition cursor-pointer bg-transparent border-none ${
              activeTab === 'core'
                ? 'text-emerald-500 border-b-2 border-emerald-500'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Core Tracks
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('electives')}
            className={`pb-2 font-semibold transition cursor-pointer bg-transparent border-none ${
              activeTab === 'electives'
                ? 'text-emerald-500 border-b-2 border-emerald-500'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
          >
            Electives
          </button>
        </div>

        {activeTab === 'core' ? (
          <>
            <div className="grid grid-cols-2 gap-4 mb-6 flex-shrink-0">
              <button
                type="button"
                onClick={() => alert('Starting Quiz mode...')}
                className="bg-emerald-950/30 border border-emerald-900/30 rounded-2xl p-4 flex flex-col justify-between h-36 cursor-pointer hover:bg-emerald-950/40 transition text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <ClipboardCheck className="w-5 h-5 text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-emerald-400">Quiz</h3>
                  <p className="text-[13px] text-emerald-600 font-medium mt-0.5">Test your skills</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => alert('Opening Summary notes...')}
                className="bg-cyan-950/20 border border-cyan-900/20 rounded-2xl p-4 flex flex-col justify-between h-36 cursor-pointer hover:bg-cyan-950/30 transition text-left"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-400/20">
                  <FileText className="w-5 h-5 text-neutral-900" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-cyan-400">Summarize</h3>
                  <p className="text-[13px] text-cyan-600 font-medium mt-0.5">Review notes</p>
                </div>
              </button>
            </div>

            <div className="mb-3 flex-shrink-0">
              <h2 className="text-base font-semibold tracking-wide">Continue learning</h2>
              <p className="text-[14px] text-muted mt-0.5">Your curated learning path</p>
            </div>

            <div className="space-y-2.5">
              {courses.map((course) => {
                const Icon = course.icon;
                return (
                  <div
                    key={course.name}
                    className="flex items-center gap-3 bg-dashboard-card border border-neutral-800/40 rounded-xl p-3"
                  >
                    <div className={`w-10 h-10 rounded-lg border flex items-center justify-center flex-shrink-0 ${course.iconBg}`}>
                      <Icon className={`w-5 h-5 ${course.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold truncate">{course.name}</h4>
                      <p className="text-[13px] text-muted mt-0.5">{course.detail}</p>
                    </div>
                    <button
                      type="button"
                      disabled={course.disabled}
                      onClick={() => !course.disabled && alert(`Starting ${course.name}...`)}
                      className={`text-[13px] font-bold px-3 py-1.5 rounded-full shadow-md transition cursor-pointer border-none ${course.actionClass} ${
                        course.disabled ? 'cursor-not-allowed' : ''
                      }`}
                    >
                      {course.action}
                    </button>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-6 text-neutral-500 text-sm">
            Elective cohort tracks will show up here once you choose a core focus.
          </div>
        )}
      </div>
    </div>
  );
}
