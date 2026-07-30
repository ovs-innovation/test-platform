import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { parseQuestionsFromPdf } from '../utils/pdfQuestions.js';

const slugify = (t) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 200);

const decodePdfBase64 = (raw) => {
  const base64 = raw.replace(/^data:application\/pdf;base64,/, '').trim();
  const buffer = Buffer.from(base64, 'base64');
  if (!buffer.length) throw ApiError.badRequest('Invalid PDF file');
  if (buffer.length > 8 * 1024 * 1024) throw ApiError.badRequest('PDF must be under 8 MB');
  return buffer;
};

const DEFAULT_SECTIONS = [
  { name: 'Aptitude', section_type: 'aptitude', position: 1 },
  { name: 'Technical MCQ', section_type: 'technical_mcq', position: 2 },
  { name: 'Coding', section_type: 'coding', position: 3 },
  { name: 'Subjective', section_type: 'subjective', position: 4 },
];

export const parsePdfPreview = asyncHandler(async (req, res) => {
  const buffer = decodePdfBase64(req.body.pdf_base64);
  const parsed = await parseQuestionsFromPdf(buffer);
  res.json({
    question_count: parsed.question_count,
    questions: parsed.rows.slice(0, 20),
    errors: parsed.errors,
    text_preview: parsed.text_preview,
  });
});

export const importTestSeriesFromPdf = asyncHandler(async (req, res) => {
  const {
    pdf_base64,
    title,
    description,
    price,
    validity_days,
    exam_type,
    duration_minutes,
    is_featured,
    image_url,
    publish,
    assessment_label,
  } = req.body;

  const buffer = decodePdfBase64(pdf_base64);
  const { rows, errors } = await parseQuestionsFromPdf(buffer);
  if (!rows.length) {
    throw ApiError.badRequest('Could not parse any questions from this PDF. Use Q1. … with (A)(B)(C)(D) options.', { errors });
  }

  const slug = `${slugify(title)}-${Date.now().toString(36)}`;
  const passingMarks = Math.max(1, Math.round(rows.length * 4 * 0.4));

  const result = await withTransaction(async (client) => {
    const seriesRes = await client.query(
      `INSERT INTO test_series (title, slug, description, price, validity_days, exam_type, test_count, is_featured, image_url)
       VALUES ($1,$2,$3,$4,$5,$6,1,$7,$8) RETURNING *`,
      [title, slug, description || '', price ?? 0, validity_days ?? 365, exam_type || 'General', is_featured ?? false, image_url || '']
    );
    const series = seriesRes.rows[0];

    const assessmentRes = await client.query(
      `INSERT INTO assessments
         (title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, is_published, created_by)
       VALUES ($1,$2,$3,$4,$5,$6,true,$7,$8) RETURNING *`,
      [
        `${title} — ${assessment_label || 'Mock 1'}`,
        description || `Imported from PDF (${rows.length} questions)`,
        'NTA-style CBT. All questions are compulsory unless marked optional.',
        duration_minutes ?? 180,
        passingMarks,
        5,
        publish ? true : false,
        req.user.id,
      ]
    );
    const assessment = assessmentRes.rows[0];

    const subjectSectionsMap = new Map();
    let secPos = 0;

    for (const row of rows) {
      const cat = row.bank_category || 'General';
      if (!subjectSectionsMap.has(cat)) {
        secPos += 1;
        const secRes = await client.query(
          `INSERT INTO assessment_sections (assessment_id, name, section_type, position)
           VALUES ($1, $2, 'technical_mcq', $3) RETURNING id`,
          [assessment.id, cat, secPos]
        );
        subjectSectionsMap.set(cat, secRes.rows[0].id);
      }
    }

    let position = 0;
    for (const row of rows) {
      position += 1;
      const cat = row.bank_category || 'General';
      const sectionId = subjectSectionsMap.get(cat);

      await client.query(
        `INSERT INTO questions
           (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices, marks, position, bank_category)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)`,
        [
          assessment.id,
          sectionId,
          row.question_type,
          row.question_text,
          JSON.stringify(row.options),
          row.correct_index,
          JSON.stringify(row.correct_indices || []),
          row.marks,
          position,
          cat,
        ]
      );
    }

    await client.query(
      `INSERT INTO test_series_assessments (test_series_id, assessment_id, label, position)
       VALUES ($1,$2,$3,1)`,
      [series.id, assessment.id, assessment_label || 'Mock 1']
    );

    return { series, assessment, questions_created: rows.length, parse_errors: errors };
  });

  res.status(201).json({
    message: `Test series created with ${result.questions_created} questions`,
    ...result,
  });
});

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

