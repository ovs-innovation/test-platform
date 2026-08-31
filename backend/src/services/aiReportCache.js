import { query } from '../config/db.js';

/**
 * Retrieves existing AI analysis from PostgreSQL for a student's test attempt.
 * Returns null if no cached analysis exists.
 */
export async function getCachedAIReport(studentId, testId) {
  const sId = Number(studentId);
  const tId = Number(testId);
  if (!sId || isNaN(sId) || !tId || isNaN(tId)) return null;

  try {
    const res = await query(
      `SELECT ai_response FROM test_ai_reports WHERE student_id = $1 AND test_id = $2 LIMIT 1`,
      [sId, tId]
    );

    if (res.rowCount > 0 && res.rows[0].ai_response) {
      const raw = res.rows[0].ai_response;
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      console.log(`[AICache] HIT: Retrieved existing AI analysis from Neon DB for student ${sId}, test ${tId}. AI call skipped.`);
      return parsed;
    }
  } catch (err) {
    console.warn('[AICache] Error fetching cached report from Neon DB:', err.message);
  }

  console.log(`[AICache] MISS: No existing AI analysis found in Neon DB for student ${sId}, test ${tId}. Will generate new analysis.`);
  return null;
}

/**
 * Persists newly generated AI analysis into Neon DB.
 */
export async function saveCachedAIReport(studentId, testId, attemptId, aiResponse) {
  const sId = Number(studentId);
  const tId = Number(testId);
  if (!sId || isNaN(sId) || !tId || isNaN(tId) || !aiResponse) return;

  try {
    const jsonStr = typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse);
    const attId = attemptId ? Number(attemptId) : null;

    await query(
      `INSERT INTO test_ai_reports (student_id, test_id, attempt_id, ai_response, created_at)
       VALUES ($1, $2, $3, $4::jsonb, NOW())
       ON CONFLICT (student_id, test_id)
       DO UPDATE SET ai_response = EXCLUDED.ai_response, created_at = NOW()`,
      [sId, tId, isNaN(attId) ? null : attId, jsonStr]
    );
    console.log(`[AICache] STORED: Saved AI analysis to Neon DB for student ${sId}, test ${tId}.`);
  } catch (err) {
    console.warn('[AICache] Error saving AI report to Neon DB:', err.message);
  }
}
