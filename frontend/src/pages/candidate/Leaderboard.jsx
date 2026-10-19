import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
import { Award, Search, ChevronDown, Check } from 'lucide-react';
import CompareWithTopper from '../../components/candidate/CompareWithTopper.jsx';

/**
 * Standard NEET Score Range to Predicted Rank Range Benchmark Matrix
 */
export const NEET_RANK_TIERS = [
  { minScore: 672, maxScore: 720, minRank: 1,      maxRank: 10,       rangeStr: '1–10' },
  { minScore: 650, maxScore: 671, minRank: 11,     maxRank: 100,      rangeStr: '11–100' },
  { minScore: 630, maxScore: 649, minRank: 101,    maxRank: 500,      rangeStr: '101–500' },
  { minScore: 616, maxScore: 629, minRank: 501,    maxRank: 1000,     rangeStr: '501–1,000' },
  { minScore: 571, maxScore: 615, minRank: 1001,   maxRank: 5000,     rangeStr: '1,001–5,000' },
  { minScore: 542, maxScore: 570, minRank: 5001,   maxRank: 10000,    rangeStr: '5,001–10,000' },
  { minScore: 528, maxScore: 541, minRank: 10001,  maxRank: 20000,    rangeStr: '10,001–20,000' },
  { minScore: 515, maxScore: 527, minRank: 20001,  maxRank: 30000,    rangeStr: '20,001–30,000' },
  { minScore: 496, maxScore: 514, minRank: 30001,  maxRank: 50000,    rangeStr: '30,001–50,000' },
  { minScore: 465, maxScore: 495, minRank: 50001,  maxRank: 100000,   rangeStr: '50,001–1,00,000' },
  { minScore: 424, maxScore: 464, minRank: 100001, maxRank: 200000,   rangeStr: '1,00,001–2,00,000' },
  { minScore: 0,   maxScore: 423, minRank: 200001, maxRank: 400000,   rangeStr: 'Above 2,00,000' },
];

/**
 * Calculates exact rank in between the rank range based on student marks
 */
export function getExactRankDetails(score, totalMarks = 720, fallbackExactRank = null) {
  if (score == null || isNaN(Number(score))) {
    return { exactRank: null, rangeStr: '—', display: '—' };
  }

  const numScore = totalMarks && Number(totalMarks) !== 720
    ? (Number(score) / Number(totalMarks)) * 720
    : Number(score);

  const tier = NEET_RANK_TIERS.find((t) => numScore >= t.minScore) || NEET_RANK_TIERS[NEET_RANK_TIERS.length - 1];

  let exactRank = fallbackExactRank;
  if (!exactRank) {
    if (tier.minScore === 0) {
      const deficit = Math.max(0, 423 - numScore);
      exactRank = Math.min(tier.maxRank, 200000 + Math.round(deficit * 470) + 1);
    } else {
      const spanScore = tier.maxScore - tier.minScore;
      const spanRank = tier.maxRank - tier.minRank;
      const fractionFromTop = spanScore > 0 ? (tier.maxScore - numScore) / spanScore : 0;
      exactRank = tier.minRank + Math.round(fractionFromTop * spanRank);
    }
  }

  return {
    exactRank,
    rangeStr: tier.rangeStr,
    display: `#${exactRank.toLocaleString()}`
  };
}

