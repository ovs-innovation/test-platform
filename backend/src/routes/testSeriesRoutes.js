import { Router } from 'express';
import {
  listTestSeries,
  createTestSeries,
  updateTestSeries,
  linkAssessment,
  myEnrollments,
  enrollTestSeries,
  mySeriesTests,
  deleteTestSeries,
  unlinkAssessment,
  parsePdfPreview,
  importTestSeriesFromPdf,
} from '../controllers/testSeriesController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  testSeriesSchema,
  testSeriesUpdateSchema,
  enrollSchema,
  linkTestSchema,
  parsePdfSchema,
  importPdfTestSeriesSchema,
} from '../validators/schemas.js';

const router = Router();

router.use(authenticate);

router.get('/my/enrollments', authorize('candidate'), myEnrollments);
router.get('/my/:slug/tests', authorize('candidate'), mySeriesTests);
router.post('/enroll', authorize('candidate'), validate(enrollSchema), enrollTestSeries);

router.get('/', authorize('admin'), listTestSeries);
router.post('/parse-pdf', authorize('admin'), validate(parsePdfSchema), parsePdfPreview);
router.post('/import-pdf', authorize('admin'), validate(importPdfTestSeriesSchema), importTestSeriesFromPdf);
router.post('/', authorize('admin'), validate(testSeriesSchema), createTestSeries);
router.put('/:id', authorize('admin'), validate(testSeriesUpdateSchema), updateTestSeries);
router.delete('/:id', authorize('admin'), deleteTestSeries);
router.post('/:id/link', authorize('admin'), validate(linkTestSchema), linkAssessment);
router.delete('/:id/link/:assessmentId', authorize('admin'), unlinkAssessment);

export default router;
