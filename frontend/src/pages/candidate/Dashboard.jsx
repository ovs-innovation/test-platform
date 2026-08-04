import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { ErrorState, Badge } from '../../components/ui.jsx';
import { AssessmentCard } from './AssessmentList.jsx';
import DashboardScheduleSnapshot from '../../components/candidate/DashboardScheduleSnapshot.jsx';
import {
  Sparkles,
  Trophy,
  Flame,
  Target,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  ChevronRight,
  Compass,
  Zap,
  BarChart3,
  Brain,
  Building2,
  Download,
  FileText,
  School,
  Calendar as CalendarIcon
} from 'lucide-react';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      const res = await authService.candidateDashboard();
      setData(res);
      setState('done');
    } catch {
      setData({
        pending: [],
        upcoming: [],
        completed: [],
        stats: {
          totalInvited: user?.assignedTestSeries?.length || 0,
          pending: 0,
          upcoming: 0,
          completed: 0,
        },
      });
      setState('done');
    }
  };

  useEffect(() => {
    if (!user) return;
    load();
  }, [user]);

  if (state === 'loading') {
    return (
      <div className="space-y-4 animate-pulse max-w-[1440px] mx-auto">
        <div className="h-32 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-24 rounded-xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
        <div className="h-64 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }
  if (state === 'error') return <ErrorState onRetry={load} />;

  const { pending = [], upcoming = [], completed = [], stats = {} } = data || {};
  const resume = pending.find((a) => a.attempt_status === 'in_progress');
  const passRate = completed.length > 0
    ? Math.round((completed.filter((c) => c.passed).length / completed.length) * 100)
    : null;

  const firstName = user?.name?.split(' ')[0] || 'Student';

  // AI Study Suggestions (Dynamic from API or fallback)
  const aiSuggestions = data?.aiSuggestions || [
    { id: 1, topic: 'Physics - Mechanics', tip: 'Accuracy in Rotation & Work Energy is 54%. Review 15 practice questions.', priority: 'High' },
    { id: 2, topic: 'Chemistry - Organic Reactions', tip: 'Strong performance in Hydrocarbons! Try JEE Advanced Mock #2.', priority: 'Medium' },
    { id: 3, topic: 'Mathematics - Calculus', tip: 'Time per question is 2.1m. Practice speed drills to save 5 mins.', priority: 'Normal' },
  ];

  // Subject Strengths (Dynamic from API or fallback)
  const subjects = data?.subjects || [
    { name: 'Physics', score: '78%', status: 'Strong', color: 'bg-emerald-500' },
    { name: 'Chemistry', score: '64%', status: 'Moderate', color: 'bg-blue-500' },
    { name: 'Mathematics', score: '52%', status: 'Focus Needed', color: 'bg-amber-500' },
    { name: 'Biology', score: '88%', status: 'Excellent', color: 'bg-purple-500' },
  ];

  // Recent Student Milestones (Dynamic from completed attempts & streak)
  const milestones = useMemo(() => {
    const list = [];
    if (completed.length > 0) {
      const latest = completed[0];
      list.push({
        id: 'm1',
        title: `Completed ${latest.title || 'Mock Test'}`,
        time: latest.submitted_at ? new Date(latest.submitted_at).toLocaleDateString() : 'Recently',
        icon: Trophy,
        badge: latest.percentage != null ? `Score ${latest.percentage}%` : 'Completed',
      });
    }
    if (stats.studyStreak > 0) {
      list.push({
        id: 'm2',
        title: `Unlocked ${stats.studyStreak}-Day Study Streak Badge`,
        time: stats.streakActive ? 'Active Today' : 'Recently',
        icon: Flame,
        badge: `${stats.studyStreak} Days`,
      });
    }
    if (user?.institution?.name || user?.assignedTestSeries?.length) {
      list.push({
        id: 'm3',
        title: `Enrolled in ${user?.institution?.name || 'AIETS Institutional Series'}`,
        time: 'Active',
        icon: BookOpen,
        badge: 'Enrolled',
      });
    }
    return list.length > 0 ? list : [
      { id: 'm1', title: 'Welcome to AIETS Assessment Platform', time: 'Today', icon: BookOpen, badge: 'New Candidate' }
    ];
  }, [completed, stats, user]);

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12">
      {/* 1. INSTITUTIONAL STUDENT ACCESS HERO BANNER */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-gradient-to-r from-blue-50/90 via-indigo-50/70 to-blue-50/90 dark:from-[#010d1f] dark:via-[#081b38] dark:to-[#112a52] p-5 sm:p-6 text-slate-900 dark:text-white shadow-2xs">
        {/* Ambient Glowing Orbs */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-blue-400/10 dark:bg-cyan-400/15 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-indigo-500/10 dark:bg-blue-500/20 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3 max-w-2xl">
            {/* Dynamic Institution & Batch Badge */}
            <div className="flex flex-wrap items-center gap-2">
              {user?.institution?.name && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 backdrop-blur-md">
                  <Building2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{user.institution.name}</span>
                </span>
              )}

              {user?.batch && (
                <span className="inline-flex items-center gap-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-blue-700 dark:text-cyan-300 backdrop-blur-md">
                  <School className="h-3.5 w-3.5" />
                  <span>{user.batch}</span>
                </span>
              )}

              {user?.enrollmentId && (
                <span className="inline-flex items-center gap-1 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-extrabold font-mono text-purple-700 dark:text-purple-300 backdrop-blur-md">
                  ID: {user.enrollmentId}
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-snug">
              Welcome back, {firstName}! 🚀
            </h1>

            {user?.institution?.name ? (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Your institution has assigned these <strong>AIETS Test Series</strong> and <strong>Digital eBooks</strong>. Practice full-length CBT mock tests to maximize your All India Rank!
              </p>
            ) : (
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Access your <strong>purchased test series</strong> and <strong>NTA CBT diagnostic mock exams</strong>. Practice full-length tests to maximize your All India Rank!
              </p>
            )}

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {resume ? (
                <Link
                  to={`/exam/${resume.attempt_id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-black text-amber-950 shadow-2xs transition hover:scale-105"
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Resume Active Test</span>
                </Link>
              ) : (
                <Link
                  to="/my-tests"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-black text-white shadow-2xs hover:bg-blue-500 transition"
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>My Enrolled Tests</span>
                </Link>
              )}

              <Link
                to="/test-series"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-white/10 px-3.5 py-2 text-xs font-extrabold text-slate-700 dark:text-white backdrop-blur-md transition hover:bg-slate-50 dark:hover:bg-white/20"
              >
                <Compass className="h-3.5 w-3.5" />
                <span>Explore Series</span>
              </Link>

              <Link
                to="/analytics"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 dark:border-white/20 bg-white dark:bg-white/10 px-3.5 py-2 text-xs font-extrabold text-slate-700 dark:text-white backdrop-blur-md transition hover:bg-slate-50 dark:hover:bg-white/20"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span>Analytics</span>
              </Link>
            </div>
          </div>

          {/* Right Rank Predictor Card */}
          <div className="rounded-xl border border-slate-200/80 dark:border-white/15 bg-white/90 dark:bg-white/10 p-3.5 backdrop-blur-xl shadow-2xs space-y-2.5 shrink-0 w-full lg:w-72">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-white/15 pb-2">
              <div className="flex items-center gap-1.5">
                <Trophy className="h-4 w-4 text-blue-600 dark:text-cyan-300" />
                <div>
                  <p className="text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-300">Rank Predictor</p>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {stats.topPercentile != null
                      ? `Top ${stats.topPercentile}% Percentile`
                      : completed.length > 0
                      ? 'Top 15% Percentile'
                      : 'Unranked Student'}
                  </p>
                </div>
              </div>
              <span className="rounded-md bg-blue-500/10 dark:bg-cyan-400/20 px-2 py-0.5 text-[10px] font-extrabold text-blue-600 dark:text-cyan-300 border border-blue-500/20 dark:border-cyan-400/30">
                {stats.airRank ? `AIR #${stats.airRank}` : completed.length > 0 ? 'Ranked' : 'Unranked'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 dark:bg-white/10 p-2 border border-slate-200/80 dark:border-white/10">
                <p className="text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-300">Completed</p>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{stats.completed || 0} / {stats.totalInvited || 0}</p>
              </div>
              <div className="rounded-lg bg-slate-50 dark:bg-white/10 p-2 border border-slate-200/80 dark:border-white/10">
                <p className="text-[9.5px] font-bold uppercase text-slate-500 dark:text-slate-300">Accuracy</p>
                <p className="text-sm font-black text-blue-600 dark:text-cyan-300 mt-0.5">{passRate != null ? `${passRate}%` : '—'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-50 dark:bg-white/10 px-3 py-1.5 border border-slate-200/80 dark:border-white/10 text-xs">
              <span className="flex items-center gap-1 text-slate-700 dark:text-slate-200 font-medium text-[11px]">
                <Flame className="h-3.5 w-3.5 text-amber-500" /> Study Streak
              </span>
              <span className="font-extrabold text-amber-600 dark:text-amber-300 text-[11px]">
                {stats.studyStreak || 0} Days {stats.streakActive ? 'Active 🔥' : 'Inactive'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACTIVE TEST RESUME ALERT (IF TEST IN PROGRESS) */}
      {resume && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50 p-3.5 dark:border-amber-900 dark:bg-amber-950/40 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-400 text-amber-950 shadow-xs">
              <Zap className="h-4 w-4" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">Active Test In Progress</span>
              <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-amber-100">{resume.title}</p>
            </div>
          </div>
          <Link
            to={`/exam/${resume.attempt_id}`}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-1.5 text-xs font-black text-amber-950 shadow-2xs hover:bg-amber-400 transition"
          >
            <span>Continue Test</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}

      {/* 2.5 OFFICIAL AIETS 2027 ASSESSMENT SCHEDULE SNAPSHOT */}
      <DashboardScheduleSnapshot />

      {/* 3. 6 REDESIGNED SAAS KPI CARDS */}
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
        <SaaSStudentKpiCard
          label="Total Enrolled"
          value={stats.totalInvited || 0}
          trend="+2 New"
          trendUp={true}
          icon={BookOpen}
          sparkline={[5, 8, 10, 12, 14, 16, 18, 20]}
          insight="All enrolled test series"
          color="text-blue-600 dark:text-blue-400"
        />
        <SaaSStudentKpiCard
          label="Pending Mocks"
          value={stats.pending || 0}
          trend="Active"
          trendUp={true}
          icon={Clock}
          sparkline={[12, 10, 8, 7, 6, 5, 4, 3]}
          insight="Ready to attempt"
          color="text-amber-600 dark:text-amber-400"
        />
        <SaaSStudentKpiCard
          label="Completed"
          value={stats.completed || 0}
          trend="+4 Done"
          trendUp={true}
          icon={CheckCircle2}
          sparkline={[2, 4, 6, 8, 10, 12, 14, 16]}
          insight="Submitted attempts"
          color="text-emerald-600 dark:text-emerald-400"
        />
        <SaaSStudentKpiCard
          label="Pass Rate"
          value={passRate != null ? `${passRate}%` : '—'}
          trend="+3.2%"
          trendUp={true}
          icon={Target}
          sparkline={[60, 65, 70, 72, 75, 78, 82, 88]}
          insight="Evaluation score avg"
          color="text-cyan-600 dark:text-cyan-400"
        />
        <SaaSStudentKpiCard
          label="AIR Percentile"
          value={
            stats.topPercentile != null
              ? `Top ${stats.topPercentile}%`
              : completed.length > 0
              ? 'Top 15%'
              : '—'
          }
          trend={stats.airRank ? `AIR #${stats.airRank}` : (completed.length > 0 ? 'Ranked' : 'Unranked')}
          trendUp={true}
          icon={Trophy}
          sparkline={[85, 88, 90, 92, 94, 96, 97, 98]}
          insight="Predicted rank score"
          color="text-purple-600 dark:text-purple-400"
        />
        <SaaSStudentKpiCard
          label="Study Streak"
          value={`${stats.studyStreak || 0} Days`}
          trend={stats.streakActive ? 'Active 🔥' : 'Inactive'}
          trendUp={Boolean(stats.streakActive)}
          icon={Flame}
          sparkline={[1, 2, 3, 4, 5, 6, 7, (stats.studyStreak || 1)]}
          insight="Continuous practice"
          color="text-rose-600 dark:text-rose-400"
        />
      </div>

      {/* 5. AI STUDY SUGGESTIONS & SUBJECT BREAKDOWN */}
      <div className="grid gap-3 lg:grid-cols-3">
        {/* AI Study Suggestions */}
        <div className="saas-card p-4 space-y-3 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <div className="flex items-center gap-1.5">
              <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">AI Personal Study Recommendations</h3>
            </div>
            <span className="text-[10.5px] font-bold text-purple-600 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">Smart Insights</span>
          </div>

          <div className="space-y-2">
            {aiSuggestions.map((s) => (
              <div key={s.id} className="p-2.5 rounded-lg bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex items-start gap-2.5">
                <span className="p-1 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                  <Sparkles className="h-3.5 w-3.5" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{s.topic}</p>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${s.priority === 'High' ? 'bg-rose-500/10 text-rose-600' : 'bg-blue-500/10 text-blue-600'}`}>
                      {s.priority} Priority
                    </span>
                  </div>
                  <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-0.5">{s.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Mastery Pills */}
        <div className="saas-card p-4 space-y-3 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Subject Mastery</h3>
            <span className="text-[10.5px] text-slate-400">Target 2026</span>
          </div>

          <div className="space-y-2.5">
            {subjects.map((sub, i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-800 dark:text-slate-200">{sub.name}</span>
                  <span className="font-bold text-slate-900 dark:text-white">{sub.score}</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className={`h-full ${sub.color}`} style={{ width: sub.score }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. UPCOMING SCHEDULED TESTS */}
      {upcoming.length > 0 && (
        <section className="space-y-2.5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Upcoming Scheduled Tests</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Official proctored mock exams scheduled for your series.</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((a) => (
              <div
                key={a.id}
                className="saas-card p-4 flex flex-col justify-between bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl hover:border-blue-500/40 transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded">
                      Scheduled CBT
                    </span>
                    <span className="text-[10px] text-slate-400">NTA Exam Mode</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{a.title}</h3>
                  {a.description && (
                    <p className="mt-1 text-[11px] font-normal text-slate-500 dark:text-slate-400 line-clamp-2">{a.description}</p>
                  )}
                </div>

                <div className="mt-4 border-t border-slate-100 dark:border-slate-800/60 pt-2.5 flex items-center justify-between">
                  <div>
                    <p className="text-[9.5px] uppercase font-bold text-slate-400">Available From</p>
                    <p className="text-[11px] font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {new Date(a.available_from).toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/assessments/${a.id}/instructions`}
                    className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400 transition"
                  >
                    <span>Instructions</span>
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. PENDING TESTS SECTION */}
      <section className="space-y-2.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">Pending Mock Tests ({pending.length})</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Attempt these diagnostic tests to evaluate subject readiness.</p>
          </div>
          {pending.length > 3 && (
            <Link to="/assessments" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              View All Invited Tests →
            </Link>
          )}
        </div>

        {pending.length === 0 ? (
          <div className="saas-card p-6 text-center bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-2">
            <p className="text-xs font-bold text-slate-900 dark:text-white">No pending mock tests</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Enroll in a new test series or practice available mock exams.</p>
            <Link to="/test-series" className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white shadow-2xs">
              Browse Test Series
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pending.slice(0, 3).map((a) => (
              <AssessmentCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </section>

      {/* 6.5 AUTO-ASSIGNED EBOOKS LIBRARY */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <FileText className="h-4 w-4 text-emerald-500" />
              <span>Assigned eBooks & Digital Study Material</span>
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                Auto-Assigned
              </span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Formula reference guides, chapter revision notes, and solved PYQ eBooks assigned to your batch.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {(user?.assignedEbooks || [
            { id: 'eb1', title: 'Physics Formula Book & Mechanics Cheat-Sheet', category: 'Formula Guide', size: '14.8 MB', pages: 240 },
            { id: 'eb2', title: 'Organic & Physical Chemistry Solved PYQs (2015-2025)', category: 'Question Bank', size: '18.2 MB', pages: 310 },
            { id: 'eb3', title: 'AIETS Mathematics & Speed Drills Handbook', category: 'Revision Guide', size: '9.4 MB', pages: 185 }
          ]).map((eb) => (
            <div key={eb.id} className="p-4 rounded-xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 flex flex-col justify-between hover:border-cyan-500/40 transition">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                    {eb.category || 'eBook'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{eb.size || 'PDF'}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">{eb.title}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Assigned by {user?.institution?.name || 'Institution'}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Ready to Read
                </span>
                <button
                  onClick={() => alert(`Downloading ${eb.title} PDF eBook for offline study...`)}
                  className="inline-flex items-center gap-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30 px-2.5 py-1 text-xs font-bold transition cursor-pointer"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. RECENT RESULTS & MILESTONE ACTIVITY */}
      <div className="grid gap-3 lg:grid-cols-3">
        {/* Recent Results Grid */}
        <div className="saas-card p-4 space-y-3 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Recent Test Results</h3>
            {completed.length > 0 && (
              <Link to="/analytics" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Full Analytics →
              </Link>
            )}
          </div>

          {completed.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400">No test attempts completed yet.</p>
          ) : (
            <div className="grid gap-2.5 sm:grid-cols-2">
              {completed.slice(0, 4).map((r) => (
                <div key={r.attempt_id || r.id} className="p-3 rounded-lg bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase text-slate-400">Score Report</span>
                      {r.passed != null && (
                        <Badge color={r.passed ? 'green' : 'red'}>
                          {r.passed ? 'Passed' : 'Practice'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{r.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-black text-slate-900 dark:text-white">{r.percentage != null ? `${r.percentage}%` : '—'}</span>
                      <span className="text-[10px] text-slate-400">{r.marks_obtained}/{r.total_marks} Marks</span>
                    </div>
                  </div>
                  {r.attempt_id && (
                    <Link to={`/results/${r.attempt_id}`} className="mt-2 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                      <span>View Solutions</span>
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Milestone Activity Timeline */}
        <div className="saas-card p-4 space-y-3 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Milestone Feed</h3>
            <Award className="h-4 w-4 text-amber-500" />
          </div>

          <div className="space-y-2">
            {milestones.map((m) => {
              const IconM = m.icon;
              return (
                <div key={m.id} className="p-2 rounded-lg bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconM className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-[11px] font-bold text-slate-900 dark:text-white">{m.title}</p>
                      <p className="text-[9.5px] text-slate-400">{m.time}</p>
                    </div>
                  </div>
                  <span className="text-[9.5px] font-extrabold px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 border border-blue-500/20">{m.badge}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SaaSStudentKpiCard({ label, value, trend, trendUp, icon: IconComp, sparkline, insight, color }) {
  const points = useMemo(() => {
    const min = Math.min(...sparkline);
    const max = Math.max(...sparkline) || 1;
    return sparkline
      .map((val, idx) => {
        const x = (idx / (sparkline.length - 1)) * 80 + 5;
        const y = 28 - ((val - min) / (max - min || 1)) * 20 - 4;
        return `${x},${y}`;
      })
      .join(' ');
  }, [sparkline]);

  return (
    <div className="saas-card p-3 bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800/80 rounded-xl space-y-1.5 shadow-2xs hover:border-slate-300 dark:hover:border-slate-700 transition">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</span>
        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <IconComp className={`h-3.5 w-3.5 ${color}`} />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-1">
        <h4 className={`text-lg font-black tracking-tight ${color}`}>{value}</h4>
        
        {/* Mini Sparkline Chart */}
        <div className="h-5 w-16 shrink-0 opacity-80">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 90 32">
            <polyline
              fill="none"
              stroke={trendUp ? '#22C55E' : '#F43F5E'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
          </svg>
        </div>
      </div>

      <div className="flex items-center justify-between text-[10px] border-t border-slate-100 dark:border-slate-800/60 pt-1">
        <span className="font-extrabold text-emerald-600 dark:text-emerald-400">{trend}</span>
        <span className="text-slate-400 font-normal truncate">{insight}</span>
      </div>
    </div>
  );
}
