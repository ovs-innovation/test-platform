import { query } from '../config/db.js';
import { getCache, setCache } from '../config/redis.js';

/**
 * Retrieves existing AI analysis from Redis/memory or PostgreSQL for a student's test attempt.
 * Returns null if no cached analysis exists.
 */
export async function getCachedAIReport(studentId, testId, attemptId = null) {
  const sId = Number(studentId);
  const tId = Number(testId);
  const aId = attemptId ? Number(attemptId) : null;

  if (!sId || isNaN(sId)) return null;

  // 1. High-speed Redis / in-memory cache check (< 1ms)
  try {
    if (tId && !isNaN(tId)) {
      const redisCached = await getCache(`ai_report:${sId}:test_${tId}`);
      if (redisCached) {
        console.log(`[AICache] MEMORY/REDIS HIT: Found cached report for student ${sId}, test ${tId}.`);
        return redisCached;
      }
    }
    if (aId && !isNaN(aId)) {
      const redisCachedAtt = await getCache(`ai_report:${sId}:att_${aId}`);
      if (redisCachedAtt) {
        console.log(`[AICache] MEMORY/REDIS HIT: Found cached report for student ${sId}, attempt ${aId}.`);
        return redisCachedAtt;
      }
    }
  } catch (_) {}

  // 2. Persistent PostgreSQL DB cache check
  try {
    let sql = `SELECT ai_response, attempt_id, test_id FROM test_ai_reports WHERE student_id = $1`;
    const params = [sId];

    if (tId && !isNaN(tId) && aId && !isNaN(aId)) {
      sql += ` AND (test_id = $2 OR attempt_id = $3) ORDER BY created_at DESC LIMIT 1`;
      params.push(tId, aId);
    } else if (tId && !isNaN(tId)) {
      sql += ` AND test_id = $2 ORDER BY created_at DESC LIMIT 1`;
      params.push(tId);
    } else if (aId && !isNaN(aId)) {
      sql += ` AND attempt_id = $2 ORDER BY created_at DESC LIMIT 1`;
      params.push(aId);
    } else {
      return null;
    }

    const res = await query(sql, params);

    if (res.rowCount > 0 && res.rows[0].ai_response) {
      const raw = res.rows[0].ai_response;
      const strVal = typeof raw === 'string' ? raw : JSON.stringify(raw);
      if (strVal.includes("Resistor Networks & Ohm's Law")) {
        console.log(`[AICache] INVALIDATING outdated report for student ${sId}, test ${tId || aId}.`);
        return null;
      }
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      console.log(`[AICache] POSTGRES HIT: Retrieved existing AI analysis for student ${sId}.`);

      // Populate Redis / in-memory cache for subsequent instant access (TTL: 30 days)
      const foundTestId = res.rows[0].test_id || tId;
      const foundAttId = res.rows[0].attempt_id || aId;
      if (foundTestId) await setCache(`ai_report:${sId}:test_${foundTestId}`, parsed, 30 * 86400);
      if (foundAttId) await setCache(`ai_report:${sId}:att_${foundAttId}`, parsed, 30 * 86400);

      return parsed;
    }
  } catch (err) {
    console.warn('[AICache] Error fetching cached report from DB:', err.message);
  }

  console.log(`[AICache] MISS: No existing AI analysis found for student ${sId}, test: ${tId}, attempt: ${aId}.`);
  return null;
}

/**
 * Persists newly generated AI analysis into PostgreSQL and Redis/memory cache.
 */
export async function saveCachedAIReport(studentId, testId, attemptId, aiResponse) {
  const sId = Number(studentId);
  const tId = Number(testId);
  const aId = attemptId ? Number(attemptId) : null;
  if (!sId || isNaN(sId) || !aiResponse) return;

  const validTestId = tId && !isNaN(tId) ? tId : (aId && !isNaN(aId) ? aId : 0);
  if (!validTestId) return;

  // 1. Save to Redis / in-memory cache
  try {
    await setCache(`ai_report:${sId}:test_${validTestId}`, aiResponse, 30 * 86400);
    if (aId && !isNaN(aId)) {
      await setCache(`ai_report:${sId}:att_${aId}`, aiResponse, 30 * 86400);
    }
    const planData = aiResponse?.seven_day_plan_data || (Array.isArray(aiResponse?.daily_plan) ? aiResponse : null);
    if (planData) {
      await setCache(`7day_plan:${sId}:test_${validTestId}`, planData, 30 * 86400);
      if (aId && !isNaN(aId)) {
        await setCache(`7day_plan:${sId}:att_${aId}`, planData, 30 * 86400);
      }
    }
  } catch (err) {
    console.warn('[AICache] Error saving to Redis cache:', err.message);
  }

  // 2. Save to PostgreSQL test_ai_reports table (with atomic UPSERT)
  try {
    const jsonStr = typeof aiResponse === 'string' ? aiResponse : JSON.stringify(aiResponse);

    await query(
      `INSERT INTO test_ai_reports (student_id, test_id, attempt_id, ai_response, created_at)
       VALUES ($1, $2, $3, $4::jsonb, NOW())
       ON CONFLICT (student_id, test_id)
       DO UPDATE SET 
         ai_response = EXCLUDED.ai_response,
         attempt_id = COALESCE(EXCLUDED.attempt_id, test_ai_reports.attempt_id),
         created_at = NOW()`,
      [sId, validTestId, isNaN(aId) ? null : aId, jsonStr]
    );
    console.log(`[AICache] STORED: Saved AI analysis to DB & Cache for student ${sId}, test ${validTestId}.`);
  } catch (err) {
    console.warn('[AICache] Error saving AI report to DB:', err.message);
  }
}
