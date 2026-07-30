-- Migration v15: AIETS Architecture Extension
-- Adds comprehensive schema support for AIETS products, assessments, schedules, eBooks, batches, seat assignments, invoices, and audit logging.

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

-- 2. Extend assessments table
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

CREATE INDEX IF NOT EXISTS idx_assessments_type ON assessments(test_type);
CREATE INDEX IF NOT EXISTS idx_assessments_phase ON assessments(preparation_phase);
CREATE INDEX IF NOT EXISTS idx_assessments_start ON assessments(start_time);

-- 3. Digital eBooks and Learning Resources
CREATE TABLE IF NOT EXISTS e_books_resources (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(200) NOT NULL,
  category        VARCHAR(100) DEFAULT 'General',
  subject_name    VARCHAR(100) DEFAULT 'All Subjects',
  file_url        TEXT NOT NULL,
  thumbnail_url   TEXT DEFAULT '',
  description     TEXT DEFAULT '',
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Institutional Batches
CREATE TABLE IF NOT EXISTS institution_batches (
  id                SERIAL PRIMARY KEY,
  institution_id    VARCHAR(100) NOT NULL,
  batch_name        VARCHAR(150) NOT NULL,
  target_exam       VARCHAR(100) DEFAULT 'NEET',
  academic_year     VARCHAR(20) DEFAULT '2026-2027',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (institution_id, batch_name)
);

CREATE INDEX IF NOT EXISTS idx_batches_inst ON institution_batches(institution_id);

-- 5. Institutional Batch Students
CREATE TABLE IF NOT EXISTS institution_students (
  id                SERIAL PRIMARY KEY,
  institution_id    VARCHAR(100) NOT NULL,
  batch_id          INTEGER REFERENCES institution_batches(id) ON DELETE SET NULL,
  user_id           INTEGER REFERENCES users(id) ON DELETE CASCADE,
  student_roll      VARCHAR(100),
  status            VARCHAR(50) DEFAULT 'Active',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (institution_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_inst_students_inst ON institution_students(institution_id);
CREATE INDEX IF NOT EXISTS idx_inst_students_batch ON institution_students(batch_id);

-- 6. Institutional Package Seat Allocations
CREATE TABLE IF NOT EXISTS institution_package_assignments (
  id                SERIAL PRIMARY KEY,
  institution_id    VARCHAR(100) NOT NULL,
  test_series_id    INTEGER NOT NULL REFERENCES test_series(id) ON DELETE CASCADE,
  allocated_seats   INTEGER NOT NULL DEFAULT 100,
  unit_price        NUMERIC(10,2) NOT NULL DEFAULT 1999.00,
  start_date        DATE DEFAULT CURRENT_DATE,
  end_date          DATE,
  status            VARCHAR(50) DEFAULT 'Active',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (institution_id, test_series_id)
);

-- 7. Invoices & Billing
CREATE TABLE IF NOT EXISTS invoices (
  id                SERIAL PRIMARY KEY,
  invoice_number    VARCHAR(100) NOT NULL UNIQUE,
  user_id           INTEGER REFERENCES users(id) ON DELETE SET NULL,
  institution_id    VARCHAR(100),
  billing_name      VARCHAR(200) NOT NULL,
  gstin             VARCHAR(50) DEFAULT '',
  package_name      VARCHAR(200) NOT NULL,
  seat_count        INTEGER DEFAULT 1,
  subtotal          NUMERIC(12,2) NOT NULL,
  tax_amount        NUMERIC(12,2) NOT NULL,
  grand_total       NUMERIC(12,2) NOT NULL,
  payment_status    VARCHAR(50) DEFAULT 'Paid',
  created_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invoices_user ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_inst ON invoices(institution_id);

-- 8. Audit Logging
CREATE TABLE IF NOT EXISTS audit_logs (
  id          SERIAL PRIMARY KEY,
  user_id     INTEGER REFERENCES users(id) ON DELETE SET NULL,
  action      VARCHAR(100) NOT NULL,
  entity_type VARCHAR(50) NOT NULL,
  entity_id   VARCHAR(100),
  details     JSONB DEFAULT '{}'::jsonb,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
