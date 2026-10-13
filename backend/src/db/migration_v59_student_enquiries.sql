-- Migration v59: Student Enquiries Management System

CREATE TABLE IF NOT EXISTS student_enquiries (
  id SERIAL PRIMARY KEY,
  reference_no VARCHAR(100) UNIQUE NOT NULL,
  student_name VARCHAR(255) NOT NULL,
  mobile VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  student_class VARCHAR(100),
  target_exam VARCHAR(100),
  status VARCHAR(50) DEFAULT 'new',
  source VARCHAR(100) DEFAULT 'first_visit_popup',
  notes TEXT,
  last_contacted_at TIMESTAMPTZ,
  contacted_by VARCHAR(255),
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_student_enquiries_status ON student_enquiries(status);
CREATE INDEX IF NOT EXISTS idx_student_enquiries_created_at ON student_enquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_student_enquiries_mobile ON student_enquiries(mobile);
CREATE INDEX IF NOT EXISTS idx_student_enquiries_email ON student_enquiries(email);

-- Safely backfill any previous popup submissions from admission_submissions if table exists
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_name = 'admission_submissions'
  ) THEN
    INSERT INTO student_enquiries (
      reference_no,
      student_name,
      mobile,
      email,
      student_class,
      target_exam,
      status,
      source,
      notes,
      created_at,
      updated_at
    )
    SELECT 
      'ENQ-PREV-' || id,
      COALESCE(student_name, form_data->>'fullName', 'Student Visitor'),
      COALESCE(contact_number, form_data->>'studentMobile', ''),
      COALESCE(email, form_data->>'email', ''),
      COALESCE(form_data->>'currentClass', ''),
      COALESCE(course_name, form_data->>'targetExam', ''),
      'new',
      'first_visit_popup',
      admin_notes,
      created_at,
      updated_at
    FROM admission_submissions
    WHERE form_data->>'source' = 'first_visit_popup'
    ON CONFLICT (reference_no) DO NOTHING;
  END IF;
END $$;
