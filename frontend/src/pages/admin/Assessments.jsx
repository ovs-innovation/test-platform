import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { adminService } from '../../lib/services.js';
import { Spinner, Badge } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import { useToast } from '../../context/ToastContext.jsx';
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
  Filter,
  Send,
  Sparkles,
  Trophy
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

  // Leaderboard / Rank Results Modal State
  const [leaderboardModalTest, setLeaderboardModalTest] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState(null);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);

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
      toast.error(err.message || 'Action failed');
    }
  };

  const toast = useToast();

  // Custom Notification Modal State
  const [notifyModalTest, setNotifyModalTest] = useState(null);
  const [customNotifMsg, setCustomNotifMsg] = useState('');
  const [sendingNotif, setSendingNotif] = useState(false);

  // Custom Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    title: '',
    description: '',
    confirmText: 'Confirm',
    confirmVariant: 'danger',
    onConfirm: null,
  });

  const handleTogglePublish = async (test) => {
    try {
      await adminService.togglePublishTest(test.id, !test.is_published);
      toast.success(`Test ${!test.is_published ? 'published' : 'unpublished'} successfully!`);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Action failed');
    }
  };

  const handleDeleteTest = (test) => {
    setConfirmModal({
      isOpen: true,
      title: 'Delete Assessment Test',
      description: `Are you sure you want to delete test "${test.test_name || test.title}"? Enrolled students will no longer see this test.`,
      confirmText: 'Delete Test',
      confirmVariant: 'danger',
      onConfirm: async () => {
        try {
          const res = await adminService.deleteTest(test.id);
          toast.success(res.message || 'Test deleted successfully');
          loadData();
        } catch (err) {
          toast.error(err.message || 'Delete failed');
        } finally {
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const handleOpenLeaderboard = async (testId) => {
    const targetTest = tests.find((t) => t.id === testId);
    setLeaderboardModalTest(targetTest || { id: testId });
    setLeaderboardLoading(true);
    try {
      const data = await adminService.getTestParticipation(testId);
      setLeaderboardData(data);
    } catch (err) {
      toast.error(err.message || 'Failed to load test leaderboard');
    } finally {
      setLeaderboardLoading(false);
    }
  };

  const handleGenerateResults = (testId) => {
    const targetTest = tests.find((t) => t.id === testId);
    setConfirmModal({
      isOpen: true,
      title: 'Publish Test Results & Ranks',
      description: `Trigger manual rank calculation, percentile benchmarking, and result publishing for "${targetTest?.test_name || 'this test'}"?`,
      confirmText: 'Publish Results & Ranks',
      confirmVariant: 'primary',
      onConfirm: async () => {
        try {
          const res = await adminService.generateResults(testId);
          toast.success(res.message || 'Results and ranks published successfully!');
          loadData();
          handleOpenLeaderboard(testId);
        } catch (err) {
          toast.error(err.message || 'Result generation failed');
        } finally {
          setConfirmModal((prev) => ({ ...prev, isOpen: false }));
        }
      },
    });
  };

  const handleNotifyReminder = (test) => {
    const testObj = typeof test === 'object' ? test : tests.find((t) => t.id === test);
    if (!testObj) return;
    setNotifyModalTest(testObj);
    const defaultMsg = `Reminder: Your proctored test '${testObj?.test_name || 'Assessment'}' is scheduled. Please log in on time to start your exam.`;
    setCustomNotifMsg(defaultMsg);
  };

  const submitNotifyReminder = async (e) => {
    e.preventDefault();
    if (!notifyModalTest) return;
    setSendingNotif(true);
    try {
      const res = await adminService.notifyTestReminder(notifyModalTest.id, customNotifMsg);
      toast.success(res.message || 'Notification reminder sent to all enrolled candidates!');
      setNotifyModalTest(null);
    } catch (err) {
      toast.error(err.message || 'Notification failed');
    } finally {
      setSendingNotif(false);
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
    if (!uploadFile) return toast.error('Please select a file to upload');

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
        toast.success('File uploaded successfully & test parameters updated!');
        setUploadModalTest(null);
        setUploadFile(null);
        loadData();
      } catch (err) {
        toast.error(err.message || 'Upload failed');
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
      toast.success('Test audience assignment saved!');
      setAssignModalTest(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Assignment failed');
    }
  };

  const handleOverrideSubmit = async (e) => {
    e.preventDefault();
    if (!overrideStudentId || !overrideValidFrom || !overrideValidUntil) {
      return toast.error('Student ID, Valid From, and Valid Until dates are required');
    }
    try {
      await adminService.setMissedTestOverride(overrideModalTest.id, {
        student_id: Number(overrideStudentId),
        valid_from: overrideValidFrom,
        valid_until: overrideValidUntil,
        note: overrideNote,
      });
      toast.success('Special missed-test access override granted!');
      setOverrideModalTest(null);
      loadData();
    } catch (err) {
      toast.error(err.message || 'Override failed');
    }
  };

  const handleCreateEbook = async (e) => {
    e.preventDefault();
    try {
      await adminService.createEbook(newEbook);
      toast.success('Recommended eBook created successfully!');
      setEbookModalOpen(false);
      setNewEbook({ title: '', author: '', description: '', pdf_url: '' });
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to create eBook');
    }
  };

  const handleCreateBatch = async (e) => {
    e.preventDefault();
    try {
      await adminService.createBatch(newBatch);
      toast.success('Student batch created successfully!');
      setBatchModalOpen(false);
      setNewBatch({ name: '', description: '' });
      loadData();
    } catch (err) {
      toast.error(err.message || 'Failed to create batch');
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
          className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl shrink-0 whitespace-nowrap transition ${
            activeTab === 'tests'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <CalendarDays className="h-4 w-4" /> All Assessments ({tests.length})
        </button>
        <button
          onClick={() => setActiveTab('ebooks')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl shrink-0 whitespace-nowrap transition ${
            activeTab === 'ebooks'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <BookOpen className="h-4 w-4" /> Recommended eBooks ({ebooks.length})
        </button>
        <button
          onClick={() => setActiveTab('batches')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl shrink-0 whitespace-nowrap transition ${
            activeTab === 'batches'
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
          }`}
        >
          <Users className="h-4 w-4" /> Student Batches ({batches.length})
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-extrabold rounded-xl shrink-0 whitespace-nowrap transition ${
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
          {/* TAB 1: TESTS LIST */}
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
                    className="rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 focus:outline-none w-full sm:w-auto"
                  >
                    <option value="All">All Test Types</option>
                    {TEST_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden sm:block bg-white dark:bg-[#111827] rounded-3xl border border-slate-200 dark:border-slate-800 shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[850px] text-left border-collapse">
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
                                onClick={() => handleOpenLeaderboard(t.id)}
                                className="p-1.5 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-100"
                                title="View Rank Leaderboard & Scorecards"
                              >
                                <Trophy className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleNotifyReminder(t)}
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

              {/* Mobile Responsive Cards */}
              <div className="block sm:hidden space-y-3.5">
                {filteredTests.length === 0 ? (
                  <div className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 text-center text-xs text-slate-400">
                    No tests found matching your criteria.
                  </div>
                ) : (
                  filteredTests.map((t) => (
                    <div
                      key={t.id}
                      className="bg-white dark:bg-[#111827] rounded-2xl border border-slate-200/90 dark:border-slate-800 p-4 space-y-3 shadow-sm"
                    >
                      {/* Top Header Row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <Link
                            to={`/admin/assessments/${t.id}`}
                            className="font-black text-slate-900 dark:text-white text-sm hover:text-blue-600 transition block leading-tight"
                          >
                            {t.test_name}
                          </Link>
                          <div className="flex flex-wrap items-center gap-1.5 mt-1.5">
                            <span className="bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-400 px-2 py-0.5 rounded-md text-[10px] font-extrabold border border-blue-200 dark:border-blue-800">
                              {t.test_type}
                            </span>
                            {t.solution_pdf_url && (
                              <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200">
                                Solution Uploaded
                              </span>
                            )}
                          </div>
                        </div>

                        {t.is_published ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-lg text-[10px] font-extrabold shrink-0">
                            <CheckCircle2 className="h-3 w-3" /> Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-slate-500/10 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 px-2 py-0.5 rounded-lg text-[10px] font-bold shrink-0">
                            <PauseCircle className="h-3 w-3" /> Draft
                          </span>
                        )}
                      </div>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80 text-xs">
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Scheduled Date</span>
                          <span className="font-extrabold text-slate-900 dark:text-white">
                            {t.test_date ? String(t.test_date).split('T')[0] : 'Unscheduled'}
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            {(t.start_time || '09:00').slice(0, 5)} - {(t.end_time || '12:00').slice(0, 5)}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase block">Duration & Marks</span>
                          <span className="font-extrabold text-slate-900 dark:text-white block">
                            {t.duration_minutes} mins
                          </span>
                          <span className="text-[10px] text-slate-500 block">{t.max_marks} Total Marks</span>
                        </div>
                      </div>

                      {/* Mobile Action Buttons Bar */}
                      <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1 overflow-x-auto scrollbar-none">
                        <Link
                          to={`/admin/assessments/${t.id}`}
                          className="px-2.5 py-1.5 rounded-lg border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 font-bold text-[11px] flex items-center gap-1 shrink-0"
                        >
                          <FileText className="h-3.5 w-3.5" /> Edit Paper
                        </Link>
                        
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            onClick={() => openEditModal(t)}
                            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                            title="Edit Schedule"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenUploadModal(t)}
                            className="p-1.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400"
                            title="Upload Question Paper / Solution"
                          >
                            <Upload className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setAssignModalTest(t)}
                            className="p-1.5 rounded-lg border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400"
                            title="Assign Audience"
                          >
                            <UserCheck className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => setOverrideModalTest(t)}
                            className="p-1.5 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400"
                            title="Access Override"
                          >
                            <Clock className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleGenerateResults(t.id)}
                            className="p-1.5 rounded-lg border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400"
                            title="Publish Ranks"
                          >
                            <Award className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenLeaderboard(t.id)}
                            className="p-1.5 rounded-lg border border-amber-200 dark:border-amber-800 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            title="View Leaderboard"
                          >
                            <Trophy className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleNotifyReminder(t)}
                            className="p-1.5 rounded-lg border border-cyan-200 dark:border-cyan-800 bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400"
                            title="Send Notification"
                          >
                            <BellRing className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleTogglePublish(t)}
                            className="p-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                            title={t.is_published ? 'Unpublish' : 'Publish'}
                          >
                            {t.is_published ? <PauseCircle className="h-3.5 w-3.5 text-amber-500" /> : <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />}
                          </button>
                          <button
                            onClick={() => handleDeleteTest(t)}
                            className="p-1.5 rounded-lg text-rose-500 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
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
                    {e.pdf_url && (
                      <a
                        href={e.pdf_url.startsWith('http') ? e.pdf_url : `http://127.0.0.1:5000${e.pdf_url.startsWith('/') ? '' : '/'}${e.pdf_url}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 truncate"
                      >
                        <FileText className="h-3.5 w-3.5 shrink-0" />
                        <span>Open PDF</span>
                      </a>
                    )}
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
                  type="text"
                  required
                  value={newEbook.pdf_url}
                  onChange={(e) => setNewEbook({ ...newEbook, pdf_url: e.target.value })}
                  placeholder="/ebooks/neet-physics-handbook.pdf or https://..."
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

      {/* 1. CLEAN NOTIFICATION REMINDER MODAL */}
      {notifyModalTest && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3.5">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <BellRing className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Send Student Test Reminder</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Broadcast custom push notice to all enrolled candidates.</p>
                </div>
              </div>
              <button
                onClick={() => setNotifyModalTest(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-white transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">Target Assessment</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white">{notifyModalTest.test_name}</p>
            </div>

            <form onSubmit={submitNotifyReminder} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="block text-slate-700 dark:text-slate-300 font-bold">Custom Notification Message</label>
                  <span className="text-[10.5px] text-slate-400 font-mono">{customNotifMsg.length} chars</span>
                </div>
                <textarea
                  rows={3}
                  required
                  value={customNotifMsg}
                  onChange={(e) => setCustomNotifMsg(e.target.value)}
                  placeholder="Write your custom reminder message for students..."
                  className="w-full rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 p-3 font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              {/* Quick Template Selector */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500">Quick Reminder Templates:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setCustomNotifMsg(`Reminder: Your proctored test '${notifyModalTest.test_name}' is scheduled. Please prepare your system.`)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold hover:bg-cyan-500/10 hover:text-cyan-500 hover:border-cyan-500/30 transition cursor-pointer"
                  >
                    Default Schedule
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomNotifMsg(`Exam Alert: '${notifyModalTest.test_name}' is live now! Log in immediately to complete your test.`)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold hover:bg-blue-500/10 hover:text-blue-500 hover:border-blue-500/30 transition cursor-pointer"
                  >
                    Test Live Alert
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomNotifMsg(`Urgent Notice: Only 1 hour remaining to submit your attempt for '${notifyModalTest.test_name}'.`)}
                    className="px-2.5 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-[11px] font-bold hover:bg-rose-500/10 hover:text-rose-500 hover:border-rose-500/30 transition cursor-pointer"
                  >
                    Deadline Warning
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setNotifyModalTest(null)}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingNotif}
                  className="px-5 py-2.5 rounded-xl bg-cyan-600 text-white font-extrabold hover:bg-cyan-500 shadow-lg shadow-cyan-500/20 transition flex items-center gap-2 cursor-pointer"
                >
                  {sendingNotif ? <Spinner className="h-4 w-4" /> : <Send className="h-4 w-4" />}
                  <span>Send Notification</span>
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* 2. CLEAN CONFIRMATION MODAL */}
      {confirmModal.isOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 space-y-4 shadow-2xl relative text-center">
            <div className={`mx-auto h-12 w-12 rounded-2xl flex items-center justify-center border ${
              confirmModal.confirmVariant === 'danger'
                ? 'bg-rose-500/10 text-rose-600 border-rose-500/20'
                : 'bg-blue-500/10 text-blue-600 border-blue-500/20'
            }`}>
              {confirmModal.confirmVariant === 'danger' ? (
                <Trash2 className="h-6 w-6" />
              ) : (
                <Sparkles className="h-6 w-6" />
              )}
            </div>

            <div className="space-y-1.5">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{confirmModal.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {confirmModal.description}
              </p>
            </div>

            <div className="flex justify-center gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setConfirmModal((prev) => ({ ...prev, isOpen: false }))}
                className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmModal.onConfirm}
                className={`px-5 py-2.5 rounded-xl font-extrabold text-white shadow-lg transition cursor-pointer ${
                  confirmModal.confirmVariant === 'danger'
                    ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-500/20'
                    : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
                }`}
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* 3. RANK LEADERBOARD & SCORECARD MODAL */}
      {leaderboardModalTest && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-4xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-white/20 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded-md backdrop-blur-xs">
                    🏆 OFFICIAL RANK LEADERBOARD
                  </span>
                  {leaderboardData?.test?.result_publish_time && (
                    <span className="bg-emerald-500/30 text-emerald-200 border border-emerald-400/30 text-[11px] font-bold px-2 py-0.5 rounded-md">
                      ✓ Published
                    </span>
                  )}
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  {leaderboardModalTest.test_name || 'Assessment Results'}
                </h2>
                <p className="text-xs text-blue-100 mt-1">
                  All India Ranks & Candidate Percentiles calculated across registered institutions
                </p>
              </div>

              <button
                onClick={() => {
                  setLeaderboardModalTest(null);
                  setLeaderboardData(null);
                }}
                className="rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Stats Summary Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800">
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Attempted</p>
                <p className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                  {leaderboardLoading ? '…' : (leaderboardData?.stats?.totalAttempted || 0)} Students
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Top Score (AIR #1)</p>
                <p className="text-lg font-black text-blue-600 dark:text-blue-400 mt-0.5">
                  {leaderboardLoading ? '…' : `${leaderboardData?.stats?.topScore || 0} / ${leaderboardModalTest.max_marks || 200}`}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Cohort Mean</p>
                <p className="text-lg font-black text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {leaderboardLoading ? '…' : `${leaderboardData?.stats?.avgScore || 0}%`}
                </p>
              </div>
              <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">In Progress</p>
                <p className="text-lg font-black text-amber-600 dark:text-amber-400 mt-0.5">
                  {leaderboardLoading ? '…' : (leaderboardData?.stats?.totalInProgress || 0)} Students
                </p>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {leaderboardLoading ? (
                <div className="py-12 text-center space-y-3">
                  <Spinner className="h-8 w-8 text-blue-600 mx-auto" />
                  <p className="text-xs font-bold text-slate-500">Loading student scores & AIR rankings…</p>
                </div>
              ) : !leaderboardData?.attempts || leaderboardData.attempts.length === 0 ? (
                <div className="py-12 text-center space-y-2">
                  <Trophy className="h-10 w-10 text-slate-300 mx-auto" />
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-200">No Student Submissions Yet</p>
                  <p className="text-xs text-slate-400">Ranks will calculate automatically when students complete this test.</p>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800">
                    <thead className="bg-slate-100 dark:bg-slate-900">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-extrabold text-slate-500 uppercase">Rank</th>
                        <th className="px-4 py-3 text-left text-xs font-extrabold text-slate-500 uppercase">Candidate Name</th>
                        <th className="px-4 py-3 text-left text-xs font-extrabold text-slate-500 uppercase">Institution / Source</th>
                        <th className="px-4 py-3 text-left text-xs font-extrabold text-slate-500 uppercase">Score & Marks</th>
                        <th className="px-4 py-3 text-left text-xs font-extrabold text-slate-500 uppercase">Percentile</th>
                        <th className="px-4 py-3 text-left text-xs font-extrabold text-slate-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80 bg-white dark:bg-[#0f172a]">
                      {leaderboardData.attempts.map((att, idx) => (
                        <tr key={att.id || idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition">
                          <td className="px-4 py-3 text-xs font-black">
                            {att.air_rank === 1 ? (
                              <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-black">
                                🥇 AIR #1
                              </span>
                            ) : att.air_rank === 2 ? (
                              <span className="inline-flex items-center gap-1 bg-slate-300/30 text-slate-700 dark:text-slate-300 border border-slate-400/30 px-2.5 py-0.5 rounded-full font-black">
                                🥈 AIR #2
                              </span>
                            ) : att.air_rank === 3 ? (
                              <span className="inline-flex items-center gap-1 bg-amber-700/15 text-amber-700 dark:text-amber-500 border border-amber-700/30 px-2.5 py-0.5 rounded-full font-black">
                                🥉 AIR #3
                              </span>
                            ) : att.air_rank ? (
                              <span className="text-slate-600 dark:text-slate-400 font-bold">
                                AIR #{att.air_rank}
                              </span>
                            ) : (
                              <span className="text-slate-400 font-semibold">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <p className="font-extrabold text-slate-900 dark:text-white mb-0.5">{att.student_name}</p>
                            <p className="text-[11px] text-slate-400 font-medium">{att.student_email}</p>
                          </td>
                          <td className="px-4 py-3 text-xs">
                            {att.institution_name ? (
                              <span className="inline-flex items-center gap-1 text-[11px] font-extrabold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/60 px-2 py-0.5 rounded-md">
                                🏫 {att.institution_name}
                              </span>
                            ) : (
                              <span className="text-[11px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                                🌐 Direct Signup
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <p className="font-extrabold text-slate-900 dark:text-white">
                              {att.score != null ? att.score : `${att.percentage || 0}%`}
                            </p>
                            {att.percentage != null && (
                              <p className="text-[11px] text-slate-400 font-medium">{att.percentage}% Accuracy</p>
                            )}
                          </td>
                          <td className="px-4 py-3 text-xs font-black text-blue-600 dark:text-blue-400">
                            {att.percentile != null ? `Top ${att.percentile}%` : '—'}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            {att.submitted_at ? (
                              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 text-[11px] font-bold border border-emerald-500/30">
                                <CheckCircle2 className="h-3 w-3" /> Submitted
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 px-2 py-0.5 text-[11px] font-bold border border-amber-500/30">
                                <Clock className="h-3 w-3" /> In Progress
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setLeaderboardModalTest(null);
                  setLeaderboardData(null);
                }}
                className="px-5 py-2 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs hover:opacity-90 transition cursor-pointer"
              >
                Close Leaderboard
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
