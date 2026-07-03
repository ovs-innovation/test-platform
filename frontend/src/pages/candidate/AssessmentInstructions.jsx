import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { assessmentService, attemptService } from '../../lib/services.js';
import { ErrorState, Skeleton } from '../../components/ui.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { requestFullscreen } from '../../lib/proctoring.js';
import { PALETTE_LEGEND } from '../../lib/examPalette.js';

const GENERAL_RULES = [
  'Total duration of the examination is fixed. The clock is server-synced and shown at the top of the screen.',
  'The clock will be set at the server. The countdown in the top right corner displays the time remaining.',
  'When the timer reaches zero, the examination will end automatically and your responses will be submitted.',
  'The Question Palette on the right shows the status of each question using standard NTA colour codes.',
  'You can click on the question number in the palette to navigate directly to that question.',
  'Use Save & Next to save your answer and move to the next question. Use Save & Mark for Review to flag a question.',
  'Use Clear Response to remove your selected answer for the current question.',
  'Use the section tabs (if shown) to switch between subjects or sections of the paper.',
  'This is a proctored test. Fullscreen mode is required. Tab switches and copy/paste are monitored.',
  'Exceeding the allowed number of proctoring violations will auto-submit your test.',
];

export default function AssessmentInstructions() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { user } = useAuth();

  const [assessment, setAssessment] = useState(null);
  const [backTo, setBackTo] = useState('/assessments');
  const [state, setState] = useState('loading');
  const [agreed, setAgreed] = useState(false);
  const [starting, setStarting] = useState(false);

  const load = async () => {
    setState('loading');
    try {
      const found = await assessmentService.getStudent(assessmentId);
      setAssessment(found);
      const returnPath = found.access_type === 'enrollment' && found.series_slug
        ? `/my-tests/${found.series_slug}`
        : found.access_type === 'enrollment'
          ? '/my-tests'
          : '/assessments';
      setBackTo(returnPath);
      sessionStorage.setItem('assessmentReturn', returnPath);
      setState('done');
    } catch (err) {
      if (err.status === 403 || err.status === 404) setState('notfound');
      else setState('error');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assessmentId]);

  const onStart = async () => {
    setStarting(true);
    try {
      const { attempt } = await attemptService.start(Number(assessmentId));
      await requestFullscreen().catch(() => {});
      navigate(`/exam/${attempt.id}`, { replace: true });
    } catch (err) {
      toast.error(err.message || 'Could not start the assessment');
      if (err.status === 409) load();
      setStarting(false);
    }
  };

  const rollNo = String(user?.id || '0').padStart(6, '0');

  if (state === 'loading') {
    return (
      <div className="exam-surface min-h-screen">
        <div className="nta-bar px-4 py-3">
          <Skeleton className="h-5 w-64 bg-white/20" />
        </div>
        <div className="mx-auto max-w-5xl p-6">
          <Skeleton className="h-8 w-96" />
          <Skeleton className="mt-6 h-48 w-full" />
          <Skeleton className="mt-4 h-32 w-full" />
        </div>
      </div>
    );
  }

  if (state === 'error') return <ErrorState onRetry={load} />;
  if (state === 'notfound') {
    return (
      <ErrorState
        message="This assessment is not available."
        onRetry={() => navigate('/my-tests')}
      />
    );
  }

  if (assessment.attempt_status === 'submitted' || assessment.attempt_status === 'auto_submitted') {
    return (
      <div className="exam-surface flex min-h-screen items-center justify-center p-6">
        <div className="nta-panel max-w-md p-8 text-center">
          <h1 className="text-lg font-bold text-slate-900">Already completed</h1>
          <p className="mt-2 text-sm text-slate-600">You have already submitted this assessment.</p>
          {assessment.attempt_id && (
            <Link to={`/results/${assessment.attempt_id}`} className="nta-btn nta-btn-primary mt-4 inline-block">View result</Link>
          )}
          <Link to={backTo} className="nta-btn mt-3 inline-block">Go back</Link>
        </div>
      </div>
    );
  }

  if (assessment.attempt_status === 'in_progress' && assessment.attempt_id) {
    return (
      <div className="exam-surface flex min-h-screen items-center justify-center p-6">
        <div className="nta-panel max-w-md p-8 text-center">
          <h1 className="text-lg font-bold text-slate-900">Test in progress</h1>
          <p className="mt-2 text-sm text-slate-600">Resume your ongoing attempt.</p>
          <Link to={`/exam/${assessment.attempt_id}`} className="nta-btn nta-btn-primary mt-4 inline-block">Resume exam</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="exam-surface min-h-screen">
      <header className="nta-bar px-4 py-2.5">
        <p className="text-sm font-bold uppercase tracking-wide">Computer Based Test — General Instructions</p>
        <p className="mt-0.5 text-xs text-blue-100">Read all instructions carefully before proceeding</p>
      </header>

      <div className="nta-bar-sub px-4 py-2 text-xs">
        <span className="font-semibold">Candidate:</span> {user?.name || 'Student'}
        {' · '}
        <span className="font-semibold">Roll No:</span> {rollNo}
        {' · '}
        <span className="font-semibold">Test:</span> {assessment.title}
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <Link to={backTo} className="mb-4 inline-flex items-center gap-1 text-xs font-semibold uppercase text-slate-500 hover:text-slate-800">
          ← Back
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            <h1 className="text-lg font-bold text-slate-900">{assessment.title}</h1>
            {assessment.description && (
              <p className="mt-1 text-sm text-slate-600">{assessment.description}</p>
            )}

            <table className="mt-5 w-full border border-slate-400 text-sm">
              <tbody>
                <tr className="border-b border-slate-300 bg-[#f3f6fb]">
                  <td className="border-r border-slate-300 px-3 py-2 font-semibold">Duration</td>
                  <td className="px-3 py-2">{assessment.duration_minutes} minutes</td>
                  <td className="border-l border-r border-slate-300 px-3 py-2 font-semibold">Questions</td>
                  <td className="px-3 py-2">{assessment.question_count}</td>
                </tr>
                <tr>
                  <td className="border-r border-slate-300 px-3 py-2 font-semibold">Total marks</td>
                  <td className="px-3 py-2">{assessment.total_marks}</td>
                  <td className="border-l border-r border-slate-300 px-3 py-2 font-semibold">Passing marks</td>
                  <td className="px-3 py-2">{assessment.passing_marks}</td>
                </tr>
                {assessment.max_violations > 0 && (
                  <tr className="border-t border-slate-300">
                    <td className="border-r border-slate-300 px-3 py-2 font-semibold">Violation limit</td>
                    <td className="px-3 py-2" colSpan={3}>{assessment.max_violations}</td>
                  </tr>
                )}
              </tbody>
            </table>

            {assessment.instructions && (
              <div className="mt-5 border border-amber-400 bg-amber-50 p-4 text-sm text-amber-950">
                <p className="mb-1 text-xs font-bold uppercase">Exam-specific instructions</p>
                {assessment.instructions}
              </div>
            )}

            <p className="mt-5 text-xs font-bold uppercase text-slate-700">General instructions</p>
            <div className="nta-instructions-scroll mt-2">
              <ol className="list-decimal space-y-2.5 pl-5">
                {GENERAL_RULES.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ol>
            </div>
          </div>

          <aside className="h-fit">
            <div className="nta-panel p-4">
              <p className="text-xs font-bold uppercase text-slate-700">Question palette legend</p>
              <p className="mt-1 text-[11px] text-slate-500">Colours used during the exam</p>
              <ul className="mt-3 space-y-2">
                {PALETTE_LEGEND.map((item) => (
                  <li key={item.key} className="flex items-center gap-2 text-xs text-slate-700">
                    <span className={`h-5 w-5 shrink-0 ${item.swatch}`} />
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            <div className="nta-panel mt-4 p-4">
              <p className="text-xs font-bold uppercase text-slate-700">Navigation buttons</p>
              <ul className="mt-2 space-y-1.5 text-[11px] text-slate-600">
                <li><strong>Save &amp; Next</strong> — save answer, go to next</li>
                <li><strong>Save &amp; Mark for Review</strong> — flag and move on</li>
                <li><strong>Clear Response</strong> — remove selection</li>
                <li><strong>Submit</strong> — end the test (confirmation shown)</li>
              </ul>
            </div>
          </aside>
        </div>

        <div className="mt-6 border border-slate-400 bg-[#f3f6fb] p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 border-slate-400 text-[#1a4480] focus:ring-[#1a4480]"
            />
            <span className="text-sm text-slate-800">
              I have read and understood the instructions. I agree that in case of not adhering to the
              instructions, I shall be liable to be debarred from this test and/or disciplinary action.
            </span>
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onStart}
              disabled={!agreed || starting}
              className="nta-btn nta-btn-primary min-w-[200px] disabled:opacity-50"
            >
              {starting ? 'Starting…' : 'I am ready to begin'}
            </button>
            <Link to={backTo} className="nta-btn">Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
