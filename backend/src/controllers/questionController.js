import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { parseQuestionCsv, questionsToCsv } from '../utils/csvQuestions.js';
import { autoClassifyQuestion } from '../utils/questionClassifier.js';

const ensureAssessment = async (assessmentId) => {
  const a = await query('SELECT id FROM assessments WHERE id = $1', [assessmentId]);
  if (a.rowCount === 0) throw ApiError.notFound('Assessment not found');
};

async function resolveSubjectAndChapter({ subject_id, subject, chapter_id, topic, question_text, options }) {
  let finalSubjectId = subject_id ? (Number(subject_id) || null) : null;
  let finalSubjectName = subject || null;
  let finalChapterId = chapter_id ? (Number(chapter_id) || null) : null;
  let finalTopicName = topic || null;

  // Auto-classify if subject or topic is missing
  if (!finalSubjectName || !finalTopicName) {
    const auto = autoClassifyQuestion(question_text, options, finalSubjectName);
    if (!finalSubjectName) finalSubjectName = auto.subject;
    if (!finalTopicName) finalTopicName = auto.topic;
  }

  if (finalSubjectId) {
    const sRes = await query('SELECT name FROM subjects WHERE id = $1', [finalSubjectId]);
    if (sRes.rows.length > 0) {
      finalSubjectName = sRes.rows[0].name;
    }
  } else if (finalSubjectName) {
    const sRes = await query('SELECT id, name FROM subjects WHERE LOWER(name) = LOWER($1)', [finalSubjectName]);
    if (sRes.rows.length > 0) {
      finalSubjectId = sRes.rows[0].id;
      finalSubjectName = sRes.rows[0].name;
    }
  }

  if (finalChapterId) {
    const cRes = await query('SELECT id, name FROM chapters WHERE id = $1', [finalChapterId]);
    if (cRes.rows.length > 0) {
      const dbChapterName = cRes.rows[0].name;
      if (!finalTopicName || finalTopicName.trim().toLowerCase() === dbChapterName.trim().toLowerCase()) {
        finalTopicName = dbChapterName;
      } else {
        finalChapterId = null;
      }
    } else {
      finalChapterId = null;
    }
  }

  if (!finalChapterId && finalTopicName && finalTopicName.trim()) {
    const cleanTopic = finalTopicName.trim();
    let cRes;
    if (finalSubjectId) {
      cRes = await query('SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = LOWER($2)', [finalSubjectId, cleanTopic]);
    } else {
      cRes = await query('SELECT id, name FROM chapters WHERE LOWER(name) = LOWER($1)', [cleanTopic]);
    }

    if (cRes.rows.length > 0) {
      finalChapterId = cRes.rows[0].id;
      finalTopicName = cRes.rows[0].name;
    } else if (finalSubjectId) {
      const insRes = await query(
        'INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, 0) ON CONFLICT (subject_id, name) DO UPDATE SET name = EXCLUDED.name RETURNING id, name',
        [finalSubjectId, cleanTopic]
      );
      if (insRes.rows.length > 0) {
        finalChapterId = insRes.rows[0].id;
        finalTopicName = insRes.rows[0].name;
      }
    }
  }

  return {
    subject_id: finalSubjectId,
    subject: finalSubjectName,
    chapter_id: finalChapterId,
    topic: finalTopicName,
  };
}

export const listQuestions = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  await ensureAssessment(assessmentId);
  const result = await query(
    `SELECT q.*, s.name AS section_name, s.section_type
     FROM questions q
     LEFT JOIN assessment_sections s ON s.id = q.section_id
     WHERE q.assessment_id = $1
     ORDER BY q.position ASC, q.id ASC`,
    [assessmentId]
  );
  res.json({ questions: result.rows });
});

