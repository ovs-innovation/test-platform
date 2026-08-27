import cron from 'node-cron';
import { query } from '../config/db.js';

/**
 * notifyStudent (stub/implementation)
 * Delivers in-app notification when an AI booster test becomes unlocked & available.
 */
export async function notifyStudent(studentId, message) {
  const numId = Number(studentId);
  if (!numId || isNaN(numId)) return;

  try {
    await query(
      `INSERT INTO notifications (user_id, title, body, type, created_at)
       VALUES ($1, $2, $3, $4, NOW())`,
      [
        numId,
        '⚡ Weak Topic Improvement Test Unlocked!',
        message,
        'ai_booster_unlocked',
      ]
    );
    console.log(`🔔 [notifyStudent] Delivered notification to student #${numId}: "${message}"`);
  } catch (err) {
    console.error(`❌ [notifyStudent] Error notifying student #${numId}:`, err.message);
  }
}

/**
 * processScheduledTestsCheck
 * 1. Checks tests where status === 'scheduled' && unlock_at <= NOW() -> flips to 'available' & triggers notifyStudent.
 * 2. Checks tests where status === 'available' && expires_at <= NOW() && not completed -> flips to 'expired'.
 */
export async function processScheduledTestsCheck() {
  try {
    console.log('⏰ [Cron Scheduler] Running 15-minute check for scheduled/available AI booster tests...');

    // 1. Flip 'scheduled' -> 'available'
    const unlockResult = await query(
      `SELECT t.id, t.test_name, t.unlock_at, tas.assigned_to_id AS student_id
       FROM tests t
       LEFT JOIN test_assignments tas ON tas.test_id = t.id
       WHERE t.type = 'ai_weak_topic'
         AND t.status = 'scheduled'
         AND t.unlock_at <= NOW()
         AND (t.is_deleted IS NOT TRUE OR t.is_deleted IS NULL)`
    );

    for (const test of unlockResult.rows) {
      await query(`UPDATE tests SET status = 'available' WHERE id = $1`, [test.id]);
      console.log(`✅ [Cron Scheduler] Test #${test.id} ("${test.test_name}") flipped to AVAILABLE.`);

      if (test.student_id) {
        await notifyStudent(
          test.student_id,
          `Your personalized weak topic test "${test.test_name}" is now unlocked! Log in to take the test and measure your score improvement.`
        );
      }
    }

    // 2. Flip 'available' -> 'expired'
    const expireResult = await query(
      `SELECT t.id, t.test_name
       FROM tests t
       LEFT JOIN test_attempts ta ON ta.test_id = t.id
       WHERE t.type = 'ai_weak_topic'
         AND t.status = 'available'
         AND t.expires_at <= NOW()
         AND (ta.submitted_at IS NULL)
         AND (t.is_deleted IS NOT TRUE OR t.is_deleted IS NULL)`
    );

    for (const test of expireResult.rows) {
      await query(`UPDATE tests SET status = 'expired' WHERE id = $1`, [test.id]);
      console.log(`⚠️ [Cron Scheduler] Test #${test.id} ("${test.test_name}") flipped to EXPIRED.`);
    }

  } catch (err) {
    console.error('❌ [Cron Scheduler] Error during scheduled check:', err.message);
  }
}

/**
 * initScheduler
 * Registers the node-cron scheduled task to run every 15 minutes ('* /15 * * * *').
 */
export function initScheduler() {
  // Cron schedule: every 15 minutes
  cron.schedule('*/15 * * * *', async () => {
    await processScheduledTestsCheck();
  });

  // Run initial check asynchronously on server startup
  processScheduledTestsCheck();
  console.log('🚀 [Cron Scheduler] Node-cron initialized (interval: every 15 minutes).');
}
