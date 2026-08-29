import { Router } from 'express';
import { login, register, studentLogin, sendOtp, verifyOtpCode, sendLoginOtp, verifyLoginOtp, sendSignupOtp, firebaseLogin, me, candidateDashboard, forgotPassword, resetPassword, refreshTokens, logout, logoutAllDevices } from '../controllers/authController.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { validate } from '../middleware/validate.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { loginSchema, studentLoginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema, otpSendSchema, otpVerifySchema, otpSendLoginSchema, otpVerifyLoginSchema, otpSendSignupSchema, firebaseLoginSchema } from '../validators/schemas.js';

const router = Router();

router.post('/login', authLimiter, validate(loginSchema), login);
router.post('/register', authLimiter, validate(registerSchema), register);
router.post('/student-login', authLimiter, validate(studentLoginSchema), studentLogin);
router.post('/forgot-password', authLimiter, validate(forgotPasswordSchema), forgotPassword);
router.post('/reset-password', authLimiter, validate(resetPasswordSchema), resetPassword);
router.post('/otp/send', authLimiter, validate(otpSendSchema), sendOtp);
router.post('/otp/verify', authLimiter, validate(otpVerifySchema), verifyOtpCode);
router.post('/otp/send-login', authLimiter, validate(otpSendLoginSchema), sendLoginOtp);
router.post('/otp/send-signup', authLimiter, validate(otpSendSignupSchema), sendSignupOtp);
router.post('/otp/verify-login', authLimiter, validate(otpVerifyLoginSchema), verifyLoginOtp);
router.post('/firebase-login', authLimiter, validate(firebaseLoginSchema), firebaseLogin);

// Session Security & Token Rotation Routes
router.post('/refresh', refreshTokens);
router.post('/logout', logout);
router.post('/logout-all', authenticate, logoutAllDevices);

router.get('/me', authenticate, me);
router.get('/candidate/dashboard', authenticate, authorize('candidate'), candidateDashboard);

export default router;

