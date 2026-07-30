import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  Award,
  BookOpen,
  CheckCircle2,
  Play,
  BarChart2,
  Sparkles,
  Layers
} from 'lucide-react';

export default function TestDetailDrawer({ test, onClose }) {
  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Body scroll lock and Esc key listener
  useEffect(() => {
    // Disable background page scrolling when drawer is open
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    drawerRef.current?.focus();

    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!test) return null;

  const formatDate = (dateStr) => {
    if (!dateStr) return 'TBA';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  const getPhaseLabel = (phaseStr) => {
    switch (phaseStr) {
      case 'CONCEPT_BUILDING':
        return 'Concept Building (Oct–Dec 2026)';
      case 'PROGRESS_TRACKING':
        return 'Progress & Performance (Jan–Feb 2027)';
      case 'REVISION_CUMULATIVE':
        return 'Revision & Cumulative Assessment (Mar 2027)';
      case 'INTENSIVE_TESTING':
        return 'Intensive Testing (Apr 2027)';
      default:
        return phaseStr || 'Comprehensive Assessment';
    }
  };

  const getTypeStyle = (typeStr) => {
    switch (typeStr) {
      case 'UNIT_TEST':
        return { badge: 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400', name: 'Unit Test' };
      case 'AIETS':
        return { badge: 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400', name: 'AIETS Test' };
      case 'PART_TEST':
        return { badge: 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-300', name: 'Part Test' };
      case 'CUMULATIVE_TEST':
        return { badge: 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400', name: 'Cumulative Test' };
      case 'FULL_SYLLABUS_MOCK':
        return { badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400', name: 'Full-Syllabus Mock' };
      default:
        return { badge: 'bg-slate-500/10 border-slate-500/30 text-slate-600 dark:text-slate-400', name: typeStr || 'Test' };
    }
  };

  const typeInfo = getTypeStyle(test.type);

  const drawerContent = (
    <div className="fixed inset-0 z-[999] overflow-hidden bg-slate-950/60 dark:bg-slate-950/80 backdrop-blur-md flex justify-end animate-in fade-in duration-200">
      {/* Full Backdrop Click Handler */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Slide-over Drawer Panel */}
      <div
        ref={drawerRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-lg bg-white dark:bg-[#0a1329] border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto shadow-2xl flex flex-col focus:outline-none"
      >
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white dark:bg-[#070e20] p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-blue-600 dark:bg-[#00F0FF] animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-blue-600 dark:text-cyan-400 font-extrabold">
              Test #{test.sequence || test.id} Details
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 flex-1 text-slate-900 dark:text-white">
          {/* Main Title & Type */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-2.5 py-0.5 rounded-md text-[11px] font-extrabold uppercase border ${typeInfo.badge}`}>
                {typeInfo.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                {test.status || 'Upcoming'}
              </span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
              {test.name || test.title}
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Phase: <strong className="text-blue-600 dark:text-cyan-300">{getPhaseLabel(test.phase)}</strong>
            </p>
          </div>

          {/* Timing & Marks Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1835] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <CalendarIcon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
                <span>Scheduled Date</span>
              </div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">{formatDate(test.date)}</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1835] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <Clock className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                <span>Timing & Duration</span>
              </div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">9:00 AM–12:00 PM (3 hrs)</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1835] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <Award className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                <span>Maximum Marks</span>
              </div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">{test.total_marks || 720} Marks</p>
            </div>

            <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0d1835] space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                <Layers className="h-3.5 w-3.5 text-purple-600 dark:text-purple-400" />
                <span>Format</span>
              </div>
              <p className="text-sm font-extrabold text-slate-900 dark:text-white">NTA CBT Interface</p>
            </div>
          </div>

          {/* Syllabus Coverage Summary */}
          <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#081226] space-y-3">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-blue-600 dark:text-cyan-400 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
              <span>Syllabus & Topics Covered</span>
            </h3>

            <div className="space-y-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500 dark:text-slate-400">Physics:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">Rotation, Mechanics, Thermodynamics</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 dark:border-slate-800 pb-1.5">
                <span className="text-slate-500 dark:text-slate-400">Chemistry:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">Organic Mechanisms, Periodic Table, Electrochemistry</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Biology / Math:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-200">Cell Biology, Genetics, Human Physiology</span>
              </div>
            </div>
          </div>

          {/* Exam Instructions Notice */}
          <div className="p-4 rounded-2xl border border-blue-500/20 bg-blue-50 dark:bg-blue-500/10 text-xs space-y-2 text-blue-900 dark:text-blue-200">
            <p className="font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Exam Environment Instructions</span>
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-700 dark:text-slate-300">
              <li>Full NTA CBT computer-based test platform interface.</li>
              <li>Camera proctoring & tab-switch tracking enabled.</li>
              <li>Detailed All India Rank (AIR) and analysis after test window completion.</li>
            </ul>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#070e20] space-y-3">
          {test.status === 'Live' ? (
            <button
              type="button"
              onClick={() => {
                onClose?.();
                navigate(`/assessments/${test.id}/instructions`);
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.01] transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="h-4 w-4" />
              <span>Start Live Assessment Now →</span>
            </button>
          ) : test.status === 'Attempted' || test.resultStatus === 'Published' ? (
            <button
              type="button"
              onClick={() => {
                onClose?.();
                navigate('/results');
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-extrabold text-sm shadow-lg shadow-purple-500/20 hover:scale-[1.01] transition cursor-pointer flex items-center justify-center gap-2"
            >
              <BarChart2 className="h-4 w-4" />
              <span>View Score & Performance Analysis →</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-extrabold text-sm transition cursor-pointer flex items-center justify-center gap-2"
            >
              <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-cyan-400" />
              <span>Scheduled for {formatDate(test.date)}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(drawerContent, document.body);
}
