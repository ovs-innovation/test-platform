-- Migration v21: Single Source of Truth for Test Creation & Join Table test_series_tests + Institution Portal Extensions

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
  INSERT INTO test_series_tests (series_id, test_id)
  SELECT DISTINCT tsa.test_series_id, t.id
  FROM test_series_assessments tsa
  JOIN assessments a ON a.id = tsa.assessment_id
  JOIN tests t ON t.test_name = a.title OR t.title = a.title
  ON CONFLICT (series_id, test_id) DO NOTHING;
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- 4. Add licence tracking columns to institutions
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS total_licenses INTEGER DEFAULT 50;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS used_licenses INTEGER DEFAULT 0;

-- Sync initial used_licenses count from existing users
UPDATE institutions i
SET used_licenses = (
  SELECT COUNT(*) FROM users u WHERE u.institution_id = i.id AND u.role = 'candidate'
);

-- 5. Extend batches table for detailed batch management
ALTER TABLE batches ADD COLUMN IF NOT EXISTS academic_year VARCHAR(20) DEFAULT '2026-2027';
ALTER TABLE batches ADD COLUMN IF NOT EXISTS class_level VARCHAR(50);
ALTER TABLE batches ADD COLUMN IF NOT EXISTS target_exam VARCHAR(50);
ALTER TABLE batches ADD COLUMN IF NOT EXISTS start_date DATE;
ALTER TABLE batches ADD COLUMN IF NOT EXISTS end_date DATE;
ALTER TABLE batches ADD COLUMN IF NOT EXISTS faculty_name VARCHAR(120);
ALTER TABLE batches ADD COLUMN IF NOT EXISTS max_capacity INTEGER DEFAULT 100;
ALTER TABLE batches ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'active';
ALTER TABLE batches ADD COLUMN IF NOT EXISTS archived BOOLEAN DEFAULT FALSE;

-- 6. Extend student_profiles for DOB, gender and account status
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS dob DATE;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS status VARCHAR(20) DEFAULT 'Active';

-- 7. Create institution_invoices table for billing and GST invoice records
CREATE TABLE IF NOT EXISTS institution_invoices (
  id SERIAL PRIMARY KEY,
  institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
  invoice_number VARCHAR(100) UNIQUE NOT NULL,
  package_name VARCHAR(255) NOT NULL,
  price_per_student NUMERIC(10,2) DEFAULT 0,
  license_quantity INTEGER DEFAULT 50,
  subtotal NUMERIC(10,2) DEFAULT 0,
  gst_amount NUMERIC(10,2) DEFAULT 0,
  total_amount NUMERIC(10,2) DEFAULT 0,
  payment_status VARCHAR(50) DEFAULT 'Paid',
  payment_date TIMESTAMP DEFAULT NOW(),
  pdf_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. Create institution_notifications table for alerts and reminders
CREATE TABLE IF NOT EXISTS institution_notifications (
  id SERIAL PRIMARY KEY,
  institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'system',
  target_type VARCHAR(50),
  target_id INTEGER,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 9. Create institution_audit_logs table for security audit logging
CREATE TABLE IF NOT EXISTS institution_audit_logs (
  id SERIAL PRIMARY KEY,
  institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
  admin_id INTEGER,
  action VARCHAR(100) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT NOW()
);

-- 10. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_inst_invoices_inst ON institution_invoices(institution_id);
CREATE INDEX IF NOT EXISTS idx_inst_notifs_inst ON institution_notifications(institution_id);
CREATE INDEX IF NOT EXISTS idx_inst_audit_inst ON institution_audit_logs(institution_id);
CREATE INDEX IF NOT EXISTS idx_batches_status ON batches(status);
