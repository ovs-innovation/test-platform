import { Router } from 'express';
import { getPublicStats, listPublicTestSeries, getPublicTestSeries, listSubjects } from '../controllers/publicController.js';
import { getCmsPage, listPublicCms, validateCoupon } from '../controllers/platformController.js';

const router = Router();

router.get('/stats', getPublicStats);
router.get('/test-series', listPublicTestSeries);
router.get('/test-series/:slug', getPublicTestSeries);
router.get('/subjects', listSubjects);
router.get('/cms', listPublicCms);
router.get('/cms/:slug', getCmsPage);
router.post('/coupons/validate', validateCoupon);

export default router;
