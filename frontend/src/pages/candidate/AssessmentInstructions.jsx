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
      const returnPath =
        found.access_type === 'enrollment' && found.series_slug
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
        <div className="nta-panel max-w-md p-8 text-center rounded-xl shadow-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">Already completed</h1>
          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">You have already submitted this assessment.</p>
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
        <div className="nta-panel max-w-md p-8 text-center rounded-xl shadow-lg border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827]">
          <h1 className="text-lg font-extrabold text-slate-900 dark:text-white">Test in progress</h1>
          <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-400">Resume your ongoing attempt.</p>
          <Link to={`/exam/${assessment.attempt_id}`} className="nta-btn nta-btn-primary mt-4 inline-block">Resume exam</Link>
        </div>
      </div>
    );
  }

  const now = new Date();
  const isFuture = assessment.available_from && new Date(assessment.available_from) > now;
  const isExpired = assessment.available_until && new Date(assessment.available_until) < now;

  return (
    <div className="exam-surface min-h-screen bg-slate-50 text-slate-900 dark:bg-[#070c18] dark:text-slate-100 font-sans">
      {/* Top NTA Blue Header */}
      <header className="nta-bar px-4 py-2.5">
        <p className="text-sm font-black uppercase tracking-wide text-white">Computer Based Test — General Instructions</p>
        <p className="mt-0.5 text-xs font-medium text-blue-100 dark:text-blue-200">Read all instructions carefully before proceeding</p>
      </header>

      {/* Candidate Metadata Sub-Bar */}
      <div className="nta-bar-sub px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 flex flex-wrap items-center gap-x-2 gap-y-1">
        <span className="font-semibold text-slate-500 dark:text-slate-400">Candidate:</span>
        <span className="font-bold text-slate-900 dark:text-white">{user?.name || 'Student'}</span>
        <span className="text-slate-400 font-normal">·</span>
        <span className="font-semibold text-slate-500 dark:text-slate-400">Roll No:</span>
        <span className="font-mono font-bold text-blue-600 dark:text-cyan-300">{rollNo}</span>
        <span className="text-slate-400 font-normal">·</span>
        <span className="font-semibold text-slate-500 dark:text-slate-400">Test:</span>
        <span className="font-bold text-slate-900 dark:text-amber-300">{assessment.title}</span>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        <Link to={backTo} className="mb-4 inline-flex items-center gap-1 text-xs font-bold uppercase text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition">
          ← Back
        </Link>

        <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
          <div>
            {isFuture && (
              <div className="mb-5 rounded-xl border border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40 p-4 text-sm text-blue-900 dark:text-blue-200">
                <p className="font-bold">This test is scheduled for the future.</p>
                <p className="mt-1 font-medium">
                  You will be able to start this exam starting on{' '}
                  <strong className="font-bold">{new Date(assessment.available_from).toLocaleString()}</strong>.
                </p>
              </div>
            )}

            {isExpired && (
              <div className="mb-5 rounded-xl border border-red-300 bg-red-50 dark:border-red-800 dark:bg-red-950/40 p-4 text-sm text-red-900 dark:text-red-200">
                <p className="font-bold">This test slot has expired.</p>
                <p className="mt-1 font-medium">
                  The availability window for this test closed on{' '}
                  <strong className="font-bold">{new Date(assessment.available_until).toLocaleString()}</strong>. You can no longer start this assessment.
                </p>
              </div>
            )}

            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{assessment.title}</h1>
            {assessment.description && (
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">{assessment.description}</p>
            )}

            {/* Test Details Table */}
            <div className="mt-5 overflow-hidden rounded-xl border border-slate-300 dark:border-slate-700 shadow-xs">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-300 dark:border-slate-700 bg-[#f3f6fb] dark:bg-slate-800/80">
                    <td className="border-r border-slate-300 dark:border-slate-700 px-3.5 py-2.5 font-bold text-slate-900 dark:text-slate-100">Duration</td>
                    <td className="px-3.5 py-2.5 font-extrabold text-blue-600 dark:text-blue-400">{assessment.duration_minutes || 180} minutes</td>
                    <td className="border-l border-r border-slate-300 dark:border-slate-700 px-3.5 py-2.5 font-bold text-slate-900 dark:text-slate-100">Questions</td>
                    <td className="px-3.5 py-2.5 font-extrabold text-slate-900 dark:text-slate-100">
                      {assessment.question_count > 0 ? assessment.question_count : (assessment.question_paper_url || assessment.solution_pdf_url ? 'PDF Test Paper' : '10 (PDF Paper)')}
                    </td>
                  </tr>
                  <tr className="bg-white dark:bg-[#111827]">
                    <td className="border-r border-slate-300 dark:border-slate-700 px-3.5 py-2.5 font-bold text-slate-900 dark:text-slate-100">Total marks</td>
                    <td className="px-3.5 py-2.5 font-extrabold text-emerald-600 dark:text-emerald-400">{assessment.total_marks > 0 ? assessment.total_marks : '300 Marks'}</td>
                    <td className="border-l border-r border-slate-300 dark:border-slate-700 px-3.5 py-2.5 font-bold text-slate-900 dark:text-slate-100">Passing marks</td>
                    <td className="px-3.5 py-2.5 font-extrabold text-amber-600 dark:text-amber-400">
                      {assessment.passing_marks > 0 ? assessment.passing_marks : (assessment.total_marks > 0 ? `${Math.round(assessment.total_marks * 0.45)} Marks` : '120 Marks')}
                    </td>
                  </tr>
                  {assessment.max_violations > 0 && (
                    <tr className="border-t border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111827]">
                      <td className="border-r border-slate-300 dark:border-slate-700 px-3.5 py-2.5 font-bold text-slate-900 dark:text-slate-100">Violation limit</td>
                      <td className="px-3.5 py-2.5 font-extrabold text-rose-600 dark:text-rose-400" colSpan={3}>{assessment.max_violations}</td>
                    </tr>
                  )}
                  {(assessment.available_from || assessment.available_until) && (
                    <tr className="border-t border-slate-300 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-900/60">
                      <td className="border-r border-slate-300 dark:border-slate-700 px-3.5 py-2.5 font-bold text-slate-900 dark:text-slate-100">Available window</td>
                      <td className="px-3.5 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300" colSpan={3}>
                        {assessment.available_from ? new Date(assessment.available_from).toLocaleString() : 'Open now'}
                        {' — '}
                        {assessment.available_until ? new Date(assessment.available_until).toLocaleString() : 'No end limit'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {(assessment.question_paper_url || assessment.solution_pdf_url) && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                <div className="flex items-center gap-2">
                  <span className="text-base">📄</span>
                  <span>Question Paper PDF is uploaded for this test. You can view the question paper inside the exam player.</span>
                </div>
                {assessment.question_paper_url && (
                  <a
                    href={assessment.question_paper_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-emerald-600 px-3.5 py-1.5 font-bold text-white shadow-xs hover:bg-emerald-700 transition"
                  >
                    Preview Question PDF
                  </a>
                )}
              </div>
            )}

            {/* Exam-Specific Instructions Box */}
            {assessment.instructions && (
              <div className="mt-5 rounded-xl border border-amber-400/80 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-500/40 p-4 text-sm text-amber-950 dark:text-amber-200 shadow-xs">
                <p className="mb-1 text-xs font-black uppercase text-amber-900 dark:text-amber-300 tracking-wider">Exam-specific instructions</p>
                <div className="font-medium leading-relaxed whitespace-pre-line">{assessment.instructions}</div>
              </div>
            )}

            {/* General Instructions Section */}
            <p className="mt-6 text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">General instructions</p>
            <div className="nta-instructions-scroll mt-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              <ol className="list-decimal space-y-2.5 pl-5 text-slate-800 dark:text-slate-200">
                {GENERAL_RULES.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ol>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="h-fit space-y-4">
            {/* Question Palette Legend Panel */}
            <div className="nta-panel p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">Question palette legend</p>
              <p className="mt-0.5 text-[11px] text-slate-500 dark:text-slate-400 font-medium">Colours used during the exam</p>
              <ul className="mt-3 space-y-2.5">
                {PALETTE_LEGEND.map((item) => (
                  <li key={item.key} className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                    <span className={`h-6 w-6 ${item.swatch}`}>
                      {item.num}
                    </span>
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Buttons Panel */}
            <div className="nta-panel p-4 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-xs">
              <p className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white">Navigation buttons</p>
              <ul className="mt-2.5 space-y-2 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                <li><strong className="text-slate-900 dark:text-white font-extrabold">Save &amp; Next</strong> — save answer, go to next</li>
                <li><strong className="text-slate-900 dark:text-white font-extrabold">Save &amp; Mark for Review</strong> — flag and move on</li>
                <li><strong className="text-slate-900 dark:text-white font-extrabold">Clear Response</strong> — remove selection</li>
                <li><strong className="text-slate-900 dark:text-white font-extrabold">Submit</strong> — end the test (confirmation shown)</li>
              </ul>
            </div>
          </aside>
        </div>

        {/* Bottom Declaration Box */}
        <div className="mt-6 rounded-xl border border-slate-300 dark:border-slate-800 bg-[#f3f6fb] dark:bg-[#111827] p-5 shadow-xs">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-slate-400 dark:border-slate-600 text-[#1a4480] dark:text-blue-600 focus:ring-[#1a4480] accent-blue-600 cursor-pointer"
            />
            <span className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 leading-relaxed">
              I have read and understood the instructions. I agree that in case of not adhering to the
              instructions, I shall be liable to be debarred from this test and/or disciplinary action.
            </span>
          </label>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onStart}
              disabled={!agreed || starting || isFuture || isExpired}
              className="nta-btn nta-btn-primary min-w-[200px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed font-extrabold shadow-md"
            >
              {starting ? 'Starting…' : isFuture ? 'Not started yet' : isExpired ? 'Test Expired' : 'I am ready to begin'}
            </button>
            <Link to={backTo} className="nta-btn font-bold">Cancel</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
