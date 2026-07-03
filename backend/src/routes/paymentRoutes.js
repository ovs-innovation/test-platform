import { Router } from 'express';
import { createOrder, verifyPayment, paymentHistory, adminPayments } from '../controllers/paymentController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { enrollSchema, verifyPaymentSchema } from '../validators/schemas.js';

const router = Router();

router.use(authenticate);

router.post('/create-order', authorize('candidate'), validate(enrollSchema), createOrder);
router.post('/verify', authorize('candidate'), validate(verifyPaymentSchema), verifyPayment);
router.get('/history', authorize('candidate'), paymentHistory);
router.get('/admin', authorize('admin'), adminPayments);

export default router;
