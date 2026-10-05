import { useState } from 'react';
import {
  Trophy,
  Zap,
  Clock,
  Target,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  CheckCircle2,
  Gauge
} from 'lucide-react';

/**
 * Format raw seconds to human-readable format: "1h 45m", "32m 10s", or "45s"
 */
function formatSeconds(seconds) {
  if (!seconds || isNaN(seconds) || seconds <= 0) return '0s';
  const total = Math.round(Number(seconds));
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s > 0 ? `${s}s` : ''}`.trim();
  return `${s}s`;
}

export default function CompareWithTopper({
  data,
  studentStats = null,
  className = '',
  hasStudentAttempt = true,
  assessmentId = null,
}) {
  const [showSubjectDetails, setShowSubjectDetails] = useState(false);

  // If no data is provided, return null or fallback
  if (!data && !studentStats) {
    return null;
  }

  // Extract or synthesize comparison data
  const comparison = data || {};
  const isTopper = Boolean(comparison.is_topper);

  const topper = comparison.topper || {
    name: isTopper ? 'You' : 'Topper (Rank 1)',
    score: 0,
    max_marks: 300,
    percentage: 0,
    accuracy: 95,
    time_formatted: '—',
    avg_time_per_question_formatted: '—',
    correct_count: 0,
  };

  const student = comparison.student || {
    score: studentStats?.marks_obtained ?? studentStats?.score ?? 0,
    max_marks: topper.max_marks || 300,
    percentage: studentStats?.percentage ?? 0,
    accuracy: studentStats?.accuracy ?? 0,
    time_formatted: formatSeconds(studentStats?.duration_seconds || 0),
    avg_time_per_question_formatted: '—',
    correct_count: studentStats?.correct_count ?? 0,
    rank: studentStats?.rank ?? null,
  };

  const hasAttempt = Boolean(
    hasStudentAttempt !== false &&
    comparison.has_student_attempt !== false &&
    (isTopper || comparison.student?.rank != null || studentStats?.marks_obtained !== undefined || (comparison.student?.score && comparison.student.score > 0))
  );

  const delta = comparison.delta || {
    score_diff: isTopper ? 0 : Number((student.score - topper.score).toFixed(1)),
    accuracy_diff: isTopper ? 0 : Number((student.accuracy - topper.accuracy).toFixed(1)),
    time_diff_formatted: isTopper ? 'Benchmark' : '—',
    speed_summary: isTopper ? 'You set the benchmark speed for this test' : 'Speed pacing comparison',
  };

  const subjectList = Array.isArray(comparison.subject_comparison) ? comparison.subject_comparison : [];

  return (
    <div
      className={`rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-xs overflow-hidden transition-all duration-200 ${className}`}
      id="compare-with-topper-section"
    >
      {/* SECTION HEADER */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 bg-gradient-to-r from-slate-50/80 via-white to-amber-50/30 dark:from-slate-900/60 dark:via-[#0f172a] dark:to-amber-950/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                  Compare with Topper
                </h2>
                {isTopper ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 shadow-2xs">
                    <Sparkles className="w-3 h-3 text-amber-500" />
                    Top Scorer · Rank 1
                  </span>
                ) : hasAttempt ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                    AIR 1 Benchmark
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20">
                    Topper Benchmark
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                {isTopper
                  ? 'Congratulations! You achieved the highest score in this test and set the benchmark performance.'
                  : hasAttempt
                  ? 'Evaluate your score, speed, and accuracy against the top ranker to identify key growth areas.'
                  : 'Review the topper\'s score, speed, and accuracy targets. Attempt this test to see your direct performance comparison!'}
              </p>
            </div>
          </div>

          {/* Quick Legend / Tag */}
          <div className="flex items-center gap-3 text-xs font-semibold self-start sm:self-auto">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500"></span>
              <span className="text-slate-600 dark:text-slate-300">You</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span className="text-slate-600 dark:text-slate-300">{topper.name || 'Topper'}</span>
            </div>
          </div>
        </div>

        {/* Informative banner if student hasn't taken this test */}
        {!hasAttempt && (
          <div className="mt-4 p-3.5 rounded-2xl border border-blue-200/80 dark:border-blue-900/50 bg-blue-50/70 dark:bg-blue-950/40 flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-slate-800 dark:text-slate-200">You haven't attempted this assessment yet. </span>
              <span className="text-slate-500 dark:text-slate-400">
                The benchmark values below represent the Rank 1 performer. Complete this test to unlock your live score, pacing, and subject comparison!
              </span>
            </div>
          </div>
        )}
      </div>

      {/* CORE 3-METRIC COMPARISON GRID */}
      <div className="p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {/* 1. SCORE COMPARISON CARD */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Target className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Score</span>
              </div>
              {isTopper ? (
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Highest Marks
                </span>
              ) : !hasAttempt ? (
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  Benchmark Target
                </span>
              ) : delta.score_diff < 0 ? (
                <span className="inline-flex items-center text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  {Math.abs(delta.score_diff)} pts behind
                </span>
              ) : (
                <span className="inline-flex items-center text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  +{delta.score_diff} pts ahead
                </span>
              )}
            </div>

            {/* Score Numbers Side-by-Side */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Your Score</span>
                {hasAttempt ? (
                  <>
                    <div className="mt-1 flex items-baseline gap-1">
                      <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                        {student.score}
                      </span>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/ {student.max_marks}</span>
                    </div>
                    <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 block mt-0.5">
                      {student.percentage}%
                    </span>
                  </>
                ) : (
                  <>
                    <div className="mt-1">
                      <span className="text-base font-extrabold text-slate-400 dark:text-slate-500 italic">
                        Not Taken
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5">
                      Max: {topper.max_marks} pts
                    </span>
                  </>
                )}
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Topper Score</span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
                    {topper.score}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">/ {topper.max_marks}</span>
                </div>
                <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 block mt-0.5">
                  {topper.percentage}%
                </span>
              </div>
            </div>

            {/* Visual Score Comparison Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <span>Score Ratio</span>
                <span>
                  {hasAttempt
                    ? `${topper.score > 0 ? Math.round((student.score / topper.score) * 100) : 100}% of Topper`
                    : 'Attempt test to view ratio'}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                  style={{ width: `${hasAttempt ? Math.min(100, Math.max(0, (student.score / (student.max_marks || 300)) * 100)) : 0}%` }}
                />
              </div>
            </div>
          </div>

          {/* 2. SPEED & TIME COMPARISON CARD */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Speed & Time</span>
              </div>
              <span className="inline-flex items-center text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20">
                <Gauge className="w-3 h-3 mr-1" />
                {hasAttempt ? delta.time_diff_formatted : 'Target Pace'}
              </span>
            </div>

            {/* Time Metrics Side-by-Side */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Your Time</span>
                {hasAttempt ? (
                  <>
                    <div className="mt-1">
                      <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                        {student.time_formatted || '—'}
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mt-0.5">
                      Avg {student.avg_time_per_question_formatted || '—'}/Q
                    </span>
                  </>
                ) : (
                  <>
                    <div className="mt-1">
                      <span className="text-base font-extrabold text-slate-400 dark:text-slate-500 italic">
                        —
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5">
                      Not Attempted
                    </span>
                  </>
                )}
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Topper Time</span>
                <div className="mt-1">
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
                    {topper.time_formatted || '—'}
                  </span>
                </div>
                <span className="text-[11px] font-medium text-amber-700/80 dark:text-amber-400/80 block mt-0.5">
                  Avg {topper.avg_time_per_question_formatted || '—'}/Q
                </span>
              </div>
            </div>

            {/* Speed Pacing Summary */}
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
              <p className="text-[11px] font-medium text-slate-600 dark:text-slate-300 leading-snug">
                {hasAttempt ? delta.speed_summary : `Topper completed test in ${topper.time_formatted || '—'} (${topper.avg_time_per_question_formatted || '—'}/question pace)`}
              </p>
            </div>
          </div>

          {/* 3. ACCURACY COMPARISON CARD */}
          <div className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <Zap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider">Accuracy</span>
              </div>
              {isTopper ? (
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Peak Accuracy
                </span>
              ) : !hasAttempt ? (
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  Benchmark Accuracy
                </span>
              ) : delta.accuracy_diff < 0 ? (
                <span className="inline-flex items-center text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                  <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  {Math.abs(delta.accuracy_diff)}% gap
                </span>
              ) : (
                <span className="inline-flex items-center text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  +{delta.accuracy_diff}% higher
                </span>
              )}
            </div>

            {/* Accuracy Numbers Side-by-Side */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Your Accuracy</span>
                {hasAttempt ? (
                  <>
                    <div className="mt-1">
                      <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">
                        {student.accuracy}%
                      </span>
                    </div>
                    <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 block mt-0.5">
                      {student.correct_count} Correct
                    </span>
                  </>
                ) : (
                  <>
                    <div className="mt-1">
                      <span className="text-base font-extrabold text-slate-400 dark:text-slate-500 italic">
                        —
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 block mt-0.5">
                      Not Attempted
                    </span>
                  </>
                )}
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block">Topper Accuracy</span>
                <div className="mt-1">
                  <span className="text-2xl font-black text-amber-600 dark:text-amber-400 tabular-nums">
                    {topper.accuracy}%
                  </span>
                </div>
                <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400 block mt-0.5">
                  {topper.correct_count} Correct
                </span>
              </div>
            </div>

            {/* Visual Accuracy Bar */}
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between text-[11px] font-medium text-slate-500 dark:text-slate-400">
                <span>Precision Rate</span>
                <span>{hasAttempt ? `${student.accuracy}% of attempts` : 'Take test to view'}</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
                  style={{ width: `${hasAttempt ? Math.min(100, Math.max(0, student.accuracy)) : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* OPTIONAL SUBJECT-WISE BREAKDOWN TOGGLE */}
        {subjectList.length > 0 && (
          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <button
              type="button"
              onClick={() => setShowSubjectDetails((prev) => !prev)}
              className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60 text-xs font-bold text-slate-700 dark:text-slate-300 transition cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-500" />
                <span>Subject-Wise Comparison Breakdown ({subjectList.length} Subjects)</span>
              </span>
              <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                {showSubjectDetails ? 'Hide details' : 'Show details'}
                {showSubjectDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </span>
            </button>

            {showSubjectDetails && (
              <div className="mt-3 overflow-x-auto rounded-2xl border border-slate-200/80 dark:border-slate-800">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-extrabold border-b border-slate-200 dark:border-slate-700/60">
                      <th className="p-3 pl-4">Subject</th>
                      <th className="p-3 text-center">Your Marks</th>
                      <th className="p-3 text-center">Topper Marks</th>
                      <th className="p-3 text-center">Your Accuracy</th>
                      <th className="p-3 text-center">Topper Accuracy</th>
                      <th className="p-3 pr-4 text-right">Delta</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                    {subjectList.map((sub, idx) => {
                      const diff = sub.score_diff || 0;
                      return (
                        <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                          <td className="p-3 pl-4 font-bold text-slate-900 dark:text-white">
                            {sub.subject}
                          </td>
                          <td className="p-3 text-center font-bold tabular-nums">
                            {hasAttempt ? (
                              <>{sub.student_score} <span className="text-[10px] text-slate-400">/ {sub.max_marks}</span></>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-3 text-center font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                            {sub.topper_score} <span className="text-[10px] text-slate-400">/ {sub.max_marks}</span>
                          </td>
                          <td className="p-3 text-center tabular-nums">
                            {hasAttempt ? (
                              <span className="font-semibold">{sub.student_accuracy}%</span>
                            ) : (
                              <span className="text-slate-400">—</span>
                            )}
                          </td>
                          <td className="p-3 text-center tabular-nums text-amber-600 dark:text-amber-400">
                            <span className="font-semibold">{sub.topper_accuracy}%</span>
                          </td>
                          <td className="p-3 pr-4 text-right tabular-nums">
                            {hasAttempt ? (
                              diff === 0 ? (
                                <span className="text-slate-400 font-medium">On Par</span>
                              ) : diff > 0 ? (
                                <span className="text-emerald-600 dark:text-emerald-400 font-bold">+{diff}</span>
                              ) : (
                                <span className="text-amber-600 dark:text-amber-400 font-bold">{diff}</span>
                              )
                            ) : (
                              <span className="text-slate-400 font-medium">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
