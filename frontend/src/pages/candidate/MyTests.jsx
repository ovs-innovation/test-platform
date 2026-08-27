import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { testSeriesService, assessmentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
import { getTestSeriesCover } from '../../lib/testSeriesCover.js';
import { AssessmentCard } from './AssessmentList.jsx';
import { BookOpen, Compass, CheckCircle2, ChevronRight, Layers, Clock } from 'lucide-react';

export default function MyTests() {
  const [enrollments, setEnrollments] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [state, setState] = useState('loading');
  const [activeTab, setActiveTab] = useState('all');

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

  const completedTests = useMemo(
    () => availableTests.filter((t) => t.status === 'completed' || t.attempt_status === 'completed'),
    [availableTests]
  );
  const upcomingTests = useMemo(
    () => availableTests.filter((t) => t.status === 'available' || t.status === 'upcoming' || t.attempt_status === 'in_progress'),
    [availableTests]
  );

  if (state === 'loading') return <LoadingScreen label="Loading test packages..." />;
  if (state === 'error') return <ErrorState />;

  const hasContent = enrollments.length > 0 || availableTests.length > 0;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">My Tests & Exam Packages</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enrolled test series packages, assigned NEET / JEE CBT diagnostic mock exams, and test attempt history.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1 rounded-xl bg-slate-100 dark:bg-slate-900 p-1 border border-slate-200/80 dark:border-slate-800">
          {[
            { id: 'all', label: `All (${enrollments.length + availableTests.length})` },
            { id: 'programs', label: `Programs (${enrollments.length})` },
            { id: 'upcoming', label: `Available (${upcomingTests.length})` },
            { id: 'completed', label: `Completed (${completedTests.length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-xs dark:bg-slate-800 dark:text-blue-400'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. ENROLLED TEST SERIES PACKAGES */}
      {(activeTab === 'all' || activeTab === 'programs') && enrollments.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Enrolled Test Series Packages ({enrollments.length})</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {enrollments.map((e) => (
              <Link
                key={e.id}
                to={`/my-tests/${e.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5"
              >
                {/* Upper Banner Image */}
                <div className="relative aspect-[21/9] w-full overflow-hidden bg-slate-950">
                  <img
                    src={getTestSeriesCover(e)}
                    alt={e.title}
                    className="h-full w-full object-cover object-[center_20%] transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />

                  <span className="absolute left-3 top-3 rounded-md bg-blue-600/90 px-2 py-0.5 text-[10px] font-extrabold uppercase text-white backdrop-blur-md">
                    {e.exam_type || 'GENERAL'}
                  </span>

                  <span className="absolute right-3 top-3 rounded-md bg-emerald-600/90 px-2 py-0.5 text-[10px] font-extrabold uppercase text-white backdrop-blur-md flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Enrolled
                  </span>

                  <h3 className="absolute bottom-2.5 left-3 right-3 text-xs font-extrabold text-white line-clamp-1">
                    {e.title}
                  </h3>
                </div>

                {/* Info Footer */}
                <div className="p-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/40 text-xs">
                  <div>
                    <p className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                      <span>📚</span>
                      <span>
                        {e.program_type === 'Two Year' || e.planned_tests === 60
                          ? '60 Tests Planned'
                          : e.planned_tests > 0
                          ? `${e.planned_tests} Tests Included`
                          : `${e.linked_tests || 0} Tests Included`}
                      </span>
                    </p>
                    <p className="mt-0.5 text-[10.5px] font-medium text-slate-500 dark:text-slate-400">
                      {e.program_type === 'Two Year' || e.planned_tests === 60
                        ? 'Schedule published by Admin'
                        : e.scheduled_tests > 0
                        ? 'Schedule available'
                        : 'Schedule being prepared'}
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 rounded-lg bg-blue-600 group-hover:bg-blue-500 px-3 py-1.5 text-xs font-bold text-white shadow-xs transition shrink-0 ml-2">
                    <span>
                      {e.live_tests > 0
                        ? 'Start Test'
                        : e.program_type === 'Two Year' || e.planned_tests === 60
                        ? 'Details'
                        : 'View Schedule'}
                    </span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 2. ASSIGNED MOCK ASSESSMENTS */}
      {(activeTab === 'all' || activeTab === 'upcoming' || activeTab === 'completed') && (
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
            <span>
              Assigned CBT Assessments (
              {activeTab === 'upcoming'
                ? upcomingTests.length
                : activeTab === 'completed'
                ? completedTests.length
                : availableTests.length}
              )
            </span>
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(activeTab === 'upcoming'
              ? upcomingTests
              : activeTab === 'completed'
              ? completedTests
              : availableTests
            ).map((a) => (
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
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-500 transition"
              >
                <Compass className="h-4 w-4" />
                <span>Explore Full Test Series Catalog →</span>
              </Link>
            }
          />
        </div>
      )}
    </div>
  );
}
