import { Router } from 'express';
import {
  getInstitutionOverallReport,
  getInstitutionRankingsReport,
  getBatchComparisonReport,
  getInstitutionTrendsReport,
  getImprovementAnalyticsReport,
  getInstitutionsComparisonReport,
} from '../controllers/institutionReportController.js';
import { authenticate } from '../middleware/auth.js';

const router = Router();

// Multi-institution comparison (Page 5.5) - Platform Admin / Institution
router.get('/reports/compare', authenticate, getInstitutionsComparisonReport);

// Scoped Institution Reports
router.get('/:id/reports/overall', authenticate, getInstitutionOverallReport);
router.get('/:id/reports/overview', authenticate, getInstitutionOverallReport);
router.get('/:id/reports/rankings', authenticate, getInstitutionRankingsReport);
router.get('/:id/reports/batch-comparison', authenticate, getBatchComparisonReport);
router.get('/:id/reports/trends', authenticate, getInstitutionTrendsReport);
router.get('/:id/reports/improvement', authenticate, getImprovementAnalyticsReport);

export default router;
