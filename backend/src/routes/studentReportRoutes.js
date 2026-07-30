import { Router } from 'express';
import {
  getOverallReport,
  getSubjectWiseReport,
  getChapterWiseReport,
  getStrengthsWeaknessesReport,
  getTimeAnalysisReport,
  getAIInsightsReport,
} from '../controllers/studentReportController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);
router.use(authorize('candidate'));

router.get('/overall', getOverallReport);
router.get('/subject-wise', getSubjectWiseReport);
router.get('/chapter-wise', getChapterWiseReport);
router.get('/strengths-weaknesses', getStrengthsWeaknessesReport);
router.get('/time-analysis', getTimeAnalysisReport);
router.get('/insights', getAIInsightsReport);

export default router;