export const createQuestion = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  await ensureAssessment(assessmentId);

  const {
    section_id,
    question_type = 'single_choice',
    question_text,
    options,
    correct_index,
    correct_indices,
    numeric_answer,
    numerical_tolerance,
    assertion_text,
    reason_text,
    marks = 1,
    position,
    starter_code,
    test_cases,
    language,
    bank_category,
    solution,
    image_url,
    subject_id,
    chapter_id,
    difficulty,
    subject: inputSubject,
    topic: inputTopic,
  } = req.body;

  let pos = position;
  if (pos === undefined) {
    const maxRes = await query(
      'SELECT COALESCE(MAX(position), 0) + 1 AS next FROM questions WHERE assessment_id = $1',
      [assessmentId]
    );
    pos = maxRes.rows[0].next;
  }

  const questionSubject = inputSubject || bank_category || null;
  const questionTopic = inputTopic || bank_category || null;

  const resolved = await resolveSubjectAndChapter({
    subject_id,
    subject: questionSubject,
    chapter_id,
    topic: questionTopic,
  });

  const finalSubjectId = resolved.subject_id;
  const finalSubjectName = resolved.subject;
  const finalChapterId = resolved.chapter_id;
  const finalTopicName = resolved.topic;

  const result = await query(
    `INSERT INTO questions
       (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices,
        numeric_answer, numerical_tolerance, assertion_text, reason_text,
        marks, position, starter_code, test_cases, language, bank_category, solution, image_url, subject_id, chapter_id, difficulty, subject, topic)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24)
     RETURNING *`,
    [
      assessmentId,
      section_id || null,
      question_type,
      question_text,
      options ? JSON.stringify(options) : JSON.stringify([]),
      correct_index ?? 0,
      JSON.stringify(correct_indices || []),
      numeric_answer !== undefined ? numeric_answer : null,
      numerical_tolerance !== undefined ? numerical_tolerance : 0,
      assertion_text || null,
      reason_text || null,
      marks,
      pos,
      starter_code || '',
      JSON.stringify(test_cases || []),
      language || 'javascript',
      bank_category || null,
      solution || '',
      image_url || '',
      finalSubjectId,
      finalChapterId,
      difficulty || 'medium',
      finalSubjectName,
      finalTopicName,
    ]
  );
  res.status(201).json({ question: result.rows[0] });
});

export const updateQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const existing = await query('SELECT * FROM questions WHERE id = $1', [id]);
  if (existing.rowCount === 0) throw ApiError.notFound('Question not found');
  const q = existing.rows[0];

  const question_text = body.question_text ?? q.question_text;
  const question_type = body.question_type ?? q.question_type;
  const options = body.options !== undefined ? JSON.stringify(body.options) : (typeof q.options === 'string' ? q.options : JSON.stringify(q.options || []));
  const correct_index = body.correct_index ?? q.correct_index;
  const correct_indices = body.correct_indices !== undefined ? JSON.stringify(body.correct_indices) : (typeof q.correct_indices === 'string' ? q.correct_indices : JSON.stringify(q.correct_indices || []));
  const numeric_answer = body.numeric_answer !== undefined ? body.numeric_answer : q.numeric_answer;
  const numerical_tolerance = body.numerical_tolerance !== undefined ? body.numerical_tolerance : q.numerical_tolerance;
  const assertion_text = body.assertion_text !== undefined ? body.assertion_text : q.assertion_text;
  const reason_text = body.reason_text !== undefined ? body.reason_text : q.reason_text;
  const marks = body.marks ?? q.marks;
  const position = body.position ?? q.position;
  const section_id = body.section_id !== undefined ? body.section_id : q.section_id;
  const starter_code = body.starter_code ?? q.starter_code;
  const test_cases = body.test_cases !== undefined ? JSON.stringify(body.test_cases) : (typeof q.test_cases === 'string' ? q.test_cases : JSON.stringify(q.test_cases || []));
  const language = body.language ?? q.language;
  const bank_category = body.bank_category !== undefined ? body.bank_category : q.bank_category;
  const solution = body.solution !== undefined ? body.solution : q.solution;
  const image_url = body.image_url !== undefined ? body.image_url : q.image_url;
  let rawSubjectId = body.subject_id !== undefined ? (Number(body.subject_id) || null) : q.subject_id;
  let rawChapterId = body.chapter_id !== undefined ? (Number(body.chapter_id) || null) : q.chapter_id;
  const difficulty = body.difficulty !== undefined ? body.difficulty : q.difficulty;
  let rawSubject = body.subject !== undefined ? body.subject : q.subject;
  let rawTopic = body.topic !== undefined ? body.topic : q.topic;

  if (body.topic !== undefined && body.topic !== q.topic && body.chapter_id === undefined) {
    rawChapterId = null;
  }

  const resolved = await resolveSubjectAndChapter({
    subject_id: rawSubjectId,
    subject: rawSubject,
    chapter_id: rawChapterId,
    topic: rawTopic,
  });

  const subject_id = resolved.subject_id;
  const subject = resolved.subject;
  const chapter_id = resolved.chapter_id;
  const topic = resolved.topic;

  const result = await query(
    `UPDATE questions SET
       question_text = $1, question_type = $2, options = $3, correct_index = $4, correct_indices = $5,
       numeric_answer = $6, numerical_tolerance = $7, assertion_text = $8, reason_text = $9,
       marks = $10, position = $11, section_id = $12, starter_code = $13, test_cases = $14, language = $15,
       bank_category = $16, solution = $17, image_url = $18, subject_id = $19, chapter_id = $20, difficulty = $21,
       subject = $22, topic = $23
     WHERE id = $24 RETURNING *`,
    [question_text, question_type, options, correct_index, correct_indices,
      numeric_answer, numerical_tolerance, assertion_text, reason_text,
      marks, position, section_id, starter_code, test_cases, language, bank_category, solution, image_url, subject_id, chapter_id, difficulty, subject, topic, id]
  );
  res.json({ question: result.rows[0] });
});

