import { query } from '../config/db.js';

let isTableInitialized = false;

/**
 * Initializes the test_ai_reports table in Neon PostgreSQL if it does not already exist.
 */
export async function initAICacheTable() {
  if (isTableInitialized) return;
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS test_ai_reports (
        id SERIAL PRIMARY KEY,
        student_id INT NOT NULL,
        test_id INT NOT NULL,
        attempt_id INT,
        ai_response JSONB NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        CONSTRAINT unique_student_test_ai UNIQUE (student_id, test_id)
      );
    `);
    isTableInitialized = true;
    console.log('[AICache] Neon DB test_ai_reports table verified/initialized.');
  } catch (err) {
    console.warn('[AICache] Table initialization notice:', err.message);
  }
}

/**
 * Retrieves existing AI analysis from Neon DB for a student's test attempt.
 * Returns null if no cached analysis exists.
 */
export async function getCachedAIReport(studentId, testId) {
  const sId = Number(studentId);
  const tId = Number(testId);
  if (!sId || isNaN(sId) || !tId || isNaN(tId)) return null;

  await initAICacheTable();

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

  await initAICacheTable();

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
