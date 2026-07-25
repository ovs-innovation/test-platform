import { useEffect, useState, useCallback, useMemo } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState, PageHeader } from '../../components/ui.jsx';
import { Trophy, Award, Search, Sparkles, ChevronDown } from 'lucide-react';

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
  }, []);

  const onAssessmentChange = (e) => {
    const id = e.target.value;
    setAssessmentId(id);
    setSearchQuery('');
    loadLeaderboard(id || undefined);
  };

  const rows = data?.leaderboard || [];

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    const q = searchQuery.toLowerCase().trim();
    return rows.filter((r) => r.name?.toLowerCase().includes(q));
  }, [rows, searchQuery]);

  const top1 = rows.find((r) => r.rank === 1);
  const top2 = rows.find((r) => r.rank === 2);
  const top3 = rows.find((r) => r.rank === 3);

  const totalTakers = rows.length;
  const highestMarks = rows.length > 0 ? Math.max(...rows.map((r) => r.marks_obtained || 0)) : 0;
  const averagePercentage =
    rows.length > 0
      ? Math.round(rows.reduce((acc, r) => acc + (Number(r.percentage) || 0), 0) / rows.length)
      : 0;

  const getAvatarInitials = (name) => {
    if (!name) return 'ST';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return name.slice(0, 2).toUpperCase();
  };

  const getAvatarGradient = (name) => {
    const gradients = [
      'from-blue-500 to-indigo-600',
      'from-emerald-500 to-teal-600',
      'from-purple-500 to-indigo-600',
      'from-amber-500 to-orange-600',
      'from-rose-500 to-pink-600',
    ];
    let hash = 0;
    for (let i = 0; i < (name || '').length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return gradients[Math.abs(hash) % gradients.length];
  };

  if (state === 'loading' && !data) return <LoadingScreen label="Loading rankings..." />;
  if (state === 'error') return <ErrorState onRetry={() => loadLeaderboard(assessmentId || undefined)} />;

  return (
    <div className="space-y-4 max-w-[1440px] mx-auto pb-12">
      <PageHeader
        title="Student Leaderboard"
        subtitle="Recognizing top academic performers. Standardized percentile rankings computed per test."
        actions={
          assessments.length > 0 && (
            <div className="relative w-full sm:w-72">
              <select
                id="lb-assessment"
                className="w-full rounded-xl border border-slate-200 bg-white py-2 px-3 pr-8 text-xs font-bold text-slate-900 shadow-2xs focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-[#111827] dark:text-white"
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
          )
        }
      />

      {/* 1. STATS BANNER - LIGHT MODE COMPATIBLE */}
      {rows.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <div className="saas-card p-3.5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Candidates</p>
            <p className="text-xl font-black text-slate-900 dark:text-white">{totalTakers}</p>
          </div>
          <div className="saas-card p-3.5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Highest Score</p>
            <p className="text-xl font-black text-amber-600 dark:text-amber-400">{highestMarks} pts</p>
          </div>
          <div className="saas-card p-3.5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg. Percentage</p>
            <p className="text-xl font-black text-emerald-600 dark:text-emerald-400">{averagePercentage}%</p>
          </div>
          <div className="saas-card p-3.5 bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-0.5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Your Rank</p>
            <p className="text-xl font-black text-blue-600 dark:text-blue-400">
              {data?.your_rank != null ? `#${data.your_rank}` : 'Unranked'}
            </p>
          </div>
        </div>
      )}

      {rows.length === 0 ? (
        <EmptyState
          title="No rankings available yet"
          message="Complete this test series or mock assessment to earn your spot on the leaderboard."
        />
      ) : (
        <>
          {/* 2. TOP 3 PODIUM SHOWCASE - SAAS LIGHT MATCHED */}
          <div className="grid gap-3 md:grid-cols-3 md:items-end">
            {/* Rank 2 - Silver */}
            {top2 ? (
              <div className="order-2 md:order-1 flex flex-col items-center">
                <div className="relative w-full rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-4 text-center shadow-2xs space-y-2">
                  <span className="inline-flex rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-0.5 text-[10.5px] font-extrabold text-slate-700 dark:text-slate-300">
                    🥈 RANK #2
                  </span>

                  <div className="flex justify-center pt-1">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(top2.name)} text-base font-extrabold text-white ring-2 ring-slate-300 shadow-xs`}>
                      {getAvatarInitials(top2.name)}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-xs truncate" title={top2.name}>
                    {top2.name} {top2.is_you && <span className="text-blue-600 font-bold">(You)</span>}
                  </h3>

                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{top2.marks_obtained}/{top2.total_marks} Marks</span>
                    <span className="font-bold text-slate-500">({top2.percentage}%)</span>
                  </div>

                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-400 rounded-full" style={{ width: `${top2.percentage}%` }} />
                  </div>
                </div>
              </div>
            ) : <div className="order-2 md:order-1" />}

            {/* Rank 1 - Champion Gold */}
            {top1 && (
              <div className="order-1 md:order-2 flex flex-col items-center">
                <div className="relative w-full rounded-xl border border-amber-300 dark:border-amber-700 bg-white dark:bg-[#111827] p-5 text-center shadow-md space-y-2.5">
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-3.5 py-0.5 text-xs font-black text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    👑 CHAMPION #1
                  </span>

                  <div className="flex justify-center pt-1">
                    <div className={`flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(top1.name)} text-xl font-black text-white ring-4 ring-amber-400 shadow-md`}>
                      {getAvatarInitials(top1.name)}
                    </div>
                  </div>

                  <h3 className="font-black text-slate-900 dark:text-white text-sm truncate" title={top1.name}>
                    {top1.name} {top1.is_you && <span className="text-blue-600 font-bold">(You)</span>}
                  </h3>

                  <div className="flex items-center justify-center gap-1.5 text-xs font-extrabold">
                    <span className="text-amber-600 dark:text-amber-400">{top1.marks_obtained}/{top1.total_marks} Marks</span>
                    <span className="text-slate-500">({top1.percentage}%)</span>
                  </div>

                  {top1.percentile != null && (
                    <p className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                      Top {100 - top1.percentile < 1 ? 1 : Math.round(100 - top1.percentile)}% · {top1.percentile}%ile
                    </p>
                  )}

                  <div className="h-1.5 w-full bg-amber-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full" style={{ width: `${top1.percentage}%` }} />
                  </div>
                </div>
              </div>
            )}

            {/* Rank 3 - Bronze */}
            {top3 ? (
              <div className="order-3 flex flex-col items-center">
                <div className="relative w-full rounded-xl border border-slate-200/90 dark:border-slate-800/90 bg-white dark:bg-[#111827] p-4 text-center shadow-2xs space-y-2">
                  <span className="inline-flex rounded-full bg-amber-700/10 px-3 py-0.5 text-[10.5px] font-extrabold text-amber-700 dark:text-amber-400">
                    🥉 RANK #3
                  </span>

                  <div className="flex justify-center pt-1">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(top3.name)} text-base font-extrabold text-white ring-2 ring-amber-700/50 shadow-xs`}>
                      {getAvatarInitials(top3.name)}
                    </div>
                  </div>

                  <h3 className="font-extrabold text-slate-900 dark:text-white text-xs truncate" title={top3.name}>
                    {top3.name} {top3.is_you && <span className="text-blue-600 font-bold">(You)</span>}
                  </h3>

                  <div className="flex items-center justify-center gap-1.5 text-xs">
                    <span className="font-extrabold text-slate-800 dark:text-slate-200">{top3.marks_obtained}/{top3.total_marks} Marks</span>
                    <span className="font-bold text-slate-500">({top3.percentage}%)</span>
                  </div>

                  <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-700 rounded-full" style={{ width: `${top3.percentage}%` }} />
                  </div>
                </div>
              </div>
            ) : <div className="order-3" />}
          </div>

          {/* 3. LEADERBOARD TABLE */}
          <div className="saas-card overflow-hidden bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">All Candidate Rankings</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Showing {filteredRows.length} rankers sorted by score
                </p>
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search student name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-blue-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-slate-100 bg-slate-50 text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500 dark:border-slate-800/60 dark:bg-slate-900/60 dark:text-slate-400">
                  <tr>
                    <th className="px-3 py-2.5 w-16">Rank</th>
                    <th className="px-3 py-2.5">Candidate Name</th>
                    <th className="px-3 py-2.5">Marks Obtained</th>
                    <th className="px-3 py-2.5">Percentage</th>
                    <th className="px-3 py-2.5">Percentile</th>
                    <th className="px-3 py-2.5 text-right">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                  {filteredRows.map((r) => (
                    <tr
                      key={r.attempt_id}
                      className={`transition-colors ${
                        r.is_you
                          ? 'bg-blue-50/80 dark:bg-blue-950/40 font-bold'
                          : 'hover:bg-slate-50/80 dark:hover:bg-slate-900/40'
                      }`}
                    >
                      <td className="px-3 py-2.5 font-black text-slate-900 dark:text-white">
                        #{r.rank}
                      </td>
                      <td className="px-3 py-2.5 font-bold text-slate-900 dark:text-white">
                        <div className="flex items-center gap-2">
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(r.name)} text-[10px] text-white font-bold`}>
                            {getAvatarInitials(r.name)}
                          </span>
                          <span>{r.name} {r.is_you && <span className="text-blue-600 font-extrabold text-[10px]">(You)</span>}</span>
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-slate-700 dark:text-slate-300 font-bold">
                        {r.marks_obtained} / {r.total_marks}
                      </td>
                      <td className="px-3 py-2.5 font-extrabold text-slate-900 dark:text-white">
                        {r.percentage}%
                      </td>
                      <td className="px-3 py-2.5 font-bold text-emerald-600 dark:text-emerald-400">
                        {r.percentile != null ? `${r.percentile}%ile` : '—'}
                      </td>
                      <td className="px-3 py-2.5 text-right text-slate-400 text-[10.5px]">
                        {r.submitted_at ? new Date(r.submitted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
