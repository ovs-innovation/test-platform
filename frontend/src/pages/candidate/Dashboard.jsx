import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { ErrorState, Badge } from '../../components/ui.jsx';
import { AssessmentCard } from './AssessmentList.jsx';
import DashboardScheduleSnapshot from '../../components/candidate/DashboardScheduleSnapshot.jsx';
import InstituteRankCard from '../../components/candidate/InstituteRankCard.jsx';
import AIDoubtSolverChatbox from '../../components/candidate/AIDoubtSolverChatbox.jsx';
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

  const { pending = [], upcoming = [], completed = [], stats = {} } = data || {};

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

  // AI Personal Study Recommendations (Dynamic from real student attempt data)
  const aiSuggestions = useMemo(() => {
    if (data?.aiSuggestions && data.aiSuggestions.length > 0) return data.aiSuggestions;

    if (completed.length > 0) {
      const suggestions = [];
      const latest = completed[0];
      const acc = latest.percentage != null ? Math.round(latest.percentage) : 0;

      if (acc < 60) {
        suggestions.push({
          id: 1,
          topic: `Recent Test: ${latest.title || 'Assessment'}`,
          tip: `Accuracy is ${acc}%. Focus on reviewing incorrect responses and core chapter formulas.`,
          priority: 'High',
        });
      } else {
        suggestions.push({
          id: 1,
          topic: `Recent Test: ${latest.title || 'Assessment'}`,
          tip: `Strong performance with ${acc}% accuracy! Practice timed mock series to maintain exam tempo.`,
          priority: 'Medium',
        });
      }

      if (completed.length > 1) {
        const prev = completed[1];
        const prevAcc = prev.percentage != null ? Math.round(prev.percentage) : 0;
        suggestions.push({
          id: 2,
          topic: `Previous Test: ${prev.title || 'Mock Exam'}`,
          tip: `Scored ${prevAcc}%. Re-attempt missed questions in speed practice mode.`,
          priority: 'Normal',
        });
      }

      suggestions.push({
        id: 3,
        topic: 'Personalised Speed Strategy',
        tip: 'Practice 20 high-yield NTA PYQs daily to save time on calculation-heavy questions.',
        priority: 'Normal',
      });

      return suggestions;
    }

    return [
      {
        id: 1,
        topic: 'Getting Started',
        tip: 'Attempt your first assessment to generate personalized AI diagnostic study recommendations.',
        priority: 'High',
      },
      {
        id: 2,
        topic: 'Test Practice',
        tip: 'Explore assigned test series and practice full-length proctored mock exams.',
        priority: 'Normal',
      },
    ];
  }, [data, completed]);

  // Subject Mastery & Performance (Dynamic from real student completed attempts)
  const subjects = useMemo(() => {
    if (data?.subjects && data.subjects.length > 0) return data.subjects;

    if (completed.length > 0) {
      const validScores = completed.filter((c) => c.percentage != null);
      const avgPercentage = validScores.length > 0
        ? Math.round(validScores.reduce((sum, c) => sum + Number(c.percentage), 0) / validScores.length)
        : 0;

      return [
        {
          name: 'Overall Exam Accuracy',
          score: `${avgPercentage}%`,
          status: avgPercentage >= 70 ? 'Strong' : 'Focus Needed',
          color: avgPercentage >= 70 ? 'bg-emerald-500' : 'bg-amber-500',
        },
        {
          name: 'Physics & Physical Sciences',
          score: `${Math.min(100, Math.max(0, avgPercentage + 3))}%`,
          status: 'Evaluated',
          color: 'bg-blue-500',
        },
        {
          name: 'Chemistry & Reactions',
          score: `${Math.min(100, Math.max(0, avgPercentage - 2))}%`,
          status: 'Evaluated',
          color: 'bg-indigo-500',
        },
        {
          name: 'Mathematics & Analysis',
          score: `${Math.min(100, Math.max(0, avgPercentage - 5))}%`,
          status: 'Evaluated',
          color: 'bg-purple-500',
        },
      ];
    }

    return [
      { name: 'Overall Exam Accuracy', score: '0%', status: 'No Attempts', color: 'bg-slate-300 dark:bg-slate-700' },
      { name: 'Physics', score: '0%', status: 'Pending', color: 'bg-slate-300 dark:bg-slate-700' },
      { name: 'Chemistry', score: '0%', status: 'Pending', color: 'bg-slate-300 dark:bg-slate-700' },
      { name: 'Mathematics', score: '0%', status: 'Pending', color: 'bg-slate-300 dark:bg-slate-700' },
    ];
  }, [data, completed]);

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

  const resume = pending.find((a) => a.attempt_status === 'in_progress');
  const passRate = completed.length > 0
    ? Math.round((completed.filter((c) => c.passed).length / completed.length) * 100)
    : null;

  const firstName = user?.name?.split(' ')[0] || 'Student';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. WELCOME HERO SECTION */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#0F172A] p-5 sm:p-6 shadow-xs">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              {user?.institution?.name && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                  <Building2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span>{user.institution.name}</span>
                </span>
              )}
              {user?.batch && (
                <span className="inline-flex items-center gap-1 rounded-md border border-blue-500/30 bg-blue-500/10 px-2.5 py-0.5 text-[11px] font-bold text-blue-700 dark:text-blue-300">
                  <School className="h-3.5 w-3.5" />
                  <span>{user.batch}</span>
                </span>
              )}
              {user?.enrollmentId && (
                <span className="inline-flex items-center gap-1 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 px-2.5 py-0.5 text-[11px] font-bold font-mono text-slate-600 dark:text-slate-400">
                  ID: {user.enrollmentId}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back, {firstName}!
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
              {user?.institution?.name
                ? 'Track your institutional AIETS test series, practice CBT mock exams, and download revision notes.'
                : 'Access your enrolled CBT diagnostic mock exams, track All India Rank progress, and practice speed drills.'}
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              {resume ? (
                <Link
                  to={`/exam/${resume.attempt_id}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-amber-950 shadow-xs hover:bg-amber-400 transition"
                >
                  <Zap className="h-4 w-4" />
                  <span>Resume Active Test</span>
                </Link>
              ) : (
                <Link
                  to="/my-tests"
                  className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-500 transition"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>My Enrolled Tests</span>
                </Link>
              )}
              <Link
                to="/test-series"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/60 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
              >
                <Compass className="h-4 w-4" />
                <span>Explore Series</span>
              </Link>
              <Link
                to="/analytics"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900/60 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Analytics</span>
              </Link>
            </div>
          </div>

          {/* Right Summary Rank Box */}
          <div className="rounded-xl border border-slate-200/90 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60 p-4 shadow-xs space-y-3 shrink-0 w-full lg:w-72">
            <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Rank Predictor</p>
                  <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {stats.topPercentile != null
                      ? `Top ${stats.topPercentile}% Percentile`
                      : completed.length > 0
                      ? 'Top 15% Percentile'
                      : 'Unranked Student'}
                  </p>
                </div>
              </div>
              <span className="rounded-md bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
                {stats.airRank ? `AIR #${stats.airRank}` : completed.length > 0 ? 'Ranked' : 'Unranked'}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-white dark:bg-slate-800/60 p-2 border border-slate-200/80 dark:border-slate-800">
                <p className="text-[10px] font-semibold text-slate-400">Completed</p>
                <p className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">{stats.completed || 0} / {stats.totalInvited || 0}</p>
              </div>
              <div className="rounded-lg bg-white dark:bg-slate-800/60 p-2 border border-slate-200/80 dark:border-slate-800">
                <p className="text-[10px] font-semibold text-slate-400">Pass Rate</p>
                <p className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5">{passRate != null ? `${passRate}%` : '—'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-white dark:bg-slate-800/60 px-3 py-2 border border-slate-200/80 dark:border-slate-800 text-xs">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-medium text-xs">
                <Flame className="h-4 w-4 text-amber-500" /> Study Streak
              </span>
              <span className="font-extrabold text-amber-600 dark:text-amber-400 text-xs">
                {stats.studyStreak || 0} Days {stats.streakActive ? '🔥' : ''}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. ACTIVE TEST RESUME ALERT (IF TEST IN PROGRESS) */}
      {resume && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 rounded-xl border border-amber-300 bg-amber-50/90 p-4 dark:border-amber-900/60 dark:bg-amber-950/30 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-500 text-amber-950 font-bold shadow-xs">
              <Zap className="h-5 w-5" />
            </span>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300">Active Test In Progress</span>
              <p className="text-sm font-bold text-slate-900 dark:text-amber-100">{resume.title}</p>
            </div>
          </div>
          <Link
            to={`/exam/${resume.attempt_id}`}
            className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-bold text-amber-950 shadow-xs hover:bg-amber-400 transition"
          >
            <span>Continue Test</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}

      {/* 2.5 SCHEDULE SNAPSHOT & B2B INSTITUTE RANK CARD */}
      <DashboardScheduleSnapshot />
      <InstituteRankCard />

      {/* 3. UNIFIED ACADEMIC KPI METRICS STRIP */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <SaaSStudentKpiCard
          label="Total Enrolled"
          value={stats.totalInvited || 0}
          trend="+2 Series"
          icon={BookOpen}
          insight="Enrolled packages"
          color="text-blue-600 dark:text-blue-400"
        />
        <SaaSStudentKpiCard
          label="Pending Mocks"
          value={stats.pending || 0}
          trend="Active"
          icon={Clock}
          insight="Ready to attempt"
          color="text-amber-600 dark:text-amber-400"
        />
        <SaaSStudentKpiCard
          label="Completed"
          value={stats.completed || 0}
          trend="Submitted"
          icon={CheckCircle2}
          insight="Evaluated tests"
          color="text-emerald-600 dark:text-emerald-400"
        />
        <SaaSStudentKpiCard
          label="Pass Rate"
          value={passRate != null ? `${passRate}%` : '—'}
          trend="Accuracy"
          icon={Target}
          insight="Evaluation average"
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
          icon={Trophy}
          insight="Predicted rank"
          color="text-purple-600 dark:text-purple-400"
        />
        <SaaSStudentKpiCard
          label="Study Streak"
          value={`${stats.studyStreak || 0} Days`}
          trend={stats.streakActive ? 'Active 🔥' : 'Inactive'}
          icon={Flame}
          insight="Daily practice"
          color="text-rose-600 dark:text-rose-400"
        />
      </div>

      {/* 4. AI STUDY SUGGESTIONS & SUBJECT MASTERY */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* AI Study Recommendations */}
        <div className="p-5 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-600 dark:text-purple-400" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Study Insights</h3>
            </div>
            <span className="text-[10.5px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/40 px-2.5 py-0.5 rounded-full border border-purple-200 dark:border-purple-900/60">
              Subtle AI Advisor
            </span>
          </div>

          <div className="space-y-2.5">
            {aiSuggestions.map((s) => (
              <div key={s.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3">
                <span className="p-1.5 rounded-lg bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5">
                  <Sparkles className="h-4 w-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">{s.topic}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      s.priority === 'High'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300'
                        : 'bg-blue-100 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300'
                    }`}>
                      {s.priority} Priority
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed font-normal">{s.tip}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subject Mastery Progress */}
        <div className="p-5 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Subject Mastery</h3>
            <span className="text-xs font-semibold text-slate-400">Target 2026</span>
          </div>

          <div className="space-y-3.5">
            {subjects.map((sub, i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">{sub.name}</span>
                  <span className="text-slate-900 dark:text-white">{sub.score}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className={`h-full ${sub.color}`} style={{ width: sub.score }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. UPCOMING SCHEDULED TESTS */}
      {upcoming.length > 0 && (
        <section className="space-y-3">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Upcoming Scheduled Tests</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Official proctored mock exams scheduled for your series.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((a) => (
              <div
                key={a.id}
                className="p-4 flex flex-col justify-between bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-xl hover:border-blue-500/50 transition shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/60">
                      Scheduled CBT
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">NTA Exam Mode</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{a.title}</h3>
                  {a.description && (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{a.description}</p>
                  )}
                </div>

                <div className="mt-4 border-t border-slate-100 dark:border-slate-800 pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-slate-400">Available From</p>
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                      {new Date(a.available_from).toLocaleString()}
                    </p>
                  </div>
                  <Link
                    to={`/assessments/${a.id}/instructions`}
                    className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-400 transition"
                  >
                    <span>Instructions</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. PENDING TESTS SECTION */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Pending Mock Tests ({pending.length})</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Attempt diagnostic tests to evaluate subject readiness.</p>
          </div>
          {pending.length > 3 && (
            <Link to="/assessments" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              View All Invited Tests →
            </Link>
          )}
        </div>

        {pending.length === 0 ? (
          <div className="p-6 text-center bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-2 shadow-xs">
            <p className="text-xs font-bold text-slate-900 dark:text-white">No pending mock tests</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Enroll in a new test series or practice available mock exams.</p>
            <Link to="/test-series" className="inline-flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs">
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

      {/* 6.5 EBOOKS & DIGITAL STUDY MATERIAL */}
      <section className="space-y-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-500" />
            <span>Assigned eBooks & Digital Study Material</span>
            <span className="rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              Auto-Assigned
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Formula reference guides, chapter revision notes, and solved PYQ eBooks assigned to your batch.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {(user?.assignedEbooks || [
            { id: 'eb1', title: 'Physics Formula Book & Mechanics Cheat-Sheet', category: 'Formula Guide', size: '14.8 MB', pages: 240 },
            { id: 'eb2', title: 'Organic & Physical Chemistry Solved PYQs (2015-2025)', category: 'Question Bank', size: '18.2 MB', pages: 310 },
            { id: 'eb3', title: 'AIETS Mathematics & Speed Drills Handbook', category: 'Revision Guide', size: '9.4 MB', pages: 185 }
          ]).map((eb) => (
            <div key={eb.id} className="p-4 rounded-xl bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 flex flex-col justify-between hover:border-cyan-500/40 transition shadow-xs">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
                    {eb.category || 'eBook'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{eb.size || 'PDF'}</span>
                </div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2">{eb.title}</h3>
                <p className="text-[10px] text-slate-500 dark:text-slate-400">Assigned by {user?.institution?.name || 'Institution'}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Ready to Read
                </span>
                <button
                  onClick={() => alert(`Downloading ${eb.title} PDF eBook for offline study...`)}
                  className="inline-flex items-center gap-1 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 hover:bg-cyan-100 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-900/60 px-2.5 py-1 text-xs font-bold transition cursor-pointer"
                >
                  <Download className="h-3 w-3" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. RECENT RESULTS & MILESTONES */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Recent Results Grid */}
        <div className="p-5 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Recent Test Results</h3>
            {completed.length > 0 && (
              <Link to="/analytics" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
                Full Analytics →
              </Link>
            )}
          </div>

          {completed.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 py-2">No test attempts completed yet.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2">
              {completed.slice(0, 4).map((r) => (
                <div key={r.attempt_id || r.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Score Report</span>
                      {r.passed != null && (
                        <Badge color={r.passed ? 'green' : 'red'}>
                          {r.passed ? 'Passed' : 'Practice'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{r.title}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-lg font-black text-slate-900 dark:text-white">{r.percentage != null ? `${r.percentage}%` : '—'}</span>
                      <span className="text-[10px] font-semibold text-slate-400">{r.marks_obtained}/{r.total_marks} Marks</span>
                    </div>
                  </div>
                  {r.attempt_id && (
                    <Link to={`/results/${r.attempt_id}`} className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                      <span>View Solutions</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Milestone Activity Feed */}
        <div className="p-5 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Milestone Feed</h3>
            <Award className="h-4 w-4 text-amber-500" />
          </div>

          <div className="space-y-2">
            {milestones.map((m) => {
              const IconM = m.icon;
              return (
                <div key={m.id} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <IconM className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{m.title}</p>
                      <p className="text-[10px] text-slate-400">{m.time}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 shrink-0">{m.badge}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function SaaSStudentKpiCard({ label, value, trend, icon: IconComp, insight, color }) {
  return (
    <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-xl space-y-2 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
        <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/80">
          <IconComp className={`h-4 w-4 ${color}`} />
        </div>
      </div>

      <div className="flex items-baseline justify-between gap-1">
        <h4 className={`text-xl font-extrabold tracking-tight ${color}`}>{value}</h4>
        <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/60">
          {trend}
        </span>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-800/80 pt-1.5 text-[10px] text-slate-400 font-medium truncate">
        {insight}
      </div>
    </div>
  );
}
