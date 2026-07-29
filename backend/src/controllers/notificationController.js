import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const getValidUserId = (user) => {
  if (!user?.id) return null;
  const num = Number(user.id);
  if (isNaN(num) || typeof user.id === 'string' && (user.id.startsWith('mock') || user.id.startsWith('inst'))) {
    return null;
  }
  return num;
};

export const listNotifications = asyncHandler(async (req, res) => {
  const userId = getValidUserId(req.user);
  if (!userId) return res.json({ notifications: [] });

  const result = await query(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
    [userId]
  );
  res.json({ notifications: result.rows });
});

export const markRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = getValidUserId(req.user);
  if (!userId) return res.json({ notification: { id, read_at: new Date() } });

  const result = await query(
    `UPDATE notifications SET read_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, userId]
  );
  if (!result.rowCount) throw ApiError.notFound('Notification not found');
  res.json({ notification: result.rows[0] });
});

export const markAllRead = asyncHandler(async (req, res) => {
  const userId = getValidUserId(req.user);
  if (!userId) return res.json({ message: 'All marked as read' });

  await query(
    `UPDATE notifications SET read_at = NOW() WHERE user_id = $1 AND read_at IS NULL`,
    [userId]
  );
  res.json({ message: 'All marked as read' });
});

export const unreadCount = asyncHandler(async (req, res) => {
  const userId = getValidUserId(req.user);
  if (!userId) return res.json({ count: 0 });

  const result = await query(
    `SELECT COUNT(*)::int AS c FROM notifications WHERE user_id = $1 AND read_at IS NULL`,
    [userId]
  );
  res.json({ count: result.rows[0]?.c || 0 });
});
