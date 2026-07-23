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
    <div className="group flex flex-col justify-between rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-blue-500/50">
      <div>
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-extrabold text-white group-hover:text-[#60a5fa] transition-colors">{a.title}</h3>
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
        <p className="mt-2 line-clamp-2 text-xs text-slate-400 leading-relaxed">{a.description || 'Proctored NTA CBT format diagnostic mock exam.'}</p>

        <div className="mt-5 grid grid-cols-3 gap-2 text-center">
          <Meta label="Questions" value={a.question_count || '—'} />
          <Meta label="Minutes" value={a.duration_minutes || '—'} />
          <Meta label="Pass Mark" value={a.passing_marks || '—'} />
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-800">
        {completed ? (
          a.attempt_id ? (
            <Link to={`/results/${a.attempt_id}`} className="inline-flex w-full items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/15 py-2.5 text-xs font-bold text-blue-300 transition hover:bg-[#2563eb] hover:text-white">
              View Detailed Result →
            </Link>
          ) : (
            <button className="w-full rounded-full border border-slate-800 bg-slate-900 py-2.5 text-xs font-bold text-slate-400 cursor-not-allowed" disabled>Completed</button>
          )
        ) : (
          <Link
            to={`/assessments/${assessmentId}/instructions`}
            className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] py-2.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition hover:scale-[1.02]"
            onClick={() => sessionStorage.setItem('assessmentReturn', '/assessments')}
          >
            {inProgress ? 'Resume Assessment →' : 'Start Assessment →'}
          </Link>
        )}
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#070c18] px-2 py-2">
      <p className="text-sm font-extrabold text-white">{value}</p>
      <p className="text-[10px] font-semibold uppercase text-slate-400 mt-0.5">{label}</p>
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

  if (state === 'loading') return <LoadingScreen label="Loading invited assessments…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  return (
    <div className="space-y-6 pb-12">
      <PageHeader title="Invited Assessments" subtitle="Proctored test invitations assigned to your student profile." />
      {assessments.length === 0 ? (
        <div className="space-y-6">
          <EmptyState
            title="No Assessment Invitations Pending"
            message="You have no private proctored test invitations assigned at the moment. Explore available open test series to start practicing right away."
            action={
              <Link
                to="/test-series"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition hover:scale-105"
              >
                Browse Test Series Packs →
              </Link>
            }
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-500/20 text-cyan-300 border border-blue-500/30">
                🛡️
              </div>
              <h3 className="font-extrabold text-white text-sm">Real NTA CBT Simulation</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Full-screen proctored environment with live timer, question palette grid, and violation logging.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                📊
              </div>
              <h3 className="font-extrabold text-white text-sm">AI Score & AIR Analytics</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Instant subject-wise mark calculation, accuracy percentage, and All India Rank standing.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-5 shadow-xl space-y-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                ⚡
              </div>
              <h3 className="font-extrabold text-white text-sm">Step-by-Step Solutions</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Detailed explanations and chapter tags for every question immediately after test submission.
              </p>
            </div>
          </div>
        </div>
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
