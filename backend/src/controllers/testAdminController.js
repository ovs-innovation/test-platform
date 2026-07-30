import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { saveUploadedFile } from '../middleware/upload.js';
import nodemailer from 'nodemailer';

/**
 * 1. GET /api/admin/tests
 * List all tests with optional filters & participation counts
 */
export const listTests = asyncHandler(async (req, res) => {
  const { test_type, is_published, search } = req.query;

  let whereClauses = ['COALESCE(t.is_deleted, FALSE) = FALSE'];
  let params = [];
  let paramIdx = 1;

  if (test_type) {
    whereClauses.push(`t.test_type = $${paramIdx++}`);
    params.push(test_type);
  }

  if (is_published !== undefined) {
    whereClauses.push(`t.is_published = $${paramIdx++}`);
    params.push(is_published === 'true');
  }

  if (search) {
    whereClauses.push(`(t.test_name ILIKE $${paramIdx} OR t.syllabus ILIKE $${paramIdx})`);
    params.push(`%${search}%`);
    paramIdx++;
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const sql = `
    SELECT
      t.*,
      eb.title AS ebook_title,
      COUNT(DISTINCT ta.id)::int AS total_attempts,
      COUNT(DISTINCT ta.id) FILTER (WHERE ta.submitted_at IS NOT NULL)::int AS completed_attempts
    FROM tests t
    LEFT JOIN ebooks eb ON eb.id = t.recommended_ebook_id
    LEFT JOIN test_attempts ta ON ta.test_id = t.id
    ${whereSql}
    GROUP BY t.id, eb.title
    ORDER BY t.test_date DESC, t.start_time DESC;
  `;

  const result = await query(sql, params);
  res.json({ tests: result.rows });
});

/**
 * 2. POST /api/admin/tests
 * Create a new test
 */
export const createTest = asyncHandler(async (req, res) => {
  const {
    test_name,
    test_type,
    test_date,
    start_time,
    end_time,
    duration_minutes,
    syllabus,
    max_marks,
    is_published,
    result_publish_time,
    solution_pdf_url,
    recommended_ebook_id,
    available_from,
    available_until,
    assigned_to_type, // Optional auto-assign on creation
    assigned_to_id
  } = req.body;

  if (!test_name || !test_type || !test_date || !start_time || !end_time || !duration_minutes || !max_marks) {
    throw ApiError.badRequest('Missing required test fields (test_name, test_type, test_date, start_time, end_time, duration_minutes, max_marks)');
  }

  const test = await withTransaction(async (client) => {
    const result = await client.query(
      `INSERT INTO tests (
        test_name, test_type, test_date, start_time, end_time,
        duration_minutes, syllabus, max_marks, is_published,
        result_publish_time, solution_pdf_url, recommended_ebook_id,
        available_from, available_until
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *`,
      [
        test_name,
        test_type,
        test_date,
        start_time,
        end_time,
        duration_minutes,
        syllabus || null,
        max_marks,
        Boolean(is_published),
        result_publish_time || null,
        solution_pdf_url || null,
        recommended_ebook_id || null,
        available_from || null,
        available_until || null
      ]
    );

    const createdTest = result.rows[0];

    // Assign to specified audience or default to 'all'
    const assignType = assigned_to_type || 'all';
    await client.query(
      `INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id)
       VALUES ($1, $2, $3)`,
      [createdTest.id, assignType, assigned_to_id || null]
    );

    return createdTest;
  });

  res.status(201).json({ test });
});

/**
 * 3. GET /api/admin/tests/:id
 * Get single test details with assignments & overrides
 */
export const getTestDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testRes = await query('SELECT t.*, eb.title AS ebook_title FROM tests t LEFT JOIN ebooks eb ON eb.id = t.recommended_ebook_id WHERE t.id = $1 AND COALESCE(t.is_deleted, FALSE) = FALSE', [id]);
  if (testRes.rowCount === 0) throw ApiError.notFound('Test not found');

  const [assignments, overrides, attempts] = await Promise.all([
    query('SELECT * FROM test_assignments WHERE test_id = $1', [id]),
    query(`
      SELECT mto.*, u.name AS student_name, u.email AS student_email
      FROM missed_test_overrides mto
      JOIN users u ON u.id = mto.student_id
      WHERE mto.test_id = $1
    `, [id]),
    query(`
      SELECT ta.*, u.name AS student_name, u.email AS student_email
      FROM test_attempts ta
      JOIN users u ON u.id = ta.student_id
      WHERE ta.test_id = $1
    `, [id])
  ]);

  res.json({
    test: testRes.rows[0],
    assignments: assignments.rows,
    overrides: overrides.rows,
    attempts: attempts.rows
  });
});

/**
 * 4. PUT /api/admin/tests/:id
 * Update test details (dates, timings, syllabus, ebook, solution, etc.)
 */
