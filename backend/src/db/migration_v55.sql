ALTER TABLE payments
  ADD COLUMN IF NOT EXISTS enrollment_id INTEGER REFERENCES student_enrollments(id) ON DELETE SET NULL;

UPDATE payments p
SET enrollment_id = se.id
FROM student_enrollments se
WHERE p.enrollment_id IS NULL
  AND p.user_id = se.user_id
  AND p.test_series_id = se.test_series_id;

CREATE INDEX IF NOT EXISTS idx_payments_enrollment_status
  ON payments(enrollment_id, status);

CREATE TABLE IF NOT EXISTS manual_fee_records (
  id BIGSERIAL PRIMARY KEY,
  enrollment_id INTEGER NOT NULL UNIQUE REFERENCES student_enrollments(id) ON DELETE CASCADE,
  agreed_fee_paise BIGINT NOT NULL CHECK (agreed_fee_paise > 0),
  next_due_date DATE,
  notes TEXT NOT NULL DEFAULT '',
  create_request_key VARCHAR(120) NOT NULL UNIQUE,
  created_by_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  updated_by_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS manual_payment_entries (
  id BIGSERIAL PRIMARY KEY,
  fee_record_id BIGINT NOT NULL REFERENCES manual_fee_records(id) ON DELETE CASCADE,
  entry_type VARCHAR(20) NOT NULL CHECK (entry_type IN ('payment', 'reversal')),
  amount_paise BIGINT NOT NULL,
  payment_mode VARCHAR(30),
  paid_at DATE,
  reference VARCHAR(160),
  notes TEXT NOT NULL DEFAULT '',
  correction_reason TEXT,
  reversed_entry_id BIGINT REFERENCES manual_payment_entries(id) ON DELETE RESTRICT,
  replaces_entry_id BIGINT REFERENCES manual_payment_entries(id) ON DELETE RESTRICT,
  idempotency_key VARCHAR(140) NOT NULL UNIQUE,
  admin_id INTEGER NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT manual_payment_entry_shape CHECK (
    (entry_type = 'payment' AND amount_paise > 0 AND payment_mode IN ('cash', 'direct_upi', 'bank_transfer', 'other') AND paid_at IS NOT NULL AND reversed_entry_id IS NULL)
    OR
    (entry_type = 'reversal' AND amount_paise < 0 AND reversed_entry_id IS NOT NULL AND correction_reason IS NOT NULL AND length(btrim(correction_reason)) > 0)
  )
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_manual_payment_reversed_entry
  ON manual_payment_entries(reversed_entry_id)
  WHERE reversed_entry_id IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS idx_manual_payment_replacement_entry
  ON manual_payment_entries(replaces_entry_id)
  WHERE replaces_entry_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_manual_payment_fee_record
  ON manual_payment_entries(fee_record_id, paid_at DESC, id DESC);
