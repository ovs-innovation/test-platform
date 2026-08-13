import { env } from '../src/config/env.js';
import { initTestDatabase, validateTestDatabaseSafety } from '../scripts/setup-test-db.mjs';

export default async function globalSetup() {
  const nodeEnv = process.env.NODE_ENV || 'test';
  const testDbUrl = process.env.TEST_DATABASE_URL || '';
  const prodDbUrl = process.env.DATABASE_URL || env.databaseUrl || '';

  if (!testDbUrl || typeof testDbUrl !== 'string' || testDbUrl.trim() === '') {
    throw new Error('TEST_DATABASE_URL is required for authorization integration tests.');
  }

  // 1. Validate safety guard rules
  validateTestDatabaseSafety(nodeEnv, testDbUrl, prodDbUrl);

  // 2. Run DDL migrations and seed initial test fixtures ONCE before database integration tests run
  await initTestDatabase();
}
