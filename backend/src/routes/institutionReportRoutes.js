import { Router } from 'express';
import {
  getInstitutionOverallReport,
  getInstitutionRankingsReport,
  getBatchComparisonReport,
  getInstitutionTrendsReport,
  getImprovementAnalyticsReport,
} from '../controllers/institutionReportController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

router.use(authenticate);

router.get('/:id/reports/overall', getInstitutionOverallReport);
router.get('/:id/reports/rankings', getInstitutionRankingsReport);
router.get('/:id/reports/batch-comparison', getBatchComparisonReport);
router.get('/:id/reports/trends', getInstitutionTrendsReport);
router.get('/:id/reports/improvement', getImprovementAnalyticsReport);

export default router;
