import { Router } from 'express';
import {
  listAllAssessments,
  listAvailableAssessments,
  getStudentAssessment,
  getAssessmentAdmin,
  previewAssessment,
  createAssessment,
  updateAssessment,
  togglePublish,
  deleteAssessment,
} from '../controllers/assessmentController.js';
import { listQuestions, createQuestion, reorderQuestions, bulkUploadQuestions, exportQuestions } from '../controllers/questionController.js';
import { listSections, createSection } from '../controllers/sectionController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { assessmentSchema, assessmentUpdateSchema, questionSchema, sectionSchema, reorderQuestionsSchema, bulkUploadSchema } from '../validators/schemas.js';

const router = Router();

router.use(authenticate);

router.get('/available', authorize('candidate'), listAvailableAssessments);
router.get('/available/:id', authorize('candidate'), getStudentAssessment);

router.get('/', authorize('admin'), listAllAssessments);
router.post('/', authorize('admin'), validate(assessmentSchema), createAssessment);

router.get('/:assessmentId/sections', authorize('admin'), listSections);
router.post('/:assessmentId/sections', authorize('admin'), validate(sectionSchema), createSection);

router.get('/:assessmentId/questions/export', authorize('admin'), exportQuestions);
router.get('/:assessmentId/questions', authorize('admin'), listQuestions);
router.post('/:assessmentId/questions', authorize('admin'), validate(questionSchema), createQuestion);
router.post('/:assessmentId/questions/bulk', authorize('admin'), validate(bulkUploadSchema), bulkUploadQuestions);
router.put('/:assessmentId/questions/reorder', authorize('admin'), validate(reorderQuestionsSchema), reorderQuestions);

router.get('/:id/preview', authorize('admin'), previewAssessment);
router.get('/:id', authorize('admin'), getAssessmentAdmin);
router.put('/:id', authorize('admin'), validate(assessmentUpdateSchema), updateAssessment);
router.patch('/:id/publish', authorize('admin'), togglePublish);
router.delete('/:id', authorize('admin'), deleteAssessment);

export default router;
