import { query, withTransaction } from '../config/db.js';
import crypto from 'crypto';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { comparePassword, hashPassword } from '../utils/password.js';
import { signToken } from '../utils/token.js';
import { generateOtp, hashOtp, verifyOtp } from '../utils/otp.js';
import { sendOtpEmail, sendEmail } from '../utils/email.js';
import { env } from '../config/env.js';

const publicUser = (u) => ({ id: u.id, name: u.name, email: u.email, role: u.role });

const issueToken = (user, extra = {}) =>
  signToken({ sub: user.id, role: user.role, email: user.email, name: user.name, ...extra });

/**
 * POST /api/auth/login  (admin only — password)
 */
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const result = await query(
    'SELECT id, name, email, role, password_hash FROM users WHERE email = $1',
    [email]
  );
  const user = result.rows[0];

  if (!user || user.role !== 'admin') {
    throw ApiError.unauthorized('Invalid email or password');
  }

  if (!user.password_hash) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  const ok = await comparePassword(password, user.password_hash);
  if (!ok) {
    throw ApiError.unauthorized('Invalid email or password');
  }

  res.json({ token: issueToken(user), user: publicUser(user) });
});

/**
 * POST /api/auth/register  (student)
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rowCount) throw ApiError.conflict('An account with this email already exists');

  const password_hash = await hashPassword(password);
  const result = await query(
    `INSERT INTO users (name, email, password_hash, role) VALUES ($1,$2,$3,'candidate') RETURNING id, name, email, role`,
    [name, email, password_hash]
  );
  const user = result.rows[0];

  await query(
    `INSERT INTO notifications (user_id, title, body, type) VALUES ($1,$2,$3,'welcome')`,
    [user.id, 'Welcome to AssessPro CBT', 'Explore test series and start your preparation journey.']
  );

  res.status(201).json({ token: issueToken(user), user: publicUser(user) });
});

/**
 * POST /api/auth/student-login
 */
export const studentLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await query(
    'SELECT id, name, email, role, password_hash FROM users WHERE email = $1 AND role = $2',
    [email, 'candidate']
  );
  const user = result.rows[0];
  if (!user?.password_hash) throw ApiError.unauthorized('Invalid email or password');
  const ok = await comparePassword(password, user.password_hash);
  if (!ok) throw ApiError.unauthorized('Invalid email or password');
  res.json({ token: issueToken(user), user: publicUser(user) });
});

/**
 * POST /api/auth/otp/send
 */
export const sendOtp = asyncHandler(async (req, res) => {
  const { email, invite_token } = req.body;
  const normalizedEmail = email.toLowerCase();

  const inviteRes = await query(
    `SELECT ci.*, a.title AS assessment_title
     FROM candidate_invites ci
     JOIN assessments a ON a.id = ci.assessment_id
     WHERE ci.token = $1`,
    [invite_token]
  );
  const invite = inviteRes.rows[0];
  if (!invite) throw ApiError.notFound('Invalid invitation link');
  if (invite.candidate_email.toLowerCase() !== normalizedEmail) {
    throw ApiError.forbidden('This invitation was sent to a different email address');
  }
  if (invite.status === 'completed') {
    throw ApiError.conflict('This assessment has already been completed');
  }
  if (invite.status === 'expired') {
    throw ApiError.conflict('This invitation has expired');
  }

  const recentRes = await query(
    `SELECT COUNT(*)::int AS c FROM otp_verifications
     WHERE email = $1 AND invite_token = $2
       AND created_at > NOW() - ($3 || ' minutes')::interval`,
    [normalizedEmail, invite_token, env.otpResendWindowMinutes]
  );
  if (recentRes.rows[0].c >= env.otpResendLimit) {
    throw ApiError.tooManyRequests(
      `Too many OTP requests. Wait ${env.otpResendWindowMinutes} minutes before requesting again.`
    );
  }

  const otp = generateOtp();
  const otpHash = await hashOtp(otp);
  const expiresAt = new Date(Date.now() + env.otpExpiresMinutes * 60 * 1000);

  await query(
    `INSERT INTO otp_verifications (email, otp_hash, invite_token, purpose, expires_at)
     VALUES ($1, $2, $3, 'assessment_access', $4)`,
    [normalizedEmail, otpHash, invite_token, expiresAt]
  );

  let emailSent = true;
  try {
    await sendOtpEmail(normalizedEmail, otp);
  } catch (err) {
    emailSent = false;
    if (env.isProd) throw err;
    // eslint-disable-next-line no-console
    console.warn(`[email] OTP send failed, dev fallback: ${err.message}`);
  }

  res.json({
    message: emailSent
      ? 'Verification code sent to your email'
      : 'Could not send email — use the code shown below',
    expiresInMinutes: env.otpExpiresMinutes,
    emailSent,
    ...(!emailSent && !env.isProd ? { devOtp: otp } : {}),
  });
});

