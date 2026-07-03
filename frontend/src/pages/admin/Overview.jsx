import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService, paymentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, StatCard, DataTable } from '../../components/ui.jsx';
import { formatDateTime } from '../../lib/format.js';

export default function AdminOverview() {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      const [s, pay] = await Promise.all([adminService.stats(), paymentService.admin()]);
      setStats(s);
      setRevenue(pay);
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  if (state === 'loading') return <LoadingScreen label="Loading dashboard…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const summary = revenue?.summary || {};
  const recentPayments = revenue?.payments?.slice(0, 8) || [];

  return (
    <div>
      <PageHeader
        title="Admin dashboard"
        subtitle="Students, tests, payments — live numbers."
        actions={<Link to="/admin/assessments" className="btn-primary">Manage assessments</Link>}
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total revenue" value={`₹${Number(summary.total || 0).toLocaleString('en-IN')}`} accent="text-emerald-600" />
        <StatCard label="Successful orders" value={summary.successful ?? 0} accent="text-brand-600" />
        <StatCard label="Total candidates" value={stats.totalCandidates} />
        <StatCard label="Pass rate" value={`${stats.passRate}%`} />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active assessments" value={stats.activeAssessments} />
        <StatCard label="Completion rate" value={`${stats.completionRate}%`} />
        <StatCard label="Average score" value={`${stats.avgPercentage}%`} />
        <StatCard label="Violations logged" value={stats.totalViolations} accent="text-red-600" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">Recent payments</h2>
          </div>
          {recentPayments.length === 0 ? (
            <p className="p-6 text-sm text-muted">No payments yet.</p>
          ) : (
            <DataTable
              columns={[
                { key: 'user_name', label: 'Student' },
                { key: 'series_title', label: 'Series' },
                { key: 'amount', label: 'Amount', render: (r) => `₹${Number(r.amount)}` },
                { key: 'status', label: 'Status', render: (r) => (
                  <span className={`text-xs font-semibold capitalize ${r.status === 'success' ? 'text-emerald-600' : r.status === 'failed' ? 'text-red-600' : 'text-amber-600'}`}>{r.status}</span>
                ) },
              ]}
              rows={recentPayments}
            />
          )}
        </div>

        <div className="card p-6">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Top performers</h2>
          {(stats.candidateRankings || stats.topScores).length === 0 ? (
            <p className="text-sm text-muted">No completed attempts yet.</p>
          ) : (
            <div className="space-y-3">
              {(stats.candidateRankings || stats.topScores).slice(0, 6).map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700 dark:bg-brand-950 dark:text-brand-300">{i + 1}</span>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{s.candidate_name}</p>
                      <p className="text-xs text-muted">{s.assessment_title}</p>
                    </div>
                  </div>
                  <span className="font-bold text-brand-600">{s.percentage}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Violation reports</h2>
          {stats.violationReports.length === 0 ? (
            <p className="text-sm text-muted">No violations recorded.</p>
          ) : (
            <div className="space-y-2">
              {stats.violationReports.map((v) => (
                <div key={v.violation_type} className="flex justify-between text-sm">
                  <span className="capitalize text-slate-700 dark:text-slate-300">{v.violation_type.replace(/_/g, ' ')}</span>
                  <span className="font-semibold text-red-600">{v.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <h2 className="mb-4 font-semibold text-slate-900 dark:text-white">Pass / fail breakdown</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <Tile label="Completed" value={stats.completedAttempts} />
            <Tile label="Passed" value={stats.passed} color="text-emerald-600" />
            <Tile label="Failed" value={stats.failed} color="text-red-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, color = 'text-slate-900 dark:text-white' }) {
  return (
    <div className="rounded-lg bg-slate-50 px-4 py-5 dark:bg-slate-800/50">
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}
