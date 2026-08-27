import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { assessmentService } from '../../lib/services.js';
import { PageHeader, LoadingScreen, ErrorState, EmptyState, Badge } from '../../components/ui.jsx';
import { ChevronRight, ShieldCheck, BarChart3, Zap, BookOpen, HelpCircle, Clock, Award, Sparkles, CheckCircle2, Play, Trophy } from 'lucide-react';

export function AssessmentCard({ a }) {
  const assessmentId = a.assessment_id || a.id;
  const completed =
    a.attempt_status === 'submitted' ||
    a.attempt_status === 'auto_submitted' ||
    a.attempt_status === 'completed' ||
    (Boolean(a.submitted_at) && a.attempt_status !== 'in_progress' && a.attempt_status !== 'not_started');
  const inProgress = a.attempt_status === 'in_progress';
  const pending = a.invite_status === 'pending' || a.invite_status === 'accessed';

  const title = (a.title || '').replace(/AI Booster/gi, 'AI Improvement Test');
  const duration = a.duration_minutes || '180';
  const questionCount = a.question_count > 0 ? `${a.question_count}` : (a.question_paper_url || a.solution_pdf_url || a.access_type === 'assignment' ? 'PDF Paper' : '20');
  const totalMarks = a.passing_marks > 0 ? `${a.passing_marks}` : (a.total_marks > 0 ? `${a.total_marks}` : '80');

  // Dynamic status styling
  let statusBadge = (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-[11px] font-extrabold border border-emerald-200 dark:border-emerald-800/80 shadow-2xs shrink-0">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
      <span>Available</span>
    </span>
  );

  if (completed) {
    statusBadge = (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-[11px] font-extrabold border border-blue-200 dark:border-blue-800/80 shadow-2xs shrink-0">
        <CheckCircle2 className="h-3 w-3 text-blue-600 dark:text-blue-400" />
        <span>Completed</span>
      </span>
    );
  } else if (inProgress) {
    statusBadge = (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-[11px] font-extrabold border border-amber-200 dark:border-amber-800/80 shadow-2xs shrink-0">
        <Clock className="h-3 w-3 text-amber-600 dark:text-amber-400 animate-spin" />
        <span>In Progress</span>
      </span>
    );
  } else if (pending) {
    statusBadge = (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-[11px] font-extrabold border border-indigo-200 dark:border-indigo-800/80 shadow-2xs shrink-0">
        <Sparkles className="h-3 w-3 text-indigo-600 dark:text-indigo-400" />
        <span>Invited</span>
      </span>
    );
  }

  // Accent border color based on status
  const topAccentColor = completed
    ? 'bg-blue-500'
    : inProgress
    ? 'bg-amber-500'
    : pending
    ? 'bg-indigo-500'
    : 'bg-emerald-500';

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5">
      {/* Top Accent Strip */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${topAccentColor} opacity-80 group-hover:opacity-100 transition-opacity`} />

      <div>
        {/* Header Title & Status */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
            {title}
          </h3>
          {statusBadge}
        </div>

        {/* Description */}
        <p className="mt-2.5 line-clamp-2 text-xs text-slate-500 dark:text-slate-400 font-normal leading-relaxed">
          {a.description || 'Proctored NEET / JEE CBT format diagnostic mock exam.'}
        </p>

        {/* Attached eBook if any */}
        {(a.ebook_pdf_url || a.ebook_title) && (
          <div className="mt-3 flex items-center justify-between rounded-xl bg-indigo-50/80 dark:bg-indigo-950/50 px-3 py-1.5 text-xs text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200/80 dark:border-indigo-800/80">
            <span className="truncate flex items-center gap-1.5">
              <BookOpen className="h-4 w-4 shrink-0 text-indigo-600 dark:text-indigo-400" />
              <span className="truncate">{a.ebook_title || 'Attached Study eBook'}</span>
            </span>
            {a.ebook_pdf_url && (
              <a
                href={a.ebook_pdf_url.startsWith('http') ? a.ebook_pdf_url : `http://127.0.0.1:5000${a.ebook_pdf_url.startsWith('/') ? '' : '/'}${a.ebook_pdf_url}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 text-[11px] font-extrabold underline hover:text-indigo-900 dark:hover:text-white ml-2"
              >
                Open PDF
              </a>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-2 flex flex-col items-center justify-center">
            <p className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
              <HelpCircle className="h-3 w-3 text-slate-400" />
              <span>{questionCount}</span>
            </p>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">Questions</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-2 flex flex-col items-center justify-center">
            <p className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
              <Clock className="h-3 w-3 text-slate-400" />
              <span>{duration}</span>
            </p>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">Minutes</p>
          </div>

          <div className="rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 p-2 flex flex-col items-center justify-center">
            <p className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
              <Award className="h-3 w-3 text-slate-400" />
              <span>{totalMarks} Marks</span>
            </p>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mt-0.5">Pass Mark</p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800">
        {completed ? (
          a.attempt_id ? (
            <Link
              to={`/results/${a.attempt_id}`}
              className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-blue-200/90 dark:border-blue-900/70 bg-blue-50 dark:bg-blue-950/50 py-2.5 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 transition shadow-2xs"
            >
              <span>View Result</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          ) : (
            <button
              className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 py-2.5 text-xs font-extrabold text-slate-400 cursor-not-allowed"
              disabled
            >
              Completed
            </button>
          )
        ) : (
          <Link
            to={`/assessments/${assessmentId}/instructions`}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-sm shadow-blue-500/20 py-2.5 transition active:scale-[0.99]"
            onClick={() => sessionStorage.setItem('assessmentReturn', '/assessments')}
          >
            <span>{inProgress ? 'Resume Assessment' : 'Start Assessment'}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
}

function Meta({ label, value }) {
  return (
    <div className="rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/50 px-2 py-1.5">
      <p className="text-xs font-black text-slate-900 dark:text-white">{value}</p>
      <p className="text-[9px] font-semibold uppercase text-slate-400 mt-0.5">{label}</p>
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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Invited & Assigned Assessments</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Proctored test invitations and custom CBT mock exams assigned to your student profile.
          </p>
        </div>
      </div>

      {assessments.length === 0 ? (
        <div className="space-y-4">
          <EmptyState
            title="No Assessment Invitations Pending"
            message="You have no private proctored test invitations assigned at the moment. Explore available open test series to start practicing right away."
            action={
              <Link
                to="/test-series"
                className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-extrabold text-white shadow-md hover:bg-blue-500 transition"
              >
                <span>Browse Test Series Packs →</span>
              </Link>
            }
          />

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-cyan-300">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Real CBT Mock Simulation</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Full-screen proctored environment with live timer, question palette grid, and violation logging.
              </p>
            </div>
            <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                <BarChart3 className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">AI Score & AIR Analytics</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Instant subject-wise mark calculation, accuracy percentage, and All India Rank standing.
              </p>
            </div>
            <div className="saas-card p-4 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-1.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-300">
                <Zap className="h-4 w-4" />
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-white text-xs">Step-by-Step Solutions</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Detailed explanations and chapter tags for every question immediately after test submission.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {assessments.map((a) => (
            <AssessmentCard key={a.id} a={a} />
          ))}
        </div>
      )}
    </div>
  );
}
