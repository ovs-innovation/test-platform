import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { parseQuestionCsv, questionsToCsv } from '../utils/csvQuestions.js';

const CATEGORIES = ['Aptitude', 'JavaScript', 'React', 'HTML', 'CSS', 'Node.js'];

const asJson = (value, fallback) => {
  if (value == null) return JSON.stringify(fallback);
  if (typeof value === 'string') return value;
  return JSON.stringify(value);
};

/**
 * GET /api/question-bank/categories
 */
export const listCategories = asyncHandler(async (_req, res) => {
  const result = await query(
    `SELECT category, COUNT(*)::int AS count FROM question_bank GROUP BY category ORDER BY category`
  );
  const counts = Object.fromEntries(result.rows.map((r) => [r.category, r.count]));
  res.json({
    categories: CATEGORIES.map((c) => ({ name: c, count: counts[c] || 0 })),
  });
});

/**
 * GET /api/question-bank?category=JavaScript
 */
export const listBankQuestions = asyncHandler(async (req, res) => {
  const { category } = req.query;
  let sql = 'SELECT * FROM question_bank';
  const params = [];
  if (category) {
    sql += ' WHERE category = $1';
    params.push(category);
  }
  sql += ' ORDER BY category, id ASC';
  const result = await query(sql, params);
  res.json({ questions: result.rows });
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

  const result = await query(
    `INSERT INTO questions
       (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices,
        marks, position, starter_code, test_cases, language, bank_category)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING *`,
    [
      assessmentId,
      section_id || null,
      b.question_type,
      b.question_text,
      asJson(b.options, []),
      b.correct_index,
      asJson(b.correct_indices, []),
      b.marks,
      maxRes.rows[0].next,
      b.starter_code || '',
      asJson(b.test_cases, []),
      b.language || 'javascript',
      b.category,
    ]
  );
  res.status(201).json({ question: result.rows[0] });
});

export const createBankQuestion = asyncHandler(async (req, res) => {
  const { category, question_type, question_text, options, correct_index, correct_indices, marks, solution } = req.body;
  const result = await query(
    `INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, marks, solution)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [category, question_type || 'mcq', question_text, asJson(options, []), correct_index ?? 0, asJson(correct_indices, []), marks ?? 1, solution || '']
  );
  res.status(201).json({ question: result.rows[0] });
});

export const updateBankQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { question_text, options, correct_index, marks, solution } = req.body;
  const result = await query(
    `UPDATE question_bank SET question_text = COALESCE($1, question_text), options = COALESCE($2, options),
     correct_index = COALESCE($3, correct_index), marks = COALESCE($4, marks), solution = COALESCE($5, solution)
     WHERE id = $6 RETURNING *`,
    [question_text, options ? asJson(options, []) : null, correct_index, marks, solution, id]
  );
  if (!result.rowCount) throw ApiError.notFound('Question not found');
  res.json({ question: result.rows[0] });
});

export const deleteBankQuestion = asyncHandler(async (req, res) => {
  const result = await query('DELETE FROM question_bank WHERE id = $1 RETURNING id', [req.params.id]);
  if (!result.rowCount) throw ApiError.notFound('Question not found');
  res.json({ message: 'Deleted' });
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
        `INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, marks, solution)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id, question_text, category`,
        [
          category,
          row.question_type,
          row.question_text,
          asJson(row.options, []),
          row.correct_index,
          asJson(row.correct_indices, []),
          row.marks,
          row.solution || '',
        ]
      );
      created.push(result.rows[0]);
    } catch (err) {
      errors.push({ line: row.line, error: err.message });
    }
  }

  res.status(201).json({ created: created.length, questions: created, errors });
});

/**
 * POST /api/question-bank/bulk-import/:assessmentId
 * Body: { category } or { ids: number[] }, optional section_id
 */
export const bulkImportToAssessment = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  const { category, ids, section_id } = req.body || {};

  const a = await query('SELECT id FROM assessments WHERE id = $1', [assessmentId]);
  if (a.rowCount === 0) throw ApiError.notFound('Assessment not found');

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
    const result = await query(
      `INSERT INTO questions
         (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices,
          marks, position, starter_code, test_cases, language, bank_category)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
       RETURNING id, question_text`,
      [
        assessmentId,
        section_id || null,
        b.question_type,
        b.question_text,
        asJson(b.options, []),
        b.correct_index,
        asJson(b.correct_indices, []),
        b.marks,
        position,
        b.starter_code || '',
        asJson(b.test_cases, []),
        b.language || 'javascript',
        b.category,
      ]
    );
    imported.push(result.rows[0]);
  }

  res.status(201).json({ imported: imported.length, questions: imported });
});
