import { Router } from 'express';
import {
  listNotifications,
  markRead,
  markAllRead,
  unreadCount,
  deleteNotification,
  clearAllNotifications,
} from '../controllers/notificationController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();
router.use(authenticate);

router.get('/', listNotifications);
router.get('/unread-count', unreadCount);
router.post('/read-all', markAllRead);
router.post('/:id/read', markRead);
router.delete('/clear-all', clearAllNotifications);
router.delete('/:id', deleteNotification);

export default router;
