-- Migration v61: Per-Student Coupon Limit & Redemptions Tracking
-- Enforces that one student can only use a coupon code once across the platform

ALTER TABLE coupons
  ADD COLUMN IF NOT EXISTS max_uses_per_user INTEGER NOT NULL DEFAULT 1;

CREATE TABLE IF NOT EXISTS coupon_redemptions (
  id SERIAL PRIMARY KEY,
  coupon_id INTEGER NOT NULL REFERENCES coupons(id) ON DELETE CASCADE,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_series_id INTEGER REFERENCES test_series(id) ON DELETE SET NULL,
  payment_id INTEGER REFERENCES payments(id) ON DELETE SET NULL,
  discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  redeemed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_coupon_redemption_user UNIQUE (coupon_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_coupon_redemptions_user ON coupon_redemptions(user_id, coupon_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_coupon_status ON payments(user_id, coupon_id, status);

-- Backfill from any historical successful payments
INSERT INTO coupon_redemptions (coupon_id, user_id, test_series_id, payment_id, discount_amount, redeemed_at)
SELECT DISTINCT ON (p.coupon_id, p.user_id)
  p.coupon_id, p.user_id, p.test_series_id, p.id, p.discount_amount, p.created_at
FROM payments p
WHERE p.coupon_id IS NOT NULL
  AND p.status = 'success'
ON CONFLICT (coupon_id, user_id) DO NOTHING;
