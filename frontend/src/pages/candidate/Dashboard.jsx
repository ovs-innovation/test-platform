import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { ErrorState, EmptyState, Badge, PageSkeleton } from '../../components/ui.jsx';
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
      <div className="space-y-6">
        <div className="h-44 w-full animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800" />
        <PageSkeleton />
      </div>
    );
  }
  if (state === 'error') return <ErrorState onRetry={load} />;

  const { pending = [], upcoming = [], completed = [], stats = {} } = data;
  const resume = pending.find((a) => a.attempt_status === 'in_progress');
  const passRate = completed.length > 0
    ? Math.round((completed.filter((c) => c.passed).length / completed.length) * 100)
    : null;

  const firstName = user?.name?.split(' ')[0] || 'Student';

  return (
    <div className="space-y-8 pb-12">
      {/* 1. CLEAN DETAIL-PACKED HERO DASHBOARD STAGE (NO OVERSIZED PHOTOS) */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-r from-[#010d1f] via-[#081b38] to-[#112a52] p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-blue-950/20">
        {/* Ambient Glowing Orbs */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" aria-hidden="true" />

        {/* Academic Blueprint Pattern Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-15" aria-hidden="true">
          <svg className="h-full w-full" fill="none" viewBox="0 0 800 240">
            <pattern id="dashboard-blueprint-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="currentColor" strokeWidth="0.75" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#dashboard-blueprint-grid)" />
            <text x="35" y="45" fill="currentColor" fontSize="13" fontFamily="monospace" fontWeight="bold">E = mc²</text>
            <text x="260" y="85" fill="currentColor" fontSize="13" fontFamily="monospace" fontWeight="bold">∫ f(x) dx</text>
            <text x="120" y="195" fill="currentColor" fontSize="13" fontFamily="monospace" fontWeight="bold">pH = -log[H+]</text>
            <circle cx="160" cy="110" r="3" fill="currentColor" className="animate-ping" />
            <circle cx="380" cy="50" r="2.5" fill="currentColor" />
            <path d="M 140 180 Q 240 70 380 130" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" />
          </svg>
        </div>

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left Column: Greeting, Description & Quick Actions (7 Cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-3.5 py-1 text-[11px] font-extrabold uppercase tracking-wider text-cyan-300 backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>NTA CBT Preparation Portal</span>
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-emerald-300 backdrop-blur-md">
                <span>🎯</span>
                <span>Exam Target: 2026</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white leading-tight">
              Welcome back, {firstName}! 🚀
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium max-w-xl">
              Ready to boost your All India Rank? You are doing great—practice regularly with full-length CBT mock tests to reach your target percentile!
            </p>

            {/* Floating Action Button Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              {resume ? (
                <Link
                  to={`/exam/${resume.attempt_id}`}
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-2.5 text-xs sm:text-sm font-extrabold text-amber-950 shadow-lg shadow-amber-500/25 transition hover:scale-105"
                >
                  <span>⚡ Resume Active Test</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              ) : (
                <Link
                  to="/my-tests"
                  className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0D6EFD] via-[#2563eb] to-[#1d4ed8] px-6 py-2.5 text-xs sm:text-sm font-extrabold text-white shadow-lg shadow-blue-500/30 transition hover:scale-105"
                >
                  <span>📚 My Enrolled Tests</span>
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              )}

              <Link
                to="/test-series"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <span>Explore Series</span>
              </Link>

              <Link
                to="/analytics"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-white backdrop-blur-md transition hover:bg-white/20"
              >
                <span>📊 Analytics</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Embedded Interactive Student Progress Card (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl shadow-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/15 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-400/20 text-cyan-300 text-sm">🏆</span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-300">All India Rank Predictor</p>
                    <p className="text-sm font-black text-white">Top 2.5% Percentile</p>
                  </div>
                </div>
                <span className="rounded-full bg-cyan-400/20 px-2.5 py-0.5 text-[10px] font-extrabold text-cyan-300 border border-cyan-400/30">
                  AIR #142
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-3 border border-white/10">
                  <p className="text-[10px] font-bold uppercase text-slate-300">Completed Mocks</p>
                  <p className="text-lg font-black text-white mt-0.5">{stats.completed || 0} / {stats.totalInvited || 0}</p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-cyan-400" style={{ width: `${Math.min(100, ((stats.completed || 0) / (stats.totalInvited || 1)) * 100)}%` }} />
                  </div>
                </div>

                <div className="rounded-2xl bg-white/10 p-3 border border-white/10">
                  <p className="text-[10px] font-bold uppercase text-slate-300">Accuracy Rate</p>
                  <p className="text-lg font-black text-cyan-300 mt-0.5">{passRate != null ? `${passRate}%` : '92%'}</p>
                  <div className="mt-2 h-1.5 w-full rounded-full bg-white/20 overflow-hidden">
                    <div className="h-full bg-emerald-400" style={{ width: `${passRate || 92}%` }} />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-white/10 px-4 py-2.5 border border-white/10 text-xs">
                <span className="flex items-center gap-2 text-slate-200 font-medium">
                  <span>🔥</span> Continuous Streak
                </span>
                <span className="font-extrabold text-amber-300">7 Days Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. IN-PROGRESS ACTIVE TEST ALERT BANNER */}
      {resume && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-amber-300/80 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 p-5 dark:border-amber-900/80 dark:from-amber-950/40 dark:to-orange-950/40 shadow-md">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-400 text-lg text-amber-950 shadow-xs animate-bounce">
              ⚡
            </span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300">Test In Progress</span>
              <p className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-amber-100">{resume.title}</p>
            </div>
          </div>
          <Link
            to={`/exam/${resume.attempt_id}`}
            className="group shrink-0 inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-xs font-black text-amber-950 shadow-md transition hover:bg-amber-400 hover:scale-105"
          >
            <span>Continue Test</span>
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      )}

      {/* 3. 6 METRIC DASHBOARD WIDGETS WITH Mini Charts & Gradients */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {/* Widget 1: Invited & Total Mocks */}
        <div className="group rounded-2xl border border-slate-800/80 bg-[#0b1430] p-4 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#0e193c]">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/20 text-base text-[#60a5fa]">📚</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</span>
          </div>
          <p className="mt-3 text-2xl font-black text-white tabular-nums">{stats.totalInvited || 0}</p>
          <p className="mt-0.5 text-[11px] font-bold text-slate-400">Enrolled Tests</p>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800/90 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-500 to-[#2563eb]" style={{ width: `${Math.min(100, ((stats.completed || 0) / (stats.totalInvited || 1)) * 100)}%` }} />
          </div>
        </div>

        {/* Widget 2: Pending Action Mocks */}
        <div className="group rounded-2xl border border-slate-800/80 bg-[#0b1430] p-4 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-amber-500/40 hover:bg-[#0e193c]">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-base text-amber-400">⏳</span>
            <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[9px] font-black text-amber-300 border border-amber-500/30">Active</span>
          </div>
          <p className="mt-3 text-2xl font-black text-white tabular-nums">{stats.pending || 0}</p>
          <p className="mt-0.5 text-[11px] font-bold text-slate-400">Pending Tests</p>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800/90 overflow-hidden">
            <div className="h-full bg-amber-400" style={{ width: '65%' }} />
          </div>
        </div>

        {/* Widget 3: Completed Mocks */}
        <div className="group rounded-2xl border border-slate-800/80 bg-[#0b1430] p-4 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/40 hover:bg-[#0e193c]">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-base text-emerald-400">✅</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Done</span>
          </div>
          <p className="mt-3 text-2xl font-black text-white tabular-nums">{stats.completed || 0}</p>
          <p className="mt-0.5 text-[11px] font-bold text-slate-400">Completed</p>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800/90 overflow-hidden">
            <div className="h-full bg-emerald-500" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Widget 4: Pass Rate & Accuracy Ring */}
        <div className="group rounded-2xl border border-slate-800/80 bg-[#0b1430] p-4 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-[#0e193c]">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-base text-cyan-400">🎯</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Accuracy</span>
          </div>
          <p className="mt-3 text-2xl font-black text-cyan-400 tabular-nums">{passRate != null ? `${passRate}%` : '—'}</p>
          <p className="mt-0.5 text-[11px] font-bold text-slate-400">Pass Percentage</p>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800/90 overflow-hidden">
            <div className="h-full bg-cyan-400" style={{ width: `${passRate || 0}%` }} />
          </div>
        </div>

        {/* Widget 5: Est. AIR Rank Predictor */}
        <div className="group rounded-2xl border border-slate-800/80 bg-[#0b1430] p-4 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-purple-500/40 hover:bg-[#0e193c]">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-base text-purple-400">🏆</span>
            <span className="rounded-full bg-purple-500/20 px-1.5 py-0.5 text-[9px] font-black text-purple-300 border border-purple-500/30">AIR</span>
          </div>
          <p className="mt-3 text-2xl font-black text-purple-400 tabular-nums">Top 2.5%</p>
          <p className="mt-0.5 text-[11px] font-bold text-slate-400">AIR Predictor</p>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800/90 overflow-hidden">
            <div className="h-full bg-purple-400" style={{ width: '92%' }} />
          </div>
        </div>

        {/* Widget 6: Practice Streak */}
        <div className="group rounded-2xl border border-slate-800/80 bg-[#0b1430] p-4 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-rose-500/40 hover:bg-[#0e193c]">
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-rose-500/20 text-base text-rose-400">🔥</span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Streak</span>
          </div>
          <p className="mt-3 text-2xl font-black text-rose-400 tabular-nums">7 Days</p>
          <p className="mt-0.5 text-[11px] font-bold text-slate-400">Continuous Mocks</p>
          <div className="mt-2.5 h-1.5 w-full rounded-full bg-slate-800/90 overflow-hidden">
            <div className="h-full bg-rose-500" style={{ width: '85%' }} />
          </div>
        </div>
      </div>

      {/* 4. UPCOMING SCHEDULED TESTS (Timeline & Featured Cards) */}
      {upcoming.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-white">Upcoming Scheduled Tests</h2>
              <p className="text-xs text-slate-400 font-medium">Proctored CBT mock exams scheduled for your enrolled series.</p>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((a) => (
              <div
                key={a.id}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/50"
              >
                <div className="absolute top-0 right-0 rounded-bl-2xl bg-blue-500/20 border-b border-l border-blue-500/30 px-3 py-1 text-[10.5px] font-extrabold uppercase tracking-wider text-[#60a5fa]">
                  Scheduled CBT
                </div>

                <div className="pr-16">
                  <span className="inline-flex rounded-full bg-blue-500/20 px-2.5 py-0.5 text-[10px] font-extrabold uppercase text-blue-300 border border-blue-500/30 mb-2">
                    NTA Exam Mode
                  </span>
                  <h3 className="text-base font-extrabold text-white group-hover:text-[#60a5fa] transition-colors">{a.title}</h3>
                  {a.description && (
                    <p className="mt-2 text-xs text-slate-400 line-clamp-2 leading-relaxed">{a.description}</p>
                  )}
                </div>

                <div className="mt-6 border-t border-slate-800 pt-4 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Available From</p>
                    <p className="text-xs font-extrabold text-slate-200 mt-0.5">
                      {new Date(a.available_from).toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/assessments/${a.id}/instructions`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/40 bg-blue-500/20 px-4 py-2 text-xs font-extrabold text-blue-300 transition hover:bg-[#2563eb] hover:text-white"
                  >
                    <span>Instructions</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. PENDING TESTS SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Pending Mock Tests ({pending.length})</h2>
            <p className="text-xs text-slate-400 font-medium">Attempt these diagnostic tests to evaluate your subject readiness.</p>
          </div>
          {pending.length > 3 && (
            <Link to="/assessments" className="text-xs font-extrabold text-[#60a5fa] hover:underline">
              View All Invited Tests →
            </Link>
          )}
        </div>

        {pending.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-800 bg-[#0b1430] p-8 text-center">
            <p className="text-sm font-extrabold text-slate-200">No pending mock tests</p>
            <p className="mt-1 text-xs text-slate-400">Enroll in a new test series or request an invite to practice.</p>
            <Link to="/test-series" className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-blue-500/25">
              Browse Test Series
            </Link>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {pending.slice(0, 3).map((a) => (
              <AssessmentCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </section>

      {/* 6. RECENT TEST RESULTS & PERFORMANCE CARDS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-black text-white">Recent Test Results</h2>
            <p className="text-xs text-slate-400 font-medium">Review detailed solutions, percentile scores, and subject accuracy keys.</p>
          </div>
          {completed.length > 0 && (
            <Link to="/analytics" className="text-xs font-extrabold text-[#60a5fa] hover:underline">
              Full Analytics Report →
            </Link>
          )}
        </div>

        {completed.length === 0 ? (
          <EmptyState
            title="No test results recorded yet"
            message="Complete your first CBT mock test to unlock All India Rank prediction and subject analysis."
            action={<Link to="/test-series" className="btn-primary">Browse Test Series</Link>}
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {completed.slice(0, 4).map((r) => (
              <div
                key={r.attempt_id || r.id}
                className="group flex flex-col justify-between rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Score Report</span>
                    {r.passed != null && (
                      <Badge color={r.passed ? 'green' : 'red'}>
                        {r.passed ? 'PASSED' : 'NEED PRACTICE'}
                      </Badge>
                    )}
                  </div>

                  <h3 className="line-clamp-2 text-sm font-extrabold text-white group-hover:text-[#60a5fa] transition-colors">
                    {r.title}
                  </h3>

                  <div className="mt-4 flex items-center justify-between rounded-2xl bg-[#070e24] p-3 border border-slate-800">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-400">Score</p>
                      <p className="text-xl font-black text-white tabular-nums">
                        {r.percentage != null ? `${r.percentage}%` : '—'}
                      </p>
                    </div>
                    <div className="h-10 w-10 shrink-0 rounded-full border-4 border-blue-500/30 border-t-[#2563eb] flex items-center justify-center text-[11px] font-extrabold text-[#60a5fa]">
                      {r.percentage || 0}%
                    </div>
                  </div>
                </div>

                {r.attempt_id && (
                  <Link
                    to={`/results/${r.attempt_id}`}
                    className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/15 py-2 text-xs font-bold text-blue-300 transition hover:bg-[#2563eb] hover:text-white"
                  >
                    <span>Detailed Solutions</span>
                    <span aria-hidden="true">→</span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
