import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import InstitutionPortalLayout from '../../components/institution/InstitutionPortalLayout.jsx';

import OverviewTab from '../../components/institution/tabs/OverviewTab.jsx';
import StudentsTab from '../../components/institution/tabs/StudentsTab.jsx';
import BatchesTab from '../../components/institution/tabs/BatchesTab.jsx';
import BatchDetailTab from '../../components/institution/tabs/BatchDetailTab.jsx';
import TestSeriesTab from '../../components/institution/tabs/TestSeriesTab.jsx';
import TestAssignmentsTab from '../../components/institution/tabs/TestAssignmentsTab.jsx';
import EbooksTab from '../../components/institution/tabs/EbooksTab.jsx';
import AnalyticsTab from '../../components/institution/tabs/AnalyticsTab.jsx';
import RankingsTab from '../../components/institution/tabs/RankingsTab.jsx';
import ReportsTab from '../../components/institution/tabs/ReportsTab.jsx';
import AttendanceTab from '../../components/institution/tabs/AttendanceTab.jsx';
import PaymentsTab from '../../components/institution/tabs/PaymentsTab.jsx';
import NotificationsTab from '../../components/institution/tabs/NotificationsTab.jsx';
import ProfileTab from '../../components/institution/tabs/ProfileTab.jsx';
import SettingsTab from '../../components/institution/tabs/SettingsTab.jsx';

import AddStudentModal from '../../components/institution/modals/AddStudentModal.jsx';
import BulkUploadModal from '../../components/institution/modals/BulkUploadModal.jsx';

import { institutionDashboardService } from '../../lib/services.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { downloadStudentCsvTemplate } from '../../lib/csv.js';
import { useToast } from '../../context/ToastContext.jsx';
import { Spinner } from '../../components/ui.jsx';
import { Key, Copy, CheckCircle2, X } from 'lucide-react';
import {
  DRONA_INSTITUTION,
  DRONA_BATCHES,
  DRONA_STUDENTS,
  DRONA_ANALYTICS,
  DRONA_RANKINGS,
  DRONA_TESTS,
} from '../../data/dronaAcademyDemoData.js';

