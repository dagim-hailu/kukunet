import { redirect } from 'next/navigation';
import { AuthPage } from '../../components/auth-page';
import { hasSessionCookie } from '../../lib/auth-proxy';

export default async function RegisterPage() {
  if (await hasSessionCookie()) {
    redirect('/dashboard');
  }

  return <AuthPage mode="register" />;
}
