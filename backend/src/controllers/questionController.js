import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { parseQuestionCsv, questionsToCsv } from '../utils/csvQuestions.js';
import { autoClassifyQuestion } from '../utils/questionClassifier.js';

const ensureAssessment = async (assessmentId) => {
  const a = await query('SELECT id FROM assessments WHERE id = $1', [assessmentId]);
  if (a.rowCount === 0) throw ApiError.notFound('Assessment not found');
};

export const checkAssessmentModifiable = async (assessmentId, actionName = 'modify questions') => {
  const result = await query(
    `SELECT (
       (SELECT COUNT(*)::int FROM attempts WHERE assessment_id = $1) +
       (SELECT COUNT(*)::int FROM test_attempts WHERE test_id = $1)
     ) AS attempt_count`,
    [assessmentId]
  );
  const count = Number(result.rows[0]?.attempt_count || 0);
  if (count > 0) {
    throw ApiError.conflict(
      `Cannot ${actionName}: ${count} student attempt(s) have already been recorded for this assessment. Structural modifications (reordering, insertion, deletion) are locked to protect student results and answer mapping integrity. Please duplicate this assessment into a new editable draft to make changes.`
    );
  }
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
  await checkAssessmentModifiable(assessmentId, 'insert questions');

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
    target_position,
    insert_mode,
    reference_question_id,
    original_question_number,
    client_updated_at,
    starter_code,
    test_cases,
    language,
    bank_category,
    solution,
    image_url,
    solution_image_url,
    subject_id,
    chapter_id,
    difficulty,
    subject: inputSubject,
    topic: inputTopic,
  } = req.body;

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

  const allMedia = [];
  if (image_url) allMedia.push({ type: 'question', url: image_url, id: 'q-diagram' });
  if (solution_image_url) allMedia.push({ type: 'solution', url: solution_image_url, id: 'sol-diagram' });
  if (Array.isArray(options)) {
    options.forEach((opt, idx) => {
      if (typeof opt === 'object' && opt !== null) {
        if (Array.isArray(opt.media) && opt.media.length > 0) {
          allMedia.push(...opt.media);
        } else if (opt.image_url) {
          allMedia.push({ type: 'diagram', url: opt.image_url, id: `opt-${idx}-img` });
        }
      }
    });
  }
  const mediaToStore = JSON.stringify(allMedia);

  const inserted = await withTransaction(async (client) => {
    // 1. Revision / concurrency check if client_updated_at is provided
    if (client_updated_at) {
      const aRes = await client.query('SELECT updated_at FROM assessments WHERE id = $1', [assessmentId]);
      if (aRes.rowCount > 0) {
        const dbTime = new Date(aRes.rows[0].updated_at).getTime();
        const clTime = new Date(client_updated_at).getTime();
        if (Math.abs(dbTime - clTime) > 2000) {
          throw ApiError.conflict('The assessment was modified by another session. Please refresh the page before inserting.');
        }
      }
    }

    // 2. Determine target position K
    let targetPos = null;
    if (reference_question_id) {
      const refRes = await client.query(
        'SELECT position FROM questions WHERE id = $1 AND assessment_id = $2',
        [reference_question_id, assessmentId]
      );
      if (refRes.rowCount > 0) {
        const refPos = Number(refRes.rows[0].position);
        targetPos = insert_mode === 'after' ? refPos + 1 : refPos;
      }
    }

    if (targetPos === null) {
      if (target_position !== undefined && target_position !== null && Number(target_position) > 0) {
        targetPos = Number(target_position);
      } else if (position !== undefined && position !== null && Number(position) > 0) {
        targetPos = Number(position);
      } else {
        const maxRes = await client.query(
          'SELECT COALESCE(MAX(position), 0) + 1 AS next FROM questions WHERE assessment_id = $1',
          [assessmentId]
        );
        targetPos = Number(maxRes.rows[0].next);
      }
    }

    // 3. Shift existing questions at or after targetPos forward by 1 (in descending order)
    await client.query(
      'UPDATE questions SET position = position + 1 WHERE assessment_id = $1 AND position >= $2',
      [assessmentId, targetPos]
    );

    // 4. Insert new question at targetPos
    const origQNum = (original_question_number !== undefined && original_question_number !== null)
      ? Number(original_question_number)
      : targetPos;

    const insRes = await client.query(
      `INSERT INTO questions
         (assessment_id, section_id, question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, numerical_tolerance, assertion_text, reason_text,
          marks, position, starter_code, test_cases, language, bank_category, solution, image_url, solution_image_url,
          subject_id, chapter_id, difficulty, subject, topic, media, original_question_number)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27)
       RETURNING *`,
      [
        assessmentId,
        section_id || null,
        question_type,
        question_text,
        options ? (typeof options === 'string' ? options : JSON.stringify(options)) : JSON.stringify([]),
        correct_index ?? 0,
        JSON.stringify(correct_indices || []),
        numeric_answer !== undefined ? numeric_answer : null,
        numerical_tolerance !== undefined ? numerical_tolerance : 0,
        assertion_text || null,
        reason_text || null,
        marks,
        targetPos,
        starter_code || '',
        JSON.stringify(test_cases || []),
        language || 'javascript',
        bank_category || null,
        solution || '',
        image_url || '',
        solution_image_url || '',
        finalSubjectId,
        finalChapterId,
        difficulty || 'medium',
        finalSubjectName,
        finalTopicName,
        mediaToStore,
        origQNum,
      ]
    );

    const newQuestion = insRes.rows[0];

    // 5. Renumber all questions consecutively 1..N to guarantee no gaps or duplicates
    await client.query(
      `WITH renumbered AS (
         SELECT id, ROW_NUMBER() OVER (ORDER BY position ASC, id ASC) AS new_pos
         FROM questions
         WHERE assessment_id = $1
       )
       UPDATE questions q
       SET position = r.new_pos
       FROM renumbered r
       WHERE q.id = r.id AND q.assessment_id = $1`,
      [assessmentId]
    );

    // 6. Update assessment updated_at timestamp
    await client.query('UPDATE assessments SET updated_at = NOW() WHERE id = $1', [assessmentId]);

    // 7. Return the final refreshed question
    const finalQRes = await client.query('SELECT * FROM questions WHERE id = $1', [newQuestion.id]);
    return finalQRes.rows[0];
  });

  res.status(201).json({ question: inserted });
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
  const solution_image_url = body.solution_image_url !== undefined ? body.solution_image_url : q.solution_image_url;
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

  let media = q.media;
  if (body.options !== undefined || body.image_url !== undefined || body.solution_image_url !== undefined || body.media !== undefined) {
    if (body.media !== undefined) {
      media = typeof body.media === 'string' ? body.media : JSON.stringify(body.media);
    } else {
      const qImg = body.image_url !== undefined ? body.image_url : q.image_url;
      const solImg = body.solution_image_url !== undefined ? body.solution_image_url : q.solution_image_url;
      const allMedia = [];
      if (qImg) allMedia.push({ type: 'question', url: qImg, id: 'q-diagram' });
      if (solImg) allMedia.push({ type: 'solution', url: solImg, id: 'sol-diagram' });
      const optsToCheck = body.options !== undefined ? body.options : (typeof q.options === 'string' ? JSON.parse(q.options) : (q.options || []));
      if (Array.isArray(optsToCheck)) {
        optsToCheck.forEach((opt, idx) => {
          if (typeof opt === 'object' && opt !== null) {
            if (Array.isArray(opt.media) && opt.media.length > 0) {
              allMedia.push(...opt.media);
            } else if (opt.image_url) {
              allMedia.push({ type: 'diagram', url: opt.image_url, id: `opt-${idx}-img` });
            }
          }
        });
      }
      media = JSON.stringify(allMedia);
    }
  }

  const hasAnswerKey = Boolean(
    (question_type === 'multi_select' && Array.isArray(JSON.parse(correct_indices || '[]')) && JSON.parse(correct_indices || '[]').length > 0) ||
    ((question_type === 'integer' || question_type === 'numerical') && numeric_answer !== null && numeric_answer !== undefined && numeric_answer !== '') ||
    (correct_index !== null && correct_index !== undefined && correct_index !== '')
  );

  const result = await query(
    `UPDATE questions SET
       question_text = $1, question_type = $2, options = $3, correct_index = $4, correct_indices = $5,
       numeric_answer = $6, numerical_tolerance = $7, assertion_text = $8, reason_text = $9,
       marks = $10, position = $11, section_id = $12, starter_code = $13, test_cases = $14, language = $15,
       bank_category = $16, solution = $17, image_url = $18, solution_image_url = $19, subject_id = $20, chapter_id = $21, difficulty = $22,
       subject = $23, topic = $24, media = $25,
       extraction_meta = jsonb_set(
         jsonb_set(COALESCE(extraction_meta, '{}'::jsonb), '{hasAnswerKey}', $27::jsonb, true),
         '{needsReview}', 'false'::jsonb, true
       )
     WHERE id = $26 RETURNING *`,
    [question_text, question_type, options, correct_index, correct_indices,
      numeric_answer, numerical_tolerance, assertion_text, reason_text,
      marks, position, section_id, starter_code, test_cases, language, bank_category, solution, image_url, solution_image_url, subject_id, chapter_id, difficulty, subject, topic, media, id, JSON.stringify(hasAnswerKey)]
  );
  res.json({ question: result.rows[0] });
});

