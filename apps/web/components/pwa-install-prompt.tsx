'use client';

import { useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
}

function isIos(): boolean {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandalone(): boolean {
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    ('standalone' in navigator && (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

export function PwaInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    if (isStandalone()) {
      setInstalled(true);
      return;
    }

    const dismissedKey = localStorage.getItem('pwa-install-dismissed');
    if (dismissedKey === '1') {
      setDismissed(true);
    }

    const onBeforeInstall = (event: BeforeInstallPromptEvent) => {
      event.preventDefault();
      setDeferredPrompt(event);
      setDismissed(false);
    };

    const onInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    window.addEventListener('appinstalled', onInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
      window.removeEventListener('appinstalled', onInstalled);
    };
  }, []);

  function dismiss() {
    setDismissed(true);
    localStorage.setItem('pwa-install-dismissed', '1');
  }

  async function handleInstall() {
    if (deferredPrompt) {
      await deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setDeferredPrompt(null);
      if (choice.outcome === 'accepted') {
        setInstalled(true);
      }
      return;
    }

    setShowHint(true);
  }

  if (installed) {
    return null;
  }

  return (
    <>
      {!dismissed && (
        <div className="fixed bottom-20 left-4 right-4 z-[60] md:bottom-6 md:left-auto md:right-6 md:max-w-sm">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-2)] p-4 shadow-2xl transition-colors duration-300">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-[var(--text)]">Install KUKUNET Digital</p>
                <p className="text-[11px] text-[var(--text-2)] mt-1 leading-snug">
                  {deferredPrompt
                    ? 'Add to your home screen for one-tap access.'
                    : 'Install the app for a native-like experience.'}
                </p>
              </div>
              <button
                type="button"
                onClick={dismiss}
                className="text-neutral-500 hover:text-neutral-300"
                aria-label="Dismiss install prompt"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleInstall}
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition"
            >
              <Download className="w-4 h-4" />
              {deferredPrompt ? 'Install now' : 'How to install'}
            </button>
          </div>
        </div>
      )}

      {dismissed && (
        <button
          type="button"
          onClick={() => {
            setDismissed(false);
            localStorage.removeItem('pwa-install-dismissed');
          }}
          className="fixed bottom-20 right-4 z-[60] md:bottom-6 flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/30 hover:bg-emerald-500 transition"
          aria-label="Install app"
        >
          <Download className="w-4 h-4" />
          Install
        </button>
      )}

      {showHint && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-4"
          onClick={() => setShowHint(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-[var(--border)] bg-[var(--card-bg)] p-5 text-[var(--text)] shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold">How to install</h3>
            <ul className="mt-3 space-y-2 text-xs text-neutral-300 leading-relaxed list-disc pl-4">
              <li>
                <strong>Chrome desktop:</strong> Look for the install icon in the address bar (⊕ or monitor icon).
              </li>
              <li>
                <strong>Android Chrome:</strong> Menu → Install app, or tap Install now when the prompt appears.
              </li>
              <li>
                <strong>iPhone/iPad:</strong> Safari → Share → Add to Home Screen.
              </li>
              {!deferredPrompt && !isIos() && (
                <li>
                  <strong>Not seeing install?</strong> Use production mode: <code className="text-emerald-400">npm run build && npm run start</code>, then visit localhost:3000.
                </li>
              )}
            </ul>
            <button
              type="button"
              onClick={() => setShowHint(false)}
              className="mt-4 w-full rounded-xl bg-neutral-800 py-2 text-xs font-semibold"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}
