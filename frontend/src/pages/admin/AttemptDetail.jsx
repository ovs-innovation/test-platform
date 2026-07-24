import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { adminService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, Badge, StatCard } from '../../components/ui.jsx';
import { formatDateTime, attemptStatusLabel } from '../../lib/format.js';
import { VIOLATION_LABELS } from '../../lib/proctoring.js';

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
  if (state === 'error') return <ErrorState onRetry={load} />;

  const { attempt, score, answers, violations } = data;

  return (
    <div>
      <Link to="/admin/reports" className="mb-4 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Reports
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">{attempt.assessment_title}</h1>
        <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">
          {attempt.candidate_name} · {attempt.candidate_email}
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Score" value={score ? `${score.marks_obtained}/${score.total_marks}` : '—'} />
        <StatCard label="Percentage" value={score ? `${score.percentage}%` : '—'} accent="text-blue-600 dark:text-blue-400" />
        <StatCard
          label="Result"
          value={score ? (score.passed ? 'Pass' : 'Fail') : '—'}
          accent={score?.passed ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}
        />
        <StatCard label="Violations" value={attempt.violation_count} accent={attempt.violation_count > 0 ? 'text-amber-500 dark:text-amber-400' : 'text-slate-900 dark:text-white'} />
      </div>

      <div className="mb-6 card grid grid-cols-2 gap-4 p-5 sm:grid-cols-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
        <Meta label="Status" value={attemptStatusLabel[attempt.status] || attempt.status} />
        <Meta label="Started" value={formatDateTime(attempt.started_at)} />
        <Meta label="Submitted" value={attempt.submitted_at ? formatDateTime(attempt.submitted_at) : '—'} />
        <Meta label="Passing Marks" value={attempt.passing_marks} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Answer breakdown */}
        <div>
          <h2 className="mb-3 text-base font-extrabold text-slate-900 dark:text-white">Answer Breakdown</h2>
          <div className="space-y-3">
            {answers.map((a, idx) => {
              const correct = a.selected_index === a.correct_index;
              const unanswered = a.selected_index === null || a.selected_index === undefined;
              return (
                <div key={a.question_id} className="card p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827]">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                      <span className="text-slate-400">Q{idx + 1}.</span> {a.question_text}
                    </p>
                    {unanswered ? (
                      <Badge color="slate">Skipped</Badge>
                    ) : correct ? (
                      <Badge color="green">Correct</Badge>
                    ) : (
                      <Badge color="red">Wrong</Badge>
                    )}
                  </div>
                  <ul className="mt-3 space-y-1.5">
                    {a.options.map((opt, i) => {
                      const isCorrect = i === a.correct_index;
                      const isChosen = i === a.selected_index;
                      return (
                        <li
                          key={i}
                          className={`flex items-center gap-2 text-xs font-semibold ${
                            isCorrect ? 'text-emerald-600 dark:text-emerald-400 font-extrabold' : isChosen ? 'text-rose-600 dark:text-rose-400' : 'text-slate-500 dark:text-slate-400'
                          }`}
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[10px] font-bold">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                          {isCorrect && <span className="text-[10px] font-bold">(correct)</span>}
                          {isChosen && !isCorrect && <span className="text-[10px] font-bold">(chosen)</span>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
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