export const bulkLinkAssessments = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { assessment_ids } = req.body; // array of assessment IDs
  if (!Array.isArray(assessment_ids) || !assessment_ids.length) {
    throw ApiError.badRequest('assessment_ids array is required');
  }

  await withTransaction(async (client) => {
    let pos = 1;
    for (const aId of assessment_ids) {
      await client.query(
        `INSERT INTO test_series_assessments (test_series_id, assessment_id, label, position)
         VALUES ($1,$2,$3,$4)
         ON CONFLICT (test_series_id, assessment_id) DO NOTHING`,
        [id, aId, `Test ${pos}`, pos]
      );
      pos += 1;
    }
  });

  res.json({ message: `Successfully linked ${assessment_ids.length} tests` });
});

export const generateDraftStructure = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { count = 10, prefix = 'Draft Assessment' } = req.body;

  const ts = await query('SELECT * FROM test_series WHERE id = $1', [id]);
  if (!ts.rowCount) throw ApiError.notFound('Test series not found');
  const series = ts.rows[0];

  const createdCount = await withTransaction(async (client) => {
    const existing = await client.query('SELECT COUNT(*)::int AS cnt FROM test_series_assessments WHERE test_series_id = $1', [id]);
    let startPos = existing.rows[0].cnt + 1;

    for (let i = 1; i <= count; i++) {
      const pos = startPos + i - 1;
      const title = `${series.title} — ${prefix} ${pos}`;
      const assessRes = await client.query(
        `INSERT INTO assessments (title, description, instructions, duration_minutes, passing_marks, is_published, created_by, test_type, preparation_phase)
         VALUES ($1, $2, $3, 180, 180, false, $4, 'AIETS', 'CONCEPT_BUILDING') RETURNING id`,
        [title, `Unscheduled draft assessment ${pos}`, 'Schedule and questions to be configured by Admin.', req.user.id]
      );
      const aId = assessRes.rows[0].id;

      await client.query(
        `INSERT INTO test_series_assessments (test_series_id, assessment_id, label, position)
         VALUES ($1, $2, $3, $4)`,
        [id, aId, `${prefix} ${pos}`, pos]
      );
    }
    return count;
  });

  res.status(201).json({ message: `Generated ${createdCount} draft assessment placeholders` });
});

