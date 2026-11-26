/**
 * AI Draft & Staging Storage Service
 * Manages drafts, question review states, edits, single-question regeneration,
 * and approval into the production Question Bank.
 */

import { query } from '../../config/db.js';
import { delCache } from '../../config/redis.js';

let tablesInitialized = false;

/**
 * Ensures staging tables exist in the current database environment.
 */
export async function ensureStagingTables() {
  if (tablesInitialized) return;

  const ddl = `
    CREATE TABLE IF NOT EXISTS ai_generation_drafts (
      id BIGSERIAL PRIMARY KEY,
      batch_id VARCHAR(100) UNIQUE NOT NULL,
      title VARCHAR(255),
      exam_type VARCHAR(50) NOT NULL,
      class_level VARCHAR(50),
      subject VARCHAR(100) NOT NULL,
      chapter VARCHAR(255),
      topic VARCHAR(255),
      difficulty VARCHAR(50) DEFAULT 'Medium',
      question_types JSONB DEFAULT '[]'::jsonb,
      diagram_req VARCHAR(50) DEFAULT 'Optional',
      explanation_req VARCHAR(50) DEFAULT 'Detailed Step-by-Step',
      additional_instructions TEXT,
      target_destination VARCHAR(50) DEFAULT 'draft',
      requested_count INT DEFAULT 10,
      total_generated INT DEFAULT 0,
      status VARCHAR(50) DEFAULT 'draft',
      progress_percent INT DEFAULT 0,
      error_message TEXT,
      created_by INT,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE TABLE IF NOT EXISTS ai_draft_questions (
      id BIGSERIAL PRIMARY KEY,
      draft_id BIGINT REFERENCES ai_generation_drafts(id) ON DELETE CASCADE,
      batch_id VARCHAR(100) NOT NULL,
      question_number INT DEFAULT 1,
      question_type VARCHAR(50) NOT NULL,
      subject VARCHAR(100) NOT NULL,
      chapter VARCHAR(255),
      topic VARCHAR(255),
      difficulty VARCHAR(50) DEFAULT 'Medium',
      question_text TEXT NOT NULL,
      options JSONB DEFAULT '[]'::jsonb,
      correct_index INT,
      correct_indices JSONB DEFAULT '[]'::jsonb,
      numeric_answer NUMERIC,
      numerical_tolerance NUMERIC DEFAULT 0,
      assertion_text TEXT,
      reason_text TEXT,
      match_pairs JSONB DEFAULT '[]'::jsonb,
      passage_title VARCHAR(255),
      passage_text TEXT,
      solution TEXT NOT NULL,
      marks INT DEFAULT 4,
      negative_marks INT DEFAULT 1,
      content_type VARCHAR(50) DEFAULT 'text',
      has_diagram BOOLEAN DEFAULT false,
      diagram_type VARCHAR(50) DEFAULT 'none',
      diagram_description TEXT,
      diagram_svg TEXT,
      image_url TEXT,
      solution_image_url TEXT,
      review_status VARCHAR(50) DEFAULT 'pending',
      admin_notes TEXT,
      validation_errors JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_draft_id ON ai_draft_questions(draft_id);
    CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_batch ON ai_draft_questions(batch_id);
    CREATE INDEX IF NOT EXISTS idx_ai_generation_drafts_status ON ai_generation_drafts(status);
  `;

  try {
    await query(ddl);
    tablesInitialized = true;
  } catch (err) {
    console.warn('[AiDraftService] Table initialization check notice:', err.message);
  }
}

/**
 * Creates a new draft staging record
 */
