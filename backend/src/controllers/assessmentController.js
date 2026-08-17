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
  const userRes = await query('SELECT batch_id, institution_id FROM users WHERE id = $1', [req.user.id]);
  const student = userRes.rows[0] || {};
  const batchId = student.batch_id || null;
  const instId = student.institution_id || null;

  const result = await query(
    `
    SELECT a.id, a.title, a.description, a.instructions, a.duration_minutes,
           a.passing_marks, a.max_violations, a.result_visible, a.available_from, a.available_until,
           ci.id AS invite_id, ci.status::text AS invite_status, ci.token AS invite_token,
           'invite' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.status::text AS attempt_status,
           at.id AS attempt_id,
           s.marks_obtained, s.total_marks AS score_total, s.percentage, s.passed,
           a.question_paper_url, a.solution_pdf_url
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
           a.passing_marks, a.max_violations, a.result_visible, a.available_from, a.available_until,
           NULL AS invite_id, NULL AS invite_status, NULL AS invite_token,
           'enrollment' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.status::text AS attempt_status,
           at.id AS attempt_id,
           s.marks_obtained, s.total_marks AS score_total, s.percentage, s.passed,
           a.question_paper_url, a.solution_pdf_url
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

    UNION

    SELECT t.id, COALESCE(t.test_name, t.title) AS title, COALESCE(t.syllabus, 'Proctored NTA CBT format diagnostic mock exam.') AS description,
           'Standard examination instructions apply.' AS instructions, t.duration_minutes,
           0 AS passing_marks, 5 AS max_violations, true AS result_visible, t.available_from, t.available_until,
           NULL AS invite_id, NULL AS invite_status, NULL AS invite_token,
           'assignment' AS access_type,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(t.max_marks, q.total_marks, 300)::int AS total_marks,
           COALESCE(at.status::text, (CASE WHEN tat.submitted_at IS NOT NULL THEN 'completed' WHEN tat.started_at IS NOT NULL THEN 'in_progress' ELSE NULL END)::text) AS attempt_status,
           COALESCE(at.id, tat.id) AS attempt_id,
           COALESCE(s.marks_obtained, ts.marks_obtained) AS marks_obtained,
           COALESCE(s.total_marks, ts.total_marks) AS score_total,
           COALESCE(s.percentage, ts.percentage) AS percentage,
           COALESCE(s.passed, ts.passed) AS passed,
           t.question_paper_url, t.solution_pdf_url
    FROM tests t
    JOIN test_assignments tas ON tas.test_id = t.id
    LEFT JOIN (
      SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
    ) q ON q.assessment_id = t.id
    LEFT JOIN attempts at ON at.assessment_id = t.id AND at.candidate_id = $2
    LEFT JOIN test_attempts tat ON tat.test_id = t.id AND tat.student_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    LEFT JOIN scores ts ON ts.attempt_id = tat.id
    WHERE (t.is_published = true OR t.status = 'published')
      AND COALESCE(t.is_deleted, false) = false
      AND (
        (tas.assigned_to_type = 'individual' AND tas.assigned_to_id = $2)
        OR (tas.assigned_to_type = 'batch' AND $3::int IS NOT NULL AND tas.assigned_to_id = $3)
        OR (tas.assigned_to_type = 'institution' AND $4::int IS NOT NULL AND tas.assigned_to_id = $4)
        OR tas.assigned_to_type = 'all'
      )

    ORDER BY id DESC
    `,
    [req.user.email, req.user.id, batchId, instId]
  );
  res.json({ assessments: result.rows });
});

