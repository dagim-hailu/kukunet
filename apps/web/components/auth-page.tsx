'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Logo } from './logo';
import type { LoginRequest, RegisterRequest, Course } from '../lib/types';

type AuthMode = 'login' | 'register';

interface AuthPageProps {
  mode: AuthMode;
}

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  selectedCourses?: string;
  form?: string;
}

const passwordRules = [
  'At least 8 characters',
  'One uppercase letter',
  'One lowercase letter',
  'One number',
  'One special character',
];

const AVAILABLE_COURSES: Course[] = ['Python', 'AI', 'WebDev', 'Graphics'];

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,128}$/.test(
    password,
  );
}

export function AuthPage({ mode }: AuthPageProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCourses, setSelectedCourses] = useState<Course[]>([]);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // States for register.html interactive category selector
  const [chosenCategory, setChosenCategory] = useState<'kids' | 'adult' | null>(null);
  const [customFieldVal, setCustomFieldVal] = useState('');

  const isRegister = mode === 'register';

  // SVG Icons helper matching Lucide exactly
  const ChevronLeftIcon = () => (
    <svg className="w-5 h-5 text-neutral-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );

  const UserIcon = ({ className = 'w-4 h-4 text-neutral-500' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );

  const MailIcon = () => (
    <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );

  const CalendarIcon = () => (
    <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );

  const LockIcon = () => (
    <svg className="w-4 h-4 text-neutral-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );

  const SmileIcon = ({ className = 'w-6 h-6 text-neutral-500' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" y1="9" x2="9.01" y2="9" />
      <line x1="15" y1="9" x2="15.01" y2="9" />
    </svg>
  );

  const RocketIcon = ({ className = 'w-6 h-6 text-neutral-500' }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.5 16.5c-1.5 1.25-2.5 3.5-2.5 3.5s2.25-1 3.5-2.5" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 2.1.6 4.1 1.7 5.7l12.6-12.6C14.7 4 13.5 3.3 12 2z" />
      <path d="M22 2s-3 1-5 4L8 15c-3 3-5 5-5 5s2-2 5-5l9-9c3-2 4-5 4-5z" />
      <circle cx="12" cy="9" r="1" />
    </svg>
  );

  function toggleCourse(course: Course) {
    if (selectedCourses.includes(course)) {
      setSelectedCourses(prev => prev.filter(c => c !== course));
    } else {
      setSelectedCourses(prev => [...prev, course]);
    }
  }

  function getValidationErrors(): FieldErrors {
    const nextErrors: FieldErrors = {};

    if (isRegister && name.trim().length === 0) {
      nextErrors.name = 'Your name is required.';
    }

    if (!validateEmail(email.trim())) {
      nextErrors.email = 'Enter a valid email address.';
    }

    if (!validatePassword(password)) {
      nextErrors.password =
        'Password must include uppercase, lowercase, number, and special character.';
    }

    if (isRegister && confirmPassword !== password) {
      nextErrors.confirmPassword = 'Password confirmation does not match.';
    }

    if (isRegister && selectedCourses.length === 0) {
      nextErrors.selectedCourses = 'Please select at least one course.';
    }

    return nextErrors;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = getValidationErrors();

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const body: LoginRequest | RegisterRequest = isRegister
        ? {
            name: name.trim(),
            email: email.trim(),
            password,
            confirmPassword,
            selectedCourses,
          }
        : {
            email: email.trim(),
            password,
          };
      const response = await fetch(
        isRegister ? '/api/auth/register' : '/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        },
      );
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        setErrors({
          form: payload?.message || 'The request could not be completed.',
        });
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setErrors({
        form: 'A network error interrupted the request. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex items-stretch md:items-center justify-center md:p-6 transition-colors duration-300">
      
      {/* Mobile: full viewport. Desktop (768px+): centered card matching reference proportions */}
      <div className="w-full min-h-[100dvh] md:min-h-0 md:w-[360px] md:h-[740px] bg-[var(--bg-2)] border-[var(--border)] md:rounded-[40px] md:border p-6 flex flex-col justify-between md:shadow-2xl overflow-hidden relative">
        
        {/* Top Navigation Bar */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <Link href="/" className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-neutral-700 transition">
            <ChevronLeftIcon />
          </Link>
          <h1 className="text-base font-bold tracking-wide text-white">
            {isRegister ? 'Create Account' : 'Sign In'}
          </h1>
          <div className="w-8"></div>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto pr-1 scrollbar-none space-y-5 pb-4">
          <div className="text-center">
            <p className="text-xs text-neutral-400">
              {isRegister ? 'Choose your personalized learning track' : 'Access your secure workspace dashboard'}
            </p>
          </div>

          {/* Interactive Category Selector Cards (Register only) */}
          {isRegister && (
            <div className="grid grid-cols-2 gap-4">
              {/* Kids Program Card */}
              <div
                onClick={() => setChosenCategory('kids')}
                className={`relative bg-[var(--bg-3)] border border-[var(--border)] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 transform ${
                  chosenCategory === 'kids'
                    ? 'border-amber-500/80 scale-[1.04] shadow-lg shadow-amber-500/5'
                    : 'border-neutral-800/80 hover:scale-[1.03]'
                }`}
              >
                {chosenCategory === 'kids' && <div className="absolute inset-0 bg-amber-500/5 rounded-2xl"></div>}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                  chosenCategory === 'kids' ? 'bg-amber-500 shadow-md shadow-amber-500/20' : 'bg-neutral-800/80'
                }`}>
                  <SmileIcon className={`w-6 h-6 ${chosenCategory === 'kids' ? 'text-neutral-950 font-bold' : 'text-neutral-500'}`} />
                </div>
                <h3 className={`text-xs font-bold ${chosenCategory === 'kids' ? 'text-amber-400' : 'text-neutral-400'}`}>
                  Kids Program
                </h3>
                <p className="text-[9px] text-neutral-500 mt-1 leading-tight">Gamified basics, ages 8-15</p>
              </div>

              {/* Adult Track Card */}
              <div
                onClick={() => setChosenCategory('adult')}
                className={`relative bg-[var(--bg-3)] border border-[var(--border)] rounded-2xl p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 transform ${
                  chosenCategory === 'adult'
                    ? 'border-emerald-500/80 scale-[1.04] shadow-lg shadow-emerald-500/5'
                    : 'border-neutral-800/80 hover:scale-[1.03]'
                }`}
              >
                {chosenCategory === 'adult' && <div className="absolute inset-0 bg-emerald-500/5 rounded-2xl"></div>}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-all duration-300 ${
                  chosenCategory === 'adult' ? 'bg-emerald-500 shadow-md shadow-emerald-500/20' : 'bg-neutral-800/80'
                }`}>
                  <RocketIcon className={`w-6 h-6 ${chosenCategory === 'adult' ? 'text-neutral-950 font-bold' : 'text-neutral-500'}`} />
                </div>
                <h3 className={`text-xs font-bold ${chosenCategory === 'adult' ? 'text-emerald-400' : 'text-neutral-400'}`}>
                  Adult Track
                </h3>
                <p className="text-[9px] text-neutral-500 mt-1 leading-tight">Professional tech skillsets</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form className="space-y-3 pt-1" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 pl-1">Full Name</label>
                <div className="flex items-center gap-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl px-4 py-3 focus-within:border-emerald-500 transition-all duration-300">
                  <UserIcon />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="bg-transparent text-xs w-full outline-none text-neutral-200 placeholder-neutral-600 border-none p-0 focus:ring-0"
                  />
                </div>
                {errors.name && <span className="text-xs text-rose-400 pl-1">{errors.name}</span>}
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 pl-1">Email Address</label>
              <div className="flex items-center gap-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl px-4 py-3 focus-within:border-emerald-500 transition-all duration-300">
                <MailIcon />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="bg-transparent text-xs w-full outline-none text-neutral-200 placeholder-neutral-600 border-none p-0 focus:ring-0"
                />
              </div>
              {errors.email && <span className="text-xs text-rose-400 pl-1">{errors.email}</span>}
            </div>

            {/* Custom Variable Field depending on selection (Register only) */}
            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 pl-1">
                  {chosenCategory === 'kids'
                    ? "Child's Age / Grade Level"
                    : chosenCategory === 'adult'
                    ? "Current Occupation / Target Field"
                    : "Age / Grade Level"}
                </label>
                <div className="flex items-center gap-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl px-4 py-3 focus-within:border-emerald-500 transition-all duration-300">
                  <CalendarIcon />
                  <input
                    type="text"
                    required
                    value={customFieldVal}
                    onChange={(e) => setCustomFieldVal(e.target.value)}
                    placeholder={
                      chosenCategory === 'kids'
                        ? 'e.g., 11 years old / 6th Grade'
                        : chosenCategory === 'adult'
                        ? 'e.g., University Student / Web Designer'
                        : 'Specify details'
                    }
                    className="bg-transparent text-xs w-full outline-none text-neutral-200 placeholder-neutral-600 border-none p-0 focus:ring-0"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 pl-1">Password</label>
              <div className="flex items-center gap-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl px-4 py-3 focus-within:border-emerald-500 transition-all duration-300">
                <LockIcon />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent text-xs w-full outline-none text-neutral-200 placeholder-neutral-600 border-none p-0 focus:ring-0"
                />
              </div>
              {errors.password && <span className="text-xs text-rose-400 pl-1">{errors.password}</span>}
            </div>

            {/* Confirm Password (Register only) */}
            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 pl-1">Confirm Password</label>
                <div className="flex items-center gap-3 bg-[var(--bg-3)] border border-[var(--border)] rounded-xl px-4 py-3 focus-within:border-emerald-500 transition-all duration-300">
                  <LockIcon />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="bg-transparent text-xs w-full outline-none text-neutral-200 placeholder-neutral-600 border-none p-0 focus:ring-0"
                  />
                </div>
                {errors.confirmPassword && <span className="text-xs text-rose-400 pl-1">{errors.confirmPassword}</span>}
              </div>
            )}

            {/* Course Selection (Register only) */}
            {isRegister && (
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-neutral-400 mb-1.5 pl-1">Select Your Courses</label>
                <div className="grid grid-cols-2 gap-2">
                  {AVAILABLE_COURSES.map((course) => (
                    <button
                      key={course}
                      type="button"
                      onClick={() => toggleCourse(course)}
                      className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-xs font-bold transition-all duration-300 ${
                        selectedCourses.includes(course)
                          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                          : 'border-neutral-800 bg-[var(--bg-3)] text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      {course}
                    </button>
                  ))}
                </div>
                {errors.selectedCourses && <span className="text-xs text-rose-400 pl-1 mt-1.5 block">{errors.selectedCourses}</span>}
              </div>
            )}

            {/* General form errors */}
            {errors.form && (
              <div className="rounded-xl border border-rose-300/20 bg-rose-400/10 px-4 py-3 text-xs text-rose-200">
                {errors.form}
              </div>
            )}

            {/* Terms Row (Register only) */}
            {isRegister && (
              <div className="flex items-start gap-2.5 pt-1 pl-1">
                <input type="checkbox" required className="accent-emerald-500 mt-0.5 rounded cursor-pointer" />
                <span className="text-[10px] text-neutral-400 leading-snug">
                  I accept the Kukunet Digital Privacy Policy and terms of use.
                </span>
              </div>
            )}

            {/* Submit Button */}
            {isRegister ? (
              <button
                type="submit"
                disabled={!chosenCategory || isSubmitting}
                className={`w-full text-xs font-bold py-3.5 rounded-xl shadow-lg active:scale-95 transition-all duration-300 mt-4 cursor-pointer border-none outline-none ${
                  !chosenCategory
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                    : chosenCategory === 'kids'
                    ? 'bg-amber-500 hover:bg-amber-400 text-neutral-950 shadow-amber-500/10'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/10'
                }`}
              >
                {isSubmitting
                  ? 'Creating account...'
                  : chosenCategory === 'kids'
                  ? 'Register for Kids Track'
                  : chosenCategory === 'adult'
                  ? 'Register for Adult Track'
                  : 'Select a category first'}
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full text-xs font-bold py-3.5 rounded-xl shadow-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/10 active:scale-95 transition-all duration-300 mt-4 cursor-pointer border-none outline-none"
              >
                {isSubmitting ? 'Signing in...' : 'Sign In'}
              </button>
            )}
          </form>
        </div>

        {/* Footer links */}
        <div className="text-center pt-3 border-t border-neutral-800/60 flex-shrink-0">
          <p className="text-[11px] text-neutral-500">
            {isRegister ? (
              <>
                Already have an account?{' '}
                <Link href="/login" className="text-emerald-500 font-semibold hover:underline">
                  Log In
                </Link>
              </>
            ) : (
              <>
                Need a new account?{' '}
                <Link href="/register" className="text-emerald-500 font-semibold hover:underline">
                  Register
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </main>
  );
}
