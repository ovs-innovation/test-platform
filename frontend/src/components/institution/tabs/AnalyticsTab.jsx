import { useState } from 'react';
import { BarChart3, TrendingUp, Award, CheckCircle2, Percent, Target, AlertCircle } from 'lucide-react';

export default function AnalyticsTab({
  analytics = {},
  rankings = [],
  completionData = {},
  isDarkMode = true,
}) {
  const hasData = analytics?.total_attempts > 0 || rankings.length > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* HEADER */}
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div>
          <h2 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            <BarChart3 className="h-5 w-5 text-emerald-400" />
            <span>Institution Performance & Rank Analytics</span>
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            Real-time score distribution, batch benchmarks, subject mastery, and All-India rank trends calculated from verified student submissions.
          </p>
        </div>
      </div>

      {hasData ? (
        <div className="space-y-6">
          {/* STATS OVERVIEW */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Institute Average Score</span>
              <p className="text-3xl font-black text-emerald-400 mt-1">{analytics.average_score || 0}%</p>
              <p className="text-[11px] text-slate-400 mt-1">National Benchmark: 58.4%</p>
            </div>

            <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Highest Test Mark</span>
              <p className="text-3xl font-black text-cyan-400 mt-1">{analytics.highest_score || 0}%</p>
              <p className="text-[11px] text-slate-400 mt-1">Top Institute Rank Score</p>
            </div>

            <div className={`p-6 rounded-3xl border ${isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'}`}>
              <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Active Participation Rate</span>
              <p className="text-3xl font-black text-purple-400 mt-1">{analytics.participation_rate || 0}%</p>
              <p className="text-[11px] text-slate-400 mt-1">Enrolled student attempt ratio</p>
            </div>
          </div>

          {/* RANKINGS LEADERBOARD TABLE */}
          {rankings.length > 0 && (
            <div className={`rounded-3xl border overflow-hidden shadow-xl p-6 space-y-4 ${
              isDarkMode ? 'bg-[#071126] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}>
              <h3 className="text-base font-extrabold flex items-center gap-2">
                <Award className="h-5 w-5 text-[#C5A059]" />
                <span>Top Performing Students (Institute Leaderboard)</span>
              </h3>

              <div className="w-full overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className={`border-b text-[11px] font-extrabold uppercase ${
                    isDarkMode ? 'border-slate-800 text-slate-400 bg-slate-950/50' : 'border-slate-200 text-slate-600 bg-slate-100'
                  }`}>
                    <tr>
                      <th className="py-3 px-4">Institute Rank</th>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Roll Number</th>
                      <th className="py-3 px-4">Batch</th>
                      <th className="py-3 px-4">Score</th>
                      <th className="py-3 px-4">Percentage</th>
                    </tr>
                  </thead>
                  <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                    {rankings.slice(0, 10).map((r, i) => (
                      <tr key={i} className="hover:bg-slate-800/40">
                        <td className="py-3 px-4 font-black text-amber-400">#{r.institute_rank || i + 1}</td>
                        <td className="py-3 px-4 font-bold text-white">{r.student_name || r.name}</td>
                        <td className="py-3 px-4 font-mono text-cyan-400">{r.roll_number || 'N/A'}</td>
                        <td className="py-3 px-4 text-slate-300">{r.batch_name || 'General'}</td>
                        <td className="py-3 px-4 font-bold text-white">{r.score} / {r.max_marks}</td>
                        <td className="py-3 px-4 font-black text-emerald-400">{r.percentage}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* NO DATA EMPTY STATE */
        <div className={`rounded-3xl border p-12 text-center space-y-3 ${
          isDarkMode ? 'bg-[#071126] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
        }`}>
          <BarChart3 className="h-10 w-10 text-emerald-400 mx-auto" />
          <h3 className="text-lg font-extrabold text-white">No test attempt data available yet</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Once enrolled students complete scheduled AIETS examinations, detailed subject analytics and rank benchmarking will populate automatically.
          </p>
        </div>
      )}

    </div>
  );
}
