import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminService, paymentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, StatCard, DataTable, Badge } from '../../components/ui.jsx';

export default function Overview() {
  const navigate = useNavigate();
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
    <div className="space-y-6 w-full max-w-full min-w-0">
      {/* 1. Header Banner */}
      <div className="rounded-2xl p-5 sm:p-7 border border-slate-200/90 bg-white dark:border-slate-800 dark:bg-[#111827] shadow-xs w-full">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </span>
              <span className="text-xs font-semibold text-slate-400">·</span>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                42 Candidates Online
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
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
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* 3. Action Center & Live Monitoring Metrics */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Action Center (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
                Action Center & Operational Tasks
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Pending maintenance and student review items.</p>
            </div>
            <span className="rounded-full bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 text-xs font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              {todoList.filter((t) => !t.done).length} Pending
            </span>
          </div>

          <div className="space-y-2.5">
            {todoList.map((todo) => (
              <div
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
                className={`flex items-center justify-between p-3.5 rounded-xl border transition cursor-pointer ${
                  todo.done
                    ? 'border-slate-100 bg-slate-50/50 opacity-60 dark:border-slate-800/50 dark:bg-slate-900/30'
                    : 'border-slate-200/80 bg-slate-50/80 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900/60 dark:hover:border-slate-700'
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
                  className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase border ${
                    todo.priority === 'high'
                      ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20'
                      : todo.priority === 'medium'
                      ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20'
                      : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20'
                  }`}
                >
                  {todo.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Monitoring Metrics (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Live Monitoring Metrics
            </h2>
            <span className="text-xs font-bold text-slate-400">Realtime</span>
          </div>

          <div className="space-y-4">
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
                <span className="text-slate-700 dark:text-slate-300">Proctoring Flag Rate</span>
                <span className="text-rose-600 dark:text-rose-400">1.4% ({stats.totalViolations} flags)</span>
              </div>
              <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `12%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Replacing Duplicate Chart with Quick Actions & Today at a Glance */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Quick Actions & Today at a Glance (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-5 shadow-xs">
          <div className="border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Admin Command & Quick Actions</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Shortcuts to common administrative workflows.</p>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => navigate('/admin/assessments')}
              className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition cursor-pointer text-xs font-bold"
            >
              <span className="text-lg">📝</span>
              <span>Create Test</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/question-bank')}
              className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition cursor-pointer text-xs font-bold"
            >
              <span className="text-lg">📚</span>
              <span>Add Question</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/candidates')}
              className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-slate-800 transition cursor-pointer text-xs font-bold"
            >
              <span className="text-lg">🎓</span>
              <span>Manage Students</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/admin/reports')}
              className="flex flex-col items-center justify-center gap-2 p-3.5 rounded-xl border border-slate-200 bg-slate-50/80 text-slate-800 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-200 hover:border-rose-500/50 hover:bg-rose-50/50 dark:hover:bg-slate-800 transition cursor-pointer text-xs font-bold"
            >
              <span className="text-lg">🚩</span>
              <span>View Flags</span>
            </button>
          </div>

          {/* Today at a Glance Metrics */}
          <div className="pt-2">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">Today at a Glance</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Today's Revenue</p>
                <p className="text-base font-black text-emerald-600 dark:text-emerald-400 mt-0.5">₹14,200</p>
              </div>
              <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Today's Attempts</p>
                <p className="text-base font-black text-blue-600 dark:text-blue-400 mt-0.5">48</p>
              </div>
              <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Today's Signups</p>
                <p className="text-base font-black text-slate-900 dark:text-white mt-0.5">12</p>
              </div>
              <div className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40">
                <p className="text-[10px] font-bold text-slate-500 uppercase">Today's Flags</p>
                <p className="text-base font-black text-rose-600 dark:text-rose-400 mt-0.5">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pass vs Needs Improvement (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-xs">
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
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800">
                <p className="font-extrabold text-slate-900 dark:text-white">Top Target Subject</p>
                <p className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">Physics & Mechanics</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800">
                <p className="font-extrabold text-slate-900 dark:text-white">Weakest Subject</p>
                <p className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">Organic Chemistry</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Recent Purchases & Top Performers */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Recent Student Purchases (7 Cols) */}
        <div className="lg:col-span-7 rounded-2xl p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Recent Student Purchases</h2>
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
                render: (r) => {
                  const name = r.user_name || r.candidate_name || r.name || 'Candidate';
                  const email = r.user_email || r.candidate_email || r.email || 'candidate@edvedum.ac.in';
                  return (
                    <div>
                      <p className="font-extrabold text-slate-900 dark:text-white">{name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">{email}</p>
                    </div>
                  );
                },
              },
              { key: 'series_title', label: 'Test Series', render: (r) => <span className="text-xs text-slate-800 dark:text-slate-200 font-bold">{r.series_title}</span> },
              { key: 'amount', label: 'Amount', render: (r) => <span className="font-black text-emerald-600 dark:text-emerald-400">₹{Number(r.amount).toLocaleString('en-IN')}</span> },
              { key: 'status', label: 'Status', render: (r) => <Badge color={r.status === 'success' ? 'green' : 'amber'}>{r.status}</Badge> },
            ]}
            rows={recentPayments}
          />
        </div>

        {/* Top Student Performers (5 Cols) */}
        <div className="lg:col-span-5 rounded-2xl p-6 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 space-y-4 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-4">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Top Student Performers</h2>
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Leaderboard</span>
          </div>

          <div className="space-y-2.5">
            {performers.slice(0, 5).map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 dark:bg-slate-900/60 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <span className={`flex h-7 w-7 items-center justify-center rounded-lg text-xs font-black ${
                    idx === 0 ? 'bg-amber-500/10 text-amber-700 border border-amber-500/20 dark:bg-amber-500/20 dark:text-amber-300' : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
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
