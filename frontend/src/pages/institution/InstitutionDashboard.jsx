import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import InstitutionPortalLayout from '../../components/institution/InstitutionPortalLayout.jsx';

import OverviewTab from '../../components/institution/tabs/OverviewTab.jsx';
import StudentsTab from '../../components/institution/tabs/StudentsTab.jsx';
import BatchesTab from '../../components/institution/tabs/BatchesTab.jsx';
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
import { useToast } from '../../context/ToastContext.jsx';
import { Spinner } from '../../components/ui.jsx';

export default function InstitutionDashboard() {
  const { id } = useParams();
  const instId = Number(id) || 1;
  const navigate = useNavigate();
  const toast = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  // Data States
  const [profile, setProfile] = useState(null);
  const [students, setStudents] = useState([]);
  const [batches, setBatches] = useState([]);
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

  useEffect(() => {
    loadDashboardData();
  }, [instId]);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      try {
        const saved = localStorage.getItem('edvedum_active_institution');
        if (saved) setProfile(JSON.parse(saved));
      } catch (e) {}

      const [
        profRes,
        studRes,
        batchRes,
        testsRes,
        ebooksRes,
        analRes,
        rankRes,
        invRes,
        notifRes,
      ] = await Promise.all([
        institutionDashboardService.profile(instId).catch(() => null),
        institutionDashboardService.students(instId).catch(() => null),
        institutionDashboardService.batches(instId).catch(() => null),
        institutionDashboardService.availableTests(instId).catch(() => null),
        institutionDashboardService.availableEbooks(instId).catch(() => null),
        institutionDashboardService.analytics(instId).catch(() => null),
        institutionDashboardService.rankings(instId).catch(() => null),
        institutionDashboardService.invoices(instId).catch(() => null),
        institutionDashboardService.notifications(instId).catch(() => null),
      ]);

      if (profRes?.profile) setProfile(profRes.profile);
      if (studRes?.students) setStudents(studRes.students);
      if (batchRes?.batches) setBatches(batchRes.batches);
      if (testsRes?.tests) setAvailableTests(testsRes.tests);
      if (ebooksRes?.ebooks) setAvailableEbooks(ebooksRes.ebooks);
      if (analRes?.analytics) setAnalytics(analRes.analytics);
      if (rankRes?.rankings) setRankings(rankRes.rankings);
      if (invRes?.invoices) setInvoices(invRes.invoices);
      if (notifRes?.notifications) {
        setNotifications(notifRes.notifications);
        setUnreadCount(notifRes.unread_count || 0);
      }
    } catch (err) {
      console.warn('Backend API connection warning, retaining current session:', err);
    } flex: {
      setLoading(false);
    }
  };

  // Student Actions
  const handleAddStudent = async (studentData) => {
    try {
      const res = await institutionDashboardService.addStudent(instId, studentData);
      toast.success(res.message || 'Student enrolled successfully');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Failed to add student');
      throw err;
    }
  };

  const handleUpdateStudent = async (studentId, data) => {
    try {
      await institutionDashboardService.updateStudent(instId, studentId, data);
      toast.success('Student record updated');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Failed to update student');
    }
  };

  const handleToggleBlockStudent = async (studentId, isBlocked) => {
    try {
      await institutionDashboardService.toggleBlockStudent(instId, studentId, isBlocked);
      toast.success(isBlocked ? 'Student access suspended' : 'Student access restored');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Action failed');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    try {
      await institutionDashboardService.deleteStudent(instId, studentId);
      toast.success('Student removed');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Failed to delete student');
    }
  };

  const handleMoveBatch = async (studentIds, targetBatchId) => {
    try {
      await institutionDashboardService.moveBatch(instId, { student_ids: studentIds, target_batch_id: targetBatchId });
      toast.success('Students moved to new batch');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Failed to move batch');
    }
  };

  const handleBulkUpload = async (rows) => {
    try {
      const res = await institutionDashboardService.bulkUpload(instId, rows);
      toast.success(`Bulk upload completed: ${res.inserted || 0} students enrolled`);
      loadDashboardData();
      return res;
    } catch (err) {
      toast.error(err.message || 'Bulk upload failed');
      throw err;
    }
  };

  const handleRegenerateCredentials = async (studentId) => {
    try {
      const res = await institutionDashboardService.regenerateCredentials(instId, studentId);
      toast.success(`New Password Generated: ${res.temp_password || '********'}`);
      return res;
    } catch (err) {
      toast.error(err.message || 'Failed to reset credentials');
    }
  };

  // Batch Actions
  const handleCreateBatch = async (batchData) => {
    try {
      await institutionDashboardService.createBatch(instId, batchData);
      toast.success('New batch created');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Failed to create batch');
    }
  };

  const handleUpdateBatch = async (batchId, data) => {
    try {
      await institutionDashboardService.updateBatch(instId, batchId, data);
      toast.success('Batch updated');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Failed to update batch');
    }
  };

  const handleArchiveBatch = async (batchId) => {
    try {
      await institutionDashboardService.archiveBatch(instId, batchId);
      toast.success('Batch archived');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Failed to archive batch');
    }
  };

  // Test & eBook Assignments
  const handleAssignTest = async (testId, data) => {
    try {
      await institutionDashboardService.assignTest(instId, testId, data);
      toast.success('Test series assigned to batch');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Test assigned to target roster.');
    }
  };

  const handleAssignEbook = async (ebookId, data) => {
    try {
      await institutionDashboardService.assignEbook(instId, ebookId, data);
      toast.success('eBook distributed successfully');
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'eBook assigned to target roster.');
    }
  };

  const handleRequestLicenses = async (data) => {
    try {
      await institutionDashboardService.requestLicenses(instId, data);
      toast.success('Licence expansion request sent to Edvedum Billing');
    } catch (err) {
      toast.error(err.message || 'Request sent to Billing panel');
    }
  };

  const handleSendReminder = async (data) => {
    try {
      await institutionDashboardService.sendReminder(instId, data);
      toast.success('Reminder notification dispatched to students');
    } catch (err) {
      toast.error(err.message || 'Reminder sent');
    }
  };

  const outletContext = {
    institution: profile,
    students,
    batches,
    availableTests,
    availableEbooks,
    analytics,
    rankings,
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
    onRequestLicenses: handleRequestLicenses,
    onSendReminder: handleSendReminder,
    onOpenAddStudent: () => setShowAddStudentModal(true),
    onOpenUploadCsv: () => setShowBulkUploadModal(true),
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
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      isDarkMode={isDarkMode}
      setIsDarkMode={setIsDarkMode}
      onOpenAddStudent={() => setShowAddStudentModal(true)}
      onOpenUploadCsv={() => setShowBulkUploadModal(true)}
      onOpenCreateBatch={() => navigate('/institution/batches')}
      onOpenAssignTest={() => navigate('/institution/test-assignments')}
      outletContext={outletContext}
    >
      <Outlet context={outletContext} />

      {/* GLOBAL MODALS */}
      {showAddStudentModal && (
        <AddStudentModal
          batches={batches}
          onClose={() => setShowAddStudentModal(false)}
          onSubmit={handleAddStudent}
          isDarkMode={isDarkMode}
        />
      )}

      {showBulkUploadModal && (
        <BulkUploadModal
          batches={batches}
          onClose={() => setShowBulkUploadModal(false)}
          onSubmit={handleBulkUpload}
          instId={instId}
          isDarkMode={isDarkMode}
        />
      )}
    </InstitutionPortalLayout>
  );
}

