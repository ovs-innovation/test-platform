import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { adminService } from '../../lib/services.js';
import { Spinner, Badge } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import {
  CalendarDays,
  Plus,
  Search,
  Pencil,
  Trash2,
  Upload,
  UserCheck,
  Award,
  BellRing,
  BookOpen,
  Users,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  PauseCircle,
  X,
  AlertCircle,
  Download,
  Filter
} from 'lucide-react';

const TEST_TYPES = ['AIETS', 'Unit Test', 'Part Test', 'Cumulative Test', 'Full Syllabus Mock'];

export default function AdminAssessments() {
  const [tests, setTests] = useState([]);
  const [ebooks, setEbooks] = useState([]);
  const [batches, setBatches] = useState([]);
  const [institutionAnalytics, setInstitutionAnalytics] = useState([]);
  const [loading, setLoading] = useState(true);

  // Active Tab: 'tests' | 'ebooks' | 'batches' | 'analytics'
  const [activeTab, setActiveTab] = useState('tests');

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  // Modals
  const [testModalOpen, setTestModalOpen] = useState(false);
  const [editingTest, setEditingTest] = useState(null);

  const [uploadModalTest, setUploadModalTest] = useState(null);
  const [uploadType, setUploadType] = useState('solution_pdf');
  const [uploadFile, setUploadFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadQuestions, setUploadQuestions] = useState('');
  const [uploadDuration, setUploadDuration] = useState('');
  const [uploadMaxMarks, setUploadMaxMarks] = useState('');
  const [uploadPassMarks, setUploadPassMarks] = useState('');

  const [assignModalTest, setAssignModalTest] = useState(null);
  const [assignType, setAssignType] = useState('all');
  const [assignTargetId, setAssignTargetId] = useState('');

  const [overrideModalTest, setOverrideModalTest] = useState(null);
  const [overrideStudentId, setOverrideStudentId] = useState('');
  const [overrideValidFrom, setOverrideValidFrom] = useState('');
  const [overrideValidUntil, setOverrideValidUntil] = useState('');
  const [overrideNote, setOverrideNote] = useState('');

  const [ebookModalOpen, setEbookModalOpen] = useState(false);
  const [newEbook, setNewEbook] = useState({ title: '', author: '', description: '', pdf_url: '' });

  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [newBatch, setNewBatch] = useState({ name: '', description: '' });

  // Test Form State
  const [testForm, setTestForm] = useState({
    test_name: '',
    test_type: 'AIETS',
    test_date: '2026-10-04',
    start_time: '09:00:00',
    end_time: '12:00:00',
    duration_minutes: 180,
    max_marks: 300,
    syllabus: '',
    is_published: true,
    result_publish_time: '',
    recommended_ebook_id: '',
  });

  const loadData = async () => {
    setLoading(true);
    try {
      const [testsList, ebooksList, batchesList, instAnalytics] = await Promise.all([
        adminService.tests(),
        adminService.ebooks().catch(() => []),
        adminService.batches().catch(() => []),
        adminService.institutionAnalytics().catch(() => ({ students: [] }))
      ]);

      setTests(testsList || []);
      setEbooks(ebooksList || []);
      setBatches(batchesList || []);
      setInstitutionAnalytics(instAnalytics?.students || []);
    } catch (err) {
      console.error('Failed to load admin assessments data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const openCreateModal = () => {
    setEditingTest(null);
    setTestForm({
      test_name: '',
      test_type: 'AIETS',
      test_date: new Date().toISOString().split('T')[0],
      start_time: '09:00:00',
      end_time: '12:00:00',
      duration_minutes: 180,
      max_marks: 300,
      syllabus: '',
      is_published: true,
      result_publish_time: '',
      recommended_ebook_id: '',
    });
    setTestModalOpen(true);
  };

  const formatDateForInput = (dStr) => {
    if (!dStr) return '';
    const str = String(dStr);
    if (str.includes('T')) return str.split('T')[0];
    return str.slice(0, 10);
  };

  const openEditModal = (t) => {
    setEditingTest(t);
    setTestForm({
      test_name: t.test_name || t.title || '',
      test_type: t.test_type || 'AIETS',
      test_date: formatDateForInput(t.test_date),
      start_time: t.start_time ? String(t.start_time).slice(0, 8) : '09:00:00',
      end_time: t.end_time ? String(t.end_time).slice(0, 8) : '12:00:00',
      duration_minutes: Number(t.duration_minutes || t.duration || 180),
      max_marks: Number(t.max_marks || t.total_marks || 300),
      syllabus: t.syllabus || '',
      is_published: Boolean(t.is_published),
      result_publish_time: t.result_publish_time ? String(t.result_publish_time).slice(0, 16) : '',
      recommended_ebook_id: t.recommended_ebook_id || '',
    });
    setTestModalOpen(true);
  };

  const handleTestSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...testForm,
        start_time: testForm.start_time.length === 5 ? `${testForm.start_time}:00` : testForm.start_time,
        end_time: testForm.end_time.length === 5 ? `${testForm.end_time}:00` : testForm.end_time,
      };
      if (editingTest) {
        await adminService.updateTest(editingTest.id, payload);
      } else {
        await adminService.createTest(payload);
      }
      setTestModalOpen(false);
      loadData();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleTogglePublish = async (test) => {
    try {
      await adminService.togglePublishTest(test.id, !test.is_published);
      loadData();
    } catch (err) {
      alert(err.message || 'Action failed');
    }
  };

  const handleDeleteTest = async (test) => {
    if (!window.confirm(`Delete test "${test.test_name}"?`)) return;
    try {
      const res = await adminService.deleteTest(test.id);
      alert(res.message);
      loadData();
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  const handleGenerateResults = async (testId) => {
    if (!window.confirm('Trigger manual rank calculation & result publishing for all attempts of this test?')) return;
    try {
      const res = await adminService.generateResults(testId);
      alert(res.message);
      loadData();
    } catch (err) {
      alert(err.message || 'Result generation failed');
    }
  };

  const handleNotifyReminder = async (testId) => {
    const msg = prompt('Enter custom notification message (or click OK for default reminder):');
    if (msg === null) return;
    try {
      const res = await adminService.notifyTestReminder(testId, msg);
      alert(res.message);
    } catch (err) {
      alert(err.message || 'Notification failed');
    }
  };

  const handleOpenUploadModal = (t) => {
    setUploadModalTest(t);
    setUploadQuestions(t.question_count || '');
    setUploadDuration(t.duration_minutes || '180');
    setUploadMaxMarks(t.max_marks || '300');
    setUploadPassMarks(t.passing_marks || '120');
  };

  const handleFileUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile) return alert('Please select a file');

    setUploading(true);
    const reader = new FileReader();
    reader.onload = async (uploadEvent) => {
      try {
        await adminService.uploadTestFile(uploadModalTest.id, {
          file_type: uploadType,
          file_name: uploadFile.name,
          file_base64: uploadEvent.target.result,
          total_questions: uploadQuestions,
          duration_minutes: uploadDuration,
          max_marks: uploadMaxMarks,
          passing_marks: uploadPassMarks,
        });
        alert('File uploaded successfully & test parameters updated!');
        setUploadModalTest(null);
        setUploadFile(null);
        loadData();
      } catch (err) {
        alert(err.message || 'Upload failed');
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(uploadFile);
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    try {
      await adminService.assignTest(assignModalTest.id, {
        assigned_to_type: assignType,
        assigned_to_id: assignTargetId ? Number(assignTargetId) : null,
      });
      alert('Test audience assignment saved!');
      setAssignModalTest(null);
      loadData();
    } catch (err) {
      alert(err.message || 'Assignment failed');
    }
  };

  const handleOverrideSubmit = async (e) => {
    e.preventDefault();
    if (!overrideStudentId || !overrideValidFrom || !overrideValidUntil) {
      return alert('Student ID, Valid From, and Valid Until dates are required');
    }
    try {
      await adminService.setMissedTestOverride(overrideModalTest.id, {
        student_id: Number(overrideStudentId),
        valid_from: overrideValidFrom,
        valid_until: overrideValidUntil,
        note: overrideNote,
      });
      alert('Special missed-test access override granted!');
      setOverrideModalTest(null);
      loadData();
    } catch (err) {
      alert(err.message || 'Override failed');
    }
  };

  const handleCreateEbook = async (e) => {
    e.preventDefault();
    try {
      await adminService.createEbook(newEbook);
      setEbookModalOpen(false);
      setNewEbook({ title: '', author: '', description: '', pdf_url: '' });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to create eBook');
    }
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();
    try {
      await adminService.createBatch(newBatch);
      setBatchModalOpen(false);
      setNewBatch({ name: '', description: '' });
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to create batch');
    }
  };

  const filteredTests = tests.filter((t) => {
    const matchesSearch = (t.test_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (t.syllabus && t.syllabus.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'All' || t.test_type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 w-full max-w-full pb-12">
      {/* Header Banner */}
      <AdminHeader
        title="Assessments & Test Schedule Manager"
        subtitle="Create, edit, schedule, assign, upload question papers/solutions, trigger rank calculations, and configure missed-test access overrides."
        breadcrumbs={['CBT Assessments']}
        actions={
          <button
            type="button"
            onClick={openCreateModal}
            className="btn btn-primary"
          >
            + Create New Test
          </button>
        }
      />

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('tests')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl transition ${
            activeTab === 'tests'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <CalendarDays className="h-4 w-4" /> Tests Roster ({tests.length})
        </button>
        <button
          onClick={() => setActiveTab('ebooks')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl transition ${
            activeTab === 'ebooks'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="h-4 w-4" /> Recommended eBooks ({ebooks.length})
        </button>
        <button
          onClick={() => setActiveTab('batches')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl transition ${
            activeTab === 'batches'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Users className="h-4 w-4" /> Student Batches ({batches.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl transition ${
            activeTab === 'analytics'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Building2 className="h-4 w-4" /> Institution Performance ({institutionAnalytics.length})
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 gap-3 text-slate-400">
          <Spinner className="h-6 w-6 text-blue-600" />
          <span className="text-sm font-bold">Loading Assessments & Test Management data...</span>
        </div>
      ) : (
        <>
          {/* TAB 1: TESTS ROSTER */}
          {activeTab === 'tests' && (
            <div className="space-y-4">
              {/* Search & Type Filters */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-[#111827] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search test name or syllabus..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900 pl-9 pr-3 py-2 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none"
                  >
                    <option value="All">All Test Types</option>
                    {TEST_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-[11px] font-black uppercase text-slate-400">
                      <tr>
                        <th className="py-3.5 px-4">Test Title & Type</th>
                        <th className="py-3.5 px-4">Scheduled Date</th>
                        <th className="py-3.5 px-4">Timings</th>
                        <th className="py-3.5 px-4">Duration & Marks</th>
                        <th className="py-3.5 px-4">Status</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 text-xs font-semibold text-slate-700 dark:text-slate-200">
                      {filteredTests.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="py-12 text-center text-slate-400">
                            No tests found matching your criteria.
                          </td>
                        </tr>
                      ) : (
                        filteredTests.map((t) => (
                          <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40 transition">
                            <td className="py-4 px-4">
                              <div>
                                <Link
                                  to={`/admin/assessments/${t.id}`}
                                  className="font-extrabold text-slate-900 dark:text-white text-sm hover:text-blue-600 hover:underline transition"
                                  title="Click to Edit Questions & Assessment Content"
                                >
                                  {t.test_name}
                                </Link>
                                <div className="flex items-center gap-2 mt-1">
                                  <span className="bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 px-2 py-0.5 rounded-md text-[10px] font-bold border border-blue-200 dark:border-blue-800">
                                    {t.test_type}
                                  </span>
                                  {t.solution_pdf_url && (
                                    <span className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200">
                                      Solution Uploaded
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 font-extrabold text-slate-900 dark:text-white whitespace-nowrap">
                              {t.test_date ? String(t.test_date).split('T')[0] : ''}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-slate-500">
                              {(t.start_time || '09:00').slice(0, 5)} - {(t.end_time || '12:00').slice(0, 5)}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className="font-bold">{t.duration_minutes} mins</span>
                              <span className="text-slate-400 block text-[11px]">{t.max_marks} Marks</span>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              {t.is_published ? (
                                <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-lg font-extrabold">
                                  <CheckCircle2 className="h-3.5 w-3.5" /> Published
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-slate-500/10 text-slate-500 border border-slate-300 dark:border-slate-700 px-2.5 py-1 rounded-lg font-bold">
                                  <PauseCircle className="h-3.5 w-3.5" /> Draft / Hidden
                                </span>
                              )}
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap text-right space-x-1">
                              <Link
                                to={`/admin/assessments/${t.id}`}
                                className="inline-block p-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100"
                                title="Edit Questions, Sections & Test Content"
                              >
                                <FileText className="h-4 w-4" />
                              </Link>
                              <button
                                onClick={() => openEditModal(t)}
                                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
                                title="Edit Test Timings & Schedule"
                              >
                                <Pencil className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleOpenUploadModal(t)}
                                className="p-1.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 hover:bg-blue-100"
                                title="Upload Question Paper / Answer Key / Solution"
                              >
                                <Upload className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setAssignModalTest(t)}
                                className="p-1.5 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 hover:bg-purple-100"
                                title="Assign Test Audience"
                              >
                                <UserCheck className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => setOverrideModalTest(t)}
                                className="p-1.5 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 hover:bg-amber-100"
                                title="Grant Missed-Test Access Override"
                              >
                                <Clock className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleGenerateResults(t.id)}
                                className="p-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-100"
                                title="Generate Ranks & Publish Results"
                              >
                                <Award className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleNotifyReminder(t.id)}
                                className="p-1.5 rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100"
                                title="Send Notification Reminder"
                              >
                                <BellRing className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleTogglePublish(t)}
                                className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 text-slate-700 dark:text-slate-200"
                                title={t.is_published ? 'Unpublish' : 'Publish'}
                              >
                                {t.is_published ? <PauseCircle className="h-4 w-4 text-amber-500" /> : <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                              </button>
                              <button
                                onClick={() => handleDeleteTest(t)}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                                title="Delete / Soft-Delete"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: RECOMMENDED EBOOKS */}
          {activeTab === 'ebooks' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white dark:bg-[#111827] p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Recommended Study eBooks</h3>
                <button
                  onClick={() => setEbookModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md hover:bg-blue-500"
                >
                  + Add New eBook
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {ebooks.map((e) => (
                  <div key={e.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-2">
                    <BookOpen className="h-6 w-6 text-blue-600" />
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{e.title}</h4>
                    {e.author && <p className="text-xs font-semibold text-slate-500">Author: {e.author}</p>}
                    <a href={e.pdf_url} target="_blank" rel="noreferrer" className="text-xs font-bold text-blue-600 hover:underline block truncate">
                      {e.pdf_url}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STUDENT BATCHES */}
          {activeTab === 'batches' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white dark:bg-[#111827] p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Registered Student Batches</h3>
                <button
                  onClick={() => setBatchModalOpen(true)}
                  className="px-3.5 py-2 bg-blue-600 text-white font-extrabold text-xs rounded-xl shadow-md hover:bg-blue-500"
                >
                  + Create New Batch
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {batches.map((b) => (
                  <div key={b.id} className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] space-y-2">
                    <Users className="h-6 w-6 text-purple-600" />
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{b.name}</h4>
                    <p className="text-xs text-slate-500">{b.description || 'No description'}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: INSTITUTION ANALYTICS */}
          {activeTab === 'analytics' && (
            <div className="bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 p-6 space-y-4">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Institution-Level Student Performance</h3>
              <table className="w-full text-left text-xs border-collapse">
                <thead className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-extrabold uppercase">
                  <tr>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">Exam Target</th>
                    <th className="py-3 px-4">Attempts Completed</th>
                    <th className="py-3 px-4">Average Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {institutionAnalytics.map((st) => (
                    <tr key={st.student_id}>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{st.student_name}</td>
                      <td className="py-3 px-4 text-slate-500">{st.student_email}</td>
                      <td className="py-3 px-4 font-bold text-blue-600">{st.target_exam || 'JEE / NEET'}</td>
                      <td className="py-3 px-4 font-bold">{st.completed_attempts}</td>
                      <td className="py-3 px-4 font-black text-emerald-600">{st.avg_percentage}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* CREATE / EDIT TEST MODAL */}
      {testModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                {editingTest ? 'Edit Test Schedule & Parameters' : 'Create New Test'}
              </h3>
              <button onClick={() => setTestModalOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleTestSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Test Title *</label>
                <input
                  type="text"
                  required
                  value={testForm.test_name}
                  onChange={(e) => setTestForm({ ...testForm, test_name: e.target.value })}
                  placeholder="e.g. AIETS 10 - Thermodynamics & Kinetic Theory"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Test Category *</label>
                  <select
                    value={testForm.test_type}
                    onChange={(e) => setTestForm({ ...testForm, test_type: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                  >
                    {TEST_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Scheduled Date (YYYY-MM-DD) *</label>
                  <input
                    type="date"
                    required
                    value={testForm.test_date}
                    onChange={(e) => setTestForm({ ...testForm, test_date: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Start Time (HH:MM:SS) *</label>
                  <input
                    type="text"
                    required
                    value={testForm.start_time}
                    onChange={(e) => setTestForm({ ...testForm, start_time: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">End Time (HH:MM:SS) *</label>
                  <input
                    type="text"
                    required
                    value={testForm.end_time}
                    onChange={(e) => setTestForm({ ...testForm, end_time: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Duration (Minutes) *</label>
                  <input
                    type="number"
                    required
                    value={testForm.duration_minutes}
                    onChange={(e) => setTestForm({ ...testForm, duration_minutes: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Syllabus Covered</label>
                <textarea
                  rows={3}
                  value={testForm.syllabus}
                  onChange={(e) => setTestForm({ ...testForm, syllabus: e.target.value })}
                  placeholder="e.g. Physics: Thermodynamics, KTG. Chemistry: Organic reaction mechanisms."
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Maximum Marks *</label>
                  <input
                    type="number"
                    required
                    value={testForm.max_marks}
                    onChange={(e) => setTestForm({ ...testForm, max_marks: Number(e.target.value) })}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Recommended eBook</label>
                  <select
                    value={testForm.recommended_ebook_id}
                    onChange={(e) => setTestForm({ ...testForm, recommended_ebook_id: e.target.value })}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                  >
                    <option value="">None</option>
                    {ebooks.map((eb) => (
                      <option key={eb.id} value={eb.id}>{eb.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="is_published"
                  checked={testForm.is_published}
                  onChange={(e) => setTestForm({ ...testForm, is_published: e.target.checked })}
                  className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="is_published" className="font-extrabold text-slate-900 dark:text-white">
                  Publish test immediately to student calendar
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setTestModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-extrabold hover:bg-blue-500 shadow-md"
                >
                  {editingTest ? 'Save Changes' : 'Create Test'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* UPLOAD FILE MODAL */}
      {uploadModalTest && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Upload File for "{uploadModalTest.test_name}"
              </h3>
              <button onClick={() => setUploadModalTest(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFileUploadSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Select File Category</label>
                <select
                  value={uploadType}
                  onChange={(e) => setUploadType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                >
                  <option value="solution_pdf">Solution PDF (Exposed after results published)</option>
                  <option value="question_paper">Question Paper PDF</option>
                  <option value="answer_key">Answer Key PDF</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Choose PDF / Document File</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  required
                  onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-semibold"
                />
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Configure Test Parameters (Displayed to Students)</p>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Total Questions</label>
                    <input
                      type="number"
                      placeholder="e.g. 10 or 90"
                      value={uploadQuestions}
                      onChange={(e) => setUploadQuestions(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Time (Minutes)</label>
                    <input
                      type="number"
                      placeholder="e.g. 10 or 180"
                      value={uploadDuration}
                      onChange={(e) => setUploadDuration(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Total Marks</label>
                    <input
                      type="number"
                      placeholder="e.g. 40 or 300"
                      value={uploadMaxMarks}
                      onChange={(e) => setUploadMaxMarks(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Passing Marks</label>
                    <input
                      type="number"
                      placeholder="e.g. 18 or 120"
                      value={uploadPassMarks}
                      onChange={(e) => setUploadPassMarks(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2 font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setUploadModalTest(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-extrabold hover:bg-blue-500 shadow-md"
                >
                  {uploading ? <Spinner className="h-4 w-4 text-white" /> : 'Upload Document'}
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* ASSIGN AUDIENCE MODAL */}
      {assignModalTest && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Assign Audience for "{assignModalTest.test_name}"
              </h3>
              <button onClick={() => setAssignModalTest(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAssignSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Assign Target Type *</label>
                <select
                  value={assignType}
                  onChange={(e) => setAssignType(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                >
                  <option value="all">All Registered Students (Open)</option>
                  <option value="batch">Specific Batch</option>
                  <option value="institution">Partner School / Institution</option>
                  <option value="individual">Individual Student</option>
                </select>
              </div>

              {assignType !== 'all' && (
                <div>
                  <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Target ID *</label>
                  <input
                    type="number"
                    required
                    placeholder="Enter ID number"
                    value={assignTargetId}
                    onChange={(e) => setAssignTargetId(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                  />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setAssignModalTest(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-extrabold hover:bg-purple-500 shadow-md"
                >
                  Save Assignment
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* MISSED TEST OVERRIDE MODAL */}
      {overrideModalTest && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Grant Missed-Test Access Override
              </h3>
              <button onClick={() => setOverrideModalTest(null)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleOverrideSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Student User ID *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 5"
                  value={overrideStudentId}
                  onChange={(e) => setOverrideStudentId(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Access Valid From *</label>
                <input
                  type="datetime-local"
                  required
                  value={overrideValidFrom}
                  onChange={(e) => setOverrideValidFrom(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Access Valid Until *</label>
                <input
                  type="datetime-local"
                  required
                  value={overrideValidUntil}
                  onChange={(e) => setOverrideValidUntil(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Admin Approval Note</label>
                <input
                  type="text"
                  placeholder="e.g. Approved medical leave extension"
                  value={overrideNote}
                  onChange={(e) => setOverrideNote(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-semibold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setOverrideModalTest(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-600 text-white font-extrabold hover:bg-amber-500 shadow-md"
                >
                  Grant Override
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* CREATE EBOOK MODAL */}
      {ebookModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Add Recommended eBook</h3>
              <button onClick={() => setEbookModalOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEbook} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">eBook Title *</label>
                <input
                  type="text"
                  required
                  value={newEbook.title}
                  onChange={(e) => setNewEbook({ ...newEbook, title: e.target.value })}
                  placeholder="e.g. Physics Formula Handbook 2026"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Author</label>
                <input
                  type="text"
                  value={newEbook.author}
                  onChange={(e) => setNewEbook({ ...newEbook, author: e.target.value })}
                  placeholder="e.g. EDVEDUM Faculty Team"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">PDF URL *</label>
                <input
                  type="url"
                  required
                  value={newEbook.pdf_url}
                  onChange={(e) => setNewEbook({ ...newEbook, pdf_url: e.target.value })}
                  placeholder="https://edvedum.com/ebooks/physics_guide.pdf"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-semibold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEbookModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 text-white font-extrabold hover:bg-blue-500 shadow-md"
                >
                  Save eBook
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* CREATE BATCH MODAL */}
      {batchModalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Create Student Batch</h3>
              <button onClick={() => setBatchModalOpen(false)} className="text-slate-400 hover:text-slate-700 dark:hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateBatch} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Batch Name *</label>
                <input
                  type="text"
                  required
                  value={newBatch.name}
                  onChange={(e) => setNewBatch({ ...newBatch, name: e.target.value })}
                  placeholder="e.g. JEE-2026-SUPER30"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-bold mb-1">Description</label>
                <input
                  type="text"
                  value={newBatch.description}
                  onChange={(e) => setNewBatch({ ...newBatch, description: e.target.value })}
                  placeholder="e.g. Top ranker intensive practice batch"
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-2.5 font-semibold"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setBatchModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-600 text-white font-extrabold hover:bg-purple-500 shadow-md"
                >
                  Create Batch
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
