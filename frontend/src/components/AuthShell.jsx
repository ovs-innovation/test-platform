import { Link } from 'react-router-dom';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../data/edvedumContent.js';
import HomeHeroVisual from './landing/HomeHeroVisual.jsx';

const STUDENT_POINTS = [
  'Structured mocks for JEE, NEET and Foundation',
  'Real NTA CBT timer, palette & step solutions',
  'Instant All India Ranks & performance analytics',
];

const ADMIN_POINTS = [
  'Manage test series and question banks',
  'Track student performance and results',
  'Schedule and publish assessments',
  'Role-based access for your team',
];

const STUDENT_BADGES = [
  '🔒 Secure Login (SSL)',
  '⚡ AI Analytics',
  '🏆 1,000+ Students',
];

const ADMIN_BADGES = [
  '🛡️ Secure Admin Access',
  '🔐 Role-Based Permissions',
  '📊 Real-Time Reporting',
];

function AdminHeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-[#070e24] p-4 shadow-xl shadow-blue-950/50 space-y-3 my-2">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">EDVEDUM Admin Control Center</span>
        </div>
        <span className="rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[9px] font-extrabold text-cyan-300 border border-blue-500/30">
          Management Portal
        </span>
      </div>

      {/* Mock Analytics Cards Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-slate-800 bg-[#0b1430] p-2 text-center">
          <p className="text-[9.5px] font-semibold text-slate-400 uppercase">Series Packs</p>
          <p className="text-sm font-black text-blue-400">24 Active</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-[#0b1430] p-2 text-center">
          <p className="text-[9.5px] font-semibold text-slate-400 uppercase">Candidates</p>
          <p className="text-sm font-black text-cyan-300">1,250</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-[#0b1430] p-2 text-center">
          <p className="text-[9.5px] font-semibold text-slate-400 uppercase">Accuracy</p>
          <p className="text-sm font-black text-emerald-400">78.4%</p>
        </div>
      </div>

      {/* Admin Tools Preview List */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between rounded-xl bg-[#0b1430] p-2 text-xs border border-slate-800">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">📚 Test Series & PDF Parser</span>
          <span className="text-[10px] font-extrabold text-emerald-400">Active</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-[#0b1430] p-2 text-xs border border-slate-800">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">📊 Live Rank Analytics</span>
          <span className="text-[10px] font-extrabold text-cyan-300">Real-Time</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-[#0b1430] p-2 text-xs border border-slate-800">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">🔐 Role Permissions</span>
          <span className="text-[10px] font-extrabold text-purple-300">Enforced</span>
        </div>
      </div>
    </div>
  );
}

export default function AuthShell({ children, title, subtitle, variant = 'student' }) {
  const isAdmin = variant === 'admin';
  const points = isAdmin ? ADMIN_POINTS : STUDENT_POINTS;
  const badges = isAdmin ? ADMIN_BADGES : STUDENT_BADGES;

  return (
    <div className="relative min-h-screen lg:h-screen lg:max-h-screen bg-gradient-to-br from-[#060a17] via-[#0d1527] to-[#182339] overflow-x-hidden text-slate-100 flex items-center justify-center p-3 sm:p-5 lg:p-6">
      {/* 1. EDGE-TO-EDGE CONTINUOUS ATMOSPHERIC BACKGROUND SCENE */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden select-none" aria-hidden="true">
        {/* Top-Left Continuous Primary Blue Glow Wash */}
        <div className="absolute -top-40 -left-40 h-[850px] w-[850px] rounded-full bg-gradient-to-br from-[#2563eb]/42 via-[#1d4ed8]/32 to-transparent blur-[140px]" />

        {/* Top-Right Continuous Violet Glow Wash */}
        <div className="absolute -top-40 -right-40 h-[850px] w-[850px] rounded-full bg-gradient-to-bl from-[#7c3aed]/40 via-[#9333ea]/30 to-transparent blur-[140px]" />

        {/* Bottom-Right Deep Purple Glow Wash */}
        <div className="absolute -bottom-48 -right-48 h-[900px] w-[900px] rounded-full bg-gradient-to-tr from-[#6d28d9]/38 via-[#2563eb]/32 to-transparent blur-[150px]" />

        {/* Bottom-Left Cyan Bloom Wash */}
        <div className="absolute -bottom-48 -left-48 h-[850px] w-[850px] rounded-full bg-gradient-to-tr from-[#00f0ff]/28 via-[#2563eb]/30 to-transparent blur-[130px]" />

        {/* Top-Center Outer Strip Atmosphere Wash */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[350px] w-full bg-gradient-to-b from-[#2563eb]/25 via-[#4f46e5]/15 to-transparent blur-[100px]" />

        {/* Soft Diagonal Gradient Light Beam */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#2563eb]/15 to-[#7c3aed]/15" />

        {/* EDGE-TO-EDGE TECHNICAL GRID PATTERN */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] [background-size:48px_48px] opacity-45" />

        {/* EDGE-TO-EDGE BLUEPRINT DOT-GRID PATTERN */}
        <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40" />

        {/* 2. EDUCATION-THEMED FLOATING VISUAL ELEMENTS (MATH FORMULAS & SCIENCE/ACADEMIC ICONS) */}
        
        {/* --- Top-Left Outer Area --- */}
        {/* Math Formula: E = mc² */}
        <div className="absolute top-8 left-10 text-xs sm:text-sm font-serif italic text-blue-300/25 tracking-widest animate-edu-float-1 hidden sm:block">
          E = mc²
        </div>
        {/* Academic Icon: Graduation Cap Outline */}
        <svg className="absolute top-20 left-36 h-12 w-12 text-cyan-400/20 animate-edu-float-2 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0112 20.055a11.952 11.952 0 01-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>

        {/* --- Top-Center Strip --- */}
        {/* Science Icon: Atom Symbol */}
        <svg className="absolute top-5 left-1/3 h-14 w-14 text-blue-400/25 animate-edu-float-3 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="9" ry="3.5" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
        {/* Math Formula: ∫ f(x) dx */}
        <div className="absolute top-6 right-1/3 text-xs sm:text-sm font-mono text-cyan-300/25 tracking-wider animate-edu-float-4 hidden md:block">
          ∫ f(x) dx
        </div>

        {/* --- Top-Right Outer Area --- */}
        {/* Math Formula: sin²θ + cos²θ = 1 */}
        <div className="absolute top-8 right-12 text-xs sm:text-sm font-serif italic text-purple-300/25 tracking-wide animate-edu-float-5 hidden sm:block">
          sin²θ + cos²θ = 1
        </div>
        {/* Chemistry Icon: Beaker / Flask Outline */}
        <svg className="absolute top-24 right-36 h-12 w-12 text-purple-400/20 animate-edu-float-1 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.594 15.12a2 2 0 00-1.022.547l-1.2 1.2a2 2 0 00-.572 1.414V20a2 2 0 002 2h16a2 2 0 002-2v-1.719a2 2 0 00-.572-1.414l-1.2-1.2z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 3h6m-3 0v10" />
        </svg>

        {/* --- Outer Left Side --- */}
        {/* Science Icon: DNA Double Helix Outline */}
        <svg className="absolute top-1/2 -translate-y-1/2 left-6 h-16 w-16 text-cyan-400/22 animate-edu-float-2 hidden lg:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 0115 0m-15 0H3m18 0h-1.5m-15 4.5h15m-15-9h15" />
        </svg>
        {/* Physics Formula: PV = nRT */}
        <div className="absolute top-1/3 left-8 text-xs font-mono text-[#60a5fa]/25 tracking-widest animate-edu-float-3 hidden lg:block">
          PV = nRT
        </div>
        {/* Math Formula: ∇ × B = μ₀J */}
        <div className="absolute bottom-1/3 left-10 text-xs font-serif text-cyan-300/22 tracking-wider animate-edu-float-4 hidden lg:block">
          ∇ × B = μ₀J
        </div>

        {/* --- Outer Right Side --- */}
        {/* Academic Icon: Open Book Outline */}
        <svg className="absolute top-1/2 -translate-y-1/2 right-6 h-16 w-16 text-purple-300/22 animate-edu-float-5 hidden lg:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
        {/* Math Limit: lim (x→0) sin(x)/x = 1 */}
        <div className="absolute top-1/3 right-8 text-xs font-mono text-purple-300/25 tracking-widest animate-edu-float-1 hidden lg:block">
          lim x→0 (sin x / x) = 1
        </div>
        {/* Geometry Icon: Compass Outline */}
        <svg className="absolute bottom-1/3 right-10 h-12 w-12 text-blue-400/22 animate-edu-float-2 hidden lg:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 0l-3.5 12.5M12 6l3.5 12.5M7 14.5h10" />
        </svg>

        {/* --- Bottom-Left Outer Corner --- */}
        {/* Math Formula: a² + b² = c² */}
        <div className="absolute bottom-10 left-12 text-xs sm:text-sm font-serif italic text-blue-400/25 tracking-widest animate-edu-float-3 hidden sm:block">
          a² + b² = c²
        </div>
        {/* Magnet Symbol SVG */}
        <svg className="absolute bottom-20 left-36 h-11 w-11 text-cyan-400/20 animate-edu-float-4 hidden sm:block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18V9a6 6 0 0112 0v9M6 18a2 2 0 002 2h2a2 2 0 002-2v-3H6v3zm12 0a2 2 0 01-2 2h-2a2 2 0 01-2-2v-3h6v3z" />
        </svg>

        {/* --- Bottom-Right Outer Corner --- */}
        {/* Physics Formula: Δx · Δp ≥ ℏ/2 */}
        <div className="absolute bottom-10 right-12 text-xs sm:text-sm font-serif text-purple-300/25 tracking-wider animate-edu-float-5 hidden sm:block">
          Δx · Δp ≥ ℏ/2
        </div>
        {/* Chemistry Formula: pH = -log[H⁺] */}
        <div className="absolute bottom-20 right-36 text-xs font-mono text-cyan-300/22 tracking-widest animate-edu-float-1 hidden sm:block">
          pH = -log[H⁺]
        </div>
      </div>

      {/* 3. STATIC AMBIENT GLOW SPILL DIRECTLY BEHIND THE CARD FRAME */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] max-w-5xl rounded-3xl bg-gradient-to-r from-[#2563eb]/25 via-[#4f46e5]/20 to-[#7C3AED]/25 blur-[85px]" aria-hidden="true" />

      {/* SINGLE UNIFIED INTEGRATED DUAL-PANEL CARD FRAME */}
      <div className="relative z-10 w-full max-w-5xl rounded-3xl border border-slate-800/90 bg-[#080f24]/90 backdrop-blur-2xl shadow-[0_30px_90px_rgba(0,0,0,0.85),0_0_60px_rgba(37,99,235,0.2)] flex flex-col lg:flex-row overflow-hidden my-auto max-h-full">
        
        {/* LEFT PANEL: HERO SHOWCASE */}
        <div className="lg:w-[48%] xl:w-[46%] relative bg-gradient-to-br from-[#060c1e] via-[#0b1736] to-[#040816] p-5 sm:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80 overflow-y-auto">
          {/* Logo Header */}
          <Link to="/" className="inline-flex items-center gap-3 w-fit">
            <div className="relative flex items-center justify-center shrink-0">
              <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="relative h-9 sm:h-10 w-auto object-contain" />
            </div>
            <div className="text-left leading-none space-y-1">
              <span className="block font-serif font-black tracking-wider text-white text-base uppercase">
                EDVEDUM
              </span>
              <div className="flex items-center gap-1 text-[9px] font-bold tracking-[0.25em] text-[#C5A059] uppercase">
                <span>—</span>
                <span>{isAdmin ? 'ADMIN PORTAL' : 'ACADEMY'}</span>
                <span>—</span>
              </div>
            </div>
          </Link>

          {/* Hero Visual & Feature Content */}
          <div className="my-auto py-3">
            {isAdmin ? <AdminHeroVisual /> : <HomeHeroVisual />}

            <ul className="mt-4 space-y-2.5">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-xs sm:text-[13px] font-medium text-slate-200">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-600/25 border border-blue-500/40 text-[#60a5fa] text-[11px] font-bold">
                    ✓
                  </span>
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* Trust Pills */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-3.5">
              {badges.map((b) => (
                <span key={b} className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[10.5px] font-semibold text-blue-300 backdrop-blur-md">
                  {b}
                </span>
              ))}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 pt-1">© {new Date().getFullYear()} EDVEDUM Academy · All rights reserved</p>
        </div>

        {/* RIGHT PANEL: LOGIN FORM */}
        <div className="lg:w-[52%] xl:w-[54%] p-5 sm:p-7 lg:p-9 flex flex-col justify-between bg-[#081026]/95 overflow-y-auto">
          <div className="my-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{title}</h1>
            {subtitle && <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">{subtitle}</p>}
            <div className="mt-5">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
