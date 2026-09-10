import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { attemptService, aiTestService } from '../../lib/services.js';
import { isMultiSelectQuestion } from '../../lib/examPalette.js';
import { Skeleton, ErrorState } from '../../components/ui.jsx';
import { SubjectBar } from '../../components/design.jsx';
import { formatDateTime, attemptStatusLabel } from '../../lib/format.js';
import {
  FileText,
  Sparkles,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Target,
  BarChart3,
  Award,
  Zap,
  XCircle,
  HelpCircle,
  BookOpen,
  Printer,
  ChevronDown,
  ChevronUp,
  Filter,
  Check,
  X
} from 'lucide-react';
import AIInsightsCard from '../../components/candidate/AIInsightsCard.jsx';
import ScheduledTestsWidget from '../../components/candidate/ScheduledTestsWidget.jsx';
import AiTestResultsCard from '../../components/candidate/AiTestResultsCard.jsx';
import MathRenderer from '../../components/common/MathRenderer.jsx';
import { getMediaUrl } from '../../lib/media.js';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function ResultPage() {
  const { attemptId } = useParams();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [showSolutions, setShowSolutions] = useState(false);
  const [generatingAiTest, setGeneratingAiTest] = useState(false);
  const [aiTestResult, setAiTestResult] = useState(null);
  const [aiTestError, setAiTestError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const themeContext = useTheme();
  const isDarkMode = themeContext?.dark ?? false;

  const load = async () => {
    setState('loading');
    try {
      if (attemptId && attemptId.startsWith('ai-')) {
        const testId = attemptId.replace(/^ai-/, '');
        let storedResult = null;
        try {
          const raw = sessionStorage.getItem(`ai_test_result_${testId}`);
          if (raw) storedResult = JSON.parse(raw);
        } catch (_) {}

        if (storedResult) {
          setData({
            resultVisible: true,
            assessment: { title: 'AI Weak Topic Improvement Test' },
            attempt: {
              submitted_at: new Date().toISOString(),
              status: 'submitted',
              before_after_topics: storedResult.beforeAfterComparison,
              question_responses: storedResult.questionsWithExplanations,
            },
            score: storedResult.score,
            beforeAfterComparison: storedResult.beforeAfterComparison,
            questionsWithExplanations: storedResult.questionsWithExplanations,
          });
          setState('done');
          return;
        }
      }

      setData(await attemptService.getResult(attemptId));
      setState('done');
    } catch {
      setState('error');
    }
  };

  const handleGenerateAiTest = async () => {
    setGeneratingAiTest(true);
    setAiTestError(null);
    try {
      const studentId = data?.attempt?.candidate_id || data?.attempt?.student_id;
      const res = await aiTestService.generateTest(studentId, attemptId);
      setAiTestResult(res);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      const msg = err.response?.data?.message || err.message || 'Unable to generate AI improvement test.';
      setAiTestError(msg);
    } finally {
      setGeneratingAiTest(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  const breakdown = useMemo(() => {
    const score = data?.score;
    if (!score) return null;
    const total = score.correct_count + score.wrong_count + score.unattempted_count;
    if (!total) return null;
    return [
      { label: 'Correct', value: Math.round((score.correct_count / total) * 100), variant: 'strong' },
      { label: 'Wrong', value: Math.round((score.wrong_count / total) * 100), variant: 'weak' },
      { label: 'Unattempted', value: Math.round((score.unattempted_count / total) * 100), variant: 'default' },
    ];
  }, [data]);

  const attempt = data?.attempt;
  const assessment = data?.assessment;
  const score = data?.score;
  const resultVisible = data?.resultVisible;
  const solutions = data?.solutions;

  const accuracy = useMemo(() => {
    if (!score) return null;
    const attempted = score.correct_count + score.wrong_count;
    if (attempted === 0) return '0%';
    return `${Math.round((score.correct_count / attempted) * 100)}%`;
  }, [score]);

  const timeTakenStr = useMemo(() => {
    const secs = attempt?.duration_seconds;
    if (secs == null) return '—';
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}m ${remainingSecs}s`;
  }, [attempt]);

  const analyzedSolutions = useMemo(() => {
    if (!solutions || !Array.isArray(solutions)) return [];
    return solutions.map((q, idx) => {
      const isMulti = isMultiSelectQuestion(q);
      let isAttempted = false;
      if (isMulti || ['mcq', 'single_choice', 'multi_select', 'assertion_reason'].includes(q.question_type)) {
        isAttempted = isMulti
          ? (Array.isArray(q.your_answer) && q.your_answer.length > 0)
          : (q.your_answer !== null && q.your_answer !== undefined);
      } else if (['integer', 'numerical'].includes(q.question_type)) {
        isAttempted = q.your_answer !== null && q.your_answer !== undefined && q.your_answer !== '';
      } else if (q.question_type === 'coding' || q.question_type === 'subjective') {
        isAttempted = Boolean(q.your_answer && q.your_answer.trim());
      } else {
        isAttempted = q.your_answer !== null && q.your_answer !== undefined;
      }
      const isCorrect = Boolean(q.is_correct);
      const status = isCorrect ? 'correct' : (isAttempted ? 'wrong' : 'unattempted');

      return {
        ...q,
        _originalIndex: idx,
        _isAttempted: isAttempted,
        _isCorrect: isCorrect,
        _status: status
      };
    });
  }, [solutions]);

  const avgTimePerQuestion = useMemo(() => {
    const secs = attempt?.duration_seconds;
    const totalQ = solutions?.length || 0;
    if (!secs || !totalQ) return null;
    const avgSecs = Math.round(secs / totalQ);
    if (avgSecs >= 60) {
      return `${Math.floor(avgSecs / 60)}m ${avgSecs % 60}s / Q`;
    }
    return `${avgSecs}s / Q`;
  }, [attempt, solutions]);

  const studentPerformance = useMemo(() => {
    const pct = score?.percentage ?? 0;
    if (pct >= 80) {
      return {
        badge: 'Outstanding Mastery · Top Tier 🏆',
        color: 'text-emerald-700 dark:text-emerald-300 bg-emerald-500/15 border-emerald-500/30',
        gradient: 'from-emerald-500/10 via-emerald-500/5 to-transparent',
        note: 'Exceptional concept grasp and accuracy! Keep this momentum for upcoming competitive tests.'
      };
    }
    if (pct >= 60) {
      return {
        badge: 'Strong Performance · Target Achieved 🌟',
        color: 'text-blue-700 dark:text-blue-300 bg-blue-500/15 border-blue-500/30',
        gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
        note: 'Solid scoring across major topics. Review missed answers below to bridge high-yield gaps.'
      };
    }
    if (pct >= 40) {
      return {
        badge: 'Good Effort · Scope for Growth 👍',
        color: 'text-amber-700 dark:text-amber-300 bg-amber-500/15 border-amber-500/30',
        gradient: 'from-amber-500/10 via-amber-500/5 to-transparent',
        note: 'Good foundation. Regular practice on weak topics will elevate your score and percentile.'
      };
    }
    return {
      badge: 'Diagnostic Complete · Practice Recommended 💪',
      color: 'text-indigo-700 dark:text-indigo-300 bg-indigo-500/15 border-indigo-500/30',
      gradient: 'from-indigo-500/10 via-slate-500/5 to-transparent',
      note: 'Every test is a diagnostic learning step. Step through the detailed solutions below to master these concepts.'
    };
  }, [score]);

  const formattedScoreDisplay = useMemo(() => {
    if (!score) return '—';
    const formatVal = (val) => {
      if (val == null) return '0';
      const num = Number(val);
      if (isNaN(num)) return val;
      return Number.isInteger(num) ? num.toString() : num.toFixed(1);
    };
    const obtained = formatVal(score.marks_obtained);
    const total = formatVal(score.total_marks);
    return (
      <span className="inline-flex items-baseline gap-1 truncate max-w-full">
        <span className="text-xl sm:text-2xl font-black">{obtained}</span>
        <span className="text-xs sm:text-sm font-semibold text-slate-400 dark:text-slate-500">/ {total}</span>
      </span>
    );
  }, [score]);

  const cleanSubjectName = (str) => {
    if (!str || typeof str !== 'string') return null;
    const clean = str.trim();
    const lower = clean.toLowerCase();
    if (['general', 'general aptitude', 'general topics', 'default', 'uncategorized', 'section 1', 'section 2', 'section 3', 'all'].includes(lower)) {
      return null;
    }
    if (/chem/i.test(lower) || /organic|inorganic|physical chemistry|stoichiometry|bonding|chemical|electrochemistry|coordination|p-block|d-block|s-block|hydrocarbons/i.test(lower)) {
      return 'Chemistry';
    }
    if (/phys/i.test(lower) || /waves|optics|modern physics|mechanics|thermodynamics|electromagnetism|kinematics|gravitation|electrostatics|magnetism|current electricity|ac|units|measurements|fluid|work energy|rotation/i.test(lower)) {
      return 'Physics';
    }
    if (/math/i.test(lower) || /calculus|algebra|coordinate|trigonometry|vectors|3d|matrices|probability|statistics/i.test(lower)) {
      return 'Mathematics';
    }
    if (/botany/i.test(lower)) return 'Botany';
    if (/zoology/i.test(lower)) return 'Zoology';
    if (/bio/i.test(lower) || /genetics|ecology|human physiology|plant physiology|biotechnology|cell biology/i.test(lower)) {
      return 'Biology';
    }
    return clean;
  };

  const detectedPrimarySubject = useMemo(() => {
    const testTitle = (assessment?.title || assessment?.test_name || '').toLowerCase();
    let primary = cleanSubjectName(assessment?.subject);
    if (!primary) {
      if (/chem/i.test(testTitle)) primary = 'Chemistry';
      else if (/phys/i.test(testTitle)) primary = 'Physics';
      else if (/math/i.test(testTitle)) primary = 'Mathematics';
      else if (/botany/i.test(testTitle)) primary = 'Botany';
      else if (/zoology/i.test(testTitle)) primary = 'Zoology';
      else if (/bio/i.test(testTitle)) primary = 'Biology';
    }
    if (!primary && Array.isArray(solutions) && solutions.length > 0) {
      const detected = {};
      solutions.forEach((q) => {
        const s = cleanSubjectName(q.subject_name) || cleanSubjectName(q.subject) || cleanSubjectName(q.bank_category) || cleanSubjectName(q.section_name);
        if (s) detected[s] = (detected[s] || 0) + 1;
      });
      const keys = Object.keys(detected);
      if (keys.length === 1) {
        primary = keys[0];
      }
    }
    return primary;
  }, [assessment, solutions]);

  const subjectScores = useMemo(() => {
    if (!solutions || solutions.length === 0) return [];

    const getSubjectName = (q) => {
      const explicit = cleanSubjectName(q.subject_name)
        || cleanSubjectName(q.subject)
        || cleanSubjectName(q.bank_category)
        || cleanSubjectName(q.category)
        || cleanSubjectName(q.section_name);
      if (explicit) return explicit;
      if (detectedPrimarySubject) return detectedPrimarySubject;
      return 'General';
    };

    const map = {};
    solutions.forEach((q, idx) => {
      const sec = getSubjectName(q, idx);
      if (!map[sec]) {
        map[sec] = { name: sec, max: 0, obtained: 0, correct: 0, wrong: 0, unattempted: 0 };
      }
      map[sec].max += q.marks || 0;
      map[sec].obtained += q.marks_obtained || 0;

      // Classify attempts
      const isMulti = isMultiSelectQuestion(q);
      if (isMulti || ['mcq', 'single_choice', 'multi_select', 'assertion_reason'].includes(q.question_type)) {
        const isAttempted = isMulti
          ? (Array.isArray(q.your_answer) && q.your_answer.length > 0)
          : (q.your_answer !== null && q.your_answer !== undefined);
        if (!isAttempted) {
          map[sec].unattempted += 1;
        } else if (q.is_correct) {
          map[sec].correct += 1;
        } else {
          map[sec].wrong += 1;
        }
      } else if (['integer', 'numerical'].includes(q.question_type)) {
        if (q.your_answer === null || q.your_answer === undefined || q.your_answer === '') {
          map[sec].unattempted += 1;
        } else if (q.is_correct) {
          map[sec].correct += 1;
        } else {
          map[sec].wrong += 1;
        }
      } else if (q.question_type === 'coding') {
        if (!q.your_answer || !q.your_answer.trim()) {
          map[sec].unattempted += 1;
        } else if (q.marks_obtained === q.marks) {
          map[sec].correct += 1;
        } else {
          map[sec].wrong += 1;
        }
      } else if (q.question_type === 'subjective') {
        if (!q.your_answer || !q.your_answer.trim()) {
          map[sec].unattempted += 1;
        } else if (q.is_correct) {
          map[sec].correct += 1;
        } else {
          map[sec].wrong += 1;
        }
      }
    });
    return Object.values(map);
  }, [solutions, detectedPrimarySubject]);

  const topicScores = useMemo(() => {
    if (!solutions || solutions.length === 0) return {};

    const getSubjectName = (q) => {
      const explicit = cleanSubjectName(q.subject_name)
        || cleanSubjectName(q.subject)
        || cleanSubjectName(q.bank_category)
        || cleanSubjectName(q.category)
        || cleanSubjectName(q.section_name);
      if (explicit) return explicit;
      if (detectedPrimarySubject) return detectedPrimarySubject;
      return 'General';
    };

    const getTopicName = (q, subjName) => {
      let raw = q.topic || q.chapter || q.chapter_name || q.bank_category || '';
      let clean = raw.trim();
      if (!clean || ['general', 'general aptitude', 'default', 'uncategorized', 'section 1', 'section 2', 'section 3'].includes(clean.toLowerCase())) {
        return `${subjName} Core`;
      }
      if (clean.includes('_')) {
        clean = clean.split('_').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      }
      return clean;
    };

    const map = {};
    solutions.forEach((q, idx) => {
      const subj = getSubjectName(q);
      const topic = getTopicName(q, subj);

      if (!map[subj]) map[subj] = {};
      if (!map[subj][topic]) map[subj][topic] = { name: topic, correct: 0, attempted: 0, total: 0 };

      const t = map[subj][topic];
      t.total += 1;

      const isMulti = isMultiSelectQuestion(q);
      let isAttempted = false;
      if (isMulti || ['mcq', 'single_choice', 'multi_select', 'assertion_reason'].includes(q.question_type)) {
        isAttempted = isMulti
          ? (Array.isArray(q.your_answer) && q.your_answer.length > 0)
          : (q.your_answer !== null && q.your_answer !== undefined);
      } else if (['integer', 'numerical'].includes(q.question_type)) {
        isAttempted = q.your_answer !== null && q.your_answer !== undefined && q.your_answer !== '';
      } else if (q.question_type === 'coding' || q.question_type === 'subjective') {
        isAttempted = Boolean(q.your_answer && q.your_answer.trim());
      } else {
        isAttempted = q.your_answer !== null && q.your_answer !== undefined;
      }

      if (isAttempted) {
        t.attempted += 1;
        if (q.is_correct) {
          t.correct += 1;
        }
      }
    });

    const result = {};
    Object.entries(map).forEach(([subj, topicsMap]) => {
      result[subj] = Object.values(topicsMap).map((t) => {
        const accuracy = t.attempted > 0 ? Math.round((t.correct / t.attempted) * 100) : 0;
        return {
          name: t.name,
          accuracy,
          attempted: t.attempted,
          correct: t.correct,
          total: t.total,
        };
      });
    });
    return result;
  }, [solutions, detectedPrimarySubject]);

  const hasWeakTopics = useMemo(() => {
    if (!topicScores || Object.keys(topicScores).length === 0) return true;
    let found = false;
    Object.values(topicScores).forEach((topicsArr) => {
      topicsArr.forEach((t) => {
        if (t.accuracy < 60) found = true;
      });
    });
    return found;
  }, [topicScores]);

  useEffect(() => {
    if (assessment && score) {
      const weakTopicsList = [];
      const strongTopicsList = [];

      if (subjectScores && subjectScores.length > 0) {
        subjectScores.forEach((subj) => {
          const perc = subj.max > 0 ? (subj.obtained / subj.max) * 100 : 0;
          if (perc < 50) weakTopicsList.push(`${subj.name} (${Math.round(perc)}%)`);
          else if (perc >= 75) strongTopicsList.push(`${subj.name} (${Math.round(perc)}%)`);
        });
      }

      const activeCtx = {
        title: assessment?.title || assessment?.test_name || 'Assessment',
        score: `${score?.marks_obtained ?? 0} / ${score?.total_marks ?? 0}`,
        percentage: `${score?.percentage ?? 0}%`,
        accuracy: accuracy || '0%',
        correct: score?.correct_count ?? 0,
        wrong: score?.wrong_count ?? 0,
        unattempted: score?.unattempted_count ?? 0,
        weakTopics: weakTopicsList.length > 0 ? weakTopicsList : ['Needs calculation accuracy & speed improvement'],
        strongTopics: strongTopicsList.length > 0 ? strongTopicsList : ['General conceptual understanding'],
        timeTaken: timeTakenStr || ''
      };

      try {
        sessionStorage.setItem('active_test_context', JSON.stringify(activeCtx));
        window.dispatchEvent(new Event('active_test_context_updated'));
      } catch (_) {}
    }
  }, [assessment, score, accuracy, subjectScores, timeTakenStr]);

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#070c18] p-6 space-y-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <Skeleton className="h-14 w-full rounded-2xl" />
          <Skeleton className="h-72 w-full rounded-3xl" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
            <Skeleton className="h-28 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }
  if (state === 'error') return <ErrorState onRetry={load} />;

  const backTo = sessionStorage.getItem('assessmentReturn') || '/assessments';
  const backLabel = backTo.startsWith('/my-tests') ? 'Back to my tests' : 'Back to invited assessments';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#070c18] text-slate-900 dark:text-slate-100 transition-colors">
      {/* Student Top Header */}
      <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#0b1120]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-2xs print:hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to={backTo}
              className="inline-flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition shrink-0 text-xs font-bold"
              title={backLabel}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{backLabel}</span>
            </Link>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                Assessment Scorecard
              </span>
              <h1 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate">
                {assessment?.title || 'Test Results'}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition text-xs font-bold cursor-pointer"
              title="Print Scorecard"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span className="hidden md:inline">Print Scorecard</span>
            </button>
            <Link
              to="/dashboard"
              className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition"
            >
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 pb-20 space-y-6">
        {!resultVisible ? (
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-8 text-center shadow-xs">
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">{assessment.title}</h1>
            <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">Submission Received</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              Your assessment has been submitted successfully. Results will be published soon once evaluations are complete.
            </p>
            <p className="mt-4 text-xs text-slate-400 dark:text-slate-500">Submitted {formatDateTime(attempt.submitted_at)}</p>
          </div>
        ) : (
          <>
            {/* HERO SCORE SUMMARY CARD */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-xs overflow-hidden">
              {/* Top Banner Gradient & Status */}
              <div className={`p-6 sm:p-8 text-center relative overflow-hidden border-b border-slate-100 dark:border-slate-800/80 bg-gradient-to-b ${studentPerformance.gradient}`}>
                <div className="max-w-2xl mx-auto space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-block text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                      Performance Summary
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                      {assessment?.subject || assessment?.category || 'Candidate Assessment'}
                    </span>
                  </div>

                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                    {assessment.title}
                  </h1>

                  {/* Big Percentage & Score */}
                  <div className="py-2 flex flex-col items-center justify-center">
                    <span className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white tabular-nums">
                      {score ? `${score.percentage}%` : '0%'}
                    </span>
                    <span className="mt-1 text-sm font-bold text-slate-500 dark:text-slate-400">
                      Scored <span className="text-slate-900 dark:text-white font-extrabold">{score ? (Number.isInteger(Number(score.marks_obtained)) ? Number(score.marks_obtained) : Number(score.marks_obtained).toFixed(1)) : 0}</span> out of <span className="text-slate-900 dark:text-white font-extrabold">{score ? (Number.isInteger(Number(score.total_marks)) ? Number(score.total_marks) : Number(score.total_marks).toFixed(1)) : 0}</span> Marks
                    </span>
                  </div>

                  {/* Student Encouraging Performance Badge */}
                  <div className="flex flex-col items-center justify-center gap-2 pt-1">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider ${studentPerformance.color}`}>
                      {studentPerformance.badge}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-lg mx-auto font-medium">
                      {studentPerformance.note}
                    </p>
                  </div>

                  {/* Rank & Percentile Notice */}
                  {score?.rank != null && score?.percentile != null ? (
                    <div className="pt-2 flex items-center justify-center gap-4 text-xs sm:text-sm font-bold">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-500/10 text-blue-700 dark:text-blue-300 border border-blue-500/20">
                        <Award className="w-4 h-4 text-blue-600" />
                        All India Rank: #{score.rank}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 border border-indigo-500/20">
                        <Zap className="w-4 h-4 text-indigo-600" />
                        Percentile: {score.percentile}%
                      </span>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium pt-1">
                      📊 Rank & Percentile will update dynamically once more students complete this test.
                    </p>
                  )}
                </div>
              </div>

              {/* Grid of Student Metrics */}
              <div className="p-4 sm:p-6 lg:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 sm:gap-4">
                  <MetricCard
                    icon={Target}
                    label="Marks Scored"
                    value={formattedScoreDisplay}
                    subtext={`${score?.percentage || 0}% overall score`}
                    color="indigo"
                  />
                  <MetricCard
                    icon={Zap}
                    label="Accuracy"
                    value={accuracy ?? '0%'}
                    subtext={accuracy !== '0%' ? `${score?.correct_count ?? 0} of ${(score?.correct_count ?? 0) + (score?.wrong_count ?? 0)} attempted` : '0 attempted'}
                    color="blue"
                  />
                  <MetricCard
                    icon={CheckCircle2}
                    label="Correct"
                    value={score?.correct_count ?? 0}
                    subtext={score?.correct_count ? `+${score.correct_count * 4} marks gained` : '0 correct'}
                    color="emerald"
                  />
                  <MetricCard
                    icon={XCircle}
                    label="Incorrect"
                    value={score?.wrong_count ?? 0}
                    subtext={score?.wrong_count ? `-${score.wrong_count} negative marks` : 'Zero penalty'}
                    color="rose"
                  />
                  <MetricCard
                    icon={HelpCircle}
                    label="Unattempted"
                    value={score?.unattempted_count ?? 0}
                    subtext="Skipped questions"
                    color="amber"
                  />
                  <MetricCard
                    icon={Clock}
                    label="Time Taken"
                    value={timeTakenStr}
                    subtext={avgTimePerQuestion ? `Avg ${avgTimePerQuestion}` : 'Duration'}
                    color="purple"
                  />
                </div>

                {/* Optional proctoring notice if auto-submitted */}
                {(attempt?.violation_count > 0 || attempt?.status === 'auto_submitted' || attempt?.status === 'violations') && (
                  <div className="mt-5 flex items-center gap-2 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs font-medium text-amber-800 dark:text-amber-300">
                    <AlertCircle className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <span>
                      Notice: Assessment completed with {attempt.violation_count || 0} window violation warning(s). Status: <strong>{attemptStatusLabel[attempt.status] || attempt.status}</strong>.
                    </span>
                  </div>
                )}

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
                  Submitted on {formatDateTime(attempt.submitted_at)}
                </div>
              </div>
            </div>

            {/* STUDENT ACTION SHORTCUTS */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-xs">
              <div className="flex flex-wrap items-center gap-2.5">
                {solutions?.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setShowSolutions((s) => !s)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4" />
                    <span>{showSolutions ? 'Hide Question Solutions' : 'View Question Solutions'}</span>
                  </button>
                )}

                {assessment?.solution_pdf_url && (
                  <a
                    href={assessment.solution_pdf_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition"
                  >
                    <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span>Download Official PDF Solution</span>
                  </a>
                )}

                {score?.passed && (
                  <Link
                    to={`/certificates/${attempt.id}`}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition"
                  >
                    <Award className="w-4 h-4" />
                    <span>Get Certificate</span>
                  </Link>
                )}
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to="/analytics"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition"
                >
                  <BarChart3 className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                  <span>Performance Hub</span>
                </Link>
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition"
                >
                  <span>Dashboard</span>
                </Link>
              </div>
            </div>

            {/* AIETS GEMINI 2.5 AI REVISION & DIAGNOSTIC HUB */}
            <div>
              <AIInsightsCard isDarkMode={isDarkMode} testId={attemptId} />
            </div>

            {/* Performance Breakdown Progress Bar */}
            {breakdown && (
              <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Performance Distribution</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Proportion of correct, wrong, and unattempted responses</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-200/80 dark:border-slate-700/80">
                    {score ? score.correct_count + score.wrong_count + score.unattempted_count : 0} Total Qs
                  </span>
                </div>
                <div className="space-y-3">
                  {breakdown.map((b) => (
                    <SubjectBar key={b.label} label={b.label} value={b.value} variant={b.variant} />
                  ))}
                </div>
              </div>
            )}

            {/* Subject-wise Performance */}
            {subjectScores.length > 0 && (
              <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">Subject-wise Mastery</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Accuracy & marks breakdown across tested subject areas</p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 px-3 py-1 rounded-full">
                    {subjectScores.length} Subjects Analyzed
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {subjectScores.map((subj) => {
                    const pct = subj.max > 0 ? Math.max(0, Math.round((subj.obtained / subj.max) * 100)) : 0;
                    return (
                      <div key={subj.name} className="bg-slate-50/70 dark:bg-[#070c18] border border-slate-200/80 dark:border-slate-800 p-4 rounded-2xl space-y-3 hover:border-blue-500/30 transition-colors">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-extrabold text-slate-900 dark:text-slate-100 text-sm">{subj.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Score: {subj.obtained.toFixed(2)} / {subj.max}</p>
                          </div>
                          <span className={`text-xs font-extrabold px-2.5 py-0.5 rounded-lg border ${
                            pct >= 70
                              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                              : pct >= 50
                              ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                              : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                          }`}>
                            {pct}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              pct >= 70 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 pt-1">
                          <span className="text-emerald-600 dark:text-emerald-400">✓ {subj.correct} Correct</span>
                          <span className="text-rose-600 dark:text-rose-400">✗ {subj.wrong} Wrong</span>
                          <span>— {subj.unattempted} Skipped</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Topic-wise Precision */}
            {Object.keys(topicScores).length > 0 && (
              <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-5 sm:p-6 shadow-xs space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">Topic-level Precision</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Detailed conceptual accuracy breakdown for pinpoint revision</p>
                </div>

                <div className="space-y-4">
                  {Object.entries(topicScores).map(([subjName, topics]) => (
                    <div key={subjName} className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#071126] p-4 sm:p-5 font-mono shadow-xs transition-colors">
                      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-2.5 mb-3">
                        <p className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base tracking-wide">{subjName}</p>
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 font-sans">
                          {topics.length} Topics
                        </span>
                      </div>

                      <div className="space-y-1 text-xs sm:text-sm">
                        {topics.map((t, idx) => {
                          const isLast = idx === topics.length - 1;
                          const branchSymbol = isLast ? '└──' : '├──';

                          let accuracyColor = 'text-emerald-600 dark:text-emerald-400';
                          if (t.accuracy < 50) accuracyColor = 'text-rose-600 dark:text-rose-400';
                          else if (t.accuracy < 75) accuracyColor = 'text-amber-600 dark:text-amber-400';

                          return (
                            <div key={t.name} className="flex items-center justify-between py-1.5 px-2 rounded-xl hover:bg-slate-200/60 dark:hover:bg-slate-800/50 transition-colors">
                              <div className="flex items-center gap-2 overflow-hidden">
                                <span className="text-slate-400 dark:text-slate-500 font-bold select-none">{branchSymbol}</span>
                                <span className="truncate text-slate-800 dark:text-slate-200 font-semibold">{t.name}</span>
                              </div>
                              <div className="flex items-center gap-3 shrink-0">
                                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-sans font-medium">
                                  ({t.correct}/{t.attempted > 0 ? t.attempted : t.total})
                                </span>
                                <span className={`font-extrabold text-xs sm:text-sm min-w-[42px] text-right ${accuracyColor}`}>
                                  {t.accuracy}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* WEAK TOPIC BOOSTER TEST GENERATOR CARD */}
            <div className="rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 shrink-0">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="space-y-0.5">
                    <h3 className="font-extrabold text-slate-900 dark:text-white text-base">Weak Topic Improvement Test</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl leading-relaxed">
                      Generate fresh questions targeting your weak areas (&lt;60% accuracy). Scheduled with 2–3 days spaced repetition so you have time to revise first.
                    </p>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    type="button"
                    disabled={generatingAiTest || !hasWeakTopics}
                    onClick={handleGenerateAiTest}
                    className={`px-4 py-2.5 rounded-xl font-bold text-xs shadow-xs flex items-center gap-2 transition cursor-pointer ${
                      generatingAiTest || !hasWeakTopics
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed border border-slate-200 dark:border-slate-700'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                    }`}
                  >
                    {generatingAiTest ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
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

              {!hasWeakTopics && (
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
                  ℹ️ All topics currently show high accuracy (≥60%). Great job!
                </div>
              )}

              {aiTestError && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 text-xs font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 dark:text-rose-400" />
                  <span>{aiTestError}</span>
                </div>
              )}

              {aiTestResult && (
                <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-700 dark:text-emerald-300 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Improvement Test Scheduled</span>
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
                studentId={attempt?.candidate_id || data?.attempt?.candidate_id}
                onRefreshTrigger={refreshTrigger}
              />
            </div>

            {/* BEFORE VS AFTER ACCURACY COMPARISON */}
            {(data?.attempt?.before_after_topics || data?.beforeAfterComparison) && (
              <div>
                <AiTestResultsCard
                  beforeAfterComparison={data?.attempt?.before_after_topics || data?.beforeAfterComparison}
                  questionsWithExplanations={data?.attempt?.question_responses || data?.questionsWithExplanations}
                />
              </div>
            )}

            {/* SOLUTIONS ACCORDION VIEW */}
            {(solutions?.length > 0 || assessment?.solution_pdf_url) && (
              <div id="solutions-section" className="space-y-4">
                {showSolutions && solutions?.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 sm:p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-xs">
                      <div>
                        <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          Detailed Question Solutions ({solutions.length})
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                          Step-by-step explanations, key formulas, and verified answer keys
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowSolutions(false)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer self-start sm:self-auto"
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span>Hide Solutions</span>
                      </button>
                    </div>

                    {/* Quick Question Jump Palette */}
                    <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-xs space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Jump to Question:
                        </span>
                        <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                          <span className="inline-flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Correct
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-rose-500" /> Wrong
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600" /> Skipped
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {analyzedSolutions.map((q, idx) => (
                          <button
                            key={q.id || idx}
                            type="button"
                            onClick={() => {
                              const el = document.getElementById(`sol-q-${idx}`);
                              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }}
                            className={`w-8 h-8 rounded-xl text-xs font-bold transition flex items-center justify-center border cursor-pointer ${
                              q._status === 'correct'
                                ? 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/25'
                                : q._status === 'wrong'
                                ? 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30 hover:bg-rose-500/25'
                                : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-slate-800'
                            }`}
                            title={`Q${idx + 1} (${q._status})`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                    </div>

                    {analyzedSolutions.map((q) => {
                      const originalIdx = q._originalIndex ?? 0;
                      const opts = Array.isArray(q.options) ? q.options : [];
                      const isMulti = isMultiSelectQuestion(q);
                      return (
                        <div
                          key={q.id || originalIdx}
                          id={`sol-q-${originalIdx}`}
                          className={`rounded-2xl border bg-white dark:bg-[#0f172a] p-5 sm:p-6 shadow-xs border-l-4 transition-all scroll-mt-24 ${
                            q._isCorrect
                              ? 'border-slate-200/90 dark:border-slate-800 border-l-emerald-500 dark:border-l-emerald-400'
                              : q._isAttempted
                              ? 'border-slate-200/90 dark:border-slate-800 border-l-rose-500 dark:border-l-rose-400'
                              : 'border-slate-200/90 dark:border-slate-800 border-l-slate-400 dark:border-l-slate-600'
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xs sm:text-sm font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 px-2.5 py-0.5 rounded-lg">
                                Question {originalIdx + 1}
                              </span>
                              {(q.topic || q.category || q.section_name) && (
                                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                                  {q.topic || q.category || q.section_name}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                                {q._isCorrect ? '+4.0 Marks' : q._isAttempted ? '-1.0 Negative' : '0.0 Marks'}
                              </span>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                                q._isCorrect
                                  ? 'bg-emerald-500/15 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/30'
                                  : q._isAttempted
                                  ? 'bg-rose-500/15 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-500/30'
                                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
                              }`}>
                                {q._isCorrect ? 'Correct ✓' : q._isAttempted ? 'Incorrect ✗' : 'Skipped —'}
                              </span>
                            </div>
                          </div>

                          <div className="text-slate-900 dark:text-slate-100 leading-relaxed font-semibold text-sm sm:text-base">
                            <MathRenderer text={q.question_text} />
                          </div>

                          {q.image_url && (
                            <div className="mt-3.5">
                              <img
                                src={getMediaUrl(q.image_url)}
                                alt={`Question ${originalIdx + 1} diagram`}
                                className="max-h-64 rounded-xl border border-slate-300 dark:border-slate-700 object-contain cursor-zoom-in bg-white dark:bg-slate-900 p-1"
                                onClick={() => window.open(getMediaUrl(q.image_url), '_blank')}
                              />
                            </div>
                          )}

                          {opts.length > 0 && (
                            <ul className="mt-4 space-y-2 text-sm">
                              {opts.map((opt, oi) => {
                                const isCorrect = isMulti
                                  ? (Array.isArray(q.correct_indices) ? q.correct_indices.map(Number).includes(oi) : Number(q.correct_index) === oi)
                                  : (q.correct_index != null && Number(q.correct_index) === oi);
                                let isYours = false;
                                if (isMulti) {
                                  const arr = Array.isArray(q.your_answer) ? q.your_answer.map(Number) : (q.your_answer != null ? [Number(q.your_answer)] : []);
                                  isYours = arr.includes(oi);
                                } else {
                                  isYours = q.your_answer !== null && q.your_answer !== undefined && Number(q.your_answer) === oi;
                                }

                                const optText = typeof opt === 'object' ? (opt.text ?? '') : String(opt ?? '');
                                const optMedia = (typeof opt === 'object' && Array.isArray(opt.media)) ? opt.media : [];

                                return (
                                  <li
                                    key={oi}
                                    className={`rounded-xl px-3.5 py-2.5 transition-all flex items-center justify-between gap-3 ${
                                      isCorrect
                                        ? 'bg-emerald-500/10 text-emerald-950 dark:bg-emerald-950/60 dark:text-emerald-200 border-2 border-emerald-500 font-bold'
                                        : isYours
                                        ? 'bg-rose-500/10 text-rose-950 dark:bg-rose-950/60 dark:text-rose-200 border border-rose-500/50 font-bold'
                                        : 'text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60'
                                    }`}
                                  >
                                    <span className="flex items-center gap-2 flex-1">
                                      <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[11px] font-bold ${
                                        isCorrect
                                          ? 'bg-emerald-500 text-white'
                                          : isYours
                                          ? 'bg-rose-500 text-white'
                                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                                      }`}>
                                        {String.fromCharCode(65 + oi)}
                                      </span>
                                      <div className="flex-1">
                                        <MathRenderer text={optText} />
                                        {optMedia.length > 0 && optMedia[0]?.url && (
                                          <div className="mt-1">
                                            <img
                                              src={getMediaUrl(optMedia[0].url)}
                                              alt={`Option ${String.fromCharCode(65 + oi)} diagram`}
                                              className="max-h-24 rounded border border-slate-300 object-contain bg-white p-0.5"
                                            />
                                          </div>
                                        )}
                                      </div>
                                    </span>
                                    <span className="shrink-0 font-extrabold text-xs flex items-center gap-2">
                                      {isCorrect && (
                                        <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                                          <Check className="w-3.5 h-3.5" /> Correct Answer
                                        </span>
                                      )}
                                      {isYours && (
                                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-extrabold uppercase border ${
                                          isCorrect
                                            ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30'
                                            : 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/30'
                                        }`}>
                                          Your Choice
                                        </span>
                                      )}
                                    </span>
                                  </li>
                                );
                              })}
                            </ul>
                          )}

                          {['integer', 'numerical'].includes(q.question_type) && (
                            <div className="mt-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 p-3.5 text-sm space-y-1.5">
                              <p><span className="font-semibold text-slate-700 dark:text-slate-300">Your Answer:</span> {q.your_answer != null ? <span className="font-mono font-bold text-slate-900 dark:text-white">{q.your_answer}</span> : <span className="text-slate-400 dark:text-slate-500">Unattempted</span>}</p>
                              <p><span className="font-semibold text-emerald-700 dark:text-emerald-400">Correct Answer:</span> <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">{q.numeric_answer != null ? q.numeric_answer : 'N/A'}</span> {q.question_type === 'numerical' && q.numerical_tolerance ? `(±${q.numerical_tolerance})` : ''}</p>
                            </div>
                          )}

                          {['coding', 'subjective'].includes(q.question_type) && q.your_answer && (
                            <pre className="mt-3.5 overflow-x-auto rounded-xl bg-slate-100 dark:bg-slate-900/80 p-3.5 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-mono">{q.your_answer}</pre>
                          )}

                          {(q.solution || q.solution_image_url) && (
                            <div className="mt-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 p-4 text-sm text-blue-950 dark:text-blue-100 space-y-2">
                              {q.solution && (
                                <div>
                                  <strong className="text-blue-700 dark:text-blue-400 flex items-center gap-1.5 mb-1.5 font-extrabold text-xs uppercase tracking-wider">
                                    <Sparkles className="w-3.5 h-3.5" /> Step-by-Step Explanation
                                  </strong>
                                  <div className="leading-relaxed whitespace-pre-line text-slate-800 dark:text-slate-200 font-medium">
                                    <MathRenderer text={q.solution} />
                                  </div>
                                </div>
                              )}
                              {q.solution_image_url && (
                                <div className="pt-2 border-t border-blue-200/60 dark:border-blue-900/40">
                                  <strong className="text-blue-700 dark:text-blue-400 block mb-1 text-xs font-bold uppercase tracking-wider">
                                    Formula & Solution Diagram:
                                  </strong>
                                  <img
                                    src={getMediaUrl(q.solution_image_url)}
                                    alt="Solution Diagram"
                                    className="max-h-80 rounded-xl border border-blue-200 dark:border-blue-900 object-contain cursor-zoom-in bg-white dark:bg-slate-900 p-1"
                                    onClick={() => window.open(getMediaUrl(q.solution_image_url), '_blank')}
                                  />
                                  <span className="text-[11px] text-blue-600 dark:text-blue-400 block mt-1">
                                    Click diagram to view full resolution
                                  </span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function MetricCard({ icon: Icon, label, value, subtext, color = 'blue' }) {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-900/50',
    emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50',
    rose: 'bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-900/50',
    amber: 'bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-900/50',
    indigo: 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900/50',
    purple: 'bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400 border-purple-200 dark:border-purple-900/50',
  };

  return (
    <div className="rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/70 dark:bg-[#070c18] p-3.5 sm:p-4 flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700 min-w-0 overflow-hidden shadow-2xs">
      <div className="flex items-center justify-between gap-1.5 min-w-0">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 truncate">
          {label}
        </span>
        {Icon && (
          <span className={`p-1.5 sm:p-2 rounded-xl border shrink-0 ${colorMap[color] || colorMap.blue}`}>
            <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </span>
        )}
      </div>
      <div className="mt-2.5 sm:mt-3 min-w-0">
        <div className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tabular-nums truncate tracking-tight">
          {value}
        </div>
        {subtext && (
          <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate" title={typeof subtext === 'string' ? subtext : undefined}>
            {subtext}
          </p>
        )}
      </div>
    </div>
  );
}
