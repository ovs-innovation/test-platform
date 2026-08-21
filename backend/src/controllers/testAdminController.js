import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { saveUploadedFile } from '../middleware/upload.js';
import { sendEmail } from '../utils/email.js';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';
import { parsePdfQuestions } from '../utils/pdfQuestionParser.js';
import { inferSubjectAndTopic } from '../utils/subjectClassifier.js';

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
        test_name, title, test_type, test_date, start_time, end_time,
        duration_minutes, syllabus, max_marks, is_published, status,
        result_publish_time, solution_pdf_url, recommended_ebook_id,
        available_from, available_until
      ) VALUES ($1, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
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
        is_published ? 'published' : 'draft',
        result_publish_time || null,
        solution_pdf_url || null,
        recommended_ebook_id || null,
        available_from || null,
        available_until || null
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
    }

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

  const cleanDate = test_date ? String(test_date).split('T')[0] : null;
  const cleanDuration = duration_minutes !== undefined && duration_minutes !== null ? parseInt(duration_minutes, 10) : null;
  const cleanMarks = max_marks !== undefined && max_marks !== null ? parseInt(max_marks, 10) : null;

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
      updated_at = NOW()
    WHERE id = $17
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

    const studentsRes = await query('SELECT id FROM users WHERE institution_id = $1 AND role = $2', [assigned_to_id, 'candidate']);
    for (const s of studentsRes.rows) {
      await query(
        `INSERT INTO notifications (user_id, title, body, type)
         VALUES ($1, $2, $3, 'test_assigned')`,
        [
          s.id,
          'New Test Assigned',
          `A new test "${testName}" has been assigned to your institution.`,
        ]
      ).catch(() => { });
    }
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
  const {
    file_base64,
    file_name,
    file_type,
    total_questions,
    duration_minutes,
    max_marks,
    passing_marks
  } = req.body; // file_type: 'question_paper' | 'answer_key' | 'solution_pdf'

  if (!['question_paper', 'answer_key', 'solution_pdf'].includes(file_type)) {
    throw ApiError.badRequest('file_type must be question_paper, answer_key, or solution_pdf');
  }

  const testCheck = await query('SELECT id FROM tests WHERE id = $1', [id]);
  if (testCheck.rowCount === 0) throw ApiError.notFound('Test not found');

  const relativeUrl = saveUploadedFile(file_base64, file_name || 'document.pdf', file_type);

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

  // Automatic PDF Question Extraction
  let extractedCount = 0;
  let reviewWarnings = [];
  if (file_base64 && typeof file_base64 === 'string') {
    try {
      const base64Data = file_base64.replace(/^data:[^;]+;base64,/, '');
      const pdfBuffer = Buffer.from(base64Data, 'base64');
      const pdfData = await pdfParse(pdfBuffer).catch(() => null);

      if (pdfData && pdfData.text) {
        console.log('\n===================================================================');
        console.log('[PDF EXTRACTION LOG] Raw PDF Extracted Text (First 1000 chars):');
        console.log(pdfData.text.substring(0, 1000));
        console.log('===================================================================\n');

        const parsedQs = parsePdfQuestions(pdfData.text);
        if (parsedQs.length > 0) {
          extractedCount = parsedQs.length;
          reviewWarnings = parsedQs.filter(q => q.needs_review).map(q => q.review_reason);
          if (reviewWarnings.length > 0) {
            console.warn(`[PDF Import Warning] ${reviewWarnings.length} question(s) flagged for manual review:`, reviewWarnings);
          }

          // Retrieve test details for context
          const currentTestRes = await query('SELECT test_name, syllabus FROM tests WHERE id = $1', [id]);
          const currentTest = currentTestRes.rows[0] || {};

          await query('DELETE FROM questions WHERE assessment_id = $1', [id]);
          let calcTotalMarks = 0;
          const detectedSubjects = new Set();

          for (let i = 0; i < parsedQs.length; i++) {
            const q = parsedQs[i];
            calcTotalMarks += (q.marks || 4);

            // Infer subject & topic from test name, syllabus, pdf text, and question text
            const classification = inferSubjectAndTopic({
              testName: currentTest.test_name,
              syllabus: currentTest.syllabus,
              questionText: q.question_text,
              pdfText: pdfData.text
            });

            const qSubject = (q.bank_category && q.bank_category !== 'General') ? q.bank_category : classification.subject;
            const qTopic = classification.topic;
            if (qSubject && qSubject !== 'General') detectedSubjects.add(qSubject);

            await query(
              `INSERT INTO questions (
                assessment_id, question_text, question_type, options, correct_index, marks, position, bank_category, solution, subject, topic
              ) VALUES ($1, $2, 'mcq', $3, $4, $5, $6, $7, $8, $9, $10)`,
              [
                id,
                q.question_text,
                JSON.stringify(q.options),
                q.correct_index || 0,
                q.marks || 4,
                i + 1,
                qSubject || 'General',
                q.solution || '',
                qSubject,
                qTopic
              ]
            );
          }

          const primarySubject = detectedSubjects.size > 0 ? Array.from(detectedSubjects)[0] : null;
          const subjectsArray = Array.from(detectedSubjects);

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
        }
      }
    } catch (err) {
      console.error('PDF Question Extraction Warning:', err.message);
    }
  }

  // Fallback placeholder questions if extraction produced no matches and qNum specified
  const qNum = total_questions ? parseInt(total_questions, 10) : 0;
  if (qNum > 0 && extractedCount === 0) {
    const qCheck = await query('SELECT COUNT(*)::int AS c FROM questions WHERE assessment_id = $1', [id]);
    if (qCheck.rows[0].c === 0) {
      const marksPerQ = cleanMarks && qNum ? Math.max(1, Math.floor(cleanMarks / qNum)) : 4;
      for (let i = 1; i <= qNum; i++) {
        await query(
          `INSERT INTO questions (
            assessment_id, question_text, question_type, options, correct_index, marks, position
          ) VALUES ($1, $2, 'mcq', $3, 0, $4, $5)`,
          [
            id,
            `Question ${i}: Select the correct option for this question statement.`,
            JSON.stringify(['(A) Option 1', '(B) Option 2', '(C) Option 3', '(D) Option 4']),
            marksPerQ,
            i
          ]
        );
      }
    }
  }

  res.json({
    message: `${file_type} uploaded successfully`,
    url: relativeUrl,
    file_type,
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
        ta.id, ta.test_id, ta.student_id, ta.started_at, ta.submitted_at, 
        COALESCE(ta.score, 0) AS score, 
        COALESCE(ta.percentage, 0) AS percentage,
        u.name AS student_name, u.email AS student_email,
        COALESCE(i.name, ib.name) AS institution_name,
        COALESCE(i.code, ib.code) AS institution_code
      FROM test_attempts ta
      JOIN users u ON u.id = ta.student_id
      LEFT JOIN batches b ON b.id = u.batch_id
      LEFT JOIN institutions i ON i.id = u.institution_id
      LEFT JOIN institutions ib ON ib.id = b.institution_id
      WHERE ta.test_id = $1
      ORDER BY COALESCE(ta.score, ta.percentage, 0) DESC, ta.submitted_at ASC
    `, [id]),
    query('SELECT COUNT(*)::int AS count FROM missed_test_overrides WHERE test_id = $1', [id])
  ]);

  if (testRes.rowCount === 0) throw ApiError.notFound('Test not found');

  const completedRows = attemptsRes.rows
    .filter(r => r.submitted_at)
    .sort((a, b) => Number(b.score || b.percentage || 0) - Number(a.score || a.percentage || 0));

  const totalAttempted = completedRows.length;
  const totalInProgress = attemptsRes.rows.filter(r => r.started_at && !r.submitted_at).length;

  const rankedAttempts = attemptsRes.rows.map(r => {
    if (!r.submitted_at) return { ...r, air_rank: null, percentile: null };
    const rankIndex = completedRows.findIndex(cr => cr.id === r.id);
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
      totalOverrides: overridesRes.rows[0].count,
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
