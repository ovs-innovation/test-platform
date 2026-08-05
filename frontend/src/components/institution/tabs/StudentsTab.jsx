import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Users,
  Search,
  Plus,
  Upload,
  Download,
  MoreVertical,
  Edit,
  Trash2,
  Lock,
  Unlock,
  Key,
  Layers,
  FileText,
  BookOpen,
  Eye,
  CheckSquare,
  Square,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../../../context/ToastContext.jsx';
import { CustomSelectDropdown } from '../../ui.jsx';
import { downloadStudentCsvTemplate } from '../../../lib/csv.js';

export default function StudentsTab({
  students = [],
  batches = [],
  onAddStudent,
  onEditStudent,
  onDeleteStudent,
  onToggleBlock,
  onToggleBlockStudent,
  onRegenerateCredentials,
  onMoveBatch,
  onAssignTests,
  onAssignEbooks,
  onOpenAddModal,
  onOpenAddStudent,
  onOpenUploadModal,
  onOpenUploadCsv,
  onDownloadTemplate,
  isDarkMode = true,
}) {
  const toast = useToast();
  const handleOpenAdd = onOpenAddModal || onOpenAddStudent;
  const handleOpenUpload = onOpenUploadModal || onOpenUploadCsv;
  const handleDownloadTemplate = onDownloadTemplate || downloadStudentCsvTemplate;
  const handleToggleBlock = onToggleBlock || onToggleBlockStudent;

  // Local Search & Filtering state
  const [search, setSearch] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');

  // Multi-selection state
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Active student detail drawer state
  const [inspectStudent, setInspectStudent] = useState(null);

<<<<<<< HEAD
  // Helper to extract student target exam with fallback
  const getStudentTargetExam = (st) => {
    if (st.target_exam && String(st.target_exam).trim()) return String(st.target_exam).trim();
    if (st.course && String(st.course).trim()) return String(st.course).trim();
    if (st.target && String(st.target).trim()) return String(st.target).trim();
    if (st.batch_name) {
      const bLower = String(st.batch_name).toLowerCase();
      if (bLower.includes('neet')) return 'NEET';
      if (bLower.includes('jee')) return 'JEE';
      if (bLower.includes('foundation') || bLower.includes('9') || bLower.includes('10')) return 'Foundation';
    }
    return 'NEET';
  };
=======
  // Move batch modal state
  const [showMoveBatchModal, setShowMoveBatchModal] = useState(false);
  const [targetBatchId, setTargetBatchId] = useState('');
  const [movingBatch, setMovingBatch] = useState(false);

  useEffect(() => {
    if (inspectStudent || showMoveBatchModal) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [inspectStudent, showMoveBatchModal]);
>>>>>>> 2bfdf33 (Fix institution modal functionality, theme mode styling, scroll lock, and portal stacking context)

  // Filtered Students list
  const filteredStudents = useMemo(() => {
    return students.filter((st) => {
      const matchesSearch =
        (st.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (st.email || '').toLowerCase().includes(search.toLowerCase()) ||
        (st.roll_number || st.rollNo || '').toLowerCase().includes(search.toLowerCase()) ||
        (st.mobile || '').includes(search);

      const matchesBatch =
        selectedBatch === 'All' ||
        String(st.batch_id) === String(selectedBatch) ||
        (st.batch_name || '').toLowerCase() === String(selectedBatch).toLowerCase();

      const matchesStatus =
        selectedStatus === 'All' ||
        (selectedStatus === 'Blocked' ? st.is_blocked : !st.is_blocked);

      const studentTarget = getStudentTargetExam(st).toLowerCase();
      const selectedTarget = (selectedCourse || 'All').toLowerCase();

      const matchesCourse =
        selectedCourse === 'All' ||
        studentTarget.includes(selectedTarget) ||
        (selectedTarget === 'neet' && (studentTarget.includes('neet') || studentTarget.includes('medical'))) ||
        (selectedTarget === 'jee' && (studentTarget.includes('jee') || studentTarget.includes('iit') || studentTarget.includes('engineering'))) ||
        (selectedTarget === 'foundation' && (studentTarget.includes('foundation') || studentTarget.includes('9') || studentTarget.includes('10')));

      return matchesSearch && matchesBatch && matchesStatus && matchesCourse;
    });
  }, [students, search, selectedBatch, selectedStatus, selectedCourse]);

  // Paginated slice
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStudents.slice(start, start + itemsPerPage);
  }, [filteredStudents, currentPage]);

  // Multi-select handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudentIds(paginatedStudents.map((s) => s.id));
    } else {
      setSelectedStudentIds([]);
    }
  };

  const handleToggleSelect = (id) => {
    if (selectedStudentIds.includes(id)) {
      setSelectedStudentIds(selectedStudentIds.filter((sid) => sid !== id));
    } else {
      setSelectedStudentIds([...selectedStudentIds, id]);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* =========================================================================
          1. TAB HEADER & SEARCH / FILTER TOOLBAR
         ========================================================================= */}
      <div className={`rounded-3xl border p-6 backdrop-blur-xl shadow-xl space-y-4 ${
        isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b pb-5 border-slate-800/60">
          <div>
            <h2 className={`text-lg sm:text-xl font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              <span>Student Roster & Credentials</span>
              <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-3 py-0.5 text-xs font-bold text-blue-400">
                {filteredStudents.length} Enrolled
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-medium mt-0.5">
              Manage student accounts, roll numbers, credentials, test assignments, and batch allocations.
            </p>
          </div>

          {/* Actions Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenUpload}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-md hover:scale-[1.02] transition cursor-pointer"
            >
              <Upload className="h-4 w-4 text-white" />
              <span>Bulk CSV Import</span>
            </button>

            <button
              onClick={handleDownloadTemplate}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                isDarkMode ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
              title="Download CSV Template"
            >
              <Download className="h-3.5 w-3.5" />
              <span>CSV Template</span>
            </button>
          </div>
        </div>

        {/* SEARCH AND FILTERS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="lg:col-span-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search student name, roll number, email, mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-2 pl-10 pr-4 text-xs font-semibold rounded-xl border transition focus:outline-none ${
                isDarkMode ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:border-cyan-500' : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-blue-600'
              }`}
            />
          </div>

          {/* Batch Filter */}
          <div className="lg:col-span-3">
            <CustomSelectDropdown
              value={selectedBatch}
              onChange={(val) => setSelectedBatch(val)}
              options={[
                { value: 'All', label: 'All Batches' },
                ...batches.map((b) => ({
                  value: b.id,
                  label: `${b.batch_name || b.name} (${b.student_count || 0})`,
                })),
              ]}
              isDarkMode={isDarkMode}
              placeholder="All Batches"
              className="w-full"
            />
          </div>

          {/* Target Exam Filter */}
          <div className="lg:col-span-2">
            <CustomSelectDropdown
              value={selectedCourse}
              onChange={(val) => setSelectedCourse(val)}
              options={[
                { value: 'All', label: 'All Exams' },
                { value: 'NEET', label: 'NEET UG' },
                { value: 'JEE', label: 'JEE Main & Adv' },
                { value: 'Foundation', label: 'Class 9-10' },
              ]}
              isDarkMode={isDarkMode}
              placeholder="All Exams"
              className="w-full"
            />
          </div>

          {/* Account Status Filter */}
          <div className="lg:col-span-2">
            <CustomSelectDropdown
              value={selectedStatus}
              onChange={(val) => setSelectedStatus(val)}
              options={[
                { value: 'All', label: 'All Status' },
                { value: 'Active', label: 'Active Accounts' },
                { value: 'Blocked', label: 'Blocked Accounts' },
              ]}
              isDarkMode={isDarkMode}
              placeholder="All Status"
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. BULK SELECTION ACTION BAR (ACTIVATES WHEN 1+ SELECTED)
         ========================================================================= */}
      {selectedStudentIds.length > 0 && (
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-cyan-600 p-4 text-white shadow-xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-2 text-xs font-extrabold">
            <CheckSquare className="h-4 w-4" />
            <span>{selectedStudentIds.length} Student(s) Selected</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => onAssignTests(selectedStudentIds)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 px-3 py-1.5 text-xs font-bold text-white transition cursor-pointer"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Assign Tests</span>
            </button>

            <button
              onClick={() => onAssignEbooks(selectedStudentIds)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 px-3 py-1.5 text-xs font-bold text-white transition cursor-pointer"
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Assign eBooks</span>
            </button>

            <button
              onClick={() => setShowMoveBatchModal(true)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 px-3 py-1.5 text-xs font-bold text-white transition cursor-pointer"
            >
              <Layers className="h-3.5 w-3.5" />
              <span>Move Batch</span>
            </button>

            <button
              onClick={() => setSelectedStudentIds([])}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-slate-200 hover:text-white transition cursor-pointer"
            >
              Deselect All
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
          3. STUDENT ROSTER TABLE
         ========================================================================= */}
      {paginatedStudents.length > 0 ? (
        <div className={`rounded-3xl border overflow-hidden shadow-xl ${
          isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'
        }`}>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className={`border-b text-[11px] font-extrabold uppercase tracking-wider ${
                isDarkMode ? 'border-slate-800 bg-slate-950/60 text-slate-400' : 'border-slate-200 bg-slate-100 text-slate-600'
              }`}>
                <tr>
                  <th className="py-3.5 px-4 w-10">
                    <input
                      type="checkbox"
                      checked={selectedStudentIds.length === paginatedStudents.length && paginatedStudents.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                    />
                  </th>
                  <th className="py-3.5 px-4">Student & Roll No</th>
                  <th className="py-3.5 px-4">Contact Email</th>
                  <th className="py-3.5 px-4">Class & Target</th>
                  <th className="py-3.5 px-4">Batch</th>
                  <th className="py-3.5 px-4">Tests Done</th>
                  <th className="py-3.5 px-4">Avg Score</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-200'}`}>
                {paginatedStudents.map((student) => {
                  const isSelected = selectedStudentIds.includes(student.id);
                  const isBlocked = student.is_blocked;

                  return (
                    <tr
                      key={student.id}
                      className={`transition ${
                        isSelected
                          ? isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50'
                          : isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                      }`}
                    >
                      {/* Checkbox */}
                      <td className="py-3.5 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(student.id)}
                          className="rounded border-slate-700 bg-slate-900 text-blue-500 focus:ring-blue-500 h-4 w-4 cursor-pointer"
                        />
                      </td>

                      {/* Name & Roll No */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-extrabold text-xs flex items-center justify-center shadow-md shrink-0">
                            {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                          </div>
                          <div>
                            <p className={`font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                              {student.name}
                            </p>
                            <p className="text-[10px] font-mono font-bold text-cyan-400">
                              {student.roll_number || student.rollNo || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact Info */}
                      <td className="py-3.5 px-4 text-slate-400">
                        <p className="font-semibold text-slate-300">{student.email}</p>
                        <p className="text-[11px] text-slate-500 font-mono">{student.mobile || student.phone || 'N/A'}</p>
                      </td>

                      {/* Class & Target */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 text-[10px] font-bold text-blue-400">
                          {getStudentTargetExam(student)} ({student.class_level || 'Class 12'})
                        </span>
                      </td>

                      {/* Batch */}
                      <td className="py-3.5 px-4">
                        <span className="text-xs font-semibold text-slate-300">
                          {student.batch_name || 'General Batch'}
                        </span>
                      </td>

                      {/* Tests Completed */}
                      <td className="py-3.5 px-4 font-extrabold text-slate-200">
                        {student.tests_completed || student.testsCount || 0} mocks
                      </td>

                      {/* Average Score */}
                      <td className="py-3.5 px-4">
                        <span className={`font-black text-xs ${
                          (student.average_score || student.avgScore || 0) >= 70
                            ? 'text-emerald-400'
                            : (student.average_score || student.avgScore || 0) >= 50
                              ? 'text-cyan-400'
                              : 'text-amber-400'
                        }`}>
                          {student.average_score || student.avgScore || 0}%
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-3.5 px-4">
                        {isBlocked ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-rose-500/10 border border-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold text-rose-400">
                            <Lock className="h-3 w-3" />
                            Blocked
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                            Active
                          </span>
                        )}
                      </td>

                      {/* Row Actions Menu */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setInspectStudent(student)}
                            className="p-1.5 rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white transition cursor-pointer"
                            title="View Profile"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => onRegenerateCredentials(student.id)}
                            className="p-1.5 rounded-lg border border-slate-700 text-cyan-400 hover:bg-cyan-500/10 transition cursor-pointer"
                            title="Regenerate Password"
                          >
                            <Key className="h-3.5 w-3.5" />
                          </button>

                          <button
                            onClick={() => handleToggleBlock(student.id, !isBlocked)}
                            className={`p-1.5 rounded-lg border transition cursor-pointer ${
                              isBlocked
                                ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                                : 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10'
                            }`}
                            title={isBlocked ? 'Unblock Student' : 'Block Student'}
                          >
                            {isBlocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                          </button>

                          <button
                            onClick={() => onDeleteStudent(student.id)}
                            className="p-1.5 rounded-lg border border-slate-700 text-rose-400 hover:bg-rose-500/10 transition cursor-pointer"
                            title="Delete Student"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* PAGINATION FOOTER */}
          <div className={`p-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isDarkMode ? 'border-slate-800 bg-slate-950/40 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-600'
          }`}>
            <span>
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(filteredStudents.length, currentPage * itemsPerPage)} of {filteredStudents.length} students
            </span>

            <div className="flex items-center gap-1.5">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className={`p-1.5 rounded-lg border transition cursor-pointer disabled:opacity-40 ${
                  isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className={`px-3 font-bold text-xs ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
                className={`p-1.5 rounded-lg border transition cursor-pointer disabled:opacity-40 ${
                  isDarkMode ? 'border-slate-700 hover:bg-slate-800 text-slate-300' : 'border-slate-200 hover:bg-slate-100 text-slate-700'
                }`}
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* FILTER EMPTY STATE */
        <div className={`rounded-3xl border p-12 text-center space-y-4 ${
          isDarkMode ? 'bg-[#071126] border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700 shadow-sm'
        }`}>
          <div className="h-16 w-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
            <AlertCircle className="h-8 w-8" />
          </div>
          <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
            No students match the selected filters
          </h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, batch selection, or status filters to view student records.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setSelectedBatch('All');
              setSelectedStatus('All');
              setSelectedCourse('All');
            }}
            className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold transition cursor-pointer border ${
              isDarkMode
                ? 'bg-slate-800 border-slate-700 text-cyan-400 hover:bg-slate-700'
                : 'bg-slate-100 border-slate-300 text-blue-700 hover:bg-slate-200 shadow-sm'
            }`}
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* =========================================================================
          4. STUDENT PROFILE DRAWER / MODAL
         ========================================================================= */}
      {inspectStudent && createPortal(
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className={`w-full max-w-lg rounded-3xl border shadow-2xl p-6 space-y-6 relative my-auto ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <h3 className="text-lg font-extrabold flex items-center gap-2">
                <Users className="h-5 w-5 text-cyan-400" />
                <span>Student Profile Details</span>
              </h3>
              <button
                onClick={() => setInspectStudent(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className={`flex items-center gap-4 p-4 rounded-2xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 font-black text-xl flex items-center justify-center text-white shrink-0">
                  {inspectStudent.name.charAt(0)}
                </div>
                <div>
                  <h4 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inspectStudent.name}</h4>
                  <p className="text-xs text-cyan-400 font-mono font-bold">{inspectStudent.roll_number || inspectStudent.rollNo}</p>
                  <p className="text-[11px] text-slate-400">{inspectStudent.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 text-[10px] uppercase font-extrabold">Batch Allocation</span>
                  <p className={`font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inspectStudent.batch_name || 'General Batch'}</p>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 text-[10px] uppercase font-extrabold">Target Exam</span>
                  <p className="font-bold text-cyan-400 mt-0.5">{inspectStudent.target_exam || inspectStudent.course || 'NEET'}</p>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 text-[10px] uppercase font-extrabold">Tests Completed</span>
                  <p className={`font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inspectStudent.tests_completed || 0} Mock Exams</p>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className="text-slate-400 text-[10px] uppercase font-extrabold">Average Accuracy</span>
                  <p className="font-bold text-emerald-400 mt-0.5">{inspectStudent.average_score || 0}%</p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectStudent(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  isDarkMode ? 'bg-slate-800 text-slate-200 hover:bg-slate-700' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* MOVE BATCH MODAL */}
      {showMoveBatchModal && createPortal(
        <div className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className={`w-full max-w-md rounded-3xl border shadow-2xl p-6 space-y-5 my-auto ${
            isDarkMode ? 'bg-[#0B1730] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <h3 className={`text-lg font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Move {selectedStudentIds.length} Student(s) to Batch
            </h3>

            <div className="space-y-4 text-xs">
              <div>
                <label className={`block font-semibold uppercase mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Target Academic Batch</label>
                <select
                  value={targetBatchId}
                  onChange={(e) => setTargetBatchId(e.target.value)}
                  className={`w-full py-2.5 px-3 rounded-xl border transition cursor-pointer ${
                    isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-slate-100 text-slate-800'
                  }`}
                >
                  <option value="">Select Target Batch...</option>
                  {batches.map((b) => (
                    <option key={b.id} value={b.id}>{b.batch_name || b.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMoveBatchModal(false)}
                  className={`px-4 py-2 rounded-xl border font-bold ${
                    isDarkMode ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!targetBatchId || movingBatch}
                  onClick={async () => {
                    if (!targetBatchId) return;
                    setMovingBatch(true);
                    try {
                      await onMoveBatch(selectedStudentIds, targetBatchId);
                      setShowMoveBatchModal(false);
                      setSelectedStudentIds([]);
                      setTargetBatchId('');
                    } finally {
                      setMovingBatch(false);
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 font-bold text-white shadow-md disabled:opacity-50"
                >
                  {movingBatch ? 'Moving...' : 'Confirm Move Batch'}
                </button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}
