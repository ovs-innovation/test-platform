-- Migration v14: Create b2b_enquiries table for institutional partnership requests
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
