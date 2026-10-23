import { Router } from 'express';
import { getPublicStats, listPublicTestSeries, getPublicTestSeries, listSubjects, downloadPublicBrochure } from '../controllers/publicController.js';
import { getCmsPage, listPublicCms, validateCoupon, listPublicCoupons, getPublicLandingContent } from '../controllers/platformController.js';
import { createB2bEnquiry } from '../controllers/b2bController.js';
import { noCache } from '../middleware/httpCache.js';
import {
  getPublicAdmissionFormConfig,
  submitPublicAdmission,
  getPublicAdmissionByAppNo
} from '../controllers/admissionController.js';
import { submitPublicStudentEnquiry } from '../controllers/studentEnquiryController.js';
import { optionalAuthenticate } from '../middleware/auth.js';

const router = Router();

router.get('/landing-content', noCache, getPublicLandingContent);
router.get('/stats', getPublicStats);
router.get('/test-series', listPublicTestSeries);
router.get('/test-series/:slug/brochure', downloadPublicBrochure);
router.get('/test-series/:slug', getPublicTestSeries);
router.get('/subjects', listSubjects);
router.get('/cms', listPublicCms);
router.get('/cms/:slug', getCmsPage);
router.get('/coupons/active', listPublicCoupons);
router.post('/coupons/validate', optionalAuthenticate, validateCoupon);
router.post('/b2b-enquiry', createB2bEnquiry);

// Student Visitor & Study Goals Enquiry Routes
router.post('/student-enquiries', submitPublicStudentEnquiry);
router.post('/student-enquiry', submitPublicStudentEnquiry);
router.post('/enquiries', submitPublicStudentEnquiry);

// Dynamic Admission Form Public Routes (noCache ensures instant reflection when admin updates schema)
router.get('/admission-form', noCache, getPublicAdmissionFormConfig);
router.post('/admission-form/submit', optionalAuthenticate, submitPublicAdmission);
router.get('/admission-form/application/:applicationNo', noCache, getPublicAdmissionByAppNo);

export default router;
