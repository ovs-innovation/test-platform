import { query } from '../config/db.js';

/**
 * Creates an admin notification for all active admin users in the system.
 */
export async function createAdminNotification({ title, body, type = 'system' }) {
  try {
    const admins = await query("SELECT id FROM users WHERE role = 'admin'");
    for (const admin of admins.rows) {
      await query(
        `INSERT INTO notifications (user_id, title, body, type, created_at)
         VALUES ($1, $2, $3, $4, NOW())`,
        [admin.id, title, body, type]
      );
    }
  } catch (err) {
    console.error('[Notification] Error creating admin notification:', err.message);
  }
}
