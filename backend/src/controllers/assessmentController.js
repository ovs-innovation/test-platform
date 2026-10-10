import { query, withTransaction } from '../config/db.js';
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
  try {
    const userRes = await query('SELECT batch_id, institution_id FROM users WHERE id = $1', [req.user.id]);
    const student = userRes.rows[0] || {};
    const batchId = student.batch_id || null;
    const instId = student.institution_id || null;

    const result = await query(
      `
      SELECT COALESCE(a.id, t.id) AS id, COALESCE(a.title, t.test_name, t.title) AS title,
             COALESCE(a.description, t.syllabus, 'Proctored NEET / JEE CBT format diagnostic mock exam.') AS description,
             COALESCE(a.instructions, 'Standard examination instructions apply.') AS instructions,
             COALESCE(a.duration_minutes, t.duration_minutes, 180) AS duration_minutes,
             COALESCE(a.passing_marks, 0) AS passing_marks,
             COALESCE(a.max_violations, 5) AS max_violations,
             COALESCE(a.result_visible, true) AS result_visible,
             COALESCE(a.available_from, t.available_from) AS available_from,
             COALESCE(a.available_until, t.available_until) AS available_until,
             ci.id AS invite_id, ci.status::text AS invite_status, ci.token AS invite_token,
             'invite' AS access_type,
             COALESCE(q.cnt, qt.cnt, 0)::int AS question_count,
             COALESCE(q.total_marks, qt.total_marks, t.max_marks, 300)::int AS total_marks,
             COALESCE(at.status::text, (CASE WHEN tat.submitted_at IS NOT NULL THEN 'completed' WHEN tat.started_at IS NOT NULL THEN 'in_progress' ELSE NULL END)::text) AS attempt_status,
             COALESCE(at.id, tat.id) AS attempt_id,
             COALESCE(s.marks_obtained, ts.marks_obtained) AS marks_obtained,
             COALESCE(s.total_marks, ts.total_marks) AS score_total,
             COALESCE(s.percentage, ts.percentage) AS percentage,
             COALESCE(s.passed, ts.passed) AS passed,
             COALESCE(a.question_paper_url, t.question_paper_url) AS question_paper_url,
             COALESCE(a.solution_pdf_url, t.solution_pdf_url) AS solution_pdf_url,
             COALESCE(eb.id, eb_t.id) AS ebook_id,
             COALESCE(eb.title, eb_t.title) AS ebook_title,
             COALESCE(eb.pdf_url, eb_t.pdf_url) AS ebook_pdf_url,
             COALESCE(eb.author, eb_t.author) AS ebook_author
      FROM candidate_invites ci
      LEFT JOIN assessments a ON a.id = ci.assessment_id
      LEFT JOIN tests t ON t.id = ci.assessment_id
      LEFT JOIN ebooks eb ON eb.id = a.recommended_ebook_id
      LEFT JOIN ebooks eb_t ON eb_t.id = t.recommended_ebook_id
      LEFT JOIN (
        SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
      ) q ON q.assessment_id = a.id
      LEFT JOIN (
        SELECT assessment_id, COUNT(*) AS cnt, SUM(marks) AS total_marks FROM questions GROUP BY assessment_id
      ) qt ON qt.assessment_id = t.id
      LEFT JOIN attempts at ON at.assessment_id = ci.assessment_id AND at.candidate_id = $2
      LEFT JOIN test_attempts tat ON tat.test_id = ci.assessment_id AND tat.student_id = $2
      LEFT JOIN scores s ON s.attempt_id = at.id
      LEFT JOIN scores ts ON ts.attempt_id = tat.id
      WHERE ci.candidate_email = $1 AND ci.status <> 'expired'

      UNION ALL

      SELECT a.id, a.title, a.description, a.instructions, a.duration_minutes,
             a.passing_marks, a.max_violations, a.result_visible, a.available_from, a.available_until,
             NULL AS invite_id, NULL AS invite_status, NULL AS invite_token,
             'enrollment' AS access_type,
             COALESCE(q.cnt, 0)::int AS question_count,
             COALESCE(q.total_marks, 0)::int AS total_marks,
             at.status::text AS attempt_status,
             at.id AS attempt_id,
             s.marks_obtained, s.total_marks AS score_total, s.percentage, s.passed,
             a.question_paper_url, a.solution_pdf_url,
             eb.id AS ebook_id, eb.title AS ebook_title, eb.pdf_url AS ebook_pdf_url, eb.author AS ebook_author
      FROM student_enrollments se
      JOIN test_series_assessments tsa ON tsa.test_series_id = se.test_series_id
      JOIN assessments a ON a.id = tsa.assessment_id AND a.is_published = true
      LEFT JOIN ebooks eb ON eb.id = a.recommended_ebook_id
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

      UNION ALL

      SELECT t.id, COALESCE(t.test_name, t.title) AS title, COALESCE(t.syllabus, 'Proctored NEET / JEE CBT format diagnostic mock exam.') AS description,
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
             t.question_paper_url, t.solution_pdf_url,
             eb_t.id AS ebook_id, eb_t.title AS ebook_title, eb_t.pdf_url AS ebook_pdf_url, eb_t.author AS ebook_author
      FROM tests t
      LEFT JOIN ebooks eb_t ON eb_t.id = t.recommended_ebook_id
      LEFT JOIN test_assignments tas ON tas.test_id = t.id
      LEFT JOIN package_tests pt ON pt.test_id = t.id
      LEFT JOIN test_series_tests tst ON tst.test_id = t.id
      LEFT JOIN test_series_assessments tsa ON tsa.assessment_id = t.id
      LEFT JOIN test_series ts_series ON ts_series.id = tst.series_id OR ts_series.id = tsa.test_series_id
      LEFT JOIN test_packages tp ON tp.id = pt.package_id OR (ts_series.title IS NOT NULL AND (
         LOWER(tp.package_name) LIKE '%' || LOWER(SUBSTRING(ts_series.title FROM 1 FOR 15)) || '%'
         OR LOWER(ts_series.title) LIKE '%' || LOWER(SUBSTRING(tp.package_name FROM 1 FOR 15)) || '%'
      ))
      LEFT JOIN institution_packages ip ON (
         ip.package_id = pt.package_id
         OR ip.package_id = tp.id
         OR ip.package_id = ts_series.id
      ) AND $4::int IS NOT NULL AND ip.institution_id = $4 AND COALESCE(ip.is_active, TRUE) = TRUE
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
          (tas.assigned_to_type IN ('individual', 'student') AND tas.assigned_to_id = $2)
          OR (tas.assigned_to_id IS NOT NULL AND tas.assigned_to_id = $2)
          OR (tas.assigned_to_type = 'batch' AND $3::int IS NOT NULL AND tas.assigned_to_id = $3)
          OR (tas.assigned_to_type = 'institution' AND $4::int IS NOT NULL AND tas.assigned_to_id = $4)
          OR tas.assigned_to_type = 'all'
          OR (ip.institution_id IS NOT NULL AND (ip.valid_until IS NULL OR ip.valid_until > NOW()))
        )

      ORDER BY id DESC
      `,
      [req.user.email, req.user.id, batchId, instId]
    );

    const seenIds = new Set();
    const uniqueAssessments = [];
    for (const row of result.rows) {
      if (!seenIds.has(row.id)) {
        seenIds.add(row.id);
        uniqueAssessments.push(row);
      }
    }

    res.json({ assessments: uniqueAssessments });
  } catch (err) {
    console.error('[listAvailableAssessments error]', err);
    res.json({ assessments: [] });
  }
});

