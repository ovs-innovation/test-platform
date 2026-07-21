import { Router } from 'express';
import { login, register, studentLogin, sendOtp, verifyOtpCode, sendLoginOtp, verifyLoginOtp, me, candidateDashboard, forgotPassword, resetPassword } from '../controllers/authController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema, otpSendSchema, otpVerifySchema, otpSendLoginSchema, otpVerifyLoginSchema } from '../validators/schemas.js';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/student-login', authLimiter, validate(loginSchema), studentLogin);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword);
router.post('/otp/send', authLimiter, validate(otpSendSchema), sendOtp);
router.post('/otp/verify', authLimiter, validate(otpVerifySchema), verifyOtpCode);
router.post('/otp/send-login', authLimiter, validate(otpSendLoginSchema), sendLoginOtp);
router.post('/otp/verify-login', authLimiter, validate(otpVerifyLoginSchema), verifyLoginOtp);
router.get('/me', authenticate, me);
router.get('/candidate/dashboard', authenticate, authorize('candidate'), candidateDashboard);

export default router;
