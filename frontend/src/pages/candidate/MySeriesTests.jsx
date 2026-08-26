import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { testSeriesService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState, Badge } from '../../components/ui.jsx';
import { ArrowLeft, ChevronRight, Zap, Clock, Compass } from 'lucide-react';

export default function MySeriesTests() {
  const { slug } = useParams();
  const [tests, setTests] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    testSeriesService.mySeriesTests(slug)
      .then((d) => { setTests(d.tests || []); setState('done'); })
      .catch(() => setState('error'));
  }, [slug]);

  if (state === 'loading') return <LoadingScreen label="Loading test series..." />;
  if (state === 'error') return <ErrorState message="Could not load tests. Enroll in this series first." />;

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12">
      <Link to="/my-tests" className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>Back to My Test Series</span>
      </Link>
      
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">Available CBT Mock Tests</h1>
        <p className="mt-0.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          Launch CBT format mock tests, attempt diagnostic questions, and view instant score analytics.
        </p>
      </div>

      {tests.length === 0 ? (
        <EmptyState
          title="No CBT Mock Tests Available Yet"
          message="Instructors are currently updating the tests for this series. Please check back soon or explore other available test series."
          action={
            <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
              <Link
                to="/my-tests"
                className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 transition"
              >
                ← Back to My Test Series
              </Link>
              <Link
                to="/test-series"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-extrabold text-white shadow-2xs hover:bg-blue-500 transition"
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Browse Catalog →</span>
              </Link>
            </div>
          }
        />
      ) : (
        <div className="space-y-2.5">
          {tests.map((t) => (
            <div
              key={t.id}
              className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl flex flex-wrap items-center justify-between gap-3 shadow-2xs hover:border-blue-500/40 transition"
            >
              <div>
                <p className="font-extrabold text-slate-900 dark:text-white text-sm">{t.label || t.title}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {t.duration_minutes} Mins
                  </span>
                  <span>•</span>
                  <span>CBT Mode</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {t.attempt_status === 'submitted' || t.attempt_status === 'auto_submitted' ? (
                  <>
                    <Badge color="green">{t.percentage != null ? `${t.percentage}% Score` : 'Completed'}</Badge>
                    {t.attempt_id && (
                      <Link
                        to={`/results/${t.attempt_id}`}
                        className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400 hover:bg-blue-600 hover:text-white transition"
                      >
                        View Solution
                      </Link>
                    )}
                  </>
                ) : t.attempt_status === 'in_progress' ? (
                  <Link
                    to={`/exam/${t.attempt_id}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-black text-amber-950 shadow-2xs hover:bg-amber-400 transition"
                  >
                    <Zap className="h-3.5 w-3.5" />
                    <span>Resume Test</span>
                  </Link>
                ) : (
                  <Link
                    to={`/assessments/${t.id}/instructions`}
                    className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-extrabold text-white shadow-2xs hover:bg-blue-500 transition"
                    onClick={() => sessionStorage.setItem('assessmentReturn', `/my-tests/${slug}`)}
                  >
                    <span>Start CBT Test</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
