-- Migration v88: Add exam_type column to tests and assessments tables for NEET & JEE section separation

ALTER TABLE tests ADD COLUMN IF NOT EXISTS exam_type VARCHAR(50) DEFAULT 'NEET';
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS exam_type VARCHAR(50) DEFAULT 'NEET';

CREATE INDEX IF NOT EXISTS idx_tests_exam_type ON tests(exam_type);
CREATE INDEX IF NOT EXISTS idx_assessments_exam_type ON assessments(exam_type);

-- Backfill JEE tests based on title, name, or subject
UPDATE tests
SET exam_type = 'JEE'
WHERE (
  test_name ILIKE '%jee%'
  OR test_name ILIKE '%math%'
  OR test_name ILIKE '%iit%'
  OR title ILIKE '%jee%'
  OR title ILIKE '%math%'
  OR title ILIKE '%iit%'
  OR subject ILIKE '%math%'
);

-- Backfill NEET tests
UPDATE tests
SET exam_type = 'NEET'
WHERE exam_type IS NULL OR exam_type != 'JEE';

UPDATE assessments
SET exam_type = 'JEE'
WHERE (
  title ILIKE '%jee%'
  OR title ILIKE '%math%'
  OR title ILIKE '%iit%'
  OR subject ILIKE '%math%'
);

UPDATE assessments
SET exam_type = 'NEET'
WHERE exam_type IS NULL OR exam_type != 'JEE';
