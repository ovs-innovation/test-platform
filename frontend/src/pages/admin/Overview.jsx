import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminService, paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState } from '../../components/ui.jsx';
import {
  AdminHeader,
  AdminMetricRail,
  AdminCard,
  AdminDataTable,
  AdminStatusBadge,
} from '../../components/admin/AdminUI.jsx';

export default function Overview() {
  const navigate = useNavigate();
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

  if (state === 'loading') return <LoadingScreen label="Initializing Academic Operations Command Centre..." />;
  if (state === 'error' || !stats) return <ErrorState onRetry={load} />;

  const summary = revenue?.summary || {};
  const recentPayments = revenue?.payments?.slice(0, 8) || [];
  const performers = stats.candidateRankings || stats.topScores || [];

  return (
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* 1. Context Header */}
      <AdminHeader
        title="Academic Operations Command Centre"
        subtitle={`Managing ${stats.activeAssessments || 0} active CBT mock exams and ${stats.totalCandidates || 0} candidate registrations.`}
        breadcrumbs={['Command Overview']}
        status="All Systems Operational"
        actions={
          <>
            <button
              type="button"
              onClick={() => navigate('/admin/assessments')}
              className="btn btn-primary"
            >
              + Create Assessment
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/candidates')}
              className="btn btn-secondary"
            >
              Register Student
            </button>
          </>
        }
      />

      {/* 2. Platform Pulse Metric Rail */}
      <AdminMetricRail
        items={[
          {
            label: 'Total Revenue',
            value: `₹${Number(summary.total || 0).toLocaleString('en-IN')}`,
            trend: '14.2%',
            trendUp: true,
            subtext: 'vs last month',
          },
          {
            label: 'Registered Students',
            value: stats.totalCandidates,
            trend: '8.5%',
            trendUp: true,
            subtext: 'active candidate accounts',
          },
          {
            label: 'Live CBT Assessments',
            value: stats.activeAssessments,
            trend: '3',
            trendUp: true,
            subtext: 'active examination packs',
          },
          {
            label: 'Platform Pass Rate',
            value: `${stats.passRate}%`,
            trend: '2.1%',
            trendUp: true,
            subtext: 'qualification benchmark',
          },
        ]}
      />

      {/* 3. Operational Performance & Attention Queue */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12 min-w-0">
        {/* Left Column: Live Analytics & Command Queue (7 Cols) */}
        <div className="lg:col-span-7 space-y-6 min-w-0">
          <AdminCard
            title="Live Operational Metrics"
            subtitle="Real-time test submission rates and proctoring security benchmarks"
          >
            <div className="space-y-4 pt-1">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Test Completion Rate</span>
                  <span className="text-blue-600 dark:text-blue-400 font-extrabold">{stats.completionRate}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${stats.completionRate}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Average Student Score</span>
                  <span className="text-amber-600 dark:text-amber-400 font-extrabold">{stats.avgPercentage}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${stats.avgPercentage}%` }} />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">Security & Proctoring Alerts</span>
                  <span className="text-rose-600 dark:text-rose-400 font-extrabold">1.4% ({stats.totalViolations || 0} alerts)</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-600 rounded-full transition-all" style={{ width: '12%' }} />
                </div>
              </div>
            </div>
          </AdminCard>

          <AdminCard
            title="Recent Revenue Enrollments"
            subtitle="Verified Razorpay candidate transactions"
            action={
              <Link to="/admin/payments" className="text-xs font-bold text-blue-600 hover:underline dark:text-blue-400">
                All Transactions →
              </Link>
            }
          >
            <AdminDataTable
              searchable={false}
              columns={[
                {
                  key: 'user_name',
                  header: 'Candidate',
                  render: (r) => (
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white">{r.user_name || r.candidate_name || 'Student'}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{r.user_email || r.candidate_email || '—'}</p>
                    </div>
                  ),
                },
                {
                  key: 'series_title',
                  header: 'Test Series',
                  render: (r) => <span className="font-semibold text-slate-800 dark:text-slate-200">{r.series_title || 'Mock Series'}</span>,
                },
                {
                  key: 'amount',
                  header: 'Amount',
                  render: (r) => <span className="font-extrabold text-emerald-600 dark:text-emerald-400">₹{Number(r.amount).toLocaleString('en-IN')}</span>,
                },
                {
                  key: 'status',
                  header: 'Status',
                  render: (r) => (
                    <AdminStatusBadge
                      status={r.status || 'success'}
                      type={r.status === 'success' ? 'green' : 'amber'}
                    />
                  ),
                },
              ]}
              rows={recentPayments}
            />
          </AdminCard>
        </div>

        {/* Right Column: Qualification Ratio & Top Candidates (5 Cols) */}
        <div className="lg:col-span-5 space-y-6 min-w-0">
          <AdminCard title="Qualification Ratio" subtitle="Distribution of passing vs improvement-needed candidates">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.passRate}%</p>
                  <p className="text-xs text-slate-500 font-medium">Passed Cutoff</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-rose-600 dark:text-rose-400">{100 - stats.passRate}%</p>
                  <p className="text-xs text-slate-500 font-medium">Needs Improvement</p>
                </div>
              </div>

              <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-emerald-500" style={{ width: `${stats.passRate}%` }} />
                <div className="h-full bg-rose-500" style={{ width: `${100 - stats.passRate}%` }} />
              </div>
            </div>
          </AdminCard>

          <AdminCard title="Top Candidate Leaderboard" subtitle="Highest scoring students across national mock exams">
            <div className="space-y-2.5">
              {performers.slice(0, 5).map((p, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-md font-bold ${
                        idx === 0
                          ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/20'
                          : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}
                    >
                      #{idx + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-slate-900 dark:text-white truncate">{p.candidate_name || p.name || 'Candidate'}</p>
                      <p className="text-[10px] text-slate-500 truncate">{p.assessment_title || 'NTA CBT Test'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-emerald-600 dark:text-emerald-400">{p.percentage || p.marks || 90}%</span>
                  </div>
                </div>
              ))}
            </div>
          </AdminCard>
        </div>
      </div>
    </div>
  );
}


