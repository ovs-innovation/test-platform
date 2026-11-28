/**
 * Administrative Controller for AI Question Generation & Staging
 * Handles generation requests, draft management, single-question regeneration,
 * inline editing, and approval into the production Question Bank.
 */

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { AiQuestionGeneratorService } from '../services/ai/aiQuestionGeneratorService.js';
import { AiTestGenerationEngine } from '../services/ai/aiTestGenerationEngine.js';
import {
  listDrafts,
  getDraftById,
  updateDraftQuestion,
  approveDraftToQuestionBank,
  deleteDraft,
  validateDraftQuestionsInDb,
  updateDraftQuestionValidationStatus,
  rejectDraftQuestion,
  regenerateDraftQuestionDiagram,
} from '../services/ai/aiDraftService.js';
import { diagramAssetService } from '../services/ai/diagram/diagramAssetService.js';
import { extractDiagramFromImage } from '../services/ai/diagram/pdfDiagramExtractor.js';
import { pool } from '../config/db.js';
import {
  validateBlueprintPayload,
  validateGeneratedQuestionsAgainstBlueprint,
  buildAiBlueprintPromptContext,
} from '../services/blueprintValidatorService.js';

/**
 * POST /api/admin/ai/generate-questions
 * Initiates structured batch question generation.
 */
export const generateQuestions = asyncHandler(async (req, res) => {
  const {
    class_level = '12',
    exam_type = 'NEET',
    subject,
    chapter,
    chapters,
    topic,
    difficulty = 'Medium',
    count = 10,
    question_types,
    diagram_req = 'Optional',
    explanation_req = 'Detailed Step-by-Step',
    additional_instructions = '',
    reference_file_url = null,
    target_destination = 'draft',
    model,
  } = req.body;

  if (!subject) {
    throw ApiError.badRequest('Subject is required for question generation');
  }

  const primaryChapter = Array.isArray(chapters) && chapters.length ? chapters[0] : chapter;
  if (!primaryChapter) {
    throw ApiError.badRequest('At least one chapter must be specified');
  }

  const numCount = Math.max(1, Math.min(50, Number(count) || 10));

  const result = await AiQuestionGeneratorService.generateBatch(
    {
      class_level,
      exam_type: String(exam_type).toUpperCase(),
      subject,
      chapter: primaryChapter,
      chapters: Array.isArray(chapters) ? chapters : [primaryChapter],
      topic,
      difficulty,
      count: numCount,
      question_types: Array.isArray(question_types) && question_types.length ? question_types : ['Single MCQ'],
      diagram_req,
      explanation_req,
      additional_instructions,
      reference_file_url,
      target_destination,
      model,
    },
    req.user?.id
  );

  // If user requested direct publication to bank and generation succeeded
  let approvalResult = null;
  if (target_destination === 'bank' && result.total_generated > 0) {
    approvalResult = await approveDraftToQuestionBank(result.draft_id);
  }

  res.status(201).json({
    success: true,
    message: `Generated ${result.total_generated} questions across ${result.questions.length} successful items.`,
    draft_id: result.draft_id,
    batch_id: result.batch_id,
    total_requested: result.total_requested,
    total_generated: result.total_generated,
    status: result.status,
    errors: result.errors,
    questions: result.questions,
    approved_to_bank: Boolean(approvalResult),
    bank_inserted_count: approvalResult?.count || 0,
  });
});

/**
 * POST /api/admin/ai/generate-test
 * Generates an assessment paper strictly driven by an Exam Blueprint.
 * 1. Resolves and validates blueprint against strict rules.
 * 2. Retrieves available approved questions from question_bank.
 * 3. Detects deficit and generates missing questions in controlled batches (5-10 Qs).
 * 4. Validates all generated questions with AiQuestionValidationEngine.
 * 5. Assembles assessment across sections, marks, positions, and blueprints.
 * 6. Verifies total count, subject distribution, type distribution, difficulty.
 * 7. Returns full test preview staged in drafts, awaiting admin approval.
 */
export const generateTest = asyncHandler(async (req, res) => {
  const result = await AiTestGenerationEngine.assembleTestPaper(req.body, req.user?.id);

  let publicationResult = null;
  if (req.body.auto_publish) {
    publicationResult = await AiTestGenerationEngine.approveTestDraftToAssessment(
      result.draft_id,
      { is_published: true },
      req.user?.id
    );
  }

  res.status(201).json({
    ...result,
    auto_published: Boolean(publicationResult),
    published_assessment: publicationResult,
  });
});