export async function createDraft(payload, userId = null) {
  await ensureStagingTables();

  const batchId = `ai-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const title = payload.title || `${payload.exam_type || 'NEET'} ${payload.subject || 'Physics'} - ${payload.chapter || 'Kinematics'}`;

  const sql = `
    INSERT INTO ai_generation_drafts (
      batch_id, title, exam_type, class_level, subject, chapter, topic,
      difficulty, question_types, diagram_req, explanation_req,
      additional_instructions, target_destination, requested_count,
      total_generated, status, progress_percent, created_by
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 0, 'processing', 10, $15)
    RETURNING *;
  `;

  const values = [
    batchId,
    title,
    payload.exam_type || 'NEET',
    payload.class_level || '12',
    payload.subject || 'Physics',
    Array.isArray(payload.chapters) ? payload.chapters.join(', ') : (payload.chapter || 'Core Concepts'),
    payload.topic || '',
    payload.difficulty || 'Medium',
    JSON.stringify(payload.question_types || ['single_choice']),
    payload.diagram_req || 'Optional',
    payload.explanation_req || 'Detailed Step-by-Step',
    payload.additional_instructions || '',
    payload.target_destination || 'draft',
    Number(payload.count) || 10,
    userId,
  ];

  const res = await query(sql, values);
  return res.rows[0];
}

/**
 * Updates draft batch progress and execution status
 */
export async function updateDraftStatus(draftId, { status, progress, totalGenerated, errorMessage }) {
  await ensureStagingTables();

  const updates = [];
  const params = [draftId];
  let pIdx = 2;

  if (status) {
    updates.push(`status = $${pIdx++}`);
    params.push(status);
  }
  if (progress !== undefined) {
    updates.push(`progress_percent = $${pIdx++}`);
    params.push(progress);
  }
  if (totalGenerated !== undefined) {
    updates.push(`total_generated = $${pIdx++}`);
    params.push(totalGenerated);
  }
  if (errorMessage !== undefined) {
    updates.push(`error_message = $${pIdx++}`);
    params.push(errorMessage);
  }

  updates.push(`updated_at = NOW()`);

  const sql = `UPDATE ai_generation_drafts SET ${updates.join(', ')} WHERE id = $1 RETURNING *`;
  const res = await query(sql, params);
  return res.rows[0];
}

/**
 * Persists questions into the ai_draft_questions table with deduplication check
 */
export async function saveDraftQuestions(draftId, batchId, questions = []) {
  await ensureStagingTables();
  if (!questions.length) return [];

  const savedQuestions = [];
  const seenSignatures = new Set();

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    // Deduplication key
    const sig = String(q.question_text || '')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '')
      .slice(0, 100);

    if (sig && seenSignatures.has(sig)) {
      console.warn(`[AiDraftService] Skipping duplicate question in batch: "${q.question_text.slice(0, 40)}..."`);
      continue;
    }
    seenSignatures.add(sig);

    const hasDiagram = Boolean(q.diagram_metadata?.has_diagram || q.content_type === 'diagram' || q.content_type === 'graph');
    const diagramType = q.diagram_metadata?.diagram_type || (hasDiagram ? 'geometry' : 'none');
    const diagramDesc = q.diagram_metadata?.diagram_description || '';

    const sql = `
      INSERT INTO ai_draft_questions (
        draft_id, batch_id, question_number, question_type, subject,
        chapter, topic, difficulty, question_text, options,
        correct_index, correct_indices, numeric_answer, numerical_tolerance,
        assertion_text, reason_text, match_pairs, passage_title, passage_text,
        solution, marks, negative_marks, content_type, has_diagram,
        diagram_type, diagram_description, diagram_svg, review_status
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14,
        $15, $16, $17, $18, $19,
        $20, $21, $22, $23, $24,
        $25, $26, $27, 'pending'
      ) RETURNING *;
    `;

    const values = [
      draftId,
      batchId,
      q.question_number || i + 1,
      q.question_type || 'single_choice',
      q.subject || 'Physics',
      q.chapter || 'General',
      q.topic || 'General',
      q.difficulty || 'Medium',
      q.question_text,
      JSON.stringify(Array.isArray(q.options) ? q.options : []),
      q.correct_index !== undefined ? q.correct_index : null,
      JSON.stringify(Array.isArray(q.correct_indices) ? q.correct_indices : []),
      q.numeric_answer !== undefined ? q.numeric_answer : null,
      q.numerical_tolerance || 0,
      q.assertion_text || null,
      q.reason_text || null,
      JSON.stringify(q.match_pairs || { column_a: [], column_b: [] }),
      q.passage_title || null,
      q.passage_text || null,
      q.solution || 'Solution not provided.',
      q.marks || 4,
      q.negative_marks || 1,
      q.content_type || 'text',
      hasDiagram,
      diagramType,
      diagramDesc,
      q.diagram_metadata?.diagram_svg || null,
    ];

    const res = await query(sql, values);
    savedQuestions.push(res.rows[0]);
  }

  // Update total_generated count on draft
  await query(
    `UPDATE ai_generation_drafts SET total_generated = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1), updated_at = NOW() WHERE id = $1`,
    [draftId]
  );

  return savedQuestions;
}

/**
 * Lists drafts with pagination and filtering
 */
export async function listDrafts({ page = 1, limit = 20, status, exam_type, subject } = {}) {
  await ensureStagingTables();

  const offset = (Math.max(1, page) - 1) * limit;
  const whereClauses = [];
  const params = [];
  let pIdx = 1;

  if (status) {
    whereClauses.push(`status = $${pIdx++}`);
    params.push(status);
  }
  if (exam_type) {
    whereClauses.push(`exam_type = $${pIdx++}`);
    params.push(exam_type);
  }
  if (subject) {
    whereClauses.push(`subject = $${pIdx++}`);
    params.push(subject);
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(' AND ')}` : '';

  const countSql = `SELECT COUNT(*)::int AS total FROM ai_generation_drafts ${whereSql}`;
  const countRes = await query(countSql, params);
  const total = countRes.rows[0]?.total || 0;

  const dataSql = `
    SELECT d.*,
      (SELECT COUNT(*)::int FROM ai_draft_questions q WHERE q.draft_id = d.id) AS question_count,
      (SELECT COUNT(*)::int FROM ai_draft_questions q WHERE q.draft_id = d.id AND q.review_status = 'approved') AS approved_count
    FROM ai_generation_drafts d
    ${whereSql}
    ORDER BY d.created_at DESC
    LIMIT $${pIdx++} OFFSET $${pIdx++};
  `;

  params.push(limit, offset);
  const dataRes = await query(dataSql, params);

  return {
    drafts: dataRes.rows,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  };
}

