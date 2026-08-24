import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authService, ebookService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { ErrorState, Badge } from '../../components/ui.jsx';
import { AssessmentCard } from './AssessmentList.jsx';
import {
  Trophy,
  Flame,
  Target,
  CheckCircle2,
  BookOpen,
  ChevronRight,
  BarChart3,
  Building2,
  School,
  ArrowRight,
  Sparkles,
  ClipboardList
} from 'lucide-react';

export default function CandidateDashboard() {
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [assignedEbooks, setAssignedEbooks] = useState([]);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      const [res, ebooksData] = await Promise.all([
        authService.candidateDashboard(),
        ebookService.myEbooks().catch(() => []),
      ]);
      setData(res);
      setAssignedEbooks(ebooksData || []);
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

  const { pending = [], completed = [], stats = {} } = data || {};

  if (state === 'loading') {
    return (
      <div className="space-y-6 animate-pulse max-w-6xl mx-auto py-4">
        <div className="h-32 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-800" />
          ))}
        </div>
        <div className="h-48 w-full rounded-2xl bg-slate-200 dark:bg-slate-800" />
      </div>
    );
  }
  if (state === 'error') return <ErrorState onRetry={load} />;

  const passRate = completed.length > 0
    ? Math.round((completed.filter((c) => c.passed || Number(c.percentage) >= 40).length / completed.length) * 100)
    : null;

  const firstName = user?.name?.split(' ')[0] || 'Student';

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* 1. CLEAN & ELEGANT HEADER */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 sm:p-7 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {user?.institution?.name && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <Building2 className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                  <span>{user.institution.name}</span>
                </span>
              )}
              {user?.batch && (
                <span className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <School className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                  <span>{user.batch}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome back, {firstName} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
              Track your assigned test series, view analytical diagnostic reports, and attempt scheduled exams.
            </p>
          </div>

          {/* Action buttons */}
          <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <Link
              to="/my-tests"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 px-4 py-2.5 text-xs font-bold text-white shadow-xs transition-colors"
            >
              <ClipboardList className="h-4 w-4" />
              <span>View My Tests</span>
            </Link>

            <Link
              to="/analytics"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <BarChart3 className="h-4 w-4 text-slate-500 dark:text-slate-400" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. 4 CLEAN MINIMALIST METRIC CARDS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <CleanStatCard
          label="Tests Completed"
          value={`${stats.completed || 0} / ${stats.totalInvited || 0}`}
          subtitle={`${stats.pending || 0} Pending`}
          icon={CheckCircle2}
          color="text-emerald-600 dark:text-emerald-400"
          bg="bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/50"
        />
        <CleanStatCard
          label="Accuracy Rate"
          value={passRate != null ? `${passRate}%` : '—'}
          subtitle="Evaluation mean"
          icon={Target}
          color="text-blue-600 dark:text-blue-400"
          bg="bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800/50"
        />
        <CleanStatCard
          label="Predicted Rank"
          value={stats.airRank ? `AIR #${stats.airRank}` : 'Unranked'}
          subtitle={stats.topPercentile ? `Top ${stats.topPercentile}%` : 'Assessment AIR'}
          icon={Trophy}
          color="text-purple-600 dark:text-purple-400"
          bg="bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/50"
        />
        <CleanStatCard
          label="Study Streak"
          value={`${stats.studyStreak || 0} Days`}
          subtitle={stats.streakActive ? 'Active Today' : 'Practice Daily'}
          icon={Flame}
          color="text-amber-600 dark:text-amber-400"
          bg="bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/50"
        />
      </div>

      {/* 3. ACTIVE & PENDING TESTS */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Active & Pending Tests</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Tests assigned to your batch ready for evaluation.</p>
          </div>
          {pending.length > 0 && (
            <Link to="/my-tests" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
              <span>View All ({pending.length})</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>

        {pending.length === 0 ? (
          <div className="py-8 px-4 text-center bg-slate-50/70 dark:bg-slate-900/40 rounded-xl border border-slate-200/80 dark:border-slate-800/80 space-y-2">
            <CheckCircle2 className="h-7 w-7 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <p className="text-sm font-bold text-slate-900 dark:text-white">All caught up!</p>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              You have no pending tests right now. View your past performance analytics or browse assigned test packages.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pending.slice(0, 3).map((a) => (
              <AssessmentCard key={a.id} a={a} />
            ))}
          </div>
        )}
      </div>

      {/* 4. RECENT TEST REPORTS */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Recent Test Reports</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">View solutions, score breakdowns, and AI diagnostics.</p>
          </div>
          {completed.length > 0 && (
            <Link to="/analytics" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              Full Analytics →
            </Link>
          )}
        </div>

        {completed.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
            No completed tests yet. Attempt a test to unlock instant score reports and AI performance analysis.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {completed.slice(0, 3).map((r) => (
              <div
                key={r.attempt_id || r.id}
                className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Completed Test</span>
                    {r.passed != null && (
                      <Badge color={r.passed ? 'green' : 'red'}>
                        {r.passed ? 'Passed' : 'Practice'}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{r.title}</h3>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {r.percentage != null ? `${r.percentage}%` : '—'}
                    </span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {r.marks_obtained}/{r.total_marks} Marks
                    </span>
                  </div>
                </div>

                {r.attempt_id && (
                  <Link
                    to={`/results/${r.attempt_id}`}
                    className="pt-2.5 border-t border-slate-200/60 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
                  >
                    <span>View Solutions & Diagnostic</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. ASSIGNED EBOOKS & STUDY MATERIAL */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3.5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
              <BookOpen className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">Assigned eBooks & Study Material</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Reference handbooks, formula sheets, and modules assigned by your institute.</p>
            </div>
          </div>
          <Link to="/my-ebooks" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
            <span>View All ({assignedEbooks.length})</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {assignedEbooks.length === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500 dark:text-slate-400">
            No study materials assigned yet. Your institution faculty will assign reference handbooks here.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {assignedEbooks.slice(0, 3).map((b) => (
              <div
                key={b.id}
                className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
                      {b.subject || 'General'}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{b.class_level || 'Class 11 & 12'}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{b.title}</h3>
                  {b.author && <p className="text-[11px] text-slate-500 dark:text-slate-400">Author: {b.author}</p>}
                </div>

                <a
                  href={b.pdf_url?.startsWith('http') ? b.pdf_url : `http://127.0.0.1:5000${b.pdf_url?.startsWith('/') ? '' : '/'}${b.pdf_url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-between"
                >
                  <span>Open PDF Handbook</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CleanStatCard({ label, value, subtitle, icon: IconComp, color, bg }) {
  return (
    <div className="p-4 rounded-2xl bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 space-y-2 shadow-xs">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">{label}</span>
        <span className={`p-1.5 rounded-lg border ${bg}`}>
          <IconComp className={`h-3.5 w-3.5 ${color}`} />
        </span>
      </div>
      <div>
        <h3 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">{value}</h3>
        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>
      </div>
    </div>
  );
}
