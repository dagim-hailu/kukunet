'use client';

import { useDashboard } from '../../app/dashboard/layout';
import { Search, Bell, LayoutGrid, List, SlidersHorizontal, Plus, BookOpen, Star } from 'lucide-react';
import Link from 'next/link';
import type { Course } from '../../lib/types';

const COURSE_CARDS = [
  { id: 1, course: 'Graphics' as Course, category: 'DESIGN', categoryIcon: '🎨', title: 'Web Design\nFundamentals', lessons: 12, workshops: 4, gradient: 'linear-gradient(135deg,#f0c040,#f5a623)', emoji: '🖌️', saved: true, status: 'active' as const, progress: 68 },
  { id: 2, course: 'WebDev' as Course, category: 'SKILLS', categoryIcon: '💻', title: 'Frontend\nDevelopment', description: 'Build responsive and interactive web applications with modern frameworks.', lessons: 18, workshops: 6, gradient: 'linear-gradient(135deg,#e0378c,#b92d7a)', emoji: '⚡', saved: false, status: 'active' as const, progress: 35 },
  { id: 3, course: 'AI' as Course, category: 'AI & ML', categoryIcon: '🤖', title: 'AI & Machine\nLearning', lessons: 22, workshops: 8, gradient: 'linear-gradient(135deg,#7c3aed,#5b21b6)', emoji: '🧠', saved: true, status: 'active' as const, progress: 12 },
  { id: 4, course: 'Python' as Course, category: 'PROGRAMMING', categoryIcon: '🐍', title: 'Python\nProgramming', lessons: 20, workshops: 7, gradient: 'linear-gradient(135deg,#3730a3,#4f46e5)', emoji: '💻', saved: false, status: 'active' as const, progress: 45 },
  { id: 5, course: 'WebDev' as Course, category: 'BACKEND', categoryIcon: '🚀', title: 'Full Stack\nWeb Dev', lessons: 24, workshops: 8, gradient: 'linear-gradient(135deg,#0891b2,#06b6d4)', emoji: '🌐', saved: true, status: 'upcoming' as const, daysLeft: 5 },
];

type CourseCard = (typeof COURSE_CARDS)[number];

export function DesktopHomeView() {
  const { profile, summary } = useDashboard();

  if (!profile || !summary) return null;

  const selectedCourses = profile.user.selectedCourses;
  const filteredCourses = COURSE_CARDS.filter(card => selectedCourses.includes(card.course));
  const firstName = profile.user.name.split(' ')[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, minHeight: '100%' }}>
      {/* ── Header ───────────────────────────────────────────── */}
      <div className="dhv-header">
        <div>
          <h1 className="dhv-title">My Courses</h1>
          <p className="dhv-subtitle">
            Welcome back, <span className="dhv-accent">{firstName}</span> — keep learning!
          </p>
        </div>
        <div className="dhv-header-actions">
          <div className="dhv-search">
            <Search size={15} className="dhv-search-icon" />
            <input type="text" placeholder="Search courses..." className="dhv-search-input" />
          </div>
          <button type="button" className="dhv-icon-btn"><Bell size={16} /></button>
          <Link href="/dashboard/track" className="dhv-enroll-btn">
            <Plus size={15} /> Enroll Now
          </Link>
        </div>
      </div>

      {/* ── Toolbar ──────────────────────────────────────────── */}
      <div className="dhv-toolbar">
        <div className="dhv-toolbar-left">
          <div className="dhv-view-toggle">
            <button type="button" className="dhv-view-btn dhv-view-btn--active"><LayoutGrid size={13} /></button>
            <button type="button" className="dhv-view-btn"><List size={13} /></button>
          </div>
          <div className="dhv-filter">
            <SlidersHorizontal size={14} />
            <span>Sort by:</span>
            <select className="dhv-select">
              <option>None</option><option>Progress</option><option>Name</option>
            </select>
          </div>
          <div className="dhv-filter">
            <span>Type:</span>
            <select className="dhv-select">
              <option>All</option><option>Design</option><option>Technology</option><option>Business</option>
            </select>
          </div>
        </div>
        <p className="dhv-count">Enrolled in <strong>{filteredCourses.length} courses</strong></p>
      </div>

      {/* ── Stats ────────────────────────────────────────────── */}
      <div className="dhv-stats">
        {[
          { label: 'Enrolled', value: String(summary.overviewMetrics[0]?.value ?? filteredCourses.length), accent: true },
          { label: 'Completed', value: summary.overviewMetrics[1]?.value ?? '2', accent: true },
          { label: 'In Progress', value: summary.overviewMetrics[2]?.value ?? String(filteredCourses.length), accent: false },
          { label: 'Certificates', value: summary.overviewMetrics[3]?.value ?? '1', accent: true },
        ].map((s) => (
          <div key={s.label} className="dhv-stat-card">
            <p className="dhv-stat-label">{s.label}</p>
            <p className={'dhv-stat-value' + (s.accent ? ' dhv-stat-value--accent' : '')}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* ── Course Grid ──────────────────────────────────────── */}
      <div className="dhv-grid">
        {filteredCourses.map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
    </div>
  );
}

function CourseCard({ course }: { course: CourseCard }) {
  const isActive = course.status === 'active';
  const isUpcoming = course.status === 'upcoming';
  return (
    <div className="dhv-card" style={{ background: course.gradient }}>
      <div className="dhv-card-inner">
        <div className="dhv-card-top">
          <span className="dhv-card-badge">{course.categoryIcon} {course.category}</span>
          <button type="button" className="dhv-card-star">
            <Star size={13} fill={course.saved ? '#fff' : 'none'} stroke="#fff" />
          </button>
        </div>
        <div className="dhv-card-body">
          <h3 className="dhv-card-title">{course.title}</h3>
          {course.description && <p className="dhv-card-desc">{course.description}</p>}
        </div>
        <div className="dhv-card-footer">
          {isActive && typeof course.progress === 'number' && (
            <div className="dhv-card-progress">
              <div className="dhv-progress-track">
                <div className="dhv-progress-fill" style={{ width: course.progress + '%' }} />
              </div>
              <p className="dhv-progress-label">{course.progress}% complete</p>
            </div>
          )}
          <div className="dhv-card-meta">
            {isUpcoming ? (
              <span className="dhv-card-meta-text"><BookOpen size={12} /> Starts in {(course as { daysLeft?: number }).daysLeft} days</span>
            ) : (
              <span className="dhv-card-meta-text"><BookOpen size={12} /> {course.lessons} lessons | {course.workshops} workshops</span>
            )}
            <span className="dhv-card-emoji">{course.emoji}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