/**
 * POST /api/admin/ai/drafts/:draftId/approve-test
 * Explicitly approves an assembled test draft into production Edvedum assessment creation services.
 */
export const approveTestDraft = asyncHandler(async (req, res) => {
  const { draftId } = req.params;
  const result = await AiTestGenerationEngine.approveTestDraftToAssessment(
    draftId,
    req.body || {},
    req.user?.id
  );
  res.json(result);
});

/**
 * GET /api/admin/ai/drafts/:draftId/preview-test
 * Retrieves the complete staged test paper preview for an assembled draft.
 */
export const getTestDraftPreview = asyncHandler(async (req, res) => {
  const { draftId } = req.params;
  const draftRes = await pool.query('SELECT * FROM ai_generation_drafts WHERE id = $1', [draftId]);
  if (draftRes.rows.length === 0) {
    throw ApiError.notFound(`Test draft #${draftId} not found.`);
  }
  const draft = draftRes.rows[0];

  const qRes = await pool.query(
    'SELECT * FROM ai_draft_questions WHERE draft_id = $1 ORDER BY question_number ASC, id ASC',
    [draftId]
  );

  let stagingMeta = {};
  try {
    stagingMeta = JSON.parse(draft.additional_instructions || '{}');
  } catch {
    stagingMeta = {};
  }

  res.json({
    success: true,
    draft_id: draft.id,
    batch_id: draft.batch_id,
    title: draft.title,
    exam_type: draft.exam_type,
    class_level: draft.class_level,
    status: draft.status,
    total_questions: qRes.rows.length,
    staging_meta: stagingMeta,
    verification: stagingMeta.verification || null,
    sections: stagingMeta.sections || [],
    source_summary: stagingMeta.source_summary || null,
    questions: qRes.rows.map((q) => ({
      id: q.id,
      position: q.question_number,
      subject: q.subject,
      chapter: q.chapter,
      topic: q.topic,
      question_text: q.question_text,
      question_type: q.question_type,
      options: typeof q.options === 'string' ? JSON.parse(q.options) : q.options,
      correct_index: q.correct_index,
      numeric_answer: q.numeric_answer,
      marks: q.marks,
      negative_marks: q.negative_marks,
      solution: q.solution,
      source: q.source || (q.bank_question_id ? 'bank' : 'ai_generated'),
      image_url: q.image_url,
      diagram_svg: q.diagram_svg,
      validation_status: q.validation_status,
      review_status: q.review_status,
    })),
  });
});

/**
 * GET /api/admin/ai/drafts
 * Lists staged question generation drafts.
 */
export const getDraftsList = asyncHandler(async (req, res) => {
  const { page = 1, limit = 20, status, exam_type, subject } = req.query;
  const result = await listDrafts({
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    status,
    exam_type,
    subject,
  });
  res.json({ success: true, ...result });
});

/**
 * GET /api/admin/ai/drafts/:id
 * Fetches a single draft with full question details.
 */
export const getDraftDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const draft = await getDraftById(id);
  if (!draft) {
    throw ApiError.notFound(`Draft #${id} not found`);
  }
  res.json({ success: true, draft });
});

/**
 * PATCH /api/admin/ai/drafts/:draftId/questions/:questionId
 * Allows inline editing of a draft question before publication.
 */
export const editDraftQuestion = asyncHandler(async (req, res) => {
  const { draftId, questionId } = req.params;
  const updated = await updateDraftQuestion(draftId, questionId, req.body, req.user?.id);
  if (!updated) {
    throw ApiError.notFound(`Question #${questionId} in draft #${draftId} not found or no valid fields provided`);
  }
  res.json({ success: true, question: updated });
});

/**
 * POST /api/admin/ai/drafts/:draftId/regenerate/:questionId
 * Regenerates a single question within an existing draft.
 */
export const regenerateQuestion = asyncHandler(async (req, res) => {
  const { draftId, questionId } = req.params;
  const { critique = '' } = req.body;

  const result = await AiQuestionGeneratorService.regenerateSingleQuestion(draftId, questionId, critique);
  res.json({
    success: true,
    message: `Question #${questionId} successfully regenerated.`,
    question: result.question,
  });
});

/**
 * POST /api/admin/ai/drafts/:draftId/approve
 * Approves draft questions into the production Question Bank or creates an Assessment.
 */
