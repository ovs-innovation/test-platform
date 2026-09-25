import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import {
  createOrder,
  verifyPayment,
  getOrderStatus,
  paymentHistory,
  adminPayments,
} from '../controllers/paymentController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { enrollSchema, verifyPaymentSchema } from '../validators/schemas.js';
import { reconcilePendingPayments } from '../jobs/reconcilePayments.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const paymentLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { message: 'Too many payment requests, please try again in a minute.' },
});

const router = Router();

// Candidate authenticated routes
router.use(authenticate);

// Payment initiation
router.post(
  '/create-order',
  authorize('candidate'),
  paymentLimiter,
  validate(enrollSchema),
  createOrder
);
router.post(
  '/phonepe/initiate',
  authorize('candidate'),
  paymentLimiter,
  validate(enrollSchema),
  createOrder
);

// Payment verification
router.post(
  '/verify',
  authorize('candidate'),
  paymentLimiter,
  validate(verifyPaymentSchema),
  verifyPayment
);
router.post(
  '/phonepe/verify',
  authorize('candidate'),
  paymentLimiter,
  validate(verifyPaymentSchema),
  verifyPayment
);

// Status check (candidate ownership verified in controller, admins also allowed)
router.get(
  '/status/:merchantOrderId',
  authorize('candidate', 'admin'),
  getOrderStatus
);
router.get(
  '/order-status/:merchantOrderId',
  authorize('candidate', 'admin'),
  getOrderStatus
);

// Purchase history
router.get('/history', authorize('candidate'), paymentHistory);

// Admin reporting and on-demand reconciliation
router.get('/admin', authorize('admin'), adminPayments);
router.post(
  '/admin/reconcile',
  authorize('admin'),
  asyncHandler(async (_req, res) => {
    const result = await reconcilePendingPayments();
    res.json({ success: true, result });
  })
);

export default router;