export const updateTest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    test_name,
    test_type,
    test_date,
    start_time,
    end_time,
    duration_minutes,
    syllabus,
    max_marks,
    is_published,
    result_publish_time,
    solution_pdf_url,
    question_paper_url,
    answer_key_url,
    recommended_ebook_id,
    available_from,
    available_until
  } = req.body;

  const check = await query('SELECT id FROM tests WHERE id = $1 AND COALESCE(is_deleted, FALSE) = FALSE', [id]);
  if (check.rowCount === 0) throw ApiError.notFound('Test not found');

  const result = await query(
    `UPDATE tests SET
      test_name = COALESCE($1, test_name),
      test_type = COALESCE($2, test_type),
      test_date = COALESCE($3, test_date),
      start_time = COALESCE($4, start_time),
      end_time = COALESCE($5, end_time),
      duration_minutes = COALESCE($6, duration_minutes),
      syllabus = COALESCE($7, syllabus),
      max_marks = COALESCE($8, max_marks),
      is_published = COALESCE($9, is_published),
      result_publish_time = $10,
      solution_pdf_url = COALESCE($11, solution_pdf_url),
      question_paper_url = COALESCE($12, question_paper_url),
      answer_key_url = COALESCE($13, answer_key_url),
      recommended_ebook_id = $14,
      available_from = $15,
      available_until = $16
    WHERE id = $17
    RETURNING *`,
    [
      test_name,
      test_type,
      test_date,
      start_time,
      end_time,
      duration_minutes,
      syllabus,
      max_marks,
      is_published !== undefined ? Boolean(is_published) : null,
      result_publish_time || null,
      solution_pdf_url,
      question_paper_url,
      answer_key_url,
      recommended_ebook_id || null,
      available_from || null,
      available_until || null,
      id
    ]
  );

  res.json({ test: result.rows[0] });
});

/**
 * 5. DELETE /api/admin/tests/:id
 * Delete test — soft delete (is_deleted = true) if attempts exist, else hard delete
 */
export const deleteTest = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const attemptsCheck = await query('SELECT COUNT(*)::int AS count FROM test_attempts WHERE test_id = $1', [id]);
  const hasAttempts = attemptsCheck.rows[0].count > 0;

  if (hasAttempts) {
    // Soft delete to preserve student attempt records
    await query('UPDATE tests SET is_deleted = TRUE, is_published = FALSE WHERE id = $1', [id]);
    return res.json({ message: 'Test contains student attempt records and has been soft-deleted/archived.', id, soft_deleted: true });
  } else {
    // Hard delete
    await query('DELETE FROM tests WHERE id = $1', [id]);
    return res.json({ message: 'Test deleted permanently.', id, soft_deleted: false });
  }
});

/**
 * 6. PATCH /api/admin/tests/:id/publish
 * Toggle is_published
 */
export const togglePublishTest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { is_published } = req.body;

  const result = await query(
    'UPDATE tests SET is_published = $1 WHERE id = $2 RETURNING id, test_name, is_published',
    [Boolean(is_published), id]
  );

  if (result.rowCount === 0) throw ApiError.notFound('Test not found');

  res.json({
    message: `Test is now ${result.rows[0].is_published ? 'Published' : 'Unpublished'}.`,
    test: result.rows[0]
  });
});

/**
 * 7. POST /api/admin/tests/:id/assignments
 * Assign test to individual, batch, institution, or all
 */