/**
 * Retrieves a single draft by ID along with its questions
 */
export async function getDraftById(draftId) {
  await ensureStagingTables();

  const dRes = await query(`SELECT * FROM ai_generation_drafts WHERE id = $1`, [draftId]);
  if (!dRes.rows.length) return null;

  const qRes = await query(
    `SELECT * FROM ai_draft_questions WHERE draft_id = $1 ORDER BY question_number ASC, id ASC`,
    [draftId]
  );

  return {
    ...dRes.rows[0],
    questions: qRes.rows,
  };
}

/**
 * Updates a single draft question (inline editing in review workspace)
 */
export async function updateDraftQuestion(draftId, questionId, patchData = {}) {
  await ensureStagingTables();

  const allowedFields = [
    'question_text',
    'options',
    'correct_index',
    'correct_indices',
    'numeric_answer',
    'numerical_tolerance',
    'assertion_text',
    'reason_text',
    'match_pairs',
    'solution',
    'difficulty',
    'review_status',
    'admin_notes',
    'marks',
    'negative_marks',
  ];

  const updates = [];
  const params = [draftId, questionId];
  let pIdx = 3;

  for (const field of allowedFields) {
    if (patchData[field] !== undefined) {
      const val =
        typeof patchData[field] === 'object' && patchData[field] !== null
          ? JSON.stringify(patchData[field])
          : patchData[field];
      updates.push(`${field} = $${pIdx++}`);
      params.push(val);
    }
  }

  if (!updates.length) {
    return null;
  }

  updates.push(`updated_at = NOW()`);

  const sql = `
    UPDATE ai_draft_questions
    SET ${updates.join(', ')}
    WHERE draft_id = $1 AND id = $2
    RETURNING *;
  `;

  const res = await query(sql, params);
  return res.rows[0] || null;
}

/**
 * Replaces a single draft question after AI regeneration
 */
export async function replaceDraftQuestion(draftId, questionId, newQ = {}) {
  await ensureStagingTables();

  const sql = `
    UPDATE ai_draft_questions
    SET
      question_type = $3,
      question_text = $4,
      options = $5,
      correct_index = $6,
      correct_indices = $7,
      numeric_answer = $8,
      numerical_tolerance = $9,
      assertion_text = $10,
      reason_text = $11,
      match_pairs = $12,
      solution = $13,
      difficulty = $14,
      review_status = 'regenerated',
      validation_errors = '[]'::jsonb,
      updated_at = NOW()
    WHERE draft_id = $1 AND id = $2
    RETURNING *;
  `;

  const values = [
    draftId,
    questionId,
    newQ.question_type || 'single_choice',
    newQ.question_text,
    JSON.stringify(Array.isArray(newQ.options) ? newQ.options : []),
    newQ.correct_index !== undefined ? newQ.correct_index : null,
    JSON.stringify(Array.isArray(newQ.correct_indices) ? newQ.correct_indices : []),
    newQ.numeric_answer !== undefined ? newQ.numeric_answer : null,
    newQ.numerical_tolerance || 0,
    newQ.assertion_text || null,
    newQ.reason_text || null,
    JSON.stringify(newQ.match_pairs || { column_a: [], column_b: [] }),
    newQ.solution || 'Detailed step-by-step solution.',
    newQ.difficulty || 'Medium',
  ];

  const res = await query(sql, values);
  return res.rows[0] || null;
}

