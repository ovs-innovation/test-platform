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
} from '../controllers/adminController.js';
import {
  getInstitutions,
  createInstitution,
  updateInstitution,
  updateInstitutionPaymentStatus,
  deleteInstitution,
  getB2bEnquiries,
  updateB2bEnquiryStatus,
  deleteB2bEnquiry,
  getB2bEnquiryNotes,
  createB2bEnquiryNote,
  getTestPackages,
  getInstitutionPackages,
  assignInstitutionPackage,
  removeInstitutionPackage,
  createInstitutionInvoice,
  getInstitutionInvoices,
  assignStudentInstitution,
} from '../controllers/adminController.js';
import {
  getInstitutionOverallReport,
  getInstitutionRankingsReport,
  getBatchComparisonReport,
  getInstitutionTrendsReport,
  getImprovementAnalyticsReport,
  getInstitutionsComparisonReport,
} from '../controllers/institutionReportController.js';
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
  listCoupons, createCoupon, toggleCoupon, deleteCoupon,
  listFaculty, createFaculty, deleteFaculty,
  adminListSubjects, createSubject, deleteSubject, createChapter, deleteChapter, listChapters, createTopic, deleteTopic,
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
router.delete('/coupons/:id', deleteCoupon);
router.get('/faculty', listFaculty);
router.post('/faculty', createFaculty);
router.delete('/faculty/:id', deleteFaculty);
router.get('/subjects', adminListSubjects);
router.post('/subjects', createSubject);
router.delete('/subjects/:id', deleteSubject);
router.get('/subjects/:subjectId/chapters', listChapters);
router.post('/chapters', createChapter);
router.delete('/chapters/:id', deleteChapter);
router.post('/topics', createTopic);
router.delete('/topics/:id', deleteTopic);
router.post('/notifications/broadcast', broadcastNotification);

import {
  listAdminForumTopics,
  getAdminForumTopic,
  lockAdminForumTopic,
  deleteAdminForumTopic,
  deleteAdminForumReply,
} from '../controllers/adminController.js';

router.get('/feature-flags', getFeatureFlags);
router.put('/feature-flags/:flag_name', updateFeatureFlag);

router.get('/institutions', getInstitutions);
router.post('/institutions', createInstitution);
router.put('/institutions/:id', updateInstitution);
router.patch('/institutions/:id/payment-status', updateInstitutionPaymentStatus);
router.delete('/institutions/:id', deleteInstitution);

router.get('/b2b-enquiries', getB2bEnquiries);
router.patch('/b2b-enquiries/:id/status', updateB2bEnquiryStatus);
router.delete('/b2b-enquiries/:id', deleteB2bEnquiry);
router.get('/b2b-enquiries/:id/notes', getB2bEnquiryNotes);
router.post('/b2b-enquiries/:id/notes', createB2bEnquiryNote);

router.get('/packages', getTestPackages);
router.get('/institutions/:id/packages', getInstitutionPackages);
router.post('/institutions/:id/packages', assignInstitutionPackage);
router.delete('/institutions/:id/packages/:packageId', removeInstitutionPackage);

router.post('/institutions/:id/invoices', createInstitutionInvoice);
router.get('/institutions/:id/invoices', getInstitutionInvoices);

router.patch('/candidates/:id/institution', assignStudentInstitution);

// Admin School Reports & Multi-School Comparison Endpoints
router.get('/schools/reports/compare', getInstitutionsComparisonReport);
router.get('/schools/:id/reports/overall', getInstitutionOverallReport);
router.get('/schools/:id/reports/overview', getInstitutionOverallReport);
router.get('/schools/:id/reports/rankings', getInstitutionRankingsReport);
router.get('/schools/:id/reports/batch-comparison', getBatchComparisonReport);
router.get('/schools/:id/reports/trends', getInstitutionTrendsReport);
router.get('/schools/:id/reports/improvement', getImprovementAnalyticsReport);

// Admin Discussion Hub & Moderation Endpoints
router.get('/forum', listAdminForumTopics);
router.get('/forum/:id', getAdminForumTopic);
router.patch('/forum/:id/lock', lockAdminForumTopic);
router.delete('/forum/:id', deleteAdminForumTopic);
router.delete('/forum/replies/:replyId', deleteAdminForumReply);

export default router;
