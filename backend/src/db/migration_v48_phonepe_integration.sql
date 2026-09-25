-- CBT Platform v48: PhonePe Payment Gateway Integration & Multi-provider Resiliency

-- 1. Extend payments table for PhonePe and multi-provider support
ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider VARCHAR(30) NOT NULL DEFAULT 'phonepe';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS merchant_order_id VARCHAR(120);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_order_id VARCHAR(120);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_payment_id VARCHAR(120);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS provider_signature TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS environment VARCHAR(20) DEFAULT 'production';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS fulfillment_status VARCHAR(30) NOT NULL DEFAULT 'pending';
ALTER TABLE payments ADD COLUMN IF NOT EXISTS fulfilled_at TIMESTAMPTZ;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS error_code VARCHAR(100);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS error_message TEXT;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS metadata JSONB DEFAULT '{}'::jsonb;
ALTER TABLE payments ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Backfill existing payments so fulfillment_status matches their status
UPDATE payments
SET fulfillment_status = 'fulfilled',
    fulfilled_at = COALESCE(fulfilled_at, created_at),
    provider = CASE WHEN razorpay_order_id IS NOT NULL THEN 'razorpay' ELSE 'phonepe' END,
    merchant_order_id = COALESCE(merchant_order_id, razorpay_order_id, 'LEGACY_' || id)
WHERE status = 'success' AND (fulfillment_status = 'pending' OR fulfillment_status IS NULL);

-- Add unique index on merchant_order_id
CREATE UNIQUE INDEX IF NOT EXISTS idx_payments_merchant_order_id ON payments(merchant_order_id) WHERE merchant_order_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_payments_provider_order ON payments(provider, provider_order_id);
CREATE INDEX IF NOT EXISTS idx_payments_status_fulfillment ON payments(status, fulfillment_status);
CREATE INDEX IF NOT EXISTS idx_payments_user_status ON payments(user_id, status);

-- 2. Create durable webhooks audit log table
CREATE TABLE IF NOT EXISTS payment_webhooks (
  id SERIAL PRIMARY KEY,
  provider VARCHAR(30) NOT NULL DEFAULT 'phonepe',
  event_type VARCHAR(100),
  merchant_order_id VARCHAR(120),
  provider_order_id VARCHAR(120),
  payload JSONB NOT NULL,
  headers JSONB,
  signature TEXT,
  is_valid BOOLEAN NOT NULL DEFAULT TRUE,
  processed BOOLEAN NOT NULL DEFAULT FALSE,
  processing_error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_payment_webhooks_merchant_order ON payment_webhooks(merchant_order_id);
CREATE INDEX IF NOT EXISTS idx_payment_webhooks_processed ON payment_webhooks(provider, processed);
