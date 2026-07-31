import { Router } from 'express';
import {
  getStats,
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  toggleBlockCandidate,
  getReports,
  exportReports,
  getAttemptReport,
  getAnalytics,
  getInstitutionAnalytics,
  getFeatureFlags,
  updateFeatureFlag,
  getInstitutions,
  createInstitution,
  deleteInstitution,
  getB2bEnquiries,
  updateB2bEnquiryStatus,
  deleteB2bEnquiry,
} from '../controllers/adminController.js';
import {
  listTests,
  createTest,
  getTestDetails,
  updateTest,
  deleteTest,
  togglePublishTest,
  assignTest,
  listAssignments,
  removeAssignment,
  uploadTestFile,
  generateResults,
  setMissedTestOverride,
  getTestParticipation,
  notifyTestReminder,
} from '../controllers/testAdminController.js';
import { listEbooks, createEbook, deleteEbook } from '../controllers/ebookController.js';
import { listBatches, createBatch, deleteBatch } from '../controllers/batchController.js';
import {
  listCmsPages, upsertCmsPage, deleteCmsPage,
  listCoupons, createCoupon, toggleCoupon,
  listFaculty, createFaculty,
  adminListSubjects, createSubject, createChapter, listChapters, createTopic,
  getSettings, updateSettings, broadcastNotification,
} from '../controllers/platformController.js';
import { createInvite, listInvites, resendInvite } from '../controllers/inviteController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { inviteSchema, adminCreateCandidateSchema, adminUpdateCandidateSchema } from '../validators/schemas.js';

const router = Router();

router.use(authenticate, authorize('admin'));

router.get('/stats', getStats);
router.get('/analytics', getAnalytics);
router.get('/analytics/institution', getInstitutionAnalytics);
router.get('/candidates', getCandidates);
router.post('/candidates', validate(adminCreateCandidateSchema), createCandidate);
router.put('/candidates/:id', validate(adminUpdateCandidateSchema), updateCandidate);
router.patch('/candidates/:id/block', toggleBlockCandidate);
router.delete('/candidates/:id', deleteCandidate);
router.get('/reports/export', exportReports);
router.get('/reports', getReports);
router.get('/attempts/:id', getAttemptReport);
router.get('/invites', listInvites);
router.post('/invites', validate(inviteSchema), createInvite);
router.post('/invites/:id/resend', resendInvite);

// Test Management Endpoints
router.get('/tests', listTests);
router.post('/tests', createTest);
router.get('/tests/:id', getTestDetails);
router.put('/tests/:id', updateTest);
router.delete('/tests/:id', deleteTest);
router.patch('/tests/:id/publish', togglePublishTest);
router.get('/tests/:id/assignments', listAssignments);
router.post('/tests/:id/assignments', assignTest);
router.delete('/tests/:id/assignments/:assignmentId', removeAssignment);
router.post('/tests/:id/upload', uploadTestFile);
router.post('/tests/:id/generate-results', generateResults);
router.post('/tests/:id/missed-override', setMissedTestOverride);
router.get('/tests/:id/participation', getTestParticipation);
router.post('/tests/:id/notify', notifyTestReminder);

// eBooks Endpoints
router.get('/ebooks', listEbooks);
router.post('/ebooks', createEbook);
router.delete('/ebooks/:id', deleteEbook);

// Batches Endpoints
router.get('/batches', listBatches);
router.post('/batches', createBatch);
router.delete('/batches/:id', deleteBatch);

router.get('/cms', listCmsPages);
router.put('/cms', upsertCmsPage);
router.delete('/cms/:id', deleteCmsPage);
router.get('/settings', getSettings);
router.put('/settings', updateSettings);
router.get('/coupons', listCoupons);
router.post('/coupons', createCoupon);
router.patch('/coupons/:id/toggle', toggleCoupon);
router.get('/faculty', listFaculty);
router.post('/faculty', createFaculty);
router.get('/subjects', adminListSubjects);
router.post('/subjects', createSubject);
router.get('/subjects/:subjectId/chapters', listChapters);
router.post('/chapters', createChapter);
router.post('/topics', createTopic);
router.post('/notifications/broadcast', broadcastNotification);

router.get('/feature-flags', getFeatureFlags);
router.put('/feature-flags/:flag_name', updateFeatureFlag);

router.get('/institutions', getInstitutions);
router.post('/institutions', createInstitution);
router.delete('/institutions/:id', deleteInstitution);

router.get('/b2b-enquiries', getB2bEnquiries);
router.patch('/b2b-enquiries/:id/status', updateB2bEnquiryStatus);
router.delete('/b2b-enquiries/:id', deleteB2bEnquiry);

export default router;
