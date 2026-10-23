import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { isNeetTest, resolveQuestionNeetMeta, normalizeNeetAssessmentPayload } from '../utils/neetPattern.js';
import { invalidateExamPaperCache } from '../services/examCacheService.js';

export async function sendStudentAssignmentNotifications(testId, testName, assigned_to_type, assigned_to_id) {
  try {
    const notifTitle = `New Test Assigned: ${testName}`;
    const notifBody = `A new test "${testName}" has been assigned to your portal. Go to My Tests to start!`;

    let targetStudentIds = [];

    if (assigned_to_type === 'individual' && assigned_to_id) {
      targetStudentIds = [Number(assigned_to_id)];
    } else if (assigned_to_type === 'batch' && assigned_to_id) {
      const batchStudents = await query(
        'SELECT id FROM users WHERE batch_id = $1 AND role = $2',
        [assigned_to_id, 'candidate']
      );
      targetStudentIds = batchStudents.rows.map((s) => s.id);
    } else if (assigned_to_type === 'institution' && assigned_to_id) {
      const instStudents = await query(
        'SELECT id FROM users WHERE institution_id = $1 AND role = $2',
        [assigned_to_id, 'candidate']
      );
      targetStudentIds = instStudents.rows.map((s) => s.id);
    } else if (assigned_to_type === 'all') {
      const allStudents = await query(
        'SELECT id FROM users WHERE role = $1',
        ['candidate']
      );
      targetStudentIds = allStudents.rows.map((s) => s.id);
    }

    const uniqueIds = Array.from(new Set(targetStudentIds.filter((id) => id && !isNaN(Number(id)))));

    for (const sid of uniqueIds) {
      await query(
        `INSERT INTO notifications (user_id, title, body, type, created_at)
         VALUES ($1, $2, $3, 'test_assigned', NOW())`,
        [sid, notifTitle, notifBody]
      ).catch(() => { });
    }
  } catch (err) {
    console.error('Failed to deliver candidate notifications for test assignment:', err.message);
  }
}

export async function notifyStudentsAboutTestEbook(testId, testName, ebookId) {
  if (!ebookId || !testId) return;
  try {
    const ebookRes = await query('SELECT id, title FROM ebooks WHERE id = $1', [ebookId]);
    if (!ebookRes.rowCount) return;
    const ebookTitle = ebookRes.rows[0].title || 'Study Material';

    // 1. Students enrolled in any test series that includes this test
    const seriesStudents = await query(
      `SELECT DISTINCT se.user_id AS id
       FROM student_enrollments se
       JOIN test_series_tests tst ON tst.series_id = se.test_series_id
       JOIN users u ON u.id = se.user_id
       WHERE tst.test_id = $1 AND se.status = 'active' AND u.role = 'candidate'`,
      [testId]
    );

    // 2. Students in batches or institutions assigned to any test series containing this test
    const seriesAssignedStudents = await query(
      `SELECT DISTINCT u.id
       FROM users u
       JOIN test_series_assignments tsa ON (
         (tsa.assigned_to_type = 'batch' AND u.batch_id = tsa.assigned_to_id)
         OR (tsa.assigned_to_type = 'institution' AND u.institution_id = tsa.assigned_to_id)
         OR (tsa.assigned_to_type = 'all')
       )
       JOIN test_series_tests tst ON tst.series_id = tsa.test_series_id
       WHERE tst.test_id = $1 AND u.role = 'candidate'`,
      [testId]
    );

    // 3. Students assigned via test_assignments
    const directAssignedStudents = await query(
      `SELECT DISTINCT u.id
       FROM test_assignments tas
       JOIN users u ON (
         (tas.assigned_to_type IN ('student', 'individual') AND u.id = tas.assigned_to_id)
         OR (tas.assigned_to_type = 'batch' AND u.batch_id = tas.assigned_to_id)
         OR (tas.assigned_to_type = 'institution' AND u.institution_id = tas.assigned_to_id)
         OR (tas.assigned_to_type = 'all')
       )
       WHERE tas.test_id = $1 AND u.role = 'candidate'`,
      [testId]
    );

    const allTargetIds = new Set([
      ...seriesStudents.rows.map((r) => r.id),
      ...seriesAssignedStudents.rows.map((r) => r.id),
      ...directAssignedStudents.rows.map((r) => r.id),
    ]);

    const notifTitle = `New Study Material: ${ebookTitle}`;
    const notifBody = `Study material / notes "${ebookTitle}" have been assigned for test "${testName}". Access it now in Study Material!`;

    for (const uid of allTargetIds) {
      if (!uid || isNaN(Number(uid))) continue;
      await query(
        `INSERT INTO notifications (user_id, title, body, type, created_at)
         VALUES ($1, $2, $3, 'ebook_assigned', NOW())`,
        [uid, notifTitle, notifBody]
      ).catch(() => {});
    }
  } catch (err) {
    console.error('Failed to notify students about test ebook:', err.message);
  }
}
import { saveUploadedFile } from '../middleware/upload.js';
import { sendEmail } from '../utils/email.js';
import { delCache } from '../config/redis.js';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { parsePdfQuestions, parseAnswerKeyOnly, parseAnswerKeyAndSolutions } from '../utils/pdfQuestionParser.js';
import { parseQuestionsFromPdf } from '../utils/pdfQuestions.js';
import { parseNumericAnswers, classifyBiologyQuestionsWithGemini } from '../utils/geminiVisionExtractor.js';
import { inferSubjectAndTopic, inferSubjectFromTopic } from '../utils/subjectClassifier.js';
import { stripHeadersAndFooters, formatQuestionStructure } from '../utils/questionFormatter.js';

export async function syncFreeTestSeries(test) {
  if (!test) return;
  try {
    const isFree = /free|diagnostic/i.test(`${test.test_name || ''} ${test.title || ''} ${test.test_type || ''}`);
    if (!isFree) return;
    const name = test.test_name || test.title;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 150);
    const examType = /jee/i.test(`${test.test_type} ${name}`) ? 'JEE' : (/neet\s*pg|pg\s*neet/i.test(`${test.test_type} ${name}`) ? 'NEET PG' : 'NEET');
    const isActive = Boolean(test.is_published && !test.is_deleted);

    const existing = await query(
      'SELECT id FROM test_series WHERE slug = $1 OR id IN (SELECT series_id FROM test_series_tests WHERE test_id = $2)',
      [slug, test.id]
    );

    let seriesId;
    if (existing.rowCount > 0) {
      seriesId = existing.rows[0].id;
      await query(
        `UPDATE test_series SET
          title = $1,
          is_active = $2,
          updated_at = NOW()
         WHERE id = $3`,
        [name, isActive, seriesId]
      );
    } else {
      const res = await query(
        `INSERT INTO test_series (
          title, slug, description, price, validity_days, exam_type, test_count,
          planned_tests, is_active, is_featured, is_free, display_order,
          target_class, target_year, program_type, created_at, updated_at
        ) VALUES (
          $1, $2,
          $3,
          0.00, 365, $4, 1, 1, $5, true, true, 0,
          'Class 12', '2027', 'One Year', COALESCE($6, NOW()), NOW()
        ) RETURNING id`,
        [
          name,
          slug,
          test.syllabus || 'Full-length authentic CBT format diagnostic mock test with live countdown timer, question palette, and instant All India Rank.',
          examType,
          isActive,
          test.created_at || new Date()
        ]
      );
      seriesId = res.rows[0].id;
    }

    await query(
      `INSERT INTO test_series_tests (series_id, test_id)
       VALUES ($1, $2)
       ON CONFLICT DO NOTHING`,
      [seriesId, test.id]
    );

    await delCache('cache:public_test_series:*').catch(() => { });
  } catch (err) {
    console.warn('[syncFreeTestSeries error]', err.message);
  }
}

/**
 * 1. GET /api/admin/tests
 * List all tests with optional filters & participation counts
 */
export const listTests = asyncHandler(async (req, res) => {
  const { test_type, is_published, search } = req.query;

  let whereClauses = [
    'COALESCE(t.is_deleted, FALSE) = FALSE',
    'COALESCE(t.is_personal, FALSE) = FALSE',
    "COALESCE(t.type, 'regular') NOT IN ('ai_weak_topic', 'mistake_book', 'personal', 'student_practice')",
    "t.test_name NOT ILIKE '%Weak Topic%'",
    "t.test_name NOT ILIKE '%Mistake Book%'",
    "t.test_name NOT ILIKE 'AI Booster%'",
    "t.test_name NOT ILIKE 'AI Improvement%'",
    "(t.created_by IS NULL OR t.created_by NOT IN (SELECT id FROM users WHERE role = 'candidate'))"
  ];
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
  const now = new Date();
  const enhancedRows = result.rows.map((row) => {
    let isLive = Boolean(row.is_live);
    if (!isLive && row.test_date) {
      const dateStr = String(row.test_date).includes('T') ? String(row.test_date).split('T')[0] : String(row.test_date).slice(0, 10);
      const startTime = row.start_time ? String(row.start_time).slice(0, 8) : '00:00:00';
      const endTime = row.end_time ? String(row.end_time).slice(0, 8) : '23:59:59';
      const startDt = new Date(`${dateStr}T${startTime}`);
      const endDt = new Date(`${dateStr}T${endTime}`);
      if (!isNaN(startDt.getTime()) && !isNaN(endDt.getTime()) && now >= startDt && now <= endDt) {
        isLive = true;
      }
      const startDtUtc = new Date(`${dateStr}T${startTime}Z`);
      const endDtUtc = new Date(`${dateStr}T${endTime}Z`);
      if (!isNaN(startDtUtc.getTime()) && !isNaN(endDtUtc.getTime()) && now >= startDtUtc && now <= endDtUtc) {
        isLive = true;
      }
    }
    if (!isLive && row.available_from) {
      const fromDt = new Date(row.available_from);
      const untilDt = row.available_until ? new Date(row.available_until) : null;
      if (!isNaN(fromDt.getTime()) && now >= fromDt && (!untilDt || now <= untilDt)) {
        isLive = true;
      }
    }
    return {
      ...row,
      is_live: isLive,
    };
  });
  res.json({ tests: enhancedRows });
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

  if (!test_name || !test_type || !test_date || !start_time || !end_time || !duration_minutes) {
    throw ApiError.badRequest('Missing required test fields (test_name, test_type, test_date, start_time, end_time, duration_minutes)');
  }

  // In JEE/NEET CBT exams, max marks are optional and automatically determined by questions or default standard patterns (720 for NEET, 300 for JEE)
  const resolvedMaxMarks = (max_marks !== undefined && max_marks !== null && max_marks !== '' && !isNaN(Number(max_marks)) && Number(max_marks) > 0)
    ? Number(max_marks)
    : (String(test_type || '').toUpperCase().includes('NEET') ? 720 : 300);

  const test = await withTransaction(async (client) => {
    const resolvedIsLive = req.body.is_live !== undefined ? Boolean(req.body.is_live) : false;
    const result = await client.query(
      `INSERT INTO tests (
        test_name, title, test_type, test_date, start_time, end_time,
        duration_minutes, syllabus, max_marks, is_published, status,
        result_publish_time, solution_pdf_url, recommended_ebook_id,
        available_from, available_until, is_live
      ) VALUES ($1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      RETURNING *`,
      [
        test_name,
        test_type,
        test_date,
        start_time,
        end_time,
        duration_minutes,
        syllabus || null,
        resolvedMaxMarks,
        Boolean(is_published),
        is_published ? 'published' : 'draft',
        result_publish_time || null,
        solution_pdf_url || null,
        recommended_ebook_id ? parseInt(recommended_ebook_id, 10) : null,
        available_from || null,
        available_until || null,
        resolvedIsLive
      ]
    );

    const createdTest = result.rows[0];

    // Assign to specified audience if explicitly provided
    if (assigned_to_type) {
      await client.query(
        `INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id)
         VALUES ($1, $2, $3)`,
        [createdTest.id, assigned_to_type, assigned_to_id || null]
      );
      sendStudentAssignmentNotifications(createdTest.id, createdTest.test_name || createdTest.title || 'Test', assigned_to_type, assigned_to_id).catch(() => { });
    }

    return createdTest;
  });

  syncFreeTestSeries(test).catch(() => { });
  if (test && test.recommended_ebook_id) {
    notifyStudentsAboutTestEbook(test.id, test.test_name || test.title || 'Test', test.recommended_ebook_id).catch(() => {});
  }

  res.status(201).json({ test });
});