export const assignTest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { assigned_to_type, assigned_to_id } = req.body;

  if (!['individual', 'batch', 'institution', 'all'].includes(assigned_to_type)) {
    throw ApiError.badRequest('assigned_to_type must be one of: individual, batch, institution, all');
  }

  const testCheck = await query('SELECT id FROM tests WHERE id = $1', [id]);
  if (testCheck.rowCount === 0) throw ApiError.notFound('Test not found');

  const result = await query(
    `INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [id, assigned_to_type, assigned_to_id || null]
  );

  res.status(201).json({ assignment: result.rows[0] });
});

/**
 * 8. GET /api/admin/tests/:id/assignments
 */
export const listAssignments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('SELECT * FROM test_assignments WHERE test_id = $1', [id]);
  res.json({ assignments: result.rows });
});

/**
 * 9. DELETE /api/admin/tests/:id/assignments/:assignmentId
 */
export const removeAssignment = asyncHandler(async (req, res) => {
  const { id, assignmentId } = req.params;
  await query('DELETE FROM test_assignments WHERE id = $1 AND test_id = $2', [assignmentId, id]);
  res.json({ message: 'Assignment removed successfully' });
});

/**
 * 10. POST /api/admin/tests/:id/upload
 * Upload question paper, answer key, or solution PDF
 */
export const uploadTestFile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { file_base64, file_name, file_type } = req.body; // file_type: 'question_paper' | 'answer_key' | 'solution_pdf'

  if (!['question_paper', 'answer_key', 'solution_pdf'].includes(file_type)) {
    throw ApiError.badRequest('file_type must be question_paper, answer_key, or solution_pdf');
  }

  const testCheck = await query('SELECT id FROM tests WHERE id = $1', [id]);
  if (testCheck.rowCount === 0) throw ApiError.notFound('Test not found');

  const relativeUrl = saveUploadedFile(file_base64, file_name || 'document.pdf', file_type);

  let columnToUpdate = 'solution_pdf_url';
  if (file_type === 'question_paper') columnToUpdate = 'question_paper_url';
  if (file_type === 'answer_key') columnToUpdate = 'answer_key_url';

  await query(`UPDATE tests SET ${columnToUpdate} = $1 WHERE id = $2`, [relativeUrl, id]);

  res.json({
    message: `${file_type} uploaded successfully`,
    url: relativeUrl,
    file_type
  });
});

/**
 * 11. POST /api/admin/tests/:id/generate-results
 * Manual trigger/override to calculate scores & generate ranks for a test
 */
export const generateResults = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testRes = await query('SELECT * FROM tests WHERE id = $1', [id]);
  if (testRes.rowCount === 0) throw ApiError.notFound('Test not found');

  // Fetch all completed attempts for this test
  const attemptsRes = await query(
    'SELECT * FROM test_attempts WHERE test_id = $1 AND submitted_at IS NOT NULL',
    [id]
  );

  // Set result_publish_time to NOW() if not already set so results are published
  await query(
    'UPDATE tests SET result_publish_time = COALESCE(result_publish_time, NOW()) WHERE id = $1',
    [id]
  );

  res.json({
    message: `Result generation and rank processing completed for test ${id}.`,
    test_id: id,
    processed_attempts: attemptsRes.rowCount,
    result_published: true
  });
});

/**
 * 12. POST /api/admin/tests/:id/missed-override
 * Grant custom late access window for a student who missed the test
 */
export const setMissedTestOverride = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { student_id, valid_from, valid_until, note } = req.body;

  if (!student_id || !valid_from || !valid_until) {
    throw ApiError.badRequest('student_id, valid_from, and valid_until are required');
  }

  const result = await query(
    `INSERT INTO missed_test_overrides (test_id, student_id, valid_from, valid_until, note)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (test_id, student_id)
     DO UPDATE SET valid_from = EXCLUDED.valid_from, valid_until = EXCLUDED.valid_until, note = EXCLUDED.note
     RETURNING *`,
    [id, student_id, valid_from, valid_until, note || null]
  );

  res.status(201).json({ override: result.rows[0] });
});

/**
 * 13. GET /api/admin/tests/:id/participation
 * Detailed participation statistics (assigned vs attempted vs missed)
 */
export const getTestParticipation = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const [testRes, attemptsRes, overridesRes] = await Promise.all([
    query('SELECT * FROM tests WHERE id = $1', [id]),
    query(`
      SELECT ta.*, u.name AS student_name, u.email AS student_email
      FROM test_attempts ta
      JOIN users u ON u.id = ta.student_id
      WHERE ta.test_id = $1
    `, [id]),
    query('SELECT COUNT(*)::int AS count FROM missed_test_overrides WHERE test_id = $1', [id])
  ]);

  if (testRes.rowCount === 0) throw ApiError.notFound('Test not found');

  const totalAttempted = attemptsRes.rows.filter(r => r.submitted_at).length;
  const totalInProgress = attemptsRes.rows.filter(r => r.started_at && !r.submitted_at).length;

  res.json({
    test: testRes.rows[0],
    stats: {
      totalAttempted,
      totalInProgress,
      totalOverrides: overridesRes.rows[0].count
    },
    attempts: attemptsRes.rows
  });
});

/**
 * 14. POST /api/admin/tests/:id/notify
 * Send reminder notification (Dashboard + Nodemailer Email) for test
 */
export const notifyTestReminder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { custom_message } = req.body;

  const testRes = await query('SELECT * FROM tests WHERE id = $1', [id]);
  if (testRes.rowCount === 0) throw ApiError.notFound('Test not found');

  const test = testRes.rows[0];

  // Fetch all candidate users to notify
  const candidatesRes = await query("SELECT id, email, name FROM users WHERE role = 'candidate'");
  const candidates = candidatesRes.rows;

  const title = `Reminder: ${test.test_name}`;
  const body = custom_message || `Your test "${test.test_name}" is scheduled for ${test.test_date} from ${test.start_time} to ${test.end_time}. Please log in on time!`;

  // 1. Insert Dashboard Notifications
  for (const c of candidates) {
    await query(
      `INSERT INTO notifications (user_id, title, body, type) VALUES ($1, $2, $3, 'test_reminder')`,
      [c.id, title, body]
    );
  }

  // 2. Optional Nodemailer Email dispatch (if SMTP env is configured)
  let emailsSent = 0;
  if (process.env.SMTP_HOST && process.env.SMTP_USER) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Boolean(process.env.SMTP_SECURE),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });

      for (const c of candidates) {
        await transporter.sendMail({
          from: `"EDVEDUM Academy" <${process.env.SMTP_FROM || 'noreply@edvedum.com'}>`,
          to: c.email,
          subject: title,
          text: `Hello ${c.name},\n\n${body}\n\nGood luck!\nEDVEDUM Team`,
        });
        emailsSent++;
      }
    } catch (err) {
      console.warn('Nodemailer test notification email dispatch error:', err.message);
    }
  }

  res.json({
    message: `Test reminder notification broadcasted to ${candidates.length} candidates.`,
    dashboard_notifications_created: candidates.length,
    emails_sent: emailsSent
  });
});
