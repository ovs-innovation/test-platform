import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { calendarService } from '../../lib/services.js';
import { Spinner } from '../../components/ui.jsx';
import {
  Calendar as CalendarIcon,
  List,
  Clock,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  FileText,
  HelpCircle,
  Award,
  CalendarDays,
  X
} from 'lucide-react';

const STATUS_CONFIG = {
  'Live': {
    badgeClass: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-400',
    dotClass: 'bg-emerald-500 animate-pulse',
    icon: PlayCircle,
    label: 'Live Now'
  },
  'Result Published': {
    badgeClass: 'bg-purple-500/10 text-purple-600 border-purple-500/30 dark:bg-purple-500/20 dark:text-purple-400',
    dotClass: 'bg-purple-500',
    icon: Award,
    label: 'Result Published'
  },
  'Attempted': {
    badgeClass: 'bg-blue-500/10 text-blue-600 border-blue-500/30 dark:bg-blue-500/20 dark:text-blue-400',
    dotClass: 'bg-blue-500',
    icon: CheckCircle2,
    label: 'Attempted'
  },
  'Upcoming': {
    badgeClass: 'bg-slate-500/10 text-slate-600 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
    dotClass: 'bg-slate-400 dark:bg-slate-500',
    icon: Clock,
    label: 'Upcoming'
  },
  'Missed': {
    badgeClass: 'bg-rose-500/10 text-rose-600 border-rose-500/30 dark:bg-rose-500/20 dark:text-rose-400',
    dotClass: 'bg-rose-500',
    icon: AlertCircle,
    label: 'Missed'
  },
  'Expired': {
    badgeClass: 'bg-amber-500/10 text-amber-700 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-400',
    dotClass: 'bg-amber-500',
    icon: AlertCircle,
    label: 'Expired'
  }
};

const TEST_TYPES = ['All', 'AIETS', 'Unit Test', 'Part Test', 'Cumulative Test', 'Full Syllabus Mock'];
const STATUSES = ['All', 'Live', 'Result Published', 'Attempted', 'Upcoming', 'Missed', 'Expired'];

