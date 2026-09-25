import cron from 'node-cron';
import { query } from '../config/db.js';
import { getPhonePeClient, isPhonePeConfigured } from '../config/phonepe.js';
import { fulfillPaymentOrder, markPaymentFailed } from '../services/paymentFulfillmentService.js';
import { logger } from '../utils/logger.js';

let isReconciling = false;

/**
 * Reconciles unresolved pending payments with PhonePe's server-side Order Status API.
 * Ensures fulfillment is completed even if the user closed their browser or webhooks were delayed.
 */
export const reconcilePendingPayments = async () => {
  if (isReconciling) {
    logger?.info?.('[ReconcilePayments] Skipping run, previous reconciliation still in progress.');
    return { skipped: true };
  }

  if (!isPhonePeConfigured()) {
    return { skipped: true, reason: 'PhonePe not configured' };
  }

  isReconciling = true;
  let reconciledCount = 0;
  let failedCount = 0;

  try {
    const client = getPhonePeClient();

    // 1. Find pending payments created between 3 minutes ago and 24 hours ago
    const pendingRes = await query(
      `SELECT * FROM payments
       WHERE provider = 'phonepe'
         AND status = 'pending'
         AND merchant_order_id IS NOT NULL
         AND created_at <= NOW() - INTERVAL '3 minutes'
         AND created_at >= NOW() - INTERVAL '24 hours'
       ORDER BY created_at ASC
       LIMIT 50`
    );

    for (const payment of pendingRes.rows) {
      try {
        const orderStatus = await client.getOrderStatus(payment.merchant_order_id, true);
        const state = (orderStatus.state || '').toUpperCase();

        if (state === 'COMPLETED') {
          const transactionId =
            orderStatus.paymentDetails?.[0]?.transactionId ||
            orderStatus.orderId ||
            `PHONEPE_REC_${Date.now()}`;

          await fulfillPaymentOrder({
            paymentId: payment.id,
            merchantOrderId: payment.merchant_order_id,
            providerPaymentId: transactionId,
            providerOrderId: orderStatus.orderId,
            metadata: {
              reconciledAt: new Date().toISOString(),
              phonepeState: state,
              paymentDetails: orderStatus.paymentDetails || [],
            },
          });
          reconciledCount++;
          logger?.info?.(
            `[ReconcilePayments] Successfully fulfilled order ${payment.merchant_order_id} via PhonePe reconciliation.`
          );
        } else if (state === 'FAILED') {
          await markPaymentFailed({
            paymentId: payment.id,
            errorCode: orderStatus.errorCode || 'PAYMENT_FAILED',
            errorMessage: orderStatus.detailedErrorCode || 'Payment failed on PhonePe gateway',
          });
          failedCount++;
          logger?.info?.(
            `[ReconcilePayments] Marked order ${payment.merchant_order_id} as failed.`
          );
        }
      } catch (err) {
        logger?.warn?.(
          `[ReconcilePayments] Failed checking status for order ${payment.merchant_order_id}: ${err.message}`
        );
      }
    }

    // 2. Retry any payments that are marked success but where fulfillment failed previously
    const unfulfilledRes = await query(
      `SELECT * FROM payments
       WHERE status = 'success'
         AND fulfillment_status != 'fulfilled'
       ORDER BY created_at ASC
       LIMIT 20`
    );

    for (const payment of unfulfilledRes.rows) {
      try {
        await fulfillPaymentOrder({
          paymentId: payment.id,
          merchantOrderId: payment.merchant_order_id,
          providerPaymentId: payment.provider_payment_id || payment.razorpay_payment_id,
        });
        logger?.info?.(
          `[ReconcilePayments] Successfully re-fulfilled stuck payment #${payment.id}.`
        );
      } catch (err) {
        logger?.warn?.(
          `[ReconcilePayments] Could not fulfill stuck payment #${payment.id}: ${err.message}`
        );
      }
    }

    return { reconciledCount, failedCount };
  } catch (err) {
    logger?.error?.(`[ReconcilePayments] Reconciliation cycle error: ${err.message}`);
    return { error: err.message };
  } finally {
    isReconciling = false;
  }
};

/**
 * Initializes cron schedule for background payment reconciliation.
 * Runs every 5 minutes.
 */
export const startPaymentReconciliationCron = () => {
  // Run every 5 minutes
  cron.schedule('*/5 * * * *', async () => {
    try {
      await reconcilePendingPayments();
    } catch (e) {
      logger?.error?.(`[ReconcilePayments Cron Error] ${e.message}`);
    }
  });

  logger?.info?.('[ReconcilePayments] Background payment reconciliation cron registered (every 5 mins).');
};
