import { Router } from 'express';
import { institutionAdminLogin } from '../controllers/authController.js';
import { authInstitutionAdmin } from '../middleware/auth.js';
import {
  getInstitutionProfile,
  updateInstitutionProfile,
  listInstitutionStudents,
  addInstitutionStudent,
  updateInstitutionStudent,
  deleteInstitutionStudent,
  bulkUploadStudents,
  getBulkUploadTemplate,
  regenerateStudentCredentials,
  getAvailablePackageTests,
  assignTestSeries,
  getAvailableEbooks,
  assignEbook,
  getStudentProgress,
  getInstitutionAnalytics,
  exportInstitutionReport,
  getInstitutionRankings,
  getTestCompletionStatus,
  getResultAnalysis,
} from '../controllers/institutionDashboardController.js';

const router = Router();

// Public Institution Admin Login
router.post('/login', institutionAdminLogin);

// Protected Institution Admin Routes
router.use('/:id', authInstitutionAdmin);

// 1. Profile
router.get('/:id/profile', getInstitutionProfile);
router.put('/:id/profile', updateInstitutionProfile);

// 2. Student Management (CRUD)
router.get('/:id/students', listInstitutionStudents);
router.post('/:id/students', addInstitutionStudent);
router.put('/:id/students/:student_id', updateInstitutionStudent);
router.delete('/:id/students/:student_id', deleteInstitutionStudent);

// 3. Bulk Upload
router.post('/:id/students/bulk-upload', bulkUploadStudents);
router.get('/:id/students/bulk-upload/template', getBulkUploadTemplate);

// 4. Credentials
router.post('/:id/students/:student_id/regenerate-credentials', regenerateStudentCredentials);

// 5. Test Series Assignment (Package Restricted)
router.get('/:id/available-tests', getAvailablePackageTests);
router.post('/:id/tests/:test_id/assign', assignTestSeries);

// 6. eBooks Assignment
router.get('/:id/available-ebooks', getAvailableEbooks);
router.post('/:id/ebooks/:ebook_id/assign', assignEbook);

// 7. Student Progress
router.get('/:id/students/:student_id/progress', getStudentProgress);

// 8. Analytics
router.get('/:id/analytics', getInstitutionAnalytics);

// 9. Download Reports
router.get('/:id/reports/export', exportInstitutionReport);

// 10. Student Rankings
router.get('/:id/rankings', getInstitutionRankings);

// 11. Test Completion & Attendance
router.get('/:id/test-completion', getTestCompletionStatus);

// 12. Result Analysis
router.get('/:id/result-analysis', getResultAnalysis);

export default router;
