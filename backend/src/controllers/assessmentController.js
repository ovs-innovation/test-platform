import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const listAllAssessments = asyncHandler(async (_req, res) => {
  const result = await query(`
    SELECT a.*,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           COALESCE(at.attempts, 0)::int AS attempt_count,
           COALESCE(inv.invite_count, 0)::int AS invite_count
    FROM assessments a
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks
      FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id = a.id
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS attempts
      FROM attempts GROUP BY assessment_id
    ) at ON at.assessment_id = a.id
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS invite_count
      FROM candidate_invites GROUP BY assessment_id
    ) inv ON inv.assessment_id = a.id
    ORDER BY a.created_at DESC
  `);
  res.json({ assessments: result.rows });
});

export const listAvailableAssessments = asyncHandler(async (req, res) => {
  const result = await query(
    `
    SELECT a.id, a.title, a.description, a.instructions, a.duration_minutes,
           a.passing_marks, a.max_violations, a.result_visible,
           ci.id AS invite_id, ci.status AS invite_status, ci.token AS invite_token,
           'invite' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.status AS attempt_status,
           at.id AS attempt_id,
           s.marks_obtained, s.total_marks, s.percentage, s.passed
    FROM candidate_invites ci
    JOIN assessments a ON a.id = ci.assessment_id
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id = a.id
    LEFT JOIN attempts at ON at.assessment_id = a.id AND at.candidate_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE ci.candidate_email = $1 AND ci.status <> 'expired'

    UNION

    SELECT a.id, a.title, a.description, a.instructions, a.duration_minutes,
           a.passing_marks, a.max_violations, a.result_visible,
           NULL AS invite_id, NULL AS invite_status, NULL AS invite_token,
           'enrollment' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.status AS attempt_status,
           at.id AS attempt_id,
           s.marks_obtained, s.total_marks, s.percentage, s.passed
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
    ORDER BY id DESC
    `,
    [req.user.email, req.user.id]
  );
  res.json({ assessments: result.rows });
});

/** GET /api/assessments/available/:id — student access check + details */
export const getStudentAssessment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const list = await query(
    `
    SELECT a.id, a.title, a.description, a.instructions, a.duration_minutes,
           a.passing_marks, a.max_violations, a.result_visible, a.is_published,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.status AS attempt_status, at.id AS attempt_id,
           s.percentage, s.passed
    FROM assessments a
    LEFT JOIN (SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id) q ON q.assessment_id = a.id
    LEFT JOIN attempts at ON at.assessment_id = a.id AND at.candidate_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE a.id = $1 AND a.is_published = true
    `,
    [id, req.user.id]
  );
  if (!list.rowCount) throw ApiError.notFound('Assessment not found');

  const invite = await query(
    `SELECT id FROM candidate_invites WHERE candidate_email = $1 AND assessment_id = $2 AND status <> 'expired'`,
    [req.user.email, id]
  );
  const enr = await query(
    `SELECT se.id FROM student_enrollments se
     JOIN test_series_assessments tsa ON tsa.test_series_id = se.test_series_id
     WHERE se.user_id = $1 AND tsa.assessment_id = $2 AND se.status = 'active' AND se.expires_at > NOW()`,
    [req.user.id, id]
  );
  if (!invite.rowCount && !enr.rowCount) {
    throw ApiError.forbidden('You do not have access to this assessment');
  }

  let series_slug = null;
  if (enr.rowCount) {
    const slugRes = await query(
      `SELECT ts.slug FROM test_series ts
       JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
       JOIN student_enrollments se ON se.test_series_id = ts.id
       WHERE tsa.assessment_id = $1 AND se.user_id = $2 AND se.status = 'active' AND se.expires_at > NOW()
       LIMIT 1`,
      [id, req.user.id]
    );
    series_slug = slugRes.rows[0]?.slug || null;
  }

  res.json({
    assessment: {
      ...list.rows[0],
      access_type: invite.rowCount ? 'invite' : 'enrollment',
      series_slug,
    },
  });
});

