-- Migration v14: Create b2b_enquiries table for institutional partnership requests and AIETS Calendar tables (tests, test_assignments, test_attempts)
CREATE TABLE IF NOT EXISTS b2b_enquiries (
  id                  SERIAL PRIMARY KEY,
  institution_name    VARCHAR(200) NOT NULL,
  contact_person      VARCHAR(120) NOT NULL,
  designation         VARCHAR(100) DEFAULT 'Principal',
  mobile_number       VARCHAR(20) NOT NULL,
  email               VARCHAR(180) NOT NULL,
  city                VARCHAR(100) NOT NULL,
  state               VARCHAR(100) NOT NULL,
  institution_type    VARCHAR(100) NOT NULL DEFAULT 'School',
  student_count       VARCHAR(50) NOT NULL DEFAULT '100-300',
  target_exam         VARCHAR(100) NOT NULL DEFAULT 'NEET',
  interested_package  VARCHAR(100) NOT NULL DEFAULT 'NEET-UG 2027 One-Year Program',
  message             TEXT DEFAULT '',
  estimated_price     NUMERIC(12,2) DEFAULT 0,
  status              VARCHAR(50) NOT NULL DEFAULT 'New Request',
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_b2b_enquiries_status ON b2b_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_b2b_enquiries_email ON b2b_enquiries(email);

CREATE TABLE IF NOT EXISTS tests (
  id SERIAL PRIMARY KEY,
  test_name VARCHAR(255) NOT NULL,
  test_type VARCHAR(50) NOT NULL, -- AIETS / Unit Test / Part Test / Cumulative Test / Full Syllabus Mock
  test_date DATE NOT NULL,
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL,
  syllabus TEXT,
  max_marks INTEGER NOT NULL,
  is_published BOOLEAN DEFAULT FALSE,
  result_publish_time TIMESTAMP,
  solution_pdf_url TEXT,
  recommended_ebook_id INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_assignments (
  id SERIAL PRIMARY KEY,
  test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  assigned_to_type VARCHAR(20) NOT NULL, -- individual / batch / institution / all
  assigned_to_id INTEGER
);

CREATE TABLE IF NOT EXISTS test_attempts (
  id SERIAL PRIMARY KEY,
  test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  student_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  started_at TIMESTAMP,
  submitted_at TIMESTAMP,
  UNIQUE(test_id, student_id)
);
