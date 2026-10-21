import rateLimit from 'express-rate-limit';
import { extractToken } from './auth.js';
import { verifyToken } from '../utils/token.js';

const resolveRateLimitKey = (req) => {
  if (req.user?.id) return `user_${req.user.id}`;
  try {
    const token = extractToken(req);
    if (token) {
      const decoded = verifyToken(token);
      if (decoded?.sub) return `user_${decoded.sub}`;
    }
  } catch (_) {
    // Fall back to client IP if token decoding fails
  }
  return req.ip || req.socket?.remoteAddress || 'unknown';
};

// General API limiter: protects all routes from abuse while preventing NAT lab starvation
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.RATE_LIMIT_MAX ? Number(process.env.RATE_LIMIT_MAX) : 6000,
  keyGenerator: resolveRateLimitKey,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many requests, please try again later.' },
});

// Stricter limiter for authentication endpoints to slow brute-force attacks.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many authentication attempts, please try again later.' },
});

// Incident reporting limiter: prevents rapid loop spam while allowing legitimate failure reports.
export const incidentLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 60,
  standardHeaders: true,
  legacyHeaders: false,
  message: { message: 'Too many incident reports submitted in a short period. Please wait a moment.' },
});
