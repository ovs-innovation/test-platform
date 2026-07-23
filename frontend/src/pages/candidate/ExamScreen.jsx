import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { attemptService } from '../../lib/services.js';
import { useProctoring } from '../../hooks/useProctoring.js';
import { requestFullscreen, exitFullscreen, isFullscreen, VIOLATION_LABELS } from '../../lib/proctoring.js';
import { formatDuration } from '../../lib/format.js';
import {
  getQuestionStatus,
  isQuestionAnswered,
  paletteCellClass,
  PALETTE_LEGEND,
  timerClass,
} from '../../lib/examPalette.js';
import { Skeleton } from '../../components/ui.jsx';
import Modal from '../../components/Modal.jsx';
import CodeEditor from '../../components/CodeEditor.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

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
  const [needsFullscreen, setNeedsFullscreen] = useState(false);
  const [warning, setWarning] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [calcOpen, setCalcOpen] = useState(false);
  const [imgZoom, setImgZoom] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const finishedRef = useRef(false);
  const endsAtRef = useRef(null);
  const codingDebounce = useRef({});

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await attemptService.getState(attemptId);
        if (cancelled) return;
        if (data.expired || data.attempt.status !== 'in_progress') {
          navigate(`/results/${attemptId}`, { replace: true });
          return;
        }
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
          const indices = a.selected_indices;
          if (indices && (Array.isArray(indices) ? indices.length : JSON.parse(indices || '[]').length)) {
            multi[a.question_id] = Array.isArray(indices) ? indices : JSON.parse(indices);
          } else if (a.selected_index != null) {
            mcq[a.question_id] = a.selected_index;
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
        toast.error(err.message || 'Could not load assessment');
        navigate('/assessments', { replace: true });
      }
    })();
    return () => { cancelled = true; };
  }, [attemptId, navigate, toast]);

  const finishExam = useCallback(async (reason) => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    try { await attemptService.submit(attemptId, reason); } catch { /* may auto-submit */ }
    await exitFullscreen().catch(() => {});
    navigate(`/results/${attemptId}`, { replace: true });
  }, [attemptId, navigate]);

  useEffect(() => {
    if (loading) return undefined;
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
  }, [loading, finishExam, toast]);

  const handleViolation = useCallback(async (type) => {
    if (finishedRef.current) return;
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
  }, [attemptId, finishExam, toast]);

  useProctoring({ active: !loading && !finishedRef.current, onViolation: handleViolation });

  useEffect(() => {
    if (!warning) return undefined;
    const id = setTimeout(() => setWarning(null), 3500);
    return () => clearTimeout(id);
  }, [warning]);

  useEffect(() => {
    if (!loading && questions[current]) {
      setVisited((v) => ({ ...v, [questions[current].id]: true }));
    }
  }, [current, loading, questions]);

  const qAnswered = useCallback(
    (item) => isQuestionAnswered(item, answers, multiAnswers, codingAnswers, subjectiveAnswers, numericAnswers),
    [answers, multiAnswers, codingAnswers, subjectiveAnswers, numericAnswers],
  );

  const getQStatus = (item) => getQuestionStatus(item, visited, reviewed, qAnswered(item));

  const toggleReview = async (mark = true) => {
    const qid = questions[current].id;
    const next = mark ? true : !reviewed[qid];
    setReviewed((r) => ({ ...r, [qid]: next }));
    try {
      await attemptService.markReview(attemptId, qid, next);
    } catch { /* ignore */ }
  };

  const clearResponse = async () => {
    const qid = questions[current].id;
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
    if (current < questions.length - 1) setCurrent((c) => c + 1);
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
      await attemptService.saveAnswer(attemptId, questionId, { numeric_answer: val != null && val !== '' ? Number(val) : null });
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

  const answeredCount = useMemo(
    () => questions.filter((item) => qAnswered(item)).length,
    [questions, qAnswered],
  );

  const unattemptedCount = questions.length - answeredCount;

  const jumpToSection = (sectionId) => {
    setActiveSection(sectionId);
    const idx = questions.findIndex((item) => item.section_id === sectionId);
    if (idx >= 0) setCurrent(idx);
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

  const q = questions[current];
  const sec = q.section_id ? sectionMap.get(q.section_id) : null;
  const activeSecName = activeSection ? sectionMap.get(activeSection)?.name : sec?.name;

  return (
    <div className="exam-surface flex min-h-screen flex-col select-none">
      <header className="nta-bar sticky top-0 z-30">
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-bold">{meta?.title}</p>
            <p className="text-xs text-blue-100">
              {user?.name} · Roll No: {rollNo}
              {activeSecName ? ` · Section: ${activeSecName}` : ''}
            </p>
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
            <button type="button" className="nta-btn border-white/40 bg-white/10 text-white hover:bg-white/20" onClick={() => setCalcOpen(true)}>
              Calculator
            </button>
            <button type="button" className="nta-btn nta-btn-danger" onClick={() => setConfirmOpen(true)}>
              Submit
            </button>
          </div>
        </div>
      </header>

      {sections.length > 0 && (
        <div className="nta-bar-sub flex flex-wrap gap-1 px-4 py-2">
          <button
            type="button"
            className={`nta-section-tab ${!activeSection ? 'nta-section-tab-active' : ''}`}
            onClick={() => setActiveSection(null)}
          >
            All sections
          </button>
          {sections.map((s) => (
            <button
              key={s.id}
              type="button"
              className={`nta-section-tab ${activeSection === s.id ? 'nta-section-tab-active' : ''}`}
              onClick={() => jumpToSection(s.id)}
            >
              {s.name}
            </button>
          ))}
        </div>
      )}

      {warning && (
        <div className="bg-red-700 px-4 py-2 text-center text-sm font-semibold text-white">
          Warning: {VIOLATION_LABELS[warning.type] || 'Suspicious activity'} logged.
          {maxViolations > 0 && ` (${violations}/${maxViolations})`}
        </div>
      )}

      <div className="mx-auto grid w-full max-w-7xl flex-1 gap-0 px-0 py-0 lg:grid-cols-[1fr_240px]">
        <div className="border-b border-r border-slate-400 bg-white p-5 lg:border-b-0">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-slate-300 pb-3">
            <div>
              {sec && (
                <p className="text-[11px] font-bold uppercase text-[#1a4480]">
                  {SECTION_LABELS[sec.section_type] || sec.name}
                </p>
              )}
              <p className="text-sm font-bold text-slate-800">
                Question No. {current + 1} of {questions.length}
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

          {(q.question_type === 'mcq' || q.question_type === 'single_choice') && (
            <div className="mt-5 space-y-2">
              {(q.options || []).map((opt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => selectAnswer(q.id, idx)}
                  className={`nta-option ${answers[q.id] === idx ? 'nta-option-selected' : ''}`}
                >
                  <span className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-bold ${
                    answers[q.id] === idx ? 'border-[#1a4480] bg-[#1a4480] text-white' : 'border-slate-500 bg-white'
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
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-bold ${
                      answers[q.id] === idx ? 'border-[#1a4480] bg-[#1a4480] text-white' : 'border-slate-500 bg-white'
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
            <div className="mt-5 max-w-xs space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Enter Integer Answer</label>
              <input
                type="number"
                step="1"
                className="input font-mono text-lg font-bold text-slate-900 border-2 border-slate-400 focus:border-brand-600"
                placeholder="e.g. 5"
                value={numericAnswers[q.id] ?? ''}
                onChange={(e) => saveNumericAnswer(q.id, e.target.value)}
              />
              <p className="text-[11px] text-slate-500">Your answer will be saved automatically as an integer.</p>
            </div>
          )}

          {q.question_type === 'numerical' && (
            <div className="mt-5 max-w-xs space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Enter Numerical Value</label>
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

          {q.question_type === 'multi_select' && (
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
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-bold ${
                      selected ? 'border-[#1a4480] bg-[#1a4480] text-white' : 'border-slate-500 bg-white'
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

        <aside className="border-b border-slate-400 bg-[#f3f6fb] p-3 lg:border-b-0">
          <p className="text-center text-xs font-bold uppercase text-slate-800">Question Palette</p>
          <div className="mt-2 space-y-1">
            {PALETTE_LEGEND.map((item) => (
              <div key={item.key} className="flex items-center gap-2 text-[10px] text-slate-700">
                <span className={`h-3.5 w-3.5 shrink-0 ${item.swatch}`} />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-5 gap-1.5">
            {questions.map((item, idx) => {
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
          <div className="mt-3 border-t border-slate-300 pt-2 text-center text-[10px] text-slate-600">
            <p>Answered: <strong>{answeredCount}</strong> / {questions.length}</p>
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
            <li>Total questions: <strong>{questions.length}</strong></li>
            <li>Answered: <strong>{answeredCount}</strong></li>
            <li className="text-red-700">Unattempted: <strong>{unattemptedCount}</strong></li>
            <li>Marked for review: <strong>{Object.values(reviewed).filter(Boolean).length}</strong></li>
          </ul>
          <p className="mt-3 text-xs text-slate-500">You will not be able to change answers after submission.</p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" className="nta-btn" onClick={() => setConfirmOpen(false)}>No, go back</button>
          <button type="button" className="nta-btn nta-btn-danger" onClick={() => finishExam('manual')}>Yes, submit</button>
        </div>
      </Modal>

      <Modal open={calcOpen} onClose={() => setCalcOpen(false)} title="Calculator" size="sm">
        <Calculator />
      </Modal>

      <Modal open={!!imgZoom} onClose={() => setImgZoom(null)} title="Question image" size="lg">
        {imgZoom && <img src={imgZoom} alt="Enlarged question" className="mx-auto max-h-[70vh] w-full object-contain" />}
      </Modal>
    </div>
  );
}

function Calculator() {
  const [display, setDisplay] = useState('0');
  const press = (v) => {
    if (v === 'C') setDisplay('0');
    else if (v === '=') {
      try { setDisplay(String(Function(`"use strict"; return (${display})`)())); } catch { setDisplay('Error'); }
    } else setDisplay((d) => (d === '0' ? v : d + v));
  };
  const keys = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+', 'C'];
  return (
    <div>
      <div className="mb-3 border border-slate-400 bg-slate-900 p-3 text-right font-mono text-2xl text-white">{display}</div>
      <div className="grid grid-cols-4 gap-2">
        {keys.map((k) => (
          <button key={k} type="button" className="nta-btn py-2" onClick={() => press(k)}>{k}</button>
        ))}
      </div>
    </div>
  );
}
