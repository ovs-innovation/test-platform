import { Router } from 'express';
import { institutionAdminLogin } from '../controllers/authController.js';
import { authInstitutionAdmin } from '../middleware/auth.js';
import {
  getInstitutionProfile,
  updateInstitutionProfile,
  listInstitutionStudents,
  addInstitutionStudent,
  updateInstitutionStudent,
  toggleBlockInstitutionStudent,
  deleteInstitutionStudent,
  moveStudentsBatch,
  bulkUploadStudents,
  getBulkUploadTemplate,
  regenerateStudentCredentials,
  listInstitutionBatches,
  createInstitutionBatch,
  updateInstitutionBatch,
  archiveInstitutionBatch,
  getAvailablePackageTests,
  getAvailableTestSeries,
  assignTestSeries,
  getAvailableEbooks,
  assignEbook,
  getStudentProgress,
  getInstitutionAnalytics,
  exportInstitutionReport,
  getInstitutionRankings,
  getTestCompletionStatus,
  getResultAnalysis,
  listInstitutionInvoices,
  requestAdditionalLicenses,
  listInstitutionNotifications,
  markNotificationAsRead,
  sendStudentReminder,
} from '../controllers/institutionDashboardController.js';

const router = Router();

// Public Institution Admin Login
router.post('/login', institutionAdminLogin);

// Protected Institution Admin Routes
router.use('/:id', authInstitutionAdmin);

// 1. Profile
router.get('/:id/profile', getInstitutionProfile);
router.put('/:id/profile', updateInstitutionProfile);

// 2. Student Management (CRUD & Batch Move)
router.get('/:id/students', listInstitutionStudents);
router.post('/:id/students', addInstitutionStudent);
router.put('/:id/students/:student_id', updateInstitutionStudent);
router.put('/:id/students/:student_id/block', toggleBlockInstitutionStudent);
router.delete('/:id/students/:student_id', deleteInstitutionStudent);
router.post('/:id/students/move-batch', moveStudentsBatch);

// 3. Bulk Upload
router.post('/:id/students/bulk-upload', bulkUploadStudents);
router.get('/:id/students/bulk-upload/template', getBulkUploadTemplate);

// 4. Credentials
router.post('/:id/students/:student_id/regenerate-credentials', regenerateStudentCredentials);

// 5. Batch Management
router.get('/:id/batches', listInstitutionBatches);
router.post('/:id/batches', createInstitutionBatch);
router.put('/:id/batches/:batch_id', updateInstitutionBatch);
router.delete('/:id/batches/:batch_id', archiveInstitutionBatch);

// 6. Test Series Assignment (Package Restricted)
router.get('/:id/test-series', getAvailableTestSeries);
router.get('/:id/available-tests', getAvailablePackageTests);
router.post('/:id/tests/:test_id/assign', assignTestSeries);

// 7. eBooks Assignment
router.get('/:id/available-ebooks', getAvailableEbooks);
router.post('/:id/ebooks/:ebook_id/assign', assignEbook);

// 8. Student Progress
router.get('/:id/students/:student_id/progress', getStudentProgress);

// 9. Analytics & Reports
router.get('/:id/analytics', getInstitutionAnalytics);
router.get('/:id/reports/export', exportInstitutionReport);
router.get('/:id/rankings', getInstitutionRankings);
router.get('/:id/test-completion', getTestCompletionStatus);
router.get('/:id/result-analysis', getResultAnalysis);

// 10. Invoices & Billing
router.get('/:id/invoices', listInstitutionInvoices);
router.post('/:id/invoices/request-licenses', requestAdditionalLicenses);

// 11. Notifications & Reminders
router.get('/:id/notifications', listInstitutionNotifications);
router.put('/:id/notifications/:notif_id/read', markNotificationAsRead);
router.post('/:id/notifications/send-reminder', sendStudentReminder);

export default router;
