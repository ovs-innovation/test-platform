import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cookieParser from 'cookie-parser';

import { env } from './config/env.js';
import { razorpayWebhook } from './controllers/paymentController.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { publicCache, privateCache } from './middleware/httpCache.js';
import { requestLogger } from './middleware/requestLogger.js';

import authRoutes from './routes/authRoutes.js';
import inviteRoutes from './routes/inviteRoutes.js';
import assessmentRoutes from './routes/assessmentRoutes.js';
import questionRoutes from './routes/questionRoutes.js';
import sectionRoutes from './routes/sectionRoutes.js';
import attemptRoutes from './routes/attemptRoutes.js';
import questionBankRoutes from './routes/questionBankRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import testSeriesRoutes from './routes/testSeriesRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import studentReportRoutes from './routes/studentReportRoutes.js';
import institutionReportRoutes from './routes/institutionReportRoutes.js';
import institutionRoutes from './routes/institutionRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import ebookRoutes from './routes/ebookRoutes.js';
import aiTestRoutes from './routes/aiTestRoutes.js';

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:3000',
  'https://edvedum.com',
  'https://www.edvedum.com',
  'https://cbt.prosperrainfra.com',
  ...env.clientUrl
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean),
];

// Response Compression (Gzip / Brotli)
app.use(compression({
  threshold: 1024, // Compress responses above 1KB
  filter: (req, res) => {
    if (req.headers['x-no-compression']) return false;
    return compression.filter(req, res);
  },
}));

// Security & infrastructure middleware
app.use(helmet());
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true);
      const normalized = origin.replace(/\/$/, '');
      if (allowedOrigins.includes(normalized)) {
        return callback(null, origin);
      }
      return callback(new Error(`CORS blocked for ${origin}`));
    },
    credentials: true,
  })
);
app.post('/api/payments/webhook', express.raw({ type: 'application/json' }), razorpayWebhook);
app.use(express.json({ limit: '20mb' }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/ebooks', express.static('public/ebooks'));
app.use(requestLogger);
app.use(morgan(env.isProd ? 'combined' : 'dev'));

import { checkHealth, checkReadiness } from './controllers/healthController.js';

// Health & Database Readiness check (exempt from global rate limiting)
app.get('/api/health', checkHealth);
app.get('/api/health/ready', checkReadiness);

// Global rate limiting
app.use('/api', apiLimiter);

// Routes with optimized HTTP Cache-Control headers
app.use('/api/public', publicCache(60, 300), publicRoutes);
app.use('/api/ebooks', publicCache(120, 600), ebookRoutes);
app.use('/api/test-series', publicCache(30, 120), testSeriesRoutes);
app.use('/api/student', privateCache(15), studentRoutes);

// Other API Routes
app.use('/api/auth', authRoutes);
app.use('/api/invites', inviteRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/question-bank', questionBankRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/student/reports', studentReportRoutes);
app.use('/api/institution', institutionReportRoutes);
app.use('/api/institution', institutionRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/tests', aiTestRoutes);

// 404 + error handling (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
