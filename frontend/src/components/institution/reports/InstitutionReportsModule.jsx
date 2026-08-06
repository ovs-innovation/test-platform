import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Award,
  Users,
  Layers,
  Calendar,
  Download,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  School,
  CheckCircle2,
  AlertTriangle,
  Percent,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { institutionReportsService } from '../../../lib/services.js';
import { useToast } from '../../../context/ToastContext.jsx';
import { Spinner } from '../../ui.jsx';

export default function InstitutionReportsModule({ schoolId, isDarkMode = true, batches = [] }) {
  const toast = useToast();
  const instId = schoolId || 1;

  // Active Sub-Tab State (1 to 5)
  const [activeReportTab, setActiveReportTab] = useState('overall');

  // Shared Global Filters State
  const [dateRange, setDateRange] = useState('30d');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [exporting, setExporting] = useState(false);

  // Sub-View Data States
  const [overallData, setOverallData] = useState(null);
  const [rankingsData, setRankingsData] = useState(null);
  const [batchData, setBatchData] = useState(null);
  const [trendsData, setTrendsData] = useState(null);
  const [improvementData, setImprovementData] = useState(null);

  // Rankings Pagination & Search State
  const [rankingsSearch, setRankingsSearch] = useState('');
  const [rankingsPage, setRankingsPage] = useState(1);

  // Trends Controls State
  const [trendMetric, setTrendMetric] = useState('score'); // 'score' | 'completion' | 'participation'
  const [trendInterval, setTrendInterval] = useState('week'); // 'week' | 'month'

  // Loading States
  const [loading, setLoading] = useState(true);

  // Fetch report data whenever active tab or filters change
  useEffect(() => {
    fetchActiveReportData();
  }, [instId, activeReportTab, dateRange, selectedBatch, selectedSubject, rankingsPage, rankingsSearch, trendInterval]);

  const fetchActiveReportData = async () => {
    setLoading(true);
    try {
      const params = {
        range: dateRange,
        batch_id: selectedBatch,
        subject: selectedSubject,
      };

      if (activeReportTab === 'overall') {
        const res = await institutionReportsService.getOverall(instId, params);
        setOverallData(res);
      } else if (activeReportTab === 'rankings') {
        const res = await institutionReportsService.getRankings(instId, {
          ...params,
          page: rankingsPage,
          limit: 20,
          search: rankingsSearch,
        });
        setRankingsData(res);
      } else if (activeReportTab === 'batch') {
        const res = await institutionReportsService.getBatchComparison(instId, params);
        setBatchData(res);
      } else if (activeReportTab === 'trends') {
        const res = await institutionReportsService.getTrends(instId, { ...params, interval: trendInterval });
        setTrendsData(res);
      } else if (activeReportTab === 'improvement') {
        const res = await institutionReportsService.getImprovement(instId, params);
        setImprovementData(res);
      }
    } catch (err) {
      console.error('Failed to load institution report:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCsv = async () => {
    setExporting(true);
    try {
      const endpointMap = {
        overall: 'overall',
        rankings: 'rankings',
        batch: 'batch-comparison',
        trends: 'trends',
        improvement: 'improvement',
      };

      await institutionReportsService.download(instId, endpointMap[activeReportTab] || 'overall', 'csv', {
        range: dateRange,
        batch_id: selectedBatch,
      });
      toast.success(`Exported ${activeReportTab.toUpperCase()} report as CSV`);
    } catch (err) {
      toast.error('Failed to download report CSV');
    } finally {
      setExporting(false);
    }
  };

  const reportTabs = [
    { id: 'overall', label: '1. Overall Performance', icon: BarChart3 },
    { id: 'rankings', label: '2. Student Rankings', icon: Award },
    { id: 'batch', label: '3. Batch Comparison', icon: Layers },
    { id: 'trends', label: '4. Performance Trends', icon: TrendingUp },
    { id: 'improvement', label: '5. Improvement Analytics', icon: Sparkles },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* HEADER TOOLBAR & FILTER CONTROLS */}
      <div className={`p-4 sm:p-6 rounded-3xl border shadow-xl backdrop-blur-xl ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          
          {/* Left: Tab Switcher Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto custom-scrollbar pb-2 lg:pb-0">
            {reportTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeReportTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveReportTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20'
                      : isDarkMode
                      ? 'bg-slate-900/60 text-slate-400 hover:text-white hover:bg-slate-800'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Right: Filters & Export Button */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Range Selector */}
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="this_month">This Month</option>
              <option value="all_time">All Time</option>
            </select>

            {/* Batch Filter */}
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">All Batches</option>
              {batches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.batch_name || b.name}
                </option>
              ))}
            </select>

            {/* Subject Filter */}
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className={`px-3 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-800'
              }`}
            >
              <option value="All">All Subjects</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology / Math</option>
            </select>

            {/* Export CSV Button */}
            <button
              onClick={handleExportCsv}
              disabled={exporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-xs font-bold text-white shadow-md hover:scale-105 transition cursor-pointer disabled:opacity-50"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{exporting ? 'Exporting...' : 'Export CSV'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* REPORT CONTENT BODY */}
      {loading ? (
        <div className={`p-12 text-center rounded-3xl border ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
          <Spinner className="h-8 w-8 text-cyan-400 mx-auto mb-3" />
          <p className="text-xs font-bold text-slate-400">Loading institute analytics report...</p>
        </div>
      ) : (
        <>
          {/* =========================================================================
              PAGE 1: OVERALL INSTITUTE PERFORMANCE
             ========================================================================= */}
          {activeReportTab === 'overall' && (
            <div className="space-y-6">
              {/* 4 KPI CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                <div className={`p-5 rounded-3xl border shadow-lg ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider">Total Enrolled</span>
                    <Users className="h-4 w-4 text-blue-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-white">
                    {overallData?.total_assigned_students || 0}{' '}
                    <span className="text-xs font-normal text-slate-400">/ {overallData?.total_licenses || 50} licenses</span>
                  </p>
                  <p className="text-[11px] font-bold text-cyan-400 mt-2">
                    {overallData?.active_students || 0} Active • {overallData?.inactive_students || 0} Inactive
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border shadow-lg ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider">Average Score</span>
                    <Percent className="h-4 w-4 text-emerald-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-emerald-400">
                    {overallData?.average_score || 0}%
                  </p>
                  <p className="text-[11px] font-bold text-slate-400 mt-2">
                    High: {overallData?.highest_score || 0}% • Low: {overallData?.lowest_score || 0}%
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border shadow-lg ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider">Completion Rate</span>
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-purple-400">
                    {overallData?.completion_rate || 0}%
                  </p>
                  <p className="text-[11px] font-bold text-slate-400 mt-2">
                    {overallData?.total_attempts || 0} total test attempts
                  </p>
                </div>

                <div className={`p-5 rounded-3xl border shadow-lg ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <div className="flex items-center justify-between text-slate-400 mb-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider">License Utilization</span>
                    <BarChart3 className="h-4 w-4 text-amber-400" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-black text-amber-400">
                    {overallData?.license_utilization || 0}%
                  </p>
                  <p className="text-[11px] font-bold text-cyan-400 mt-2">
                    Platform AIR Rank Avg: P{overallData?.platform_avg_percentile || 75}
                  </p>
                </div>
              </div>

              {/* PRIMARY VISUAL: SUBJECT-WISE PERFORMANCE BREAKDOWN */}
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-base font-extrabold text-white mb-4">Subject-Wise Mean Accuracy Breakdown</h3>
                <div className="space-y-4">
                  {(overallData?.subject_wise_performance || []).map((sub, i) => (
                    <div key={i} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">{sub.subject}</span>
                        <span className="text-cyan-400">{sub.avg_score}% Avg (Peak: {sub.highest_score}%)</span>
                      </div>
                      <div className="h-3 w-full rounded-full bg-slate-900 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${Math.max(4, sub.avg_score)}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              PAGE 2: STUDENT RANKINGS
             ========================================================================= */}
          {activeReportTab === 'rankings' && (
            <div className="space-y-6">
              {/* SEARCH & FILTER BAR */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search student by name, roll number, email..."
                    value={rankingsSearch}
                    onChange={(e) => {
                      setRankingsSearch(e.target.value);
                      setRankingsPage(1);
                    }}
                    className={`w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border transition ${
                      isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
                <p className="text-xs font-bold text-slate-400">
                  Showing {rankingsData?.rankings?.length || 0} of {rankingsData?.total_students || 0} students
                </p>
              </div>

              {/* RANKINGS TABLE */}
              <div className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`border-b text-[11px] font-extrabold uppercase tracking-wider ${
                      isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                    }`}>
                      <tr>
                        <th className="p-4">Inst. Rank</th>
                        <th className="p-4">Student Identity</th>
                        <th className="p-4">Batch</th>
                        <th className="p-4">Overall Score</th>
                        <th className="p-4">Platform AIR Rank</th>
                        <th className="p-4">Tests Attempted</th>
                        <th className="p-4">Trend</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {(rankingsData?.rankings || []).map((st) => (
                        <tr key={st.student_id} className="hover:bg-slate-800/40 transition">
                          <td className="p-4 font-black text-cyan-400">#{st.institute_rank}</td>
                          <td className="p-4">
                            <p className="font-extrabold text-white">{st.student_name}</p>
                            <p className="text-[10px] text-slate-400 font-mono">{st.roll_number} • {st.student_email}</p>
                          </td>
                          <td className="p-4 font-medium text-slate-300">{st.batch_name}</td>
                          <td className="p-4 font-bold text-emerald-400">{st.overall_score}%</td>
                          <td className="p-4 font-mono font-bold text-purple-400">AIR #{st.platform_rank}</td>
                          <td className="p-4 text-slate-300">{st.tests_attempted} tests</td>
                          <td className="p-4">
                            {st.trend === 'up' && (
                              <span className="inline-flex items-center gap-1 text-emerald-400 font-bold">
                                <ArrowUpRight className="h-4 w-4" /> Improved
                              </span>
                            )}
                            {st.trend === 'down' && (
                              <span className="inline-flex items-center gap-1 text-rose-400 font-bold">
                                <ArrowDownRight className="h-4 w-4" /> Declined
                              </span>
                            )}
                            {st.trend === 'stable' && (
                              <span className="inline-flex items-center gap-1 text-slate-400 font-bold">
                                <Minus className="h-4 w-4" /> Stable
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}

                      {(!rankingsData?.rankings || rankingsData.rankings.length === 0) && (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400">
                            No student rankings found for the selected query.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* PAGINATION CONTROLS */}
                {rankingsData && rankingsData.total_pages > 1 && (
                  <div className="flex items-center justify-between p-4 border-t border-slate-800 bg-slate-900/50 text-xs">
                    <button
                      onClick={() => setRankingsPage((p) => Math.max(1, p - 1))}
                      disabled={rankingsPage <= 1}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 disabled:opacity-40"
                    >
                      Previous
                    </button>
                    <span className="text-slate-400 font-bold">
                      Page {rankingsPage} of {rankingsData.total_pages}
                    </span>
                    <button
                      onClick={() => setRankingsPage((p) => Math.min(rankingsData.total_pages, p + 1))}
                      disabled={rankingsPage >= rankingsData.total_pages}
                      className="px-3 py-1.5 rounded-lg border border-slate-700 disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* =========================================================================
              PAGE 3: BATCH COMPARISON
             ========================================================================= */}
          {activeReportTab === 'batch' && (
            <div className="space-y-6">
              {/* COMPARISON CARDS */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {(batchData?.batches || []).map((b) => (
                  <div key={b.batch_id} className={`p-6 rounded-3xl border shadow-xl relative ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                    <h4 className="text-base font-extrabold text-white mb-2">{b.batch_name}</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                        <span className="text-slate-400">Enrolled Students:</span>
                        <span className="font-bold text-white">{b.total_students}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                        <span className="text-slate-400">Participation Rate:</span>
                        <span className="font-bold text-cyan-400">{b.participation_rate}%</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-800/60 pb-1.5">
                        <span className="text-slate-400">Average Score:</span>
                        <span className="font-black text-emerald-400 text-sm">{b.average_score}%</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-slate-400">Highest Score:</span>
                        <span className="font-bold text-purple-400">{b.highest_score}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* BATCH COMPARISON TABLE */}
              <div className={`rounded-3xl border overflow-hidden shadow-xl ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="p-5 border-b border-slate-800 flex justify-between items-center">
                  <h3 className="text-sm font-extrabold text-white">Side-by-Side Batch Metrics</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className={`border-b text-[11px] font-extrabold uppercase ${isDarkMode ? 'bg-slate-900/80 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200'}`}>
                      <tr>
                        <th className="p-4">Batch Name</th>
                        <th className="p-4">Total Roster</th>
                        <th className="p-4">Attempted Students</th>
                        <th className="p-4">Participation %</th>
                        <th className="p-4">Avg Score %</th>
                        <th className="p-4">Peak Score %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {(batchData?.batches || []).map((b) => (
                        <tr key={b.batch_id} className="hover:bg-slate-800/40 transition">
                          <td className="p-4 font-black text-white">{b.batch_name}</td>
                          <td className="p-4 text-slate-300">{b.total_students}</td>
                          <td className="p-4 text-slate-300">{b.attempted_students}</td>
                          <td className="p-4 font-bold text-cyan-400">{b.participation_rate}%</td>
                          <td className="p-4 font-black text-emerald-400">{b.average_score}%</td>
                          <td className="p-4 font-bold text-purple-400">{b.highest_score}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              PAGE 4: PERFORMANCE TRENDS
             ========================================================================= */}
          {activeReportTab === 'trends' && (
            <div className="space-y-6">
              {/* METRIC & INTERVAL TOGGLES */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTrendMetric('score')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      trendMetric === 'score' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Average Score
                  </button>
                  <button
                    onClick={() => setTrendMetric('completion')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      trendMetric === 'completion' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Completion Rate
                  </button>
                  <button
                    onClick={() => setTrendMetric('participation')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      trendMetric === 'participation' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    Participation Rate
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setTrendInterval('week')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      trendInterval === 'week' ? 'bg-blue-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Weekly
                  </button>
                  <button
                    onClick={() => setTrendInterval('month')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold ${
                      trendInterval === 'month' ? 'bg-blue-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              {/* TREND TIME-SERIES VISUAL */}
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-xl ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                <h3 className="text-base font-extrabold text-white mb-6">Performance Evolution vs Platform Benchmark</h3>
                <div className="space-y-6">
                  {(trendsData?.trends || []).map((t, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-xs font-bold">
                        <span className="text-slate-300">{t.period} ({t.test_name})</span>
                        <span className="text-cyan-400 font-mono">Inst Avg: {t.institution_average_score}% vs Platform: {t.platform_average_score}%</span>
                      </div>
                      <div className="h-4 w-full rounded-full bg-slate-900 overflow-hidden relative">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400"
                          style={{ width: `${Math.max(5, t.institution_average_score)}%` }}
                        />
                        {/* Overlay Benchmark Line */}
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-amber-400 z-10 shadow-md"
                          style={{ left: `${Math.max(5, t.platform_average_score)}%` }}
                          title={`Platform Benchmark: ${t.platform_average_score}%`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* =========================================================================
              PAGE 5: IMPROVEMENT ANALYTICS
             ========================================================================= */}
          {activeReportTab === 'improvement' && (
            <div className="space-y-6">
              {/* SUMMARY STATS CARDS */}
              <div className="grid grid-cols-3 gap-4">
                <div className={`p-5 rounded-3xl border text-center ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs font-bold text-slate-400 uppercase">Improving</p>
                  <p className="text-2xl font-black text-emerald-400 mt-1">+{improvementData?.summary?.pct_improved || 65}%</p>
                </div>
                <div className={`p-5 rounded-3xl border text-center ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs font-bold text-slate-400 uppercase">Declining</p>
                  <p className="text-2xl font-black text-rose-400 mt-1">{improvementData?.summary?.pct_declined || 18}%</p>
                </div>
                <div className={`p-5 rounded-3xl border text-center ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <p className="text-xs font-bold text-slate-400 uppercase">Flat / Consistent</p>
                  <p className="text-2xl font-black text-slate-300 mt-1">{improvementData?.summary?.pct_flat || 17}%</p>
                </div>
              </div>

              {/* TWO LISTS: TOP IMPROVERS & AT-RISK STUDENTS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Top Improvers */}
                <div className={`p-6 rounded-3xl border shadow-xl ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h4 className="text-sm font-extrabold text-emerald-400 mb-4 flex items-center gap-2">
                    <ArrowUpRight className="h-4 w-4" /> Top Most Improved Students
                  </h4>
                  <div className="space-y-3 text-xs">
                    {(improvementData?.top_improvers || []).map((s, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                        <div>
                          <p className="font-extrabold text-white">{s.student_name}</p>
                          <p className="text-[10px] text-slate-400">{s.batch_name}</p>
                        </div>
                        <span className="font-black text-emerald-400 text-sm">+{s.score_change}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* At-Risk Students */}
                <div className={`p-6 rounded-3xl border shadow-xl ${isDarkMode ? 'bg-[#0B1730] border-slate-800' : 'bg-white border-slate-200'}`}>
                  <h4 className="text-sm font-extrabold text-rose-400 mb-4 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" /> Needs Attention / At-Risk
                  </h4>
                  <div className="space-y-3 text-xs">
                    {(improvementData?.at_risk_students || []).map((s, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                        <div>
                          <p className="font-extrabold text-white">{s.student_name}</p>
                          <p className="text-[10px] text-slate-400">{s.batch_name}</p>
                        </div>
                        <span className="font-black text-rose-400 text-sm">{s.score_change}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

    </div>
  );
}
