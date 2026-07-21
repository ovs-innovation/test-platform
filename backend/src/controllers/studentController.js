import crypto from 'crypto';
import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { hashPassword, comparePassword } from '../utils/password.js';

export const getProfile = asyncHandler(async (req, res) => {
  const [user, profile] = await Promise.all([
    query('SELECT id, name, email, role, created_at FROM users WHERE id = $1', [req.user.id]),
    query('SELECT * FROM student_profiles WHERE user_id = $1', [req.user.id]),
  ]);
  res.json({ user: user.rows[0], profile: profile.rows[0] || null });
});

export const updateProfile = asyncHandler(async (req, res) => {
  const { name, phone, city, state, target_exam, class: studentClass } = req.body;
  if (name) await query('UPDATE users SET name = $1 WHERE id = $2', [name, req.user.id]);
  await query(
    `INSERT INTO student_profiles (user_id, phone, city, state, target_exam, class)
     VALUES ($1,$2,$3,$4,$5,$6)
     ON CONFLICT (user_id) DO UPDATE SET phone = EXCLUDED.phone, city = EXCLUDED.city,
       state = EXCLUDED.state, target_exam = EXCLUDED.target_exam, class = EXCLUDED.class, updated_at = NOW()`,
    [req.user.id, phone || null, city || null, state || null, target_exam || null, studentClass || null]
  );
  res.json({ message: 'Profile updated' });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { current_password, new_password } = req.body;
  const userRes = await query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
  const valid = await comparePassword(current_password, userRes.rows[0].password_hash);
  if (!valid) throw ApiError.unauthorized('Current password is incorrect');
  const password_hash = await hashPassword(new_password);
  await query('UPDATE users SET password_hash = $1 WHERE id = $2', [password_hash, req.user.id]);
  res.json({ message: 'Password changed' });
});

export const getLeaderboardAssessments = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT a.id, a.title, COUNT(DISTINCT at.id)::int AS attempt_count
     FROM assessments a
     JOIN attempts at ON at.assessment_id = a.id
     JOIN scores s ON s.attempt_id = at.id
     WHERE at.status IN ('submitted', 'auto_submitted')
     GROUP BY a.id, a.title
     ORDER BY a.title ASC`
  );
  res.json({ assessments: result.rows });
});

export const getLeaderboard = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  let assessmentId = req.query.assessment_id ? Number(req.query.assessment_id) : null;
  const testSeriesId = req.query.test_series_id ? Number(req.query.test_series_id) : null;

  if (testSeriesId && !assessmentId) {
    const inSeries = await query(
      `SELECT a.id, a.title
       FROM assessments a
       JOIN test_series_assessments tsa ON tsa.assessment_id = a.id
       JOIN attempts at ON at.assessment_id = a.id
       JOIN scores s ON s.attempt_id = at.id
       WHERE tsa.test_series_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       GROUP BY a.id, a.title
       ORDER BY a.title ASC
       LIMIT 1`,
      [testSeriesId]
    );
    if (inSeries.rowCount) assessmentId = inSeries.rows[0].id;
  }

  if (!assessmentId) {
    const recent = await query(
      `SELECT at.assessment_id
       FROM attempts at
       JOIN scores s ON s.attempt_id = at.id
       WHERE at.candidate_id = $1 AND at.status IN ('submitted', 'auto_submitted')
       ORDER BY at.submitted_at DESC NULLS LAST
       LIMIT 1`,
      [userId]
    );
    if (recent.rowCount) {
      assessmentId = recent.rows[0].assessment_id;
    } else {
      const any = await query(
        `SELECT at.assessment_id
         FROM attempts at
         JOIN scores s ON s.attempt_id = at.id
         WHERE at.status IN ('submitted', 'auto_submitted')
         ORDER BY at.submitted_at DESC NULLS LAST
         LIMIT 1`
      );
      assessmentId = any.rows[0]?.assessment_id ?? null;
    }
  }

  if (!assessmentId) {
    return res.json({ assessment_id: null, assessment_title: null, your_rank: null, leaderboard: [] });
  }

  const assessmentRes = await query('SELECT id, title FROM assessments WHERE id = $1', [assessmentId]);
  const assessment = assessmentRes.rows[0];
  if (!assessment) throw ApiError.notFound('Assessment not found');

  const result = await query(
    `SELECT at.id AS attempt_id,
            at.candidate_id,
            u.name,
            s.marks_obtained,
            s.total_marks,
            s.percentage,
            s.percentile,
            at.submitted_at,
            RANK() OVER (ORDER BY s.marks_obtained DESC, at.submitted_at ASC)::int AS rank
     FROM scores s
     JOIN attempts at ON at.id = s.attempt_id
     JOIN users u ON u.id = at.candidate_id
     WHERE at.assessment_id = $1
       AND at.status IN ('submitted', 'auto_submitted')
     ORDER BY rank ASC, at.submitted_at ASC
     LIMIT 100`,
    [assessmentId]
  );

  const yourRow = result.rows.find((r) => r.candidate_id === userId);

  res.json({
    assessment_id: assessment.id,
    assessment_title: assessment.title,
    your_rank: yourRow?.rank ?? null,
    your_percentage: yourRow ? Number(yourRow.percentage) : null,
    leaderboard: result.rows.map(({ candidate_id, ...row }) => ({
      ...row,
      is_you: candidate_id === userId,
    })),
  });
});

export const getCertificate = asyncHandler(async (req, res) => {
  const { attemptId } = req.params;
  const attempt = await query(
    `SELECT at.*, a.title AS assessment_title, u.name AS student_name, s.percentage, s.passed
     FROM attempts at JOIN assessments a ON a.id = at.assessment_id
     JOIN users u ON u.id = at.candidate_id
     LEFT JOIN scores s ON s.attempt_id = at.id
     WHERE at.id = $1`,
    [attemptId]
  );
  if (!attempt.rowCount) throw ApiError.notFound('Attempt not found');
  if (attempt.rows[0].candidate_id !== req.user.id && req.user.role !== 'admin') {
    throw ApiError.forbidden('Not allowed');
  }
  if (!attempt.rows[0].passed) throw ApiError.badRequest('Certificate only for passed attempts');

  let cert = await query('SELECT * FROM certificates WHERE attempt_id = $1', [attemptId]);
  if (!cert.rowCount) {
    const code = `AP-${attemptId}-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
    cert = await query(
      `INSERT INTO certificates (attempt_id, user_id, certificate_code) VALUES ($1,$2,$3) RETURNING *`,
      [attemptId, attempt.rows[0].candidate_id, code]
    );
  }
  res.json({ certificate: cert.rows[0], attempt: attempt.rows[0] });
});

