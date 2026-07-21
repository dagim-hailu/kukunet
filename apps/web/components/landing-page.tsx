'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './theme-toggle';

export function LandingPage() {
  useEffect(() => {
    const SCRIPT_ID = 'novapay-ticker-script';

    // Only inject once — duplicate causes "tickerData already declared" SyntaxError
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = '/templatemo-623-novapay-script.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // No cleanup removal — keeping the script alive avoids re-declaration on remount
  }, []);

  return (
    <div suppressHydrationWarning>
      {/* Ticker */}
      <div className="ticker">
        <div className="ticker-track" id="tickerTrack"></div>
      </div>

      {/* Nav */}
      <nav id="mainNav">
        <a href="#" className="nav-logo">
          <div className="nav-logo-mark">
            <img width="30" src="/images/kukunet mini.png" alt="KUKUNET digital" />
          </div>
          KUKUNET digital
        </a>
        <div className="nav-links">
          <a href="#features">Features</a>
          <a href="#dashboard">Platform</a>
          <a href="#pricing">Pricing</a>
          <a href="#security">Security</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-cta">
          <ThemeToggle />
          <Link href="/login" className="btn-ghost">Sign in</Link>
          <Link href="/register" className="btn-primary">Register Now</Link>
        </div>
        <button className="hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className="mobile-menu" id="mobileMenu">
        <a href="#features">Features</a>
        <a href="#dashboard">Platform</a>
        <a href="#pricing">Pricing</a>
        <a href="#security">Security</a>
        <a href="#faq">FAQ</a>
        <div className="flex items-center justify-between pt-2">
          <span className="text-sm text-[var(--text-2)] font-medium">Theme</span>
          <ThemeToggle />
        </div>
        <div className="m-btns">
          <Link href="/login" className="btn-ghost">Sign in</Link>
          <Link href="/register" className="btn-primary">Get started free</Link>
        </div>
      </div>

      {/* Hero */}
      <section className="hero" id="home">
        <div className="hero-content silk-reveal-left">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Build Your Vision with the KUKUNET Team.
          </div>
          <h1>Your One-Stop<br />Solution for<br /><span>Digital Innovation</span></h1>
          <p className="hero-sub">Welcome to KUKUNET digital. We are the gateway to inspiring and educational online learning experiences. With a variety of courses presented interactively and easily accessible.</p>
          <div className="hero-btns">
            <Link href="/register" className="btn-hero">
              Start for free
              <svg viewBox="0 0 16 16"><line x1="3" y1="8" x2="13" y2="8" /><polyline points="9,4 13,8 9,12" /></svg>
            </Link>
            <a href="#dashboard" className="btn-outline">See it in action</a>
          </div>
          <div className="hero-trust">
            <div className="hero-avatars">
              <span>AK</span><span>MR</span><span>JL</span><span>+</span>
            </div>
            <p className="hero-trust-text"><strong>12,000+</strong> businesses trust KUKUNET digital</p>
          </div>
        </div>
        <div className="hero-visual silk-reveal-right">
          <div className="float-badge fb-left">
            <div className="float-badge-icon" style={{ background: 'rgba(61,204,142,.12)' }}>
              <svg width="18" height="18" fill="none" stroke="#3DCC8E" strokeWidth="2" strokeLinecap="round" viewBox="0 0 18 18"><polyline points="2,12 7,7 11,10 16,4" /></svg>
            </div>

          </div>
          <div className="float-badge fb-right">
            <div className="float-badge-icon" style={{ background: 'rgba(61,204,142,.12)' }}>
              <svg width="18" height="18" fill="none" stroke="#3DCC8E" strokeWidth="2" strokeLinecap="round" viewBox="0 0 18 18"><circle cx="9" cy="9" r="7" /><polyline points="9,5 9,9 12,11" /></svg>
            </div>

          </div>
          <div className="dash-card">
            <div className="dash-topbar">
              <div className="dash-dots">
                <span style={{ background: '#E85A5A' }}></span>
                <span style={{ background: '#F0A030' }}></span>
                <span style={{ background: '#3DCC8E' }}></span>
              </div>
              <span className="dash-title-bar">KUKUNET DASHBOARD</span>
              <span style={{ fontSize: '10px', color: 'var(--green)', fontWeight: '500' }}>● Live</span>
            </div>
            <div className="dash-body">
              <div className="dash-stats">
                <div className="dash-stat">
                  <div className="dash-stat-label">Completed Websites</div>
                  <div className="dash-stat-val">30+</div>
                  <div className="dash-stat-change" style={{ color: 'var(--green)' }}>+2.4% today</div>
                </div>
                <div className="dash-stat">
                  <div className="dash-stat-label">Under Development</div>
                  <div className="dash-stat-val">12+</div>
                  <div className="dash-stat-change" style={{ color: 'var(--text3)' }}>This month</div>
                </div>
                <div className="dash-stat">
                  <div className="dash-stat-label">Total Student</div>
                  <div className="dash-stat-val">400+</div>
                  <div className="dash-stat-change" style={{ color: 'var(--green)' }}>+18% MoM</div>
                </div>
              </div>
              <div className="chart-wrap">
                <div className="chart-head">
                  <span className="chart-head-title">Course Duration — 7 Days</span>
                  <span className="chart-badge">+12.4%</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '64px' }}>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.18)', borderRadius: '3px 3px 0 0', height: '55%', borderTop: '2px solid var(--sky)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.18)', borderRadius: '3px 3px 0 0', height: '72%', borderTop: '2px solid var(--sky)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.18)', borderRadius: '3px 3px 0 0', height: '48%', borderTop: '2px solid var(--sky)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.18)', borderRadius: '3px 3px 0 0', height: '88%', borderTop: '2px solid var(--sky)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.18)', borderRadius: '3px 3px 0 0', height: '65%', borderTop: '2px solid var(--sky)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.25)', borderRadius: '3px 3px 0 0', height: '92%', borderTop: '2px solid var(--sky2)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.35)', borderRadius: '3px 3px 0 0', height: '100%', borderTop: '2px solid var(--sky2)' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '5px' }}>
                  <span style={{ fontSize: '10px', color: 'var(--text3)' }}>Mon</span>
                  <span style={{ fontSize: '10px', color: 'var(--text3)' }}>Tue</span>
                  <span style={{ fontSize: '10px', color: 'var(--text3)' }}>Wed</span>
                  <span style={{ fontSize: '10px', color: 'var(--text3)' }}>Thu</span>
                  <span style={{ fontSize: '10px', color: 'var(--text3)' }}>Fri</span>
                  <span style={{ fontSize: '10px', color: 'var(--text3)' }}>Sat</span>
                  <span style={{ fontSize: '10px', color: 'var(--sky)' }}>Today</span>
                </div>
              </div>
              <div className="tx-list">
                <div className="tx-item">
                  <div className="tx-icon" style={{ background: 'rgba(61,204,142,.12)', color: '#3DCC8E' }}>HTML</div>
                  <div className="tx-info">
                    <div className="tx-name">HTML, CSS & JavaScript Course</div>
                    <div className="tx-date">Today, 9:14 AM</div>
                  </div>
                  <div className="tx-amount" style={{ color: 'var(--green)' }}>+42</div>
                </div>
                <div className="tx-item">
                  <div className="tx-icon" style={{ background: 'rgba(61,204,142,.12)', color: '#3DCC8E' }}>GD</div>
                  <div className="tx-info">
                    <div className="tx-name">Graphic Design Course</div>
                    <div className="tx-date">Today, 9:14 AM</div>
                  </div>
                  <div className="tx-amount" style={{ color: 'var(--green)' }}>+38</div>
                </div>
                <div className="tx-item">
                  <div className="tx-icon" style={{ background: 'rgba(61,204,142,.12)', color: '#3DCC8E' }}>Prog</div>
                  <div className="tx-info">
                    <div className="tx-name">Python Programming Course</div>
                    <div className="tx-date">Today, 9:14 AM</div>
                  </div>
                  <div className="tx-amount" style={{ color: 'var(--green)' }}>+61</div>
                </div>
                <div className="tx-item">
                  <div className="tx-icon" style={{ background: 'rgba(61,204,142,.12)', color: '#3DCC8E' }}>AI</div>
                  <div className="tx-info">
                    <div className="tx-name">AI Prompt Engineering Course</div>
                    <div className="tx-date">Yesterday, 3:40 PM</div>
                  </div>
                  <div className="tx-amount" style={{ color: 'var(--green)' }}>+2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos */}
      <div className="logos-section">
        <div className="logos-label">Trusted by teams at</div>
        <div className="logos-track-wrap">
          <div className="logos-track" id="logosTrack"></div>
        </div>
      </div>

      {/* Stats */}
      <section className="stats-section">
        <div className="stat-block">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
          </div>
          <div className="stat-num" data-target="25" data-prefix="" data-suffix="+">0</div>
          <div className="stat-label">Projects Completed</div>
          <div className="stat-bar-wrap"><div className="stat-bar" style={{ width: '0%' }} data-width="92%"></div></div>
          <div className="stat-trend" style={{ color: 'var(--green)' }}>
            <svg viewBox="0 0 24 24"><polyline points="18,15 12,9 6,15" /></svg>
             ↑ 8 delivered this year
          </div>
        </div>
        <div className="stat-block">
          <div className="stat-icon">
            <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
          </div>
          <div className="stat-num" data-target="10" data-suffix="+">0</div>
          <div className="stat-label">Summer Courses Completed</div>
          <div className="stat-bar-wrap"><div className="stat-bar" style={{ width: '0%', background: '#3DCC8E' }} data-width="76%"></div></div>
          <div className="stat-trend" style={{ color: 'var(--green)' }}>
            <svg viewBox="0 0 24 24"><polyline points="18,15 12,9 6,15" /></svg>
             ↑ 3 certifications earned
          </div>
        </div>
        <div className="stat-block">
          <div className="stat-icon" style={{ background: 'rgba(61,204,142,.1)', borderColor: 'rgba(61,204,142,.15)' }}>
            <svg viewBox="0 0 24 24" style={{ stroke: 'var(--green)' }}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22,4 12,14.01 9,11.01" /></svg>
          </div>
          <div className="stat-num" data-target="95.98" data-suffix="%" data-decimal="2">0</div>
          <div className="stat-label">Project Success Rate</div>
          <div className="stat-bar-wrap"><div className="stat-bar" style={{ width: '0%', background: '#3DCC8E' }} data-width="99.98%"></div></div>
          <div className="stat-trend" style={{ color: 'var(--green)' }}>
            <svg viewBox="0 0 24 24"><polyline points="18,15 12,9 6,15" /></svg>
             ✓ High-quality deliverables
          </div>
        </div>
        <div className="stat-block">
          <div className="stat-icon" style={{ background: 'rgba(136,136,248,.1)', borderColor: 'rgba(136,136,248,.15)' }}>
            <svg viewBox="0 0 24 24" style={{ stroke: '#8888F8' }}><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
          </div>
          <div className="stat-num" data-target="500" data-suffix="+">0</div>
          <div className="stat-label">Hours of Coding & Learning</div>
          <div className="stat-bar-wrap"><div className="stat-bar" style={{ width: '0%', background: '#8888F8' }} data-width="88%"></div></div>
          <div className="stat-trend" style={{ color: '#8888F8' }}>
            <svg viewBox="0 0 24 24"><polyline points="18,15 12,9 6,15" /></svg>
             ↑ Continuous skill development
          </div>
        </div>
      </section>

      {/* Features — Sticky Stack */}
      <section className="features-section" id="features">
        <div className="features-header silk-reveal">
          <div className="section-tag">Platform features</div>
          <h2 className="section-title">Everything your business needs</h2>
          <p className="section-sub">One platform to send, receive, track, and grow. No switching between tools, no integration headaches.</p>
        </div>
        <div className="sticky-layout">
          <div className="sticky-cards">

            <div className="sticky-card active" data-panel="0">
              <div className="sticky-card-icon">
                <svg viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
              </div>
              <h3>Instant transfers</h3>
              <p>Move money globally in real-time. Send to bank accounts, wallets, or cards in 190+ countries with sub-second settlement and zero hidden fees.</p>
              <div className="sticky-card-pills">
                <span className="sc-pill">Real-time</span>
                <span className="sc-pill">190+ countries</span>
                <span className="sc-pill">Zero fees</span>
              </div>
            </div>

            <div className="sticky-card" data-panel="1">
              <div className="sticky-card-icon">
                <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
              </div>
              <h3>Smart analytics</h3>
              <p>AI-powered dashboards that surface what matters. Cashflow forecasting, anomaly detection, and custom reports built for finance teams.</p>
              <div className="sticky-card-pills">
                <span className="sc-pill">AI forecasting</span>
                <span className="sc-pill">Anomaly alerts</span>
                <span className="sc-pill">Custom reports</span>
              </div>
            </div>

            <div className="sticky-card" data-panel="2">
              <div className="sticky-card-icon">
                <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="2" /><line x1="2" y1="10" x2="22" y2="10" /></svg>
              </div>
              <h3>Multi-currency accounts</h3>
              <p>Hold, convert, and pay in 35+ currencies at interbank rates. Lock rates in advance and eliminate FX exposure with our hedging tools.</p>
              <div className="sticky-card-pills">
                <span className="sc-pill">35+ currencies</span>
                <span className="sc-pill">Interbank rates</span>
                <span className="sc-pill">FX hedging</span>
              </div>
            </div>

            <div className="sticky-card" data-panel="3">
              <div className="sticky-card-icon">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3>Enterprise security</h3>
              <p>Bank-grade encryption, SOC 2 Type II certified, and AI-driven fraud detection that blocks threats before they happen. Your money, protected 24/7.</p>
              <div className="sticky-card-pills">
                <span className="sc-pill">SOC 2</span>
                <span className="sc-pill">AI fraud detection</span>
                <span className="sc-pill">256-bit AES</span>
              </div>
            </div>

          </div>

          <div className="sticky-panel-wrap">
            <div className="sticky-panel">
              <div className="panel-topbar">
                <div className="panel-dots">
                  <span style={{ background: '#E85A5A' }}></span>
                  <span style={{ background: '#F0A030' }}></span>
                  <span style={{ background: '#3DCC8E' }}></span>
                </div>
                <span style={{ fontSize: '11px', color: 'var(--text3)', marginLeft: '8px' }} id="panelLabel">Transfers</span>
              </div>
              <div className="panel-content">

                {/* Panel 0: Transfers */}
                <div className="panel-view active" id="panel-0">
                  <div className="pm-row">
                    <div className="pm-card">
                      <div className="pm-label">Sent today</div>
                      <div className="pm-val">$24,800</div>
                      <div className="pm-change" style={{ color: 'var(--green)' }}>+8 transfers</div>
                    </div>
                    <div className="pm-card">
                      <div className="pm-label">Avg. speed</div>
                      <div className="pm-val">1.2s</div>
                      <div className="pm-change" style={{ color: 'var(--text3)' }}>Settlement</div>
                    </div>
                  </div>
                  <div className="pm-list">
                    <div className="pm-list-item">
                      <div className="pm-list-icon" style={{ background: 'rgba(61,204,142,.12)', color: '#3DCC8E' }}>US</div>
                      <div className="pm-list-info">
                        <div className="pm-list-name">Acme Corp — New York</div>
                        <div className="pm-list-sub">USD • Completed</div>
                      </div>
                      <div className="pm-list-amt" style={{ color: 'var(--green)' }}>+$8,200</div>
                    </div>
                    <div className="pm-list-item">
                      <div className="pm-list-icon" style={{ background: 'rgba(61,204,142,.12)', color: '#5CE8A8' }}>DE</div>
                      <div className="pm-list-info">
                        <div className="pm-list-name">Berlin Studio GmbH</div>
                        <div className="pm-list-sub">EUR • Processing</div>
                      </div>
                      <div className="pm-list-amt" style={{ color: 'var(--text2)' }}>€3,400</div>
                    </div>
                    <div className="pm-list-item">
                      <div className="pm-list-icon" style={{ background: 'rgba(61,204,142,.12)', color: '#3DCC8E' }}>JP</div>
                      <div className="pm-list-info">
                        <div className="pm-list-name">Tanaka Holdings</div>
                        <div className="pm-list-sub">JPY • Completed</div>
                      </div>
                      <div className="pm-list-amt" style={{ color: 'var(--green)' }}>+¥840K</div>
                    </div>
                  </div>
                </div>

                {/* Panel 1: Analytics */}
                <div className="panel-view" id="panel-1">
                  <div className="pm-row">
                    <div className="pm-card">
                      <div className="pm-label">Revenue forecast</div>
                      <div className="pm-val">$142K</div>
                      <div className="pm-change" style={{ color: 'var(--green)' }}>Next 30 days</div>
                    </div>
                    <div className="pm-card">
                      <div className="pm-label">Anomalies</div>
                      <div className="pm-val">0</div>
                      <div className="pm-change" style={{ color: 'var(--text3)' }}>This week</div>
                    </div>
                  </div>
                  <div className="pm-chart-mini">
                    <div className="pm-label">Volume trend — 8 weeks</div>
                    <div className="pm-sparkline" id="sparkline"></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text2)' }}>US revenue</span>
                        <span style={{ fontSize: '12px', fontWeight: '600' }}>$84K</span>
                      </div>
                      <div className="pm-bar-wrap"><div className="pm-bar" style={{ width: '78%' }}></div></div>
                    </div>
                    <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: '8px', padding: '10px 12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                        <span style={{ fontSize: '12px', color: 'var(--text2)' }}>EU revenue</span>
                        <span style={{ fontSize: '12px', fontWeight: '600' }}>$38K</span>
                      </div>
                      <div className="pm-bar-wrap"><div className="pm-bar" style={{ width: '42%', background: 'var(--sky2)' }}></div></div>
                    </div>
                  </div>
                </div>

                {/* Panel 2: Multi-currency */}
                <div className="panel-view" id="panel-2">
                  <div className="pm-row">
                    <div className="pm-card">
                      <div className="pm-label">Active currencies</div>
                      <div className="pm-val">8</div>
                      <div className="pm-change" style={{ color: 'var(--text3)' }}>Of 35 available</div>
                    </div>
                    <div className="pm-card">
                      <div className="pm-label">FX saved</div>
                      <div className="pm-val">$1,840</div>
                      <div className="pm-change" style={{ color: 'var(--green)' }}>This month</div>
                    </div>
                  </div>
                  <div className="pm-list">
                    <div className="pm-list-item">
                      <div className="pm-list-icon" style={{ background: '#0A1830', fontSize: '14px' }}>🇺🇸</div>
                      <div className="pm-list-info">
                        <div className="pm-list-name">US Dollar</div>
                        <div className="pm-list-sub">USD • Primary</div>
                      </div>
                      <div className="pm-list-amt">$48,200</div>
                    </div>
                    <div className="pm-list-item">
                      <div className="pm-list-icon" style={{ background: '#0A1428', fontSize: '14px' }}>🇪🇺</div>
                      <div className="pm-list-info">
                        <div className="pm-list-name">Euro</div>
                        <div className="pm-list-sub">EUR • 1 EUR = 1.084 USD</div>
                      </div>
                      <div className="pm-list-amt">€22,840</div>
                    </div>
                    <div className="pm-list-item">
                      <div className="pm-list-icon" style={{ background: '#0E1820', fontSize: '14px' }}>🇬🇧</div>
                      <div className="pm-list-info">
                        <div className="pm-list-name">British Pound</div>
                        <div className="pm-list-sub">GBP • 1 GBP = 1.262 USD</div>
                      </div>
                      <div className="pm-list-amt">£9,400</div>
                    </div>
                  </div>
                </div>

                {/* Panel 3: Security */}
                <div className="panel-view" id="panel-3">
                  <div className="pm-security-grid">
                    <div className="pm-sec-item">
                      <svg className="pm-sec-icon" width="24" height="24" fill="none" stroke="#3DCC8E" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                      <div className="pm-sec-name">SOC 2 Type II</div>
                      <div className="pm-sec-desc">Annually audited by independent security firms</div>
                      <div className="pm-sec-status">Certified 2025</div>
                    </div>
                    <div className="pm-sec-item">
                      <svg className="pm-sec-icon" width="24" height="24" fill="none" stroke="#3DCC8E" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                      <div className="pm-sec-name">PCI DSS Level 1</div>
                      <div className="pm-sec-desc">Highest level of payment security compliance</div>
                      <div className="pm-sec-status">Compliant</div>
                    </div>
                    <div className="pm-sec-item">
                      <svg className="pm-sec-icon" width="24" height="24" fill="none" stroke="#3DCC8E" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
                      <div className="pm-sec-name">ISO 27001</div>
                      <div className="pm-sec-desc">International standard for information security</div>
                      <div className="pm-sec-status">Certified</div>
                    </div>
                    <div className="pm-sec-item">
                      <svg className="pm-sec-icon" width="24" height="24" fill="none" stroke="#3DCC8E" strokeWidth="1.5" strokeLinecap="round" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                      <div className="pm-sec-name">AI fraud detection</div>
                      <div className="pm-sec-desc">Blocks 99.97% of fraudulent transactions in real-time</div>
                      <div className="pm-sec-status">Always on</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="dashboard-section" id="dashboard">
        <div className="dashboard-inner">
          <div style={{ textAlign: 'center' }}>
            <div className="section-tag">Live platform</div>
            <h2 className="section-title">Your command center</h2>
            <p className="section-sub" style={{ maxWidth: '500px', margin: '0 auto' }}>Real-time data, beautiful visualizations, and the controls you need to stay ahead.</p>
          </div>
          <div className="dashboard-preview">
            <div className="dp-topbar">
              <div className="dp-title">Portfolio overview</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div className="dp-live"><div className="dp-live-dot"></div>Live data</div>
                <div className="dp-chart-period">
                  <button className="dp-period-btn active" onClick={(e) => (window as any).switchPeriod?.(e.currentTarget, '7d')}>7D</button>
                  <button className="dp-period-btn" onClick={(e) => (window as any).switchPeriod?.(e.currentTarget, '1m')}>1M</button>
                  <button className="dp-period-btn" onClick={(e) => (window as any).switchPeriod?.(e.currentTarget, '3m')}>3M</button>
                  <button className="dp-period-btn" onClick={(e) => (window as any).switchPeriod?.(e.currentTarget, '1y')}>1Y</button>
                </div>
              </div>
            </div>
            <div className="dp-body">
              <div className="dp-chart-area">
                <div className="dp-chart-head">
                  <div>
                    <div className="dp-chart-val" id="dpChartVal">$284,920</div>
                    <div className="dp-chart-change" id="dpChartChange">▲ +$12,840 (4.72%) today</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '5px', height: '160px', paddingTop: '12px' }}>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.15)', borderRadius: '3px 3px 0 0', height: '62%', borderTop: '2px solid var(--green)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.15)', borderRadius: '3px 3px 0 0', height: '70%', borderTop: '2px solid var(--green)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.15)', borderRadius: '3px 3px 0 0', height: '58%', borderTop: '2px solid var(--green)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.15)', borderRadius: '3px 3px 0 0', height: '80%', borderTop: '2px solid var(--green)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.15)', borderRadius: '3px 3px 0 0', height: '72%', borderTop: '2px solid var(--green)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.22)', borderRadius: '3px 3px 0 0', height: '88%', borderTop: '2px solid var(--green)' }}></div>
                  <div style={{ flex: 1, background: 'rgba(61,204,142,.32)', borderRadius: '3px 3px 0 0', height: '100%', borderTop: '2px solid var(--green)' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>Mon</span>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>Tue</span>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>Wed</span>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>Thu</span>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>Fri</span>
                  <span style={{ fontSize: '11px', color: 'var(--text3)' }}>Sat</span>
                  <span style={{ fontSize: '11px', color: 'var(--sky)' }}>Today</span>
                </div>
              </div>
              <div className="dp-side">
                <div className="dp-side-card">
                  <div className="dp-side-label">Cash flow</div>
                  <div className="dp-side-val" style={{ color: 'var(--green)' }}>+$31,400</div>
                  <div className="dp-side-change" style={{ color: 'var(--green)' }}>Net positive this month</div>
                  <div className="dp-allocations">
                    <div className="dp-alloc-row">
                      <div className="dp-alloc-dot" style={{ background: 'var(--sky)' }}></div>
                      <div className="dp-alloc-name">Inbound</div>
                      <div className="dp-alloc-bar-wrap"><div className="dp-alloc-bar" style={{ width: '78%', background: 'var(--sky)' }}></div></div>
                      <div className="dp-alloc-pct">78%</div>
                    </div>
                    <div className="dp-alloc-row">
                      <div className="dp-alloc-dot" style={{ background: '#8888F8' }}></div>
                      <div className="dp-alloc-name">Outbound</div>
                      <div className="dp-alloc-bar-wrap"><div className="dp-alloc-bar" style={{ width: '22%', background: '#8888F8' }}></div></div>
                      <div className="dp-alloc-pct">22%</div>
                    </div>
                  </div>
                </div>
                <div className="dp-side-card">
                  <div className="dp-side-label">Transactions</div>
                  <div className="dp-side-val">1,248</div>
                  <div className="dp-side-change" style={{ color: 'var(--text3)' }}>This month</div>
                  <div className="dp-allocations" style={{ marginTop: '10px' }}>
                    <div className="dp-alloc-row">
                      <div className="dp-alloc-dot" style={{ background: 'var(--green)' }}></div>
                      <div className="dp-alloc-name">Successful</div>
                      <div className="dp-alloc-pct" style={{ color: 'var(--green)' }}>99.8%</div>
                    </div>
                    <div className="dp-alloc-row">
                      <div className="dp-alloc-dot" style={{ background: 'var(--red)' }}></div>
                      <div className="dp-alloc-name">Failed</div>
                      <div className="dp-alloc-pct" style={{ color: 'var(--red)' }}>0.2%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="pricing-section" id="pricing">
        <div style={{ textAlign: 'center' }}>
          <div className="section-tag">Simple pricing</div>
          <h2 className="section-title">Transparent, no surprises</h2>
          <p className="section-sub">Start free, scale when you're ready. No hidden fees, ever.</p>
        </div>
        <div className="pricing-toggle-wrap">
          <span className="toggle-label">Monthly</span>
          <div className="toggle-switch" id="pricingToggle" onClick={() => (window as any).togglePricing?.()}>
            <div className="toggle-knob"></div>
          </div>
          <span className="toggle-label">Annual</span>
          <span className="toggle-save">Save 35%</span>
        </div>
        <div className="pricing-grid">
          <div className="price-card">
            <div className="price-plan">Starter</div>
            <div className="price-amount"><sup>$</sup><span className="price-num" data-monthly="15" data-annual="10">15</span></div>
            <div className="price-period">per month, billed <span className="period-label">monthly</span></div>
            <div className="price-alt" style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '16px', minHeight: '18px' }}>
              <span className="price-alt-monthly" style={{ display: 'none' }}>or <strong style={{ color: 'var(--green)' }}>$10/mo</strong> — save $60/yr annually</span>
              <span className="price-alt-annual">billed <strong style={{ color: 'var(--sky)' }}>$120/yr</strong> total annually</span>
            </div>
            <ul className="price-features">
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>Up to $10K monthly volume</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>5 team members</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>Basic analytics</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>Standard support</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>2 currencies</li>
            </ul>
            <Link href="/register" className="price-btn price-btn-ghost">Get started</Link>
          </div>
          <div className="price-card featured">
            <div className="featured-badge">Most popular</div>
            <div className="price-plan">Growth</div>
            <div className="price-amount"><sup>$</sup><span className="price-num" data-monthly="40" data-annual="26">40</span></div>
            <div className="price-period">per month, billed <span className="period-label">monthly</span></div>
            <div className="price-alt" style={{ fontSize: '12px', color: 'var(--text3)', marginBottom: '16px', minHeight: '18px' }}>
              <span className="price-alt-monthly" style={{ display: 'none' }}>or <strong style={{ color: 'var(--green)' }}>$26/mo</strong> — save $168/yr annually</span>
              <span className="price-alt-annual">billed <strong style={{ color: 'var(--sky)' }}>$312/yr</strong> total annually</span>
            </div>
            <ul className="price-features">
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>Unlimited volume</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>25 team members</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>AI-powered analytics</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>Priority support</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>15 currencies</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>FX hedging tools</li>
            </ul>
            <Link href="/register" className="price-btn price-btn-primary">Start 14-day trial</Link>
          </div>
          <div className="price-card">
            <div className="price-plan">Enterprise</div>
            <div className="price-amount" style={{ fontSize: '36px' }}>Custom</div>
            <div className="price-period">tailored to your needs</div>
            <div style={{ minHeight: '18px', marginBottom: '16px' }}></div>
            <ul className="price-features">
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>Everything in Growth</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>Unlimited team members</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>Dedicated account manager</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>Custom SLA & uptime</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>All 35+ currencies</li>
              <li><svg viewBox="0 0 16 16"><polyline points="2,8 6,12 14,4" /></svg>On-premise option</li>
            </ul>
            <Link href="/register" className="price-btn price-btn-ghost">Contact sales</Link>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="security-section" id="security">
        <div className="security-inner">
          <div>
            <div className="section-tag">Bank-grade protection</div>
            <h2 className="section-title">Security is not a feature — it's the foundation</h2>
            <p className="section-sub" style={{ marginBottom: '24px' }}>Every transaction is protected by multiple layers of enterprise-grade security. We're audited, certified, and monitored around the clock so you don't have to be.</p>
            <a href="#" className="btn-outline" style={{ display: 'inline-block' }}>Read our security whitepaper</a>
          </div>
          <div className="security-badges">
            <div className="sec-badge">
              <div className="sec-badge-icon"><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg></div>
              <div className="sec-badge-name">SOC 2 Type II</div>
              <div className="sec-badge-desc">Annually audited by independent security firms</div>
              <div className="sec-badge-status">Certified 2025</div>
            </div>
            <div className="sec-badge">
              <div className="sec-badge-icon"><svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg></div>
              <div className="sec-badge-name">PCI DSS Level 1</div>
              <div className="sec-badge-desc">Highest level of payment security compliance</div>
              <div className="sec-badge-status">Compliant</div>
            </div>
            <div className="sec-badge">
              <div className="sec-badge-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg></div>
              <div className="sec-badge-name">ISO 27001</div>
              <div className="sec-badge-desc">International standard for information security</div>
              <div className="sec-badge-status">Certified</div>
            </div>
            <div className="sec-badge">
              <div className="sec-badge-icon"><svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg></div>
              <div className="sec-badge-name">AI fraud detection</div>
              <div className="sec-badge-desc">Blocks 99.97% of fraudulent transactions in real-time</div>
              <div className="sec-badge-status">Always on</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div style={{ textAlign: 'center' }}>
          <div className="section-tag">What teams say</div>
          <h2 className="section-title">Loved by finance teams</h2>
        </div>
        <div className="testi-track-wrap">
          <div className="testi-track" id="testiTrack"></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '32px' }}>
          <button id="testiToggle" onClick={() => (window as any).toggleTestimonials?.()} aria-label="Pause testimonials" style={{ background: 'var(--bg2)', border: '1px solid var(--border2)', color: 'var(--text2)', padding: '10px 18px', borderRadius: '24px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500', transition: 'border-color .5s var(--silk), color .5s var(--silk)' }}>
            <svg id="testiIcon" width="14" height="14" fill="currentColor" stroke="none" viewBox="0 0 24 24"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
            <span id="testiLabel">Pause</span>
          </button>
        </div>
      </section>

      {/* App Download */}
      <section className="app-section">
        <div className="app-inner">
          <div>
            <div className="section-tag">Mobile app</div>
            <h2 className="section-title">Your finances, in your pocket</h2>
            <p className="section-sub">Full dashboard access, instant transfer approvals, and real-time alerts — from anywhere in the world.</p>
            <div className="app-btns">
              <a href="#" className="app-store-btn">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="var(--text)" stroke="none"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.17.4-2.37 1.05-3.11z" /></svg>
                <div className="app-store-btn-info">
                  <span className="app-store-btn-sub">Download on the</span>
                  <span className="app-store-btn-name">App Store</span>
                </div>
              </a>
              <a href="#" className="app-store-btn">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="var(--text)" stroke="none"><path d="M3.18 23.76c.3.17.65.19.96.07l12.45-7.2-2.68-2.68-10.73 9.81zM20.54 10.26L17.76 8.6l-3.04 3.04 3.04 3.04 2.8-1.62c.8-.46.8-1.34.02-1.8zM2.22.24C1.9.43 1.67.8 1.67 1.28v21.44c0 .48.23.84.55 1.04l.12.07 12-12L2.22.24zM14.55 11.85L3.18.24c-.3-.17-.67-.15-.97.07l12.03 11.54-1.69 1.69 1.69 1.69.01-.01L14.55 11.85z" /></svg>
                <div className="app-store-btn-info">
                  <span className="app-store-btn-sub">Get it on</span>
                  <span className="app-store-btn-name">Google Play</span>
                </div>
              </a>
              <a href="#" className="app-store-btn" style={{ cursor: 'pointer' }}>
                <svg viewBox="0 0 32 32" width="26" height="26" fill="none">
                  <rect x="2" y="2" width="12" height="12" rx="1.5" stroke="var(--text)" strokeWidth="1.5" fill="none" />
                  <rect x="5" y="5" width="6" height="6" fill="var(--text)" rx=".5" />
                  <rect x="18" y="2" width="12" height="12" rx="1.5" stroke="var(--text)" strokeWidth="1.5" fill="none" />
                  <rect x="21" y="5" width="6" height="6" fill="var(--text)" rx=".5" />
                  <rect x="2" y="18" width="12" height="12" rx="1.5" stroke="var(--text)" strokeWidth="1.5" fill="none" />
                  <rect x="5" y="21" width="6" height="6" fill="var(--text)" rx=".5" />
                  <rect x="18" y="18" width="3" height="3" fill="var(--text)" rx=".5" />
                  <rect x="23" y="18" width="3" height="3" fill="var(--text)" rx=".5" />
                  <rect x="18" y="23" width="3" height="3" fill="var(--text)" rx=".5" />
                  <rect x="27" y="23" width="3" height="3" fill="var(--text)" rx=".5" />
                  <rect x="23" y="27" width="7" height="3" fill="var(--text)" rx=".5" />
                </svg>
                <div className="app-store-btn-info">
                  <span className="app-store-btn-sub">Or scan our</span>
                  <span className="app-store-btn-name">QR Code</span>
                </div>
              </a>
            </div>
          </div>
          <div id="phoneTiltWrap" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', perspective: '1200px' }}>
            <div id="phoneFrame" style={{ width: '276px', background: 'var(--bg3)', border: '2px solid var(--border2)', borderRadius: '40px', padding: '8px', boxShadow: '0 12px 32px rgba(0,0,0,.25), 0 0 0 1px var(--border)', transformStyle: 'preserve-3d', transition: 'transform .8s var(--silk), box-shadow .8s var(--silk)', willChange: 'transform' }}>
              <div style={{ borderRadius: '34px', overflow: 'hidden', aspectRatio: '9/19.5', background: 'var(--bg)', position: 'relative' }}>
                <img src="/images/phone-app-screenshot.jpg" alt="KUKUNET mobile app screenshot" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  if (target.nextElementSibling) {
                    (target.nextElementSibling as HTMLElement).style.display = 'flex';
                  }
                }} />
                <div style={{ display: 'none', position: 'absolute', inset: '0', background: 'var(--bg2)', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '12px', textAlign: 'center', padding: '24px' }}>
                  <svg width="40" height="40" fill="none" stroke="var(--text3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21,15 16,10 5,21" /></svg>
                  <div style={{ fontFamily: 'Outfit, sans-serif', fontSize: '14px', fontWeight: '700', color: 'var(--text2)' }}>App Screenshot</div>
                  <div style={{ fontSize: '11px', color: 'var(--text3)', lineHeight: '1.5' }}>Place your image at<br /><code style={{ fontFamily: 'monospace', color: 'var(--sky)', fontSize: '10px' }}>/images/phone-app-screenshot.jpg</code></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section" id="faq">
        <div className="faq-inner">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div style={{ textAlign: 'left' }}>
              <div className="section-tag">Got questions?</div>
              <h2 className="section-title">Frequently asked</h2>
            </div>
            <button id="faqToggleAll" onClick={() => (window as any).toggleAllFaq?.()} style={{ background: 'transparent', border: '1px solid var(--border2)', color: 'var(--text2)', fontFamily: 'DM Sans, sans-serif', fontSize: '13px', fontWeight: '500', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '7px', transition: 'all .2s', whiteSpace: 'nowrap', marginBottom: '6px' }}>
              <svg id="faqToggleIcon" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
              <span id="faqToggleLabel">Expand all</span>
            </button>
          </div>
          <div className="faq-list" id="faqList"></div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '24px max(48px, calc((100vw - var(--max-w)) / 2))', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '13px', color: 'var(--text3)' }}>© 2026 KUKUNET digital. All rights reserved. Designed by <a href="https://yonas-alemu.vercel.app/" style={{ color: 'var(--sky)', textDecoration: 'none', transition: 'opacity .3s' }} onMouseOver={(e) => (e.currentTarget.style.opacity = '.7')} onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}>YonasA</a>.</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="#" className="footer-link">Privacy</a>
          <a href="#" className="footer-link">Terms</a>
          <a href="#" className="footer-link">Cookies</a>
          <div style={{ width: '1px', height: '14px', background: 'var(--border)' }}></div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <a href="#" className="social-btn" aria-label="Twitter"><svg viewBox="0 0 24 24"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg></a>
            <a href="#" className="social-btn" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg></a>
            <a href="#" className="social-btn" aria-label="GitHub"><svg viewBox="0 0 24 24"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" /></svg></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
