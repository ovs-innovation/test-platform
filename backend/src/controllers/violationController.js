import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { finalizeAttempt } from './attemptController.js';

/**
 * POST /api/attempts/:id/violation   body: { violation_type }
 * Logs the violation, increments the counter, and auto-submits when the
 * configured warning limit is exceeded.
 */
export const logViolation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { violation_type } = req.body;

  const result = await withTransaction(async (client) => {
    const attemptRes = await client.query('SELECT * FROM attempts WHERE id = $1 FOR UPDATE', [id]);
    const attempt = attemptRes.rows[0];
    if (!attempt) throw ApiError.notFound('Attempt not found');
    if (attempt.candidate_id !== req.user.id) throw ApiError.forbidden('This is not your attempt');
    if (attempt.status !== 'in_progress') {
      return { alreadyClosed: true, violation_count: attempt.violation_count };
    }

    await client.query(
      `INSERT INTO violations (attempt_id, candidate_id, violation_type)
       VALUES ($1,$2,$3)`,
      [id, req.user.id, violation_type]
    );

    const upd = await client.query(
      'UPDATE attempts SET violation_count = violation_count + 1 WHERE id = $1 RETURNING violation_count, assessment_id',
      [id]
    );
    const violationCount = upd.rows[0].violation_count;

    const aRes = await client.query('SELECT max_violations FROM assessments WHERE id = $1', [
      upd.rows[0].assessment_id,
    ]);
    const maxViolations = aRes.rows[0].max_violations;

    return { violation_count: violationCount, max_violations: maxViolations };
  });

  if (result.alreadyClosed) {
    return res.json({ violation_count: result.violation_count, autoSubmitted: false });
  }

  // Limit of 0 means "no limit"; otherwise auto-submit when exceeded.
  const limitReached =
    result.max_violations > 0 && result.violation_count > result.max_violations;

  if (limitReached) {
    const score = await finalizeAttempt(id, 'auto_submitted');
    return res.json({
      violation_count: result.violation_count,
      max_violations: result.max_violations,
      autoSubmitted: true,
      score,
    });
  }

  res.json({
    violation_count: result.violation_count,
    max_violations: result.max_violations,
    autoSubmitted: false,
  });
});
