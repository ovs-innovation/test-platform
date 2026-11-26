/**
 * AI Draft & Staging Storage Service
 * Manages drafts, question review states, edits, single-question regeneration,
 * and approval into the production Question Bank.
 */

import { query } from '../../config/db.js';
import { delCache } from '../../config/redis.js';
import {
  AiQuestionValidationEngine,
  QUESTION_STATUSES,
} from './validation/index.js';
import { diagramAssetService } from './diagram/diagramAssetService.js';

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
      validation_passed_count INT DEFAULT 0,
      needs_correction_count INT DEFAULT 0,
      rejected_count INT DEFAULT 0,
      manual_review_count INT DEFAULT 0,
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
      validation_status VARCHAR(50) DEFAULT 'validation_pending',
      validation_score INT DEFAULT 0,
      validation_report JSONB DEFAULT '{}'::jsonb,
      requires_manual_review BOOLEAN DEFAULT false,
      manual_review_reasons JSONB DEFAULT '[]'::jsonb,
      is_duplicate BOOLEAN DEFAULT false,
      duplicate_of_id BIGINT,
      similarity_score NUMERIC(5,2) DEFAULT 0,
      normalized_signature VARCHAR(255),
      admin_notes TEXT,
      validation_errors JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS validation_status VARCHAR(50) DEFAULT 'validation_pending';
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS validation_score INT DEFAULT 0;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS validation_report JSONB DEFAULT '{}'::jsonb;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS requires_manual_review BOOLEAN DEFAULT false;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS manual_review_reasons JSONB DEFAULT '[]'::jsonb;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS is_duplicate BOOLEAN DEFAULT false;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS duplicate_of_id BIGINT;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS similarity_score NUMERIC(5,2) DEFAULT 0;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS normalized_signature VARCHAR(255);
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS bank_question_id BIGINT;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS approved_by INT;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS modified_by INT;
    ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

    ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS validation_passed_count INT DEFAULT 0;
    ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS needs_correction_count INT DEFAULT 0;
    ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS rejected_count INT DEFAULT 0;
    ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS manual_review_count INT DEFAULT 0;
    ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS approved_by INT;
    ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;

    CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_draft_id ON ai_draft_questions(draft_id);
    CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_batch ON ai_draft_questions(batch_id);
    CREATE INDEX IF NOT EXISTS idx_ai_generation_drafts_status ON ai_generation_drafts(status);
    CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_validation_status ON ai_draft_questions(validation_status);
    CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_bank_qid ON ai_draft_questions(bank_question_id);
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

  // 1. Fetch draft metadata for validation context
  const dRes = await query('SELECT exam_type, subject, chapter FROM ai_generation_drafts WHERE id = $1', [draftId]);
  const draftMeta = dRes.rows[0] || {};

  // 2. Run All 12 Validation Modules via AiQuestionValidationEngine
  const validationSummary = await AiQuestionValidationEngine.validateBatch(questions, {
    draftId,
    subject: draftMeta.subject,
    chapter: draftMeta.chapter,
    examType: draftMeta.exam_type,
  });

  const savedQuestions = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const valRes = validationSummary.results[i] || {
      status: QUESTION_STATUSES.VALIDATION_PENDING,
      score: 50,
      requiresManualReview: false,
      manualReviewReasons: [],
      errors: [],
      warnings: [],
      isDuplicate: false,
      similarityScore: 0,
      normalizedSignature: '',
    };

    const hasDiagram = Boolean(q.diagram_metadata?.has_diagram || q.content_type === 'diagram' || q.content_type === 'graph');
    const diagramType = q.diagram_metadata?.diagram_type || (hasDiagram ? 'geometry' : 'none');
    const diagramDesc = q.diagram_metadata?.diagram_description || '';

    const reviewStatus = valRes.status === QUESTION_STATUSES.VALIDATION_PASSED
      ? 'validated'
      : (valRes.status === QUESTION_STATUSES.REJECTED ? 'rejected' : 'pending');

    const sql = `
      INSERT INTO ai_draft_questions (
        draft_id, batch_id, question_number, question_type, subject,
        chapter, topic, difficulty, question_text, options,
        correct_index, correct_indices, numeric_answer, numerical_tolerance,
        assertion_text, reason_text, match_pairs, passage_title, passage_text,
        solution, marks, negative_marks, content_type, has_diagram,
        diagram_type, diagram_description, diagram_svg, review_status,
        validation_status, validation_score, validation_report,
        requires_manual_review, manual_review_reasons, is_duplicate,
        duplicate_of_id, similarity_score, normalized_signature, validation_errors
      ) VALUES (
        $1, $2, $3, $4, $5,
        $6, $7, $8, $9, $10,
        $11, $12, $13, $14,
        $15, $16, $17, $18, $19,
        $20, $21, $22, $23, $24,
        $25, $26, $27, $28,
        $29, $30, $31,
        $32, $33, $34,
        $35, $36, $37, $38
      ) RETURNING *;
    `;

    const values = [
      draftId,
      batchId,
      q.question_number || i + 1,
      q.question_type || 'single_choice',
      q.subject || draftMeta.subject || 'Physics',
      q.chapter || draftMeta.chapter || 'General',
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
      reviewStatus,
      valRes.status,
      valRes.score,
      JSON.stringify(valRes),
      valRes.requiresManualReview,
      JSON.stringify(valRes.manualReviewReasons || []),
      Boolean(valRes.isDuplicate),
      valRes.duplicateOfId || null,
      valRes.similarityScore || 0,
      valRes.normalizedSignature || '',
      JSON.stringify(valRes.errors || []),
    ];

    const res = await query(sql, values);
    savedQuestions.push(res.rows[0]);
  }

  // Update total_generated count and validation summary counters on draft
  await query(
    `UPDATE ai_generation_drafts
     SET
       total_generated = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1),
       validation_passed_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'validation_passed'),
       needs_correction_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'needs_correction'),
       rejected_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'rejected'),
       manual_review_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND requires_manual_review = true),
       updated_at = NOW()
     WHERE id = $1`,
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
export async function updateDraftQuestion(draftId, questionId, patchData = {}, userId = null) {
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
    'passage_title',
    'passage_text',
    'solution',
    'difficulty',
    'subject',
    'chapter',
    'topic',
    'review_status',
    'validation_status',
    'admin_notes',
    'rejection_reason',
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

  if (userId) {
    updates.push(`modified_by = $${pIdx++}`);
    params.push(userId);
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
  const updatedRow = res.rows[0];
  if (!updatedRow) return null;

  // Re-run validation on the updated row to immediately reflect status changes
  try {
    const dRes = await query('SELECT exam_type, subject, chapter FROM ai_generation_drafts WHERE id = $1', [draftId]);
    const draftMeta = dRes.rows[0] || {};
    const valRes = await AiQuestionValidationEngine.validateQuestion(updatedRow, {
      subject: draftMeta.subject,
      chapter: draftMeta.chapter,
      examType: draftMeta.exam_type,
    });

    const finalValStatus = patchData.validation_status || valRes.status;
    const finalReviewStatus = patchData.review_status || (finalValStatus === QUESTION_STATUSES.VALIDATION_PASSED ? 'validated' : (finalValStatus === QUESTION_STATUSES.REJECTED ? 'rejected' : 'pending'));

    const revalRes = await query(`
      UPDATE ai_draft_questions
      SET
        validation_status = $3,
        validation_score = $4,
        validation_report = $5,
        requires_manual_review = $6,
        manual_review_reasons = $7,
        validation_errors = $8,
        review_status = $9,
        updated_at = NOW()
      WHERE draft_id = $1 AND id = $2
      RETURNING *;
    `, [
      draftId,
      questionId,
      finalValStatus,
      valRes.score,
      JSON.stringify(valRes),
      valRes.requiresManualReview,
      JSON.stringify(valRes.manualReviewReasons || []),
      JSON.stringify(valRes.errors || []),
      finalReviewStatus,
    ]);

    // Update draft summary counters
    await query(`
      UPDATE ai_generation_drafts
      SET
        validation_passed_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'validation_passed'),
        needs_correction_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'needs_correction'),
        rejected_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'rejected'),
        manual_review_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND requires_manual_review = true),
        updated_at = NOW()
      WHERE id = $1
    `, [draftId]);

    return revalRes.rows[0];
  } catch (revalErr) {
    console.warn('[AiDraftService] Re-validation notice:', revalErr.message);
    return updatedRow;
  }
}

/**
 * Replaces a single draft question after AI regeneration
 */
export async function replaceDraftQuestion(draftId, questionId, newQ = {}) {
  await ensureStagingTables();

  // Validate the new regenerated question
  const dRes = await query('SELECT exam_type, subject, chapter FROM ai_generation_drafts WHERE id = $1', [draftId]);
  const draftMeta = dRes.rows[0] || {};
  const valRes = await AiQuestionValidationEngine.validateQuestion(newQ, {
    subject: draftMeta.subject,
    chapter: draftMeta.chapter,
    examType: draftMeta.exam_type,
  });

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
      validation_status = $15,
      validation_score = $16,
      validation_report = $17,
      requires_manual_review = $18,
      manual_review_reasons = $19,
      validation_errors = $20,
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
    valRes.status,
    valRes.score,
    JSON.stringify(valRes),
    valRes.requiresManualReview,
    JSON.stringify(valRes.manualReviewReasons || []),
    JSON.stringify(valRes.errors || []),
  ];

  const res = await query(sql, values);

  // Update summary counts
  await query(`
    UPDATE ai_generation_drafts
    SET
      validation_passed_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'validation_passed'),
      needs_correction_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'needs_correction'),
      rejected_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'rejected'),
      manual_review_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND requires_manual_review = true),
      updated_at = NOW()
    WHERE id = $1
  `, [draftId]);

  return res.rows[0] || null;
}

/**
 * Re-runs full validation on draft questions currently in database
 */
export async function validateDraftQuestionsInDb(draftId, questionId = null) {
  await ensureStagingTables();
  const draftRes = await query('SELECT * FROM ai_generation_drafts WHERE id = $1', [draftId]);
  if (!draftRes.rows.length) return null;
  const draftMeta = draftRes.rows[0];

  let qSql = 'SELECT * FROM ai_draft_questions WHERE draft_id = $1';
  const qParams = [draftId];
  if (questionId) {
    qSql += ' AND id = $2';
    qParams.push(questionId);
  }
  qSql += ' ORDER BY question_number ASC, id ASC';

  const qRes = await query(qSql, qParams);
  const questions = qRes.rows;
  if (!questions.length) return { total: 0, results: [] };

  const batchVal = await AiQuestionValidationEngine.validateBatch(questions, {
    draftId,
    subject: draftMeta.subject,
    chapter: draftMeta.chapter,
    examType: draftMeta.exam_type,
  });

  for (let i = 0; i < questions.length; i++) {
    const qRow = questions[i];
    const valRes = batchVal.results[i];

    await query(`
      UPDATE ai_draft_questions
      SET
        validation_status = $2,
        validation_score = $3,
        validation_report = $4,
        requires_manual_review = $5,
        manual_review_reasons = $6,
        is_duplicate = $7,
        duplicate_of_id = $8,
        similarity_score = $9,
        validation_errors = $10,
        updated_at = NOW()
      WHERE id = $1
    `, [
      qRow.id,
      valRes.status,
      valRes.score,
      JSON.stringify(valRes),
      valRes.requiresManualReview,
      JSON.stringify(valRes.manualReviewReasons || []),
      valRes.isDuplicate,
      valRes.duplicateOfId || null,
      valRes.similarityScore || 0,
      JSON.stringify(valRes.errors || []),
    ]);
  }

  // Update summary counts on draft
  await query(`
    UPDATE ai_generation_drafts
    SET
      validation_passed_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'validation_passed'),
      needs_correction_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'needs_correction'),
      rejected_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'rejected'),
      manual_review_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND requires_manual_review = true),
      updated_at = NOW()
    WHERE id = $1
  `, [draftId]);

  return batchVal;
}

/**
 * Updates validation status explicitly (admin action)
 */
export async function updateDraftQuestionValidationStatus(draftId, questionId, status, adminNotes = null) {
  await ensureStagingTables();
  const validStatuses = Object.values(QUESTION_STATUSES);
  if (!validStatuses.includes(status)) {
    throw new Error(`Invalid status "${status}". Allowed: ${validStatuses.join(', ')}`);
  }

  const updates = ['validation_status = $3', 'review_status = $3', 'updated_at = NOW()'];
  const params = [draftId, questionId, status];

  if (adminNotes !== null && adminNotes !== undefined) {
    updates.push('admin_notes = $4');
    params.push(adminNotes);
  }

  const sql = `
    UPDATE ai_draft_questions
    SET ${updates.join(', ')}
    WHERE draft_id = $1 AND id = $2
    RETURNING *;
  `;

  const res = await query(sql, params);

  // Update summary counts
  await query(`
    UPDATE ai_generation_drafts
    SET
      validation_passed_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'validation_passed'),
      needs_correction_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'needs_correction'),
      rejected_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'rejected'),
      manual_review_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND requires_manual_review = true),
      updated_at = NOW()
    WHERE id = $1
  `, [draftId]);

  return res.rows[0] || null;
}

/**
 * Approves draft questions and publishes them into the production Question Bank
 * Includes duplicate approval protection, audit tracking (approved_by, approved_at),
 * and relational subject_id & chapter_id resolution.
 */
export async function approveDraftToQuestionBank(draftId, questionIds = null, userId = null) {
  await ensureStagingTables();

  let qSql = `SELECT * FROM ai_draft_questions WHERE draft_id = $1 AND review_status != 'rejected' AND bank_question_id IS NULL AND review_status != 'approved'`;
  const qParams = [draftId];

  if (Array.isArray(questionIds) && questionIds.length > 0) {
    qSql += ` AND id = ANY($2::bigint[])`;
    qParams.push(questionIds);
  }

  qSql += ` ORDER BY question_number ASC, id ASC`;

  const qRes = await query(qSql, qParams);
  const draftQuestions = qRes.rows;

  if (!draftQuestions.length) {
    // Check if questions were already approved
    if (Array.isArray(questionIds) && questionIds.length > 0) {
      const alreadyApprovedRes = await query(
        `SELECT id, bank_question_id FROM ai_draft_questions WHERE draft_id = $1 AND id = ANY($2::bigint[]) AND (bank_question_id IS NOT NULL OR review_status = 'approved')`,
        [draftId, questionIds]
      );
      if (alreadyApprovedRes.rows.length > 0) {
        return {
          count: 0,
          alreadyApprovedCount: alreadyApprovedRes.rows.length,
          insertedIds: alreadyApprovedRes.rows.map((r) => r.bank_question_id).filter(Boolean),
          message: 'Selected questions have already been approved into the Question Bank.',
        };
      }
    }
    return { count: 0, insertedIds: [], message: 'No pending questions to approve.' };
  }

  // Resolve draft metadata for category / stream
  const dRes = await query(`SELECT exam_type, subject, chapter FROM ai_generation_drafts WHERE id = $1`, [draftId]);
  const draftMeta = dRes.rows[0] || {};
  const examType = draftMeta.exam_type || 'NEET';

  const inserted = [];

  for (const q of draftQuestions) {
    const category = q.subject || draftMeta.subject || 'Physics';
    const chapterName = q.chapter || draftMeta.chapter || '';

    // Match subject_id and chapter_id for relational integrity
    let subjectId = null;
    let chapterId = null;
    try {
      const subjRes = await query(
        `SELECT id FROM subjects WHERE LOWER(name) = LOWER($1) AND (exam_type IS NULL OR exam_type = $2) LIMIT 1`,
        [category, examType]
      );
      if (subjRes.rows.length) {
        subjectId = subjRes.rows[0].id;
        const chapRes = await query(
          `SELECT id FROM chapters WHERE subject_id = $1 AND (LOWER(name) = LOWER($2) OR name ILIKE $3) LIMIT 1`,
          [subjectId, chapterName, `%${chapterName}%`]
        );
        if (chapRes.rows.length) {
          chapterId = chapRes.rows[0].id;
        }
      }
    } catch (lookupErr) {
      console.warn('[AiDraftService] Subject/Chapter lookup note:', lookupErr.message);
    }

    const insertSql = `
      INSERT INTO question_bank (
        category, subject, subject_id, chapter, chapter_id, topic,
        question_type, question_text, options,
        correct_index, correct_indices, numeric_answer, numerical_tolerance,
        assertion_text, reason_text, match_pairs, passage_title, passage_text,
        solution, image_url, difficulty, marks, exam_type,
        status, is_ai_generated, ai_metadata
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9,
        $10, $11, $12, $13,
        $14, $15, $16, $17, $18,
        $19, $20, $21, $22, $23,
        'available', true, $24
      ) RETURNING id;
    `;

    const aiMetadata = {
      draft_id: draftId,
      draft_question_id: q.id,
      batch_id: q.batch_id,
      approved_by: userId,
      approved_at: new Date().toISOString(),
      validation_score: q.validation_score,
      diagram_type: q.diagram_type,
    };

    const values = [
      category,
      category,
      subjectId,
      chapterName,
      chapterId,
      q.topic || '',
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
      q.image_url || null,
      q.difficulty || 'Medium',
      q.marks || 4,
      examType,
      JSON.stringify(aiMetadata),
    ];

    const insRes = await query(insertSql, values);
    const newBankId = insRes.rows[0].id;
    inserted.push(newBankId);

    // Mark question as approved in ai_draft_questions and track audit metadata
    await query(
      `UPDATE ai_draft_questions 
       SET 
         bank_question_id = $1,
         review_status = 'approved', 
         validation_status = 'approved',
         approved_by = $2,
         approved_at = NOW(),
         updated_at = NOW() 
       WHERE id = $3`,
      [newBankId, userId, q.id]
    );

    // Update diagram asset linkage if present
    try {
      await query(
        `UPDATE ai_diagram_assets 
         SET bank_question_id = $1, review_status = 'approved', updated_at = NOW() 
         WHERE draft_question_id = $2`,
        [newBankId, q.id]
      );
    } catch (_) {}
  }

  // Check if all questions in draft are now approved or rejected
  const pendingCountRes = await query(
    `SELECT COUNT(*)::int AS pending FROM ai_draft_questions WHERE draft_id = $1 AND validation_status NOT IN ('approved', 'rejected')`,
    [draftId]
  );
  if (pendingCountRes.rows[0]?.pending === 0) {
    await query(
      `UPDATE ai_generation_drafts 
       SET status = 'approved', approved_by = $1, approved_at = NOW(), updated_at = NOW() 
       WHERE id = $2`,
      [userId, draftId]
    );
  }

  // Clear Redis question bank cache so newly approved questions appear immediately
  await delCache('cache:qb:*');
  await delCache('qb*');

  return { count: inserted.length, insertedIds: inserted };
}

/**
 * Rejects a single draft question with reason and audit tracking
 */
export async function rejectDraftQuestion(draftId, questionId, reason = '', userId = null) {
  await ensureStagingTables();

  const res = await query(
    `UPDATE ai_draft_questions
     SET 
       review_status = 'rejected',
       validation_status = 'rejected',
       rejection_reason = $1,
       modified_by = $2,
       updated_at = NOW()
     WHERE draft_id = $3 AND id = $4
     RETURNING *`,
    [reason, userId, draftId, questionId]
  );

  if (!res.rows.length) return null;

  // Update summary counts
  await query(`
    UPDATE ai_generation_drafts
    SET
      validation_passed_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'validation_passed'),
      needs_correction_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'needs_correction'),
      rejected_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND validation_status = 'rejected'),
      manual_review_count = (SELECT COUNT(*)::int FROM ai_draft_questions WHERE draft_id = $1 AND requires_manual_review = true),
      updated_at = NOW()
    WHERE id = $1
  `, [draftId]);

  return res.rows[0];
}

/**
 * Regenerates the diagram for an individual draft question
 */
export async function regenerateDraftQuestionDiagram(
  draftId,
  questionId,
  { prompt = '', markers = null, method = 'programmatic' } = {},
  userId = null
) {
  await ensureStagingTables();

  const qRes = await query('SELECT * FROM ai_draft_questions WHERE draft_id = $1 AND id = $2', [draftId, questionId]);
  if (!qRes.rows.length) {
    throw new Error(`Question #${questionId} in draft #${draftId} not found`);
  }
  const q = qRes.rows[0];

  const dRes = await query('SELECT * FROM ai_generation_drafts WHERE id = $1', [draftId]);
  const draftMeta = dRes.rows[0] || {};

  const diagramAsset = await diagramAssetService.generateDiagram({
    subject: q.subject || draftMeta.subject || 'Physics',
    chapter: q.chapter || draftMeta.chapter || '',
    topic: q.topic || 'Diagram Topic',
    customPrompt: prompt || q.diagram_description || q.question_text,
    markers: markers || ['A', 'B', 'C', 'D'],
    draftId,
    draftQuestionId: questionId,
    method,
  });

  // Re-run validation on question with the newly generated diagram
  const updatedQ = await query('SELECT * FROM ai_draft_questions WHERE id = $1', [questionId]);
  const revalRes = await AiQuestionValidationEngine.validateQuestion(updatedQ.rows[0], {
    subject: q.subject || draftMeta.subject,
    chapter: q.chapter || draftMeta.chapter,
    examType: draftMeta.exam_type,
  });

  await query(`
    UPDATE ai_draft_questions
    SET
      validation_status = $2,
      validation_score = $3,
      validation_report = $4,
      modified_by = $5,
      updated_at = NOW()
    WHERE id = $1
  `, [questionId, revalRes.status, revalRes.score, JSON.stringify(revalRes), userId]);

  const finalQ = await query('SELECT * FROM ai_draft_questions WHERE id = $1', [questionId]);
  return {
    question: finalQ.rows[0],
    diagramAsset,
  };
}

/**
 * Deletes or rejects a draft
 */
export async function deleteDraft(draftId) {
  await ensureStagingTables();
  const res = await query(`DELETE FROM ai_generation_drafts WHERE id = $1 RETURNING id`, [draftId]);
  return res.rowCount > 0;
}