/**
 * POST /api/auth/otp/verify
 */
export const verifyOtpCode = asyncHandler(async (req, res) => {
  const { email, otp, invite_token } = req.body;
  const normalizedEmail = email.toLowerCase();

  const otpRes = await query(
    `SELECT * FROM otp_verifications
     WHERE email = $1 AND invite_token = $2 AND verified_at IS NULL AND expires_at > NOW()
     ORDER BY created_at DESC LIMIT 1`,
    [normalizedEmail, invite_token]
  );
  const record = otpRes.rows[0];
  if (!record) throw ApiError.badRequest('Invalid or expired verification code');

  if (record.verify_attempts >= env.otpMaxVerifyAttempts) {
    await query('UPDATE otp_verifications SET expires_at = NOW() WHERE id = $1', [record.id]);
    throw ApiError.tooManyRequests('Too many failed attempts. Request a new verification code.');
  }

  const valid = await verifyOtp(otp, record.otp_hash);
  if (!valid) {
    const attempts = record.verify_attempts + 1;
    await query('UPDATE otp_verifications SET verify_attempts = $1 WHERE id = $2', [attempts, record.id]);
    const remaining = env.otpMaxVerifyAttempts - attempts;
    if (remaining <= 0) {
      await query('UPDATE otp_verifications SET expires_at = NOW() WHERE id = $1', [record.id]);
      throw ApiError.tooManyRequests('Too many failed attempts. Request a new verification code.');
    }
    throw ApiError.badRequest(`Invalid verification code. ${remaining} attempt(s) remaining.`);
  }

  await query('UPDATE otp_verifications SET verified_at = NOW() WHERE id = $1', [record.id]);

  const inviteRes = await query(
    `SELECT ci.*, a.title AS assessment_title
     FROM candidate_invites ci
     JOIN assessments a ON a.id = ci.assessment_id
     WHERE ci.token = $1`,
    [invite_token]
  );
  const invite = inviteRes.rows[0];
  if (!invite) throw ApiError.notFound('Invitation not found');
  if (invite.status === 'completed') {
    throw ApiError.conflict('This assessment has already been completed');
  }

  const user = await withTransaction(async (client) => {
    let userRes = await client.query('SELECT id, name, email, role FROM users WHERE email = $1', [
      normalizedEmail,
    ]);

    if (userRes.rowCount === 0) {
      userRes = await client.query(
        `INSERT INTO users (name, email, password_hash, role)
         VALUES ($1, $2, NULL, 'candidate')
         RETURNING id, name, email, role`,
        [invite.candidate_name, normalizedEmail]
      );
    }

    if (invite.status === 'pending') {
      await client.query(
        `UPDATE candidate_invites SET status = 'accessed', accessed_at = NOW() WHERE id = $1`,
        [invite.id]
      );
    }

    return userRes.rows[0];
  });

  res.json({
    token: issueToken(user, { inviteId: invite.id, assessmentId: invite.assessment_id }),
    user: publicUser(user),
    invite: {
      id: invite.id,
      assessment_id: invite.assessment_id,
      assessment_title: invite.assessment_title,
      status: invite.status === 'pending' ? 'accessed' : invite.status,
    },
  });
});

/**
 * GET /api/auth/me
 */
export const me = asyncHandler(async (req, res) => {
  const result = await query('SELECT id, name, email, role FROM users WHERE id = $1', [req.user.id]);
  if (result.rowCount === 0) throw ApiError.notFound('User not found');
  res.json({ user: result.rows[0] });
});

/**
 * GET /api/auth/candidate/dashboard
 */
