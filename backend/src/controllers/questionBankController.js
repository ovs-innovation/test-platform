import { query } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { parseQuestionCsv, questionsToCsv } from '../utils/csvQuestions.js';
import { rememberCache, delCache } from '../config/redis.js';
import { normalizeQuestionBankPayload } from '../utils/questionBankPayload.js';

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
  const payload = await rememberCache('cache:qb:categories', 120, async () => {
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
  const { category, skip_cache } = req.query;
  const shouldSkipCache = skip_cache === 'true' || req.headers['cache-control'] === 'no-cache';
  const cacheKey = `cache:qb:questions:${category || 'all'}`;

  const fetchQuestions = async () => {
    let sql = 'SELECT * FROM question_bank';
    const params = [];
    if (category) {
      sql += ' WHERE category = $1';
      params.push(category);
    }
    sql += ' ORDER BY category, id ASC';
    const result = await query(sql, params);
    return { questions: result.rows };
  };

  if (shouldSkipCache) {
    const payload = await fetchQuestions();
    return res.json(payload);
  }

  const payload = await rememberCache(cacheKey, 60, fetchQuestions);
  res.json(payload);
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

  const result = await query(
    `INSERT INTO questions
       (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices,
        numeric_answer, numerical_tolerance, assertion_text, reason_text,
        marks, position, starter_code, test_cases, language, bank_category, solution, image_url, solution_image_url, subject_id, chapter_id, difficulty, subject, topic)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)
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
    ]
  );
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
  } = payload;

  const result = await query(
    `INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, subject_id, chapter_id, difficulty, image_url, solution_image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17) RETURNING *`,
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
      chapter_id || null,
      difficulty || 'medium',
      image_url || '',
      solution_image_url || '',
    ]
  );
  await delCache('cache:qb:*');
  res.status(201).json({ question: result.rows[0] });
});

export const updateBankQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payload = normalizeQuestionBankPayload(req.body);
  const {
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
  } = payload;

  const existing = await query('SELECT * FROM question_bank WHERE id = $1', [id]);
  if (existing.rowCount === 0) throw ApiError.notFound('Question not found');
  const q = existing.rows[0];

  const result = await query(
    `UPDATE question_bank SET 
       question_text = $1, 
       options = $2, 
       correct_index = $3, 
       correct_indices = $4,
       numeric_answer = $5,
       numerical_tolerance = $6,
       assertion_text = $7,
       reason_text = $8,
       marks = $9, 
       solution = $10,
       subject_id = $11,
       chapter_id = $12,
       difficulty = $13,
       image_url = $14,
       solution_image_url = $15
     WHERE id = $16 RETURNING *`,
    [
      question_text ?? q.question_text,
      options ? asJson(options, []) : q.options,
      Number(correct_index ?? q.correct_index ?? 0),
      correct_indices ? asJson(correct_indices, []) : q.correct_indices,
      numeric_answer !== undefined ? numeric_answer : q.numeric_answer,
      numerical_tolerance !== undefined ? numerical_tolerance : q.numerical_tolerance,
      assertion_text !== undefined ? assertion_text : q.assertion_text,
      reason_text !== undefined ? reason_text : q.reason_text,
      Number(marks ?? q.marks ?? 1),
      solution ?? q.solution,
      subject_id !== undefined ? (subject_id || null) : q.subject_id,
      chapter_id !== undefined ? (chapter_id || null) : q.chapter_id,
      difficulty ?? q.difficulty,
      image_url !== undefined ? image_url : q.image_url,
      solution_image_url !== undefined ? solution_image_url : q.solution_image_url,
      id
    ]
  );
  await delCache('cache:qb:*');
  res.json({ question: result.rows[0] });
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

    const result = await query(
      `INSERT INTO questions
         (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, numerical_tolerance, assertion_text, reason_text,
          marks, position, starter_code, test_cases, language, bank_category, solution, image_url, subject_id, chapter_id, difficulty, subject, topic)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)
       RETURNING id, question_text`,
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
        position,
        b.starter_code || '',
        asJson(b.test_cases, []),
        b.language || 'javascript',
        b.category,
        b.solution || '',
        b.image_url || '',
        subject_id,
        chapter_id,
        b.difficulty || 'medium',
        subject,
        topic,
      ]
    );
    imported.push(result.rows[0]);
  }

  res.status(201).json({ imported: imported.length, questions: imported });
});

/**
 * POST /api/question-bank/upload-pdf
 * Uploads a question paper PDF (and optional answer key/solutions PDF) to extract
 * questions, options, answers, and solutions directly into the Question Bank for selected or auto-detected subjects.
 */
export const uploadPdfToQuestionBank = asyncHandler(async (req, res) => {
  const {
    file_base64,
    file_name = 'question_paper.pdf',
    category = 'auto',
    answer_key_base64,
    answer_key_name = 'answer_key.pdf',
    default_marks = 4,
    include_answers = true,
    difficulty = 'medium',
  } = req.body;

  if (!file_base64 || typeof file_base64 !== 'string') {
    throw ApiError.badRequest('Question paper PDF is required');
  }

  // Save question paper file copy to disk if upload middleware is present
  let savedFileUrl = '';
  try {
    const { saveUploadedFile } = await import('../middleware/upload.js');
    savedFileUrl = await saveUploadedFile(file_base64, file_name, 'qb_paper');
  } catch (err) {
    console.warn('[uploadPdfToQuestionBank] Warning: Could not save uploaded PDF copy:', err.message);
  }

  const base64Data = file_base64.replace(/^data:[^;]+;base64,/, '');
  const pdfBuffer = Buffer.from(base64Data, 'base64');

  const { parseQuestionsFromPdf, extractPdfText } = await import('../utils/pdfQuestions.js');
  const { parseAnswerKeyAndSolutions } = await import('../utils/pdfQuestionParser.js');

  console.log(`[uploadPdfToQuestionBank] Parsing questions from PDF (${file_name})...`);
  const shouldIncludeAnswers = include_answers !== false && include_answers !== 'false';
  const pdfExtraction = await parseQuestionsFromPdf(pdfBuffer, { includeAnswers: shouldIncludeAnswers });
  let extractedQs = pdfExtraction.rows || [];

  if (!extractedQs.length) {
    throw ApiError.badRequest('No questions could be extracted from the PDF. Please ensure the PDF contains readable text or high quality question pages.');
  }

  console.log(`[uploadPdfToQuestionBank] Extracted ${extractedQs.length} question(s) from PDF.`);

  // Optional: Merge standalone answer key / solution PDF if provided
  if (answer_key_base64 && typeof answer_key_base64 === 'string') {
    try {
      console.log(`[uploadPdfToQuestionBank] Processing separate answer key PDF (${answer_key_name})...`);
      const akBase64 = answer_key_base64.replace(/^data:[^;]+;base64,/, '');
      const akBuffer = Buffer.from(akBase64, 'base64');
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

  for (let idx = 0; idx < extractedQs.length; idx++) {
    const q = extractedQs[idx];
    try {
      const { categoryName, subjectId } = resolveSubject(q.subject || q.bank_category, category);
      affectedCategories.add(categoryName);

      const qText = (q.question_text || q.questionText || q.question?.text || '').trim();
      if (!qText) continue;

      const qType = q.question_type || q.questionType || (q.numeric_answer != null ? 'integer' : 'mcq');
      const isInteger = qType === 'integer' || qType === 'numerical';

      const options = isInteger
        ? []
        : (q.options || []).map((o) => (typeof o === 'object' && o.text ? o.text : String(o)));

      let correctIndex = q.correct_index != null ? Number(q.correct_index) : 0;
      if (isInteger) correctIndex = 0;
      const correctIndices = isInteger ? [] : (q.correct_indices || [correctIndex]);

      const numericAnswer = isInteger && q.numeric_answer != null ? Number(q.numeric_answer) : null;
      const marks = Number(q.marks || default_marks || 4);
      const solution = (q.solution || q.explanation?.text || (typeof q.explanation === 'string' ? q.explanation : '') || '').trim();
      const imageUrl = q.image_url || (q.media && q.media[0] ? q.media[0].url : '') || '';
      const topic = q.topic || q.chapter || '';

      const result = await query(
        `INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, marks, solution, subject_id, chapter_id, difficulty,
          image_url, subject, topic
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
        RETURNING id, category, question_text, question_type, marks, solution, subject`,
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
          null, // chapter_id
          difficulty || q.difficulty || 'medium',
          imageUrl,
          categoryName,
          topic,
        ]
      );
      createdQuestions.push(result.rows[0]);
    } catch (err) {
      console.error('[uploadPdfToQuestionBank] Insert error on question', idx + 1, err.message);
      errors.push({ line: idx + 1, error: err.message });
    }
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
});

