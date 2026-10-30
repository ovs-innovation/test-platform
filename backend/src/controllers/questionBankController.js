import fs from 'fs';
import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { parseQuestionCsv, questionsToCsv } from '../utils/csvQuestions.js';
import { rememberCache, delCache } from '../config/redis.js';
import { normalizeQuestionBankPayload } from '../utils/questionBankPayload.js';
import { env } from '../config/env.js';
import { verifyPdfMagicBytes, cleanupUploadedFiles } from '../middleware/pdfUpload.js';
import { stripHeadersAndFooters } from '../utils/questionFormatter.js';
import { resolveStandardChapter } from '../utils/chapterResolver.js';

const CATEGORIES = ['Physics', 'Chemistry', 'Mathematics', 'Botany', 'Zoology', 'Biology'];

const asJson = (value, fallback) => {
  if (value == null) return JSON.stringify(fallback);
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
};

/**
 * GET /api/question-bank/categories
 */
export const listCategories = asyncHandler(async (_req, res) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  const payload = await rememberCache('cache:qb:categories', 60, async () => {
    const result = await query(
      `SELECT category, COUNT(*)::int AS count FROM question_bank GROUP BY category ORDER BY category`
    );
    const counts = Object.fromEntries(result.rows.map((r) => [r.category, r.count]));
    const allCategoryNames = Array.from(new Set([...CATEGORIES, ...result.rows.map((r) => r.category)]));
    return {
      categories: allCategoryNames.map((c) => ({ name: c, count: counts[c] || 0 })),
    };
  });
  res.json(payload);
});

/**
 * GET /api/question-bank?category=Physics
 */
export const listBankQuestions = asyncHandler(async (req, res) => {
  const { category } = req.query;
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');

  let sql = `
    WITH test_usage AS (
      SELECT 
        q.bank_question_id,
        COUNT(DISTINCT q.assessment_id)::int AS test_count,
        json_agg(
          DISTINCT jsonb_build_object(
            'assessment_id', q.assessment_id,
            'test_name', COALESCE(t.test_name, a.title, 'Test #' || q.assessment_id)
          )
        ) AS used_in_tests
      FROM questions q
      LEFT JOIN assessments a ON q.assessment_id = a.id
      LEFT JOIN tests t ON a.id = t.id
      WHERE q.bank_question_id IS NOT NULL
      GROUP BY q.bank_question_id
    )
    SELECT 
      qb.*,
      COALESCE(c.name, NULLIF(qb.chapter, '')) AS chapter,
      c.name AS chapter_name, 
      s.name AS subject_name,
      CASE 
        WHEN qb.status = 'normal' THEN '[]'::json 
        ELSE COALESCE(tu.used_in_tests, '[]'::json) 
      END AS used_in_tests,
      CASE 
        WHEN qb.status = 'normal' THEN 0 
        ELSE COALESCE(tu.test_count, 0) 
      END AS test_count,
      CASE 
        WHEN qb.status = 'normal' THEN 'normal'
        WHEN qb.status = 'already_chosen' THEN 'already_chosen'
        WHEN COALESCE(tu.test_count, 0) > 0 THEN 'already_chosen'
        ELSE 'normal' 
      END AS computed_status
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    LEFT JOIN subjects s ON qb.subject_id = s.id
    LEFT JOIN test_usage tu ON tu.bank_question_id = qb.id
  `;
  const params = [];
  if (category && category !== 'All') {
    sql += ' WHERE qb.category = $1';
    params.push(category);
  }
  sql += ' ORDER BY qb.category, qb.id ASC';
  const result = await query(sql, params);
  const questions = (result.rows || []).map((row) => {
    const standardChapter = resolveStandardChapter(
      row.category || row.subject_name || '',
      row.topic || '',
      row.question_text || '',
      row.chapter_name || row.chapter || '',
      row.id
    );
    return {
      ...row,
      chapter: standardChapter,
      status: row.computed_status || row.status || 'normal',
      used_in_tests: row.used_in_tests || [],
      test_count: row.test_count || 0,
    };
  });
  res.json({ questions });
});

/**
 * POST /api/question-bank/:id/import/:assessmentId
 */