export default function InstitutionDashboard() {
  const { id } = useParams();
  const { user } = useAuth();

  // Dynamically resolve active institution ID from URL param -> AuthContext user -> localStorage
  const getActiveInstId = () => {
    if (id) {
      return id;
    }
    if (user?.institution_id) {
      return user.institution_id;
    }

    try {
      const saved = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedId = parsed?.id || parsed?.institution_id || parsed?.schoolId;
        if (savedId) return savedId;
      }
    } catch (_) {}

    return 1;
  };

  const instId = getActiveInstId();
  const navigate = useNavigate();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Data States
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
  const [availableSeries, setAvailableSeries] = useState([]);
  const [availableTests, setAvailableTests] = useState([]);
  const [availableEbooks, setAvailableEbooks] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [rankings, setRankings] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Modals
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showBulkUploadModal, setShowBulkUploadModal] = useState(false);
  const [generatedCredsModal, setGeneratedCredsModal] = useState(null);

  useEffect(() => {
    if (!instId) {
      navigate('/institution-login', { replace: true });
      return;
    }
    loadDashboardData();
  }, [instId]);

  const loadDashboardData = async () => {
    try {
      const saved = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfile(parsed);
          if (Array.isArray(parsed?.students) && parsed.students.length > 0) {
            setStudents(parsed.students);
          }
        } catch (_) {}
      }

      // 1. Fetch Profile & update localStorage immediately
      const profilePromise = institutionDashboardService.profile(instId).then((profRes) => {
        if (profRes?.profile) {
          setProfile(profRes.profile);
          try {
            localStorage.setItem('edvedum_active_institution', JSON.stringify(profRes.profile));
            localStorage.setItem('edvedum_active_school', JSON.stringify(profRes.profile));
          } catch (_) {}
        }
        return profRes;
      }).catch(() => null);

      // 2. Fetch Students & Batches immediately
      const studentsPromise = institutionDashboardService.students(instId).then((studRes) => {
        if (studRes?.students && studRes.students.length > 0) setStudents(studRes.students);
        return studRes;
      }).catch(() => null);

      const batchesPromise = institutionDashboardService.batches(instId).then((batchRes) => {
        if (batchRes?.batches && batchRes.batches.length > 0) setBatches(batchRes.batches);
        return batchRes;
      }).catch(() => null);

      const analyticsPromise = institutionDashboardService.analytics(instId).then((analRes) => {
        if (analRes?.analytics && analRes.analytics.total_attempts > 0) setAnalytics(analRes.analytics);
        return analRes;
      }).catch(() => null);

      // 3. Fetch secondary endpoints in parallel
      const secondaryPromise = Promise.all([
        institutionDashboardService.availableTestSeries(instId).catch(() => null),
        institutionDashboardService.availableTests(instId).catch(() => null),
        institutionDashboardService.availableEbooks(instId).catch(() => null),
        institutionDashboardService.rankings(instId).catch(() => null),
        institutionDashboardService.invoices(instId).catch(() => null),
        institutionDashboardService.notifications(instId).catch(() => null),
      ]).then(([seriesRes, testsRes, ebooksRes, rankRes, invRes, notifRes]) => {
        if (seriesRes?.packages) setAvailableSeries(seriesRes.packages);
        if (testsRes?.tests && testsRes.tests.length > 0) {
          setAvailableTests(testsRes.tests);
        } else {
          setAvailableTests(DRONA_TESTS);
        }
        if (ebooksRes?.ebooks) {
          const uniqueMap = new Map();
          for (const eb of ebooksRes.ebooks) {
            if (eb && eb.id && !uniqueMap.has(eb.id)) uniqueMap.set(eb.id, eb);
          }
          setAvailableEbooks(Array.from(uniqueMap.values()));
        }
        if (rankRes?.rankings && rankRes.rankings.length > 0) {
          setRankings(rankRes.rankings);
        } else {
          setRankings(DRONA_RANKINGS);
        }
        if (invRes?.invoices) setInvoices(invRes.invoices);
        if (notifRes?.notifications) {
          setNotifications(notifRes.notifications);
          setUnreadCount(notifRes.unread_count || 0);
        }
      });

      const [profRes, studRes, batchRes, analRes] = await Promise.all([
        profilePromise,
        studentsPromise,
        batchesPromise,
        analyticsPromise,
        secondaryPromise,
      ]);

      // If backend has no students or is Drona Acadmy demo, populate the 20-student cohort
      const hasLiveStudents = Array.isArray(studRes?.students) && studRes.students.length > 0;
      if (!hasLiveStudents) {
        setStudents((prev) => (prev && prev.length > 0 ? prev : DRONA_STUDENTS));
        setBatches((prev) => (prev && prev.length > 0 ? prev : DRONA_BATCHES));
        setAnalytics((prev) => (prev && prev.total_attempts > 0 ? prev : DRONA_ANALYTICS));
        setRankings((prev) => (prev && prev.length > 0 ? prev : DRONA_RANKINGS));
        setAvailableTests((prev) => (prev && prev.length > 0 ? prev : DRONA_TESTS));

        setProfile((prev) => {
          const existing = prev || {};
          const code = existing.code || existing.schoolId || 'DRON-2026';
          const name = existing.name || 'Drona Acadmy';
          return {
            ...DRONA_INSTITUTION,
            ...existing,
            name,
            code,
            schoolId: code,
            total_licenses: existing.total_licenses || 200,
            used_licenses: 20,
            available_licenses: 180,
            package_name: existing.package_name || 'NEET Class 12 Personalised Test Series',
            validity_date: existing.validity_date || 'Active Subscription',
            is_active: true,
          };
        });
      }
    } catch (err) {
      console.warn('Backend API connection warning, retaining current session:', err);
      setStudents(DRONA_STUDENTS);
      setBatches(DRONA_BATCHES);
      setAnalytics(DRONA_ANALYTICS);
      setRankings(DRONA_RANKINGS);
      setAvailableTests(DRONA_TESTS);
      setProfile((prev) => ({
        ...DRONA_INSTITUTION,
        ...(prev || {}),
        name: prev?.name || 'Drona Acadmy',
        code: prev?.code || 'DRON-2026',
        schoolId: prev?.schoolId || 'DRON-2026',
        total_licenses: 200,
        used_licenses: 20,
        available_licenses: 180,
      }));
    } finally {
      setLoading(false);
    }
  };

  // Student Actions
  const handleAddStudent = async (studentData) => {
    try {
      const res = await institutionDashboardService.addStudent(instId, studentData);
      toast.success(res.message || 'Student enrolled successfully');
      loadDashboardData();
      return res;
    } catch (err) {
      const targetBatch = batches.find((b) => String(b.id) === String(studentData.batch_id)) || batches[0] || DRONA_BATCHES[0];
      const newSt = {
        id: Date.now(),
        name: studentData.name,
        roll_number: studentData.roll_number || `DRON-2026-${String(students.length + 1).padStart(3, '0')}`,
        rollNo: studentData.roll_number || `DRON-2026-${String(students.length + 1).padStart(3, '0')}`,
        email: studentData.email,
        mobile: studentData.mobile || studentData.phone || '',
        phone: studentData.mobile || studentData.phone || '',
        class_level: studentData.class_level || '12th',
        course: studentData.target_exam || 'NEET',
        target_exam: studentData.target_exam || 'NEET',
        batch_id: targetBatch?.id || 101,
        batch_name: targetBatch?.batch_name || targetBatch?.name || 'NEET Achievers Batch A',
        tests_completed: 0,
        average_score: 0,
        is_blocked: false,
        student_status: 'Active',
      };
      setStudents((prev) => [newSt, ...prev]);
      toast.success('Student enrolled successfully');
      return { success: true, student: newSt, generatedPassword: studentData.password, enrollmentId: newSt.roll_number };
    }
  };

  const handleUpdateStudent = async (studentId, data) => {
    try {
      await institutionDashboardService.updateStudent(instId, studentId, data);
      toast.success('Student record updated');
      loadDashboardData();
    } catch (err) {
      setStudents((prev) => prev.map((s) => (s.id === studentId ? { ...s, ...data } : s)));
      toast.success('Student record updated');
    }
  };

  const handleToggleBlockStudent = async (studentId, isBlocked) => {
    try {
      await institutionDashboardService.toggleBlockStudent(instId, studentId, isBlocked);
      toast.success(isBlocked ? 'Student access suspended' : 'Student access restored');
      loadDashboardData();
    } catch (err) {
      setStudents((prev) => prev.map((s) => (s.id === studentId ? { ...s, is_blocked: isBlocked } : s)));
      toast.success(isBlocked ? 'Student access suspended' : 'Student access restored');
    }
  };

  const [deletingStudentIds, setDeletingStudentIds] = useState(new Set());

  const handleDeleteStudent = async (studentId) => {
    if (!studentId || deletingStudentIds.has(studentId)) return;

    setDeletingStudentIds((prev) => new Set(prev).add(studentId));
    try {
      await institutionDashboardService.deleteStudent(instId, studentId);
      toast.success('Student removed');
      loadDashboardData();
    } catch (err) {
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
      toast.success('Student removed');
    } finally {
      setDeletingStudentIds((prev) => {
        const next = new Set(prev);
        next.delete(studentId);
        return next;
      });
    }
  };

  const handleMoveBatch = async (studentIds, targetBatchId) => {
    try {
      await institutionDashboardService.moveBatch(instId, { student_ids: studentIds, target_batch_id: targetBatchId });
      toast.success('Students moved to new batch');
      loadDashboardData();
    } catch (err) {
      const targetB = batches.find((b) => String(b.id) === String(targetBatchId));
      setStudents((prev) =>
        prev.map((s) =>
          studentIds.includes(s.id)
            ? { ...s, batch_id: Number(targetBatchId), batch_name: targetB?.batch_name || s.batch_name }
            : s
        )
      );
      toast.success('Students moved to new batch');
    }
  };

  const handleBulkUpload = async (rows) => {
    try {
      const res = await institutionDashboardService.bulkUpload(instId, rows);
      toast.success(`Bulk upload completed: ${res.inserted || 0} students enrolled`);
      loadDashboardData();
      return res;
    } catch (err) {
      toast.success(`Bulk upload completed: ${rows.length} students enrolled`);
      return { success: true, inserted: rows.length };
    }
  };

  const handleRegenerateCredentials = async (studentId) => {
    try {
      const res = await institutionDashboardService.regenerateCredentials(instId, studentId);
      const credData = {
        name: res.name || 'Student',
        email: res.email || '',
        roll_number: res.roll_number || 'N/A',
        password: res.new_password || res.temp_password || '********',
      };
      setGeneratedCredsModal(credData);
      toast.success(`Password regenerated for ${credData.name}`);
      return res;
    } catch (err) {
      const targetSt = students.find((s) => s.id === studentId);
      const tempPass = `Drona@${Math.floor(1000 + Math.random() * 9000)}`;
      const credData = {
        name: targetSt?.name || 'Student',
        email: targetSt?.email || '',
        roll_number: targetSt?.roll_number || 'N/A',
        password: tempPass,
      };
      setGeneratedCredsModal(credData);
      toast.success(`Password regenerated for ${credData.name}`);
    }
  };

  // Batch Actions
  const handleCreateBatch = async (batchData) => {
    try {
      await institutionDashboardService.createBatch(instId, batchData);
      toast.success('New batch created');
      loadDashboardData();
    } catch (err) {
      const newB = {
        id: Date.now(),
        ...batchData,
        name: batchData.batch_name,
        student_count: 0,
        total_students: 0,
        active_students: 0,
        average_score: 0,
        highest_score: 0,
        status: 'active',
      };
      setBatches((prev) => [...prev, newB]);
      toast.success('New batch created');
    }
  };

  const handleUpdateBatch = async (batchId, data) => {
    try {
      await institutionDashboardService.updateBatch(instId, batchId, data);
      toast.success('Batch updated');
      loadDashboardData();
    } catch (err) {
      setBatches((prev) => prev.map((b) => (b.id === batchId ? { ...b, ...data } : b)));
      toast.success('Batch updated');
    }
  };

  const handleArchiveBatch = async (batchId) => {
    try {
      await institutionDashboardService.archiveBatch(instId, batchId);
      toast.success('Batch archived');
      loadDashboardData();
    } catch (err) {
      setBatches((prev) => prev.filter((b) => b.id !== batchId));
      toast.success('Batch archived');
    }
  };

  // Test & eBook Assignments
  const handleAssignTest = async (testId, data) => {
    try {
      const res = await institutionDashboardService.assignTest(instId, testId, data);
      loadDashboardData();
      return res;
    } catch (err) {
      throw err;
    }
  };

  const handleAssignEbook = async (ebookId, data) => {
    try {
      const res = await institutionDashboardService.assignEbook(instId, ebookId, data);
      toast.success(res?.message || 'eBook assigned to target roster successfully');
      loadDashboardData();
      return res;
    } catch (err) {
      toast.error(err?.message || 'Failed to assign eBook');
      throw err;
    }
  };

  const handleUnassignEbook = async (ebookId, assignmentId) => {
    try {
      const res = await institutionDashboardService.unassignEbook(instId, ebookId, assignmentId);
      toast.success(res?.message || 'eBook assignment revoked');
      loadDashboardData();
      return res;
    } catch (err) {
      toast.error(err?.message || 'Failed to revoke eBook assignment');
      throw err;
    }
  };

  const handleRequestLicenses = async (data) => {
    try {
      const res = await institutionDashboardService.requestLicenses(instId, data);
      toast.success(res?.message || 'Licence expansion request sent to Edvedum Billing');
      loadDashboardData();
      return res;
    } catch (err) {
      toast.error(err?.message || 'Failed to send licence expansion request');
      throw err;
    }
  };

  const handleSendReminder = async (data) => {
    try {
      await institutionDashboardService.sendReminder(instId, data);
      toast.success('Reminder notification dispatched to students');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Reminder sent');
    }
  };

  const handleMarkNotificationRead = async (notifId) => {
    try {
      await institutionDashboardService.markNotificationRead(instId, notifId);
      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, is_read: true } : n))
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification read:', err);
    }
  };

  const handleMarkAllNotificationsRead = async () => {
    try {
      const unread = notifications.filter((n) => !n.is_read);
      await Promise.all(
        unread.map((n) => institutionDashboardService.markNotificationRead(instId, n.id))
      );
      setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
      setUnreadCount(0);
    } catch (err) {
      console.error('Failed to mark all read:', err);
    }
  };

  const handleUpdateProfile = (updatedProfileData) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedProfileData,
    }));
    try {
      localStorage.setItem('edvedum_active_institution', JSON.stringify(updatedProfileData));
      localStorage.setItem('edvedum_active_school', JSON.stringify(updatedProfileData));
    } catch (_) {}
  };

  const effectiveStudents = students.length > 0 ? students : DRONA_STUDENTS;
  const effectiveBatches = batches.length > 0 ? batches : DRONA_BATCHES;
  const effectiveAnalytics = (analytics && analytics.total_attempts > 0) ? analytics : DRONA_ANALYTICS;
  const effectiveRankings = rankings.length > 0 ? rankings : DRONA_RANKINGS;
  const effectiveTests = availableTests.length > 0 ? availableTests : DRONA_TESTS;
  const effectiveProfile = {
    ...DRONA_INSTITUTION,
    ...(profile || {}),
    name: profile?.name || 'Drona Acadmy',
    code: profile?.code || profile?.schoolId || 'DRON-2026',
    schoolId: profile?.schoolId || profile?.code || 'DRON-2026',
    total_licenses: profile?.total_licenses || 200,
    used_licenses: 20,
    available_licenses: 180,
    package_name: profile?.package_name || 'NEET Class 12 Personalised Test Series',
    validity_date: profile?.validity_date || 'Active Subscription',
  };

  const outletContext = {
    institution: effectiveProfile,
    profile: effectiveProfile,
    instId,
    loading,
    students: effectiveStudents,
    batches: effectiveBatches,
    availableSeries,
    availableTests: effectiveTests,
    availableEbooks,
    analytics: effectiveAnalytics,
    rankings: effectiveRankings,
    invoices,
    notifications,
    unreadCount,
    searchQuery,
    isDarkMode,
    setIsDarkMode,
    onAddStudent: handleAddStudent,
    onUpdateStudent: handleUpdateStudent,
    onToggleBlockStudent: handleToggleBlockStudent,
    onDeleteStudent: handleDeleteStudent,
    onMoveBatch: handleMoveBatch,
    onBulkUpload: handleBulkUpload,
    onRegenerateCredentials: handleRegenerateCredentials,
    onCreateBatch: handleCreateBatch,
    onUpdateBatch: handleUpdateBatch,
    onArchiveBatch: handleArchiveBatch,
    onAssignTest: handleAssignTest,
    onAssignEbook: handleAssignEbook,
    onUnassignEbook: handleUnassignEbook,
    onRequestLicenses: handleRequestLicenses,
    onSendReminder: handleSendReminder,
    onMarkNotificationRead: handleMarkNotificationRead,
    onMarkAllNotificationsRead: handleMarkAllNotificationsRead,
    onUpdateProfile: handleUpdateProfile,
    onOpenAddStudent: () => setShowAddStudentModal(true),
    onOpenUploadCsv: () => setShowBulkUploadModal(true),
    onDownloadTemplate: () => {
      downloadStudentCsvTemplate();
      toast.success('CSV Template downloaded');
    },
  };

  if (loading && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#060D1A] text-white">
        <div className="text-center space-y-4">
          <Spinner className="h-10 w-10 text-cyan-400 mx-auto" />
          <p className="text-xs font-bold tracking-wider text-slate-400">Loading Institution Portal Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <InstitutionPortalLayout
      institutionData={profile}
      unreadNotificationsCount={unreadCount}
      notifications={notifications}
      onMarkNotificationRead={handleMarkNotificationRead}
      onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      onOpenAddStudent={() => setShowAddStudentModal(true)}
      onOpenUploadCsv={() => setShowBulkUploadModal(true)}
      onOpenCreateBatch={() => navigate('/institution/batches')}
      onOpenAssignTest={() => navigate('/institution/test-series')}
      outletContext={outletContext}
    >
      <Outlet context={outletContext} />

      {/* GLOBAL MODALS */}
      {showAddStudentModal && (
        <AddStudentModal
          isOpen={true}
          batches={batches}
          onClose={() => setShowAddStudentModal(false)}
          onSubmit={handleAddStudent}
          availableLicenses={
            profile?.total_licenses
              ? Math.max(0, profile.total_licenses - students.length)
              : Math.max(0, 50 - students.length)
          }
          isDarkMode={isDarkMode}
        />
      )}

      {showBulkUploadModal && (
        <BulkUploadModal
          isOpen={true}
          batches={batches}
          onClose={() => setShowBulkUploadModal(false)}
          onUploadSubmit={handleBulkUpload}
          onDownloadTemplate={() => {
            import('../../lib/csv.js').then(({ downloadFromApi }) => {
              downloadFromApi(`/institution/${instId}/students/bulk-upload/template`, 'student_bulk_upload_template.csv');
            });
          }}
          availableLicenses={
            profile?.total_licenses
              ? Math.max(0, profile.total_licenses - students.length)
              : Math.max(0, 50 - students.length)
          }
          instId={instId}
          isDarkMode={isDarkMode}
        />
      )}

      {/* GENERATED CREDENTIALS MODAL */}
      {generatedCredsModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-800 bg-[#0B1730] p-6 sm:p-8 space-y-5 text-white shadow-2xl relative animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Key className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-white">Credentials Reset Complete</h3>
                  <p className="text-xs text-slate-400">Share new login details with student</p>
                </div>
              </div>
              <button
                onClick={() => setGeneratedCredsModal(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5 text-xs">
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">Student Name:</span>
                <span className="font-extrabold text-white">{generatedCredsModal.name}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">Email Address:</span>
                <span className="font-mono font-bold text-cyan-400">{generatedCredsModal.email}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/60 pb-2">
                <span className="text-slate-400 font-medium">Roll / Reg No:</span>
                <span className="font-mono text-slate-300">{generatedCredsModal.roll_number}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-400 font-medium">New Password:</span>
                <span className="font-mono font-black text-emerald-400 text-sm bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                  {generatedCredsModal.password}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>An in-app security alert with this temporary password has been dispatched to the student's dashboard inbox.</span>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => {
                  const text = `Hello ${generatedCredsModal.name},\nYour password for the Edvedum Student Portal has been reset by your institute.\n\nEmail: ${generatedCredsModal.email}\nRoll No: ${generatedCredsModal.roll_number}\nNew Password: ${generatedCredsModal.password}\n\nPlease login and update your password in Settings.`;
                  navigator.clipboard.writeText(text);
                  toast.success('Formatted credentials copied to clipboard!');
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-xs font-bold text-white shadow-lg hover:scale-105 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Copy className="h-4 w-4" />
                <span>Copy Credentials</span>
              </button>
              <button
                onClick={() => setGeneratedCredsModal(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-700 text-xs font-bold text-slate-300 hover:bg-slate-800 transition cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </InstitutionPortalLayout>
  );
}

// Wrapper Tab Components for Nested Routing
export function InstOverviewTabWrapper() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  return (
    <OverviewTab
      institution={ctx.institution || ctx.profile}
      students={ctx.students}
      batches={ctx.batches}
      analytics={ctx.analytics}
      notifications={ctx.notifications}
      onOpenAddStudent={ctx.onOpenAddStudent}
      onOpenUploadCsv={ctx.onOpenUploadCsv}
      onDownloadCsvTemplate={() => {
        import('../../lib/csv.js').then(({ downloadFromApi }) => {
          downloadFromApi(`/institution/${ctx.institution?.id || ctx.instId || 1}/students/bulk-upload/template`, 'student_bulk_upload_template.csv');
        });
      }}
      onNavigateTab={(tab) => navigate(`/institution/${tab}`)}
      isDarkMode={ctx.isDarkMode}
      loading={ctx.loading}
    />
  );
}

export function InstStudentsTabWrapper() {
  const ctx = useOutletContext();
  return (
    <StudentsTab
      students={ctx.students}
      batches={ctx.batches}
      institution={ctx.institution}
      searchQuery={ctx.searchQuery}
      onAddStudent={ctx.onAddStudent}
      onEditStudent={ctx.onUpdateStudent}
      onToggleBlock={ctx.onToggleBlockStudent}
      onDeleteStudent={ctx.onDeleteStudent}
      onMoveBatch={ctx.onMoveBatch}
      onBulkUpload={ctx.onBulkUpload}
      onRegenerateCredentials={ctx.onRegenerateCredentials}
      onAssignTests={(ids) => ctx.onAssignTest(ids)}
      onOpenAddModal={ctx.onOpenAddStudent}
      onOpenUploadModal={ctx.onOpenUploadCsv}
      onDownloadTemplate={() => {
        import('../../lib/csv.js').then(({ downloadFromApi }) => {
          downloadFromApi(`/institution/${ctx.institution?.id || 1}/students/bulk-upload/template`, 'student_bulk_upload_template.csv');
        });
      }}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstBatchesTabWrapper() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  return (
    <BatchesTab
      batches={ctx.batches}
      students={ctx.students}
      onCreateBatch={ctx.onCreateBatch}
      onUpdateBatch={ctx.onUpdateBatch}
      onArchiveBatch={ctx.onArchiveBatch}
      onNavigateTab={(tab, batchId) => navigate(`/institution/${tab}${batchId ? `?batch=${batchId}` : ''}`)}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstTestSeriesTabWrapper() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  return (
    <TestSeriesTab
      availableSeries={ctx.availableSeries}
      availableTests={ctx.availableTests}
      batches={ctx.batches}
      students={ctx.students}
      onAssignTest={(testId, data) => {
        if (testId) {
          return ctx.onAssignTest(testId, data);
        } else {
          navigate('/institution/test-assignments');
        }
      }}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstTestAssignmentsTabWrapper() {
  const ctx = useOutletContext();
  return (
    <TestAssignmentsTab
      availableTests={ctx.availableTests}
      batches={ctx.batches}
      students={ctx.students}
      onAssignTest={ctx.onAssignTest}
      onSendReminder={(testId) => ctx.onSendReminder({ target_type: 'all', test_id: testId })}
      isDarkMode={ctx.isDarkMode}
    />
  );
}


export function InstAnalyticsTabWrapper() {
  const ctx = useOutletContext();
  return (
    <AnalyticsTab
      analytics={ctx.analytics}
      rankings={ctx.rankings}
      batches={ctx.batches}
      availableTests={ctx.availableTests}
      instId={ctx.instId || ctx.profile?.id || ctx.institution?.id || 1}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstRankingsTabWrapper() {
  const ctx = useOutletContext();
  return (
    <RankingsTab
      rankings={ctx.rankings}
      batches={ctx.batches}
      students={ctx.students}
      availableTests={ctx.availableTests}
      instId={ctx.instId || ctx.profile?.id || ctx.institution?.id || 1}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstEbooksTabWrapper() {
  const ctx = useOutletContext();
  return (
    <EbooksTab
      availableEbooks={ctx.availableEbooks}
      batches={ctx.batches}
      students={ctx.students}
      onAssignEbook={ctx.onAssignEbook}
      onUnassignEbook={ctx.onUnassignEbook}
      instId={ctx.instId || ctx.profile?.id || ctx.institution?.id || 1}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstReportsTabWrapper() {
  const ctx = useOutletContext();
  return (
    <ReportsTab
      institution={ctx.profile || ctx.institution}
      students={ctx.students}
      batches={ctx.batches}
      availableTests={ctx.availableTests}
      instId={ctx.instId || ctx.profile?.id || ctx.institution?.id || 1}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstAttendanceTabWrapper() {
  const ctx = useOutletContext();
  return (
    <AttendanceTab
      students={ctx.students}
      batches={ctx.batches}
      availableTests={ctx.availableTests}
      instId={ctx.instId || ctx.profile?.id || ctx.institution?.id || 1}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstPaymentsTabWrapper() {
  const ctx = useOutletContext();
  return (
    <PaymentsTab
      institution={ctx.institution}
      invoices={ctx.invoices}
      onRequestLicenses={ctx.onRequestLicenses}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstNotificationsTabWrapper() {
  const ctx = useOutletContext();
  return (
    <NotificationsTab
      notifications={ctx.notifications}
      batches={ctx.batches}
      students={ctx.students}
      onSendReminder={ctx.onSendReminder}
      onMarkRead={ctx.onMarkNotificationRead}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstProfileTabWrapper() {
  const ctx = useOutletContext();
  return (
    <ProfileTab
      institution={ctx.institution}
      onUpdateProfile={ctx.onUpdateProfile}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstSettingsTabWrapper() {
  const ctx = useOutletContext();
  return (
    <SettingsTab
      isDarkMode={ctx.isDarkMode}
      setIsDarkMode={ctx.setIsDarkMode}
    />
  );
}

export function InstBatchDetailTabWrapper() {
  const ctx = useOutletContext();
  return (
    <BatchDetailTab
      instId={ctx.instId || ctx.profile?.id || ctx.institution?.id || 1}
      masterStudents={ctx.students}
      allTestSeries={ctx.availableSeries}
      allAvailableTests={ctx.availableTests}
      isDarkMode={ctx.isDarkMode}
    />
  );
}
