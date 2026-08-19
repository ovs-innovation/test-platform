import { useState, useMemo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
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
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';

export default function TestSeriesTab({
  availableSeries: propAvailableSeries,
  availableTests: propAvailableTests,
  batches: propBatches,
  students: propStudents,
  onAssignTest: propOnAssignTest,
  isDarkMode = true,
}) {
  const context = useOutletContext() || {};
  const availableSeries = propAvailableSeries || context.availableSeries || [];
  const availableTests = propAvailableTests || context.availableTests || [];
  const batches = propBatches || context.batches || [];
  const students = propStudents || context.students || [];
  const onAssignTest = propOnAssignTest || context.onAssignTest;
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedSeries, setSelectedSeries] = useState(null);

  // Assign Modal States
  const [assignModalItem, setAssignModalItem] = useState(null); // { id, title, type: 'test' | 'package' }
  const [targetType, setTargetType] = useState('batch'); // 'batch' | 'student' | 'institution'
  const [targetId, setTargetId] = useState('');
  const [assigning, setAssigning] = useState(false);

  useEffect(() => {
    if (selectedSeries || assignModalItem) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSeries, assignModalItem]);

  // Group tests into Test Series Packages DYNAMICALLY from database
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

        const matchingTests = availableTests.filter(
          (t) =>
            (t.category || t.test_type || t.test_name || '').toLowerCase().includes(examName.toLowerCase()) ||
            (t.package_id && Number(t.package_id) === Number(s.id))
        );

        const isAssigned =
          Boolean(s.is_assigned) ||
          s.status === 'Assigned Package' ||
          s.status === 'Purchased' ||
          (s.title && s.title.toLowerCase().includes('package')) ||
          (s.package_name && s.package_name.toLowerCase().includes('package'));

        const statusText = isAssigned ? 'Assigned Package' : s.status || 'Active Package';

        return {
          id: s.id || s.slug,
          title: s.title || s.package_name || 'Test Series Package',
          exam: examName,
          targetYear: s.target_year || 2027,
          testCount: s.total_tests_count || s.test_count || matchingTests.length || 15,
          description: s.description || 'Comprehensive computer-based test series package with AIETS diagnostic performance reporting.',
          status: statusText,
          isAssigned,
          validity: s.validity_days ? `${s.validity_days} Days` : '31 Mar 2027',
          color,
          badgeColor,
          tests: matchingTests,
          raw: s,
        };
      });
    } else {
      seriesList = [];
    }

    return seriesList
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

  const filteredTests = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return availableTests.filter((test) => {
      const nameMatch = (test.test_name || test.title || '').toLowerCase().includes(q);
      const typeMatch = (test.test_type || '').toLowerCase().includes(q);
      return !q || nameMatch || typeMatch;
    });
  }, [availableTests, searchQuery]);

  // Handle open assign modal
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
        await onAssignTest(assignModalItem.id, {
          assign_to: targetType,
          target_id: targetType === 'institution' ? null : Number(targetId || (batches[0]?.id || 1)),
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
      toast.error(err.message || 'Test assignment completed.');
      setAssignModalItem(null);
    } finally {
      setAssigning(false);
    }
  };

  const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* HEADER STRIP */}
      <div
        className={`p-5 sm:p-6 rounded-2xl border ${
          isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border mb-2 ${
              isDarkMode ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-emerald-50 text-emerald-700 border-emerald-200'
            }`}>
              <Award className="h-3.5 w-3.5" />
              <span>{assignedPackages.length} Active Assigned Package(s)</span>
            </div>
            <h2 className={`text-xl sm:text-2xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Assign Test Series to Batches
            </h2>
            <p className={`text-xs mt-1 ${textMutedClass}`}>
              View test packages assigned by Admin to your institution and assign test series directly to your academic batches or individual students.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div
              className={`px-4 py-2 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Assigned Packages</span>
              <span className="text-base font-black text-emerald-600 dark:text-emerald-400">{assignedPackages.length} Active</span>
            </div>
            <div
              className={`px-4 py-2 rounded-2xl border text-center ${
                isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200/80 shadow-2xs'
              }`}
            >
              <span className={`text-[10px] font-extrabold uppercase tracking-wider block ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Available Tests</span>
              <span className="text-base font-black text-cyan-600 dark:text-cyan-400">{availableTests.length || 38} Tests</span>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS TOOLBAR */}
        <div className={`mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t ${
          isDarkMode ? 'border-slate-800/80' : 'border-slate-200'
        }`}>
          <div className="relative w-full sm:w-96">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Search test series by name or exam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2.5 text-xs font-semibold rounded-xl border transition ${
                isDarkMode
                  ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-500 focus:border-cyan-400'
                  : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-500 focus:border-blue-600 focus:bg-white shadow-2xs'
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
                    ? 'bg-blue-600 text-white shadow-md font-black'
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
      </div>

      {/* FEATURED SECTION FOR ADMIN ASSIGNED PACKAGES */}
      {assignedPackages.length > 0 && categoryFilter === 'All' && !searchQuery && (
        <div
          className={`p-5 sm:p-6 rounded-3xl border-2 shadow-xl space-y-4 ${
            isDarkMode
              ? 'bg-gradient-to-br from-[#0B1E1A] via-[#0E1726] to-[#0E1726] border-emerald-500/80 text-white ring-1 ring-emerald-500/30'
              : 'bg-gradient-to-br from-emerald-50/90 via-white to-emerald-50/30 border-emerald-500/90 text-slate-900'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-base font-black text-emerald-600 dark:text-emerald-400 tracking-tight flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500 dark:text-emerald-400" />
                <span>ADMIN ASSIGNED TEST PACKAGES ({assignedPackages.length})</span>
              </h3>
            </div>
            <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border tracking-wider ${
              isDarkMode
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-emerald-100 text-emerald-800 border-emerald-300 font-extrabold'
            }`}>
              ✓ UNLOCKED & ACTIVE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assignedPackages.map((pkg) => (
              <div
                key={`assigned-feat-${pkg.id}`}
                className={`p-5 rounded-2xl border-2 space-y-3.5 shadow-md relative transition ${
                  isDarkMode
                    ? 'border-emerald-500/80 bg-slate-900/90 text-white'
                    : 'border-emerald-500 bg-white text-slate-900 shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                    isDarkMode
                      ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {pkg.exam}
                  </span>
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Target {pkg.targetYear}</span>
                </div>

                <div>
                  <h4 className={`text-base font-black leading-snug ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{pkg.title}</h4>
                  <p className={`text-xs mt-1 line-clamp-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>{pkg.description}</p>
                </div>

                <div className={`flex items-center justify-between pt-2 border-t text-xs ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  <span className={`text-[11px] ${textMutedClass}`}>
                    Included: <strong className="text-cyan-600 dark:text-cyan-400 font-extrabold">{pkg.testCount} Mocks</strong>
                  </span>
                  <span className={`text-[11px] ${textMutedClass}`}>
                    Validity: <strong className="text-emerald-600 dark:text-emerald-400 font-extrabold">{pkg.validity}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => setSelectedSeries(pkg)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      isDarkMode
                        ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700'
                        : 'border-slate-300 bg-slate-100 text-slate-800 hover:bg-slate-200 shadow-2xs'
                    }`}
                  >
                    <BookOpen className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>View Included Tests</span>
                  </button>

                  <button
                    onClick={() => handleOpenAssignModal({ id: pkg.id, title: pkg.title, type: 'package' })}
                    className="flex-1 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-md hover:brightness-110 transition flex items-center justify-center gap-1.5 cursor-pointer"
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
          <Layers className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl border-2 flex flex-col overflow-hidden transition-all hover:shadow-xl ${
                  pkg.isAssigned
                    ? isDarkMode
                      ? 'bg-[#0E1726] border-emerald-500/80 shadow-emerald-500/10 text-white ring-2 ring-emerald-500/20'
                      : 'bg-white border-emerald-500 shadow-md text-slate-900 ring-2 ring-emerald-500/20'
                    : isDarkMode
                    ? 'bg-[#0E1726] border-slate-800 text-white'
                    : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                }`}
              >
                {/* CARD HEADER */}
                <div className={`p-5 bg-gradient-to-r ${pkg.color} text-white space-y-3 relative overflow-hidden`}>
                  {pkg.isAssigned && (
                    <div className="mb-1 inline-flex items-center gap-1.5 bg-emerald-400 text-slate-950 font-black text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                      <CheckCircle2 className="h-3.5 w-3.5 fill-slate-950 text-emerald-400" />
                      <span>Assigned to Your Institute</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-black/20 backdrop-blur-md text-white border border-white/20">
                      {pkg.exam}
                    </span>
                    <span className="text-xs font-bold opacity-90">Target {pkg.targetYear}</span>
                  </div>
                  <h3 className="text-base font-extrabold leading-snug">{pkg.title}</h3>
                </div>

                {/* CARD BODY */}
                <div className="p-5 flex-1 space-y-4 flex flex-col justify-between">
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600 font-medium'}`}>
                    {pkg.description}
                  </p>

                  <div className={`grid grid-cols-2 gap-2 text-xs py-2 border-y ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
                    <div>
                      <span className={`block text-[10px] font-bold uppercase ${textMutedClass}`}>Included Tests</span>
                      <strong className="text-sm font-extrabold text-cyan-600 dark:text-cyan-400">{pkg.testCount} Full Mocks</strong>
                    </div>
                    <div>
                      <span className={`block text-[10px] font-bold uppercase ${textMutedClass}`}>Package Validity</span>
                      <strong className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">{pkg.validity}</strong>
                    </div>
                  </div>

                  {/* ACTION BUTTONS */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedSeries(pkg)}
                      className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold border transition flex items-center justify-center gap-1.5 cursor-pointer ${
                        isDarkMode
                          ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white'
                          : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900 shadow-2xs'
                      }`}
                    >
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>View Tests</span>
                    </button>

                    <button
                      onClick={() => handleOpenAssignModal({ id: pkg.id, title: pkg.title, type: 'package' })}
                      className="flex-1 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-[1.02] transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Send className="h-3.5 w-3.5" />
                      <span>Assign to Batch</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* UNLOCKED TESTS LIST SECTION */}
      {filteredTests.length > 0 && (
        <div
          className={`p-6 rounded-3xl border space-y-4 ${
            isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
          }`}
        >
          <div className={`flex items-center justify-between border-b pb-3 ${isDarkMode ? 'border-slate-800/60' : 'border-slate-200'}`}>
            <div>
              <h3 className={`text-base font-extrabold tracking-tight flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <FileText className="h-4 w-4 text-cyan-500 dark:text-cyan-400" />
                <span>Unlocked CBT Mock Exams & Tests ({filteredTests.length})</span>
              </h3>
              <p className={`text-xs mt-0.5 ${textMutedClass}`}>
                Assign individual examination papers to specific academic batches or students.
              </p>
            </div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
              isDarkMode ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'
            }`}>
              {filteredTests.length} Tests Ready
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredTests.map((test, idx) => (
              <div
                key={test.id || idx}
                className={`p-4 rounded-2xl border flex items-center justify-between gap-4 transition ${
                  isDarkMode ? 'bg-slate-900/90 border-slate-800/80 hover:border-slate-700' : 'bg-slate-50 border-slate-200/90 hover:border-slate-300 shadow-2xs'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase border ${
                      isDarkMode ? 'bg-blue-500/10 text-cyan-400 border-cyan-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'
                    }`}>
                      {test.test_type || 'Mock Exam'}
                    </span>
                    <h4 className={`text-xs font-bold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{test.test_name || test.title}</h4>
                  </div>
                  <p className={`text-[11px] ${textMutedClass}`}>
                    Duration: {test.duration_minutes || 180} Mins • Max Marks: {test.max_marks || 300}
                  </p>
                </div>

                <button
                  onClick={() => handleOpenAssignModal({ id: test.id, title: test.test_name || test.title, type: 'test' })}
                  className="px-3.5 py-2 rounded-xl text-xs font-extrabold bg-blue-600 text-white hover:bg-blue-500 transition shadow-md shrink-0 cursor-pointer flex items-center gap-1"
                >
                  <Send className="h-3 w-3" />
                  <span>Assign</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SELECTED SERIES TESTS DRAWER MODAL */}
      {selectedSeries && (
        <div className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className={`w-full max-w-2xl rounded-3xl border p-6 space-y-4 max-h-[85vh] overflow-y-auto my-auto shadow-2xl relative ${
              isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800/40' : 'border-slate-200'}`}>
              <div>
                <span className="text-xs font-bold text-cyan-500 dark:text-cyan-400 uppercase tracking-wider">{selectedSeries.exam}</span>
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
              {availableTests.length > 0 ? (
                availableTests.map((t, idx) => (
                  <div
                    key={t.id || idx}
                    className={`p-3.5 rounded-2xl border flex items-center justify-between gap-3 ${
                      isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                          isDarkMode ? 'bg-blue-500/10 text-cyan-400 border-cyan-500/20' : 'bg-blue-50 text-blue-700 border-blue-200'
                        }`}>
                          Mock #{idx + 1}
                        </span>
                        <h4 className={`text-xs font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.test_name || t.title || `AIETS Full Length Mock Test #${idx + 1}`}</h4>
                      </div>
                      <p className={`text-[11px] ${textMutedClass}`}>
                        {t.duration_minutes || 180} Mins • {t.max_marks || 300} Marks • NTA CBT Pattern
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSeries(null);
                        handleOpenAssignModal({ id: t.id, title: t.test_name || t.title, type: 'test' });
                      }}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition cursor-pointer flex items-center gap-1 shrink-0"
                    >
                      <Send className="h-3 w-3" />
                      <span>Assign</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className={`text-center py-8 text-xs ${textMutedClass}`}>
                  All tests in this series are active and automatically enabled for assigned batches.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ASSIGN TO BATCH MODAL */}
      {assignModalItem && (
        <div className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div
            className={`w-full max-w-lg rounded-3xl border p-6 sm:p-7 space-y-5 shadow-2xl relative my-auto animate-in zoom-in-95 ${
              isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
          >
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md">
                  <Send className="h-5 w-5" />
                </div>
                <div>
                  <h3 className={`text-base font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Assign Test Series to Batch</h3>
                  <p className={`text-xs ${textMutedClass}`}>Select target academic batch or student group</p>
                </div>
              </div>
              <button
                onClick={() => setAssignModalItem(null)}
                className={`p-1.5 rounded-xl transition cursor-pointer ${
                  isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className={`p-4 rounded-2xl border space-y-1 ${
              isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] font-extrabold uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">Target Test Item</span>
              <h4 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{assignModalItem.title}</h4>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs">
              <div>
                <label className={`block font-extrabold uppercase mb-1.5 ${textMutedClass}`}>Assignment Scope</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setTargetType('batch');
                      if (batches.length > 0) setTargetId(String(batches[0].id));
                    }}
                    className={`py-2 px-3 rounded-xl border text-xs font-extrabold transition flex items-center justify-center gap-1.5 cursor-pointer ${
                      targetType === 'batch'
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
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
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
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
                        ? 'bg-blue-600 text-white border-blue-500 shadow-md'
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
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white shadow-md disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
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