/**
 * 3. GET /api/admin/tests/:id
 * Get single test details with assignments & overrides
 */
export const getTestDetails = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const testRes = await query(`
    SELECT t.*, eb.title AS ebook_title 
    FROM tests t 
    LEFT JOIN ebooks eb ON eb.id = t.recommended_ebook_id 
    WHERE t.id = $1 
      AND COALESCE(t.is_deleted, FALSE) = FALSE
      AND COALESCE(t.is_personal, FALSE) = FALSE
      AND COALESCE(t.type, 'regular') NOT IN ('ai_weak_topic', 'mistake_book', 'personal', 'student_practice')
  `, [id]);
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

  const check = await query('SELECT id, recommended_ebook_id, test_name, title FROM tests WHERE id = $1 AND COALESCE(is_deleted, FALSE) = FALSE', [id]);
  if (check.rowCount === 0) throw ApiError.notFound('Test not found');

  const cleanDate = test_date ? String(test_date).split('T')[0] : null;
  const cleanDuration = duration_minutes !== undefined && duration_minutes !== null ? parseInt(duration_minutes, 10) : null;
  const cleanMarks = max_marks !== undefined && max_marks !== null && max_marks !== '' && !isNaN(Number(max_marks)) ? parseInt(max_marks, 10) : null;

  const result = await query(
    `UPDATE tests SET
      test_name = COALESCE($1, test_name),
      title = COALESCE($1, title),
      test_type = COALESCE($2, test_type),
      test_date = COALESCE($3, test_date),
      start_time = COALESCE($4, start_time),
      end_time = COALESCE($5, end_time),
      duration_minutes = COALESCE($6, duration_minutes),
      syllabus = COALESCE($7, syllabus),
      max_marks = COALESCE($8, max_marks),
      is_published = COALESCE($9, is_published),
      status = CASE WHEN $9 IS NULL THEN status WHEN $9 = true THEN 'published' ELSE 'draft' END,
      result_publish_time = $10,
      solution_pdf_url = COALESCE($11, solution_pdf_url),
      question_paper_url = COALESCE($12, question_paper_url),
      answer_key_url = COALESCE($13, answer_key_url),
      recommended_ebook_id = $14,
      available_from = $15,
      available_until = $16,
      is_live = COALESCE($17, is_live),
      updated_at = NOW()
    WHERE id = $18
    RETURNING *`,
    [
      test_name || null,
      test_type || null,
      cleanDate,
      start_time || null,
      end_time || null,
      cleanDuration,
      syllabus !== undefined ? syllabus : null,
      cleanMarks,
      is_published !== undefined ? Boolean(is_published) : null,
      result_publish_time || null,
      solution_pdf_url !== undefined ? solution_pdf_url : null,
      question_paper_url !== undefined ? question_paper_url : null,
      answer_key_url !== undefined ? answer_key_url : null,
      recommended_ebook_id ? parseInt(recommended_ebook_id, 10) : null,
      available_from || null,
      available_until || null,
      req.body.is_live !== undefined ? Boolean(req.body.is_live) : null,
      id
    ]
  );

  if (result.rows[0]) {
    syncFreeTestSeries(result.rows[0]).catch(() => { });
    const newEbookId = result.rows[0].recommended_ebook_id ? Number(result.rows[0].recommended_ebook_id) : null;
    const oldEbookId = check.rows[0]?.recommended_ebook_id ? Number(check.rows[0].recommended_ebook_id) : null;
    if (newEbookId && newEbookId !== oldEbookId) {
      notifyStudentsAboutTestEbook(id, result.rows[0].test_name || result.rows[0].title || 'Test', newEbookId).catch(() => {});
    }
  }

  await invalidateExamPaperCache(id);
  res.json({ test: result.rows[0] });
});

/**
 * 4b. PATCH /api/admin/tests/:id/toggle-live
 * 1-Click Toggle: Set test is_live to true/false
 */
