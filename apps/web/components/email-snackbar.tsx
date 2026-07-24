'use client';

import React, { useEffect, useState } from 'react';

interface EmailSnackbarProps {
  isVisible: boolean;
  email: string;
  onClose?: () => void;
  durationMs?: number;
}

export function EmailSnackbar({
  isVisible,
  email,
  onClose,
  durationMs = 6000,
}: EmailSnackbarProps) {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible && durationMs > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        if (onClose) onClose();
      }, durationMs);
      return () => clearTimeout(timer);
    }
  }, [isVisible, durationMs, onClose]);

  if (!show) return null;

  return (
    <div className="fixed top-5 right-5 z-[200] max-w-sm w-full transition-all duration-500 ease-out transform translate-y-0 opacity-100 animate-slide-in-down">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-900/95 border border-emerald-500/40 p-4 shadow-2xl shadow-emerald-950/40 backdrop-blur-xl text-neutral-100 flex items-start gap-3.5">
        {/* Glowing background ambient light */}
        <div className="absolute -top-10 -left-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Email Icon with pulse ring */}
        <div className="relative flex-shrink-0 mt-0.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-inner">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-neutral-900"></span>
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 pr-2">
          <div className="flex items-center gap-1.5">
            <h4 className="text-xs font-bold text-white tracking-wide">
              Confirmation Email Sent
            </h4>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
              Dispatched
            </span>
          </div>
          <p className="text-[11px] text-neutral-300 mt-0.5 leading-snug break-all">
            Welcome & enrollment details delivered to{' '}
            <span className="font-semibold text-emerald-300">{email}</span>
          </p>
        </div>

        {/* Close Button */}
        <button
          type="button"
          onClick={() => {
            setShow(false);
            if (onClose) onClose();
          }}
          className="flex-shrink-0 text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800 transition-colors"
          aria-label="Dismiss snackbar"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Animated Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-800">
          <div
            className="h-full bg-emerald-500 animate-progress-shrink"
            style={{ animationDuration: `${durationMs}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
