-- Migration v15: Test Management Enhancements, AIETS Architecture Extensions, eBooks, Batches, and Missed Test Overrides

-- 1. Extend test_series table
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS code VARCHAR(50);
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS target_year VARCHAR(20) DEFAULT '2027';
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS target_class VARCHAR(50) DEFAULT 'Class XII & Droppers';
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS program_type VARCHAR(50) DEFAULT 'one-year';
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS planned_tests INTEGER DEFAULT 0;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS duration_months INTEGER DEFAULT 12;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS languages JSONB DEFAULT '["English"]'::jsonb;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS individual_available BOOLEAN DEFAULT TRUE;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS b2b_available BOOLEAN DEFAULT TRUE;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS highlights JSONB DEFAULT '[]'::jsonb;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS learning_outcomes JSONB DEFAULT '[]'::jsonb;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS included_resources JSONB DEFAULT '[]'::jsonb;
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS feature_flags JSONB DEFAULT '{"air_rank": true, "analytics": true, "ebooks": true}'::jsonb;

CREATE UNIQUE INDEX IF NOT EXISTS idx_test_series_code ON test_series(code) WHERE code IS NOT NULL;

-- 2. Extend assessments and tests tables
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS sequence_number INTEGER DEFAULT 0;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS test_type VARCHAR(50) DEFAULT 'AIETS';
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS preparation_phase VARCHAR(50) DEFAULT 'CONCEPT_BUILDING';
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS syllabus_text TEXT DEFAULT '';
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS question_paper_url TEXT DEFAULT '';
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS answer_key_url TEXT DEFAULT '';
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS solution_pdf_url TEXT DEFAULT '';
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS video_solution_url TEXT DEFAULT '';
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS recommended_ebook_id INTEGER;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS end_time TIMESTAMPTZ;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS result_published_at TIMESTAMPTZ;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS solution_published_at TIMESTAMPTZ;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS rank_enabled BOOLEAN DEFAULT TRUE;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS ranking_scope_config JSONB DEFAULT '["AIR","STATE","CITY","INSTITUTION","BATCH"]'::jsonb;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS missed_test_allowed BOOLEAN DEFAULT FALSE;

-- Extend tests table
ALTER TABLE tests ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS available_from TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS available_until TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS question_paper_url TEXT DEFAULT NULL;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS answer_key_url TEXT DEFAULT NULL;

-- 3. Create eBooks table
CREATE TABLE IF NOT EXISTS ebooks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255),
  description TEXT,
  pdf_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_ebooks_title ON ebooks(title);

-- 4. Create Batches table
CREATE TABLE IF NOT EXISTS batches (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Create Missed Test Overrides table
CREATE TABLE IF NOT EXISTS missed_test_overrides (
  id SERIAL PRIMARY KEY,
  test_id INTEGER NOT NULL REFERENCES tests(id) ON DELETE CASCADE,
  student_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  valid_from TIMESTAMPTZ NOT NULL,
  valid_until TIMESTAMPTZ NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(test_id, student_id)
);

-- 6. Add FK constraint to recommended_ebook_id if not present
DO $$ BEGIN
  ALTER TABLE tests ADD CONSTRAINT fk_tests_recommended_ebook FOREIGN KEY (recommended_ebook_id) REFERENCES ebooks(id) ON DELETE SET NULL;
EXCEPTION WHEN duplicate_object THEN NULL;
          WHEN undefined_object THEN NULL;
END $$;