export const importToAssessment = asyncHandler(async (req, res) => {
  const { id, assessmentId } = req.params;
  const { section_id } = req.body || {};

  const bank = await query('SELECT * FROM question_bank WHERE id = $1', [id]);
  if (bank.rowCount === 0) throw ApiError.notFound('Bank question not found');

  const a = await query('SELECT id FROM assessments WHERE id = $1', [assessmentId]);
  if (a.rowCount === 0) throw ApiError.notFound('Assessment not found');

  const b = bank.rows[0];
  const maxRes = await query(
    'SELECT COALESCE(MAX(position), 0) + 1 AS next FROM questions WHERE assessment_id = $1',
    [assessmentId]
  );

  let subject_id = b.subject_id || null;
  let subject = b.subject || null;
  let chapter_id = b.chapter_id || null;
  let topic = b.topic || b.category || null;

  if (subject_id && !subject) {
    const sRes = await query('SELECT name FROM subjects WHERE id = $1', [subject_id]);
    if (sRes.rows.length > 0) subject = sRes.rows[0].name;
  } else if (!subject_id && subject) {
    const sRes = await query('SELECT id FROM subjects WHERE LOWER(name) = LOWER($1)', [subject]);
    if (sRes.rows.length > 0) subject_id = sRes.rows[0].id;
  } else if (!subject_id && b.category) {
    const sRes = await query('SELECT id, name FROM subjects WHERE LOWER(name) = LOWER($1)', [b.category]);
    if (sRes.rows.length > 0) {
      subject_id = sRes.rows[0].id;
      subject = sRes.rows[0].name;
    }
  }

  if (chapter_id && !topic) {
    const cRes = await query('SELECT name FROM chapters WHERE id = $1', [chapter_id]);
    if (cRes.rows.length > 0) topic = cRes.rows[0].name;
  } else if (!chapter_id && topic && subject_id) {
    const cRes = await query('SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) = LOWER($2)', [subject_id, topic]);
    if (cRes.rows.length > 0) chapter_id = cRes.rows[0].id;
  }

  const allMedia = b.image_url ? [{ type: 'question', url: b.image_url, id: 'q-diagram' }] : [];
  const result = await query(
    `INSERT INTO questions
       (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices,
        numeric_answer, numerical_tolerance, assertion_text, reason_text,
        marks, position, starter_code, test_cases, language, bank_category, solution, image_url, solution_image_url, subject_id, chapter_id, difficulty, subject, topic, media, bank_question_id)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)
     RETURNING *`,
    [
      assessmentId,
      section_id || null,
      b.question_type,
      b.question_text,
      asJson(b.options, []),
      b.correct_index,
      asJson(b.correct_indices, []),
      b.numeric_answer !== undefined ? b.numeric_answer : null,
      b.numerical_tolerance !== undefined ? b.numerical_tolerance : 0,
      b.assertion_text || null,
      b.reason_text || null,
      b.marks,
      maxRes.rows[0].next,
      b.starter_code || '',
      asJson(b.test_cases, []),
      b.language || 'javascript',
      b.category,
      b.solution || '',
      b.image_url || '',
      b.solution_image_url || '',
      subject_id,
      chapter_id,
      b.difficulty || 'medium',
      subject,
      topic,
      JSON.stringify(allMedia),
      b.id,
    ]
  );
  await query("UPDATE question_bank SET status = 'already_chosen' WHERE id = $1", [id]).catch(() => {});
  await delCache('cache:qb:*');
  res.status(201).json({ question: result.rows[0] });
});

export const createBankQuestion = asyncHandler(async (req, res) => {
  const payload = normalizeQuestionBankPayload(req.body);
  const {
    category,
    question_type,
    question_text,
    options,
    correct_index,
    correct_indices,
    numeric_answer,
    numerical_tolerance,
    assertion_text,
    reason_text,
    marks,
    solution,
    subject_id,
    chapter_id,
    difficulty,
    image_url,
    solution_image_url,
    chapter,
    topic,
    subject,
    status,
  } = payload;

  let effectiveChapterId = chapter_id || null;
  if (!effectiveChapterId && subject_id && chapter) {
    const chMatch = await query(
      'SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) = LOWER($2) LIMIT 1',
      [subject_id, chapter]
    );
    if (chMatch.rows.length > 0) {
      effectiveChapterId = chMatch.rows[0].id;
    }
  }

  const result = await query(
    `INSERT INTO question_bank (
       category, question_type, question_text, options, correct_index, correct_indices,
       numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
       subject_id, chapter_id, difficulty, image_url, solution_image_url, chapter, topic, subject, status
     ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21) RETURNING *`,
    [
      category,
      question_type || 'mcq',
      question_text,
      asJson(options, []),
      Number(correct_index ?? 0),
      asJson(correct_indices, []),
      numeric_answer !== undefined ? numeric_answer : null,
      numerical_tolerance !== undefined ? numerical_tolerance : 0,
      assertion_text || null,
      reason_text || null,
      Number(marks ?? 1),
      solution || '',
      subject_id || null,
      effectiveChapterId,
      difficulty || 'medium',
      image_url || '',
      solution_image_url || '',
      chapter || '',
      topic || '',
      subject || category,
      status || 'normal',
    ]
  );
  await delCache('cache:qb:*');
  res.status(201).json({ question: result.rows[0] });
});