export const candidateDashboard = asyncHandler(async (req, res) => {
  const result = await query(
    `
    SELECT a.id,
           a.id AS assessment_id,
           a.title,
           a.description,
           a.duration_minutes,
           a.passing_marks,
           a.result_visible,
           a.is_published,
           ci.status AS invite_status,
           'invite' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.id AS attempt_id,
           at.status AS attempt_status,
           at.started_at,
           at.submitted_at,
           at.violation_count,
           s.marks_obtained,
           s.total_marks AS score_total,
           s.percentage,
           s.passed
    FROM candidate_invites ci
    JOIN assessments a ON a.id = ci.assessment_id
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id = a.id
    LEFT JOIN attempts at ON at.assessment_id = a.id AND at.candidate_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE ci.candidate_email = $1 AND ci.status <> 'expired'

    UNION

    SELECT a.id,
           a.id AS assessment_id,
           a.title,
           a.description,
           a.duration_minutes,
           a.passing_marks,
           a.result_visible,
           a.is_published,
           NULL AS invite_status,
           'enrollment' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.id AS attempt_id,
           at.status AS attempt_status,
           at.started_at,
           at.submitted_at,
           at.violation_count,
           s.marks_obtained,
           s.total_marks AS score_total,
           s.percentage,
           s.passed
    FROM student_enrollments se
    JOIN test_series_assessments tsa ON tsa.test_series_id = se.test_series_id
    JOIN assessments a ON a.id = tsa.assessment_id AND a.is_published = true
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id = a.id
    LEFT JOIN attempts at ON at.assessment_id = a.id AND at.candidate_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE se.user_id = $2 AND se.status = 'active' AND se.expires_at > NOW()
      AND NOT EXISTS (
        SELECT 1 FROM candidate_invites ci2
        WHERE ci2.candidate_email = $1 AND ci2.assessment_id = a.id AND ci2.status <> 'expired'
      )
    ORDER BY title ASC
    `,
    [req.user.email, req.user.id]
  );

  const rows = result.rows;
  const isDone = (r) => r.attempt_status === 'submitted' || r.attempt_status === 'auto_submitted';
  const pending = rows.filter((r) => !isDone(r));
  const completed = rows.filter(isDone);

  res.json({
    invited: rows,
    pending,
    completed,
    stats: {
      totalInvited: rows.length,
      pending: pending.length,
      completed: completed.length,
    },
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userRes = await query(
    "SELECT id, name, email FROM users WHERE email = $1 AND role = 'candidate' AND password_hash IS NOT NULL",
    [email.toLowerCase()]
  );
  if (!userRes.rowCount) {
    return res.json({ message: 'If that email exists, a reset link has been sent.' });
  }
  const user = userRes.rows[0];
  const token = crypto.randomBytes(32).toString('hex');
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const expires = new Date(Date.now() + 60 * 60 * 1000);

  await query(`INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES ($1,$2,$3)`, [
    user.id,
    tokenHash,
    expires,
  ]);

  const resetUrl = `${env.inviteBaseUrl}/reset-password?token=${token}&email=${encodeURIComponent(user.email)}`;
  try {
    await sendEmail({
      to: user.email,
      subject: 'Reset your AssessPro password',
      html: `<p>Hi ${user.name},</p><p><a href="${resetUrl}">Reset your password</a></p><p>Expires in 1 hour.</p>`,
      text: `Reset password: ${resetUrl}`,
    });
  } catch (err) {
    if (!env.isProd) console.log(`[dev] Reset link: ${resetUrl}`);
    else throw err;
  }

  res.json({ message: 'If that email exists, a reset link has been sent.', ...(!env.isProd ? { devResetUrl: resetUrl } : {}) });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { email, token, password } = req.body;
  const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
  const resetRes = await query(
    `SELECT pr.* FROM password_resets pr JOIN users u ON u.id = pr.user_id
     WHERE u.email = $1 AND pr.token_hash = $2 AND pr.used_at IS NULL AND pr.expires_at > NOW()
     ORDER BY pr.created_at DESC LIMIT 1`,
    [email.toLowerCase(), tokenHash]
  );
  if (!resetRes.rowCount) throw ApiError.badRequest('Invalid or expired reset link');
  const password_hash = await hashPassword(password);
  await query('UPDATE users SET password_hash = $1 WHERE id = $2', [password_hash, resetRes.rows[0].user_id]);
  await query('UPDATE password_resets SET used_at = NOW() WHERE id = $1', [resetRes.rows[0].id]);
  res.json({ message: 'Password updated successfully' });
});
