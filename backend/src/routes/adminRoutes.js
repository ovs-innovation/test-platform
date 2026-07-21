import { Router } from 'express';
import {
  getStats,
  getCandidates,
  createCandidate,
  updateCandidate,
  deleteCandidate,
  getReports,
  exportReports,
  getAttemptReport,
  getAnalytics,
} from '../controllers/adminController.js';
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
router.get('/candidates', getCandidates);
router.post('/candidates', validate(adminCreateCandidateSchema), createCandidate);
router.put('/candidates/:id', validate(adminUpdateCandidateSchema), updateCandidate);
router.delete('/candidates/:id', deleteCandidate);
router.get('/reports/export', exportReports);
router.get('/reports', getReports);
router.get('/attempts/:id', getAttemptReport);
router.get('/invites', listInvites);
router.post('/invites', validate(inviteSchema), createInvite);
router.post('/invites/:id/resend', resendInvite);

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

export default router;
