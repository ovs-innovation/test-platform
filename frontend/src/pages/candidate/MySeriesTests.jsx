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
    <div>
      <Link to="/my-tests" className="text-sm text-brand-600 hover:underline">← My test series</Link>
      <h1 className="mt-4 text-2xl font-bold text-slate-900">Tests</h1>
      <div className="mt-6 space-y-3">
        {tests.map((t) => (
          <div key={t.id} className="card flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-medium text-slate-900">{t.label || t.title}</p>
              <p className="text-sm text-slate-500">{t.duration_minutes} min</p>
            </div>
            <div className="flex items-center gap-2">
              {t.attempt_status === 'submitted' || t.attempt_status === 'auto_submitted' ? (
                <>
                  <Badge color="green">{t.percentage != null ? `${t.percentage}%` : 'Done'}</Badge>
                  {t.attempt_id && <Link to={`/results/${t.attempt_id}`} className="btn-secondary text-sm">Result</Link>}
                </>
              ) : t.attempt_status === 'in_progress' ? (
                <Link to={`/exam/${t.attempt_id}`} className="btn-primary text-sm">Resume</Link>
              ) : (
                <Link
                  to={`/assessments/${t.id}/instructions`}
                  className="btn-primary text-sm"
                  onClick={() => sessionStorage.setItem('assessmentReturn', `/my-tests/${slug}`)}
                >
                  Start
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