export const generateTwoYearDraftSkeleton = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const ts = await query('SELECT * FROM test_series WHERE id = $1', [id]);
  if (!ts.rowCount) throw ApiError.notFound('Test series not found');
  const series = ts.rows[0];

  const TWO_YEAR_STRUCTURE = [
    ...Array.from({ length: 22 }, (_, i) => ({ type: 'AIETS', name: `AIETS ${i + 1}`, phase: 'CONCEPT_BUILDING' })),
    ...Array.from({ length: 15 }, (_, i) => ({ type: 'UNIT_TEST', name: `Unit Test ${i + 1}`, phase: 'CONCEPT_BUILDING' })),
    ...Array.from({ length: 12 }, (_, i) => ({ type: 'PART_TEST', name: `Part Test ${i + 1}`, phase: 'PROGRESS_TRACKING' })),
    ...Array.from({ length: 2 }, (_, i) => ({ type: 'CUMULATIVE_TEST', name: `Cumulative Test ${i + 1}`, phase: 'REVISION_CUMULATIVE' })),
    ...Array.from({ length: 9 }, (_, i) => ({ type: 'FULL_SYLLABUS_MOCK', name: `Full-Syllabus Mock Test ${i + 1}`, phase: 'INTENSIVE_TESTING' })),
  ];

  const createdCount = await withTransaction(async (client) => {
    let pos = 1;
    for (const item of TWO_YEAR_STRUCTURE) {
      const title = `AIETS 2028: ${item.name}`;
      const assessRes = await client.query(
        `INSERT INTO assessments (title, description, instructions, duration_minutes, passing_marks, is_published, created_by, test_type, preparation_phase)
         VALUES ($1, $2, $3, 180, 180, false, $4, $5, $6) RETURNING id`,
        [title, `Unscheduled draft assessment for 2-Year Program`, 'Schedule and questions to be configured by Admin.', req.user.id, item.type, item.phase]
      );
      const aId = assessRes.rows[0].id;

      await client.query(
        `INSERT INTO test_series_assessments (test_series_id, assessment_id, label, position)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (test_series_id, assessment_id) DO NOTHING`,
        [id, aId, item.name, pos]
      );
      pos++;
    }
    return TWO_YEAR_STRUCTURE.length;
  });

  res.status(201).json({ message: `Generated ${createdCount} draft assessment skeletons for 2-Year Program` });
});

/** Student: my enrollments */
export const myEnrollments = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT se.*, ts.title, ts.slug, ts.exam_type, ts.image_url, ts.code, ts.target_year, ts.program_type,
            COALESCE(ts.planned_tests, ts.test_count, 0)::int AS planned_tests,
            COUNT(DISTINCT tsa.assessment_id)::int AS linked_tests,
            COUNT(DISTINCT CASE WHEN a.start_time IS NOT NULL OR a.sequence_number > 0 THEN a.id END)::int AS scheduled_tests,
            COUNT(DISTINCT CASE WHEN a.is_published = true THEN a.id END)::int AS published_tests,
            COUNT(DISTINCT CASE WHEN a.is_published = true AND a.start_time <= NOW() AND a.end_time >= NOW() THEN a.id END)::int AS live_tests,
            COUNT(DISTINCT CASE WHEN a.is_published = true AND (a.end_time >= NOW() OR a.missed_test_allowed = true) THEN a.id END)::int AS currently_available
     FROM student_enrollments se
     JOIN test_series ts ON ts.id = se.test_series_id
     LEFT JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
     LEFT JOIN assessments a ON a.id = tsa.assessment_id
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
            lat.id AS attempt_id, lat.status AS attempt_status,
            lat.percentage, lat.passed
     FROM test_series ts
     JOIN test_series_assessments tsa ON tsa.test_series_id = ts.id
     JOIN assessments a ON a.id = tsa.assessment_id AND a.is_published = true
     LEFT JOIN LATERAL (
       SELECT at.id, at.status, s.percentage, s.passed
       FROM attempts at
       LEFT JOIN scores s ON s.attempt_id = at.id
       WHERE at.assessment_id = a.id AND at.candidate_id = $2
       ORDER BY at.started_at DESC
       LIMIT 1
     ) lat ON true
     WHERE ts.slug = $1
     ORDER BY tsa.position, a.id`,
    [slug, req.user.id]
  );
  res.json({ tests: tests.rows });
});

export const deleteTestSeries = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM test_series WHERE id = $1 RETURNING id', [id]);
  if (!result.rowCount) throw ApiError.notFound('Test series not found');
  res.json({ message: 'Test series permanently deleted' });
});

export const unlinkAssessment = asyncHandler(async (req, res) => {
  const { id, assessmentId } = req.params;
  await query('DELETE FROM test_series_assessments WHERE test_series_id = $1 AND assessment_id = $2', [id, assessmentId]);
  res.json({ message: 'Test unlinked' });
});

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
