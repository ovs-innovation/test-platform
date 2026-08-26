import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useSearchParams } from 'react-router-dom';
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
import EditStudentModal from '../modals/EditStudentModal.jsx';

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
  const [searchParams] = useSearchParams();
  const handleOpenAdd = onOpenAddModal || onOpenAddStudent;
  const handleOpenUpload = onOpenUploadModal || onOpenUploadCsv;
  const handleDownloadTemplate = onDownloadTemplate || downloadStudentCsvTemplate;
  const handleToggleBlock = onToggleBlock || onToggleBlockStudent;

  // Local Search & Filtering state
  const [search, setSearch] = useState('');
  const [selectedBatch, setSelectedBatch] = useState(searchParams.get('batch') || 'All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCourse, setSelectedCourse] = useState('All');

  useEffect(() => {
    const urlBatch = searchParams.get('batch');
    if (urlBatch) {
      setSelectedBatch(urlBatch);
    }
  }, [searchParams]);

  // Multi-selection state
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Active student detail drawer state
  const [inspectStudent, setInspectStudent] = useState(null);

  // Edit student modal state
  const [editingStudent, setEditingStudent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!id || deletingId === id) return;
    setDeletingId(id);
    try {
      if (onDeleteStudent) {
        await onDeleteStudent(id);
      }
    } finally {
      setDeletingId(null);
    }
  };

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

  // Compute unassigned count dynamically
  const unassignedCount = useMemo(() => {
    return students.filter((st) => !st.batch_id).length;
  }, [students]);

  const batchOptions = useMemo(() => {
    const opts = [
      { value: 'All', label: 'All Students' },
      { value: 'Unassigned', label: `Unassigned Students (${unassignedCount})` },
    ];
    batches.forEach((b) => {
      const countFromRoster = students.filter((st) => String(st.batch_id) === String(b.id)).length;
      const count = Math.max(countFromRoster, Number(b.student_count || 0));
      opts.push({
        value: String(b.id),
        label: `${b.batch_name || b.name} (${count})`,
      });
    });
    return opts;
  }, [batches, students, unassignedCount]);

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
        (selectedBatch === 'Unassigned'
          ? !st.batch_id
          : String(st.batch_id) === String(selectedBatch) ||
            (st.batch_name || '').toLowerCase() === String(selectedBatch).toLowerCase());

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

  // Reset page to 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedBatch, selectedStatus, selectedCourse]);

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

  const textMutedClass = isDarkMode ? 'text-slate-400' : 'text-slate-600';
  const textSubtleClass = isDarkMode ? 'text-slate-500' : 'text-slate-500';

  return (
    <div className="space-y-6 animate-in fade-in duration-300">

      {/* =========================================================================
          1. TAB HEADER & SEARCH / FILTER TOOLBAR
         ========================================================================= */}
      <div className={`rounded-2xl border p-5 sm:p-6 shadow-2xs space-y-4 ${
        isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
      }`}>
        <div className={`flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between border-b pb-5 ${
          isDarkMode ? 'border-slate-800/60' : 'border-slate-200'
        }`}>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2.5 sm:justify-start">
              <h2 className={`text-lg sm:text-xl font-black tracking-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                Student Directory & Accounts
              </h2>
              <span className={`shrink-0 whitespace-nowrap rounded-xl px-3 py-1 text-xs font-bold border ${
                isDarkMode ? 'bg-slate-800 border-slate-700 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              }`}>
                {filteredStudents.length} Enrolled
              </span>
            </div>
            <p className={`text-xs font-medium mt-1 ${textMutedClass}`}>
              Manage student accounts, roll numbers, credentials, test assignments, and batch allocations.
            </p>
          </div>

          {/* Actions Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2 text-xs font-bold text-white shadow-sm transition cursor-pointer"
            >
              <Plus className="h-4 w-4 text-white" />
              <span>Add Student</span>
            </button>

            <button
              onClick={handleOpenUpload}
              className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-xs font-bold transition cursor-pointer ${
                isDarkMode ? 'border-slate-700 bg-slate-800/80 text-slate-300 hover:bg-slate-700' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <Upload className="h-4 w-4" />
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
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`} />
            <input
              type="text"
              placeholder="Search student name, roll number, email, mobile..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full py-2 pl-10 pr-4 text-xs font-semibold rounded-xl border transition focus:outline-none ${
                isDarkMode ? 'border-slate-800 bg-slate-950 text-white placeholder-slate-500 focus:border-indigo-500' : 'border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-indigo-600'
              }`}
            />
          </div>

          {/* Batch Filter */}
          <div className="lg:col-span-3">
            <CustomSelectDropdown
              value={selectedBatch}
              onChange={(val) => setSelectedBatch(val)}
              options={batchOptions}
              isDarkMode={isDarkMode}
              placeholder="All Students"
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
        <div className="rounded-2xl bg-indigo-600 p-4 text-white shadow-md flex flex-wrap items-center justify-between gap-3 animate-in fade-in">
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
          3. STUDENT ROSTER LIST (MOBILE CARDS & DESKTOP TABLE)
         ========================================================================= */}
      {paginatedStudents.length > 0 ? (
        <div className="space-y-4">
          
          {/* MOBILE CARD VIEW (VISIBLE ON MOBILE < 640px) */}
          <div className="block sm:hidden space-y-3">
            {paginatedStudents.map((student) => {
              const isSelected = selectedStudentIds.includes(student.id);
              const isBlocked = student.is_blocked;

              return (
                <div
                  key={student.id}
                  className={`p-4 rounded-2xl border transition space-y-3 ${
                    isSelected
                      ? isDarkMode ? 'bg-blue-900/30 border-blue-500/50' : 'bg-blue-50 border-blue-300'
                      : isDarkMode ? 'bg-[#0E1726] border-slate-800' : 'bg-white border-slate-200/90 shadow-sm'
                  }`}
                >
                  {/* Top Bar: Checkbox + Avatar + Name & Roll + Status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleToggleSelect(student.id)}
                        className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer shrink-0"
                      />
                      <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 text-white font-black text-sm flex items-center justify-center shadow-md shrink-0">
                        {student.name ? student.name.charAt(0).toUpperCase() : 'S'}
                      </div>
                      <div>
                        <h4 className={`font-extrabold text-sm ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                          {student.name}
                        </h4>
                        <p className={`text-xs font-mono font-bold ${isDarkMode ? 'text-cyan-400' : 'text-blue-700'}`}>
                          {student.roll_number || student.rollNo || 'N/A'}
                        </p>
                      </div>
                    </div>

                    <div>
                      {isBlocked ? (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                          isDarkMode ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-700'
                        }`}>
                          <Lock className="h-3 w-3" /> Blocked
                        </span>
                      ) : (
                        <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold border ${
                          isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                        }`}>
                          Active
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'}`}>
                      <span className={`text-[10px] font-bold uppercase block ${textSubtleClass}`}>Contact</span>
                      <p className={`font-medium truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{student.email}</p>
                      <p className={`text-[11px] font-mono ${textMutedClass}`}>{student.mobile || student.phone || 'No Phone'}</p>
                    </div>

                    <div className={`p-2.5 rounded-xl border ${isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200/80'}`}>
                      <span className={`text-[10px] font-bold uppercase block ${textSubtleClass}`}>Batch / Exam</span>
                      <p className={`font-semibold text-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>{student.batch_name || 'General'}</p>
                      <span className={`inline-block mt-0.5 text-[10px] font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>
                        {getStudentTargetExam(student)} ({student.class_level || '12th'})
                      </span>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="flex items-center justify-between text-xs pt-1 px-1">
                    <span className={`font-semibold ${textMutedClass}`}>
                      Tests Done: <strong className={isDarkMode ? 'text-white' : 'text-slate-900'}>{student.tests_completed || student.testsCount || 0} mocks</strong>
                    </span>
                    <span className={`font-black text-xs ${
                      (student.average_score || student.avgScore || 0) >= 70
                        ? 'text-emerald-600 dark:text-emerald-400'
                        : (student.average_score || student.avgScore || 0) >= 50
                          ? 'text-cyan-600 dark:text-cyan-400'
                          : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      Avg Score: {student.average_score || student.avgScore || 0}%
                    </span>
                  </div>

                  {/* Actions Row */}
                  <div className={`pt-2 border-t flex items-center justify-between gap-1.5 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                    <button
                      onClick={() => setInspectStudent(student)}
                      className={`flex-1 py-1.5 rounded-xl border text-xs font-bold transition flex items-center justify-center gap-1 ${
                        isDarkMode ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => setEditingStudent(student)}
                      className={`p-2 rounded-xl border transition ${
                        isDarkMode ? 'border-slate-800 text-blue-400 hover:bg-blue-500/10' : 'border-slate-200 text-blue-600 hover:bg-blue-50'
                      }`}
                      title="Edit Student Info"
                    >
                      <Edit className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => onRegenerateCredentials(student.id)}
                      className={`p-2 rounded-xl border transition ${
                        isDarkMode ? 'border-slate-800 text-cyan-400 hover:bg-cyan-500/10' : 'border-slate-200 text-cyan-700 hover:bg-cyan-50'
                      }`}
                      title="Regenerate Password"
                    >
                      <Key className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => handleToggleBlock(student.id, !isBlocked)}
                      className={`p-2 rounded-xl border transition ${
                        isBlocked
                          ? isDarkMode ? 'border-emerald-500/30 text-emerald-400' : 'border-emerald-200 text-emerald-700 bg-emerald-50'
                          : isDarkMode ? 'border-rose-500/30 text-rose-400' : 'border-rose-200 text-rose-700 bg-rose-50'
                      }`}
                      title={isBlocked ? 'Unblock Student' : 'Block Student'}
                    >
                      {isBlocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                    </button>

                    <button
                      onClick={() => handleDelete(student.id)}
                      disabled={deletingId === student.id}
                      className={`p-2 rounded-xl border transition disabled:opacity-40 cursor-pointer ${
                        isDarkMode ? 'border-slate-800 text-rose-400' : 'border-slate-200 text-rose-600 hover:bg-rose-50'
                      }`}
                      title="Delete Student"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* DESKTOP TABLE VIEW (VISIBLE ON TABLET & DESKTOP >= 640px) */}
          <div className={`hidden sm:block rounded-3xl border overflow-hidden shadow-md ${
            isDarkMode ? 'bg-[#071126] border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-xs border-collapse">
                <thead className={`border-b text-[11px] font-extrabold uppercase tracking-wider ${
                  isDarkMode ? 'border-slate-800 bg-slate-950/60 text-slate-400' : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}>
                  <tr>
                    <th className="py-3.5 px-4 w-10">
                      <input
                        type="checkbox"
                        checked={selectedStudentIds.length === paginatedStudents.length && paginatedStudents.length > 0}
                        onChange={handleSelectAll}
                        className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
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
                            ? isDarkMode ? 'bg-blue-900/20' : 'bg-blue-50/80'
                            : isDarkMode ? 'hover:bg-slate-800/40' : 'hover:bg-slate-50'
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 px-4">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => handleToggleSelect(student.id)}
                            className="rounded border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-blue-600 focus:ring-blue-500 h-4 w-4 cursor-pointer"
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
                              <p className={`text-[10px] font-mono font-bold ${
                                isDarkMode ? 'text-cyan-400' : 'text-blue-700'
                              }`}>
                                {student.roll_number || student.rollNo || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Contact Info */}
                        <td className="py-3.5 px-4">
                          <p className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                            {student.email}
                          </p>
                          <p className={`text-[11px] font-mono ${isDarkMode ? 'text-slate-400' : 'text-slate-600 font-medium'}`}>
                            {student.mobile || student.phone || 'N/A'}
                          </p>
                        </td>

                        {/* Class & Target */}
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                            isDarkMode ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-700'
                          }`}>
                            {getStudentTargetExam(student)} ({student.class_level || 'Class 12'})
                          </span>
                        </td>

                        {/* Batch */}
                        <td className="py-3.5 px-4">
                          <span className={`text-xs font-semibold ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                            {student.batch_name || 'General Batch'}
                          </span>
                        </td>

                        {/* Tests Completed */}
                        <td className="py-3.5 px-4 font-extrabold">
                          <span className={isDarkMode ? 'text-slate-200' : 'text-slate-800'}>
                            {student.tests_completed || student.testsCount || 0} mocks
                          </span>
                        </td>

                        {/* Average Score */}
                        <td className="py-3.5 px-4">
                          <span className={`font-black text-xs ${
                            (student.average_score || student.avgScore || 0) >= 70
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : (student.average_score || student.avgScore || 0) >= 50
                                ? 'text-cyan-600 dark:text-cyan-400'
                                : 'text-amber-600 dark:text-amber-400'
                          }`}>
                            {student.average_score || student.avgScore || 0}%
                          </span>
                        </td>

                        {/* Status Badge */}
                        <td className="py-3.5 px-4">
                          {isBlocked ? (
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                              isDarkMode ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-rose-50 border-rose-200 text-rose-700'
                            }`}>
                              <Lock className="h-3 w-3" />
                              Blocked
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold border ${
                              isDarkMode ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-700'
                            }`}>
                              Active
                            </span>
                          )}
                        </td>

                        {/* Row Actions Menu */}
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setInspectStudent(student)}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                isDarkMode
                                  ? 'border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                                  : 'border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 shadow-2xs'
                              }`}
                              title="View Profile"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() => setEditingStudent(student)}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                isDarkMode
                                  ? 'border-slate-800 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30'
                                  : 'border-slate-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 shadow-2xs'
                              }`}
                              title="Edit Student Info"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() => onRegenerateCredentials(student.id)}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                isDarkMode
                                  ? 'border-slate-800 text-cyan-400 hover:bg-cyan-500/10'
                                  : 'border-slate-200 text-cyan-700 hover:bg-cyan-50 hover:border-cyan-300 shadow-2xs'
                              }`}
                              title="Regenerate Password"
                            >
                              <Key className="h-3.5 w-3.5" />
                            </button>

                            <button
                              onClick={() => handleToggleBlock(student.id, !isBlocked)}
                              className={`p-1.5 rounded-lg border transition cursor-pointer ${
                                isBlocked
                                  ? isDarkMode
                                    ? 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                                    : 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 shadow-2xs'
                                  : isDarkMode
                                    ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10'
                                    : 'border-rose-200 text-rose-700 hover:bg-rose-50 shadow-2xs'
                              }`}
                              title={isBlocked ? 'Unblock Student' : 'Block Student'}
                            >
                              {isBlocked ? <Unlock className="h-3.5 w-3.5" /> : <Lock className="h-3.5 w-3.5" />}
                            </button>

                            <button
                              onClick={() => handleDelete(student.id)}
                              disabled={deletingId === student.id}
                              className={`p-1.5 rounded-lg border transition cursor-pointer disabled:opacity-40 ${
                                isDarkMode
                                  ? 'border-slate-800 text-rose-400 hover:bg-rose-500/10'
                                  : 'border-slate-200 text-rose-600 hover:bg-rose-50 hover:border-rose-300 shadow-2xs'
                              }`}
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
          </div>

          {/* PAGINATION FOOTER */}
          <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs ${
            isDarkMode ? 'border-slate-800 bg-[#071126] text-slate-400' : 'border-slate-200 bg-white text-slate-600 shadow-sm'
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
          <p className={`text-xs max-w-sm mx-auto ${textMutedClass}`}>
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
            <div className={`flex items-center justify-between border-b pb-4 ${isDarkMode ? 'border-slate-800' : 'border-slate-200'}`}>
              <h3 className={`text-lg font-extrabold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                <Users className="h-5 w-5 text-cyan-500 dark:text-cyan-400" />
                <span>Student Profile Details</span>
              </h3>
              <button
                onClick={() => setInspectStudent(null)}
                className={`p-1.5 rounded-xl transition ${isDarkMode ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className={`flex items-center gap-4 p-4 rounded-2xl border ${
                isDarkMode ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}>
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-cyan-500 font-black text-xl flex items-center justify-center text-white shrink-0 shadow-md">
                  {inspectStudent.name.charAt(0)}
                </div>
                <div>
                  <h4 className={`text-base font-extrabold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inspectStudent.name}</h4>
                  <p className={`text-xs font-mono font-bold ${isDarkMode ? 'text-cyan-400' : 'text-blue-700'}`}>{inspectStudent.roll_number || inspectStudent.rollNo}</p>
                  <p className={`text-[11px] ${textMutedClass}`}>{inspectStudent.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-[10px] uppercase font-extrabold block ${textSubtleClass}`}>Batch Allocation</span>
                  <p className={`font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inspectStudent.batch_name || 'General Batch'}</p>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-[10px] uppercase font-extrabold block ${textSubtleClass}`}>Target Exam</span>
                  <p className="font-bold text-cyan-600 dark:text-cyan-400 mt-0.5">{inspectStudent.target_exam || inspectStudent.course || 'NEET'}</p>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-[10px] uppercase font-extrabold block ${textSubtleClass}`}>Tests Completed</span>
                  <p className={`font-bold mt-0.5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{inspectStudent.tests_completed || 0} Mock Exams</p>
                </div>
                <div className={`p-3 rounded-xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                  <span className={`text-[10px] uppercase font-extrabold block ${textSubtleClass}`}>Average Accuracy</span>
                  <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{inspectStudent.average_score || 0}%</p>
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
                <label className={`block font-semibold uppercase mb-1 ${textMutedClass}`}>Target Academic Batch</label>
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

      {/* EDIT STUDENT MODAL */}
      {editingStudent && (
        <EditStudentModal
          isOpen={true}
          student={editingStudent}
          batches={batches}
          onClose={() => setEditingStudent(null)}
          onSubmit={onEditStudent}
          isDarkMode={isDarkMode}
        />
      )}

    </div>
  );
}
