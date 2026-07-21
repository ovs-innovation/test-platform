import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { ErrorState, EmptyState, Badge, DataTable, PageHeader, StatCard, PageSkeleton } from '../../components/ui.jsx';
import { AssessmentCard } from './AssessmentList.jsx';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      setData(await authService.candidateDashboard());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    if (!user) return;
    load();
  }, [user]);

  if (state === 'loading') {
    return (
      <div>
        <PageHeader
          title={`Welcome, ${user?.name?.split(' ')[0] || 'student'}`}
          subtitle="Your pending tests and recent results."
        />
        <PageSkeleton />
      </div>
    );
  }
  if (state === 'error') return <ErrorState onRetry={load} />;

  const { pending, upcoming = [], completed, stats } = data;
  const resume = pending.find((a) => a.attempt_status === 'in_progress');
  const passRate = completed.length > 0
    ? Math.round((completed.filter((c) => c.passed).length / completed.length) * 100)
    : null;

  return (
    <div>
      <PageHeader
        title={`Welcome, ${user?.name?.split(' ')[0] || 'student'}`}
        subtitle="Your pending tests and recent results."
      />

      {resume && (
        <div className="mb-6 flex items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-900 dark:bg-amber-950/30">
          <p className="text-sm text-amber-900 dark:text-amber-200">
            <span className="font-semibold">In progress:</span> {resume.title}
          </p>
          <Link to={`/exam/${resume.attempt_id}`} className="btn-primary btn-sm shrink-0">
            Continue
          </Link>
        </div>
      )}

      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Invited" value={stats.totalInvited} />
        <StatCard label="Pending" value={stats.pending} />
        <StatCard label="Completed" value={stats.completed} />
        <StatCard label="Pass rate" value={passRate != null ? `${passRate}%` : '—'} />
      </div>

      <div className="mb-8 flex flex-wrap gap-3 text-sm">
        <Link to="/my-tests" className="btn-primary">My tests</Link>
        <Link to="/test-series" className="btn-secondary">Browse series</Link>
        <Link to="/analytics" className="btn-secondary">Analytics</Link>
        <Link to="/assessments" className="btn-secondary">Invited tests</Link>
      </div>

      {upcoming.length > 0 && (
        <section className="mb-10">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white">Upcoming Tests</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((a) => (
              <div key={a.id} className="card relative flex flex-col justify-between overflow-hidden p-5 shadow-card hover:shadow-elevated transition-shadow border border-slate-100 dark:border-slate-800 bg-white">
                <div className="absolute top-0 right-0 rounded-bl bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  Scheduled
                </div>
                <div className="pr-12">
                  <h3 className="font-semibold text-slate-900 dark:text-white">{a.title}</h3>
                  {a.description && <p className="mt-1.5 text-xs text-slate-500 line-clamp-2">{a.description}</p>}
                </div>
                <div className="mt-5 border-t border-slate-50 pt-4 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Starts at</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                      {new Date(a.available_from).toLocaleString()}
                    </span>
                  </div>
                  <Link to={`/assessments/${a.id}/instructions`} className="btn-secondary btn-sm">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900 dark:text-white">Pending</h2>
          {pending.length > 3 && (
            <Link to="/assessments" className="text-sm text-brand-700 hover:underline dark:text-brand-400">View all</Link>
          )}
        </div>
        {pending.length === 0 ? (
          <p className="text-sm text-muted">No pending tests. Enroll in a test series or wait for an invite.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pending.slice(0, 3).map((a) => (
              <AssessmentCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">Recent results</h2>
        {completed.length === 0 ? (
          <EmptyState
            title="No results yet"
            message="Complete your first mock test."
            action={<Link to="/test-series" className="btn-primary">Test series</Link>}
          />
        ) : (
          <div className="overflow-hidden border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
            <DataTable
              columns={[
                { key: 'title', label: 'Test' },
                { key: 'percentage', label: 'Score', render: (r) => (r.percentage != null ? `${r.percentage}%` : '—') },
                { key: 'passed', label: 'Result', render: (r) => (
                  r.passed != null ? <Badge color={r.passed ? 'green' : 'red'}>{r.passed ? 'Pass' : 'Fail'}</Badge> : '—'
                ) },
                { key: 'view', label: '', render: (r) => r.attempt_id && (
                  <Link to={`/results/${r.attempt_id}`} className="text-brand-700 hover:underline dark:text-brand-400">View</Link>
                ) },
              ]}
              rows={completed.slice(0, 8)}
            />
          </div>
        )}
      </section>
    </div>
  );
}
