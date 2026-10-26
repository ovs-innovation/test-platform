import { Router } from 'express';
import { institutionAdminLogin } from '../controllers/authController.js';
import { authInstitutionAdmin } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  institutionLoginSchema,
  assignIncidentSchema,
  addIncidentNotesSchema,
  updateIncidentStatusSchema,
  resolveIncidentSchema,
} from '../validators/schemas.js';
import {
  listAdminIncidents,
  getAdminIncidentDetails,
  acknowledgeIncident,
  assignIncident,
  addInvestigationNotes,
  updateIncidentStatus,
  resolveIncident,
} from '../controllers/incidentController.js';
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
  unassignEbook,
  createInstitutionEbook,
  deleteInstitutionEbook,
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
  getInstitutionBatchDetail,
  getInstitutionBatchStudents,
  addStudentsToBatch,
  removeStudentFromBatch,
  getBatchTestSeries,
  getBatchPerformance,
  listInstitutionCustomTests,
  createInstitutionCustomTest,
  getInstitutionCustomTest,
  updateInstitutionCustomTest,
  deleteInstitutionCustomTest,
  assignInstitutionCustomTest,
  uploadQuestionPaperFile,
  updateInstitutionCustomTestQuestion,
  deleteInstitutionCustomTestQuestion,
  uploadCustomTestDiagram,
} from '../controllers/institutionDashboardController.js';
import { pdfUploadMiddleware } from '../middleware/pdfUpload.js';
import multer from 'multer';

const diagramUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 },
}).fields([
  { name: 'file', maxCount: 1 },
  { name: 'image', maxCount: 1 },
  { name: 'diagram', maxCount: 1 },
]);

const router = Router();

// Public Institution Admin Login
router.post('/login', validate(institutionLoginSchema), institutionAdminLogin);

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

// 5. Batch Management & Sub-resources
router.get('/:id/batches', listInstitutionBatches);
router.post('/:id/batches', createInstitutionBatch);
router.get('/:id/batches/:batch_id', getInstitutionBatchDetail);
router.put('/:id/batches/:batch_id', updateInstitutionBatch);
router.delete('/:id/batches/:batch_id', archiveInstitutionBatch);
router.get('/:id/batches/:batch_id/students', getInstitutionBatchStudents);
router.post('/:id/batches/:batch_id/students', addStudentsToBatch);
router.delete('/:id/batches/:batch_id/students/:student_id', removeStudentFromBatch);
router.get('/:id/batches/:batch_id/test-series', getBatchTestSeries);
router.get('/:id/batches/:batch_id/performance', getBatchPerformance);

// 6. Test Series Assignment (Package Restricted)
router.get('/:id/test-series', getAvailableTestSeries);
router.get('/:id/available-tests', getAvailablePackageTests);
router.post('/:id/tests/:test_id/assign', assignTestSeries);

// 6b. Institution Custom Tests & Question Paper Upload
router.get('/:id/custom-tests', listInstitutionCustomTests);
router.post('/:id/custom-tests', createInstitutionCustomTest);
router.post('/:id/custom-tests/upload-paper', pdfUploadMiddleware, uploadQuestionPaperFile);
router.get('/:id/custom-tests/:test_id', getInstitutionCustomTest);
router.put('/:id/custom-tests/:test_id', updateInstitutionCustomTest);
router.delete('/:id/custom-tests/:test_id', deleteInstitutionCustomTest);
router.post('/:id/custom-tests/:test_id/assign', assignInstitutionCustomTest);
router.put('/:id/custom-tests/:test_id/questions/:question_id', updateInstitutionCustomTestQuestion);
router.delete('/:id/custom-tests/:test_id/questions/:question_id', deleteInstitutionCustomTestQuestion);
router.post('/:id/custom-tests/:test_id/questions/upload-diagram', diagramUpload, uploadCustomTestDiagram);

// 7. eBooks Assignment, Creation & Deletion
router.get('/:id/available-ebooks', getAvailableEbooks);
router.post('/:id/ebooks', createInstitutionEbook);
router.post('/:id/ebooks/:ebook_id/assign', assignEbook);
router.delete('/:id/ebooks/:ebook_id/assign/:assignment_id', unassignEbook);
router.delete('/:id/ebooks/:ebook_id', deleteInstitutionEbook);

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

// 12. Live Technical Incident Management (Scoped to Institution)
router.get('/:id/incidents', listAdminIncidents);
router.get('/:id/incidents/:incident_id', getAdminIncidentDetails);
router.post('/:id/incidents/:incident_id/acknowledge', acknowledgeIncident);
router.patch('/:id/incidents/:incident_id/assign', validate(assignIncidentSchema), assignIncident);
router.post('/:id/incidents/:incident_id/notes', validate(addIncidentNotesSchema), addInvestigationNotes);
router.patch('/:id/incidents/:incident_id/status', validate(updateIncidentStatusSchema), updateIncidentStatus);
router.post('/:id/incidents/:incident_id/resolve', validate(resolveIncidentSchema), resolveIncident);

export default router;
