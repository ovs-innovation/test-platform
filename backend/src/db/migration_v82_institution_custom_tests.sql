-- Migration v82: Support for Institution Custom Tests and Manual Question Paper Uploads

ALTER TABLE assessments ADD COLUMN IF NOT EXISTS institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS is_institution_custom BOOLEAN DEFAULT FALSE;

ALTER TABLE tests ADD COLUMN IF NOT EXISTS institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS is_institution_custom BOOLEAN DEFAULT FALSE;

CREATE INDEX IF NOT EXISTS idx_assessments_institution ON assessments(institution_id) WHERE institution_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_tests_institution ON tests(institution_id) WHERE institution_id IS NOT NULL;
