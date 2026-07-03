import { Router } from 'express';
import {
  startAttempt,
  getAttemptState,
  saveAnswer,
  markForReview,
  clearAnswer,
  saveCodingAnswer,
  saveSubjectiveAnswer,
  submitAttempt,
  getResult,
} from '../controllers/attemptController.js';
import { logViolation } from '../controllers/violationController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import {
  saveAnswerSchema,
  saveCodingSchema,
  saveSubjectiveSchema,
  violationSchema,
  markReviewSchema,
  clearAnswerSchema,
} from '../validators/schemas.js';

const router = Router();

router.use(authenticate);

router.post('/start', authorize('candidate'), startAttempt);
router.get('/:id', getAttemptState);
router.put('/:id/answer', authorize('candidate'), validate(saveAnswerSchema), saveAnswer);
router.put('/:id/review', authorize('candidate'), validate(markReviewSchema), markForReview);
router.post('/:id/clear', authorize('candidate'), validate(clearAnswerSchema), clearAnswer);
router.put('/:id/coding', authorize('candidate'), validate(saveCodingSchema), saveCodingAnswer);
router.put('/:id/subjective', authorize('candidate'), validate(saveSubjectiveSchema), saveSubjectiveAnswer);
router.post('/:id/submit', authorize('candidate'), submitAttempt);
router.post('/:id/violation', authorize('candidate'), validate(violationSchema), logViolation);
router.get('/:id/result', getResult);

export default router;