export const updateBankQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = normalizeQuestionBankPayload(req.body);
  const {
    category,
    question_type,
    question_text,
    options,
    correct_index,
    correct_indices,
    numeric_answer,
    numerical_tolerance,
    assertion_text,
    reason_text,
    marks,
    solution,
    subject_id,
    chapter_id,
    difficulty,
    image_url,
    solution_image_url,
    chapter,
    topic,
    subject,
    status,
  } = payload;

  const existing = await query('SELECT * FROM question_bank WHERE id = $1', [id]);
  if (existing.rowCount === 0) throw ApiError.notFound('Question not found');
  const q = existing.rows[0];

  let effectiveChapterId = chapter_id !== undefined ? (chapter_id || null) : q.chapter_id;
  const effectiveSubjectId = subject_id !== undefined ? (subject_id || null) : q.subject_id;
  const effectiveChapter = chapter !== undefined ? chapter : q.chapter;
  const effectiveCategory = category !== undefined ? (category || q.category) : (subject || q.subject || q.category);
  const effectiveStatus = status !== undefined ? status : (q.status || 'normal');

  if (!effectiveChapterId && effectiveSubjectId && effectiveChapter) {
    const chMatch = await query(
      'SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) = LOWER($2) LIMIT 1',
      [effectiveSubjectId, effectiveChapter]
    );
    if (chMatch.rows.length > 0) {
      effectiveChapterId = chMatch.rows[0].id;
    }
  }

  const safeOptionsJson = options !== undefined
    ? asJson(options, [])
    : (typeof q.options === 'string' ? q.options : JSON.stringify(q.options || []));

  const safeCorrectIndex = correct_index !== undefined
    ? (correct_index === null || correct_index === '' ? null : Number(correct_index))
    : q.correct_index;

  const safeIndicesJson = correct_indices !== undefined
    ? asJson(correct_indices, [])
    : (typeof q.correct_indices === 'string' ? q.correct_indices : JSON.stringify(q.correct_indices || []));

  const result = await query(
    `UPDATE question_bank SET 
       question_type = $1,
       question_text = $2, 
       options = $3, 
       correct_index = $4, 
       correct_indices = $5,
       numeric_answer = $6,
       numerical_tolerance = $7,
       assertion_text = $8,
       reason_text = $9,
       marks = $10, 
       solution = $11,
       subject_id = $12,
       chapter_id = $13,
       difficulty = $14,
       image_url = $15,
       solution_image_url = $16,
       chapter = $17,
       topic = $18,
       subject = $19,
       category = $20,
       status = $21
     WHERE id = $22 RETURNING *`,
    [
      question_type || q.question_type || 'mcq',
      question_text ?? q.question_text,
      safeOptionsJson,
      safeCorrectIndex,
      safeIndicesJson,
      numeric_answer !== undefined ? numeric_answer : q.numeric_answer,
      numerical_tolerance !== undefined ? numerical_tolerance : q.numerical_tolerance,
      assertion_text !== undefined ? assertion_text : q.assertion_text,
      reason_text !== undefined ? reason_text : q.reason_text,
      Number(marks ?? q.marks ?? 1),
      solution ?? q.solution,
      effectiveSubjectId,
      effectiveChapterId,
      difficulty ?? q.difficulty,
      image_url !== undefined ? image_url : q.image_url,
      solution_image_url !== undefined ? solution_image_url : q.solution_image_url,
      effectiveChapter,
      topic !== undefined ? topic : q.topic,
      subject !== undefined ? subject : q.subject,
      effectiveCategory,
      effectiveStatus,
      id
    ]
  );

  // Sync edits to any assessment questions linked to this question bank item
  await query(
    `UPDATE questions SET 
       question_type = $1,
       question_text = $2, 
       options = $3, 
       correct_index = $4, 
       correct_indices = $5,
       numeric_answer = $6,
       numerical_tolerance = $7,
       assertion_text = $8,
       reason_text = $9,
       marks = $10, 
       solution = $11,
       difficulty = $12,
       image_url = $13,
       solution_image_url = $14,
       chapter = $15,
       topic = $16,
       subject = $17,
       bank_category = $18
     WHERE bank_question_id = $19`,
    [
      question_type || q.question_type || 'mcq',
      question_text ?? q.question_text,
      safeOptionsJson,
      safeCorrectIndex,
      safeIndicesJson,
      numeric_answer !== undefined ? numeric_answer : q.numeric_answer,
      numerical_tolerance !== undefined ? numerical_tolerance : q.numerical_tolerance,
      assertion_text !== undefined ? assertion_text : q.assertion_text,
      reason_text !== undefined ? reason_text : q.reason_text,
      Number(marks ?? q.marks ?? 1),
      solution ?? q.solution,
      difficulty ?? q.difficulty,
      image_url !== undefined ? image_url : q.image_url,
      solution_image_url !== undefined ? solution_image_url : q.solution_image_url,
      effectiveChapter,
      topic !== undefined ? topic : q.topic,
      subject !== undefined ? subject : q.subject,
      effectiveCategory,
      id
    ]
  ).catch((syncErr) => {
    // eslint-disable-next-line no-console
    console.warn(`[updateBankQuestion] Warning syncing linked questions for bank #${id}:`, syncErr.message);
  });

  if (effectiveStatus === 'normal') {
    await query('UPDATE questions SET bank_question_id = NULL WHERE bank_question_id = $1', [id]);
  }
  await delCache('cache:qb:*');
  if (effectiveCategory) await delCache(`cache:qb:questions:${effectiveCategory}`);
  await delCache('cache:qb:questions:all');
  await delCache('cache:qb:categories');
  const standardChapter = resolveStandardChapter(
    result.rows[0].category || result.rows[0].subject || '',
    result.rows[0].topic || '',
    result.rows[0].question_text || '',
    result.rows[0].chapter_name || result.rows[0].chapter || '',
    result.rows[0].id
  );
  const updatedQuestion = {
    ...result.rows[0],
    chapter: standardChapter,
    test_count: effectiveStatus === 'normal' ? 0 : undefined,
    used_in_tests: effectiveStatus === 'normal' ? [] : undefined,
  };
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.json({ question: updatedQuestion });
});

/**
 * PATCH /api/question-bank/:id/status
 * Body: { status: 'already_chosen' | 'normal' }
 */
