import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { sendInviteEmail } from '../utils/email.js';
import { env } from '../config/env.js';

/**
 * GET /api/invites/:token  (public)
 */
export const getInvite = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const result = await query(
    `
    SELECT ci.id, ci.candidate_name, ci.candidate_email, ci.status, ci.invited_at, ci.expires_at,
           COALESCE(a.id, t.id) AS assessment_id,
           COALESCE(a.title, t.test_name, t.title) AS title,
           COALESCE(a.description, t.syllabus, 'Proctored NEET / JEE CBT format diagnostic mock exam.') AS description,
           COALESCE(a.duration_minutes, t.duration_minutes, 180) AS duration_minutes,
           COALESCE(a.instructions, 'Standard examination instructions apply.') AS instructions,
           COALESCE(a.max_violations, 5) AS max_violations,
           COALESCE(a.is_published, t.is_published, true) AS is_published
    FROM candidate_invites ci
    LEFT JOIN assessments a ON a.id = ci.assessment_id
    LEFT JOIN tests t ON t.id = ci.assessment_id
    WHERE ci.token = $1
    `,
    [token]
  );
  if (result.rowCount === 0) throw ApiError.notFound('Invitation not found');

  const invite = result.rows[0];
  if (invite.expires_at && new Date(invite.expires_at) < new Date()) {
    await query(`UPDATE candidate_invites SET status = 'expired' WHERE token = $1 AND status <> 'completed'`, [token]);
    throw ApiError.conflict('This invitation has expired');
  }
  if (invite.status === 'completed') {
    throw ApiError.conflict('This assessment has already been completed');
  }

  res.json({
    invite: {
      token,
      candidate_name: invite.candidate_name,
      candidate_email: invite.candidate_email,
      status: invite.status,
      assessment: {
        id: invite.assessment_id,
        title: invite.title,
        description: invite.description,
        duration_minutes: invite.duration_minutes,
        instructions: invite.instructions,
        max_violations: invite.max_violations,
      },
    },
  });
});

const resetCandidateAttemptForAssessment = async (assessmentId, candidateEmail, inviteId = null) => {
  const userRes = await query('SELECT id FROM users WHERE LOWER(email) = $1', [candidateEmail.toLowerCase()]);
  const candidateUserId = userRes.rows[0]?.id || null;
  if (candidateUserId) {
    await query('DELETE FROM attempts WHERE assessment_id = $1 AND candidate_id = $2', [assessmentId, candidateUserId]);
    await query('DELETE FROM test_attempts WHERE test_id = $1 AND student_id = $2', [assessmentId, candidateUserId]);
  }
  if (inviteId) {
    await query('DELETE FROM attempts WHERE invite_id = $1', [inviteId]);
  }
};

/**
 * POST /api/admin/invites
 */