export const reorderQuestions = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  const { order, client_updated_at } = req.body;
  await ensureAssessment(assessmentId);
  await checkAssessmentModifiable(assessmentId, 'reorder questions');

  if (!Array.isArray(order) || order.length === 0) {
    throw ApiError.badRequest('Reorder request must contain a non-empty order array');
  }

  const result = await withTransaction(async (client) => {
    // 1. Revision / concurrency check
    if (client_updated_at) {
      const aRes = await client.query('SELECT updated_at FROM assessments WHERE id = $1', [assessmentId]);
      if (aRes.rowCount > 0) {
        const dbTime = new Date(aRes.rows[0].updated_at).getTime();
        const clTime = new Date(client_updated_at).getTime();
        if (Math.abs(dbTime - clTime) > 2000) {
          throw ApiError.conflict('The assessment was modified by another user or session. Please refresh the page before reordering.');
        }
      }
    }

    // 2. Fetch existing questions for this assessment
    const currentRes = await client.query(
      'SELECT id, position, section_id, subject FROM questions WHERE assessment_id = $1 ORDER BY position ASC, id ASC',
      [assessmentId]
    );
    const currentQuestions = currentRes.rows;
    const currentMap = new Map(currentQuestions.map((q) => [Number(q.id), q]));

    // Validate matching question count
    if (order.length !== currentQuestions.length) {
      throw ApiError.badRequest(`Reorder request contains ${order.length} questions, but assessment has ${currentQuestions.length}`);
    }

    // Validate all IDs belong to this assessment and no duplicates
    const seenIds = new Set();
    for (const item of order) {
      const qId = Number(item.id);
      if (seenIds.has(qId)) {
        throw ApiError.badRequest(`Duplicate question ID ${qId} in reorder request`);
      }
      seenIds.add(qId);
      if (!currentMap.has(qId)) {
        throw ApiError.badRequest(`Question ID ${qId} does not belong to assessment ${assessmentId}`);
      }
    }

    // 3. Verify Subject & Section Invariance
    // Questions must NOT cross subject or section boundaries!
    const getPartitionKey = (q) => `${q.section_id || 'null'}::${(q.subject || 'general').trim().toLowerCase()}`;

    // Sort proposed order by proposed positions
    const sortedProposed = [...order].sort((a, b) => a.position - b.position);

    // Verify partition sequence invariance:
    // Every question at sorted index i must belong to the exact same partition (section + subject)
    // as the question originally at index i.
    for (let i = 0; i < currentQuestions.length; i++) {
      const origKey = getPartitionKey(currentQuestions[i]);
      const proposedQ = currentMap.get(Number(sortedProposed[i].id));
      const proposedKey = getPartitionKey(proposedQ);
      if (origKey !== proposedKey) {
        throw ApiError.badRequest(
          `Section/subject integrity violation: Question ID ${proposedQ.id} (${proposedKey}) cannot be moved into ${origKey} position slot. Questions are strictly isolated to their own subject and section.`
        );
      }
    }

    // 4. Update positions using temporary offsets to avoid any collisions
    for (let i = 0; i < sortedProposed.length; i++) {
      await client.query(
        'UPDATE questions SET position = $1 WHERE id = $2 AND assessment_id = $3',
        [-(i + 1), sortedProposed[i].id, assessmentId]
      );
    }
    for (let i = 0; i < sortedProposed.length; i++) {
      await client.query(
        'UPDATE questions SET position = $1 WHERE id = $2 AND assessment_id = $3',
        [i + 1, sortedProposed[i].id, assessmentId]
      );
    }

    // 5. Strictly normalize consecutive 1..N positions without gaps
    await client.query(
      `WITH renumbered AS (
         SELECT id, ROW_NUMBER() OVER (ORDER BY position ASC, id ASC) AS new_pos
         FROM questions
         WHERE assessment_id = $1
       )
       UPDATE questions q
       SET position = r.new_pos
       FROM renumbered r
       WHERE q.id = r.id AND q.assessment_id = $1`,
      [assessmentId]
    );

    // 6. Update assessment updated_at timestamp
    const updatedRes = await client.query(
      'UPDATE assessments SET updated_at = NOW() WHERE id = $1 RETURNING updated_at',
      [assessmentId]
    );

    return { updated_at: updatedRes.rows[0]?.updated_at };
  });

  res.json({ message: 'Questions reordered successfully', updated_at: result.updated_at });
});

