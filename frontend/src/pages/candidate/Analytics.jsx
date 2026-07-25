import { useEffect, useState, useMemo } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader } from '../../components/ui.jsx';
import {
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  Award,
  AlertTriangle,
  Sparkles,
  Zap,
  BarChart2,
  BookOpen
} from 'lucide-react';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [hoveredScoreTrend, setHoveredScoreTrend] = useState(null);
  const [hoveredAccuracyTrend, setHoveredAccuracyTrend] = useState(null);

  const load = async () => {
    setState('loading');
    try {
      setData(await studentService.analytics());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  const { summary = {}, attempts = [], trend = [], chapter_breakdown = [] } = data || {};

  const avgAccuracy = useMemo(() => {
    if (!attempts || attempts.length === 0) return 0;
    let totalCorrect = 0;
    let totalWrong = 0;
    for (const a of attempts) {
      totalCorrect += Number(a.correct_count) || 0;
      totalWrong += Number(a.wrong_count) || 0;
    }
    const attempted = totalCorrect + totalWrong;
    return attempted > 0 ? Math.round((totalCorrect / attempted) * 100) : 0;
  }, [attempts]);

  const avgSpeed = useMemo(() => {
    if (!attempts || attempts.length === 0) return '—';
    let totalSecs = 0;
    let totalQ = 0;
    for (const a of attempts) {
      totalSecs += Number(a.duration_seconds) || 0;
      totalQ += Number(a.total_questions) || 0;
    }
    if (totalQ === 0) return '—';
    const secPerQ = Math.round(totalSecs / totalQ);
    return `${secPerQ}s / q`;
  }, [attempts]);

  const chapters = useMemo(() => {
    const list = chapter_breakdown || [];
    return {
      weak: [...list].filter(c => c.accuracy < 60).sort((a, b) => a.accuracy - b.accuracy).slice(0, 5),
      strong: [...list].filter(c => c.accuracy >= 60).sort((a, b) => b.accuracy - a.accuracy).slice(0, 5),
    };
  }, [chapter_breakdown]);

  const scoreImprovementSummary = useMemo(() => {
    if (!trend || trend.length < 2) return 'Complete more tests to visualize your score trend!';
    const latest = trend[trend.length - 1].percentage;
    const first = trend[0].percentage;
    const diff = latest - first;
    if (diff > 0) {
      return `🎉 Great progress! Your score has improved by +${diff}% since your first test.`;
    } else if (diff < 0) {
      return `📉 Focus warning: Your average score dropped by ${Math.abs(diff)}% recently. Revise weak topics!`;
    } else {
      return '📊 Consistent Performance: Your scores have stayed steady across recent tests.';
    }
  }, [trend]);

  if (state === 'loading') return <LoadingScreen label="Loading performance report…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  // Progress Ring calculation
  const ringCircumference = 2 * Math.PI * 20; // r=20 => 125.6
  const ringOffset = ringCircumference - (ringCircumference * Math.min(100, Math.max(0, avgAccuracy))) / 100;

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12">
      <PageHeader
        title="Performance Analytics"
        subtitle="Detailed analysis of your scores, subject strengths, chapter metrics, and time management."
      />

      {/* 1. SAAS METRIC SCORECARDS */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {/* Card 1 */}
        <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Tests Taken</p>
            <p className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400 tabular-nums">{summary.tests_taken || 0}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">submitted attempts</p>
          </div>
          <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <BookOpen className="h-5 w-5" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Score</p>
            <p className="mt-1 text-2xl font-black text-cyan-600 dark:text-cyan-400 tabular-nums">{summary.avg_score || 0}%</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">across all attempts</p>
          </div>
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
            <TrendingUp className="h-5 w-5" />
          </div>
        </div>

        {/* Card 3: Overall Accuracy with Ring */}
        <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Overall Accuracy</p>
            <p className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400 tabular-nums">{avgAccuracy}%</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">correct / attempted</p>
          </div>
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="4" fill="none" />
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-emerald-500 transition-all duration-700 ease-out"
                strokeWidth="4"
                fill="none"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">{avgAccuracy}%</span>
          </div>
        </div>

        {/* Card 4 */}
        <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl flex items-center justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Average Speed</p>
            <p className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400 tabular-nums">{avgSpeed}</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">time per question</p>
          </div>
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Clock className="h-5 w-5" />
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE TREND GRAPHS */}
      <div className="grid gap-3 lg:grid-cols-2">
        {/* Score Improvement Trends */}
        <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3 relative">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Score Improvement Trajectory</h3>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
              Interactive Bar Chart
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{scoreImprovementSummary}</p>
          
          {trend.length > 0 ? (
            <div className="mt-4 flex items-end gap-2.5 overflow-x-auto border-b border-slate-100 dark:border-slate-800/60 pb-3 pt-2">
              {trend.map((t, i) => (
                <div
                  key={i}
                  className="group relative flex min-w-[50px] flex-col items-center gap-1 cursor-pointer"
                  onMouseEnter={() => setHoveredScoreTrend(t)}
                  onMouseLeave={() => setHoveredScoreTrend(null)}
                >
                  {hoveredScoreTrend === t && (
                    <div className="absolute -top-12 z-30 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-center shadow-xl backdrop-blur-md pointer-events-none min-w-[90px]">
                      <p className="text-[9.5px] font-bold text-slate-300 truncate max-w-[110px]">{t.title}</p>
                      <p className="text-xs font-black text-blue-400">{t.percentage}% Score</p>
                    </div>
                  )}

                  <span className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">{t.percentage}%</span>
                  <div
                    className="w-8 bg-gradient-to-t from-blue-600 to-blue-400 hover:brightness-125 transition-all duration-200 rounded-t-lg shadow-sm"
                    style={{ height: `${Math.max(16, t.percentage * 1.4)}px` }}
                  />
                  <span className="text-[9.5px] font-medium text-slate-400 mt-1 text-center truncate w-12">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 mt-4 text-center">No score trend data recorded yet.</p>
          )}
        </div>

        {/* Accuracy Trend Graph */}
        <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3 relative">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Accuracy Breakdown</h3>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              Accuracy Trend
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Percentage of correct answers out of total questions attempted.</p>
          
          {trend.length > 0 ? (
            <div className="mt-4 flex items-end gap-2.5 overflow-x-auto border-b border-slate-100 dark:border-slate-800/60 pb-3 pt-2">
              {trend.map((t, i) => (
                <div
                  key={i}
                  className="group relative flex min-w-[50px] flex-col items-center gap-1 cursor-pointer"
                  onMouseEnter={() => setHoveredAccuracyTrend(t)}
                  onMouseLeave={() => setHoveredAccuracyTrend(null)}
                >
                  {hoveredAccuracyTrend === t && (
                    <div className="absolute -top-12 z-30 rounded-lg border border-slate-700 bg-slate-900 px-2.5 py-1 text-center shadow-xl backdrop-blur-md pointer-events-none min-w-[90px]">
                      <p className="text-[9.5px] font-bold text-slate-300 truncate max-w-[110px]">{t.title}</p>
                      <p className="text-xs font-black text-emerald-400">{t.accuracy}% Accuracy</p>
                    </div>
                  )}

                  <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">{t.accuracy}%</span>
                  <div
                    className="w-8 bg-gradient-to-t from-emerald-600 to-emerald-400 hover:brightness-125 transition-all duration-200 rounded-t-lg shadow-sm"
                    style={{ height: `${Math.max(16, t.accuracy * 1.4)}px` }}
                  />
                  <span className="text-[9.5px] font-medium text-slate-400 mt-1 text-center truncate w-12">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 mt-4 text-center">No accuracy trend data recorded yet.</p>
          )}
        </div>
      </div>

      {/* 3. WEAK & STRONG CHAPTER BREAKDOWN */}
      <div className="grid gap-3 lg:grid-cols-2">
        {/* Weak Chapters */}
        <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
              <AlertTriangle className="h-4 w-4" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Weak Chapters (&lt;60% Accuracy)</h3>
            </div>
            <span className="text-[10px] font-bold text-rose-600 bg-rose-500/10 px-2 py-0.5 rounded">Action Needed</span>
          </div>
          
          {chapters.weak.length > 0 ? (
            <div className="space-y-2.5">
              {chapters.weak.map((c, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">{c.chapter} <span className="text-slate-400 font-normal">({c.subject})</span></span>
                    <span className="text-rose-600 dark:text-rose-400 font-bold">{c.accuracy}% Accuracy</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-rose-500 h-full rounded-full" style={{ width: `${c.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <Sparkles className="h-8 w-8 text-emerald-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">No Weak Chapters Identified</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">All attempted chapters are above 60% accuracy!</p>
            </div>
          )}
        </div>

        {/* Strong Chapters */}
        <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2">
            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <Award className="h-4 w-4" />
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">Strong Chapters (&ge;60% Accuracy)</h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Mastered</span>
          </div>

          {chapters.strong.length > 0 ? (
            <div className="space-y-2.5">
              {chapters.strong.map((c, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-800 dark:text-slate-200">{c.chapter} <span className="text-slate-400 font-normal">({c.subject})</span></span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">{c.accuracy}% Accuracy</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${c.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-6 text-center">
              <Award className="h-8 w-8 text-blue-500 mx-auto mb-1" />
              <p className="text-xs font-bold text-slate-900 dark:text-white">Strong Chapters Locked</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Complete more mock tests with ≥60% accuracy to unlock analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
