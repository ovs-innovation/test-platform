import { useState, useMemo, useEffect } from 'react';
import { useOutletContext, useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  BookOpen,
  Send,
  Clock,
  Sparkles,
  Users,
  User,
  X,
  FileText,
  Building2,
  Plus,
  FileUp,
  Trash2,
  Eye,
  RefreshCw,
  ExternalLink,
  GraduationCap,
  AlertCircle,
  HelpCircle,
  Check,
  ChevronRight
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';
import { institutionDashboardService } from '../../../lib/services.js';
import UploadCustomTestModal from '../modals/UploadCustomTestModal.jsx';
import ViewCustomTestModal from '../modals/ViewCustomTestModal.jsx';
import AssignCustomTestModal from '../modals/AssignCustomTestModal.jsx';

export default function TestSeriesTab({
  availableSeries: propAvailableSeries,
  availableTests: propAvailableTests,
  batches: propBatches,
  students: propStudents,
  onAssignTest: propOnAssignTest,
  isDarkMode = true,
}) {
  const context = useOutletContext() || {};
  const [searchParams, setSearchParams] = useSearchParams();

  const instId = context.instId || context.institution?.id || 1;
  const availableSeries = propAvailableSeries || context.availableSeries || [];
  const availableTests = propAvailableTests || context.availableTests || [];
  const batches = propBatches || context.batches || [];
  const students = propStudents || context.students || [];
  const onAssignTest = propOnAssignTest || context.onAssignTest;
  const toast = useToast();

  // Tab View: 'custom' (Our Question Papers & Custom Tests) vs 'catalog' (Admin Test Series)
  const [activeTab, setActiveTab] = useState('custom');

  // Custom Tests State
  const [customTests, setCustomTests] = useState([]);
  const [loadingCustom, setLoadingCustom] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewingTestId, setViewingTestId] = useState(null);
  const [assignModalCustomTest, setAssignModalCustomTest] = useState(null);
  const [customSearchQuery, setCustomSearchQuery] = useState('');
  const [customExamFilter, setCustomExamFilter] = useState('All');

  // Admin Catalog States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedSeries, setSelectedSeries] = useState(null);

  // Admin Assign Modal States
  const [assignModalItem, setAssignModalItem] = useState(null); // { id, title, type: 'test' | 'package' }
  const [targetType, setTargetType] = useState('batch'); // 'batch' | 'student' | 'institution'
  const [targetId, setTargetId] = useState('');
  const [assigning, setAssigning] = useState(false);

  // Load Custom Tests for Institution
  const fetchCustomTests = async () => {
    if (!instId) return;
    setLoadingCustom(true);
    try {
      const res = await institutionDashboardService.customTests(instId);
      if (res && Array.isArray(res.tests)) {
        setCustomTests(res.tests);
      }
    } catch (err) {
      console.warn('[customTests] Notice: could not load custom tests:', err);
    } finally {
      setLoadingCustom(false);
    }
  };

  useEffect(() => {
    fetchCustomTests();
  }, [instId]);

  // Check URL query param for direct upload action (e.g. /institution/test-series?action=upload)
  useEffect(() => {
    if (searchParams.get('action') === 'upload' || searchParams.get('mode') === 'upload') {
      setShowUploadModal(true);
      setActiveTab('custom');
    }
  }, [searchParams]);

  useEffect(() => {
    if (selectedSeries || assignModalItem || showUploadModal || viewingTestId || assignModalCustomTest) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSeries, assignModalItem, showUploadModal, viewingTestId, assignModalCustomTest]);

  // Delete Custom Test
  const handleDeleteCustomTest = async (testId, testTitle) => {
    if (!window.confirm(`Are you sure you want to delete "${testTitle}"? All questions, batch assignments, and candidate attempts for this test will be removed.`)) {
      return;
    }
    try {
      await institutionDashboardService.deleteCustomTest(instId, testId);
      toast.success('Custom test removed successfully.');
      setCustomTests((prev) => prev.filter((t) => t.id !== testId));
    } catch (err) {
      toast.error(err.message || 'Failed to delete custom test.');
    }
  };

  // Filtered Custom Tests
  const filteredCustomTests = useMemo(() => {
    return customTests.filter((t) => {
      const matchesSearch =
        !customSearchQuery ||
        t.title?.toLowerCase().includes(customSearchQuery.toLowerCase()) ||
        t.test_type?.toLowerCase().includes(customSearchQuery.toLowerCase()) ||
        t.description?.toLowerCase().includes(customSearchQuery.toLowerCase());
      const matchesExam =
        customExamFilter === 'All' ||
        t.test_type?.toLowerCase().includes(customExamFilter.toLowerCase());
      return matchesSearch && matchesExam;
    });
  }, [customTests, customSearchQuery, customExamFilter]);

  // Custom Tests Summary Metrics
  const customStats = useMemo(() => {
    const totalTests = customTests.length;
    const totalQuestions = customTests.reduce((sum, t) => sum + (Number(t.question_count) || 0), 0);
    const totalAttempts = customTests.reduce((sum, t) => sum + (Number(t.total_attempts) || 0), 0);
    const assignedTestsCount = customTests.filter((t) => Array.isArray(t.assignments) && t.assignments.length > 0).length;
    return { totalTests, totalQuestions, totalAttempts, assignedTestsCount };
  }, [customTests]);

  // Group tests into Test Series Packages DYNAMICALLY from database (Admin Catalog)
  const packages = useMemo(() => {
    let seriesList = [];

    if (availableSeries && availableSeries.length > 0) {
      seriesList = availableSeries.map((s) => {
        const examName = s.exam_type || s.exam || 'NEET / JEE';
        const isNeet = examName.toLowerCase().includes('neet');
        const isJee = examName.toLowerCase().includes('jee');

        const color = isNeet
          ? 'from-emerald-600 to-teal-500'
          : isJee
          ? 'from-blue-600 to-cyan-500'
          : 'from-purple-600 to-indigo-500';

        const badgeColor = isNeet
          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
          : isJee
          ? 'bg-blue-500/10 text-cyan-400 border-cyan-500/20'
          : 'bg-purple-500/10 text-purple-400 border-purple-500/20';

        const matchingTests = availableTests.filter((t) => {
          const testPkgId = Number(t.package_id);
          const seriesId = Number(s.id);
          const rawId = Number(s.raw?.id || s.raw?.series_id || s.raw?.package_id);

          const idMatch = Boolean(testPkgId && (testPkgId === seriesId || testPkgId === rawId));
          const titleMatch = Boolean(
            s.title &&
            t.package_name &&
            s.title.toLowerCase().trim() === t.package_name.toLowerCase().trim()
          );

          return idMatch || titleMatch;
        });

        const seriesTests = (Array.isArray(s.tests) && s.tests.length > 0)
          ? s.tests
          : matchingTests;

        const isAssigned =
          Boolean(s.is_assigned) ||
          s.status === 'Assigned Package' ||
          s.status === 'Purchased';

        const statusText = isAssigned ? 'Assigned Package' : s.status || 'Catalog Series';

        return {
          id: s.id || s.slug,
          title: s.title || s.package_name || 'Test Series Package',
          exam: examName,
          targetYear: s.target_year || 2027,
          testCount: seriesTests.length > 0 ? seriesTests.length : (s.total_tests_count || s.test_count || 1),
          description: s.description || 'Comprehensive computer-based test series package with AIETS diagnostic performance reporting.',
          status: statusText,
          isAssigned,
          validity: s.validity_days ? `${s.validity_days} Days` : '31 Mar 2027',
          color,
          badgeColor,
          tests: seriesTests,
          raw: s,
        };
      });
    } else {
      seriesList = [];
    }

    // Strict deduplication by normalized package title and canonical ID
    const dedupedMap = new Map();
    for (const item of seriesList) {
      const key = (item.title || '').toLowerCase().trim();
      if (!dedupedMap.has(key)) {
        dedupedMap.set(key, item);
      } else {
        const existing = dedupedMap.get(key);
        if (!existing.isAssigned && item.isAssigned) {
          dedupedMap.set(key, item);
        } else if (existing.isAssigned === item.isAssigned && (item.tests?.length || 0) > (existing.tests?.length || 0)) {
          dedupedMap.set(key, item);
        }
      }
    }
    const cleanSeriesList = Array.from(dedupedMap.values());

    return cleanSeriesList
      .sort((a, b) => (b.isAssigned ? 1 : 0) - (a.isAssigned ? 1 : 0))
      .filter((pkg) => {
        const matchesSearch =
          pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.exam.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory =
          categoryFilter === 'All' ||
          (categoryFilter === 'Assigned Only' && pkg.isAssigned) ||
          pkg.exam.toLowerCase().includes(categoryFilter.toLowerCase());
        return matchesSearch && matchesCategory;
      });
  }, [availableSeries, availableTests, searchQuery, categoryFilter]);

  const assignedPackages = packages.filter((p) => p.isAssigned);

  // Handle open assign modal for Admin Catalog Package
  const handleOpenAssignModal = (item) => {
    setAssignModalItem(item);
    if (batches.length > 0) {
      setTargetType('batch');
      setTargetId(String(batches[0].id));
    } else {
      setTargetType('institution');
      setTargetId('');
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!assignModalItem) return;

    if (targetType === 'batch' && batches.length > 0 && !targetId) {
      setTargetId(String(batches[0].id));
    }

    if (targetType === 'student' && students.length > 0 && !targetId) {
      setTargetId(String(students[0].id));
    }

    setAssigning(true);
    try {
      if (onAssignTest) {
        const testIds = Array.isArray(assignModalItem.tests)
          ? assignModalItem.tests.map((t) => Number(t.id)).filter((id) => !isNaN(id) && id > 0)
          : [];

        await onAssignTest(assignModalItem.id, {
          assign_to: targetType,
          target_id: targetType === 'institution' ? null : Number(targetId || (batches[0]?.id || 1)),
          is_package: true,
          type: 'package',
          package_id: assignModalItem.raw?.package_id || assignModalItem.raw?.id || assignModalItem.id,
          series_id: assignModalItem.raw?.series_id || assignModalItem.id,
          test_ids: testIds,
        });
      }
      const targetLabel =
        targetType === 'batch'
          ? batches.find((b) => Number(b.id) === Number(targetId))?.batch_name || 'Batch'
          : targetType === 'student'
          ? students.find((s) => Number(s.id) === Number(targetId))?.name || 'Student'
          : 'All Students';

      toast.success(`"${assignModalItem.title}" assigned to ${targetLabel} successfully.`);
      setAssignModalItem(null);
    } catch (err) {
      toast.error(err.message || 'Failed to assign test series.');
      setAssignModalItem(null);
    } finally {
      setAssigning(false);
    }
  };

  const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* PRIMARY HEADER & TOP TABS */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isDarkMode ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
              }`}>
                <GraduationCap className="h-3.5 w-3.5" />
                <span>Institute Assessment Suite</span>
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Self-Upload Enabled</span>
              </span>
            </div>

            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Question Papers & Test Management
            </h2>
            <p className={`text-xs mt-1 max-w-2xl leading-relaxed ${textMutedClass}`}>
              Upload and manage your own question papers manually for your students without purchasing test series packages, or assign platform-provided test packages.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 transition flex items-center gap-2 cursor-pointer active:scale-95"
            >
              <Plus className="h-4 w-4" />
              <span>Upload Question Paper / Test</span>
            </button>
          </div>
        </div>

        {/* PRIMARY VIEW NAVIGATION SWITCHER */}
        <div className={`mt-6 pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
          isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-slate-950/40 border border-slate-800/60 dark:bg-slate-950/60">
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'custom'
                  ? 'bg-indigo-600 text-white shadow-sm font-black'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileUp className="h-3.5 w-3.5" />
              <span>Our Custom Tests & Question Papers</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === 'custom' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {customTests.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'catalog'
                  ? 'bg-indigo-600 text-white shadow-sm font-black'
                  : isDarkMode
                  ? 'text-slate-400 hover:text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Platform Test Series Catalog</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                activeTab === 'catalog' ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
              }`}>
                {assignedPackages.length} Active
              </span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                if (activeTab === 'custom') fetchCustomTests();
              }}
              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
                isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
              title="Refresh Test Records"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingCustom ? 'animate-spin text-indigo-400' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: OUR CUSTOM TESTS & QUESTION PAPERS (SELF-UPLOADED) */}
      {/* ========================================================================= */}
      {activeTab === 'custom' && (
        <div className="space-y-6">
          {/* STATS STRIP */}
          {customTests.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Custom Tests</span>
                  <FileText className="h-4 w-4 text-indigo-500" />
                </div>
                <div className="text-2xl font-black text-indigo-500">{customStats.totalTests}</div>
                <span className="text-[11px] text-slate-400">Created by your institute</span>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Total Questions</span>
                  <BookOpen className="h-4 w-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-black text-emerald-500">{customStats.totalQuestions}</div>
                <span className="text-[11px] text-slate-400">Uploaded & verified</span>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Assigned Tests</span>
                  <Users className="h-4 w-4 text-cyan-500" />
                </div>
                <div className="text-2xl font-black text-cyan-500">{customStats.assignedTestsCount}</div>
                <span className="text-[11px] text-slate-400">Live for student batches</span>
              </div>

              <div
                className={`p-4 rounded-2xl border ${
                  isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between text-slate-400 mb-1">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">Submissions</span>
                  <Award className="h-4 w-4 text-purple-500" />
                </div>
                <div className="text-2xl font-black text-purple-500">{customStats.totalAttempts}</div>
                <span className="text-[11px] text-slate-400">Student attempts taken</span>
              </div>
            </div>
          )}

          {/* SEARCH & FILTERS BAR FOR CUSTOM TESTS */}
          {customTests.length > 0 && (
            <div
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
                isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="relative w-full sm:w-96">
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type="text"
                  placeholder="Search custom tests by title or exam..."
                  value={customSearchQuery}
                  onChange={(e) => setCustomSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-2 text-xs font-semibold rounded-xl border transition ${
                    isDarkMode
                      ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-500'
                      : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-indigo-600'
                  }`}
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
                <Filter className={`h-4 w-4 shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                {['All', 'NEET', 'JEE', 'Foundation', 'Academic'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCustomExamFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 cursor-pointer ${
                      customExamFilter === cat
                        ? 'bg-indigo-600 text-white shadow-xs font-black'
                        : isDarkMode
                        ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {customTests.length === 0 && !loadingCustom && (
            <div
              className={`p-8 sm:p-12 text-center rounded-3xl border space-y-6 ${
                isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="h-16 w-16 mx-auto rounded-3xl bg-gradient-to-tr from-indigo-600/30 via-indigo-600/20 to-blue-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner">
                <FileUp className="h-8 w-8" />
              </div>

              <div className="max-w-xl mx-auto space-y-2">
                <h3 className="text-xl font-black">Upload Question Papers Directly for Your Students</h3>
                <p className={`text-xs leading-relaxed ${textMutedClass}`}>
                  Don&apos;t want to purchase external test series? You can manually upload and schedule your institution&apos;s own question papers in seconds. Students practice in proctored CBT mode with automatic instant grading.
                </p>
              </div>

              {/* 3 HIGHLIGHT TILES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left pt-2">
                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-xs">⚡ Fast Paste</div>
                    <span className="text-xs font-bold">Copy & Paste</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Paste raw text questions from MS Word or PDF (e.g. Q1. ... A) ... Answer: B). Auto-parsed instantly without manual typing!
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 font-bold text-xs">📄 PDF Paper</div>
                    <span className="text-xs font-bold">Question Paper PDF</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Upload your printed question paper PDF directly. Attach a quick digital answer key for instant student score reports.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border space-y-2 ${
                  isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs">🎯 1-Click</div>
                    <span className="text-xs font-bold">Batch Assignment</span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Instantly release to specific batches or all students. Automatically updates their student dashboard with CBT timer.
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="px-6 py-3 rounded-2xl text-xs font-black bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-blue-500 text-white shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 mx-auto cursor-pointer"
                >
                  <Plus className="h-4 w-4" />
                  <span>Upload Your First Question Paper Now</span>
                </button>
              </div>
            </div>
          )}

          {/* CUSTOM TESTS GRID */}
          {filteredCustomTests.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredCustomTests.map((t) => {
                const assignedCount = Array.isArray(t.assignments) ? t.assignments.length : 0;
                const hasPdfPaper = Boolean(t.question_paper_url);
                const isAllAssigned = Array.isArray(t.assignments) && t.assignments.some((a) => a.assigned_to_type === 'institution');

                return (
                  <div
                    key={`custom-test-${t.id}`}
                    className={`rounded-2xl border flex flex-col justify-between p-5 space-y-4 transition-all hover:shadow-lg ${
                      isDarkMode
                        ? 'bg-[#0E1726] border-slate-800 text-white hover:border-indigo-500/50'
                        : 'bg-white border-slate-200 text-slate-900 shadow-sm hover:border-indigo-300'
                    }`}
                  >
                    {/* TOP BADGES */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-1.5">
                          <span className={`px-2.5 py-0.5 rounded-lg text-[10.5px] font-bold uppercase tracking-wider border ${
                            isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {t.test_type || 'Custom Test'}
                          </span>

                          {hasPdfPaper ? (
                            <span className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                              <FileText className="h-3 w-3" />
                              <span>PDF Paper</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[10.5px] font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                              <Sparkles className="h-3 w-3" />
                              <span>Online CBT</span>
                            </span>
                          )}
                        </div>

                        <span className="text-[11px] font-semibold text-slate-400">
                          {t.created_at ? new Date(t.created_at).toLocaleDateString() : 'Active'}
                        </span>
                      </div>

                      {/* TITLE & DESCRIPTION */}
                      <div>
                        <h4 className={`text-base font-black leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {t.title}
                        </h4>
                        {t.description && (
                          <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${textMutedClass}`}>
                            {t.description}
                          </p>
                        )}
                      </div>

                      {/* STATS STRIP */}
                      <div className={`grid grid-cols-3 gap-2 text-center text-xs p-3 rounded-xl border ${
                        isDarkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <div>
                          <span className="block text-[10px] font-semibold uppercase text-slate-400">Duration</span>
                          <strong className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.duration_minutes || 180}m</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] font-semibold uppercase text-slate-400">Questions</span>
                          <strong className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.question_count || 0} Qs</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] font-semibold uppercase text-slate-400">Submissions</span>
                          <strong className="text-xs font-bold text-indigo-500 dark:text-indigo-400">{t.total_attempts || 0}</strong>
                        </div>
                      </div>

                      {/* ASSIGNED STATUS */}
                      <div className="pt-1">
                        {isAllAssigned ? (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
                            <span>Assigned to All Enrolled Students</span>
                          </div>
                        ) : assignedCount > 0 ? (
                          <div className="space-y-1">
                            <span className="text-[10px] font-extrabold uppercase text-slate-400 block">Assigned Batches ({assignedCount}):</span>
                            <div className="flex flex-wrap gap-1">
                              {t.assignments.slice(0, 3).map((a, i) => (
                                <span key={i} className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                  isDarkMode ? 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                                }`}>
                                  {a.batch_name || a.student_name || 'Assigned'}
                                </span>
                              ))}
                              {assignedCount > 3 && (
                                <span className="text-[10px] font-bold text-slate-400">+{assignedCount - 3} more</span>
                              )}
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                            <span>Not assigned to batches yet</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* CARD FOOTER ACTIONS */}
                    <div className={`pt-3 border-t flex items-center gap-2 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                      <button
                        onClick={() => setViewingTestId(t.id)}
                        className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          isDarkMode
                            ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-2xs'
                        }`}
                        title="View Questions, Solutions, and Student Scores"
                      >
                        <Eye className="h-3.5 w-3.5 text-slate-400" />
                        <span>View Key & Scores</span>
                      </button>

                      <button
                        onClick={() => setAssignModalCustomTest(t)}
                        className="py-2 px-3.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                        title="Assign test to batches or all students"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Assign</span>
                      </button>

                      <button
                        onClick={() => handleDeleteCustomTest(t.id, t.title)}
                        className={`p-2 rounded-xl border transition cursor-pointer text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 ${
                          isDarkMode ? 'border-slate-800 bg-slate-900' : 'border-slate-200 bg-white'
                        }`}
                        title="Delete this custom test"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: PLATFORM TEST SERIES CATALOG (ADMIN ASSIGNED PACKAGES) */}
      {/* ========================================================================= */}
      {activeTab === 'catalog' && (
        <div className="space-y-6">
          {/* SEARCH & FILTERS TOOLBAR */}
          <div
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 ${
              isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'
            }`}
          >
            <div className="relative w-full sm:w-96">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                placeholder="Search test series by name or exam..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 text-xs font-semibold rounded-xl border transition ${
                  isDarkMode
                    ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-indigo-500'
                    : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-indigo-600 focus:bg-white shadow-2xs'
                }`}
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <Filter className={`h-4 w-4 shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              {['All', 'Assigned Only', 'NEET', 'JEE', 'Foundation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition shrink-0 cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-indigo-600 text-white shadow-sm font-black'
                      : isDarkMode
                      ? 'bg-slate-900 text-slate-300 hover:text-white border border-slate-800'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/90'
                  }`}
                >
                  {cat === 'Assigned Only' ? `✓ Assigned to Institute (${assignedPackages.length})` : cat}
                </button>
              ))}
            </div>
          </div>

          {/* FEATURED SECTION FOR ADMIN ASSIGNED PACKAGES */}
          {assignedPackages.length > 0 && categoryFilter === 'All' && !searchQuery && (
            <div
              className={`p-5 sm:p-6 rounded-2xl border space-y-4 ${
                isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
                  <h3 className="text-xs font-extrabold tracking-wider uppercase text-slate-700 dark:text-slate-300">
                    Admin Assigned Test Packages ({assignedPackages.length})
                  </h3>
                </div>
                <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                  isDarkMode
                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                }`}>
                  ✓ Unlocked & Active
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {assignedPackages.map((pkg) => (
                  <div
                    key={`assigned-feat-${pkg.id}`}
                    className={`p-5 rounded-2xl border space-y-4 transition ${
                      isDarkMode
                        ? 'border-indigo-500/30 bg-slate-900/90 text-white'
                        : 'border-indigo-200 bg-white text-slate-900 shadow-sm ring-1 ring-indigo-500/10'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${
                          isDarkMode
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          {pkg.exam}
                        </span>
                        <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                          isDarkMode
                            ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                            : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                        }`}>
                          <CheckCircle2 className="h-3 w-3" />
                          <span>Assigned</span>
                        </span>
                      </div>
                      <span className="text-xs font-semibold text-slate-400">Target {pkg.targetYear}</span>
                    </div>

                    <div>
                      <h4 className={`text-base font-bold leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{pkg.title}</h4>
                      <p className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{pkg.description}</p>
                    </div>

                    <div className={`grid grid-cols-2 gap-2 text-xs p-3 rounded-xl border ${
                      isDarkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-100'
                    }`}>
                      <div>
                        <span className="block text-[10px] font-semibold uppercase text-slate-400">Included Tests</span>
                        <strong className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{pkg.testCount} Full Mocks</strong>
                      </div>
                      <div>
                        <span className="block text-[10px] font-semibold uppercase text-slate-400">Validity</span>
                        <strong className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{pkg.validity}</strong>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <button
                        onClick={() => setSelectedSeries(pkg)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          isDarkMode
                            ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-2xs'
                        }`}
                      >
                        <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                        <span>View Included Tests</span>
                      </button>

                      <button
                        onClick={() => handleOpenAssignModal(pkg)}
                        className="flex-1 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Send className="h-3.5 w-3.5" />
                        <span>Assign to Batch</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ALL PACKAGES CATALOG GRID */}
          <div className="space-y-4">
            <h3 className={`text-base font-extrabold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <Layers className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
              <span>Full Test Series Catalog ({packages.length})</span>
            </h3>

            {packages.length === 0 ? (
              <div
                className={`p-10 text-center rounded-2xl border text-xs space-y-2 ${
                  isDarkMode ? 'bg-[#0E1726] border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600 shadow-sm'
                }`}
              >
                <p className={`font-extrabold text-sm ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>No test series packages assigned yet</p>
                <p className="max-w-md mx-auto">
                  Your institution does not have any active assigned test series packages. Platform administrators assign test series packages to partner school accounts from the Admin Portal.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`rounded-2xl border flex flex-col justify-between p-5 space-y-4 transition-all hover:shadow-md ${
                      pkg.isAssigned
                        ? isDarkMode
                          ? 'bg-[#0E1726] border-indigo-500/40 text-white shadow-sm'
                          : 'bg-white border-indigo-200 text-slate-900 shadow-sm ring-1 ring-indigo-500/10'
                        : isDarkMode
                        ? 'bg-[#0E1726] border-slate-800 text-white'
                        : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                    }`}
                  >
                    {/* TOP METADATA ROW */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold uppercase tracking-wider border ${
                            isDarkMode
                              ? 'bg-slate-800 text-slate-300 border-slate-700'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            {pkg.exam}
                          </span>
                          {pkg.isAssigned && (
                            <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                              isDarkMode
                                ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                                : 'bg-indigo-50 text-indigo-700 border-indigo-200'
                            }`}>
                              <CheckCircle2 className="h-3 w-3" />
                              <span>Assigned</span>
                            </span>
                          )}
                        </div>
                        <span className="text-xs font-semibold text-slate-400">Target {pkg.targetYear}</span>
                      </div>

                      <div>
                        <h4 className={`text-base font-bold leading-snug line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{pkg.title}</h4>
                        <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{pkg.description}</p>
                      </div>

                      <div className={`grid grid-cols-2 gap-2 text-xs p-3 rounded-xl border ${
                        isDarkMode ? 'bg-slate-950 border-slate-800/80' : 'bg-slate-50 border-slate-100'
                      }`}>
                        <div>
                          <span className="block text-[10px] font-semibold uppercase text-slate-400">Tests</span>
                          <strong className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{pkg.testCount} Full Mocks</strong>
                        </div>
                        <div>
                          <span className="block text-[10px] font-semibold uppercase text-slate-400">Validity</span>
                          <strong className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{pkg.validity}</strong>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS ROW */}
                    <div className={`pt-3 border-t flex items-center gap-2 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                      <button
                        onClick={() => setSelectedSeries(pkg)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                          isDarkMode
                            ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 shadow-2xs'
                        }`}
                      >
                        <BookOpen className="h-3.5 w-3.5 text-slate-400" />
                        <span>Included Tests</span>
                      </button>

                      {pkg.isAssigned ? (
                        <button
                          onClick={() => handleOpenAssignModal(pkg)}
                          className="flex-1 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Send className="h-3.5 w-3.5" />
                          <span>Assign to Batch</span>
                        </button>
                      ) : (
                        <button
                          disabled
                          className={`flex-1 py-2 rounded-xl text-xs font-bold border cursor-not-allowed flex items-center justify-center gap-1.5 opacity-65 ${
                            isDarkMode
                              ? 'border-slate-800 bg-slate-900/60 text-slate-500'
                              : 'border-slate-200 bg-slate-100 text-slate-400'
                          }`}
                          title="Contact Platform Admin to assign this test package to your institution"
                        >
                          <span>Not Assigned</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS */}
      {/* ========================================================================= */}

      {/* 1. UPLOAD CUSTOM TEST MODAL */}
      <UploadCustomTestModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        instId={instId}
        batches={batches}
        onTestCreated={(newTest) => {
          fetchCustomTests();
        }}
        isDarkMode={isDarkMode}
      />

      {/* 2. VIEW CUSTOM TEST MODAL */}
      <ViewCustomTestModal
        isOpen={Boolean(viewingTestId)}
        onClose={() => setViewingTestId(null)}
        testId={viewingTestId}
        instId={instId}
        batches={batches}
        onTestDeleted={(deletedId) => {
          setCustomTests((prev) => prev.filter((t) => t.id !== deletedId));
        }}
        onOpenAssign={(test) => {
          setViewingTestId(null);
          setAssignModalCustomTest(test);
        }}
        isDarkMode={isDarkMode}
      />

      {/* 3. ASSIGN CUSTOM TEST MODAL */}
      <AssignCustomTestModal
        isOpen={Boolean(assignModalCustomTest)}
        onClose={() => setAssignModalCustomTest(null)}
        test={assignModalCustomTest}
        instId={instId}
        batches={batches}
        onAssigned={() => {
          fetchCustomTests();
        }}
        isDarkMode={isDarkMode}
      />

      {/* 4. SELECTED CATALOG SERIES TESTS DRAWER MODAL */}
      {selectedSeries && (
        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className={`w-full max-w-2xl rounded-2xl border p-6 space-y-4 max-h-[85vh] overflow-y-auto my-auto shadow-2xl relative ${
              isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'}`}>
              <div>
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">{selectedSeries.exam}</span>
                <h3 className={`text-lg font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{selectedSeries.title}</h3>
              </div>
              <button
                onClick={() => setSelectedSeries(null)}
                className={`p-2 rounded-xl transition cursor-pointer ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <p className={`text-xs ${textMutedClass}`}>Included Mock Examinations in this package:</p>
              {(() => {
                const modalTests = (selectedSeries.tests && selectedSeries.tests.length > 0)
                  ? selectedSeries.tests
                  : availableTests.filter((t) => {
                      const testPkgId = Number(t.package_id);
                      const seriesId = Number(selectedSeries.id);
                      const rawId = Number(selectedSeries.raw?.id || selectedSeries.raw?.series_id || selectedSeries.raw?.package_id);

                      const idMatch = Boolean(testPkgId && (testPkgId === seriesId || testPkgId === rawId));
                      const titleMatch = Boolean(
                        selectedSeries.title &&
                        t.package_name &&
                        selectedSeries.title.toLowerCase().trim() === t.package_name.toLowerCase().trim()
                      );

                      return idMatch || titleMatch;
                    });
                
                const listToDisplay = modalTests;

                if (listToDisplay.length === 0) {
                  return (
                    <div className={`text-center py-8 text-xs space-y-2 ${textMutedClass}`}>
                      <FileText className="h-8 w-8 mx-auto text-slate-500 opacity-60 mb-2" />
                      <p className="font-semibold text-slate-200">No Tests Linked to This Package</p>
                      <p className="max-w-xs mx-auto text-slate-400">
                        {selectedSeries.isAssigned
                          ? 'This test package is active for your institution, but tests have not been linked to it yet in the admin panel.'
                          : 'Contact your Platform Administrator to unlock this test series package for your institution.'}
                      </p>
                    </div>
                  );
                }

                return listToDisplay.map((t, idx) => (
                  <div
                    key={t.id || idx}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                      isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          isDarkMode ? 'bg-slate-800 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                        }`}>
                          Mock #{idx + 1}
                        </span>
                        <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.test_name || t.title || `AIETS Full Length Mock Test #${idx + 1}`}</h4>
                      </div>
                      <p className={`text-[11px] ${textMutedClass}`}>
                        {t.duration_minutes || 180} Mins • {t.max_marks || 300} Marks • NEET / JEE CBT Pattern
                      </p>
                    </div>
                    {selectedSeries.isAssigned ? (
                      <button
                        onClick={() => {
                          setSelectedSeries(null);
                          handleOpenAssignModal({ id: t.id, title: t.test_name || t.title, type: 'test' });
                        }}
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white hover:bg-indigo-500 transition cursor-pointer flex items-center gap-1 shrink-0"
                      >
                        <Send className="h-3 w-3" />
                        <span>Assign</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border cursor-not-allowed flex items-center gap-1 shrink-0 opacity-60 ${
                          isDarkMode
                            ? 'border-slate-800 bg-slate-900/60 text-slate-500'
                            : 'border-slate-200 bg-slate-100 text-slate-400'
                        }`}
                        title="Contact Platform Admin to assign this test package to your institution"
                      >
                        <span>Not Assigned by Admin</span>
                      </button>
                    )}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      )}

      {/* 5. ASSIGN CATALOG PACKAGE TO BATCH MODAL */}
      {assignModalItem && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`w-full max-w-lg rounded-2xl border p-6 sm:p-7 space-y-5 shadow-2xl relative my-auto animate-in zoom-in-95 ${
              isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-500">Assign Package</span>
                <h3 className={`text-base sm:text-lg font-black leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  {assignModalItem.title}
                </h3>
              </div>
              <button
                onClick={() => setAssignModalItem(null)}
                className={`p-2 rounded-xl transition cursor-pointer ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
              <div>
                <label className={`block font-extrabold uppercase mb-2 ${textMutedClass}`}>Select Target Assignment Scope</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetType('batch');
                      if (batches.length > 0) setTargetId(String(batches[0].id));
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      targetType === 'batch'
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : isDarkMode
                        ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Batch</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetType('student');
                      if (students.length > 0) setTargetId(String(students[0].id));
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      targetType === 'student'
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : isDarkMode
                        ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <User className="h-3.5 w-3.5" />
                    <span>Student</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setTargetType('institution');
                      setTargetId('');
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      targetType === 'institution'
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow-sm'
                        : isDarkMode
                        ? 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                        : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <Building2 className="h-3.5 w-3.5" />
                    <span>School</span>
                  </button>
                </div>
              </div>

              {targetType === 'batch' && (
                <div>
                  <label className={`block font-extrabold uppercase mb-1.5 ${textMutedClass}`}>Target Academic Batch</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                    className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      isDarkMode
                        ? 'border-slate-800 bg-slate-900 text-slate-200'
                        : 'border-slate-300 bg-slate-50 text-slate-900'
                    }`}
                  >
                    {batches.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.batch_name || b.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {targetType === 'student' && (
                <div>
                  <label className={`block font-extrabold uppercase mb-1.5 ${textMutedClass}`}>Target Enrolled Student</label>
                  <select
                    value={targetId}
                    onChange={(e) => setTargetId(e.target.value)}
                    required
                    className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold transition cursor-pointer ${
                      isDarkMode
                        ? 'border-slate-800 bg-slate-900 text-slate-200'
                        : 'border-slate-300 bg-slate-50 text-slate-900'
                    }`}
                  >
                    {students.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.roll_number || s.email})
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className={`pt-3 border-t flex justify-end gap-3 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                <button
                  type="button"
                  onClick={() => setAssignModalItem(null)}
                  className={`px-4 py-2 rounded-xl border font-bold ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={assigning}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 font-bold text-white shadow-sm disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>{assigning ? 'Assigning...' : 'Confirm Assignment'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
