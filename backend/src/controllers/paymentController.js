import crypto from 'crypto';
import Razorpay from 'razorpay';
import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';
import { logger } from '../utils/logger.js';
import {
  getPhonePeClient,
  isPhonePeConfigured,
  StandardCheckoutPayRequest,
} from '../config/phonepe.js';
import {
  fulfillPaymentOrder,
  markPaymentFailed,
} from '../services/paymentFulfillmentService.js';

const getRazorpay = () => {
  if (!env.razorpay.keyId || !env.razorpay.keySecret) return null;
  return new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret });
};

/**
 * POST /api/payments/create-order or /api/payments/phonepe/initiate
 * Authenticates purchaser, verifies order ownership, calculates amount from DB,
 * checks for duplicates, and initiates PhonePe checkout.
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { test_series_id, coupon_code } = req.body;
  const userId = req.user.id;

  if (!test_series_id) {
    throw ApiError.badRequest('test_series_id is required');
  }

  // 1. Fetch test series from database
  const ts = await query(
    'SELECT * FROM test_series WHERE id = $1 AND is_active = true',
    [test_series_id]
  );
  if (!ts.rowCount) throw ApiError.notFound('Test series not found or inactive');
  const series = ts.rows[0];

  // 2. Prevent purchasing already enrolled test series
  const existingEnrollment = await query(
    `SELECT id FROM student_enrollments
     WHERE user_id = $1 AND test_series_id = $2 AND status = 'active' AND expires_at > NOW()`,
    [userId, test_series_id]
  );
  if (existingEnrollment.rowCount) {
    throw ApiError.conflict('You are already actively enrolled in this test series.');
  }

  // 3. Calculate amount strictly on backend from DB
  const basePrice = Number(series.price) || 0;
  let finalPrice = basePrice;
  let coupon = null;
  let discountAmount = 0;

  if (coupon_code && String(coupon_code).trim()) {
    const cRes = await query(
      `SELECT * FROM coupons
       WHERE UPPER(code) = UPPER($1)
         AND is_active = true
         AND (valid_until IS NULL OR valid_until > NOW())
         AND (max_uses IS NULL OR used_count < max_uses)`,
      [coupon_code.trim()]
    );
    if (!cRes.rowCount) {
      throw ApiError.badRequest('Invalid, expired, or fully used discount coupon');
    }
    coupon = cRes.rows[0];
    discountAmount =
      coupon.discount_type === 'fixed'
        ? Number(coupon.discount_value)
        : (basePrice * Number(coupon.discount_value)) / 100;
    discountAmount = Math.min(discountAmount, basePrice);
    finalPrice = Math.max(0, basePrice - discountAmount);
  }

  const amountPaise = Math.round(finalPrice * 100);

  // 4. Handle 100% Free / Zero Amount purchase
  if (amountPaise === 0) {
    const freeOrderId = `FREE_${test_series_id}_${userId}_${Date.now()}`;
    const payRes = await query(
      `INSERT INTO payments (
         user_id, test_series_id, amount, currency, status, fulfillment_status,
         provider, merchant_order_id, coupon_id, discount_amount
       ) VALUES ($1, $2, $3, 'INR', 'pending', 'pending', 'free', $4, $5, $6)
       RETURNING id`,
      [userId, test_series_id, finalPrice, freeOrderId, coupon ? coupon.id : null, discountAmount]
    );

    const fulfillment = await fulfillPaymentOrder({
      paymentId: payRes.rows[0].id,
      merchantOrderId: freeOrderId,
      providerPaymentId: `free_tx_${Date.now()}`,
      metadata: { couponCode: coupon?.code || null, isFree: true },
    });

    return res.json({
      free: true,
      provider: 'free',
      merchantOrderId: freeOrderId,
      ...fulfillment,
      message: coupon
        ? 'Enrolled successfully with 100% discount coupon!'
        : 'Enrolled successfully in free test series!',
    });
  }

  // 5. Concurrency & duplicate-click guard:
  // Check if a pending payment attempt was created for this user & series in the last 60 seconds
  const recentPending = await query(
    `SELECT * FROM payments
     WHERE user_id = $1
       AND test_series_id = $2
       AND status = 'pending'
       AND created_at >= NOW() - INTERVAL '60 seconds'
     ORDER BY created_at DESC
     LIMIT 1`,
    [userId, test_series_id]
  );

  if (recentPending.rowCount) {
    const pendingPayment = recentPending.rows[0];
    // If PhonePe order was already created, verify if it was already completed
    if (isPhonePeConfigured() && pendingPayment.merchant_order_id) {
      try {
        const client = getPhonePeClient();
        const check = await client.getOrderStatus(pendingPayment.merchant_order_id, false);
        if (check.state === 'COMPLETED') {
          const fulfilled = await fulfillPaymentOrder({
            paymentId: pendingPayment.id,
            merchantOrderId: pendingPayment.merchant_order_id,
            providerPaymentId: check.paymentDetails?.[0]?.transactionId || check.orderId,
            providerOrderId: check.orderId,
          });
          return res.json({
            verified: true,
            status: 'success',
            ...fulfilled,
            message: 'Payment already completed!',
          });
        }
      } catch (_) {}
    }
  }

  // 6. Generate unique, collision-proof merchant order ID
  // Format: EDV_<seriesId>_<userId>_<timestamp>_<randomHex> (<= 35 chars, alphanumeric & underscore)
  const randomSuffix = crypto.randomBytes(3).toString('hex');
  const merchantOrderId = `EDV_${test_series_id}_${userId}_${Date.now()}_${randomSuffix}`;

  // 7. Use PhonePe Standard Checkout if configured
  if (isPhonePeConfigured()) {
    try {
      const client = getPhonePeClient();

      // Determine client URL for post-payment browser redirection
      const clientHost = (env.clientUrl || '').split(',')[0].trim().replace(/\/$/, '') || 'https://edvedum.com';
      const redirectUrl = `${clientHost}/payment/status?merchantOrderId=${merchantOrderId}`;

      // Insert pending payment record into DB BEFORE contacting PhonePe
      const payInsert = await query(
        `INSERT INTO payments (
           user_id, test_series_id, amount, currency, status, fulfillment_status,
           provider, merchant_order_id, environment, coupon_id, discount_amount
         ) VALUES ($1, $2, $3, 'INR', 'pending', 'pending', 'phonepe', $4, $5, $6, $7)
         RETURNING id`,
        [
          userId,
          test_series_id,
          finalPrice,
          merchantOrderId,
          env.phonepe.env,
          coupon ? coupon.id : null,
          discountAmount,
        ]
      );
      const paymentRecordId = payInsert.rows[0].id;

      // Build PhonePe Standard Checkout Pay Request
      const payRequest = StandardCheckoutPayRequest.builder()
        .merchantOrderId(merchantOrderId)
        .amount(amountPaise)
        .redirectUrl(redirectUrl)
        .build();

      const phonePeResponse = await client.pay(payRequest);

      // Save PhonePe provider order ID
      await query(
        `UPDATE payments
         SET provider_order_id = $1,
             metadata = $2
         WHERE id = $3`,
        [
          phonePeResponse.orderId,
          JSON.stringify({
            phonepeState: phonePeResponse.state,
            expireAt: phonePeResponse.expireAt,
          }),
          paymentRecordId,
        ]
      );

      return res.json({
        provider: 'phonepe',
        redirectUrl: phonePeResponse.redirectUrl,
        checkoutUrl: phonePeResponse.redirectUrl,
        merchantOrderId,
        orderId: phonePeResponse.orderId,
        amount: amountPaise,
        currency: 'INR',
        series: {
          id: series.id,
          title: series.title,
          price: finalPrice,
          originalPrice: basePrice,
        },
      });
    } catch (phonePeError) {
      logger?.error?.(`[PhonePe Initiate Error] ${phonePeError.message}`);
      // Mark as initiation error if DB record was created
      await query(
        `UPDATE payments
         SET status = 'failed',
             fulfillment_status = 'failed',
             error_message = $1
         WHERE merchant_order_id = $2`,
        [phonePeError.message, merchantOrderId]
      ).catch(() => {});

      throw ApiError.badRequest(`PhonePe checkout initialization failed: ${phonePeError.message}`);
    }
  }

  // 8. Fallback to Razorpay if configured
  const rzp = getRazorpay();
  if (rzp) {
    const order = await rzp.orders.create({
      amount: amountPaise,
      currency: 'INR',
      receipt: `ts_${test_series_id}_u_${userId}_${Date.now()}`,
      notes: {
        test_series_id: String(test_series_id),
        user_id: String(userId),
        coupon_id: coupon ? String(coupon.id) : '',
      },
    });

    await query(
      `INSERT INTO payments (
         user_id, test_series_id, amount, currency, status, fulfillment_status,
         provider, razorpay_order_id, merchant_order_id, coupon_id, discount_amount
       ) VALUES ($1,$2,$3,'INR','pending','pending','razorpay',$4,$5,$6,$7)`,
      [
        userId,
        test_series_id,
        finalPrice,
        order.id,
        order.id,
        coupon ? coupon.id : null,
        discountAmount,
      ]
    );

    return res.json({
      provider: 'razorpay',
      orderId: order.id,
      amount: amountPaise,
      currency: 'INR',
      keyId: env.razorpay.keyId,
      series: {
        id: series.id,
        title: series.title,
        price: finalPrice,
        originalPrice: basePrice,
      },
    });
  }

  // 9. Dev mock mode if neither is configured and not in production
  if (!env.isProd) {
    const mockOrderId = `MOCK_${test_series_id}_${userId}_${Date.now()}`;
    const pay = await query(
      `INSERT INTO payments (
         user_id, test_series_id, amount, currency, status, fulfillment_status,
         provider, merchant_order_id, coupon_id, discount_amount
       ) VALUES ($1,$2,$3,'INR','pending','pending','mock',$4,$5,$6)
       RETURNING id`,
      [userId, test_series_id, finalPrice, mockOrderId, coupon ? coupon.id : null, discountAmount]
    );

    const result = await fulfillPaymentOrder({
      paymentId: pay.rows[0].id,
      merchantOrderId: mockOrderId,
      providerPaymentId: `mock_pay_${Date.now()}`,
      metadata: { isMock: true },
    });

    return res.json({
      mock: true,
      provider: 'mock',
      merchantOrderId: mockOrderId,
      ...result,
      message: 'Enrolled (dev mock payment mode)',
    });
  }

  throw ApiError.badRequest('Payment gateway is not configured. Please set PhonePe environment variables.');
});

/**
 * POST /api/payments/verify or /api/payments/phonepe/verify
 * Verifies payment on the backend using PhonePe Order Status API or Razorpay signature.
 * Enforces user ownership and atomic idempotent fulfillment.
 */
