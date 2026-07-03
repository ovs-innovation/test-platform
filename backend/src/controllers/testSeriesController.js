import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const slugify = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 200);

export const listTestSeries = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT ts.*,
            COUNT(DISTINCT se.id)::int AS enrollment_count,
            COUNT(DISTINCT tsa.assessment_id)::int AS linked_tests
     FROM test_series ts
     LEFT JOIN student_enrollments se ON se.test_series_id = ts.id
     LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
     GROUP BY ts.id ORDER BY ts.created_at DESC`
  );
  res.json({ test_series: result.rows });
});

export const createTestSeries = asyncHandler(async (req, res) => {
  const { title, description, price, validity_days, exam_type, test_count, is_featured, image_url } = req.body;
  const slug = slugify(title) + '-' + Date.now().toString(36);
  const result = await query(
    `INSERT INTO test_series (title, slug, description, price, validity_days, exam_type, test_count, is_featured, image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
    [title, slug, description || '', price ?? 0, validity_days ?? 365, exam_type || 'General', test_count ?? 0, is_featured ?? false, image_url || '']
  );
  res.status(201).json({ test_series: result.rows[0] });
});

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

export const linkAssessment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { assessment_id, label, position } = req.body;
  await query(
    `INSERT INTO test_series_assessments (test_series_id, assessment_id, label, position)
     VALUES ($1,$2,$3,$4)
     ON CONFLICT (test_series_id, assessment_id) DO UPDATE SET label = EXCLUDED.label, position = EXCLUDED.position`,
    [id, assessment_id, label || '', position ?? 0]
  );
  res.json({ message: 'Test linked' });
});

/** Student: my enrollments */
export const myEnrollments = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT se.*, ts.title, ts.slug, ts.exam_type, ts.test_count, ts.image_url,
            COUNT(DISTINCT tsa.assessment_id)::int AS available_tests
     FROM student_enrollments se
     JOIN test_series ts ON ts.id = se.test_series_id
     LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
     WHERE se.user_id = $1 AND se.status = 'active' AND se.expires_at > NOW()
     GROUP BY se.id, ts.id ORDER BY se.purchased_at DESC`,
    [req.user.id]
  );
  res.json({ enrollments: result.rows });
});

/** Student: purchase / enroll (mock payment in dev) */
export const enrollTestSeries = asyncHandler(async (req, res) => {
  const { test_series_id } = req.body;
  const userId = req.user.id;

  const ts = await query('SELECT * FROM test_series WHERE id = $1 AND is_active = true', [test_series_id]);
  if (!ts.rowCount) throw ApiError.notFound('Test series not found');
  const series = ts.rows[0];

  const existing2 = await query(
    `SELECT * FROM student_enrollments WHERE user_id = $1 AND test_series_id = $2 AND status = 'active' AND expires_at > NOW()`,
    [userId, test_series_id]
  );
  if (existing2.rowCount) {
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

/** Tests in enrolled series for student */
export const mySeriesTests = asyncHandler(async (req, res) => {
  const { slug } = req.params;
  const enrolled = await query(
    `SELECT se.id FROM student_enrollments se
     JOIN test_series ts ON ts.id = se.test_series_id
     WHERE se.user_id = $1 AND ts.slug = $2 AND se.status = 'active' AND se.expires_at > NOW()`,
    [req.user.id, slug]
  );
  if (!enrolled.rowCount) throw ApiError.forbidden('Purchase this test series to access tests');

  const tests = await query(
    `SELECT a.id, a.title, a.description, a.duration_minutes, a.passing_marks,
            tsa.label, tsa.position,
            at.id AS attempt_id, at.status AS attempt_status,
            s.percentage, s.passed
     FROM test_series ts
     JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
     JOIN assessments a ON a.id = tsa.assessment_id AND a.is_published = true
     LEFT JOIN attempts at ON at.assessment_id = a.id AND at.candidate_id = $2
     LEFT JOIN scores s ON s.attempt_id = at.id
     WHERE ts.slug = $1
     ORDER BY tsa.position`,
    [slug, req.user.id]
  );
  res.json({ tests: tests.rows });
});

export const deleteTestSeries = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('UPDATE test_series SET is_active = false WHERE id = $1 RETURNING id', [id]);
  if (!result.rowCount) throw ApiError.notFound('Test series not found');
  res.json({ message: 'Test series deactivated' });
});

export const unlinkAssessment = asyncHandler(async (req, res) => {
  const { id, assessmentId } = req.params;
  await query('DELETE FROM test_series_assessments WHERE test_series_id = $1 AND assessment_id = $2', [id, assessmentId]);
  res.json({ message: 'Test unlinked' });
});
