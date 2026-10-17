-- Migration v67: Add is_live column to tests and assessments for manual and scheduled live toggling
ALTER TABLE tests ADD COLUMN IF NOT EXISTS is_live BOOLEAN DEFAULT FALSE;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS is_live BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_tests_is_live ON tests(is_live);
CREATE INDEX IF NOT EXISTS idx_assessments_is_live ON assessments(is_live);
