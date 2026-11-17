import { useEffect, useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { boosterService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, EmptyState } from '../../components/ui.jsx';
import {
  Zap,
  Clock,
  Award,
  CheckCircle2,
  Play,
  RotateCcw,
  BarChart3,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Layers,
  AlertCircle,
  HelpCircle,
  Trophy
} from 'lucide-react';

const SUBJECT_COLORS = {
  physics: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  chemistry: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  biology: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  botany: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  zoology: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  mathematics: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  maths: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  general: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20',
};

const getSubjectBadgeClass = (subj) => {
  if (!subj) return SUBJECT_COLORS.general;
  const s = String(subj).toLowerCase();
  for (const [key, cls] of Object.entries(SUBJECT_COLORS)) {
    if (s.includes(key)) return cls;
  }
  return SUBJECT_COLORS.general;
};

export default function BoosterTests() {
  const navigate = useNavigate();
  const [data, setData] = useState({ stats: null, booster_tests: [] });
  const [state, setState] = useState('loading');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const loadData = async () => {
    try {
      setState('loading');
      const res = await boosterService.list();
      setData({
        stats: res.stats || { total: 0, available_count: 0, in_progress_count: 0, completed_count: 0, avg_percentage: 0 },
        booster_tests: Array.isArray(res.booster_tests) ? res.booster_tests : [],
      });
      setState('done');
    } catch (err) {
      console.error('[BoosterTests error]', err);
      setState('error');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const allTests = data.booster_tests || [];

  // Extract unique subjects from tests
  const availableSubjects = useMemo(() => {
    const subjects = new Set();
    allTests.forEach((t) => {
      if (t.subject && t.subject !== 'General') {
        subjects.add(t.subject);
      }
    });
    return Array.from(subjects);
  }, [allTests]);

  // Filtered tests based on status tab, subject filter, and search
  const filteredTests = useMemo(() => {
    return allTests.filter((t) => {
      // 1. Status Filter
      if (activeTab === 'available') {
        const isAvail = (t.attempt_status === 'not_started' || !t.attempt_status);
        if (!isAvail) return false;
      } else if (activeTab === 'in_progress') {
        if (t.attempt_status !== 'in_progress') return false;
      } else if (activeTab === 'completed') {
        const isDone = t.attempt_status === 'completed' || t.attempt_status === 'submitted' || t.attempt_status === 'auto_submitted';
        if (!isDone) return false;
      }

      // 2. Subject Filter
      if (selectedSubject !== 'all') {
        const testSubj = String(t.subject || '').toLowerCase();
        if (!testSubj.includes(selectedSubject.toLowerCase())) return false;
      }

      // 3. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const titleMatch = (t.title || '').toLowerCase().includes(q);
        const descMatch = (t.description || '').toLowerCase().includes(q);
        const subjMatch = (t.subject || '').toLowerCase().includes(q);
        if (!titleMatch && !descMatch && !subjMatch) return false;
      }

      return true;
    });
  }, [allTests, activeTab, selectedSubject, searchQuery]);

  const handleStartTest = (testId) => {
    sessionStorage.setItem('assessmentReturn', '/battleground');
    navigate(`/assessments/${testId}/instructions`);
  };

  const handleResumeTest = (attemptId) => {
    sessionStorage.setItem('assessmentReturn', '/battleground');
    navigate(`/exam/${attemptId}`);
  };

  const handleViewResults = (test) => {
    sessionStorage.setItem('assessmentReturn', '/battleground');
    if (test.attempt_id) {
      navigate(`/results/${test.attempt_id}`);
    } else {
      navigate(`/analytics/test/${test.id}`);
    }
  };

  if (state === 'loading') {
    return <LoadingScreen label="Loading EDVEDUM Battleground..." />;
  }

  if (state === 'error') {
    return <ErrorState onRetry={loadData} />;
  }

  const stats = data.stats || { total: 0, available_count: 0, in_progress_count: 0, completed_count: 0, avg_percentage: 0 };

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto px-3 sm:px-6">
      {/* 1. HERO HEADER */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-gradient-to-br from-amber-500/10 via-slate-900/5 to-orange-500/10 dark:from-[#111827] dark:via-[#0F172A] dark:to-[#1E1B4B] p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-700 dark:text-amber-300 text-xs font-black tracking-wide uppercase">
              <Zap className="h-3.5 w-3.5 fill-current" />
              <span>Rapid Examination Drills • 60–90 Minutes</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              EDVEDUM Battleground
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              High-yield, rapid 1 to 1.5-hour topic & chapter battleground exams curated by faculty to sharpen your accuracy, pacing, and exam readiness under realistic CBT conditions.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/leaderboard?tab=booster"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-xs font-bold text-amber-500 shadow-xs transition"
            >
              <Trophy className="h-4 w-4" />
              <span>Battleground Leaderboard</span>
            </Link>
            <Link
              to="/my-tests"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-xs transition"
            >
              <Layers className="h-4 w-4" />
              <span>Full Test Series</span>
            </Link>
            <Link
              to="/analytics"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white shadow-xs transition"
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analytics</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2. STATS OVERVIEW CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="card p-4 sm:p-5 flex items-center gap-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] rounded-2xl shadow-xs">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{stats.total}</div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Battlegrounds</div>
          </div>
        </div>

        <div className="card p-4 sm:p-5 flex items-center gap-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] rounded-2xl shadow-xs">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
            <Play className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{stats.available_count}</div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Available Now</div>
          </div>
        </div>

        <div className="card p-4 sm:p-5 flex items-center gap-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] rounded-2xl shadow-xs">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{stats.completed_count}</div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Completed</div>
          </div>
        </div>

        <div className="card p-4 sm:p-5 flex items-center gap-3 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] rounded-2xl shadow-xs">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">{stats.avg_percentage}%</div>
            <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Average Score</div>
          </div>
        </div>
      </div>

      {/* 3. FILTER TABS & SEARCH BAR */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
            {[
              { id: 'all', label: `All Battlegrounds (${stats.total})` },
              { id: 'available', label: `Available (${stats.available_count})` },
              { id: 'in_progress', label: `In Progress (${stats.in_progress_count})` },
              { id: 'completed', label: `Completed (${stats.completed_count})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all shrink-0 cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search battleground tests..."
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>

        {/* Subject Pills (if available) */}
        {availableSubjects.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Subject:</span>
            </span>
            <button
              type="button"
              onClick={() => setSelectedSubject('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold border transition shrink-0 ${
                selectedSubject === 'all'
                  ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
              }`}
            >
              All Subjects
            </button>
            {availableSubjects.map((subj) => (
              <button
                key={subj}
                type="button"
                onClick={() => setSelectedSubject(subj)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition shrink-0 ${
                  selectedSubject === subj
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                }`}
              >
                {subj}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. BATTLEGROUND TEST CARDS GRID */}
      {filteredTests.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mb-4">
            <Zap className="h-7 w-7" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">No Battleground Tests Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1 mb-4">
            {searchQuery || selectedSubject !== 'all' || activeTab !== 'all'
              ? 'No battleground tests match your current search or filter criteria. Try resetting filters.'
              : 'Your faculty has not scheduled any battleground tests yet. When new 60–90 minute battleground exams are assigned, they will appear right here.'}
          </p>
          {(searchQuery || selectedSubject !== 'all' || activeTab !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setActiveTab('all');
                setSelectedSubject('all');
                setSearchQuery('');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-600 transition"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset All Filters</span>
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTests.map((test) => {
            const isCompleted = test.attempt_status === 'completed' || test.attempt_status === 'submitted' || test.attempt_status === 'auto_submitted';
            const isInProgress = test.attempt_status === 'in_progress';
            const subjectClass = getSubjectBadgeClass(test.subject);

            return (
              <div
                key={test.id}
                className="group relative flex flex-col justify-between rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0F172A] p-5 shadow-xs transition-all duration-200 hover:shadow-md hover:border-amber-400 dark:hover:border-amber-500/50"
              >
                <div>
                  {/* Card Header Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider border ${subjectClass}`}>
                        {test.subject || 'Battleground'}
                      </span>
                      {!test.is_published && (
                        <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30">
                          Draft
                        </span>
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-black text-amber-700 dark:text-amber-300 bg-amber-500/10 border border-amber-500/20">
                      <Clock className="h-3 w-3" />
                      <span>{test.duration_minutes || 60} Mins</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 leading-snug">
                    {test.title}
                  </h3>

                  {/* Syllabus / Description */}
                  <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {test.description || 'Targeted examination drill to enhance conceptual accuracy and time management.'}
                  </p>

                  {/* Metrics Row */}
                  <div className="mt-4 flex items-center gap-4 py-2.5 px-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Questions</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">{test.question_count || 0} Qs</span>
                    </div>
                    <div className="h-6 w-px bg-slate-200 dark:bg-slate-800" />
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Max Marks</span>
                      <span className="font-extrabold text-slate-800 dark:text-slate-200">{test.total_marks || 180} pts</span>
                    </div>
                  </div>

                  {/* Status Banner */}
                  {isCompleted && (
                    <div className="mt-3.5 flex items-center justify-between p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                        <span className="text-xs font-bold">Completed</span>
                      </div>
                      <div className="text-xs font-black">
                        {(() => {
                          const maxPts = Number(test.total_marks) > 0 && Number(test.total_marks) < 720
                            ? Number(test.total_marks)
                            : (Number(test.score_total) > 0 && Number(test.score_total) < 720 ? Number(test.score_total) : (test.question_count ? test.question_count * 4 : 80));
                          const formattedScore = test.marks_obtained != null
                            ? (Number.isInteger(Number(test.marks_obtained)) ? Number(test.marks_obtained) : Number(test.marks_obtained).toFixed(2))
                            : null;
                          const formattedMax = Number.isInteger(Number(maxPts)) ? Number(maxPts) : Number(maxPts).toFixed(2);
                          const pct = formattedScore != null && maxPts > 0
                            ? Number(((Number(test.marks_obtained) / maxPts) * 100).toFixed(2))
                            : (test.percentage != null ? Number(test.percentage) : 0);
                          return (
                            <>
                              {formattedScore != null ? `${formattedScore} / ${formattedMax}` : `${pct}%`}
                              {pct != null && <span className="text-[10px] ml-1 font-semibold opacity-80">({pct}%)</span>}
                            </>
                          );
                        })()}
                      </div>
                    </div>
                  )}

                  {isInProgress && (
                    <div className="mt-3.5 flex items-center gap-2 p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-bold animate-pulse">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>Test In Progress — Continue your attempt</span>
                    </div>
                  )}
                </div>

                {/* Card Footer Actions */}
                <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2">
                  {isCompleted ? (
                    <button
                      type="button"
                      onClick={() => handleViewResults(test)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition cursor-pointer shadow-xs"
                    >
                      <BarChart3 className="h-4 w-4 text-emerald-500" />
                      <span>View Performance & Solutions</span>
                      <ChevronRight className="h-3.5 w-3.5 opacity-60" />
                    </button>
                  ) : isInProgress ? (
                    <button
                      type="button"
                      onClick={() => handleResumeTest(test.attempt_id)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-bold text-slate-950 transition cursor-pointer shadow-xs"
                    >
                      <Play className="h-4 w-4 fill-slate-950" />
                      <span>Resume EDVEDUM Battleground</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleStartTest(test.id)}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-xs font-bold text-slate-950 transition cursor-pointer shadow-xs"
                    >
                      <Zap className="h-4 w-4 fill-slate-950" />
                      <span>Start EDVEDUM Battleground</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