/**
 * Approves draft questions and publishes them into the production Question Bank
 */
export async function approveDraftToQuestionBank(draftId, questionIds = null) {
  await ensureStagingTables();

  let qSql = `SELECT * FROM ai_draft_questions WHERE draft_id = $1 AND review_status != 'rejected'`;
  const qParams = [draftId];

  if (Array.isArray(questionIds) && questionIds.length > 0) {
    qSql += ` AND id = ANY($2::bigint[])`;
    qParams.push(questionIds);
  }

  const qRes = await query(qSql, qParams);
  const draftQuestions = qRes.rows;

  if (!draftQuestions.length) {
    return { count: 0, inserted: [] };
  }

  // Resolve draft metadata for category / stream
  const dRes = await query(`SELECT exam_type, subject, chapter FROM ai_generation_drafts WHERE id = $1`, [draftId]);
  const draftMeta = dRes.rows[0] || {};
  const examType = draftMeta.exam_type || 'NEET';

  const inserted = [];

  for (const q of draftQuestions) {
    const category = q.subject || draftMeta.subject || 'Physics';

    const insertSql = `
      INSERT INTO question_bank (
        category, question_type, question_text, options,
        correct_index, correct_indices, numeric_answer, numerical_tolerance,
        assertion_text, reason_text, match_pairs, passage_title, passage_text,
        solution, chapter, topic, difficulty, exam_type,
        status, is_ai_generated, ai_metadata
      ) VALUES (
        $1, $2, $3, $4,
        $5, $6, $7, $8,
        $9, $10, $11, $12, $13,
        $14, $15, $16, $17, $18,
        'available', true, $19
      ) RETURNING id;
    `;

    const values = [
      category,
      q.question_type,
      q.question_text,
      typeof q.options === 'string' ? q.options : JSON.stringify(q.options || []),
      q.correct_index,
      typeof q.correct_indices === 'string' ? q.correct_indices : JSON.stringify(q.correct_indices || []),
      q.numeric_answer,
      q.numerical_tolerance || 0,
      q.assertion_text,
      q.reason_text,
      typeof q.match_pairs === 'string' ? q.match_pairs : JSON.stringify(q.match_pairs || {}),
      q.passage_title,
      q.passage_text,
      q.solution,
      q.chapter || draftMeta.chapter || '',
      q.topic || '',
      q.difficulty || 'Medium',
      examType,
      JSON.stringify({ draft_id: draftId, draft_question_id: q.id, batch_id: q.batch_id }),
    ];

    const insRes = await query(insertSql, values);
    inserted.push(insRes.rows[0].id);

    // Mark question as approved
    await query(`UPDATE ai_draft_questions SET review_status = 'approved', updated_at = NOW() WHERE id = $1`, [q.id]);
  }

  // Check if all questions in draft are now approved
  const pendingCountRes = await query(
    `SELECT COUNT(*)::int AS pending FROM ai_draft_questions WHERE draft_id = $1 AND review_status = 'pending'`,
    [draftId]
  );
  if (pendingCountRes.rows[0]?.pending === 0) {
    await query(`UPDATE ai_generation_drafts SET status = 'approved', updated_at = NOW() WHERE id = $1`, [draftId]);
  }

  // Clear Redis question bank cache so newly approved questions appear immediately
  await delCache('cache:qb:*');
  await delCache('qb*');

  return { count: inserted.length, insertedIds: inserted };
}

/**
 * Deletes or rejects a draft
 */
export async function deleteDraft(draftId) {
  await ensureStagingTables();
  const res = await query(`DELETE FROM ai_generation_drafts WHERE id = $1 RETURNING id`, [draftId]);
  return res.rowCount > 0;
}
