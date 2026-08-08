import { Router } from 'express';
import { studentAnalytics } from '../controllers/studentAnalyticsController.js';
import { getPostTestAnalytics, getAIMentorReport } from '../controllers/postTestAnalyticsController.js';
import {
  getProfile, updateProfile, changePassword,
  getLeaderboard, getLeaderboardAssessments, getCertificate,
  listForumTopics, getForumTopic, createForumTopic, replyForumTopic,
  getInstituteRank, askAIDoubt,
} from '../controllers/studentController.js';
import { getStudentCalendar } from '../controllers/calendarController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.post('/doubt-solver', authenticate, authorize('candidate'), askAIDoubt);
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
router.post('/forum/:id/reply', authenticate, authorize('candidate'), replyForumTopic);

export default router;
