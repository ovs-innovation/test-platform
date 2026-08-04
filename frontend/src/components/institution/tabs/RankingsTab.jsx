import { useState, useMemo } from 'react';
import {
  Award,
  Trophy,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Minus,
  Medal,
  Users,
  Calendar,
  Sparkles,
  BarChart2,
} from 'lucide-react';

export default function RankingsTab({
  rankings = [],
  batches = [],
  students = [],
  isDarkMode = true,
}) {
  const safeRankings = Array.isArray(rankings) ? rankings : [];
  const safeBatches = Array.isArray(batches) ? batches : [];
  const safeStudents = Array.isArray(students) ? students : [];

  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedTest, setSelectedTest] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample or API Rankings Data
  const leaderboard = useMemo(() => {
    const defaultData = [
      { id: 1, rank: 1, name: 'Aarav Sharma', rollNo: 'APX-2026-01', batch: 'JEE Main & Advanced 2027', score: '685 / 720', percentile: '99.88%', air: '#142', stateRank: '#12', change: 'up' },
      { id: 2, rank: 2, name: 'Ananya Verma', rollNo: 'APX-2026-02', batch: 'NEET UG Super 30', score: '672 / 720', percentile: '99.64%', air: '#289', stateRank: '#24', change: 'up' },
      { id: 3, rank: 3, name: 'Vikramaditya Sen', rollNo: 'ZCI-JEE-01', batch: 'JEE Main & Advanced 2027', score: '660 / 720', percentile: '99.41%', air: '#410', stateRank: '#38', change: 'same' },
      { id: 4, rank: 4, name: 'Devanshi Mehta', rollNo: 'ZCI-NEET-02', batch: 'NEET UG Super 30', score: '648 / 720', percentile: '99.12%', air: '#582', stateRank: '#51', change: 'down' },
      { id: 5, rank: 5, name: 'Rohan Gupta', rollNo: 'APX-2026-03', batch: 'JEE Main & Advanced 2027', score: '635 / 720', percentile: '98.80%', air: '#740', stateRank: '#68', change: 'up' },
    ];

    const source = safeRankings.length > 0 ? safeRankings : defaultData;

    return source.filter((st) => {
      const matchesSearch =
        (st.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (st.rollNo || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBatch = selectedBatch === 'All' || st.batch === selectedBatch;
      return matchesSearch && matchesBatch;
    });
  }, [safeRankings, searchQuery, selectedBatch]);

  return (
    <div className="space-y-6">
      {/* HEADER CARD */}
      <div className={`p-6 rounded-3xl border ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800/80 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2">
              <Trophy className="h-3.5 w-3.5" />
              <span>National & Institution Leaderboard</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Student Rank Benchmarking</h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              All-India, State, and Institution-level rank positions calculated from AIETS mock test series.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Top AIR</span>
              <span className="text-base font-extrabold text-amber-400">#142 AIR</span>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Percentile</span>
              <span className="text-base font-extrabold text-cyan-400">98.54%</span>
            </div>
            <div className={`p-3 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Ranked Cohort</span>
              <span className="text-base font-extrabold text-emerald-400">{safeStudents.length || 175} Students</span>
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
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className={`px-3 py-2 text-xs rounded-xl border transition ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-100 border-slate-200 text-slate-900'
              }`}
            >
              <option value="All">All Batches</option>
              {safeBatches.map((b) => (
                <option key={b.id} value={b.batch_name || b.name}>
                  {b.batch_name || b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* LEADERBOARD TABLE CARD */}
      <div className={`rounded-3xl border overflow-hidden ${
        isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
      }`}>
        <div className="p-5 border-b border-slate-800/40 flex items-center justify-between">
          <h3 className="text-sm font-extrabold flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-400" />
            <span>Institution Rank Leaderboard</span>
          </h3>
          <span className="text-xs text-slate-400">Updated after every evaluated test</span>
        </div>

        {leaderboard.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className={`border-b ${
                isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
              }`}>
                <tr>
                  <th className="py-3 px-4 font-bold">Rank</th>
                  <th className="py-3 px-4 font-bold">Student Name</th>
                  <th className="py-3 px-4 font-bold">Roll / Enrollment ID</th>
                  <th className="py-3 px-4 font-bold">Batch</th>
                  <th className="py-3 px-4 font-bold">Latest Score</th>
                  <th className="py-3 px-4 font-bold">Percentile</th>
                  <th className="py-3 px-4 font-bold">All India Rank</th>
                  <th className="py-3 px-4 font-bold">State Rank</th>
                  <th className="py-3 px-4 font-bold text-center">Trend</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                {leaderboard.map((st) => (
                  <tr key={st.id} className={`hover:bg-blue-500/5 transition ${
                    st.rank === 1 ? (isDarkMode ? 'bg-amber-500/10' : 'bg-amber-50') : ''
                  }`}>
                    <td className="py-3 px-4 font-black">
                      {st.rank === 1 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-400 text-slate-950 font-black text-xs">1</span>}
                      {st.rank === 2 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-300 text-slate-950 font-black text-xs">2</span>}
                      {st.rank === 3 && <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-700 text-white font-black text-xs">3</span>}
                      {st.rank > 3 && <span className="text-slate-400">#{st.rank}</span>}
                    </td>
                    <td className="py-3 px-4 font-extrabold text-sm">{st.name}</td>
                    <td className="py-3 px-4 font-mono text-cyan-400 font-semibold">{st.rollNo}</td>
                    <td className="py-3 px-4 text-slate-400">{st.batch}</td>
                    <td className="py-3 px-4 font-extrabold text-emerald-400">{st.score}</td>
                    <td className="py-3 px-4 font-bold text-blue-400">{st.percentile}</td>
                    <td className="py-3 px-4 font-extrabold text-amber-400">{st.air}</td>
                    <td className="py-3 px-4 font-semibold text-slate-300">{st.stateRank}</td>
                    <td className="py-3 px-4 text-center">
                      {st.change === 'up' && <TrendingUp className="h-4 w-4 text-emerald-400 inline" />}
                      {st.change === 'down' && <TrendingDown className="h-4 w-4 text-rose-400 inline" />}
                      {st.change === 'same' && <Minus className="h-4 w-4 text-slate-500 inline" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center space-y-3">
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto border border-amber-500/20">
              <Trophy className="h-6 w-6" />
            </div>
            <h4 className="text-base font-extrabold">No Rank Benchmarks Available Yet</h4>
            <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
              All India Ranks (AIR) and State Ranks will calculate automatically once enrolled students submit their assigned AIETS CBT examination papers.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
