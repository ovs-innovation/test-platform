import { useEffect, useState, useMemo } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader } from '../../components/ui.jsx';

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
      return `🎉 Great progress! Your score has improved by ${diff}% since your first test.`;
    } else if (diff < 0) {
      return `📉 Focus warning: Your average score dropped by ${Math.abs(diff)}% recently. Study weak chapters!`;
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
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Performance Analytics"
        subtitle="Detailed analysis of your scores, subject strengths, chapter metrics, and time management."
      />

      {/* Summary Scorecards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {/* Card 1 */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Total Tests Taken</p>
            <p className="mt-2 text-3xl font-extrabold text-blue-400 tabular-nums">{summary.tests_taken || 0}</p>
          </div>
          <p className="mt-2 text-xs text-slate-400">submitted attempts</p>
        </div>

        {/* Card 2 */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Average Score</p>
            <p className="mt-2 text-3xl font-extrabold text-cyan-300 tabular-nums">{summary.avg_score || 0}%</p>
          </div>
          <p className="mt-2 text-xs text-slate-400">across all attempts</p>
        </div>

        {/* Card 3: Overall Accuracy with Progress Ring */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl flex items-center justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Overall Accuracy</p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-400 tabular-nums">{avgAccuracy}%</p>
            <p className="mt-1 text-xs text-slate-400">correct / total</p>
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

        {/* Card 4 */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">Average Speed</p>
            <p className="mt-2 text-3xl font-extrabold text-amber-300 tabular-nums">{avgSpeed}</p>
          </div>
          <p className="mt-2 text-xs text-slate-400">time per question</p>
        </div>
      </div>

      {/* Double Column Trend Graph Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Score Improvement Trends */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-4 relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Score Improvement Graph</h2>
            <span className="text-[10px] font-bold text-cyan-300 bg-blue-500/20 px-2.5 py-0.5 rounded-full border border-blue-500/30">
              Interactive Bar Chart
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">{scoreImprovementSummary}</p>
          
          {trend.length > 0 ? (
            <div className="mt-6 flex items-end gap-3 overflow-x-auto border-b border-slate-800 pb-4 pt-2">
              {trend.map((t, i) => (
                <div
                  key={i}
                  className="group relative flex min-w-[56px] flex-col items-center gap-1.5 cursor-pointer"
                  onMouseEnter={() => setHoveredScoreTrend(t)}
                  onMouseLeave={() => setHoveredScoreTrend(null)}
                >
                  {/* Floating Hover Tooltip */}
                  {hoveredScoreTrend === t && (
                    <div className="absolute -top-14 z-30 rounded-xl border border-slate-700 bg-[#070c18] px-3 py-1.5 text-center shadow-2xl backdrop-blur-md pointer-events-none min-w-[100px]">
                      <p className="text-[10px] font-bold text-slate-300 truncate max-w-[120px]">{t.title}</p>
                      <p className="text-xs font-black text-[#60a5fa]">{t.percentage}% Score</p>
                    </div>
                  )}

                  <span className="text-xs font-extrabold text-[#60a5fa] group-hover:scale-110 transition-transform">{t.percentage}%</span>
                  <div
                    className="w-10 bg-gradient-to-t from-[#1d4ed8] to-[#2563eb] hover:brightness-125 transition-all duration-200 rounded-t-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40"
                    style={{ height: `${Math.max(20, t.percentage * 1.6)}px` }}
                  />
                  <span className="text-[10px] font-semibold text-slate-400 mt-1 text-center truncate w-14">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 mt-6 text-center">No score trend data recorded yet.</p>
          )}
        </div>

        {/* Accuracy Trend Graph */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-4 relative">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wide">Accuracy Trend Graph</h2>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              Accuracy Breakdown
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">Percentage of correct answers out of questions attempted per test.</p>
          
          {trend.length > 0 ? (
            <div className="mt-6 flex items-end gap-3 overflow-x-auto border-b border-slate-800 pb-4 pt-2">
              {trend.map((t, i) => (
                <div
                  key={i}
                  className="group relative flex min-w-[56px] flex-col items-center gap-1.5 cursor-pointer"
                  onMouseEnter={() => setHoveredAccuracyTrend(t)}
                  onMouseLeave={() => setHoveredAccuracyTrend(null)}
                >
                  {/* Floating Hover Tooltip */}
                  {hoveredAccuracyTrend === t && (
                    <div className="absolute -top-14 z-30 rounded-xl border border-slate-700 bg-[#070c18] px-3 py-1.5 text-center shadow-2xl backdrop-blur-md pointer-events-none min-w-[100px]">
                      <p className="text-[10px] font-bold text-slate-300 truncate max-w-[120px]">{t.title}</p>
                      <p className="text-xs font-black text-emerald-400">{t.accuracy}% Accuracy</p>
                    </div>
                  )}

                  <span className="text-xs font-extrabold text-emerald-400 group-hover:scale-110 transition-transform">{t.accuracy}%</span>
                  <div
                    className="w-10 bg-gradient-to-t from-emerald-600 to-emerald-400 hover:brightness-125 transition-all duration-200 rounded-t-xl shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40"
                    style={{ height: `${Math.max(20, t.accuracy * 1.6)}px` }}
                  />
                  <span className="text-[10px] font-semibold text-slate-400 mt-1 text-center truncate w-14">
                    {new Date(t.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-400 mt-6 text-center">No accuracy trend data recorded yet.</p>
          )}
        </div>
      </div>

      {/* Weak & Strong Chapters Side-by-Side */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weak Chapters */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl border-t-4 border-t-red-500 space-y-3">
          <h2 className="text-sm font-extrabold text-red-400 uppercase tracking-wide">Weak Chapters (&lt;60% Accuracy)</h2>
          <p className="text-xs text-slate-400">Chapters requiring immediate revision and practice questions.</p>
          {chapters.weak.length > 0 ? (
            <div className="mt-4 space-y-3.5">
              {chapters.weak.map((c, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{c.chapter} <span className="text-slate-400">({c.subject})</span></span>
                    <span className="text-red-400">{c.accuracy}% Accuracy</span>
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
              <p className="mt-1 text-[11px] text-slate-400">Great job! All your attempted chapters are above 60% accuracy.</p>
            </div>
          )}
        </div>

        {/* Strong Chapters */}
        <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl border-t-4 border-t-emerald-500 space-y-3">
          <h2 className="text-sm font-extrabold text-emerald-400 uppercase tracking-wide">Strong Chapters (&ge;60% Accuracy)</h2>
          <p className="text-xs text-slate-400">Your top performing areas with high concept clarity.</p>
          {chapters.strong.length > 0 ? (
            <div className="mt-4 space-y-3.5">
              {chapters.strong.map((c, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-slate-200">{c.chapter} <span className="text-slate-400">({c.subject})</span></span>
                    <span className="text-emerald-400">{c.accuracy}% Accuracy</span>
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
                Complete more CBT diagnostic mock tests with ≥60% accuracy to unlock your strong subject chapters analysis.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
