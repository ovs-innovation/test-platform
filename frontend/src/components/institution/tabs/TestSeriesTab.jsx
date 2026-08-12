import { useState, useMemo, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  Award,
  ArrowRight,
  BookOpen,
  Send,
  Clock,
  Sparkles,
} from 'lucide-react';

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

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedSeries, setSelectedSeries] = useState(null);

  useEffect(() => {
    if (selectedSeries) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedSeries]);

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

        const matchingTests = availableTests.filter((t) =>
          (t.category || t.test_type || t.test_name || '').toLowerCase().includes(examName.toLowerCase()) ||
          (t.package_id && Number(t.package_id) === Number(s.id))
        );

        return {
          id: s.id || s.slug,
          title: s.title || s.package_name || 'Test Series Package',
          exam: examName,
          targetYear: s.target_year || 2027,
          testCount: s.total_tests_count || s.test_count || matchingTests.length || 15,
          description: s.description || 'Comprehensive computer-based test series package with AIETS diagnostic performance reporting.',
          status: 'Active Package',
          validity: s.validity_days ? `${s.validity_days} Days` : '31 Mar 2027',
          color,
          badgeColor,
          tests: matchingTests,
          raw: s,
        };
      });
    } else {
      seriesList = [
        {
          id: 'series-neet-2027',
          title: 'NEET-UG 2027 All India Test Series (AIETS)',
          exam: 'NEET UG',
          targetYear: 2027,
          testCount: availableTests.filter((t) => (t.category || '').toLowerCase().includes('neet') || (t.title || '').toLowerCase().includes('neet')).length || 18,
          description: 'Comprehensive NTA-standard NEET-UG full syllabus and chapterwise mock test series with detailed solutions.',
          status: 'Active Package',
          validity: '31 Mar 2027',
          color: 'from-emerald-600 to-teal-500',
          badgeColor: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
          tests: availableTests.filter((t) => (t.category || '').toLowerCase().includes('neet') || (t.title || '').toLowerCase().includes('neet')),
        },
        {
          id: 'series-jee-2027',
          title: 'JEE Main & Advanced 2027 Master Test Series',
          exam: 'JEE Main & Advanced',
          targetYear: 2027,
          testCount: availableTests.filter((t) => (t.category || '').toLowerCase().includes('jee') || (t.title || '').toLowerCase().includes('jee')).length || 15,
          description: 'Rigorous Computer Based Test (CBT) mock series for JEE Main & Advanced prep with rank prediction.',
          status: 'Active Package',
          validity: '31 Mar 2027',
          color: 'from-blue-600 to-cyan-500',
          badgeColor: 'bg-blue-500/10 text-cyan-400 border-cyan-500/20',
          tests: availableTests.filter((t) => (t.category || '').toLowerCase().includes('jee') || (t.title || '').toLowerCase().includes('jee')),
        },
        {
          id: 'series-foundation-2027',
          title: 'Class 10 Foundation Olympiad & NTSE Test Series',
          exam: 'Foundation (Class 10)',
          targetYear: 2026,
          testCount: 8,
          description: 'Early booster test series covering Class 10 Science, Math & Mental Ability for Olympiad readiness.',
          status: 'Included',
          validity: '31 Dec 2026',
          color: 'from-purple-600 to-indigo-500',
          badgeColor: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
          tests: [],
        },
      ];
    }

    return seriesList.filter((pkg) => {
      const matchesSearch =
        pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pkg.exam.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'All' || pkg.exam.toLowerCase().includes(categoryFilter.toLowerCase());
      return matchesSearch && matchesCategory;
    });
  }, [availableSeries, availableTests, searchQuery, categoryFilter]);

  return (
    <div className="space-y-6">
      {/* HEADER STRIP */}
      <div className={`p-5 sm:p-6 rounded-2xl border ${
        isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-cyan-400 border border-cyan-500/20 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Purchased Test Series Packages</span>
            </div>
            <h2 className="text-xl font-black tracking-tight">Institutional Test Series Catalog</h2>
            <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Browse and assign entire test series packages to your enrolled batches and students.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Series</span>
              <span className="text-base font-extrabold text-cyan-400">{packages.length} Packages</span>
            </div>
            <div className={`px-4 py-2 rounded-2xl border text-center ${
              isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Mock Tests</span>
              <span className="text-base font-extrabold text-emerald-400">{availableTests.length || 39} Tests</span>
            </div>
          </div>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-800/40">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search test series by name or exam..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-xl border transition ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500' : 'bg-slate-100 border-slate-200 text-slate-900 placeholder-slate-400'
              }`}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-400" />
            {['All', 'NEET', 'JEE', 'Foundation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                  categoryFilter === cat
                    ? 'bg-blue-600 text-white shadow-md'
                    : isDarkMode
                      ? 'bg-slate-900 text-slate-400 hover:text-white'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PACKAGE CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`rounded-2xl border flex flex-col overflow-hidden transition-all hover:shadow-md ${
              isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-2xs'
            }`}
          >
            {/* CARD BANNER HEADER */}
            <div className={`p-5 bg-gradient-to-r ${pkg.color} text-white space-y-3`}>
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
              <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                {pkg.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs py-2 border-y border-slate-800/40">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Included Tests</span>
                  <strong className="text-sm font-extrabold text-cyan-400">{pkg.testCount} Full Mocks</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold uppercase">Package Validity</span>
                  <strong className="text-sm font-extrabold text-emerald-400">{pkg.validity}</strong>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  onClick={() => setSelectedSeries(pkg)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold border transition flex items-center justify-center gap-1.5 ${
                    isDarkMode
                      ? 'border-slate-800 bg-slate-900 text-slate-200 hover:bg-slate-800 hover:text-white'
                      : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5" />
                  <span>View Tests</span>
                </button>

                <button
                  onClick={() => onAssignTest && onAssignTest()}
                  className="flex-1 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md hover:scale-[1.02] transition flex items-center justify-center gap-1.5"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Assign Series</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SELECTED SERIES TESTS DRAWER MODAL */}
      {selectedSeries && (
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className={`w-full max-w-2xl rounded-3xl border p-6 space-y-4 max-h-[85vh] overflow-y-auto my-auto ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800/40 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{selectedSeries.exam}</span>
                <h3 className="text-lg font-black">{selectedSeries.title}</h3>
              </div>
              <button
                onClick={() => setSelectedSeries(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <p className="text-xs text-slate-400">Included Mock Examinations in this package:</p>
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
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-cyan-400 border border-cyan-500/20">
                          Mock #{idx + 1}
                        </span>
                        <h4 className="text-xs font-bold">{t.title || `AIETS Full Length Mock Test #${idx + 1}`}</h4>
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {t.duration_minutes || 180} Mins • {t.total_marks || 720} Marks • NTA CBT Pattern
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSeries(null);
                        onAssignTest && onAssignTest(t.id);
                      }}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition"
                    >
                      Assign
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-400 text-xs">
                  All tests in this series are active and automatically enabled for assigned batches.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
