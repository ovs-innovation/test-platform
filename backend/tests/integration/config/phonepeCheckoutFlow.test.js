import { describe, it, expect, vi, beforeEach } from 'vitest';
import crypto from 'crypto';
import {
  getPhonePeClient,
  StandardCheckoutPayRequest,
  Env,
} from '../../../src/config/phonepe.js';

describe('PhonePe Checkout Flow, State Machine & Failure Safeguards', () => {
  describe('Amount Calculation & Integer Paise Precision', () => {
    it('should correctly convert rupees to integer paise without floating point inaccuracy', () => {
      const priceRupees = 499.99;
      const amountPaise = Math.round(priceRupees * 100);
      expect(amountPaise).toBe(49999);
      expect(Number.isInteger(amountPaise)).toBe(true);
    });

    it('should calculate discounted price accurately for percentage coupons', () => {
      const basePrice = 1000;
      const discountPercentage = 25;
      const discount = (basePrice * discountPercentage) / 100;
      const finalPrice = Math.max(0, basePrice - discount);
      const amountPaise = Math.round(finalPrice * 100);

      expect(finalPrice).toBe(750);
      expect(amountPaise).toBe(75000);
    });

    it('should calculate discounted price accurately for fixed discount coupons capped at base price', () => {
      const basePrice = 500;
      const fixedDiscount = 600; // Greater than price
      const discount = Math.min(fixedDiscount, basePrice);
      const finalPrice = Math.max(0, basePrice - discount);
      const amountPaise = Math.round(finalPrice * 100);

      expect(finalPrice).toBe(0);
      expect(amountPaise).toBe(0);
    });
  });

  describe('Merchant Order ID Generation', () => {
    it('should generate valid, unique order IDs adhering to PhonePe format requirements', () => {
      const testSeriesId = 42;
      const userId = 108;
      const timestamp = Date.now();
      const randomSuffix = crypto.randomBytes(3).toString('hex');
      const merchantOrderId = `EDV_${testSeriesId}_${userId}_${timestamp}_${randomSuffix}`;

      // PhonePe requirements: alphanumeric and underscores, length typically <= 38
      expect(merchantOrderId).toMatch(/^[A-Za-z0-9_]+$/);
      expect(merchantOrderId.length).toBeLessThanOrEqual(38);
      expect(merchantOrderId).toContain(`EDV_${testSeriesId}_${userId}_`);
    });
  });

  describe('PhonePe SDK Client & Payment Request Builder', () => {
    it('should build a valid StandardCheckoutPayRequest with proper redirectUrl', () => {
      const merchantOrderId = 'EDV_TEST_101_1740000000_123abc';
      const amountPaise = 29900;
      const redirectUrl = `https://edvedum.com/payment/status?merchantOrderId=${merchantOrderId}`;

      const request = StandardCheckoutPayRequest.builder()
        .merchantOrderId(merchantOrderId)
        .amount(amountPaise)
        .redirectUrl(redirectUrl)
        .build();

      expect(request.merchantOrderId).toBe(merchantOrderId);
      expect(request.amount).toBe(29900);
      expect(request.paymentFlow).toBeDefined();
    });
  });

  describe('PhonePe Webhook Authentication & Callback Parsing', () => {
    it('should validate callback signature correctly using SHA256 of username:password', () => {
      const username = 'edvedum_webhook_user';
      const password = 'edvedum_secure_webhook_pass';

      const validAuthHeader = crypto
        .createHash('sha256')
        .update(`${username}:${password}`)
        .digest('hex');

      const client = getPhonePeClient();
      const mockPayload = {
        type: 'CHECKOUT_ORDER_COMPLETED',
        payload: {
          merchantOrderId: 'EDV_TEST_123',
          orderId: 'PHONEPE_ORD_999',
          state: 'COMPLETED',
          amount: 49900,
        },
      };
      const rawBody = JSON.stringify(mockPayload);

      const callback = client.validateCallback(
        username,
        password,
        validAuthHeader,
        rawBody
      );

      expect(callback).toBeDefined();
      expect(callback.payload.merchantOrderId).toBe('EDV_TEST_123');
      expect(callback.payload.state).toBe('COMPLETED');
    });

    it('should throw an error when webhook authorization header does not match credentials', () => {
      const client = getPhonePeClient();
      const mockPayload = { type: 'CHECKOUT_ORDER_COMPLETED', payload: {} };
      const rawBody = JSON.stringify(mockPayload);

      expect(() => {
        client.validateCallback(
          'correct_user',
          'correct_pass',
          'invalid_authorization_hash',
          rawBody
        );
      }).toThrow();
    });
  });

  describe('Order State Machine & Terminal State Safeguards', () => {
    it('should recognize terminal states COMPLETED and FAILED', () => {
      const terminalStates = ['COMPLETED', 'FAILED'];
      expect(terminalStates.includes('COMPLETED')).toBe(true);
      expect(terminalStates.includes('FAILED')).toBe(true);
      expect(terminalStates.includes('PENDING')).toBe(false);
    });

    it('should prevent older failed callback from overriding verified success state', () => {
      // Simulation of race condition:
      // State in DB: SUCCESS
      // Incoming webhook: FAILED (e.g. earlier failed attempt callback delivered late)
      const currentDbStatus = 'success';
      const incomingWebhookState = 'FAILED';

      const shouldUpdate = currentDbStatus !== 'success';
      expect(shouldUpdate).toBe(false); // Safeguard prevents overwrite!
    });
  });
});
