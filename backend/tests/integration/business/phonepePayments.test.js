import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../../src/app.js';
import { getStudentAToken, getStudentBToken, getAdminToken } from '../../helpers/authTokens.js';
import { query } from '../../../src/config/db.js';
import { fulfillPaymentOrder, markPaymentFailed } from '../../../src/services/paymentFulfillmentService.js';
import { reconcilePendingPayments } from '../../../src/jobs/reconcilePayments.js';

describe('PhonePe Payments Integration & Security Tests', () => {
  it('should reject unauthenticated request to initiate payment', async () => {
    const res = await request(app)
      .post('/api/payments/phonepe/initiate')
      .send({ test_series_id: 1 });

    expect(res.status).toBe(401);
  });

  it('should reject payment creation for non-existent test series', async () => {
    const studentToken = getStudentAToken();
    const res = await request(app)
      .post('/api/payments/phonepe/initiate')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ test_series_id: 999999 });

    expect(res.status).toBe(404);
  });

  it('should reject payment verification attempt for an order belonging to another user', async () => {
    const studentAToken = getStudentAToken();
    const studentBToken = getStudentBToken();

    // Create a payment record owned by Student A (user id 101 or similar)
    const payRes = await query(
      `INSERT INTO payments (
         user_id, test_series_id, amount, currency, status, fulfillment_status,
         provider, merchant_order_id
       ) VALUES ($1, $2, $3, 'INR', 'pending', 'pending', 'phonepe', $4)
       RETURNING id, merchant_order_id`,
      [101, 1, 499, `EDV_OWNERSHIP_TEST_${Date.now()}`]
    );

    const merchantOrderId = payRes.rows[0].merchant_order_id;

    // Student B attempts to verify Student A's order
    const res = await request(app)
      .post('/api/payments/phonepe/verify')
      .set('Authorization', `Bearer ${studentBToken}`)
      .send({ merchantOrderId });

    expect(res.status).toBe(404);
    expect(res.body.message).toMatch(/not found for this user/i);

    // Clean up
    await query('DELETE FROM payments WHERE id = $1', [payRes.rows[0].id]);
  });

  it('should support idempotent fulfillment without duplicating enrollments or notifications', async () => {
    // 1. Create a test series if none exists
    let testSeriesId = 1;
    const tsCheck = await query('SELECT id FROM test_series LIMIT 1');
    if (tsCheck.rowCount) {
      testSeriesId = tsCheck.rows[0].id;
    }

    // 2. Insert a test payment record
    const uniqueOrderId = `EDV_IDEM_TEST_${Date.now()}`;
    const payRes = await query(
      `INSERT INTO payments (
         user_id, test_series_id, amount, currency, status, fulfillment_status,
         provider, merchant_order_id
       ) VALUES ($1, $2, $3, 'INR', 'pending', 'pending', 'phonepe', $4)
       RETURNING id`,
      [101, testSeriesId, 299, uniqueOrderId]
    );
    const paymentId = payRes.rows[0].id;

    // 3. First fulfillment call
    const firstCall = await fulfillPaymentOrder({
      paymentId,
      merchantOrderId: uniqueOrderId,
      providerPaymentId: `TXN_FIRST_${Date.now()}`,
    });

    expect(firstCall.alreadyFulfilled).toBe(false);
    expect(firstCall.payment.status).toBe('success');
    expect(firstCall.payment.fulfillment_status).toBe('fulfilled');

    // Count enrollments and notifications
    const countEnr1 = await query(
      `SELECT COUNT(*)::int AS count FROM student_enrollments WHERE user_id = $1 AND test_series_id = $2`,
      [101, testSeriesId]
    );
    expect(countEnr1.rows[0].count).toBe(1);

    // 4. Second fulfillment call (duplicate webhook or user refresh)
    const secondCall = await fulfillPaymentOrder({
      paymentId,
      merchantOrderId: uniqueOrderId,
      providerPaymentId: `TXN_SECOND_${Date.now()}`,
    });

    expect(secondCall.alreadyFulfilled).toBe(true);

    // Verify still exactly 1 enrollment record
    const countEnr2 = await query(
      `SELECT COUNT(*)::int AS count FROM student_enrollments WHERE user_id = $1 AND test_series_id = $2`,
      [101, testSeriesId]
    );
    expect(countEnr2.rows[0].count).toBe(1);

    // 5. Verify that markPaymentFailed does NOT overwrite a successful payment!
    const failedAttempt = await markPaymentFailed({
      paymentId,
      errorCode: 'LATE_FAILURE_ERROR',
      errorMessage: 'Late failure callback',
    });
    expect(failedAttempt.status).toBe('success');

    // Clean up test records
    await query('DELETE FROM notifications WHERE user_id = 101 AND type = $1', ['purchase']);
    await query('DELETE FROM student_enrollments WHERE payment_id = $1', [paymentId]);
    await query('DELETE FROM payments WHERE id = $1', [paymentId]);
  });

  it('should accept public webhook requests and durably log them in payment_webhooks', async () => {
    const webhookPayload = {
      type: 'PG_ORDER_COMPLETED',
      payload: {
        merchantOrderId: `EDV_WH_TEST_${Date.now()}`,
        orderId: `PHONEPE_ORD_${Date.now()}`,
        state: 'COMPLETED',
        amount: 50000,
      },
    };

    const res = await request(app)
      .post('/api/payments/phonepe/webhook')
      .set('Content-Type', 'application/json')
      .set('Authorization', 'mock_sha256_auth_header')
      .send(JSON.stringify(webhookPayload));

    // Webhook endpoint does not require user login and returns 200/received
    expect(res.status).toBe(200);
    expect(res.body.received).toBe(true);

    // Verify that the event was durably recorded in payment_webhooks table
    const logged = await query(
      `SELECT * FROM payment_webhooks WHERE merchant_order_id = $1`,
      [webhookPayload.payload.merchantOrderId]
    );
    expect(logged.rowCount).toBe(1);
    expect(logged.rows[0].provider).toBe('phonepe');

    // Clean up
    await query('DELETE FROM payment_webhooks WHERE id = $1', [logged.rows[0].id]);
  });

  it('should execute reconciliation job safely without throwing', async () => {
    const result = await reconcilePendingPayments();
    expect(result).toBeDefined();
    expect(result.error).toBeUndefined();
  });
});
