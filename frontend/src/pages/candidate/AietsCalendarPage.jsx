import { useState, useMemo, useEffect, useRef } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
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
  ChevronLeft,
  ChevronDown,
  Filter,
  Layers,
  Sparkles,
  BookOpen,
  Award,
  Search,
  X,
  Building2,
  School,
  ArrowUpRight
} from 'lucide-react';
import { ONE_YEAR_39_SCHEDULE } from '../../lib/aietsCalendarData.js';
import { calendarService, authService } from '../../lib/services.js';
import TestDetailDrawer from '../../components/candidate/TestDetailDrawer.jsx';

// Custom Floating Popover Dropdown for Filter Toolbar
function CustomFilterSelect({ value, onChange, options }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOpt = options.find((o) => o.value === value) || options[0];

  return (
    <div className="relative shrink-0" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer shadow-2xs ${
          value !== 'ALL'
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-300'
            : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a152e] text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <span>{selectedOpt.label}</span>
        <ChevronDown className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute left-0 z-50 mt-1.5 min-w-[190px] max-h-60 overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition cursor-pointer ${
                value === o.value
                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-cyan-300'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60'
              }`}
            >
              <span>{o.label}</span>
              {value === o.value && <CheckCircle2 className="h-3.5 w-3.5 text-blue-600 dark:text-cyan-400 shrink-0" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function AietsCalendarPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Custom Program Selector Dropdown State
  const [programDropdownOpen, setProgramDropdownOpen] = useState(false);
  const programDropdownRef = useRef(null);

  const programs = [
    { id: 'neet-ug-2027-aiets-comprehensive-test-series', label: 'AIETS NEET-UG 2027 (39 Tests)', badge: '1-Year' },
    { id: 'aiets-neet-ug-2028-two-year-online-cbt-program', label: 'AIETS NEET-UG 2028 (60 Tests)', badge: '2-Year' },
  ];

  // URL Sync State
  const initialProgram = searchParams.get('program') || 'neet-ug-2027-aiets-comprehensive-test-series';
  const initialView = searchParams.get('view') || 'calendar';

  const [selectedProgram, setSelectedProgram] = useState(initialProgram);
  const [viewMode, setViewMode] = useState(initialView); // 'calendar' | 'timeline' | 'list'

  // Click outside listener for custom dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (programDropdownRef.current && !programDropdownRef.current.contains(e.target)) {
        setProgramDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [phaseFilter, setPhaseFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedMonthFilter, setSelectedMonthFilter] = useState('ALL');
  const [apiTests, setApiTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);

  // Calendar Month Navigation (Default to real-time current month)
  const [currentCalendarDate, setCurrentCalendarDate] = useState(() => new Date());

  // Selected Test for Detail Drawer
  const [activeTest, setActiveTest] = useState(null);

  useEffect(() => {
    calendarService.getCalendar()
      .then((data) => {
        if (data && Array.isArray(data.tests)) {
          setApiTests(data.tests);
        }
      })
      .catch((err) => console.error('Error fetching student calendar:', err));

    authService.candidateDashboard()
      .then((data) => {
        if (data && Array.isArray(data.completed)) {
          setCompletedTests(data.completed);
        }
      })
      .catch((err) => console.error('Error fetching completed tests:', err));
  }, []);

  // Sync state with URL params
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('program', selectedProgram);
    params.set('view', viewMode);
    setSearchParams(params, { replace: true });
  }, [selectedProgram, viewMode, setSearchParams, searchParams]);

  // Normalization Helpers for Types and Phases
  const normalizeTestType = (str) => {
    if (!str) return 'UNIT_TEST';
    const val = String(str).toUpperCase().replace(/[\s_\-]+/g, '');
    if (val.includes('UNIT')) return 'UNIT_TEST';
    if (val.includes('AIETS')) return 'AIETS';
    if (val.includes('PART')) return 'PART_TEST';
    if (val.includes('CUMULATIVE')) return 'CUMULATIVE_TEST';
    if (val.includes('FULL') || val.includes('MOCK')) return 'FULL_SYLLABUS_MOCK';
    return val;
  };

  const normalizePhase = (str) => {
    if (!str) return 'CONCEPT_BUILDING';
    const val = String(str).toUpperCase().replace(/[\s_\-]+/g, '');
    if (val.includes('CONCEPT') || val.includes('BUILDING') || val.includes('PHASE1') || val.includes('PHASEI')) return 'CONCEPT_BUILDING';
    if (val.includes('PROGRESS') || val.includes('TRACKING') || val.includes('PERFORMANCE') || val.includes('PHASE2') || val.includes('PHASEII')) return 'PROGRESS_TRACKING';
    if (val.includes('REVISION') || val.includes('CUMULATIVE') || val.includes('PHASE3') || val.includes('PHASEIII')) return 'REVISION_CUMULATIVE';
    if (val.includes('INTENSIVE') || val.includes('TESTING') || val.includes('PHASE4') || val.includes('PHASEIV')) return 'INTENSIVE_TESTING';
    return val;
  };

  // Helper matching function to link completed candidate attempts to calendar tests
  const isCompletedTest = (testObj) => {
    if (!completedTests || completedTests.length === 0) return false;
    const testIdStr = String(testObj.testId || testObj.id || '').replace(/^db-/, '');
    const testNameNorm = String(testObj.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');

    return completedTests.some((c) => {
      const cIdStr = String(c.id || c.assessment_id || '');
      if (cIdStr && testIdStr && (cIdStr === testIdStr || testIdStr.endsWith(cIdStr))) return true;

      const cTitleNorm = String(c.title || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cTitleNorm && testNameNorm) {
        if (cTitleNorm === testNameNorm) return true;
        if (cTitleNorm.includes(testNameNorm) || testNameNorm.includes(cTitleNorm)) return true;

        const num1 = (cTitleNorm.match(/unittest\d+/g) || [])[0];
        const num2 = (testNameNorm.match(/unittest\d+/g) || [])[0];
        if (num1 && num2) {
          const d1 = num1.replace(/\D/g, '').padStart(2, '0');
          const d2 = num2.replace(/\D/g, '').padStart(2, '0');
          if (d1 === d2) return true;
        }
      }
      return false;
    });
  };

  // Compute test statuses dynamically based on current real-time clock and backend tests
  const scheduleDataset = useMemo(() => {
    const now = new Date(); // Actual current time

    const formattedDbTests = apiTests.map((t) => {
      let dateStr = '';
      if (t.test_date) {
        dateStr = typeof t.test_date === 'string' ? t.test_date.split('T')[0] : new Date(t.test_date).toISOString().split('T')[0];
      } else {
        dateStr = now.toISOString().split('T')[0];
      }

      const d = new Date(dateStr);
      const monthYear = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });
      const rawType = t.test_type || t.type || t.test_name || 'Unit Test';

      const isDone = isCompletedTest({ id: t.id, name: t.test_name || t.title, testId: t.id }) ||
        t.computed_status === 'Attempted' || t.computed_status === 'Result Published';
      const status = isDone ? 'Attempted' : (t.computed_status || 'Upcoming');

      return {
        id: `db-${t.id}`,
        testId: t.id,
        sequence: t.id,
        name: t.test_name || t.title || 'Published Assessment',
        type: normalizeTestType(rawType),
        rawTypeDisplay: rawType,
        date: dateStr,
        startTime: t.start_time || '10:00:00',
        endTime: t.end_time || '12:00:00',
        durationMinutes: t.duration_minutes || 180,
        syllabus: t.syllabus || 'Syllabus configured by Admin.',
        maxMarks: t.max_marks || 180,
        status,
        monthYear,
        formattedDate: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }),
        phase: normalizePhase(t.phase || 'CONCEPT_BUILDING'),
        isDbTest: true,
      };
    });

    const staticSchedule = ONE_YEAR_39_SCHEDULE.map((t) => {
      const testDate = new Date(`${t.date}T09:00:00+05:30`);
      const testEndDate = new Date(`${t.date}T12:00:00+05:30`);

      let rawStatus = 'Upcoming';
      if (now >= testDate && now <= testEndDate) {
        rawStatus = 'Live';
      } else if (now > testEndDate) {
        rawStatus = 'Expired';
      }

      const isDone = isCompletedTest(t);
      const status = isDone ? 'Attempted' : rawStatus;

      const d = new Date(t.date);
      const monthYear = d.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

      return {
        ...t,
        type: normalizeTestType(t.type),
        phase: normalizePhase(t.phase),
        status,
        monthYear,
        formattedDate: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }),
      };
    });

    const existingDates = new Set(formattedDbTests.map((t) => t.date));
    const filteredStatic = staticSchedule.filter((t) => !existingDates.has(t.date));

    return [...formattedDbTests, ...filteredStatic].sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [apiTests, completedTests]);

  // Dynamic countdown in days for next assessment
  const getCountdownDays = (dateStr) => {
    if (!dateStr) return 0;
    const target = new Date(`${dateStr}T09:00:00+05:30`);
    const now = new Date();
    const diffTime = target - now;
    return Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
  };

  // Filtered schedule
  const filteredSchedule = useMemo(() => {
    return scheduleDataset.filter((t) => {
      if (typeFilter !== 'ALL' && normalizeTestType(t.type) !== normalizeTestType(typeFilter)) return false;
      if (phaseFilter !== 'ALL' && normalizePhase(t.phase) !== normalizePhase(phaseFilter)) return false;
      if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
      if (selectedMonthFilter !== 'ALL' && t.monthYear !== selectedMonthFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = t.name.toLowerCase().includes(q);
        const matchType = String(t.type).toLowerCase().includes(q);
        if (!matchName && !matchType) return false;
      }
      return true;
    });
  }, [scheduleDataset, typeFilter, phaseFilter, statusFilter, selectedMonthFilter, searchQuery]);

  // Active filter count
  const activeFilterCount = (typeFilter !== 'ALL' ? 1 : 0) +
    (phaseFilter !== 'ALL' ? 1 : 0) +
    (statusFilter !== 'ALL' ? 1 : 0) +
    (selectedMonthFilter !== 'ALL' ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  // Months list for dropdown
  const uniqueMonths = useMemo(() => {
    const set = new Set(scheduleDataset.map((t) => t.monthYear));
    return Array.from(set);
  }, [scheduleDataset]);

  // Grouped by Month for List View
  const groupedByMonth = useMemo(() => {
    const groups = {};
    filteredSchedule.forEach((t) => {
      if (!groups[t.monthYear]) groups[t.monthYear] = [];
      groups[t.monthYear].push(t);
    });
    return groups;
  }, [filteredSchedule]);

  // Grouped by Phase for Timeline View
  const groupedByPhase = useMemo(() => {
    const phases = [
      { key: 'CONCEPT_BUILDING', title: 'Concept Building', range: 'October–December 2026', accent: 'border-t-blue-500', color: 'text-blue-600 dark:text-blue-400' },
      { key: 'PROGRESS_TRACKING', title: 'Progress & Performance', range: 'January–February 2027', accent: 'border-t-cyan-500', color: 'text-cyan-600 dark:text-cyan-300' },
      { key: 'REVISION_CUMULATIVE', title: 'Revision & Cumulative Assessment', range: 'March 2027', accent: 'border-t-purple-500', color: 'text-purple-600 dark:text-purple-400' },
      { key: 'INTENSIVE_TESTING', title: 'Intensive Testing', range: 'April 2027', accent: 'border-t-amber-500', color: 'text-amber-600 dark:text-amber-400' },
    ];

    return phases.map((p) => ({
      ...p,
      tests: filteredSchedule.filter((t) => t.phase === p.key),
    }));
  }, [filteredSchedule]);

  // Next Assessment Spotlight
  const nextAssessment = scheduleDataset[0];
  const countdownDays = getCountdownDays(nextAssessment?.date);

  // Schedule-aware current phase
  const now = new Date();
  const programStartDate = new Date('2026-10-04T00:00:00+05:30');
  const isPreProgram = now < programStartDate;

  // Helper type badge style with semantic tokens
  const getTypeBadgeStyle = (typeStr) => {
    const norm = normalizeTestType(typeStr);
    switch (norm) {
      case 'UNIT_TEST':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400';
      case 'AIETS':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-600 dark:text-purple-400';
      case 'PART_TEST':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-300';
      case 'CUMULATIVE_TEST':
        return 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400';
      case 'FULL_SYLLABUS_MOCK':
        return 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400';
      default:
        return 'bg-slate-500/10 border-slate-500/30 text-slate-600 dark:text-slate-300';
    }
  };

  // Calendar Grid Calculation Helpers
  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = useMemo(() => {
    const days = [];
    // Empty cells before 1st day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ empty: true, key: `empty-${i}` });
    }
    // Days 1..N
    for (let day = 1; day <= daysInMonth; day++) {
      const monthStr = String(month + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateKey = `${year}-${monthStr}-${dayStr}`;

      const testsOnDate = filteredSchedule.filter((t) => t.date === dateKey);

      days.push({
        day,
        dateKey,
        tests: testsOnDate,
        isToday: new Date().toISOString().slice(0, 10) === dateKey,
        isNextTest: dateKey === '2026-10-04',
      });
    }
    return days;
  }, [year, month, firstDayOfMonth, daysInMonth, filteredSchedule]);

  const monthLabel = currentCalendarDate.toLocaleString('en-IN', { month: 'long', year: 'numeric' });

  const prevMonth = () => {
    setCurrentCalendarDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentCalendarDate(new Date(year, month + 1, 1));
  };
  const jumpToToday = () => {
    setCurrentCalendarDate(new Date());
  };
  const jumpToNextTest = () => {
    setCurrentCalendarDate(new Date(2026, 9, 1)); // Oct 2026
  };

  const clearFilters = () => {
    setTypeFilter('ALL');
    setPhaseFilter('ALL');
    setStatusFilter('ALL');
    setSelectedMonthFilter('ALL');
    setSearchQuery('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* 1. PAGE HEADER & PROGRAM SELECTOR */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">AIETS Examination Calendar</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Plan your preparation, view scheduled mock exams, and track phase progress.
          </p>
        </div>

        {/* Custom Program Selector Dropdown */}
        <div className="relative shrink-0" ref={programDropdownRef}>
          <button
            type="button"
            onClick={() => setProgramDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2.5 bg-white dark:bg-[#0F172A] px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs font-bold text-slate-900 dark:text-white hover:border-blue-500/50 transition cursor-pointer"
          >
            <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <span>{programs.find((p) => p.id === selectedProgram)?.label || 'Select Program'}</span>
            <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${programDropdownOpen ? 'rotate-180' : ''}`} />
          </button>

          {programDropdownOpen && (
            <div className="absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-2 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Enrolled Programs</div>
              {programs.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    setSelectedProgram(p.id);
                    setProgramDropdownOpen(false);
                  }}
                  className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-3 py-2 text-xs font-bold transition cursor-pointer ${
                    selectedProgram === p.id
                      ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {selectedProgram === p.id ? (
                      <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                    ) : (
                      <span className="h-4 w-4 shrink-0" />
                    )}
                    <span>{p.label}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60">
                    {p.badge}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. SPOTLIGHT ASSESSMENT & METRIC SUMMARY */}
      <div className="grid lg:grid-cols-12 gap-4 items-stretch">
        {/* Spotlight Card */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400">
                ⭐ Next Assessment Spotlight
              </span>
              <span className="px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" /> Upcoming
              </span>
            </div>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {nextAssessment?.name}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Phase 1: Concept Building • Scheduled Date: {nextAssessment?.formattedDate}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs pt-1">
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] font-medium">Time</span>
                <span className="font-bold text-slate-900 dark:text-white">9:00 AM IST</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] font-medium">Duration</span>
                <span className="font-bold text-slate-900 dark:text-white">3 hours</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800">
                <span className="text-slate-400 block text-[10px] font-medium">Marks</span>
                <span className="font-bold text-slate-900 dark:text-white">720 marks</span>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4">
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Target: <strong className="text-blue-600 dark:text-blue-400 font-bold">{countdownDays} days remaining</strong>
            </span>
            <button
              type="button"
              onClick={() => setActiveTest(nextAssessment)}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-xs transition cursor-pointer"
            >
              View Full Details →
            </button>
          </div>
        </div>

        {/* 4 Concise Metric Cards */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-3">
          <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase text-slate-400">Total Tests</span>
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
                <Layers className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">{scheduleDataset.length}</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Program total</p>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-[#0F172A] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400">Completed</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-3">
              {scheduleDataset.filter((t) => t.status === 'Attempted' || t.status === 'Result Published').length}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Submitted Tests</p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 border-t-4 border-t-cyan-500 bg-white dark:bg-[#071126] shadow-xs flex flex-col justify-between hover:translate-y-[-2px] transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400">Upcoming</span>
              <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-300">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="text-3xl font-black text-slate-900 dark:text-white mt-3">
              {scheduleDataset.filter((t) => t.status === 'Upcoming' || t.status === 'Live').length}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Scheduled Tests</p>
          </div>

          <div className="p-5 rounded-3xl border border-slate-200 dark:border-slate-800 border-t-4 border-t-purple-500 bg-white dark:bg-[#071126] shadow-xs flex flex-col justify-between hover:translate-y-[-2px] transition">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold uppercase text-slate-500 dark:text-slate-400">Current Phase</span>
              <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400">
                <Sparkles className="h-4 w-4" />
              </div>
            </div>
            <p className="text-sm font-black text-slate-900 dark:text-white mt-3 line-clamp-1">
              {isPreProgram ? 'Pre-Program' : 'Concept Building'}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {isPreProgram ? 'Program begins Oct 2026' : 'Phase 1 of 4'}
            </p>
          </div>
        </div>
      </div>

      {/* 3. PREPARATION PHASE NAVIGATOR ROADMAP RAIL */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126] p-6 shadow-xs space-y-4 relative">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Preparation Phase Roadmap
          </h3>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            4 Connected Learning Phases
          </span>
        </div>

        {/* Visual Progress Connecting Rail */}
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-slate-200 dark:bg-slate-800 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
            {groupedByPhase.map((p, idx) => (
              <div
                key={p.key}
                onClick={() => setPhaseFilter(phaseFilter === p.key ? 'ALL' : p.key)}
                className={`p-4 rounded-2xl border-2 border-t-4 transition cursor-pointer relative bg-white dark:bg-[#0a152e] ${p.accent} ${
                  phaseFilter === p.key
                    ? 'border-blue-500 dark:border-blue-400 shadow-md scale-[1.01]'
                    : 'border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-black uppercase ${p.color}`}>
                    Phase {idx + 1}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                    Not Started
                  </span>
                </div>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mt-1.5">
                  {p.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{p.range}</p>
                <div className="mt-3 flex justify-between items-center text-[10px] font-bold text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800/80 pt-2">
                  <span>{p.tests.length} Assessments</span>
                  <span>0%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. FILTER TOOLBAR & VIEW SWITCHER */}
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126] p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* View Switcher Segmented Control */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-slate-100 dark:bg-[#0d1835] border border-slate-200 dark:border-slate-800 self-start">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CalendarIcon className="h-3.5 w-3.5" />
              <span>Calendar</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                viewMode === 'timeline'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Timeline</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <List className="h-3.5 w-3.5" />
              <span>List</span>
            </button>
          </div>

          {/* Search Field */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search tests by name or type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a152e] text-xs font-medium text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Dropdown Filters Toolbar with Custom Popover Dropdowns */}
        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          <CustomFilterSelect
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: 'ALL', label: 'All Test Types' },
              { value: 'UNIT_TEST', label: 'Unit Tests' },
              { value: 'AIETS', label: 'AIETS Tests' },
              { value: 'PART_TEST', label: 'Part Tests' },
              { value: 'CUMULATIVE_TEST', label: 'Cumulative Tests' },
              { value: 'FULL_SYLLABUS_MOCK', label: 'Full-Syllabus Mocks' },
            ]}
          />

          <CustomFilterSelect
            value={phaseFilter}
            onChange={setPhaseFilter}
            options={[
              { value: 'ALL', label: 'All Phases' },
              { value: 'CONCEPT_BUILDING', label: 'Concept Building' },
              { value: 'PROGRESS_TRACKING', label: 'Progress & Performance' },
              { value: 'REVISION_CUMULATIVE', label: 'Revision & Cumulative' },
              { value: 'INTENSIVE_TESTING', label: 'Intensive Testing' },
            ]}
          />

          <CustomFilterSelect
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: 'ALL', label: 'All Statuses' },
              { value: 'Upcoming', label: 'Upcoming' },
              { value: 'Live', label: 'Live' },
              { value: 'Attempted', label: 'Attempted' },
              { value: 'Missed', label: 'Missed' },
              { value: 'Result Published', label: 'Result Published' },
              { value: 'Solution Available', label: 'Solution Available' },
              { value: 'Expired', label: 'Expired' },
            ]}
          />

          <CustomFilterSelect
            value={selectedMonthFilter}
            onChange={setSelectedMonthFilter}
            options={[
              { value: 'ALL', label: 'All Months' },
              ...uniqueMonths.map((m) => ({ value: m, label: m })),
            ]}
          />

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="px-3 py-1.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-bold hover:bg-red-500/20 transition cursor-pointer flex items-center gap-1"
            >
              <X className="h-3.5 w-3.5" />
              <span>Clear Filters ({activeFilterCount})</span>
            </button>
          )}

          <span className="ml-auto text-xs text-slate-500 dark:text-slate-400 font-medium">
            Showing <strong>{filteredSchedule.length}</strong> of {scheduleDataset.length} tests
          </span>
        </div>
      </div>

      {/* 5. VIEW DISPLAY: REAL CALENDAR, TIMELINE, OR LIST */}

      {/* VIEW A: REAL MONTHLY CALENDAR GRID */}
      {viewMode === 'calendar' && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126] p-6 shadow-xs space-y-4">
          {/* Month Header & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {monthLabel}
            </h3>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={jumpToToday}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a152e] text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-cyan-300 transition cursor-pointer"
              >
                Today
              </button>

              <button
                type="button"
                onClick={jumpToNextTest}
                className="px-3 py-1.5 rounded-xl bg-blue-600/10 border border-blue-500/30 text-xs font-bold text-blue-600 dark:text-cyan-300 hover:bg-blue-500/20 transition cursor-pointer flex items-center gap-1"
              >
                <span>Jump to Next Test (Oct 2026)</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>

              <div className="flex items-center gap-1 ml-1">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a152e] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0a152e] text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Calendar Legend Bar */}
          <div className="flex flex-wrap items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#0a152e] border border-slate-200 dark:border-slate-800 text-xs">
            <span className="font-extrabold text-slate-500 dark:text-slate-400 uppercase text-[10px]">Legend:</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30">Unit Test</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30">AIETS</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border border-cyan-500/30">Part Test</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30">Cumulative Test</span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">Full-Syllabus Mock</span>
          </div>

          {/* Responsive 7-Column Month Calendar Grid (Mobile & Desktop) */}
          <div>
            {/* Days of Week Header */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-2 text-center text-[10px] sm:text-xs font-black uppercase text-slate-400">
              <div><span className="sm:hidden">S</span><span className="hidden sm:inline">Sun</span></div>
              <div><span className="sm:hidden">M</span><span className="hidden sm:inline">Mon</span></div>
              <div><span className="sm:hidden">T</span><span className="hidden sm:inline">Tue</span></div>
              <div><span className="sm:hidden">W</span><span className="hidden sm:inline">Wed</span></div>
              <div><span className="sm:hidden">T</span><span className="hidden sm:inline">Thu</span></div>
              <div><span className="sm:hidden">F</span><span className="hidden sm:inline">Fri</span></div>
              <div><span className="sm:hidden">S</span><span className="hidden sm:inline">Sat</span></div>
            </div>

            {/* Date Cells */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {calendarDays.map((cell, i) => {
                if (cell.empty) {
                  return (
                    <div
                      key={cell.key}
                      className="min-h-[52px] sm:min-h-[96px] rounded-xl sm:rounded-2xl border border-transparent bg-slate-50/20 dark:bg-slate-900/10 p-1 sm:p-2"
                    />
                  );
                }

                const hasTests = cell.tests.length > 0;

                return (
                  <div
                    key={cell.dateKey}
                    className={`min-h-[56px] sm:min-h-[96px] rounded-xl sm:rounded-2xl border p-1 sm:p-2 flex flex-col justify-between transition hover:bg-blue-50/50 dark:hover:bg-[#0f1f3d] ${
                      cell.isToday
                        ? 'border-cyan-500 bg-cyan-500/10'
                        : cell.isNextTest
                        ? 'border-blue-400 dark:border-blue-600 bg-blue-50/90 dark:bg-blue-950/40 shadow-xs'
                        : hasTests
                        ? 'border-blue-300 dark:border-blue-800/80 bg-blue-50/30 dark:bg-[#0c1836]'
                        : 'border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0a152e]'
                    }`}
                  >
                    <div className="flex justify-between items-center text-[11px] sm:text-xs">
                      <span className={`font-bold ${cell.isToday ? 'h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-cyan-500 text-white flex items-center justify-center font-black text-[9px] sm:text-[10px]' : 'text-slate-500 dark:text-slate-400'}`}>
                        {cell.day}
                      </span>
                      {hasTests && (
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                      )}
                    </div>

                    <div className="space-y-1 mt-0.5">
                      {cell.tests.slice(0, 2).map((t) => (
                        <div
                          key={t.sequence}
                          onClick={() => setActiveTest(t)}
                          className={`p-1 sm:p-1.5 rounded-md sm:rounded-lg border text-[9px] sm:text-[10px] font-bold truncate cursor-pointer transition hover:scale-[1.02] ${getTypeBadgeStyle(
                            t.type
                          )}`}
                          title={`${t.name} • Click for details`}
                        >
                          <span className="hidden sm:inline">#{t.sequence} </span>{t.name}
                        </div>
                      ))}
                      {cell.tests.length > 2 && (
                        <span className="text-[8px] sm:text-[9px] font-extrabold text-blue-600 dark:text-cyan-300 block text-right">
                          +{cell.tests.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Agenda View below Calendar Grid for Easy Mobile Scanning */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-extrabold uppercase tracking-wider">
                Tests scheduled in {monthLabel}:
              </p>
              <span className="text-xs font-bold text-blue-600 dark:text-cyan-400">
                {filteredSchedule.filter((t) => t.monthYear === monthLabel).length} tests
              </span>
            </div>

            {filteredSchedule.filter((t) => t.monthYear === monthLabel).length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-400 border border-slate-200 dark:border-slate-800/80 rounded-2xl bg-slate-50/50 dark:bg-[#0a152e]">
                No tests scheduled in this month.
              </div>
            ) : (
              <div className="grid gap-2.5 sm:grid-cols-2">
                {filteredSchedule
                  .filter((t) => t.monthYear === monthLabel)
                  .map((t) => (
                    <div
                      key={t.sequence}
                      onClick={() => setActiveTest(t)}
                      className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#0a152e] hover:border-blue-500/50 transition flex justify-between items-center cursor-pointer"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <span className="text-[10px] font-mono text-blue-600 dark:text-cyan-400 block font-bold">{t.formattedDate}</span>
                        <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 truncate">{t.name}</h4>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[9.5px] font-bold uppercase border shrink-0 ${getTypeBadgeStyle(t.type)}`}>
                        {t.type}
                      </span>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW B: STRUCTURED TIMELINE VIEW */}
      {viewMode === 'timeline' && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126] p-6 shadow-xs space-y-8">
          {groupedByPhase.map((phaseGroup) => (
            <div key={phaseGroup.key} className="space-y-4">
              <div className="flex items-center gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
                <span className="h-3 w-3 rounded-full bg-blue-500" />
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {phaseGroup.title}
                </h3>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  ({phaseGroup.range})
                </span>
              </div>

              {phaseGroup.tests.length === 0 ? (
                <p className="text-xs text-slate-500 italic pl-6">No matching tests in this phase.</p>
              ) : (
                <div className="relative pl-6 space-y-4 border-l-2 border-slate-200 dark:border-slate-800">
                  {phaseGroup.tests.map((t) => (
                    <div
                      key={t.sequence}
                      onClick={() => setActiveTest(t)}
                      className="group relative p-4 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0a152e] hover:border-blue-500/50 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      {/* Timeline dot */}
                      <span className="absolute -left-[31px] top-6 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-slate-900 bg-blue-500 group-hover:scale-125 transition" />

                      <div className="flex items-center gap-3.5">
                        <div className="h-10 w-10 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center font-mono font-black text-xs text-blue-600 dark:text-cyan-300">
                          #{t.sequence}
                        </div>
                        <div>
                          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white group-hover:text-blue-500 transition">
                            {t.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {t.formattedDate} • 9:00 AM IST • 720 Marks
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase border ${getTypeBadgeStyle(t.type)}`}>
                          {t.type}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-400 group-hover:translate-x-0.5 transition" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* VIEW C: COMPACT LIST VIEW */}
      {viewMode === 'list' && (
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126] p-6 shadow-xs space-y-6">
          {Object.keys(groupedByMonth).length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <p className="text-sm font-bold text-slate-400">No tests match your filter criteria.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-extrabold text-xs cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            Object.entries(groupedByMonth).map(([mName, tests]) => (
              <div key={mName} className="space-y-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800 pb-2">
                  {mName} ({tests.length} Tests)
                </h4>

                <div className="grid gap-2">
                  {tests.map((t) => (
                    <div
                      key={t.sequence}
                      onClick={() => setActiveTest(t)}
                      className="group p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-slate-50/50 dark:bg-[#0a152e] hover:border-blue-500/50 hover:bg-white dark:hover:bg-[#0f1d3d] transition cursor-pointer flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="h-9 w-9 shrink-0 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center font-mono font-bold text-xs text-blue-600 dark:text-cyan-300">
                          #{t.sequence}
                        </span>
                        <div className="truncate">
                          <h5 className="text-sm font-extrabold text-slate-900 dark:text-white truncate group-hover:text-blue-600 transition">
                            {t.name}
                          </h5>
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                            {t.formattedDate} • 9:00 AM–12:00 PM IST
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className={`hidden sm:inline-block px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase border ${getTypeBadgeStyle(t.type)}`}>
                          {t.type}
                        </span>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-blue-500 transition flex items-center gap-1">
                          <span>Details</span>
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Slide-over Test Detail Drawer */}
      {activeTest && (
        <TestDetailDrawer test={activeTest} onClose={() => setActiveTest(null)} />
      )}
    </div>
  );
}
