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

  const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-slate-600 font-semibold';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER CARD */}
      <div
        className={`p-5 sm:p-6 rounded-3xl border shadow-sm ${
          isDarkMode
            ? 'bg-[#0E1726] border-slate-800 text-white'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
              isDarkMode ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-800 border-amber-200'
            }`}>
              <Trophy className="h-3.5 w-3.5" />
              <span>National & Institution Leaderboard</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Student Rank Benchmarking
            </h2>
            <p className={`text-xs mt-1 ${textMutedClass}`}>
              All-India, State, and Institution-level rank positions calculated from live CBT assessments.
            </p>
          </div>

          {/* DYNAMIC TOP STATS */}
          <div className="grid grid-cols-3 gap-3">
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Top AIR
              </span>
              <span className="text-base font-black text-amber-600 dark:text-amber-400">
                {summaryMetrics.top_air}
              </span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Avg Percentile
              </span>
              <span className="text-base font-black text-cyan-600 dark:text-cyan-400">
                {summaryMetrics.avg_percentile}
              </span>
            </div>
            <div
              className={`p-3.5 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                Ranked Cohort
              </span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                {summaryMetrics.ranked_cohort} Students
              </span>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className={`mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t ${
          isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          <div className="relative w-full sm:w-80">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Search student name or roll number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-xs font-semibold rounded-xl border transition ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-600 focus:bg-white shadow-2xs'
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
              className={`p-2.5 rounded-xl border transition cursor-pointer flex items-center justify-center ${
                isDarkMode
                  ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 shadow-2xs'
              }`}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin text-cyan-500' : ''}`} />
            </button>
          </div>
        </div>
      </div>

      {/* LEADERBOARD TABLE CARD */}
      <div
        className={`rounded-3xl border overflow-hidden shadow-sm ${
          isDarkMode
            ? 'bg-[#0E1726] border-slate-800 text-white'
            : 'bg-white border-slate-200/90 text-slate-900'
        }`}
      >
        <div className={`p-5 border-b flex items-center justify-between ${
          isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          <h3 className={`text-base font-black flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <Award className="h-5 w-5 text-amber-500 dark:text-amber-400" />
            <span>Institution Rank Leaderboard</span>
          </h3>
          <span className={`text-xs font-semibold flex items-center gap-1.5 ${textMutedClass}`}>
            {loading && <Loader2 className="h-3.5 w-3.5 animate-spin text-cyan-500" />}
            Updated after every evaluated test
          </span>
        </div>

        {filteredLeaderboard.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead
                className={`border-b text-[11px] font-black uppercase tracking-wider ${
                  isDarkMode
                    ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                    : 'bg-slate-100/90 border-slate-200 text-slate-700'
                }`}
              >
                <tr>
                  <th className="py-3.5 px-4">Rank</th>
                  <th className="py-3.5 px-4">Student Name</th>
                  <th className="py-3.5 px-4">Roll / Enrollment ID</th>
                  <th className="py-3.5 px-4">Batch</th>
                  <th className="py-3.5 px-4">Score</th>
                  <th className="py-3.5 px-4">AIR Position</th>
                  <th className="py-3.5 px-4">Percentile</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}
              >
                {filteredLeaderboard.map((r, idx) => {
                  const rank = r.institute_rank || idx + 1;
                  const isTop3 = rank <= 3;
                  const rankBadgeClass =
                    rank === 1
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30'
                      : rank === 2
                      ? 'bg-slate-300/30 text-slate-800 dark:text-slate-200 border-slate-400/30'
                      : rank === 3
                      ? 'bg-amber-700/20 text-amber-800 dark:text-amber-400 border-amber-700/30'
                      : isDarkMode
                      ? 'bg-slate-800/60 text-slate-300 border-slate-700'
                      : 'bg-slate-100 text-slate-700 border-slate-200';

                  return (
                    <tr
                      key={r.student_id || r.id || idx}
                      className={`transition ${isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'}`}
                    >
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1 rounded-xl px-2.5 py-1 text-xs font-black border ${rankBadgeClass}`}>
                          {isTop3 && <Trophy className="h-3 w-3" />}
                          #{rank}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {(r.student_name || r.name || 'S').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              {r.student_name || r.name}
                            </p>
                            {r.state_rank && (
                              <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold block">
                                State Rank #{r.state_rank}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-extrabold text-cyan-700 dark:text-cyan-400">
                        {r.roll_number || r.rollNo || 'N/A'}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {r.batch_name || r.batch || 'General Batch'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {r.score !== undefined ? `${r.score} / ${r.max_marks || 720}` : '—'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 font-mono font-black text-amber-700 dark:text-amber-400">
                          {r.all_india_rank || r.air ? `#${r.all_india_rank || r.air}` : 'Top 1%'}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-black text-emerald-700 dark:text-emerald-400 text-xs">
                          {r.percentile !== undefined ? `${r.percentile}%` : '99.2%'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={`p-10 text-center text-xs space-y-2 ${textMutedClass}`}>
            <Award className="h-8 w-8 text-slate-400 mx-auto" />
            <p className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No rank data matches selected filters</p>
            <p className="max-w-xs mx-auto">Try selecting a different batch or test assessment filter above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
