import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { normalizePhoneNumber, sendOtpSms, sendRegistrationOtpSms } from '../../../src/utils/sms.js';
import { env } from '../../../src/config/env.js';

describe('MSG91 SMS Service & Configuration', () => {
  const originalFetch = global.fetch;
  const originalAuthKey = env.msg91?.authKey;

  beforeEach(() => {
    vi.restoreAllMocks();
    if (!env.msg91.authKey) {
      env.msg91.authKey = 'TEST_MSG91_AUTH_KEY_123';
    }
  });

  afterEach(() => {
    global.fetch = originalFetch;
    env.msg91.authKey = originalAuthKey;
  });

  describe('Configuration', () => {
    it('loads MSG91 template ID, sender ID, and auth key from env', () => {
      expect(env.msg91).toBeDefined();
      expect(env.msg91.templateId).toBe('6acb8433e4dd61c79c0eca17');
      expect(env.msg91.senderId).toBe('EDVEDM');
      expect(typeof env.msg91.authKey).toBe('string');
    });
  });

  describe('Phone Number Normalization', () => {
    it('normalizes 10-digit Indian phone numbers with 91 prefix', () => {
      expect(normalizePhoneNumber('9876543210')).toBe('919876543210');
      expect(normalizePhoneNumber(9876543210)).toBe('919876543210');
    });

    it('strips spaces, dashes, parentheses and plus signs', () => {
      expect(normalizePhoneNumber('+91 98765-43210')).toBe('919876543210');
      expect(normalizePhoneNumber('+91 (987) 654-3210')).toBe('919876543210');
    });

    it('handles numbers starting with leading 0', () => {
      expect(normalizePhoneNumber('09876543210')).toBe('919876543210');
    });

    it('preserves numbers already having 91 prefix', () => {
      expect(normalizePhoneNumber('919876543210')).toBe('919876543210');
    });

    it('returns null for empty or invalid numbers', () => {
      expect(normalizePhoneNumber('')).toBeNull();
      expect(normalizePhoneNumber(null)).toBeNull();
      expect(normalizePhoneNumber(undefined)).toBeNull();
      expect(normalizePhoneNumber('12345')).toBeNull();
    });
  });

  describe('sendOtpSms & sendRegistrationOtpSms', () => {
    it('rejects invalid phone numbers without making external calls', async () => {
      const res = await sendOtpSms({ phone: '123', otp: '123456' });
      expect(res.sent).toBe(false);
      expect(res.error).toMatch(/invalid/i);
    });

    it('rejects empty OTP without making external calls', async () => {
      const res = await sendOtpSms({ phone: '9876543210', otp: '' });
      expect(res.sent).toBe(false);
      expect(res.error).toMatch(/OTP code is required/i);
    });

    it('successfully calls MSG91 SendOTP API and returns success response', async () => {
      const mockSuccessResponse = {
        type: 'success',
        request_id: '366a6c6d_test_123456',
      };

      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: async () => mockSuccessResponse,
      });

      const res = await sendRegistrationOtpSms('9876543210', '458921');

      expect(global.fetch).toHaveBeenCalledTimes(1);
      const [calledUrl, calledOptions] = global.fetch.mock.calls[0];

      expect(calledUrl).toContain('control.msg91.com/api/v5/otp');
      expect(calledUrl).toContain('template_id=6acb8433e4dd61c79c0eca17');
      expect(calledUrl).toContain('mobile=919876543210');
      expect(calledUrl).toContain('otp=458921');

      expect(calledOptions.method).toBe('POST');
      expect(calledOptions.headers['content-type']).toBe('application/json');
      expect(calledOptions.headers.authkey).toBeDefined();

      const parsedBody = JSON.parse(calledOptions.body);
      expect(parsedBody.template_id).toBe('6acb8433e4dd61c79c0eca17');
      expect(parsedBody.mobile).toBe('919876543210');
      expect(parsedBody.otp).toBe('458921');

      expect(res.sent).toBe(true);
      expect(res.requestId).toBe('366a6c6d_test_123456');
    });

    it('handles MSG91 API error responses gracefully', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({
          type: 'error',
          message: 'Insufficient balance or invalid template',
        }),
      });

      const res = await sendOtpSms({ phone: '9876543210', otp: '123456' });
      expect(res.sent).toBe(false);
      expect(res.error).toBe('Insufficient balance or invalid template');
    });

    it('handles network failure without throwing unhandled rejection', async () => {
      global.fetch = vi.fn().mockRejectedValue(new Error('Network connection timeout'));

      const res = await sendOtpSms({ phone: '9876543210', otp: '123456' });
      expect(res.sent).toBe(false);
      expect(res.error).toBe('Network connection timeout');
    });

    it('falls back to mock delivery in non-prod when authKey is missing', async () => {
      env.msg91.authKey = '';
      const res = await sendOtpSms({ phone: '9876543210', otp: '123456' });
      expect(res.sent).toBe(true);
      expect(res.mock).toBe(true);
    });
  });
});
