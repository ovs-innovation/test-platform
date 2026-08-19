import { useState, useEffect } from 'react';
import {
  Download,
  FileSpreadsheet,
  Users,
  Layers,
  Building2,
  TrendingUp,
  Award,
  FileText,
  Loader2,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';
import { CustomSelectDropdown } from '../../ui.jsx';
import { institutionReportsService } from '../../../lib/services.js';

export default function ReportsTab({
  institution,
  students = [],
  batches = [],
  availableTests = [],
  instId,
  isDarkMode = true,
}) {
  const toast = useToast();
  const safeTests = Array.isArray(availableTests) ? availableTests : [];

  const [exportFormat, setExportFormat] = useState('csv');
  const [selectedTest, setSelectedTest] = useState('All');
  const [downloadingKey, setDownloadingKey] = useState(null);
  const [overallSummary, setOverallSummary] = useState(null);
  const [loadingSummary, setLoadingSummary] = useState(false);

  const resolveInstId = () => {
    if (instId && !isNaN(Number(instId))) return Number(instId);
    if (institution?.id && !isNaN(Number(institution.id))) return Number(institution.id);
    try {
      const saved = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedId = Number(parsed?.id || parsed?.institution_id);
        if (savedId && !isNaN(savedId) && savedId > 0) return savedId;
      }
    } catch (e) {}
    return 1;
  };
  const activeInstId = resolveInstId();

  // Fetch live overall summary report metrics on load or test filter change
  useEffect(() => {
    if (!activeInstId) return;
    setLoadingSummary(true);
    const params = selectedTest !== 'All' ? { test_id: selectedTest } : {};
    institutionReportsService
      .getOverall(activeInstId, params)
      .then((data) => setOverallSummary(data))
      .catch((err) => console.error('Failed to load institution overall report summary:', err))
      .finally(() => setLoadingSummary(false));
  }, [activeInstId, selectedTest]);

  // Handle direct file download from backend endpoint
  const handleDownloadReport = async (key, endpoint, title) => {
    const targetInstId = activeInstId || 1;
    setDownloadingKey(key);
    try {
      const params = selectedTest !== 'All' ? { test_id: selectedTest } : {};
      const dataBlob = await institutionReportsService.download(
        targetInstId,
        endpoint,
        exportFormat,
        params
      );

      // Extract or create Blob
      const blob = dataBlob instanceof Blob
        ? dataBlob
        : new Blob([dataBlob], {
            type:
              exportFormat === 'excel'
                ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                : 'text/csv;charset=utf-8;',
          });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      const ext = exportFormat === 'excel' ? 'xlsx' : 'csv';
      const cleanTitle = title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
      link.href = url;
      link.setAttribute('download', `institution_${cleanTitle}_report_${Date.now()}.${ext}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(`Exported ${title} (${exportFormat.toUpperCase()}) successfully!`);
    } catch (err) {
      console.error(`Error exporting ${title}:`, err);
      toast.error(err?.message || `Failed to export ${title}. Please try again.`);
    } finally {
      setDownloadingKey(null);
    }
  };

  const reportCards = [
    {
      key: 'roster',
      endpoint: 'rankings',
      title: 'Student Directory & Accuracy Report',
      description:
        'Export full student list with roll numbers, contact details, percentile rankings, and accuracy scores.',
      icon: Users,
      badgeColor: isDarkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-700 border-blue-200',
      btnColor: 'bg-blue-600 hover:bg-blue-500 text-white',
    },
    {
      key: 'batch',
      endpoint: 'batch-comparison',
      title: 'Batch Performance Summary Report',
      description:
        'Export academic batch aggregates, syllabus completion rates, student counts, and comparative metrics.',
      icon: Layers,
      badgeColor: isDarkMode ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 'bg-purple-50 text-purple-700 border-purple-200',
      btnColor: 'bg-purple-600 hover:bg-purple-500 text-white',
    },
    {
      key: 'overall',
      endpoint: 'overall',
      title: 'Full Institution Audit Report',
      description:
        'Export master AIETS test attempts log, national percentile benchmarking, and institutional audit details.',
      icon: Building2,
      badgeColor: isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200',
      btnColor: 'bg-emerald-600 hover:bg-emerald-500 text-white',
    },
    {
      key: 'trends',
      endpoint: 'trends',
      title: 'Performance & Score Trends Report',
      description:
        'Export longitudinal score progression trends, historical average score graphs, and attempt counts.',
      icon: TrendingUp,
      badgeColor: isDarkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-800 border-amber-200',
      btnColor: 'bg-amber-600 hover:bg-amber-500 text-white',
    },
    {
      key: 'improvement',
      endpoint: 'improvement',
      title: 'Student Improvement Analytics Report',
      description:
        'Export score growth velocity, topic-wise progress trajectories, and student improvement indices.',
      icon: Award,
      badgeColor: isDarkMode ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' : 'bg-cyan-50 text-cyan-700 border-cyan-200',
      btnColor: 'bg-cyan-600 hover:bg-cyan-500 text-white',
    },
  ];

  const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-slate-600 font-semibold';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER CARD */}
      <div
        className={`rounded-3xl border p-5 sm:p-6 shadow-sm ${
          isDarkMode
            ? 'bg-[#0E1726] border-slate-800 text-white'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
              isDarkMode ? 'bg-blue-500/10 text-cyan-400 border-cyan-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'
            }`}>
              <Download className="h-3.5 w-3.5" />
              <span>Data Export & Compliance Center</span>
            </div>
            <h2
              className={`text-xl sm:text-2xl font-black tracking-tight ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
            >
              Institutional Reports & Analytics Center
            </h2>
            <p className={`text-xs mt-1 ${textMutedClass}`}>
              Generate and download official student scorecards, batch aggregate reports, and institution-wide compliance files.
            </p>
          </div>

          {/* CONTROLS: EXPORT FORMAT & TEST FILTER */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* FORMAT SELECTOR TOGGLE */}
            <div
              className={`p-1 rounded-2xl border flex items-center gap-1 ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200/90'
              }`}
            >
              <button
                type="button"
                onClick={() => setExportFormat('csv')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  exportFormat === 'csv'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                CSV
              </button>
              <button
                type="button"
                onClick={() => setExportFormat('excel')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition cursor-pointer ${
                  exportFormat === 'excel'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : isDarkMode
                    ? 'text-slate-400 hover:text-white'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                Excel (.xlsx)
              </button>
            </div>

            {/* TEST FILTER DROPDOWN */}
            <CustomSelectDropdown
              value={selectedTest}
              onChange={(val) => setSelectedTest(val)}
              options={[
                { value: 'All', label: 'All Tests & Assessments' },
                ...safeTests.map((t) => ({
                  value: String(t.id),
                  label: t.title || t.name || `Test #${t.id}`,
                })),
              ]}
              isDarkMode={isDarkMode}
              icon={FileText}
              className="w-full sm:w-56"
            />
          </div>
        </div>

        {/* LIVE SUMMARY BANNER */}
        {overallSummary && (
          <div className={`grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-4 border-t ${
            isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
          }`}>
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider block ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Avg Institution Score
              </span>
              <span className="text-lg font-black text-cyan-700 dark:text-cyan-400">
                {overallSummary.average_score}%
              </span>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider block ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Total Test Attempts
              </span>
              <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                {overallSummary.total_attempts || 0}
              </span>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider block ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Participation Rate
              </span>
              <span className="text-lg font-black text-purple-700 dark:text-purple-400">
                {overallSummary.participation_rate || 0}%
              </span>
            </div>

            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider block ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Highest Score Achieved
              </span>
              <span className="text-lg font-black text-amber-700 dark:text-amber-400">
                {overallSummary.highest_score}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* REPORT EXPORT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportCards.map((report) => {
          const IconComponent = report.icon;
          const isDownloading = downloadingKey === report.key;

          return (
            <div
              key={report.key}
              className={`rounded-3xl border p-6 space-y-4 shadow-sm flex flex-col justify-between transition hover:shadow-md ${
                isDarkMode
                  ? 'bg-[#0B1730] border-slate-800 text-white hover:border-slate-700'
                  : 'bg-white border-slate-200/90 text-slate-900 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                <div className={`p-3 rounded-2xl border w-fit ${report.badgeColor}`}>
                  <IconComponent className="h-6 w-6" />
                </div>
                <div>
                  <h3
                    className={`text-base font-black leading-snug ${
                      isDarkMode ? 'text-white' : 'text-slate-900'
                    }`}
                  >
                    {report.title}
                  </h3>
                  <p
                    className={`text-xs mt-1.5 leading-relaxed ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'
                    }`}
                  >
                    {report.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => handleDownloadReport(report.key, report.endpoint, report.title)}
                disabled={isDownloading}
                className={`w-full inline-flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-black transition cursor-pointer shadow-md ${report.btnColor}`}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-white" />
                    <span>Exporting {exportFormat.toUpperCase()}...</span>
                  </>
                ) : (
                  <>
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Export {exportFormat.toUpperCase()}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
