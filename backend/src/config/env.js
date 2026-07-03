import dotenv from 'dotenv';

dotenv.config();

const required = ['JWT_SECRET'];
for (const key of required) {
  if (!process.env[key]) {
    // eslint-disable-next-line no-console
    console.warn(`[env] Warning: ${key} is not set. Using an insecure default for development only.`);
  }
}

export const env = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  isProd: (process.env.NODE_ENV || 'development') === 'production',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',

  databaseUrl: process.env.DATABASE_URL || '',
  pg: {
    host: process.env.PGHOST || 'localhost',
    port: parseInt(process.env.PGPORT || '5432', 10),
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'postgres',
    database: process.env.PGDATABASE || 'interview_platform',
  },

  jwtSecret: process.env.JWT_SECRET || 'dev_insecure_secret_change_me',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '2h',

  seed: {
    adminEmail: process.env.SEED_ADMIN_EMAIL || 'admin@assess.io',
    adminPassword: process.env.SEED_ADMIN_PASSWORD || 'Admin@12345',
    candidateEmail: process.env.SEED_CANDIDATE_EMAIL || 'candidate@assess.io',
    candidatePassword: process.env.SEED_CANDIDATE_PASSWORD || 'Candidate@123',
  },

  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || 'AssessPro <noreply@assesspro.io>',
  },

  otpExpiresMinutes: parseInt(process.env.OTP_EXPIRES_MINUTES || '10', 10),
  otpResendLimit: parseInt(process.env.OTP_RESEND_LIMIT || '3', 10),
  otpResendWindowMinutes: parseInt(process.env.OTP_RESEND_WINDOW_MINUTES || '15', 10),
  otpMaxVerifyAttempts: parseInt(process.env.OTP_MAX_VERIFY_ATTEMPTS || '5', 10),
  inviteBaseUrl: process.env.INVITE_BASE_URL || process.env.CLIENT_URL || 'http://localhost:5173',

  razorpay: {
    keyId: process.env.RAZORPAY_KEY_ID || '',
    keySecret: process.env.RAZORPAY_KEY_SECRET || '',
    webhookSecret: process.env.RAZORPAY_WEBHOOK_SECRET || '',
  },
};
