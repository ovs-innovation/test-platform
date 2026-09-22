-- Migration v45: Add brochure_url and brochure_name to test_series
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS brochure_url TEXT;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS brochure_name VARCHAR(255);
