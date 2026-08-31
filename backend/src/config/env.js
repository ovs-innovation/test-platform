import dotenv from 'dotenv';

import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const validateJwtSecretInProduction = (nodeEnv, secret) => {
  const isProduction = nodeEnv === 'production';
  const knownPlaceholders = ['dev_insecure_secret_change_me', 'secret', 'change_me', '1234567890'];

  if (isProduction) {
    const cleanSecret = (secret || '').trim();
    if (!cleanSecret) {
      throw new Error('JWT_SECRET is missing in production environment. A secure 32+ char secret is required.');
    }
    if (knownPlaceholders.includes(cleanSecret)) {
      throw new Error(`JWT_SECRET is an insecure or placeholder value (${cleanSecret}) in production.`);
    }
    if (cleanSecret.length < 32) {
      throw new Error(`JWT_SECRET must have a minimum length of 32 characters in production (got ${cleanSecret.length}).`);
    }
  }
  return secret || 'dev_insecure_secret_change_me';
};

export const validateSeedCredentialsInProduction = (nodeEnv, seedConfig, runSeed = false) => {
  if (nodeEnv === 'production' && runSeed) {
    const defaultPasswords = ['Admin@12345', 'Candidate@123'];
    if (
      !seedConfig.adminPassword ||
      defaultPasswords.includes(seedConfig.adminPassword) ||
      !seedConfig.candidatePassword ||
      defaultPasswords.includes(seedConfig.candidatePassword)
    ) {
      throw new Error('Default or missing seed credentials cannot be used when RUN_SEED=true in production environment.');
    }
  }
};

const nodeEnv = process.env.NODE_ENV || 'development';
const rawJwtSecret = process.env.JWT_SECRET || (nodeEnv === 'production' ? '' : 'dev_insecure_secret_change_me');
const jwtSecret = validateJwtSecretInProduction(nodeEnv, rawJwtSecret);
const runSeed = process.env.RUN_SEED === 'true';

const seedConfig = {
  adminEmail: process.env.SEED_ADMIN_EMAIL || 'admin@assess.io',
  adminPassword: process.env.SEED_ADMIN_PASSWORD || 'Admin@12345',
  candidateEmail: process.env.SEED_CANDIDATE_EMAIL || 'candidate@assess.io',
  candidatePassword: process.env.SEED_CANDIDATE_PASSWORD || 'Candidate@123',
};

validateSeedCredentialsInProduction(nodeEnv, seedConfig, runSeed);

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: (process.env.NODE_ENV || 'development') === 'production',
  runSeed: process.env.RUN_SEED === 'true',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  databaseUrl: (process.env.NODE_ENV === 'test' && process.env.TEST_DATABASE_URL)
    ? process.env.TEST_DATABASE_URL
    : (process.env.DATABASE_URL || ''),
  pg: {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'interview_platform',
  },

  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  jwtSecret: jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',

  seed: seedConfig,

  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'EDVEDUM Academy <noreply@edvedum.com>',
    resendApiKey: process.env.RESEND_API_KEY || '',
    brevoApiKey: process.env.BREVO_API_KEY || '',
  },

  otpExpiresMinutes: parseInt(process.env.OTP_EXPIRES_MINUTES || '10', 10),
  otpResendLimit: parseInt(process.env.OTP_RESEND_LIMIT || '3', 10),
  otpResendWindowMinutes: parseInt(process.env.OTP_RESEND_WINDOW_MINUTES || '15', 10),
  otpMaxVerifyAttempts: parseInt(process.env.OTP_MAX_VERIFY_ATTEMPTS || '5', 10),
  inviteBaseUrl: (process.env.INVITE_BASE_URL || '').split(',')[0].trim() || (process.env.CLIENT_URL || '').split(',')[0].trim() || 'http://localhost:5173',

  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || '',
    apiKey: process.env.CLOUDINARY_API_KEY || '',
    apiSecret: process.env.CLOUDINARY_API_SECRET || '',
    url: process.env.CLOUDINARY_URL || '',
  },
  firebaseServiceAccount: process.env.FIREBASE_SERVICE_ACCOUNT || '',
  geminiApiKey: process.env.GEMINI_API_KEY || '',
  openrouterApiKey: process.env.OPENROUTER_API_KEY || '',
};
