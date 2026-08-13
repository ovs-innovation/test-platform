import { describe, it, expect } from 'vitest';
import { validateTestDatabaseSafety } from '../../../scripts/setup-test-db.mjs';

describe('Test Database Safety Guard Strict URL Validation Unit Tests', () => {
  const localTestUrl = 'postgresql://postgres:postgres@localhost:5432/interview_platform_test';
  const fakeProdUrl = 'postgresql://user:pass@ep-fake.ap-southeast-1.aws.neon.tech/neondb';

  it('should throw safety failure when NODE_ENV is not test', () => {
    expect(() => validateTestDatabaseSafety('development', localTestUrl)).toThrow(/NODE_ENV='test'/i);
    expect(() => validateTestDatabaseSafety('production', localTestUrl)).toThrow(/NODE_ENV='test'/i);
  });

  it('should throw safety failure when TEST_DATABASE_URL is missing or empty', () => {
    expect(() => validateTestDatabaseSafety('test', '')).toThrow(/missing or empty/i);
    expect(() => validateTestDatabaseSafety('test', undefined)).toThrow(/missing or empty/i);
  });

  it('should throw safety trigger for invalid or unparseable URL format', () => {
    expect(() => validateTestDatabaseSafety('test', 'not_a_valid_url_at_all')).toThrow(/Invalid or unparseable/i);
  });

  it('should throw safety trigger when TEST_DATABASE_URL matches production DATABASE_URL', () => {
    expect(() => validateTestDatabaseSafety('test', fakeProdUrl, fakeProdUrl)).toThrow(/matches production DATABASE_URL/i);
  });

  it('should throw safety trigger when hostname is uppercase Neon host (EP-HOST.NEON.TECH)', () => {
    const uppercaseNeonUrl = 'postgresql://user:pass@EP-HOST.NEON.TECH/my_test';
    expect(() => validateTestDatabaseSafety('test', uppercaseNeonUrl)).toThrow(/Neon host/i);
  });

  it('should throw safety trigger when _test appears only in username', () => {
    const url = 'postgresql://user_test:pass@localhost:5432/my_db';
    expect(() => validateTestDatabaseSafety('test', url)).toThrow(/does not end with '_test'/i);
  });

  it('should throw safety trigger when _test appears only in password', () => {
    const url = 'postgresql://user:pass_test@localhost:5432/my_db';
    expect(() => validateTestDatabaseSafety('test', url)).toThrow(/does not end with '_test'/i);
  });

  it('should throw safety trigger when _test appears only in hostname', () => {
    const url = 'postgresql://user:pass@host_test:5432/my_db';
    expect(() => validateTestDatabaseSafety('test', url)).toThrow(/does not end with '_test'/i);
  });

  it('should throw safety trigger when _test appears only in query parameters', () => {
    const url = 'postgresql://user:pass@localhost:5432/my_db?schema=_test';
    expect(() => validateTestDatabaseSafety('test', url)).toThrow(/does not end with '_test'/i);
  });

  it('should throw safety trigger when database name is URL-encoded protected name (neon%64b)', () => {
    const url = 'postgresql://user:pass@localhost:5432/neon%64b';
    expect(() => validateTestDatabaseSafety('test', url)).toThrow(/protected database name 'neondb'/i);
  });

  it('should pass safety verification when TEST_DATABASE_URL targets valid local interview_platform_test', () => {
    expect(() => validateTestDatabaseSafety('test', localTestUrl, fakeProdUrl)).not.toThrow();
  });
});
