import { Link } from 'react-router-dom';
import { EDVEDUM_LOGO, EDVEDUM_LOGO_ALT, HERO } from '../../data/edvedumContent.js';

const FEATURES = [
  { icon: 'book', label: 'LEARN' },
  { icon: 'target', label: 'PRACTICE' },
  { icon: 'bulb', label: 'INNOVATE' },
  { icon: 'rocket', label: 'SUCCEED' },
];

const WELCOME_ITEMS = [
  { icon: 'monitor', text: 'Online Learning' },
  { icon: 'faculty', text: 'Expert Faculty' },
  { icon: 'practice', text: 'Smart Practice' },
  { icon: 'chart', text: 'Performance Analysis' },
];

function FeatureIcon({ type }) {
  const cls = 'h-[17px] w-[17px] text-cyan-300';
  const paths = {
    book: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25',
    target: 'M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z',
    bulb: 'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18',
    rocket: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z',
  };
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type] || paths.book} />
    </svg>
  );
}

function WelcomeIcon({ type }) {
  const cls = 'h-4 w-4 shrink-0 text-sky-400';
  const paths = {
    monitor: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25',
    faculty: 'M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5',
    practice: 'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
    chart: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  };
  return (
    <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[type]} />
    </svg>
  );
}

export default function EdvedumHero() {
  return (
    <section className="relative overflow-hidden bg-[#010d1f]">
      {/* Generated hero background — building with EDVEDUM signage */}
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/edvedum/hero-bg.png?v=5')",
          backgroundPosition: '62% center',
        }}
        aria-hidden
      />
      {/* Left fade so text stays readable; center/right stays clear for building sign */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#010d1f]/90 via-[#010d1f]/35 to-transparent lg:from-[#010d1f]/82 lg:via-[#010d1f]/15" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-t from-[#010d1f]/60 via-transparent to-[#010d1f]/20" aria-hidden />

      {/* Content layer */}
      <div className="relative mx-auto flex min-h-[500px] max-w-[1280px] flex-col justify-center px-4 py-10 lg:min-h-[520px] lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-12">
        {/* Left branding */}
        <div className="relative z-10 max-w-[420px] shrink-0">
          <img src={EDVEDUM_LOGO} alt={EDVEDUM_LOGO_ALT} className="edvedum-logo-glow mb-4 h-24 w-auto object-contain lg:h-28" />
          <h1 className="font-extrabold leading-[1.05] tracking-wide text-white">
            <span className="block text-[2rem] lg:text-[2.4rem]">EDVEDUM</span>
            <span className="mt-0.5 block text-[13px] font-semibold tracking-[0.34em] text-white/90 lg:text-sm">
              — ACADEMY —
            </span>
          </h1>

          <p className="mt-5 text-[11px] font-bold tracking-[0.24em] text-white/70 lg:text-xs">
            EMPOWERING FUTURE
          </p>
          <p className="mt-1 font-extrabold leading-tight">
            <span className="text-[1.55rem] text-[#38bdf8] lg:text-[1.85rem]">DOCTORS</span>
            <span className="text-[1.55rem] text-white lg:text-[1.85rem]"> &amp; </span>
            <span className="text-[1.55rem] text-[#a855f7] lg:text-[1.85rem]">ENGINEERS</span>
          </p>

          <p className="mt-4 text-[13px] font-semibold leading-snug text-sky-200/95 lg:text-sm">
            {HERO.subtitle}
          </p>
          <p className="mt-3 max-w-[380px] text-[12px] leading-relaxed text-white/70 lg:text-[13px]">
            {HERO.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link
              to={HERO.ctaPrimary.to}
              className="edvedum-btn-gradient rounded-full px-5 py-2.5 text-[12px] font-semibold text-white shadow-lg lg:text-sm"
            >
              {HERO.ctaPrimary.label}
            </Link>
            <Link
              to={HERO.ctaSecondary.to}
              className="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-[12px] font-semibold text-white backdrop-blur-sm hover:bg-white/15 lg:text-sm"
            >
              {HERO.ctaSecondary.label}
            </Link>
          </div>

          <div className="mt-6 flex gap-5 lg:gap-6">
            {FEATURES.map((f) => (
              <div key={f.label} className="flex flex-col items-center gap-1">
                <div className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-400/20 bg-white/5 backdrop-blur-sm">
                  <FeatureIcon type={f.icon} />
                </div>
                <span className="text-[8px] font-bold tracking-[0.18em] text-white/60 lg:text-[9px]">{f.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-end gap-2">
            <p className="edvedum-tagline text-[15px] text-[#c4b5fd] lg:text-base">
              Inspiring Minds. Building Futures.
            </p>
            <span className="mb-1 hidden h-px w-12 bg-purple-400/70 sm:block" aria-hidden />
          </div>
        </div>

        {/* Spacer — building visible in bg through center */}
        <div className="hidden flex-1 lg:block" aria-hidden />

        {/* Welcome card — right side */}
        <div className="relative z-10 mt-8 w-full max-w-[280px] shrink-0 lg:mt-0 lg:w-[270px]">
          <div className="edvedum-welcome-card rounded-xl p-5">
            <h2 className="text-center text-[12px] font-bold text-sky-300 lg:text-[13px]">
              Welcome to EDVEDUM ACADEMY
            </h2>
            <ul className="mt-4 space-y-2.5">
              {WELCOME_ITEMS.map((item) => (
                <li key={item.text} className="flex items-center gap-2.5 text-[12px] text-white/90">
                  <WelcomeIcon type={item.icon} />
                  {item.text}
                </li>
              ))}
            </ul>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link
                to="/student-login"
                className="rounded bg-[#2563eb] py-2 text-center text-[11px] font-semibold text-white hover:bg-[#1d4ed8]"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="rounded bg-[#7c3aed] py-2 text-center text-[11px] font-semibold text-white hover:bg-[#6d28d9]"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="h-16 lg:h-20" aria-hidden />
    </section>
  );
}
