import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const slugify = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 200);

/**
 * List all test series for admin, including dynamically calculated linked/planned test counts.
 */
export const listTestSeries = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT ts.*,
            COUNT(DISTINCT se.id)::int AS enrollment_count,
            COUNT(DISTINCT tst.test_id)::int AS linked_tests,
            COUNT(DISTINCT tst.test_id)::int AS planned_tests
     FROM test_series ts
     LEFT JOIN student_enrollments se ON se.test_series_id = ts.id
     LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
     GROUP BY ts.id ORDER BY ts.created_at DESC`
  );
  res.json({ test_series: result.rows });
});

/**
 * Create a new test series metadata row (No test or schedule creation).
 */
export const createTestSeries = asyncHandler(async (req, res) => {
  const { title, description, price, validity_days, exam_type, is_featured, is_active, image_url } = req.body;
  const slug = slugify(title) + '-' + Date.now().toString(36);
  const result = await query(
    `INSERT INTO test_series (title, slug, description, price, validity_days, exam_type, is_featured, is_active, image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [title, slug, description || '', price ?? 0, validity_days ?? 365, exam_type || 'General', is_featured ?? false, is_active ?? true, image_url || '']
  );
  res.status(201).json({ test_series: result.rows[0] });
});

/**
 * Update test series metadata row.
 */
export const updateTestSeries = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const fields = req.body;
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
 * Delete a test series.
 */
export const deleteTestSeries = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM test_series WHERE id = $1 RETURNING id', [id]);
  if (!result.rowCount) throw ApiError.notFound('Test series not found');
  res.json({ message: 'Test series permanently deleted' });
});

/**
 * Toggle test series active status.
 */
export const toggleTestSeriesActive = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { is_active } = req.body;
  const result = await query(
    'UPDATE test_series SET is_active = COALESCE($1, NOT is_active), updated_at = NOW() WHERE id = $2 RETURNING *',
    [typeof is_active === 'boolean' ? is_active : null, id]
  );
  if (!result.rowCount) throw ApiError.notFound('Test series not found');
  res.json({
    message: `Test series ${result.rows[0].is_active ? 'activated' : 'deactivated'} successfully`,
    test_series: result.rows[0],
  });
});

/**
 * Student: list my active enrollments.
 */
export const myEnrollments = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT se.*, ts.title, ts.slug, ts.exam_type, ts.image_url, ts.code, ts.target_year, ts.program_type,
            COUNT(DISTINCT tst.test_id)::int AS planned_tests,
            COUNT(DISTINCT tst.test_id)::int AS linked_tests,
            COUNT(DISTINCT CASE WHEN t.test_date IS NOT NULL THEN t.id END)::int AS scheduled_tests,
            COUNT(DISTINCT CASE WHEN t.is_published = true OR t.status = 'published' THEN t.id END)::int AS published_tests
     FROM student_enrollments se
     JOIN test_series ts ON ts.id = se.test_series_id
     LEFT JOIN test_series_tests tst ON tst.series_id = ts.id
     LEFT JOIN tests t ON t.id = tst.test_id AND COALESCE(t.is_deleted, FALSE) = FALSE
     WHERE se.user_id = $1 AND se.status = 'active' AND se.expires_at > NOW()
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
    `SELECT * FROM student_enrollments WHERE user_id = $1 AND test_series_id = $2 AND status = 'active' AND expires_at > NOW()`,
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

    const expires = new Date(Date.now() + series.validity_days * 86400000);
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
    `SELECT se.id FROM student_enrollments se
     JOIN test_series ts ON ts.id = se.test_series_id
     WHERE se.user_id = $1 AND ts.slug = $2 AND se.status = 'active' AND se.expires_at > NOW()`,
    [req.user.id, slug]
  );
  if (!enrolled.rowCount) throw ApiError.forbidden('Purchase this test series to access tests');

  const testsRes = await query(
    `SELECT t.*,
            lat.id AS attempt_id, lat.started_at, lat.submitted_at
     FROM test_series ts
     JOIN test_series_tests tst ON tst.series_id = ts.id
     JOIN tests t ON t.id = tst.test_id AND (t.is_published = true OR t.status = 'published') AND COALESCE(t.is_deleted, false) = false
     LEFT JOIN LATERAL (
       SELECT ta.id, ta.started_at, ta.submitted_at
       FROM test_attempts ta
       WHERE ta.test_id = t.id AND ta.student_id = $2
       ORDER BY ta.started_at DESC
       LIMIT 1
     ) lat ON true
     WHERE ts.slug = $1
     ORDER BY t.test_date DESC, t.start_time DESC`,
    [slug, req.user.id]
  );
  res.json({ tests: testsRes.rows });
});
