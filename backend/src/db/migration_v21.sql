-- Migration v21: Single Source of Truth for Test Creation & Join Table test_series_tests

-- 1. Create test_series_tests join table (many-to-many join with unique constraint)
CREATE TABLE IF NOT EXISTS test_series_tests (
  series_id   INTEGER NOT NULL REFERENCES test_series(id) ON DELETE CASCADE,
  test_id     INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (series_id, test_id)
);

CREATE INDEX IF NOT EXISTS idx_test_series_tests_series ON test_series_tests(series_id);
CREATE INDEX IF NOT EXISTS idx_test_series_tests_test ON test_series_tests(test_id);

-- 2. Extend tests table to satisfy full data model specifications
ALTER TABLE tests ADD COLUMN IF NOT EXISTS title VARCHAR(255);
UPDATE tests SET title = test_name WHERE title IS NULL OR title = '';

ALTER TABLE tests ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'published';
UPDATE tests SET status = CASE WHEN is_published = true THEN 'published' ELSE 'draft' END WHERE status IS NULL;

ALTER TABLE tests ADD COLUMN IF NOT EXISTS result_publish_at TIMESTAMPTZ;
UPDATE tests SET result_publish_at = result_publish_time WHERE result_publish_at IS NULL AND result_publish_time IS NOT NULL;

ALTER TABLE tests ADD COLUMN IF NOT EXISTS rank_config JSONB DEFAULT '{"air_rank": true, "state_rank": true, "city_rank": true}'::jsonb;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS missed_test_access_rule VARCHAR(100) DEFAULT 'override_only';
ALTER TABLE tests ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Ensure test_assignments has missed_access_override flag
ALTER TABLE test_assignments ADD COLUMN IF NOT EXISTS missed_access_override BOOLEAN DEFAULT FALSE;

-- 3. Backfill test_series_tests from any legacy test_series_assessments or test matches if needed
DO $$
BEGIN
  -- Backfill from legacy test_series_assessments where assessment titles match tests test_name or title
  INSERT INTO test_series_tests (series_id, test_id)
  SELECT DISTINCT tsa.test_series_id, t.id
  FROM test_series_assessments tsa
  JOIN assessments a ON a.id = tsa.assessment_id
  JOIN tests t ON t.test_name = a.title OR t.title = a.title
  ON CONFLICT (series_id, test_id) DO NOTHING;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
