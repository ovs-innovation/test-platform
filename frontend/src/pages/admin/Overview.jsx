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
        <StatCard label="Total revenue" value={`₹${Number(summary.total || 0).toLocaleString('en-IN')}`} accent="text-emerald-400" />
        <StatCard label="Successful orders" value={summary.successful ?? 0} accent="text-cyan-400" />
        <StatCard label="Total candidates" value={stats.totalCandidates} accent="text-slate-100" />
        <StatCard label="Pass rate" value={`${stats.passRate}%`} accent="text-blue-400" />
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active assessments" value={stats.activeAssessments} accent="text-[#00F0FF]" />
        <StatCard label="Completion rate" value={`${stats.completionRate}%`} accent="text-indigo-400" />
        <StatCard label="Average score" value={`${stats.avgPercentage}%`} accent="text-amber-400" />
        <StatCard label="Violations logged" value={stats.totalViolations} accent="text-rose-400" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card overflow-hidden border border-slate-800/90 bg-[#0b1430]">
          <div className="border-b border-slate-800/80 px-6 py-4">
            <h2 className="font-extrabold text-white text-base">Recent payments</h2>
          </div>
          {recentPayments.length === 0 ? (
            <p className="p-6 text-sm text-slate-400">No payments recorded yet.</p>
          ) : (
            <DataTable
              columns={[
                { key: 'user_name', label: 'Student', render: (r) => <span className="font-bold text-white">{r.user_name}</span> },
                { key: 'series_title', label: 'Series', render: (r) => <span className="text-slate-300 text-xs truncate max-w-[150px] inline-block">{r.series_title}</span> },
                { key: 'amount', label: 'Amount', render: (r) => <span className="font-extrabold text-cyan-300">₹{Number(r.amount)}</span> },
                { key: 'status', label: 'Status', render: (r) => (
                  <span className={`text-xs font-black capitalize px-2.5 py-1 rounded-full border ${r.status === 'success' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' : r.status === 'failed' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' : 'bg-amber-500/20 text-amber-300 border-amber-500/30'}`}>{r.status}</span>
                ) },
              ]}
              rows={recentPayments}
            />
          )}
        </div>

        <div className="card p-6 border border-slate-800/90 bg-[#0b1430]">
          <h2 className="mb-4 font-extrabold text-white text-base">Top performers</h2>
          {(stats.candidateRankings || stats.topScores).length === 0 ? (
            <p className="text-sm text-slate-400">No completed attempts yet.</p>
          ) : (
            <div className="space-y-3">
              {(stats.candidateRankings || stats.topScores).slice(0, 6).map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm p-3 rounded-2xl bg-[#070e24] border border-slate-800/80">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600/30 text-xs font-extrabold text-cyan-300 border border-blue-500/40">{i + 1}</span>
                    <div>
                      <p className="font-bold text-white">{s.candidate_name}</p>
                      <p className="text-xs text-slate-400">{s.assessment_title}</p>
                    </div>
                  </div>
                  <span className="font-black text-emerald-400 text-sm">{s.percentage}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="card p-6 border border-slate-800/90 bg-[#0b1430]">
          <h2 className="mb-4 font-extrabold text-white text-base">Violation reports</h2>
          {stats.violationReports.length === 0 ? (
            <p className="text-sm text-slate-400">No violations recorded.</p>
          ) : (
            <div className="space-y-2.5">
              {stats.violationReports.map((v) => (
                <div key={v.violation_type} className="flex justify-between items-center text-sm p-3 rounded-xl bg-[#070e24] border border-slate-800/60">
                  <span className="capitalize text-slate-200 font-semibold">{v.violation_type.replace(/_/g, ' ')}</span>
                  <span className="font-black text-rose-400 bg-rose-500/20 border border-rose-500/30 px-2.5 py-0.5 rounded-full text-xs">{v.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card p-6 border border-slate-800/90 bg-[#0b1430]">
          <h2 className="mb-4 font-extrabold text-white text-base">Pass / fail breakdown</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <Tile label="Completed" value={stats.completedAttempts} color="text-white" />
            <Tile label="Passed" value={stats.passed} color="text-emerald-400" />
            <Tile label="Failed" value={stats.failed} color="text-rose-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tile({ label, value, color = 'text-white' }) {
  return (
    <div className="rounded-2xl bg-[#070e24] px-4 py-5 border border-slate-800/80">
      <p className={`text-2xl sm:text-3xl font-black ${color}`}>{value}</p>
      <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
    </div>
  );
}
