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
import { toPaise, requireDate, requireRequestKey } from '../utils/paymentValidation.js';

const getRazorpay = () => {
  if (!env.razorpay.keyId || !env.razorpay.keySecret) return null;
  return new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret });
};

const validPaymentModes = ['cash', 'direct_upi', 'bank_transfer', 'other'];

const getEnrollmentFeeSummaries = async ({ userId = null, enrollmentId = null } = {}) => {
  const result = await query(
    `SELECT
       se.id AS enrollment_id,
       se.user_id,
       se.test_series_id,
       se.status AS enrollment_status,
       u.name AS user_name,
       u.email AS user_email,
       sp.phone AS user_phone,
       ts.title AS series_title,
       ts.slug AS series_slug,
       mf.id AS fee_record_id,
       mf.agreed_fee_paise,
       mf.next_due_date,
       mf.notes AS fee_notes,
       COALESCE(online.online_paid_paise, 0)::bigint AS online_paid_paise,
       COALESCE(online.phonepe_paid_paise, 0)::bigint AS phonepe_paid_paise,
       COALESCE(online.online_payment_count, 0)::int AS online_payment_count,
       COALESCE(manual.manual_paid_paise, 0)::bigint AS manual_paid_paise,
       COALESCE(manual.manual_payment_count, 0)::int AS manual_payment_count,
       GREATEST(online.last_online_payment_date, manual.last_manual_payment_date) AS last_payment_date,
       COALESCE(history.entries, '[]'::json) AS history,
       CASE
         WHEN online.online_payment_count > 0 AND manual.manual_paid_paise > 0 THEN 'mixed'
         WHEN online.online_payment_count > 0 THEN 'online'
         ELSE 'manual'
       END AS source,
       COALESCE(
         mf.agreed_fee_paise,
         NULLIF(online.online_paid_paise, 0),
         ROUND(ts.price * 100)::bigint,
         0
       ) AS total_fee_paise
     FROM student_enrollments se
     JOIN users u ON u.id = se.user_id
     LEFT JOIN student_profiles sp ON sp.user_id = u.id
     JOIN test_series ts ON ts.id = se.test_series_id
     LEFT JOIN manual_fee_records mf ON mf.enrollment_id = se.id
     LEFT JOIN LATERAL (
       SELECT
         SUM(ROUND(p.amount * 100)::bigint) AS online_paid_paise,
         SUM(ROUND(p.amount * 100)::bigint) FILTER (WHERE p.provider = 'phonepe') AS phonepe_paid_paise,
         COUNT(*)::int AS online_payment_count,
         MAX(p.created_at::date) AS last_online_payment_date
       FROM payments p
       WHERE p.enrollment_id = se.id AND p.status = 'success'
     ) online ON TRUE
     LEFT JOIN LATERAL (
       SELECT
         SUM(e.amount_paise)::bigint AS manual_paid_paise,
         COUNT(*) FILTER (WHERE e.entry_type = 'payment')::int AS manual_payment_count,
         MAX(e.paid_at) FILTER (
           WHERE e.entry_type = 'payment'
             AND NOT EXISTS (
               SELECT 1 FROM manual_payment_entries reversal
               WHERE reversal.reversed_entry_id = e.id
             )
         ) AS last_manual_payment_date
       FROM manual_payment_entries e
       WHERE e.fee_record_id = mf.id
     ) manual ON TRUE
     LEFT JOIN LATERAL (
       SELECT json_agg(
         json_build_object(
           'id', h.id,
           'source', h.source,
           'entry_type', h.entry_type,
           'amount_paise', h.amount_paise,
           'payment_date', h.payment_date,
           'payment_mode', h.payment_mode,
           'reference', h.reference,
           'notes', h.notes,
           'correction_reason', h.correction_reason,
           'reversed_entry_id', h.reversed_entry_id,
           'replaces_entry_id', h.replaces_entry_id,
           'admin_name', h.admin_name,
           'provider', h.provider,
           'status', h.status
         ) ORDER BY h.sort_date DESC, h.id DESC
       ) AS entries
       FROM (
         SELECT
           p.id,
           'online'::text AS source,
           'payment'::text AS entry_type,
           ROUND(p.amount * 100)::bigint AS amount_paise,
           p.created_at::date AS payment_date,
           NULL::text AS payment_mode,
           COALESCE(p.provider_payment_id, p.merchant_order_id, p.razorpay_payment_id)::text AS reference,
           NULL::text AS notes,
           NULL::text AS correction_reason,
           NULL::bigint AS reversed_entry_id,
           NULL::bigint AS replaces_entry_id,
           NULL::text AS admin_name,
           p.provider::text AS provider,
           p.status::text AS status,
           p.created_at AS sort_date
         FROM payments p
         WHERE p.enrollment_id = se.id AND p.status = 'success'
         UNION ALL
         SELECT
           e.id,
           'manual'::text AS source,
           e.entry_type,
           e.amount_paise,
           e.paid_at AS payment_date,
           e.payment_mode,
           e.reference,
           e.notes,
           e.correction_reason,
           e.reversed_entry_id,
           e.replaces_entry_id,
           admin_user.name AS admin_name,
           NULL::text AS provider,
           e.entry_type::text AS status,
           COALESCE(e.paid_at::timestamp, e.created_at) AS sort_date
         FROM manual_payment_entries e
         JOIN manual_fee_records record ON record.id = e.fee_record_id
         JOIN users admin_user ON admin_user.id = e.admin_id
         WHERE record.enrollment_id = se.id
       ) h
     ) history ON TRUE
     WHERE (online.online_payment_count > 0 OR mf.id IS NOT NULL)
       AND ($1::integer IS NULL OR se.user_id = $1)
       AND ($2::integer IS NULL OR se.id = $2)
     ORDER BY COALESCE(history.entries->0->>'payment_date', se.purchased_at::date::text) DESC, se.id DESC`,
    [userId, enrollmentId]
  );

  return result.rows.map((row) => {
    const onlinePaid = Number(row.online_paid_paise || 0);
    const manualPaid = Number(row.manual_paid_paise || 0);
    const totalPaid = onlinePaid + manualPaid;
    const totalFee = Number(row.total_fee_paise || 0);
    const remainingFee = Math.max(totalFee - totalPaid, 0);
    return {
      ...row,
      is_fee_summary: true,
      total_fee_paise: totalFee,
      online_paid_paise: onlinePaid,
      phonepe_paid_paise: Number(row.phonepe_paid_paise || 0),
      manual_paid_paise: manualPaid,
      total_paid_paise: totalPaid,
      remaining_fee_paise: remainingFee,
      source: Number(row.online_payment_count || 0) > 0 && manualPaid > 0
        ? 'mixed'
        : Number(row.online_payment_count || 0) > 0
          ? 'online'
          : 'manual',
      status: totalPaid >= totalFee ? 'fully_paid' : totalPaid > 0 ? 'partially_paid' : 'unpaid',
      history: Array.isArray(row.history) ? row.history : [],
    };
  });
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
  const [result, feeSummaries] = await Promise.all([
    query(
      `SELECT p.*,
              ts.title AS series_title,
              ts.slug AS series_slug,
              ts.validity_days
       FROM payments p
       LEFT JOIN test_series ts ON ts.id = p.test_series_id
       WHERE p.user_id = $1
       ORDER BY p.created_at DESC`,
      [req.user.id]
    ),
    getEnrollmentFeeSummaries({ userId: req.user.id }),
  ]);
  res.json({ payments: result.rows, fee_summaries: feeSummaries });
});