export const verifyPayment = asyncHandler(async (req, res) => {
  const { merchantOrderId, test_series_id, razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const userId = req.user.id;

  // Case A: PhonePe Verification
  if (merchantOrderId) {
    const payRes = await query(
      `SELECT * FROM payments WHERE merchant_order_id = $1 AND user_id = $2`,
      [merchantOrderId, userId]
    );

    if (!payRes.rowCount) {
      throw ApiError.notFound('Payment record not found for this user');
    }

    const payment = payRes.rows[0];

    // If already verified and fulfilled, return immediately (idempotent)
    if (payment.status === 'success' && payment.fulfillment_status === 'fulfilled') {
      const enrRes = await query(
        `SELECT * FROM student_enrollments WHERE user_id = $1 AND test_series_id = $2`,
        [userId, payment.test_series_id]
      );
      const tsRes = await query(
        `SELECT * FROM test_series WHERE id = $1`,
        [payment.test_series_id]
      );
      return res.json({
        verified: true,
        status: 'success',
        enrollment: enrRes.rows[0] || null,
        series: tsRes.rows[0] || null,
        message: 'Payment already verified and active.',
      });
    }

    if (!isPhonePeConfigured()) {
      throw ApiError.badRequest('PhonePe is not configured');
    }

    const client = getPhonePeClient();
    const orderStatus = await client.getOrderStatus(merchantOrderId, true);
    const state = (orderStatus.state || '').toUpperCase();

    if (state === 'COMPLETED') {
      // Validate expected amount in integer paise
      const expectedPaise = Math.round(Number(payment.amount) * 100);
      if (orderStatus.amount && orderStatus.amount !== expectedPaise) {
        logger?.warn?.(
          `[PhonePe Amount Mismatch] Order ${merchantOrderId}: expected ${expectedPaise}, got ${orderStatus.amount}`
        );
        throw ApiError.badRequest('Payment amount mismatch detected. Please contact support.');
      }

      const transactionId =
        orderStatus.paymentDetails?.[0]?.transactionId ||
        orderStatus.orderId ||
        `PHONEPE_${Date.now()}`;

      const fulfillment = await fulfillPaymentOrder({
        paymentId: payment.id,
        merchantOrderId: payment.merchant_order_id,
        providerPaymentId: transactionId,
        providerOrderId: orderStatus.orderId,
        metadata: {
          phonepeState: state,
          paymentDetails: orderStatus.paymentDetails || [],
        },
      });

      return res.json({
        verified: true,
        status: 'success',
        ...fulfillment,
      });
    }

    if (state === 'PENDING') {
      return res.json({
        verified: false,
        status: 'pending',
        message: 'Payment is pending confirmation from your bank. Please check again shortly.',
      });
    }

    // FAILED state
    await markPaymentFailed({
      paymentId: payment.id,
      errorCode: orderStatus.errorCode || 'PAYMENT_FAILED',
      errorMessage: orderStatus.detailedErrorCode || 'Payment failed or was cancelled by user',
    });

    return res.json({
      verified: false,
      status: 'failed',
      errorCode: orderStatus.errorCode || 'PAYMENT_FAILED',
      message: orderStatus.detailedErrorCode || 'Payment could not be completed.',
    });
  }

  // Case B: Legacy Razorpay Verification
  if (razorpay_order_id && razorpay_payment_id) {
    if (!env.razorpay.keySecret) {
      throw ApiError.badRequest('Razorpay gateway not configured');
    }

    const expected = crypto
      .createHmac('sha256', env.razorpay.keySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expected !== razorpay_signature) {
      throw ApiError.badRequest('Invalid payment signature');
    }

    const payRes = await query(
      `SELECT * FROM payments WHERE razorpay_order_id = $1 AND user_id = $2`,
      [razorpay_order_id, userId]
    );
    if (!payRes.rowCount) throw ApiError.notFound('Payment record not found');

    const payment = payRes.rows[0];
    const fulfillment = await fulfillPaymentOrder({
      paymentId: payment.id,
      merchantOrderId: payment.merchant_order_id,
      providerPaymentId: razorpay_payment_id,
      providerOrderId: razorpay_order_id,
      providerSignature: razorpay_signature,
    });

    return res.json({ verified: true, status: 'success', ...fulfillment });
  }

  throw ApiError.badRequest('Invalid verification parameters. Provide merchantOrderId or razorpay details.');
});

/**
 * GET /api/payments/status/:merchantOrderId
 * Returns the current stored payment status for a merchant order with user ownership check.
 */
export const getOrderStatus = asyncHandler(async (req, res) => {
  const { merchantOrderId } = req.params;
  const userId = req.user.id;

  const payRes = await query(
    `SELECT p.*, ts.title AS series_title, ts.slug AS series_slug, ts.validity_days
     FROM payments p
     LEFT JOIN test_series ts ON ts.id = p.test_series_id
     WHERE p.merchant_order_id = $1 AND (p.user_id = $2 OR $3 = 'admin')`,
    [merchantOrderId, userId, req.user.role]
  );

  if (!payRes.rowCount) {
    throw ApiError.notFound('Order not found');
  }

  const payment = payRes.rows[0];

  // If order is currently pending and PhonePe is configured, check live status once
  if (payment.status === 'pending' && isPhonePeConfigured()) {
    try {
      const client = getPhonePeClient();
      const status = await client.getOrderStatus(merchantOrderId, true);
      const state = (status.state || '').toUpperCase();

      if (state === 'COMPLETED') {
        const transactionId =
          status.paymentDetails?.[0]?.transactionId || status.orderId || `PHONEPE_${Date.now()}`;
        const fulfillment = await fulfillPaymentOrder({
          paymentId: payment.id,
          merchantOrderId: payment.merchant_order_id,
          providerPaymentId: transactionId,
          providerOrderId: status.orderId,
          metadata: { phonepeState: state, paymentDetails: status.paymentDetails || [] },
        });
        return res.json({
          order: {
            ...payment,
            status: 'success',
            fulfillment_status: 'fulfilled',
          },
          verified: true,
          fulfillment,
        });
      } else if (state === 'FAILED') {
        await markPaymentFailed({
          paymentId: payment.id,
          errorCode: status.errorCode || 'PAYMENT_FAILED',
          errorMessage: status.detailedErrorCode || 'Payment failed on PhonePe gateway',
        });
        return res.json({
          order: {
            ...payment,
            status: 'failed',
            fulfillment_status: 'failed',
          },
          verified: false,
        });
      }
    } catch (_) {}
  }

  res.json({
    order: {
      id: payment.id,
      merchantOrderId: payment.merchant_order_id,
      amount: payment.amount,
      currency: payment.currency,
      status: payment.status,
      fulfillment_status: payment.fulfillment_status,
      provider: payment.provider,
      seriesTitle: payment.series_title,
      seriesSlug: payment.series_slug,
      createdAt: payment.created_at,
      fulfilledAt: payment.fulfilled_at,
    },
  });
});

/**
 * POST /api/payments/phonepe/webhook
 * Public endpoint for PhonePe S2S callbacks.
 * Durably records event in payment_webhooks, validates signature/auth, and fulfills order idempotently.
 */
export const phonepeWebhook = async (req, res) => {
  const authorizationHeader =
    req.headers['authorization'] ||
    req.headers['x-verify'] ||
    req.headers['x-callback-authorization'] ||
    '';

  // Support both raw Buffer body and parsed body
  const rawBodyString = Buffer.isBuffer(req.body)
    ? req.body.toString('utf8')
    : typeof req.body === 'string'
    ? req.body
    : JSON.stringify(req.body);

  let payload = {};
  try {
    payload = JSON.parse(rawBodyString);
  } catch (parseErr) {
    logger?.warn?.(`[PhonePe Webhook] Failed to parse body: ${parseErr.message}`);
  }

  const merchantOrderId = payload.payload?.merchantOrderId || payload.merchantOrderId || null;
  const providerOrderId = payload.payload?.orderId || payload.orderId || null;
  const eventType = payload.type || payload.event || 'UNKNOWN';

  // 1. Durably record webhook event in database immediately
  let webhookLogId = null;
  try {
    const logRes = await query(
      `INSERT INTO payment_webhooks (
         provider, event_type, merchant_order_id, provider_order_id,
         payload, headers, signature, is_valid, processed
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       RETURNING id`,
      [
        'phonepe',
        eventType,
        merchantOrderId,
        providerOrderId,
        JSON.stringify(payload),
        JSON.stringify(req.headers),
        authorizationHeader,
        true,
        false,
      ]
    );
    webhookLogId = logRes.rows[0]?.id;
  } catch (dbErr) {
    logger?.error?.(`[PhonePe Webhook] Could not insert log record: ${dbErr.message}`);
  }

  // 2. Validate webhook credentials
  const webhookUser = env.phonepe.webhookUsername;
  const webhookPass = env.phonepe.webhookPassword;

  if (webhookUser && webhookPass) {
    try {
      const client = getPhonePeClient();
      client.validateCallback(webhookUser, webhookPass, authorizationHeader, rawBodyString);
    } catch (valErr) {
      logger?.warn?.(`[PhonePe Webhook] Callback validation failed: ${valErr.message}`);
      if (webhookLogId) {
        await query(
          `UPDATE payment_webhooks
           SET is_valid = false, processing_error = $1
           WHERE id = $2`,
          [`Validation failed: ${valErr.message}`, webhookLogId]
        ).catch(() => {});
      }
      return res.status(401).json({ message: 'Invalid webhook authorization' });
    }
  }

  // 3. Process payment status from callback
  if (!merchantOrderId) {
    return res.status(400).json({ message: 'merchantOrderId missing from webhook payload' });
  }

  try {
    const payRes = await query(
      `SELECT * FROM payments WHERE merchant_order_id = $1`,
      [merchantOrderId]
    );

    if (!payRes.rowCount) {
      logger?.warn?.(`[PhonePe Webhook] Order ${merchantOrderId} not found in DB`);
      if (webhookLogId) {
        await query(
          `UPDATE payment_webhooks SET processing_error = 'Order not found' WHERE id = $1`,
          [webhookLogId]
        ).catch(() => {});
      }
      return res.json({ received: true, note: 'Order not found locally' });
    }

    const payment = payRes.rows[0];
    const callbackData = payload.payload || payload;
    const state = (callbackData.state || '').toUpperCase();

    // Do NOT let a failed or pending notification overwrite a verified successful payment
    if (payment.status === 'success' && payment.fulfillment_status === 'fulfilled') {
      logger?.info?.(`[PhonePe Webhook] Order ${merchantOrderId} already fulfilled. Skipping duplicate.`);
      if (webhookLogId) {
        await query(
          `UPDATE payment_webhooks SET processed = true, processed_at = NOW() WHERE id = $1`,
          [webhookLogId]
        ).catch(() => {});
      }
      return res.json({ received: true });
    }

    if (state === 'COMPLETED' || eventType === 'CHECKOUT_ORDER_COMPLETED' || eventType === 'PG_ORDER_COMPLETED') {
      const transactionId =
        callbackData.paymentDetails?.[0]?.transactionId ||
        callbackData.orderId ||
        `PHONEPE_WH_${Date.now()}`;

      await fulfillPaymentOrder({
        paymentId: payment.id,
        merchantOrderId,
        providerPaymentId: transactionId,
        providerOrderId: callbackData.orderId,
        metadata: {
          webhookProcessedAt: new Date().toISOString(),
          phonepeState: state,
          paymentDetails: callbackData.paymentDetails || [],
        },
      });

      logger?.info?.(`[PhonePe Webhook] Order ${merchantOrderId} fulfilled successfully.`);
    } else if (state === 'FAILED' || eventType === 'CHECKOUT_ORDER_FAILED' || eventType === 'PG_ORDER_FAILED') {
      await markPaymentFailed({
        paymentId: payment.id,
        errorCode: callbackData.errorCode || 'PAYMENT_FAILED',
        errorMessage: callbackData.detailedErrorCode || 'Payment failed via webhook notification',
      });
      logger?.info?.(`[PhonePe Webhook] Order ${merchantOrderId} marked failed.`);
    }

    if (webhookLogId) {
      await query(
        `UPDATE payment_webhooks SET processed = true, processed_at = NOW() WHERE id = $1`,
        [webhookLogId]
      ).catch(() => {});
    }

    return res.json({ received: true, status: 'SUCCESS' });
  } catch (processErr) {
    logger?.error?.(`[PhonePe Webhook] Processing error: ${processErr.message}`);
    if (webhookLogId) {
      await query(
        `UPDATE payment_webhooks SET processing_error = $1 WHERE id = $2`,
        [processErr.message, webhookLogId]
      ).catch(() => {});
    }
    return res.status(500).json({ message: 'Internal error processing webhook' });
  }
};

/**
 * POST /api/payments/webhook — Legacy Razorpay (raw body)
 */
export const razorpayWebhook = async (req, res) => {
  try {
    const signature = req.headers['x-razorpay-signature'];
    const secret = env.razorpay.webhookSecret || env.razorpay.keySecret;
    if (!secret) return res.status(400).json({ message: 'Webhook not configured' });

    const expected = crypto.createHmac('sha256', secret).update(req.body).digest('hex');
    if (expected !== signature) return res.status(400).json({ message: 'Invalid signature' });

    const event = JSON.parse(req.body.toString());
    if (event.event === 'payment.captured') {
      const paymentEntity = event.payload.payment.entity;
      const payRes = await query(
        `SELECT * FROM payments WHERE razorpay_order_id = $1 AND status = 'pending'`,
        [paymentEntity.order_id]
      );
      if (payRes.rowCount) {
        await fulfillPaymentOrder({
          paymentId: payRes.rows[0].id,
          providerPaymentId: paymentEntity.id,
          providerOrderId: paymentEntity.order_id,
        });
      }
    }
    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/payments/history — student view
 */
export const paymentHistory = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT p.*,
            ts.title AS series_title,
            ts.slug AS series_slug,
            ts.validity_days
     FROM payments p
     LEFT JOIN test_series ts ON ts.id = p.test_series_id
     WHERE p.user_id = $1
     ORDER BY p.created_at DESC`,
    [req.user.id]
  );
  res.json({ payments: result.rows });
});

/**
 * GET /api/payments/admin — admin revenue & transactions
 */
export const adminPayments = asyncHandler(async (_req, res) => {
  const [payments, revenue] = await Promise.all([
    query(
      `SELECT p.*,
              ts.title AS series_title,
              u.name AS user_name,
              u.email AS user_email
       FROM payments p
       JOIN users u ON u.id = p.user_id
       LEFT JOIN test_series ts ON ts.id = p.test_series_id
       WHERE u.name IS NOT NULL
       ORDER BY p.created_at DESC
       LIMIT 200`
    ),
    query(
      `SELECT COALESCE(SUM(p.amount) FILTER (WHERE p.status = 'success'), 0)::numeric AS total,
              COUNT(*) FILTER (WHERE p.status = 'success')::int AS successful,
              COUNT(*)::int AS total_orders,
              COUNT(*) FILTER (WHERE p.provider = 'phonepe')::int AS phonepe_orders,
              COUNT(*) FILTER (WHERE p.status = 'pending')::int AS pending_orders,
              COUNT(*) FILTER (WHERE p.status = 'failed')::int AS failed_orders
       FROM payments p
       JOIN users u ON u.id = p.user_id`
    ),
  ]);
  res.json({ payments: payments.rows, summary: revenue.rows[0] });
});
