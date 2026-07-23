import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, PageHeader, EmptyState } from '../../components/ui.jsx';

export default function Leaderboard() {
  const [assessments, setAssessments] = useState([]);
  const [assessmentId, setAssessmentId] = useState('');
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');

  const loadAssessments = useCallback(async () => {
    try {
      const list = await studentService.leaderboardAssessments();
      setAssessments(list);
      return list;
    } catch {
      return [];
    }
  }, []);

  const loadLeaderboard = useCallback(async (id) => {
    setState('loading');
    try {
      const params = id ? { assessment_id: id } : {};
      const result = await studentService.leaderboard(params);
      setData(result);
      if (result.assessment_id) {
        setAssessmentId(String(result.assessment_id));
      }
      setState('done');
    } catch {
      setState('error');
    }
  }, []);

  useEffect(() => {
    (async () => {
      await loadAssessments();
      await loadLeaderboard();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onAssessmentChange = (e) => {
    const id = e.target.value;
    setAssessmentId(id);
    loadLeaderboard(id || undefined);
  };

  if (state === 'loading' && !data) return <LoadingScreen />;
  if (state === 'error') return <ErrorState onRetry={() => loadLeaderboard(assessmentId || undefined)} />;

  const rows = data?.leaderboard || [];

  // Top 3 Podium Rankers
  const top1 = rows.find(r => r.rank === 1);
  const top2 = rows.find(r => r.rank === 2);
  const top3 = rows.find(r => r.rank === 3);

  return (
    <div className="space-y-6 pb-12">
      <PageHeader
        title="Leaderboard & All India Ranks"
        subtitle="Rankings for each test — scores are compared within the same assessment."
      />

      {/* Filter Selector & Current Student Rank Banner */}
      <div className="grid gap-4 sm:grid-cols-12 items-end">
        {assessments.length > 0 && (
          <div className="sm:col-span-6">
            <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-300 mb-1.5" htmlFor="lb-assessment">
              Select Mock Test Assessment
            </label>
            <select
              id="lb-assessment"
              className="w-full rounded-xl border border-slate-700/90 bg-[#070c18] px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 focus:border-[#2563eb] focus:bg-[#0a1224] focus:outline-none"
              value={assessmentId}
              onChange={onAssessmentChange}
            >
              {assessments.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.title} ({a.attempt_count} attempts)
                </option>
              ))}
            </select>
          </div>
        )}

        {data?.your_rank != null && (
          <div className="sm:col-span-6 rounded-2xl border border-blue-500/40 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-blue-600/20 p-3.5 text-xs font-bold text-blue-200 shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb] text-white font-extrabold text-sm shadow-md">
                #{data.your_rank}
              </span>
              <div>
                <p className="text-[10px] uppercase font-extrabold text-slate-400">Your Current Rank</p>
                <p className="text-sm font-extrabold text-white">
                  Rank #{data.your_rank} {data.your_percentage != null && <span className="text-cyan-300">({data.your_percentage}%)</span>}
                </p>
              </div>
            </div>
            <span className="rounded-full bg-cyan-400/20 px-3 py-1 text-[10px] font-extrabold text-cyan-300 border border-cyan-400/30">
              AIR Verified
            </span>
          </div>
        )}
      </div>

      {/* TOP 3 PODIUM VISUAL */}
      {rows.length > 0 && (top1 || top2 || top3) && (
        <div className="grid gap-4 sm:grid-cols-3 pt-2 items-end">
          {/* 2nd Place (Silver) */}
          {top2 ? (
            <div className="order-2 sm:order-1 rounded-3xl border border-slate-700/80 bg-gradient-to-b from-slate-800/80 to-[#0b1430] p-5 shadow-xl text-center space-y-2">
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-300 text-slate-950 font-black text-lg shadow-lg">
                <span>🥈</span>
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-[10px] font-extrabold text-white border border-slate-400">
                  #2
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm truncate">{top2.name}</h3>
                <p className="text-xs font-black text-slate-300 mt-0.5">{top2.percentage}% Score</p>
                <p className="text-[10.5px] font-semibold text-slate-400">{top2.marks_obtained} / {top2.total_marks} Marks</p>
              </div>
              <span className="inline-block rounded-full bg-slate-700/60 px-3 py-0.5 text-[10px] font-bold text-slate-300 border border-slate-600">
                Silver Medalist
              </span>
            </div>
          ) : <div className="hidden sm:block" />}

          {/* 1st Place (Gold - Featured Center Height) */}
          {top1 ? (
            <div className="order-1 sm:order-2 rounded-3xl border-2 border-amber-400/70 bg-gradient-to-b from-amber-500/20 via-[#0b1430] to-[#0b1430] p-6 shadow-2xl shadow-amber-500/10 text-center space-y-3 sm:-translate-y-2">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-amber-300 text-amber-950 font-black text-2xl shadow-xl shadow-amber-400/30">
                <span>🥇</span>
                <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-xs font-black text-amber-950 border-2 border-amber-300">
                  #1
                </span>
              </div>
              <div>
                <h3 className="font-black text-white text-base truncate">{top1.name}</h3>
                <p className="text-sm font-black text-amber-300 mt-0.5">{top1.percentage}% Score</p>
                <p className="text-xs font-extrabold text-slate-300">{top1.marks_obtained} / {top1.total_marks} Marks</p>
              </div>
              <span className="inline-block rounded-full bg-amber-400/20 px-3.5 py-1 text-[10.5px] font-black text-amber-300 border border-amber-400/40">
                🏆 Air #1 Gold Topper
              </span>
            </div>
          ) : <div className="hidden sm:block" />}

          {/* 3rd Place (Bronze) */}
          {top3 ? (
            <div className="order-3 rounded-3xl border border-amber-700/60 bg-gradient-to-b from-amber-900/30 to-[#0b1430] p-5 shadow-xl text-center space-y-2">
              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-700 text-amber-100 font-black text-lg shadow-lg">
                <span>🥉</span>
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-800 text-[10px] font-extrabold text-amber-200 border border-amber-600">
                  #3
                </span>
              </div>
              <div>
                <h3 className="font-extrabold text-white text-sm truncate">{top3.name}</h3>
                <p className="text-xs font-black text-amber-400 mt-0.5">{top3.percentage}% Score</p>
                <p className="text-[10.5px] font-semibold text-slate-400">{top3.marks_obtained} / {top3.total_marks} Marks</p>
              </div>
              <span className="inline-block rounded-full bg-amber-800/40 px-3 py-0.5 text-[10px] font-bold text-amber-300 border border-amber-700/50">
                Bronze Medalist
              </span>
            </div>
          ) : <div className="hidden sm:block" />}
        </div>
      )}

      {/* FULL RANKINGS DATA TABLE */}
      {rows.length === 0 ? (
        <div className="space-y-6">
          <EmptyState
            title="No All India Rankings Generated Yet"
            message="Be the first aspirant to complete a mock test for this assessment to secure Rank #1 on the All India Leaderboard!"
            action={
              <Link
                to="/my-tests"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] px-6 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-blue-500/25 transition hover:scale-105"
              >
                ⚡ Take a CBT Mock Test Now →
              </Link>
            }
          />

          <div className="rounded-3xl border border-slate-800/90 bg-[#0b1430] p-6 shadow-xl space-y-4">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
              <span>🏆</span> How EDVEDUM All India Ranks (AIR) Work
            </h3>
            <div className="grid gap-4 sm:grid-cols-3 text-xs">
              <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 space-y-1">
                <p className="font-extrabold text-cyan-300">1. Instant Score Comparison</p>
                <p className="text-slate-400 leading-relaxed">Ranks update dynamically after every student submission across India.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 space-y-1">
                <p className="font-extrabold text-emerald-300">2. NTA Negative Marking Tie-Breaker</p>
                <p className="text-slate-400 leading-relaxed">Higher accuracy & fewer incorrect answers rank higher in case of equal scores.</p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-[#070c18] p-4 space-y-1">
                <p className="font-extrabold text-amber-300">3. Verified Percentile Badge</p>
                <p className="text-slate-400 leading-relaxed">View your exact NTA percentile score compared to top performers nationwide.</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border border-slate-800/90 bg-[#0b1430] shadow-2xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">Full All India Student Standings</h2>
            <span className="text-xs font-semibold text-slate-400">{rows.length} Total Candidates</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-200">
              <thead className="border-b border-slate-800 bg-[#070e24] text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-5 py-3.5">Rank</th>
                  <th className="px-5 py-3.5">Student Name</th>
                  <th className="px-5 py-3.5">Marks Obtained</th>
                  <th className="px-5 py-3.5">Score %</th>
                  <th className="hidden px-5 py-3.5 sm:table-cell">Percentile</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {rows.map((r) => (
                  <tr
                    key={r.attempt_id}
                    className={`transition-colors ${
                      r.is_you
                        ? 'bg-gradient-to-r from-blue-600/30 via-indigo-600/20 to-blue-600/30 font-bold border-l-4 border-l-[#2563eb]'
                        : 'hover:bg-slate-800/50'
                    }`}
                  >
                    <td className="px-5 py-3.5 font-extrabold text-white">
                      {r.rank === 1 ? '🥇 #1' : r.rank === 2 ? '🥈 #2' : r.rank === 3 ? '🥉 #3' : `#${r.rank}`}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-extrabold text-white">{r.name}</span>
                      {r.is_you && (
                        <span className="ml-2.5 rounded-full bg-[#2563eb] px-2.5 py-0.5 text-[10px] font-black text-white shadow-xs">
                          (You)
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-slate-300 font-semibold">
                      {r.marks_obtained} / {r.total_marks}
                    </td>
                    <td className="px-5 py-3.5 font-extrabold text-cyan-300">{r.percentage}%</td>
                    <td className="hidden px-5 py-3.5 text-slate-400 sm:table-cell">
                      {r.percentile != null ? `${r.percentile}%` : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
