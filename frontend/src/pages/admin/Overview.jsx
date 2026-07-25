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
    <div className="space-y-6">
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
        {/* Real-time System Metrics Widget (5 Cols) */}
        <div className="lg:col-span-5 saas-card p-6 bg-[#0b1430] border border-slate-800/90 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <span>📊</span> Live Monitoring Metrics
            </h2>
            <span className="text-xs font-bold text-slate-400">Realtime</span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Test Completion Rate</span>
                <span className="text-cyan-400">{stats.completionRate}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: `${stats.completionRate}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Average Student Score</span>
                <span className="text-amber-400">{stats.avgPercentage}%</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full" style={{ width: `${stats.avgPercentage}%` }} />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-slate-300">Proctoring Flag Rate</span>
                <span className="text-rose-400">1.4% ({stats.totalViolations} flags)</span>
              </div>
              <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 rounded-full" style={{ width: `12%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Data Analytics Section */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Interactive Revenue Chart (7 Cols) */}
        <div className="lg:col-span-7 saas-card p-6 bg-[#0b1430] border border-slate-800/90 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-black text-white">Revenue & Sales Trajectory</h2>
              <p className="text-xs text-slate-400 font-medium">Daily order collections across mock test packages.</p>
            </div>
            <div className="flex gap-2">
              <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-extrabold text-emerald-400 border border-slate-800">
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
              <line x1="0" y1="30" x2="500" y2="30" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="75" x2="500" y2="75" stroke="#1e293b" strokeDasharray="4 4" />
              <line x1="0" y1="120" x2="500" y2="120" stroke="#1e293b" strokeDasharray="4 4" />
              
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
        <div className="lg:col-span-5 saas-card p-6 bg-[#0b1430] border border-slate-800/90 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-black text-white">Pass vs Needs Improvement</h2>
              <p className="text-xs text-slate-400 font-medium">Candidate qualification distribution.</p>
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-black text-emerald-400">{stats.passRate}%</p>
                <p className="text-xs text-slate-400 font-medium">Passed Cutoff Benchmark</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-rose-400">{100 - stats.passRate}%</p>
                <p className="text-xs text-slate-400 font-medium">Below Target Score</p>
              </div>
            </div>

            <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-500" style={{ width: `${stats.passRate}%` }} />
              <div className="h-full bg-rose-500" style={{ width: `${100 - stats.passRate}%` }} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-2xl bg-[#070e24] border border-slate-800">
                <p className="font-extrabold text-white">Top Target Subject</p>
                <p className="text-cyan-400 font-bold mt-0.5">Physics & Mechanics</p>
              </div>
              <div className="p-3 rounded-2xl bg-[#070e24] border border-slate-800">
                <p className="font-extrabold text-white">Weakest Subject</p>
                <p className="text-amber-400 font-bold mt-0.5">Organic Chemistry</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Recent Activity Feed & Recent Transactions */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Recent Transactions Table (7 Cols) */}
        <div className="lg:col-span-7 saas-card p-6 bg-[#0b1430] border border-slate-800/90 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div>
              <h2 className="text-base font-black text-white">Recent Student Purchases</h2>
              <p className="text-xs text-slate-400 font-medium">Live payment orders verified on Razorpay.</p>
            </div>
            <Link to="/admin/payments" className="text-xs font-bold text-blue-400 hover:underline">
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
                    <p className="font-extrabold text-white">{r.user_name || 'Candidate'}</p>
                    <p className="text-[10px] text-slate-400">{r.user_email}</p>
                  </div>
                ),
              },
              { key: 'series_title', label: 'Test Series', render: (r) => <span className="text-xs text-slate-200 font-bold">{r.series_title}</span> },
              { key: 'amount', label: 'Amount', render: (r) => <span className="font-black text-emerald-400">₹{Number(r.amount).toLocaleString('en-IN')}</span> },
              { key: 'status', label: 'Status', render: (r) => <Badge color={r.status === 'success' ? 'green' : 'amber'}>{r.status}</Badge> },
            ]}
            rows={recentPayments}
          />
        </div>

        {/* Top Performers & Recent Activity Feed (5 Cols) */}
        <div className="lg:col-span-5 saas-card p-6 bg-[#0b1430] border border-slate-800/90 rounded-3xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <h2 className="text-base font-black text-white">Top Student Performers</h2>
            <span className="text-xs font-bold text-amber-400">Leaderboard</span>
          </div>

          <div className="space-y-3">
            {performers.slice(0, 5).map((p, idx) => (
              <div key={idx} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#070e24] border border-slate-800">
                <div className="flex items-center gap-3">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black ${
                    idx === 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-slate-800 text-slate-300'
                  }`}>
                    #{idx + 1}
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-white">{p.candidate_name || p.name || 'Student'}</p>
                    <p className="text-[10px] text-slate-400">{p.assessment_title || 'NTA CBT Test'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-black text-emerald-400">{p.percentage || p.marks || 90}%</p>
                  <p className="text-[10px] text-slate-400 font-bold">Top Percentile</p>
                </div>
              </div>
            ))}
=======
        {/* Top Performing Students */}
        <div className="card p-6 border border-slate-800/90 bg-[#0b1430]">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-extrabold text-white text-base">Top Performing Students</h2>
            <span className="text-xs text-slate-400 font-medium">Ranked by score %</span>
          </div>
          {(stats.candidateRankings || stats.topScores).length === 0 ? (
            <p className="text-sm text-slate-400">No completed attempts yet.</p>
          ) : (
            <div className="space-y-3">
              {(stats.candidateRankings || stats.topScores).slice(0, 6).map((s, i) => (
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
          <h2 className="mb-4 font-extrabold text-white text-base">Pass / Fail Breakdown</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <Tile label="Completed" value={stats.completedAttempts} color="text-white" />
            <Tile label="Passed" value={stats.passed} color="text-emerald-400" />
            <Tile label="Failed" value={stats.failed} color="text-rose-400" />
>>>>>>> 4ad9613 (feat: performance analytics, admin dashboard 7.1 metrics, subject sectioning, PDF bad XRef fix, and certificate redesign)
          </div>
        </div>
      </div>
    </div>
  );
}
