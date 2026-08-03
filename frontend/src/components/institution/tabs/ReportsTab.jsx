import { useState } from 'react';
import { Download, FileText, FileSpreadsheet, CheckCircle2, Users, Layers, Building2 } from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';

export default function ReportsTab({
  institution,
  students = [],
  batches = [],
  isDarkMode = true,
}) {
  const toast = useToast();

  const handleExport = (type) => {
    const instId = institution?.id || 1;
    const url = `/api/institution/${instId}/reports/export?type=${type}`;
    window.open(url, '_blank');
    toast.success(`Exporting ${type} report to CSV...`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* HEADER */}
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div>
          <h2 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <Download className="h-5 w-5 text-cyan-400" />
            <span>Institutional Reports & Export Center</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Generate and download individual student scorecards, batch summary performance reports, and institution-wide AIETS audit files.
          </p>
        </div>
      </div>

      {/* REPORT EXPORT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Student Roster Report */}
        <div className={`rounded-3xl border p-6 space-y-4 backdrop-blur-xl shadow-lg relative overflow-hidden ${
          isDarkMode ? 'bg-[#071126] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 w-fit">
            <Users className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Student Roster & Accuracy Report</h3>
            <p className="text-xs text-slate-400 mt-1">Export full student list with roll numbers, contact details, tests completed, and average scores.</p>
          </div>
          <button
            onClick={() => handleExport('student')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export Student CSV</span>
          </button>
        </div>

        {/* Batch Performance Report */}
        <div className={`rounded-3xl border p-6 space-y-4 backdrop-blur-xl shadow-lg relative overflow-hidden ${
          isDarkMode ? 'bg-[#071126] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-400 border border-purple-500/20 w-fit">
            <Layers className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Batch Performance Summary</h3>
            <p className="text-xs text-slate-400 mt-1">Export academic batch aggregates, syllabus completion rates, and comparative accuracy metrics.</p>
          </div>
          <button
            onClick={() => handleExport('batch')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 py-2.5 text-xs font-bold text-white hover:bg-purple-500 transition cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export Batch Report CSV</span>
          </button>
        </div>

        {/* Institution Audit File */}
        <div className={`rounded-3xl border p-6 space-y-4 backdrop-blur-xl shadow-lg relative overflow-hidden ${
          isDarkMode ? 'bg-[#071126] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
            <Building2 className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-white">Full Institution Audit Report</h3>
            <p className="text-xs text-slate-400 mt-1">Export master AIETS test attempts log, national percentile benchmarking, and licence audit details.</p>
          </div>
          <button
            onClick={() => handleExport('institution')}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 transition cursor-pointer"
          >
            <Download className="h-4 w-4" />
            <span>Export Institution Audit CSV</span>
          </button>
        </div>

      </div>

    </div>
  );
}
