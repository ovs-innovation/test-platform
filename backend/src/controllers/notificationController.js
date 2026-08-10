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

  const isAdmin = req.user?.role === 'admin' || req.user?.role === 'superadmin';
  let sql = `SELECT * FROM notifications WHERE user_id = $1`;
  if (!isAdmin) {
    sql += ` AND (type IS NULL OR type NOT IN ('b2b_demo_request', 'b2b', 'institution_admin', 'system_admin')) AND LOWER(title) NOT LIKE '%b2b%' AND LOWER(title) NOT LIKE '%institutional demo%' AND LOWER(title) NOT LIKE '%school demo%' AND LOWER(title) NOT LIKE '%institution%'`;
  }
  sql += ` ORDER BY created_at DESC LIMIT 50`;

  const result = await query(sql, [userId]);
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

  const isAdmin = req.user?.role === 'admin' || req.user?.role === 'superadmin';
  let sql = `SELECT COUNT(*)::int AS c FROM notifications WHERE user_id = $1 AND read_at IS NULL`;
  if (!isAdmin) {
    sql += ` AND (type IS NULL OR type NOT IN ('b2b_demo_request', 'b2b', 'institution_admin', 'system_admin')) AND LOWER(title) NOT LIKE '%b2b%' AND LOWER(title) NOT LIKE '%institutional demo%' AND LOWER(title) NOT LIKE '%school demo%' AND LOWER(title) NOT LIKE '%institution%'`;
  }

  const result = await query(sql, [userId]);
  res.json({ count: result.rows[0]?.c || 0 });
});

export const deleteNotification = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = getValidUserId(req.user);
  if (!userId) return res.json({ success: true, message: 'Notification removed' });

  await query(`DELETE FROM notifications WHERE id = $1 AND user_id = $2`, [id, userId]);
  res.json({ success: true, message: 'Notification removed' });
});

export const clearAllNotifications = asyncHandler(async (req, res) => {
  const userId = getValidUserId(req.user);
  if (!userId) return res.json({ success: true, message: 'All notifications cleared' });

  await query(`DELETE FROM notifications WHERE user_id = $1`, [userId]);
  res.json({ success: true, message: 'All notifications cleared' });
});