export const toggleTestLive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const current = await query('SELECT id, is_live, test_name FROM tests WHERE id = $1', [id]);
  if (!current.rowCount) throw ApiError.notFound('Test not found');
  const nextVal = !Boolean(current.rows[0].is_live);
  const updated = await query('UPDATE tests SET is_live = $1, updated_at = NOW() WHERE id = $2 RETURNING *', [nextVal, id]);
  res.json({ test: updated.rows[0], is_live: nextVal, message: `Test live status set to ${nextVal ? 'LIVE' : 'OFFLINE'}` });
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
    await query('UPDATE test_series SET is_active = FALSE WHERE id IN (SELECT series_id FROM test_series_tests WHERE test_id = $1) AND price = 0', [id]).catch(() => { });
    await delCache('cache:public_test_series:*').catch(() => { });
    return res.json({ message: 'Test contains student attempt records and has been soft-deleted/archived.', id, soft_deleted: true });
  } else {
    // Hard delete
    await query('DELETE FROM test_series WHERE price = 0 AND id IN (SELECT series_id FROM test_series_tests WHERE test_id = $1)', [id]).catch(() => { });
    await query('DELETE FROM tests WHERE id = $1', [id]);
    await delCache('cache:public_test_series:*').catch(() => { });
    await invalidateExamPaperCache(id);
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
    'UPDATE tests SET is_published = $1 WHERE id = $2 RETURNING *',
    [Boolean(is_published), id]
  );

  if (result.rowCount === 0) throw ApiError.notFound('Test not found');

  if (result.rows[0]) {
    syncFreeTestSeries(result.rows[0]).catch(() => { });
  }

  await invalidateExamPaperCache(id);
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

  const testCheck = await query('SELECT id, test_name FROM tests WHERE id = $1', [id]);
  if (testCheck.rowCount === 0) throw ApiError.notFound('Test not found');
  const testName = testCheck.rows[0].test_name || 'Test';

  // Replace existing audience assignments for this test
  await query('DELETE FROM test_assignments WHERE test_id = $1', [id]);

  const result = await query(
    `INSERT INTO test_assignments (test_id, assigned_to_type, assigned_to_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [id, assigned_to_type, assigned_to_id || null]
  );

  // Send notifications based on assignment target
  if (assigned_to_type === 'institution' && assigned_to_id) {
    await query(
      `INSERT INTO institution_notifications (institution_id, title, message, type, target_type, target_id)
       VALUES ($1, $2, $3, 'test_assigned', 'test', $4)`,
      [
        assigned_to_id,
        'New Test Assigned by Admin',
        `Admin assigned test "${testName}" to your institution.`,
        id,
      ]
    ).catch((err) => console.error('Failed to create institution notification:', err));
  } else if (assigned_to_type === 'all') {
    const instRes = await query('SELECT id FROM institutions WHERE is_active = TRUE');
    for (const inst of instRes.rows) {
      await query(
        `INSERT INTO institution_notifications (institution_id, title, message, type, target_type, target_id)
         VALUES ($1, $2, $3, 'test_assigned', 'test', $4)`,
        [
          inst.id,
          'New Global Test Assigned',
          `Admin assigned test "${testName}" to all partner institutions.`,
          id,
        ]
      ).catch(() => { });
    }
  }

  // Deliver notifications to all targeted candidates
  await sendStudentAssignmentNotifications(id, testName, assigned_to_type, assigned_to_id);

  const testFull = await query('SELECT recommended_ebook_id FROM tests WHERE id = $1', [id]);
  if (testFull.rows[0]?.recommended_ebook_id) {
    notifyStudentsAboutTestEbook(id, testName, testFull.rows[0].recommended_ebook_id).catch(() => {});
  }

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
 * Persist an array of structured questions into an assessment/test
 */
export async function persistExtractedQuestionsToAssessment(id, parsedQs, {
  includeAnswers = true,
  relativeUrl = '',
  extractedBy = 'gemini-vision',
  pdfExtractionWarnings = []
} = {}) {
  let extractedCount = parsedQs.length;
  let reviewWarnings = parsedQs.filter((q) => q.needs_review || q.extraction?.needsReview).map((q) => q.review_reason || `Question ${q.questionNumber || q.line}: Needs manual review.`);
  if (pdfExtractionWarnings && pdfExtractionWarnings.length > 0) {
    reviewWarnings.push(...pdfExtractionWarnings);
  }

  if (relativeUrl) {
    await query(
      'UPDATE tests SET question_paper_url = COALESCE(question_paper_url, $1), updated_at = NOW() WHERE id = $2',
      [relativeUrl, id]
    );
    await query(
      'UPDATE assessments SET question_paper_url = COALESCE(question_paper_url, $1), updated_at = NOW() WHERE id = $2',
      [relativeUrl, id]
    ).catch(() => { });
  }

  if (reviewWarnings.length > 0) {
    console.warn(`[PDF Import Warning] ${reviewWarnings.length} warning(s)/flag(s):`, reviewWarnings);
  }

  const currentTestRes = await query('SELECT test_name, syllabus FROM tests WHERE id = $1', [id]);
  const currentAssessmentRes = await query('SELECT title, syllabus_text, subject FROM assessments WHERE id = $1', [id]).catch(() => ({ rows: [] }));
  const currentTest = currentTestRes.rows[0] || {};
  const currentAssessment = currentAssessmentRes.rows[0] || {};
  const testTitle = currentAssessment.title || currentTest.test_name || '';
  const testSyllabus = currentAssessment.syllabus_text || currentTest.syllabus || '';

  let calcTotalMarks = 0;
  let savedCount = 0;
  const detectedSubjects = new Set();
  const extractedQuestionsJson = [];

  const sortedParsedQs = [...parsedQs].sort((a, b) => {
    const numA = Number(a.questionNumber) || 0;
    const numB = Number(b.questionNumber) || 0;
    if (numA !== numB) return numA - numB;
    return 0;
  });

  if (sortedParsedQs.length === 0) {
    console.warn(`[PDF Import] No parsed questions to persist for assessment ${id}. Existing questions retained.`);
    return {
      extractedCount: 0,
      extractedQuestionsJson: [],
      reviewWarnings: ['No valid questions could be extracted from the uploaded document.'],
      savedCount: 0,
    };
  }

  const isNeet = String(testTitle).toUpperCase().includes('NEET') ||
                 String(testSyllabus).toUpperCase().includes('NEET') ||
                 sortedParsedQs.length === 180 ||
                 sortedParsedQs.some((q) => String(q.subject || '').toUpperCase().includes('BIO') || String(q.bank_category || '').toUpperCase().includes('BIO'));

  const isJeeTest = String(testTitle).toUpperCase().includes('JEE') ||
                    String(testSyllabus).toUpperCase().includes('JEE') ||
                    (!isNeet && (sortedParsedQs.length <= 80 || sortedParsedQs.length === 75 || sortedParsedQs.length === 90));

  // 1. Pre-pass: Resolve subject assignments dynamically based on question topic, content & test booklet layout
  const questionCandidates = [];
  for (let i = 0; i < sortedParsedQs.length; i++) {
    const q = sortedParsedQs[i];
    const qNum = Number(q.questionNumber || i + 1);
    const qText = q.question_text || q.questionText || q.question?.text || '';

    const classification = inferSubjectAndTopic({
      testName: testTitle,
      syllabus: testSyllabus,
      questionText: qText,
    });

    const topicSubject = inferSubjectFromTopic(q.topic) || inferSubjectFromTopic(q.chapter);
    let geminiSubject = (q.subject && q.subject !== 'General' && q.subject.trim() !== '') ? q.subject.trim() : null;
    if (geminiSubject) {
      const s = geminiSubject.toLowerCase();
      if (s.includes('physic')) geminiSubject = 'Physics';
      else if (s.includes('chem')) geminiSubject = 'Chemistry';
      else if (s.includes('botan')) geminiSubject = 'Botany';
      else if (s.includes('zool')) geminiSubject = 'Zoology';
      else if (s.includes('math')) geminiSubject = 'Mathematics';
    }

    const explicitCandidate = topicSubject || geminiSubject || (q.bank_category && q.bank_category !== 'General' ? q.bank_category : null) || (classification.subject !== 'General' ? classification.subject : null);

    questionCandidates.push({
      index: i,
      qNum,
      candidateSub: explicitCandidate,
      topicSubject,
      geminiSubject,
      classification,
      qText,
      q,
    });
  }

  // Detect section blocks dynamically (e.g. NEET 180 Qs -> 4 blocks of 45; JEE 75 Qs -> 3 blocks of 25)
  let blockDefinitions = [];
  const totalQs = sortedParsedQs.length;

  if (isNeet && totalQs >= 160 && totalQs <= 195) {
    blockDefinitions = [
      { start: 1, end: 45, defaultLetter: 'A' },
      { start: 46, end: 90, defaultLetter: 'B' },
      { start: 91, end: 135, defaultLetter: 'C' },
      { start: 136, end: 180, defaultLetter: 'D' },
    ];
  } else if (isNeet && totalQs > 195) {
    blockDefinitions = [
      { start: 1, end: 50, defaultLetter: 'A' },
      { start: 51, end: 100, defaultLetter: 'B' },
      { start: 101, end: 150, defaultLetter: 'C' },
      { start: 151, end: 200, defaultLetter: 'D' },
    ];
  } else if (isJeeTest && totalQs >= 70 && totalQs <= 80) {
    blockDefinitions = [
      { start: 1, end: 25, defaultLetter: 'A' },
      { start: 26, end: 50, defaultLetter: 'B' },
      { start: 51, end: 75, defaultLetter: 'C' },
    ];
  } else if (isJeeTest && totalQs > 80 && totalQs <= 100) {
    blockDefinitions = [
      { start: 1, end: 30, defaultLetter: 'A' },
      { start: 31, end: 60, defaultLetter: 'B' },
      { start: 61, end: 90, defaultLetter: 'C' },
    ];
  }

  // Tally candidate subjects within each block to identify each block's true subject
  const blockSubjectMap = new Map();
  for (const block of blockDefinitions) {
    const tally = { Physics: 0, Chemistry: 0, Botany: 0, Zoology: 0, Biology: 0, Mathematics: 0 };
    for (const item of questionCandidates) {
      if (item.qNum >= block.start && item.qNum <= block.end) {
        if (item.candidateSub && tally[item.candidateSub] !== undefined) {
          tally[item.candidateSub]++;
        }
      }
    }

    const bioTotal = tally.Botany + tally.Zoology + tally.Biology;
    let bestSub = 'General';
    let maxVotes = 0;

    for (const [sub, count] of Object.entries(tally)) {
      if (count > maxVotes) {
        maxVotes = count;
        bestSub = sub;
      }
    }

    if (bioTotal > tally.Physics && bioTotal > tally.Chemistry && bioTotal > tally.Mathematics) {
      bestSub = tally.Zoology > tally.Botany ? 'Zoology' : 'Botany';
    }

    blockSubjectMap.set(block, bestSub);
    console.log(`[PDF Import] Detected Block ${block.defaultLetter} (Q${block.start}-Q${block.end}): Subject = "${bestSub}" (tally: ${JSON.stringify(tally)})`);
  }

  const resolvedSubjects = [];
  for (let i = 0; i < sortedParsedQs.length; i++) {
    const cand = questionCandidates[i];
    const qNum = cand.qNum;

    let blockSub = null;
    let blockInfo = null;
    for (const block of blockDefinitions) {
      if (qNum >= block.start && qNum <= block.end) {
        blockSub = blockSubjectMap.get(block);
        blockInfo = block;
        break;
      }
    }

    let finalSub = cand.candidateSub;
    if (blockSub && blockSub !== 'General') {
      if (blockSub === 'Physics') {
        finalSub = 'Physics';
      } else if (blockSub === 'Chemistry') {
        finalSub = 'Chemistry';
      } else if (blockSub === 'Mathematics') {
        finalSub = 'Mathematics';
      } else if (blockSub === 'Botany' || blockSub === 'Zoology') {
        if (cand.candidateSub === 'Botany' || cand.candidateSub === 'Zoology') {
          finalSub = cand.candidateSub;
        } else {
          finalSub = blockSub;
        }
      }
    }

    if (!finalSub || finalSub === 'General') {
      finalSub = blockSub || cand.candidateSub || cand.classification.subject || 'General';
    }

    resolvedSubjects.push({
      qNum,
      subject: finalSub,
      classification: cand.classification,
      blockInfo,
    });
  }

  // 2. In NEET tests, ensure any questions remaining as "Biology" are divided into Botany and Zoology using Gemini AI
  if (isNeet) {
    const bioItems = [];
    const bioIndices = [];
    resolvedSubjects.forEach((item, idx) => {
      const lower = String(item.subject || '').toLowerCase();
      if (lower === 'biology' || (lower.includes('bio') && !lower.includes('botan') && !lower.includes('zool'))) {
        bioIndices.push(idx);
        bioItems.push(sortedParsedQs[idx]);
      }
    });

    if (bioItems.length > 0) {
      try {
        console.log(`[PDF Import] Classifying ${bioItems.length} Biology question(s) into Botany and Zoology using Gemini AI...`);
        const classified = await classifyBiologyQuestionsWithGemini(bioItems, testTitle);
        classified.forEach((res, k) => {
          const targetIdx = bioIndices[k];
          if (targetIdx !== undefined && res.subject) {
            resolvedSubjects[targetIdx].subject = res.subject;
            sortedParsedQs[targetIdx].subject = res.subject;
            sortedParsedQs[targetIdx].bank_category = res.subject;
          }
        });
      } catch (geminiErr) {
        console.warn('[PDF Import] Gemini classification fallback, using positional division:', geminiErr.message);
        const half = Math.ceil(bioIndices.length / 2);
        bioIndices.forEach((idx, k) => {
          const sub = k < half ? 'Botany' : 'Zoology';
          resolvedSubjects[idx].subject = sub;
          sortedParsedQs[idx].subject = sub;
          sortedParsedQs[idx].bank_category = sub;
        });
      }
    }
  }

  // If this is a NEET test, re-sequence questions to standard NEET order:
  // Physics (1-45), Chemistry (46-90), Botany (91-135), Zoology (136-180)
  if (isNeet && sortedParsedQs.length >= 70) {
    const subjectOrder = { Physics: 1, Chemistry: 2, Botany: 3, Zoology: 4, Biology: 5, General: 6 };
    
    // Combine into paired array for sorting
    const paired = sortedParsedQs.map((q, idx) => ({
      q,
      resolved: resolvedSubjects[idx] || {},
      origNum: q.questionNumber || idx + 1,
    }));

    paired.sort((a, b) => {
      const orderA = subjectOrder[a.resolved.subject] || 99;
      const orderB = subjectOrder[b.resolved.subject] || 99;
      if (orderA !== orderB) return orderA - orderB;
      return (a.origNum || 0) - (b.origNum || 0);
    });

    for (let k = 0; k < paired.length; k++) {
      const item = paired[k];
      const newPos = k + 1;
      item.q.original_question_number = item.origNum;
      item.q.questionNumber = newPos;
      sortedParsedQs[k] = item.q;
      resolvedSubjects[k] = item.resolved;
    }
  }

  // 3. Create or sync assessment_sections in assessment_sections table dynamically
  const sectionMapByName = {};
  if (isNeet) {
    await query('DELETE FROM assessment_sections WHERE assessment_id = $1', [id]).catch(() => {});
    const secRes = await query(
      `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES
       ($1, 'Section-A: Physics', 'technical_mcq', 1),
       ($1, 'Section-B: Chemistry', 'technical_mcq', 2),
       ($1, 'Section-C: Botany', 'technical_mcq', 3),
       ($1, 'Section-D: Zoology', 'technical_mcq', 4)
       RETURNING id, name, position`,
      [id]
    ).catch(() => ({ rows: [] }));
    for (const row of secRes.rows) {
      if (row.name.includes('Physics')) sectionMapByName['Physics'] = row.id;
      if (row.name.includes('Chemistry')) sectionMapByName['Chemistry'] = row.id;
      if (row.name.includes('Botany')) sectionMapByName['Botany'] = row.id;
      if (row.name.includes('Zoology')) sectionMapByName['Zoology'] = row.id;
    }
  } else if (isJeeTest) {
    await query('DELETE FROM assessment_sections WHERE assessment_id = $1', [id]).catch(() => {});
    const secRes = await query(
      `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES
       ($1, 'Section-A: Physics', 'technical_mcq', 1),
       ($1, 'Section-B: Chemistry', 'technical_mcq', 2),
       ($1, 'Section-C: Mathematics', 'technical_mcq', 3)
       RETURNING id, name, position`,
      [id]
    ).catch(() => ({ rows: [] }));
    for (const row of secRes.rows) {
      if (row.name.includes('Physics')) sectionMapByName['Physics'] = row.id;
      if (row.name.includes('Chemistry')) sectionMapByName['Chemistry'] = row.id;
      if (row.name.includes('Math')) sectionMapByName['Mathematics'] = row.id;
    }
  } else if (blockDefinitions.length > 0) {
    await query('DELETE FROM assessment_sections WHERE assessment_id = $1', [id]).catch(() => {});
    for (let bIdx = 0; bIdx < blockDefinitions.length; bIdx++) {
      const block = blockDefinitions[bIdx];
      const blockSub = blockSubjectMap.get(block) || 'General';
      const secLetter = block.defaultLetter || String.fromCharCode(65 + bIdx);
      const secName = `Section-${secLetter}: ${blockSub}`;
      const pos = bIdx + 1;

      const secRes = await query(
        `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
         VALUES ($1, $2, 'technical_mcq', $3)
         RETURNING id, name, position`,
        [id, secName, pos]
      ).catch(() => ({ rows: [] }));

      if (secRes.rows[0]) {
        sectionMapByName[blockSub] = secRes.rows[0].id;
        block.sectionId = secRes.rows[0].id;
      }
    }
  }

  for (let i = 0; i < sortedParsedQs.length; i++) {
    const q = sortedParsedQs[i];
    calcTotalMarks += (q.marks || 4);

    const qNum = Number(q.questionNumber || i + 1);
    const resolvedItem = resolvedSubjects[i] || {};
    const finalSubject = resolvedItem.subject || 'General';
    if (finalSubject && finalSubject !== 'General') detectedSubjects.add(finalSubject);

    const classification = resolvedItem.classification || inferSubjectAndTopic({
      testName: testTitle,
      syllabus: testSyllabus,
      questionText: q.question_text || q.questionText,
    });

    const geminiChapter = (q.chapter && q.chapter !== 'General' && q.chapter !== 'Unknown' && q.chapter.trim() !== '') ? q.chapter : null;
    const geminiTopic = (q.topic && q.topic !== 'General' && q.topic !== 'Unknown' && q.topic.trim() !== '') ? q.topic : null;

    const qTopic = geminiTopic || classification.topic;
    const finalChapter = geminiChapter || geminiTopic || qTopic || classification.topic || 'General Concepts';
    const finalTopic = geminiTopic || geminiChapter || qTopic || classification.topic || 'General Concepts';

    const qType = q.question_type || q.questionType || (q.numeric_answer != null || q.numericAnswer != null ? 'integer' : 'mcq');
    const isInteger = qType === 'integer' || qType === 'numerical';

    const rawNumericInput = q.acceptedAnswers?.length ? q.acceptedAnswers.join(' or ')
      : (q.accepted_answers?.length ? q.accepted_answers.join(' or ')
      : (q.numeric_answer ?? q.numericAnswer ?? q.correctAnswer));
    const parsedNumeric = parseNumericAnswers(rawNumericInput);
    const numericAnswer = (q.numeric_answer != null && !isNaN(Number(q.numeric_answer)))
      ? Number(q.numeric_answer)
      : parsedNumeric.primary;
    const acceptedAnswers = (Array.isArray(q.acceptedAnswers) && q.acceptedAnswers.length > 0)
      ? q.acceptedAnswers
      : (Array.isArray(q.accepted_answers) && q.accepted_answers.length > 0
        ? q.accepted_answers
        : (parsedNumeric.acceptedAnswers.length > 0 ? parsedNumeric.acceptedAnswers : (numericAnswer !== null ? [numericAnswer] : [])));

    const hasAnswer = Boolean(
      includeAnswers &&
      (q.correctAnswer || (q.correct_index !== null && q.correct_index !== undefined) || numericAnswer !== null) &&
      q.extraction?.hasAnswerKey !== false
    );
    const dbCorrectIndex = (hasAnswer && !isInteger && q.correct_index !== null && q.correct_index !== undefined)
      ? Number(q.correct_index)
      : null;
    const finalCorrectAnswer = hasAnswer
      ? (isInteger
          ? (q.correctAnswer || (acceptedAnswers.length > 1 ? acceptedAnswers.join(' or ') : (numericAnswer !== null ? String(numericAnswer) : null)))
          : (q.correctAnswer || (dbCorrectIndex !== null ? String.fromCharCode(65 + dbCorrectIndex) : null)))
      : null;

    const allOptionMediaUrls = new Set();
    const rawOpts = q.options || q.rawOptions || [];
    if (Array.isArray(rawOpts)) {
      rawOpts.forEach((o) => {
        if (typeof o === 'object' && o !== null) {
          if (o.image_url) allOptionMediaUrls.add(String(o.image_url).trim());
          if (Array.isArray(o.media)) {
            o.media.forEach((m) => {
              const u = typeof m === 'string' ? m : m?.url;
              if (u) allOptionMediaUrls.add(String(u).trim());
            });
          }
        }
      });
    }

    const solutionMediaUrl = q.solution_image_url || (q.explanation?.media && q.explanation.media.length > 0 ? q.explanation.media[0].url : null);

    const rawQuestionMedia = Array.isArray(q.question?.media) && q.question.media.length > 0
      ? q.question.media
      : (Array.isArray(q.media) ? q.media : []);

    const trueQuestionMedia = rawQuestionMedia.filter((m) => {
      if (!m) return false;
      const u = (typeof m === 'string' ? m : m?.url || '').trim();
      if (!u || allOptionMediaUrls.has(u)) return false;
      if (solutionMediaUrl && u === solutionMediaUrl) return false;
      if (typeof m === 'object') {
        if (m.type === 'solution' || m.type === 'explanation') return false;
        if (m.id && (String(m.id).startsWith('opt-') || String(m.id).includes('-opt-') || String(m.id).startsWith('sol-'))) return false;
        if (m.description && /diagram for option|option\s+[a-z0-9]\s+diagram/i.test(m.description)) return false;
      }
      return true;
    });

    const primaryMediaUrl = (q.image_url && !allOptionMediaUrls.has(String(q.image_url).trim()) && q.image_url !== solutionMediaUrl)
      ? q.image_url
      : (trueQuestionMedia.length > 0 ? (trueQuestionMedia[0].url || trueQuestionMedia[0]) : null);

    const mediaArrayJson = JSON.stringify(trueQuestionMedia);
    const tablesArrayJson = JSON.stringify(q.tables || []);
    const extractionMetaObj = {
      confidence: q.extraction?.confidence || (q.needs_review ? 0.60 : 0.96),
      needsReview: Boolean(q.extraction?.needsReview ?? q.needs_review),
      sourcePages: q.extraction?.sourcePages || [1],
      extractedBy: q.extraction?.extractedBy || extractedBy || 'gemini-vision',
      hasAnswerKey: hasAnswer,
      original_question_number: qNum,
      printed_question_number: qNum,
      original_subject: finalSubject,
      ...(acceptedAnswers.length > 1 ? { acceptedAnswers } : {}),
      ...(q.extraction?.visionBypassReason ? { visionBypassReason: q.extraction.visionBypassReason } : {}),
      ...(q.extraction?.reviewReason ? { reviewReason: q.extraction.reviewReason } : {})
    };
    const extractionMetaJson = JSON.stringify(extractionMetaObj);

    const questionMedia = Array.isArray(q.question?.media)
      ? q.question.media
      : (Array.isArray(q.media) && q.media.length > 0 ? q.media : (primaryMediaUrl ? [{
        id: `q${qNum}-img-1`,
        type: 'diagram',
        url: primaryMediaUrl,
        description: `Diagram for question ${qNum}`,
        sourcePage: q.extraction?.sourcePages?.[0] || 1,
      }] : []));

    const cleanOptionText = (raw) => {
      const s = String(raw || '').trim();
      const isMatchMapping = /(?:\(?[a-eA-E1-4ivx]+\)?\s*[-–—>:=]\s*\(?[a-zA-Z0-9ivxlcdmIVXLCDM]+\)?.*[,;]|[,;].*\(?[b-eB-E2-4ivx]+\)?\s*[-–—>:=]|(?:^|,)\s*\(?[a-eA-E1-4]\)\s*[-–—>:=]|^\([a-z]\)\s*[-–—]|\([iIvVxX]+\)[^,\n]+,\s*\([iIvVxX]+\))/i.test(s);
      if (isMatchMapping) {
        return stripHeadersAndFooters(s) || s;
      }
      const stripped = s.replace(/^(\([A-Za-z0-9]\)|[A-Za-z0-9][\.\)]|[A-Za-z0-9]:)\s*/, '').trim() || s;
      return stripHeadersAndFooters(stripped) || stripped;
    };

    let formattedOptionsWithMedia = [];
    if (!isInteger) {
      if (Array.isArray(q.options) && q.options.length > 0 && typeof q.options[0] === 'object' && q.options[0].key) {
        formattedOptionsWithMedia = q.options.map((opt) => ({
          key: String(opt.key).toUpperCase().trim(),
          text: cleanOptionText(opt.text),
          media: Array.isArray(opt.media) ? opt.media : [],
        }));
      } else if (Array.isArray(q.rawOptions)) {
        formattedOptionsWithMedia = q.rawOptions.map((opt, optIdx) => ({
          key: typeof opt === 'object' && opt.key ? String(opt.key).toUpperCase().trim() : String.fromCharCode(65 + optIdx),
          text: cleanOptionText(typeof opt === 'object' && opt.text !== undefined ? opt.text : opt),
          media: typeof opt === 'object' && Array.isArray(opt.media) ? opt.media : [],
        }));
      } else if (Array.isArray(q.options)) {
        formattedOptionsWithMedia = q.options.map((optText, optIdx) => ({
          key: String.fromCharCode(65 + optIdx),
          text: cleanOptionText(optText),
          media: [],
        }));
      }

      if (formattedOptionsWithMedia.length < 4) {
        q.needs_review = true;
      }
    }

    const optionsToStore = isInteger ? [] : (formattedOptionsWithMedia.length > 0 ? formattedOptionsWithMedia : (q.options || []));
    const rawQText = q.question?.text || q.question_text || q.questionText || '';
    const cleanFinalQText = formatQuestionStructure(stripHeadersAndFooters(rawQText)) || rawQText || `Question ${qNum}`;

    const cleanStr = (val) => typeof val === 'string' ? val.replace(/\0/g, '') : val;
    const qSecId = resolvedItem.blockInfo?.sectionId || sectionMapByName[finalSubject] || null;

    sortedParsedQs[i]._dbRow = {
      assessment_id: id,
      section_id: qSecId,
      question_text: cleanStr(cleanFinalQText),
      question_type: cleanStr(qType),
      options: cleanStr(JSON.stringify(optionsToStore)),
      correct_index: dbCorrectIndex,
      numeric_answer: numericAnswer,
      marks: q.marks || 4,
      position: qNum || i + 1,
      bank_category: cleanStr(finalSubject || 'General'),
      solution: cleanStr(formatQuestionStructure(stripHeadersAndFooters(q.explanation?.text || q.solution || (typeof q.explanation === 'string' ? q.explanation : '')))),
      subject: cleanStr(finalSubject),
      topic: cleanStr(finalTopic),
      chapter: cleanStr(finalChapter),
      image_url: cleanStr(primaryMediaUrl),
      solution_image_url: cleanStr(solutionMediaUrl),
      media: cleanStr(mediaArrayJson),
      tables: cleanStr(tablesArrayJson),
      extraction_meta: cleanStr(extractionMetaJson),
    };

    const rawExplanation = q.explanation?.text || (typeof q.explanation === 'string' ? q.explanation : (q.solution || ''));
    const explanationText = formatQuestionStructure(stripHeadersAndFooters(rawExplanation));
    const explanationMedia = Array.isArray(q.explanation?.media) ? q.explanation.media : [];

    extractedQuestionsJson.push({
      questionNumber: qNum,
      questionType: qType,
      question_type: qType,
      numericAnswer: numericAnswer,
      numeric_answer: numericAnswer,
      acceptedAnswers: acceptedAnswers,
      accepted_answers: acceptedAnswers,
      subject: finalSubject,
      chapter: finalChapter,
      topic: finalTopic,

      question: {
        text: q.question?.text || q.question_text || q.questionText || '',
        media: questionMedia,
      },

      options: isInteger ? [] : formattedOptionsWithMedia,

      explanation: {
        text: explanationText,
        media: explanationMedia,
      },

      tables: Array.isArray(q.tables) ? q.tables : [],
      correctAnswer: finalCorrectAnswer,
      extraction: extractionMetaObj,
    });
  }

  const dbRows = sortedParsedQs.map((q) => q._dbRow).filter(Boolean);
  if (dbRows.length > 0) {
    await query('DELETE FROM questions WHERE assessment_id = $1', [id]);
    const valueClauses = [];
    const bulkParams = [];
    let pIdx = 1;
    for (const r of dbRows) {
      valueClauses.push(
        `($${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++}, $${pIdx++})`
      );
      bulkParams.push(
        r.assessment_id, r.section_id, r.question_text, r.question_type || 'mcq', r.options,
        r.correct_index, r.marks, r.position, r.bank_category,
        r.solution, r.subject, r.topic, r.chapter,
        r.image_url, r.solution_image_url, r.media, r.tables, r.extraction_meta,
        r.numeric_answer
      );
    }
    const bulkSql = `INSERT INTO questions (
      assessment_id, section_id, question_text, question_type, options, correct_index, marks, position, bank_category, solution, subject, topic, chapter, image_url, solution_image_url, media, tables, extraction_meta, numeric_answer
    ) VALUES ${valueClauses.join(', ')}`;
    await query(bulkSql, bulkParams);
    savedCount = dbRows.length;
  }

  const primarySubject = detectedSubjects.size > 0 ? Array.from(detectedSubjects)[0] : null;
  const subjectsArray = Array.from(detectedSubjects).length > 0
    ? Array.from(detectedSubjects)
    : (isNeet ? ['Botany', 'Zoology', 'Physics', 'Chemistry'] : ['General']);

  if (calcTotalMarks > 0 || primarySubject) {
    await query(
      `UPDATE tests SET 
        max_marks = GREATEST(max_marks, $1),
        subject = COALESCE(subject, $2),
        subjects = COALESCE(subjects, $3::jsonb),
        updated_at = NOW()
       WHERE id = $4`,
      [calcTotalMarks, primarySubject, JSON.stringify(subjectsArray), id]
    );
    await query('UPDATE assessments SET passing_marks = $1 WHERE id = $2', [Math.round(calcTotalMarks * 0.45), id]).catch(() => { });
  }

  return {
    extractedCount: savedCount,
    extractedQuestionsJson,
    reviewWarnings,
    savedCount
  };
}

/**
 * 10. POST /api/admin/tests/:id/upload
 * Upload question paper, answer key, or solution PDF
 */
export const uploadTestFile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    file_base64,
    file_name,
    file_type,
    total_questions,
    duration_minutes,
    max_marks,
    passing_marks,
    include_answers
  } = req.body; // file_type: 'question_paper' | 'answer_key' | 'solution_pdf'

  if (!['question_paper', 'answer_key', 'solution_pdf'].includes(file_type)) {
    throw ApiError.badRequest('file_type must be question_paper, answer_key, or solution_pdf');
  }

  let testCheck = await query('SELECT id FROM tests WHERE id = $1', [id]);
  if (testCheck.rowCount === 0) {
    const assessCheck = await query('SELECT id, title, duration_minutes, passing_marks FROM assessments WHERE id = $1', [id]);
    if (assessCheck.rowCount === 0) {
      throw ApiError.notFound('Test or assessment not found');
    }
    const a = assessCheck.rows[0];
    await query(
      `INSERT INTO tests (id, test_name, title, test_type, test_date, start_time, end_time, duration_minutes, max_marks)
       VALUES ($1, $2, $2, 'mock', CURRENT_DATE, '00:00:00', '23:59:59', COALESCE($3, 180), COALESCE($4, 720))
       ON CONFLICT (id) DO UPDATE SET updated_at = NOW()`,
      [id, a.title, a.duration_minutes, a.passing_marks]
    ).catch((err) => {
      console.warn(`[uploadTestFile] Failed to sync tests table for assessment ${id}:`, err.message);
    });
  }

  const relativeUrl = await saveUploadedFile(file_base64, file_name || 'document.pdf', file_type);

  let columnToUpdate = 'solution_pdf_url';
  if (file_type === 'question_paper') columnToUpdate = 'question_paper_url';
  if (file_type === 'answer_key') columnToUpdate = 'answer_key_url';

  const cleanDuration = duration_minutes ? parseInt(duration_minutes, 10) : null;
  const cleanMarks = max_marks ? parseInt(max_marks, 10) : null;
  const cleanPass = passing_marks ? parseInt(passing_marks, 10) : null;

  await query(
    `UPDATE tests SET
      ${columnToUpdate} = $1,
      duration_minutes = COALESCE($2, duration_minutes),
      max_marks = COALESCE($3, max_marks),
      updated_at = NOW()
     WHERE id = $4`,
    [relativeUrl, cleanDuration, cleanMarks, id]
  );

  await query(
    `UPDATE assessments SET
      ${columnToUpdate} = $1,
      duration_minutes = COALESCE($2, duration_minutes),
      passing_marks = COALESCE($3, passing_marks),
      updated_at = NOW()
     WHERE id = $4`,
    [relativeUrl, cleanDuration, cleanPass, id]
  ).catch(() => { });

  // Automatic PDF Question Extraction (Gemini Vision + Fallback Regex)
  let extractedCount = 0;
  let extractedBy = 'none';
  let reviewWarnings = [];
  let extractedQuestionsJson = [];
  let extractionStats = null;
  let pdfExtraction = null;

  const isDocxFile = file_name && (file_name.toLowerCase().endsWith('.docx') || file_name.toLowerCase().endsWith('.doc'));
  if (isDocxFile) {
    reviewWarnings.push('Selected file is a Word document (.docx/.doc). Automatic AI question extraction requires a standard PDF (.pdf) file. Please export your Word document as PDF and re-upload.');
  }

  if (file_base64 && typeof file_base64 === 'string' && !isDocxFile) {
    try {
      const base64Data = file_base64.replace(/^data:[^;]+;base64,/, '');
      const pdfBuffer = Buffer.from(base64Data, 'base64');
      const includeAnswers = include_answers !== false && include_answers !== 'false';

      if (file_type === 'answer_key' || file_type === 'solution_pdf') {
        let answerKeyMap = {};
        let solutionsMap = {};
        let chaptersMap = {};

        // Fetch existing questions for this assessment first to know total questions and types
        const existingQsRes = await query(
          'SELECT id, position, correct_index, numeric_answer, question_type, options, solution, chapter, topic FROM questions WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
          [id]
        );
        const existingQs = existingQsRes.rows;
        const totalExpected = existingQs.length;

        // 1. Extract raw text directly using robust PDF parser with fallback
        try {
          const { extractPdfText } = await import('../utils/pdfQuestions.js');
          const rawText = await extractPdfText(pdfBuffer);
          if (rawText) {
            const parsed = parseAnswerKeyAndSolutions(rawText);
            answerKeyMap = parsed.answerKeyMap || {};
            solutionsMap = parsed.solutionsMap || {};
            chaptersMap = parsed.chaptersMap || {};
          }
        } catch (textErr) {
          console.warn('[uploadTestFile] Direct text extraction for answer key/solution failed:', textErr.message);
        }

        const extractedKeysCount = Object.keys(answerKeyMap).length;
        const extractedSolsCount = Object.keys(solutionsMap).length;
        const minExpected = totalExpected > 0 ? Math.max(5, Math.floor(totalExpected * 0.75)) : 5;
        const isExtractionIncomplete = extractedKeysCount < minExpected || (file_type === 'solution_pdf' && extractedSolsCount < minExpected);

        // Check if text-extracted solutions suffer from severe OCR line fragmentation
        const hasDegradedText = Object.values(solutionsMap).some((txt) => {
          const lines = String(txt || '').split('\n').map((l) => l.trim()).filter(Boolean);
          if (lines.length > 5) {
            const shortLines = lines.filter((l) => l.length <= 3).length;
            return (shortLines / lines.length) > 0.4;
          }
          return false;
        });

        // 2. Fallback to Gemini if text extraction yielded incomplete or degraded solutions
        if (isExtractionIncomplete || hasDegradedText || extractedKeysCount === 0) {
          try {
            console.log(`[uploadTestFile] Initiating Gemini Vision for ${file_type} (expected: ${totalExpected || 'auto'})...`);
            const pdfExtraction = await parseQuestionsFromPdf(pdfBuffer, {
              includeAnswers: true,
              isSolutionPdf: true,
              expectedQuestionCount: totalExpected || undefined,
            });

            if (pdfExtraction.answerKeyMap && Object.keys(pdfExtraction.answerKeyMap).length > 0) {
              answerKeyMap = { ...answerKeyMap, ...pdfExtraction.answerKeyMap };
            }
            if (pdfExtraction.topicGridMap) {
              chaptersMap = { ...pdfExtraction.topicGridMap, ...chaptersMap };
            }
            if (pdfExtraction.chaptersMap) {
              chaptersMap = { ...pdfExtraction.chaptersMap, ...chaptersMap };
            }
            if (pdfExtraction.solutionMap) {
              for (const [qNum, solObj] of Object.entries(pdfExtraction.solutionMap)) {
                if (solObj?.explanation) {
                  if (!solutionsMap[qNum] || hasDegradedText || solObj.explanation.length > (solutionsMap[qNum]?.length || 0)) {
                    solutionsMap[qNum] = solObj.explanation;
                  }
                }
                if (solObj?.correctAnswer && answerKeyMap[qNum] === undefined) {
                  const rawAns = String(solObj.correctAnswer).trim().toUpperCase();
                  if (['A', 'B', 'C', 'D'].includes(rawAns)) {
                    answerKeyMap[qNum] = rawAns.charCodeAt(0) - 65;
                  } else if (['1', '2', '3', '4'].includes(rawAns)) {
                    answerKeyMap[qNum] = parseInt(rawAns, 10) - 1;
                  }
                }
                if (solObj?.chapter && !chaptersMap[qNum]) {
                  chaptersMap[qNum] = solObj.chapter;
                }
              }
            }
            if (pdfExtraction.text_preview && Object.keys(answerKeyMap).length === 0) {
              const parsed = parseAnswerKeyAndSolutions(pdfExtraction.text_preview);
              answerKeyMap = { ...parsed.answerKeyMap, ...answerKeyMap };
              solutionsMap = { ...parsed.solutionsMap, ...solutionsMap };
              chaptersMap = { ...parsed.chaptersMap, ...chaptersMap };
            }
            if (Array.isArray(pdfExtraction.rows)) {
              for (const q of pdfExtraction.rows) {
                const qNum = q.questionNumber || q.line;
                if (qNum) {
                  if (q.correct_index !== null && q.correct_index !== undefined && answerKeyMap[qNum] === undefined) {
                    answerKeyMap[qNum] = q.correct_index;
                  }
                  if (q.solution && (!solutionsMap[qNum] || hasDegradedText)) {
                    solutionsMap[qNum] = q.solution;
                  }
                  if (q.chapter && q.chapter !== 'General' && !chaptersMap[qNum]) {
                    chaptersMap[qNum] = q.chapter;
                  }
                }
              }
            }
          } catch (geminiErr) {
            console.warn('[uploadTestFile] Gemini fallback for answer key/solution failed:', geminiErr.message);
          }
        }

        let updatedKeyCount = 0;
        let updatedSolCount = 0;
        let updatedChapterCount = 0;

        for (const eq of existingQs) {
          const qPos = eq.position;
          const hasKey = answerKeyMap[qPos] !== undefined;
          const hasSol = Boolean(solutionsMap[qPos]);
          const hasChapter = Boolean(chaptersMap[qPos]);

          if (hasKey || hasSol || hasChapter) {
            const rawKey = answerKeyMap[qPos];
            let newCorrect = eq.correct_index;
            let newNumeric = eq.numeric_answer;
            let newType = eq.question_type || 'mcq';

            const isMcq = newType === 'mcq' || (Array.isArray(eq.options) && eq.options.length > 0) || (newNumeric === null && (!newType || newType === 'mcq'));

            if (hasKey) {
              if (typeof rawKey === 'number') {
                if (rawKey >= 0 && rawKey <= 3) {
                  newCorrect = rawKey;
                  newType = 'mcq';
                } else if (rawKey >= 1 && rawKey <= 4 && isMcq) {
                  newCorrect = rawKey - 1;
                  newType = 'mcq';
                } else {
                  newNumeric = rawKey;
                  newType = 'integer';
                }
              } else if (typeof rawKey === 'string') {
                const upper = rawKey.trim().toUpperCase();
                if (['A', 'B', 'C', 'D'].includes(upper)) {
                  newCorrect = upper.charCodeAt(0) - 65;
                  newType = 'mcq';
                } else if (['1', '2', '3', '4'].includes(upper) && isMcq) {
                  newCorrect = parseInt(upper, 10) - 1;
                  newType = 'mcq';
                } else if (!isNaN(Number(upper))) {
                  const numVal = Number(upper);
                  if (isMcq && numVal >= 1 && numVal <= 4) {
                    newCorrect = numVal - 1;
                    newType = 'mcq';
                  } else {
                    newNumeric = numVal;
                    newType = 'integer';
                  }
                }
              } else if (typeof rawKey === 'object' && rawKey !== null) {
                if (rawKey.letter && ['A', 'B', 'C', 'D'].includes(rawKey.letter.toUpperCase())) {
                  newCorrect = rawKey.letter.toUpperCase().charCodeAt(0) - 65;
                  newType = 'mcq';
                } else if (rawKey.letter && ['1', '2', '3', '4'].includes(rawKey.letter) && isMcq) {
                  newCorrect = parseInt(rawKey.letter, 10) - 1;
                  newType = 'mcq';
                } else if (rawKey.numeric !== undefined && rawKey.numeric !== null) {
                  const numVal = Number(rawKey.numeric);
                  if (isMcq && numVal >= 1 && numVal <= 4) {
                    newCorrect = numVal - 1;
                    newType = 'mcq';
                  } else {
                    newNumeric = numVal;
                    newType = 'integer';
                  }
                }
              }
            }

            let newSol = eq.solution;
            if (hasSol) {
              let clean = stripHeadersAndFooters(solutionsMap[qPos]).trim();
              // Clean leading question number and answer key marker (e.g. "1. (3) : ", "Ans: (2)")
              clean = clean.replace(/^(?:(?:Q\.?\s*)?\d+[\.\):\-–—\s]+)?(?:ans(?:wer)?|option)?\s*[:\.\-–—]?\s*(?:\([A-Da-d1-4]\)|\[[A-Da-d1-4]\]|[A-Da-d1-4])\s*[:\.\-–—]?\s*/i, '').trim();
              if (clean) newSol = clean;
            }

            const newChapter = hasChapter ? chaptersMap[qPos] : eq.chapter;
            const newTopic = hasChapter ? chaptersMap[qPos] : eq.topic;

            if (hasKey && (newCorrect !== eq.correct_index || newNumeric !== eq.numeric_answer)) updatedKeyCount++;
            if (hasSol && newSol !== eq.solution) updatedSolCount++;
            if (hasChapter && chaptersMap[qPos] !== eq.chapter) updatedChapterCount++;

            await query(
              `UPDATE questions 
               SET correct_index = $1,
                   correct_option_index = $1,
                   numeric_answer = $2,
                   question_type = COALESCE($3, question_type),
                   solution = COALESCE($4, solution),
                   chapter = COALESCE($5, chapter),
                   topic = COALESCE($6, topic),
                   extraction_meta = jsonb_set(COALESCE(extraction_meta, '{}'::jsonb) || '{"hasAnswerKey": true}'::jsonb, '{needsReview}', 'false'::jsonb, true)
               WHERE id = $7`,
              [newCorrect, newNumeric, newType, newSol, newChapter, newTopic, eq.id]
            );
          }
        }

        const urlCol = file_type === 'solution_pdf' ? 'solution_pdf_url' : 'answer_key_url';
        await query(`UPDATE assessments SET ${urlCol} = $1, updated_at = NOW() WHERE id = $2`, [relativeUrl, id]).catch(() => { });
        await query(`UPDATE tests SET ${urlCol} = $1, updated_at = NOW() WHERE id = $2`, [relativeUrl, id]).catch(() => { });

        const summaryParts = [];
        if (updatedKeyCount > 0) summaryParts.push(`${updatedKeyCount} answer key(s)`);
        if (updatedSolCount > 0) summaryParts.push(`${updatedSolCount} solution/explanation(s)`);
        if (updatedChapterCount > 0) summaryParts.push(`${updatedChapterCount} chapter tag(s)`);

        return res.json({
          message: summaryParts.length > 0
            ? `${file_type === 'solution_pdf' ? 'Solution' : 'Answer key'} PDF uploaded successfully. Updated ${summaryParts.join(', ')}.`
            : `${file_type === 'solution_pdf' ? 'Solution' : 'Answer key'} PDF uploaded and attached successfully.`,
          url: relativeUrl,
          file_type,
          updatedCount: updatedKeyCount,
          updatedSolCount,
          updatedChapterCount,
          answerKeyMap,
          solutionsMap,
          chaptersMap
        });
      }

      const currentTestInfo = await query('SELECT test_name, syllabus FROM tests WHERE id = $1', [id]);
      const currentTestRow = currentTestInfo.rows[0] || {};
      const isNeet = String(currentTestRow.test_name || '').toUpperCase().includes('NEET') || String(currentTestRow.syllabus || '').toUpperCase().includes('NEET');
      const isJee = String(currentTestRow.test_name || '').toUpperCase().includes('JEE') || String(currentTestRow.syllabus || '').toUpperCase().includes('JEE');

      const targetExpectedCount = req.body.expected_question_count
        ? parseInt(req.body.expected_question_count, 10)
        : (req.body.expectedQuestionCount
          ? parseInt(req.body.expectedQuestionCount, 10)
          : (total_questions
            ? parseInt(total_questions, 10)
            : (isNeet ? 180 : (isJee ? 75 : null))));

      pdfExtraction = await parseQuestionsFromPdf(pdfBuffer, {
        includeAnswers,
        expectedQuestionCount: targetExpectedCount,
        examType: isNeet ? 'NEET' : (isJee ? 'JEE' : null),
      });
      extractedBy = pdfExtraction.extractedBy || 'pdf-parse-regex';
      extractionStats = pdfExtraction.stats || null;
      const parsedQs = pdfExtraction.rows || [];

      if (file_type === 'question_paper' && parsedQs.length === 0) {
        const extractionDetail = pdfExtraction.visionBypassReason
          ? ` Extraction detail: ${pdfExtraction.visionBypassReason}`
          : '';
        const noQuestionsError = new Error(
          `The PDF was uploaded, but no questions could be extracted.${extractionDetail} Confirm that it is a question paper, then retry with a clearer PDF or upload smaller page ranges.`
        );
        noQuestionsError.code = 'PDF_NO_QUESTIONS_EXTRACTED';
        noQuestionsError.statusCode = 422;
        throw noQuestionsError;
      }

      if (file_type === 'question_paper' && parsedQs.length > 0) {
        console.log(`[PDF Extraction Pipeline] STAGE 5: Questions Before DB Save = ${parsedQs.length} question(s)`);
        const persistResult = await persistExtractedQuestionsToAssessment(id, parsedQs, {
          includeAnswers,
          relativeUrl,
          extractedBy,
          pdfExtractionWarnings: pdfExtraction.warnings || []
        });

        extractedCount = persistResult.savedCount;
        reviewWarnings = persistResult.reviewWarnings;
        extractedQuestionsJson = persistResult.extractedQuestionsJson;
        console.log(`[PDF Extraction Pipeline] STAGE 6: Questions Actually Saved = ${extractedCount} question(s)`);
      }

      // Check standalone Answer Key fallback if regex parsed text (only if answers are requested)
      if (includeAnswers && pdfExtraction.text_preview) {
        const answerKeyMap = parseAnswerKeyOnly(pdfExtraction.text_preview);
        const keyEntries = Object.entries(answerKeyMap);
        if (keyEntries.length > 0) {
          for (const [qNumStr, correctIdx] of keyEntries) {
            const qPos = parseInt(qNumStr, 10);
            await query(
              'UPDATE questions SET correct_index = $1 WHERE assessment_id = $2 AND position = $3',
              [correctIdx, id, qPos]
            );
          }
        }
      }
    } catch (err) {
      console.error('PDF Question Extraction Error:', err.message, err.stack);
      let clientMsg = err.message || 'PDF question extraction failed. Please check the file format.';
      try {
        const jsonMatch = clientMsg.match(/\{[\s\S]*"error"[\s\S]*\}/);
        if (jsonMatch) {
          const parsedErr = JSON.parse(jsonMatch[0]);
          if (parsedErr?.error?.message) {
            clientMsg = `Gemini AI Error (${parsedErr.error.code || 400}): ${parsedErr.error.message}`;
          }
        }
      } catch (_) {}
      const statusCode = err.statusCode || (err.code === 'PDF_VISION_EXTRACTION_FAILED' ? 502 : 400);
      return res.status(statusCode).json({
        error: true,
        code: err.code || 'PDF_EXTRACTION_FAILED',
        message: clientMsg,
      });
    }
  }

  // Fallback placeholder questions ONLY if no file was uploaded and qNum explicitly specified
  const qNum = total_questions ? parseInt(total_questions, 10) : 0;
  if (qNum > 0 && extractedCount === 0 && (!file_base64 || file_type !== 'question_paper')) {
    const qCheck = await query('SELECT COUNT(*)::int AS c FROM questions WHERE assessment_id = $1', [id]);
    if (qCheck.rows[0].c === 0) {
      const includeAnswers = include_answers !== false && include_answers !== 'false';
      const marksPerQ = cleanMarks && qNum ? Math.max(1, Math.floor(cleanMarks / qNum)) : 4;
      for (let i = 1; i <= qNum; i++) {
        await query(
          `INSERT INTO questions (
            assessment_id, question_text, question_type, options, correct_index, marks, position
          ) VALUES ($1, $2, 'mcq', $3, $4, $5, $6)`,
          [
            id,
            `Question ${i}: Select the correct option.`,
            JSON.stringify(['Option 1', 'Option 2', 'Option 3', 'Option 4']),
            includeAnswers ? 0 : null,
            marksPerQ,
            i
          ]
        );
      }
    }
  }

  console.log(`[PDF Extraction Pipeline] STAGE 7: Questions Returned by API = ${extractedQuestionsJson.length} question(s)`);

  const isPartialImport = Boolean(extractionStats?.isPartial || (Array.isArray(extractionStats?.pagesFailed) && extractionStats.pagesFailed > 0) || (pdfExtraction && pdfExtraction.isPartial));
  const failedPageList = (pdfExtraction && pdfExtraction.failedPages) || [];
  const missingNumbers = pdfExtraction?.missingQuestionNumbers || [];
  const conflictingIds = pdfExtraction?.conflictingQuestionIdentifiers || [];
  const unresolvedFrags = pdfExtraction?.unresolvedFragments || [];
  const suspiciousPageList = pdfExtraction?.suspiciousPages || [];
  const questionsNeedingReview = pdfExtraction?.questionsNeedingReview || 0;
  const visualsDetected = pdfExtraction?.visualsDetected || 0;
  const visualsSaved = pdfExtraction?.visualsSaved || 0;
  const unresolvedVisuals = pdfExtraction?.unresolvedVisuals || 0;
  const coverageStatus = pdfExtraction?.coverageStatus || (isPartialImport ? 'partial' : 'complete');

  const isFallbackDegraded = extractedBy === 'pdf-parse-regex' || Boolean(pdfExtraction?.visionBypassReason);
  const sanitizedVisionBypassReason = pdfExtraction?.visionBypassReason
    ? String(pdfExtraction.visionBypassReason).replace(/AIza[0-9A-Za-z-_]{35}/g, '[REDACTED]').replace(/key=[^&\s]+/gi, 'key=[REDACTED]')
    : null;

  let responseStatus = 'success';
  if (isFallbackDegraded) {
    responseStatus = 'degraded_fallback';
  } else if (isPartialImport || coverageStatus === 'partial') {
    responseStatus = 'partial_success';
  } else if (coverageStatus === 'review_required') {
    responseStatus = 'review_required';
  }

  let responseMsg = `${file_type} uploaded successfully.`;
  if (isFallbackDegraded) {
    responseMsg = `PDF question paper imported via plain-text fallback parser (${sanitizedVisionBypassReason || 'AI Vision unavailable'}). ${extractedCount} question(s) extracted with degraded quality. Mathematical formulas, diagrams, or answer keys may be missing or unformatted.`;
  } else if (coverageStatus === 'partial' && (pdfExtraction?.expectedQuestionCount || total_questions)) {
    const targetQCount = pdfExtraction?.expectedQuestionCount || total_questions;
    responseMsg = `${extractedCount} of ${targetQCount} expected questions extracted. ${missingNumbers.length} question numbers remain unresolved. Draft saved for review.`;
  } else if (isPartialImport && failedPageList.length > 0) {
    responseMsg = `PDF question paper partially extracted (${extractedCount} questions). Pages [${failedPageList.join(', ')}] failed to process. Partial draft has been saved.`;
  } else if (questionsNeedingReview > 0) {
    responseMsg = `${extractedCount} questions extracted. ${questionsNeedingReview} question(s) require manual review.`;
  }

  res.json({
    message: responseMsg,
    status: responseStatus,
    coverageStatus,
    isDegraded: isFallbackDegraded,
    visionBypassReason: sanitizedVisionBypassReason,
    url: relativeUrl,
    file_type,
    extractedBy,
    extractedCount,
    expectedQuestionCount: pdfExtraction?.expectedQuestionCount || null,
    extractedQuestionCount: extractedCount,
    savedQuestionCount: extractedCount,
    missingQuestionNumbers: missingNumbers,
    conflictingQuestionIdentifiers: conflictingIds,
    unresolvedFragments: unresolvedFrags,
    failedPages: failedPageList,
    suspiciousPages: suspiciousPageList,
    questionsNeedingReview,
    visualsDetected,
    visualsSaved,
    unresolvedVisuals,
    isPartial: isPartialImport || coverageStatus === 'partial',
    stats: extractionStats,
    extractedQuestions: extractedQuestionsJson,
    warnings: reviewWarnings.length > 0 ? reviewWarnings : undefined
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
      SELECT 
        attempt_id,
        test_id,
        student_id,
        started_at,
        submitted_at,
        score,
        percentage,
        max_marks,
        student_name,
        student_email,
        institution_name,
        institution_code
      FROM (
        SELECT 
          at.id AS attempt_id,
          t.id AS test_id,
          at.candidate_id AS student_id,
          at.started_at,
          at.submitted_at,
          COALESCE(s.marks_obtained, s.percentage, 0)::numeric AS score,
          COALESCE(s.percentage, 0)::numeric AS percentage,
          COALESCE(s.total_marks, t.max_marks, 200)::numeric AS max_marks,
          u.name AS student_name,
          u.email AS student_email,
          COALESCE(i.name, ib.name) AS institution_name,
          COALESCE(i.code, ib.code) AS institution_code
        FROM attempts at
        JOIN users u ON u.id = at.candidate_id
        LEFT JOIN assessments a ON a.id = at.assessment_id
        LEFT JOIN tests t ON (t.id = at.assessment_id OR LOWER(t.test_name) = LOWER(a.title))
        LEFT JOIN scores s ON s.attempt_id = at.id
        LEFT JOIN batches b ON b.id = u.batch_id
        LEFT JOIN institutions i ON i.id = u.institution_id
        LEFT JOIN institutions ib ON ib.id = b.institution_id
        WHERE (at.assessment_id = $1 OR t.id = $1)

        UNION ALL

        SELECT 
          ta.id AS attempt_id,
          ta.test_id,
          ta.student_id,
          ta.started_at,
          ta.submitted_at,
          COALESCE(ta.score, ts.marks_obtained, ta.percentage, 0)::numeric AS score,
          COALESCE(ta.percentage, ts.percentage, 0)::numeric AS percentage,
          COALESCE(ta.max_marks, ts.total_marks, 200)::numeric AS max_marks,
          u.name AS student_name,
          u.email AS student_email,
          COALESCE(i.name, ib.name) AS institution_name,
          COALESCE(i.code, ib.code) AS institution_code
        FROM test_attempts ta
        JOIN users u ON u.id = ta.student_id
        LEFT JOIN scores ts ON ts.attempt_id = ta.id
        LEFT JOIN batches b ON b.id = u.batch_id
        LEFT JOIN institutions i ON i.id = u.institution_id
        LEFT JOIN institutions ib ON ib.id = b.institution_id
        WHERE ta.test_id = $1
      ) sub
      ORDER BY COALESCE(score, percentage, 0) DESC, submitted_at ASC NULLS LAST
    `, [id]),
    query('SELECT COUNT(*)::int AS count FROM missed_test_overrides WHERE test_id = $1', [id]).catch(() => ({ rows: [{ count: 0 }] }))
  ]);

  if (testRes.rowCount === 0) throw ApiError.notFound('Test not found');

  const seenStudents = new Set();
  const uniqueAttempts = [];
  for (const r of attemptsRes.rows) {
    if (!seenStudents.has(r.student_id)) {
      seenStudents.add(r.student_id);
      uniqueAttempts.push(r);
    }
  }

  const completedRows = uniqueAttempts
    .filter(r => r.submitted_at)
    .sort((a, b) => Number(b.score || b.percentage || 0) - Number(a.score || a.percentage || 0));

  const totalAttempted = completedRows.length;
  const totalInProgress = uniqueAttempts.filter(r => r.started_at && !r.submitted_at).length;

  const rankedAttempts = uniqueAttempts.map(r => {
    if (!r.submitted_at) return { ...r, air_rank: null, percentile: null };
    const rankIndex = completedRows.findIndex(cr => cr.attempt_id === r.attempt_id);
    const air_rank = rankIndex >= 0 ? rankIndex + 1 : null;
    const percentile = totalAttempted > 0
      ? Number(Math.max(0.1, Math.min(99.9, ((totalAttempted - rankIndex) / totalAttempted) * 100)).toFixed(1))
      : 100;
    return { ...r, air_rank, percentile };
  });

  res.json({
    test: testRes.rows[0],
    stats: {
      totalAttempted,
      totalInProgress,
      totalOverrides: overridesRes.rows[0]?.count || 0,
      topScore: completedRows.length > 0 ? (completedRows[0].score || completedRows[0].percentage || 0) : 0,
      avgScore: completedRows.length > 0 ? Math.round(completedRows.reduce((sum, c) => sum + Number(c.percentage || c.score || 0), 0) / completedRows.length) : 0
    },
    attempts: rankedAttempts
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

  // 2. Email dispatch via Resend sendEmail utility
  let emailsSent = 0;
  for (const c of candidates) {
    if (c.email) {
      try {
        await sendEmail({
          to: c.email,
          subject: title,
          html: `<p>Hello ${c.name || 'Student'},</p><p>${body}</p><p>Good luck!<br>EDVEDUM Team</p>`,
          text: `Hello ${c.name || 'Student'},\n\n${body}\n\nGood luck!\nEDVEDUM Team`,
        });
        emailsSent++;
      } catch (err) {
        console.warn('Test notification email dispatch error:', err.message);
      }
    }
  }

  res.json({
    message: `Test reminder notification broadcasted to ${candidates.length} candidates.`,
    dashboard_notifications_created: candidates.length,
    emails_sent: emailsSent
  });
});

