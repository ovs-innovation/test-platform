import { useEffect, useState } from 'react';
import {
  Link2 as LinkIcon,
  Search,
  Clock,
  Award,
  Calendar,
  FileText,
  Upload,
  Trash2,
  ExternalLink,
  FileCheck,
  Users,
  UserCheck,
  Building2,
  GraduationCap,
  Globe,
  Check,
  AlertCircle,
  Info,
  Sparkles,
  X,
  ChevronRight,
  UserPlus,
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { testSeriesService, adminService } from '../../lib/services.js';
import { LoadingScreen, ErrorState, Spinner, Badge, ConfirmModal } from '../../components/ui.jsx';
import { AdminHeader } from '../../components/admin/AdminUI.jsx';
import Modal from '../../components/Modal.jsx';
import { useToast } from '../../context/ToastContext.jsx';
import { getTestSeriesCover, getSeriesClassBadge } from '../../lib/testSeriesCover.js';
import { getMediaUrl } from '../../lib/media.js';

export default function AdminTestSeries() {
  const toast = useToast();
  const [list, setList] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [state, setState] = useState('loading');
  const [confirmState, setConfirmState] = useState({ isOpen: false, title: '', message: '', confirmText: 'Unlink', onConfirm: null, loading: false });
  
  // Helper to determine target class
  const resolveTargetClass = (s) => getSeriesClassBadge(s);

  // Series Modal
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: 0,
    exam_type: 'NEET UG',
    target_class: 'Class 12',
    program_type: 'One Year',
    target_year: '2027',
    planned_tests: 0,
    duration_months: 12,
    duration_text: '',
    is_featured: false,
    is_active: true,
    validity_days: '',
    image_url: '',
    is_free: false,
    display_order: 0,
    brochure_url: '',
    brochure_name: '',
  });
  const [uploadingBrochure, setUploadingBrochure] = useState(false);

  // Link Test Modal
  const [linkModal, setLinkModal] = useState(null);
  const [testSearch, setTestSearch] = useState('');
  const [selectedTestId, setSelectedTestId] = useState('');

  // Delete confirm modal states
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [seriesToDelete, setSeriesToDelete] = useState(null);
  const [saving, setSaving] = useState(false);

  // Assign Test Series Modal State
  const [assignModalSeries, setAssignModalSeries] = useState(null);
  const [assignTab, setAssignTab] = useState('form'); // 'form' | 'students' | 'rules'
  const [assignAudienceType, setAssignAudienceType] = useState('student'); // 'student' | 'batch' | 'institution' | 'all'
  const [assignTargetId, setAssignTargetId] = useState('');
  const [assignValidityDays, setAssignValidityDays] = useState('365');
  const [assignNotes, setAssignNotes] = useState('');
  const [assignNotify, setAssignNotify] = useState(true);
  const [assigningLoading, setAssigningLoading] = useState(false);
  const [loadingAssignmentsData, setLoadingAssignmentsData] = useState(false);
  const [candidatesList, setCandidatesList] = useState([]);
  const [batchesList, setBatchesList] = useState([]);
  const [institutionsList, setInstitutionsList] = useState([]);
  const [currentAssignments, setCurrentAssignments] = useState([]);
  const [currentEnrollments, setCurrentEnrollments] = useState([]);
  const [studentSearchQuery, setStudentSearchQuery] = useState('');
  const [enrollmentSearchQuery, setEnrollmentSearchQuery] = useState('');

  const handleOpenAssign = async (s, initialTab = 'form') => {
    setAssignModalSeries(s);
    setAssignTab(initialTab);
    setAssignAudienceType('student');
    setAssignTargetId('');
    setAssignValidityDays((s.validity_days && Number(s.validity_days) > 0) ? String(s.validity_days) : '365');
    setAssignNotes('');
    setAssignNotify(true);
    setStudentSearchQuery('');
    setEnrollmentSearchQuery('');
    setLoadingAssignmentsData(true);

    try {
      const [assignmentsData, candidatesData, batchesData, instData] = await Promise.all([
        testSeriesService.getAssignments(s.id).catch(() => ({ assignments: [], enrollments: [] })),
        adminService.candidates().catch(() => []),
        adminService.batches().catch(() => []),
        adminService.partnerSchools().catch(() => ({ institutions: [] })),
      ]);

      setCurrentAssignments(assignmentsData?.assignments || []);
      setCurrentEnrollments(assignmentsData?.enrollments || []);
      setCandidatesList(Array.isArray(candidatesData) ? candidatesData : []);
      setBatchesList(Array.isArray(batchesData) ? batchesData : []);
      setInstitutionsList(Array.isArray(instData?.institutions) ? instData.institutions : Array.isArray(instData) ? instData : []);
    } catch {
      toast.error('Failed to load assignment options');
    } finally {
      setLoadingAssignmentsData(false);
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!assignModalSeries) return;

    if (assignAudienceType !== 'all' && !assignTargetId) {
      if (assignAudienceType === 'student') return toast.error('Please select a student candidate');
      if (assignAudienceType === 'batch') return toast.error('Please select a student batch');
      if (assignAudienceType === 'institution') return toast.error('Please select a partner school / institution');
    }

    try {
      setAssigningLoading(true);
      const res = await testSeriesService.assign(assignModalSeries.id, {
        assigned_to_type: assignAudienceType,
        assigned_to_id: assignAudienceType === 'all' ? null : Number(assignTargetId),
        validity_days: assignValidityDays ? Number(assignValidityDays) : null,
        notes: assignNotes || '',
        notify: assignNotify,
      });

      toast.success(res?.message || 'Test series assigned successfully!');

      const updated = await testSeriesService.getAssignments(assignModalSeries.id).catch(() => null);
      if (updated) {
        setCurrentAssignments(updated.assignments || []);
        setCurrentEnrollments(updated.enrollments || []);
      }
      load();

      setAssignTab('students');
      setAssignTargetId('');
      setAssignNotes('');
    } catch (err) {
      toast.error(err.message || 'Failed to assign test series');
    } finally {
      setAssigningLoading(false);
    }
  };

  const handleRevokeEnrollment = (enr) => {
    setConfirmState({
      isOpen: true,
      title: 'Revoke Student Access',
      message: `Are you sure you want to revoke access to "${assignModalSeries?.title}" for student "${enr.student_name || 'Student'}" (${enr.student_email})?`,
      confirmText: 'Revoke Access',
      onConfirm: async () => {
        try {
          setConfirmState((prev) => ({ ...prev, loading: true }));
          await testSeriesService.revokeEnrollment(assignModalSeries.id, enr.id);
          toast.success(`Access revoked for ${enr.student_name || 'student'}`);
          setCurrentEnrollments((prev) => prev.filter((item) => item.id !== enr.id));
          setConfirmState((prev) => ({ ...prev, isOpen: false, loading: false }));
          load();
        } catch (err) {
          toast.error(err.message || 'Failed to revoke student access');
          setConfirmState((prev) => ({ ...prev, loading: false }));
        }
      },
    });
  };

  const handleDeleteAssignmentRule = (rule) => {
    setConfirmState({
      isOpen: true,
      title: 'Delete Assignment Rule',
      message: `Delete assignment rule for "${rule.target_name}"? Existing active student enrollments will remain unless revoked individually.`,
      confirmText: 'Delete Rule',
      onConfirm: async () => {
        try {
          setConfirmState((prev) => ({ ...prev, loading: true }));
          await testSeriesService.deleteAssignment(assignModalSeries.id, rule.id);
          toast.success('Assignment rule deleted');
          setCurrentAssignments((prev) => prev.filter((item) => item.id !== rule.id));
          setConfirmState((prev) => ({ ...prev, isOpen: false, loading: false }));
        } catch (err) {
          toast.error(err.message || 'Failed to delete assignment rule');
          setConfirmState((prev) => ({ ...prev, loading: false }));
        }
      },
    });
  };

  const load = async () => {
    setState('loading');
    try {
      const [seriesData, testsData] = await Promise.all([
        testSeriesService.list(),
        adminService.tests().catch(() => []),
      ]);
      setList(seriesData || []);
      setAvailableTests(testsData || []);
      setState('done');
    } catch {
      setState('error');
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleOpenEdit = (s) => {
    setEditing(s);
    const resolvedClass = resolveTargetClass(s);
    setForm({
      title: s.title || '',
      description: s.description || '',
      price: Number(s.price) || 0,
      exam_type: s.exam_type || 'NEET UG',
      target_class: resolvedClass,
      program_type: s.program_type || (resolvedClass === '11 + 12' ? 'Two Year' : resolvedClass === 'Dropper / 12 Passed' ? 'Repeater' : 'One Year'),
      target_year: s.target_year || (resolvedClass === '11 + 12' ? '2028' : '2027'),
      planned_tests: s.planned_tests ?? (s.test_count || 0),
      duration_months: s.duration_months || (resolvedClass === '11 + 12' ? 24 : 12),
      duration_text: s.duration_text || '',
      is_featured: Boolean(s.is_featured),
      is_active: s.is_active !== false,
      validity_days: (s.validity_days !== null && s.validity_days !== undefined && Number(s.validity_days) > 0) ? Number(s.validity_days) : '',
      image_url: s.image_url || '',
      is_free: Boolean(s.is_free) || Number(s.price) === 0,
      display_order: s.display_order || 0,
      brochure_url: s.brochure_url || '',
      brochure_name: s.brochure_name || '',
    });
    setModal(true);
  };

  const handleOpenCreate = () => {
    setEditing(null);
    setForm({
      title: '',
      description: '',
      price: 0,
      exam_type: 'NEET UG',
      target_class: 'Class 12',
      program_type: 'One Year',
      target_year: '2027',
      planned_tests: 0,
      duration_months: 12,
      duration_text: '',
      is_featured: false,
      is_active: true,
      validity_days: '',
      image_url: '',
      is_free: false,
      display_order: 0,
      brochure_url: '',
      brochure_name: '',
    });
    setModal(true);
  };

  const handleClassChange = (selectedClass) => {
    setForm((f) => {
      let program_type = 'One Year';
      let target_year = '2027';
      let duration_months = 12;
      let duration_text = f.duration_text;

      if (selectedClass === '11 + 12') {
        program_type = 'Two Year';
        target_year = '2028';
        duration_months = 24;
      } else if (selectedClass === 'Dropper / 12 Passed') {
        program_type = 'Repeater';
        target_year = '2027';
        duration_months = 12;
        if (!duration_text) {
          duration_text = 'October 2026 – NEET 2027 (Exam Date to be updated after official announcement)';
        }
      } else {
        program_type = 'One Year';
        target_year = '2027';
        duration_months = 12;
      }

      return {
        ...f,
        target_class: selectedClass,
        program_type,
        target_year,
        duration_months,
        duration_text,
      };
    });
  };

  const handleTitleChange = (val) => {
    setForm((f) => {
      const updates = { ...f, title: val };
      if (/two[- ]?year|2028|2[- ]year|11\s*(?:&|and|\+)\s*12/i.test(val) && f.target_class !== '11 + 12') {
        updates.target_class = '11 + 12';
        updates.program_type = 'Two Year';
        updates.target_year = '2028';
        updates.duration_months = 24;
      } else if (/rm|repeater|dropper/i.test(val) && f.target_class !== 'Dropper / 12 Passed') {
        updates.target_class = 'Dropper / 12 Passed';
        updates.program_type = 'Repeater';
        updates.target_year = '2027';
        updates.duration_months = 12;
        if (!updates.duration_text) {
          updates.duration_text = 'October 2026 – NEET 2027 (Exam Date to be updated after official announcement)';
        }
      }
      if (/neet/i.test(val) && (f.exam_type === 'JEE Main' || f.exam_type === 'General')) {
        updates.exam_type = /neet[- ]?pg/i.test(val) ? 'NEET PG' : 'NEET UG';
      }
      return updates;
    });
  };

  const handleBrochureFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      toast.error('Brochure file size must not exceed 20MB');
      return;
    }

    setUploadingBrochure(true);
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const base64Data = reader.result;
          const res = await testSeriesService.uploadBrochure(base64Data, file.name);
          if (res?.url) {
            setForm((f) => ({
              ...f,
              brochure_url: res.url,
              brochure_name: file.name,
            }));
            toast.success('Brochure uploaded successfully!');
          } else {
            throw new Error('Upload returned empty URL');
          }
        } catch (err) {
          toast.error(err.message || 'Failed to upload brochure');
        } finally {
          setUploadingBrochure(false);
        }
      };
      reader.onerror = () => {
        toast.error('Failed to read file');
        setUploadingBrochure(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      toast.error('Error selecting file');
      setUploadingBrochure(false);
    }
  };

  const handleRemoveBrochure = () => {
    setForm((f) => ({
      ...f,
      brochure_url: '',
      brochure_name: '',
    }));
    toast.info('Brochure detached. Click Save Changes to update.');
  };

  const handleOpenDelete = (s) => {
    setSeriesToDelete(s);
    setDeleteConfirmOpen(true);
  };

  const handleOpenLinkModal = (s) => {
    setLinkModal(s);
    setTestSearch('');
    setSelectedTestId('');
  };

  const handleSubmitSeries = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        validity_days: (!form.validity_days || Number(form.validity_days) <= 0)
          ? null
          : Number(form.validity_days),
        duration_months: (!form.duration_months || Number(form.duration_months) <= 0) ? null : Number(form.duration_months),
      };
      if (editing) {
        await testSeriesService.update(editing.id, payload);
        toast.success('Test series updated successfully');
      } else {
        await testSeriesService.create(payload);
        toast.success('Test series created successfully');
      }
      setModal(false);
      load();
    } catch (err) {
      toast.error(err.message || 'Operation failed');
    } finally {
      setSaving(false);
    }
  };

  const handleLinkTestSubmit = async (e) => {
    e.preventDefault();
    if (!linkModal || !selectedTestId) return;
    setSaving(true);
    try {
      await testSeriesService.link(linkModal.id, Number(selectedTestId));
      toast.success('Test linked to series successfully');
      setLinkModal(null);
      load();
    } catch (err) {
      toast.error(err.message || 'Failed to link test');
    } finally {
      setSaving(false);
    }
  };

  const handleUnlinkTest = (seriesId, testId, testTitle) => {
    setConfirmState({
      isOpen: true,
      title: 'Unlink Assessment from Series',
      message: `Are you sure you want to unlink test "${testTitle}" from this series? It will remain available in the main assessments repository.`,
      confirmText: 'Unlink Test',
      loading: false,
      onConfirm: async () => {
        setConfirmState((prev) => ({ ...prev, loading: true }));
        try {
          await testSeriesService.unlink(seriesId, testId);
          toast.success('Test unlinked successfully');
          setConfirmState((prev) => ({ ...prev, isOpen: false, loading: false }));
          load();
        } catch (err) {
          toast.error(err.message || 'Failed to unlink test');
          setConfirmState((prev) => ({ ...prev, loading: false }));
        }
      },
    });
  };

  const handleToggleActive = async (s) => {
    const nextState = !s.is_active;
    // Optimistic UI update for instantaneous badge & button status change
    setList((prev) =>
      prev.map((item) => (item.id === s.id ? { ...item, is_active: nextState } : item))
    );

    try {
      const res = await testSeriesService.toggleActive(s.id, nextState);
      const actualState = typeof res?.test_series?.is_active === 'boolean'
        ? res.test_series.is_active
        : nextState;
      setList((prev) =>
        prev.map((item) => (item.id === s.id ? { ...item, is_active: actualState } : item))
      );
      toast.success(`Series marked as ${actualState ? 'Active' : 'Inactive'}`);
    } catch (err) {
      // Revert state if failed
      setList((prev) =>
        prev.map((item) => (item.id === s.id ? { ...item, is_active: s.is_active } : item))
      );
      toast.error(err.message || 'Failed to toggle status');
    }
  };

  if (state === 'loading') return <LoadingScreen label="Loading test series…" />;
  if (state === 'error') return <ErrorState onRetry={load} />;

  const linkedTestIds = new Set((linkModal?.tests || []).map((t) => t.id));
  const unlinkedAvailableTests = availableTests.filter((t) => !linkedTestIds.has(t.id));

  const filteredTests = unlinkedAvailableTests.filter((t) => {
    if (!testSearch) return true;
    const q = testSearch.toLowerCase();
    const name = (t.test_name || t.title || '').toLowerCase();
    const type = (t.test_type || '').toLowerCase();
    const syllabus = (t.syllabus || '').toLowerCase();
    return name.includes(q) || type.includes(q) || syllabus.includes(q);
  });

  const handleSyncCatalogue = async () => {
    try {
      setSaving(true);
      const res = await testSeriesService.sync();
      setList(res || []);
      toast.success('Catalogue dataset successfully synced to 9 paid + 3 free series!');
    } catch {
      toast.error('Failed to sync catalogue dataset');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="w-full max-w-full space-y-6">
      <AdminHeader
        title="Test Series Catalogue"
        subtitle="Manage test packages, category tags, pricing, and link existing tests from the tests repository."
        breadcrumbs={['Test Series Packs']}
        actions={(
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleSyncCatalogue}
              disabled={saving}
            >
              {saving ? <Spinner size="sm" /> : '⚡ Sync Catalogue'}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenCreate}
            >
              + Create Series
            </button>
          </div>
        )}
      />

      <div className="space-y-4">
        {list.map((s) => (
          <div
            key={s.id}
            className="card flex flex-wrap items-center gap-4 p-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111827] hover:border-blue-500/30 transition-all"
          >
            <div className="h-16 w-28 shrink-0 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900">
              <img src={getTestSeriesCover(s)} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge color="blue">{s.exam_type}</Badge>
                <Badge color="purple">{resolveTargetClass(s)}</Badge>
                {s.is_free || Number(s.price) === 0 ? <Badge color="cyan">Free Mock</Badge> : <Badge color="indigo">Paid</Badge>}
                {s.is_featured && <Badge color="amber">Featured</Badge>}
                {s.is_active ? (
                  <Badge color="green">Active</Badge>
                ) : (
                  <Badge color="red">Inactive</Badge>
                )}
                {s.is_active && Number(s.linked_tests || 0) === 0 && (
                  <span className="rounded-md bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400">
                    ⚠️ Active package — 0 tests linked
                  </span>
                )}
                {s.brochure_url ? (
                  <a
                    href={getMediaUrl(s.brochure_url)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-md bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 text-[11px] font-bold text-purple-600 dark:text-purple-400 hover:bg-purple-500/20 transition"
                    title={s.brochure_name || 'Preview Brochure PDF'}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FileText className="h-3 w-3" />
                    <span>Brochure</span>
                    <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                  </a>
                ) : (
                  <span className="rounded-md bg-slate-100 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                    No Brochure
                  </span>
                )}
              </div>
              <h2 className="mt-2 font-extrabold text-slate-900 dark:text-white text-base sm:text-lg tracking-tight">
                {s.title}
              </h2>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1">
                <span className="text-blue-600 dark:text-blue-400 font-black">
                  {Number(s.price) === 0 || s.is_free ? 'FREE' : `₹${s.price}`}
                </span>
                {' · '}
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {s.planned_tests || 0} planned
                </span>
                {' · '}
                <span>{s.linked_tests || 0} linked</span>
                {' · '}
                <button
                  type="button"
                  onClick={() => handleOpenAssign(s, 'students')}
                  className="underline hover:text-indigo-600 dark:hover:text-indigo-400 font-bold transition cursor-pointer"
                  title="Click to view & manage enrolled students"
                >
                  {s.enrollment_count || 0} enrollments
                </button>
              </p>
              {Array.isArray(s.tests) && s.tests.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  {s.tests.map((t) => (
                    <span
                      key={t.id}
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300"
                    >
                      <span className="truncate max-w-[160px]">{t.title}</span>
                      <button
                        type="button"
                        onClick={() => handleUnlinkTest(s.id, t.id, t.title)}
                        className="text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 font-bold ml-0.5 transition"
                        title="Unlink test from series"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className={`btn-secondary !py-1.5 !px-3 text-xs ${
                  s.is_active
                    ? 'text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-500/20'
                    : 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-500/20'
                }`}
                onClick={() => handleToggleActive(s)}
              >
                {s.is_active ? 'Deactivate' : 'Activate'}
              </button>
              <button
                type="button"
                className="btn-secondary !py-1.5 !px-3 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-500/20 flex items-center gap-1.5 cursor-pointer"
                onClick={() => handleOpenAssign(s, 'form')}
                title="Assign this test series to students, batches, or schools"
              >
                <Users className="h-3.5 w-3.5" />
                <span>Assign 👥</span>
              </button>
              <button
                type="button"
                className="btn-secondary !py-1.5 !px-3 text-xs text-slate-700 dark:text-slate-200"
                onClick={() => handleOpenEdit(s)}
              >
                Edit ✏️
              </button>
              <button
                type="button"
                className="btn-secondary !py-1.5 !px-3 text-xs text-blue-600 dark:text-blue-400 font-bold"
                onClick={() => {
                  setLinkModal(s);
                  setSelectedTestId('');
                  setTestSearch('');
                }}
              >
                Link Test 🔗
              </button>
              <button
                type="button"
                className="btn-secondary !py-1.5 !px-3 text-xs text-rose-600 dark:text-rose-400"
                onClick={() => handleOpenDelete(s)}
              >
                Delete 🗑️
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* NEW / EDIT TEST SERIES MODAL (No Test Creation/Schedule Fields) */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? 'Edit Test Series' : 'Create New Test Series'}
      >
        <form onSubmit={handleSubmitSeries} className="space-y-4">
          <div>
            <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Series Name / Title</label>
            <input
              className="input"
              placeholder="e.g. NEET UG 2027 Comprehensive Test Series"
              required
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Planned Tests Count</label>
              <input
                className="input"
                type="number"
                min={0}
                placeholder="e.g. 109, 60, 39"
                value={form.planned_tests}
                onChange={(e) => setForm((f) => ({ ...f, planned_tests: Number(e.target.value) }))}
              />
              <span className="text-[10px] text-slate-400">Total planned in curriculum</span>
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Class</label>
              <select
                className="input font-semibold"
                value={form.target_class || 'Class 12'}
                onChange={(e) => handleClassChange(e.target.value)}
              >
                <option value="11 + 12">11 + 12</option>
                <option value="Class 12">12</option>
                <option value="Dropper / 12 Passed">dropper/ 12 passed</option>
              </select>
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Target Year</label>
              <input
                className="input"
                placeholder="e.g. 2027, 2028"
                value={form.target_year}
                onChange={(e) => setForm((f) => ({ ...f, target_year: e.target.value }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">
                Duration (Months) <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                className="input"
                type="number"
                min={0}
                placeholder="12"
                value={form.duration_months === null || form.duration_months === undefined || form.duration_months === '' ? '' : form.duration_months}
                onChange={(e) => setForm((f) => ({ ...f, duration_months: e.target.value === '' ? '' : Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Custom Duration Display Text</label>
              <input
                className="input"
                placeholder="e.g. October 2026 – NEET 2027 (Exam Date to be updated...)"
                value={form.duration_text}
                onChange={(e) => setForm((f) => ({ ...f, duration_text: e.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Description</label>
            <textarea
              className="input"
              rows={3}
              placeholder="Provide an overview of this series..."
              value={form.description}
              onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Price (₹)</label>
              <input
                className="input"
                type="number"
                min={0}
                required
                value={form.price}
                onChange={(e) => setForm((f) => ({ ...f, price: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">
                Validity (Days) <span className="text-[10px] text-slate-400 font-normal">(Optional)</span>
              </label>
              <input
                className="input"
                type="number"
                min={0}
                placeholder="365 (Default)"
                value={form.validity_days === null || form.validity_days === undefined || form.validity_days === '' ? '' : form.validity_days}
                onChange={(e) => setForm((f) => ({ ...f, validity_days: e.target.value === '' ? '' : Number(e.target.value) }))}
              />
              <span className="text-[10px] text-slate-400">Default: 365 days if left blank or 0</span>
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Display Order</label>
              <input
                className="input"
                type="number"
                min={0}
                value={form.display_order}
                onChange={(e) => setForm((f) => ({ ...f, display_order: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Category Tag / Exam Type</label>
              <input
                className="input"
                placeholder="e.g. NEET UG, JEE Main, NEET PG"
                value={form.exam_type}
                onChange={(e) => setForm((f) => ({ ...f, exam_type: e.target.value }))}
              />
            </div>
            <div>
              <label className="label text-[11px] font-semibold text-slate-500 mb-0.5">Cover Image URL</label>
              <input
                className="input"
                placeholder="/edvedum/banners/banner-jee-full.png"
                value={form.image_url}
                onChange={(e) => setForm((f) => ({ ...f, image_url: e.target.value }))}
              />
            </div>
          </div>

          {/* TEST-SERIES BROCHURE ATTACHMENT SECTION */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  <span>Test-Series Brochure (PDF)</span>
                </label>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Upload a PDF or document so prospective students can download the test-series brochure overview.
                </p>
              </div>
              {form.brochure_url && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400">
                  <FileCheck className="h-3 w-3" /> Attached
                </span>
              )}
            </div>

            {form.brochure_url ? (
              <div className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400 shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-xs sm:max-w-sm">
                      {form.brochure_name || 'Test_Series_Brochure.pdf'}
                    </p>
                    <a
                      href={getMediaUrl(form.brochure_url)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 mt-0.5"
                    >
                      <span>Preview Attached Brochure</span>
                      <ExternalLink className="h-2.5 w-2.5" />
                    </a>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleRemoveBrochure}
                  className="btn-secondary !py-1.5 !px-2.5 text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 flex items-center gap-1 cursor-pointer"
                  title="Remove brochure"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            ) : (
              <div className="space-y-2.5">
                <div className="flex items-center gap-3">
                  <label className={`btn-secondary text-xs flex items-center gap-2 cursor-pointer ${uploadingBrochure ? 'opacity-60 pointer-events-none' : ''}`}>
                    {uploadingBrochure ? (
                      <>
                        <Spinner size="sm" />
                        <span>Uploading Document…</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5 text-purple-600" />
                        <span>Upload Brochure (PDF/DOC)</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                      className="hidden"
                      disabled={uploadingBrochure}
                      onChange={handleBrochureFileUpload}
                    />
                  </label>
                  <span className="text-[11px] text-slate-400">Max 20MB (PDF format recommended)</span>
                </div>

                <div className="pt-1">
                  <label className="text-[10.5px] font-semibold text-slate-500 block mb-1">
                    Or paste direct Brochure URL / Drive Link:
                  </label>
                  <input
                    type="url"
                    className="input text-xs"
                    placeholder="https://... or /uploads/documents/brochure.pdf"
                    value={form.brochure_url}
                    onChange={(e) => setForm((f) => ({ ...f, brochure_url: e.target.value, brochure_name: f.brochure_name || 'Brochure.pdf' }))}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-4 pt-1">
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={form.is_active}
                onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
              />
              Active Status
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={form.is_featured}
                onChange={(e) => setForm((f) => ({ ...f, is_featured: e.target.checked }))}
              />
              Featured Series
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 font-medium">
              <input
                type="checkbox"
                checked={form.is_free}
                onChange={(e) => setForm((f) => ({ ...f, is_free: e.target.checked, price: e.target.checked ? 0 : f.price }))}
              />
              Free Tier Mock
            </label>
          </div>
          <button type="submit" className="btn-primary w-full mt-2" disabled={saving}>
            {saving ? <Spinner className="h-4 w-4" /> : editing ? 'Save Changes' : 'Create Series'}
          </button>
        </form>
      </Modal>

      {/* LINK TEST MODAL (Searchable Picker of Existing Tests from tests table) */}
      <Modal
        open={!!linkModal}
        onClose={() => setLinkModal(null)}
        title={`Link Existing Test to "${linkModal?.title}"`}
        size="lg"
      >
        <form onSubmit={handleLinkTestSubmit} className="space-y-4">
          <div className="rounded-2xl p-3.5 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-600 text-white shrink-0 shadow-xs">
              <LinkIcon className="h-4 w-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-blue-900 dark:text-cyan-300">Link Assessment to Series</h4>
              <p className="text-[11.5px] text-slate-600 dark:text-slate-400">
                Select an existing test created in the <strong>Assessments</strong> repository to attach to <strong>{linkModal?.title}</strong>.
              </p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#071126] pl-10 pr-4 py-2.5 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition shadow-2xs"
              placeholder="Search available tests by title, category, or syllabus..."
              value={testSearch}
              onChange={(e) => setTestSearch(e.target.value)}
            />
          </div>

          <div className="max-h-72 overflow-y-auto space-y-2 pr-1">
            {filteredTests.length === 0 ? (
              <div className="p-8 text-center rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-500">
                No matching tests found. Create tests in <strong>Assessments</strong> repository first.
              </div>
            ) : (
              filteredTests.map((t) => {
                const testTitle = t.test_name || t.title;
                const isSelected = String(selectedTestId) === String(t.id);
                const typeBadgeColor = t.test_type === 'AIETS'
                  ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30'
                  : t.test_type === 'Full Syllabus Mock'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                  : t.test_type === 'Part Test'
                  ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300 border-cyan-500/30'
                  : 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/30';

                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTestId(String(t.id))}
                    className={`group p-3.5 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/50 shadow-md scale-[1.005]'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#071126] hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        <div
                          className={`h-4 w-4 rounded-full border-2 flex items-center justify-center transition ${
                            isSelected
                              ? 'border-blue-600 bg-blue-600 text-white'
                              : 'border-slate-300 dark:border-slate-700 group-hover:border-blue-400'
                          }`}
                        >
                          {isSelected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {testTitle}
                          </h4>
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase border shrink-0 ${typeBadgeColor}`}>
                            {t.test_type || 'AIETS'}
                          </span>
                        </div>

                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                          {t.syllabus ? `Syllabus: ${t.syllabus}` : 'No specific syllabus listed'}
                        </p>

                        <div className="flex flex-wrap items-center gap-3 text-[11px] font-bold text-slate-500 dark:text-slate-400 pt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-blue-500" />
                            {t.duration_minutes || t.duration || 180} mins
                          </span>
                          <span className="flex items-center gap-1">
                            <Award className="h-3 w-3 text-amber-500" />
                            {t.max_marks || t.total_marks || 300} marks
                          </span>
                          {t.test_date && (
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-purple-500" />
                              {String(t.test_date).split('T')[0]}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <button
              type="button"
              className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
              onClick={() => setLinkModal(null)}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving || !selectedTestId}
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-lg shadow-blue-500/25 transition disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2"
            >
              {saving ? <Spinner className="h-4 w-4 text-white" /> : (
                <>
                  <span>Link Selected Test</span>
                  <LinkIcon className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* CONFIRM DELETE MODAL */}
      <Modal
        open={deleteConfirmOpen}
        onClose={() => !saving && setDeleteConfirmOpen(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-950">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">Delete Test Series?</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Are you sure you want to delete test series <strong className="font-bold text-slate-800 dark:text-slate-200">"{seriesToDelete?.title}"</strong>?
          </p>
          <div className="mt-3 rounded-lg bg-red-50 p-3 text-left text-xs text-red-800 dark:bg-red-950/30 dark:text-red-300">
            <strong>Warning:</strong> Deleting this test series will revoke active subscriptions/enrollments for students and unlink associated tests. This action cannot be undone.
          </div>
          <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              className="btn-secondary text-sm"
              disabled={saving}
              onClick={() => !saving && setDeleteConfirmOpen(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving}
              className="btn-primary border-transparent bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-medium text-sm px-4 py-2 rounded-lg transition disabled:opacity-50 flex items-center gap-2"
              onClick={async () => {
                if (!seriesToDelete || saving) return;
                setSaving(true);
                try {
                  await testSeriesService.remove(seriesToDelete.id);
                  toast.success('Test series deleted successfully');
                  setDeleteConfirmOpen(false);
                  setSeriesToDelete(null);
                  await load();
                } catch (err) {
                  toast.error(err.message || 'Failed to delete test series');
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saving ? <Spinner className="h-4 w-4 text-white" /> : 'Permanently Delete'}
            </button>
          </div>
        </div>
      </Modal>

      {/* ASSIGN TEST SERIES MODAL */}
      <Modal
        open={Boolean(assignModalSeries)}
        onClose={() => setAssignModalSeries(null)}
        title={assignModalSeries ? `Assign Test Series: ${assignModalSeries.title}` : 'Assign Test Series'}
        size="xl"
      >
        {loadingAssignmentsData ? (
          <div className="py-16 flex flex-col items-center justify-center gap-3">
            <Spinner size="lg" />
            <p className="text-xs text-slate-500 font-bold">Loading assignment targets & enrolled students…</p>
          </div>
        ) : (
          <div>
            {/* Header Series Info Pill */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 mb-5">
              <div className="flex items-center gap-3">
                <div className="h-11 w-18 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 shrink-0 bg-slate-100 dark:bg-slate-800">
                  <img src={getTestSeriesCover(assignModalSeries)} alt="" className="h-full w-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    {assignModalSeries?.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    <Badge color="blue">{assignModalSeries?.exam_type}</Badge>
                    <Badge color="purple">{resolveTargetClass(assignModalSeries)}</Badge>
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                      {assignModalSeries?.is_free || Number(assignModalSeries?.price) === 0 ? 'FREE' : `₹${assignModalSeries?.price}`}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold">
                <span className="px-3 py-1.5 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-extrabold">
                  👥 {currentEnrollments.length} Enrolled
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20 font-extrabold">
                  📋 {currentAssignments.length} Active Rules
                </span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 mb-5 gap-2">
              <button
                type="button"
                onClick={() => setAssignTab('form')}
                className={`pb-2.5 px-3.5 text-xs font-extrabold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
                  assignTab === 'form'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>Assign to Audience</span>
              </button>
              <button
                type="button"
                onClick={() => setAssignTab('students')}
                className={`pb-2.5 px-3.5 text-xs font-extrabold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
                  assignTab === 'students'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <Users className="h-3.5 w-3.5" />
                <span>Enrolled Students ({currentEnrollments.length})</span>
              </button>
              <button
                type="button"
                onClick={() => setAssignTab('rules')}
                className={`pb-2.5 px-3.5 text-xs font-extrabold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
                  assignTab === 'rules'
                    ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
                }`}
              >
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Audience Rules ({currentAssignments.length})</span>
              </button>
            </div>

            {/* TAB 1: ASSIGN FORM */}
            {assignTab === 'form' && (
              <form onSubmit={handleAssignSubmit} className="space-y-5 text-xs font-semibold">
                <div>
                  <label className="block text-slate-800 dark:text-slate-200 font-bold mb-2">
                    1. Select Target Audience Type *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                    {[
                      {
                        type: 'student',
                        title: 'Individual Student',
                        desc: 'Assign to a specific candidate',
                        icon: GraduationCap,
                        color: 'text-blue-600 dark:text-blue-400',
                      },
                      {
                        type: 'batch',
                        title: 'Student Batch',
                        desc: 'Assign to all students in batch',
                        icon: Users,
                        color: 'text-purple-600 dark:text-purple-400',
                      },
                      {
                        type: 'institution',
                        title: 'Partner School',
                        desc: 'Assign to entire school',
                        icon: Building2,
                        color: 'text-emerald-600 dark:text-emerald-400',
                      },
                      {
                        type: 'all',
                        title: 'All Candidates',
                        desc: 'Global platform-wide access',
                        icon: Globe,
                        color: 'text-amber-600 dark:text-amber-400',
                      },
                    ].map((item) => {
                      const IconComp = item.icon;
                      const isSelected = assignAudienceType === item.type;
                      return (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() => {
                            setAssignAudienceType(item.type);
                            setAssignTargetId('');
                          }}
                          className={`p-3 rounded-2xl border text-left transition relative cursor-pointer ${
                            isSelected
                              ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/30 dark:border-blue-500 shadow-sm'
                              : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/40 hover:border-slate-300 dark:hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <IconComp className={`h-4 w-4 ${item.color}`} />
                            {isSelected && (
                              <span className="h-4 w-4 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px]">
                                ✓
                              </span>
                            )}
                          </div>
                          <div className="font-extrabold text-slate-900 dark:text-white text-xs">{item.title}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5 leading-tight">{item.desc}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* TARGET AUDIENCE SELECTION CONTROLS */}
                {assignAudienceType === 'student' && (
                  <div className="space-y-2 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30">
                    <label className="block text-slate-800 dark:text-slate-200 font-bold">
                      2. Choose Candidate Student *
                    </label>

                    {assignTargetId ? (
                      (() => {
                        const selStudent = candidatesList.find((c) => String(c.id) === String(assignTargetId));
                        return (
                          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="h-9 w-9 rounded-full bg-blue-600 text-white font-extrabold flex items-center justify-center text-xs">
                                {selStudent?.name ? selStudent.name.charAt(0).toUpperCase() : 'S'}
                              </div>
                              <div>
                                <div className="font-extrabold text-slate-900 dark:text-white text-xs">
                                  {selStudent?.name || 'Selected Student'}
                                </div>
                                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                  {selStudent?.email} {selStudent?.student_id || selStudent?.roll_number ? `· ID: ${selStudent.student_id || selStudent.roll_number}` : ''}
                                  {selStudent?.institution_name ? ` · ${selStudent.institution_name}` : ''}
                                </div>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => setAssignTargetId('')}
                              className="px-2.5 py-1 text-[11px] rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold hover:bg-slate-100 transition cursor-pointer"
                            >
                              Change
                            </button>
                          </div>
                        );
                      })()
                    ) : (
                      <div className="space-y-2">
                        <div className="relative">
                          <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Type to search student by name, email, or student ID..."
                            value={studentSearchQuery}
                            onChange={(e) => setStudentSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div className="max-h-52 overflow-y-auto space-y-1 pr-1 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 bg-white dark:bg-slate-900">
                          {(() => {
                            const q = (studentSearchQuery || '').toLowerCase().trim();
                            const filtered = candidatesList.filter((c) => {
                              if (!q) return true;
                              return (
                                (c.name || '').toLowerCase().includes(q) ||
                                (c.email || '').toLowerCase().includes(q) ||
                                (c.student_id || '').toLowerCase().includes(q) ||
                                (c.roll_number || '').toLowerCase().includes(q) ||
                                (c.institution_name || '').toLowerCase().includes(q)
                              );
                            });

                            if (filtered.length === 0) {
                              return (
                                <div className="p-4 text-center text-xs text-slate-400 font-medium">
                                  No candidates found matching "{studentSearchQuery}".
                                </div>
                              );
                            }

                            return filtered.slice(0, 30).map((cand) => (
                              <button
                                key={cand.id}
                                type="button"
                                onClick={() => setAssignTargetId(String(cand.id))}
                                className="w-full p-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/40 text-left transition flex items-center justify-between gap-2 border border-transparent hover:border-blue-200 dark:hover:border-blue-800/60 cursor-pointer"
                              >
                                <div className="min-w-0">
                                  <div className="font-extrabold text-slate-800 dark:text-slate-100 text-xs truncate">
                                    {cand.name}
                                  </div>
                                  <div className="text-[11px] text-slate-400 truncate">
                                    {cand.email}
                                    {cand.student_id || cand.roll_number ? ` · ${cand.student_id || cand.roll_number}` : ''}
                                    {cand.institution_name ? ` · ${cand.institution_name}` : ''}
                                  </div>
                                </div>
                                <span className="px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-extrabold shrink-0">
                                  Select
                                </span>
                              </button>
                            ));
                          })()}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {assignAudienceType === 'batch' && (
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30">
                    <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1.5">
                      2. Choose Student Batch *
                    </label>
                    <select
                      required
                      value={assignTargetId}
                      onChange={(e) => setAssignTargetId(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 font-bold text-xs"
                    >
                      <option value="">-- Choose Batch ({batchesList.length} available) --</option>
                      {batchesList.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name || b.batch_name} {b.academic_year ? `(${b.academic_year})` : ''} {b.description ? `· ${b.description}` : ''}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">
                      All candidate students assigned to this batch will instantly unlock full access to this test series.
                    </p>
                  </div>
                )}

                {assignAudienceType === 'institution' && (
                  <div className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-900/30">
                    <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1.5">
                      2. Choose Partner School / Institution *
                    </label>
                    <select
                      required
                      value={assignTargetId}
                      onChange={(e) => setAssignTargetId(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 font-bold text-xs"
                    >
                      <option value="">-- Choose Partner School ({institutionsList.length} available) --</option>
                      {institutionsList.map((inst) => (
                        <option key={inst.id} value={inst.id}>
                          {inst.name} {inst.schoolId || inst.code ? `(Code: ${inst.schoolId || inst.code})` : ''} {inst.activeStudents ? `· ${inst.activeStudents} students` : ''}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1 font-medium">
                      All students linked to this institution will receive instant enrollment. Institution admin will also be notified.
                    </p>
                  </div>
                )}

                {assignAudienceType === 'all' && (
                  <div className="p-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 space-y-1">
                    <div className="font-extrabold text-xs flex items-center gap-1.5">
                      <Globe className="h-4 w-4" />
                      <span>Global Platform Enrolment</span>
                    </div>
                    <p className="text-[11px] leading-relaxed">
                      Every candidate student on the platform will be granted active access. Any future students will also automatically receive access upon opening their test portal.
                    </p>
                  </div>
                )}

                {/* ACCESS DURATION / VALIDITY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                      Access Validity (Days)
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="7300"
                      value={assignValidityDays}
                      onChange={(e) => setAssignValidityDays(e.target.value)}
                      placeholder="e.g. 365"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 font-bold text-xs"
                    />
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {[
                        { label: '30d', val: '30' },
                        { label: '90d', val: '90' },
                        { label: '180d', val: '180' },
                        { label: '1 Year (365d)', val: '365' },
                        { label: '2 Years (730d)', val: '730' },
                      ].map((preset) => (
                        <button
                          key={preset.val}
                          type="button"
                          onClick={() => setAssignValidityDays(preset.val)}
                          className="px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-[10px] font-bold hover:bg-blue-50 hover:text-blue-600 transition cursor-pointer"
                        >
                          {preset.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-800 dark:text-slate-200 font-bold mb-1">
                      Internal Notes / Reason (Optional)
                    </label>
                    <input
                      type="text"
                      value={assignNotes}
                      onChange={(e) => setAssignNotes(e.target.value)}
                      placeholder="e.g. Scholarship award / Top performer batch grant"
                      className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 p-2.5 font-semibold text-xs"
                    />
                    <div className="mt-3 flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="assign_notify_checkbox"
                        checked={assignNotify}
                        onChange={(e) => setAssignNotify(e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="assign_notify_checkbox" className="text-slate-700 dark:text-slate-300 font-semibold cursor-pointer">
                        Send in-app notification to student(s)
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setAssignModalSeries(null)}
                    className="btn-secondary !py-2 !px-4 text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={assigningLoading}
                    className="btn-primary !py-2 !px-5 text-xs font-extrabold flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white shadow-md cursor-pointer"
                  >
                    {assigningLoading ? <Spinner size="sm" /> : <UserPlus className="h-4 w-4" />}
                    <span>Assign Test Series Now</span>
                  </button>
                </div>
              </form>
            )}

            {/* TAB 2: ENROLLED STUDENTS LIST */}
            {assignTab === 'students' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="h-4 w-4 absolute left-3 top-2.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Filter enrolled students by name, email, roll number..."
                      value={enrollmentSearchQuery}
                      onChange={(e) => setEnrollmentSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setAssignTab('form')}
                    className="btn-primary !py-2 !px-3.5 text-xs flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>+ Assign More Students</span>
                  </button>
                </div>

                {(() => {
                  const q = (enrollmentSearchQuery || '').toLowerCase().trim();
                  const filtered = currentEnrollments.filter((enr) => {
                    if (!q) return true;
                    return (
                      (enr.student_name || '').toLowerCase().includes(q) ||
                      (enr.student_email || '').toLowerCase().includes(q) ||
                      (enr.roll_number || '').toLowerCase().includes(q) ||
                      (enr.institution_name || '').toLowerCase().includes(q) ||
                      (enr.batch_name || '').toLowerCase().includes(q)
                    );
                  });

                  if (filtered.length === 0) {
                    return (
                      <div className="py-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                        <Users className="h-10 w-10 text-slate-400 mx-auto mb-2 opacity-50" />
                        <h4 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">
                          {enrollmentSearchQuery ? 'No matching enrolled students' : 'No Students Enrolled Yet'}
                        </h4>
                        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                          {enrollmentSearchQuery
                            ? `Try clearing your search query "${enrollmentSearchQuery}".`
                            : 'Use the "Assign to Audience" tab to grant access to candidates, batches, or schools.'}
                        </p>
                        {!enrollmentSearchQuery && (
                          <button
                            type="button"
                            onClick={() => setAssignTab('form')}
                            className="btn-primary !py-1.5 !px-4 text-xs font-bold"
                          >
                            Assign Students Now
                          </button>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xs">
                      <div className="max-h-96 overflow-y-auto">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-slate-100 dark:bg-slate-800/80 sticky top-0 z-10 text-slate-600 dark:text-slate-300 font-extrabold text-[11px] uppercase tracking-wider">
                            <tr>
                              <th className="p-3">Candidate</th>
                              <th className="p-3">Student ID</th>
                              <th className="p-3">Batch / School</th>
                              <th className="p-3">Source</th>
                              <th className="p-3">Enrolled</th>
                              <th className="p-3">Expires</th>
                              <th className="p-3 text-right">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                            {filtered.map((enr) => (
                              <tr key={enr.id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition">
                                <td className="p-3">
                                  <div className="font-bold text-slate-900 dark:text-white">{enr.student_name}</div>
                                  <div className="text-[11px] text-slate-400">{enr.student_email}</div>
                                </td>
                                <td className="p-3 font-mono text-[11px] font-bold text-slate-600 dark:text-slate-400">
                                  {enr.roll_number || '—'}
                                </td>
                                <td className="p-3 text-[11px]">
                                  {enr.batch_name && <Badge color="purple">{enr.batch_name}</Badge>}
                                  {enr.institution_name && (
                                    <div className="text-slate-400 text-[10px] mt-0.5 truncate max-w-[130px]">
                                      {enr.institution_name}
                                    </div>
                                  )}
                                  {!enr.batch_name && !enr.institution_name && <span className="text-slate-400">Direct</span>}
                                </td>
                                <td className="p-3 text-[10px]">
                                  <span className={`px-2 py-0.5 rounded-md font-bold uppercase ${
                                    enr.assignment_type?.startsWith('admin_')
                                      ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300'
                                      : 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300'
                                  }`}>
                                    {enr.assignment_type || 'Purchase'}
                                  </span>
                                </td>
                                <td className="p-3 text-[11px] text-slate-500 whitespace-nowrap">
                                  {enr.purchased_at ? new Date(enr.purchased_at).toLocaleDateString() : '—'}
                                </td>
                                <td className="p-3 text-[11px] text-slate-500 whitespace-nowrap">
                                  {enr.expires_at ? new Date(enr.expires_at).toLocaleDateString() : 'Lifetime'}
                                </td>
                                <td className="p-3 text-right">
                                  <button
                                    type="button"
                                    onClick={() => handleRevokeEnrollment(enr)}
                                    className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer"
                                    title="Revoke student access"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* TAB 3: AUDIENCE RULES LIST */}
            {assignTab === 'rules' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Standing audience rules automatically sync access whenever new candidates join an assigned batch or school.
                  </p>
                  <button
                    type="button"
                    onClick={() => setAssignTab('form')}
                    className="btn-primary !py-1.5 !px-3 text-xs flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white font-bold cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>+ New Rule</span>
                  </button>
                </div>

                {currentAssignments.length === 0 ? (
                  <div className="py-12 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800">
                    <ShieldCheck className="h-10 w-10 text-slate-400 mx-auto mb-2 opacity-50" />
                    <h4 className="font-extrabold text-sm text-slate-700 dark:text-slate-300">No Audience Rules Configured</h4>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1 mb-4">
                      Create rules to automatically grant this test series to specific student batches, partner schools, or everyone.
                    </p>
                    <button
                      type="button"
                      onClick={() => setAssignTab('form')}
                      className="btn-primary !py-1.5 !px-4 text-xs font-bold"
                    >
                      Create First Rule
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {currentAssignments.map((rule) => (
                      <div
                        key={rule.id}
                        className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-md font-black text-[10px] uppercase bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                              {rule.assigned_to_type}
                            </span>
                            <span className="font-extrabold text-slate-900 dark:text-white text-xs truncate">
                              {rule.target_name}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 mt-1 flex flex-wrap gap-2">
                            {rule.target_details && <span>{rule.target_details}</span>}
                            <span>· Validity: {rule.validity_days || 365} days</span>
                            <span>· Assigned: {new Date(rule.created_at).toLocaleDateString()}</span>
                            {rule.notes && <span className="italic text-slate-500">· "{rule.notes}"</span>}
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleDeleteAssignmentRule(rule)}
                          className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition shrink-0 cursor-pointer"
                          title="Delete assignment rule"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>

      <ConfirmModal
        isOpen={confirmState.isOpen}
        onClose={() => setConfirmState((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmState.onConfirm}
        title={confirmState.title}
        message={confirmState.message}
        confirmText={confirmState.confirmText}
        loading={confirmState.loading}
        variant="danger"
      />
    </div>
  );
}
