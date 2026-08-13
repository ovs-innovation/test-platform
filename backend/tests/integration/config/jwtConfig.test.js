import { describe, it, expect } from 'vitest';
import { validateJwtSecretInProduction, validateSeedCredentialsInProduction } from '../../../src/config/env.js';

describe('JWT & Seed Security Configuration Validation', () => {
  it('should throw fatal error in production when JWT_SECRET is missing or empty', () => {
    expect(() => validateJwtSecretInProduction('production', '')).toThrow(/missing in production/i);
    expect(() => validateJwtSecretInProduction('production', undefined)).toThrow(/missing in production/i);
  });

  it('should throw fatal error in production when JWT_SECRET is a known placeholder', () => {
    expect(() => validateJwtSecretInProduction('production', 'dev_insecure_secret_change_me')).toThrow(/insecure or placeholder/i);
    expect(() => validateJwtSecretInProduction('production', 'secret')).toThrow(/insecure or placeholder/i);
  });

  it('should throw fatal error in production when JWT_SECRET is under 32 characters', () => {
    expect(() => validateJwtSecretInProduction('production', 'too_short_secret')).toThrow(/minimum length of 32 characters/i);
  });

  it('should pass in production when JWT_SECRET is valid and >= 32 characters', () => {
    const validProdSecret = 'a_very_long_secure_production_jwt_secret_key_123456789';
    expect(() => validateJwtSecretInProduction('production', validProdSecret)).not.toThrow();
  });

  it('should allow development / test environment secrets', () => {
    expect(() => validateJwtSecretInProduction('test', 'dev_insecure_secret_change_me')).not.toThrow();
    expect(() => validateJwtSecretInProduction('development', 'dev_insecure_secret_change_me')).not.toThrow();
  });

  it('when RUN_SEED=false, backend starts in production without error even with default seed credentials', () => {
    expect(() =>
      validateSeedCredentialsInProduction('production', {
        adminPassword: 'Admin@12345',
        candidatePassword: 'Candidate@123',
      }, false)
    ).not.toThrow();
  });

  it('when RUN_SEED=true, production rejects default seed credentials', () => {
    expect(() =>
      validateSeedCredentialsInProduction('production', {
        adminPassword: 'Admin@12345',
        candidatePassword: 'Candidate@123',
      }, true)
    ).toThrow(/default or missing seed credentials/i);
  });

  it('when RUN_SEED=true, production accepts explicitly configured non-default seed credentials', () => {
    expect(() =>
      validateSeedCredentialsInProduction('production', {
        adminPassword: 'SecureProdAdminPassword!9876',
        candidatePassword: 'SecureProdCandidatePassword!5432',
      }, true)
    ).not.toThrow();
  });
});
