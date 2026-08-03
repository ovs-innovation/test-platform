import { useState, useEffect } from 'react';
import { useParams, useNavigate, useOutletContext, Outlet } from 'react-router-dom';
import InstitutionPortalLayout from '../../components/institution/InstitutionPortalLayout.jsx';

import OverviewTab from '../../components/institution/tabs/OverviewTab.jsx';
import StudentsTab from '../../components/institution/tabs/StudentsTab.jsx';
import BatchesTab from '../../components/institution/tabs/BatchesTab.jsx';
import TestAssignmentsTab from '../../components/institution/tabs/TestAssignmentsTab.jsx';
import EbooksTab from '../../components/institution/tabs/EbooksTab.jsx';
import AnalyticsTab from '../../components/institution/tabs/AnalyticsTab.jsx';
import ReportsTab from '../../components/institution/tabs/ReportsTab.jsx';
import PaymentsTab from '../../components/institution/tabs/PaymentsTab.jsx';
import NotificationsTab from '../../components/institution/tabs/NotificationsTab.jsx';

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
    } finally {
      setLoading(false);
    }
  };

  const refreshStudents = async () => {
    try {
      const res = await institutionDashboardService.students(instId);
      if (res?.students) setStudents(res.students);
    } catch (err) {
      console.error('Failed to refresh student list', err);
    }
  };

  const refreshBatches = async () => {
    try {
      const res = await institutionDashboardService.batches(instId);
      if (res?.batches) setBatches(res.batches);
    } catch (err) {
      console.error('Failed to refresh batches list', err);
    }
  };

  // Student Actions
  const handleAddStudentSubmit = async (formData) => {
    const res = await institutionDashboardService.addStudent(instId, formData);
    toast.success(`Student ${formData.name} enrolled with Roll No ${res?.enrollmentId || res?.student?.roll_number}`);
    refreshStudents();
    loadDashboardData();
    return res;
  };

  const handleBulkUploadSubmit = async (rows) => {
    const res = await institutionDashboardService.bulkUpload(instId, rows);
    toast.success(`Bulk upload complete! ${res?.summary?.success_count || rows.length} students imported.`);
    refreshStudents();
    loadDashboardData();
    return res;
  };

  const handleToggleBlock = async (studentId, isBlocked) => {
    try {
      await institutionDashboardService.toggleBlockStudent(instId, studentId, isBlocked);
      toast.success(`Student account ${isBlocked ? 'blocked' : 'unblocked'}.`);
      refreshStudents();
    } catch (err) {
      toast.error(err.message || 'Failed to update student block status.');
    }
  };

  const handleDeleteStudent = async (studentId) => {
    if (!window.confirm('Are you sure you want to remove this student account? Licence seat will be freed.')) return;
    try {
      await institutionDashboardService.deleteStudent(instId, studentId);
      toast.success('Student account removed and licence seat freed.');
      refreshStudents();
      loadDashboardData();
    } catch (err) {
      toast.error(err.message || 'Failed to delete student account.');
    }
  };

  const handleRegenerateCredentials = async (studentId) => {
    try {
      const res = await institutionDashboardService.regenerateCredentials(instId, studentId);
      toast.success(`Password reset! New password: ${res.new_password}`);
    } catch (err) {
      toast.error(err.message || 'Failed to regenerate credentials.');
    }
  };

  const handleMoveBatch = async (studentIds, targetBatchId) => {
    try {
      await institutionDashboardService.moveBatch(instId, { student_ids: studentIds, target_batch_id: targetBatchId });
      toast.success('Selected student(s) moved to batch.');
      refreshStudents();
    } catch (err) {
      toast.error(err.message || 'Failed to move batch.');
    }
  };

  // Batch Actions
  const handleCreateBatch = async (batchData) => {
    await institutionDashboardService.createBatch(instId, batchData);
    toast.success(`Batch "${batchData.batch_name}" created successfully.`);
    refreshBatches();
  };

  const handleUpdateBatch = async (batchId, batchData) => {
    await institutionDashboardService.updateBatch(instId, batchId, batchData);
    toast.success('Batch updated successfully.');
    refreshBatches();
  };

  const handleArchiveBatch = async (batchId) => {
    if (!window.confirm('Are you sure you want to archive this batch?')) return;
    await institutionDashboardService.archiveBatch(instId, batchId);
    toast.success('Batch archived.');
    refreshBatches();
  };

  // Assignments
  const handleAssignTest = async (testId, payload) => {
    await institutionDashboardService.assignTest(instId, testId, payload);
    toast.success('Test series assigned successfully.');
  };

  const handleAssignEbook = async (ebookId, payload) => {
    await institutionDashboardService.assignEbook(instId, ebookId, payload);
  };

  const handleRequestLicenses = async (payload) => {
    await institutionDashboardService.requestLicenses(instId, payload);
  };

  const handleSendReminder = async (payload) => {
    await institutionDashboardService.sendReminder(instId, payload);
  };

  const handleDownloadCsvTemplate = () => {
    window.open(`/api/institution/${instId}/students/bulk-upload/template`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060D1A] text-white flex flex-col items-center justify-center space-y-4">
        <Spinner className="h-10 w-10 text-cyan-400" />
        <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Loading Institution Portal...</p>
      </div>
    );
  }

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
    isDarkMode,
    onOpenAddStudent: () => setShowAddStudentModal(true),
    onOpenUploadCsv: () => setShowBulkUploadModal(true),
    onDownloadCsvTemplate: handleDownloadCsvTemplate,
    onToggleBlock: handleToggleBlock,
    onDeleteStudent: handleDeleteStudent,
    onRegenerateCredentials: handleRegenerateCredentials,
    onMoveBatch: handleMoveBatch,
    onCreateBatch: handleCreateBatch,
    onUpdateBatch: handleUpdateBatch,
    onArchiveBatch: handleArchiveBatch,
    onAssignTest: handleAssignTest,
    onAssignEbook: handleAssignEbook,
    onRequestLicenses: handleRequestLicenses,
    onSendReminder: handleSendReminder,
  };

  return (
    <>
      <InstitutionPortalLayout
        institutionData={profile}
        unreadNotificationsCount={unreadCount}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        outletContext={outletContext}
        onOpenAddStudent={() => setShowAddStudentModal(true)}
        onOpenUploadCsv={() => setShowBulkUploadModal(true)}
        onOpenCreateBatch={() => navigate('/institution/batches')}
        onOpenAssignTest={() => navigate('/institution/test-assignments')}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
      />

      {/* MODALS */}
      <AddStudentModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        onSubmit={handleAddStudentSubmit}
        batches={batches}
        availableLicenses={Math.max(0, (profile?.total_licenses || 50) - (students.length || 0))}
        isDarkMode={isDarkMode}
      />

      <BulkUploadModal
        isOpen={showBulkUploadModal}
        onClose={() => setShowBulkUploadModal(false)}
        onUploadSubmit={handleBulkUploadSubmit}
        onDownloadTemplate={handleDownloadCsvTemplate}
        availableLicenses={Math.max(0, (profile?.total_licenses || 50) - (students.length || 0))}
        isDarkMode={isDarkMode}
      />
    </>
  );
}