/**
 * 15. GET /api/admin/tests/:id/extracted-questions
 * Retrieve all questions for a test formatted in the standardized JSON schema
 */
export const getTestExtractedQuestions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const questionsRes = await query(
    'SELECT * FROM questions WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
    [id]
  );

  const formattedQuestions = questionsRes.rows.map((q, idx) => {
    const qNum = q.position || idx + 1;
    let parsedOpts = [];
    try {
      parsedOpts = typeof q.options === 'string' ? JSON.parse(q.options) : (q.options || []);
    } catch (_) {
      parsedOpts = [];
    }

    let parsedMedia = [];
    try {
      parsedMedia = typeof q.media === 'string' ? JSON.parse(q.media) : (q.media || []);
    } catch (_) {
      parsedMedia = [];
    }

    let parsedTables = [];
    try {
      parsedTables = typeof q.tables === 'string' ? JSON.parse(q.tables) : (q.tables || []);
    } catch (_) {
      parsedTables = [];
    }

    let parsedExtraction = {};
    try {
      parsedExtraction = typeof q.extraction_meta === 'string' ? JSON.parse(q.extraction_meta) : (q.extraction_meta || {});
    } catch (_) {
      parsedExtraction = {};
    }

    // Filter question media
    const questionMedia = parsedMedia
      .filter((m) => !m.type?.includes('solution') && !m.id?.includes('exp'))
      .map((m, mIdx) => ({
        id: m.id || `q${qNum}-img-${mIdx + 1}`,
        type: m.type || 'diagram',
        url: m.url,
        description: m.description || `Diagram for question ${qNum}`,
        sourcePage: m.sourcePage || parsedExtraction.sourcePages?.[0] || 1,
      }));

    if (questionMedia.length === 0 && q.image_url) {
      questionMedia.push({
        id: `q${qNum}-img-1`,
        type: 'diagram',
        url: q.image_url,
        description: `Diagram for question ${qNum}`,
        sourcePage: parsedExtraction.sourcePages?.[0] || 1,
      });
    }

    // Filter explanation media
    const explanationMedia = parsedMedia
      .filter((m) => m.type?.includes('solution') || m.id?.includes('exp'))
      .map((m, mIdx) => ({
        id: m.id || `q${qNum}-exp-${mIdx + 1}`,
        type: m.type || 'diagram',
        url: m.url,
        description: m.description || 'Solution circuit diagram',
        sourcePage: m.sourcePage || parsedExtraction.sourcePages?.[0] || 1,
      }));

    // Format options
    const isInteger = q.question_type === 'integer' || q.question_type === 'numerical' || (q.numeric_answer !== null && parsedOpts.length === 0);
    const optionsList = isInteger ? [] : parsedOpts.map((opt, oIdx) => {
      const optKey = typeof opt === 'object' && opt.key ? String(opt.key).toUpperCase().trim() : String.fromCharCode(65 + oIdx);
      const optText = typeof opt === 'object' && opt.text !== undefined ? String(opt.text) : String(opt);
      const optMedia = typeof opt === 'object' && Array.isArray(opt.media) ? opt.media : [];
      return {
        key: optKey,
        text: optText,
        media: optMedia,
      };
    });

    const numAnswer = q.numeric_answer !== null && q.numeric_answer !== undefined ? Number(q.numeric_answer) : null;
    let correctAnswerStr = null;
    if (isInteger && numAnswer !== null) {
      correctAnswerStr = String(numAnswer);
    } else if (q.correct_index !== null && q.correct_index !== undefined) {
      correctAnswerStr = String.fromCharCode(65 + Number(q.correct_index));
    }

    return {
      questionNumber: qNum,
      questionType: isInteger ? 'integer' : (q.question_type || 'mcq'),
      question_type: isInteger ? 'integer' : (q.question_type || 'mcq'),
      numericAnswer: numAnswer,
      numeric_answer: numAnswer,
      subject: q.subject || q.bank_category || 'General',
      chapter: q.chapter || q.topic || 'General',
      topic: q.topic || q.chapter || 'General',

      question: {
        text: q.question_text || '',
        media: questionMedia,
      },

      options: optionsList,

      explanation: {
        text: q.solution || '',
        media: explanationMedia,
      },

      tables: parsedTables,

      correctAnswer: correctAnswerStr,

      extraction: {
        confidence: parsedExtraction.confidence || 0.96,
        needsReview: Boolean(parsedExtraction.needsReview),
        sourcePages: parsedExtraction.sourcePages || [1],
        extractedBy: parsedExtraction.extractedBy || 'gemini-vision',
        hasAnswerKey: Boolean(correctAnswerStr !== null),
        ...(parsedExtraction.reviewReason ? { reviewReason: parsedExtraction.reviewReason } : {}),
      },
    };
  });

  res.json({
    success: true,
    test_id: Number(id),
    questionCount: formattedQuestions.length,
    questions: formattedQuestions,
  });
});

