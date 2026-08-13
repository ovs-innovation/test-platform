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
