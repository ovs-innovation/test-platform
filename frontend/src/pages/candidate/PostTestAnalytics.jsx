import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState } from '../../components/ui.jsx';
import {
  Trophy,
  Award,
  BarChart2,
  Clock,
  BookOpen,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Zap,
  Brain,
  Layers,
  Sparkles,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Download,
  Calendar,
  Compass
} from 'lucide-react';

export default function PostTestAnalytics() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [questionFilter, setQuestionFilter] = useState('ALL'); // ALL | WRONG | CORRECT | UNATTEMPTED

  const loadAnalytics = async () => {
    if (!testId) return;
    setState('loading');
    try {
      const res = await studentService.postTestAnalytics(testId);
      setData(res);
      setState('done');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Failed to load post-test analytics:', err);
      setState('error');
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, [testId]);

  if (state === 'loading') {
    return <LoadingScreen label="Processing All India Ranks & generating your performance report..." />;
  }

  if (state === 'error' || !data) {
    return <ErrorState onRetry={loadAnalytics} message="Unable to load post-test analytics for this exam." />;
  }

  const {
    test_info = {},
    summary = {},
    subject_analysis = [],
    chapter_performance = [],
    accuracy_report = {},
    time_management_report = {},
    question_wise_analysis = [],
    strong_and_weak_topics = {},
    personalized_improvement_plan = [],
    recommended_ebooks = [],
    revision_strategy = {}
  } = data;

  const formatTime = (secs) => {
    if (!secs || isNaN(secs)) return '0s';
    const hrs = Math.floor(secs / 3600);
    const mins = Math.floor((secs % 3600) / 60);
    const s = Math.round(secs % 60);
    if (hrs > 0) return `${hrs}h ${mins}m`;
    if (mins > 0) return `${mins}m ${s}s`;
    return `${s}s`;
  };

  // Filter questions based on tabs
  const filteredQuestions = (question_wise_analysis || []).filter(q => {
    if (questionFilter === 'CORRECT') return q.is_attempted && q.is_correct;
    if (questionFilter === 'WRONG') return q.is_attempted && !q.is_correct;
    if (questionFilter === 'UNATTEMPTED') return !q.is_attempted;
    return true;
  });

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Navigation Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Test Dashboard
        </button>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-extrabold border border-blue-500/20">
            {test_info.test_type || 'AIETS'} Published Result
          </span>
          <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {test_info.test_date ? new Date(test_info.test_date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Recent Exam'}
          </span>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none translate-x-10 -translate-y-10">
          <Trophy className="w-96 h-96" />
        </div>

        <div className="relative z-10 space-y-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">{test_info.test_name || 'AIETS NEET National Mock Test'}</h1>
            <p className="mt-1 text-xs sm:text-sm text-blue-200 font-medium">Detailed Diagnostic Performance Report & National AIR Benchmarking</p>
          </div>

          {/* Top 4 Summary Metric Cards Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 pt-2">
            {/* AIR Card */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 space-y-1">
              <div className="flex items-center justify-between text-blue-200">
                <span className="text-[11px] font-bold uppercase tracking-wider">All India Rank</span>
                <Trophy className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-amber-300 tabular-nums">#{summary.all_india_rank || 1}</p>
              <p className="text-[10px] text-blue-200/80 font-medium">Out of {summary.total_participants || 1} students</p>
            </div>

            {/* Percentile Card */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 space-y-1">
              <div className="flex items-center justify-between text-blue-200">
                <span className="text-[11px] font-bold uppercase tracking-wider">Percentile</span>
                <Award className="w-4 h-4 text-cyan-300" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-cyan-200 tabular-nums">{summary.percentile}%</p>
              <p className="text-[10px] text-blue-200/80 font-medium">National Standing</p>
            </div>

            {/* Overall Score */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 space-y-1">
              <div className="flex items-center justify-between text-blue-200">
                <span className="text-[11px] font-bold uppercase tracking-wider">Total Score</span>
                <BarChart2 className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-emerald-300 tabular-nums">
                {summary.total_score} <span className="text-xs text-blue-200 font-normal">/ {summary.max_marks}</span>
              </p>
              <p className="text-[10px] text-blue-200/80 font-medium">{summary.percentage}% Marks Scored</p>
            </div>

            {/* Accuracy */}
            <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 space-y-1">
              <div className="flex items-center justify-between text-blue-200">
                <span className="text-[11px] font-bold uppercase tracking-wider">Accuracy Rate</span>
                <Sparkles className="w-4 h-4 text-purple-300" />
              </div>
              <p className="text-2xl sm:text-3xl font-black text-purple-200 tabular-nums">{summary.overall_accuracy}%</p>
              <p className="text-[10px] text-blue-200/80 font-medium">{summary.correct_count}C / {summary.incorrect_count}W / {summary.unattempted_count}S</p>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 1: NEET SUBJECT ANALYSIS (Physics, Chem, Botany, Zoology) */}
      {/* ----------------------------------------------------------------- */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-black text-slate-900 dark:text-white">NEET Subject Performance (Physics, Chemistry, Botany, Zoology)</h2>
          </div>
          <span className="text-xs text-slate-500 font-medium">4 Core Subjects Analyzed</span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {subject_analysis.map((sa, idx) => {
            const acc = sa.accuracy_percent || 0;
            const diff = sa.comparison_to_average?.difference || 0;
            const isAboveAvg = diff >= 0;

            return (
              <div key={idx} className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-5 shadow-xs flex flex-col justify-between space-y-4 hover:border-indigo-500/40 transition-all">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
                    <span className="text-sm font-extrabold text-slate-900 dark:text-white">{sa.subject}</span>
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/20">
                      {acc}% Acc
                    </span>
                  </div>

                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between items-baseline">
                      <span className="text-2xl font-black text-slate-900 dark:text-white tabular-nums">{sa.score}</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">/ {sa.max_marks} marks</span>
                    </div>

                    {/* Class Avg Comparative Badge */}
                    <div className={`mt-2 inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-md border ${
                      isAboveAvg 
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                        : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20'
                    }`}>
                      <span>{isAboveAvg ? `+${diff}` : diff} vs Avg ({sa.comparison_to_average?.class_average_score})</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  {/* Detailed Q counts */}
                  <div className="grid grid-cols-3 gap-1 text-center text-[10px] font-semibold">
                    <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 p-1 rounded-lg">
                      <span className="block font-black">{sa.correct_count}</span> Correct
                    </div>
                    <div className="bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 p-1 rounded-lg">
                      <span className="block font-black">{sa.incorrect_count}</span> Wrong
                    </div>
                    <div className="bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 p-1 rounded-lg">
                      <span className="block font-black">{sa.unattempted_count}</span> Skip
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-amber-500" /> Time spent:</span>
                    <span className="font-bold text-slate-700 dark:text-slate-300">{formatTime(sa.time_spent_seconds)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 2: PERFORMANCE CHARTS & ACCURACY BREAKDOWN               */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Difficulty Level Breakdown */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide">Accuracy by Difficulty Level</h2>
            </div>
            <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded-full">Difficulty Breakdown</span>
          </div>

          <div className="space-y-4 pt-2">
            {(accuracy_report.difficulty_accuracy || []).map((da, i) => (
              <div key={i} className="space-y-1.5 p-3 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/70 dark:border-slate-800">
                <div className="flex justify-between text-xs font-bold">
                  <span className="capitalize text-slate-900 dark:text-slate-200 flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full ${da.difficulty === 'easy' ? 'bg-emerald-500' : da.difficulty === 'medium' ? 'bg-amber-500' : 'bg-red-500'}`} />
                    {da.difficulty} Questions ({da.total} Qs)
                  </span>
                  <span className="text-slate-700 dark:text-slate-300 tabular-nums">{da.accuracy}% Accuracy ({da.correct}/{da.total})</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      da.difficulty === 'easy' ? 'bg-emerald-500' : da.difficulty === 'medium' ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${da.accuracy}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chapter-wise Accuracy Overview */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Compass className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-200 uppercase tracking-wide">Top & Weak Chapter Accuracy</h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-full">Chapter Ranking</span>
          </div>

          <div className="space-y-2.5 max-h-[220px] overflow-y-auto pr-1">
            {(chapter_performance || []).slice(0, 5).map((cp, idx) => {
              const isWeak = cp.accuracy_percent < 60;
              return (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/60 dark:border-slate-800 text-xs">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-200">{cp.chapter_name}</p>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">{cp.subject} &bull; {cp.total} Qs tested</p>
                  </div>
                  <div className="text-right">
                    <span className={`font-black text-sm tabular-nums ${isWeak ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
                      {cp.accuracy_percent}%
                    </span>
                    <span className="block text-[9px] font-bold text-slate-400 uppercase">{isWeak ? 'Needs Rev' : 'Mastered'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 3: TIME MANAGEMENT & INEFFICIENT QUESTION FLAGS           */}
      {/* ----------------------------------------------------------------- */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Time Management & Solving Pace Analysis</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Evaluation of time spent per question vs peer averages across subjects.</p>
            </div>
          </div>
          <span className="text-xs font-bold text-amber-600 dark:text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
            Total Time: {formatTime(time_management_report.total_time_spent_seconds)}
          </span>
        </div>

        {/* Inefficient Questions Warning Card */}
        {time_management_report.inefficient_questions && time_management_report.inefficient_questions.length > 0 ? (
          <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 space-y-3">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-extrabold text-xs uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Time Inefficiency Flag: Spent &gt;2x Peer Average Time & Got Wrong</span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2">
              {time_management_report.inefficient_questions.slice(0, 4).map((iq, i) => (
                <div key={i} className="p-3 rounded-xl bg-white dark:bg-[#070c18] border border-amber-500/30 text-xs space-y-1">
                  <div className="flex justify-between font-bold text-slate-900 dark:text-slate-100">
                    <span>Q#{iq.question_id} ({iq.subject})</span>
                    <span className="text-red-600 dark:text-red-400">{formatTime(iq.time_spent_seconds)} spent</span>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium truncate">{iq.chapter}</p>
                  <p className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">Peer Avg: {formatTime(iq.peer_avg_time_seconds)}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Optimal Time Efficiency! You did not get stuck for excessive time on wrong questions in this test.</span>
          </div>
        )}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 4: QUESTION-WISE DIAGNOSTIC REVIEW TABLE                 */}
      {/* ----------------------------------------------------------------- */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Question-by-Question Diagnostic Review</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Review your response vs correct answer and percentage of students who got it right.</p>
            </div>
          </div>

          {/* Question Filter Tabs */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl text-xs font-bold">
            {['ALL', 'WRONG', 'CORRECT', 'UNATTEMPTED'].map((f) => (
              <button
                key={f}
                onClick={() => setQuestionFilter(f)}
                className={`px-3 py-1 rounded-lg transition-all ${
                  questionFilter === f
                    ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="pb-3 pl-2">#</th>
                <th className="pb-3">Subject & Chapter</th>
                <th className="pb-3 text-center">Your Answer</th>
                <th className="pb-3 text-center">Correct Answer</th>
                <th className="pb-3 text-center">Time</th>
                <th className="pb-3 text-center">Class % Correct</th>
                <th className="pb-3 text-right pr-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {filteredQuestions.map((q, idx) => {
                const isExpanded = expandedQuestion === q.question_id;
                return (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors">
                    <td className="py-3 pl-2 font-bold text-slate-900 dark:text-slate-100">{idx + 1}</td>
                    <td className="py-3 max-w-xs">
                      <p className="font-bold text-slate-900 dark:text-slate-200 truncate">{q.question_text || `Question #${q.question_id}`}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{q.subject} &bull; {q.chapter}</p>
                    </td>
                    <td className="py-3 text-center">
                      {!q.is_attempted ? (
                        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">Skipped</span>
                      ) : q.is_correct ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3 h-3" /> {q.selected_option || 'Correct'}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-red-600 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md border border-red-200 dark:border-red-800">
                          <XCircle className="w-3 h-3" /> {q.selected_option || 'Wrong'}
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-center font-bold text-slate-700 dark:text-slate-300">
                      {q.correct_option || 'Option'}
                    </td>
                    <td className="py-3 text-center font-semibold text-slate-600 dark:text-slate-400">
                      {formatTime(q.time_spent_seconds)}
                    </td>
                    <td className="py-3 text-center">
                      <div className="flex flex-col items-center">
                        <span className="font-extrabold text-blue-600 dark:text-blue-400 tabular-nums">{q.percentage_of_students_who_got_this_correct}%</span>
                        <div className="w-16 bg-slate-200 dark:bg-slate-800 h-1 rounded-full overflow-hidden mt-1">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: `${q.percentage_of_students_who_got_this_correct}%` }} />
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-right pr-2">
                      <button
                        onClick={() => setExpandedQuestion(isExpanded ? null : q.question_id)}
                        className="p-1 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 5: STRONG & WEAK TOPICS SIDE-BY-SIDE                     */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Weak Topics */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs border-t-4 border-t-red-500 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600" />
              <h2 className="text-sm font-extrabold text-red-600 uppercase tracking-wide">Weak Topics (&lt;65% Accuracy)</h2>
            </div>
            <span className="text-[10px] font-bold text-red-600 bg-red-500/10 px-2 py-0.5 rounded-full">
              {(strong_and_weak_topics.weak_topics || []).length} Priority Modules
            </span>
          </div>

          <div className="space-y-3">
            {(strong_and_weak_topics.weak_topics || []).map((wt, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/70 dark:border-slate-800 space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-slate-200">{wt.chapter_name} ({wt.subject})</span>
                  <span className="text-red-600 font-bold">{wt.accuracy_percent}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-red-500 h-full rounded-full" style={{ width: `${wt.accuracy_percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Strong Topics */}
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs border-t-4 border-t-emerald-500 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-extrabold text-emerald-600 uppercase tracking-wide">Strong Topics (&ge;65% Accuracy)</h2>
            </div>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full">
              {(strong_and_weak_topics.strong_topics || []).length} Mastered
            </span>
          </div>

          <div className="space-y-3">
            {(strong_and_weak_topics.strong_topics || []).map((st, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/70 dark:border-slate-800 space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-slate-900 dark:text-slate-200">{st.chapter_name} ({st.subject})</span>
                  <span className="text-emerald-600 font-bold">{st.accuracy_percent}%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${st.accuracy_percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 6: ACTION PLAN (IMPROVEMENT PLAN, EBOOKS & REVISION)      */}
      {/* ----------------------------------------------------------------- */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Action Plan: Personalized Improvement & eBooks</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Tailored study roadmap and recommended learning resources based on weak areas.</p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Personalized Suggestions Cards */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">AI Improvement Guidance</h3>
            {personalized_improvement_plan.map((pip, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-purple-900 dark:text-purple-300">
                  <span>{pip.chapter} ({pip.subject})</span>
                  <span>Accuracy: {pip.student_accuracy}%</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{pip.suggestion}</p>
                <p className="text-[10px] font-bold text-purple-700 dark:text-purple-400">Resource: {pip.recommended_resource}</p>
              </div>
            ))}
          </div>

          {/* Recommended eBooks */}
          <div className="space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">Recommended Revision eBooks</h3>
            <div className="space-y-2.5">
              {recommended_ebooks.map((eb, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800 text-xs">
                  <div>
                    <p className="font-bold text-slate-900 dark:text-slate-100">{eb.title}</p>
                    <p className="text-[10px] text-slate-500 font-medium">{eb.author || 'Edvedum Academic Faculty'} &bull; {eb.subject || 'NEET Prep'}</p>
                  </div>
                  {eb.pdf_url && (
                    <a
                      href={eb.pdf_url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> PDF
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Structured Revision Strategy Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-blue-950/40 border border-blue-200 dark:border-blue-800/40 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-extrabold text-blue-900 dark:text-blue-300 uppercase tracking-wider">Daily Revision Time Ratio (40-30-30 Rule)</p>
            <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">{revision_strategy.suggested_daily_plan}</p>
          </div>
          {revision_strategy.next_test_countdown && (
            <div className="text-right">
              <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 uppercase">Next AIETS Mock</span>
              <p className="text-sm font-black text-slate-900 dark:text-white">{revision_strategy.next_test_countdown.next_test_name}</p>
              <p className="text-xs font-bold text-blue-600 dark:text-blue-300">{revision_strategy.next_test_countdown.days_remaining} Days Remaining</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