export const getAssessmentAdmin = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const a = await query('SELECT * FROM assessments WHERE id = $1', [id]);
  if (a.rowCount === 0) throw ApiError.notFound('Assessment not found');

  const [sections, questions, invites] = await Promise.all([
    query('SELECT * FROM assessment_sections WHERE assessment_id = $1 ORDER BY position ASC', [id]),
    query(
      `SELECT q.*, s.name AS section_name FROM questions q
       LEFT JOIN assessment_sections s ON s.id = q.section_id
       WHERE q.assessment_id = $1 ORDER BY q.position ASC, q.id ASC`,
      [id]
    ),
    query(
      `SELECT ci.*,
              s.percentage,
              s.marks_obtained,
              s.total_marks AS score_total,
              s.passed,
              at.status AS attempt_status
       FROM candidate_invites ci
       LEFT JOIN attempts at ON at.invite_id = ci.id
       LEFT JOIN scores s ON s.attempt_id = at.id
       WHERE ci.assessment_id = $1
       ORDER BY ci.invited_at DESC`,
      [id]
    ),
  ]);

  res.json({
    assessment: a.rows[0],
    sections: sections.rows,
    questions: questions.rows,
    invites: invites.rows,
  });
});

/** GET /api/assessments/:id/preview  (admin) — full preview with answers */
export const previewAssessment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const a = await query('SELECT * FROM assessments WHERE id = $1', [id]);
  if (a.rowCount === 0) throw ApiError.notFound('Assessment not found');

  const [sections, questions] = await Promise.all([
    query('SELECT * FROM assessment_sections WHERE assessment_id = $1 ORDER BY position ASC', [id]),
    query(
      `SELECT q.*, s.name AS section_name, s.section_type
       FROM questions q
       LEFT JOIN assessment_sections s ON s.id = q.section_id
       WHERE q.assessment_id = $1 ORDER BY q.position ASC, q.id ASC`,
      [id]
    ),
  ]);

  const totalMarks = questions.rows.reduce((s, q) => s + q.marks, 0);

  res.json({
    assessment: a.rows[0],
    sections: sections.rows,
    questions: questions.rows,
    summary: {
      question_count: questions.rows.length,
      total_marks: totalMarks,
      can_publish: questions.rows.length > 0,
    },
  });
});

export const createAssessment = asyncHandler(async (req, res) => {
  const { title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible } =
    req.body;

  const result = await query(
    `INSERT INTO assessments
       (title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
     RETURNING *`,
    [title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, req.user.id]
  );

  const assessment = result.rows[0];
  const defaultSections = [
    { name: 'Aptitude', section_type: 'aptitude', position: 1 },
    { name: 'Technical MCQ', section_type: 'technical_mcq', position: 2 },
    { name: 'Coding', section_type: 'coding', position: 3 },
    { name: 'Subjective', section_type: 'subjective', position: 4 },
  ];
  for (const s of defaultSections) {
    await query(
      `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1,$2,$3,$4)`,
      [assessment.id, s.name, s.section_type, s.position]
    );
  }

  res.status(201).json({ assessment });
});

export const updateAssessment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fields = req.body;

  const keys = Object.keys(fields);
  if (keys.length === 0) throw ApiError.badRequest('No fields provided to update');

  const setClauses = keys.map((k, i) => `${k} = $${i + 1}`);
  setClauses.push('updated_at = NOW()');
  const values = keys.map((k) => fields[k]);
  values.push(id);

  const result = await query(
    `UPDATE assessments SET ${setClauses.join(', ')} WHERE id = $${values.length} RETURNING *`,
    values
  );
  if (result.rowCount === 0) throw ApiError.notFound('Assessment not found');
  res.json({ assessment: result.rows[0] });
});

export const togglePublish = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const publish = req.body.is_published === true;

  if (publish) {
    const q = await query('SELECT COUNT(*)::int AS c FROM questions WHERE assessment_id = $1', [id]);
    if (q.rows[0].c === 0) {
      throw ApiError.badRequest('Cannot publish an assessment with no questions');
    }
  }

  const result = await query(
    'UPDATE assessments SET is_published = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [publish, id]
  );
  if (result.rowCount === 0) throw ApiError.notFound('Assessment not found');
  res.json({ assessment: result.rows[0] });
});

export const deleteAssessment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM assessments WHERE id = $1 RETURNING id', [id]);
  if (result.rowCount === 0) throw ApiError.notFound('Assessment not found');
  res.json({ message: 'Assessment deleted', id: result.rows[0].id });
});
