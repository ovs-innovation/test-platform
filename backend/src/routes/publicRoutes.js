import { Router } from 'express';
import { getPublicStats, listPublicTestSeries, getPublicTestSeries, listSubjects } from '../controllers/publicController.js';
import { getCmsPage, listPublicCms, validateCoupon, listPublicCoupons } from '../controllers/platformController.js';
import { createB2bEnquiry } from '../controllers/b2bController.js';

const router = Router();

router.get('/stats', getPublicStats);
router.get('/test-series', listPublicTestSeries);
router.get('/test-series/:slug', getPublicTestSeries);
router.get('/subjects', listSubjects);
router.get('/cms', listPublicCms);
router.get('/cms/:slug', getCmsPage);
router.get('/coupons/active', listPublicCoupons);
router.post('/coupons/validate', validateCoupon);
router.post('/b2b-enquiry', createB2bEnquiry);

export default router;

