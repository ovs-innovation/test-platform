import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, Badge, StatCard } from '../../components/ui.jsx';
import { formatDateTime, attemptStatusLabel } from '../../lib/format.js';
import { VIOLATION_LABELS } from '../../lib/proctoring.js';
import MathRenderer from '../../components/common/MathRenderer.jsx';

function getOptionsList(rawOptions) {
  let opts = rawOptions;
  if (typeof opts === 'string') {
    try {
      opts = JSON.parse(opts);
    } catch {
      opts = [];
    }
  }
  return Array.isArray(opts) ? opts : [];
}

function getOptionInfo(opt, index) {
  if (typeof opt === 'object' && opt !== null) {
    const text =
      opt.text ??
      opt.title ??
      opt.value ??
      (typeof opt.key === 'string' && !opt.media && !opt.image_url ? opt.key : '');
    const media = Array.isArray(opt.media) ? opt.media : [];
    const imageUrl = opt.image_url || opt.image || (media[0]?.url || null);
    const key = opt.key || String.fromCharCode(65 + index);
    return { text: String(text ?? ''), imageUrl, key };
  }
  return { text: String(opt ?? ''), imageUrl: null, key: String.fromCharCode(65 + index) };
}

function getQuestionText(rawText) {
  if (typeof rawText === 'object' && rawText !== null) {
    return rawText.text || rawText.content || '';
  }
  return String(rawText || '');
}