/**
 * 16. POST /api/admin/tests/:id/replay
 * Replay saved extraction questions into an assessment/test without calling Gemini
 */
export const replayExtractedQuestions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { questions, include_answers } = req.body;
  if (!Array.isArray(questions) || questions.length === 0) {
    throw ApiError.badRequest('questions array is required');
  }

  let testCheck = await query('SELECT id FROM tests WHERE id = $1', [id]);
  if (testCheck.rowCount === 0) {
    const assessCheck = await query('SELECT id, title, duration_minutes, passing_marks FROM assessments WHERE id = $1', [id]);
    if (assessCheck.rowCount === 0) {
      throw ApiError.notFound('Test or assessment not found');
    }
    const a = assessCheck.rows[0];
    await query(
      `INSERT INTO tests (id, test_name, title, test_type, test_date, start_time, end_time, duration_minutes, max_marks)
       VALUES ($1, $2, $2, 'mock', CURRENT_DATE, '00:00:00', '23:59:59', COALESCE($3, 180), COALESCE($4, 720))
       ON CONFLICT (id) DO UPDATE SET updated_at = NOW()`,
      [id, a.title, a.duration_minutes, a.passing_marks]
    ).catch(() => { });
  }

  const result = await persistExtractedQuestionsToAssessment(id, questions, {
    includeAnswers: include_answers !== false,
    extractedBy: 'replay-saved-extraction',
  });

  res.json({
    message: `Replayed and saved ${result.savedCount} questions into assessment ${id} successfully.`,
    extractedCount: result.savedCount,
    extractedQuestions: result.extractedQuestionsJson,
    warnings: result.reviewWarnings.length > 0 ? result.reviewWarnings : undefined
  });
});

