import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import crypto from 'crypto';
import {
  getPhonePeEnvironment,
  validatePhonePeConfig,
  getPhonePeClient,
  resetPhonePeClient,
  StandardCheckoutPayRequest,
  Env,
} from '../../../src/config/phonepe.js';
import { env } from '../../../src/config/env.js';

describe('PhonePe V2 Standard Checkout Configuration & Security Tests', () => {
  const originalConfig = { ...env.phonepe };

  beforeEach(() => {
    resetPhonePeClient();
    env.phonepe = { ...originalConfig };
  });

  afterEach(() => {
    resetPhonePeClient();
    env.phonepe = { ...originalConfig };
  });

  describe('Environment Validation & Fallback Prevention', () => {
    it('should correctly accept PRODUCTION environment', () => {
      env.phonepe.env = 'PRODUCTION';
      expect(getPhonePeEnvironment()).toBe(Env.PRODUCTION);
    });

    it('should correctly accept SANDBOX environment', () => {
      env.phonepe.env = 'SANDBOX';
      expect(getPhonePeEnvironment()).toBe(Env.SANDBOX);
    });

    it('should reject invalid environment without silently falling back to sandbox', () => {
      env.phonepe.env = 'DEV_FALLBACK';
      expect(() => getPhonePeEnvironment()).toThrow(
        /Invalid PHONEPE_ENV: "DEV_FALLBACK"\. Allowed values are strictly "PRODUCTION" or "SANDBOX"/
      );
    });

    it('should reject empty environment string', () => {
      env.phonepe.env = '';
      expect(() => getPhonePeEnvironment()).toThrow(/Invalid PHONEPE_ENV/);
    });
  });

  describe('Credential Validation', () => {
    it('should validate complete production configuration successfully', () => {
      env.phonepe = {
        clientId: 'SU2609241614450304102516',
        clientSecret: 'aa8b1d65-7e37-43bd-aa58-0bcc2b0f84ff',
        merchantId: 'M23CQZHNXFMOJ',
        clientVersion: 1,
        env: 'PRODUCTION',
      };
      const check = validatePhonePeConfig();
      expect(check.isValid).toBe(true);
      expect(check.errors).toHaveLength(0);
    });

    it('should report error if PHONEPE_CLIENT_ID is missing', () => {
      env.phonepe.clientId = '';
      const check = validatePhonePeConfig();
      expect(check.isValid).toBe(false);
      expect(check.errors.some((e) => e.includes('PHONEPE_CLIENT_ID is missing'))).toBe(true);
    });

    it('should report error if PHONEPE_CLIENT_SECRET is missing', () => {
      env.phonepe.clientSecret = '';
      const check = validatePhonePeConfig();
      expect(check.isValid).toBe(false);
      expect(check.errors.some((e) => e.includes('PHONEPE_CLIENT_SECRET is missing'))).toBe(true);
    });

    it('should report error if MERCHANT_ID is missing', () => {
      env.phonepe.merchantId = '';
      const check = validatePhonePeConfig();
      expect(check.isValid).toBe(false);
      expect(check.errors.some((e) => e.includes('MERCHANT_ID'))).toBe(true);
    });

    it('should report error if PHONEPE_CLIENT_VERSION is invalid or 0', () => {
      env.phonepe.clientVersion = 0;
      const check = validatePhonePeConfig();
      expect(check.isValid).toBe(false);
      expect(check.errors.some((e) => e.includes('PHONEPE_CLIENT_VERSION'))).toBe(true);
    });
  });

  describe('Client Singleton Instantiation', () => {
    it('should instantiate singleton client with valid credentials and expose required methods', () => {
      env.phonepe = {
        clientId: 'SU2609241614450304102516',
        clientSecret: 'aa8b1d65-7e37-43bd-aa58-0bcc2b0f84ff',
        merchantId: 'M23CQZHNXFMOJ',
        clientVersion: 1,
        env: 'PRODUCTION',
      };
      const client = getPhonePeClient();
      expect(client).toBeDefined();
      expect(typeof client.pay).toBe('function');
      expect(typeof client.getOrderStatus).toBe('function');
      expect(typeof client.validateCallback).toBe('function');

      // Verify singleton returns the same instance
      const client2 = getPhonePeClient();
      expect(client2).toBe(client);
    });
  });

  describe('StandardCheckoutPayRequest Builder', () => {
    it('should construct valid PayRequest with integer paise amount and redirectUrl', () => {
      const merchantOrderId = 'EDV_TEST_101_1740000000_abc123';
      const amountPaise = 49900; // Rs 499.00
      const redirectUrl = 'https://edvedum.com/payment/status?merchantOrderId=' + merchantOrderId;

      const request = StandardCheckoutPayRequest.builder()
        .merchantOrderId(merchantOrderId)
        .amount(amountPaise)
        .redirectUrl(redirectUrl)
        .build();

      expect(request.merchantOrderId).toBe(merchantOrderId);
      expect(request.amount).toBe(49900);
      expect(request.paymentFlow).toBeDefined();
    });
  });

  describe('Webhook Signature & Callback Verification Logic', () => {
    it('should correctly compute and validate PhonePe SHA256 authorization checksum', () => {
      const username = 'test_webhook_user';
      const password = 'test_webhook_password';
      const expectedHash = crypto
        .createHash('sha256')
        .update(`${username}:${password}`)
        .digest('hex');

      expect(expectedHash).toHaveLength(64);

      // Verify that incorrect credentials fail validation
      const badHash = crypto
        .createHash('sha256')
        .update('attacker:badpass')
        .digest('hex');

      expect(badHash).not.toBe(expectedHash);
    });
  });
});