// Child Route Wrappers
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
      onDownloadCsvTemplate={ctx.onDownloadCsvTemplate}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstStudentsTabWrapper() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  return (
    <StudentsTab
      students={ctx.students}
      batches={ctx.batches}
      onOpenAddModal={ctx.onOpenAddStudent}
      onOpenUploadModal={ctx.onOpenUploadCsv}
      onDownloadTemplate={ctx.onDownloadCsvTemplate}
      onToggleBlock={ctx.onToggleBlock}
      onDeleteStudent={ctx.onDeleteStudent}
      onRegenerateCredentials={ctx.onRegenerateCredentials}
      onMoveBatch={(selectedIds) => {
        const batchId = window.prompt('Enter Target Batch ID:');
        if (batchId) ctx.onMoveBatch(selectedIds, batchId);
      }}
      onAssignTests={() => navigate('/institution/test-assignments')}
      onAssignEbooks={() => navigate('/institution/ebooks')}
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
    <div className={`rounded-3xl border p-8 space-y-6 ${ctx.isDarkMode ? 'bg-[#071126] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
      <h3 className="text-xl font-extrabold">Institution Profile & Security Settings</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 font-bold uppercase">Institution Name</span>
          <p className="text-sm font-extrabold text-white mt-1">{ctx.institution?.name || 'S.S.C Public School'}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 font-bold uppercase">Admin Email</span>
          <p className="text-sm font-extrabold text-cyan-400 mt-1">{ctx.institution?.contact_email || 'admin@sscpublic.edu.in'}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 font-bold uppercase">Contact Person</span>
          <p className="text-sm font-extrabold text-white mt-1">{ctx.institution?.contact_person || 'Dr. Ramesh Sharma'}</p>
        </div>
        <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-slate-400 font-bold uppercase">Assigned Licences</span>
          <p className="text-sm font-extrabold text-emerald-400 mt-1">{ctx.institution?.total_licenses || 50} Student Seats</p>
        </div>
      </div>
    </div>
  );
}