/**
 * GET /api/payments/admin — admin revenue & transactions
 */
export const adminPayments = asyncHandler(async (_req, res) => {
  const [feeSummaries, attempts, revenue, unmatchedRevenue] = await Promise.all([
    getEnrollmentFeeSummaries(),
    query(
      `SELECT p.*,
              p.enrollment_id,
              ROUND(p.amount * 100)::bigint AS amount_paise,
              'online'::text AS source,
              false AS is_fee_summary,
              NULL::bigint AS total_fee_paise,
              NULL::bigint AS total_paid_paise,
              NULL::bigint AS remaining_fee_paise,
              NULL::date AS next_due_date,
              NULL::date AS last_payment_date,
              CASE WHEN p.status = 'success' THEN 'fully_paid' ELSE p.status END AS fee_status,
              ts.title AS series_title,
              ts.slug AS series_slug,
              u.name AS user_name,
              u.email AS user_email,
              sp.phone AS user_phone
       FROM payments p
       JOIN users u ON u.id = p.user_id
       LEFT JOIN student_profiles sp ON sp.user_id = u.id
       LEFT JOIN test_series ts ON ts.id = p.test_series_id
       WHERE u.name IS NOT NULL
         AND (p.status <> 'success' OR p.enrollment_id IS NULL)
       ORDER BY p.created_at DESC
       LIMIT 500`
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
    query(
      `SELECT
         COALESCE(SUM(ROUND(amount * 100)::bigint) FILTER (WHERE status = 'success'), 0)::bigint AS total_paise,
         COALESCE(SUM(ROUND(amount * 100)::bigint) FILTER (WHERE status = 'success' AND provider = 'phonepe'), 0)::bigint AS phonepe_paise
       FROM payments
       WHERE enrollment_id IS NULL`
    ),
  ]);
  const unmatchedOnline = Number(unmatchedRevenue.rows[0]?.total_paise || 0);
  const unmatchedPhonePe = Number(unmatchedRevenue.rows[0]?.phonepe_paise || 0);
  const onlineCollection = feeSummaries.reduce((total, item) => total + item.online_paid_paise, 0);
  const phonepeCollection = feeSummaries.reduce((total, item) => total + item.phonepe_paid_paise, 0);
  const manualCollection = feeSummaries.reduce((total, item) => total + item.manual_paid_paise, 0);
  const outstanding = feeSummaries.reduce((total, item) => total + item.remaining_fee_paise, 0);

  res.json({
    payments: [
       ...feeSummaries,
       ...attempts.rows.map((row) => ({
         ...row,
         status: row.status === 'success' ? 'fully_paid' : row.status,
         source: 'online',
       })),
    ],
    summary: {
       ...revenue.rows[0],
       total: (onlineCollection + unmatchedOnline + manualCollection) / 100,
       collected_paise: onlineCollection + unmatchedOnline + manualCollection,
       online_collected_paise: onlineCollection + unmatchedOnline,
       phonepe_collected_paise: phonepeCollection + unmatchedPhonePe,
       manual_collected_paise: manualCollection,
       outstanding_paise: outstanding,
       fee_records: feeSummaries.length,
    },
  });
});

/**
 * GET /api/payments/admin/options — registered students and courses for manual billing.
 */
export const adminManualPaymentOptions = asyncHandler(async (_req, res) => {
  const [students, courses, existing] = await Promise.all([
    query(
       `SELECT u.id, u.name, u.email, sp.phone
        FROM users u
        LEFT JOIN student_profiles sp ON sp.user_id = u.id
        WHERE u.role::text IN ('candidate', 'student')
        ORDER BY LOWER(u.name), u.id`
    ),
    query(
       `SELECT id, title, price, validity_days, is_active
        FROM test_series
        ORDER BY is_active DESC, display_order ASC, LOWER(title)`
    ),
    query(
       `SELECT se.user_id, se.test_series_id
        FROM manual_fee_records mf
        JOIN student_enrollments se ON se.id = mf.enrollment_id`
    ),
  ]);
  res.json({
    students: students.rows,
    courses: courses.rows,
    existing_manual_records: existing.rows,
  });
});

/**
 * GET /api/payments/admin/manual/:id — summary and immutable payment/audit history.
 */
export const adminManualPaymentDetail = asyncHandler(async (req, res) => {
  const feeRecordId = Number(req.params.id);
  if (!Number.isSafeInteger(feeRecordId) || feeRecordId <= 0) {
    throw ApiError.badRequest('Invalid manual fee record id');
  }
  const result = await query(
    `SELECT mf.*, se.user_id, se.test_series_id,
             u.name AS user_name, u.email AS user_email,
             ts.title AS series_title
     FROM manual_fee_records mf
     JOIN student_enrollments se ON se.id = mf.enrollment_id
     JOIN users u ON u.id = se.user_id
     JOIN test_series ts ON ts.id = se.test_series_id
     WHERE mf.id = $1`,
    [feeRecordId]
  );
  if (!result.rowCount) throw ApiError.notFound('Manual fee record not found');
  const summary = (await getEnrollmentFeeSummaries({ enrollmentId: result.rows[0].enrollment_id }))[0];
  res.json({ payment: { ...result.rows[0], ...summary } });
});

/**
 * POST /api/payments/admin/manual — create one fee record and its initial installment atomically.
 */
export const adminCreateManualPayment = asyncHandler(async (req, res) => {
  const userId = Number(req.body.user_id);
  const testSeriesId = Number(req.body.test_series_id);
  if (!Number.isSafeInteger(userId) || userId <= 0 || !Number.isSafeInteger(testSeriesId) || testSeriesId <= 0) {
    throw ApiError.badRequest('A registered student and course are required');
  }
  const agreedFeePaise = toPaise(req.body.total_fee, 'Total agreed fee');
  const receivedPaise = toPaise(req.body.amount_received ?? '0', 'Amount received now', { allowZero: true });
  if (receivedPaise > agreedFeePaise) {
    throw ApiError.badRequest('Amount received now cannot exceed the total agreed fee');
  }
  const paidAt = receivedPaise > 0 ? requireDate(req.body.payment_date, 'Payment date') : null;
  const paymentMode = receivedPaise > 0 ? String(req.body.payment_mode || '') : null;
  if (receivedPaise > 0 && !validPaymentModes.includes(paymentMode)) {
    throw ApiError.badRequest('Select a valid payment mode');
  }
  const requestKey = requireRequestKey(req.body.request_key);
  const nextDueDate = requireDate(req.body.next_due_date, 'Next payment due date', { optional: true });
  const reference = String(req.body.reference || '').trim().slice(0, 160);
  const notes = String(req.body.notes || '').trim().slice(0, 2000);

  const existingRequest = await query(
    `SELECT mf.id, mf.enrollment_id, se.user_id, se.test_series_id
     FROM manual_fee_records mf
     JOIN student_enrollments se ON se.id = mf.enrollment_id
     WHERE mf.create_request_key = $1`,
    [requestKey]
  );
  if (existingRequest.rowCount) {
    if (Number(existingRequest.rows[0].user_id) !== userId || Number(existingRequest.rows[0].test_series_id) !== testSeriesId) {
      throw ApiError.conflict('This request key has already been used for another fee record');
    }
    const summary = (await getEnrollmentFeeSummaries({ enrollmentId: existingRequest.rows[0].enrollment_id }))[0];
    return res.status(200).json({ success: true, duplicate: true, payment: summary });
  }

  const result = await withTransaction(async (client) => {
    await client.query('SELECT pg_advisory_xact_lock($1::integer, $2::integer)', [userId, testSeriesId]);
    const [student, course] = await Promise.all([
       client.query(
         `SELECT id FROM users WHERE id = $1 AND role::text IN ('candidate', 'student') FOR SHARE`,
         [userId]
       ),
       client.query(
         `SELECT id, validity_days FROM test_series WHERE id = $1 FOR SHARE`,
         [testSeriesId]
       ),
    ]);
    if (!student.rowCount) throw ApiError.notFound('Registered student not found');
    if (!course.rowCount) throw ApiError.notFound('Course not found');

    const pending = await client.query(
       `SELECT id FROM payments
        WHERE user_id = $1 AND test_series_id = $2
          AND status = 'pending' AND provider IN ('phonepe', 'razorpay')
        LIMIT 1`,
       [userId, testSeriesId]
    );
    if (pending.rowCount) {
       throw ApiError.conflict('This student has a pending online payment for this course. Reconcile it before recording a manual fee.');
    }

    const validityDays = Number(course.rows[0].validity_days) || 365;
    const enrollment = await client.query(
       `INSERT INTO student_enrollments (user_id, test_series_id, status, purchased_at, expires_at)
        VALUES ($1, $2, 'active', NOW(), NOW() + ($3::text || ' days')::interval)
        ON CONFLICT (user_id, test_series_id)
        DO UPDATE SET
          status = 'active',
          expires_at = CASE
            WHEN student_enrollments.status <> 'active' OR student_enrollments.expires_at <= NOW()
            THEN EXCLUDED.expires_at
            ELSE student_enrollments.expires_at
          END
        RETURNING id`,
       [userId, testSeriesId, validityDays]
    );
    const enrollmentId = enrollment.rows[0]?.id;
    if (!enrollmentId) throw ApiError.internal('Unable to create or locate course enrollment');

    const onlineResult = await client.query(
       `SELECT COALESCE(SUM(ROUND(amount * 100)::bigint), 0)::bigint AS paid
        FROM payments
        WHERE enrollment_id = $1 AND status = 'success'`,
       [enrollmentId]
    );
    const onlinePaidPaise = Number(onlineResult.rows[0].paid || 0);
    if (onlinePaidPaise + receivedPaise > agreedFeePaise) {
       throw ApiError.badRequest('The amount received would exceed the remaining fee after verified online payments');
    }

    const feeRecord = await client.query(
       `INSERT INTO manual_fee_records (
          enrollment_id, agreed_fee_paise, next_due_date, notes,
          create_request_key, created_by_id, updated_by_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $6)
        ON CONFLICT (enrollment_id) DO NOTHING
        RETURNING *`,
       [enrollmentId, agreedFeePaise, nextDueDate, notes, requestKey, req.user.id]
    );
    if (!feeRecord.rowCount) {
       const idempotent = await client.query(
         'SELECT id FROM manual_fee_records WHERE create_request_key = $1 AND enrollment_id = $2',
         [requestKey, enrollmentId]
       );
       if (idempotent.rowCount) return { enrollmentId, duplicate: true };
       const duplicate = await client.query(
         'SELECT id FROM manual_fee_records WHERE enrollment_id = $1',
         [enrollmentId]
       );
       if (duplicate.rowCount) throw ApiError.conflict('A manual fee record already exists for this student and course');
       throw ApiError.conflict('A manual fee record already exists for this enrollment');
    }

    if (receivedPaise > 0) {
       await client.query(
         `INSERT INTO manual_payment_entries (
            fee_record_id, entry_type, amount_paise, payment_mode, paid_at, reference,
            notes, idempotency_key, admin_id
          ) VALUES ($1, 'payment', $2, $3, $4, $5, $6, $7, $8)`,
         [
           feeRecord.rows[0].id,
           receivedPaise,
           paymentMode,
           paidAt,
           reference || null,
           notes,
           `${requestKey}:initial`,
           req.user.id,
         ]
       );
    }
    await client.query(
       'UPDATE manual_fee_records SET updated_at = NOW(), updated_by_id = $1 WHERE id = $2',
       [req.user.id, feeRecord.rows[0].id]
    );
    return { enrollmentId, duplicate: false };
  });

  const summary = (await getEnrollmentFeeSummaries({ enrollmentId: result.enrollmentId }))[0];
  res.status(result.duplicate ? 200 : 201).json({ success: true, duplicate: result.duplicate, payment: summary });
});

/**
 * POST /api/payments/admin/manual/:id/installments — append an immutable installment.
 */
export const adminAddManualInstallment = asyncHandler(async (req, res) => {
  const feeRecordId = Number(req.params.id);
  if (!Number.isSafeInteger(feeRecordId) || feeRecordId <= 0) {
    throw ApiError.badRequest('Invalid manual fee record id');
  }
  const requestKey = requireRequestKey(req.body.request_key);
  const amountPaise = toPaise(req.body.amount_received, 'New Amount Received');
  const paidAt = requireDate(req.body.payment_date, 'Payment date');
  const paymentMode = String(req.body.payment_mode || '');
  if (!validPaymentModes.includes(paymentMode)) throw ApiError.badRequest('Select a valid payment mode');
  const reference = String(req.body.reference || '').trim().slice(0, 160);
  const notes = String(req.body.notes || '').trim().slice(0, 2000);

  const duplicate = await query(
    'SELECT fee_record_id FROM manual_payment_entries WHERE idempotency_key = $1',
    [requestKey]
  );
  if (duplicate.rowCount) {
    if (Number(duplicate.rows[0].fee_record_id) !== feeRecordId) {
       throw ApiError.conflict('This request key has already been used for another payment');
    }
    const summary = (await query('SELECT enrollment_id FROM manual_fee_records WHERE id = $1', [feeRecordId]));
    const payment = summary.rowCount
       ? (await getEnrollmentFeeSummaries({ enrollmentId: summary.rows[0].enrollment_id }))[0]
       : null;
    return res.status(200).json({ success: true, duplicate: true, payment });
  }

  const enrollmentId = await withTransaction(async (client) => {
    const recordResult = await client.query(
       `SELECT mf.*, se.user_id, se.test_series_id
        FROM manual_fee_records mf
        JOIN student_enrollments se ON se.id = mf.enrollment_id
        WHERE mf.id = $1
        FOR UPDATE OF mf, se`,
       [feeRecordId]
    );
    if (!recordResult.rowCount) throw ApiError.notFound('Manual fee record not found');
    const record = recordResult.rows[0];
    const duplicateWithinTransaction = await client.query(
      'SELECT fee_record_id FROM manual_payment_entries WHERE idempotency_key = $1',
      [requestKey]
    );
    if (duplicateWithinTransaction.rowCount) {
      if (Number(duplicateWithinTransaction.rows[0].fee_record_id) !== feeRecordId) {
        throw ApiError.conflict('This request key has already been used for another payment');
      }
      return { enrollmentId: record.enrollment_id, duplicate: true };
    }
    const [onlineResult, manualResult] = await Promise.all([
       client.query(
         `SELECT COALESCE(SUM(ROUND(amount * 100)::bigint), 0)::bigint AS paid
          FROM payments WHERE enrollment_id = $1 AND status = 'success'`,
         [record.enrollment_id]
       ),
       client.query(
         'SELECT COALESCE(SUM(amount_paise), 0)::bigint AS paid FROM manual_payment_entries WHERE fee_record_id = $1',
         [feeRecordId]
       ),
    ]);
    const alreadyPaid = Number(onlineResult.rows[0].paid || 0) + Number(manualResult.rows[0].paid || 0);
    if (amountPaise > Number(record.agreed_fee_paise) - alreadyPaid) {
       throw ApiError.badRequest('New Amount Received cannot exceed the remaining fee');
    }
    await client.query(
       `INSERT INTO manual_payment_entries (
          fee_record_id, entry_type, amount_paise, payment_mode, paid_at, reference,
          notes, idempotency_key, admin_id
        ) VALUES ($1, 'payment', $2, $3, $4, $5, $6, $7, $8)`,
       [feeRecordId, amountPaise, paymentMode, paidAt, reference || null, notes, requestKey, req.user.id]
    );
    await client.query(
       'UPDATE manual_fee_records SET updated_at = NOW(), updated_by_id = $1 WHERE id = $2',
       [req.user.id, feeRecordId]
    );
    return { enrollmentId: record.enrollment_id, duplicate: false };
  });
  const payment = (await getEnrollmentFeeSummaries({ enrollmentId: enrollmentId.enrollmentId }))[0];
  res.status(enrollmentId.duplicate ? 200 : 201).json({ success: true, duplicate: enrollmentId.duplicate, payment });
});

/**
 * POST /api/payments/admin/manual/:id/corrections — reverse and optionally replace an entry.
 */
export const adminCorrectManualInstallment = asyncHandler(async (req, res) => {
  const feeRecordId = Number(req.params.id);
  const entryId = Number(req.body.entry_id);
  const requestKey = requireRequestKey(req.body.request_key);
  const reason = String(req.body.reason || '').trim();
  if (!Number.isSafeInteger(feeRecordId) || feeRecordId <= 0 || !Number.isSafeInteger(entryId) || entryId <= 0) {
    throw ApiError.badRequest('A valid manual payment entry is required');
  }
  if (reason.length < 5 || reason.length > 1000) {
    throw ApiError.badRequest('Correction reason is required (5 to 1000 characters)');
  }
  const replacementPaise = toPaise(req.body.replacement_amount ?? '0', 'Replacement amount', { allowZero: true });
  const paidAt = replacementPaise > 0 ? requireDate(req.body.payment_date, 'Replacement payment date') : null;
  const paymentMode = replacementPaise > 0 ? String(req.body.payment_mode || '') : null;
  if (replacementPaise > 0 && !validPaymentModes.includes(paymentMode)) {
    throw ApiError.badRequest('Select a valid payment mode for the replacement payment');
  }
  const reference = String(req.body.reference || '').trim().slice(0, 160);
  const notes = String(req.body.notes || '').trim().slice(0, 2000);
  const correctionKey = `${requestKey}:reversal`;

  const duplicate = await query(
    'SELECT fee_record_id FROM manual_payment_entries WHERE idempotency_key = $1',
    [correctionKey]
  );
  if (duplicate.rowCount) {
    if (Number(duplicate.rows[0].fee_record_id) !== feeRecordId) {
       throw ApiError.conflict('This request key has already been used for another payment');
    }
    const record = await query('SELECT enrollment_id FROM manual_fee_records WHERE id = $1', [feeRecordId]);
    const payment = record.rowCount
       ? (await getEnrollmentFeeSummaries({ enrollmentId: record.rows[0].enrollment_id }))[0]
       : null;
    return res.status(200).json({ success: true, duplicate: true, payment });
  }

  const enrollmentId = await withTransaction(async (client) => {
    const recordResult = await client.query(
       `SELECT mf.*, se.id AS enrollment_id
        FROM manual_fee_records mf
        JOIN student_enrollments se ON se.id = mf.enrollment_id
        WHERE mf.id = $1
        FOR UPDATE OF mf, se`,
       [feeRecordId]
    );
    if (!recordResult.rowCount) throw ApiError.notFound('Manual fee record not found');
    const record = recordResult.rows[0];
    const duplicateWithinTransaction = await client.query(
      'SELECT fee_record_id FROM manual_payment_entries WHERE idempotency_key = $1',
      [correctionKey]
    );
    if (duplicateWithinTransaction.rowCount) {
      if (Number(duplicateWithinTransaction.rows[0].fee_record_id) !== feeRecordId) {
        throw ApiError.conflict('This request key has already been used for another payment');
      }
      return { enrollmentId: record.enrollment_id, duplicate: true };
    }
    const entryResult = await client.query(
       `SELECT e.*,
               EXISTS (
                 SELECT 1 FROM manual_payment_entries reversal WHERE reversal.reversed_entry_id = e.id
               ) AS already_reversed
        FROM manual_payment_entries e
        WHERE e.id = $1 AND e.fee_record_id = $2 AND e.entry_type = 'payment'
        FOR UPDATE`,
       [entryId, feeRecordId]
    );
    if (!entryResult.rowCount) throw ApiError.notFound('Manual payment entry not found');
    const original = entryResult.rows[0];
    if (original.already_reversed) throw ApiError.conflict('This manual payment has already been corrected');

    const [onlineResult, manualResult] = await Promise.all([
       client.query(
         `SELECT COALESCE(SUM(ROUND(amount * 100)::bigint), 0)::bigint AS paid
          FROM payments WHERE enrollment_id = $1 AND status = 'success'`,
         [record.enrollment_id]
       ),
       client.query(
         'SELECT COALESCE(SUM(amount_paise), 0)::bigint AS paid FROM manual_payment_entries WHERE fee_record_id = $1',
         [feeRecordId]
       ),
    ]);
    const correctedTotal = Number(onlineResult.rows[0].paid || 0)
       + Number(manualResult.rows[0].paid || 0)
       - Number(original.amount_paise)
       + replacementPaise;
    if (correctedTotal > Number(record.agreed_fee_paise)) {
       throw ApiError.badRequest('The replacement amount would exceed the remaining fee');
    }

    await client.query(
       `INSERT INTO manual_payment_entries (
          fee_record_id, entry_type, amount_paise, payment_mode, paid_at, reference,
          notes, correction_reason, reversed_entry_id, idempotency_key, admin_id
        ) VALUES ($1, 'reversal', $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
       [
         feeRecordId,
         -Number(original.amount_paise),
         original.payment_mode,
         original.paid_at,
         original.reference,
         original.notes,
         reason,
         entryId,
         correctionKey,
         req.user.id,
       ]
    );
    if (replacementPaise > 0) {
       await client.query(
         `INSERT INTO manual_payment_entries (
            fee_record_id, entry_type, amount_paise, payment_mode, paid_at, reference,
            notes, correction_reason, replaces_entry_id, idempotency_key, admin_id
          ) VALUES ($1, 'payment', $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
         [
           feeRecordId,
           replacementPaise,
           paymentMode,
           paidAt,
           reference || null,
           notes,
           reason,
           entryId,
           `${requestKey}:replacement`,
           req.user.id,
         ]
       );
    }
    await client.query(
       'UPDATE manual_fee_records SET updated_at = NOW(), updated_by_id = $1 WHERE id = $2',
       [req.user.id, feeRecordId]
    );
    return { enrollmentId: record.enrollment_id, duplicate: false };
  });
  const payment = (await getEnrollmentFeeSummaries({ enrollmentId: enrollmentId.enrollmentId }))[0];
  res.status(enrollmentId.duplicate ? 200 : 201).json({ success: true, duplicate: enrollmentId.duplicate, payment });
});

/**
 * DELETE /api/payments/admin/:id
 * Allows admin to permanently delete any payment record (failed, pending, success, etc.)
 */
export const adminDeletePayment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const payRes = await query('SELECT * FROM payments WHERE id = $1', [id]);
  if (!payRes.rowCount) throw ApiError.notFound('Payment record not found');
  
  const payment = payRes.rows[0];

  if (['phonepe', 'razorpay'].includes(payment.provider)) {
    throw ApiError.conflict('Online gateway transaction records cannot be deleted');
  }

  // Delete from payments. student_enrollments.payment_id has ON DELETE SET NULL
  await query('DELETE FROM payments WHERE id = $1', [id]);

  logger?.info?.(
    `[Admin] Payment #${id} (${payment.merchant_order_id || payment.razorpay_order_id || 'ID_' + id}) deleted by admin #${req.user.id}`
  );

  res.json({
    success: true,
    message: 'Payment record deleted successfully',
    deletedId: Number(id),
  });
});

