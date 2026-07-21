import { redirect } from 'next/navigation';
import { LandingPage } from '../components/landing-page';
import { MobileLandingEntry } from '../components/mobile/mobile-landing-entry';
import { hasSessionCookie } from '../lib/auth-proxy';

export default async function Home() {
  if (await hasSessionCookie()) {
    redirect('/dashboard');
  }

  return (
    <div suppressHydrationWarning>
      <div className="md:hidden">
        <MobileLandingEntry />
      </div>
      <div className="hidden md:block">
        <LandingPage />
      </div>
    </div>
  );
}
