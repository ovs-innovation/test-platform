-- Migration v56: Test Series Assignments for Students, Batches, and Institutions

CREATE TABLE IF NOT EXISTS test_series_assignments (
  id SERIAL PRIMARY KEY,
  test_series_id INTEGER NOT NULL REFERENCES test_series(id) ON DELETE CASCADE,
  assigned_to_type VARCHAR(30) NOT NULL, -- 'student', 'batch', 'institution', 'all'
  assigned_to_id INTEGER,               -- user_id, batch_id, or institution_id (NULL for 'all')
  validity_days INTEGER DEFAULT 365,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_test_series_assignments_series ON test_series_assignments(test_series_id);
CREATE INDEX IF NOT EXISTS idx_test_series_assignments_target ON test_series_assignments(assigned_to_type, assigned_to_id);

ALTER TABLE student_enrollments ADD COLUMN IF NOT EXISTS assignment_type VARCHAR(30) DEFAULT 'purchase';
ALTER TABLE student_enrollments ADD COLUMN IF NOT EXISTS notes TEXT;
