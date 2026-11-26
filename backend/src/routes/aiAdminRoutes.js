/**
 * AI Admin Routes
 * Protected endpoints for AI question and test generation, draft staging, review, and approval.
 */

import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import {
  generateQuestions,
  getDraftsList,
  getDraftDetail,
  editDraftQuestion,
  regenerateQuestion,
  approveDraft,
  approveSingleDraftQuestion,
  approveSelectedDraftQuestions,
  rejectSingleDraftQuestion,
  regenerateQuestionDiagram,
  removeDraft,
  validateDraft,
  validateDraftQuestion,
  updateQuestionValidationStatus,
  generateDiagramAsset,
  regenerateDiagramAsset,
  reviewDiagramAsset,
  getDiagramAsset,
  listDiagramAssets,
  extractDiagramFromPdf,
} from '../controllers/aiQuestionAdminController.js';

const router = Router();

// Protect all AI Admin endpoints with JWT authentication and admin authorization
router.use(authenticate, authorize('admin'));

// AI Question Generation & Staging
router.post('/generate-questions', generateQuestions);
router.get('/drafts', getDraftsList);
router.get('/drafts/:id', getDraftDetail);
router.patch('/drafts/:draftId/questions/:questionId', editDraftQuestion);
router.post('/drafts/:draftId/regenerate/:questionId', regenerateQuestion);
router.post('/drafts/:draftId/approve', approveDraft);
router.post('/drafts/:draftId/questions/approve-selected', approveSelectedDraftQuestions);
router.post('/drafts/:draftId/questions/:questionId/approve', approveSingleDraftQuestion);
router.post('/drafts/:draftId/questions/:questionId/reject', rejectSingleDraftQuestion);
router.post('/drafts/:draftId/questions/:questionId/regenerate-diagram', regenerateQuestionDiagram);
router.delete('/drafts/:draftId', removeDraft);

// AI Question Validation Engine
router.post('/drafts/:draftId/validate', validateDraft);
router.post('/drafts/:draftId/questions/:questionId/validate', validateDraftQuestion);
router.patch('/drafts/:draftId/questions/:questionId/status', updateQuestionValidationStatus);

// AI Diagram Generation, Regeneration & Review
router.post('/diagrams/generate', generateDiagramAsset);
router.post('/diagrams/:assetId/regenerate', regenerateDiagramAsset);
router.patch('/diagrams/:assetId/review', reviewDiagramAsset);
router.get('/diagrams/:assetId', getDiagramAsset);
router.get('/diagrams', listDiagramAssets);
router.post('/diagrams/extract-pdf', extractDiagramFromPdf);

export default router;
