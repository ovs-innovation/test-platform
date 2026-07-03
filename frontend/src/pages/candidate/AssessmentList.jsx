import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assessmentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState, Badge } from '../../components/ui.jsx';

export function AssessmentCard({ a }) {
  const assessmentId = a.assessment_id || a.id;
  const completed = a.attempt_status && a.attempt_status !== 'in_progress';
  const inProgress = a.attempt_status === 'in_progress';
  const pending = a.invite_status === 'pending' || a.invite_status === 'accessed';

  return (
    <div className="card flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-slate-900">{a.title}</h3>
        {completed ? (
          <Badge color="green">Completed</Badge>
        ) : inProgress ? (
          <Badge color="amber">In progress</Badge>
        ) : pending ? (
          <Badge color="blue">Invited</Badge>
        ) : (
          <Badge color="blue">Available</Badge>
        )}
      </div>
      <p className="mt-1.5 line-clamp-2 text-sm text-slate-500">{a.description || 'No description provided.'}</p>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <Meta label="Questions" value={a.question_count} />
        <Meta label="Minutes" value={a.duration_minutes} />
        <Meta label="Pass mark" value={a.passing_marks} />
      </div>

      <div className="mt-5 flex-1" />
      {completed ? (
        a.attempt_id ? (
          <Link to={`/results/${a.attempt_id}`} className="btn-secondary w-full">
            View result
          </Link>
        ) : (
          <button className="btn-secondary w-full" disabled>Completed</button>
        )
      ) : (
        <Link
          to={`/assessments/${assessmentId}/instructions`}
          className="btn-primary w-full"
          onClick={() => sessionStorage.setItem('assessmentReturn', '/assessments')}
        >
          {inProgress ? 'Resume assessment' : 'Start assessment'}
        </Link>
      )}
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="border border-slate-200 px-2 py-2 dark:border-slate-700">
      <p className="text-base font-semibold text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

export default function AssessmentList() {
  const [assessments, setAssessments] = useState([]);
  const [state, setState] = useState('loading');

  const load = async () => {
    setState('loading');
    try {
      setAssessments(await assessmentService.listAvailable());
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (state === 'loading') return <LoadingScreen label="Loading assessments…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div>
      <PageHeader title="Invited assessments" subtitle="Assessments you've been invited to complete." />
      {assessments.length === 0 ? (
        <EmptyState title="No invitations" message="You have not been invited to any assessments yet." />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.map((a) => (
            <AssessmentCard key={a.id} a={a} />
          ))}
        </div>
      )}
    </div>
  );
}