export const deleteQuestion = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await query('SELECT id, assessment_id, position FROM questions WHERE id = $1', [id]);
  if (existing.rowCount === 0) throw ApiError.notFound('Question not found');
  const q = existing.rows[0];

  await checkAssessmentModifiable(q.assessment_id, 'delete questions');

  await withTransaction(async (client) => {
    await client.query('DELETE FROM questions WHERE id = $1', [id]);

    // Renumber remaining questions consecutively to cleanly close any gap
    await client.query(
      `WITH renumbered AS (
         SELECT id, ROW_NUMBER() OVER (ORDER BY position ASC, id ASC) AS new_pos
         FROM questions
         WHERE assessment_id = $1
       )
       UPDATE questions q
       SET position = r.new_pos
       FROM renumbered r
       WHERE q.id = r.id AND q.assessment_id = $1`,
      [q.assessment_id]
    );

    await client.query('UPDATE assessments SET updated_at = NOW() WHERE id = $1', [q.assessment_id]);
  });

  res.json({ message: 'Question deleted and positions normalized', id: q.id });
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

/**
 * PATCH /api/assessments/:assessmentId/questions/bulk-marks
 * Bulk update question marks for an assessment
 * Optional filters: question_ids (array), section_id, question_type
 */
export const bulkUpdateQuestionMarks = asyncHandler(async (req, res) => {
  const { assessmentId } = req.params;
  const { marks, question_ids, section_id, question_type } = req.body;

  await ensureAssessment(assessmentId);

  const clauses = ['assessment_id = $1'];
  const values = [assessmentId, marks];

  if (Array.isArray(question_ids) && question_ids.length > 0) {
    values.push(question_ids);
    clauses.push(`id = ANY($${values.length})`);
  }

  if (section_id !== undefined && section_id !== 'all') {
    if (section_id === null) {
      clauses.push('section_id IS NULL');
    } else {
      values.push(section_id);
      clauses.push(`section_id = $${values.length}`);
    }
  }

  if (question_type && question_type !== 'all') {
    values.push(question_type);
    clauses.push(`question_type = $${values.length}`);
  }

  const updateQuery = `
    UPDATE questions
    SET marks = $2
    WHERE ${clauses.join(' AND ')}
    RETURNING id, marks
  `;

  const updateRes = await query(updateQuery, values);
  const updatedCount = updateRes.rowCount;

  // Recalculate total marks for the assessment
  const totalRes = await query(
    'SELECT COALESCE(SUM(marks), 0) AS total_marks FROM questions WHERE assessment_id = $1',
    [assessmentId]
  );
  const totalMarks = Number(totalRes.rows[0]?.total_marks || 0);

  // Synchronize tests table max_marks if test row exists
  await query(
    'UPDATE tests SET max_marks = $1, updated_at = NOW() WHERE id = $2',
    [totalMarks, assessmentId]
  ).catch(() => {});

  res.json({
    message: `Updated marks to ${marks} for ${updatedCount} question${updatedCount === 1 ? '' : 's'}`,
    updated_count: updatedCount,
    total_marks: totalMarks,
  });
});

