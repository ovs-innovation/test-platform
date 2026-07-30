import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  Clock,
  Award,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  Play
} from 'lucide-react';
import { ONE_YEAR_39_SCHEDULE } from '../../lib/aietsCalendarData.js';
import TestDetailDrawer from './TestDetailDrawer.jsx';

export default function DashboardScheduleSnapshot() {
  const navigate = useNavigate();
  const [selectedTest, setSelectedTest] = useState(null);

  // Compute upcoming schedule
  const totalTests = ONE_YEAR_39_SCHEDULE.length; // 39 tests
  const completedCount = 0;
  const upcomingCount = 39;

  // Next test spotlight (First scheduled test)
  const nextTest = ONE_YEAR_39_SCHEDULE[0] || {
    sequence: 1,
    name: 'Unit Test 1',
    date: '2026-10-04',
    type: 'UNIT_TEST',
    phase: 'CONCEPT_BUILDING',
  };

  // Next 3 scheduled tests for compact list
  const nextThree = ONE_YEAR_39_SCHEDULE.slice(0, 3);

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126] p-6 shadow-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2563EB] dark:bg-[#00F0FF] animate-pulse" />
            <span className="text-xs font-extrabold text-[#2563EB] dark:text-[#00F0FF] uppercase tracking-wider">
              Official Assessment Schedule
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">
            AIETS 2027 Schedule
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Track your upcoming assessments and preparation progress.
          </p>
        </div>

        <Link
          to="/aiets-calendar"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-lg shadow-blue-500/25 transition cursor-pointer shrink-0"
        >
          <span>Open Full AIETS Calendar</span>
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Spotlight + Progress Grid */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        {/* Next Test Spotlight Card (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-blue-200/80 dark:border-blue-500/30 bg-gradient-to-br from-blue-50/90 via-indigo-50/80 to-blue-100/70 dark:from-blue-950/40 dark:via-[#0a1836] dark:to-[#071126] p-5 sm:p-6 text-slate-900 dark:text-white space-y-4 relative overflow-hidden flex flex-col justify-between shadow-xs">
          <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-400/20 dark:bg-cyan-400/10 blur-2xl" />

          <div className="space-y-3 relative z-10">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-blue-600/10 border border-blue-500/30 text-blue-700 dark:bg-cyan-500/20 dark:border-cyan-400/40 dark:text-cyan-200">
                Next Spotlight Assessment
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase bg-emerald-600/10 border border-emerald-500/30 text-emerald-700 dark:bg-emerald-500/20 dark:border-emerald-400/40 dark:text-emerald-200 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Upcoming
              </span>
            </div>

            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {nextTest.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Phase 1: <span className="text-blue-700 dark:text-slate-200 font-semibold">Concept Building</span> (Oct–Dec 2026)
              </p>
              <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-800 dark:text-cyan-300 font-mono font-bold text-xs">
                <Clock className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400" />
                <span>66 days until {nextTest.name}</span>
              </div>
            </div>

            {/* Test Details Pill Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/60 border border-blue-200/60 dark:border-slate-800 text-xs shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">Date</span>
                <span className="font-extrabold text-slate-900 dark:text-white">{formatDate(nextTest.date)}</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/60 border border-blue-200/60 dark:border-slate-800 text-xs shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">Timing</span>
                <span className="font-extrabold text-slate-900 dark:text-white">9:00 AM IST</span>
              </div>

              <div className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/60 border border-blue-200/60 dark:border-slate-800 text-xs col-span-2 sm:col-span-1 shadow-2xs">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px] font-semibold">Duration & Marks</span>
                <span className="font-extrabold text-slate-900 dark:text-white">3 hrs • 720 Marks</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-blue-200/80 dark:border-slate-800/80 flex items-center justify-between gap-3 relative z-10">
            <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">
              Schedule Status: <strong className="text-blue-700 dark:text-cyan-300 font-semibold">Oct 4, 2026</strong>
            </span>
            <button
              type="button"
              onClick={() => setSelectedTest(nextTest)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 dark:bg-cyan-500/20 dark:hover:bg-cyan-500/30 border border-blue-600 dark:border-cyan-400/40 text-white dark:text-cyan-300 font-extrabold text-xs shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              View Details →
            </button>
          </div>
        </div>

        {/* Program Progress Ring & Metrics (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#0b1836] p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              AIETS 2027 Program Progress
            </h4>
            <div className="mt-3 flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 rounded-full border-4 border-blue-500/20 flex items-center justify-center font-black text-sm text-blue-600 dark:text-cyan-300">
                0%
              </div>
              <div className="space-y-1">
                <p className="text-sm font-extrabold text-slate-900 dark:text-white">
                  0 of 39 Tests Completed
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Full 1-Year Comprehensive CBT Test Series
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-300 font-medium">
              <span>Upcoming Scheduled Tests</span>
              <span className="font-bold text-slate-900 dark:text-white">39</span>
            </div>
            <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 w-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming 3 Scheduled Tests Rows */}
      <div className="space-y-3 pt-2">
        <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Next Scheduled Assessments
        </h4>

        <div className="grid gap-2.5">
          {nextThree.map((t) => (
            <div
              key={t.sequence}
              onClick={() => setSelectedTest(t)}
              className="group p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/70 dark:bg-[#0a152e] hover:border-blue-500/50 hover:bg-white dark:hover:bg-[#0f1d3d] transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center font-mono font-black text-xs text-blue-600 dark:text-cyan-300">
                  #{t.sequence}
                </div>
                <div>
                  <h5 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition">
                    {t.name}
                  </h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatDate(t.date)} • 9:00 AM IST
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <span className="px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-300">
                  {t.type === 'UNIT_TEST' ? 'Unit Test' : t.type}
                </span>
                <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Test Detail Drawer Modal */}
      {selectedTest && (
        <TestDetailDrawer test={selectedTest} onClose={() => setSelectedTest(null)} />
      )}
    </div>
  );
}
