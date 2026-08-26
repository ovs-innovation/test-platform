import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ShieldCheck,
  KeyRound,
  BarChart3,
  BookOpen,
  Activity,
  Lock,
  CheckCircle2,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT } from '../data/edvedumContent.js';
import HomeHeroVisual from './landing/HomeHeroVisual.jsx';
import GeoPatternFlow from './auth/GeoPatternFlow.jsx';

const STUDENT_POINTS = [
  'Structured mocks for JEE, NEET and Foundation',
  'Real NEET / JEE CBT timer, palette & step solutions',
  'Instant All India Ranks & performance analytics',
];

const ADMIN_POINTS = [
  'Manage test series and question banks',
  'Track student performance and results',
  'Schedule and publish assessments',
  'Role-based access for your team',
];

const STUDENT_BADGES = [
  { icon: ShieldCheck, text: 'Secure Login (SSL)' },
  { icon: Activity, text: 'AI Analytics' },
  { icon: BarChart3, text: '1,000+ Students' },
];

const ADMIN_BADGES = [
  { icon: ShieldCheck, text: 'Secure Admin Access' },
  { icon: KeyRound, text: 'Role-Based Permissions' },
  { icon: BarChart3, text: 'Real-Time Reporting' },
];

function AdminHeroVisual() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-500/30 bg-[#070e24] p-3.5 sm:p-4 shadow-xl shadow-blue-950/50 space-y-3 my-2">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <div className="flex items-center gap-2">
          <span className="flex h-2.5 w-2.5 rounded-full bg-[#22C55E] animate-pulse" />
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-white">EDVEDUM Admin Control Center</span>
        </div>
        <span className="rounded-full bg-[#2563EB]/20 px-2.5 py-0.5 text-[9px] font-extrabold text-[#60a5fa] border border-[#2563EB]/30">
          Management Portal
        </span>
      </div>

      {/* Mock Analytics Cards Row */}
      <div className="grid grid-cols-3 gap-2">
        <div className="rounded-xl border border-slate-800 bg-[#0b1430] p-2 text-center">
          <p className="text-[9.5px] font-semibold text-slate-400 uppercase">Series Packs</p>
          <p className="text-sm font-black text-[#2563EB]">24 Active</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-[#0b1430] p-2 text-center">
          <p className="text-[9.5px] font-semibold text-slate-400 uppercase">Candidates</p>
          <p className="text-sm font-black text-[#60a5fa]">1,250</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-[#0b1430] p-2 text-center">
          <p className="text-[9.5px] font-semibold text-slate-400 uppercase">Accuracy</p>
          <p className="text-sm font-black text-[#22C55E]">78.4%</p>
        </div>
      </div>

      {/* Admin Tools Preview List */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between rounded-xl bg-[#0b1430] p-2 text-xs border border-slate-800">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <BookOpen className="h-3.5 w-3.5 text-[#60a5fa]" />
            <span>Test Series & PDF Parser</span>
          </span>
          <span className="text-[10px] font-extrabold text-[#22C55E]">Active</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-[#0b1430] p-2 text-xs border border-slate-800">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-[#38bdf8]" />
            <span>Live Rank Analytics</span>
          </span>
          <span className="text-[10px] font-extrabold text-[#60a5fa]">Real-Time</span>
        </div>
        <div className="flex items-center justify-between rounded-xl bg-[#0b1430] p-2 text-xs border border-slate-800">
          <span className="font-bold text-slate-200 flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-[#f59e0b]" />
            <span>Role Permissions</span>
          </span>
          <span className="text-[10px] font-extrabold text-[#F59E0B]">Enforced</span>
        </div>
      </div>
    </div>
  );
}

export default function AuthShell({ children, title, subtitle, variant = 'student' }) {
  const isAdmin = variant === 'admin';
  const points = isAdmin ? ADMIN_POINTS : STUDENT_POINTS;
  const badges = isAdmin ? ADMIN_BADGES : STUDENT_BADGES;

  // Mobile / Tablet Collapsible Showcase State
  const [showcaseOpen, setShowcaseOpen] = useState(false);

  return (
    <div className={`relative min-h-screen bg-[#051329] overflow-x-hidden text-slate-100 flex flex-col items-center justify-between lg:justify-center p-3.5 sm:p-5 lg:p-6 select-none font-sans ${isAdmin ? 'admin-cbt-auth-env' : ''}`}>

      {/* GEO PATTERN FLOW BACKGROUND */}
      <GeoPatternFlow />

      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (>= 1024px) - 100% UNTOUCHED APPROVED DESIGN               */}
      {/* ========================================================================= */}
      <div className="hidden lg:flex relative z-10 w-full max-w-5xl rounded-3xl border border-slate-800/90 bg-[#080f24]/95 shadow-[0_24px_70px_rgba(0,0,0,0.35)] flex-row overflow-hidden my-auto max-h-full">

        {/* Floating Back to Home Link (Desktop Full Button) */}
        <Link
          to="/"
          className="fixed top-5 left-5 z-50 inline-flex items-center gap-2 rounded-2xl border border-slate-700/80 bg-[#0a142c]/90 px-3.5 py-2 text-xs font-extrabold text-slate-200 backdrop-blur-xl transition hover:border-[#2563EB]/50 hover:bg-[#112044] hover:text-white hover:scale-105 active:scale-95 shadow-2xl group cursor-pointer"
        >
          <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
          <span>Back to Home</span>
        </Link>

        {/* LEFT PANEL: HERO SHOWCASE */}
        <div className="w-[48%] xl:w-[46%] relative bg-gradient-to-br from-[#060c1e] via-[#0b1736] to-[#040816] p-6 xl:p-7 flex flex-col justify-between border-r border-slate-800/80 overflow-y-auto">
          {/* Logo Header */}
          <Link to="/" className="inline-flex items-center gap-3 w-fit">
            <img
              src={EDVEDUM_LOGO}
              alt={EDVEDUM_LOGO_ALT}
              className="h-9 w-auto max-w-[40px] object-contain shrink-0"
              style={{ height: '36px', width: 'auto', maxWidth: '40px', objectFit: 'contain' }}
            />
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
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-[#60a5fa]" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>

            {/* Trust Badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-800/80 pt-3.5">
              {badges.map((b) => {
                const IconComponent = b.icon;
                return (
                  <span key={b.text} className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[10.5px] font-semibold text-blue-300 backdrop-blur-md">
                    <IconComponent className="h-3 w-3 text-[#60a5fa]" />
                    <span>{b.text}</span>
                  </span>
                );
              })}
            </div>
          </div>

          <p className="text-[11px] text-slate-500 pt-1">© {new Date().getFullYear()} EDVEDUM Academy · All rights reserved</p>
        </div>

        {/* RIGHT PANEL: LOGIN FORM */}
        <div className="w-[52%] xl:w-[54%] p-7 xl:p-9 flex flex-col justify-between bg-[#081026]/95 overflow-y-auto">
          <div className="my-auto">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">{title}</h1>
            {subtitle && <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">{subtitle}</p>}
            <div className="mt-5">{children}</div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE & TABLET LAYOUT (< 1024px) - ENHANCED BRANDING & DROPPED CARD      */}
      {/* ========================================================================= */}
      <div className="lg:hidden relative z-10 w-full max-w-[420px] sm:max-w-[540px] mx-auto px-1 pt-1 pb-3 flex flex-col justify-between min-h-[calc(100vh-2rem)]">

        <div>
          {/* ROW 1: Small Circular Icon-Only Back Button (40x40) */}
          <div className="flex items-center justify-start mt-0.5">
            <Link
              to="/"
              aria-label="Back to Home"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-700/80 bg-[#0a142c] text-slate-200 transition hover:border-[#2563EB]/50 hover:bg-[#112044] hover:text-white active:scale-95 cursor-pointer shadow-md"
            >
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>

          {/* ROW 2: EDVEDUM Logo & Branding Header (Enhanced Size) */}
          <div className="text-center mt-3 mb-7 sm:mb-8">
            <Link to="/" className="inline-flex items-center justify-center gap-3 max-w-[210px] mx-auto">
              <img
                src={EDVEDUM_LOGO}
                alt={EDVEDUM_LOGO_ALT}
                className="h-10 sm:h-11 w-auto max-w-[44px] max-h-[44px] object-contain shrink-0 flex-shrink-0"
                style={{ height: '42px', width: 'auto', maxWidth: '44px', maxHeight: '44px', objectFit: 'contain' }}
              />
              <div className="text-left leading-none space-y-0.5 shrink-0">
                <span className="block font-serif font-black tracking-wider text-white text-lg uppercase">
                  EDVEDUM
                </span>
                <div className="flex items-center gap-1 text-[8.5px] font-bold tracking-[0.24em] text-[#C5A059] uppercase">
                  <span>—</span>
                  <span>{isAdmin ? 'ADMIN PORTAL' : 'ACADEMY'}</span>
                  <span>—</span>
                </div>
              </div>
            </Link>
          </div>

          {/* ROW 3: SINGLE AUTH CARD (SIGN IN FIRST - DROPPED DOWN SLIGHTLY) */}
          <div className="rounded-2xl border border-slate-800/90 bg-[#081026]/95 p-5 sm:p-7 shadow-2xl">
            <div>
              <h1 className="text-2xl sm:text-[28px] font-extrabold tracking-tight text-white leading-tight">{title}</h1>
              {subtitle && <p className="mt-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed">{subtitle}</p>}
            </div>

            {/* Form Content */}
            <div className="mt-5">{children}</div>

            {/* Compact Single Security Indicator Row */}
            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-start">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-medium text-blue-300">
                <ShieldCheck className="h-3.5 w-3.5 text-[#60a5fa]" />
                <span>Secure Admin Access</span>
              </span>
            </div>
          </div>

          {/* ROW 4: COMPACT OPTIONAL EXPANDABLE SHOWCASE */}
          <div className="mt-2.5 rounded-2xl border border-slate-800/60 bg-[#081026]/90 overflow-hidden">
            <button
              type="button"
              onClick={() => setShowcaseOpen((prev) => !prev)}
              className="w-full min-h-[48px] sm:min-h-[52px] flex items-center justify-between px-4 py-3 text-xs sm:text-sm font-bold text-slate-300 hover:text-white transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-[#2563EB]" />
                <span>Explore Admin Portal Features</span>
              </span>
              {showcaseOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
            </button>

            {showcaseOpen && (
              <div className="p-4 border-t border-slate-800/80 space-y-3.5 bg-[#060c1e]">
                {isAdmin ? <AdminHeroVisual /> : <HomeHeroVisual />}

                <ul className="space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#60a5fa]" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-slate-800/60">
                  {badges.map((b) => {
                    const IconComp = b.icon;
                    return (
                      <span key={b.text} className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2.5 py-1 text-[10px] font-medium text-blue-300">
                        <IconComp className="h-3 w-3 text-[#60a5fa]" />
                        <span>{b.text}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ROW 5: PAGE FOOTER AT BOTTOM */}
        <div className="text-center pt-4 pb-1">
          <p className="text-[11px] text-slate-400 font-medium">
            © {new Date().getFullYear()} EDVEDUM Academy · All rights reserved
          </p>
        </div>

      </div>

    </div>
  );
}
