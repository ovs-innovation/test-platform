import { vi, beforeAll } from 'vitest';
import net from 'net';
import { env } from '../src/config/env.js';
import { validateTestDatabaseSafety } from '../scripts/setup-test-db.mjs';

// 1. Mandatory TEST_DATABASE_URL & Preflight Check for Database Integration Tests
const verifyTestDatabaseSafetyGuard = () => {
  const nodeEnv = process.env.NODE_ENV || 'test';
  const testDbUrl = process.env.TEST_DATABASE_URL || '';
  const prodDbUrl = process.env.DATABASE_URL || env.databaseUrl || '';

  if (!testDbUrl || typeof testDbUrl !== 'string' || testDbUrl.trim() === '') {
    throw new Error('TEST_DATABASE_URL is required for authorization integration tests.');
  }

  // Validate URL safety rules (prohibiting Neon / production DB / invalid names)
  validateTestDatabaseSafety(nodeEnv, testDbUrl, prodDbUrl);
};

const verifyLocalPostgresReachable = async () => {
  const testDbUrl = process.env.TEST_DATABASE_URL;
  if (!testDbUrl) {
    throw new Error('TEST_DATABASE_URL is required for authorization integration tests.');
  }

  let host = '127.0.0.1';
  let port = 5432;
  try {
    const urlObj = new URL(testDbUrl);
    host = urlObj.hostname || '127.0.0.1';
    port = parseInt(urlObj.port || '5432', 10);
  } catch (_) {}

  return new Promise((resolve, reject) => {
    const socket = new net.Socket();
    socket.setTimeout(1500);

    socket.on('connect', () => {
      socket.destroy();
      resolve(true);
    });

    socket.on('timeout', () => {
      socket.destroy();
      reject(new Error(`Local test PostgreSQL TCP port is unreachable at ${host}:${port}`));
    });

    socket.on('error', (err) => {
      socket.destroy();
      reject(new Error(`Local test PostgreSQL connection refused at ${host}:${port} (${err.message})`));
    });

    socket.connect(port, host);
  });
};

verifyTestDatabaseSafetyGuard();

beforeAll(async () => {
  try {
    await verifyLocalPostgresReachable();
  } catch (err) {
    console.error(`\n================================================================================`);
    console.error(`[PREFLIGHT CONNECTIVITY FAILURE] ${err.message}`);
    console.error(`Please start local PostgreSQL service at 127.0.0.1:5432.`);
    console.error(`================================================================================\n`);
    throw err;
  }
});

// 2. External Services Isolation (Mocking outbound Email, Firebase, Razorpay, and AI calls during test runs)
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
