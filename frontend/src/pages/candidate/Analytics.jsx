import { useEffect, useState, useMemo } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader } from '../../components/ui.jsx';
import {
  TrendingUp,
  Target,
  Clock,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Award,
  BarChart2,
  PieChart,
  Zap,
  Brain,
  Filter,
  Layers
} from 'lucide-react';

export default function Analytics() {
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [hoveredScoreTrend, setHoveredScoreTrend] = useState(null);
  const [hoveredAccuracyTrend, setHoveredAccuracyTrend] = useState(null);
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('ALL');

  const load = async () => {
    setState('loading');
    try {
      const res = await studentService.analytics();
      setData(res);
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => { load(); }, []);

  const {
    summary = {},
    attempts = [],
    trend = [],
    subject_breakdown = [],
    chapter_breakdown = [],
    time_management = {}
  } = data || {};

  // Overall Accuracy calculation
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

  // Format seconds to human readable string
  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0s';
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins > 0) return `${mins}m ${s}s`;
    return `${s}s`;
  };

  // Weak & Strong Chapters classification
  const chapters = useMemo(() => {
    const list = chapter_breakdown || [];
    return {
      weak: [...list].filter(c => c.accuracy < 60).sort((a, b) => a.accuracy - b.accuracy),
      strong: [...list].filter(c => c.accuracy >= 60).sort((a, b) => b.accuracy - a.accuracy),
      all: list,
    };
  }, [chapter_breakdown]);

  // Unique Subjects for Chapter filtering
  const availableSubjects = useMemo(() => {
    const set = new Set();
    (chapter_breakdown || []).forEach(c => {
      if (c.subject) set.add(c.subject);
    });
    return Array.from(set);
  }, [chapter_breakdown]);

  // Filtered Chapters based on dropdown
  const filteredChapters = useMemo(() => {
    if (selectedSubjectFilter === 'ALL') return chapter_breakdown || [];
    return (chapter_breakdown || []).filter(c => c.subject === selectedSubjectFilter);
  }, [chapter_breakdown, selectedSubjectFilter]);

  // Score Improvement Summary calculation
  const scoreImprovementSummary = useMemo(() => {
    if (!trend || trend.length < 2) return 'Complete more tests to visualize your score trend over time!';
    const latest = trend[trend.length - 1].percentage;
    const first = trend[0].percentage;
    const diff = Math.round((latest - first) * 10) / 10;
    if (diff > 0) {
      return `🎉 Score Growth: Your test score improved by +${diff}% from your first test (${first}%) to your latest test (${latest}%).`;
    } else if (diff < 0) {
      return `📉 Focus Required: Your score dropped by ${Math.abs(diff)}% recently. Focus on revising weak chapters below.`;
    } else {
      return '📊 Steady Performance: Your scores have stayed consistent across recent tests.';
    }
  }, [trend]);

  if (state === 'loading') return <LoadingScreen label="Loading complete performance report…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  // Progress Ring calculation
  const ringCircumference = 2 * Math.PI * 20; // r=20 => 125.6
  const ringOffset = ringCircumference - (ringCircumference * Math.min(100, Math.max(0, avgAccuracy))) / 100;

  return (
    <div className="space-y-10 pb-16">
      <PageHeader
        title="Performance Analytics"
        subtitle="Comprehensive analysis of your exam metrics, subject mastery, chapter accuracy, score trend, and time management."
      />

      {/* ------------------------------------------------------------- */}
      {/* 1. OVERVIEW METRICS SCORECARDS GRID                           */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Total Tests */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl flex flex-col justify-between hover:border-blue-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Tests Taken</p>
            <span className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <BarChart2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-blue-400 tabular-nums">{summary.tests_taken || 0}</p>
            <p className="mt-1 text-xs text-slate-400">submitted mock attempts</p>
          </div>
        </div>

        {/* Average Score */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl flex flex-col justify-between hover:border-cyan-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Score</p>
            <span className="p-2 rounded-xl bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              <TrendingUp className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-cyan-300 tabular-nums">{summary.avg_score || 0}%</p>
            <p className="mt-1 text-xs text-slate-400">best score: {summary.best_score || 0}%</p>
          </div>
        </div>

        {/* Overall Accuracy Ring */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl flex items-center justify-between gap-3 hover:border-emerald-500/40 transition-colors">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Overall Accuracy</p>
            <p className="mt-2 text-3xl font-black text-emerald-400 tabular-nums">{avgAccuracy}%</p>
            <p className="mt-1 text-xs text-slate-400">correct / attempted</p>
          </div>
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" className="stroke-slate-800" strokeWidth="4" fill="none" />
              <circle
                cx="24"
                cy="24"
                r="20"
                className="stroke-emerald-400 transition-all duration-700 ease-out"
                strokeWidth="4"
                fill="none"
                strokeDasharray={ringCircumference}
                strokeDashoffset={ringOffset}
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute text-[10px] font-extrabold text-emerald-300">{avgAccuracy}%</span>
          </div>
        </div>

        {/* Average Speed */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl flex flex-col justify-between hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Average Speed</p>
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-300 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-3">
            <p className="text-3xl font-black text-amber-300 tabular-nums">
              {time_management.avg_seconds_per_question ? `${time_management.avg_seconds_per_question}s` : '—'}
            </p>
            <p className="mt-1 text-xs text-slate-400">{time_management.speed_rating || 'time per question'}</p>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DYNAMIC TREND GRAPHS (SCORE & ACCURACY)                    */}
      {/* ------------------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Score Improvement Graph */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-4 relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Score Improvement Graph</h2>
            </div>
            <span className="text-[10px] font-bold text-cyan-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-500/30">
              Score % Trend
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{scoreImprovementSummary}</p>

          {trend.length > 0 ? (
            <div className="mt-6 flex items-end gap-3 overflow-x-auto border-b border-slate-800 pb-4 pt-2 min-h-[160px]">
              {trend.map((t, i) => (
                <div
                  key={i}
                  className="group relative flex min-w-[56px] flex-col items-center gap-1.5 cursor-pointer"
                  onMouseEnter={() => setHoveredScoreTrend(t)}
                  onMouseLeave={() => setHoveredScoreTrend(null)}
                >
                  {/* Floating Hover Tooltip */}
                  {hoveredScoreTrend === t && (
                    <div className="absolute -top-14 z-30 rounded-xl border border-slate-700 bg-[#070c18] px-3 py-1.5 text-center shadow-2xl backdrop-blur-md pointer-events-none min-w-[110px]">
                      <p className="text-[10px] font-bold text-slate-300 truncate max-w-[130px]">{t.title}</p>
                      <p className="text-xs font-black text-[#60a5fa]">{t.percentage}% Score</p>
                    </div>
                  )}

                  <span className="text-xs font-extrabold text-[#60a5fa] group-hover:scale-110 transition-transform">{t.percentage}%</span>
                  <div
                    className="w-10 bg-gradient-to-t from-[#1d4ed8] to-[#2563eb] hover:brightness-125 transition-all duration-200 rounded-t-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40"
                    style={{ height: `${Math.max(24, t.percentage * 1.5)}px` }}
                  />
                  <span className="text-[10px] font-semibold text-slate-400 mt-1 text-center truncate w-14">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-slate-500">No score trend data recorded yet.</div>
          )}
        </div>

        {/* Accuracy Trend Graph */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-4 relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Accuracy Trend Graph</h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Target: &ge;75% Accuracy
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">Percentage of correct answers vs total attempted questions per test.</p>

          {trend.length > 0 ? (
            <div className="mt-6 flex items-end gap-3 overflow-x-auto border-b border-slate-800 pb-4 pt-2 min-h-[160px]">
              {trend.map((t, i) => (
                <div
                  key={i}
                  className="group relative flex min-w-[56px] flex-col items-center gap-1.5 cursor-pointer"
                  onMouseEnter={() => setHoveredAccuracyTrend(t)}
                  onMouseLeave={() => setHoveredAccuracyTrend(null)}
                >
                  {/* Floating Hover Tooltip */}
                  {hoveredAccuracyTrend === t && (
                    <div className="absolute -top-14 z-30 rounded-xl border border-slate-700 bg-[#070c18] px-3 py-1.5 text-center shadow-2xl backdrop-blur-md pointer-events-none min-w-[110px]">
                      <p className="text-[10px] font-bold text-slate-300 truncate max-w-[130px]">{t.title}</p>
                      <p className="text-xs font-black text-emerald-400">{t.accuracy}% Accuracy ({t.correct_count || 0}C / {t.wrong_count || 0}W)</p>
                    </div>
                  )}

                  <span className="text-xs font-extrabold text-emerald-400 group-hover:scale-110 transition-transform">{t.accuracy}%</span>
                  <div
                    className="w-10 bg-gradient-to-t from-emerald-600 to-emerald-400 hover:brightness-125 transition-all duration-200 rounded-t-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40"
                    style={{ height: `${Math.max(24, t.accuracy * 1.5)}px` }}
                  />
                  <span className="text-[10px] font-semibold text-slate-400 mt-1 text-center truncate w-14">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-slate-500">No accuracy trend data recorded yet.</div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. SUBJECT-WISE PERFORMANCE                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <div>
              <h2 className="text-base font-extrabold text-white">Subject-wise Performance</h2>
              <p className="text-xs text-slate-400">Breakdown of accuracy, correct, wrong, and unattempted metrics by subject area.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 px-3 py-1 rounded-full border border-indigo-500/30">
            {subject_breakdown.length} Subjects Analyzed
          </span>
        </div>

        {subject_breakdown.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {subject_breakdown.map((sb, idx) => {
              const acc = sb.accuracy || 0;
              const isHigh = acc >= 70;
              const isMed = acc >= 50 && acc < 70;
              const badgeBg = isHigh
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                : isMed
                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                : 'bg-red-500/10 text-red-400 border-red-500/30';

              const correctPct = sb.total > 0 ? (sb.correct / sb.total) * 100 : 0;
              const wrongPct = sb.total > 0 ? (sb.wrong / sb.total) * 100 : 0;
              const unattPct = sb.total > 0 ? (sb.unattempted / sb.total) * 100 : 0;

              return (
                <div key={idx} className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 space-y-3 hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-100">{sb.subject}</h3>
                      <p className="text-[11px] text-slate-400">{sb.total} Total Questions</p>
                    </div>
                    <span className={`text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border ${badgeBg}`}>
                      {acc}% Acc
                    </span>
                  </div>

                  {/* Multi-segmented Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${correctPct}%` }} title={`Correct: ${sb.correct}`} />
                      <div className="bg-red-500 transition-all duration-500" style={{ width: `${wrongPct}%` }} title={`Wrong: ${sb.wrong}`} />
                      <div className="bg-slate-700 transition-all duration-500" style={{ width: `${unattPct}%` }} title={`Unattempted: ${sb.unattempted}`} />
                    </div>
                  </div>

                  {/* Metric Counts Pills */}
                  <div className="grid grid-cols-3 gap-1.5 pt-1 text-center text-[10px]">
                    <div className="rounded-xl bg-emerald-950/40 border border-emerald-800/40 p-1.5">
                      <span className="block font-black text-emerald-400 text-xs">{sb.correct}</span>
                      <span className="text-emerald-300/70 uppercase">Correct</span>
                    </div>
                    <div className="rounded-xl bg-red-950/40 border border-red-800/40 p-1.5">
                      <span className="block font-black text-red-400 text-xs">{sb.wrong}</span>
                      <span className="text-red-300/70 uppercase">Wrong</span>
                    </div>
                    <div className="rounded-xl bg-slate-900 border border-slate-800 p-1.5">
                      <span className="block font-black text-slate-300 text-xs">{sb.unattempted}</span>
                      <span className="text-slate-400 uppercase">Skip</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-500">No subject performance data recorded yet.</div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. CHAPTER-WISE PERFORMANCE TABLE & FILTER                    */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Layers className="w-5 h-5 text-cyan-400" />
            <div>
              <h2 className="text-base font-extrabold text-white">Chapter-wise Performance</h2>
              <p className="text-xs text-slate-400">Filter chapter level accuracy and pinpoint target revision modules.</p>
            </div>
          </div>

          {/* Subject Filter Dropdown */}
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedSubjectFilter}
              onChange={(e) => setSelectedSubjectFilter(e.target.value)}
              className="rounded-xl border border-slate-700 bg-[#070c18] px-3 py-1.5 text-xs text-slate-200 focus:border-cyan-500 focus:outline-none"
            >
              <option value="ALL">All Subjects ({availableSubjects.length})</option>
              {availableSubjects.map((sub, i) => (
                <option key={i} value={sub}>{sub}</option>
              ))}
            </select>
          </div>
        </div>

        {filteredChapters.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-3 pl-2">Chapter</th>
                  <th className="pb-3">Subject</th>
                  <th className="pb-3 text-center">Tested</th>
                  <th className="pb-3 text-center">Correct / Wrong</th>
                  <th className="pb-3 w-48">Accuracy</th>
                  <th className="pb-3 text-right pr-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredChapters.map((ch, idx) => {
                  const acc = ch.accuracy || 0;
                  const isWeak = acc < 60;
                  return (
                    <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 pl-2 font-bold text-slate-100">{ch.chapter}</td>
                      <td className="py-3 text-slate-400">{ch.subject}</td>
                      <td className="py-3 text-center font-bold text-slate-300">{ch.total}</td>
                      <td className="py-3 text-center font-semibold">
                        <span className="text-emerald-400">{ch.correct}</span>
                        <span className="text-slate-500 mx-1">/</span>
                        <span className="text-red-400">{ch.wrong}</span>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${isWeak ? 'bg-red-500' : 'bg-emerald-400'}`}
                              style={{ width: `${acc}%` }}
                            />
                          </div>
                          <span className={`text-[11px] font-bold tabular-nums w-9 text-right ${isWeak ? 'text-red-400' : 'text-emerald-400'}`}>
                            {acc}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-right pr-2">
                        <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          isWeak
                            ? 'bg-red-500/10 text-red-400 border-red-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        }`}>
                          {isWeak ? <AlertTriangle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                          {isWeak ? 'Needs Revision' : 'Mastered'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-500">No chapters found for selected filter.</div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. WEAK & STRONG CHAPTERS SIDE-BY-SIDE                        */}
      {/* ------------------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weak Chapters (<60% Accuracy) */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl border-t-4 border-t-red-500 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <h2 className="text-sm font-extrabold text-red-400 uppercase tracking-wide">Weak Chapters (&lt;60% Accuracy)</h2>
            </div>
            <span className="text-[10px] font-bold text-red-300 bg-red-500/20 px-2 py-0.5 rounded-full border border-red-500/30">
              {chapters.weak.length} Priority
            </span>
          </div>
          <p className="text-xs text-slate-400">Chapters requiring immediate revision and formula review.</p>

          {chapters.weak.length > 0 ? (
            <div className="space-y-3.5 mt-2">
              {chapters.weak.slice(0, 6).map((c, idx) => (
                <div key={idx} className="space-y-1.5 p-3 rounded-2xl bg-[#070c18] border border-slate-800/80">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{c.chapter} <span className="text-slate-400">({c.subject})</span></span>
                    <span className="text-red-400 font-bold">{c.accuracy}% Accuracy</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full rounded-full" style={{ width: `${c.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl text-emerald-400 border border-emerald-500/30 mb-2">
                🎉
              </span>
              <p className="text-xs font-bold text-white">No Weak Chapters Identified</p>
              <p className="mt-1 text-[11px] text-slate-400">Great job! All attempted chapters are above 60% accuracy threshold.</p>
            </div>
          )}
        </div>

        {/* Strong Chapters (>=60% Accuracy) */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl border-t-4 border-t-emerald-500 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <h2 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wide">Strong Chapters (&ge;60% Accuracy)</h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-500/30">
              {chapters.strong.length} Mastered
            </span>
          </div>
          <p className="text-xs text-slate-400">Your top performing concept areas with high accuracy.</p>

          {chapters.strong.length > 0 ? (
            <div className="space-y-3.5 mt-2">
              {chapters.strong.slice(0, 6).map((c, idx) => (
                <div key={idx} className="space-y-1.5 p-3 rounded-2xl bg-[#070c18] border border-slate-800/80">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{c.chapter} <span className="text-slate-400">({c.subject})</span></span>
                    <span className="text-emerald-400 font-bold">{c.accuracy}% Accuracy</span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${c.accuracy}%` }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-2xl text-emerald-400 border border-emerald-500/30 mb-2">
                🏆
              </span>
              <p className="text-xs font-bold text-white">Strong Chapters Locked</p>
              <p className="mt-1 max-w-xs text-[11px] text-slate-400 leading-relaxed">
                Complete more CBT diagnostic mock tests with &ge;60% accuracy to unlock your strong chapters analysis.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 6. TIME MANAGEMENT ANALYSIS                                   */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-extrabold text-white">Time Management Analysis</h2>
              <p className="text-xs text-slate-400">Evaluation of exam completion speed, average question pace, and time allocation efficiency.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
            {time_management.speed_rating || 'Pace Evaluated'}
          </span>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Total Exam Time</p>
              <p className="text-2xl font-black text-amber-400 mt-1">{formatTime(time_management.total_time_seconds)}</p>
            </div>
            <Zap className="w-8 h-8 text-amber-500/30" />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Avg Time / Question</p>
              <p className="text-2xl font-black text-amber-300 mt-1">
                {time_management.avg_seconds_per_question ? `${time_management.avg_seconds_per_question} seconds` : '—'}
              </p>
            </div>
            <Clock className="w-8 h-8 text-amber-500/30" />
          </div>

          <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-slate-400 uppercase">Avg Time / Test</p>
              <p className="text-2xl font-black text-cyan-300 mt-1">{formatTime(time_management.avg_seconds_per_test)}</p>
            </div>
            <Brain className="w-8 h-8 text-cyan-500/30" />
          </div>
        </div>

        {/* Test-by-Test Time Breakdown */}
        {time_management.test_breakdown && time_management.test_breakdown.length > 0 && (
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wide">Test-by-Test Pace Breakdown</h3>
            <div className="space-y-2">
              {time_management.test_breakdown.slice(0, 5).map((tb, idx) => (
                <div key={idx} className="flex flex-wrap items-center justify-between p-3 rounded-2xl bg-[#070c18] border border-slate-800 text-xs">
                  <div>
                    <p className="font-bold text-slate-200">{tb.title}</p>
                    <p className="text-[11px] text-slate-400">{tb.total_questions} questions &bull; {formatTime(tb.duration_seconds)} total time</p>
                  </div>
                  <div className="text-right mt-1 sm:mt-0">
                    <span className="text-amber-300 font-extrabold text-sm">{tb.seconds_per_question}s</span>
                    <span className="text-slate-500 text-[10px] block">avg time / question</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NTA CBT Time Strategy Tip */}
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 flex items-start gap-3 text-xs text-amber-200">
          <Brain className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-300 mb-0.5">Recommended NTA Exam Time Allocation Strategy</p>
            <p className="text-amber-200/80 leading-relaxed">
              Aim for ~50 seconds on single choice MCQs, ~90 seconds on multi-select/assertion-reason, and 2 minutes on numerical problems.
              Reserve the final 15 minutes to review marked-for-review questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

