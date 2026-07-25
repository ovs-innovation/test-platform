import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { testSeriesService, assessmentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
import { getTestSeriesCover } from '../../lib/testSeriesCover.js';
import { AssessmentCard } from './AssessmentList.jsx';
import { BookOpen, Compass, CheckCircle2, ChevronRight } from 'lucide-react';

export default function MyTests() {
  const [enrollments, setEnrollments] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    Promise.all([
      testSeriesService.myEnrollments().catch(() => ({ enrollments: [] })),
      assessmentService.listAvailable().catch(() => []),
    ])
      .then(([enrollRes, tests]) => {
        setEnrollments(enrollRes.enrollments || []);
        setAvailableTests(tests || []);
        setState('done');
      })
      .catch(() => setState('error'));
  }, []);

  if (state === 'loading') return <LoadingScreen label="Loading test packages..." />;
  if (state === 'error') return <ErrorState />;

  const hasContent = enrollments.length > 0 || availableTests.length > 0;

  return (
    <div className="space-y-6 pb-12 max-w-[1440px] mx-auto">
      <PageHeader
        title="My Test Series & CBT Mocks"
        subtitle="Enrolled test packages and assigned NTA CBT diagnostic mock exams."
      />

      {/* 1. ENROLLED TEST SERIES PACKAGES */}
      {enrollments.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>Enrolled Test Series Packages ({enrollments.length})</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrollments.map((e) => (
              <Link
                key={e.id}
                to={`/my-tests/${e.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#111827] shadow-2xs transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/80 hover:shadow-xl"
              >
                {/* Upper Side: Image Banner & Title */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={getTestSeriesCover(e)}
                    alt={e.title}
                    className="h-full w-full object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

                  {/* Top-Left Category Badge */}
                  <span className="absolute left-3 top-3 rounded-full border border-blue-400/40 bg-blue-500/30 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-cyan-300 backdrop-blur-md shadow-md">
                    {e.exam_type || 'GENERAL'}
                  </span>

                  {/* Top-Right Enrolled Status Pill */}
                  <span className="absolute right-3 top-3 rounded-full border border-emerald-400/40 bg-emerald-500/30 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-emerald-300 backdrop-blur-md shadow-md">
                    Enrolled
                  </span>

                  {/* Banner Title */}
                  <h3 className="absolute bottom-3 left-4 right-4 text-sm font-black text-white leading-tight line-clamp-1">
                    {e.title}
                  </h3>
                </div>

                {/* Footer Container */}
                <div className="p-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs">
                  <div>
                    <p className="font-extrabold text-slate-800 dark:text-slate-200">
                      {e.available_tests} {e.available_tests === 1 ? 'Test' : 'Tests'} Available
                    </p>
                    <p className="mt-0.5 text-[10.5px] text-slate-400">
                      Expires {new Date(e.expires_at).toLocaleDateString('en-GB')}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-600 group-hover:bg-blue-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-2xs transition">
                    <span>Open</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 2. DIRECTLY ASSIGNED CBT MOCK TESTS */}
      {availableTests.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Assigned CBT Mock Tests ({availableTests.length})</span>
          </h2>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {availableTests.map((a) => (
              <AssessmentCard key={a.id} a={a} />
            ))}
          </div>
        </section>
      )}

      {/* 3. EMPTY STATE & CATALOG EXPLORER */}
      {!hasContent && (
        <div className="space-y-6">
          <EmptyState
            title="No Tests Enrolled Yet"
            message="Explore structured NTA CBT test series packages tailored for JEE Main, NEET UG, and Foundation exam tracks."
            action={
              <Link
                to="/test-series"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md transition hover:bg-blue-500"
              >
                <Compass className="h-4 w-4" />
                <span>Browse Test Series Catalog →</span>
              </Link>
            }
          />

          <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-5 shadow-2xs space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider flex items-center justify-between">
              <span>🎯 Available Exam Preparation Tracks</span>
              <Link to="/test-series" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-bold">
                View All Catalog →
              </Link>
            </h3>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                to="/test-series"
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 p-3.5 transition hover:border-blue-500/40 space-y-1"
              >
                <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-black text-blue-600 dark:text-cyan-300 border border-blue-500/20">
                  NEET UG MEDICAL
                </span>
                <p className="font-extrabold text-slate-900 dark:text-white text-xs mt-1">NCERT-Aligned Biology & Physics</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">720 marks NTA CBT Mocks with solutions.</p>
              </Link>

              <Link
                to="/test-series"
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 p-3.5 transition hover:border-blue-500/40 space-y-1"
              >
                <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-black text-indigo-600 dark:text-indigo-300 border border-indigo-500/20">
                  JEE MAIN & ADVANCED
                </span>
                <p className="font-extrabold text-slate-900 dark:text-white text-xs mt-1">Physics, Chemistry & Maths CBT</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Numerical entry & MCQ rank predictor.</p>
              </Link>

              <Link
                to="/test-series"
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 p-3.5 transition hover:border-blue-500/40 space-y-1"
              >
                <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-black text-purple-600 dark:text-purple-300 border border-purple-500/20">
                  FOUNDATION & OLYMPIAD
                </span>
                <p className="font-extrabold text-slate-900 dark:text-white text-xs mt-1">Class 9th & 10th Science & Math</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Conceptual mastery & diagnostic tests.</p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
