import { query, withTransaction } from '../config/db.js';
import { sendEmail } from '../utils/email.js';
import { createAdminNotification } from '../utils/createAdminNotification.js';
import { logger } from '../utils/logger.js';

/**
 * Idempotently fulfills an order upon verified payment success.
 * Guarantees that duplicate webhooks, status polling, or re-verifications
 * will never double-grant access, duplicate email notifications, or increment coupon usage multiple times.
 *
 * @param {Object} params
 * @param {number} params.paymentId
 * @param {string} [params.merchantOrderId]
 * @param {string} [params.providerPaymentId]
 * @param {string} [params.providerOrderId]
 * @param {string} [params.providerSignature]
 * @param {Object} [params.metadata]
 * @param {Object} [params.client] - Optional active database transaction client
 */
export const fulfillPaymentOrder = async ({
  paymentId,
  merchantOrderId,
  providerPaymentId,
  providerOrderId,
  providerSignature,
  metadata = {},
  client: externalClient,
}) => {
  const runner = async (dbClient) => {
    // 1. Fetch payment with row lock for update
    const payRes = await dbClient.query(
      `SELECT * FROM payments WHERE id = $1 FOR UPDATE`,
      [paymentId]
    );

    if (!payRes.rowCount) {
      throw new Error(`Payment record #${paymentId} not found`);
    }

    const payment = payRes.rows[0];

    // Check if already fulfilled
    if (payment.status === 'success' && payment.fulfillment_status === 'fulfilled') {
      const enrRes = await dbClient.query(
        `SELECT * FROM student_enrollments WHERE user_id = $1 AND test_series_id = $2`,
        [payment.user_id, payment.test_series_id]
      );
      const tsRes = await dbClient.query(
        `SELECT * FROM test_series WHERE id = $1`,
        [payment.test_series_id]
      );
      return {
        alreadyFulfilled: true,
        payment,
        enrollment: enrRes.rows[0] || null,
        series: tsRes.rows[0] || null,
      };
    }

    // 2. Update payment record to success & fulfilled
    const updatedMetadata = {
      ...(payment.metadata || {}),
      ...metadata,
      fulfilledAt: new Date().toISOString(),
    };

    const updatePayRes = await dbClient.query(
      `UPDATE payments
       SET status = 'success',
           fulfillment_status = 'fulfilled',
           provider_payment_id = COALESCE($1, provider_payment_id, razorpay_payment_id),
           provider_order_id = COALESCE($2, provider_order_id, razorpay_order_id),
           provider_signature = COALESCE($3, provider_signature),
           metadata = $4,
           fulfilled_at = NOW(),
           updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [
        providerPaymentId || null,
        providerOrderId || null,
        providerSignature || null,
        JSON.stringify(updatedMetadata),
        payment.id,
      ]
    );

    const updatedPayment = updatePayRes.rows[0];

    // 3. Atomically increment coupon used_count if not previously counted
    if (payment.coupon_id && payment.status !== 'success') {
      await dbClient.query(
        `UPDATE coupons SET used_count = used_count + 1 WHERE id = $1`,
        [payment.coupon_id]
      );
    }

    // 4. Fetch test series validity
    const ts = await dbClient.query(
      `SELECT * FROM test_series WHERE id = $1`,
      [payment.test_series_id]
    );
    const series = ts.rows[0] || {};
    const validityDays = Number(series.validity_days) || 365;
    const expires = new Date(Date.now() + validityDays * 86400000);

    // 5. Upsert student enrollment
    const enr = await dbClient.query(
      `INSERT INTO student_enrollments (user_id, test_series_id, payment_id, status, purchased_at, expires_at)
       VALUES ($1, $2, $3, 'active', NOW(), $4)
       ON CONFLICT (user_id, test_series_id)
       DO UPDATE SET
         expires_at = EXCLUDED.expires_at,
         payment_id = EXCLUDED.payment_id,
         status = 'active',
         purchased_at = NOW()
       RETURNING *`,
      [payment.user_id, payment.test_series_id, payment.id, expires]
    );

    // 6. Notifications
    await dbClient.query(
      `INSERT INTO notifications (user_id, title, body, type)
       VALUES ($1, $2, $3, 'purchase')`,
      [
        payment.user_id,
        'Payment successful',
        `"${series.title || 'Test series'}" is now unlocked. Start practicing now!`,
      ]
    );

    await createAdminNotification({
      title: 'Payment Received',
      body: `New successful purchase for "${series.title || 'Test Series'}" (₹${payment.amount}) via ${payment.provider || 'PhonePe'}.`,
      type: 'payment_success',
    });

    return {
      alreadyFulfilled: false,
      payment: updatedPayment,
      enrollment: enr.rows[0],
      series,
    };
  };

  const result = externalClient
    ? await runner(externalClient)
    : await withTransaction(runner);

  // Send confirmation email asynchronously (outside of DB transaction)
  if (!result.alreadyFulfilled) {
    (async () => {
      try {
        const userRes = await query('SELECT name, email FROM users WHERE id = $1', [
          result.payment.user_id,
        ]);
        const user = userRes.rows[0];
        if (user?.email) {
          await sendEmail({
            to: user.email,
            subject: 'Payment confirmed — EDVEDUM Academy',
            html: `
              <div style="font-family: Arial, sans-serif; color: #1e293b; max-width: 600px; margin: 0 auto; padding: 24px;">
                <h2 style="color: #2563eb; margin-bottom: 8px;">Payment Successful!</h2>
                <p>Hi <strong>${user.name || 'Student'}</strong>,</p>
                <p>Your payment for <strong>${result.series.title || 'Test Series'}</strong> has been verified successfully.</p>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin: 20px 0;">
                  <p style="margin: 4px 0;"><strong>Order ID:</strong> ${result.payment.merchant_order_id || result.payment.id}</p>
                  <p style="margin: 4px 0;"><strong>Amount Paid:</strong> ₹${Number(result.payment.amount).toLocaleString('en-IN')}</p>
                  <p style="margin: 4px 0;"><strong>Payment Method:</strong> ${result.payment.provider || 'PhonePe'}</p>
                  <p style="margin: 4px 0;"><strong>Access Validity:</strong> ${result.series.validity_days || 365} Days</p>
                </div>
                <p>Your test series has been unlocked and is ready in your student portal.</p>
                <p style="margin-top: 32px; font-size: 12px; color: #64748b;">Thank you for choosing EDVEDUM Academy.</p>
              </div>
            `,
            text: `Payment confirmed for ${result.series.title || 'Test Series'}. Amount: ₹${result.payment.amount}. Log in to start practicing.`,
          });
        }
      } catch (emailErr) {
        logger?.warn?.(`[PaymentFulfillment] Confirmation email failed for user #${result.payment.user_id}: ${emailErr.message}`);
      }
    })();
  }

  return result;
};

/**
 * Safely marks an order as failed without overwriting an already successful order.
 */
export const markPaymentFailed = async ({
  paymentId,
  errorCode,
  errorMessage,
}) => {
  return await withTransaction(async (dbClient) => {
    const payRes = await dbClient.query(
      `SELECT id, status FROM payments WHERE id = $1 FOR UPDATE`,
      [paymentId]
    );

    if (!payRes.rowCount) return null;
    const payment = payRes.rows[0];

    // Never overwrite an already-successful payment with a failed status!
    if (payment.status === 'success') {
      return payment;
    }

    const updated = await dbClient.query(
      `UPDATE payments
       SET status = 'failed',
           fulfillment_status = 'failed',
           error_code = COALESCE($1, error_code),
           error_message = COALESCE($2, error_message),
           updated_at = NOW()
       WHERE id = $3
       RETURNING *`,
      [errorCode || 'PAYMENT_FAILED', errorMessage || 'Payment could not be completed', paymentId]
    );

    return updated.rows[0];
  });
};