export const approveDraft = asyncHandler(async (req, res) => {
  const { draftId } = req.params;
  const { question_ids = null, target = 'bank', is_published = false, target_series_id = null } = req.body;

  if (target === 'assessment') {
    const result = await AiTestGenerationEngine.approveTestDraftToAssessment(
      draftId,
      { is_published, target_series_id },
      req.user?.id
    );
    return res.json(result);
  }

  const result = await approveDraftToQuestionBank(draftId, question_ids, req.user?.id);
  res.json({
    success: true,
    message: `Successfully approved ${result.count} questions into the Question Bank.`,
    approved_count: result.count,
    inserted_ids: result.insertedIds,
    already_approved_count: result.alreadyApprovedCount || 0,
  });
});

/**
 * POST /api/admin/ai/drafts/:draftId/questions/:questionId/approve
 * Approves a single draft question into the production Question Bank.
 */
export const approveSingleDraftQuestion = asyncHandler(async (req, res) => {
  const { draftId, questionId } = req.params;
  const result = await approveDraftToQuestionBank(draftId, [questionId], req.user?.id);

  if (result.count === 0 && result.alreadyApprovedCount > 0) {
    return res.json({
      success: true,
      message: 'Question has already been approved.',
      approved_count: 0,
      already_approved: true,
      inserted_ids: result.insertedIds,
    });
  }

  if (result.count === 0) {
    throw ApiError.badRequest(`Could not approve question #${questionId}. It may be rejected or missing.`);
  }

  res.json({
    success: true,
    message: `Question #${questionId} approved into Question Bank.`,
    approved_count: result.count,
    bank_question_id: result.insertedIds[0],
  });
});

/**
 * POST /api/admin/ai/drafts/:draftId/questions/approve-selected
 * Approves multiple selected draft questions into the Question Bank.
 */
export const approveSelectedDraftQuestions = asyncHandler(async (req, res) => {
  const { draftId } = req.params;
  const { question_ids = [] } = req.body;

  if (!Array.isArray(question_ids) || question_ids.length === 0) {
    throw ApiError.badRequest('Field "question_ids" array is required');
  }

  const result = await approveDraftToQuestionBank(draftId, question_ids, req.user?.id);
  res.json({
    success: true,
    message: `Successfully approved ${result.count} selected questions into the Question Bank.`,
    approved_count: result.count,
    inserted_ids: result.insertedIds,
    already_approved_count: result.alreadyApprovedCount || 0,
  });
});

/**
 * POST /api/admin/ai/drafts/:draftId/questions/:questionId/reject
 * Rejects an individual draft question with audit reason.
 */
export const rejectSingleDraftQuestion = asyncHandler(async (req, res) => {
  const { draftId, questionId } = req.params;
  const { reason = '' } = req.body;

  const rejected = await rejectDraftQuestion(draftId, questionId, reason, req.user?.id);
  if (!rejected) {
    throw ApiError.notFound(`Question #${questionId} in draft #${draftId} not found`);
  }

  res.json({
    success: true,
    message: `Question #${questionId} marked as rejected.`,
    question: rejected,
  });
});

/**
 * POST /api/admin/ai/drafts/:draftId/questions/:questionId/regenerate-diagram
 * Regenerates the diagram for a specific question within a draft.
 */
export const regenerateQuestionDiagram = asyncHandler(async (req, res) => {
  const { draftId, questionId } = req.params;
  const { prompt, markers, method } = req.body;

  const result = await regenerateDraftQuestionDiagram(
    draftId,
    questionId,
    { prompt, markers, method },
    req.user?.id
  );

  res.json({
    success: true,
    message: `Diagram for question #${questionId} successfully regenerated.`,
    question: result.question,
    diagram_asset: result.diagramAsset,
  });
});

/**
 * DELETE /api/admin/ai/drafts/:draftId
 * Rejects and deletes a draft batch.
 */
export const removeDraft = asyncHandler(async (req, res) => {
  const { draftId } = req.params;
  const deleted = await deleteDraft(draftId);
  if (!deleted) {
    throw ApiError.notFound(`Draft #${draftId} not found`);
  }
  res.json({ success: true, message: `Draft #${draftId} successfully deleted.` });
});

/**
 * POST /api/admin/ai/drafts/:draftId/validate
 * Triggers full validation on all questions in a draft batch.
 */
export const validateDraft = asyncHandler(async (req, res) => {
  const { draftId } = req.params;
  const result = await validateDraftQuestionsInDb(draftId);
  if (!result) {
    throw ApiError.notFound(`Draft #${draftId} not found`);
  }
  res.json({
    success: true,
    message: `Validation complete for draft #${draftId}. Passed: ${result.passedCount}, Needs Correction: ${result.needsCorrectionCount}, Rejected: ${result.rejectedCount}.`,
    ...result,
  });
});