/** GET /api/assessments/available/:id — student access check + details */
export const getStudentAssessment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  let assessmentRow = null;

  const list = await query(
    `
    SELECT a.id, a.title, a.description, a.instructions, a.duration_minutes,
           a.passing_marks, a.max_violations, a.result_visible, a.is_published,
           a.available_from, a.available_until, a.created_by,
           COALESCE(q.cnt, 0)::int AS question_count,
           COALESCE(q.total_marks, 0)::int AS total_marks,
           at.status AS attempt_status, at.id AS attempt_id,
           s.percentage, s.passed,
           a.question_paper_url, a.solution_pdf_url, a.answer_key_url,
           eb.id AS ebook_id, eb.title AS ebook_title, eb.pdf_url AS ebook_pdf_url, eb.author AS ebook_author
    FROM assessments a
    LEFT JOIN ebooks eb ON eb.id = a.recommended_ebook_id
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
             t.question_paper_url, t.solution_pdf_url, t.answer_key_url,
             eb.id AS ebook_id, eb.title AS ebook_title, eb.pdf_url AS ebook_pdf_url, eb.author AS ebook_author
      FROM tests t
      LEFT JOIN ebooks eb ON eb.id = t.recommended_ebook_id
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
         OR (assigned_to_type IN ('individual', 'student') AND assigned_to_id = $2)
         OR (assigned_to_type = 'batch' AND $3::int IS NOT NULL AND assigned_to_id = $3)
         OR (assigned_to_type = 'batch' AND $4::int IS NOT NULL AND assigned_to_id IN (SELECT id FROM batches WHERE institution_id = $4))
         OR (assigned_to_type = 'institution' AND $4::int IS NOT NULL AND assigned_to_id = $4)
       )`,
    [id, req.user.id, batchId, instId]
  );

  let instPkg = { rowCount: 0 };
  if (instId) {
    instPkg = await query(
      `SELECT ip.id FROM institution_packages ip
       LEFT JOIN package_tests pt ON pt.package_id = ip.package_id
       LEFT JOIN test_series_tests tst ON tst.series_id = ip.package_id
       LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ip.package_id
       WHERE ip.institution_id = $1
         AND COALESCE(ip.is_active, TRUE) = TRUE
         AND (ip.valid_until IS NULL OR ip.valid_until > NOW())
         AND (pt.test_id = $2 OR tst.test_id = $2 OR tsa.assessment_id = $2 OR ip.package_id = $2)`,
      [instId, id]
    );
  }

  const isCreator = assessmentRow.created_by != null && Number(assessmentRow.created_by) === Number(req.user.id);

  if (!isCreator && !invite.rowCount && !enr.rowCount && !assign.rowCount && !instPkg.rowCount) {
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

  let institutionObj = null;
  if (instId) {
    const instRes = await query(
      `SELECT id, name, logo_url, logo_badge, code FROM institutions WHERE id = $1`,
      [instId]
    ).catch(() => ({ rows: [] }));
    if (instRes.rows.length > 0) {
      const row = instRes.rows[0];
      institutionObj = {
        id: row.id,
        name: row.name,
        logo_url: row.logo_url || '',
        logo_badge: row.logo_badge || (row.name ? row.name.substring(0, 3).toUpperCase() : 'INST'),
        code: row.code || '',
      };
    }
  }

  res.json({
    assessment: {
      ...assessmentRow,
      access_type: invite.rowCount ? 'invite' : 'enrollment',
      series_slug,
      institution: institutionObj,
      institution_id: institutionObj?.id || null,
      institution_name: institutionObj?.name || null,
      institution_logo_url: institutionObj?.logo_url || null,
      institution_logo_badge: institutionObj?.logo_badge || null,
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
              COALESCE(NULLIF(q.topic, ''), c.name) AS topic,
              COALESCE(q.chapter_id, c.id) AS chapter_id,
              COALESCE(NULLIF(q.subject, ''), subj.name) AS subject,
              COALESCE(q.subject_id, subj.id) AS subject_id
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

  const attRes = await query(
    `SELECT (
       (SELECT COUNT(*)::int FROM attempts WHERE assessment_id = $1) +
       (SELECT COUNT(*)::int FROM test_attempts WHERE test_id = $1)
     ) AS attempt_count`,
    [id]
  );
  const attemptCount = Number(attRes.rows[0]?.attempt_count || 0);

  res.json({
    assessment: {
      ...a.rows[0],
      attempt_count: attemptCount,
      is_locked: attemptCount > 0,
    },
    sections: sections.rows,
    questions: questions.rows,
    invites: invites.rows,
    attempt_count: attemptCount,
    is_locked: attemptCount > 0,
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
  const { title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, available_from, available_until, recommended_ebook_id } =
    req.body;

  const cleanPassingMarks = (passing_marks !== undefined && passing_marks !== null && passing_marks !== '' && !isNaN(Number(passing_marks)))
    ? Number(passing_marks)
    : 0;

  const cleanEbookId = (recommended_ebook_id !== undefined && recommended_ebook_id !== null && recommended_ebook_id !== '' && !isNaN(Number(recommended_ebook_id)))
    ? Number(recommended_ebook_id)
    : null;

  const result = await query(
    `INSERT INTO assessments
       (title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, available_from, available_until, recommended_ebook_id, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
     RETURNING *`,
    [title, description, instructions, duration_minutes || 180, cleanPassingMarks, max_violations || 5, result_visible !== false, available_from || null, available_until || null, cleanEbookId, req.user.id]
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
  const fields = { ...req.body };

  if (fields.passing_marks !== undefined) {
    fields.passing_marks = (fields.passing_marks === '' || fields.passing_marks === null || isNaN(Number(fields.passing_marks)))
      ? 0
      : Number(fields.passing_marks);
  }

  if (fields.recommended_ebook_id !== undefined) {
    fields.recommended_ebook_id = (fields.recommended_ebook_id === '' || fields.recommended_ebook_id === null || isNaN(Number(fields.recommended_ebook_id)))
      ? null
      : Number(fields.recommended_ebook_id);
  }

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
          `${item.phase || 'CONCEPT_BUILDING'} Phase - NEET / JEE Pattern ${item.type}`,
          'Authentic NEET / JEE pattern CBT test.',
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

export const duplicateAssessment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const original = await query('SELECT * FROM assessments WHERE id = $1', [id]);
  if (original.rowCount === 0) throw ApiError.notFound('Assessment not found');
  const a = original.rows[0];

  const duplicated = await withTransaction(async (client) => {
    // 1. Create duplicate assessment as draft
    const newTitle = `${a.title} (Draft Copy)`.slice(0, 200);
    const assessRes = await client.query(
      `INSERT INTO assessments
         (title, description, instructions, duration_minutes, passing_marks, max_violations,
          result_visible, is_published, negative_marking, negative_marks_per_wrong,
          available_from, available_until, recommended_ebook_id, created_by, test_type, preparation_phase, syllabus_text)
       VALUES ($1, $2, $3, $4, $5, $6, $7, false, $8, $9, $10, $11, $12, $13, $14, $15, $16)
       RETURNING *`,
      [
        newTitle,
        a.description,
        a.instructions,
        a.duration_minutes,
        a.passing_marks,
        a.max_violations,
        a.result_visible,
        a.negative_marking,
        a.negative_marks_per_wrong,
        a.available_from,
        a.available_until,
        a.recommended_ebook_id,
        req.user.id,
        a.test_type,
        a.preparation_phase,
        a.syllabus_text,
      ]
    );
    const newAssessment = assessRes.rows[0];

    // 2. Duplicate sections and map old section id -> new section id
    const oldSections = await client.query(
      'SELECT * FROM assessment_sections WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
      [id]
    );
    const sectionMap = new Map();
    for (const s of oldSections.rows) {
      const insSec = await client.query(
        `INSERT INTO assessment_sections (assessment_id, name, section_type, position, description)
         VALUES ($1, $2, $3, $4, $5) RETURNING id`,
        [newAssessment.id, s.name, s.section_type, s.position, s.description]
      );
      sectionMap.set(s.id, insSec.rows[0].id);
    }

    // 3. Duplicate questions preserving all fields, metadata, images, and sequence
    const oldQuestions = await client.query(
      'SELECT * FROM questions WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
      [id]
    );
    for (const q of oldQuestions.rows) {
      const newSectionId = q.section_id ? sectionMap.get(q.section_id) || null : null;
      await client.query(
        `INSERT INTO questions
           (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices,
            numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, position,
            starter_code, test_cases, language, bank_category, solution, image_url, solution_image_url,
            subject_id, chapter_id, difficulty, subject, topic, media, tables, extraction_meta,
            chapter, translations, original_question_number)
         VALUES
           ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31)`,
        [
          newAssessment.id,
          newSectionId,
          q.question_type,
          q.question_text,
          typeof q.options === 'string' ? q.options : JSON.stringify(q.options || []),
          q.correct_index,
          typeof q.correct_indices === 'string' ? q.correct_indices : JSON.stringify(q.correct_indices || []),
          q.numeric_answer,
          q.numerical_tolerance,
          q.assertion_text,
          q.reason_text,
          q.marks,
          q.position,
          q.starter_code,
          typeof q.test_cases === 'string' ? q.test_cases : JSON.stringify(q.test_cases || []),
          q.language,
          q.bank_category,
          q.solution,
          q.image_url,
          q.solution_image_url,
          q.subject_id,
          q.chapter_id,
          q.difficulty,
          q.subject,
          q.topic,
          typeof q.media === 'string' ? q.media : JSON.stringify(q.media || []),
          typeof q.tables === 'string' ? q.tables : JSON.stringify(q.tables || []),
          typeof q.extraction_meta === 'string' ? q.extraction_meta : JSON.stringify(q.extraction_meta || {}),
          q.chapter,
          typeof q.translations === 'string' ? q.translations : JSON.stringify(q.translations || {}),
          q.original_question_number || q.position,
        ]
      );
    }

    return newAssessment;
  });

  res.status(201).json({
    assessment: duplicated,
    message: 'Assessment duplicated successfully as a new draft. You can now freely reorder and insert questions.',
  });
});

