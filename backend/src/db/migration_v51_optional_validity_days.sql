-- Migration v51: Make validity_days in test_series optional / nullable
ALTER TABLE test_series DROP CONSTRAINT IF EXISTS test_series_validity_days_check;
ALTER TABLE test_series ALTER COLUMN validity_days DROP NOT NULL;
ALTER TABLE test_series ADD CONSTRAINT test_series_validity_days_check CHECK (validity_days IS NULL OR validity_days >= 0);
