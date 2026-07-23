import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { testSeriesService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, Badge } from '../../components/ui.jsx';

export default function MySeriesTests() {
  const { slug } = useParams();
  const [tests, setTests] = useState([]);
  const [state, setState] = useState('loading');

  useEffect(() => {
    testSeriesService.mySeriesTests(slug)
      .then((d) => { setTests(d.tests); setState('done'); })
      .catch(() => setState('error'));
  }, [slug]);

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error') return <ErrorState message="Could not load tests. Enroll in this series first." />;

  return (
    <div className="space-y-6 pb-12">
      <Link to="/my-tests" className="inline-flex items-center gap-1.5 text-xs font-bold text-[#60a5fa] hover:underline">
        ← Back to My Test Series
      </Link>
      
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Available CBT Mock Tests</h1>
        <p className="mt-1 text-xs sm:text-sm font-medium text-slate-400">
          Launch NTA CBT format mock tests, attempt diagnostic questions, and view instant score analytics.
        </p>
      </div>

      <div className="space-y-3.5">
        {tests.map((t) => (
          <div key={t.id} className="rounded-2xl border border-slate-800/90 bg-[#0b1430] p-4 sm:p-5 shadow-xl flex flex-wrap items-center justify-between gap-4 transition hover:border-blue-500/40">
            <div>
              <p className="font-extrabold text-white text-base">{t.label || t.title}</p>
              <div className="mt-1 flex items-center gap-3 text-xs font-semibold text-slate-400">
                <span>⏱️ {t.duration_minutes} Minutes</span>
                <span>•</span>
                <span>NTA CBT Interface</span>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              {t.attempt_status === 'submitted' || t.attempt_status === 'auto_submitted' ? (
                <>
                  <Badge color="green">{t.percentage != null ? `${t.percentage}% Score` : 'Completed'}</Badge>
                  {t.attempt_id && (
                    <Link to={`/results/${t.attempt_id}`} className="rounded-full border border-blue-500/30 bg-blue-500/15 px-4 py-2 text-xs font-bold text-blue-300 hover:bg-[#2563eb] hover:text-white transition">
                      View Solution
                    </Link>
                  )}
                </>
              ) : t.attempt_status === 'in_progress' ? (
                <Link to={`/exam/${t.attempt_id}`} className="rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-5 py-2 text-xs font-extrabold text-amber-950 shadow-md">
                  ⚡ Resume Test
                </Link>
              ) : (
                <Link
                  to={`/assessments/${t.id}/instructions`}
                  className="rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-2 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition hover:scale-105"
                  onClick={() => sessionStorage.setItem('assessmentReturn', `/my-tests/${slug}`)}
                >
                  Start CBT Test →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
