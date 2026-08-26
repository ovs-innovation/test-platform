import { Router } from 'express';
import { authenticate } from '../middleware/auth.js';
import {
  generateAiWeakTopicTest,
  getScheduledTests,
  startTest,
  submitTest,
} from '../controllers/aiTestController.js';

const router = Router();

// Allow optional/authenticated calls for generating, viewing scheduled tests, starting, and submitting
router.post('/generate-ai-weak-topic-test', authenticate, generateAiWeakTopicTest);
router.get('/scheduled/:studentId', authenticate, getScheduledTests);
router.post('/:testId/start', authenticate, startTest);
router.post('/:testId/submit', authenticate, submitTest);

export default router;