export const reorderQuestions = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  const { order } = req.body;
  await ensureAssessment(assessmentId);

  await withTransaction(async (client) => {
    for (const item of order) {
      await client.query(
        'UPDATE questions SET position = $1 WHERE id = $2 AND assessment_id = $3',
        [item.position, item.id, assessmentId]
      );
    }
  });
  res.json({ message: 'Questions reordered' });
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await query('DELETE FROM questions WHERE id = $1 RETURNING id', [id]);
  if (result.rowCount === 0) throw ApiError.notFound('Question not found');
  res.json({ message: 'Question deleted', id: result.rows[0].id });
});

export const exportQuestions = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  await ensureAssessment(assessmentId);

  const result = await query(
    `SELECT q.*, s.name AS section_name
     FROM questions q
     LEFT JOIN assessment_sections s ON s.id = q.section_id
     WHERE q.assessment_id = $1
     ORDER BY q.position ASC, q.id ASC`,
    [assessmentId]
  );

  const assessment = await query('SELECT title FROM assessments WHERE id = $1', [assessmentId]);
  const slug = (assessment.rows[0]?.title || 'assessment').replace(/[^\w-]+/g, '_').slice(0, 40);
  const csv = questionsToCsv(result.rows, { includeSolution: true });

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="${slug}_questions.csv"`);
  res.send(csv);
});

/**
 * POST /api/assessments/:assessmentId/questions/bulk
 * CSV columns: question_text, question_type, marks, options, correct_index
 * options = pipe-separated e.g. "A|B|C|D"
 */
export const bulkUploadQuestions = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  const { csv } = req.body;

  await ensureAssessment(assessmentId);

  const { rows, errors } = parseQuestionCsv(csv);

  const maxRes = await query(
    'SELECT COALESCE(MAX(position), 0) AS max FROM questions WHERE assessment_id = $1',
    [assessmentId]
  );
  let position = maxRes.rows[0].max;
  const created = [];

  for (const row of rows) {
    position += 1;
    try {
      const resolved = await resolveSubjectAndChapter({
        subject_id: row.subject_id,
        subject: row.subject || row.category,
        chapter_id: row.chapter_id,
        topic: row.topic,
        question_text: row.question_text,
        options: row.options,
      });

      const result = await query(
        `INSERT INTO questions
           (assessment_id, question_type, question_text, options, correct_index, correct_indices, marks, position, solution, image_url, subject_id, chapter_id, subject, topic, bank_category)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15) RETURNING id, question_text, subject, topic`,
        [
          assessmentId,
          row.question_type,
          row.question_text,
          JSON.stringify(row.options),
          row.correct_index,
          JSON.stringify(row.correct_indices),
          row.marks,
          position,
          row.solution || '',
          row.image_url || '',
          resolved.subject_id,
          resolved.chapter_id,
          resolved.subject,
          resolved.topic,
          resolved.subject,
        ]
      );
      created.push(result.rows[0]);
    } catch (err) {
      errors.push({ line: row.line, error: err.message });
    }
  }

  res.status(201).json({ created: created.length, questions: created, errors });
});
