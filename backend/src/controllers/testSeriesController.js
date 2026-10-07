import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { delCache } from '../config/redis.js';

const slugify = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 200);

/**
 * List all test series for admin, including dynamically calculated linked/planned test counts and tests list.
 */
export const listTestSeries = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT ts.*,
            ts.is_active::boolean AS is_active,
            COUNT(DISTINCT se.id)::int AS enrollment_count,
            COUNT(DISTINCT tst.test_id)::int AS linked_tests,
            COUNT(DISTINCT tst.test_id)::int AS planned_tests,
            COALESCE(
              (
                SELECT json_agg(
                  json_build_object(
                    'id', t.id,
                    'title', COALESCE(t.test_name, t.title),
                    'test_type', t.test_type
                  )
                )
                FROM test_series_tests tst2
                JOIN tests t ON t.id = tst2.test_id AND COALESCE(t.is_deleted, FALSE) = FALSE
                WHERE tst2.series_id = ts.id
              ), '[]'::json
            ) AS tests
     FROM test_series ts
     LEFT JOIN student_enrollments se ON se.test_series_id = ts.id
     LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
     GROUP BY ts.id ORDER BY ts.display_order ASC, ts.created_at DESC`
  );
  res.json({ test_series: result.rows });
});

/**
 * Create a new test series metadata row (No test or schedule creation).
 */
export const createTestSeries = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    validity_days,
    exam_type,
    is_featured,
    is_active,
    image_url,
    is_free,
    display_order,
    brochure_url,
    brochure_name,
    planned_tests,
    target_class,
    program_type,
    target_year,
    duration_months,
    duration_text,
  } = req.body;
  const slug = slugify(title) + '-' + Date.now().toString(36);
  const calculatedIsFree = typeof is_free === 'boolean' ? is_free : Number(price) === 0;

  // Auto-detect target class if not provided
  let detectedTargetClass = target_class;
  if (!detectedTargetClass) {
    if (/two[- ]?year|2028|2[- ]year|11\s*(?:&|and|\+)\s*12/i.test(title)) {
      detectedTargetClass = '11 + 12';
    } else if (/rm|repeater|dropper/i.test(title)) {
      detectedTargetClass = 'Dropper / 12 Passed';
    } else {
      detectedTargetClass = 'Class 12';
    }
  }

  // Auto-detect program type if not provided
  let detectedProgramType = program_type;
  if (!detectedProgramType) {
    if (detectedTargetClass === '11 + 12') detectedProgramType = 'Two Year';
    else if (detectedTargetClass === 'Dropper / 12 Passed') detectedProgramType = 'Repeater';
    else if (detectedTargetClass === 'Foundation') detectedProgramType = 'Foundation';
    else detectedProgramType = /two[- ]?year|2028|2[- ]year/i.test(title) ? 'Two Year' : 'One Year';
  }

  // Auto-detect target year if not provided
  let detectedTargetYear = target_year;
  if (!detectedTargetYear) {
    detectedTargetYear = (detectedProgramType === 'Two Year' || detectedTargetClass === '11 + 12') ? '2028' : '2027';
  }

  // Auto-detect exam type if General or default
  let detectedExamType = exam_type || 'General';
  if ((!exam_type || exam_type === 'JEE Main' || exam_type === 'General') && /neet/i.test(title)) {
    detectedExamType = /neet[- ]?pg/i.test(title) ? 'NEET PG' : 'NEET UG';
  }

  const numericPlanned = Number(planned_tests) || 0;

  const resolvedValidityDays = (validity_days !== undefined && validity_days !== null && validity_days !== '' && Number(validity_days) > 0)
    ? Number(validity_days)
    : null;

  const result = await query(
    `INSERT INTO test_series (
       title, slug, description, price, validity_days, exam_type, is_featured, is_active,
       image_url, is_free, display_order, brochure_url, brochure_name,
       planned_tests, test_count, program_type, target_year, duration_months, duration_text,
       target_class
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20) RETURNING *`,
    [
      title,
      slug,
      description || '',
      price ?? 0,
      resolvedValidityDays,
      detectedExamType,
      is_featured ?? false,
      is_active ?? true,
      image_url || '',
      calculatedIsFree,
      display_order ?? 0,
      brochure_url && typeof brochure_url === 'string' && brochure_url.trim() ? brochure_url.trim() : null,
      brochure_name && typeof brochure_name === 'string' && brochure_name.trim() ? brochure_name.trim() : null,
      numericPlanned,
      numericPlanned,
      detectedProgramType,
      detectedTargetYear,
      Number(duration_months) || (detectedProgramType === 'Two Year' ? 24 : 12),
      duration_text || null,
      detectedTargetClass,
    ]
  );
  await delCache('cache:public_test_series:*').catch(() => {});
  res.status(201).json({ test_series: result.rows[0] });
});

/**
 * Update test series metadata row.
 */
export const updateTestSeries = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fields = { ...req.body };
  if ('validity_days' in fields) {
    if (fields.validity_days === null || fields.validity_days === '' || Number(fields.validity_days) <= 0) {
      fields.validity_days = null;
    } else {
      fields.validity_days = Number(fields.validity_days);
    }
  }
  if ('duration_months' in fields && fields.duration_months !== undefined && fields.duration_months !== null) {
    const dm = Number(fields.duration_months);
    fields.duration_months = (!isNaN(dm) && dm > 0) ? dm : 12;
  }
  if ('brochure_url' in fields) {
    fields.brochure_url = fields.brochure_url && typeof fields.brochure_url === 'string' && fields.brochure_url.trim()
      ? fields.brochure_url.trim()
      : null;
  }
  if ('brochure_name' in fields) {
    fields.brochure_name = fields.brochure_name && typeof fields.brochure_name === 'string' && fields.brochure_name.trim()
      ? fields.brochure_name.trim()
      : null;
  }
  const keys = Object.keys(fields);
  if (!keys.length) throw ApiError.badRequest('No fields to update');
  const set = keys.map((k, i) => `${k} = $${i + 1}`);
  set.push('updated_at = NOW()');
  const values = [...keys.map((k) => fields[k]), id];
  const result = await query(
    `UPDATE test_series SET ${set.join(', ')} WHERE id = $${values.length} RETURNING *`,
    values
  );
  if (!result.rowCount) throw ApiError.notFound('Test series not found');
  await delCache('cache:public_test_series:*').catch(() => {});
  res.json({ test_series: result.rows[0] });
});

/**
 * Link an existing test (from tests table) to a test series via join table test_series_tests.
 * Must NOT create a new test record.
 */
export const linkTest = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { test_id } = req.body;
  if (!test_id) throw ApiError.badRequest('test_id is required');

  await query(
    `INSERT INTO test_series_tests (series_id, test_id)
     VALUES ($1, $2)
     ON CONFLICT (series_id, test_id) DO NOTHING`,
    [id, test_id]
  );
  res.json({ message: 'Test linked successfully' });
});

/**
 * Unlink a test from a test series by removing entry from test_series_tests.
 */
export const unlinkTest = asyncHandler(async (req, res) => {
  const { id, testId } = req.params;
  await query('DELETE FROM test_series_tests WHERE series_id = $1 AND test_id = $2', [id, testId]);
  res.json({ message: 'Test unlinked successfully' });
});

/**
 * Delete a test series cleanly across all dependent relations.
 */
export const deleteTestSeries = asyncHandler(async (req, res) => {
  const { id } = req.params;

  await withTransaction(async (client) => {
    // Delete dependent references in join tables & enrollments to prevent foreign key errors
    await client.query('DELETE FROM test_series_tests WHERE series_id = $1', [id]);
    await client.query('DELETE FROM test_series_assessments WHERE test_series_id = $1', [id]);
    await client.query('DELETE FROM student_enrollments WHERE test_series_id = $1', [id]);
    await client.query('DELETE FROM payments WHERE test_series_id = $1', [id]);
    await client.query('DELETE FROM institution_packages WHERE package_id = $1', [id]).catch(() => {});
    await client.query('DELETE FROM package_tests WHERE package_id = $1', [id]).catch(() => {});

    const result = await client.query('DELETE FROM test_series WHERE id = $1 RETURNING id', [id]);
    if (!result.rowCount) throw ApiError.notFound('Test series not found');
  });

  await delCache('cache:public_test_series:*').catch(() => {});
  res.json({ message: 'Test series permanently deleted' });
});

/**
 * Toggle test series active status.
 */
export const toggleTestSeriesActive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;

  const seriesId = Number(id);
  if (!seriesId || isNaN(seriesId)) throw ApiError.badRequest('Invalid series id');

  let targetState;
  if (typeof is_active === 'boolean') {
    targetState = is_active;
  } else if (is_active === 'true' || is_active === 'false') {
    targetState = is_active === 'true';
  } else {
    const check = await query('SELECT is_active FROM test_series WHERE id = $1', [seriesId]);
    if (!check.rowCount) throw ApiError.notFound('Test series not found');
    targetState = !check.rows[0].is_active;
  }

  const result = await query(
    'UPDATE test_series SET is_active = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [targetState, seriesId]
  );
  if (!result.rowCount) throw ApiError.notFound('Test series not found');

  await delCache('cache:public_test_series:*').catch(() => {});
  res.json({
    message: `Test series ${result.rows[0].is_active ? 'activated' : 'deactivated'} successfully`,
    test_series: result.rows[0],
  });
});

/**
 * Student: list my active enrollments.
 */
export const myEnrollments = asyncHandler(async (req, res) => {
  // Auto-sync any test series assigned to student's batch, institution, individual, or 'all'
  await query(`
    INSERT INTO student_enrollments (user_id, test_series_id, status, purchased_at, expires_at, assignment_type)
    SELECT 
      $1, 
      tsa.test_series_id, 
      'active', 
      NOW(), 
      NOW() + (COALESCE(tsa.validity_days, ts.validity_days, 365) || ' days')::interval,
      'admin_' || tsa.assigned_to_type
    FROM test_series_assignments tsa
    JOIN test_series ts ON ts.id = tsa.test_series_id AND ts.is_active = TRUE
    JOIN users u ON u.id = $1
    WHERE (
      tsa.assigned_to_type = 'all'
      OR (tsa.assigned_to_type = 'student' AND tsa.assigned_to_id = $1)
      OR (tsa.assigned_to_type = 'individual' AND tsa.assigned_to_id = $1)
      OR (tsa.assigned_to_type = 'batch' AND u.batch_id = tsa.assigned_to_id)
      OR (tsa.assigned_to_type = 'institution' AND u.institution_id = tsa.assigned_to_id)
    )
    ON CONFLICT (user_id, test_series_id) DO NOTHING
  `, [req.user.id]).catch(() => {});

  const result = await query(
    `SELECT se.*, ts.title, ts.slug, ts.exam_type, ts.image_url, ts.code, ts.target_year, ts.program_type, ts.brochure_url, ts.brochure_name,
            COUNT(DISTINCT COALESCE(tst.test_id, tsa.assessment_id))::int AS planned_tests,
            COUNT(DISTINCT COALESCE(tst.test_id, tsa.assessment_id))::int AS linked_tests,
            COUNT(DISTINCT CASE WHEN (t.test_date IS NOT NULL OR a.available_from IS NOT NULL) THEN COALESCE(t.id, a.id) END)::int AS scheduled_tests,
            COUNT(DISTINCT CASE WHEN (t.is_published = true OR t.status = 'published' OR a.is_published = true) THEN COALESCE(t.id, a.id) END)::int AS published_tests,
            COUNT(DISTINCT CASE 
              WHEN (att.status IN ('submitted', 'auto_submitted') AND att.submitted_at IS NOT NULL) 
                OR tat.submitted_at IS NOT NULL 
              THEN COALESCE(t.id, a.id) 
            END)::int AS completed_tests
     FROM student_enrollments se
     JOIN test_series ts ON ts.id = se.test_series_id
     LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
     LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
     LEFT JOIN tests t ON t.id = tst.test_id AND COALESCE(t.is_deleted, FALSE) = FALSE
     LEFT JOIN assessments a ON a.id = tsa.assessment_id AND a.is_published = true
     LEFT JOIN attempts att ON (att.assessment_id = t.id OR att.assessment_id = a.id) AND att.candidate_id = $1
     LEFT JOIN test_attempts tat ON (tat.test_id = t.id OR tat.test_id = a.id) AND tat.student_id = $1
     WHERE se.user_id = $1 AND se.status = 'active' AND (se.expires_at IS NULL OR se.expires_at > NOW())
     GROUP BY se.id, ts.id ORDER BY se.purchased_at DESC`,
    [req.user.id]
  );
  res.json({ enrollments: result.rows });
});

/**
 * Student: enroll in a test series.
 */
export const enrollTestSeries = asyncHandler(async (req, res) => {
  const { test_series_id } = req.body;
  const userId = req.user.id;

  const ts = await query('SELECT * FROM test_series WHERE id = $1 AND is_active = true', [test_series_id]);
  if (!ts.rowCount) throw ApiError.notFound('Test series not found');
  const series = ts.rows[0];

  const existing = await query(
    `SELECT * FROM student_enrollments WHERE user_id = $1 AND test_series_id = $2 AND status = 'active' AND (expires_at IS NULL OR expires_at > NOW())`,
    [userId, test_series_id]
  );
  if (existing.rowCount) {
    throw ApiError.conflict('You already have access to this test series');
  }

  const result = await withTransaction(async (client) => {
    let paymentId = null;
    if (Number(series.price) > 0) {
      const pay = await client.query(
        `INSERT INTO payments (user_id, test_series_id, amount, status, razorpay_order_id, razorpay_payment_id)
         VALUES ($1,$2,$3,'success',$4,$5) RETURNING id`,
        [userId, test_series_id, series.price, `mock_order_${Date.now()}`, `mock_pay_${Date.now()}`]
      );
      paymentId = pay.rows[0].id;
    }

    const validityDays = (series.validity_days && Number(series.validity_days) > 0) ? Number(series.validity_days) : 365;
    const expires = new Date(Date.now() + validityDays * 86400000);
    const enroll = await client.query(
      `INSERT INTO student_enrollments (user_id, test_series_id, payment_id, expires_at)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [userId, test_series_id, paymentId, expires]
    );

    await client.query(
      `INSERT INTO notifications (user_id, title, body, type)
       VALUES ($1,$2,$3,'purchase')`,
      [userId, 'Test series unlocked', `You now have access to "${series.title}"`]
    );

    return enroll.rows[0];
  });

  res.status(201).json({ enrollment: result, message: 'Enrolled successfully' });
});

