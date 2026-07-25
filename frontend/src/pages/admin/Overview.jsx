import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { adminService, paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, StatCard, DataTable, Badge } from '../../components/ui.jsx';

export default function Overview() {
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [state, setState] = useState('loading');
  const [todoList, setTodoList] = useState([
    { id: 1, text: 'Review reported question #402 in Organic Chemistry', priority: 'high', done: false },
    { id: 2, text: 'Approve 3 newly registered candidate accounts', priority: 'medium', done: false },
    { id: 3, text: 'Publish All India Leaderboard for Mock #5', priority: 'normal', done: true },
  ]);

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

  const toggleTodo = (id) => {
    setTodoList((prev) =>
      prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  return (
    <div className="space-y-8">
      {/* 1. Welcome Banner & System Status */}
      <div className="saas-card relative overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/5 dark:from-blue-900/40 dark:via-[#111827] dark:to-indigo-900/30 border border-blue-200 dark:border-blue-500/20 bg-white dark:bg-[#111827]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-ping" />
                All Systems Operational (99.98%)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-500/20">
                ⚡ 42 Candidates Online
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Welcome Back, Administrator 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              Here is what's happening across your testing platform today. You have {stats.activeAssessments || 0} active assessments live.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80 px-4 py-3 text-right text-xs shadow-xs">
              <p className="font-extrabold text-slate-900 dark:text-white">☀️ Sunny 26°C</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold mt-0.5">Friday, Jul 24, 2026</p>
            </div>
            <Link
              to="/admin/assessments"
              className="rounded-2xl bg-blue-600 px-5 py-3 text-xs font-extrabold text-white shadow-xl shadow-blue-500/25 transition hover:bg-blue-500"
            >
              + Create Assessment
            </Link>
          </div>
        </div>
      </div>

      {/* 2. Redesigned Stat Cards with Sparklines & Trend Indicators */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Revenue"
          value={`₹${Number(summary.total || 0).toLocaleString('en-IN')}`}
          accent="text-emerald-600 dark:text-emerald-400"
          subtitle="Gross test sales"
          sparklineData={[12, 18, 25, 22, 35, 42, 50]}
          trend="+14.2% vs last month"
          trendUp={true}
        />
        <StatCard
          label="Active Candidates"
          value={stats.totalCandidates}
          accent="text-cyan-600 dark:text-cyan-400"
          subtitle="Registered aspirants"
          sparklineData={[40, 52, 60, 58, 75, 82, 95]}
          trend="+8.5% new signups"
          trendUp={true}
        />
        <StatCard
          label="Live Assessments"
          value={stats.activeAssessments}
          accent="text-blue-600 dark:text-blue-400"
          subtitle="Active NTA mock tests"
          sparklineData={[5, 6, 8, 7, 9, 11, 12]}
          trend="3 closing today"
          trendUp={true}
        />
        <StatCard
          label="Platform Pass Rate"
          value={`${stats.passRate}%`}
          accent="text-amber-600 dark:text-amber-400"
          subtitle="Average benchmark"
          sparklineData={[65, 68, 72, 70, 74, 73, 76]}
          trend="+2.1% accuracy"
          trendUp={true}
        />
      </div>

      {/* 3. Today's Executive Insights & Urgent Actions */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Urgent Action Center (7 Cols) */}
        <div className="lg:col-span-7 saas-card p-6 bg-white dark:bg-[#0b1430] border border-slate-200 dark:border-slate-800/90 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>⚡</span> Action Center & Operational Tasks
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pending platform maintenance and student review items.</p>
            </div>
            <span className="rounded-full bg-blue-500/10 dark:bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-600 dark:text-cyan-300 border border-blue-500/20 dark:border-blue-500/30">
              {todoList.filter((t) => !t.done).length} Pending
            </span>
          </div>

          <div className="space-y-3">
            {todoList.map((todo) => (
              <div
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
                className={`flex items-center justify-between p-4 rounded-2xl border transition cursor-pointer ${
                  todo.done
                    ? 'border-slate-200 bg-slate-50/60 opacity-60 dark:border-slate-800/50 dark:bg-slate-900/30'
                    : 'border-slate-200 bg-slate-50 hover:border-slate-300 dark:border-slate-800 dark:bg-[#070e24] dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => {}}
                    className="h-4 w-4 rounded accent-blue-600 pointer-events-none"
                  />
                  <span className={`text-xs font-bold ${todo.done ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-200'}`}>
                    {todo.text}
                  </span>
                </div>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border uppercase ${
                    todo.priority === 'high'
                      ? 'bg-rose-500/10 text-rose-700 border-rose-500/20 dark:bg-rose-500/20 dark:text-rose-300 dark:border-rose-500/30'
                      : todo.priority === 'medium'
                      ? 'bg-amber-500/10 text-amber-700 border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30'
                      : 'bg-blue-500/10 text-blue-700 border-blue-500/20 dark:bg-blue-500/20 dark:text-cyan-300 dark:border-blue-500/30'
                  }`}
                >
                  {todo.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time System Metrics Widget (5 Cols) */}
        <div className="lg:col-span-5 saas-card p-6 bg-white dark:bg-[#0b1430] border border-slate-200 dark:border-slate-800/90 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>📊</span> Live Monitoring Metrics
            </h2>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Realtime</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Test Completion Rate</span>
                <span className="text-cyan-600 dark:text-cyan-400">{stats.completionRate}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: `${stats.completionRate}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Average Student Score</span>
                <span className="text-amber-600 dark:text-amber-400">{stats.avgPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: `${stats.avgPercentage}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Proctoring Flag Rate</span>
                <span className="text-rose-600 dark:text-rose-400">1.4% ({stats.totalViolations} flags)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `12%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Data Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Interactive Revenue Chart (7 Cols) */}
        <div className="lg:col-span-7 saas-card p-6 bg-white dark:bg-[#0b1430] border border-slate-200 dark:border-slate-800/90 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">Revenue & Sales Trajectory</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Daily order collections across mock test packages.</p>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full bg-emerald-500/10 text-emerald-700 border-emerald-500/20 dark:bg-slate-900 dark:text-emerald-400 dark:border-slate-800 px-3 py-1 text-xs font-extrabold border">
                ₹{Number(summary.total || 0).toLocaleString('en-IN')} Total
              </span>
            </div>
          </div>

          {/* SVG Vector Line Chart */}
          <div className="relative h-56 w-full pt-4">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 500 150" preserveAspectRatio="none">
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Background Grid Lines */}
              <line x1="0" y1="30" x2="500" y2="30" className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="500" y2="75" className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="4 4" />
              
              {/* Area & Line */}
              <path d="M0,120 Q70,90 140,105 T280,45 T420,60 T500,20 L500,150 L0,150 Z" fill="url(#revGrad)" />
              <path d="M0,120 Q70,90 140,105 T280,45 T420,60 T500,20" fill="none" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
              
              {/* Data Points */}
              <circle cx="140" cy="105" r="4" fill="#10b981" />
              <circle cx="280" cy="45" r="4" fill="#10b981" />
              <circle cx="420" cy="60" r="4" fill="#10b981" />
              <circle cx="500" cy="20" r="5" fill="#34d399" className="animate-pulse" />
            </svg>
          </div>
        </div>

        {/* Pass / Fail Distribution Bar (5 Cols) */}
        <div className="lg:col-span-5 saas-card p-6 bg-white dark:bg-[#0b1430] border border-slate-200 dark:border-slate-800/90 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">Pass vs Needs Improvement</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Candidate qualification distribution.</p>
            </div>
          </div>

          <div className="space-y-6 pt-2">
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

            <div className="h-4 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500" style={{ width: `${stats.passRate}%` }} />
              <div className="h-full bg-rose-500" style={{ width: `${100 - stats.passRate}%` }} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-[#070e24] dark:border-slate-800">
                <p className="font-extrabold text-slate-900 dark:text-white">Top Target Subject</p>
                <p className="text-blue-600 dark:text-cyan-400 font-bold mt-0.5">Physics & Mechanics</p>
              </div>
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-[#070e24] dark:border-slate-800">
                <p className="font-extrabold text-slate-900 dark:text-white">Weakest Subject</p>
                <p className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">Organic Chemistry</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Recent Activity Feed & Recent Transactions */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Recent Transactions Table (7 Cols) */}
        <div className="lg:col-span-7 saas-card p-6 bg-white dark:bg-[#0b1430] border border-slate-200 dark:border-slate-800/90 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-black text-slate-900 dark:text-white">Recent Student Purchases</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Live payment orders verified on Razorpay.</p>
            </div>
            <Link to="/admin/payments" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              View All →
            </Link>
          </div>

          <DataTable
            columns={[
              {
                key: 'user_name',
                label: 'Student',
                render: (r) => (
                  <div>
                    <p className="font-extrabold text-slate-900 dark:text-white">{r.user_name || 'Candidate'}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{r.user_email}</p>
                  </div>
                ),
              },
              { key: 'series_title', label: 'Test Series', render: (r) => <span className="text-xs text-slate-800 dark:text-slate-200 font-bold">{r.series_title}</span> },
              { key: 'amount', label: 'Amount', render: (r) => <span className="font-black text-emerald-600 dark:text-emerald-400">₹{Number(r.amount).toLocaleString('en-IN')}</span> },
              { key: 'status', label: 'Status', render: (r) => <Badge color={r.status === 'success' ? 'green' : 'amber'}>{r.status}</Badge> },
            ]}
            rows={recentPayments}
          />
        </div>

        {/* Top Performers & Recent Activity Feed (5 Cols) */}
        <div className="lg:col-span-5 saas-card p-6 bg-white dark:bg-[#0b1430] border border-slate-200 dark:border-slate-800/90 rounded-3xl space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-4">
            <h2 className="text-base font-black text-slate-900 dark:text-white">Top Student Performers</h2>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Leaderboard</span>
          </div>

          <div className="space-y-3">
            {performers.slice(0, 5).map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-[#070e24] dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${
                    idx === 0 ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                  }`}>
                    #{idx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 dark:text-white">{p.candidate_name || p.name || 'Student'}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400">{p.assessment_title || 'NTA CBT Test'}</p>
                  </div>
                </div>
                <div className="text-right">
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