/**
 * POST /api/admin/ai/drafts/:draftId/questions/:questionId/validate
 * Triggers full validation on a single question in a draft.
 */
export const validateDraftQuestion = asyncHandler(async (req, res) => {
  const { draftId, questionId } = req.params;
  const result = await validateDraftQuestionsInDb(draftId, questionId);
  if (!result || !result.results?.length) {
    throw ApiError.notFound(`Question #${questionId} in draft #${draftId} not found`);
  }
  res.json({
    success: true,
    message: `Validation complete for question #${questionId}.`,
    validation: result.results[0],
  });
});

/**
 * PATCH /api/admin/ai/drafts/:draftId/questions/:questionId/status
 * Manually updates validation and review status (e.g. approve, reject, flag for correction).
 */
export const updateQuestionValidationStatus = asyncHandler(async (req, res) => {
  const { draftId, questionId } = req.params;
  const { status, admin_notes } = req.body;
  if (!status) {
    throw ApiError.badRequest('Field "status" is required');
  }

  const updated = await updateDraftQuestionValidationStatus(draftId, questionId, status, admin_notes);
  if (!updated) {
    throw ApiError.notFound(`Question #${questionId} in draft #${draftId} not found`);
  }

  res.json({
    success: true,
    message: `Status of question #${questionId} updated to "${status}".`,
    question: updated,
  });
});

/**
 * POST /api/admin/ai/diagrams/generate
 * Generates an SVG or illustration diagram asset for a question or draft.
 */
export const generateDiagramAsset = asyncHandler(async (req, res) => {
  const {
    subject,
    chapter,
    topic,
    diagramCategory,
    customPrompt,
    markers,
    draftId,
    draftQuestionId,
    isSolutionDiagram,
    method,
  } = req.body;

  if (!subject) {
    throw ApiError.badRequest('Subject is required for diagram generation');
  }

  const asset = await diagramAssetService.generateDiagram({
    subject,
    chapter,
    topic,
    diagramCategory,
    customPrompt,
    markers,
    draftId,
    draftQuestionId,
    isSolutionDiagram,
    method,
  });

  res.status(201).json({
    success: true,
    message: 'Diagram asset generated successfully',
    asset,
  });
});

/**
 * POST /api/admin/ai/diagrams/:assetId/regenerate
 * Regenerates an existing diagram asset with prompt refinements.
 */
export const regenerateDiagramAsset = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  const { newPrompt, markers, method } = req.body;

  const asset = await diagramAssetService.regenerateDiagram(assetId, {
    newPrompt,
    markers,
    method,
  });

  res.json({
    success: true,
    message: 'Diagram asset regenerated successfully',
    asset,
  });
});

/**
 * PATCH /api/admin/ai/diagrams/:assetId/review
 * Approves, rejects, or flags a diagram for manual review.
 */
export const reviewDiagramAsset = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  const { status, adminNotes } = req.body;

  const asset = await diagramAssetService.reviewDiagram(assetId, {
    status,
    adminNotes,
  });

  res.json({
    success: true,
    message: `Diagram asset status updated to "${status}".`,
    asset,
  });
});

/**
 * GET /api/admin/ai/diagrams/:assetId
 * Retrieves full diagram asset details and validation report.
 */
export const getDiagramAsset = asyncHandler(async (req, res) => {
  const { assetId } = req.params;
  const asset = await diagramAssetService.getDiagramById(assetId);
  if (!asset) {
    throw ApiError.notFound(`Diagram asset "${assetId}" not found`);
  }
  res.json({ success: true, asset });
});

/**
 * GET /api/admin/ai/diagrams
 * Lists diagram assets with optional filtering.
 */
export const listDiagramAssets = asyncHandler(async (req, res) => {
  const { draftId, draftQuestionId, reviewStatus, limit } = req.query;
  const assets = await diagramAssetService.listDiagrams({
    draftId,
    draftQuestionId,
    reviewStatus,
    limit,
  });
  res.json({ success: true, assets });
});

/**
 * POST /api/admin/ai/diagrams/extract-pdf
 * Extracts and crops a diagram from an uploaded PDF page or image.
 */
export const extractDiagramFromPdf = asyncHandler(async (req, res) => {
  const { sourceImagePath, rect, outputFileName, format } = req.body;

  if (!sourceImagePath) {
    throw ApiError.badRequest('sourceImagePath is required');
  }

  const result = await extractDiagramFromImage({
    sourceImagePath,
    rect,
    outputFileName,
    format,
  });

  res.status(201).json({
    success: true,
    message: 'Diagram extracted successfully from source',
    result,
  });
});