/**
 * Student: list tests in an enrolled test series.
 */
export const mySeriesTests = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const enrolled = await query(
    `SELECT se.id, ts.id AS series_id, ts.title, ts.slug, ts.brochure_url, ts.brochure_name
     FROM student_enrollments se
     JOIN test_series ts ON ts.id = se.test_series_id
     WHERE se.user_id = $1 AND ts.slug = $2 AND se.status = 'active' AND (se.expires_at IS NULL OR se.expires_at > NOW())`,
    [req.user.id, slug]
  );
  if (!enrolled.rowCount) throw ApiError.forbidden('Purchase this test series to access tests');

  const testsRes = await query(
    `WITH raw_items AS (
        SELECT 
          tst.series_id,
          t.id,
          COALESCE(t.title, t.test_name) AS title,
          COALESCE(t.title, t.test_name) AS label,
          COALESCE(t.duration_minutes, 180) AS duration_minutes,
          COALESCE(t.max_marks, 720) AS max_marks,
          t.test_date,
          t.start_time::text AS start_time,
          t.end_time::text AS end_time,
          t.available_from,
          t.available_until,
          t.question_paper_url,
          t.solution_pdf_url,
          t.answer_key_url,
          1 AS sort_order
        FROM test_series_tests tst
        JOIN tests t ON t.id = tst.test_id AND (t.is_published = true OR t.status = 'published') AND COALESCE(t.is_deleted, false) = false

        UNION ALL

        SELECT 
          tsa.test_series_id AS series_id,
          a.id,
          COALESCE(tsa.label, a.title) AS title,
          COALESCE(tsa.label, a.title) AS label,
          COALESCE(a.duration_minutes, 180) AS duration_minutes,
          COALESCE(a.passing_marks, 720) AS max_marks,
          a.available_from::date AS test_date,
          a.start_time::text AS start_time,
          a.end_time::text AS end_time,
          a.available_from,
          a.available_until,
          a.question_paper_url,
          a.solution_pdf_url,
          a.answer_key_url,
          COALESCE(tsa.position, 1) AS sort_order
        FROM test_series_assessments tsa
        JOIN assessments a ON a.id = tsa.assessment_id AND a.is_published = true
     ),
     series_items AS (
        SELECT DISTINCT ON (series_id, id) * FROM raw_items
     )
     SELECT 
       item.*,
       lat.attempt_id,
       lat.attempt_status,
       lat.started_at,
       lat.submitted_at,
       lat.percentage,
       lat.marks_obtained
     FROM test_series ts
     JOIN series_items item ON item.series_id = ts.id
     LEFT JOIN LATERAL (
        SELECT 
          COALESCE(att.id, tat.id) AS attempt_id,
          COALESCE(att.status::text, CASE WHEN tat.submitted_at IS NOT NULL THEN 'submitted' WHEN tat.started_at IS NOT NULL THEN 'in_progress' ELSE NULL END) AS attempt_status,
          COALESCE(att.started_at, tat.started_at) AS started_at,
          COALESCE(att.submitted_at, tat.submitted_at) AS submitted_at,
          COALESCE(s.percentage, tat.percentage) AS percentage,
          COALESCE(s.marks_obtained, tat.score) AS marks_obtained
        FROM (SELECT 1) dummy
        LEFT JOIN attempts att ON att.assessment_id = item.id AND att.candidate_id = $2
        LEFT JOIN scores s ON s.attempt_id = att.id
        LEFT JOIN test_attempts tat ON tat.test_id = item.id AND tat.student_id = $2
        ORDER BY 
          CASE WHEN att.status IN ('submitted', 'auto_submitted') OR tat.submitted_at IS NOT NULL THEN 1 ELSE 2 END ASC,
          COALESCE(att.submitted_at, tat.submitted_at, att.started_at, tat.started_at) DESC NULLS LAST
        LIMIT 1
     ) lat ON true
     WHERE ts.slug = $1
     ORDER BY item.sort_order ASC, item.test_date DESC NULLS LAST`,
    [slug, req.user.id]
  );
  res.json({ tests: testsRes.rows, test_series: enrolled.rows[0] });
});

