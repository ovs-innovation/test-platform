import { useState, useMemo, useEffect } from 'react';
import {
  Award,
  Trophy,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  FileText,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { CustomSelectDropdown } from '../../ui.jsx';
import { institutionDashboardService } from '../../../lib/services.js';

export default function RankingsTab({
  rankings = [],
  batches = [],
  students = [],
  availableTests = [],
  instId,
  isDarkMode = true,
}) {
  const safeBatches = Array.isArray(batches) ? batches : [];
  const safeStudents = Array.isArray(students) ? students : [];
  const safeTests = Array.isArray(availableTests) ? availableTests : [];

  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedTest, setSelectedTest] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentRankings, setCurrentRankings] = useState(Array.isArray(rankings) ? rankings : []);
  const [currentSummary, setCurrentSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const resolveInstId = () => {
    if (instId && !isNaN(Number(instId))) return Number(instId);
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

  // Sync initial rankings prop if provided and no custom fetch has occurred
  useEffect(() => {
    if (Array.isArray(rankings)) {
      setCurrentRankings(rankings);
    }
  }, [rankings]);

  // Fetch rankings when filter parameters change
  const fetchFilteredRankings = async (testVal, batchVal) => {
    if (!activeInstId) return;
    setLoading(true);
    try {
      const params = {};
      if (testVal && testVal !== 'All') params.test_id = testVal;
      if (batchVal && batchVal !== 'All') params.batch_id = batchVal;

      const res = await institutionDashboardService.rankings(activeInstId, params);
      if (res?.rankings) {
        setCurrentRankings(res.rankings);
      }
      if (res?.summary) {
        setCurrentSummary(res.summary);
      }
    } catch (err) {
      console.error('Failed to fetch filtered rankings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleTestChange = (val) => {
    setSelectedTest(val);
    fetchFilteredRankings(val, selectedBatch);
  };

  const handleBatchChange = (val) => {
    setSelectedBatch(val);
    fetchFilteredRankings(selectedTest, val);
  };

  // Filter rankings by search query locally
  const filteredLeaderboard = useMemo(() => {
    return currentRankings.filter((st) => {
      const name = st.student_name || st.name || '';
      const roll = st.roll_number || st.rollNo || '';
      const batch = st.batch_name || st.batch || '';

      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        roll.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBatch =
        selectedBatch === 'All' ||
        batch === selectedBatch ||
        String(st.batch_id) === String(selectedBatch);

      return matchesSearch && matchesBatch;
    });
  }, [currentRankings, searchQuery, selectedBatch]);

  // Dynamic Summary Computation
  const summaryMetrics = useMemo(() => {
    if (currentSummary) return currentSummary;

    const total = currentRankings.length;
    const validAirs = currentRankings
      .map((r) => r.all_india_rank || r.air)
      .filter((v) => typeof v === 'number' || (typeof v === 'string' && !isNaN(parseInt(v))));
    
    const parsedAirs = validAirs.map((v) => (typeof v === 'number' ? v : parseInt(v)));
    const minAir = parsedAirs.length > 0 ? Math.min(...parsedAirs) : null;

    const percentiles = currentRankings
      .map((r) => parseFloat(r.percentile))
      .filter((p) => !isNaN(p));
    
    const avgPct = percentiles.length > 0
      ? (percentiles.reduce((a, b) => a + b, 0) / percentiles.length).toFixed(2)
      : '0.00';

    return {
      top_air: minAir ? `#${minAir} AIR` : 'N/A',
      avg_percentile: percentiles.length > 0 ? `${avgPct}%` : '0%',
      ranked_cohort: total || safeStudents.length || 0,
    };
  }, [currentSummary, currentRankings, safeStudents.length]);

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div
        className={`p-6 rounded-3xl border ${
          isDarkMode
            ? 'bg-[#0B1730] border-slate-800/80 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <Trophy className="h-3.5 w-3.5" />
              <span>National & Institution Leaderboard</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Student Rank Benchmarking</h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              All-India, State, and Institution-level rank positions calculated from live CBT assessments.
            </p>
          </div>

          {/* DYNAMIC TOP STATS */}
          <div className="grid grid-cols-3 gap-3">
            <div
              className={`p-3 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Top AIR
              </span>
              <span className="text-base font-extrabold text-amber-400">
                {summaryMetrics.top_air}
              </span>
            </div>
            <div
              className={`p-3 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Avg Percentile
              </span>
              <span className="text-base font-extrabold text-cyan-400">
                {summaryMetrics.avg_percentile}
              </span>
            </div>
            <div
              className={`p-3 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Ranked Cohort
              </span>
              <span className="text-base font-extrabold text-emerald-400">
                {summaryMetrics.ranked_cohort} Students
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/40">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search student or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border transition ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-500'
                  : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400 focus:border-cyan-500'
              }`}
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* TEST FILTER DROPDOWN */}
            <CustomSelectDropdown
              value={selectedTest}
              onChange={handleTestChange}
              options={[
                { value: 'All', label: 'All Tests & Assessments' },
                ...safeTests.map((t) => ({
                  value: String(t.id),
                  label: t.title || t.name || `Test #${t.id}`,
                })),
              ]}
              isDarkMode={isDarkMode}
              icon={FileText}
              className="w-full sm:w-60"
            />

            {/* BATCH FILTER DROPDOWN */}
            <CustomSelectDropdown
              value={selectedBatch}
              onChange={handleBatchChange}
              options={[
                { value: 'All', label: 'All Batches' },
                ...safeBatches.map((b) => ({
                  value: b.batch_name || b.name || String(b.id),
                  label: b.batch_name || b.name,
                })),
              ]}
              isDarkMode={isDarkMode}
              icon={Filter}
              className="w-full sm:w-52"
            />

            {/* REFRESH BUTTON */}
            <button
              onClick={() => fetchFilteredRankings(selectedTest, selectedBatch)}
              disabled={loading}
              title="Refresh Rankings"
              className={`p-2 rounded-xl border transition flex items-center justify-center ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* LEADERBOARD TABLE CARD */}
      <div
        className={`rounded-3xl border overflow-hidden ${
          isDarkMode
            ? 'bg-[#0B1730] border-slate-800 text-white'
            : 'bg-white border-slate-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="p-5 border-b border-slate-800/40 flex items-center justify-between">
          <h3 className="text-sm font-extrabold flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-400" />
            <span>Institution Rank Leaderboard</span>
          </h3>
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-400" />}
            Updated after every evaluated test
          </span>
        </div>

        {filteredLeaderboard.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead
                className={`border-b ${
                  isDarkMode
                    ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                    : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <tr>
                  <th className="py-3.5 px-4 font-bold">Rank</th>
                  <th className="py-3.5 px-4 font-bold">Student Name</th>
                  <th className="py-3.5 px-4 font-bold">Roll / Enrollment ID</th>
                  <th className="py-3.5 px-4 font-bold">Batch</th>
                  <th className="py-3.5 px-4 font-bold">Latest Score</th>
                  <th className="py-3.5 px-4 font-bold">Percentile</th>
                  <th className="py-3.5 px-4 font-bold">All India Rank</th>
                  <th className="py-3.5 px-4 font-bold">State Rank</th>
                  <th className="py-3.5 px-4 font-bold text-center">Trend</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDarkMode ? 'divide-slate-800/60' : 'divide-slate-200'
                }`}
              >
                {filteredLeaderboard.map((st, index) => {
                  const rankNum = st.institute_rank || st.rank || index + 1;
                  const studentName = st.student_name || st.name || 'Student';
                  const rollNo = st.roll_number || st.rollNo || 'N/A';
                  const batchName = st.batch_name || st.batch || 'General';
                  const scoreDisplay =
                    st.score !== undefined
                      ? `${st.score} / ${st.max_marks || 720}`
                      : 'N/A';
                  
                  const percentileDisplay =
                    st.percentile !== undefined && st.percentile !== null
                      ? typeof st.percentile === 'number' || !isNaN(parseFloat(st.percentile))
                        ? `${parseFloat(st.percentile).toFixed(2)}%`
                        : st.percentile
                      : 'N/A';
                  
                  const airDisplay = st.all_india_rank
                    ? `#${st.all_india_rank}`
                    : st.air || 'N/A';
                  
                  const stateRankDisplay = st.state_rank
                    ? `#${st.state_rank}`
                    : st.stateRank || 'N/A';

                  const trend = st.change || (rankNum <= 3 ? 'up' : 'same');

                  return (
                    <tr
                      key={st.student_id || st.id || index}
                      className={`hover:bg-blue-500/5 transition ${
                        rankNum === 1 ? (isDarkMode ? 'bg-amber-500/10' : 'bg-amber-50') : ''
                      }`}
                    >
                      <td className="py-3.5 px-4 font-black">
                        {rankNum === 1 && (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-sm">
                            1
                          </span>
                        )}
                        {rankNum === 2 && (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs shadow-sm">
                            2
                          </span>
                        )}
                        {rankNum === 3 && (
                          <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-700 text-white font-black text-xs shadow-sm">
                            3
                          </span>
                        )}
                        {rankNum > 3 && <span className="text-slate-400">#{rankNum}</span>}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-sm">{studentName}</td>
                      <td className="py-3.5 px-4 font-mono text-cyan-400 font-semibold">
                        {rollNo}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">{batchName}</td>
                      <td className="py-3.5 px-4 font-extrabold text-emerald-400">
                        {scoreDisplay}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-blue-400">
                        {percentileDisplay}
                      </td>
                      <td className="py-3.5 px-4 font-extrabold text-amber-400">
                        {airDisplay}
                      </td>
                      <td className="py-3.5 px-4 font-semibold text-slate-300">
                        {stateRankDisplay}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        {trend === 'up' && (
                          <TrendingUp className="h-4 w-4 text-emerald-400 inline" />
                        )}
                        {trend === 'down' && (
                          <TrendingDown className="h-4 w-4 text-rose-400 inline" />
                        )}
                        {trend === 'same' && (
                          <Minus className="h-4 w-4 text-slate-500 inline" />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
              <Trophy className="h-6 w-6" />
            </div>
            <h4 className="text-base font-extrabold">
              {searchQuery || selectedBatch !== 'All' || selectedTest !== 'All'
                ? 'No Student Ranks Match the Selected Filters'
                : 'No Rank Benchmarks Available Yet'}
            </h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              {searchQuery || selectedBatch !== 'All' || selectedTest !== 'All'
                ? 'Try adjusting your search query, batch, or test selection to view candidate rankings.'
                : 'All India Ranks (AIR) and State Ranks will calculate automatically once enrolled students submit their assigned AIETS CBT examination papers.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