export const toggleBankQuestionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body || {};

  const existing = await query('SELECT id, status FROM question_bank WHERE id = $1', [id]);
  if (existing.rowCount === 0) throw ApiError.notFound('Question not found');

  const current = existing.rows[0];
  let nextStatus = status;
  if (!nextStatus) {
    nextStatus = current.status === 'already_chosen' ? 'normal' : 'already_chosen';
  }

  if (nextStatus === 'normal') {
    await query('UPDATE questions SET bank_question_id = NULL WHERE bank_question_id = $1', [id]);
  }

  const result = await query(
    'UPDATE question_bank SET status = $1 WHERE id = $2 RETURNING *',
    [nextStatus, id]
  );
  await delCache('cache:qb:*');
  const cat = result.rows[0]?.category;
  if (cat) await delCache(`cache:qb:questions:${cat}`);
  await delCache('cache:qb:questions:all');

  res.json({
    success: true,
    question: {
      ...result.rows[0],
      test_count: nextStatus === 'normal' ? 0 : undefined,
      used_in_tests: nextStatus === 'normal' ? [] : undefined,
    },
    message: `Question status updated to ${nextStatus === 'already_chosen' ? 'Selected for Test' : 'Available'}`,
  });
});

export const deleteBankQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (id === 'all') {
    return deleteAllBankQuestions(req, res);
  }
  const result = await query('DELETE FROM question_bank WHERE id = $1 RETURNING id', [id]);
  if (!result.rowCount) throw ApiError.notFound('Question not found');
  await delCache('cache:qb:*');
  res.json({ message: 'Deleted' });
});

export const deleteAllBankQuestions = asyncHandler(async (req, res) => {
  const { category, scope } = req.query;
  let sql = 'DELETE FROM question_bank';
  const params = [];
  if (scope !== 'all' && category && category !== 'all' && category !== 'All') {
    sql += ' WHERE category = $1';
    params.push(category);
  }
  const result = await query(sql, params);
  await delCache('cache:qb:*');
  res.json({
    message: 'Questions deleted successfully',
    count: result.rowCount,
  });
});

/**
 * GET /api/question-bank/export?category=JavaScript
 */
export const exportBankQuestions = asyncHandler(async (req, res) => {
  const { category } = req.query;
  let sql = 'SELECT * FROM question_bank';
  const params = [];
  if (category) {
    sql += ' WHERE category = $1';
    params.push(category);
  }
  sql += ' ORDER BY category, id ASC';
  const result = await query(sql, params);
  const csv = questionsToCsv(result.rows, { includeCategory: true, includeSolution: true });
  const filename = category ? `${category.replace(/\s+/g, '_')}_bank.csv` : 'question_bank_all.csv';
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
  res.send(csv);
});

/**
 * POST /api/question-bank/bulk
 * CSV columns: category, question_text, question_type, marks, options, correct_index, correct_indices, solution
 */
export const bulkUploadBankQuestions = asyncHandler(async (req, res) => {
  const { csv, default_category } = req.body;
  const { rows, errors } = parseQuestionCsv(csv, { requireCategory: !default_category });

  const created = [];
  for (const row of rows) {
    const category = row.category || default_category;
    if (!category) {
      errors.push({ line: row.line, error: 'Missing category' });
      continue;
    }
    try {
      const result = await query(
        `INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, marks, solution, subject_id, chapter_id, difficulty, image_url)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) RETURNING id, question_text, category`,
        [
          category,
          row.question_type,
          row.question_text,
          asJson(row.options, []),
          row.correct_index,
          asJson(row.correct_indices, []),
          row.marks,
          row.solution || '',
          row.subject_id || null,
          row.chapter_id || null,
          row.difficulty || 'medium',
          row.image_url || '',
        ]
      );
      created.push(result.rows[0]);
    } catch (err) {
      errors.push({ line: row.line, error: err.message });
    }
  }

  await delCache('cache:qb:*');
  res.status(201).json({ created: created.length, questions: created, errors });
});

/**
 * POST /api/question-bank/bulk-import/:assessmentId
 * Body: { category } or { ids: number[] }, optional section_id
 */