/**
 * Admin: Trigger idempotent catalogue data sync script.
 */
export const syncCatalogue = asyncHandler(async (_req, res) => {
  const { runCatalogueSync } = await import('../../scripts/sync-catalogue-series.mjs');
  await runCatalogueSync();
  const updated = await query(
    `SELECT ts.*,
            COUNT(DISTINCT se.id)::int AS enrollment_count,
            COUNT(DISTINCT tst.test_id)::int AS linked_tests,
            COUNT(DISTINCT tst.test_id)::int AS planned_tests
     FROM test_series ts
     LEFT JOIN student_enrollments se ON se.test_series_id = ts.id
     LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
     GROUP BY ts.id ORDER BY ts.display_order ASC, ts.created_at DESC`
  );
  res.json({ message: 'Catalogue synced successfully', test_series: updated.rows });
});

/**
 * Admin: Assign test series to an individual student, batch, institution, or all candidates.
 */
export const assignTestSeries = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const seriesId = Number(id);
  const { assigned_to_type: rawType, assigned_to_id, validity_days, notes, notify = true } = req.body;

  const assigned_to_type = rawType === 'individual' ? 'student' : rawType;

  // 1. Check if test series exists
  const tsRes = await query('SELECT * FROM test_series WHERE id = $1', [seriesId]);
  if (!tsRes.rowCount) throw ApiError.notFound('Test series not found');
  const series = tsRes.rows[0];

  const targetId = assigned_to_type === 'all' ? null : Number(assigned_to_id);
  if (assigned_to_type !== 'all' && (!targetId || isNaN(targetId))) {
    throw ApiError.badRequest('A valid Target ID is required');
  }

  // 2. Resolve validity days & expiration date
  const valDays = (validity_days && Number(validity_days) > 0)
    ? Number(validity_days)
    : ((series.validity_days && Number(series.validity_days) > 0) ? Number(series.validity_days) : 365);
  const expiresAt = new Date(Date.now() + valDays * 86400000);

  // 3. Resolve candidate students
  let candidates = [];
  let targetDisplayName = '';

  if (assigned_to_type === 'student') {
    const studentRes = await query(
      `SELECT id, name, email FROM users WHERE id = $1 AND role = 'candidate'`,
      [targetId]
    );
    if (!studentRes.rowCount) {
      throw ApiError.notFound('Student candidate not found');
    }
    candidates = studentRes.rows;
    targetDisplayName = `Student "${candidates[0].name}" (${candidates[0].email})`;
  } else if (assigned_to_type === 'batch') {
    const batchRes = await query(
      `SELECT id, COALESCE(batch_name, name) AS name FROM batches WHERE id = $1`,
      [targetId]
    );
    if (!batchRes.rowCount) {
      throw ApiError.notFound('Batch not found');
    }
    targetDisplayName = `Batch "${batchRes.rows[0].name}"`;
    const studentsRes = await query(
      `SELECT id, name, email FROM users WHERE batch_id = $1 AND role = 'candidate'`,
      [targetId]
    );
    candidates = studentsRes.rows;
  } else if (assigned_to_type === 'institution') {
    const instRes = await query(
      `SELECT id, name FROM institutions WHERE id = $1`,
      [targetId]
    );
    if (!instRes.rowCount) {
      throw ApiError.notFound('Partner School / Institution not found');
    }
    targetDisplayName = `Institution "${instRes.rows[0].name}"`;
    const studentsRes = await query(
      `SELECT DISTINCT u.id, u.name, u.email
       FROM users u
       LEFT JOIN batches b ON b.id = u.batch_id
       WHERE (u.institution_id = $1 OR b.institution_id = $1) AND u.role = 'candidate'`,
      [targetId]
    );
    candidates = studentsRes.rows;

    // Send institution admin notification
    if (notify) {
      await query(
        `INSERT INTO institution_notifications (institution_id, title, message, type, target_type, target_id)
         VALUES ($1, $2, $3, 'test_series_assigned', 'test_series', $4)`,
        [
          targetId,
          'Test Series Assigned by Platform Admin',
          `Platform Admin assigned test series "${series.title}" to your institution. All students now have full access.`,
          seriesId,
        ]
      ).catch(() => {});
    }
  } else if (assigned_to_type === 'all') {
    targetDisplayName = 'All Platform Candidates';
    const studentsRes = await query(
      `SELECT id, name, email FROM users WHERE role = 'candidate'`
    );
    candidates = studentsRes.rows;
  }

  // 4. Record the assignment rule in test_series_assignments
  const assignmentRes = await query(
    `INSERT INTO test_series_assignments (test_series_id, assigned_to_type, assigned_to_id, validity_days, notes)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [seriesId, assigned_to_type, targetId, valDays, notes || null]
  );

  // 5. Enroll students in student_enrollments
  const assignmentTypeStr = `admin_${assigned_to_type}`;
  let enrolledCount = 0;

  for (const student of candidates) {
    await query(
      `INSERT INTO student_enrollments (user_id, test_series_id, status, purchased_at, expires_at, assignment_type, notes)
       VALUES ($1, $2, 'active', NOW(), $3, $4, $5)
       ON CONFLICT (user_id, test_series_id)
       DO UPDATE SET
         status = 'active',
         expires_at = EXCLUDED.expires_at,
         assignment_type = EXCLUDED.assignment_type,
         notes = COALESCE(EXCLUDED.notes, student_enrollments.notes)`,
      [student.id, seriesId, expiresAt, assignmentTypeStr, notes || null]
    );
    enrolledCount++;

    if (notify) {
      await query(
        `INSERT INTO notifications (user_id, title, body, type)
         VALUES ($1, $2, $3, 'test_series')`,
        [
          student.id,
          'Test Series Assigned',
          `Admin assigned "${series.title}" to you. You can now access and attempt all included mock tests!`,
        ]
      ).catch(() => {});
    }
  }

  await delCache('cache:public_test_series:*').catch(() => {});

  res.status(201).json({
    success: true,
    message: `Assigned "${series.title}" to ${targetDisplayName} (${enrolledCount} student${enrolledCount === 1 ? '' : 's'} enrolled).`,
    enrolled_count: enrolledCount,
    assignment: assignmentRes.rows[0],
  });
});

/**
 * Admin: View all assignments and enrolled candidates for a test series.
 */
export const getTestSeriesAssignments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const seriesId = Number(id);

  const seriesRes = await query('SELECT id, title, price, exam_type, validity_days FROM test_series WHERE id = $1', [seriesId]);
  if (!seriesRes.rowCount) throw ApiError.notFound('Test series not found');

  const assignmentsRes = await query(
    `SELECT 
       tsa.*,
       CASE 
         WHEN tsa.assigned_to_type = 'student' THEN u.name
         WHEN tsa.assigned_to_type = 'batch' THEN COALESCE(b.batch_name, b.name)
         WHEN tsa.assigned_to_type = 'institution' THEN i.name
         WHEN tsa.assigned_to_type = 'all' THEN 'All Registered Students'
         ELSE 'Unknown'
       END AS target_name,
       CASE 
         WHEN tsa.assigned_to_type = 'student' THEN u.email
         WHEN tsa.assigned_to_type = 'batch' THEN COALESCE(b.description, 'Batch')
         WHEN tsa.assigned_to_type = 'institution' THEN COALESCE(i.code, 'Partner School')
         ELSE 'Platform-Wide'
       END AS target_details,
       u.roll_number AS student_roll_number
     FROM test_series_assignments tsa
     LEFT JOIN users u ON u.id = tsa.assigned_to_id AND tsa.assigned_to_type = 'student'
     LEFT JOIN batches b ON b.id = tsa.assigned_to_id AND tsa.assigned_to_type = 'batch'
     LEFT JOIN institutions i ON i.id = tsa.assigned_to_id AND tsa.assigned_to_type = 'institution'
     WHERE tsa.test_series_id = $1
     ORDER BY tsa.created_at DESC`,
    [seriesId]
  );

  const enrollmentsRes = await query(
    `SELECT 
       se.id,
       se.user_id,
       se.test_series_id,
       se.status,
       se.purchased_at,
       se.expires_at,
       se.assignment_type,
       se.notes,
       u.name AS student_name,
       u.email AS student_email,
       COALESCE(u.roll_number, sp.roll_number, '') AS roll_number,
       COALESCE(i.name, ib.name, '') AS institution_name,
       COALESCE(b.batch_name, b.name, '') AS batch_name
     FROM student_enrollments se
     JOIN users u ON u.id = se.user_id
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     LEFT JOIN batches b ON b.id = u.batch_id
     LEFT JOIN institutions i ON i.id = u.institution_id
     LEFT JOIN institutions ib ON ib.id = b.institution_id
     WHERE se.test_series_id = $1
     ORDER BY se.purchased_at DESC`,
    [seriesId]
  );

  res.json({
    success: true,
    test_series: seriesRes.rows[0],
    assignments: assignmentsRes.rows,
    enrollments: enrollmentsRes.rows,
    stats: {
      total_assignments: assignmentsRes.rows.length,
      total_enrollments: enrollmentsRes.rows.length,
    },
  });
});

/**
 * Admin: Delete an assignment rule.
 */
export const deleteTestSeriesAssignment = asyncHandler(async (req, res) => {
  const { id, assignmentId } = req.params;
  const result = await query(
    `DELETE FROM test_series_assignments WHERE id = $1 AND test_series_id = $2 RETURNING *`,
    [assignmentId, id]
  );
  if (!result.rowCount) throw ApiError.notFound('Assignment record not found');
  res.json({ success: true, message: 'Assignment rule removed successfully', deleted: result.rows[0] });
});

/**
 * Admin: Revoke a specific student's enrollment from a test series.
 */
export const revokeTestSeriesEnrollment = asyncHandler(async (req, res) => {
  const { id, enrollmentId } = req.params;
  const result = await query(
    `DELETE FROM student_enrollments WHERE id = $1 AND test_series_id = $2 RETURNING id, user_id`,
    [enrollmentId, id]
  );
  if (!result.rowCount) throw ApiError.notFound('Student enrollment not found');
  res.json({ success: true, message: 'Student access revoked successfully', revoked: result.rows[0] });
});