/**
 * PATCH /api/payments/admin/:id/status
 * Allows admin to manually update the status of any payment (success, pending, failed, refunded)
 */
export const adminUpdatePaymentStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, fulfillment_status } = req.body;

  const validStatuses = ['success', 'pending', 'failed', 'refunded'];
  if (!validStatuses.includes(status)) {
    throw ApiError.badRequest(`Invalid status. Must be one of: ${validStatuses.join(', ')}`);
  }

  const payRes = await query('SELECT * FROM payments WHERE id = $1', [id]);
  if (!payRes.rowCount) throw ApiError.notFound('Payment record not found');
  const payment = payRes.rows[0];

  if (payment.provider === 'phonepe') {
    throw ApiError.conflict('PhonePe payment status can only be changed by provider verification');
  }
  if (payment.provider === 'razorpay' && payment.status === 'success') {
    throw ApiError.conflict('Verified online payment statuses cannot be changed manually');
  }
  if (payment.provider === 'razorpay' && status === 'success' && payment.status !== 'success') {
    throw ApiError.conflict('Online payment status must be changed only by provider verification');
  }

  if (status === 'success' && payment.status !== 'success') {
    // If transitioning to success, run standard idempotent fulfillment
    await fulfillPaymentOrder({
      paymentId: payment.id,
      merchantOrderId: payment.merchant_order_id,
      providerPaymentId: payment.provider_payment_id || `MANUAL_ADMIN_${Date.now()}`,
    });
  } else {
    await query(
      `UPDATE payments 
       SET status = $1, 
           fulfillment_status = COALESCE($2, fulfillment_status),
           updated_at = NOW() 
       WHERE id = $3`,
      [
        status,
        fulfillment_status || (status === 'success' ? 'fulfilled' : status === 'refunded' ? 'revoked' : 'failed'),
        id,
      ]
    );
  }

  logger?.info?.(
    `[Admin] Payment #${id} status changed to '${status}' by admin #${req.user.id}`
  );

  res.json({
    success: true,
    message: `Payment #${id} status updated to ${status}`,
    updatedId: Number(id),
    status,
  });
});