function CustomAssessmentDropdown({ assessments, value, onChange }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  const selectedAssessment = useMemo(() => {
    return assessments.find((a) => String(a.id) === String(value)) || assessments[0];
  }, [assessments, value]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAssessments = useMemo(() => {
    if (!search.trim()) return assessments;
    const q = search.toLowerCase().trim();
    return assessments.filter((a) => a.title?.toLowerCase().includes(q));
  }, [assessments, search]);

  return (
    <div className="relative w-full sm:w-80" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] py-2.5 px-3.5 text-xs font-bold text-slate-900 dark:text-white shadow-2xs hover:border-blue-500/80 hover:shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/20"
      >
        <div className="flex items-center gap-2 min-w-0 text-left">
          <Award className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
          <span className="truncate font-extrabold text-xs text-slate-800 dark:text-slate-100">
            {selectedAssessment ? selectedAssessment.title : 'Select Assessment'}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {selectedAssessment && (
            <span className="hidden min-[420px]:inline-flex px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-[10px] font-extrabold border border-blue-200 dark:border-blue-800/60">
              {selectedAssessment.attempt_count} attempts
            </span>
          )}
          <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-blue-600' : ''}`} />
        </div>
      </button>

      {/* Popover Menu Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-full min-w-[300px] sm:w-[380px] z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-2xl p-2 space-y-1.5 animate-in fade-in zoom-in-95 duration-150">
          {assessments.length > 4 && (
            <div className="relative p-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search assessment..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-1.5 pl-8 pr-3 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              />
            </div>
          )}

          <div className="max-h-64 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {filteredAssessments.length > 0 ? (
              filteredAssessments.map((a) => {
                const isSelected = String(a.id) === String(value);
                return (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => {
                      onChange(a.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-center justify-between gap-3 p-2.5 rounded-xl text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50/90 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 font-extrabold shadow-2xs'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold'
                    }`}
                  >
                    <div className="min-w-0 flex-1 space-y-0.5">
                      <p className="text-xs leading-snug truncate">{a.title}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {a.attempt_count} attempts
                      </span>
                      {isSelected && <Check className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">No matching assessments</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

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

  const loadLeaderboard = useCallback(async (id, force = false) => {
    setState('loading');
    try {
      const params = id ? { assessment_id: id } : {};
      const result = await studentService.leaderboard(params, force);
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

  const handleAssessmentChange = (id) => {
    setAssessmentId(String(id));
    setSearchQuery('');
    loadLeaderboard(id || undefined, true);
  };

  const rows = data?.leaderboard || [];

  const filteredRows = useMemo(() => {
    if (!searchQuery.trim()) return rows;
    const q = searchQuery.toLowerCase().trim();
    return rows.filter((r) => r.name?.toLowerCase().includes(q));
  }, [rows, searchQuery]);

  const highestMarks = rows.length > 0 ? Math.max(...rows.map((r) => Number(r.marks_obtained) || 0)) : 0;
  const averagePercentage =
    rows.length > 0
      ? Math.round(rows.reduce((acc, r) => acc + (Number(r.percentage) || 0), 0) / rows.length)
      : 0;

  const yourRow = useMemo(() => rows.find((r) => r.is_you), [rows]);
  const yourRankDetails = useMemo(() => {
    if (!yourRow) return null;
    return getExactRankDetails(yourRow.marks_obtained, yourRow.total_marks, yourRow.exact_rank);
  }, [yourRow]);

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
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Student Leaderboard</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Recognizing top academic performers. Percentile rankings computed per assessment.
          </p>
        </div>

        {assessments.length > 0 && (
          <CustomAssessmentDropdown
            assessments={assessments}
            value={assessmentId}
            onChange={handleAssessmentChange}
          />
        )}
      </div>

      {/* 1. STATS BANNER (Total Candidates removed per user request) */}
      {rows.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Highest Score</p>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400">{highestMarks} pts</p>
          </div>
          <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avg Percentage</p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">{averagePercentage}%</p>
          </div>
          <div className="p-4 bg-white dark:bg-[#0F172A] border border-slate-200/90 dark:border-slate-800 rounded-2xl space-y-1 shadow-xs">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Your Rank</p>
            {yourRankDetails?.exactRank != null ? (
              <div className="flex items-baseline gap-2 flex-wrap">
                <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  #{yourRankDetails.exactRank.toLocaleString()}
                </p>
                <span className="text-xs font-bold text-slate-400">
                  ({yourRankDetails.rangeStr})
                </span>
              </div>
            ) : (
              <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                Unranked
              </p>
            )}
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
          {/* 2. ALL CANDIDATE RANKINGS TABLE WITH EXACT RANK IN BETWEEN THE RANK */}
          <div className="saas-card overflow-hidden bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">All Candidate Rankings</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Showing {filteredRows.length} rankers sorted by score with exact ranks mapped to score ranges
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
                    <th className="px-3 py-2.5 w-40">Rank</th>
                    <th className="px-3 py-2.5">Candidate Name</th>
                    <th className="px-3 py-2.5">Marks Obtained</th>
                    <th className="px-3 py-2.5">Percentage</th>
                    <th className="px-3 py-2.5">Percentile</th>
                    <th className="px-3 py-2.5 text-right">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/40">
                  {filteredRows.map((r) => {
                    const rankInfo = getExactRankDetails(r.marks_obtained, r.total_marks, r.exact_rank);
                    return (
                      <tr
                        key={r.attempt_id}
                        className={`transition-colors ${
                          r.is_you
                            ? 'bg-blue-50/80 dark:bg-blue-950/40 font-bold'
                            : 'hover:bg-slate-50/80 dark:hover:bg-slate-900/40'
                        }`}
                      >
                        <td className="px-3 py-2.5 font-bold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-black text-xs text-slate-900 dark:text-white">
                              #{rankInfo.exactRank ? rankInfo.exactRank.toLocaleString() : (r.rank || '—')}
                            </span>
                            {rankInfo.rangeStr && rankInfo.rangeStr !== '—' && (
                              <span className="text-[10.5px] font-semibold text-slate-400 dark:text-slate-500">
                                ({rankInfo.rangeStr})
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-3 py-2.5 font-bold text-slate-900 dark:text-white">
                          <div className="flex items-center gap-2">
                            <span className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${getAvatarGradient(r.name)} text-[10px] text-white font-bold shrink-0`}>
                              {getAvatarInitials(r.name)}
                            </span>
                            <span className="truncate">
                              {r.name} {r.is_you && <span className="text-blue-600 font-extrabold text-[10px]">(You)</span>}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-slate-700 dark:text-slate-300 font-bold">
                          {Number(r.marks_obtained).toFixed(2)} / {Number(r.total_marks || 720).toFixed(2)}
                        </td>
                        <td className="px-3 py-2.5 font-extrabold text-slate-900 dark:text-white">
                          {Number(r.percentage).toFixed(2)}%
                        </td>
                        <td className="px-3 py-2.5 font-bold text-emerald-600 dark:text-emerald-400">
                          {r.percentile != null ? `${Number(r.percentile).toFixed(2)}%ile` : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-right text-slate-400 text-[10.5px]">
                          {r.submitted_at ? new Date(r.submitted_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 3. COMPARE WITH TOPPER FEATURE */}
          {(data?.topper_comparison || data?.topperComparison) && (
            <div className="pt-2">
              <CompareWithTopper
                data={data?.topper_comparison || data?.topperComparison}
                studentStats={data?.student_stats}
                hasStudentAttempt={data?.your_rank != null || Boolean(data?.has_student_attempt) || Boolean(data?.topper_comparison?.has_student_attempt)}
                assessmentId={assessmentId}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
