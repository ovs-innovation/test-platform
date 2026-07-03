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
           a.id AS assessment_id, a.title, a.description, a.duration_minutes, a.instructions,
           a.max_violations, a.is_published
    FROM candidate_invites ci
    JOIN assessments a ON a.id = ci.assessment_id
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

/**
 * POST /api/admin/invites
 */
export const createInvite = asyncHandler(async (req, res) => {
  const { assessment_id, candidate_name, candidate_email } = req.body;

  const aRes = await query('SELECT id, title, duration_minutes, is_published FROM assessments WHERE id = $1', [assessment_id]);
  if (aRes.rowCount === 0) throw ApiError.notFound('Assessment not found');

  const qCount = await query('SELECT COUNT(*)::int AS c FROM questions WHERE assessment_id = $1', [assessment_id]);
  if (qCount.rows[0].c === 0) {
    throw ApiError.badRequest('Assessment must have at least one question before inviting candidates');
  }

  const existing = await query(
    'SELECT id, status, token FROM candidate_invites WHERE assessment_id = $1 AND candidate_email = $2',
    [assessment_id, candidate_email.toLowerCase()]
  );

  const assessment = aRes.rows[0];
  const inviteUrlFor = (token) => `${env.inviteBaseUrl}/invite/${token}`;

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
      if (env.isProd) throw err;
      // eslint-disable-next-line no-console
      console.warn('[email] Invite email failed (SMTP not configured):', err.message);
    }
  };

  if (existing.rowCount > 0) {
    const row = existing.rows[0];
    if (row.status === 'completed') {
      throw ApiError.conflict('This candidate has already completed this assessment');
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

  const result = await query(
    `INSERT INTO candidate_invites (assessment_id, candidate_name, candidate_email, created_by)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [assessment_id, candidate_name, candidate_email.toLowerCase(), req.user.id]
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
    SELECT ci.*, a.title AS assessment_title,
           at.id AS attempt_id, at.status AS attempt_status,
           s.percentage, s.passed
    FROM candidate_invites ci
    JOIN assessments a ON a.id = ci.assessment_id
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
    `SELECT ci.*, a.title AS assessment_title, a.duration_minutes
     FROM candidate_invites ci
     JOIN assessments a ON a.id = ci.assessment_id
     WHERE ci.id = $1`,
    [id]
  );
  if (result.rowCount === 0) throw ApiError.notFound('Invite not found');
  const invite = result.rows[0];
  if (invite.status === 'completed') {
    throw ApiError.conflict('Assessment already completed');
  }

  const inviteUrl = `${env.inviteBaseUrl}/invite/${invite.token}`;
  try {
    await sendInviteEmail(
      invite.candidate_email,
      invite.candidate_name,
      invite.assessment_title,
      inviteUrl,
      invite.duration_minutes
    );
  } catch (err) {
    if (env.isProd) throw err;
    // eslint-disable-next-line no-console
    console.warn('[email] Resend failed (SMTP not configured):', err.message);
  }
  res.json({ message: 'Invitation resent', invite_url: inviteUrl });
});
