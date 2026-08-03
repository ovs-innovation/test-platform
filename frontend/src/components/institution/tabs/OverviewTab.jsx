import { useState } from 'react';
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
  Sparkles,
  School,
  LogOut,
  ArrowRight,
  UserX,
  Target,
  Percent
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

  return (
    <div className="space-y-8 animate-in fade-in duration-300">

      {/* =========================================================================
          1. INSTITUTION OVERVIEW HEADER
         ========================================================================= */}
      <div className={`rounded-3xl border p-6 sm:p-8 backdrop-blur-xl relative overflow-hidden shadow-2xl ${
        isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        {/* Soft Accent Glow */}
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between relative z-10">
          
          {/* Left: Emblem & Institution Identity */}
          <div className="flex items-start sm:items-center gap-4 sm:gap-5">
            {institution?.logo_url ? (
              <img
                src={institution.logo_url}
                alt={institution.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-contain bg-white p-2 shadow-xl border border-white/20 shrink-0"
              />
            ) : (
              <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white font-black text-xl sm:text-2xl shadow-xl border border-white/20 shrink-0">
                {institution?.logoBadge || (institution?.name ? institution.name.substring(0, 3).toUpperCase() : 'SSC')}
              </div>
            )}

            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-extrabold text-cyan-400 border border-cyan-500/20">
                  <School className="h-3.5 w-3.5" />
                  {institution?.institution_type || 'School / Coaching Institute'}
                </span>
                <span className={`text-xs font-mono font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                  ID: {institution?.schoolId || institution?.id || 'SSC1122'}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="h-3 w-3" />
                  Account Active
                </span>
              </div>

              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {institution?.name || 'S.S.C Public School'}
              </h1>

              <p className={`text-xs sm:text-sm font-medium ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Package: <span className="text-cyan-400 font-bold">NEET-UG 2027 AIETS Institutional Gold Package</span> • Validity: <span className="font-bold">31 Mar 2027</span>
              </p>
            </div>
          </div>

          {/* Right: Primary & Secondary Actions */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenAddStudent}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:scale-105 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add Student</span>
            </button>
            <button
              onClick={onOpenUploadCsv}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                isDarkMode ? 'border-slate-700 bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white' : 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <Upload className="h-4 w-4 text-cyan-400" />
              <span>Upload CSV</span>
            </button>
            <button
              onClick={() => onNavigateTab('batches')}
              className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                isDarkMode ? 'border-slate-700 bg-slate-800/90 text-slate-200 hover:bg-slate-700 hover:text-white' : 'border-slate-200 bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <Layers className="h-4 w-4 text-purple-400" />
              <span>Manage Batches</span>
            </button>
          </div>
        </div>

        {/* LICENCE SUMMARY & PROGRESS BAR */}
        <div className={`mt-6 pt-6 border-t ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'} space-y-2`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-xs gap-1">
            <div className="flex items-center gap-2">
              <span className={`font-extrabold uppercase tracking-wider ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                Licence Capacity Usage
              </span>
              <span className="font-mono font-bold text-cyan-400">
                {usedLic} Used • {availLic} Available • {totalLic} Total
              </span>
            </div>
            <span className="text-slate-400 font-medium">
              {licPercentage}% Capacity Allocated
            </span>
          </div>

          {/* Visual Licence Bar */}
          <div className={`h-2.5 w-full rounded-full overflow-hidden ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`}>
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                licPercentage > 90 ? 'bg-rose-500' : licPercentage > 75 ? 'bg-amber-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400'
              }`}
              style={{ width: `${Math.max(2, licPercentage)}%` }}
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. OVERVIEW KPI CARDS
         ========================================================================= */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Enrolled Students */}
        <div className={`rounded-2xl border p-5 backdrop-blur-md shadow-sm transition ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Enrolled Students</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <p className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {students.length} <span className="text-xs font-medium text-slate-400">/ {totalLic} capacity</span>
          </p>
          <p className="text-[11px] font-bold text-cyan-400 mt-2">Active Tenant Roster</p>
        </div>

        {/* Available Licences */}
        <div className={`rounded-2xl border p-5 backdrop-blur-md shadow-sm transition ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Available Licences</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">{availLic}</p>
          <p className="text-[11px] font-bold text-slate-400 mt-2">Ready for student seat allocation</p>
        </div>

        {/* Active Batches */}
        <div className={`rounded-2xl border p-5 backdrop-blur-md shadow-sm transition ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
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
          <p className="text-[11px] font-bold text-purple-400 mt-2">Academic year 2026-2027</p>
        </div>

        {/* Tests Assigned */}
        <div className={`rounded-2xl border p-5 backdrop-blur-md shadow-sm transition ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Tests Assigned</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <FileText className="h-4 w-4" />
            </div>
          </div>
          <p className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            24 <span className="text-xs font-normal text-slate-400">of 39 included</span>
          </p>
          <p className="text-[11px] font-bold text-slate-400 mt-2">24 Currently Assigned of 39 Total Mocks</p>
        </div>

        {/* Tests Attempted */}
        <div className={`rounded-2xl border p-5 backdrop-blur-md shadow-sm transition ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Tests Attempted</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <p className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {testsAttemptedCount > 0 ? testsAttemptedCount : '—'}
          </p>
          <p className="text-[11px] font-bold text-slate-400 mt-2">Total submissions to date</p>
        </div>

        {/* Average Batch Score */}
        <div className={`rounded-2xl border p-5 backdrop-blur-md shadow-sm transition ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Avg Batch Score</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Percent className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-400">
            {testsAttemptedCount > 0 ? `${avgScoreVal}%` : '—'}
          </p>
          <p className="text-[11px] font-bold text-slate-400 mt-2">Overall institute mean accuracy</p>
        </div>

        {/* Active Students */}
        <div className={`rounded-2xl border p-5 backdrop-blur-md shadow-sm transition ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Active Students</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <UserCheck className="h-4 w-4" />
            </div>
          </div>
          <p className={`text-2xl sm:text-3xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            {students.length > 0 ? activeStudentsCount : '0'}
          </p>
          <p className="text-[11px] font-bold text-slate-400 mt-2">Regular platform logins</p>
        </div>

        {/* Upcoming AIETS Test */}
        <div className={`rounded-2xl border p-5 backdrop-blur-md shadow-sm transition ${
          isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider">Upcoming AIETS Test</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
              <Calendar className="h-4 w-4" />
            </div>
          </div>
          <p className={`text-base font-extrabold truncate ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            AIETS Mock #05
          </p>
          <p className="text-[11px] font-bold text-cyan-400 mt-1">Live in 3 Days (Sun, 10:00 AM)</p>
        </div>

      </div>

      {/* =========================================================================
          3. POLISHED EMPTY STATE WHEN NO STUDENTS ENROLLED
         ========================================================================= */}
      {students.length === 0 && (
        <div className={`rounded-3xl border p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6 ${
          isDarkMode ? 'bg-[#071126] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-lg'
        }`}>
          {/* Illustration Icon */}
          <div className="h-20 w-20 rounded-3xl bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 border border-blue-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-xl">
            <Users className="h-10 w-10" />
          </div>

          <div className="space-y-2 max-w-md mx-auto">
            <h3 className={`text-xl font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              No students enrolled yet
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Enroll students individually or bulk upload your student roster via CSV file. Once enrolled, student credentials will be auto-generated and test series access granted.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAddStudent}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-blue-500/25 hover:scale-105 transition cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Add First Student</span>
            </button>
            
            <button
              onClick={onOpenUploadCsv}
              className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-xs sm:text-sm font-bold transition cursor-pointer ${
                isDarkMode ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200'
              }`}
            >
              <Upload className="h-4 w-4 text-cyan-400" />
              <span>Upload CSV Roster</span>
            </button>

            <button
              onClick={onDownloadCsvTemplate}
              className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline transition cursor-pointer px-3 py-3"
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
