/**
 * Administrative Controller for AI Question Generation & Staging
 * Handles generation requests, draft management, single-question regeneration,
 * inline editing, and approval into the production Question Bank.
 */

import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { AiQuestionGeneratorService } from '../services/ai/aiQuestionGeneratorService.js';
import {
  listDrafts,
  getDraftById,
  updateDraftQuestion,
  approveDraftToQuestionBank,
  deleteDraft,
} from '../services/ai/aiDraftService.js';
import { diagramAssetService } from '../services/ai/diagram/diagramAssetService.js';
import { extractDiagramFromImage } from '../services/ai/diagram/pdfDiagramExtractor.js';

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
  const updated = await updateDraftQuestion(draftId, questionId, req.body);
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
 * Approves draft questions into the production Question Bank.
 */
export const approveDraft = asyncHandler(async (req, res) => {
  const { draftId } = req.params;
  const { question_ids = null, target = 'bank' } = req.body;

  const result = await approveDraftToQuestionBank(draftId, question_ids);
  res.json({
    success: true,
    message: `Successfully approved ${result.count} questions into the ${target === 'bank' ? 'Question Bank' : 'Assessment'}.`,
    approved_count: result.count,
    inserted_ids: result.insertedIds,
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
