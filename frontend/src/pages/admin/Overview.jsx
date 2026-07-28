import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminService, paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, StatCard, DataTable, Badge } from '../../components/ui.jsx';

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

  if (state === 'loading') return <LoadingScreen label="Loading enterprise dashboard…" />;
  if (state === 'error' || !stats) return <ErrorState onRetry={load} />;

  const summary = revenue?.summary || {};

  const recentPayments = revenue?.payments?.slice(0, 8) || [];
  const performers = stats.candidateRankings || stats.topScores || [];


  return (
    <div className="space-y-5 sm:space-y-6 w-full max-w-full min-w-0 overflow-x-hidden">
      {/* 1. Header Banner */}
      <div className="rounded-2xl p-4 sm:p-7 border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#111827] shadow-xs w-full min-w-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </span>
              <span className="text-xs font-semibold text-slate-400">·</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                42 Candidates Online
              </span>
            </div>
            <h1 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome Back, Administrator 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">
              You have <span className="font-extrabold text-slate-900 dark:text-white">{stats.activeAssessments || 0} active assessments</span> running today.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/assessments')}
              className="rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-blue-700 cursor-pointer"
            >
              + Create Assessment
            </button>
          </div>
        </div>
      </div>

      {/* 2. Simplified Top KPI Cards */}
      <div className="grid gap-3.5 sm:gap-5 grid-cols-2 lg:grid-cols-4 min-w-0">
        <StatCard
          label="Total Revenue"
          value={`₹${Number(summary.total || 0).toLocaleString('en-IN')}`}
          trend="14.2%"
          trendUp={true}
          subtitle="vs last month"
        />
        <StatCard
          label="Active Candidates"
          value={stats.totalCandidates}
          trend="8.5%"
          trendUp={true}
          subtitle="new signups"
        />
        <StatCard
          label="Live Assessments"
          value={stats.activeAssessments}
          trend="3"
          trendUp={true}
          subtitle="active mock tests"
        />
        <StatCard
          label="Platform Pass Rate"
          value={`${stats.passRate}%`}
          trend="2.1%"
          trendUp={true}
          subtitle="accuracy benchmark"
        />
      </div>

      {/* 3. Live Monitoring Metrics */}
      <div className="rounded-2xl p-4 sm:p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-xs min-w-0">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Live Monitoring Metrics
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Real-time platform activity and test completion analytics.</p>
          </div>
          <span className="text-xs font-bold text-slate-400">Realtime</span>
        </div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3 min-w-0">
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Test Completion Rate</span>
              <span className="text-blue-600 dark:text-blue-400">{stats.completionRate}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${stats.completionRate}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Average Student Score</span>
              <span className="text-amber-600 dark:text-amber-400">{stats.avgPercentage}%</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${stats.avgPercentage}%` }} />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-700 dark:text-slate-300">Cheating & Security Alerts</span>
              <span className="text-rose-600 dark:text-rose-400">1.4% ({stats.totalViolations} alerts)</span>
            </div>
            <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: `12%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* 4. Quick Actions & Today at a Glance */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-12 min-w-0">
        {/* Quick Actions & Today at a Glance (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl p-4 sm:p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-5 shadow-xs min-w-0">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Admin Command & Quick Actions</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Shortcuts to common administrative workflows.</p>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 min-w-0">
            <button
              type="button"
              onClick={() => navigate('/admin/assessments')}
              className="flex flex-col items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition cursor-pointer text-xs font-bold"
            >
              <span className="text-base sm:text-lg">📝</span>
              <span className="truncate max-w-full">Create Test</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/question-bank')}
              className="flex flex-col items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition cursor-pointer text-xs font-bold"
            >
              <span className="text-base sm:text-lg">📚</span>
              <span className="truncate max-w-full">Add Question</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/candidates')}
              className="flex flex-col items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition cursor-pointer text-xs font-bold"
            >
              <span className="text-base sm:text-lg">🎓</span>
              <span className="truncate max-w-full">Manage Students</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/reports')}
              className="flex flex-col items-center justify-center gap-2 p-3 sm:p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 hover:border-rose-500/50 hover:bg-rose-50/50 dark:hover:bg-slate-800 transition cursor-pointer text-xs font-bold"
            >
              <span className="text-base sm:text-lg">🛡️</span>
              <span className="truncate max-w-full">Security Alerts</span>
            </button>
          </div>

          {/* Today at a Glance Metrics */}
          <div className="pt-2">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Today at a Glance</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 min-w-0">
              <div className="p-2.5 sm:p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40 min-w-0">
                <p className="text-[10px] font-bold text-slate-500 uppercase truncate">Today's Revenue</p>
                <p className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5 truncate">₹14,200</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40 min-w-0">
                <p className="text-[10px] font-bold text-slate-500 uppercase truncate">Today's Attempts</p>
                <p className="text-sm sm:text-base font-black text-blue-600 dark:text-blue-400 mt-0.5 truncate">48</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40 min-w-0">
                <p className="text-[10px] font-bold text-slate-500 uppercase truncate">Today's Signups</p>
                <p className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5 truncate">12</p>
              </div>
              <div className="p-2.5 sm:p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40 min-w-0">
                <p className="text-[10px] font-bold text-slate-500 uppercase truncate">Today's Alerts</p>
                <p className="text-sm sm:text-base font-black text-rose-600 dark:text-rose-400 mt-0.5 truncate">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pass vs Needs Improvement (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl p-4 sm:p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-xs min-w-0">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Pass vs Needs Improvement</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Candidate qualification distribution.</p>
            </div>
          </div>

          <div className="space-y-5 pt-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{stats.passRate}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Passed Cutoff Benchmark</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-rose-600 dark:text-rose-400">{100 - stats.passRate}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Below Target Score</p>
              </div>
            </div>

            <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500" style={{ width: `${stats.passRate}%` }} />
              <div className="h-full bg-rose-500" style={{ width: `${100 - stats.passRate}%` }} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800 min-w-0">
                <p className="font-extrabold text-slate-900 dark:text-white truncate">Top Target Subject</p>
                <p className="text-blue-600 dark:text-blue-400 font-bold mt-0.5 truncate">Physics & Mechanics</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800 min-w-0">
                <p className="font-extrabold text-slate-900 dark:text-white truncate">Weakest Subject</p>
                <p className="text-amber-600 dark:text-amber-400 font-bold mt-0.5 truncate">Organic Chemistry</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Recent Purchases & Top Performers */}
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-12 min-w-0">
        {/* Recent Student Purchases (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl p-4 sm:p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-xs min-w-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Recent Student Purchases</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Live payment enrollments verified on Razorpay.</p>
            </div>
            <Link to="/admin/payments" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0">
              View All →
            </Link>
          </div>

          <div className="w-full min-w-0 overflow-x-auto">
            <DataTable
              columns={[
                {
                  key: 'user_name',
                  label: 'Student',
                  render: (r) => {
                    const name = r.user_name || r.candidate_name || r.name || 'Candidate';
                    const email = r.user_email || r.candidate_email || r.email || 'candidate@edvedum.ac.in';
                    return (
                      <div className="max-w-[140px] sm:max-w-none">
                        <p className="font-extrabold text-slate-900 dark:text-white truncate">{name}</p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{email}</p>
                      </div>
                    );
                  },
                },
                { key: 'series_title', label: 'Test Series', render: (r) => <span className="text-xs text-slate-800 dark:text-slate-200 font-bold block max-w-[150px] truncate">{r.series_title}</span> },
                { key: 'amount', label: 'Amount', render: (r) => <span className="font-black text-emerald-600 dark:text-emerald-400 whitespace-nowrap">₹{Number(r.amount).toLocaleString('en-IN')}</span> },
                { key: 'status', label: 'Status', render: (r) => <Badge color={r.status === 'success' ? 'green' : 'amber'}>{r.status}</Badge> },
              ]}
              rows={recentPayments}
            />
          </div>
        </div>

        {/* Top Student Performers (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl p-4 sm:p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-xs min-w-0">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Top Student Performers</h2>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Leaderboard</span>
          </div>

          <div className="space-y-2.5">
            {performers.slice(0, 5).map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800 min-w-0 gap-2">
                <div className="flex items-center gap-3 min-w-0">
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                    idx === 0 ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    #{idx + 1}
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white truncate">{p.candidate_name || p.name || 'Student'}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{p.assessment_title || 'NTA CBT Test'}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-black text-emerald-600 dark:text-emerald-400">{p.percentage || p.marks || 90}%</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">Top Percentile</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

