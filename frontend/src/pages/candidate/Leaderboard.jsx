import { useEffect, useState, useCallback, useMemo } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';

export default function Leaderboard() {
  const [assessments, setAssessments] = useState([]);
  const [assessmentId, setAssessmentId] = useState('');
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [searchQuery, setSearchQuery] = useState('');

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
    setSearchQuery('');
    loadLeaderboard(id || undefined);
  };

  const rows = data?.leaderboard || [];

  // Filtered rows for live student name search
  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    const q = searchQuery.toLowerCase().trim();
    return rows.filter((r) => r.name?.toLowerCase().includes(q));
  }, [rows, searchQuery]);

  // Extract Top 3 for the Podium
  const top1 = rows.find((r) => r.rank === 1);
  const top2 = rows.find((r) => r.rank === 2);
  const top3 = rows.find((r) => r.rank === 3);

  // Statistics calculation
  const totalTakers = rows.length;
  const highestMarks = rows.length > 0 ? Math.max(...rows.map((r) => r.marks_obtained || 0)) : 0;
  const averagePercentage =
    rows.length > 0
      ? Math.round(rows.reduce((acc, r) => acc + (Number(r.percentage) || 0), 0) / rows.length)
      : 0;

  // Avatar helper
  const getAvatarInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarGradient = (name) => {
    const gradients = [
      'from-violet-500 to-purple-600',
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-teal-600',
      'from-rose-500 to-pink-600',
      'from-amber-500 to-orange-600',
      'from-cyan-500 to-blue-600',
    ];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  };

  if (state === 'loading' && !data) return <LoadingScreen />;
  if (state === 'error') return <ErrorState onRetry={() => loadLeaderboard(assessmentId || undefined)} />;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-900 via-indigo-900 to-slate-900 p-6 text-white shadow-xl dark:from-slate-900 dark:via-brand-950 dark:to-slate-950">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-10 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3 py-1 text-xs font-semibold text-amber-300 backdrop-blur-md border border-amber-400/30">
              <span>🏆 EdTech Hall of Fame</span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">Student Leaderboard</h1>
            <p className="max-w-xl text-sm text-slate-300">
              Recognizing top academic performers. Standardized percentile rankings computed within each test assessment.
            </p>
          </div>

          {/* Test Selector in Banner */}
          {assessments.length > 0 && (
            <div className="w-full md:w-72 shrink-0 space-y-1.5">
              <label htmlFor="lb-assessment" className="text-xs font-medium text-slate-300">
                Select Test Assessment
              </label>
              <div className="relative">
                <select
                  id="lb-assessment"
                  className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 text-sm font-medium text-white shadow-inner backdrop-blur-md transition-all focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 dark:bg-slate-800/80"
                  value={assessmentId}
                  onChange={onAssessmentChange}
                >
                  {assessments.map((a) => (
                    <option key={a.id} value={a.id} className="text-slate-900 dark:bg-slate-900 dark:text-white">
                      {a.title} ({a.attempt_count} attempts)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Quick Test Stats Bar */}
        {rows.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-4 sm:grid-cols-4">
            <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm border border-white/5">
              <p className="text-xs font-medium text-slate-400">Total Candidates</p>
              <p className="mt-1 text-lg font-bold text-white">{totalTakers}</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm border border-white/5">
              <p className="text-xs font-medium text-slate-400">Top Marks</p>
              <p className="mt-1 text-lg font-bold text-amber-300">{highestMarks} pts</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm border border-white/5">
              <p className="text-xs font-medium text-slate-400">Avg. Percentage</p>
              <p className="mt-1 text-lg font-bold text-emerald-300">{averagePercentage}%</p>
            </div>
            <div className="rounded-xl bg-white/5 p-3 backdrop-blur-sm border border-white/5">
              <p className="text-xs font-medium text-slate-400">Your Rank</p>
              <p className="mt-1 text-lg font-bold text-brand-300">
                {data?.your_rank != null ? `#${data.your_rank}` : 'Unranked'}
              </p>
            </div>
          </div>
        )}
      </div>

      {rows.length === 0 ? (
        <EmptyState
          title="No rankings available yet"
          message="Complete this test series or mock assessment to earn your spot on the leaderboard."
        />
      ) : (
        <>
          {/* Top 3 Podium Showcase */}
          <div className="grid gap-4 md:grid-cols-3 md:items-end">
            {/* Rank 2 - Silver (Left Podium) */}
            {top2 ? (
              <div className="order-2 md:order-1 flex flex-col items-center">
                <div className="relative w-full rounded-2xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-5 text-center shadow-md transition-all hover:shadow-lg dark:border-slate-800 dark:from-slate-900/90 dark:to-slate-950">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-slate-300 to-slate-400 px-3 py-0.5 text-xs font-bold text-slate-900 shadow">
                    🥈 RANK #2
                  </div>

                  <div className="mt-2 flex justify-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(top2.name)} text-lg font-bold text-white ring-4 ring-slate-300 shadow-md`}>
                      {getAvatarInitials(top2.name)}
                    </div>
                  </div>

                  <h3 className="mt-3 font-bold text-slate-900 dark:text-white truncate" title={top2.name}>
                    {top2.name} {top2.is_you && <span className="text-xs text-brand-600 font-normal">(You)</span>}
                  </h3>

                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {top2.marks_obtained} / {top2.total_marks} marks
                    </span>
                    <span className="rounded-lg bg-slate-200/60 px-2 py-1 text-xs font-semibold text-slate-800 dark:bg-slate-700 dark:text-slate-200">
                      {top2.percentage}%
                    </span>
                  </div>

                  {top2.percentile != null && (
                    <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {top2.percentile}% Percentile
                    </p>
                  )}

                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: `${top2.percentage}%` }} />
                  </div>
                </div>
              </div>
            ) : <div className="order-2 md:order-1" />}

            {/* Rank 1 - Champion Gold (Center Podium - Elevated) */}
            {top1 && (
              <div className="order-1 md:order-2 flex flex-col items-center">
                <div className="relative w-full rounded-2xl border-2 border-amber-400/60 bg-gradient-to-b from-amber-500/10 via-yellow-500/5 to-white p-6 text-center shadow-xl transition-all hover:shadow-amber-500/20 dark:from-amber-950/40 dark:via-slate-900 dark:to-slate-950">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 px-4 py-1 text-xs font-extrabold text-amber-950 shadow-lg animate-bounce">
                    👑 CHAMPION #1
                  </div>

                  <div className="mt-3 flex justify-center">
                    <div className={`relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(top1.name)} text-2xl font-black text-white ring-4 ring-amber-400 ring-offset-2 ring-offset-white dark:ring-offset-slate-900 shadow-xl`}>
                      {getAvatarInitials(top1.name)}
                      <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-amber-400 text-xs">
                        🥇
                      </span>
                    </div>
                  </div>

                  <h3 className="mt-4 text-lg font-extrabold text-slate-900 dark:text-white truncate" title={top1.name}>
                    {top1.name} {top1.is_you && <span className="text-xs text-brand-600 font-normal">(You)</span>}
                  </h3>

                  <div className="mt-3 flex items-center justify-center gap-2">
                    <span className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-black text-amber-900 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                      {top1.marks_obtained} / {top1.total_marks} marks
                    </span>
                    <span className="rounded-lg bg-amber-500 px-2.5 py-1.5 text-xs font-bold text-slate-950">
                      {top1.percentage}%
                    </span>
                  </div>

                  {top1.percentile != null && (
                    <p className="mt-2.5 text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wide">
                      Top {100 - top1.percentile < 1 ? 1 : Math.round(100 - top1.percentile)}% · {top1.percentile}% Percentile
                    </p>
                  )}

                  <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-amber-100 dark:bg-slate-800">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full" style={{ width: `${top1.percentage}%` }} />
                  </div>
                </div>
              </div>
            )}

            {/* Rank 3 - Bronze (Right Podium) */}
            {top3 ? (
              <div className="order-3 flex flex-col items-center">
                <div className="relative w-full rounded-2xl border border-amber-700/30 bg-gradient-to-b from-amber-50/50 to-white p-5 text-center shadow-md transition-all hover:shadow-lg dark:border-amber-900/30 dark:from-slate-900/90 dark:to-slate-950">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-amber-700 to-orange-700 px-3 py-0.5 text-xs font-bold text-white shadow">
                    🥉 RANK #3
                  </div>

                  <div className="mt-2 flex justify-center">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(top3.name)} text-lg font-bold text-white ring-4 ring-amber-700/60 shadow-md`}>
                      {getAvatarInitials(top3.name)}
                    </div>
                  </div>

                  <h3 className="mt-3 font-bold text-slate-900 dark:text-white truncate" title={top3.name}>
                    {top3.name} {top3.is_you && <span className="text-xs text-brand-600 font-normal">(You)</span>}
                  </h3>

                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="rounded-lg bg-amber-100/60 px-2.5 py-1 text-xs font-bold text-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
                      {top3.marks_obtained} / {top3.total_marks} marks
                    </span>
                    <span className="rounded-lg bg-amber-200/70 px-2 py-1 text-xs font-semibold text-amber-900 dark:bg-amber-900/60 dark:text-amber-200">
                      {top3.percentage}%
                    </span>
                  </div>

                  {top3.percentile != null && (
                    <p className="mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                      {top3.percentile}% Percentile
                    </p>
                  )}

                  <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div className="h-full bg-amber-700 rounded-full" style={{ width: `${top3.percentage}%` }} />
                  </div>
                </div>
              </div>
            ) : <div className="order-3" />}
          </div>

          {/* Student's Personal Highlight Banner */}
          {data?.your_rank != null && (
            <div className="relative overflow-hidden rounded-2xl border-2 border-brand-500/40 bg-gradient-to-r from-brand-50 via-indigo-50/50 to-purple-50 p-5 shadow-sm dark:border-brand-500/30 dark:from-brand-950/40 dark:via-indigo-950/30 dark:to-purple-950/20">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-lg font-black text-white shadow-md">
                    #{data.your_rank}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white">Your Ranking Summary</h4>
                      <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                        Active Result
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      {data.assessment_title ? `Assessed on ${data.assessment_title}` : 'Your score on this test'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 border-t border-slate-200/60 pt-3 sm:border-t-0 sm:pt-0 dark:border-slate-800">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-slate-500 dark:text-slate-400">Score & Accuracy</p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {data.your_percentage}% <span className="text-xs font-normal text-slate-500">Score</span>
                    </p>
                  </div>
                  {rows.find((r) => r.is_you)?.percentile != null && (
                    <div className="text-left sm:text-right">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Percentile Rank</p>
                      <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {rows.find((r) => r.is_you)?.percentile}%ile
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Full Leaderboard Table Section */}
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">All Rankers</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Showing {filteredRows.length} candidates sorted by highest score
                </p>
              </div>

              {/* Live Search Input */}
              <div className="relative w-full sm:w-64">
                <svg
                  className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search student name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-4 py-2 text-xs text-slate-900 shadow-sm transition-all focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            {filteredRows.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  No students found matching "{searchQuery}"
                </p>
              </div>
            ) : (
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-200 bg-slate-50 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                      <tr>
                        <th className="px-5 py-3.5 w-20">Rank</th>
                        <th className="px-5 py-3.5">Candidate Name</th>
                        <th className="px-5 py-3.5">Marks Obtained</th>
                        <th className="px-5 py-3.5">Percentage</th>
                        <th className="px-5 py-3.5 hidden sm:table-cell">Percentile</th>
                        <th className="px-5 py-3.5 hidden md:table-cell text-right">Submitted</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60">
                      {filteredRows.map((r) => {
                        const isTop3 = r.rank <= 3;
                        return (
                          <tr
                            key={r.attempt_id}
                            className={`transition-colors ${
                              r.is_you
                                ? 'bg-brand-50/70 border-l-4 border-l-brand-600 dark:bg-brand-950/40 dark:border-l-brand-500 font-medium'
                                : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            {/* Rank Badge */}
                            <td className="px-5 py-4 whitespace-nowrap">
                              {r.rank === 1 && (
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                                  🥇 1
                                </span>
                              )}
                              {r.rank === 2 && (
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                                  🥈 2
                                </span>
                              )}
                              {r.rank === 3 && (
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-800/20 text-sm font-bold text-amber-900 dark:bg-amber-950 dark:text-amber-400">
                                  🥉 3
                                </span>
                              )}
                              {r.rank > 3 && (
                                <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                  #{r.rank}
                                </span>
                              )}
                            </td>

                            {/* Candidate Profile */}
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(r.name)} text-xs font-bold text-white shadow-xs`}>
                                  {getAvatarInitials(r.name)}
                                </div>
                                <div>
                                  <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                                    {r.name}
                                    {r.is_you && (
                                      <span className="rounded bg-brand-100 px-1.5 py-0.5 text-[10px] font-bold text-brand-700 dark:bg-brand-900/60 dark:text-brand-300">
                                        YOU
                                      </span>
                                    )}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Marks */}
                            <td className="px-5 py-4 whitespace-nowrap text-slate-700 dark:text-slate-300">
                              <span className="font-semibold">{r.marks_obtained}</span>
                              <span className="text-xs text-slate-400 dark:text-slate-500"> / {r.total_marks} pts</span>
                            </td>

                            {/* Score Progress & Percentage */}
                            <td className="px-5 py-4 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <span className="font-bold text-slate-900 dark:text-white w-12">{r.percentage}%</span>
                                <div className="h-2 w-24 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800 hidden sm:block">
                                  <div
                                    className={`h-full rounded-full ${
                                      isTop3
                                        ? 'bg-amber-500'
                                        : Number(r.percentage) >= 75
                                        ? 'bg-emerald-500'
                                        : 'bg-brand-500'
                                    }`}
                                    style={{ width: `${r.percentage}%` }}
                                  />
                                </div>
                              </div>
                            </td>

                            {/* Percentile */}
                            <td className="px-5 py-4 whitespace-nowrap hidden sm:table-cell">
                              {r.percentile != null ? (
                                <span className="inline-flex items-center rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                                  {r.percentile}%ile
                                </span>
                              ) : (
                                <span className="text-xs text-slate-400">—</span>
                              )}
                            </td>

                            {/* Submitted At */}
                            <td className="px-5 py-4 whitespace-nowrap hidden md:table-cell text-right text-xs text-slate-500 dark:text-slate-400">
                              {r.submitted_at ? new Date(r.submitted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
