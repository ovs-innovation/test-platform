import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { attemptService } from '../../lib/services.js';
import { Skeleton, ErrorState } from '../../components/ui.jsx';
import { SubjectBar } from '../../components/design.jsx';
import { formatDateTime, attemptStatusLabel } from '../../lib/format.js';

export default function ResultPage() {
  const { attemptId } = useParams();
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [showSolutions, setShowSolutions] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      setData(await attemptService.getResult(attemptId));
      setState('done');
    } catch {
      setState('error');
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

  const subjectScores = useMemo(() => {
    if (!solutions || solutions.length === 0) return [];
    const map = {};
    for (const q of solutions) {
      const sec = q.section_name || 'General';
      if (!map[sec]) {
        map[sec] = { name: sec, max: 0, obtained: 0, correct: 0, wrong: 0, unattempted: 0 };
      }
      map[sec].max += q.marks || 0;
      map[sec].obtained += q.marks_obtained || 0;

      // Classify attempts
      if (['mcq', 'single_choice', 'multi_select', 'assertion_reason'].includes(q.question_type)) {
        const isAttempted = q.question_type === 'multi_select'
          ? (q.your_answer && q.your_answer.length > 0)
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
    }
    return Object.values(map);
  }, [solutions]);

  if (state === 'loading') {
    return (
      <div className="exam-surface min-h-screen">
        <div className="nta-bar px-4 py-3"><Skeleton className="h-5 w-48 bg-white/20" /></div>
        <div className="mx-auto max-w-3xl p-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="mt-4 h-24 w-full" />
        </div>
      </div>
    );
  }
  if (state === 'error') return <ErrorState onRetry={load} />;

  const backTo = sessionStorage.getItem('assessmentReturn') || '/assessments';
  const backLabel = backTo.startsWith('/my-tests') ? 'Back to my tests' : 'Back to invited assessments';

  return (
    <div className="exam-surface min-h-screen">
      <header className="nta-bar px-4 py-2.5">
        <p className="text-sm font-bold uppercase tracking-wide">Test completed</p>
        <p className="text-xs text-blue-100">{assessment.title}</p>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-6">
        <Link to={backTo} className="mb-4 inline-flex items-center gap-1 text-xs font-semibold uppercase text-slate-500 hover:text-slate-800">
          ← {backLabel}
        </Link>

      {!resultVisible ? (
        <div className="nta-panel p-8 text-center">
          <h1 className="text-xl font-bold text-slate-900">{assessment.title}</h1>
          <div className="mx-auto mt-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-50 text-brand-600">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-slate-900">Submission received</h2>
          <p className="mt-2 text-sm text-slate-500">
            Your assessment has been submitted successfully. Results are not published for this
            assessment. You will be contacted with the outcome.
          </p>
          <p className="mt-4 text-xs text-slate-400">Submitted {formatDateTime(attempt.submitted_at)}</p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden border border-slate-400">
            <div className={`px-6 py-8 text-center ${score?.passed ? 'bg-emerald-50' : 'bg-red-50'}`}>
              <p className="text-sm text-slate-600">{assessment.title}</p>
              <p className="mt-2 text-4xl font-bold text-slate-900">
                {score ? `${score.percentage}%` : '—'}
              </p>
              <div className="mt-3">
                {score?.passed ? (
                  <span className="inline-block border border-emerald-600 bg-emerald-600 px-3 py-1 text-xs font-bold uppercase text-white">Qualified</span>
                ) : (
                  <span className="inline-block border border-red-600 bg-red-600 px-3 py-1 text-xs font-bold uppercase text-white">Not qualified</span>
                )}
              </div>
              {(score?.rank || score?.percentile) && (
                <p className="mt-3 text-sm text-slate-600">
                  {score.rank && <>Rank <strong>#{score.rank}</strong></>}
                  {score.rank && score.percentile && ' · '}
                  {score.percentile != null && <>Percentile <strong>{score.percentile}%</strong></>}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 divide-x divide-slate-300 border-t border-slate-300 sm:grid-cols-3">
              <Stat label="Marks Obtained" value={score ? `${score.marks_obtained} / ${score.total_marks}` : '—'} />
              <Stat label="Percentage" value={score ? `${score.percentage}%` : '—'} />
              <Stat label="Accuracy" value={accuracy ?? '—'} />
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-300 border-t border-slate-300 sm:grid-cols-4">
              <Stat label="Correct" value={score?.correct_count ?? '—'} />
              <Stat label="Wrong" value={score?.wrong_count ?? '—'} />
              <Stat label="Unattempted" value={score?.unattempted_count ?? '—'} />
              <Stat label="Time Taken" value={timeTakenStr} />
            </div>
            <div className="grid grid-cols-2 divide-x divide-slate-300 border-t border-slate-300">
              <Stat label="Status" value={attemptStatusLabel[attempt.status] || attempt.status} />
              <Stat label="Violations" value={attempt.violation_count ?? 0} />
            </div>
            <div className="border-t border-slate-300 px-6 py-4 text-center text-xs text-slate-500">
              Submitted {formatDateTime(attempt.submitted_at)}
            </div>
          </div>

          {breakdown && (
            <div className="mt-6 border border-slate-400 p-5">
              <h3 className="text-sm font-semibold">Breakdown</h3>
              <div className="mt-4 space-y-4">
                {breakdown.map((b) => (
                  <SubjectBar key={b.label} label={b.label} value={b.value} variant={b.variant} />
                ))}
              </div>
            </div>
          )}

          {subjectScores.length > 0 && (
            <div className="mt-6 border border-slate-400 p-5">
              <h3 className="text-sm font-semibold mb-3">Subject-wise Performance</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {subjectScores.map((subj) => {
                  const pct = subj.max > 0 ? Math.max(0, Math.round((subj.obtained / subj.max) * 100)) : 0;
                  return (
                    <div key={subj.name} className="bg-slate-50 border border-slate-200 p-4 rounded">
                      <p className="font-bold text-slate-800 text-sm">{subj.name}</p>
                      <div className="mt-2 flex justify-between text-xs text-slate-600">
                        <span>Score: <strong>{subj.obtained.toFixed(2)} / {subj.max}</strong></span>
                        <span>Percentage: <strong>{pct}%</strong></span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 mt-2 rounded overflow-hidden">
                        <div className="bg-brand-500 h-full rounded" style={{ width: `${pct}%` }}></div>
                      </div>
                      <div className="mt-2 flex justify-between text-[11px] text-slate-500">
                        <span>Correct: <strong>{subj.correct}</strong></span>
                        <span>Wrong: <strong>{subj.wrong}</strong></span>
                        <span>Unattempted: <strong>{subj.unattempted}</strong></span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {score?.passed && (
            <Link to={`/certificates/${attempt.id}`} className="nta-btn nta-btn-primary mt-4 inline-block">Download certificate</Link>
          )}

          {solutions?.length > 0 && (
            <div className="mt-6">
              <button
                type="button"
                className="nta-btn w-full"
                onClick={() => setShowSolutions((s) => !s)}
              >
                {showSolutions ? 'Hide solutions' : 'View solutions & answers'}
              </button>

              {showSolutions && (
                <div className="mt-4 space-y-4">
                  {solutions.map((q, i) => {
                    const opts = Array.isArray(q.options) ? q.options : [];
                    return (
                      <div key={q.id} className={`card p-5 ${q.is_correct ? 'border-l-4 border-emerald-500' : 'border-l-4 border-red-400'}`}>
                        <div className="flex items-start justify-between gap-2">
                          <p className="font-medium text-slate-900">Q{i + 1}. {q.question_text}</p>
                          <span className={`inline-block px-2 py-0.5 text-[10px] font-bold uppercase ${q.is_correct ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                            {q.is_correct ? 'Correct' : 'Wrong'}
                          </span>
                        </div>
                        {opts.length > 0 && (
                          <ul className="mt-3 space-y-1 text-sm">
                            {opts.map((opt, oi) => {
                              const isCorrect = q.question_type === 'multi_select'
                                ? (q.correct_indices || []).includes(oi)
                                : oi === q.correct_index;
                              const isYours = q.question_type === 'multi_select'
                                ? (q.your_answer || []).includes(oi)
                                : q.your_answer === oi;
                              return (
                                <li
                                  key={oi}
                                  className={`rounded px-3 py-1.5 ${
                                    isCorrect ? 'bg-emerald-50 text-emerald-800' : isYours ? 'bg-red-50 text-red-800' : 'text-slate-600'
                                  }`}
                                >
                                  {opt}
                                  {isCorrect && ' ✓'}
                                  {isYours && !isCorrect && ' (your answer)'}
                                </li>
                              );
                            })}
                          </ul>
                        )}
                        {['integer', 'numerical'].includes(q.question_type) && (
                          <div className="mt-3 rounded-md bg-slate-50 p-3 text-sm space-y-1">
                            <p><span className="font-semibold text-slate-700">Your Answer:</span> {q.your_answer != null ? q.your_answer : <span className="text-slate-400">Unattempted</span>}</p>
                            <p><span className="font-semibold text-emerald-700">Correct Answer:</span> {q.numeric_answer != null ? q.numeric_answer : 'N/A'} {q.question_type === 'numerical' && q.numerical_tolerance ? `(±${q.numerical_tolerance})` : ''}</p>
                          </div>
                        )}
                        {['coding', 'subjective'].includes(q.question_type) && q.your_answer && (
                          <pre className="mt-3 overflow-x-auto rounded bg-slate-50 p-3 text-xs">{q.your_answer}</pre>
                        )}
                        {q.solution && (
                          <div className="mt-3 rounded-lg bg-blue-50 p-3 text-sm text-blue-900">
                            <strong>Solution:</strong> {q.solution}
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

function Stat({ label, value }) {
  return (
    <div className="px-4 py-4 text-center sm:px-6 sm:py-5">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
    </div>
  );
}
