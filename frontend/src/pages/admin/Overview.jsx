import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService, paymentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, StatCard, DataTable } from '../../components/ui.jsx';

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      const [sData, rData] = await Promise.all([
        adminService.stats(),
        paymentService.admin().catch(() => ({ summary: {}, payments: [] })),
      ]);
      setStats(sData);
      setRevenue(rData);
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (state === 'loading') return <LoadingScreen label="Loading enterprise dashboard…" />;
  if (state === 'error' || !stats) return <ErrorState onRetry={load} />;

  const summary = revenue?.summary || {};
  const recentPayments = revenue?.payments?.slice(0, 8) || [];
  const performers = stats.candidateRankings || stats.topScores || [];

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Admin Dashboard"
        subtitle="Live metrics & performance overview as per section 7.1 requirements."
        actions={<Link to="/admin/assessments" className="btn-primary">Manage Assessments</Link>}
      />

      {/* Primary Section 7.1 Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Students"
          value={stats.totalCandidates ?? 0}
          accent="text-cyan-400"
        />
        <StatCard
          label="Active Students"
          value={stats.activeStudents ?? 0}
          accent="text-emerald-400"
        />
        <StatCard
          label="Total Test Series"
          value={stats.totalTestSeries ?? 0}
          accent="text-amber-400"
        />
        <StatCard
          label="Total Revenue"
          value={`₹${Number(summary.total || 0).toLocaleString('en-IN')}`}
          accent="text-emerald-300"
        />
      </div>

      {/* Secondary Performance Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Test Attempts"
          value={stats.totalAttempts ?? 0}
          accent="text-blue-400"
        />
        <StatCard
          label="Active Assessments"
          value={stats.activeAssessments ?? 0}
          accent="text-indigo-400"
        />
        <StatCard
          label="Pass Rate"
          value={`${stats.passRate}%`}
          accent="text-emerald-400"
        />
        <StatCard
          label="Average Score"
          value={`${stats.avgPercentage}%`}
          accent="text-yellow-400"
        />
      </div>

      {/* Section 7.1 Tables & Lists (Recent Payments & Top Performing Students) */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Payments */}
        <div className="card overflow-hidden border border-slate-800/90 bg-[#0b1430]">
          <div className="border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
            <h2 className="font-extrabold text-white text-base">Recent Payments</h2>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              {summary.successful ?? 0} Successful
            </span>
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

        {/* Top Performing Students */}
        <div className="card p-6 border border-slate-800/90 bg-[#0b1430]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-extrabold text-white text-base">Top Performing Students</h2>
            <span className="text-xs text-slate-400 font-medium">Ranked by score %</span>
          </div>
          {performers.length === 0 ? (
            <p className="text-sm text-slate-400">No completed attempts yet.</p>
          ) : (
            <div className="space-y-3">
              {performers.slice(0, 6).map((s, i) => (
                <div key={i} className="flex items-center justify-between text-sm p-3 rounded-2xl bg-[#070e24] border border-slate-800/80 hover:border-amber-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/20 text-xs font-extrabold text-amber-300 border border-amber-500/30 shadow-inner">
                      #{i + 1}
                    </span>
                    <div>
                      <p className="font-bold text-white">{s.candidate_name}</p>
                      <p className="text-xs text-slate-400 truncate max-w-[200px]">{s.assessment_title}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-emerald-400 text-sm block">{s.percentage}%</span>
                    <span className="text-[10px] text-slate-400 font-mono">{s.marks_obtained}/{s.total_marks} Marks</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Attempt & Violation Breakdowns */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6 border border-slate-800/90 bg-[#0b1430]">
          <h2 className="mb-4 font-extrabold text-white text-base">Violation Reports</h2>
          {(!stats.violationReports || stats.violationReports.length === 0) ? (
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
          <h2 className="mb-4 font-extrabold text-white text-base">Pass / Fail Breakdown</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <Tile label="Completed" value={stats.completedAttempts ?? 0} color="text-white" />
            <Tile label="Passed" value={stats.passed ?? 0} color="text-emerald-400" />
            <Tile label="Failed" value={stats.failed ?? 0} color="text-rose-400" />
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
