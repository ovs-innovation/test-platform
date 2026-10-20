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
  ChevronLeft,
  Loader2,
  ListTodo,
  LayoutGrid,
  Printer,
  Flame,
  ArrowRight,
  ArrowLeft,
  Lightbulb,
  Check,
  TrendingUp,
  Share2
} from 'lucide-react';
import { studentService } from '../../lib/services.js';

export default function SevenDayRevisionPlanCard({ attemptId, testData = null, isDarkMode = false }) {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeDay, setActiveDay] = useState(1); // default to Day 1
  const [viewMode, setViewMode] = useState('focus'); // 'focus' (spotlight day) | 'board' (all 7 days grid)
  const [completedTasks, setCompletedTasks] = useState({});
  const [showFullSummary, setShowFullSummary] = useState(false);

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

  // Load completed tasks checklist progress from localStorage
  useEffect(() => {
    if (!attemptId) return;
    try {
      const stored = localStorage.getItem(`7day_progress_${attemptId}`);
      if (stored) {
        setCompletedTasks(JSON.parse(stored));
      }
    } catch (_) {}
  }, [attemptId]);

  // Check cache and load existing plan
  useEffect(() => {
    let isMounted = true;

    const checkCacheAndLoad = async () => {
      const cacheKey = `7day_plan_${attemptId}`;

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

  const toggleTask = (dayNum, taskIdx) => {
    const key = `d${dayNum}_t${taskIdx}`;
    setCompletedTasks((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      if (attemptId) {
        try {
          localStorage.setItem(`7day_progress_${attemptId}`, JSON.stringify(updated));
        } catch (_) {}
      }
      return updated;
    });
  };

  const markAllDayTasks = (dayNum, tasks, makeComplete = true) => {
    setCompletedTasks((prev) => {
      const updated = { ...prev };
      tasks.forEach((_, tIdx) => {
        updated[`d${dayNum}_t${tIdx}`] = makeComplete;
      });
      if (attemptId) {
        try {
          localStorage.setItem(`7day_progress_${attemptId}`, JSON.stringify(updated));
        } catch (_) {}
      }
      return updated;
    });
  };

  // Overall Plan Progress calculation
  const progressStats = useMemo(() => {
    if (!plan || !Array.isArray(plan.daily_plan)) {
      return { total: 0, completed: 0, percent: 0 };
    }
    let total = 0;
    let completed = 0;
    plan.daily_plan.forEach((d, dIdx) => {
      const dayNum = d.day || dIdx + 1;
      const tasks = Array.isArray(d.tasks)
        ? d.tasks
        : (Array.isArray(d.activities) ? d.activities : [d.task || 'Revise core concepts']);
      tasks.forEach((_, tIdx) => {
        total++;
        if (completedTasks[`d${dayNum}_t${tIdx}`]) {
          completed++;
        }
      });
    });
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, percent };
  }, [plan, completedTasks]);

  // Subject palette with modern pill styling
  const getSubjectTheme = (subj = '') => {
    const s = String(subj || '').toLowerCase();
    if (s.includes('phys')) {
      return {
        badge: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border-cyan-500/30',
        ring: 'ring-cyan-500/30',
        activeTab: 'bg-cyan-600 text-white shadow-cyan-500/25',
        glow: 'from-cyan-500/20 via-blue-500/10 to-transparent',
        dot: 'bg-cyan-500',
      };
    }
    if (s.includes('chem')) {
      return {
        badge: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/30',
        ring: 'ring-emerald-500/30',
        activeTab: 'bg-emerald-600 text-white shadow-emerald-500/25',
        glow: 'from-emerald-500/20 via-teal-500/10 to-transparent',
        dot: 'bg-emerald-500',
      };
    }
    if (s.includes('math')) {
      return {
        badge: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border-amber-500/30',
        ring: 'ring-amber-500/30',
        activeTab: 'bg-amber-600 text-white shadow-amber-500/25',
        glow: 'from-amber-500/20 via-orange-500/10 to-transparent',
        dot: 'bg-amber-500',
      };
    }
    if (s.includes('bio') || s.includes('botan') || s.includes('zool')) {
      return {
        badge: 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-500/30',
        ring: 'ring-purple-500/30',
        activeTab: 'bg-purple-600 text-white shadow-purple-500/25',
        glow: 'from-purple-500/20 via-fuchsia-500/10 to-transparent',
        dot: 'bg-purple-500',
      };
    }
    return {
      badge: 'bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border-indigo-500/30',
      ring: 'ring-indigo-500/30',
      activeTab: 'bg-indigo-600 text-white shadow-indigo-500/25',
      glow: 'from-indigo-500/20 via-purple-500/10 to-transparent',
      dot: 'bg-indigo-500',
    };
  };

  const handlePrint = () => {
    window.print();
  };

  // Helper to get active day data
  const currentDayData = useMemo(() => {
    if (!plan || !Array.isArray(plan.daily_plan) || plan.daily_plan.length === 0) return null;
    return plan.daily_plan.find((d, idx) => (d.day || idx + 1) === activeDay) || plan.daily_plan[0];
  }, [plan, activeDay]);

  return (
    <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0b1329] shadow-sm overflow-hidden transition-all print:border-none print:shadow-none">
      {/* ───────────────────────────────────────────────────────────── */}
      {/* CARD HEADER                                                   */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 bg-gradient-to-r from-indigo-50/70 via-purple-50/40 to-transparent dark:from-indigo-950/30 dark:via-purple-950/15 dark:to-transparent flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-600 text-white shadow-md shadow-indigo-500/20 shrink-0">
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                AI 7-Day Precision Revision Plan
              </h3>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-indigo-500/15 to-purple-500/15 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                <Sparkles className="w-3 h-3 text-indigo-500" /> Personalized
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5 max-w-xl">
              Targeted day-by-day roadmap engineered around your mistakes and weak chapters in this test.
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        {plan && !loading && (
          <div className="flex items-center gap-2 flex-wrap shrink-0">
            {/* View Mode Toggle: Day Focus vs All 7 Days */}
            <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400">
              <button
                onClick={() => setViewMode('focus')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'focus'
                    ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-xs font-black'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Focus on one day at a time with full details"
              >
                <ListTodo className="w-3.5 h-3.5" />
                <span>Day Focus</span>
              </button>
              <button
                onClick={() => setViewMode('board')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'board'
                    ? 'bg-white dark:bg-indigo-600 text-indigo-600 dark:text-white shadow-xs font-black'
                    : 'hover:text-slate-900 dark:hover:text-white'
                }`}
                title="View all 7 days side-by-side in a responsive grid"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>All 7 Days</span>
              </button>
            </div>

            {/* Print Plan Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition cursor-pointer shadow-2xs"
              title="Print your study schedule or save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Print</span>
            </button>

            {/* Regenerate Button */}
            <button
              onClick={() => handleGeneratePlan(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition cursor-pointer shadow-2xs"
              title="Generate a fresh variation of the revision plan"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden sm:inline">Regenerate</span>
            </button>
          </div>
        )}
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* BODY CONTENT                                                  */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* STATE 1: LOADING ANIMATION */}
        {loading && (
          <div className="py-14 px-4 text-center space-y-4">
            <div className="relative w-16 h-16 mx-auto">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 animate-spin blur-xs opacity-75" />
              <div className="relative w-16 h-16 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center border border-slate-200 dark:border-slate-800 shadow-xl">
                <Sparkles className="w-7 h-7 text-indigo-600 dark:text-indigo-400 animate-pulse" />
              </div>
            </div>
            <div className="space-y-1.5">
              <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                Engineering Your 7-Day Precision Roadmap...
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                Analyzing question-by-question response times, concept accuracy gaps, and high-yield chapters to formulate your daily action items.
              </p>
            </div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/80 dark:border-indigo-800/60 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Calibrating Day 1 to Day 7 Action Sprints</span>
            </div>
          </div>
        )}

        {/* STATE 2: INITIAL (NOT YET GENERATED) */}
        {!plan && !loading && (
          <div className="space-y-5">
            {/* Topic Diagnostics: Compact Row Layout */}
            {(metrics.strong_topics_list.length > 0 || metrics.weak_topics_list.length > 0) && (
              <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-3">
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

            {error && (
              <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2.5 text-xs text-rose-700 dark:text-rose-300">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <div className="p-8 rounded-3xl border border-dashed border-indigo-200 dark:border-indigo-900/60 bg-gradient-to-b from-indigo-50/40 via-purple-50/20 to-transparent dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-transparent text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto shadow-md shadow-indigo-500/25">
                <Sparkles className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-black text-slate-900 dark:text-white">
                  Bridge Your Mistakes in 7 Days
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
                  Generate a structured daily revision schedule with NCERT readings, timed PYQ drills, and mistake book audits based on your exact errors in this test.
                </p>
              </div>

              <div>
                <button
                  onClick={() => handleGeneratePlan(false)}
                  className="inline-flex items-center gap-2.5 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white font-black text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate 7-Day Plan</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STATE 3: PLAN GENERATED & ACTIVE */}
        {plan && !loading && (
          <div className="space-y-6">
            {/* 1. PROGRESS BAR & STATS BAR */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/40 dark:from-slate-900/80 dark:to-[#0e172e] border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <ListTodo className="w-4 h-4" />
                  </span>
                  <div>
                    <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                      7-Day Revision Progress
                    </span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 ml-2 font-medium">
                      {progressStats.completed} of {progressStats.total} Tasks Completed
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">
                    {progressStats.percent}% Complete
                  </span>
                  {progressStats.completed > 0 && (
                    <button
                      onClick={() => setCompletedTasks({})}
                      className="text-[10px] font-bold text-slate-400 hover:text-rose-500 underline transition cursor-pointer"
                      title="Reset all checkboxes"
                    >
                      Reset
                    </button>
                  )}
                </div>
              </div>

              {/* Animated Progress Track */}
              <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-500 shadow-sm"
                  style={{ width: `${progressStats.percent}%` }}
                />
              </div>
            </div>

            {/* 2. DIAGNOSTIC ANALYSIS & TARGET CARDS */}
            <div className="rounded-2xl border border-indigo-100 dark:border-indigo-950/60 bg-gradient-to-br from-indigo-50/40 via-white to-purple-50/20 dark:from-[#091124] dark:via-[#0b142d] dark:to-[#091024] p-4 sm:p-5 space-y-4 shadow-2xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Metric 1: Target Boost */}
                <div className="p-3 rounded-xl bg-white/80 dark:bg-[#0d1836] border border-emerald-500/20 shadow-2xs space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                    Target Score Boost
                  </span>
                  <p className="text-sm sm:text-base font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>{plan.target_score_boost || '+15-25 Marks'}</span>
                  </p>
                </div>

                {/* Metric 2: Primary Bottleneck */}
                <div className="p-3 rounded-xl bg-white/80 dark:bg-[#0d1836] border border-rose-500/20 shadow-2xs space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                    Primary Focus
                  </span>
                  <p className="text-xs sm:text-sm font-black text-rose-600 dark:text-rose-400 truncate" title={plan.primary_weakness}>
                    {plan.primary_weakness || 'Core Weak Concepts'}
                  </p>
                </div>

                {/* Metric 3: Daily Study Time */}
                <div className="p-3 rounded-xl bg-white/80 dark:bg-[#0d1836] border border-indigo-500/20 shadow-2xs space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                    Daily Pacing
                  </span>
                  <p className="text-sm sm:text-base font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>~90 Mins / Day</span>
                  </p>
                </div>

                {/* Metric 4: Test Baseline */}
                <div className="p-3 rounded-xl bg-white/80 dark:bg-[#0d1836] border border-purple-500/20 shadow-2xs space-y-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
                    Test Score
                  </span>
                  <p className="text-sm sm:text-base font-black text-purple-600 dark:text-purple-400 flex items-center gap-1">
                    <Award className="w-4 h-4" />
                    <span>{metrics.score}/{metrics.max_marks} ({metrics.accuracy_percent}%)</span>
                  </p>
                </div>
              </div>

              {/* Diagnosis Summary Text */}
              {plan.summary && (
                <div className="pt-2 border-t border-indigo-100/60 dark:border-indigo-950/80 space-y-1.5">
                  <p className="text-xs text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
                    {showFullSummary || plan.summary.length <= 180
                      ? plan.summary
                      : `${plan.summary.slice(0, 180)}...`}
                  </p>
                  {plan.summary.length > 180 && (
                    <button
                      onClick={() => setShowFullSummary(!showFullSummary)}
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>{showFullSummary ? 'Show Less' : 'Read Full AI Analysis'}</span>
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* 3. VIEW MODE 1: DAY FOCUS (SPOTLIGHT DAY WORKSPACE) */}
            {viewMode === 'focus' && currentDayData && (
              <div className="space-y-4">
                {/* Horizontal Day Tabs Stepper */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-black uppercase tracking-wider text-slate-400">
                    <span>Select Revision Day</span>
                    <span>Day {activeDay} of 7</span>
                  </div>

                  <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                    {(plan.daily_plan || []).map((dayItem, idx) => {
                      const dayNum = dayItem.day || idx + 1;
                      const isSelected = activeDay === dayNum;
                      const theme = getSubjectTheme(dayItem.subject);
                      const tasks = Array.isArray(dayItem.tasks)
                        ? dayItem.tasks
                        : (Array.isArray(dayItem.activities) ? dayItem.activities : [dayItem.task || '']);
                      const dayTasksDone = tasks.filter((_, tIdx) => completedTasks[`d${dayNum}_t${tIdx}`]).length;
                      const isAllDone = tasks.length > 0 && dayTasksDone === tasks.length;

                      return (
                        <button
                          key={dayNum}
                          onClick={() => setActiveDay(dayNum)}
                          className={`relative p-2 sm:p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[64px] sm:min-h-[72px] ${
                            isSelected
                              ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25 ring-2 ring-indigo-400/30'
                              : isAllDone
                              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-400/50 text-emerald-800 dark:text-emerald-300'
                              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className={`text-[10px] sm:text-xs font-black uppercase ${isSelected ? 'text-white' : ''}`}>
                            Day {dayNum}
                          </span>

                          <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md truncate max-w-full ${
                            isSelected
                              ? 'bg-white/20 text-white'
                              : theme.badge
                          }`}>
                            {dayItem.subject || 'Core'}
                          </span>

                          <div className="mt-1">
                            {isAllDone ? (
                              <span className="inline-flex items-center text-[10px] font-black text-emerald-500 dark:text-emerald-400">
                                <Check className="w-3 h-3 stroke-[3]" />
                              </span>
                            ) : (
                              <span className={`text-[9px] font-bold ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                                {dayTasksDone}/{tasks.length}
                              </span>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Active Day Spotlight Card */}
                {(() => {
                  const dayNum = currentDayData.day || activeDay;
                  const theme = getSubjectTheme(currentDayData.subject);
                  const tasks = Array.isArray(currentDayData.tasks)
                    ? currentDayData.tasks
                    : (Array.isArray(currentDayData.activities) ? currentDayData.activities : [currentDayData.task || 'Revise core concepts']);
                  const durationMins = currentDayData.estimated_minutes || currentDayData.recommendedMinutes || 90;
                  const completedInDay = tasks.filter((_, tIdx) => completedTasks[`d${dayNum}_t${tIdx}`]).length;
                  const isDayComplete = tasks.length > 0 && completedInDay === tasks.length;

                  return (
                    <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#070e20] shadow-sm overflow-hidden space-y-5 p-5 sm:p-6 transition-all">
                      {/* Spotlight Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3.5 py-1 rounded-xl text-xs sm:text-sm font-black uppercase bg-indigo-600 text-white shadow-xs">
                            Day {dayNum} Focus
                          </span>
                          <span className={`px-2.5 py-0.5 rounded-lg text-xs font-extrabold border ${theme.badge}`}>
                            {currentDayData.subject || 'Core'}
                          </span>
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                            <Clock className="w-3.5 h-3.5" /> {durationMins} Mins
                          </span>
                        </div>

                        {/* Prev / Next Stepper Nav */}
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setActiveDay(Math.max(1, activeDay - 1))}
                            disabled={activeDay <= 1}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Prev Day</span>
                          </button>
                          <button
                            onClick={() => setActiveDay(Math.min(7, activeDay + 1))}
                            disabled={activeDay >= 7}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
                          >
                            <span>Next Day</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Day Title and Chapter */}
                      <div className="space-y-1">
                        <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                          {currentDayData.title || currentDayData.focus_chapter || `Day ${dayNum} Action Plan`}
                        </h4>
                        <p className="text-xs sm:text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Chapter: {currentDayData.focus_chapter}</span>
                        </p>
                      </div>

                      {/* Main 2-Column Workspace */}
                      <div className="grid gap-5 md:grid-cols-2">
                        {/* LEFT COLUMN: GUIDANCE & CONTEXT */}
                        <div className="space-y-3.5">
                          {/* Daily Goal Banner */}
                          {currentDayData.daily_goal && (
                            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/25 border border-indigo-100 dark:border-indigo-900/50 space-y-1.5">
                              <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                                <Target className="w-3.5 h-3.5" /> Daily Target Objective
                              </span>
                              <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-relaxed">
                                {currentDayData.daily_goal}
                              </p>
                            </div>
                          )}

                          {/* Why Focus Insight */}
                          {currentDayData.why_focus && (
                            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
                              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                                Diagnostic Reason
                              </span>
                              <p className="text-xs text-slate-600 dark:text-slate-300 font-medium italic leading-relaxed">
                                "{currentDayData.why_focus}"
                              </p>
                            </div>
                          )}

                          {/* Ranker Pro-Tip */}
                          {currentDayData.pro_tip && (
                            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-1.5">
                              <div className="flex items-center gap-1.5">
                                <span className="p-1 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400">
                                  <Zap className="w-3.5 h-3.5" />
                                </span>
                                <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 dark:text-amber-300">
                                  Ranker Strategy Secret
                                </span>
                              </div>
                              <p className="text-xs font-bold text-amber-900 dark:text-amber-200 leading-relaxed">
                                {currentDayData.pro_tip}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* RIGHT COLUMN: INTERACTIVE CHECKLIST */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800 space-y-3.5">
                          <div className="flex items-center justify-between border-b border-slate-200/70 dark:border-slate-800/80 pb-2.5">
                            <div className="flex items-center gap-2">
                              <ListTodo className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                              <h5 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">
                                Action Items ({completedInDay}/{tasks.length})
                              </h5>
                            </div>

                            <button
                              onClick={() => markAllDayTasks(dayNum, tasks, !isDayComplete)}
                              className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                            >
                              {isDayComplete ? 'Uncheck All' : 'Mark All Done'}
                            </button>
                          </div>

                          {/* Task List */}
                          <div className="space-y-2.5">
                            {tasks.map((task, tIdx) => {
                              const taskKey = `d${dayNum}_t${tIdx}`;
                              const isDone = Boolean(completedTasks[taskKey]);

                              return (
                                <div
                                  key={tIdx}
                                  onClick={() => toggleTask(dayNum, tIdx)}
                                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3 select-none ${
                                    isDone
                                      ? 'bg-emerald-500/10 border-emerald-500/30 dark:bg-emerald-950/20 text-slate-500 dark:text-slate-400'
                                      : 'bg-white dark:bg-[#0b1429] border-slate-200 dark:border-slate-800 hover:border-indigo-400 text-slate-800 dark:text-slate-100 shadow-2xs'
                                  }`}
                                >
                                  {/* Custom Checkbox */}
                                  <div className={`mt-0.5 w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                                    isDone
                                      ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs'
                                      : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
                                  }`}>
                                    {isDone && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                  </div>

                                  {/* Task Text */}
                                  <div className="space-y-0.5 min-w-0 flex-1">
                                    <div className="flex items-center justify-between gap-2">
                                      <span className="text-[10px] font-black uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                        Step {tIdx + 1}
                                      </span>
                                      {task.includes('mins') && (
                                        <span className="text-[10px] font-bold text-slate-400">
                                          ⏱️ {task.match(/\(\d+\s*mins?\)/i)?.[0]?.replace(/[()]/g, '') || ''}
                                        </span>
                                      )}
                                    </div>
                                    <p className={`text-xs font-semibold leading-relaxed ${
                                      isDone ? 'line-through opacity-75' : ''
                                    }`}>
                                      {task}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Completion Feedback */}
                          {isDayComplete && (
                            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-center animate-in fade-in duration-300">
                              <p className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center justify-center gap-1.5">
                                <CheckCircle className="w-4 h-4 text-emerald-500" />
                                <span>Day {dayNum} Objectives Completed! Ready for Day {Math.min(7, dayNum + 1)}.</span>
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* 4. VIEW MODE 2: ALL 7 DAYS (BOARD / GRID VIEW) */}
            {viewMode === 'board' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-1">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" /> Full Week Revision Board
                  </h4>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">
                    Click any day card to focus
                  </span>
                </div>

                {/* Responsive 7-Day Grid: 2-3 comfortable columns instead of cramped 7-squeeze */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {(plan.daily_plan || []).map((dayItem, idx) => {
                    const dayNum = dayItem.day || idx + 1;
                    const theme = getSubjectTheme(dayItem.subject);
                    const tasks = Array.isArray(dayItem.tasks)
                      ? dayItem.tasks
                      : (Array.isArray(dayItem.activities) ? dayItem.activities : [dayItem.task || 'Revise core concepts']);
                    const durationMins = dayItem.estimated_minutes || dayItem.recommendedMinutes || 90;
                    const completedInDay = tasks.filter((_, tIdx) => completedTasks[`d${dayNum}_t${tIdx}`]).length;
                    const isAllDone = tasks.length > 0 && completedInDay === tasks.length;

                    return (
                      <div
                        key={dayNum}
                        className={`rounded-2xl border p-4 sm:p-5 flex flex-col justify-between space-y-4 transition-all shadow-2xs ${
                          isAllDone
                            ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-400/40'
                            : 'bg-white dark:bg-[#070e20] border-slate-200/90 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600'
                        }`}
                      >
                        {/* Card Header */}
                        <div className="space-y-2.5">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-600 text-white shadow-2xs">
                              Day {dayNum}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${theme.badge}`}>
                              {dayItem.subject || 'Core'}
                            </span>
                          </div>

                          <div>
                            <h5 className="text-sm font-black text-slate-900 dark:text-white line-clamp-2">
                              {dayItem.title || dayItem.focus_chapter || `Day ${dayNum} Focus`}
                            </h5>
                            <p className="text-xs font-bold text-indigo-600 dark:text-indigo-400 mt-0.5">
                              {dayItem.focus_chapter}
                            </p>
                          </div>

                          {/* Daily Goal Snippet */}
                          {dayItem.daily_goal && (
                            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/70 dark:border-slate-800 text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                              <span className="font-extrabold text-slate-900 dark:text-white">Goal:</span> {dayItem.daily_goal}
                            </div>
                          )}

                          {/* Checklist preview */}
                          <div className="space-y-1.5 pt-1">
                            {tasks.map((task, tIdx) => {
                              const taskKey = `d${dayNum}_t${tIdx}`;
                              const isDone = Boolean(completedTasks[taskKey]);

                              return (
                                <div
                                  key={tIdx}
                                  onClick={() => toggleTask(dayNum, tIdx)}
                                  className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300 cursor-pointer hover:text-indigo-600"
                                >
                                  <div className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                                    isDone ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900'
                                  }`}>
                                    {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                                  </div>
                                  <span className={`leading-snug ${isDone ? 'line-through opacity-70' : ''}`}>
                                    {task}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Card Footer */}
                        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2">
                          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" /> {durationMins} Mins
                            </span>
                            <span className={isAllDone ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : ''}>
                              {completedInDay}/{tasks.length} Completed
                            </span>
                          </div>

                          {dayItem.pro_tip && (
                            <p className="text-[10px] font-bold text-amber-700 dark:text-amber-400 bg-amber-500/10 p-2 rounded-lg border border-amber-500/20 line-clamp-2">
                              ⚡ {dayItem.pro_tip}
                            </p>
                          )}

                          <button
                            onClick={() => {
                              setActiveDay(dayNum);
                              setViewMode('focus');
                            }}
                            className="w-full py-1.5 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/60 transition cursor-pointer text-center block"
                          >
                            Open Detailed Focus →
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 5. GOLDEN EXAM STRATEGY RULES */}
            {Array.isArray(plan.exam_strategy_rules) && plan.exam_strategy_rules.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/30 space-y-3.5">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <Zap className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-wider text-amber-900 dark:text-amber-200">
                      Golden Exam Strategy Rules for Next Test
                    </h4>
                    <p className="text-[11px] text-amber-700/80 dark:text-amber-300/80 font-medium">
                      Proven habits top rankers use to avoid silly mistakes and pacing penalties
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  {plan.exam_strategy_rules.map((rule, rIdx) => (
                    <div
                      key={rIdx}
                      className="p-3.5 rounded-xl bg-white/90 dark:bg-[#070e20] border border-amber-200 dark:border-amber-900/60 text-xs text-slate-800 dark:text-slate-200 leading-relaxed shadow-2xs space-y-1"
                    >
                      <div className="flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-black text-xs">
                        <span>Rule #{rIdx + 1}</span>
                      </div>
                      <p className="font-semibold">{rule}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. MOTIVATIONAL CLOSING NOTE */}
            {plan.motivational_note && (
              <div className="p-4 rounded-2xl text-center bg-gradient-to-r from-indigo-50/50 via-purple-50/50 to-emerald-50/50 dark:from-[#091124] dark:via-[#0c1530] dark:to-[#081326] border border-indigo-200/80 dark:border-indigo-900/60 shadow-2xs">
                <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-relaxed">
                  🚀 <span className="font-extrabold">{plan.motivational_note}</span>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
