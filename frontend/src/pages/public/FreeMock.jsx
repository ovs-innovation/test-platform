import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { publicService } from '../../lib/services.js';
import { EXAM_NAV_ITEMS } from '../../lib/examNav.js';
import { isNeetPg, isNeetUg } from '../../lib/testSeriesCover.js';
import TestSeriesCard from '../../components/public/TestSeriesCard.jsx';
import { Skeleton } from '../../components/ui.jsx';

const STEPS = [
  'Create a free student account',
  'Enroll in the free mock',
  'Start the CBT from My Tests',
  'Submit and check rank + solutions',
];

function seriesMatchesExam(series, examId) {
  const text = `${series.exam_type || ''} ${series.title || ''}`;
  if (examId === 'jee') return /jee/i.test(text);
  if (examId === 'neet') return isNeetUg(text);
  if (examId === 'neetpg') return isNeetPg(text);
  return false;
}

const EXAM_THEMES = {
  jee: {
    badge: 'text-[#38bdf8] bg-blue-500/20 border-blue-400/40',
    headingGradient: 'from-[#38bdf8] via-[#60a5fa] to-[#0D6EFD]',
    cardBorder: 'border-[#0D6EFD]/40 bg-[#0c1427]/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(13,110,253,0.18)]',
    accentText: 'text-[#38bdf8]',
    emptyBtn: 'bg-gradient-to-r from-[#0D6EFD] to-[#2563eb] text-white shadow-md shadow-blue-500/20 hover:scale-[1.02]',
    primaryBtn: 'bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#00F0FF] text-white shadow-md shadow-blue-500/25 hover:scale-[1.02]',
    checkBg: 'bg-blue-500/20 text-[#38bdf8] border border-blue-400/30',
    guideBadge: 'bg-blue-500/20 text-[#38bdf8] border border-blue-400/30',
  },
  neet: {
    badge: 'text-[#00F0FF] bg-cyan-500/20 border-cyan-400/40',
    headingGradient: 'from-[#00F0FF] via-[#22d3ee] to-[#0891b2]',
    cardBorder: 'border-[#00F0FF]/40 bg-[#0c1427]/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,240,255,0.18)]',
    accentText: 'text-[#00F0FF]',
    emptyBtn: 'bg-gradient-to-r from-[#00F0FF] via-[#06b6d4] to-[#0891b2] text-slate-950 font-bold shadow-md shadow-cyan-500/20 hover:scale-[1.02]',
    primaryBtn: 'bg-gradient-to-r from-[#00F0FF] via-[#06b6d4] to-[#0891b2] text-slate-950 font-bold shadow-md shadow-cyan-500/25 hover:scale-[1.02]',
    checkBg: 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-400/30',
    guideBadge: 'bg-cyan-500/20 text-[#00F0FF] border border-cyan-400/30',
  },
  neetpg: {
    badge: 'text-[#c084fc] bg-purple-500/20 border-purple-400/40',
    headingGradient: 'from-[#c084fc] via-[#a855f7] to-[#7C3AED]',
    cardBorder: 'border-[#7C3AED]/40 bg-[#0c1427]/85 backdrop-blur-xl shadow-[0_8px_32px_rgba(124,58,237,0.18)]',
    accentText: 'text-[#c084fc]',
    emptyBtn: 'bg-gradient-to-r from-[#7C3AED] to-purple-700 text-white shadow-md shadow-purple-500/20 hover:scale-[1.02]',
    primaryBtn: 'bg-gradient-to-r from-[#7C3AED] via-[#8b5cf6] to-[#6d28d9] text-white shadow-md shadow-purple-500/25 hover:scale-[1.02]',
    checkBg: 'bg-purple-500/20 text-[#c084fc] border border-purple-400/30',
    guideBadge: 'bg-purple-500/20 text-[#c084fc] border border-purple-400/30',
  },
};

