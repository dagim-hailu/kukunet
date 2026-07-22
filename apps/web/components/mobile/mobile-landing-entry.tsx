'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Sparkles } from 'lucide-react';
import { ThemeToggle } from '../theme-toggle';

export function MobileLandingEntry() {
  return (
    <div className="min-h-[100dvh] bg-[var(--bg)] text-[var(--text)] flex flex-col transition-colors duration-300">
      <div className="flex-1 flex flex-col px-6 pt-12 pb-8">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <span className="text-xl font-bold text-emerald-500">K</span>
            </div>
            <div>
              <p className="text-base font-bold tracking-wide">KUKUNET Digital</p>
              <p className="text-[13px] text-muted">Mobile learning app</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="mb-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[13px] font-semibold text-emerald-500 mb-4">
            <Sparkles className="w-4 h-4" />
            PWA ready · Installable
          </div>
          <h1 className="text-4xl font-bold tracking-tight leading-tight">
            Learn anywhere with your personalized track
          </h1>
          <p className="text-base text-muted mt-3 leading-relaxed">
            Sign in to access Home, Track, Progress, and Profile — the full mobile experience from the reference designs.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          {['Home', 'Track', 'Progress', 'Profile'].map((tab) => (
            <div
              key={tab}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] px-4 py-3 text-center shadow-sm"
            >
              <BookOpen className="w-5 h-5 text-emerald-500 mx-auto mb-1.5" />
              <span className="text-[13px] font-semibold text-[var(--text-2)]">{tab}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto space-y-3">
          <Link
            href="/login"
            className="flex items-center justify-center gap-2 w-full bg-emerald-600 hover:bg-emerald-500 text-white text-base font-bold py-3.5 rounded-xl shadow-lg shadow-emerald-600/20 transition"
          >
            Sign In
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/register"
            className="flex items-center justify-center w-full bg-[var(--bg-2)] border border-[var(--border)] text-[var(--text)] text-base font-bold py-3.5 rounded-xl hover:bg-[var(--bg-3)] transition"
          >
            Create Account
          </Link>
          <p className="text-center text-[13px] text-muted pt-1">
            After signing in, you&apos;ll see the mobile dashboard with bottom navigation.
          </p>
        </div>
      </div>
    </div>
  );
}
