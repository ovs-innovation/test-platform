import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { adminService, paymentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, StatCard, DataTable, Badge } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';

export default function AdminOverview() {
  const navigate = useNavigate();
  const toast = useToast();
  const [stats, setStats] = useState(null);
  const [revenue, setRevenue] = useState(null);
  const [state, setState] = useState('loading');
  const [todoList, setTodoList] = useState([
    { id: 1, text: 'Review new JEE Main test series submission', done: false },
    { id: 2, text: 'Approve faculty account request for Prof. Sharma', done: true },
    { id: 3, text: 'Export monthly revenue & GST tax invoice report', done: false },
    { id: 4, text: 'Check proctoring violation alerts for NEET Mock #4', done: false },
  ]);

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

  useEffect(() => {
    load();
  }, []);

  if (state === 'loading') return <LoadingScreen label="Loading enterprise dashboard…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

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
      <div className="saas-card relative overflow-hidden p-6 sm:p-8 bg-gradient-to-r from-blue-900/40 via-[#111827] to-indigo-900/30 border border-blue-500/20">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                All Systems Operational (99.98%)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 px-3 py-1 text-xs font-bold text-blue-400 border border-blue-500/20">
                ⚡ 42 Candidates Online
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome Back, Administrator 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 font-medium leading-relaxed">
              Here is what's happening across your testing platform today. You have {stats.activeAssessments || 0} active assessments live.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-4 py-3 text-right text-xs">
              <p className="font-extrabold text-white">☀️ Sunny 26°C</p>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5">Friday, Jul 24, 2026</p>
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
          accent="text-emerald-400"
          trend="+12.6%"
          trendUp={true}
          subtitle="vs last 30 days"
          sparkline={[20, 28, 35, 45, 40, 58, 70, 85]}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Successful Orders"
          value={summary.successful ?? 0}
          accent="text-cyan-400"
          trend="+8.4%"
          trendUp={true}
          subtitle="successful payments"
          sparkline={[12, 18, 15, 22, 28, 25, 32, 38]}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
        <StatCard
          label="Total Candidates"
          value={stats.totalCandidates || 0}
          accent="text-blue-400"
          trend="+15.2%"
          trendUp={true}
          subtitle="enrolled students"
          sparkline={[50, 60, 75, 80, 95, 110, 130, 145]}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 10-4-4 4 4 0 004 4zm6 0a3 3 0 10-2.83-4" />
            </svg>
          }
        />
        <StatCard
          label="Pass Rate"
          value={`${stats.passRate || 0}%`}
          accent="text-indigo-400"
          trend="+3.1%"
          trendUp={true}
          subtitle="average qualifying rate"
          sparkline={[60, 62, 65, 63, 68, 70, 72, 75]}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          }
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Active Assessments"
          value={stats.activeAssessments || 0}
          accent="text-cyan-300"
          trend="+5.0%"
          trendUp={true}
          subtitle="published exams"
          sparkline={[8, 10, 12, 14, 15, 16, 18, 20]}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          }
        />
        <StatCard
          label="Completion Rate"
          value={`${stats.completionRate || 0}%`}
          accent="text-purple-400"
          trend="+4.2%"
          trendUp={true}
          subtitle="attempt finish rate"
          sparkline={[70, 72, 75, 78, 80, 82, 85, 88]}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          }
        />
        <StatCard
          label="Average Score"
          value={`${stats.avgPercentage || 0}%`}
          accent="text-amber-400"
          trend="+2.8%"
          trendUp={true}
          subtitle="overall student avg"
          sparkline={[55, 58, 62, 60, 65, 68, 70, 72]}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            </svg>
          }
        />
        <StatCard
          label="Violations Logged"
          value={stats.totalViolations || 0}
          accent="text-rose-400"
          trend="-12.0%"
          trendUp={false}
          subtitle="proctoring alerts"
          sparkline={[25, 20, 18, 15, 12, 10, 8, 5]}
          icon={
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          }
        />
      </div>

      {/* 3. Quick Actions Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-400">Quick Administrative Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <QuickActionCard
            title="Create Assessment"
            desc="Add JEE or NEET mock"
            icon="📝"
            color="from-blue-600/20 to-indigo-600/20"
            onClick={() => navigate('/admin/assessments')}
          />
          <QuickActionCard
            title="Add Student"
            desc="Register new candidate"
            icon="👤"
            color="from-emerald-600/20 to-teal-600/20"
            onClick={() => navigate('/admin/candidates')}
          />
          <QuickActionCard
            title="Create Coupon"
            desc="Discount code setup"
            icon="🏷️"
            color="from-purple-600/20 to-pink-600/20"
            onClick={() => navigate('/admin/coupons')}
          />
          <QuickActionCard
            title="Upload Questions"
            desc="Import question bank"
            icon="📚"
            color="from-amber-600/20 to-orange-600/20"
            onClick={() => navigate('/admin/question-bank')}
          />
          <QuickActionCard
            title="Generate Report"
            desc="Audit & test logs"
            icon="📊"
            color="from-cyan-600/20 to-blue-600/20"
            onClick={() => navigate('/admin/reports')}
          />
          <QuickActionCard
            title="Assign Faculty"
            desc="Add teacher access"
            icon="👨‍🏫"
            color="from-rose-600/20 to-red-600/20"
            onClick={() => navigate('/admin/faculty')}
          />
        </div>
      </div>

      {/* 4. Visual Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Growth Line/Area Chart */}
        <div className="saas-card lg:col-span-2 p-6 space-y-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Revenue & Sales Velocity</h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Monthly collection trajectory (INR)</p>
            </div>
            <Badge color="green">+12.6% Growth</Badge>
          </div>

          <div className="h-64 w-full">
            <svg className="h-full w-full overflow-visible" viewBox="0 0 500 200">
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Grid lines */}
              <line x1="0" y1="40" x2="500" y2="40" stroke="currentColor" className="text-slate-200 dark:text-slate-800/60" strokeDasharray="4" />
              <line x1="0" y1="90" x2="500" y2="90" stroke="currentColor" className="text-slate-200 dark:text-slate-800/60" strokeDasharray="4" />
              <line x1="0" y1="140" x2="500" y2="140" stroke="currentColor" className="text-slate-200 dark:text-slate-800/60" strokeDasharray="4" />

              {/* Smooth Area fill */}
              <path
                d="M 0 160 Q 80 120 160 140 T 320 80 T 500 40 L 500 180 L 0 180 Z"
                fill="url(#revenueGrad)"
              />

              {/* Stroke Line */}
              <path
                d="M 0 160 Q 80 120 160 140 T 320 80 T 500 40"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Data points */}
              <circle cx="160" cy="140" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />
              <circle cx="320" cy="80" r="5" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />
              <circle cx="500" cy="40" r="6" fill="#22C55E" stroke="#ffffff" strokeWidth="2" />
            </svg>
          </div>

          <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800/40">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul (Current)</span>
          </div>
        </div>

        {/* Pass / Fail Donut Chart */}
        <div className="saas-card p-6 space-y-4 flex flex-col justify-between bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Pass / Fail Breakdown</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">Exam completion metrics</p>
          </div>

          <div className="flex items-center justify-center relative py-4">
            <svg className="h-44 w-44 -rotate-90" viewBox="0 0 100 100">
              {/* Passed Circle Segment */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#22C55E"
                strokeWidth="12"
                strokeDasharray="180 60"
              />
              {/* Failed Circle Segment */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#EF4444"
                strokeWidth="12"
                strokeDasharray="50 190"
                strokeDashoffset="-180"
              />
            </svg>
            <div className="absolute text-center">
              <p className="text-2xl font-black text-slate-900 dark:text-white">{stats.completedAttempts || 0}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">Attempts</p>
            </div>
          </div>

          <div className="space-y-2 border-t border-slate-200 dark:border-slate-800/40 pt-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                Passed Candidates
              </span>
              <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{stats.passed || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                Failed Attempts
              </span>
              <span className="font-extrabold text-rose-600 dark:text-rose-400">{stats.failed || 0}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Payments Modern Table & Top Performers */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Payments Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-lg">Recent Transactions</h2>
            <Link to="/admin/payments" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline transition">
              View All Payments →
            </Link>
          </div>

          {recentPayments.length === 0 ? (
            <div className="saas-card p-6 text-sm text-slate-600 dark:text-slate-400 text-center bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">No payment history available.</div>
          ) : (
            <DataTable
              columns={[
                {
                  key: 'user_name',
                  label: 'Student',
                  render: (r) => (
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600/20 text-xs font-extrabold text-blue-600 dark:text-blue-400 border border-blue-500/30">
                        {r.user_name?.charAt(0)?.toUpperCase() || 'S'}
                      </span>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white leading-none">{r.user_name}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">#{r.id || 'PAY'}</p>
                      </div>
                    </div>
                  ),
                },
                {
                  key: 'series_title',
                  label: 'Course Series',
                  render: (r) => (
                    <span className="text-slate-700 dark:text-slate-300 text-xs truncate max-w-[140px] inline-block font-semibold">
                      {r.series_title || 'Mock Test Series'}
                    </span>
                  ),
                },
                {
                  key: 'amount',
                  label: 'Amount',
                  render: (r) => <span className="font-black text-emerald-600 dark:text-cyan-300 text-sm">₹{Number(r.amount)}</span>,
                },
                {
                  key: 'status',
                  label: 'Status',
                  render: (r) => (
                    <Badge color={r.status === 'success' ? 'green' : r.status === 'failed' ? 'red' : 'amber'}>
                      {r.status || 'success'}
                    </Badge>
                  ),
                },
                {
                  key: 'action',
                  label: 'Invoice',
                  render: () => (
                    <button
                      type="button"
                      onClick={() => toast.info('Invoice PDF generated.')}
                      className="rounded-xl border border-slate-300 bg-white px-2.5 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 dark:border-slate-700/60 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white transition"
                    >
                      Receipt 📄
                    </button>
                  ),
                },
              ]}
              rows={recentPayments}
            />
          )}
        </div>

        {/* Top Performers Widget */}
        <div className="saas-card p-6 space-y-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Top Performing Students</h2>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Leaderboard</span>
          </div>

          {performers.length === 0 ? (
            <p className="text-xs text-slate-600 dark:text-slate-400">No student rankings recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {performers.slice(0, 5).map((s, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/30 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-xl font-black text-xs ${i === 0
                          ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 shadow-sm'
                          : i === 1
                            ? 'bg-slate-200 text-slate-700 dark:bg-slate-300/20 dark:text-slate-200 border border-slate-300 dark:border-slate-400/40'
                            : i === 2
                              ? 'bg-amber-700/20 text-amber-800 dark:text-amber-500 border border-amber-600/40'
                              : 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
                        }`}
                    >
                      {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`}
                    </span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-xs">{s.candidate_name}</p>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate max-w-[110px]">{s.assessment_title}</p>
                    </div>
                  </div>
                  <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">{s.percentage}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 6. Admin To-Do Checklist & Activity Timeline */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Admin To-Do Checklist */}
        <div className="saas-card p-6 space-y-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Admin Action Checklist</h2>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              {todoList.filter((t) => t.done).length}/{todoList.length} Completed
            </span>
          </div>

          <div className="space-y-2.5">
            {todoList.map((todo) => (
              <div
                key={todo.id}
                onClick={() => toggleTodo(todo.id)}
                className={`flex items-center gap-3 p-3 rounded-2xl cursor-pointer transition border ${todo.done
                    ? 'bg-slate-100/60 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800/40 line-through opacity-60'
                    : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-blue-500/30'
                  }`}
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => { }}
                  className="h-4 w-4 rounded border-slate-300 bg-white text-blue-600 focus:ring-0 dark:border-slate-700 dark:bg-slate-800"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{todo.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Violation Reports & Proctored Activity */}
        <div className="saas-card p-6 space-y-4 bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="font-extrabold text-slate-900 dark:text-white text-base">Proctoring Violation Alerts</h2>
            <Badge color="red">{stats.totalViolations || 0} Alerts</Badge>
          </div>

          {stats.violationReports.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">No test violations recorded recently.</p>
          ) : (
            <div className="space-y-2.5">
              {stats.violationReports.map((v) => (
                <div
                  key={v.violation_type}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800/80"
                >
                  <span className="capitalize text-xs font-bold text-slate-800 dark:text-slate-200">
                    {v.violation_type.replace(/_/g, ' ')}
                  </span>
                  <span className="font-black text-rose-600 dark:text-rose-400 bg-rose-500/15 border border-rose-500/30 px-2.5 py-0.5 rounded-full text-xs">
                    {v.count} logged
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, desc, icon, color, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`saas-card p-4 text-left transition hover:-translate-y-1 hover:shadow-xl hover:border-blue-500/40 bg-gradient-to-br ${color} group border border-slate-200 dark:border-slate-800`}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/90 dark:bg-slate-900/80 text-lg shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="mt-3 text-xs font-black text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-0.5 text-[10px] text-slate-600 dark:text-slate-400 font-semibold">{desc}</p>
    </button>
  );
}

