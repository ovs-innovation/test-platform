import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, DataTable } from '../../components/ui.jsx';
import { SubjectBar } from '../../components/design.jsx';
import { formatDateTime } from '../../lib/format.js';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      setData(await studentService.analytics());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  const subjects = useMemo(() => {
    const list = data?.subject_breakdown || [];
    return {
      weak: [...list].sort((a, b) => a.accuracy - b.accuracy).slice(0, 5),
      strong: [...list].sort((a, b) => b.accuracy - a.accuracy).slice(0, 5),
    };
  }, [data]);

  if (state === 'loading') return <LoadingScreen label="Loading…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const { summary, attempts, trend } = data;

  return (
    <div>
      <PageHeader title="Analytics" subtitle="Tests taken, average score, and subject-wise accuracy." />

      <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden border border-slate-200 bg-slate-200 dark:border-slate-700 dark:bg-slate-700 sm:grid-cols-4">
        {[
          ['Tests', summary.tests_taken],
          ['Avg score', `${summary.avg_score}%`],
          ['Best', `${summary.best_score}%`],
          ['Pass rate', `${summary.pass_rate}%`],
        ].map(([label, val]) => (
          <div key={label} className="bg-white px-4 py-3 dark:bg-slate-900">
            <p className="text-xs text-slate-500">{label}</p>
            <p className="mt-0.5 text-lg font-semibold">{val}</p>
          </div>
        ))}
      </div>

      {(subjects.weak.length > 0 || subjects.strong.length > 0) && (
        <div className="mb-8 grid gap-6 lg:grid-cols-2">
          {subjects.weak.length > 0 && (
            <div className="border border-slate-200 p-5 dark:border-slate-700">
              <h2 className="text-sm font-semibold">Weak subjects</h2>
              <div className="mt-4 space-y-3">
                {subjects.weak.map((s) => (
                  <SubjectBar key={s.subject} label={s.subject} value={s.accuracy} variant="weak" />
                ))}
              </div>
            </div>
          )}
          {subjects.strong.length > 0 && (
            <div className="border border-slate-200 p-5 dark:border-slate-700">
              <h2 className="text-sm font-semibold">Strong subjects</h2>
              <div className="mt-4 space-y-3">
                {subjects.strong.map((s) => (
                  <SubjectBar key={s.subject} label={s.subject} value={s.accuracy} variant="strong" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {trend.length > 0 && (
        <div className="mb-8 border border-slate-200 p-5 dark:border-slate-700">
          <h2 className="text-sm font-semibold">Score trend</h2>
          <div className="mt-4 flex items-end gap-2 overflow-x-auto pb-1">
            {trend.map((t, i) => (
              <div key={i} className="flex min-w-[48px] flex-col items-center gap-1">
                <span className="text-xs font-medium">{t.percentage}%</span>
                <div
                  className="w-10 bg-brand-600"
                  style={{ height: `${Math.max(8, t.percentage)}px` }}
                  title={`${t.title}: ${t.percentage}%`}
                />
                <span className="text-[10px] text-muted">
                  {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
          <h2 className="text-sm font-semibold">All attempts</h2>
        </div>
        {attempts.length === 0 ? (
          <p className="p-4 text-sm text-muted">No attempts yet. <Link to="/my-tests" className="text-brand-700 underline">Start a test</Link></p>
        ) : (
          <DataTable
            columns={[
              { key: 'title', label: 'Test' },
              { key: 'percentage', label: 'Score', render: (r) => (r.percentage != null ? `${r.percentage}%` : '—') },
              { key: 'rank', label: 'Rank', render: (r) => (r.rank ? `#${r.rank}` : '—') },
              { key: 'percentile', label: 'Percentile', render: (r) => (r.percentile != null ? `${r.percentile}%` : '—') },
              { key: 'submitted_at', label: 'Date', render: (r) => formatDateTime(r.submitted_at) },
            ]}
            rows={attempts}
          />
        )}
      </div>
    </div>
  );
}