export default function AIETSCalendar() {
  const navigate = useNavigate();
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // View state: 'calendar' | 'timeline' | 'list'
  const [viewMode, setViewMode] = useState('calendar');

  // Month navigation for Calendar View
  const [currentDate, setCurrentDate] = useState(() => new Date());

  // Filters for List & Timeline View
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Modal / Detail state
  const [activeTest, setActiveTest] = useState(null);
  const [expandedSyllabusId, setExpandedSyllabusId] = useState(null);

  // Sorting for List View
  const [sortField, setSortField] = useState('test_date');
  const [sortDirection, setSortDirection] = useState('asc');

  const fetchCalendar = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await calendarService.getCalendar();
      setTests(data.tests || []);
    } catch (err) {
      console.error('Failed to load AIETS Calendar:', err);
      setError('Failed to fetch test schedule. Please try refreshing.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCalendar();
  }, []);

  // Filtered tests
  const filteredTests = useMemo(() => {
    return tests.filter((test) => {
      const matchesSearch = test.test_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            (test.syllabus && test.syllabus.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesType = selectedType === 'All' || test.test_type === selectedType;
      const matchesStatus = selectedStatus === 'All' || test.computed_status === selectedStatus;
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [tests, searchQuery, selectedType, selectedStatus]);

  // Statistics calculation
  const stats = useMemo(() => {
    const total = tests.length;
    const live = tests.filter((t) => t.computed_status === 'Live').length;
    const upcoming = tests.filter((t) => t.computed_status === 'Upcoming').length;
    const attempted = tests.filter((t) => t.computed_status === 'Attempted' || t.computed_status === 'Result Published').length;
    const missed = tests.filter((t) => t.computed_status === 'Missed').length;
    const published = tests.filter((t) => t.computed_status === 'Result Published').length;
    return { total, live, upcoming, attempted, missed, published };
  }, [tests]);

  // Calendar calculations
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-based

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 = Sunday

  // Group tests by YYYY-MM-DD for Calendar grid
  const testsByDate = useMemo(() => {
    const map = {};
    tests.forEach((t) => {
      const key = t.test_date; // YYYY-MM-DD
      if (!map[key]) map[key] = [];
      map[key].push(t);
    });
    return map;
  }, [tests]);

  // Group tests by month for Timeline view
  const testsByMonth = useMemo(() => {
    const map = {};
    filteredTests.forEach((t) => {
      const d = new Date(t.test_date);
      const monthYearKey = `${d.toLocaleString('en-US', { month: 'long' })} ${d.getFullYear()}`;
      if (!map[monthYearKey]) map[monthYearKey] = [];
      map[monthYearKey].push(t);
    });
    return map;
  }, [filteredTests]);

  // Handle Sort in List View
  const sortedListTests = useMemo(() => {
    return [...filteredTests].sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'test_date') {
        valA = new Date(`${a.test_date}T${a.start_time}Z`).getTime();
        valB = new Date(`${b.test_date}T${b.start_time}Z`).getTime();
      }

      if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
      if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredTests, sortField, sortDirection]);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handlePrevMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const toggleSyllabus = (id) => {
    setExpandedSyllabusId((prev) => (prev === id ? null : id));
  };

  // Render Action Button conditionally based on test computed_status
  const renderActionButton = (test, isCompact = false) => {
    const btnSize = isCompact ? 'px-3 py-1.5 text-xs' : 'px-4 py-2 text-xs sm:text-sm';
    
    switch (test.computed_status) {
      case 'Live':
        return (
          <button
            onClick={() => navigate('/assessments')}
            className={`flex items-center gap-1.5 rounded-xl bg-emerald-600 font-extrabold text-white shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 transition active:scale-95 cursor-pointer ${btnSize}`}
          >
            <PlayCircle className="h-4 w-4" /> Start Test
          </button>
        );

      case 'Result Published':
        return (
          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => navigate(`/analytics/test/${test.id}`)}
              className={`flex items-center gap-1.5 rounded-xl bg-purple-600 font-extrabold text-white shadow-md shadow-purple-500/20 hover:bg-purple-500 transition active:scale-95 cursor-pointer ${btnSize}`}
            >
              <Award className="h-4 w-4" /> View Result & Analytics
            </button>
            {test.solution_available && test.solution_pdf_url && (
              <a
                href={test.solution_pdf_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 rounded-xl border border-purple-300 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 font-bold text-purple-700 dark:text-purple-300 hover:bg-purple-100 transition ${btnSize}`}
              >
                <FileText className="h-4 w-4" /> View Solution
              </a>
            )}
          </div>
        );

      case 'Attempted':
        return (
          <button
            onClick={() => navigate(`/analytics/test/${test.id}`)}
            className={`flex items-center gap-1.5 rounded-xl border border-blue-300 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/40 font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-100 transition ${btnSize}`}
          >
            <CheckCircle2 className="h-4 w-4" /> Submitted (View Analytics)
          </button>
        );

      case 'Upcoming':
        return (
          <button
            disabled
            className={`flex items-center gap-1.5 rounded-xl bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-400 font-bold cursor-not-allowed opacity-80 ${btnSize}`}
          >
            <Clock className="h-4 w-4" /> Not Started Yet
          </button>
        );

      case 'Missed':
        return (
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center gap-1 font-extrabold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/60 rounded-xl px-3 py-1.5 text-xs`}>
              <AlertCircle className="h-3.5 w-3.5" /> Missed
            </span>
          </div>
        );

      default:
        return (
          <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
            Expired
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto pb-12 animate-in fade-in duration-200">
      {/* Top Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold backdrop-blur-md border border-white/20">
              <CalendarDays className="h-3.5 w-3.5 text-amber-300" />
              <span>All India Edvedum Test Series (AIETS)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">AIETS Calendar</h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl">
              Track all 39 scheduled national benchmark tests, unit practice exams, and full-syllabus mocks with real-time status updates.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 bg-black/20 backdrop-blur-xl border border-white/15 p-3 rounded-2xl shrink-0">
            <div className="text-center p-2">
              <p className="text-[10px] font-extrabold uppercase text-blue-200">Total</p>
              <p className="text-lg font-black text-white">{stats.total}</p>
            </div>
            <div className="text-center p-2 border-l border-white/10">
              <p className="text-[10px] font-extrabold uppercase text-emerald-300">Live</p>
              <p className="text-lg font-black text-emerald-400">{stats.live}</p>
            </div>
            <div className="text-center p-2 border-l border-white/10">
              <p className="text-[10px] font-extrabold uppercase text-blue-200">Upcoming</p>
              <p className="text-lg font-black text-white">{stats.upcoming}</p>
            </div>
            <div className="text-center p-2 border-l border-white/10">
              <p className="text-[10px] font-extrabold uppercase text-purple-300">Results</p>
              <p className="text-lg font-black text-purple-300">{stats.published}</p>
            </div>
            <div className="text-center p-2 border-l border-white/10">
              <p className="text-[10px] font-extrabold uppercase text-cyan-200">Attempted</p>
              <p className="text-lg font-black text-cyan-300">{stats.attempted}</p>
            </div>
            <div className="text-center p-2 border-l border-white/10">
              <p className="text-[10px] font-extrabold uppercase text-rose-300">Missed</p>
              <p className="text-lg font-black text-rose-300">{stats.missed}</p>
            </div>
          </div>
        </div>
      </div>

      {/* View Switcher & Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-[#111827] p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        {/* Tab Toggle Buttons */}
        <div className="flex items-center p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl w-full sm:w-auto">
          <button
            onClick={() => setViewMode('calendar')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg transition-all ${
              viewMode === 'calendar'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CalendarIcon className="h-4 w-4" /> Calendar View
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg transition-all ${
              viewMode === 'timeline'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="h-4 w-4" /> Timeline View
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-extrabold rounded-lg transition-all ${
              viewMode === 'list'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <List className="h-4 w-4" /> List View
          </button>
        </div>

        {/* View-specific Controls */}
        {viewMode === 'calendar' ? (
          <div className="flex items-center justify-between sm:justify-end gap-3">
            <button
              onClick={handleToday}
              className="px-3 py-1.5 text-xs font-extrabold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
            >
              Today
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Previous Month"
              >
                <ChevronLeft className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </button>
              <span className="min-w-[140px] text-center font-extrabold text-sm text-slate-900 dark:text-white">
                {monthNames[month]} {year}
              </span>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                title="Next Month"
              >
                <ChevronRight className="h-4 w-4 text-slate-600 dark:text-slate-300" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            {/* Search Box */}
            <div className="relative min-w-[200px] flex-1 sm:flex-initial">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search test name or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {TEST_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t === 'All' ? 'All Types' : t}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s === 'All' ? 'All Statuses' : s}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Content Area based on Selected View */}
      {loading ? (
        <div className="flex items-center justify-center py-24 text-slate-400 gap-3">
          <Spinner className="h-6 w-6 text-blue-600" />
          <span className="text-sm font-bold">Loading your AIETS Calendar schedule...</span>
        </div>
      ) : error ? (
        <div className="p-8 text-center bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 rounded-3xl space-y-3">
          <AlertCircle className="h-8 w-8 text-rose-500 mx-auto" />
          <p className="text-sm font-bold text-rose-600 dark:text-rose-400">{error}</p>
          <button
            onClick={fetchCalendar}
            className="px-4 py-2 bg-rose-600 text-white font-extrabold text-xs rounded-xl shadow-md hover:bg-rose-500 transition"
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* VIEW MODE 1: CALENDAR VIEW */}
          {viewMode === 'calendar' && (
            <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 p-4 sm:p-6 shadow-md space-y-4">
              {/* Status Legend */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-bold pt-2 border-b border-slate-100 dark:border-slate-800/80 pb-4">
                <span className="text-slate-400 uppercase tracking-wider text-[10px]">Legend:</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Live</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-purple-500" /> Result Published</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-blue-500" /> Attempted</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-slate-400" /> Upcoming</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Missed</span>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 text-center font-black text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 py-2">
                <span>Sun</span>
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-7 gap-1 sm:gap-2 auto-rows-fr">
                {/* Blank cells for offset before 1st of month */}
                {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
                  <div
                    key={`empty-${idx}`}
                    className="min-h-[90px] sm:min-h-[110px] rounded-2xl bg-slate-50/50 dark:bg-slate-900/30 border border-transparent"
                  />
                ))}

                {/* Days of current month */}
                {Array.from({ length: daysInMonth }).map((_, idx) => {
                  const dayNum = idx + 1;
                  const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                  const dayTests = testsByDate[dateString] || [];
                  const isToday =
                    new Date().getDate() === dayNum &&
                    new Date().getMonth() === month &&
                    new Date().getFullYear() === year;

                  return (
                    <div
                      key={dateString}
                      className={`min-h-[90px] sm:min-h-[110px] p-1.5 sm:p-2.5 rounded-2xl border transition-all flex flex-col justify-between group ${
                        isToday
                          ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-950/20 shadow-xs'
                          : dayTests.length > 0
                          ? 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-md'
                          : 'border-slate-100 dark:border-slate-800/40 bg-slate-50/30 dark:bg-slate-900/20'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`h-6 w-6 sm:h-7 sm:w-7 flex items-center justify-center rounded-xl text-xs font-black ${
                            isToday
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          {dayNum}
                        </span>
                        {dayTests.length > 0 && (
                          <span className="text-[10px] font-extrabold text-slate-400 dark:text-slate-500">
                            {dayTests.length} {dayTests.length === 1 ? 'Test' : 'Tests'}
                          </span>
                        )}
                      </div>

                      {/* Test Badges inside date cell */}
                      <div className="mt-1 space-y-1 overflow-y-auto max-h-[60px] scrollbar-none">
                        {dayTests.map((t) => {
                          const config = STATUS_CONFIG[t.computed_status] || STATUS_CONFIG['Upcoming'];
                          return (
                            <button
                              key={t.id}
                              onClick={() => setActiveTest(t)}
                              className={`w-full text-left p-1 sm:p-1.5 rounded-lg border text-[10px] font-bold leading-tight truncate transition hover:scale-[1.02] active:scale-95 flex items-center gap-1 ${config.badgeClass}`}
                            >
                              <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${config.dotClass}`} />
                              <span className="truncate">{t.test_name}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW MODE 2: TIMELINE VIEW */}
          {viewMode === 'timeline' && (
            <div className="space-y-8">
              {Object.keys(testsByMonth).length === 0 ? (
                <div className="p-12 text-center bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 space-y-2">
                  <BookOpen className="h-8 w-8 text-slate-400 mx-auto" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">No tests match your filter criteria.</p>
                </div>
              ) : (
                Object.entries(testsByMonth).map(([monthYear, monthTests]) => (
                  <div key={monthYear} className="space-y-4">
                    {/* Sticky Month Header */}
                    <div className="sticky top-20 z-10 flex items-center gap-3 bg-white/90 dark:bg-[#0b1120]/90 backdrop-blur-md py-3 px-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs">
                      <CalendarIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h2 className="text-base font-black text-slate-900 dark:text-white tracking-wide">{monthYear}</h2>
                      <span className="rounded-full bg-blue-100 dark:bg-blue-950/60 px-2.5 py-0.5 text-xs font-black text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                        {monthTests.length} Tests
                      </span>
                    </div>

                    {/* Timeline Vertical Track */}
                    <div className="relative pl-6 sm:pl-8 space-y-4 border-l-2 border-slate-200 dark:border-slate-800 ml-4 sm:ml-6">
                      {monthTests.map((test) => {
                        const config = STATUS_CONFIG[test.computed_status] || STATUS_CONFIG['Upcoming'];
                        const StatusIcon = config.icon;
                        const isExpanded = expandedSyllabusId === test.id;

                        return (
                          <div key={test.id} className="relative group">
                            {/* Dot on Timeline line */}
                            <span className={`absolute -left-[31px] sm:-left-[39px] top-5 h-4 w-4 rounded-full border-2 border-white dark:border-[#0b1120] shadow-xs ${config.dotClass}`} />

                            {/* Card Content */}
                            <div className="bg-white dark:bg-[#111827] border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm hover:border-blue-500/50 transition duration-200 space-y-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="text-xs font-black text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 px-2.5 py-0.5 rounded-lg">
                                      {test.test_type}
                                    </span>
                                    <span className={`inline-flex items-center gap-1.5 text-xs font-bold border rounded-lg px-2.5 py-0.5 ${config.badgeClass}`}>
                                      <StatusIcon className="h-3.5 w-3.5" /> {config.label}
                                    </span>
                                  </div>
                                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white pt-1">{test.test_name}</h3>
                                </div>

                                <div className="shrink-0">{renderActionButton(test)}</div>
                              </div>

                              {/* Details Grid */}
                              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-50/80 dark:bg-slate-900/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/50">
                                <div>
                                  <span className="block text-[10px] text-slate-400 uppercase font-extrabold">Scheduled Date</span>
                                  <span className="text-slate-900 dark:text-white font-bold">{test.test_date}</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] text-slate-400 uppercase font-extrabold">Time Window</span>
                                  <span className="text-slate-900 dark:text-white font-bold">{test.start_time.slice(0, 5)} - {test.end_time.slice(0, 5)} UTC</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] text-slate-400 uppercase font-extrabold">Duration</span>
                                  <span className="text-slate-900 dark:text-white font-bold">{test.duration_minutes} Mins</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] text-slate-400 uppercase font-extrabold">Max Marks</span>
                                  <span className="text-slate-900 dark:text-white font-bold">{test.max_marks} Marks</span>
                                </div>
                              </div>

                              {/* Syllabus Collapsible */}
                              {test.syllabus && (
                                <div className="space-y-2 pt-1">
                                  <button
                                    onClick={() => toggleSyllabus(test.id)}
                                    className="flex items-center gap-1.5 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                                  >
                                    <BookOpen className="h-3.5 w-3.5" />
                                    {isExpanded ? 'Hide Syllabus' : 'View Syllabus & Topics'}
                                  </button>
                                  {isExpanded && (
                                    <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed animate-in fade-in duration-150">
                                      {test.syllabus}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* VIEW MODE 3: LIST VIEW */}
          {viewMode === 'list' && (
            <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/60 text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500">
                      <th className="py-3.5 px-4">#</th>
                      <th className="py-3.5 px-4 cursor-pointer hover:text-blue-600" onClick={() => handleSort('test_name')}>
                        Test Name {sortField === 'test_name' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                      </th>
                      <th className="py-3.5 px-4 cursor-pointer hover:text-blue-600" onClick={() => handleSort('test_type')}>
                        Type {sortField === 'test_type' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                      </th>
                      <th className="py-3.5 px-4 cursor-pointer hover:text-blue-600" onClick={() => handleSort('test_date')}>
                        Date {sortField === 'test_date' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                      </th>
                      <th className="py-3.5 px-4">Time</th>
                      <th className="py-3.5 px-4">Duration</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {sortedListTests.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-12 text-center text-slate-400">
                          No matching tests found.
                        </td>
                      </tr>
                    ) : (
                      sortedListTests.map((t, index) => {
                        const config = STATUS_CONFIG[t.computed_status] || STATUS_CONFIG['Upcoming'];
                        const StatusIcon = config.icon;
                        const isExpanded = expandedSyllabusId === t.id;

                        return (
                          <tr key={t.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition">
                            <td className="py-4 px-4 font-bold text-slate-400">{index + 1}</td>
                            <td className="py-4 px-4 font-extrabold text-slate-900 dark:text-white max-w-xs">
                              <div>
                                <span>{t.test_name}</span>
                                {t.syllabus && (
                                  <div className="mt-1">
                                    <button
                                      onClick={() => toggleSyllabus(t.id)}
                                      className="text-[10px] text-blue-600 dark:text-blue-400 font-extrabold hover:underline"
                                    >
                                      {isExpanded ? 'Hide Syllabus' : 'View Syllabus'}
                                    </button>
                                    {isExpanded && (
                                      <p className="mt-1 text-[11px] font-normal text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-800">
                                        {t.syllabus}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                                {t.test_type}
                              </span>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap font-bold text-slate-900 dark:text-white">{t.test_date}</td>
                            <td className="py-4 px-4 whitespace-nowrap text-slate-500 dark:text-slate-400">
                              {t.start_time.slice(0, 5)} - {t.end_time.slice(0, 5)}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap font-bold">{t.duration_minutes}m</td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1.5 border rounded-lg px-2.5 py-1 text-[11px] font-bold ${config.badgeClass}`}>
                                <StatusIcon className="h-3.5 w-3.5" /> {config.label}
                              </span>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-right">{renderActionButton(t, true)}</td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Detail Modal on Date / Badge Click */}
      {activeTest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-lg overflow-hidden rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-2xl p-6 space-y-6 animate-in zoom-in-95 duration-150 relative">
            {/* Close Button */}
            <button
              onClick={() => setActiveTest(null)}
              className="absolute right-4 top-4 text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 pr-6">
              <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {activeTest.test_type}
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">{activeTest.test_name}</h2>
              <div className="flex items-center gap-2">
                <span className={`inline-flex items-center gap-1.5 text-xs font-bold border rounded-lg px-2.5 py-1 ${STATUS_CONFIG[activeTest.computed_status]?.badgeClass}`}>
                  {STATUS_CONFIG[activeTest.computed_status]?.label}
                </span>
              </div>
            </div>

            {/* Test Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Scheduled Date</span>
                <span className="text-slate-900 dark:text-white font-black">{activeTest.test_date}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Time Window</span>
                <span className="text-slate-900 dark:text-white font-black">{activeTest.start_time} - {activeTest.end_time}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Duration</span>
                <span className="text-slate-900 dark:text-white font-black">{activeTest.duration_minutes} Minutes</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-extrabold block">Maximum Marks</span>
                <span className="text-slate-900 dark:text-white font-black">{activeTest.max_marks} Marks</span>
              </div>
            </div>

            {/* Syllabus */}
            {activeTest.syllabus && (
              <div className="space-y-1.5">
                <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-blue-500" /> Syllabus Covered:
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 bg-blue-50/50 dark:bg-slate-900/80 p-3 rounded-2xl border border-blue-100 dark:border-slate-800 leading-relaxed">
                  {activeTest.syllabus}
                </p>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setActiveTest(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                Close
              </button>
              {renderActionButton(activeTest)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