export const bulkImportToAssessment = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  const { category, ids, section_id } = req.body || {};

  let a = await query('SELECT id FROM assessments WHERE id = $1', [assessmentId]);
  if (a.rowCount === 0) {
    const t = await query('SELECT id, test_name, title, duration_minutes, syllabus, passing_marks, is_published FROM tests WHERE id = $1', [assessmentId]);
    if (t.rowCount === 0) throw ApiError.notFound('Assessment or Test not found');
    const testRow = t.rows[0];
    await query(
      `INSERT INTO assessments (id, title, description, instructions, duration_minutes, passing_marks, max_violations, result_visible, is_published)
       VALUES ($1, $2, $3, 'Standard CBT Instructions', $4, $5, 3, true, $6)
       ON CONFLICT (id) DO UPDATE SET title = EXCLUDED.title`,
      [
        assessmentId,
        testRow.test_name || testRow.title || 'Assessment',
        testRow.syllabus || '',
        testRow.duration_minutes || 180,
        testRow.passing_marks || 0,
        Boolean(testRow.is_published),
      ]
    );
  }

  // Load existing sections to auto-match section by question category/subject
  const secRes = await query('SELECT id, name FROM assessment_sections WHERE assessment_id = $1 ORDER BY position ASC', [assessmentId]);
  let existingSections = secRes.rows;
  if (existingSections.length === 0) {
    const defaultSections = [
      { name: 'Physics', section_type: 'technical_mcq', position: 1 },
      { name: 'Chemistry', section_type: 'technical_mcq', position: 2 },
      { name: 'Botany', section_type: 'technical_mcq', position: 3 },
      { name: 'Zoology', section_type: 'technical_mcq', position: 4 },
      { name: 'Mathematics', section_type: 'technical_mcq', position: 5 },
    ];
    for (const s of defaultSections) {
      const insSec = await query(
        `INSERT INTO assessment_sections (assessment_id, name, section_type, position) VALUES ($1,$2,$3,$4) RETURNING id, name`,
        [assessmentId, s.name, s.section_type, s.position]
      );
      if (insSec.rows.length) existingSections.push(insSec.rows[0]);
    }
  }

  let bankRows;
  if (Array.isArray(ids) && ids.length) {
    const result = await query('SELECT * FROM question_bank WHERE id = ANY($1::int[]) ORDER BY id', [ids]);
    bankRows = result.rows;
  } else if (category) {
    const result = await query('SELECT * FROM question_bank WHERE category = $1 ORDER BY id', [category]);
    bankRows = result.rows;
  } else {
    throw ApiError.badRequest('Provide category or ids array');
  }

  if (!bankRows.length) throw ApiError.notFound('No bank questions found');

  const maxRes = await query(
    'SELECT COALESCE(MAX(position), 0) AS max FROM questions WHERE assessment_id = $1',
    [assessmentId]
  );
  let position = maxRes.rows[0].max;
  const imported = [];

  for (const b of bankRows) {
    position += 1;
    let subject_id = b.subject_id || null;
    let subject = b.subject || null;
    let chapter_id = b.chapter_id || null;
    let topic = b.topic || b.category || null;

    if (subject_id && !subject) {
      const sRes = await query('SELECT name FROM subjects WHERE id = $1', [subject_id]);
      if (sRes.rows.length > 0) subject = sRes.rows[0].name;
    } else if (!subject_id && subject) {
      const sRes = await query('SELECT id FROM subjects WHERE LOWER(name) = LOWER($1)', [subject]);
      if (sRes.rows.length > 0) subject_id = sRes.rows[0].id;
    } else if (!subject_id && b.category) {
      const sRes = await query('SELECT id, name FROM subjects WHERE LOWER(name) = LOWER($1)', [b.category]);
      if (sRes.rows.length > 0) {
        subject_id = sRes.rows[0].id;
        subject = sRes.rows[0].name;
      }
    }

    if (chapter_id && !topic) {
      const cRes = await query('SELECT name FROM chapters WHERE id = $1', [chapter_id]);
      if (cRes.rows.length > 0) topic = cRes.rows[0].name;
    } else if (!chapter_id && topic && subject_id) {
      const cRes = await query('SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) = LOWER($2)', [subject_id, topic]);
      if (cRes.rows.length > 0) chapter_id = cRes.rows[0].id;
    }

    // Auto-match section if section_id is not given
    let targetSectionId = section_id || null;
    if (!targetSectionId && existingSections.length > 0) {
      const catKey = (b.category || subject || '').trim().toLowerCase();
      const matched = existingSections.find((s) => s.name && s.name.trim().toLowerCase() === catKey);
      if (matched) {
        targetSectionId = matched.id;
      }
    }

    const allMedia = b.image_url ? [{ type: 'question', url: b.image_url, id: 'q-diagram' }] : [];
    const result = await query(
      `INSERT INTO questions
         (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, numerical_tolerance, assertion_text, reason_text,
          marks, position, starter_code, test_cases, language, bank_category, solution, image_url, solution_image_url, subject_id, chapter_id, difficulty, subject, topic, media, bank_question_id)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)
       RETURNING id, question_text`,
      [
        assessmentId,
        targetSectionId,
        b.question_type,
        b.question_text,
        asJson(b.options, []),
        b.correct_index,
        asJson(b.correct_indices, []),
        b.numeric_answer !== undefined ? b.numeric_answer : null,
        b.numerical_tolerance !== undefined ? b.numerical_tolerance : 0,
        b.assertion_text || null,
        b.reason_text || null,
        b.marks,
        position,
        b.starter_code || '',
        asJson(b.test_cases, []),
        b.language || 'javascript',
        b.category,
        b.solution || '',
        b.image_url || '',
        b.solution_image_url || '',
        subject_id,
        chapter_id,
        b.difficulty || 'medium',
        subject,
        topic,
        JSON.stringify(allMedia),
        b.id,
      ]
    );
    imported.push(result.rows[0]);
  }

  const bankIds = bankRows.map((b) => b.id).filter(Boolean);
  if (bankIds.length > 0) {
    await query("UPDATE question_bank SET status = 'already_chosen' WHERE id = ANY($1::int[])", [bankIds]).catch(() => {});
  }
  await delCache('cache:qb:*');

  await query('UPDATE assessments SET updated_at = NOW() WHERE id = $1', [assessmentId]).catch(() => {});
  await query('UPDATE tests SET updated_at = NOW() WHERE id = $1', [assessmentId]).catch(() => {});

  res.status(201).json({ imported: imported.length, questions: imported });
});

/**
 * POST /api/question-bank/upload-pdf
 * Uploads a question paper PDF (and optional answer key/solutions PDF) to extract
 * questions, options, answers, and solutions directly into the Question Bank for selected or auto-detected subjects.
 */
