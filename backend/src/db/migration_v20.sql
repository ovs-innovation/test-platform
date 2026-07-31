-- Migration v20: Add reference_code column to b2b_enquiries table
ALTER TABLE b2b_enquiries ADD COLUMN IF NOT EXISTS reference_code VARCHAR(100);
CREATE UNIQUE INDEX IF NOT EXISTS idx_b2b_enquiries_ref ON b2b_enquiries(reference_code);
