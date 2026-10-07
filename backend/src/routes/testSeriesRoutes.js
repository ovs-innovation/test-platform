import { Router } from 'express';
import {
  listTestSeries,
  createTestSeries,
  updateTestSeries,
  linkTest,
  unlinkTest,
  myEnrollments,
  enrollTestSeries,
  mySeriesTests,
  deleteTestSeries,
  toggleTestSeriesActive,
  syncCatalogue,
  assignTestSeries,
  getTestSeriesAssignments,
  deleteTestSeriesAssignment,
  revokeTestSeriesEnrollment,
} from '../controllers/testSeriesController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  testSeriesSchema,
  testSeriesUpdateSchema,
  enrollSchema,
  linkTestSchema,
  assignTestSeriesSchema,
} from '../validators/schemas.js';

const router = Router();

router.use(authenticate);

router.get('/my/enrollments', authorize('candidate'), myEnrollments);
router.get('/my/:slug/tests', authorize('candidate'), mySeriesTests);
router.post('/enroll', authorize('candidate'), validate(enrollSchema), enrollTestSeries);

router.get('/', authorize('admin'), listTestSeries);
router.post('/sync', authorize('admin'), syncCatalogue);
router.post('/', authorize('admin'), validate(testSeriesSchema), createTestSeries);
router.put('/:id', authorize('admin'), validate(testSeriesUpdateSchema), updateTestSeries);
router.patch('/:id/toggle-active', authorize('admin'), toggleTestSeriesActive);
router.delete('/:id', authorize('admin'), deleteTestSeries);

router.post('/:id/link', authorize('admin'), validate(linkTestSchema), linkTest);
router.delete('/:id/link/:testId', authorize('admin'), unlinkTest);

// Audience Assignment Endpoints
router.get('/:id/assignments', authorize('admin'), getTestSeriesAssignments);
router.post('/:id/assign', authorize('admin'), validate(assignTestSeriesSchema), assignTestSeries);
router.delete('/:id/assignments/:assignmentId', authorize('admin'), deleteTestSeriesAssignment);
router.delete('/:id/enrollments/:enrollmentId', authorize('admin'), revokeTestSeriesEnrollment);

export default router;