export const uploadPdfToQuestionBank = asyncHandler(async (req, res) => {
  try {
    const {
      file_base64,
      file_name: bodyFileName = 'question_paper.pdf',
      category = 'auto',
      answer_key_base64,
      answer_key_name: bodyAkName = 'answer_key.pdf',
      default_marks = 4,
      include_answers = true,
      difficulty = 'medium',
      page_range,
      pageRange,
    } = req.body;

    const maxBytes = env.maxPdfUploadBytes || 100 * 1024 * 1024;
    let pdfBuffer = null;
    let fileName = bodyFileName;

    // 1. Resolve Question Paper PDF (Multipart Multer disk storage or Base64 JSON)
    const uploadedPaper = req.files?.file?.[0] || req.files?.question_paper?.[0] || req.file;
    if (uploadedPaper) {
      fileName = uploadedPaper.originalname || bodyFileName;
      if (uploadedPaper.size > maxBytes) {
        const err = new Error(`PDF exceeds the maximum allowed upload size (maximum ${env.maxPdfUploadMb || 100} MB).`);
        err.statusCode = 413;
        err.code = 'PAYLOAD_TOO_LARGE';
        throw err;
      }
      const isValidPdf = await verifyPdfMagicBytes(uploadedPaper.path);
      if (!isValidPdf) {
        throw ApiError.badRequest('Invalid PDF format: file is not a valid PDF document.');
      }
      pdfBuffer = await fs.promises.readFile(uploadedPaper.path);
    } else if (file_base64 && typeof file_base64 === 'string') {
      const cleanBase64 = file_base64.replace(/^data:[^;]+;base64,/, '');
      pdfBuffer = Buffer.from(cleanBase64, 'base64');
      if (pdfBuffer.length > maxBytes) {
        const err = new Error(`PDF exceeds the maximum allowed upload size (maximum ${env.maxPdfUploadMb || 100} MB).`);
        err.statusCode = 413;
        err.code = 'PAYLOAD_TOO_LARGE';
        throw err;
      }
      const isValidPdf = await verifyPdfMagicBytes(pdfBuffer);
      if (!isValidPdf) {
        throw ApiError.badRequest('Invalid PDF format: file is not a valid PDF document.');
      }
    } else {
      throw ApiError.badRequest('Question paper PDF is required');
    }

    // 2. Resolve optional Answer Key PDF
    let akBuffer = null;
    let answer_key_name = bodyAkName;
    const uploadedAk = req.files?.answer_key?.[0];
    if (uploadedAk) {
      answer_key_name = uploadedAk.originalname || bodyAkName;
      if (uploadedAk.size > maxBytes) {
        const err = new Error(`Answer key PDF exceeds the maximum allowed upload size (maximum ${env.maxPdfUploadMb || 100} MB).`);
        err.statusCode = 413;
        err.code = 'PAYLOAD_TOO_LARGE';
        throw err;
      }
      const isValidAkPdf = await verifyPdfMagicBytes(uploadedAk.path);
      if (!isValidAkPdf) {
        throw ApiError.badRequest('Invalid answer key PDF format: file is not a valid PDF document.');
      }
      akBuffer = await fs.promises.readFile(uploadedAk.path);
    } else if (answer_key_base64 && typeof answer_key_base64 === 'string') {
      const cleanAkBase64 = answer_key_base64.replace(/^data:[^;]+;base64,/, '');
      akBuffer = Buffer.from(cleanAkBase64, 'base64');
      if (akBuffer.length > maxBytes) {
        const err = new Error(`Answer key PDF exceeds the maximum allowed upload size (maximum ${env.maxPdfUploadMb || 100} MB).`);
        err.statusCode = 413;
        err.code = 'PAYLOAD_TOO_LARGE';
        throw err;
      }
      const isValidAkPdf = await verifyPdfMagicBytes(akBuffer);
      if (!isValidAkPdf) {
        throw ApiError.badRequest('Invalid answer key PDF format: file is not a valid PDF document.');
      }
    }

    // Save question paper file copy to disk if upload middleware is present
    let savedFileUrl = '';
    try {
      const { saveUploadedFile } = await import('../middleware/upload.js');
      savedFileUrl = await saveUploadedFile(pdfBuffer, fileName, 'qb_paper');
    } catch (err) {
      console.warn('[uploadPdfToQuestionBank] Warning: Could not save uploaded PDF copy:', err.message);
    }

    const { parseQuestionsFromPdf, extractPdfText } = await import('../utils/pdfQuestions.js');
    const { parseAnswerKeyAndSolutions } = await import('../utils/pdfQuestionParser.js');

    console.log(`[uploadPdfToQuestionBank] Parsing questions from PDF (${fileName}, pageRange: ${page_range || pageRange || 'all'})...`);
    const shouldIncludeAnswers = include_answers !== false && include_answers !== 'false';
    const pdfExtraction = await parseQuestionsFromPdf(pdfBuffer, {
      includeAnswers: shouldIncludeAnswers,
      pageRange: page_range || pageRange,
    });
    let extractedQs = pdfExtraction.rows || [];

    if (!extractedQs.length) {
      const requestedPageRange = page_range || pageRange;
      const pageRangeContext = requestedPageRange ? ` in pages ${requestedPageRange}` : '';
      const extractionDetail = pdfExtraction.visionBypassReason
        ? ` Extraction detail: ${pdfExtraction.visionBypassReason}`
        : '';
      throw ApiError.badRequest(
        `No questions were extracted${pageRangeContext}. Make sure the selected pages contain questions (not only a cover, contents, answer key, or solutions), then try a smaller page range or a clearer PDF.${extractionDetail}`
      );
    }

    console.log(`[uploadPdfToQuestionBank] Extracted ${extractedQs.length} question(s) from PDF.`);

    // Optional: Merge standalone answer key / solution PDF if provided
    if (akBuffer) {
      try {
        console.log(`[uploadPdfToQuestionBank] Processing separate answer key PDF (${answer_key_name})...`);
        let akMap = {};
        let solMap = {};
        let chMap = {};

      try {
        const rawAkText = await extractPdfText(akBuffer);
        if (rawAkText) {
          const parsedAk = parseAnswerKeyAndSolutions(rawAkText);
          akMap = parsedAk.answerKeyMap || {};
          solMap = parsedAk.solutionsMap || {};
          chMap = parsedAk.chaptersMap || {};
        }
      } catch (akTextErr) {
        console.warn('[uploadPdfToQuestionBank] Raw text extraction for answer key failed:', akTextErr.message);
      }

      if (Object.keys(akMap).length === 0 || Object.keys(solMap).length === 0) {
        try {
          const akVision = await parseQuestionsFromPdf(akBuffer, { includeAnswers: true });
          if (akVision.answerKeyMap) akMap = { ...akVision.answerKeyMap, ...akMap };
          if (akVision.solutionMap) {
            for (const [qNum, sObj] of Object.entries(akVision.solutionMap)) {
              if (sObj?.explanation && !solMap[qNum]) solMap[qNum] = sObj.explanation;
              if (sObj?.correctAnswer && akMap[qNum] === undefined) {
                const letter = String(sObj.correctAnswer).trim().toUpperCase();
                if (['A', 'B', 'C', 'D'].includes(letter)) {
                  akMap[qNum] = letter.charCodeAt(0) - 65;
                }
              }
            }
          }
          if (akVision.topicGridMap || akVision.chaptersMap) {
            chMap = { ...(akVision.topicGridMap || akVision.chaptersMap), ...chMap };
          }
        } catch (akVisionErr) {
          console.warn('[uploadPdfToQuestionBank] Vision fallback for answer key failed:', akVisionErr.message);
        }
      }

      // Merge into extracted questions
      for (let i = 0; i < extractedQs.length; i++) {
        const q = extractedQs[i];
        const qNum = q.questionNumber || q.line || (i + 1);
        const isMcq = q.question_type === 'mcq' || (Array.isArray(q.options) && q.options.length > 0) || (q.numeric_answer == null && (!q.question_type || q.question_type === 'mcq'));

        if (akMap[qNum] !== undefined) {
          const rawVal = akMap[qNum];
          if (typeof rawVal === 'number' && rawVal >= 0 && rawVal <= 3) {
            q.correct_index = rawVal;
            q.correctAnswer = String.fromCharCode(65 + rawVal);
            q.question_type = 'mcq';
          } else if (typeof rawVal === 'number' && rawVal >= 1 && rawVal <= 4 && isMcq) {
            q.correct_index = rawVal - 1;
            q.correctAnswer = String.fromCharCode(65 + rawVal - 1);
            q.question_type = 'mcq';
          } else if (typeof rawVal === 'string') {
            const upper = rawVal.trim().toUpperCase();
            if (['A', 'B', 'C', 'D'].includes(upper)) {
              q.correct_index = upper.charCodeAt(0) - 65;
              q.correctAnswer = upper;
              q.question_type = 'mcq';
            } else if (['1', '2', '3', '4'].includes(upper) && isMcq) {
              const idx = parseInt(upper, 10) - 1;
              q.correct_index = idx;
              q.correctAnswer = String.fromCharCode(65 + idx);
              q.question_type = 'mcq';
            } else if (!isNaN(Number(upper))) {
              const numVal = Number(upper);
              if (isMcq && numVal >= 1 && numVal <= 4) {
                q.correct_index = numVal - 1;
                q.correctAnswer = String.fromCharCode(65 + numVal - 1);
                q.question_type = 'mcq';
              } else {
                q.numeric_answer = numVal;
                q.question_type = 'integer';
                q.correct_index = null;
              }
            }
          } else if (typeof rawVal === 'number') {
            q.numeric_answer = rawVal;
            q.question_type = 'integer';
            q.correct_index = null;
          }
        }
        if (solMap[qNum]) {
          let cleanSol = stripHeadersAndFooters(solMap[qNum]).trim();
          cleanSol = cleanSol.replace(/^(?:(?:Q\.?\s*)?\d+[\.\):\-–—\s]+)?(?:ans(?:wer)?|option)?\s*[:\.\-–—]?\s*(?:\([A-Da-d1-4]\)|\[[A-Da-d1-4]\]|[A-Da-d1-4])\s*[:\.\-–—]?\s*/i, '').trim();
          if (cleanSol && (!q.solution || q.solution.length < cleanSol.length)) {
            q.solution = cleanSol;
          }
        }
        if (chMap[qNum] && (!q.chapter || q.chapter === 'General')) {
          q.chapter = chMap[qNum];
          q.topic = chMap[qNum];
        }
      }
    } catch (akErr) {
      console.warn('[uploadPdfToQuestionBank] Answer key processing error:', akErr.message);
    }
  }

  // Subject matching: fetch existing subjects from database
  const subRes = await query('SELECT id, name FROM subjects');
  const subjects = subRes.rows;
  const subjectMap = new Map();
  subjects.forEach((s) => {
    subjectMap.set(s.name.toLowerCase().trim(), s);
  });

  // Helper to normalize subject / category name
  const resolveSubject = (qSubject, preferredCategory) => {
    if (preferredCategory && preferredCategory.toLowerCase() !== 'auto' && preferredCategory.toLowerCase() !== 'auto-detect') {
      const match = subjectMap.get(preferredCategory.toLowerCase().trim());
      return {
        categoryName: match ? match.name : preferredCategory,
        subjectId: match ? match.id : null,
      };
    }

    const candidate = (qSubject || '').trim().toLowerCase();
    if (candidate.includes('physic')) {
      const match = subjectMap.get('physics');
      return { categoryName: match ? match.name : 'Physics', subjectId: match ? match.id : null };
    }
    if (candidate.includes('chem')) {
      const match = subjectMap.get('chemistry');
      return { categoryName: match ? match.name : 'Chemistry', subjectId: match ? match.id : null };
    }
    if (candidate.includes('botan')) {
      const match = subjectMap.get('botany');
      return { categoryName: match ? match.name : 'Botany', subjectId: match ? match.id : null };
    }
    if (candidate.includes('zool')) {
      const match = subjectMap.get('zoology');
      return { categoryName: match ? match.name : 'Zoology', subjectId: match ? match.id : null };
    }
    if (candidate.includes('bio')) {
      const match = subjectMap.get('biology');
      return { categoryName: match ? match.name : 'Biology', subjectId: match ? match.id : null };
    }
    if (candidate.includes('math')) {
      const match = subjectMap.get('mathematics');
      return { categoryName: match ? match.name : 'Mathematics', subjectId: match ? match.id : null };
    }

    // Direct match against known subjects
    for (const [nameLower, sObj] of subjectMap.entries()) {
      if (candidate === nameLower) {
        return { categoryName: sObj.name, subjectId: sObj.id };
      }
    }

    // Fallback to default
    return { categoryName: 'Physics', subjectId: subjectMap.get('physics')?.id || null };
  };

  const createdQuestions = [];
  const affectedCategories = new Set();
  const errors = [];

  const INSERT_BATCH_SIZE = 10;
  for (let i = 0; i < extractedQs.length; i += INSERT_BATCH_SIZE) {
    const batch = extractedQs.slice(i, i + INSERT_BATCH_SIZE);
    await Promise.all(
      batch.map(async (q, bIdx) => {
        const idx = i + bIdx;
        try {
          const { categoryName, subjectId } = resolveSubject(q.subject || q.bank_category, category);

          const qText = (q.question_text || q.questionText || q.question?.text || '').trim();
          if (!qText) return;

          const qType = q.question_type || q.questionType || (q.numeric_answer != null ? 'integer' : 'mcq');
          const isInteger = qType === 'integer' || qType === 'numerical';

          const options = isInteger
            ? []
            : (q.options || []).map((o) => (typeof o === 'object' && o.text ? o.text : String(o)));

          let correctIndex = (q.correct_index != null && q.correct_index !== '') ? Number(q.correct_index) : null;
          if (isInteger) correctIndex = null;
          const correctIndices = isInteger ? [] : (q.correct_indices || (correctIndex != null ? [correctIndex] : []));

          const numericAnswer = isInteger && q.numeric_answer != null ? Number(q.numeric_answer) : null;
          const marks = Number(q.marks || default_marks || 4);
          const solution = (q.solution || q.explanation?.text || (typeof q.explanation === 'string' ? q.explanation : '') || '').trim();
          const imageUrl = q.image_url || (q.media && q.media[0] ? q.media[0].url : '') || '';
          
          const rawChapter = (q.chapter || '').trim();
          const rawTopic = (q.topic || '').trim();
          const resolvedChapter = resolveStandardChapter(categoryName, rawTopic, qText, rawChapter);
          const finalTopic = rawTopic && rawTopic.toLowerCase() !== resolvedChapter.toLowerCase() ? rawTopic : '';

          let resolvedChapterId = null;
          if (subjectId && resolvedChapter) {
            const chMatch = await query(
              'SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) = LOWER($2) LIMIT 1',
              [subjectId, resolvedChapter]
            );
            if (chMatch.rows.length > 0) {
              resolvedChapterId = chMatch.rows[0].id;
            }
          }

          const result = await query(
            `INSERT INTO question_bank (
              category, question_type, question_text, options, correct_index, correct_indices,
              numeric_answer, marks, solution, subject_id, chapter_id, difficulty,
              image_url, subject, topic, chapter
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)
            RETURNING id, category, question_text, question_type, marks, solution, subject, topic, chapter`,
            [
              categoryName,
              qType,
              qText,
              asJson(options, []),
              correctIndex,
              asJson(correctIndices, []),
              numericAnswer,
              marks,
              solution,
              subjectId,
              resolvedChapterId,
              difficulty || q.difficulty || 'medium',
              imageUrl,
              categoryName,
              finalTopic,
              resolvedChapter,
            ]
          );
          if (result.rows[0]) {
            createdQuestions.push(result.rows[0]);
            affectedCategories.add(categoryName);
          }
        } catch (err) {
          console.error('[uploadPdfToQuestionBank] Insert error on question', idx + 1, err.message);
          errors.push({ line: idx + 1, error: err.message });
        }
      })
    );
  }

    if (createdQuestions.length === 0) {
      const firstError = errors[0]?.error || 'Unknown database insert error';
      throw ApiError.badRequest(
        `Failed to import extracted questions into Question Bank (${errors.length} failed): ${firstError}`
      );
    }

    await delCache('cache:qb:*');

    res.status(201).json({
      success: true,
      created: createdQuestions.length,
      questions: createdQuestions,
      categories: Array.from(affectedCategories),
      warnings: pdfExtraction.warnings || [],
      errors,
      file_url: savedFileUrl || null,
    });
  } finally {
    await cleanupUploadedFiles(req);
  }
});

