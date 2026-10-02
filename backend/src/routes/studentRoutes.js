import { Router } from 'express';
import { studentAnalytics } from '../controllers/studentAnalyticsController.js';
import { getPostTestAnalytics, getAIMentorReport } from '../controllers/postTestAnalyticsController.js';
import {
  getProfile, updateProfile, changePassword,
  getLeaderboard, getLeaderboardAssessments, getCertificate,
  listForumTopics, getForumTopic, createForumTopic, replyForumTopic,
  getInstituteRank, askAIDoubt, generateStudent7DayPlan, getStudent7DayPlan,
} from '../controllers/studentController.js';
import { getStudentCalendar } from '../controllers/calendarController.js';
import { authenticate, authorize } from '../middleware/auth.js';

import {
  getMistakeBook,
  syncMistakeBook,
  recreateTest,
  updateStatus,
  removeMistake,
} from '../controllers/studentMistakeBookController.js';
import {
  handleTranslateQuestion,
  handleTranslateBatch,
} from '../controllers/translationController.js';

const router = Router();

// Multilingual Question Translation Endpoints
router.post('/translate-question', authenticate, authorize('candidate', 'admin', 'institution_admin'), handleTranslateQuestion);
router.post('/translate-questions-batch', authenticate, authorize('candidate', 'admin', 'institution_admin'), handleTranslateBatch);

// Mistake Book Endpoints
router.get('/mistake-book', authenticate, authorize('candidate'), getMistakeBook);
router.post('/mistake-book/sync', authenticate, authorize('candidate'), syncMistakeBook);
router.post('/mistake-book/recreate-test', authenticate, authorize('candidate'), recreateTest);
router.patch('/mistake-book/:id/status', authenticate, authorize('candidate'), updateStatus);
router.delete('/mistake-book/:id', authenticate, authorize('candidate'), removeMistake);

router.get('/7-day-plan', authenticate, authorize('candidate'), getStudent7DayPlan);
router.post('/generate-7-day-plan', authenticate, authorize('candidate'), generateStudent7DayPlan);
router.post('/doubt-solver', authenticate, authorize('candidate', 'admin', 'institution_admin'), askAIDoubt);
router.get('/dashboard/institute-rank', authenticate, authorize('candidate'), getInstituteRank);
router.get('/calendar', authenticate, authorize('candidate'), getStudentCalendar);
router.get('/analytics/:test_id/ai-mentor-report', authenticate, authorize('candidate'), getAIMentorReport);
router.get('/analytics/:test_id', authenticate, authorize('candidate'), getPostTestAnalytics);
router.get('/analytics', authenticate, authorize('candidate'), studentAnalytics);
router.get('/profile', authenticate, authorize('candidate'), getProfile);
router.put('/profile', authenticate, authorize('candidate'), updateProfile);
router.post('/change-password', authenticate, authorize('candidate'), changePassword);
router.get('/leaderboard/assessments', authenticate, authorize('candidate'), getLeaderboardAssessments);
router.get('/leaderboard', authenticate, authorize('candidate'), getLeaderboard);
router.get('/certificates/:attemptId', authenticate, authorize('candidate'), getCertificate);
router.get('/forum', authenticate, listForumTopics);
router.get('/forum/:id', authenticate, getForumTopic);
router.post('/forum', authenticate, authorize('candidate'), createForumTopic);
router.post('/forum/:id/reply', authenticate, authorize('candidate', 'admin'), replyForumTopic);

export default router;