/**
 * 17. GET /api/admin/tests/:id/simulator
 * Simulator Mode: Generates authenticated candidate-perspective test payload
 * without writing any attempt or score records to database.
 */
export const getTestSimulator = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const assessmentId = Number(id);
  if (!assessmentId) throw ApiError.badRequest('Valid test/assessment ID required');

  let testObj = null;
  const tCheck = await query('SELECT * FROM tests WHERE id = $1 LIMIT 1', [assessmentId]);
  if ((tCheck.rowCount || tCheck.rows?.length || 0) > 0) {
    testObj = tCheck.rows[0];
  }

  if (!testObj) {
    const aRes = await query('SELECT * FROM assessments WHERE id = $1 LIMIT 1', [assessmentId]);
    if ((aRes.rowCount || aRes.rows?.length || 0) > 0) {
      testObj = aRes.rows[0];
    }
  }

  if (!testObj) {
    throw ApiError.notFound('Test or Assessment not found');
  }

  const [sectionsRes, questionsRes] = await Promise.all([
    query(
      'SELECT * FROM assessment_sections WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
      [assessmentId]
    ),
    query(
      'SELECT * FROM questions WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
      [assessmentId]
    ),
  ]);

  let institutionObj = null;
  if (req.user?.institution_id) {
    const instRes = await query(
      'SELECT id, name, logo_url, logo_badge, code FROM institutions WHERE id = $1',
      [req.user.institution_id]
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

  const isNeet = isNeetTest(testObj, questionsRes.rows);
  const totalQCount = questionsRes.rows.length;

  const sanitizedQuestions = questionsRes.rows.map((q, idx) => {
    let opts = [];
    if (Array.isArray(q.options)) {
      opts = q.options;
    } else if (typeof q.options === 'string') {
      try { opts = JSON.parse(q.options); } catch (_) { opts = []; }
    }

    const base = {
      id: q.id,
      section_id: q.section_id,
      question_type: q.question_type || 'mcq',
      question_text: q.question_text || '',
      assertion_text: q.assertion_text || null,
      reason_text: q.reason_text || null,
      image_url: q.image_url || '',
      marks: q.marks || 4,
      position: q.position || idx + 1,
      subject: q.subject || q.bank_category || null,
      section: q.section || null,
      bank_category: q.bank_category || null,
      topic: q.topic || null,
      chapter: q.chapter || null,
      translations: q.translations || {},
      options: opts,
      starter_code: q.starter_code || '',
      language: q.language || 'javascript',
    };

    if (isNeet) {
      const neetMeta = resolveQuestionNeetMeta(q, idx, totalQCount);
      return {
        ...base,
        subject: neetMeta.subject,
        section: neetMeta.section,
        questionNumber: neetMeta.subjectQuestionNumber,
        overallQuestionNumber: neetMeta.overallQuestionNumber,
        is_neet: true,
        is_section_b: neetMeta.isSectionB,
      };
    }
    return base;
  });

  let finalQuestions = sanitizedQuestions;
  let finalSections = sectionsRes.rows;
  if (isNeet) {
    const normalized = normalizeNeetAssessmentPayload(testObj, sanitizedQuestions, sectionsRes.rows);
    finalQuestions = normalized.questions;
    finalSections = normalized.sections;
  }

  const durationMins = testObj.duration_minutes || 180;
  const fakeEndsAt = new Date(Date.now() + durationMins * 60 * 1000).toISOString();

  res.json({
    success: true,
    is_simulator: true,
    attempt: {
      id: `sim-${assessmentId}`,
      candidate_id: req.user?.id || 1,
      assessment_id: assessmentId,
      status: 'in_progress',
      started_at: new Date().toISOString(),
      ends_at: fakeEndsAt,
      is_simulator: true,
    },
    assessment: {
      id: testObj.id,
      title: testObj.test_name || testObj.title || 'Simulated Assessment',
      duration_minutes: durationMins,
      max_violations: 5,
      question_paper_url: testObj.question_paper_url || null,
      solution_pdf_url: testObj.solution_pdf_url || null,
      answer_key_url: testObj.answer_key_url || null,
      institution: institutionObj,
      institution_id: institutionObj?.id || null,
      institution_name: institutionObj?.name || null,
      institution_logo_url: institutionObj?.logo_url || null,
      institution_logo_badge: institutionObj?.logo_badge || null,
      is_neet: isNeet,
      total_marks: isNeet ? 720 : (testObj.max_marks || null),
    },
    institution: institutionObj,
    sections: finalSections,
    questions: finalQuestions,
    answers: [],
    coding_answers: [],
    subjective_answers: [],
  });
});

