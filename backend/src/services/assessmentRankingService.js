import { query } from '../config/db.js';

/**
 * Internal threshold for unlocking official assessment rank & percentile.
 * MUST NOT be leaked to the frontend or students.
 */
export const PARTICIPANT_THRESHOLD = 50;

/**
 * Determine if an assessment or test window is closed for submissions.
 * @param {number|string} assessmentId
 * @returns {Promise<boolean>}
 */
export async function isAssessmentClosed(assessmentId) {
  const numId = Number(assessmentId);
  if (!numId || isNaN(numId) || numId <= 0) return false;

  try {
    const now = new Date();
    const [aRes, tRes] = await Promise.all([
      query(
        'SELECT id, available_until, end_time, result_published_at, is_published FROM assessments WHERE id = $1',
        [numId]
      ),
      query(
        'SELECT id, available_until, expires_at, result_publish_time, status FROM tests WHERE id = $1',
        [numId]
      ).catch(() => ({ rows: [] })),
    ]);

    const a = aRes.rows[0];
    const t = tRes.rows[0];

    // Check assessment table dates
    if (a?.available_until && new Date(a.available_until) <= now) return true;
    if (a?.end_time && new Date(a.end_time) <= now) return true;
    if (a?.result_published_at && new Date(a.result_published_at) <= now) return true;

    // Check tests table dates & status
    if (t) {
      if (t.status === 'completed' || t.status === 'expired') return true;
      if (t.available_until && new Date(t.available_until) <= now) return true;
      if (t.expires_at && new Date(t.expires_at) <= now) return true;
      if (t.result_publish_time && new Date(t.result_publish_time) <= now) return true;
    }

    return false;
  } catch (err) {
    console.error('[AssessmentRankingService] isAssessmentClosed check failed:', err.message);
    return false;
  }
}

/**
 * Calculate dynamic participant count, ranking availability, competition rank,
 * percentile, and ranking status for a given assessment and student.
 *
 * Rules:
 * 1. Count unique students who completed & received a score for the SAME test.
 * 2. Count each student's FIRST valid attempt only (reattempts excluded).
 * 3. 50-participant threshold enforced strictly on the backend.
 * 4. Rank = 1 + number of eligible students with strictly higher score.
 * 5. Percentile = 100 * (number of eligible students with score <= candidate score) / total eligible participants.
 * 6. Equal scores receive the same rank and percentile.
 * 7. Statuses:
 *    - < 50 & open: 'pending' (rank/percentile = null)
 *    - < 50 & closed: 'unavailable' (rank/percentile = null)
 *    - >= 50 & open: 'provisional' (rank/percentile calculated)
 *    - >= 50 & closed: 'final' (rank/percentile calculated)
 *
 * @param {number|string} assessmentId
 * @param {number|string|null} candidateId
 * @returns {Promise<object>}
 */
