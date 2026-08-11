import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import { env } from './config/env.js';
import { razorpayWebhook } from './controllers/paymentController.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';

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
app.use('/uploads', express.static('uploads'));
app.use(morgan(env.isProd ? 'combined' : 'dev'));

import { checkHealth, checkReadiness } from './controllers/healthController.js';

// Global rate limiting
app.use('/api', apiLimiter);

// Health & Database Readiness check
app.get('/api/health', checkHealth);
app.get('/api/health/ready', checkReadiness);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/invites', inviteRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/questions', questionRoutes);
app.use('/api/sections', sectionRoutes);
app.use('/api/attempts', attemptRoutes);
app.use('/api/question-bank', questionBankRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/public', publicRoutes);
app.use('/api/test-series', testSeriesRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/student/reports', studentReportRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/institution', institutionReportRoutes);
app.use('/api/institution', institutionRoutes);
app.use('/api/upload', uploadRoutes);

// 404 + error handling (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
