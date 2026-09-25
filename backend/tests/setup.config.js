import { vi } from 'vitest';

// Outbound External Service Mocks for pure configuration unit tests
vi.mock('../src/utils/email.js', () => ({
  sendEmail: vi.fn().mockResolvedValue({ sent: true, mock: true }),
  sendOtpEmail: vi.fn().mockResolvedValue({ sent: true, mock: true }),
  sendInviteEmail: vi.fn().mockResolvedValue({ sent: true, mock: true }),
  sendCompletionEmail: vi.fn().mockResolvedValue({ sent: true, mock: true }),
  verifySmtpConnection: vi.fn().mockResolvedValue(true),
}));

vi.mock('../src/utils/firebase.js', () => ({
  getFirebaseAdminAuth: vi.fn().mockReturnValue({
    verifyIdToken: vi.fn().mockResolvedValue({ uid: 'mock_uid', email: 'firebase@test.com' }),
  }),
}));

// Fallback test credentials for CI test suites where .env is absent
process.env.PHONEPE_CLIENT_ID = process.env.PHONEPE_CLIENT_ID || 'SU_TEST_CLIENT_ID';
process.env.PHONEPE_CLIENT_SECRET = process.env.PHONEPE_CLIENT_SECRET || 'TEST_CLIENT_SECRET_KEY';
process.env.MERCHANT_ID = process.env.MERCHANT_ID || 'TEST_MERCHANT_ID';
process.env.PHONEPE_CLIENT_VERSION = process.env.PHONEPE_CLIENT_VERSION || '1';
process.env.PHONEPE_ENV = process.env.PHONEPE_ENV || 'PRODUCTION';
process.env.PHONEPE_MERCHANT_HOST_URL = process.env.PHONEPE_MERCHANT_HOST_URL || 'https://edvedum.com';