/**
 * 18. POST /api/admin/tests/:id/reclassify
 * Dynamically reclassify all questions in an assessment:
 * Determines accurate subject and topic per question, infers booklet layout,
 * recreates/syncs assessment_sections, and updates questions and tests tables.
 */
export const reclassifyTestQuestions = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const assessmentId = Number(id);
  if (!assessmentId) throw ApiError.badRequest('Valid test/assessment ID required');

  const assessRes = await query('SELECT id, title, syllabus_text, subject FROM assessments WHERE id = $1', [assessmentId]);
  const testRes = await query('SELECT id, test_name, syllabus, subject FROM tests WHERE id = $1', [assessmentId]);

  if (assessRes.rowCount === 0 && testRes.rowCount === 0) {
    throw ApiError.notFound('Assessment or test not found');
  }

  const qRes = await query(
    `SELECT id, assessment_id, section_id, question_text, question_type, options,
            correct_index, marks, position, bank_category, solution, subject, topic, chapter,
            image_url, solution_image_url, media, tables, extraction_meta, numeric_answer
     FROM questions
     WHERE assessment_id = $1
     ORDER BY position, id`,
    [assessmentId]
  );

  const existingQs = qRes.rows;
  if (!existingQs.length) {
    throw ApiError.badRequest('No questions found to reclassify in this assessment.');
  }

  const parsedQs = existingQs.map((r, idx) => {
    let opts = [];
    try { opts = typeof r.options === 'string' ? JSON.parse(r.options) : (r.options || []); } catch (_) {}
    let extMeta = {};
    try { extMeta = typeof r.extraction_meta === 'string' ? JSON.parse(r.extraction_meta) : (r.extraction_meta || {}); } catch (_) {}

    return {
      ...r,
      questionNumber: r.position || idx + 1,
      questionText: r.question_text,
      question_text: r.question_text,
      options: opts,
      subject: r.subject,
      topic: r.topic,
      chapter: r.chapter,
      bank_category: r.bank_category,
      extraction: extMeta,
    };
  });

  const result = await persistExtractedQuestionsToAssessment(assessmentId, parsedQs, {
    extractedBy: 'auto-reclassify',
  });

  res.json({
    success: true,
    message: `Successfully reclassified ${result.savedCount} questions and updated sections.`,
    savedCount: result.savedCount,
  });
});
