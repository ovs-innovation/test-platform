import crypto from 'crypto';
import Razorpay from 'razorpay';
import { query, withTransaction } from '../config/db.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { env } from '../config/env.js';
import { sendEmail } from '../utils/email.js';

const getRazorpay = () => {
  if (!env.razorpay.keyId || !env.razorpay.keySecret) return null;
  return new Razorpay({ key_id: env.razorpay.keyId, key_secret: env.razorpay.keySecret });
};

const enrollUser = async (userId, testSeriesId, paymentId) => {
  const ts = await query('SELECT * FROM test_series WHERE id = $1 AND is_active = true', [testSeriesId]);
  if (!ts.rowCount) throw ApiError.notFound('Test series not found');
  const series = ts.rows[0];

  const existing = await query(
    `SELECT id FROM student_enrollments WHERE user_id = $1 AND test_series_id = $2 AND status = 'active' AND expires_at > NOW()`,
    [userId, testSeriesId]
  );
  if (existing.rowCount) throw ApiError.conflict('Already enrolled');

  const expires = new Date(Date.now() + series.validity_days * 86400000);
  const enroll = await query(
    `INSERT INTO student_enrollments (user_id, test_series_id, payment_id, expires_at)
     VALUES ($1,$2,$3,$4) RETURNING *`,
    [userId, testSeriesId, paymentId, expires]
  );

  await query(
    `INSERT INTO notifications (user_id, title, body, type) VALUES ($1,$2,$3,'purchase')`,
    [userId, 'Test series unlocked', `You now have access to "${series.title}"`]
  );

  return { enrollment: enroll.rows[0], series };
};

/**
 * POST /api/payments/create-order
 */
export const createOrder = asyncHandler(async (req, res) => {
  const { test_series_id } = req.body;
  const userId = req.user.id;

  const ts = await query('SELECT * FROM test_series WHERE id = $1 AND is_active = true', [test_series_id]);
  if (!ts.rowCount) throw ApiError.notFound('Test series not found');
  const series = ts.rows[0];
  const amountPaise = Math.round(Number(series.price) * 100);

  if (amountPaise === 0) {
    const result = await enrollUser(userId, test_series_id, null);
    return res.json({ free: true, ...result, message: 'Enrolled successfully' });
  }

  const rzp = getRazorpay();
  if (!rzp) {
    if (!env.isProd) {
      const pay = await query(
        `INSERT INTO payments (user_id, test_series_id, amount, status, razorpay_order_id, razorpay_payment_id)
         VALUES ($1,$2,$3,'success',$4,$5) RETURNING id`,
        [userId, test_series_id, series.price, `mock_order_${Date.now()}`, `mock_pay_${Date.now()}`]
      );
      const result = await enrollUser(userId, test_series_id, pay.rows[0].id);
      return res.json({ mock: true, ...result, message: 'Enrolled (dev mock payment)' });
    }
    throw ApiError.badRequest('Payment gateway not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.');
  }

  const order = await rzp.orders.create({
    amount: amountPaise,
    currency: 'INR',
    receipt: `ts_${test_series_id}_u_${userId}_${Date.now()}`,
    notes: { test_series_id: String(test_series_id), user_id: String(userId) },
  });

  await query(
    `INSERT INTO payments (user_id, test_series_id, amount, status, razorpay_order_id)
     VALUES ($1,$2,$3,'pending',$4)`,
    [userId, test_series_id, series.price, order.id]
  );

  res.json({
    orderId: order.id,
    amount: amountPaise,
    currency: 'INR',
    keyId: env.razorpay.keyId,
    series: { id: series.id, title: series.title, price: series.price },
  });
});

/**
 * POST /api/payments/verify
 */
export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, test_series_id } = req.body;
  const userId = req.user.id;

  if (!env.razorpay.keySecret) {
    throw ApiError.badRequest('Payment gateway not configured');
  }

  const expected = crypto
    .createHmac('sha256', env.razorpay.keySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (expected !== razorpay_signature) {
    throw ApiError.badRequest('Invalid payment signature');
  }

  const result = await withTransaction(async (client) => {
    const payRes = await client.query(
      `UPDATE payments SET status = 'success', razorpay_payment_id = $1
       WHERE razorpay_order_id = $2 AND user_id = $3 AND test_series_id = $4
       RETURNING id`,
      [razorpay_payment_id, razorpay_order_id, userId, test_series_id]
    );
    if (!payRes.rowCount) throw ApiError.notFound('Payment record not found');

    const ts = await client.query('SELECT * FROM test_series WHERE id = $1', [test_series_id]);
    const series = ts.rows[0];
    const expires = new Date(Date.now() + series.validity_days * 86400000);

    const enr = await client.query(
      `INSERT INTO student_enrollments (user_id, test_series_id, payment_id, expires_at)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (user_id, test_series_id) DO UPDATE SET expires_at = EXCLUDED.expires_at, payment_id = EXCLUDED.payment_id
       RETURNING *`,
      [userId, test_series_id, payRes.rows[0].id, expires]
    );

    await client.query(
      `INSERT INTO notifications (user_id, title, body, type) VALUES ($1,$2,$3,'purchase')`,
      [userId, 'Payment successful', `"${series.title}" is now unlocked.`]
    );

    return { enrollment: enr.rows[0], series };
  });

  const user = await query('SELECT name, email FROM users WHERE id = $1', [userId]);
  if (user.rows[0]?.email) {
    sendEmail({
      to: user.rows[0].email,
      subject: 'Payment confirmed — EDVEDUM Academy',
      html: `<p>Hi ${user.rows[0].name},</p><p>Your payment for <strong>${result.series.title}</strong> was successful. Start practicing from your dashboard.</p>`,
      text: `Payment confirmed for ${result.series.title}`,
    }).catch(() => {});
  }

  res.json({ verified: true, ...result });
});

/**
 * POST /api/payments/webhook — Razorpay (raw body)
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
      const payment = event.payload.payment.entity;
      await query(
        `UPDATE payments SET status = 'success', razorpay_payment_id = $1
         WHERE razorpay_order_id = $2 AND status = 'pending'`,
        [payment.id, payment.order_id]
      );
    }
    res.json({ received: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/**
 * GET /api/payments/history — student
 */
export const paymentHistory = asyncHandler(async (req, res) => {
  const result = await query(
    `SELECT p.*, ts.title AS series_title, ts.slug AS series_slug
     FROM payments p
     JOIN test_series ts ON ts.id = p.test_series_id
     WHERE p.user_id = $1
     ORDER BY p.created_at DESC`,
    [req.user.id]
  );
  res.json({ payments: result.rows });
});

/**
 * GET /api/payments/admin — admin revenue
 */
export const adminPayments = asyncHandler(async (_req, res) => {
  const [payments, revenue] = await Promise.all([
    query(
      `SELECT p.*, ts.title AS series_title, u.name AS user_name, u.email AS user_email
       FROM payments p
       JOIN test_series ts ON ts.id = p.test_series_id
       JOIN users u ON u.id = p.user_id
       ORDER BY p.created_at DESC LIMIT 100`
    ),
    query(
      `SELECT COALESCE(SUM(amount),0)::numeric AS total,
              COUNT(*) FILTER (WHERE status = 'success')::int AS successful,
              COUNT(*)::int AS total_orders
       FROM payments`
    ),
  ]);
  res.json({ payments: payments.rows, summary: revenue.rows[0] });
});
