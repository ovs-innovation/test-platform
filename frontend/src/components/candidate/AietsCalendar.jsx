import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Calendar as CalendarIcon,
  List,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Lock,
  Download,
  Play,
  RotateCcw,
  BarChart2,
  ChevronRight,
  Filter,
  Layers,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { ONE_YEAR_39_SCHEDULE } from '../../lib/aietsCalendarData.js';

export default function AietsCalendar() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('list'); // 'calendar' | 'timeline' | 'list'
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [phaseFilter, setPhaseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedMonth, setSelectedMonth] = useState('ALL');

  // Compute test statuses dynamically based on current time
  const testsWithStatus = useMemo(() => {
    const now = new Date('2026-10-10T10:00:00+05:30'); // Sample baseline for testing calendar engine

    return ONE_YEAR_39_SCHEDULE.map((t) => {
      const testDate = new Date(`${t.date}T09:00:00+05:30`);
      const testEndDate = new Date(`${t.date}T12:00:00+05:30`);

      let testStatus = 'Upcoming';
      if (now >= testDate && now <= testEndDate) {
        testStatus = 'Live';
      } else if (now > testEndDate) {
        testStatus = 'Expired';
      }

      // Mock attempt status for demonstration
      let attemptStatus = 'Not Started';
      let resultStatus = 'Not Available';
      let solutionStatus = 'Locked';

      if (t.sequence === 1) {
        attemptStatus = 'Attempted';
        resultStatus = 'Published';
        solutionStatus = 'Available';
      } else if (t.sequence === 2) {
        attemptStatus = 'In Progress';
        resultStatus = 'Processing';
        solutionStatus = 'Locked';
      } else if (testStatus === 'Expired' && t.sequence < 5) {
        attemptStatus = 'Missed';
        resultStatus = 'Not Available';
        solutionStatus = 'Available';
      }

      return {
        ...t,
        testStatus,
        attemptStatus,
        resultStatus,
        solutionStatus,
        month: new Date(t.date).toLocaleString('default', { month: 'long', year: 'numeric' })
      };
    });
  }, []);

  // Filtered test items
  const filteredTests = useMemo(() => {
    return testsWithStatus.filter((t) => {
      if (typeFilter !== 'ALL' && t.type !== typeFilter) return false;
      if (phaseFilter !== 'ALL' && t.phase !== phaseFilter) return false;
      if (statusFilter !== 'ALL' && t.testStatus !== statusFilter) return false;
      if (selectedMonth !== 'ALL' && t.month !== selectedMonth) return false;
      return true;
    });
  }, [testsWithStatus, typeFilter, phaseFilter, statusFilter, selectedMonth]);

  // Unique months list
  const months = useMemo(() => {
    const set = new Set(testsWithStatus.map((t) => t.month));
    return Array.from(set);
  }, [testsWithStatus]);

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126] p-6 shadow-xl space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-[#2563eb] animate-pulse" />
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#2563eb]">
              AIETS 2026-2027 Program Schedule
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white mt-0.5 tracking-tight">
            AIETS Calendar & Testing Schedule
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Server-authoritative assessment calendar for All India Edvedum Test Series.
          </p>
        </div>

        {/* View Switcher Controls */}
        <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setViewMode('list')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold transition cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-800 text-[#2563eb] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="h-4 w-4" />
            <span>List View</span>
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold transition cursor-pointer ${
              viewMode === 'timeline'
                ? 'bg-white dark:bg-slate-800 text-[#2563eb] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="h-4 w-4" />
            <span>Timeline</span>
          </button>
          <button
            onClick={() => setViewMode('calendar')}
            className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-extrabold transition cursor-pointer ${
              viewMode === 'calendar'
                ? 'bg-white dark:bg-slate-800 text-[#2563eb] shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarIcon className="h-4 w-4" />
            <span>Calendar</span>
          </button>
        </div>
      </div>

      {/* FILTER CONTROLS BAR */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
        <div>
          <label className="block text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-1">
            Test Type
          </label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">All Test Types</option>
            <option value="AIETS">AIETS Mocks</option>
            <option value="UNIT_TEST">Unit Tests</option>
            <option value="PART_TEST">Part Tests</option>
            <option value="CUMULATIVE_TEST">Cumulative Tests</option>
            <option value="FULL_SYLLABUS_MOCK">Full-Syllabus Mocks</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-1">
            Preparation Phase
          </label>
          <select
            value={phaseFilter}
            onChange={(e) => setPhaseFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">All Phases</option>
            <option value="CONCEPT_BUILDING">Concept Building</option>
            <option value="PROGRESS_TRACKING">Progress Tracking</option>
            <option value="REVISION_CUMULATIVE">Revision Cumulative</option>
            <option value="INTENSIVE_TESTING">Intensive Testing</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-1">
            Test Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">All Statuses</option>
            <option value="Live">🟢 Live Now</option>
            <option value="Upcoming">⏳ Upcoming</option>
            <option value="Expired">⌛ Expired</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] font-extrabold uppercase text-slate-500 dark:text-slate-400 mb-1">
            Filter Month
          </label>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
          >
            <option value="ALL">All Months ({filteredTests.length})</option>
            {months.map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* RENDER ACTIVE VIEW */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredTests.map((test) => (
            <div
              key={test.sequence}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs hover:border-[#2563eb]/50 transition"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-[#2563eb] bg-blue-50 dark:bg-blue-900/40 px-2.5 py-0.5 rounded-md border border-blue-100 dark:border-blue-800">
                    #{test.sequence}
                  </span>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    {test.type.replace('_', ' ')}
                  </span>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    {test.phase.replace('_', ' ')}
                  </span>

                  {/* Status Chips */}
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    test.testStatus === 'Live' ? 'bg-emerald-50 text-emerald-700 border-emerald-200 animate-pulse' :
                    test.testStatus === 'Upcoming' ? 'bg-blue-50 text-[#2563eb] border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {test.testStatus}
                  </span>
                </div>

                <h4 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {test.name}
                </h4>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1">
                    <CalendarIcon className="h-3.5 w-3.5 text-[#2563eb]" />
                    <span>{test.date} (09:00 AM - 12:00 PM IST)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5 text-[#2563eb]" />
                    <span>180 Mins • 720 Marks</span>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100 dark:border-slate-800">
                {test.testStatus === 'Live' && (
                  <button
                    onClick={() => navigate(`/test-series`)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-4 py-2 text-xs font-bold text-white shadow-md transition cursor-pointer"
                  >
                    <Play className="h-3.5 w-3.5" />
                    <span>Start Test Now</span>
                  </button>
                )}

                {test.attemptStatus === 'Attempted' && (
                  <button
                    onClick={() => navigate(`/candidate/analytics`)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563eb] hover:bg-blue-700 px-4 py-2 text-xs font-bold text-white shadow-md transition cursor-pointer"
                  >
                    <BarChart2 className="h-3.5 w-3.5" />
                    <span>View Score & AIR</span>
                  </button>
                )}

                {test.solutionStatus === 'Available' && (
                  <button
                    onClick={() => alert(`Downloading solution PDF for ${test.name}`)}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 transition cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5 text-[#2563eb]" />
                    <span>Solution PDF</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'timeline' && (
        <div className="relative pl-6 space-y-6 border-l-2 border-slate-200 dark:border-slate-800 ml-3 py-2">
          {filteredTests.map((test) => (
            <div key={test.sequence} className="relative group">
              <div className="absolute -left-[31px] top-1.5 h-4 w-4 rounded-full border-2 border-white dark:border-slate-900 bg-[#2563eb]" />
              <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-[#2563eb] font-bold">Sequence #{test.sequence} • {test.date}</span>
                  <span className="font-bold text-slate-500">{test.phase}</span>
                </div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base">{test.name}</h4>
                <p className="text-xs text-slate-500">180 Mins • 720 Marks • NTA Pattern CBT</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'calendar' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTests.map((test) => (
            <div key={test.sequence} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-[#2563eb] font-bold text-[10px]">
                  {test.date}
                </span>
                <span className="text-[10px] font-mono text-slate-400">#{test.sequence}</span>
              </div>
              <h5 className="font-extrabold text-slate-900 dark:text-white text-sm">{test.name}</h5>
              <p className="text-xs text-slate-500">{test.type.replace('_', ' ')}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