export const listForumTopics = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT ft.*, u.name AS author_name,
            COUNT(fr.id)::int AS reply_count
     FROM forum_topics ft JOIN users u ON u.id = ft.user_id
     LEFT JOIN forum_replies fr ON fr.topic_id = ft.id
     GROUP BY ft.id, u.name ORDER BY ft.created_at DESC LIMIT 50`
  );
  res.json({ topics: result.rows });
});

export const getForumTopic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const topic = await query(
    `SELECT ft.*, u.name AS author_name FROM forum_topics ft JOIN users u ON u.id = ft.user_id WHERE ft.id = $1`,
    [id]
  );
  if (!topic.rowCount) throw ApiError.notFound('Topic not found');
  const replies = await query(
    `SELECT fr.*, u.name AS author_name FROM forum_replies fr JOIN users u ON u.id = fr.user_id
     WHERE fr.topic_id = $1 ORDER BY fr.created_at ASC`,
    [id]
  );
  res.json({ topic: topic.rows[0], replies: replies.rows });
});

export const createForumTopic = asyncHandler(async (req, res) => {
  const { title, body } = req.body;
  const result = await query(
    `INSERT INTO forum_topics (user_id, title, body) VALUES ($1,$2,$3) RETURNING *`,
    [req.user.id, title, body]
  );
  res.status(201).json({ topic: result.rows[0] });
});

export const replyForumTopic = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const topic = await query('SELECT id, is_locked FROM forum_topics WHERE id = $1', [id]);
  if (!topic.rowCount) throw ApiError.notFound('Topic not found');
  if (topic.rows[0].is_locked) throw ApiError.badRequest('Topic is locked');
  const result = await query(
    `INSERT INTO forum_replies (topic_id, user_id, body) VALUES ($1,$2,$3) RETURNING *`,
    [id, req.user.id, body]
  );
  res.status(201).json({ reply: result.rows[0] });
});
