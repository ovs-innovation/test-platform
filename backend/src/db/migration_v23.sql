-- Migration v23: B2B Management Module Enhancements
-- 1. Create b2b_lead_notes table for persistent lead follow-up history
CREATE TABLE IF NOT EXISTS b2b_lead_notes (
  id SERIAL PRIMARY KEY,
  lead_id INTEGER NOT NULL REFERENCES b2b_enquiries(id) ON DELETE CASCADE,
  author VARCHAR(100) DEFAULT 'Master Admin',
  note_text TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_b2b_lead_notes_lead ON b2b_lead_notes(lead_id);

-- 2. Extend institutions table for GSTIN, Custom Negotiated Pricing & Payment Status
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS gstin VARCHAR(20);
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS custom_price NUMERIC(10,2) DEFAULT 1999.00;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS payment_status VARCHAR(50) DEFAULT 'Paid';

-- Default existing nulls
UPDATE institutions SET custom_price = 1999.00 WHERE custom_price IS NULL;
UPDATE institutions SET payment_status = 'Paid' WHERE payment_status IS NULL OR payment_status = '';