export default function AdminAttemptDetail() {
  const { attemptId } = useParams();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      setData(await adminService.attemptReport(attemptId));
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attemptId]);

  if (state === 'loading') return <LoadingScreen />;
  if (state === 'error' || !data) return <ErrorState onRetry={load} />;

  const attempt = data.attempt || {};
  const score = data.score || null;
  const answers = Array.isArray(data.answers) ? data.answers : [];
  const violations = Array.isArray(data.violations) ? data.violations : [];
  const codingAnswers = Array.isArray(data.coding_answers) ? data.coding_answers : [];
  const subjectiveAnswers = Array.isArray(data.subjective_answers) ? data.subjective_answers : [];

  const marksObtainedDisplay = score?.marks_obtained != null ? Number(score.marks_obtained).toFixed(2) : null;
  const totalMarksDisplay = score?.total_marks != null ? Number(score.total_marks).toFixed(2) : null;
  const percentageDisplay = score?.percentage != null ? `${Number(score.percentage).toFixed(2)}%` : '—';

  return (
    <div>
      <Link
        to="/admin/reports"
        className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Reports
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          {attempt.assessment_title || 'Assessment Attempt'}
        </h1>
        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {attempt.candidate_name || 'Candidate'} · {attempt.candidate_email || '—'}
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Score"
          value={marksObtainedDisplay != null ? `${marksObtainedDisplay} / ${totalMarksDisplay || '—'}` : '—'}
        />
        <StatCard
          label="Percentage"
          value={percentageDisplay}
          accent="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          label="Result"
          value={score ? (score.passed ? 'Pass' : 'Fail') : '—'}
          accent={score?.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}
        />
        <StatCard
          label="Violations"
          value={attempt.violation_count ?? violations.length ?? 0}
          accent={(attempt.violation_count ?? violations.length) > 0 ? 'text-amber-500 dark:text-amber-400' : 'text-slate-900 dark:text-white'}
        />
      </div>

      <div className="mb-6 card grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <Meta label="Status" value={attemptStatusLabel[attempt.status] || attempt.status || '—'} />
        <Meta label="Started" value={attempt.started_at ? formatDateTime(attempt.started_at) : '—'} />
        <Meta label="Submitted" value={attempt.submitted_at ? formatDateTime(attempt.submitted_at) : '—'} />
        <Meta label="Passing Marks" value={attempt.passing_marks ?? '—'} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Answer breakdown */}
        <div>
          <h2 className="mb-3 text-base font-extrabold text-slate-900 dark:text-white">
            Answer Breakdown ({answers.length} Questions)
          </h2>

          {answers.length === 0 ? (
            <div className="card p-6 text-center text-xs font-semibold text-slate-400 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
              No MCQ questions recorded for this assessment.
            </div>
          ) : (
            <div className="space-y-3">
              {answers.map((a, idx) => {
                const qText = getQuestionText(a.question_text);
                const qOptions = getOptionsList(a.options);
                const isMulti = a.question_type === 'multi_select' || Array.isArray(a.correct_indices);

                const chosenArr = isMulti
                  ? (Array.isArray(a.selected_indices) ? a.selected_indices.map(Number) : (a.selected_index != null ? [Number(a.selected_index)] : []))
                  : (a.selected_index != null ? [Number(a.selected_index)] : []);

                const correctArr = isMulti
                  ? (Array.isArray(a.correct_indices) ? a.correct_indices.map(Number) : (a.correct_index != null ? [Number(a.correct_index)] : []))
                  : (a.correct_index != null ? [Number(a.correct_index)] : []);

                const unanswered = isMulti ? chosenArr.length === 0 : (a.selected_index === null || a.selected_index === undefined);
                const isQuestionCorrect = isMulti
                  ? (chosenArr.length > 0 && chosenArr.length === correctArr.length && chosenArr.every((v) => correctArr.includes(v)))
                  : (a.selected_index !== null && a.selected_index !== undefined && Number(a.selected_index) === Number(a.correct_index));

                return (
                  <div key={a.question_id || idx} className="card p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-relaxed">
                        <span className="text-slate-400 mr-1.5">Q{idx + 1}.</span>
                        <MathRenderer text={qText} />
                      </div>
                      <div className="shrink-0">
                        {unanswered ? (
                          <Badge color="slate">Skipped</Badge>
                        ) : isQuestionCorrect ? (
                          <Badge color="green">Correct</Badge>
                        ) : (
                          <Badge color="red">Wrong</Badge>
                        )}
                      </div>
                    </div>

                    {/* Question Image if present */}
                    {a.image_url && (
                      <div className="mt-2.5">
                        <img
                          src={a.image_url}
                          alt={`Question ${idx + 1}`}
                          className="max-h-56 max-w-full rounded-lg border border-slate-200 dark:border-slate-700 object-contain bg-white"
                        />
                      </div>
                    )}

                    {/* Options list */}
                    <ul className="mt-3 space-y-1.5">
                      {qOptions.map((opt, i) => {
                        const { text: optText, imageUrl: optImageUrl, key: optKey } = getOptionInfo(opt, i);
                        const isOptionCorrect = isMulti ? correctArr.includes(i) : (a.correct_index != null && Number(a.correct_index) === i);
                        const isOptionChosen = isMulti ? chosenArr.includes(i) : (a.selected_index != null && Number(a.selected_index) === i);

                        return (
                          <li
                            key={i}
                            className={`flex items-start gap-2.5 text-xs p-2 rounded-xl transition ${
                              isOptionCorrect && isOptionChosen
                                ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 font-extrabold border border-emerald-500/30'
                                : isOptionCorrect
                                ? 'bg-emerald-500/5 text-emerald-600 dark:text-emerald-400 font-extrabold border border-emerald-500/20'
                                : isOptionChosen
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 font-bold border border-rose-500/30'
                                : 'text-slate-600 dark:text-slate-400 border border-slate-100 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 font-medium'
                            }`}
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[10px] font-bold mt-0.5">
                              {optKey}
                            </span>
                            <div className="flex-1 overflow-hidden">
                              {optText ? <MathRenderer text={optText} /> : null}
                              {optImageUrl && (
                                <img
                                  src={optImageUrl}
                                  alt={`Option ${optKey}`}
                                  className="mt-1.5 max-h-28 max-w-xs rounded border border-slate-200 dark:border-slate-700 object-contain bg-white"
                                />
                              )}
                            </div>
                            {isOptionCorrect && (
                              <span className="ml-auto shrink-0 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                                (correct)
                              </span>
                            )}
                            {isOptionChosen && !isOptionCorrect && (
                              <span className="ml-auto shrink-0 text-[10px] font-extrabold text-rose-600 dark:text-rose-400">
                                (chosen)
                              </span>
                            )}
                          </li>
                        );
                      })}
                    </ul>

                    {/* Solution / Explanation if present */}
                    {(a.solution || a.solution_image_url) && (
                      <div className="mt-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 text-xs">
                        <p className="font-extrabold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
                          <span>💡 Solution / Explanation:</span>
                        </p>
                        {a.solution && (
                          <div className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            <MathRenderer text={a.solution} />
                          </div>
                        )}
                        {a.solution_image_url && (
                          <img
                            src={a.solution_image_url}
                            alt="Solution diagram"
                            className="mt-2 max-h-48 max-w-full rounded border border-slate-200 dark:border-slate-700 object-contain bg-white"
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Coding questions if any */}
          {codingAnswers.length > 0 && (
            <div className="mt-6 space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Coding Answers</h2>
              {codingAnswers.map((ca, idx) => (
                <div key={ca.question_id || idx} className="card p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
                  <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                    <span className="text-slate-400">Q{idx + 1}.</span> {getQuestionText(ca.question_text)}
                  </p>
                  <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl text-xs overflow-x-auto font-mono">
                    {ca.source_code || '// No code submitted'}
                  </pre>
                </div>
              ))}
            </div>
          )}

          {/* Subjective questions if any */}
          {subjectiveAnswers.length > 0 && (
            <div className="mt-6 space-y-3">
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">Subjective Answers</h2>
              {subjectiveAnswers.map((sa, idx) => (
                <div key={sa.question_id || idx} className="card p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
                  <p className="text-xs font-bold text-slate-900 dark:text-white mb-2">
                    <span className="text-slate-400">Q{idx + 1}.</span> {getQuestionText(sa.question_text)}
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300 whitespace-pre-wrap bg-slate-50 dark:bg-slate-900/60 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                    {sa.answer_text || 'No answer submitted'}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Violation log */}
        <div>
          <h2 className="mb-3 text-base font-extrabold text-slate-900 dark:text-white">Violation Log</h2>
          <div className="card p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
            {violations.length === 0 ? (
              <p className="py-6 text-center text-xs font-semibold text-slate-400">No violations recorded.</p>
            ) : (
              <ol className="space-y-3">
                {violations.map((v) => (
                  <li key={v.id} className="flex items-start gap-3 border-l-2 border-amber-500 pl-3">
                    <div>
                      <p className="text-xs font-extrabold text-slate-900 dark:text-white">
                        {VIOLATION_LABELS[v.violation_type] || v.violation_type}
                      </p>
                      <p className="text-[10px] font-semibold text-slate-400">{formatDateTime(v.created_at)}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">{label}</p>
      <p className="mt-1 text-xs font-extrabold text-slate-900 dark:text-white">{value}</p>
    </div>
  );
}
