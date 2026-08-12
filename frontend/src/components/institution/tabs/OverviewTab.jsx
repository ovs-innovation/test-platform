import {
  Users,
  TrendingUp,
  FileText,
  UserCheck,
  Building2,
  Plus,
  Upload,
  Layers,
  Award,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Download,
  Calendar,
  School,
  ArrowRight,
  ShieldCheck,
  Percent,
  Activity,
  Clock,
  ExternalLink
} from 'lucide-react';

export default function OverviewTab({
  institution,
  students = [],
  batches = [],
  analytics = {},
  onOpenAddStudent,
  onOpenUploadCsv,
  onNavigateTab,
  onDownloadCsvTemplate,
  isDarkMode = true,
  loading = false,
}) {
  const totalLic = institution?.total_licenses || 50;
  const usedLic = students.length || institution?.used_licenses || 0;
  const availLic = Math.max(0, totalLic - usedLic);
  const licPercentage = Math.min(100, Math.round((usedLic / totalLic) * 100));

  const activeStudentsCount = students.filter(s => !s.is_blocked && s.student_status !== 'Inactive').length;
  const testsAttemptedCount = analytics?.total_attempts || students.reduce((acc, s) => acc + (s.tests_completed || 0), 0);
  const avgScoreVal = analytics?.average_score || (students.length > 0
    ? Math.round(students.reduce((acc, s) => acc + Number(s.average_score || 0), 0) / students.length)
    : 0);

  const instName = institution?.name || (loading ? 'Loading Institution...' : 'Partner Institution');
  const instCode = institution?.schoolId || institution?.code || (institution?.id ? `INST-${institution.id}` : 'INST-001');
  const logoBadgeText = institution?.logoBadge || (instName && instName !== 'Loading Institution...' ? instName.substring(0, 3).toUpperCase() : 'INST');
  const packageName = institution?.package_name || 'Standard AIETS Institutional Package';
  const validityStr = institution?.valid_until
    ? new Date(institution.valid_until).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
    : (institution?.validity_date || 'Active Subscription');

  // Semantic status color for licence capacity
  const getLicenceBarColor = () => {
    if (licPercentage > 90) return 'bg-rose-500';
    if (licPercentage > 75) return 'bg-amber-500';
    return 'bg-gradient-to-r from-blue-600 to-cyan-400';
  };

  const getLicenceBadgeColor = () => {
    if (licPercentage > 90) return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
    if (licPercentage > 75) return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
    return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">

      {/* =========================================================================
          1. INSTITUTION SUMMARY BLOCK
         ========================================================================= */}
      <div className={`rounded-2xl border p-6 sm:p-7 relative overflow-hidden shadow-2xs transition-all ${
        isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90'
      }`}>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between relative z-10">
          
          {/* Institution Identity & Emblem */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {institution?.logo_url ? (
              <img
                src={institution.logo_url}
                alt={instName}
                className="h-16 w-16 sm:h-18 sm:w-18 rounded-2xl object-contain bg-white p-2 shadow-sm border border-slate-200/60 shrink-0"
              />
            ) : (
              <div className="flex h-16 w-16 sm:h-18 sm:w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white font-black text-xl sm:text-2xl shadow-md border border-white/20 shrink-0">
                {logoBadgeText}
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-xl bg-cyan-500/10 px-2.5 py-0.5 text-xs font-extrabold text-cyan-400 border border-cyan-500/20">
                  <School className="h-3.5 w-3.5" />
                  {institution?.institution_type || 'School / Coaching Institute'}
                </span>
                <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-lg border ${
                  isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                }`}>
                  ID: {instCode}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Account Active
                </span>
              </div>

              <h1 className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {instName}
              </h1>

              <p className={`text-xs font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Package: <span className="text-cyan-400 font-bold">{packageName}</span> • Validity: <span className="font-bold">{validityStr}</span>
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenUploadCsv}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-extrabold text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              <Upload className="h-4 w-4 text-white" />
              <span>Bulk CSV Import</span>
            </button>
            <button
              onClick={() => onNavigateTab && onNavigateTab('batches')}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white' : 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <Layers className="h-4 w-4 text-purple-400" />
              <span>Manage Batches</span>
            </button>
          </div>
        </div>

        {/* LICENCE CAPACITY PROGRESS BAR */}
        <div className={`mt-6 pt-5 border-t ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'} space-y-2.5`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1.5">
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Licence Seat Allocation
              </span>
              <span className={`font-mono font-bold text-xs px-2.5 py-0.5 rounded-md border ${getLicenceBadgeColor()}`}>
                {usedLic} Used • {availLic} Available • {totalLic} Total Seats
              </span>
            </div>
            <span className="text-slate-400 font-semibold text-xs">
              {licPercentage}% Capacity Allocated
            </span>
          </div>

          <div className={`h-2.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-slate-200'}`}>
            <div
              className={`h-full rounded-full transition-all duration-500 ${getLicenceBarColor()}`}
              style={{ width: `${Math.max(2, licPercentage)}%` }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. PRIMARY OPERATIONAL KPI ROW (4 CARDS)
         ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Enrolled Students */}
        <div className={`rounded-2xl border p-5 transition-all ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Enrolled Students</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {students.length} <span className="text-xs font-normal text-slate-400">/ {totalLic} capacity</span>
          </p>
          <p className="text-[11px] font-bold text-cyan-400 mt-2">Active student roster</p>
        </div>

        {/* Available Licences */}
        <div className={`rounded-2xl border p-5 transition-all ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Available Licences</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">{availLic}</p>
          <p className="text-[11px] font-bold text-slate-400 mt-2">Ready for seat allocation</p>
        </div>

        {/* Active Batches */}
        <div className={`rounded-2xl border p-5 transition-all ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Active Batches</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Layers className="h-4 w-4" />
            </div>
          </div>
          <p className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {batches.length}
          </p>
          <p className="text-[11px] font-bold text-purple-400 mt-2">Academic year 2026–2027</p>
        </div>

        {/* Tests Assigned */}
        <div className={`rounded-2xl border p-5 transition-all ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Tests Assigned</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <p className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            24 <span className="text-xs font-normal text-slate-400">/ 39 included</span>
          </p>
          <p className="text-[11px] font-bold text-slate-400 mt-2">Current package coverage</p>
        </div>

      </div>

      {/* =========================================================================
          3. ACADEMIC ACTIVITY & UPCOMING ASSESSMENT SNAPSHOT (2 COLUMNS)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Academic Activity Metrics (2/3 width) */}
        <div className={`lg:col-span-2 rounded-2xl border p-6 space-y-4 ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-cyan-400" />
              <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Academic Performance Snapshot
              </h3>
            </div>
            <span className="text-xs font-semibold text-slate-400">Live Institute Analytics</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            
            {/* Tests Attempted */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10.5px] font-extrabold uppercase text-slate-400 block mb-1">Tests Attempted</span>
              <p className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {testsAttemptedCount > 0 ? testsAttemptedCount : '—'}
              </p>
              <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Submissions to date</span>
            </div>

            {/* Average Batch Score */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10.5px] font-extrabold uppercase text-slate-400 block mb-1">Avg Batch Score</span>
              <p className="text-xl font-black text-emerald-400">
                {testsAttemptedCount > 0 ? `${avgScoreVal}%` : '—'}
              </p>
              <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Institute mean accuracy</span>
            </div>

            {/* Active Students */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10.5px] font-extrabold uppercase text-slate-400 block mb-1">Active Students</span>
              <p className={`text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {students.length > 0 ? activeStudentsCount : '0'}
              </p>
              <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Regular logins</span>
            </div>

            {/* Target Mocks */}
            <div className={`p-4 rounded-xl border ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10.5px] font-extrabold uppercase text-slate-400 block mb-1">Assigned Mocks</span>
              <p className="text-xl font-black text-cyan-400">24 / 39</p>
              <span className="text-[10px] text-slate-400 font-semibold mt-1 block">Current series</span>
            </div>
          </div>

          {testsAttemptedCount === 0 && (
            <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 flex items-center gap-2.5">
              <Clock className="h-4 w-4 text-cyan-400 shrink-0" />
              <span>No assessment performance data yet. Performance insights will populate after students submit assigned tests.</span>
            </div>
          )}
        </div>

        {/* Right Column: Upcoming Assessment Spotlight (1/3 width) */}
        <div className={`rounded-2xl border p-6 flex flex-col justify-between space-y-4 ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs'
        }`}>
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-rose-400" />
                <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Upcoming Test
                </h3>
              </div>
              <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                Scheduled
              </span>
            </div>

            <div className="space-y-3">
              <h4 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                AIETS National Mock Test #05
              </h4>
              
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold">Scheduled Date:</span>
                  <span className="font-bold text-white font-mono">Sun, 4 Oct 2026</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold">Target Batches:</span>
                  <span className="font-bold text-cyan-400">All Active Batches</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-semibold">Duration:</span>
                  <span className="font-mono text-slate-300">180 Mins (CBT Mode)</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigateTab && onNavigateTab('test-assignments')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600/10 hover:bg-blue-600/20 text-blue-500 dark:text-blue-400 border border-blue-500/20 py-2.5 text-xs font-extrabold transition cursor-pointer"
          >
            <span>Manage Test Assignments</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* =========================================================================
          4. QUICK ACTIONS & OPERATIONAL HEALTH CHECKLIST
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Quick Actions Panel (2/3 width) */}
        <div className={`lg:col-span-2 rounded-2xl border p-6 space-y-4 ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs'
        }`}>
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800/80 pb-3">
            <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Institution Quick Actions
            </h3>
            <span className="text-xs text-slate-400 font-medium">Frequent Administrative Tasks</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <button
              onClick={onOpenAddStudent}
              className={`p-4 rounded-xl border flex flex-col items-start gap-2.5 transition text-left cursor-pointer group ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-blue-500/40 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-105 transition">
                <Plus className="h-4 w-4" />
              </div>
              <div>
                <p className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Add Student</p>
                <p className="text-[10px] text-slate-400 font-semibold">Individual seat creation</p>
              </div>
            </button>

            <button
              onClick={onOpenUploadCsv}
              className={`p-4 rounded-xl border flex flex-col items-start gap-2.5 transition text-left cursor-pointer group ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:scale-105 transition">
                <Upload className="h-4 w-4" />
              </div>
              <div>
                <p className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Upload CSV Roster</p>
                <p className="text-[10px] text-slate-400 font-semibold">Batch student import</p>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab && onNavigateTab('batches')}
              className={`p-4 rounded-xl border flex flex-col items-start gap-2.5 transition text-left cursor-pointer group ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-purple-500/40 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:scale-105 transition">
                <Layers className="h-4 w-4" />
              </div>
              <div>
                <p className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Manage Batches</p>
                <p className="text-[10px] text-slate-400 font-semibold">Organize academic groups</p>
              </div>
            </button>

            <button
              onClick={() => onNavigateTab && onNavigateTab('test-assignments')}
              className={`p-4 rounded-xl border flex flex-col items-start gap-2.5 transition text-left cursor-pointer group ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-105 transition">
                <FileText className="h-4 w-4" />
              </div>
              <div>
                <p className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Assign Test Series</p>
                <p className="text-[10px] text-slate-400 font-semibold">Schedule mock exams</p>
              </div>
            </button>

            <button
              onClick={onDownloadCsvTemplate}
              className={`p-4 rounded-xl border flex flex-col items-start gap-2.5 transition text-left cursor-pointer group ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 hover:border-amber-500/40 hover:bg-slate-900' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:scale-105 transition">
                <Download className="h-4 w-4" />
              </div>
              <div>
                <p className={`text-xs font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>CSV Template</p>
                <p className="text-[10px] text-slate-400 font-semibold">Download import schema</p>
              </div>
            </button>
          </div>
        </div>

        {/* Operational System Health Checklist (1/3 width) */}
        <div className={`rounded-2xl border p-6 space-y-4 ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-2xs'
        }`}>
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800/80 pb-3">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <h3 className={`text-sm font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Account Operational Health
            </h3>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="font-semibold text-slate-300">Account Status</span>
              <span className="font-extrabold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" /> Active
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="font-semibold text-slate-300">Subscription Plan</span>
              <span className="font-bold text-cyan-400 font-mono">Standard AIETS</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="font-semibold text-slate-300">Licence Availability</span>
              <span className="font-bold text-slate-200 font-mono">{availLic} / {totalLic} Seats</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="font-semibold text-slate-300">Academic Batches</span>
              <span className="font-bold text-slate-200">{batches.length} Configured</span>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          5. CONTEXTUAL ONBOARDING BANNER WHEN NO STUDENTS ENROLLED
         ========================================================================= */}
      {students.length === 0 && (
        <div className={`rounded-2xl border p-7 sm:p-10 text-center max-w-3xl mx-auto space-y-5 ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-md'
        }`}>
          <div className="h-16 w-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto shadow-md">
            <Users className="h-8 w-8" />
          </div>

          <div className="space-y-1.5 max-w-md mx-auto">
            <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              No students enrolled in your roster
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Enroll students individually or bulk upload your student roster via CSV file. Once enrolled, student credentials will be auto-generated and test series access granted.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={onOpenAddStudent}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:scale-[1.02] active:scale-[0.98] transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add First Student</span>
            </button>
            
            <button
              onClick={onOpenUploadCsv}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-bold transition cursor-pointer ${
                isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800' : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <Upload className="h-4 w-4 text-cyan-400" />
              <span>Upload CSV Roster</span>
            </button>

            <button
              onClick={onDownloadCsvTemplate}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition cursor-pointer px-3 py-2"
            >
              <Download className="h-4 w-4" />
              <span>Download CSV Template</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
