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
      <Link to="/admin/reports" className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to reports
      </Link>

      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">{attempt.assessment_title}</h1>
        <p className="mt-1 text-sm text-slate-500">
          {attempt.candidate_name} · {attempt.candidate_email}
        </p>
      </div>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Score" value={score ? `${score.marks_obtained}/${score.total_marks}` : '—'} />
        <StatCard label="Percentage" value={score ? `${score.percentage}%` : '—'} accent="text-brand-600" />
        <StatCard
          label="Result"
          value={score ? (score.passed ? 'Pass' : 'Fail') : '—'}
          accent={score?.passed ? 'text-emerald-600' : 'text-red-600'}
        />
        <StatCard label="Violations" value={attempt.violation_count} accent={attempt.violation_count > 0 ? 'text-amber-600' : 'text-slate-900'} />
      </div>

      <div className="mb-6 card grid grid-cols-2 gap-4 p-5 sm:grid-cols-4">
        <Meta label="Status" value={attemptStatusLabel[attempt.status] || attempt.status} />
        <Meta label="Started" value={formatDateTime(attempt.started_at)} />
        <Meta label="Submitted" value={attempt.submitted_at ? formatDateTime(attempt.submitted_at) : '—'} />
        <Meta label="Passing marks" value={attempt.passing_marks} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        {/* Answer breakdown */}
        <div>
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Answer breakdown</h2>
          <div className="space-y-3">
            {answers.map((a, idx) => {
              const correct = a.selected_index === a.correct_index;
              const unanswered = a.selected_index === null || a.selected_index === undefined;
              return (
                <div key={a.question_id} className="card p-4">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">
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
                  <ul className="mt-2 space-y-1">
                    {a.options.map((opt, i) => {
                      const isCorrect = i === a.correct_index;
                      const isChosen = i === a.selected_index;
                      return (
                        <li
                          key={i}
                          className={`flex items-center gap-2 text-sm ${
                            isCorrect ? 'font-medium text-emerald-700' : isChosen ? 'text-red-600' : 'text-slate-500'
                          }`}
                        >
                          <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-xs">
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                          {isCorrect && <span className="text-xs">(correct)</span>}
                          {isChosen && !isCorrect && <span className="text-xs">(chosen)</span>}
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
          <h2 className="mb-3 text-lg font-semibold text-slate-900">Violation log</h2>
          <div className="card p-4">
            {violations.length === 0 ? (
              <p className="py-6 text-center text-sm text-slate-500">No violations recorded.</p>
            ) : (
              <ol className="space-y-3">
                {violations.map((v) => (
                  <li key={v.id} className="flex items-start gap-3 border-l-2 border-amber-400 pl-3">
                    <div>
                      <p className="text-sm font-medium text-slate-800">
                        {VIOLATION_LABELS[v.violation_type] || v.violation_type}
                      </p>
                      <p className="text-xs text-slate-400">{formatDateTime(v.created_at)}</p>
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
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