/** GET /api/assessments/available/:id — student access check + details */
export const getStudentAssessment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let assessmentRow = null;

  const list = await query(
    `
    SELECT a.id, a.title, a.description, a.instructions, a.duration_minutes,
           a.passing_marks, a.max_violations, a.result_visible, a.is_published,
           a.available_from, a.available_until,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.status AS attempt_status, at.id AS attempt_id,
           s.percentage, s.passed,
           a.question_paper_url, a.solution_pdf_url, a.answer_key_url
    FROM assessments a
    LEFT JOIN (SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id) q ON q.assessment_id = a.id
    LEFT JOIN attempts at ON at.assessment_id = a.id AND at.candidate_id = $2
    LEFT JOIN scores s ON s.attempt_id = at.id
    WHERE a.id = $1 AND a.is_published = true
    `,
    [id, req.user.id]
  );

  if (list.rowCount > 0) {
    assessmentRow = list.rows[0];
  } else {
    const testList = await query(
      `
      SELECT t.id, COALESCE(t.test_name, t.title) AS title,
             t.syllabus AS description,
             'Standard examination instructions apply.' AS instructions,
             t.duration_minutes, 0 AS passing_marks, 5 AS max_violations,
             true AS result_visible, (t.is_published = true OR t.status = 'published') AS is_published,
             t.available_from, t.available_until,
             COALESCE(q.cnt, 0)::int AS question_count,
             COALESCE(t.max_marks, q.total_marks, 300)::int AS total_marks,
             COALESCE(at.status::text, (CASE WHEN ta.submitted_at IS NOT NULL THEN 'completed' WHEN ta.started_at IS NOT NULL THEN 'in_progress' ELSE NULL END)::text) AS attempt_status,
             COALESCE(at.id, ta.id) AS attempt_id,
             COALESCE(s.percentage, NULL::numeric) AS percentage,
             COALESCE(s.passed, NULL::boolean) AS passed,
             t.question_paper_url, t.solution_pdf_url, t.answer_key_url
      FROM tests t
      LEFT JOIN (SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id) q ON q.assessment_id = t.id
      LEFT JOIN attempts at ON at.assessment_id = t.id AND at.candidate_id = $2
      LEFT JOIN test_attempts ta ON ta.test_id = t.id AND ta.student_id = $2
      LEFT JOIN scores s ON s.attempt_id = at.id
      WHERE t.id = $1 AND (t.is_published = true OR t.status = 'published') AND COALESCE(t.is_deleted, false) = false
      `,
      [id, req.user.id]
    );

    if (testList.rowCount > 0) {
      assessmentRow = testList.rows[0];
    }
  }

  if (!assessmentRow) throw ApiError.notFound('Assessment not found');

  const invite = await query(
    `SELECT id FROM candidate_invites WHERE candidate_email = $1 AND assessment_id = $2 AND status <> 'expired'`,
    [req.user.email, id]
  );
  const enr = await query(
    `SELECT se.id FROM student_enrollments se
     LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = se.test_series_id
     LEFT JOIN test_series_tests tst ON tst.series_id = se.test_series_id
     WHERE se.user_id = $1 AND (tsa.assessment_id = $2 OR tst.test_id = $2) AND se.status = 'active' AND se.expires_at > NOW()`,
    [req.user.id, id]
  );
  const userRes = await query('SELECT batch_id, institution_id FROM users WHERE id = $1', [req.user.id]);
  const student = userRes.rows[0] || {};
  const batchId = student.batch_id || null;
  const instId = student.institution_id || null;

  const assign = await query(
    `SELECT id FROM test_assignments
     WHERE test_id = $1
       AND (
         assigned_to_type = 'all'
         OR (assigned_to_type = 'individual' AND assigned_to_id = $2)
         OR (assigned_to_type = 'batch' AND $3::int IS NOT NULL AND assigned_to_id = $3)
         OR (assigned_to_type = 'institution' AND $4::int IS NOT NULL AND assigned_to_id = $4)
       )`,
    [id, req.user.id, batchId, instId]
  );

  if (!invite.rowCount && !enr.rowCount && !assign.rowCount) {
    const freeCheck = await query(
      `SELECT ts.id FROM test_series ts
       LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
       LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
       WHERE (tsa.assessment_id = $1 OR tst.test_id = $1)
         AND (ts.price = 0 OR ts.slug LIKE '%free%') AND ts.is_active = true`,
      [id]
    );
    if (freeCheck.rowCount > 0) {
      await query(
        `INSERT INTO student_enrollments (user_id, test_series_id, status, expires_at)
         VALUES ($1, $2, 'active', NOW() + INTERVAL '365 days')
         ON CONFLICT (user_id, test_series_id) DO NOTHING`,
        [req.user.id, freeCheck.rows[0].id]
      );
    } else {
      throw ApiError.forbidden('You do not have access to this assessment');
    }
  }

  let series_slug = null;
  const slugRes = await query(
    `SELECT ts.slug FROM test_series ts
     LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
     LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
     JOIN student_enrollments se ON se.test_series_id = ts.id
     WHERE (tsa.assessment_id = $1 OR tst.test_id = $1) AND se.user_id = $2 AND se.status = 'active' AND se.expires_at > NOW()
     LIMIT 1`,
    [id, req.user.id]
  );
  if (slugRes.rowCount) {
    series_slug = slugRes.rows[0].slug;
  }

  res.json({
    assessment: {
      ...assessmentRow,
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
      `SELECT q.*, 
              s.name AS section_name,
              COALESCE(c.name, q.topic) AS topic,
              COALESCE(c.id, q.chapter_id) AS chapter_id,
              COALESCE(subj.name, q.subject) AS subject,
              COALESCE(subj.id, q.subject_id) AS subject_id
       FROM questions q
       LEFT JOIN assessment_sections s ON s.id = q.section_id
       LEFT JOIN chapters c ON c.id = q.chapter_id
       LEFT JOIN subjects subj ON subj.id = q.subject_id
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
  const { title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, available_from, available_until } =
    req.body;

  const result = await query(
    `INSERT INTO assessments
       (title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, available_from, available_until, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     RETURNING *`,
    [title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, available_from || null, available_until || null, req.user.id]
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

export const importScheduleCsv = asyncHandler(async (req, res) => {
  const { test_series_id, items } = req.body; // items: array of { sequence, type, name, date, phase }
  if (!Array.isArray(items) || !items.length) {
    throw ApiError.badRequest('Schedule items array is required');
  }

  const created = [];
  const errors = [];

  for (const item of items) {
    if (!item.name || !item.date || !item.type) {
      errors.push({ row: item, error: 'Missing required fields (name, date, type)' });
      continue;
    }

    const title = `AIETS 2027: ${item.name}`;
    const startTime = new Date(`${item.date}T09:00:00+05:30`).toISOString();
    const endTime = new Date(`${item.date}T12:00:00+05:30`).toISOString();

    try {
      const assessRes = await query(
        `INSERT INTO assessments (
          title, description, instructions, duration_minutes, passing_marks, max_violations,
          result_visible, is_published, sequence_number, test_type, preparation_phase, start_time, end_time, created_by
        ) VALUES ($1,$2,$3,180,180,3,true,false,$4,$5,$6,$7,$8,$9)
        RETURNING *`,
        [
          title,
          `${item.phase || 'CONCEPT_BUILDING'} Phase - NTA Pattern ${item.type}`,
          'Authentic NTA-pattern CBT test.',
          item.sequence || 0,
          item.type,
          item.phase || 'CONCEPT_BUILDING',
          startTime,
          endTime,
          req.user.id
        ]
      );
      const newAssessment = assessRes.rows[0];
      created.push(newAssessment);

      if (test_series_id) {
        await query(
          `INSERT INTO test_series_assessments (test_series_id, assessment_id, label, position)
           VALUES ($1,$2,$3,$4)
           ON CONFLICT (test_series_id, assessment_id) DO UPDATE SET position = EXCLUDED.position, label = EXCLUDED.label`,
          [test_series_id, newAssessment.id, item.name, item.sequence || 0]
        );
      }
    } catch (err) {
      errors.push({ row: item, error: err.message });
    }
  }

  res.status(201).json({
    message: `Imported ${created.length} scheduled assessment placeholders`,
    imported_count: created.length,
    failed_count: errors.length,
    errors,
  });
});