export async function getAssessmentRankingData(assessmentId, candidateId = null) {
  const numAssessmentId = Number(assessmentId);
  if (!numAssessmentId || isNaN(numAssessmentId) || numAssessmentId <= 0) {
    return {
      total_participants: 0,
      totalParticipants: 0,
      ranking_available: false,
      rankingAvailable: false,
      ranking_status: 'pending',
      rankingStatus: 'pending',
      rank: null,
      percentile: null,
      student_score: null,
    };
  }

  const numCandidateId = candidateId ? Number(candidateId) : null;

  try {
    const isClosed = await isAssessmentClosed(numAssessmentId);

    // Fetch all eligible first valid attempts for this assessment
    const eligibleQuery = `
      WITH ranked_valid_attempts AS (
        SELECT 
          a.id AS attempt_id,
          a.candidate_id,
          s.marks_obtained,
          a.submitted_at,
          ROW_NUMBER() OVER (
            PARTITION BY a.candidate_id 
            ORDER BY a.submitted_at ASC, a.id ASC
          ) AS attempt_seq
        FROM attempts a
        JOIN scores s ON s.attempt_id = a.id
        WHERE a.assessment_id = $1
          AND a.status IN ('submitted', 'auto_submitted')
          AND a.submitted_at IS NOT NULL
          AND s.marks_obtained IS NOT NULL
      ),
      eligible_participants AS (
        SELECT 
          attempt_id,
          candidate_id,
          marks_obtained,
          submitted_at
        FROM ranked_valid_attempts
        WHERE attempt_seq = 1
      )
      SELECT 
        attempt_id,
        candidate_id,
        marks_obtained
      FROM eligible_participants
      ORDER BY marks_obtained DESC;
    `;

    const result = await query(eligibleQuery, [numAssessmentId]);
    const eligibleRows = result.rows || [];
    const totalParticipants = eligibleRows.length;
    const thresholdMet = totalParticipants >= PARTICIPANT_THRESHOLD;

    // Determine ranking status
    let rankingStatus = 'pending';
    if (thresholdMet) {
      rankingStatus = isClosed ? 'final' : 'provisional';
    } else {
      rankingStatus = isClosed ? 'unavailable' : 'pending';
    }

    // Find candidate's official first valid attempt
    const candidateRow = numCandidateId
      ? eligibleRows.find((r) => Number(r.candidate_id) === numCandidateId)
      : null;

    let rank = null;
    let percentile = null;
    let studentScore = null;

    if (candidateRow) {
      studentScore = Number(candidateRow.marks_obtained);

      if (thresholdMet && totalParticipants > 0) {
        // Rank = 1 + number of eligible students with strictly higher score
        const strictlyHigher = eligibleRows.filter(
          (r) => Number(r.marks_obtained) > studentScore
        ).length;
        rank = 1 + strictlyHigher;

        // Percentile = 100 * (number of eligible students with score <= candidate score) / totalParticipants
        const equalOrBelow = eligibleRows.filter(
          (r) => Number(r.marks_obtained) <= studentScore
        ).length;
        percentile = Number(((equalOrBelow / totalParticipants) * 100).toFixed(2));
      }
    }

    return {
      total_participants: totalParticipants,
      totalParticipants,
      ranking_available: thresholdMet,
      rankingAvailable: thresholdMet,
      ranking_status: rankingStatus,
      rankingStatus,
      rank,
      percentile,
      student_score: studentScore,
    };
  } catch (err) {
    console.error('[AssessmentRankingService] Failed to calculate rankings:', err);
    return {
      total_participants: 0,
      totalParticipants: 0,
      ranking_available: false,
      rankingAvailable: false,
      ranking_status: 'pending',
      rankingStatus: 'pending',
      rank: null,
      percentile: null,
      student_score: null,
    };
  }
}

/**
 * Recompute and persist rank and percentile in the `scores` table
 * for all eligible attempts of an assessment.
 * @param {number|string} assessmentId
 */
export async function syncAssessmentRankings(assessmentId) {
  const numId = Number(assessmentId);
  if (!numId || isNaN(numId) || numId <= 0) return null;

  try {
    const updateQuery = `
      WITH ranked_valid_attempts AS (
        SELECT 
          a.id AS attempt_id,
          a.candidate_id,
          s.marks_obtained,
          ROW_NUMBER() OVER (
            PARTITION BY a.candidate_id 
            ORDER BY a.submitted_at ASC, a.id ASC
          ) AS attempt_seq
        FROM attempts a
        JOIN scores s ON s.attempt_id = a.id
        WHERE a.assessment_id = $1
          AND a.status IN ('submitted', 'auto_submitted')
          AND a.submitted_at IS NOT NULL
          AND s.marks_obtained IS NOT NULL
      ),
      eligible_participants AS (
        SELECT attempt_id, candidate_id, marks_obtained
        FROM ranked_valid_attempts
        WHERE attempt_seq = 1
      ),
      cohort_count AS (
        SELECT COUNT(*)::int AS total
        FROM eligible_participants
      ),
      calculated AS (
        SELECT 
          ep.attempt_id,
          CASE 
            WHEN cc.total < 50 THEN NULL
            ELSE (
              1 + (
                SELECT COUNT(*)::int 
                FROM eligible_participants ep2 
                WHERE ep2.marks_obtained > ep.marks_obtained
              )
            )
          END AS rk,
          CASE 
            WHEN cc.total < 50 THEN NULL
            ELSE ROUND(
              (
                (
                  SELECT COUNT(*)::numeric 
                  FROM eligible_participants ep3 
                  WHERE ep3.marks_obtained <= ep.marks_obtained
                ) / cc.total
              ) * 100, 
              2
            )
          END AS pct
        FROM eligible_participants ep
        CROSS JOIN cohort_count cc
      )
      UPDATE scores 
      SET rank = calculated.rk, percentile = calculated.pct
      FROM calculated 
      WHERE scores.attempt_id = calculated.attempt_id;
    `;

    await query(updateQuery, [numId]);
  } catch (err) {
    console.error(`[AssessmentRankingService] syncAssessmentRankings failed for assessment ${assessmentId}:`, err);
  }
}
