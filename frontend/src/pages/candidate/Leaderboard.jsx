import { useEffect, useState, useCallback, useMemo, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { studentService } from '../../lib/services.js';
import { LoadingScreen, ErrorState } from '../../components/ui.jsx';
import { Award, Search, ChevronDown, Check, Zap } from 'lucide-react';
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

/**
 * Single clean Assessment / Test Selector Dropdown
 */
function CustomAssessmentDropdown({ assessments, value, onChange, isBooster = false }) {
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
    return assessments.filter((a) => {
      const titleMatch = a.title?.toLowerCase().includes(q);
      const seriesMatch = a.series_title?.toLowerCase().includes(q);
      return titleMatch || seriesMatch;
    });
  }, [assessments, search]);

  return (
    <div className="relative w-full sm:w-80 md:w-96" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between gap-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] py-2.5 px-3.5 text-xs font-bold text-slate-900 dark:text-white shadow-2xs ${
          isBooster
            ? 'hover:border-amber-500/80 focus:ring-amber-500/20'
            : 'hover:border-blue-500/80 focus:ring-blue-500/20'
        } hover:shadow-sm transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2`}
      >
        <div className="flex items-center gap-2 min-w-0 text-left">
          {isBooster ? (
            <Zap className="h-4 w-4 text-amber-500 fill-current shrink-0" />
          ) : (
            <Award className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
          )}
          <span className="truncate font-extrabold text-xs text-slate-800 dark:text-slate-100">
            {selectedAssessment
              ? selectedAssessment.title
              : (isBooster ? 'Select Battleground Test' : 'Select Assessment')}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {selectedAssessment && (
            <span
              className={`hidden min-[420px]:inline-flex px-2 py-0.5 rounded-full text-[10px] font-extrabold border ${
                isBooster
                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800/60'
                  : 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800/60'
              }`}
            >
              {selectedAssessment.attempt_count} attempts
            </span>
          )}
          <ChevronDown
            className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
              open ? 'rotate-180 ' + (isBooster ? 'text-amber-500' : 'text-blue-600') : ''
            }`}
          />
        </div>
      </button>

      {/* Popover Menu Dropdown */}
      {open && (
        <div className="absolute right-0 top-full mt-2 w-full min-w-[300px] sm:w-[420px] z-50 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] shadow-2xl p-2 space-y-1.5 animate-in fade-in zoom-in-95 duration-150">
          {assessments.length > 3 && (
            <div className="relative p-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={isBooster ? "Search battleground test..." : "Search test or test-series name..."}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 py-2 pl-9 pr-3 text-xs font-semibold text-slate-800 dark:text-slate-100 focus:outline-none focus:border-amber-500"
              />
            </div>
          )}

          <div className="max-h-72 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
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
                    className={`w-full flex items-start justify-between gap-3 p-2.5 rounded-xl text-left transition cursor-pointer ${
                      isSelected
                        ? (isBooster
                            ? 'bg-amber-50/90 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/80 font-extrabold shadow-2xs'
                            : 'bg-blue-50/90 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/80 font-extrabold shadow-2xs')
                        : 'hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold'
                    }`}
                  >
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-xs leading-snug truncate flex items-center gap-1.5 font-bold">
                        {isBooster ? (
                          <Zap className="w-3.5 h-3.5 text-amber-500 fill-current shrink-0" />
                        ) : (
                          <Award className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                        )}
                        <span>{a.title}</span>
                      </p>
                      {a.series_title && (
                        <p className="text-[10.5px] text-slate-400 dark:text-slate-500 truncate pl-5">
                          {a.series_title}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 pt-0.5">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-bold text-slate-500 dark:text-slate-400">
                        {a.attempt_count} attempts
                      </span>
                      {isSelected && (
                        <Check className={`h-4 w-4 shrink-0 ${isBooster ? 'text-amber-500' : 'text-blue-600 dark:text-blue-400'}`} />
                      )}
                    </div>
                  </button>
                );
              })
            ) : (
              <div className="p-4 text-center text-xs text-slate-400">
                {isBooster ? 'No matching EDVEDUM Battleground tests' : 'No matching assessments'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Leaderboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isBattlegroundTab = searchParams.get('tab') === 'booster' || searchParams.get('tab') === 'battleground';
  const initialTab = isBattlegroundTab ? 'booster' : 'standard';

  const [activeTab, setActiveTab] = useState(initialTab);
  const [assessments, setAssessments] = useState([]);
  const [assessmentId, setAssessmentId] = useState('');
  const [data, setData] = useState(null);
  const [state, setState] = useState('loading');
  const [searchQuery, setSearchQuery] = useState('');

  const displayedAssessments = useMemo(() => {
    if (activeTab === 'booster') {
      return assessments.filter((a) => a.is_booster);
    }
    return assessments.filter((a) => !a.is_booster);
  }, [assessments, activeTab]);

  const loadAssessments = useCallback(async () => {
    try {
      const res = await studentService.leaderboardAssessments();
      const list = Array.isArray(res) ? res : (res.assessments || []);
      setAssessments(list);
      return list;
    } catch {
      return [];
    }
  }, []);

  const loadLeaderboard = useCallback(async (id, force = false, tabType = activeTab) => {
    setState('loading');
    try {
      const params = {};
      if (id) params.assessment_id = id;
      if (tabType === 'booster') params.type = 'booster';
      const result = await studentService.leaderboard(params, force);
      setData(result);
      if (result.assessment_id) {
        setAssessmentId(String(result.assessment_id));
      }
      setState('done');
    } catch {
      setState('error');
    }
  }, [activeTab]);

  useEffect(() => {
    (async () => {
      await loadAssessments();
      const currentTab = searchParams.get('tab') === 'booster' ? 'booster' : 'standard';
      const initialAssId = searchParams.get('assessment_id') || undefined;
      await loadLeaderboard(initialAssId, false, currentTab);
    })();
  }, []);

  const handleTabChange = (newTab) => {
    if (newTab === activeTab) return;
    setActiveTab(newTab);
    setSearchQuery('');
    setSearchParams(newTab === 'booster' ? { tab: 'booster' } : {});
    loadLeaderboard(undefined, true, newTab);
  };

  const handleAssessmentChange = (id) => {
    setAssessmentId(String(id));
    setSearchQuery('');
    loadLeaderboard(id, true, activeTab);
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
  if (state === 'error') return <ErrorState onRetry={() => loadLeaderboard(assessmentId || undefined, true, activeTab)} />;

  const isBoosterView = activeTab === 'booster';

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* 1. HEADER & CONTROLS BANNER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 border-b border-slate-200/80 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {isBoosterView ? 'EDVEDUM Battleground Leaderboard' : 'Student Leaderboard'}
            </h1>
            {isBoosterView ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-amber-500/10 text-amber-500 border border-amber-500/30 flex items-center gap-1">
                <Zap className="w-3 h-3 fill-current" /> EDVEDUM Battleground Drills
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wide bg-blue-500/10 text-blue-500 border border-blue-500/30">
                Official CBT Benchmark
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            {isBoosterView
              ? 'Recognizing top performers across EDVEDUM Battleground Tests. High-speed drill rankings and benchmark performance.'
              : 'Recognizing top academic performers across your test series. Percentile rankings computed per assessment.'}
          </p>
        </div>

        {/* CONTROLS: Mode Selector + ONLY ONE Clean Assessment Dropdown */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Segmented Mode Tabs */}
          <div className="inline-flex items-center p-1 bg-slate-100 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-xl shrink-0">
            <button
              type="button"
              onClick={() => handleTabChange('standard')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                !isBoosterView
                  ? 'bg-white dark:bg-blue-600 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Award className={`w-3.5 h-3.5 ${!isBoosterView ? 'text-blue-600 dark:text-white' : 'text-slate-400'}`} />
              <span>Test Series</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('booster')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                isBoosterView
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <Zap className={`w-3.5 h-3.5 fill-current ${isBoosterView ? 'text-white' : 'text-amber-500'}`} />
              <span>EDVEDUM Battleground</span>
            </button>
          </div>

          {/* SINGLE Assessment Dropdown */}
          {displayedAssessments.length > 0 && (
            <CustomAssessmentDropdown
              assessments={displayedAssessments}
              value={assessmentId}
              onChange={handleAssessmentChange}
              isBooster={isBoosterView}
            />
          )}
        </div>
      </div>

      {/* 2. STATS BANNER */}
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
                <p className={`text-2xl font-extrabold ${isBoosterView ? 'text-amber-500' : 'text-blue-600 dark:text-blue-400'}`}>
                  #{yourRankDetails.exactRank.toLocaleString()}
                </p>
                <span className="text-xs font-bold text-slate-400">
                  ({yourRankDetails.rangeStr})
                </span>
              </div>
            ) : (
              <p className={`text-2xl font-extrabold ${isBoosterView ? 'text-amber-500' : 'text-blue-600 dark:text-blue-400'}`}>
                Unranked
              </p>
            )}
          </div>
        </div>
      )}

      {/* 3. RANKINGS OR EMPTY STATE */}
      {rows.length === 0 ? (
        <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#111827] p-8 text-center space-y-4 shadow-xs">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mx-auto ${
            isBoosterView ? 'bg-amber-500/10 text-amber-500' : 'bg-blue-500/10 text-blue-500'
          }`}>
            {isBoosterView ? <Zap className="w-6 h-6 fill-current" /> : <Award className="w-6 h-6" />}
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {isBoosterView ? 'No battleground rankings available yet' : 'No rankings available yet'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
              {isBoosterView
                ? 'Be the first to complete this EDVEDUM Battleground Test to earn your rank and set the benchmark speed!'
                : 'Complete this test series assessment or mock test to earn your spot on the leaderboard.'}
            </p>
          </div>
          {isBoosterView && (
            <Link
              to="/battleground"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white transition shadow-xs"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              Go to EDVEDUM Battleground
            </Link>
          )}
        </div>
      ) : (
        <>
          {/* ALL CANDIDATE RANKINGS TABLE */}
          <div className="saas-card overflow-hidden bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800/90 rounded-xl space-y-3 p-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-100 dark:border-slate-800/60 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-sm">
                  {isBoosterView ? 'EDVEDUM Battleground Candidate Rankings' : 'All Candidate Rankings'}
                </h3>
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
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs font-medium text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
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
                            ? 'bg-blue-500/10 font-bold dark:bg-blue-500/15'
                            : 'hover:bg-slate-50/70 dark:hover:bg-slate-800/40'
                        }`}
                      >
                        <td className="px-3 py-2.5 whitespace-nowrap">
                          {rankInfo.exactRank != null ? (
                            <div className="flex flex-col">
                              <span className="font-extrabold text-slate-900 dark:text-white">
                                {rankInfo.display}
                              </span>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                                ({rankInfo.rangeStr})
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-400 font-medium">Unranked</span>
                          )}
                        </td>
                        <td className="px-3 py-2.5">
                          <div className="flex items-center gap-2">
                            <div
                              className={`h-6 w-6 rounded-full bg-gradient-to-tr ${getAvatarGradient(
                                r.name
                              )} flex items-center justify-center text-[10px] font-bold text-white shrink-0`}
                            >
                              {getAvatarInitials(r.name)}
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white truncate">
                              {r.name} {r.is_you && <span className="text-blue-500 font-bold">(You)</span>}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 py-2.5 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                          {Number(r.marks_obtained).toFixed(2)} / {Number(r.total_marks).toFixed(2)}
                        </td>
                        <td className="px-3 py-2.5 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                          {Number(r.percentage).toFixed(2)}%
                        </td>
                        <td className="px-3 py-2.5 text-slate-700 dark:text-slate-200 whitespace-nowrap">
                          {r.percentile != null ? `${Number(r.percentile).toFixed(2)}%` : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-right text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {r.submitted_at
                            ? new Date(r.submitted_at).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })
                            : '—'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* 4. COMPARE WITH TOPPER FEATURE */}
          {(data?.topper_comparison || data?.topperComparison) && (
            <div className="pt-2">
              <CompareWithTopper
                data={data?.topper_comparison || data?.topperComparison}
                currentCandidateId={data?.student_stats?.candidate_id}
                hasStudentAttempt={data?.your_rank != null || Boolean(data?.has_student_attempt) || Boolean(data?.topper_comparison?.has_student_attempt)}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
