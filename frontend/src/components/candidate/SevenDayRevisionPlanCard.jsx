import { useState, useEffect, useMemo } from 'react';
import {
  Calendar,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Target,
  BookOpen,
  Zap,
  Award,
  ChevronRight,
  ShieldAlert,
  Loader2,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { studentService } from '../../lib/services.js';

export default function SevenDayRevisionPlanCard({ attemptId, testData = null, isDarkMode = false }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(null); // null means show all or tab mode

  // Derive student test metrics from testData
  const metrics = useMemo(() => {
    const scoreObj = testData?.score || testData?.attempt?.score || {};
    const assessment = testData?.assessment || testData?.test_info || {};
    const attempt = testData?.attempt || {};
    const solutions = testData?.solutions || attempt?.question_responses || [];
    const subjectScores = testData?.subjectScores || [];

    const correctCount = scoreObj.correct_count ?? 0;
    const wrongCount = scoreObj.wrong_count ?? 0;
    const unattemptedCount = scoreObj.unattempted_count ?? 0;
    const totalCount = correctCount + wrongCount + unattemptedCount || solutions.length || 0;
    const scoreObtained = scoreObj.marks_obtained ?? attempt.marks_obtained ?? 0;
    const maxMarks = scoreObj.total_marks ?? assessment.max_marks ?? 300;
    const attemptedCount = correctCount + wrongCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const percentage = maxMarks > 0 ? Math.round((scoreObtained / maxMarks) * 100) : 0;

    // Extract weak chapters & topics directly from student's wrong and low-accuracy questions
    const topicStats = {};
    const wrongQuestionsList = [];

    for (const sol of solutions) {
      const topicName = sol.chapter_name || sol.chapter || sol.topic || sol.subject_name || 'Core Concept';
      const subj = sol.subject_name || sol.bank_category || sol.subject || 'General';
      const key = `${topicName} (${subj})`;

      if (!topicStats[key]) {
        topicStats[key] = { name: topicName, subject: subj, total: 0, correct: 0, wrong: 0 };
      }
      topicStats[key].total += 1;

      if (sol.is_correct) {
        topicStats[key].correct += 1;
      } else if (sol.your_answer !== null && sol.your_answer !== undefined && sol.your_answer !== '') {
        topicStats[key].wrong += 1;
        wrongQuestionsList.push({
          question_number: sol.question_number || sol.num || wrongQuestionsList.length + 1,
          subject: subj,
          chapter: topicName,
          topic: sol.topic || topicName,
          your_answer: sol.your_answer,
          correct_answer: sol.correct_answer,
        });
      }
    }

    const allTopics = Object.values(topicStats);

    let strongChapters = allTopics
      .filter((t) => t.correct > 0 && (t.correct / Math.max(t.total, 1)) >= 0.7)
      .sort((a, b) => (b.correct / Math.max(b.total, 1)) - (a.correct / Math.max(a.total, 1)))
      .map((t) => {
        const acc = Math.round((t.correct / Math.max(t.total, 1)) * 100);
        const subjStr = t.subject && t.subject !== t.name ? ` (${t.subject})` : '';
        return {
          name: t.name,
          subject: t.subject,
          accuracy: acc,
          display: `${t.name}${subjStr}`,
          tag: `${acc}% accuracy`,
        };
      });

    let weakChapters = allTopics
      .filter((t) => t.wrong > 0 || (t.total >= 2 && (t.correct / t.total) < 0.6))
      .sort((a, b) => (b.wrong / Math.max(b.total, 1)) - (a.wrong / Math.max(a.total, 1)))
      .map((t) => {
        const acc = Math.round((t.correct / Math.max(t.total, 1)) * 100);
        const subjStr = t.subject && t.subject !== t.name ? ` (${t.subject})` : '';
        return {
          name: t.name,
          subject: t.subject,
          accuracy: acc,
          display: `${t.name}${subjStr}`,
          tag: t.wrong > 0 ? `${t.wrong} wrong` : `${acc}% accuracy`,
        };
      });

    // Fallback to subjectScores if topic breakdown is generic
    if (strongChapters.length === 0 && subjectScores.length > 0) {
      strongChapters = subjectScores
        .filter((s) => s.max > 0 && (s.obtained / s.max) >= 0.6)
        .map((s) => ({
          name: s.name,
          subject: s.name,
          accuracy: Math.round((s.obtained / s.max) * 100),
          display: s.name,
          tag: `${Math.round((s.obtained / s.max) * 100)}% accuracy`,
        }));
    }

    if (weakChapters.length === 0 && subjectScores.length > 0) {
      weakChapters = subjectScores
        .filter((s) => s.max > 0 && (s.obtained / s.max) < 0.7)
        .map((s) => ({
          name: s.name,
          subject: s.name,
          accuracy: Math.round((s.obtained / s.max) * 100),
          display: s.name,
          tag: `${Math.round((s.obtained / s.max) * 100)}% accuracy`,
        }));
    }

    const secs = attempt?.duration_seconds;
    const avgSecs = totalCount > 0 && secs ? Math.round(secs / totalCount) : 90;
    const timeFormatted = `${Math.floor(avgSecs / 60)}m ${avgSecs % 60}s`;

    return {
      student_name: attempt?.student_name || attempt?.candidate_name || 'Student',
      exam_type: assessment.type || assessment.test_type || 'JEE / NEET CBT',
      test_name: assessment.title || assessment.test_name || 'CBT Assessment',
      score: scoreObtained,
      max_marks: maxMarks,
      percentage,
      accuracy_percent: accuracy,
      total_questions: totalCount,
      correct_count: correctCount,
      incorrect_count: wrongCount,
      unattempted_count: unattemptedCount,
      weak_chapters: weakChapters.map((w) => `${w.display} (${w.tag})`).slice(0, 6),
      strong_chapters: strongChapters.map((s) => `${s.display} (${s.tag})`).slice(0, 6),
      strong_topics_list: strongChapters.slice(0, 8),
      weak_topics_list: weakChapters.slice(0, 8),
      wrong_questions: wrongQuestionsList.slice(0, 8),
      subject_analysis: subjectScores.map((s) => ({
        subject: s.name,
        score: s.obtained,
        max: s.max,
        accuracy: s.max > 0 ? `${Math.round((s.obtained / s.max) * 100)}%` : '0%',
      })),
      time_per_question: timeFormatted,
    };
  }, [testData]);

  // Check localStorage, sessionStorage, and backend DB/Redis cache on mount
  useEffect(() => {
    let isMounted = true;

    const checkCacheAndLoad = async () => {
      const cacheKey = `7day_plan_${attemptId}`;

      // 1. Check browser localStorage/sessionStorage first (instant zero-network render)
      try {
        const saved = localStorage.getItem(cacheKey) || sessionStorage.getItem(cacheKey);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && Array.isArray(parsed.daily_plan) && parsed.daily_plan.length >= 7) {
            if (isMounted) setPlan(parsed);
            return;
          }
        }
      } catch (_) {}

      // 2. Query backend cache (PostgreSQL test_ai_reports & Redis)
      if (attemptId || testData?.attempt?.test_id || testData?.test_info?.id) {
        try {
          const res = await studentService.get7DayPlan({
            attemptId,
            testId: testData?.attempt?.test_id || testData?.attempt?.assessment_id || testData?.test_info?.id,
          });
          if (isMounted && res?.success && res?.plan && Array.isArray(res.plan.daily_plan)) {
            setPlan(res.plan);
            try {
              localStorage.setItem(cacheKey, JSON.stringify(res.plan));
              sessionStorage.setItem(cacheKey, JSON.stringify(res.plan));
            } catch (_) {}
          }
        } catch (_) {}
      }
    };

    if (attemptId) {
      checkCacheAndLoad();
    }

    return () => {
      isMounted = false;
    };
  }, [attemptId, testData]);

  const handleGeneratePlan = async (isRegenerate = false) => {
    setLoading(true);
    setError(null);

    try {
      const payload = {
        attemptId,
        testId: testData?.attempt?.test_id || testData?.attempt?.assessment_id || testData?.test_info?.id,
        testPerformance: metrics,
        regenerate: isRegenerate,
      };

      const res = await studentService.generate7DayPlan(payload);
      const generatedPlan = res?.plan || res?.data || res;

      if (generatedPlan && Array.isArray(generatedPlan.daily_plan) && generatedPlan.daily_plan.length > 0) {
        setPlan(generatedPlan);
        if (attemptId) {
          try {
            const cacheKey = `7day_plan_${attemptId}`;
            localStorage.setItem(cacheKey, JSON.stringify(generatedPlan));
            sessionStorage.setItem(cacheKey, JSON.stringify(generatedPlan));
          } catch (_) {}
        }
      } else {
        throw new Error('Could not parse generated revision plan.');
      }
    } catch (err) {
      console.error('[SevenDayRevisionPlanCard] Error:', err);
      setError(err?.response?.data?.message || err.message || 'Failed to generate 7-day plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Helper for subject color pills
  const getSubjectColor = (subj = '') => {
    const s = subj.toLowerCase();
    if (s.includes('phys')) return 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20';
    if (s.includes('chem')) return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
    if (s.includes('math')) return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
    if (s.includes('bio') || s.includes('botan') || s.includes('zool')) return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
    return 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20';
  };

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm overflow-hidden transition-all">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* CARD HEADER                                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-indigo-50/50 via-purple-50/30 to-transparent dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-transparent">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-slate-900 dark:text-white tracking-tight">
              AI 7-Day Personalized Revision Plan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
              Targeted day-by-day roadmap engineered around your mistakes and weak chapters in this test.
            </p>
          </div>
        </div>

        {/* Action Button: When plan is generated, allow regenerate */}
        {plan && !loading && (
          <button
            onClick={() => handleGeneratePlan(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition cursor-pointer shrink-0 self-start sm:self-auto"
            title="Generate a fresh variation of the revision plan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Regenerate Plan</span>
          </button>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* BODY CONTENT                                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* STATE 1: LOADING ANIMATION */}
        {loading && (
          <div className="py-12 px-4 text-center space-y-4">
            <div className="relative w-14 h-14 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 animate-spin blur-xs opacity-75" />
              <div className="relative w-14 h-14 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800">
                <Sparkles className="w-6 h-6 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Generating Your 7-Day Performance Roadmap...
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Analyzing your test responses, accuracy distribution, and chapter bottlenecks to structure daily goals.
              </p>
            </div>
            <div className="flex justify-center items-center gap-2 text-[11px] font-bold text-indigo-600 dark:text-indigo-400 pt-2">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Calibrating Day 1 to Day 7 Action Items</span>
            </div>
          </div>
        )}

        {/* STATE 2: INITIAL (NOT YET GENERATED) */}
        {!plan && !loading && (
          <div className="space-y-5">
            {/* Topic Diagnostics: Compact Row Layout to Save Space */}
            {(metrics.strong_topics_list.length > 0 || metrics.weak_topics_list.length > 0) && (
              <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-2.5">
                {/* Row 1: Strong Topics */}
                {metrics.strong_topics_list.length > 0 && (
                  <div className="flex items-start sm:items-center gap-2 flex-col sm:flex-row">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 shrink-0 sm:min-w-[135px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Strong ({metrics.strong_topics_list.length}):</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {metrics.strong_topics_list.map((topic, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/80 dark:border-emerald-800/50"
                        >
                          <span>{topic.display}</span>
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                            {topic.tag}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Row 2: Areas for Improvement */}
                {metrics.weak_topics_list.length > 0 && (
                  <div className={`flex items-start sm:items-center gap-2 flex-col sm:flex-row ${metrics.strong_topics_list.length > 0 ? 'pt-2.5 border-t border-slate-200/60 dark:border-slate-800/80' : ''}`}>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 shrink-0 sm:min-w-[135px]">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Focus Areas ({metrics.weak_topics_list.length}):</span>
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {metrics.weak_topics_list.map((topic, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/50"
                        >
                          <span>{topic.display}</span>
                          <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">
                            {topic.tag}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Error banner if any */}
            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            {/* PROMINENT GENERATE BUTTON */}
            <div className="p-6 rounded-2xl border border-dashed border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/30 to-purple-50/20 dark:from-indigo-950/10 dark:to-purple-950/10 text-center space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  Want a day-by-day plan to bridge your mistakes?
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Click below to generate a clean 7-day revision schedule tailored to your performance in this test.
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleGeneratePlan(false)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-black text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate 7-Day Plan</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: PLAN GENERATED & READY */}
        {plan && !loading && (
          <div className="space-y-6 animate-in fade-in duration-300">
            {/* Top Analysis Summary Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-blue-500/10 border border-indigo-500/20 space-y-2.5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                    Diagnostic Analysis & Target
                  </span>
                </div>
                {plan.target_score_boost && (
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Target Score Boost: {plan.target_score_boost}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                {plan.summary}
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-1 border-t border-indigo-500/15">
                {plan.primary_weakness && (
                  <p className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    🎯 <span className="font-extrabold">Primary Focus Area:</span> <span className="text-slate-900 dark:text-white">{plan.primary_weakness}</span>
                  </p>
                )}
                {metrics.strong_topics_list?.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Strengths to Leverage:
                    </span>
                    {metrics.strong_topics_list.slice(0, 3).map((st, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border border-emerald-500/20"
                      >
                        {st.display}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Day by Day Cards List */}
            <div className="space-y-3">
              <div className="flex items-center justify-between pb-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Day-by-Day Structured Revision Schedule
                </h4>
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                  7 Days • All Targets Calibrated
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
                {(plan.daily_plan || []).map((dayItem, idx) => {
                  const dayNum = dayItem.day || idx + 1;
                  const isExpanded = activeDay === dayNum;
                  const tasks = Array.isArray(dayItem.tasks)
                    ? dayItem.tasks
                    : Array.isArray(dayItem.activities)
                    ? dayItem.activities
                    : [dayItem.task || 'Revise core concepts and solve targeted questions.'];
                  const durationMins = dayItem.estimated_minutes || dayItem.recommendedMinutes || 90;

                  return (
                    <div
                      key={dayNum}
                      onClick={() => setActiveDay(isExpanded ? null : dayNum)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isExpanded
                          ? 'border-indigo-500 bg-indigo-50/40 dark:bg-indigo-950/20 shadow-sm ring-1 ring-indigo-500/30'
                          : 'border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/50 hover:border-indigo-400 dark:hover:border-indigo-600'
                      }`}
                    >
                      {/* Day Header */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-600 text-white shadow-xs">
                            Day {dayNum}
                          </span>
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-extrabold border ${getSubjectColor(dayItem.subject)}`}>
                            {dayItem.subject || 'Core'}
                          </span>
                        </div>

                        <div>
                          <p className="text-xs font-extrabold text-slate-900 dark:text-white line-clamp-2">
                            {dayItem.title || dayItem.focus_chapter || `Day ${dayNum} Focus`}
                          </p>
                          <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 mt-0.5 line-clamp-1">
                            {dayItem.focus_chapter}
                          </p>
                        </div>

                        {/* Why focus snippet */}
                        {dayItem.why_focus && (
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 italic">
                            "{dayItem.why_focus}"
                          </p>
                        )}

                        {/* Daily Goal */}
                        {dayItem.daily_goal && (
                          <div className="text-[10px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-[#070c18] p-2 rounded-xl border border-slate-200/60 dark:border-slate-800">
                            <span className="font-bold text-slate-900 dark:text-white">Goal:</span> {dayItem.daily_goal}
                          </div>
                        )}

                        {/* Tasks Checklist */}
                        <div className="space-y-1.5 pt-1">
                          {tasks.map((task, tIdx) => (
                            <div key={tIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                              <span className="text-indigo-500 font-bold shrink-0 mt-0.5">•</span>
                              <span>{task}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Day Footer with Time & Pro-Tip */}
                      <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/80 space-y-1.5">
                        <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {durationMins} mins
                          </span>
                          <span className="text-[9px] uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                            {isExpanded ? 'Collapse' : 'Tap to focus'}
                          </span>
                        </div>

                        {dayItem.pro_tip && (
                          <div className="text-[9px] font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 p-1.5 rounded-lg border border-amber-200 dark:border-amber-900/50">
                            ⚡ {dayItem.pro_tip}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Overall Exam Strategy Rules */}
            {Array.isArray(plan.exam_strategy_rules) && plan.exam_strategy_rules.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-[#070c18] border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                    Golden Exam Strategy Rules for Next Test
                  </h4>
                </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  {plan.exam_strategy_rules.map((rule, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/70 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-snug flex items-start gap-2"
                    >
                      <span className="font-black text-amber-500 shrink-0">#{rIdx + 1}</span>
                      <span>{rule}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Motivational Closing Note */}
            {plan.motivational_note && (
              <div className="p-3.5 rounded-xl text-center bg-slate-50 dark:bg-[#070c18] border border-slate-200 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  💡 {plan.motivational_note}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
