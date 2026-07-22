'use client';

import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Bell,
  Binary,
  Code2,
  Laptop,
  LayoutGrid,
  Palette,
  Radio,
  Search,
  Star,
  Terminal,
  Trophy,
  Video,
} from 'lucide-react';
import { useState } from 'react';
import { ThemeToggle } from '../theme-toggle';

const categories = [
  { label: 'Category', icon: LayoutGrid, bg: 'bg-emerald-950/40', border: 'border-emerald-900/30', color: 'text-emerald-400' },
  { label: 'Live class', icon: Radio, bg: 'bg-cyan-950/40', border: 'border-cyan-900/30', color: 'text-cyan-400' },
  { label: 'Free course', icon: Award, bg: 'bg-emerald-950/40', border: 'border-emerald-900/30', color: 'text-emerald-400' },
  { label: 'Resources', icon: Laptop, bg: 'bg-rose-950/40', border: 'border-rose-900/30', color: 'text-rose-400' },
  { label: 'Recorded', icon: Video, bg: 'bg-cyan-950/40', border: 'border-cyan-900/30', color: 'text-cyan-400' },
  { label: 'Leaderboard', icon: Trophy, bg: 'bg-emerald-950/40', border: 'border-emerald-900/30', color: 'text-emerald-400' },
] as const;

const courses = [
  { name: 'HTML, CSS, JS', rating: '8.9', icon: Code2, bg: 'bg-emerald-950/30', border: 'border-emerald-900/20', hover: 'group-hover:bg-emerald-950/50', color: 'text-emerald-400' },
  { name: 'Graphics Design', rating: '8.5', icon: Palette, bg: 'bg-cyan-950/30', border: 'border-cyan-900/20', hover: 'group-hover:bg-cyan-950/50', color: 'text-cyan-400' },
  { name: 'AI Prompts', rating: '9.2', icon: Terminal, bg: 'bg-amber-950/20', border: 'border-amber-900/20', hover: 'group-hover:bg-amber-950/30', color: 'text-amber-500' },
  { name: 'Python', rating: '8.7', icon: Binary, bg: 'bg-purple-950/20', border: 'border-purple-900/20', hover: 'group-hover:bg-purple-950/30', color: 'text-purple-400' },
] as const;

export function MobileHomeView() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex flex-col min-h-full bg-[var(--bg)] text-[var(--text)] transition-colors duration-300">
      <div className="flex flex-col flex-1 overflow-y-auto scrollbar-none px-6 pt-6 pb-4">
        <div className="flex justify-between items-start mb-5 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-wide">Home</h1>
            <p className="text-xs text-muted mt-1">Pick up where you left off</p>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              className="p-1 hover:opacity-80 transition"
              onClick={() => alert('Notifications: All caught up.')}
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6 text-emerald-500 fill-emerald-500/10" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-dashboard-card border border-neutral-800 rounded-xl px-4 py-3 mb-5 flex-shrink-0">
          <Search className="w-4 h-4 text-neutral-500 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses, tracks, topics"
            className="bg-transparent text-xs w-full outline-none text-neutral-300 placeholder-neutral-500 border-none p-0 focus:ring-0"
          />
        </div>

        <div className="grid grid-cols-3 gap-y-5 gap-x-2 mb-6 flex-shrink-0">
          {categories.map(({ label, icon: Icon, bg, border, color }) => (
            <div key={label} className="flex flex-col items-center text-center gap-2 cursor-pointer group">
              <div className={`w-11 h-11 rounded-full ${bg} border ${border} flex items-center justify-center group-hover:scale-105 transition`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <span className="text-[10px] text-neutral-400 font-medium">{label}</span>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-emerald-900/40 to-cyan-950/40 border border-emerald-800/30 rounded-2xl p-4 mb-6 flex items-center justify-between flex-shrink-0 shadow-lg">
          <div className="max-w-[65%]">
            <h3 className="text-xs font-bold text-neutral-200">Ready to level up?</h3>
            <p className="text-[10px] text-neutral-400 mt-0.5 leading-tight">Register for new cohort tracks today.</p>
          </div>
          <Link
            href="/register"
            className="bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white text-[11px] font-bold px-3.5 py-2 rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1"
          >
            <span>Register</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex-shrink-0">
          <div className="flex justify-between items-baseline mb-3">
            <h2 className="text-sm font-semibold tracking-wide">Recommended for you</h2>
            <button
              type="button"
              onClick={() => alert('Viewing more recommended items...')}
              className="text-xs text-emerald-500 font-semibold hover:underline bg-transparent border-none cursor-pointer"
            >
              More
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
            {courses.map(({ name, rating, icon: Icon, bg, border, hover, color }) => (
              <div key={name} className="flex-shrink-0 w-28 cursor-pointer group">
                <div className={`h-20 rounded-2xl ${bg} border ${border} flex items-center justify-center mb-2 ${hover} transition`}>
                  <Icon className={`w-7 h-7 ${color}`} />
                </div>
                <p className="text-xs font-medium truncate">{name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="text-[11px] text-neutral-400 font-bold">{rating}</span>
                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
