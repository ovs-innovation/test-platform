import React, { useEffect, useState } from 'react';
import { Trophy, Award, Building2, School, TrendingUp, Sparkles } from 'lucide-react';
import { studentReportService } from '../../lib/services.js';

export default function InstituteRankCard({ className = '' }) {
  const [rankData, setRankData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    studentReportService
      .getInstituteRank()
      .then((res) => {
        setRankData(res);
      })
      .catch(() => {
        setRankData({ isB2B: false, rankInfo: null });
      })
      .finally(() => setLoading(false));
  }, []);

  // VISIBILITY RULE: Strictly absent for non-B2B students or missing rank info
  if (loading || !rankData || !rankData.isB2B || !rankData.rankInfo) {
    return null; // Not hidden with empty state; completely unrendered
  }

  const { rank, totalStudents, batchRank, totalBatchStudents, avgScore, testsAttempted } = rankData.rankInfo;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-[#0B1528] via-[#0E1E38] to-[#122547] p-5 text-white shadow-xl backdrop-blur-md transition-all hover:border-indigo-500/50 ${className}`}
    >
      {/* Decorative Background Glows */}
      <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-cyan-500/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-indigo-500/10 blur-2xl" />

      <div className="relative z-10 space-y-4">
        {/* HEADER BADGE */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-amber-500/20 to-yellow-500/10 text-amber-400 border border-amber-500/30">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">Institutional Rank</p>
              <h3 className="text-sm font-extrabold text-white flex items-center gap-1.5">
                <span>Partner Institute Standings</span>
                <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
              </h3>
            </div>
          </div>

          <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-black text-amber-400 border border-amber-500/30">
            <Award className="h-3.5 w-3.5" />
            B2B Student
          </span>
        </div>

        {/* PRIMARY METRIC CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Institute Rank */}
          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
              <span className="flex items-center gap-1">
                <Building2 className="h-3.5 w-3.5 text-cyan-400" />
                Institute Rank
              </span>
              <span className="text-[10px] font-mono text-cyan-400">{totalStudents} Total</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              {testsAttempted > 0 ? (
                <>
                  <span className="text-2xl font-black text-amber-400 tracking-tight">#{rank}</span>
                  <span className="text-xs font-bold text-slate-400">/ {totalStudents}</span>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-slate-400 tracking-tight">Unranked</span>
                  <span className="text-[11px] text-amber-400/90 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">0 Tests Taken</span>
                </div>
              )}
            </div>
          </div>

          {/* Batch Rank (If Batch Assigned) */}
          {batchRank ? (
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <School className="h-3.5 w-3.5 text-purple-400" />
                  Batch Rank
                </span>
                <span className="text-[10px] font-mono text-purple-400">{totalBatchStudents} Batch</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                {testsAttempted > 0 ? (
                  <>
                    <span className="text-2xl font-black text-purple-400 tracking-tight">#{batchRank}</span>
                    <span className="text-xs font-bold text-slate-400">/ {totalBatchStudents}</span>
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black text-slate-400 tracking-tight">Unranked</span>
                    <span className="text-[11px] text-purple-400/90 font-bold bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">No Scores Yet</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  Average Accuracy
                </span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-emerald-400 tracking-tight">{avgScore}%</span>
                <span className="text-xs font-bold text-slate-400">Score</span>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER STATS SUMMARY */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/80 text-xs">
          <span className="text-slate-400 font-medium">
            Attempts counted: <strong className="text-white font-bold">{testsAttempted || 0} tests</strong>
          </span>
          <span className="text-emerald-400 font-bold text-[11px] flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
            Precomputed & Dynamic
          </span>
        </div>
      </div>
    </div>
  );
}
