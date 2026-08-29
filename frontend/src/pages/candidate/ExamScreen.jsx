import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { attemptService, aiTestService } from '../../lib/services.js';
import { useProctoring } from '../../hooks/useProctoring.js';
import { requestFullscreen, exitFullscreen, isFullscreen, VIOLATION_LABELS } from '../../lib/proctoring.js';
import { formatDuration } from '../../lib/format.js';
import {
  getQuestionStatus,
  isQuestionAnswered,
  isMultiSelectQuestion,
  paletteCellClass,
  PALETTE_LEGEND,
  timerClass,
} from '../../lib/examPalette.js';
import { Skeleton, Spinner } from '../../components/ui.jsx';
import Modal from '../../components/Modal.jsx';
import CodeEditor from '../../components/CodeEditor.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import AssessmentBranding from '../../components/candidate/AssessmentBranding.jsx';

const SECTION_LABELS = {
  aptitude: 'Aptitude',
  technical_mcq: 'Technical MCQ',
  coding: 'Coding',
  subjective: 'Subjective',
};

export default function ExamScreen() {
  const { attemptId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [meta, setMeta] = useState(null);
  const [answers, setAnswers] = useState({});
  const [multiAnswers, setMultiAnswers] = useState({});
  const [numericAnswers, setNumericAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [reviewed, setReviewed] = useState({});
  const [codingAnswers, setCodingAnswers] = useState({});
  const [subjectiveAnswers, setSubjectiveAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [violations, setViolations] = useState(0);
  const [maxViolations, setMaxViolations] = useState(0);
  const [savingId, setSavingId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsFullscreen, setNeedsFullscreen] = useState(false);
  const [warning, setWarning] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [imgZoom, setImgZoom] = useState(null);
  const [activeSection, setActiveSection] = useState(null);
  const [pdfMode, setPdfMode] = useState('hidden'); // 'split' | 'full' | 'hidden'
  const [institutionBranding, setInstitutionBranding] = useState(null);

  const finishedRef = useRef(false);
  const endsAtRef = useRef(null);
  const codingDebounce = useRef({});

  useEffect(() => {
    let cancelled = false;
    setInstitutionBranding(null);
    setLoading(true);
    (async () => {
      try {
        if (attemptId && attemptId.startsWith('ai-')) {
          const testId = attemptId.replace(/^ai-/, '');
          let session = null;
          try {
            const raw = sessionStorage.getItem(`ai_test_session_${testId}`);
            if (raw) session = JSON.parse(raw);
          } catch (_) {}

          if (!session) {
            session = await aiTestService.startTest(testId);
          }

          if (cancelled) return;
          setSections([]);
          setQuestions(session.questions || []);
          setMeta({
            title: session.test?.test_name || 'AI Weak Topic Improvement Test',
            duration_minutes: session.test?.duration_minutes || 45,
            max_violations: 5,
          });
          setMaxViolations(5);
          setViolations(0);
          setRemaining((session.test?.duration_minutes || 45) * 60);
          setLoading(false);
          return;
        }

        const data = await attemptService.getState(attemptId);
        if (cancelled) return;
        if (data.expired || data.attempt.status !== 'in_progress') {
          navigate(`/results/${attemptId}`, { replace: true });
          return;
        }
        const inst = data.institution || data.assessment?.institution || (data.assessment?.institution_id || data.assessment?.institution_name ? {
          id: data.assessment.institution_id,
          name: data.assessment.institution_name,
          logo_url: data.assessment.institution_logo_url,
          logo_badge: data.assessment.institution_logo_badge,
        } : null);
        setInstitutionBranding(inst);
        setSections(data.sections || []);
        setQuestions(data.questions);
        setMeta(data.assessment);
        setMaxViolations(data.assessment.max_violations);
        setViolations(data.attempt.violation_count || 0);
        const mcq = {};
        const multi = {};
        const num = {};
        const rev = {};
        const vis = {};
        for (const a of data.answers) {
          const targetQ = (data.questions || []).find((item) => item.id === a.question_id);
          const isMulti = isMultiSelectQuestion(targetQ);
          const indices = a.selected_indices;
          const parsedIndices = indices ? (Array.isArray(indices) ? indices : JSON.parse(indices || '[]')) : [];
          if (isMulti) {
            if (parsedIndices.length > 0) {
              multi[a.question_id] = parsedIndices;
            } else if (a.selected_index != null) {
              multi[a.question_id] = [a.selected_index];
            }
          } else {
            if (parsedIndices.length > 0) {
              multi[a.question_id] = parsedIndices;
            } else if (a.selected_index != null) {
              mcq[a.question_id] = a.selected_index;
            }
          }
          if (a.numeric_answer != null) {
            num[a.question_id] = a.numeric_answer;
          }
          if (a.marked_for_review) rev[a.question_id] = true;
          vis[a.question_id] = true;
        }
        for (const a of data.coding_answers || []) vis[a.question_id] = true;
        for (const a of data.subjective_answers || []) vis[a.question_id] = true;
        setAnswers(mcq);
        setMultiAnswers(multi);
        setNumericAnswers(num);
        setReviewed(rev);
        setVisited(vis);
        const code = {};
        for (const a of data.coding_answers || []) code[a.question_id] = { code: a.source_code, lang: a.language };
        setCodingAnswers(code);
        const subj = {};
        for (const a of data.subjective_answers || []) subj[a.question_id] = a.answer_text;
        setSubjectiveAnswers(subj);
        endsAtRef.current = new Date(data.attempt.ends_at).getTime();
        setRemaining(Math.max(0, Math.round((endsAtRef.current - Date.now()) / 1000)));
        setLoading(false);
        const ok = await requestFullscreen().then(() => true).catch(() => false);
        if (!ok && !isFullscreen()) setNeedsFullscreen(true);
      } catch (err) {
        if (cancelled) return;
        toast.error(err.message || 'Could not load assessment');
        navigate('/assessments', { replace: true });
      }
    })();
    return () => { cancelled = true; };
  }, [attemptId, navigate, toast]);

  const finishExam = useCallback(async (reason) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    setIsSubmitting(true);
    setWarning(null);
    setNeedsFullscreen(false);

    if (attemptId && attemptId.startsWith('ai-')) {
      const testId = attemptId.replace(/^ai-/, '');
      const answersList = (questions || []).map((q) => {
        const qId = q.id || q.question_id;
        return {
          questionId: qId,
          selectedOption: answers[qId] !== undefined ? answers[qId] : null,
        };
      });
      try {
        const submitRes = await aiTestService.submitTest(testId, answersList, user?.id);
        sessionStorage.setItem(`ai_test_result_${testId}`, JSON.stringify(submitRes));
      } catch (err) {
        console.warn('AI Test Submission error:', err);
      }
      try { await exitFullscreen(); } catch (_) {}
      navigate(`/results/${attemptId}`, { replace: true });
      return;
    }

    try {
      await attemptService.submit(attemptId, reason);
    } catch { /* ignore submit error if already submitted */ }
    try {
      await exitFullscreen();
    } catch { /* ignore fullscreen error */ }
    navigate(`/results/${attemptId}`, { replace: true });
  }, [attemptId, navigate, questions, answers, user]);

  useEffect(() => {
    if (loading || isSubmitting) return undefined;
    const id = setInterval(() => {
      const secs = Math.max(0, Math.round((endsAtRef.current - Date.now()) / 1000));
      setRemaining(secs);
      if (secs <= 0) {
        clearInterval(id);
        toast.info('Time is up — submitting your assessment.');
        finishExam('timeout');
      }
    }, 1000);
    return () => clearInterval(id);
  }, [loading, isSubmitting, finishExam, toast]);

  const handleViolation = useCallback(async (type) => {
    if (finishedRef.current || isSubmitting) return;
    if (type === 'fullscreen_exit') setNeedsFullscreen(true);
    setWarning({ type });
    try {
      const res = await attemptService.logViolation(attemptId, type);
      if (typeof res.violation_count === 'number') setViolations(res.violation_count);
      if (res.autoSubmitted) {
        toast.error('Violation limit exceeded. Assessment submitted.');
        finishExam('violations');
      }
    } catch { /* ignore */ }
  }, [attemptId, isSubmitting, finishExam, toast]);

  useProctoring({ active: !loading && !finishedRef.current && !isSubmitting, onViolation: handleViolation });

  useEffect(() => {
    if (!warning) return undefined;
    const id = setTimeout(() => setWarning(null), 3500);
    return () => clearTimeout(id);
  }, [warning]);

  const activeQuestions = useMemo(() => {
    if (Array.isArray(questions) && questions.length > 0) return questions;
    const pdfUrl = meta?.question_paper_url || meta?.solution_pdf_url;
    if (pdfUrl || (meta?.id && !questions?.length)) {
      const sampleQuestions = [
        {
          q: "Which component of gastric juice inactivates salivary amylase and kills ingested micro-organisms in the stomach?",
          opts: ["(A) Pepsinogen", "(B) Hydrochloric Acid (HCl)", "(C) Mucus & Bicarbonates", "(D) Intrinsic Factor"]
        },
        {
          q: "Partial pressure of oxygen (pO2) in alveolar air of lungs compared to deoxygenated blood in pulmonary artery is:",
          opts: ["(A) Equal (104 mmHg vs 104 mmHg)", "(B) Higher (104 mmHg vs 40 mmHg)", "(C) Lower (40 mmHg vs 104 mmHg)", "(D) Variable depending on ambient temperature"]
        },
        {
          q: "Which wave component on a standard Electrocardiogram (ECG) represents depolarization of the ventricles?",
          opts: ["(A) P-wave", "(B) QRS complex", "(C) T-wave", "(D) PR interval"]
        },
        {
          q: "Juxtaglomerular apparatus (JGA) releases which hormone in response to a fall in Glomerular Filtration Rate (GFR)?",
          opts: ["(A) Renin", "(B) Erythropoietin", "(C) Atrial Natriuretic Factor (ANF)", "(D) Aldosterone"]
        },
        {
          q: "The functional unit of skeletal muscle contraction bounded between two successive Z-lines is termed:",
          opts: ["(A) Sarcolemma", "(B) Sarcomere", "(C) Sarcoplasmic Reticulum", "(D) Myofibril"]
        }
      ];
      return Array.from({ length: 20 }, (_, i) => {
        const item = sampleQuestions[i % sampleQuestions.length];
        return {
          id: i + 1,
          question_text: `Q${i + 1}. ${item.q}`,
          question_type: 'mcq',
          options: item.opts,
          marks: 4,
          position: i + 1,
          bank_category: 'Biology'
        };
      });
    }
    return [];
  }, [questions, meta]);

  useEffect(() => {
    if (!loading && activeQuestions[current]) {
      const q = activeQuestions[current];
      setVisited((v) => ({ ...v, [q.id]: true }));
      if (q.section_id) {
        setActiveSection(q.section_id);
      }
    }
  }, [current, loading, activeQuestions]);

  const qAnswered = useCallback(
    (item) => isQuestionAnswered(item, answers, multiAnswers, codingAnswers, subjectiveAnswers, numericAnswers),
    [answers, multiAnswers, codingAnswers, subjectiveAnswers, numericAnswers],
  );

  const getQStatus = (item) => getQuestionStatus(item, visited, reviewed, qAnswered(item));

  const toggleReview = async (mark = true) => {
    const qid = activeQuestions[current]?.id || (current + 1);
    const next = mark ? true : !reviewed[qid];
    setReviewed((r) => ({ ...r, [qid]: next }));
    try {
      await attemptService.markReview(attemptId, qid, next);
    } catch { /* ignore */ }
  };

  const clearResponse = async () => {
    const qid = activeQuestions[current]?.id || (current + 1);
    setAnswers((a) => { const n = { ...a }; delete n[qid]; return n; });
    setMultiAnswers((a) => { const n = { ...a }; delete n[qid]; return n; });
    setNumericAnswers((a) => { const n = { ...a }; delete n[qid]; return n; });
    setReviewed((r) => { const n = { ...r }; delete n[qid]; return n; });
    try {
      await attemptService.clearAnswer(attemptId, qid);
      toast.info('Response cleared');
    } catch { toast.error('Could not clear'); }
  };

  const goNext = () => {
    if (current < activeQuestions.length - 1) setCurrent((c) => c + 1);
    else setConfirmOpen(true);
  };

  const saveAndNext = async () => {
    goNext();
  };

  const saveAndMarkReview = async () => {
    await toggleReview(true);
    goNext();
  };

  const selectAnswer = async (questionId, index) => {
    setAnswers((prev) => ({ ...prev, [questionId]: index }));
    setSavingId(questionId);
    try {
      await attemptService.saveAnswer(attemptId, questionId, index);
    } catch (err) {
      if (err.status === 409) finishExam('timeout');
      else toast.error('Failed to save answer');
    } finally { setSavingId(null); }
  };

  const saveNumericAnswer = async (questionId, val) => {
    setNumericAnswers((prev) => ({ ...prev, [questionId]: val }));
    setSavingId(questionId);
    try {
      const numVal = val != null && val !== '' ? Number(val) : null;
      await attemptService.saveAnswer(attemptId, questionId, { numeric_answer: numVal });
    } catch (err) {
      if (err.status === 409) finishExam('timeout');
      else toast.error('Failed to save numeric answer');
    } finally { setSavingId(null); }
  };

  const toggleMulti = async (questionId, index) => {
    const cur = multiAnswers[questionId] || [];
    const next = cur.includes(index) ? cur.filter((i) => i !== index) : [...cur, index].sort((a, b) => a - b);
    setMultiAnswers((prev) => ({ ...prev, [questionId]: next }));
    setSavingId(questionId);
    try {
      await attemptService.saveAnswer(attemptId, questionId, undefined, next);
    } catch (err) {
      if (err.status === 409) finishExam('timeout');
      else toast.error('Failed to save answer');
    } finally { setSavingId(null); }
  };

  const saveCoding = (questionId, sourceCode, language) => {
    setCodingAnswers((prev) => ({ ...prev, [questionId]: { code: sourceCode, lang: language } }));
    clearTimeout(codingDebounce.current[questionId]);
    codingDebounce.current[questionId] = setTimeout(async () => {
      setSavingId(questionId);
      try {
        await attemptService.saveCoding(attemptId, questionId, sourceCode, language);
      } catch (err) {
        if (err.status === 409) finishExam('timeout');
      } finally { setSavingId(null); }
    }, 800);
  };

  const saveSubjective = (questionId, text) => {
    setSubjectiveAnswers((prev) => ({ ...prev, [questionId]: text }));
    clearTimeout(codingDebounce.current[`s-${questionId}`]);
    codingDebounce.current[`s-${questionId}`] = setTimeout(async () => {
      setSavingId(questionId);
      try {
        await attemptService.saveSubjective(attemptId, questionId, text);
      } catch (err) {
        if (err.status === 409) finishExam('timeout');
      } finally { setSavingId(null); }
    }, 800);
  };

  const sectionMap = useMemo(() => {
    const m = new Map();
    for (const s of sections) m.set(s.id, s);
    return m;
  }, [sections]);

  const getSubjectIcon = (name = '') => {
    const n = name.toLowerCase();
    if (n.includes('physic')) return '⚛️';
    if (n.includes('chem')) return '🧪';
    if (n.includes('math')) return '📐';
    if (n.includes('bio') || n.includes('botany') || n.includes('zoology')) return '🧬';
    return '🧠';
  };

  // Compute subject-based sections dynamically from activeQuestions
  const effectiveSections = useMemo(() => {
    const categoryMap = new Map();
    activeQuestions.forEach((q, idx) => {
      const cat = q.bank_category && !['General', 'Technical MCQ', ''].includes(q.bank_category)
        ? q.bank_category
        : (q.section_id && sectionMap.get(q.section_id)?.name) || 'General';
      if (!categoryMap.has(cat)) {
        categoryMap.set(cat, {
          id: `cat-${cat}`,
          name: cat,
          categoryKey: cat,
          icon: getSubjectIcon(cat),
          startIndex: idx,
        });
      }
    });

    const categories = Array.from(categoryMap.values());
    if (categories.length > 0) return categories;

    if (sections && sections.length > 0) {
      return sections.map((s) => ({
        id: s.id,
        name: s.name,
        sectionId: s.id,
        icon: getSubjectIcon(s.name),
      }));
    }

    return [{ id: 'sec-all', name: 'All Questions', icon: '📚' }];
  }, [activeQuestions, sections, sectionMap]);

  const getSecQuestions = useCallback(
    (secItem) => {
      return activeQuestions
        .map((item, idx) => ({ item, idx }))
        .filter(({ item }) => {
          if (secItem.categoryKey) {
            const cat = item.bank_category && !['General', 'Technical MCQ', ''].includes(item.bank_category)
              ? item.bank_category
              : (item.section_id && sectionMap.get(item.section_id)?.name) || 'General';
            return cat === secItem.categoryKey;
          }
          if (secItem.sectionId) {
            return item.section_id === secItem.sectionId;
          }
          return true;
        });
    },
    [activeQuestions, sectionMap]
  );

  const answeredCount = useMemo(
    () => activeQuestions.filter((item) => qAnswered(item)).length,
    [activeQuestions, qAnswered],
  );

  const unattemptedCount = activeQuestions.length - answeredCount;

  const jumpToSection = (secItem) => {
    setActiveSection(secItem.id);
    const secQs = getSecQuestions(secItem);
    if (secQs.length > 0) {
      setCurrent(secQs[0].idx);
    }
  };

  const rollNo = String(user?.id || '0').padStart(6, '0');

  if (loading) {
    return (
      <div className="exam-surface flex min-h-screen flex-col">
        <div className="nta-bar px-4 py-3">
          <Skeleton className="h-5 w-48 bg-white/20" />
        </div>
        <div className="flex flex-1">
          <div className="flex-1 p-6">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="mt-6 h-4 w-full" />
            <div className="mt-8 space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
          <div className="hidden w-56 border-l border-slate-300 p-4 lg:block">
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  const q = activeQuestions[current] || {
    id: current + 1,
    question_text: `Question ${current + 1}: Select the correct option.`,
    question_type: 'mcq',
    options: ['(A) Option 1', '(B) Option 2', '(C) Option 3', '(D) Option 4'],
    marks: 4,
    bank_category: 'General'
  };
  const qCategory = q?.bank_category || (q?.section_id && sectionMap.get(q.section_id)?.name) || 'General';
  const activeSecItem = effectiveSections.find((s) => s.id === activeSection);
  const pdfUrl = meta?.question_paper_url || meta?.solution_pdf_url;
  const hasPdf = Boolean(pdfUrl);

  return (
    <div className="exam-surface flex min-h-screen flex-col select-none">
      <header className="nta-bar sticky top-0 z-30">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2">
          <div className="flex items-center gap-3 min-w-0">
            <AssessmentBranding variant="cbt" customInstitution={institutionBranding || meta?.institution} />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{meta?.title}</p>
              <p className="text-xs text-blue-100">
                {user?.name} · Roll No: {rollNo}
                {qCategory ? ` · Subject: ${qCategory}` : ''}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {maxViolations > 0 && (
              <span className="hidden rounded border border-white/30 px-2 py-1 text-[10px] font-semibold sm:inline">
                Warnings {violations}/{maxViolations}
              </span>
            )}
            <div className={`rounded px-3 py-1 ${timerClass(remaining)}`}>
              Time Left: {formatDuration(remaining)}
            </div>
            <button type="button" className="nta-btn nta-btn-danger" onClick={() => setConfirmOpen(true)}>
              Submit
            </button>
          </div>
        </div>
      </header>

      {effectiveSections.length > 0 && (
        <div className="nta-bar-sub flex flex-wrap gap-1.5 px-4 py-2">
          <button
            type="button"
            className={`nta-section-tab ${!activeSection ? 'nta-section-tab-active' : ''}`}
            onClick={() => setActiveSection(null)}
          >
            All Sections ({activeQuestions.length})
          </button>
          {effectiveSections.map((s) => {
            const count = getSecQuestions(s).length;
            return (
              <button
                key={s.id}
                type="button"
                className={`nta-section-tab flex items-center gap-1.5 ${activeSection === s.id ? 'nta-section-tab-active' : ''}`}
                onClick={() => jumpToSection(s)}
              >
                <span>{s.icon}</span>
                <span>{s.name} ({count} Qs)</span>
              </button>
            );
          })}
        </div>
      )}

      {warning && (
        <div className="bg-red-700 px-4 py-2 text-center text-sm font-semibold text-white">
          Warning: {VIOLATION_LABELS[warning.type] || 'Suspicious activity'} logged.
          {maxViolations > 0 && ` (${violations}/${maxViolations})`}
        </div>
      )}

      <div className={`mx-auto grid w-full max-w-[1600px] flex-1 gap-0 px-0 py-0 ${
        hasPdf && pdfMode === 'split'
          ? 'lg:grid-cols-[1.1fr_1fr_240px]'
          : 'lg:grid-cols-[1fr_240px]'
      }`}>
        {hasPdf && (pdfMode === 'split' || pdfMode === 'full') && (
          <div className="border-r border-slate-400 bg-slate-100 p-2 flex flex-col min-h-[500px] lg:h-[calc(100vh-130px)] lg:sticky lg:top-[95px] overflow-hidden">
            <div className="mb-2 flex items-center justify-between px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-800 shadow-2xs">
              <span className="flex items-center gap-1.5 text-[#1a4480]">
                <span>📄</span> Question Paper PDF Document
              </span>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                Open in New Tab ↗
              </a>
            </div>
            <iframe
              src={`${pdfUrl}#toolbar=1`}
              className="w-full flex-1 border border-slate-300 rounded-lg shadow-inner bg-white"
              title="Question Paper PDF"
            />
          </div>
        )}

        <div className="border-b border-r border-slate-400 bg-white p-5 lg:border-b-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 pb-3">
            <div>
              <p className="text-[11px] font-bold uppercase text-[#1a4480] flex items-center gap-1.5">
                <span>{getSubjectIcon(qCategory)}</span>
                <span>Subject: {qCategory}</span>
              </p>
              <p className="text-sm font-bold text-slate-800">
                Question No. {current + 1} of {activeQuestions.length}
              </p>
            </div>
            <p className="text-xs text-slate-600">
              Marks: <span className="font-bold text-slate-900">+{q.marks}</span>
            </p>
          </div>

          <div className="text-base leading-relaxed text-slate-900">
            <span className="mr-2 font-bold">Q{current + 1}.</span>
            {q.question_text}
          </div>

          {q.image_url && (
            <button type="button" onClick={() => setImgZoom(q.image_url)} className="mt-4 block text-left">
              <img
                src={q.image_url}
                alt="Question diagram"
                className="max-h-64 cursor-zoom-in border border-slate-400"
              />
              <span className="mt-1 block text-[11px] text-slate-500">Click image to enlarge</span>
            </button>
          )}

          {(!isMultiSelectQuestion(q) && (q.question_type === 'mcq' || q.question_type === 'single_choice')) && (
            <div className="mt-5 space-y-2">
              {(q.options || []).map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectAnswer(q.id, idx)}
                  className={`nta-option ${answers[q.id] === idx ? 'nta-option-selected' : ''}`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-extrabold transition-colors ${
                    answers[q.id] === idx
                      ? 'border-[#1a4480] bg-[#1a4480] text-white dark:border-blue-500 dark:bg-blue-600 dark:text-white shadow-xs'
                      : 'border-slate-400 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100'
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              ))}
            </div>
          )}

          {q.question_type === 'assertion_reason' && (
            <div className="mt-5 space-y-4">
              <div className="rounded-lg border border-slate-300 bg-slate-50 p-4 space-y-2">
                {q.assertion_text && (
                  <p className="text-sm font-semibold text-slate-800">
                    <span className="text-brand-700">Assertion (A):</span> {q.assertion_text}
                  </p>
                )}
                {q.reason_text && (
                  <p className="text-sm font-semibold text-slate-800">
                    <span className="text-brand-700">Reason (R):</span> {q.reason_text}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                {(q.options && q.options.length ? q.options : [
                  'Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A)',
                  'Both Assertion (A) and Reason (R) are true but Reason (R) is NOT the correct explanation of Assertion (A)',
                  'Assertion (A) is true but Reason (R) is false',
                  'Assertion (A) is false but Reason (R) is true',
                ]).map((opt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectAnswer(q.id, idx)}
                    className={`nta-option ${answers[q.id] === idx ? 'nta-option-selected' : ''}`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-extrabold transition-colors ${
                      answers[q.id] === idx
                        ? 'border-[#1a4480] bg-[#1a4480] text-white dark:border-blue-500 dark:bg-blue-600 dark:text-white shadow-xs'
                        : 'border-slate-400 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {q.question_type === 'integer' && (
            <div className="mt-5 space-y-3">
              <p className="text-xs font-semibold text-slate-700">Enter integer answer (0-9):</p>
              <div className="flex flex-wrap gap-2">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => saveNumericAnswer(q.id, String(num))}
                    className={`h-10 w-10 text-sm font-bold rounded border transition-all ${
                      String(answers[q.id] ?? numericAnswers[q.id]) === String(num)
                        ? 'border-[#1a4480] bg-[#1a4480] text-white shadow'
                        : 'border-slate-400 bg-white text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
              <input
                type="number"
                step="1"
                className="input max-w-xs font-mono text-base font-bold text-slate-900 border-2 border-slate-400 focus:border-brand-600 mt-2"
                placeholder="Or type integer value"
                value={numericAnswers[q.id] ?? ''}
                onChange={(e) => saveNumericAnswer(q.id, e.target.value)}
              />
            </div>
          )}

          {q.question_type === 'numerical' && (
            <div className="mt-5 space-y-3">
              <p className="text-xs font-semibold text-slate-700">Enter numerical answer (up to 2 decimal places):</p>
              <input
                type="number"
                step="any"
                className="input font-mono text-lg font-bold text-slate-900 border-2 border-slate-400 focus:border-brand-600"
                placeholder="e.g. 12.5"
                value={numericAnswers[q.id] ?? ''}
                onChange={(e) => saveNumericAnswer(q.id, e.target.value)}
              />
              <p className="text-[11px] text-slate-500">Decimal values accepted. Saved automatically.</p>
            </div>
          )}

          {isMultiSelectQuestion(q) && (
            <div className="mt-5 space-y-2">
              <p className="text-xs font-semibold text-slate-600">Select all that apply</p>
              {(q.options || []).map((opt, idx) => {
                const selected = (multiAnswers[q.id] || []).includes(idx);
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleMulti(q.id, idx)}
                    className={`nta-option ${selected ? 'nta-option-selected' : ''}`}
                  >
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-extrabold transition-colors ${
                      selected
                        ? 'border-[#1a4480] bg-[#1a4480] text-white dark:border-blue-500 dark:bg-blue-600 dark:text-white shadow-xs'
                        : 'border-slate-400 bg-white text-slate-900 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100'
                    }`}>
                      {selected ? '✓' : String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>
          )}

          {q.question_type === 'coding' && (
            <div className="mt-5">
              <p className="mb-2 text-xs font-semibold text-slate-600">Language: JavaScript</p>
              <CodeEditor
                value={codingAnswers[q.id]?.code ?? q.starter_code ?? ''}
                language="javascript"
                onChange={(v) => saveCoding(q.id, v || '', 'javascript')}
              />
            </div>
          )}

          {q.question_type === 'subjective' && (
            <textarea
              className="input mt-5 min-h-[200px] resize-y rounded-none border-slate-400"
              placeholder="Type your answer here…"
              value={subjectiveAnswers[q.id] || ''}
              onChange={(e) => saveSubjective(q.id, e.target.value)}
            />
          )}
        </div>

        <aside className="border-b border-slate-400 bg-[#f3f6fb] p-3 lg:border-b-0 overflow-y-auto max-h-[calc(100vh-120px)]">
          <p className="text-center text-xs font-bold uppercase text-slate-800 tracking-wide">Question Palette</p>
          <div className="mt-2 space-y-1">
            {PALETTE_LEGEND.map((item) => (
              <div key={item.key} className="flex items-center gap-2 text-[10px] font-semibold text-slate-700 dark:text-slate-200">
                <span className={`h-4 w-4 shrink-0 ${item.swatch}`}>
                  {item.num}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-3 space-y-3">
            {effectiveSections.map((secItem) => {
              const secQuestions = getSecQuestions(secItem);
              if (secQuestions.length === 0) return null;

              const secAnswered = secQuestions.filter(({ item }) => qAnswered(item)).length;
              const isCurrentSec = (q?.bank_category && q.bank_category === secItem.categoryKey) || q?.section_id === secItem.sectionId;

              return (
                <div
                  key={secItem.id}
                  className={`rounded-xl border p-2.5 transition-all ${
                    isCurrentSec
                      ? 'border-[#1a4480] bg-white shadow-sm ring-1 ring-[#1a4480]'
                      : 'border-slate-300 bg-slate-50/70'
                  }`}
                >
                  <div className="mb-2 flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-[11px] font-extrabold uppercase text-[#1a4480] tracking-wider flex items-center gap-1">
                      <span>{secItem.icon}</span> {secItem.name}
                    </span>
                    <span className="text-[10px] font-bold text-slate-600 bg-slate-200/80 px-1.5 py-0.5 rounded">
                      {secAnswered}/{secQuestions.length} Answered
                    </span>
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {secQuestions.map(({ item, idx }) => {
                      const status = getQStatus(item);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCurrent(idx)}
                          className={`flex h-8 w-full items-center justify-center text-xs font-bold ${paletteCellClass(status, idx === current)}`}
                        >
                          {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-3 border-t border-slate-300 pt-2 text-center text-[10px] text-slate-600">
            <p>Answered: <strong>{answeredCount}</strong> / {activeQuestions.length}</p>
            <p className="mt-0.5">{savingId === q.id ? 'Saving…' : 'Auto-saved'}</p>
          </div>
        </aside>
      </div>

      <footer className="sticky bottom-0 z-20 border-t border-slate-500 bg-[#e8ecf1] px-4 py-2.5">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
          <button
            type="button"
            className="nta-btn"
            disabled={current === 0}
            onClick={() => setCurrent((c) => c - 1)}
          >
            &lt;&lt; Back
          </button>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" className="nta-btn" onClick={clearResponse}>
              Clear Response
            </button>
            <button
              type="button"
              className={`nta-btn ${reviewed[q.id] ? 'ring-2 ring-[#8e44ad]' : ''}`}
              onClick={() => toggleReview(!reviewed[q.id])}
            >
              {reviewed[q.id] ? 'Unmark Review' : 'Mark for Review'}
            </button>
            <button type="button" className="nta-btn" onClick={saveAndMarkReview}>
              Save &amp; Mark for Review
            </button>
            <button type="button" className="nta-btn nta-btn-primary" onClick={saveAndNext}>
              Save &amp; Next &gt;&gt;
            </button>
          </div>
          <button type="button" className="nta-btn nta-btn-danger" onClick={() => setConfirmOpen(true)}>
            Submit
          </button>
        </div>
      </footer>

      {needsFullscreen && (
        <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-slate-900/95 p-6 text-center text-white">
          <h2 className="text-xl font-bold">Fullscreen required</h2>
          <p className="mt-2 max-w-sm text-sm text-slate-300">Return to fullscreen to continue the examination.</p>
          <button
            type="button"
            className="nta-btn nta-btn-primary mt-6"
            onClick={async () => {
              try { await requestFullscreen(); setNeedsFullscreen(false); } catch { toast.error('Allow fullscreen'); }
            }}
          >
            Return to fullscreen
          </button>
        </div>
      )}

      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)} title="Submit test?" size="sm">
        <div className="text-sm text-slate-700">
          <p>You are about to submit your test.</p>
          <ul className="mt-3 space-y-1 border border-slate-300 bg-slate-50 p-3 text-sm">
            <li>Total questions: <strong>{activeQuestions.length}</strong></li>
            <li>Answered: <strong>{answeredCount}</strong></li>
            <li className="text-red-700">Unattempted: <strong>{unattemptedCount}</strong></li>
            <li>Marked for review: <strong>{Object.values(reviewed).filter(Boolean).length}</strong></li>
          </ul>

          {sections.length > 0 && (
            <div className="mt-3 space-y-1 rounded border border-slate-300 bg-blue-50/50 p-3 text-xs">
              <p className="font-bold text-slate-800 uppercase tracking-wider mb-1.5">Subject Section Breakdown:</p>
              {sections.map((s) => {
                const secQs = questions.filter((item) => item.section_id === s.id);
                const secAns = secQs.filter((item) => qAnswered(item)).length;
                return (
                  <div key={s.id} className="flex items-center justify-between text-slate-700">
                    <span className="font-semibold">{s.name}:</span>
                    <span><strong>{secAns}</strong> / {secQs.length} Answered</span>
                  </div>
                );
              })}
            </div>
          )}

          <p className="mt-3 text-xs text-slate-500">You will not be able to change answers after submission.</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" disabled={isSubmitting} className="nta-btn" onClick={() => setConfirmOpen(false)}>No, go back</button>
          <button
            type="button"
            disabled={isSubmitting}
            className="nta-btn nta-btn-danger flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            onClick={() => finishExam('manual')}
          >
            {isSubmitting ? (
              <>
                <Spinner className="h-4 w-4 animate-spin text-white" />
                <span>Submitting test...</span>
              </>
            ) : (
              <span>Yes, submit</span>
            )}
          </button>
        </div>
      </Modal>

      <Modal open={!!imgZoom} onClose={() => setImgZoom(null)} title="Question image" size="lg">
        {imgZoom && <img src={imgZoom} alt="Enlarged question" className="mx-auto max-h-[70vh] w-full object-contain" />}
      </Modal>

      {/* Full-Screen Question Paper PDF Modal */}
      {hasPdf && (
        <Modal
          open={pdfMode === 'full'}
          onClose={() => setPdfMode('split')}
          title="Question Paper PDF Viewer"
          size="full"
        >
          <div className="flex flex-col h-[80vh] space-y-3">
            <div className="flex items-center justify-between px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold">
              <span className="text-blue-600 dark:text-blue-400 flex items-center gap-2">
                📄 <span>Uploaded Question Paper & Solution PDF</span>
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPdfMode('split')}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-500 transition cursor-pointer"
                >
                  ◀ Return to Split View
                </button>
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition"
                >
                  Download / Open PDF ↗
                </a>
              </div>
            </div>
            <iframe
              src={`${pdfUrl}#toolbar=1`}
              className="w-full flex-1 rounded-xl border border-slate-300 dark:border-slate-700 bg-white shadow-inner"
              title="Full Question Paper PDF"
            />
          </div>
        </Modal>
      )}
    </div>
  );
}
