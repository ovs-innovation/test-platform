-- Migration v24: Add is_free and display_order to test_series table
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT FALSE;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;
