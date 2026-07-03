import { Router } from 'express';
import { studentAnalytics } from '../controllers/studentAnalyticsController.js';
import {
  getProfile, updateProfile, changePassword,
  getLeaderboard, getLeaderboardAssessments, getCertificate,
  listForumTopics, getForumTopic, createForumTopic, replyForumTopic,
} from '../controllers/studentController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

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
