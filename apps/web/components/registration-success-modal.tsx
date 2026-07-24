'use client';

import React from 'react';
import type { Course } from '../lib/types';

interface RegistrationSuccessModalProps {
  isOpen: boolean;
  name: string;
  email: string;
  category: 'kids' | 'adult' | null;
  customDetail?: string;
  selectedCourses: Course[];
  onProceed: () => void;
}

const COURSE_PRICE = 4500;

export function RegistrationSuccessModal({
  isOpen,
  name,
  email,
  category,
  customDetail,
  selectedCourses,
  onProceed,
}: RegistrationSuccessModalProps) {
  if (!isOpen) return null;

  const courseCount = selectedCourses.length > 0 ? selectedCourses.length : 1;
  const totalPrice = courseCount * COURSE_PRICE;

  const CheckCircleIcon = () => (
    <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );

  const UserIcon = () => (
    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const MailIcon = () => (
    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const TrackIcon = () => (
    <svg className="w-4 h-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );

  const ArrowRightIcon = () => (
    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border-2)] bg-[var(--bg-2)] p-6 shadow-2xl text-[var(--text)] transition-colors duration-300 relative overflow-hidden">
        
        {/* Decorative Top Ambient Glow */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header Icon & Title */}
        <div className="text-center relative z-10">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-3">
            <CheckCircleIcon />
          </div>
          <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-2">
            Registration Confirmed
          </span>
          <h2 className="text-xl font-bold tracking-tight text-[var(--text)]">
            Welcome to KUKUNET Digital!
          </h2>
          <p className="text-xs text-[var(--text-2)] mt-1">
            Your account has been successfully created.
          </p>

          {/* Email Sent Banner Notification */}
          <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium animate-pulse">
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span>Confirmation email sent to <strong>{email}</strong></span>
          </div>
        </div>

        {/* Basic User Information Card */}
        <div className="mt-5 rounded-2xl bg-[var(--bg-3)] border border-[var(--border)] p-4 space-y-2.5 relative z-10">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-3)] mb-1">
            Member Profile
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <div className="p-1.5 rounded-lg bg-[var(--bg-2)] border border-[var(--border)]">
              <UserIcon />
            </div>
            <span className="text-[var(--text-2)]">Name:</span>
            <span className="font-semibold text-[var(--text)] ml-auto">{name || 'Member'}</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <div className="p-1.5 rounded-lg bg-[var(--bg-2)] border border-[var(--border)]">
              <MailIcon />
            </div>
            <span className="text-[var(--text-2)]">Email:</span>
            <span className="font-semibold text-[var(--text)] ml-auto truncate max-w-[200px]">{email}</span>
          </div>

          <div className="flex items-center gap-2.5 text-xs">
            <div className="p-1.5 rounded-lg bg-[var(--bg-2)] border border-[var(--border)]">
              <TrackIcon />
            </div>
            <span className="text-[var(--text-2)]">Track:</span>
            <span className="font-semibold text-emerald-400 ml-auto">
              {category === 'kids' ? 'Kids Program' : category === 'adult' ? 'Adult Track' : 'Standard Track'}
              {customDetail ? ` (${customDetail})` : ''}
            </span>
          </div>
        </div>

        {/* Course Pricing Breakdown Card */}
        <div className="mt-4 rounded-2xl bg-[var(--bg-3)] border border-[var(--border)] p-4 space-y-3 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-3)]">
              Enrollment Summary
            </span>
            <span className="text-[11px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
              $4,500 / course
            </span>
          </div>

          {/* Course List */}
          <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1 scrollbar-none">
            {selectedCourses.map((course) => (
              <div key={course} className="flex items-center justify-between py-1.5 px-2.5 rounded-xl bg-[var(--bg-2)] border border-[var(--border)] text-xs">
                <span className="font-medium text-[var(--text)] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  {course} Course
                </span>
                <span className="font-semibold text-[var(--text-2)]">${COURSE_PRICE.toLocaleString()}</span>
              </div>
            ))}
          </div>

          {/* Price Calculations */}
          <div className="pt-2 border-t border-[var(--border)] space-y-1.5">
            <div className="flex items-center justify-between text-xs text-[var(--text-2)]">
              <span>Selected Courses:</span>
              <span className="font-medium text-[var(--text)]">{courseCount}</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[var(--text-2)]">
              <span>Price per Course:</span>
              <span className="font-medium text-[var(--text)]">${COURSE_PRICE.toLocaleString()}</span>
            </div>

            {/* Total Highlight Box */}
            <div className="mt-2 flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-950/40 via-emerald-900/30 to-sky-950/40 border border-emerald-500/40 shadow-inner">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Total Amount
              </span>
              <span className="text-lg font-extrabold text-emerald-400 tracking-tight">
                ${totalPrice.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={onProceed}
          className="mt-5 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 px-4 text-xs font-bold shadow-lg shadow-emerald-600/20 active:scale-95 transition-all duration-300 cursor-pointer relative z-10"
        >
          <span>Continue to Workspace Dashboard</span>
          <ArrowRightIcon />
        </button>

      </div>
    </div>
  );
}
