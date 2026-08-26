import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { studentService, aiTestService } from '../../lib/services.js';
import { LoadingScreen, ErrorState } from '../../components/ui.jsx';
import AIInsightsCard from '../../components/candidate/AIInsightsCard.jsx';
import AIMentorReportView from '../../components/candidate/AIMentorReportView.jsx';
import ScheduledTestsWidget from '../../components/candidate/ScheduledTestsWidget.jsx';
import AiTestResultsCard from '../../components/candidate/AiTestResultsCard.jsx';
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
  Compass,
  TrendingUp,
  MapPin,
  Building2,
  Users,
  GraduationCap,
  CalendarDays,
  Target,
  ShieldAlert
} from 'lucide-react';

export default function PostTestAnalytics() {
  const { testId } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [questionFilter, setQuestionFilter] = useState('ALL'); // ALL | WRONG | CORRECT | UNATTEMPTED
  const [generatingAiTest, setGeneratingAiTest] = useState(false);
  const [aiTestResult, setAiTestResult] = useState(null);
  const [aiTestError, setAiTestError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleGenerateAiTest = async () => {
    setGeneratingAiTest(true);
    setAiTestError(null);
    try {
      const studentId = data?.student_id || data?.user_id;
      const res = await aiTestService.generateTest(studentId, testId);
      setAiTestResult(res);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Unable to generate AI booster test.';
      setAiTestError(msg);
    } finally {
      setGeneratingAiTest(false);
    }
  };

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

  useEffect(() => {
    if (data) {
      const summary = data.performance_summary || data.attempt || {};
      const weakList = Array.isArray(data.weak_topics) ? data.weak_topics.map(t => typeof t === 'string' ? t : (t.name || t.topic)) : [];
      const strongList = Array.isArray(data.strong_topics) ? data.strong_topics.map(t => typeof t === 'string' ? t : (t.name || t.topic)) : [];

      const activeCtx = {
        title: summary.test_name || summary.title || 'Assessment',
        score: `${summary.score_obtained ?? summary.marks_obtained ?? 0} / ${summary.max_marks ?? summary.total_marks ?? 0}`,
        percentage: `${summary.percentage ?? 0}%`,
        accuracy: summary.accuracy != null ? `${summary.accuracy}%` : '0%',
        correct: summary.correct_count ?? 0,
        wrong: summary.wrong_count ?? 0,
        unattempted: summary.unattempted_count ?? 0,
        weakTopics: weakList.length > 0 ? weakList : ['Calculation speed & numerical accuracy'],
        strongTopics: strongList.length > 0 ? strongList : ['Core subject concepts'],
        timeTaken: summary.total_time_taken || ''
      };

      try {
        sessionStorage.setItem('active_test_context', JSON.stringify(activeCtx));
        window.dispatchEvent(new Event('active_test_context_updated'));
      } catch (_) {}
    }
  }, [data]);

  if (state === 'loading') {
    return <LoadingScreen label="Processing All India Ranks & generating your performance report..." />;
  }

  if (state === 'error' || !data) {
    return <ErrorState onRetry={loadAnalytics} message="Unable to load post-test analytics for this exam." />;
  }

  const {
    test_info = {},
    summary = {},
    ranks_breakdown = {},
    national_comparison = null,
    previous_test_comparison = null,
    seven_day_revision_plan = [],
    predicted_neet_score = null,
    college_prediction = null,
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
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors cursor-pointer"
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

          {/* Top Metric Cards Grid */}
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

            {/* Total Score */}
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

      {/* GEMINI 2.5 AI DIAGNOSTIC & PERSONALISED REVISION HUB */}
      <AIInsightsCard isDarkMode={false} testId={testId} testData={data} />



      {/* COMPREHENSIVE RANKS BREAKDOWN (AIR, State, City, Inst, Batch)    */}
      {/* ----------------------------------------------------------------- */}
      <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-amber-500" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Multi-Tier Rank Breakdown</h2>
          </div>
          <span className="text-xs font-bold text-amber-600 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20">Official Benchmarking</span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-amber-700 dark:text-amber-300 flex items-center gap-1"><Trophy className="w-3.5 h-3.5" /> All India</span>
            <p className="text-xl font-black text-amber-600 dark:text-amber-400">#{ranks_breakdown.all_india_rank || summary.all_india_rank || 1}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-blue-700 dark:text-blue-300 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> State Rank</span>
            <p className="text-xl font-black text-blue-600 dark:text-blue-400">#{ranks_breakdown.state_rank || summary.state_rank || 1}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-cyan-700 dark:text-cyan-300 flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> City Rank</span>
            <p className="text-xl font-black text-cyan-600 dark:text-cyan-400">#{ranks_breakdown.city_rank || summary.city_rank || 1}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
            <span className="text-[10px] font-extrabold uppercase text-emerald-700 dark:text-emerald-300 flex items-center gap-1"><Building2 className="w-3.5 h-3.5" /> Institute Rank</span>
            <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">#{ranks_breakdown.institute_rank || summary.institute_rank || 1}</p>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1 col-span-2 sm:col-span-1">
            <span className="text-[10px] font-extrabold uppercase text-purple-700 dark:text-purple-300 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> Batch Rank</span>
            <p className="text-xl font-black text-purple-600 dark:text-purple-400">#{ranks_breakdown.batch_rank || summary.batch_rank || 1}</p>
          </div>
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* NEW ITEM 1: NATIONAL COMPARISON VS TOPPER & AVERAGE               */}
      {/* ----------------------------------------------------------------- */}
      {national_comparison && (
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">National Aspirants Score Comparison</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Benchmarked against national average and top percentile scorers.</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-indigo-600 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
              Percentile: {national_comparison.your_percentile}%
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/40 text-center space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">Your Total Score</span>
              <p className="text-3xl font-black text-blue-600 dark:text-blue-400">{national_comparison.your_score}</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">National Average</span>
              <p className="text-3xl font-black text-slate-700 dark:text-slate-300">{national_comparison.national_average_score}</p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-center space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase">National Topper</span>
              <p className="text-3xl font-black text-amber-600 dark:text-amber-400">{national_comparison.national_topper_score}</p>
            </div>
          </div>

          {/* Subject-Wise National Averages Breakdown */}
          <div className="space-y-3 pt-2">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">Subject-Wise National Average Comparison</h3>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(national_comparison.subject_wise || []).map((sw, i) => (
                <div key={i} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-900 dark:text-slate-200">{sw.subject}</span>
                    <span className="text-indigo-600 dark:text-indigo-400">{sw.your_score} vs {sw.national_average} Avg</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 h-full rounded-full" style={{ width: `${Math.min(100, (sw.your_score / 180) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* NEW ITEM 2: PREVIOUS TEST COMPARISON                              */}
      {/* ----------------------------------------------------------------- */}
      {previous_test_comparison ? (
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-500" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Previous AIETS Test Progress Delta</h2>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              vs {previous_test_comparison.previous_test_name}
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Score Delta</span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{previous_test_comparison.score_change} Marks</p>
              <p className="text-[11px] text-slate-500 font-medium">Prev: {previous_test_comparison.previous_score} &rarr; Curr: {previous_test_comparison.current_score}</p>
            </div>
            <div className="p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Rank Progress</span>
              <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{previous_test_comparison.rank_change}</p>
              <p className="text-[11px] text-slate-500 font-medium">AIR #{previous_test_comparison.previous_rank} &rarr; #{previous_test_comparison.current_rank}</p>
            </div>
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 space-y-1">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Accuracy Delta</span>
              <p className="text-2xl font-black text-purple-600 dark:text-purple-400">{previous_test_comparison.accuracy_change}</p>
              <p className="text-[11px] text-slate-500 font-medium">Prev: {previous_test_comparison.previous_accuracy}% &rarr; Curr: {previous_test_comparison.current_accuracy}%</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 font-medium flex items-center justify-between">
          <span>This is your first AIETS attempt — previous test progress comparison will appear on your next mock!</span>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* NEW ITEM 3: SEVEN-DAY REVISION PLAN                               */}
      {/* ----------------------------------------------------------------- */}
      {seven_day_revision_plan && seven_day_revision_plan.length > 0 && (
        <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <div>
                <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Seven-Day Post-Test Revision Plan</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Customized day-by-day study schedule derived from your weakest topics.</p>
              </div>
            </div>
            <span className="text-xs font-extrabold text-purple-600 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">7-Day Roadmap</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            {seven_day_revision_plan.map((plan) => (
              <div key={plan.day} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800 space-y-2 flex flex-col justify-between hover:border-purple-500/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black uppercase text-purple-600 dark:text-purple-400">Day {plan.day}</span>
                    <span className="text-[9px] font-extrabold px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-700 dark:text-purple-300">{plan.focus_subject}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-2">{(plan.focus_chapters || []).join(', ')}</p>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium line-clamp-3 leading-snug">{plan.task}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* NEW ITEMS 4 & 5: PREDICTED NEET SCORE & COLLEGE PREDICTION CARDS  */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* PREDICTED NEET SCORE CARD */}
        {predicted_neet_score && predicted_neet_score.enabled ? (
          <div className="rounded-3xl border border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-950 text-white p-6 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-black text-white">Predicted NEET-UG 2027 Score</h2>
              </div>
              <span className="text-[10px] font-extrabold bg-indigo-500/20 text-indigo-200 px-2.5 py-1 rounded-full border border-indigo-400/30 uppercase tracking-wider">AI Estimate</span>
            </div>

            <div className="flex items-baseline gap-3">
              <p className="text-4xl font-black text-amber-300 tabular-nums">{predicted_neet_score.predicted_score} <span className="text-base text-indigo-200 font-normal">/ 720</span></p>
              <span className="text-xs font-bold text-indigo-200 bg-white/10 px-2.5 py-1 rounded-lg">Est. Range: {predicted_neet_score.confidence_range}</span>
            </div>

            {/* MANDATORY VISIBLE DISCLAIMER */}
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-amber-300 font-bold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Important Score Disclaimer</span>
              </div>
              <p className="text-[11px] text-blue-100 font-medium leading-relaxed">{predicted_neet_score.disclaimer}</p>
            </div>
          </div>
        ) : null}

        {/* COLLEGE PREDICTION CARD */}
        {college_prediction && college_prediction.enabled ? (
          <div className="rounded-3xl border border-cyan-200 dark:border-cyan-900/60 bg-gradient-to-br from-cyan-950 via-slate-900 to-slate-950 text-white p-6 shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <h2 className="text-base font-black text-white">NEET Medical College Eligibility Predictor</h2>
              </div>
              <span className="text-[10px] font-extrabold bg-cyan-500/20 text-cyan-200 px-2.5 py-1 rounded-full border border-cyan-400/30 uppercase tracking-wider">Cutoff Matching</span>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-bold text-cyan-200">Based on your performance trend, candidate is eligible for top government medical colleges:</p>
              <div className="grid gap-2 sm:grid-cols-2">
                {(college_prediction.eligible_colleges || []).slice(0, 4).map((col, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/10 border border-white/15 text-xs space-y-0.5">
                    <p className="font-bold text-white truncate">{col.college_name}</p>
                    <p className="text-[10px] text-cyan-200 font-medium">{col.state} &bull; {col.quota} Quota ({col.category})</p>
                    <p className="text-[10px] font-bold text-emerald-300">Cutoff: {col.min_score}+ marks (Closing Rank #{col.closing_rank})</p>
                  </div>
                ))}
              </div>
            </div>

            {/* MANDATORY VISIBLE DISCLAIMER */}
            <div className="p-3.5 rounded-2xl bg-white/10 border border-white/15 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-cyan-300 font-bold">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>Important College Prediction Disclaimer</span>
              </div>
              <p className="text-[11px] text-cyan-100 font-medium leading-relaxed">{college_prediction.disclaimer}</p>
            </div>
          </div>
        ) : null}
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 6: NEET SUBJECT ANALYSIS (Physics, Chem, Botany, Zoology) */}
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
      {/* SECTION 7: DIFFICULTY & CHAPTER ACCURACY                         */}
      {/* ----------------------------------------------------------------- */}
      <div className="grid gap-6 lg:grid-cols-2">
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
      {/* DEDICATED STRONG & WEAK TOPICS BREAKDOWN                         */}
      {/* ----------------------------------------------------------------- */}
      {(() => {
        const strongList = (strong_and_weak_topics.strong_topics || []).length > 0 
          ? strong_and_weak_topics.strong_topics 
          : (chapter_performance || []).filter(c => (c.accuracy_percent || 0) >= 75 || ((c.correct || 0) > 0 && (c.wrong || 0) === 0));
        
        const weakList = (strong_and_weak_topics.weak_topics || []).length > 0 
          ? strong_and_weak_topics.weak_topics 
          : (chapter_performance || []).filter(c => (c.wrong || 0) > 0 || (c.accuracy_percent || 0) < 75 || c.is_unattempted);

        return (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Strong Topics Card */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs border-t-4 border-t-emerald-500 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <div>
                    <h2 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Strong Topics (&ge;75% Accuracy)</h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Concept areas where you demonstrated high accuracy and speed.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {strongList.length} Mastered
                </span>
              </div>

              {strongList.length > 0 ? (
                <div className="space-y-3 pt-1">
                  {strongList.map((st, idx) => {
                    const chName = st.chapter_name || st.topic || st.chapter || 'Strong Concept';
                    const subName = st.subject || 'Subject';
                    const acc = st.accuracy_percent ?? st.accuracy ?? 85;
                    return (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-900 dark:text-slate-100">{chName} <span className="text-[10px] text-slate-400 font-normal">({subName})</span></span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-black tabular-nums">{acc}%</span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${acc}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-xs text-slate-500 space-y-1">
                  <Award className="w-8 h-8 text-slate-400 opacity-50" />
                  <p className="font-bold text-slate-700 dark:text-slate-300">No Mastered Topics Yet</p>
                  <p className="text-[11px]">Score &ge;75% accuracy in a chapter to mark it as a Strong Topic.</p>
                </div>
              )}
            </div>

            {/* Weak Topics Card */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#111827] p-6 shadow-xs border-t-4 border-t-red-500 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <div>
                    <h2 className="text-sm font-extrabold text-red-600 dark:text-red-400 uppercase tracking-wide">Weak Topics & Focus Areas</h2>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Topics requiring immediate formula review, PYQ practice, or pacing correction.</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-red-600 dark:text-red-300 bg-red-500/10 px-2.5 py-0.5 rounded-full border border-red-500/20">
                  {weakList.length} Priority
                </span>
              </div>

              {weakList.length > 0 ? (
                <div className="space-y-3 pt-1">
                  {weakList.map((wt, idx) => {
                    const chName = wt.chapter_name || wt.topic || wt.chapter || 'Weak Concept';
                    const subName = wt.subject || 'Subject';
                    const acc = wt.accuracy_percent ?? wt.accuracy ?? 0;
                    const isUnattempted = wt.is_unattempted || wt.engagement_status === 'unattempted';
                    return (
                      <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-[#070c18] border border-slate-200/70 dark:border-slate-800 space-y-1.5">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-slate-900 dark:text-slate-100">{chName} <span className="text-[10px] text-slate-400 font-normal">({subName})</span></span>
                          <span className="inline-flex items-center gap-1.5">
                            <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded ${isUnattempted ? 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400' : 'bg-red-500/10 text-red-600 dark:text-red-400'}`}>
                              {isUnattempted ? 'Unattempted' : `${acc}% Acc`}
                            </span>
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.max(5, acc)}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6 text-center text-xs text-slate-500 space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                  <p className="font-bold text-slate-700 dark:text-slate-300">No Weak Topics Identified!</p>
                  <p className="text-[11px]">All tested topics met the required accuracy threshold.</p>
                </div>
              )}
            </div>
          </div>
        );
      })()}

      {/* WEAK TOPIC BOOSTER TEST GENERATOR CARD */}
      <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Weak Topic Booster Test</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                Generate fresh, NTA-pattern questions targeting weak areas identified in this test. Scheduled with 2–3 days spaced repetition so you have time to revise first.
              </p>
            </div>
          </div>

          <div className="shrink-0">
            <button
              type="button"
              disabled={generatingAiTest}
              onClick={handleGenerateAiTest}
              className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center gap-2 transition ${
                generatingAiTest
                  ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              {generatingAiTest ? (
                <>
                  <Sparkles className="h-4 w-4 animate-spin" />
                  <span>Generating Test...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Generate AI Improvement Test</span>
                </>
              )}
            </button>
          </div>
        </div>

        {aiTestError && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
            <ShieldAlert className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
            <span>{aiTestError}</span>
          </div>
        )}

        {aiTestResult && (
          <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300 text-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              <span>Booster Test Scheduled</span>
            </div>
            <p className="leading-relaxed">
              {aiTestResult.message || `Your personalized test is ready and will unlock on ${new Date(aiTestResult.unlockAt).toLocaleDateString()}.`}
            </p>
          </div>
        )}
      </div>

      {/* SCHEDULED TESTS WIDGET */}
      <div>
        <ScheduledTestsWidget
          studentId={data?.student_id || data?.user_id}
          onRefreshTrigger={refreshTrigger}
        />
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* SECTION 8: TIME MANAGEMENT REPORT                                 */}
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
      {/* SECTION 9: QUESTION-WISE DIAGNOSTIC REVIEW TABLE                 */}
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
      {/* SECTION 10: ACTION PLAN & RECOMMENDED EBOOKS                       */}
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
                      href={eb.pdf_url.startsWith('http') ? eb.pdf_url : `http://127.0.0.1:5000${eb.pdf_url.startsWith('/') ? '' : '/'}${eb.pdf_url}`}
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
      </div>

      {/* ── AI Mentor Report Section ──────────────────────────────── */}
      <div className="mt-2">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 bg-gradient-to-r from-purple-500/40 to-transparent" />
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
            ✦ AI Mentor Analysis
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-purple-500/40 to-transparent" />
        </div>
        <AIMentorReportView testId={testId} />
      </div>
    </div>
  );
}
