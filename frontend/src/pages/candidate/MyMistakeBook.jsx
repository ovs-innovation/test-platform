import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { mistakeBookService } from '../../lib/services.js';
import { formatDateTime } from '../../lib/format.js';
import MathRenderer from '../../components/common/MathRenderer.jsx';
import { getMediaUrl } from '../../lib/media.js';
import {
  Bookmark,
  Sparkles,
  RefreshCw,
  Search,
  CheckCircle2,
  XCircle,
  AlertCircle,
  X,
  Play,
  Trash2,
  Layers,
  Bot,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const CORE_SUBJECTS = [
  { key: 'Physics', label: 'Physics' },
  { key: 'Chemistry', label: 'Chemistry' },
  { key: 'Biology', label: 'Biology' },
  { key: 'Mathematics', label: 'Maths' },
];

export default function MyMistakeBook() {
  const navigate = useNavigate();

  // Raw data from server
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [rawData, setRawData] = useState({
    summary: { active: 0, incorrect: 0, unattempted: 0, resolved: 0, total: 0 },
    subjects: [],
    mistakes: [],
  });

  // Client-side Instant Filters (0ms latency, no loading delay)
  const [selectedSubject, setSelectedSubject] = useState('all'); // 'all' | 'Physics' | 'Chemistry' | 'Biology' | 'Mathematics'
  const [statusFilter, setStatusFilter] = useState('active'); // 'active' | 'resolved' | 'all'
  const [typeFilter, setTypeFilter] = useState('all'); // 'all' | 'incorrect' | 'unattempted'
  const [searchQuery, setSearchQuery] = useState('');

  // Pagination (15 questions per page)
  const PAGE_SIZE = 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Selection for test recreation
  const [selectedMistakeIds, setSelectedMistakeIds] = useState(new Set());

  // Modal for test recreation
  const [modalOpen, setModalOpen] = useState(false);
  const [recreateTitle, setRecreateTitle] = useState('');
  const [recreateDuration, setRecreateDuration] = useState(30);
  const [creatingTest, setCreatingTest] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Load all mistakes from server (fast single query, no heavy auto-sync loop)
  const loadMistakes = async (showSyncIndicator = false) => {
    if (showSyncIndicator) setSyncing(true);
    else setLoading(true);

    try {
      const res = await mistakeBookService.getMistakes({
        status: 'all', // Fetch all so client-side filtering is instantaneous
        limit: 1000,
      });

      setRawData(res || {
        summary: { active: 0, incorrect: 0, unattempted: 0, resolved: 0, total: 0 },
        subjects: [],
        mistakes: [],
      });
    } catch (err) {
      console.error('Failed to load mistake book:', err);
    } finally {
      setLoading(false);
      setSyncing(false);
    }
  };

  useEffect(() => {
    loadMistakes(false);
  }, []);

  // Sync from previous tests on explicit user click
  const handleSync = async () => {
    setSyncing(true);
    try {
      const res = await mistakeBookService.syncMistakes();
      showToast(res.message || 'Synced mistakes from all your tests.');
      await loadMistakes(true);
    } catch (err) {
      console.error('Sync failed:', err);
      showToast('Could not sync tests at this moment.');
      setSyncing(false);
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // 1. Dynamic Subject Counts (Strictly only Physics, Chemistry, Biology, Mathematics)
  const subjectCounts = useMemo(() => {
    const counts = {
      Physics: 0,
      Chemistry: 0,
      Biology: 0,
      Mathematics: 0,
    };

    (rawData.mistakes || []).forEach((m) => {
      if (statusFilter !== 'all' && m.status !== statusFilter) return;
      const s = (m.subject || '').toLowerCase();
      if (s.includes('phys')) counts.Physics++;
      else if (s.includes('chem')) counts.Chemistry++;
      else if (s.includes('bio') || s.includes('botan') || s.includes('zool')) counts.Biology++;
      else if (s.includes('math')) counts.Mathematics++;
    });

    return counts;
  }, [rawData.mistakes, statusFilter]);

  // 2. Metrics summary strictly for academic questions
  const activeSummary = useMemo(() => {
    const list = (rawData.mistakes || []).filter((m) => {
      const s = (m.subject || '').toLowerCase();
      return s.includes('phys') || s.includes('chem') || s.includes('bio') || s.includes('botan') || s.includes('zool') || s.includes('math');
    });

    const activeList = list.filter((m) => m.status === 'active');
    const incorrectCount = activeList.filter((m) => m.mistake_type === 'incorrect').length;
    const unattemptedCount = activeList.filter((m) => m.mistake_type === 'unattempted').length;
    const resolvedCount = list.filter((m) => m.status === 'resolved').length;

    return {
      active: activeList.length,
      incorrect: incorrectCount,
      unattempted: unattemptedCount,
      resolved: resolvedCount,
      total: list.length,
    };
  }, [rawData.mistakes]);

  // 3. Instant in-memory filtering (0ms latency, instant response when clicking tabs)
  const filteredMistakes = useMemo(() => {
    let list = (rawData.mistakes || []).filter((m) => {
      const s = (m.subject || '').toLowerCase();
      return s.includes('phys') || s.includes('chem') || s.includes('bio') || s.includes('botan') || s.includes('zool') || s.includes('math');
    });

    // Status filter
    if (statusFilter !== 'all') {
      list = list.filter((m) => m.status === statusFilter);
    }

    // Type filter (All vs Incorrect vs Unattempted)
    if (typeFilter !== 'all') {
      list = list.filter((m) => m.mistake_type === typeFilter);
    }

    // Subject filter
    if (selectedSubject !== 'all') {
      const targetSub = selectedSubject.toLowerCase();
      list = list.filter((m) => {
        const s = (m.subject || '').toLowerCase();
        if (targetSub.includes('bio')) {
          return s.includes('bio') || s.includes('botan') || s.includes('zool');
        }
        if (targetSub.includes('math')) {
          return s.includes('math');
        }
        if (targetSub.includes('phys')) {
          return s.includes('phys');
        }
        if (targetSub.includes('chem')) {
          return s.includes('chem');
        }
        return s.includes(targetSub);
      });
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter((m) => {
        const text = (m.question?.question_text || '').toLowerCase();
        const topic = (m.topic || '').toLowerCase();
        return text.includes(q) || topic.includes(q);
      });
    }

    return list;
  }, [rawData.mistakes, statusFilter, typeFilter, selectedSubject, searchQuery]);

  // Reset pagination to page 1 whenever filters or search query change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedSubject, statusFilter, typeFilter, searchQuery]);

  // Pagination calculations (15 questions per page)
  const totalPages = Math.max(1, Math.ceil(filteredMistakes.length / PAGE_SIZE));
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages);

  const paginatedMistakes = useMemo(() => {
    const start = (safeCurrentPage - 1) * PAGE_SIZE;
    return filteredMistakes.slice(start, start + PAGE_SIZE);
  }, [filteredMistakes, safeCurrentPage]);

  // Toggle selection of a single question
  const toggleSelect = (mistakeId) => {
    setSelectedMistakeIds((prev) => {
      const next = new Set(prev);
      if (next.has(mistakeId)) next.delete(mistakeId);
      else next.add(mistakeId);
      return next;
    });
  };

  // Toggle selection of all questions on the current page
  const toggleSelectPage = () => {
    const pageIds = paginatedMistakes.map((m) => m.id);
    const allPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedMistakeIds.has(id));

    setSelectedMistakeIds((prev) => {
      const next = new Set(prev);
      if (allPageSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  // Select all filtered questions across all pages
  const selectAllFiltered = () => {
    if (selectedMistakeIds.size === filteredMistakes.length && filteredMistakes.length > 0) {
      setSelectedMistakeIds(new Set());
    } else {
      setSelectedMistakeIds(new Set(filteredMistakes.map((m) => m.id)));
    }
  };

  // Page navigation helper with smooth scroll
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    const container = document.getElementById('mistake-questions-container');
    if (container) {
      const rect = container.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      window.scrollTo({
        top: Math.max(0, rect.top + scrollTop - 90),
        behavior: 'smooth',
      });
    }
  };

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (safeCurrentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (safeCurrentPage >= totalPages - 3) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', safeCurrentPage - 1, safeCurrentPage, safeCurrentPage + 1, '...', totalPages];
  };

  // Toggle status between resolved and active
  const handleToggleStatus = async (mistakeId, currentStatus) => {
    const nextStatus = currentStatus === 'resolved' ? 'active' : 'resolved';
    try {
      await mistakeBookService.updateStatus(mistakeId, nextStatus);
      showToast(nextStatus === 'resolved' ? 'Question marked as Mastered! 🎉' : 'Moved back to active mistakes.');
      setRawData((prev) => ({
        ...prev,
        mistakes: prev.mistakes.map((m) => (m.id === mistakeId ? { ...m, status: nextStatus } : m)),
      }));
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  // Delete mistake
  const handleDeleteMistake = async (mistakeId) => {
    if (!window.confirm('Are you sure you want to remove this question from your Mistake Book?')) return;
    try {
      await mistakeBookService.removeMistake(mistakeId);
      showToast('Question removed from Mistake Book.');
      setSelectedMistakeIds((prev) => {
        const next = new Set(prev);
        next.delete(mistakeId);
        return next;
      });
      setRawData((prev) => ({
        ...prev,
        mistakes: prev.mistakes.filter((m) => m.id !== mistakeId),
      }));
    } catch (err) {
      console.error('Failed to remove mistake:', err);
    }
  };

  // Open Recreate Test Modal
  const openRecreateModal = () => {
    const ids = Array.from(selectedMistakeIds);
    if (ids.length === 0 && filteredMistakes.length === 0) {
      alert('No questions available to create a test.');
      return;
    }

    const count = ids.length || filteredMistakes.length;
    const estDuration = Math.max(15, count * 2);
    setRecreateDuration(estDuration);

    const subjectText = selectedSubject !== 'all' ? selectedSubject : 'Multi-Subject';
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    setRecreateTitle(`Mistake Book Practice Test (${subjectText} • ${count} Qs • ${dateStr})`);
    setModalOpen(true);
  };

  // Execute Recreate Test
  const handleCreateTest = async (e) => {
    e.preventDefault();
    setCreatingTest(true);

    try {
      const activeIds = selectedMistakeIds.size > 0
        ? Array.from(selectedMistakeIds)
        : filteredMistakes.map((m) => m.id);

      const targetMistakes = rawData.mistakes.filter((m) => activeIds.includes(m.id));
      const questionIds = targetMistakes.map((m) => m.question_id);

      if (questionIds.length === 0) {
        alert('Please select at least one question.');
        setCreatingTest(false);
        return;
      }

      const res = await mistakeBookService.recreateTest({
        question_ids: questionIds,
        title: recreateTitle,
        duration_minutes: recreateDuration,
      });

      setModalOpen(false);
      showToast(`Revision Test created with ${res.question_count} questions! Starting now...`);

      setTimeout(() => {
        navigate(`/assessments/${res.assessment_id}/instructions`);
      }, 700);
    } catch (err) {
      console.error('Failed to recreate test:', err);
      alert(err.response?.data?.message || 'Failed to recreate revision test.');
    } finally {
      setCreatingTest(false);
    }
  };

  // Open Ask Vedum AI Doubt Solver with the question pasted
  const handleAskAIDoubt = (mistake) => {
    const q = mistake.question || {};
    const qText = q.question_text || '';
    const subject = mistake.subject || '';
    const assertion = q.assertion_text ? `\nAssertion (A): ${q.assertion_text}` : '';
    const reason = q.reason_text ? `\nReason (R): ${q.reason_text}` : '';
    let optionsText = '';
    if (Array.isArray(q.options) && q.options.length > 0) {
      optionsText = '\nOptions:\n' + q.options.map((opt, i) => `${String.fromCharCode(65 + i)}) ${typeof opt === 'object' ? (opt.text ?? '') : String(opt ?? '')}`).join('\n');
    }

    const fullDoubtPrompt = `I need help understanding how to solve this ${subject} question:\n\n${qText}${assertion}${reason}${optionsText}\n\nCould you please explain how to approach and solve this step-by-step?`;

    window.dispatchEvent(
      new CustomEvent('open-ai-doubt-solver', {
        detail: {
          query: fullDoubtPrompt,
          subject,
          imageUrl: q.image_url || null,
          testContext: {
            questionId: mistake.question_id,
            subject,
            topic: mistake.topic,
          },
        },
      })
    );
    showToast('Question pasted into Ask Vedum chatbot!');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-900 dark:text-slate-100">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-2xl bg-slate-900/95 dark:bg-white/95 px-5 py-3.5 text-xs font-bold text-white dark:text-slate-900 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-4">
          <Sparkles className="h-4 w-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">

        {/* Top Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              <Link to="/dashboard" className="hover:text-blue-600 transition">Candidate Dashboard</Link>
              <span>/</span>
              <span className="text-blue-600 dark:text-blue-400">My Mistake Book</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight flex items-center gap-2.5">
              <span>My Mistake Book</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Questions you missed or skipped across your tests. Review the questions and recreate a practice test to solve them yourself.
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
            <button
              type="button"
              onClick={handleSync}
              disabled={syncing}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800/80 text-xs font-bold text-slate-700 dark:text-slate-200 transition shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              title="Sync mistakes from all completed test attempts"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${syncing ? 'animate-spin text-blue-600' : 'text-slate-400'}`} />
              <span>{syncing ? 'Syncing...' : 'Sync Tests'}</span>
            </button>

            <button
              type="button"
              onClick={openRecreateModal}
              disabled={filteredMistakes.length === 0}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold transition shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="h-4 w-4 text-amber-300" />
              <span>Recreate Revision Test</span>
            </button>
          </div>
        </div>

        {/* Analytics Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
          {/* Active Mistakes */}
          <div
            onClick={() => setStatusFilter('active')}
            className={`p-4 rounded-2xl border transition cursor-pointer ${statusFilter === 'active'
                ? 'bg-blue-500/10 border-blue-500/40 ring-2 ring-blue-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
          >
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active In Book</span>
              <Bookmark className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {activeSummary.active}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Pending mastery</p>
          </div>

          {/* Incorrect Answers */}
          <div
            onClick={() => { setStatusFilter('active'); setTypeFilter(typeFilter === 'incorrect' ? 'all' : 'incorrect'); }}
            className={`p-4 rounded-2xl border transition cursor-pointer ${statusFilter === 'active' && typeFilter === 'incorrect'
                ? 'bg-rose-500/10 border-rose-500/40 ring-2 ring-rose-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
          >
            <div className="flex items-center justify-between text-rose-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Incorrect</span>
              <XCircle className="h-4 w-4 text-rose-500" />
            </div>
            <div className="text-2xl font-black text-rose-600 dark:text-rose-400">
              {activeSummary.incorrect}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Wrong negative marks</p>
          </div>

          {/* Unattempted */}
          <div
            onClick={() => { setStatusFilter('active'); setTypeFilter(typeFilter === 'unattempted' ? 'all' : 'unattempted'); }}
            className={`p-4 rounded-2xl border transition cursor-pointer ${statusFilter === 'active' && typeFilter === 'unattempted'
                ? 'bg-amber-500/10 border-amber-500/40 ring-2 ring-amber-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
          >
            <div className="flex items-center justify-between text-amber-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Unattempted</span>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">
              {activeSummary.unattempted}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Skipped during exam</p>
          </div>

          {/* Mastered / Resolved */}
          <div
            onClick={() => setStatusFilter(statusFilter === 'resolved' ? 'active' : 'resolved')}
            className={`p-4 rounded-2xl border transition cursor-pointer ${statusFilter === 'resolved'
                ? 'bg-emerald-500/10 border-emerald-500/40 ring-2 ring-emerald-500/20'
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
              }`}
          >
            <div className="flex items-center justify-between text-emerald-500 mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider">Mastered</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {activeSummary.resolved}
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">Resolved in practice</p>
          </div>
        </div>

        {/* Subject Wise Category Chips — ONLY Physics, Chemistry, Biology, Mathematics */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-blue-500" />
              <span>Subjects</span>
            </span>
            <span className="text-[11px] text-slate-400 font-medium">Click to filter questions</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {/* All Subjects Chip */}
            <button
              type="button"
              onClick={() => setSelectedSubject('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${selectedSubject === 'all'
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300'
                }`}
            >
              All Subjects ({activeSummary.active})
            </button>

            {/* Exactly the 4 Core Academic Subjects */}
            {CORE_SUBJECTS.map((sub) => {
              const isSelected = selectedSubject.toLowerCase() === sub.key.toLowerCase();
              const count = subjectCounts[sub.key] || 0;

              return (
                <button
                  key={sub.key}
                  type="button"
                  onClick={() => setSelectedSubject(sub.key)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer flex items-center gap-2 ${isSelected
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-blue-400'
                    }`}
                >
                  <span>{sub.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                    }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Instant Filter & Search Toolbar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 mb-6 shadow-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3.5">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions by keyword or topic..."
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Instant Type Filter Buttons */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl shrink-0">
              <button
                type="button"
                onClick={() => setTypeFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${typeFilter === 'all'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
              >
                All Types
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('incorrect')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${typeFilter === 'incorrect'
                    ? 'bg-rose-500 text-white shadow-xs'
                    : 'text-slate-500 hover:text-rose-500'
                  }`}
              >
                <XCircle className="h-3 w-3" />
                <span>Incorrect</span>
              </button>
              <button
                type="button"
                onClick={() => setTypeFilter('unattempted')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${typeFilter === 'unattempted'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-500 hover:text-amber-500'
                  }`}
              >
                <AlertCircle className="h-3 w-3" />
                <span>Unattempted</span>
              </button>
            </div>

            {/* Status Switcher (Active vs Resolved) */}
            <div className="flex items-center gap-2 shrink-0 border-l border-slate-200 dark:border-slate-800 pl-3">
              <button
                type="button"
                onClick={() => setStatusFilter(statusFilter === 'resolved' ? 'active' : 'resolved')}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 cursor-pointer ${statusFilter === 'resolved'
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>{statusFilter === 'resolved' ? 'Showing Mastered' : 'Show Mastered'}</span>
              </button>
            </div>
          </div>

          {/* Multi-selection Bar */}
          {filteredMistakes.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-600 dark:text-slate-300 select-none">
                  <input
                    type="checkbox"
                    checked={
                      paginatedMistakes.length > 0 &&
                      paginatedMistakes.every((m) => selectedMistakeIds.has(m.id))
                    }
                    onChange={toggleSelectPage}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <span>Select {paginatedMistakes.length} on this page</span>
                </label>

                {filteredMistakes.length > PAGE_SIZE && (
                  <button
                    type="button"
                    onClick={selectAllFiltered}
                    className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {selectedMistakeIds.size === filteredMistakes.length
                      ? 'Deselect all questions'
                      : `Select all ${filteredMistakes.length} questions`}
                  </button>
                )}
              </div>

              {selectedMistakeIds.size > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">
                    {selectedMistakeIds.size} selected
                  </span>
                  <button
                    type="button"
                    onClick={openRecreateModal}
                    className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[11px] transition shadow-xs flex items-center gap-1.5 cursor-pointer"
                  >
                    <Play className="h-3 w-3 fill-current" />
                    <span>Create Test ({selectedMistakeIds.size} Qs)</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Questions List (QUESTIONS ONLY, NO ANSWERS SHOWN) */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-44 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse p-6" />
            ))}
          </div>
        ) : filteredMistakes.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-12 text-center max-w-xl mx-auto shadow-xs">
            <div className="h-16 w-16 mx-auto mb-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
              {statusFilter === 'resolved'
                ? 'No Mastered Questions Yet'
                : 'No Questions Found'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              {statusFilter === 'resolved'
                ? 'When you re-attempt and solve missed questions in tests, they will appear here as Mastered.'
                : 'No missed questions matching this filter. Switch filters or click Sync Tests below.'}
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleSync}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition"
              >
                Sync Tests
              </button>
              <Link
                to="/my-tests"
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-xs font-bold text-white transition shadow-sm"
              >
                Go to My Tests
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div id="mistake-questions-container" className="space-y-4">
            {paginatedMistakes.map((item, idx) => {
              const q = item.question;
              const isSelected = selectedMistakeIds.has(item.id);
              const isIncorrect = item.mistake_type === 'incorrect';
              const isResolved = item.status === 'resolved';
              const globalIdx = (safeCurrentPage - 1) * PAGE_SIZE + idx + 1;

              return (
                <div
                  key={item.id}
                  className={`bg-white dark:bg-slate-900 rounded-2xl border transition-all duration-150 shadow-xs overflow-hidden ${isSelected
                      ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-md'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                >
                  {/* Card Header Bar */}
                  <div className="px-5 py-3.5 bg-slate-50/80 dark:bg-slate-800/40 border-b border-slate-200/70 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2.5">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                        title="Select for test recreation"
                      />
                      <span className="text-xs font-black text-slate-500">#{globalIdx}</span>

                      {/* Status Badge */}
                      {isResolved ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Mastered</span>
                        </span>
                      ) : isIncorrect ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                          <XCircle className="h-3 w-3" />
                          <span>Incorrect (-1)</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                          <AlertCircle className="h-3 w-3" />
                          <span>Unattempted (Skipped)</span>
                        </span>
                      )}

                      {/* Subject Badge */}
                      <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-md border border-blue-200/60 dark:border-blue-800/60">
                        {item.subject}
                      </span>

                      {/* Topic Tag */}
                      {item.topic && (
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[220px]">
                          • {item.topic}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="truncate max-w-[200px] font-semibold text-slate-600 dark:text-slate-300">
                        {item.source_assessment_title}
                      </span>
                      {item.attempt_date && (
                        <span>• {formatDateTime(item.attempt_date)}</span>
                      )}
                    </div>
                  </div>

                  {/* Card Content Body: QUESTIONS ONLY, NO ANSWERS SHOWN */}
                  <div className="p-5">
                    {/* Assertion / Reason if available */}
                    {q.assertion_text && (
                      <div className="mb-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs">
                        <span className="font-extrabold text-slate-700 dark:text-slate-300">Assertion (A): </span>
                        <MathRenderer text={q.assertion_text} />
                        {q.reason_text && (
                          <div className="mt-2">
                            <span className="font-extrabold text-slate-700 dark:text-slate-300">Reason (R): </span>
                            <MathRenderer text={q.reason_text} />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Question Statement */}
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-100 leading-relaxed mb-4">
                      <MathRenderer text={q.question_text} />
                    </div>

                    {/* Question Diagram / Image if present */}
                    {q.image_url && (
                      <div className="mb-4">
                        <img
                          src={getMediaUrl(q.image_url)}
                          alt="Question diagram"
                          className="max-h-64 rounded-xl border border-slate-200 dark:border-slate-800 object-contain bg-white"
                        />
                      </div>
                    )}

                    {/* Options List: CLEAN NEUTRAL CHOICES ONLY (NO ANSWERS REVEALED) */}
                    {Array.isArray(q.options) && q.options.length > 0 && (
                      <div className="space-y-2 mb-4">
                        {q.options.map((opt, optIdx) => {
                          const labelChar = (typeof opt === 'object' && opt?.key) ? opt.key : String.fromCharCode(65 + optIdx);
                          const optText = typeof opt === 'object' && opt !== null ? (opt.text ?? opt.value ?? opt.title ?? '') : String(opt ?? '');
                          const rawOptImg = typeof opt === 'object' && opt !== null ? (opt.image_url || opt.image || (Array.isArray(opt.media) && opt.media[0]?.url) || '') : '';
                          const optImg = rawOptImg ? getMediaUrl(rawOptImg) : '';

                          return (
                            <div
                              key={optIdx}
                              className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 text-slate-700 dark:text-slate-300 text-xs flex items-start gap-3 transition"
                            >
                              <span className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-black shrink-0 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                                {labelChar}
                              </span>

                              <div className="flex-1 min-w-0">
                                {optText && <MathRenderer text={optText} />}
                                {optImg && (
                                  <img
                                    src={optImg}
                                    alt={`Option ${labelChar}`}
                                    className="max-h-48 mt-2 rounded-lg border border-slate-200 dark:border-slate-700 object-contain bg-white"
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}

                    {/* Numerical Question note (No answers shown) */}
                    {(q.question_type === 'integer' || q.question_type === 'numerical') && (
                      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 font-medium mb-4 flex items-center gap-2">
                        <span className="font-bold text-slate-700 dark:text-slate-300">Numerical Type:</span>
                        <span>Requires numerical solution during the test.</span>
                      </div>
                    )}

                    {/* Card Actions Footer */}
                    <div className="mt-4 pt-3.5 border-t border-slate-100 dark:border-slate-800/70 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleAskAIDoubt(item)}
                          className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 hover:from-blue-600/20 hover:via-indigo-600/20 hover:to-purple-600/20 border border-blue-500/30 text-blue-600 dark:text-blue-400 font-extrabold transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
                          title="Ask Vedum to explain this question"
                        >
                          <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                          <span>Ask Vedum</span>
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(item.id, item.status)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer ${isResolved
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                              : 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100'
                            }`}
                        >
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>{isResolved ? 'Mark as Unresolved' : 'Mark as Mastered'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteMistake(item.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                          title="Remove from Mistake Book"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls (15 questions per page) */}
          {filteredMistakes.length > PAGE_SIZE && (
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              {/* Range info */}
              <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Showing <span className="font-extrabold text-slate-900 dark:text-white">{(safeCurrentPage - 1) * PAGE_SIZE + 1}</span> -{' '}
                <span className="font-extrabold text-slate-900 dark:text-white">{Math.min(safeCurrentPage * PAGE_SIZE, filteredMistakes.length)}</span> of{' '}
                <span className="font-extrabold text-slate-900 dark:text-white">{filteredMistakes.length}</span> questions
              </div>

              {/* Page buttons */}
              <div className="flex flex-wrap items-center justify-center gap-1.5">
                {/* First Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(1)}
                  disabled={safeCurrentPage === 1}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  title="First Page"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>

                {/* Prev Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage - 1)}
                  disabled={safeCurrentPage === 1}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Previous Page"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Prev</span>
                </button>

                {/* Numbered Pills */}
                <div className="flex items-center gap-1">
                  {getPageNumbers().map((p, pIdx) => {
                    if (p === '...') {
                      return (
                        <span key={`dots-${pIdx}`} className="px-2 py-1 text-slate-400 text-xs font-bold">
                          ...
                        </span>
                      );
                    }
                    const isCurrent = p === safeCurrentPage;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => handlePageChange(p)}
                        className={`min-w-[34px] h-[34px] rounded-xl text-xs font-extrabold transition cursor-pointer flex items-center justify-center ${
                          isCurrent
                            ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                            : 'border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(safeCurrentPage + 1)}
                  disabled={safeCurrentPage === totalPages}
                  className="px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition text-xs font-bold flex items-center gap-1 cursor-pointer"
                  title="Next Page"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Last Page */}
                <button
                  type="button"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={safeCurrentPage === totalPages}
                  className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:cursor-not-allowed transition cursor-pointer"
                  title="Last Page"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
      </div>

      {/* Floating Action Bar when questions are selected */}
      {selectedMistakeIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-4 px-6 py-3.5 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white border border-slate-700/80 shadow-2xl backdrop-blur-md animate-in fade-in slide-in-from-bottom-5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-black flex items-center justify-center">
              {selectedMistakeIds.size}
            </span>
            <span className="text-xs font-bold">Questions Selected</span>
          </div>

          <div className="h-4 w-px bg-slate-700" />

          <button
            type="button"
            onClick={openRecreateModal}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold transition shadow-md flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            <span>Generate Revision Test</span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedMistakeIds(new Set())}
            className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
          >
            Deselect
          </button>
        </div>
      )}

      {/* Recreate Revision Test Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    Recreate Revision Test
                  </h3>
                  <p className="text-xs text-slate-400">Personalized CBT practice exam from your mistakes</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-4">
              {/* Question Count Pill */}
              <div className="p-3 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-300">Questions in this Revision Test:</span>
                <span className="font-black text-blue-600 dark:text-blue-400 text-sm">
                  {selectedMistakeIds.size > 0 ? selectedMistakeIds.size : filteredMistakes.length} Questions
                </span>
              </div>

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Test Title
                </label>
                <input
                  type="text"
                  required
                  value={recreateTitle}
                  onChange={(e) => setRecreateTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Duration input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Duration (Minutes)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min="5"
                    max="300"
                    required
                    value={recreateDuration}
                    onChange={(e) => setRecreateDuration(Number(e.target.value))}
                    className="w-32 px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-900 dark:text-white focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-xs text-slate-400">
                    (~2 mins/question recommended for optimal revision)
                  </span>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingTest}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-extrabold transition shadow-md shadow-blue-500/20 flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {creatingTest ? (
                    <>
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                      <span>Generating Test...</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Generate & Start Test Now</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
