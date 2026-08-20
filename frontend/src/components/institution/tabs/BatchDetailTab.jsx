import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  ArrowLeft,
  Users,
  Plus,
  Upload,
  Search,
  BookOpen,
  TrendingUp,
  Award,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  CheckSquare,
  Square,
  FileText,
  Filter
} from 'lucide-react';
import { institutionDashboardService } from '../../../lib/services.js';
import { useToast } from '../../../context/ToastContext.jsx';
import { Spinner, CustomSelectDropdown } from '../../ui.jsx';

export default function BatchDetailTab({
  instId,
  masterStudents = [],
  allTestSeries = [],
  allAvailableTests = [],
  isDarkMode = true,
}) {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [activeTab, setActiveTab] = useState('students');
  const [loading, setLoading] = useState(true);
  const [batch, setBatch] = useState(null);
  const [batchStudents, setBatchStudents] = useState([]);
  const [batchTests, setBatchTests] = useState([]);
  const [performance, setPerformance] = useState(null);
  const [search, setSearch] = useState('');

  // Modals state
  const [showAddStudentsModal, setShowAddStudentsModal] = useState(false);
  const [showBulkAddModal, setShowBulkAddModal] = useState(false);
  const [showAssignTestModal, setShowAssignTestModal] = useState(false);

  // Add Students modal states
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [modalSearch, setModalSearch] = useState('');
  const [modalClassFilter, setModalClassFilter] = useState('All');
  const [modalExamFilter, setModalExamFilter] = useState('All');
  const [modalAssignmentFilter, setModalAssignmentFilter] = useState('Unassigned'); // 'Unassigned' or 'All'
  const [submittingAdd, setSubmittingAdd] = useState(false);
  const [addError, setAddError] = useState('');

  // Assign test modal states
  const [selectedTestId, setSelectedTestId] = useState('');
  const [submittingAssignTest, setSubmittingAssignTest] = useState(false);

  // Remove confirmation modal state
  const [confirmRemoveStudent, setConfirmRemoveStudent] = useState(null);

  useEffect(() => {
    if (batchId && instId) {
      loadBatchData();
    }
  }, [batchId, instId]);

  const loadBatchData = async () => {
    setLoading(true);
    try {
      const [detailRes, studentsRes, testsRes, perfRes] = await Promise.all([
        institutionDashboardService.batchDetail(instId, batchId).catch(() => null),
        institutionDashboardService.batchStudents(instId, batchId).catch(() => null),
        institutionDashboardService.batchTestSeries(instId, batchId).catch(() => null),
        institutionDashboardService.batchPerformance(instId, batchId).catch(() => null),
      ]);

      if (detailRes?.batch) setBatch(detailRes.batch);
      if (studentsRes?.students) setBatchStudents(studentsRes.students);
      if (testsRes?.tests) setBatchTests(testsRes.tests);
      if (perfRes?.performance) setPerformance(perfRes.performance);
    } catch (err) {
      toast.error('Failed to load batch details');
    } finally {
      setLoading(false);
    }
  };

  // Filter batch students
  const filteredBatchStudents = useMemo(() => {
    return batchStudents.filter(
      (st) =>
        (st.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (st.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (st.roll_number || '').toLowerCase().includes(search.toLowerCase())
    );
  }, [batchStudents, search]);

  // Master students available for assignment
  const eligibleMasterStudents = useMemo(() => {
    return masterStudents.filter((st) => {
      const matchesSearch =
        (st.name || '').toLowerCase().includes(modalSearch.toLowerCase()) ||
        (st.email || '').toLowerCase().includes(modalSearch.toLowerCase()) ||
        (st.roll_number || '').toLowerCase().includes(modalSearch.toLowerCase());

      const matchesClass =
        modalClassFilter === 'All' ||
        (st.class_level || st.class || '').toLowerCase().includes(modalClassFilter.toLowerCase());

      const matchesExam =
        modalExamFilter === 'All' ||
        (st.target_exam || '').toLowerCase().includes(modalExamFilter.toLowerCase());

      const matchesAssignment =
        modalAssignmentFilter === 'All' ||
        (modalAssignmentFilter === 'Unassigned' && !st.batch_id);

      return matchesSearch && matchesClass && matchesExam && matchesAssignment;
    });
  }, [masterStudents, modalSearch, modalClassFilter, modalExamFilter, modalAssignmentFilter]);

  // Capacity calculations
  const maxCapacity = batch?.max_capacity || 50;
  const currentCount = batchStudents.length;
  const availableSeats = Math.max(0, maxCapacity - currentCount);

  // Check if selected additions exceed capacity
  const isCapacityExceeded = selectedStudentIds.length > availableSeats;

  // Add students handler
  const handleAddSelectedStudents = async () => {
    if (selectedStudentIds.length === 0) return;
    if (isCapacityExceeded) {
      setAddError(`Batch capacity exceeded. ${availableSeats} seat(s) available, but ${selectedStudentIds.length} student(s) selected.`);
      return;
    }

    setSubmittingAdd(true);
    setAddError('');
    try {
      const res = await institutionDashboardService.addStudentsToBatch(instId, batchId, selectedStudentIds);
      toast.success(res.message || `${selectedStudentIds.length} student(s) added to batch`);
      setShowAddStudentsModal(false);
      setSelectedStudentIds([]);
      loadBatchData();
    } catch (err) {
      setAddError(err.message || 'Failed to add students to batch.');
      toast.error(err.message || 'Failed to add students');
    } finally {
      setSubmittingAdd(false);
    }
  };

  // Remove student handler
  const handleConfirmRemove = async () => {
    if (!confirmRemoveStudent) return;
    try {
      await institutionDashboardService.removeStudentFromBatch(instId, batchId, confirmRemoveStudent.id);
      toast.success(`Removed ${confirmRemoveStudent.name} from batch. Account remains active in directory.`);
      setConfirmRemoveStudent(null);
      loadBatchData();
    } catch (err) {
      toast.error(err.message || 'Failed to remove student from batch');
    }
  };

  // Assign test series handler
  const handleAssignTestSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTestId) return;

    setSubmittingAssignTest(true);
    try {
      await institutionDashboardService.assignTest(instId, selectedTestId, {
        assign_to: 'batch',
        target_id: batchId,
      });
      toast.success('Test series assigned to batch successfully!');
      setShowAssignTestModal(false);
      setSelectedTestId('');
      loadBatchData();
    } catch (err) {
      toast.error(err.message || 'Failed to assign test series.');
    } finally {
      setSubmittingAssignTest(false);
    }
  };

  const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-slate-600';
  const textSubtleClass = isDarkMode ? 'text-slate-500' : 'text-slate-500';

  if (loading && !batch) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Spinner size="lg" className="text-purple-500" />
        <p className={`text-xs mt-3 font-semibold ${textMutedClass}`}>Loading batch details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* BACK BUTTON & HEADER */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/institution/batches')}
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold transition cursor-pointer ${
            isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800' : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Batches</span>
        </button>
      </div>

      {/* BATCH HEADER CARD */}
      <div className={`rounded-3xl border p-6 sm:p-8 shadow-2xs space-y-6 ${
        isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-black uppercase ${
                isDarkMode ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : 'bg-purple-50 border-purple-200 text-purple-700'
              }`}>
                {batch?.target_exam || 'NEET UG'} • {batch?.class_level || 'Class 12'} • {batch?.academic_year || '2026–2027'}
              </span>

              <span className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-bold ${
                (batch?.status || 'active').toLowerCase() === 'active'
                  ? (isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700')
                  : (isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-slate-100 border-slate-300 text-slate-600')
              }`}>
                Status: {batch?.status ? batch.status.charAt(0).toUpperCase() + batch.status.slice(1) : 'Active'}
              </span>
            </div>

            <h1 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {batch?.batch_name || batch?.name || `Batch #${batchId}`}
            </h1>

            <p className={`text-xs font-semibold ${textMutedClass}`}>
              Faculty / Coordinator: <span className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>{batch?.faculty_name || 'Unassigned Faculty'}</span>
            </p>
          </div>

          {/* QUICK STAT BADGES */}
          <div className="flex flex-wrap items-center gap-4">
            <div className={`p-4 rounded-2xl border min-w-[140px] text-center ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Batch Enrolled</span>
              <span className="text-2xl font-black text-cyan-600 dark:text-cyan-400">{currentCount}</span>
              <span className={`text-[10px] font-bold block ${textSubtleClass}`}>/ {maxCapacity} Max Seats</span>
            </div>

            <div className={`p-4 rounded-2xl border min-w-[140px] text-center ${
              isDarkMode ? 'bg-slate-900/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <span className={`text-[10px] font-bold uppercase block ${textMutedClass}`}>Batch Average</span>
              <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{batch?.average_score || 0}%</span>
              <span className={`text-[10px] font-bold block ${textSubtleClass}`}>Accuracy Score</span>
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className={`flex border-b gap-6 text-xs font-extrabold ${isDarkMode ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <button
            onClick={() => setActiveTab('students')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'students'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Students ({currentCount})</span>
          </button>

          <button
            onClick={() => setActiveTab('tests')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'tests'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="h-4 w-4" />
            <span>Assigned Test Series ({batchTests.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('performance')}
            className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
              activeTab === 'performance'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <TrendingUp className="h-4 w-4" />
            <span>Performance</span>
          </button>
        </div>
      </div>

      {/* TAB 1: BATCH STUDENTS */}
      {activeTab === 'students' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
              <input
                type="text"
                placeholder="Search students in batch..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`w-full py-2.5 pl-10 pr-3 text-xs font-semibold rounded-2xl border transition ${
                  isDarkMode ? 'border-slate-800 bg-[#0E1726] text-white placeholder-slate-500' : 'border-slate-200 bg-white text-slate-900 placeholder-slate-400'
                }`}
              />
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  setSelectedStudentIds([]);
                  setModalSearch('');
                  setAddError('');
                  setShowAddStudentsModal(true);
                }}
                className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:scale-105 transition cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>+ Add Students</span>
              </button>
            </div>
          </div>

          {filteredBatchStudents.length > 0 ? (
            <div className={`rounded-2xl border overflow-hidden shadow-2xs ${
              isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className={`border-b text-[11px] font-black uppercase tracking-wider ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <th className="py-3.5 px-4">Student Name</th>
                      <th className="py-3.5 px-4">Roll Number</th>
                      <th className="py-3.5 px-4">Class</th>
                      <th className="py-3.5 px-4">Target Exam</th>
                      <th className="py-3.5 px-4">Email / Mobile</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {filteredBatchStudents.map((st) => (
                      <tr key={st.id} className={`transition ${isDarkMode ? 'hover:bg-slate-800/30' : 'hover:bg-slate-50'}`}>
                        <td className="py-3.5 px-4 font-bold">
                          <div className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{st.name}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`font-mono text-[11px] font-bold px-2 py-0.5 rounded border ${
                            isDarkMode ? 'bg-slate-900 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
                          }`}>
                            {st.roll_number || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-medium">{st.class_level || st.class || 'Class 12'}</td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                            isDarkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
                          }`}>
                            {st.target_exam || 'NEET'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className={`text-xs ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{st.email}</div>
                          {st.mobile && <div className={`text-[10px] ${textSubtleClass}`}>{st.mobile}</div>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 text-[11px] font-bold ${
                            st.is_blocked ? 'text-rose-500' : 'text-emerald-500'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${st.is_blocked ? 'bg-rose-500' : 'bg-emerald-500'}`}></span>
                            {st.is_blocked ? 'Blocked' : 'Active'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => setConfirmRemoveStudent(st)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition cursor-pointer font-bold text-xs inline-flex items-center gap-1"
                            title="Remove from Batch"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className={`rounded-3xl border p-12 text-center space-y-3 ${
              isDarkMode ? 'bg-[#0E1726] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <Users className="h-10 w-10 text-purple-400 mx-auto" />
              <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {search ? 'No matching students found' : 'No students in this batch yet'}
              </h3>
              <p className={`text-xs max-w-sm mx-auto ${textMutedClass}`}>
                {search ? 'Try adjusting your search query.' : 'Click below to assign existing institution students to this batch.'}
              </p>
              {!search && (
                <button
                  onClick={() => {
                    setSelectedStudentIds([]);
                    setModalSearch('');
                    setAddError('');
                    setShowAddStudentsModal(true);
                  }}
                  className="inline-flex items-center gap-2 rounded-2xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500 transition cursor-pointer mt-2"
                >
                  <Plus className="h-4 w-4" />
                  <span>+ Add Students</span>
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: ASSIGNED TEST SERIES */}
      {activeTab === 'tests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Batch Test Papers & Series ({batchTests.length})
            </h3>
            <button
              onClick={() => setShowAssignTestModal(true)}
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2.5 text-xs font-bold text-white shadow-md hover:scale-105 transition cursor-pointer"
            >
              <BookOpen className="h-4 w-4" />
              <span>Assign Test Series</span>
            </button>
          </div>

          {batchTests.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {batchTests.map((t) => (
                <div
                  key={t.id}
                  className={`rounded-2xl border p-5 space-y-3 ${
                    isDarkMode ? 'bg-[#0E1726] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        isDarkMode ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400' : 'bg-cyan-50 border-cyan-200 text-cyan-700'
                      }`}>
                        {t.test_type || 'CBT Assessment'}
                      </span>
                      <h4 className={`text-base font-extrabold mt-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{t.test_name}</h4>
                    </div>
                    <span className="text-xs font-bold text-emerald-500">Active</span>
                  </div>

                  <div className={`grid grid-cols-3 gap-2 text-center text-xs pt-2 border-t ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
                    <div>
                      <span className={`text-[10px] block ${textMutedClass}`}>Duration</span>
                      <span className="font-bold">{t.duration_minutes || 180} mins</span>
                    </div>
                    <div>
                      <span className={`text-[10px] block ${textMutedClass}`}>Max Marks</span>
                      <span className="font-bold">{t.max_marks || 720}</span>
                    </div>
                    <div>
                      <span className={`text-[10px] block ${textMutedClass}`}>Assigned</span>
                      <span className="font-bold text-purple-400">Batch</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={`rounded-3xl border p-12 text-center space-y-3 ${
              isDarkMode ? 'bg-[#0E1726] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
            }`}>
              <BookOpen className="h-10 w-10 text-cyan-400 mx-auto" />
              <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>No Test Series Assigned to Batch</h3>
              <p className={`text-xs max-w-sm mx-auto ${textMutedClass}`}>Assign AIETS test papers to enable candidates in this batch to attempt tests.</p>
              <button
                onClick={() => setShowAssignTestModal(true)}
                className="inline-flex items-center gap-2 rounded-2xl bg-cyan-600 px-4 py-2 text-xs font-bold text-white hover:bg-cyan-500 transition cursor-pointer mt-2"
              >
                <BookOpen className="h-4 w-4" />
                <span>Assign Test Series</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: BATCH PERFORMANCE */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-xs font-bold ${textMutedClass}`}>Batch Students</span>
              <div className="text-2xl font-black mt-1 text-purple-500">{performance?.total_students || currentCount}</div>
            </div>
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-xs font-bold ${textMutedClass}`}>Tests Attempted</span>
              <div className="text-2xl font-black mt-1 text-cyan-500">{performance?.tests_attempted || 0}</div>
            </div>
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-xs font-bold ${textMutedClass}`}>Average Score</span>
              <div className="text-2xl font-black mt-1 text-emerald-500">{performance?.average_score || 0}%</div>
            </div>
            <div className={`p-5 rounded-2xl border ${isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200 shadow-sm'}`}>
              <span className={`text-xs font-bold ${textMutedClass}`}>Highest Score</span>
              <div className="text-2xl font-black mt-1 text-amber-500">{performance?.highest_score || 0}%</div>
            </div>
          </div>

          {/* STUDENT PERFORMANCE TABLE */}
          {performance?.students && performance.students.length > 0 ? (
            <div className={`rounded-2xl border overflow-hidden shadow-2xs ${
              isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <div className="p-4 border-b border-slate-800 font-extrabold text-xs">Batch Student Score Breakdown</div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className={`border-b text-[11px] font-black uppercase tracking-wider ${
                      isDarkMode ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}>
                      <th className="py-3 px-4">Student Name</th>
                      <th className="py-3 px-4">Roll Number</th>
                      <th className="py-3 px-4">Tests Attempted</th>
                      <th className="py-3 px-4">Average Score</th>
                      <th className="py-3 px-4">Highest Score</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {performance.students.map((st) => (
                      <tr key={st.student_id}>
                        <td className="py-3 px-4 font-bold">{st.student_name}</td>
                        <td className="py-3 px-4 font-mono">{st.roll_number || 'N/A'}</td>
                        <td className="py-3 px-4 font-semibold">{st.attempts_count}</td>
                        <td className="py-3 px-4 font-black text-emerald-400">{st.average_score}%</td>
                        <td className="py-3 px-4 font-black text-cyan-400">{st.highest_score}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className={`rounded-3xl border p-12 text-center space-y-2 ${
              isDarkMode ? 'bg-[#0E1726] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <Award className="h-10 w-10 text-amber-400 mx-auto" />
              <h4 className="font-extrabold text-base">No Test Attempt Data Available Yet</h4>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">Performance metrics will automatically calculate as candidates in this batch attempt CBT tests.</p>
            </div>
          )}
        </div>
      )}

      {/* MODAL 1: ADD EXISTING STUDENTS TO BATCH */}
      {showAddStudentsModal && createPortal(
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className={`w-full max-w-2xl rounded-3xl border shadow-2xl p-6 space-y-5 my-auto max-h-[90vh] flex flex-col ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b pb-4 border-slate-800">
              <div>
                <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Add Students to Batch: {batch?.batch_name || batch?.name}
                </h3>
                <p className={`text-xs ${textMutedClass}`}>
                  Select students from your institution roster. Available seats: <span className="font-bold text-emerald-400">{availableSeats}</span> of {maxCapacity}.
                </p>
              </div>
              <button onClick={() => setShowAddStudentsModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {addError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{addError}</span>
              </div>
            )}

            {/* SEARCH & FILTERS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
                <input
                  type="text"
                  placeholder="Search student..."
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  className={`w-full py-2 pl-9 pr-3 text-xs font-semibold rounded-xl border ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-white placeholder-slate-500' : 'border-slate-200 bg-slate-50 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <select
                  value={modalAssignmentFilter}
                  onChange={(e) => setModalAssignmentFilter(e.target.value)}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <option value="Unassigned">Unassigned Students</option>
                  <option value="All">All Institution Students</option>
                </select>
              </div>

              <div>
                <select
                  value={modalExamFilter}
                  onChange={(e) => setModalExamFilter(e.target.value)}
                  className={`w-full py-2 px-3 text-xs font-semibold rounded-xl border ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <option value="All">All Target Exams</option>
                  <option value="NEET">NEET</option>
                  <option value="JEE">JEE</option>
                  <option value="Foundation">Foundation</option>
                </select>
              </div>
            </div>

            {/* STUDENTS LIST TABLE */}
            <div className="flex-1 overflow-y-auto border rounded-2xl border-slate-800/80 max-h-72">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className={`border-b text-[10px] font-black uppercase ${
                    isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                  }`}>
                    <th className="py-2.5 px-3 w-10 text-center">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            const selectable = eligibleMasterStudents
                              .filter((st) => String(st.batch_id) !== String(batchId))
                              .map((st) => st.id);
                            setSelectedStudentIds(selectable);
                          } else {
                            setSelectedStudentIds([]);
                          }
                        }}
                        checked={
                          selectedStudentIds.length > 0 &&
                          selectedStudentIds.length === eligibleMasterStudents.filter((st) => String(st.batch_id) !== String(batchId)).length
                        }
                        className="rounded border-slate-700 cursor-pointer"
                      />
                    </th>
                    <th className="py-2.5 px-3">Student Name</th>
                    <th className="py-2.5 px-3">Roll No</th>
                    <th className="py-2.5 px-3">Target Exam</th>
                    <th className="py-2.5 px-3">Current Batch</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/40">
                  {eligibleMasterStudents.length > 0 ? (
                    eligibleMasterStudents.map((st) => {
                      const isAlreadyInBatch = String(st.batch_id) === String(batchId);
                      const isSelected = selectedStudentIds.includes(st.id);

                      return (
                        <tr
                          key={st.id}
                          onClick={() => {
                            if (isAlreadyInBatch) return;
                            if (isSelected) {
                              setSelectedStudentIds(selectedStudentIds.filter((id) => id !== st.id));
                            } else {
                              setSelectedStudentIds([...selectedStudentIds, st.id]);
                            }
                          }}
                          className={`transition cursor-pointer ${
                            isAlreadyInBatch
                              ? 'opacity-50 bg-slate-900/30 cursor-not-allowed'
                              : isSelected
                              ? (isDarkMode ? 'bg-purple-900/20' : 'bg-purple-50')
                              : (isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50')
                          }`}
                        >
                          <td className="py-2.5 px-3 text-center">
                            <input
                              type="checkbox"
                              disabled={isAlreadyInBatch}
                              checked={isSelected || isAlreadyInBatch}
                              onChange={() => {}}
                              className="rounded border-slate-700 cursor-pointer"
                            />
                          </td>
                          <td className="py-2.5 px-3 font-bold">{st.name}</td>
                          <td className="py-2.5 px-3 font-mono text-[11px]">{st.roll_number || 'N/A'}</td>
                          <td className="py-2.5 px-3">{st.target_exam || 'NEET'}</td>
                          <td className="py-2.5 px-3 font-medium">
                            {isAlreadyInBatch ? (
                              <span className="text-emerald-400 font-bold">✓ Already in Batch</span>
                            ) : st.batch_name ? (
                              <span className="text-slate-400">{st.batch_name}</span>
                            ) : (
                              <span className="text-amber-400 font-bold">Unassigned</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="py-8 text-center text-xs text-slate-400">
                        No matching students found in master roster.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* CAPACITY SUMMARY & ACTION FOOTER */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <div className="text-xs">
                <span className="font-extrabold text-purple-400">{selectedStudentIds.length}</span> Student(s) Selected
                {isCapacityExceeded && (
                  <span className="ml-2 font-bold text-rose-500">
                    (Exceeds capacity by {selectedStudentIds.length - availableSeats})
                  </span>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddStudentsModal(false)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={submittingAdd || selectedStudentIds.length === 0 || isCapacityExceeded}
                  onClick={handleAddSelectedStudents}
                  className="px-5 py-2 rounded-xl bg-purple-600 font-bold text-xs text-white hover:bg-purple-500 disabled:opacity-50 cursor-pointer shadow-md"
                >
                  {submittingAdd ? 'Adding...' : 'Add Selected Students'}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MODAL 2: ASSIGN TEST SERIES MODAL */}
      {showAssignTestModal && createPortal(
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-5 my-auto ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Assign Test Series to {batch?.batch_name || batch?.name}
            </h3>

            <form onSubmit={handleAssignTestSubmit} className="space-y-4 text-xs">
              <div>
                <label className={`block font-semibold uppercase mb-1 ${textMutedClass}`}>Select Available Test Paper *</label>
                <select
                  required
                  value={selectedTestId}
                  onChange={(e) => setSelectedTestId(e.target.value)}
                  className={`w-full py-2.5 px-3 rounded-xl border transition cursor-pointer ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <option value="">-- Choose Test Paper --</option>
                  {allAvailableTests.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.test_name} ({t.duration_minutes || 180}m • {t.max_marks || 720} marks)
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAssignTestModal(false)}
                  className={`px-4 py-2 rounded-xl border text-xs font-bold ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingAssignTest || !selectedTestId}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 font-bold text-xs text-white hover:bg-cyan-500 shadow-md cursor-pointer disabled:opacity-50"
                >
                  {submittingAssignTest ? 'Assigning...' : 'Assign to Batch'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* CONFIRMATION DIALOG: REMOVE STUDENT */}
      {confirmRemoveStudent && createPortal(
        <div className="fixed inset-0 z-[110] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
          <div className={`w-full max-w-sm rounded-3xl border shadow-2xl p-6 space-y-4 my-auto ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h4 className="font-extrabold text-base text-rose-500">Remove Student from Batch?</h4>
            <p className="text-xs text-slate-300">
              Are you sure you want to remove <span className="font-bold text-white">{confirmRemoveStudent.name}</span> from batch <span className="font-bold text-purple-400">{batch?.batch_name}</span>?
            </p>
            <p className="text-[11px] text-slate-400 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
              Note: This action does <span className="font-bold text-amber-400">NOT</span> delete the student account. They will remain active in the Institution Master Student Directory as an Unassigned student.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setConfirmRemoveStudent(null)}
                className="px-4 py-2 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="px-4 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-500"
              >
                Confirm Remove
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