/* =========================================================================
    INDIVIDUAL TAB WRAPPERS FOR ROUTER
   ========================================================================= */

export function InstOverviewTabWrapper() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  return (
    <OverviewTab
      institution={ctx.institution}
      students={ctx.students}
      batches={ctx.batches}
      analytics={ctx.analytics}
      onOpenAddStudent={ctx.onOpenAddStudent}
      onOpenUploadCsv={ctx.onOpenUploadCsv}
      onNavigateTab={(tab) => navigate(`/institution/${tab}`)}
      isDarkMode={ctx.isDarkMode}
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
      onOpenAddStudent={ctx.onOpenAddStudent}
      onOpenUploadCsv={ctx.onOpenUploadCsv}
      onUpdateStudent={ctx.onUpdateStudent}
      onToggleBlockStudent={ctx.onToggleBlockStudent}
      onDeleteStudent={ctx.onDeleteStudent}
      onMoveBatch={ctx.onMoveBatch}
      onRegenerateCredentials={ctx.onRegenerateCredentials}
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
      onCreateBatch={ctx.onCreateBatch}
      onUpdateBatch={ctx.onUpdateBatch}
      onArchiveBatch={ctx.onArchiveBatch}
      onNavigateTab={(tab) => navigate(`/institution/${tab}`)}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstTestSeriesTabWrapper() {
  const ctx = useOutletContext();
  return (
    <TestSeriesTab
      availableTests={ctx.availableTests}
      batches={ctx.batches}
      students={ctx.students}
      onAssignTest={ctx.onAssignTest}
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

export function InstEbooksTabWrapper() {
  const ctx = useOutletContext();
  return (
    <EbooksTab
      availableEbooks={ctx.availableEbooks}
      batches={ctx.batches}
      students={ctx.students}
      onAssignEbook={ctx.onAssignEbook}
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
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstReportsTabWrapper() {
  const ctx = useOutletContext();
  return (
    <ReportsTab
      institution={ctx.institution}
      students={ctx.students}
      batches={ctx.batches}
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
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstProfileTabWrapper() {
  const ctx = useOutletContext();
  return (
    <ProfileTab
      institution={ctx.institution}
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
