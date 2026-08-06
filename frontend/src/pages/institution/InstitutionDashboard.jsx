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
import { downloadStudentCsvTemplate } from '../../lib/csv.js';
import { useToast } from '../../context/ToastContext.jsx';
import { Spinner } from '../../components/ui.jsx';
import { Key, Copy, CheckCircle2, X } from 'lucide-react';

export default function InstitutionDashboard() {
  const { id } = useParams();

  // Dynamically resolve active institution ID from URL param -> localStorage -> fallback 1
  const getActiveInstId = () => {
    if (id && !isNaN(Number(id))) {
      return Number(id);
    }
    try {
      const saved = localStorage.getItem('edvedum_active_institution') || localStorage.getItem('edvedum_active_school');
      if (saved) {
        const parsed = JSON.parse(saved);
        const savedId = Number(parsed?.id || parsed?.institution_id);
        if (savedId && !isNaN(savedId) && savedId > 0) return savedId;
      }
    } catch (e) {}
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

  // Student Actions
  const handleAddStudent = async (studentData) => {
    try {
      const res = await institutionDashboardService.addStudent(instId, studentData);
      toast.success(res.message || 'Student enrolled successfully');
      loadDashboardData();
      return res;
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
      const res = await institutionDashboardService.assignEbook(instId, ebookId, data);
      toast.success(res?.message || 'eBook assigned to target roster successfully');
      loadDashboardData();
      return res;
    } catch (err) {
      toast.error(err?.message || 'Failed to assign eBook');
      throw err;
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
          downloadFromApi(`/institution/${ctx.institution?.id || 1}/students/bulk-upload/template`, 'student_bulk_upload_template.csv');
        });
      }}
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
      onAddStudent={ctx.onAddStudent}
      onEditStudent={ctx.onUpdateStudent}
      onToggleBlock={ctx.onToggleBlockStudent}
      onDeleteStudent={ctx.onDeleteStudent}
      onMoveBatch={ctx.onMoveBatch}
      onBulkUpload={ctx.onBulkUpload}
      onRegenerateCredentials={ctx.onRegenerateCredentials}
      onAssignTests={(ids) => ctx.onAssignTest(ids)}
      onAssignEbooks={(ids) => ctx.onAssignEbook(ids)}
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
  return (
    <BatchesTab
      batches={ctx.batches}
      students={ctx.students}
      onCreateBatch={ctx.onCreateBatch}
      onUpdateBatch={ctx.onUpdateBatch}
      onArchiveBatch={ctx.onArchiveBatch}
      isDarkMode={ctx.isDarkMode}
    />
  );
}

export function InstTestSeriesTabWrapper() {
  const ctx = useOutletContext();
  const navigate = useNavigate();
  return (
    <TestSeriesTab
      availableTests={ctx.availableTests}
      batches={ctx.batches}
      students={ctx.students}
      onAssignTest={(testId) => {
        if (testId) {
          ctx.onAssignTest(testId);
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
