import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, CheckCircle2, Users, Layers, Building2, Calendar, FileCheck } from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';
import { downloadCsv } from '../../../lib/csv.js';

export default function ReportsTab({
  institution,
  students = [],
  batches = [],
  isDarkMode = true,
}) {
  const toast = useToast();

  const handleExport = (type) => {
    let filename = `institution_${type}_report.csv`;
    let data = [];

    if (type === 'student') {
      filename = 'institution_student_roster_report.csv';
      data = (students.length > 0 ? students : [
        { name: 'Aarav Sharma', roll_number: 'APX-2026-01', email: 'aarav@gmail.com', batch_name: 'JEE Main 2027', tests_completed: 12, average_score: 88, is_blocked: false },
        { name: 'Ananya Verma', roll_number: 'APX-2026-02', email: 'ananya@gmail.com', batch_name: 'NEET UG Super 30', tests_completed: 14, average_score: 92, is_blocked: false },
      ]).map((s) => ({
        'Student Name': s.name || s.student_name,
        'Roll Number': s.roll_number || s.rollNo,
        'Email': s.email,
        'Batch Name': s.batch_name || s.course || 'General Batch',
        'Tests Completed': s.tests_completed || s.testsCount || 0,
        'Average Score (%)': s.average_score || s.avgScore || 0,
        'Status': s.is_blocked ? 'Blocked' : 'Active',
      }));
    } else if (type === 'batch') {
      filename = 'institution_batch_performance_report.csv';
      data = (batches.length > 0 ? batches : [
        { name: 'JEE Main & Advanced 2027', student_count: 45, target_exam: 'JEE Main & Advanced', academic_year: '2026-2027' },
        { name: 'NEET UG Super 30', student_count: 30, target_exam: 'NEET UG', academic_year: '2026-2027' },
      ]).map((b) => ({
        'Batch Name': b.batch_name || b.name,
        'Student Count': b.student_count || b.total_students || 0,
        'Target Exam': b.target_exam || b.targetExam || 'NTA CBT',
        'Academic Year': b.academic_year || '2026-2027',
      }));
    } else {
      filename = 'institution_master_audit_report.csv';
      data = [
        { 'Metric': 'Institution Name', 'Value': institution?.name || 'S.S.C Public School' },
        { 'Metric': 'School Code', 'Value': institution?.code || 'SSC-123' },
        { 'Metric': 'Total Seats Authorized', 'Value': institution?.total_licenses || 50 },
        { 'Metric': 'Enrolled Students', 'Value': students.length },
        { 'Metric': 'Active Batches', 'Value': batches.length },
        { 'Metric': 'Report Generated At', 'Value': new Date().toLocaleString() },
      ];
    }

    downloadCsv(data, filename);
    toast.success(`Downloaded ${filename} successfully!`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER */}
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
            <Download className="h-3.5 w-3.5" />
            <span>Data Export & Compliance</span>
          </div>
          <h2 className={`text-lg sm:text-xl font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            Institutional Reports & Export Center
          </h2>
          <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            Generate and download individual student scorecards, batch summary performance reports, and institution-wide AIETS audit files.
          </p>
        </div>
      </div>

      {/* REPORT EXPORT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Student Roster Report */}
        <div className={`rounded-3xl border p-6 space-y-4 shadow-sm flex flex-col justify-between ${
          isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Student Roster & Accuracy Report
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Export full student list with roll numbers, contact details, tests completed, and average scores.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleExport('student')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition cursor-pointer shadow-md"
          >
            <Download className="h-4 w-4" />
            <span>Export Student CSV</span>
          </button>
        </div>

        {/* Batch Performance Report */}
        <div className={`rounded-3xl border p-6 space-y-4 shadow-sm flex flex-col justify-between ${
          isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
              <Layers className="h-6 w-6" />
            </div>
            <div>
              <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Batch Performance Summary
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Export academic batch aggregates, syllabus completion rates, and comparative accuracy metrics.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleExport('batch')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition cursor-pointer shadow-md"
          >
            <Download className="h-4 w-4" />
            <span>Export Batch Report CSV</span>
          </button>
        </div>

        {/* Institution Audit File */}
        <div className={`rounded-3xl border p-6 space-y-4 shadow-sm flex flex-col justify-between ${
          isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
              <Building2 className="h-6 w-6" />
            </div>
            <div>
              <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Full Institution Audit Report
              </h3>
              <p className={`text-xs mt-1 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Export master AIETS test attempts log, national percentile benchmarking, and licence audit details.
              </p>
            </div>
          </div>
          <button
            onClick={() => handleExport('institution')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition cursor-pointer shadow-md"
          >
            <Download className="h-4 w-4" />
            <span>Export Institution Audit CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
