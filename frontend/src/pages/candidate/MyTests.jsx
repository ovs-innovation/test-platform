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
                  <span className="absolute left-3.5 top-3.5 rounded-md border border-blue-400/40 bg-blue-500/25 px-2.5 py-0.5 text-[10px] font-black uppercase text-cyan-300 backdrop-blur-md">
                    {e.exam_type || 'GENERAL'}
                  </span>

                  {/* Top-Right Enrolled Status Pill */}
                  <span className="absolute right-3.5 top-3.5 rounded-md border border-emerald-400/40 bg-emerald-500/25 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-300 backdrop-blur-md flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Enrolled
                  </span>

                  {/* Banner Title */}
                  <h3 className="absolute bottom-3 left-3.5 right-3.5 text-sm font-black text-white leading-tight line-clamp-1">
                    {e.title}
                  </h3>
                </div>

                {/* Footer Container */}
                <div className="p-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/60 text-xs">
                  <div>
                    {/* Primary Package Count */}
                    <p className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 text-sm">
                      <span>📚</span>
                      <span>
                        {e.program_type === 'Two Year' || e.planned_tests === 60
                          ? '60 Tests Planned'
                          : e.planned_tests > 0
                          ? `${e.planned_tests} Tests Included`
                          : `${e.linked_tests || 0} Tests Included`}
                      </span>
                    </p>

                    {/* Secondary Status & Schedule Note */}
                    <p className="mt-0.5 text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">
                      {e.program_type === 'Two Year' || e.planned_tests === 60
                        ? 'Detailed schedule will be published by Admin'
                        : e.scheduled_tests > 0
                        ? 'Schedule available'
                        : 'Schedule being prepared'}
                    </p>
                    {e.live_tests === 0 && e.planned_tests > 0 && (
                      <p className="text-[10px] font-bold text-[#0D6EFD] mt-0.5">
                        0 currently live
                      </p>
                    )}
                  </div>

                  {/* Dynamic Button Action */}
                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-600 group-hover:bg-blue-500 px-3.5 py-1.5 text-xs font-black text-white shadow-2xs transition shrink-0 ml-2">
                    <span>
                      {e.live_tests > 0
                        ? 'Start Test'
                        : e.program_type === 'Two Year' || e.planned_tests === 60
                        ? 'Program Details'
                        : e.scheduled_tests > 0
                        ? 'View Schedule'
                        : 'View Program'}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 2. INDIVIDUALLY ASSIGNED CBT MOCK TESTS */}
      {availableTests.length > 0 && (
        <section className="space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <Compass className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>Assigned CBT Mock Assessments ({availableTests.length})</span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {availableTests.map((a) => (
              <AssessmentCard key={a.id} a={a} />
            ))}
          </div>
        </section>
      )}

      {/* 3. EMPTY STATE */}
      {!hasContent && (
        <div className="space-y-6">
          <EmptyState
            title="No Active Test Packages or Assigned Mocks"
            message="You are not enrolled in any test series yet, and no custom diagnostic CBT mock tests are assigned to your account."
            action={
              <Link
                to="/test-series"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-extrabold text-white shadow-md hover:bg-blue-500 transition"
              >
                <Compass className="h-4 w-4" />
                <span>Explore Full Test Series Catalog →</span>
              </Link>
            }
          />

          <div className="saas-card p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-2xl space-y-4">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Explore Popular Entrance Preparation Packs
            </h3>

            <div className="grid gap-3 sm:grid-cols-3">
              <Link
                to="/test-series"
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 p-3.5 transition hover:border-blue-500/40 space-y-1"
              >
                <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[10px] font-black text-blue-600 dark:text-cyan-300 border border-blue-500/20">
                  NEET MEDICAL PREP
                </span>
                <p className="font-extrabold text-slate-900 dark:text-white text-xs mt-1">Full-Length NCERT Mock Tests</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">Physics, Chemistry, Botany & Zoology.</p>
              </Link>

              <Link
                to="/test-series"
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 p-3.5 transition hover:border-blue-500/40 space-y-1"
              >
                <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-black text-emerald-600 dark:text-emerald-300 border border-emerald-500/20">
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
