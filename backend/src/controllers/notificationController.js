import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listNotifications = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
    [req.user.id]
  );
  res.json({ notifications: result.rows });
});

export const markRead = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query(
    `UPDATE notifications SET read_at = NOW() WHERE id = $1 AND user_id = $2 RETURNING *`,
    [id, req.user.id]
  );
  if (!result.rowCount) throw ApiError.notFound('Notification not found');
  res.json({ notification: result.rows[0] });
});

export const markAllRead = asyncHandler(async (req, res) => {
  await query(
    `UPDATE notifications SET read_at = NOW() WHERE user_id = $1 AND read_at IS NULL`,
    [req.user.id]
  );
  res.json({ message: 'All marked as read' });
});

export const unreadCount = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT COUNT(*)::int AS c FROM notifications WHERE user_id = $1 AND read_at IS NULL`,
    [req.user.id]
  );
  res.json({ count: result.rows[0].c });
});