export const createInvite = asyncHandler(async (req, res) => {
  const { assessment_id, candidate_name, candidate_email, allow_retake } = req.body;

  const aRes = await query(
    `SELECT id, title, duration_minutes, is_published FROM assessments WHERE id = $1
     UNION ALL
     SELECT id, COALESCE(test_name, title) AS title, duration_minutes, is_published FROM tests WHERE id = $1
     LIMIT 1`,
    [assessment_id]
  );
  if (aRes.rowCount === 0) throw ApiError.notFound('Assessment not found');

  const qCount = await query(
    `SELECT COUNT(*)::int AS c FROM questions WHERE assessment_id = $1`,
    [assessment_id]
  );
  if (qCount.rows[0].c === 0) {
    throw ApiError.badRequest('Assessment must have at least one question before inviting candidates');
  }

  const existing = await query(
    'SELECT id, status, token FROM candidate_invites WHERE assessment_id = $1 AND LOWER(candidate_email) = $2',
    [assessment_id, candidate_email.toLowerCase()]
  );

  const assessment = aRes.rows[0];
  const requestOrigin = req.get('origin') || req.get('referer');
  let baseUrl = env.inviteBaseUrl;
  if (requestOrigin) {
    try { baseUrl = new URL(requestOrigin).origin; } catch (_) {}
  }
  const inviteUrlFor = (token) => `${baseUrl}/invite/${token}`;

  const sendInvite = async (invite) => {
    try {
      await sendInviteEmail(
        invite.candidate_email,
        invite.candidate_name,
        assessment.title,
        inviteUrlFor(invite.token),
        assessment.duration_minutes
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[email] Invite email failed:', err.message);
    }
  };

  if (existing.rowCount > 0) {
    const row = existing.rows[0];
    if (row.status === 'completed' || allow_retake) {
      if (row.status === 'completed' && !allow_retake) {
        throw ApiError.conflict('This candidate has already completed this assessment. Enable "Allow Retake" to reset their attempt and allow them to take it again.');
      }

      await resetCandidateAttemptForAssessment(assessment_id, candidate_email, row.id);

      const updated = await query(
        `UPDATE candidate_invites
         SET candidate_name = $1,
             status = 'pending',
             completed_at = NULL,
             accessed_at = NULL,
             invited_at = NOW()
         WHERE id = $2
         RETURNING *`,
        [candidate_name, row.id]
      );
      const invite = updated.rows[0];
      await sendInvite(invite);

      return res.json({
        invite: { ...invite, invite_url: inviteUrlFor(invite.token) },
        resent: true,
        retake_granted: true,
        message: 'Previous attempt has been reset and invitation resent for retake.',
      });
    }

    const updated = await query(
      `UPDATE candidate_invites
       SET candidate_name = $1,
           status = CASE WHEN status = 'expired' THEN 'pending' ELSE status END,
           invited_at = NOW()
       WHERE id = $2
       RETURNING *`,
      [candidate_name, row.id]
    );
    const invite = updated.rows[0];
    await sendInvite(invite);

    return res.json({
      invite: { ...invite, invite_url: inviteUrlFor(invite.token) },
      resent: true,
      message: 'Invitation resent to this candidate',
    });
  }

  // Also check if candidate has an existing completed attempt even without prior candidate_invites
  const userRes = await query('SELECT id FROM users WHERE LOWER(email) = $1', [candidate_email.toLowerCase()]);
  const candidateUserId = userRes.rows[0]?.id;
  if (candidateUserId) {
    const prevAttempt = await query(
      `SELECT id, status::text FROM attempts WHERE assessment_id = $1 AND candidate_id = $2
       UNION ALL
       SELECT id, (CASE WHEN submitted_at IS NOT NULL THEN 'completed' ELSE 'in_progress' END)::text AS status FROM test_attempts WHERE test_id = $1 AND student_id = $2
       LIMIT 1`,
      [assessment_id, candidateUserId]
    );
    if (prevAttempt.rowCount > 0 && prevAttempt.rows[0].status !== 'in_progress') {
      if (!allow_retake) {
        throw ApiError.conflict('This candidate has already completed this assessment. Enable "Allow Retake" to reset their attempt and allow them to take it again.');
      }
      await resetCandidateAttemptForAssessment(assessment_id, candidate_email);
    } else if (allow_retake && prevAttempt.rowCount > 0) {
      await resetCandidateAttemptForAssessment(assessment_id, candidate_email);
    }
  }

  const result = await query(
    `INSERT INTO candidate_invites (assessment_id, candidate_name, candidate_email, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [assessment_id, candidate_name, candidate_email.toLowerCase(), req.user?.id || null]
  );
  const invite = result.rows[0];

  await sendInvite(invite);

  res.status(201).json({ invite: { ...invite, invite_url: inviteUrlFor(invite.token) } });
});

/**
 * GET /api/admin/invites
 */
export const listInvites = asyncHandler(async (req, res) => {
  const { assessment_id } = req.query;
  const params = [];
  let where = '';
  if (assessment_id) {
    where = 'WHERE ci.assessment_id = $1';
    params.push(Number(assessment_id));
  }

  const result = await query(
    `
    SELECT ci.*, COALESCE(a.title, t.test_name, t.title) AS assessment_title,
           at.id AS attempt_id, at.status AS attempt_status,
           s.percentage, s.passed
    FROM candidate_invites ci
    LEFT JOIN assessments a ON a.id = ci.assessment_id
    LEFT JOIN tests t ON t.id = ci.assessment_id
    LEFT JOIN attempts at ON at.invite_id = ci.id
    LEFT JOIN scores s ON s.attempt_id = at.id
    ${where}
    ORDER BY ci.invited_at DESC
    `,
    params
  );
  res.json({ invites: result.rows });
});

/**
 * POST /api/admin/invites/:id/resend
 */
export const resendInvite = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query(
    `SELECT ci.*, COALESCE(a.title, t.test_name, t.title) AS assessment_title, COALESCE(a.duration_minutes, t.duration_minutes, 180) AS duration_minutes
     FROM candidate_invites ci
     LEFT JOIN assessments a ON a.id = ci.assessment_id
     LEFT JOIN tests t ON t.id = ci.assessment_id
     WHERE ci.id = $1`,
    [id]
  );
  if (result.rowCount === 0) throw ApiError.notFound('Invite not found');
  const invite = result.rows[0];
  if (invite.status === 'completed') {
    throw ApiError.conflict('Assessment already completed');
  }

  const requestOrigin = req.get('origin') || req.get('referer');
  let baseUrl = env.inviteBaseUrl;
  if (requestOrigin) {
    try { baseUrl = new URL(requestOrigin).origin; } catch (_) {}
  }
  const inviteUrl = `${baseUrl}/invite/${invite.token}`;
  try {
    await sendInviteEmail(
      invite.candidate_email,
      invite.candidate_name,
      invite.assessment_title,
      inviteUrl,
      invite.duration_minutes
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[email] Resend failed:', err.message);
  }
  res.json({ message: 'Invitation resent', invite_url: inviteUrl });
});

/**
 * POST /api/admin/invites/:id/grant-retake
 */
export const grantRetake = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query(
    `SELECT ci.*, COALESCE(a.title, t.test_name, t.title) AS assessment_title, COALESCE(a.duration_minutes, t.duration_minutes, 180) AS duration_minutes
     FROM candidate_invites ci
     LEFT JOIN assessments a ON a.id = ci.assessment_id
     LEFT JOIN tests t ON t.id = ci.assessment_id
     WHERE ci.id = $1`,
    [id]
  );
  if (result.rowCount === 0) throw ApiError.notFound('Invite not found');
  const invite = result.rows[0];

  await resetCandidateAttemptForAssessment(invite.assessment_id, invite.candidate_email, invite.id);

  const updated = await query(
    `UPDATE candidate_invites
     SET status = 'pending',
         completed_at = NULL,
         accessed_at = NULL,
         invited_at = NOW()
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  const updatedInvite = updated.rows[0];

  const requestOrigin = req.get('origin') || req.get('referer');
  let baseUrl = env.inviteBaseUrl;
  if (requestOrigin) {
    try { baseUrl = new URL(requestOrigin).origin; } catch (_) {}
  }
  const inviteUrl = `${baseUrl}/invite/${updatedInvite.token}`;
  try {
    await sendInviteEmail(
      updatedInvite.candidate_email,
      updatedInvite.candidate_name,
      invite.assessment_title,
      inviteUrl,
      invite.duration_minutes
    );
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[email] Retake email failed:', err.message);
  }

  res.json({
    message: 'Retake granted. Previous attempt has been reset and invitation resent.',
    invite: { ...updatedInvite, invite_url: inviteUrl },
  });
});