export default function FreeMock() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [series, setSeries] = useState([]);
  const [loading, setLoading] = useState(true);

  const examId = EXAM_NAV_ITEMS.some((e) => e.id === searchParams.get('exam'))
    ? searchParams.get('exam')
    : 'jee';

  const activeExam = EXAM_NAV_ITEMS.find((e) => e.id === examId) || EXAM_NAV_ITEMS[0];
  const theme = EXAM_THEMES[examId] || EXAM_THEMES.jee;

  useEffect(() => {
    publicService
      .testSeries()
      .then((d) => setSeries(d.test_series || []))
      .catch(() => setSeries([]))
      .finally(() => setLoading(false));
  }, []);

  const freeForExam = useMemo(() => {
    const free = series.filter((s) => Number(s.price) === 0);
    return free.filter((s) => seriesMatchesExam(s, examId));
  }, [series, examId]);

  const getTabStyle = (id) => {
    const isSelected = id === examId;
    if (!isSelected) {
      return 'border border-slate-700/80 bg-[#070c18] text-slate-400 backdrop-blur-md hover:border-[#00F0FF]/50 hover:bg-[#0a1224] hover:text-white';
    }
    if (id === 'jee') {
      return 'bg-gradient-to-r from-[#0D6EFD] to-[#2563eb] text-white shadow-md shadow-blue-500/25 border border-blue-400/40 scale-[1.02]';
    }
    if (id === 'neet') {
      return 'bg-gradient-to-r from-[#00F0FF] via-[#06b6d4] to-[#0891b2] text-slate-950 font-bold shadow-md shadow-cyan-500/25 border border-cyan-300/60 scale-[1.02]';
    }
    if (id === 'neetpg') {
      return 'bg-gradient-to-r from-[#7C3AED] to-purple-700 text-white shadow-md shadow-purple-500/25 border border-purple-400/40 scale-[1.02]';
    }
    return 'bg-white text-slate-900 shadow-md';
  };

  return (
    <div className="min-h-screen bg-[#090d16] bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] text-[#F5F6FA]">
      {/* 1. DARK NAVY HERO BANNER */}
      <section className="relative overflow-hidden bg-[#010d1f] text-white pb-20 pt-8 sm:pt-10 lg:pb-24 lg:pt-12 border-b border-slate-800/80">
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_75%_55%_at_75%_25%,rgba(0,240,255,0.12),transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_45%_at_15%_85%,rgba(13,110,253,0.18),transparent)]" />
        </div>

        <div className="container-app relative z-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#00F0FF] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                ₹0 · Full NTA CBT Pattern
              </div>

              <h1 className="mt-3.5 text-3xl font-extrabold tracking-tight text-[#F5F6FA] sm:text-4xl lg:text-5xl">
                Free Mock Tests for{' '}
                <span className={`mt-1 block text-transparent bg-gradient-to-r ${theme.headingGradient} bg-clip-text`}>
                  {activeExam.label}
                </span>
              </h1>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-[#94A3B8]">
                Experience real NTA CBT environment — live countdown timer, question palette, rank predictor, and instant answer keys. Select your target track below.
              </p>
            </div>

            {/* 3-Color Brand Exam Tabs */}
            <div className="flex flex-wrap gap-2.5">
              {EXAM_NAV_ITEMS.map((exam) => (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => setSearchParams({ exam: exam.id })}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${getTabStyle(exam.id)}`}
                >
                  {exam.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. OVERLAPPING CONTENT CONTAINER */}
      <div className="container-app relative z-10 -mt-10 lg:-mt-12 pb-16 pt-0">
        <div className="grid gap-8 items-start lg:grid-cols-5">
          
          {/* LEFT COLUMN: How Free CBT Mocks Work */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-800/90 bg-[#0c1427]/85 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-5">
                <div>
                  <h2 className="text-xl font-extrabold text-[#F5F6FA]">How Free CBT Mocks Work</h2>
                  <p className="mt-1 text-xs sm:text-sm text-[#94A3B8]">
                    4-step process to attempt your {activeExam.label} diagnostic test.
                  </p>
                </div>
                <span className={`rounded-lg px-3 py-1 text-xs font-extrabold uppercase tracking-wider ${theme.guideBadge}`}>
                  Guide
                </span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {[
                  'NTA-style exam screen',
                  'Live timer & section switch',
                  'Instant All India Rank',
                  'Detailed step solutions',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 rounded-xl border border-slate-800/80 bg-[#070c18]/80 px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 backdrop-blur-md">
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${theme.checkBg}`}>✓</span>
                    {item}
                  </div>
                ))}
              </div>

              <ol className="mt-8 space-y-4 border-t border-slate-800/80 pt-6">
                {STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-to-r from-[#0D6EFD] to-[#2563eb] text-xs font-extrabold text-white shadow-md shadow-blue-500/20">
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-xs sm:text-sm font-medium text-slate-300">{step}</p>
                  </li>
                ))}
              </ol>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-slate-800/80 pt-6">
                {!user ? (
                  <>
                    <Link
                      to="/signup"
                      className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${theme.primaryBtn}`}
                    >
                      Sign up free
                    </Link>
                    <Link
                      to="/student-login"
                      className="rounded-full border border-slate-700 bg-[#070c18] px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
                    >
                      Log in
                    </Link>
                  </>
                ) : freeForExam[0] ? (
                  <>
                    <Link
                      to={`/test-series/${freeForExam[0].slug}`}
                      className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${theme.primaryBtn}`}
                    >
                      Enroll in free mock
                    </Link>
                    <Link
                      to="/my-tests"
                      className="rounded-full border border-slate-700 bg-[#070c18] px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
                    >
                      My Tests
                    </Link>
                  </>
                ) : (
                  <Link
                    to={activeExam.catalogTo}
                    className={`rounded-full px-6 py-2.5 text-xs sm:text-sm font-bold transition-all duration-200 ${theme.primaryBtn}`}
                  >
                    Browse {activeExam.label} series
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Available Free Mock Series Product */}
          <div className="lg:col-span-2">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Available Free {activeExam.label} Series
              </p>
              <span className={`text-xs font-extrabold ${theme.accentText}`}>₹0 Tier</span>
            </div>

            {loading ? (
              <Skeleton className="h-72 w-full rounded-2xl" />
            ) : freeForExam.length > 0 ? (
              <div className="flex flex-col gap-4">
                {freeForExam.slice(0, 1).map((s) => (
                  <TestSeriesCard key={s.id} series={s} />
                ))}
              </div>
            ) : (
              <div className={`rounded-2xl border ${theme.cardBorder} p-6 text-center shadow-2xl transition-all duration-300`}>
                <div className={`mx-auto mb-3.5 flex h-10 w-10 items-center justify-center rounded-full border ${theme.badge}`}>
                  <span className="text-base font-extrabold">✦</span>
                </div>
                <p className="font-extrabold text-[#F5F6FA]">No free {activeExam.label} mock series currently available</p>
                <p className="mt-1.5 text-xs text-[#94A3B8] leading-relaxed">Try our general free diagnostic mock or explore paid series.</p>
                <div className="mt-5 flex flex-col gap-2.5">
                  <Link
                    to="/test-series/free-diagnostic"
                    className={`rounded-full px-5 py-2.5 text-xs font-bold transition-all duration-200 ${theme.emptyBtn}`}
                  >
                    Try Free Diagnostic Mock
                  </Link>
                  <Link to={activeExam.catalogTo} className={`mt-1 text-xs font-bold ${theme.accentText} hover:underline`}>
                    Browse {activeExam.label} Test Series →
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
