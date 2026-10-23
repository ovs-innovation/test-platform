ALTER TABLE admission_submissions
  ADD COLUMN IF NOT EXISTS test_series_id INTEGER REFERENCES test_series(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS student_phone_identity VARCHAR(20),
  ADD COLUMN IF NOT EXISTS student_email_identity VARCHAR(320),
  ADD COLUMN IF NOT EXISTS student_account_identity VARCHAR(100);

CREATE UNIQUE INDEX IF NOT EXISTS uq_admission_submissions_series_student_phone
  ON admission_submissions (test_series_id, student_phone_identity)
  WHERE test_series_id IS NOT NULL AND student_phone_identity IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_admission_submissions_series_student_email
  ON admission_submissions (test_series_id, student_email_identity)
  WHERE test_series_id IS NOT NULL AND student_email_identity IS NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS uq_admission_submissions_series_student_account
  ON admission_submissions (test_series_id, student_account_identity)
  WHERE test_series_id IS NOT NULL AND student_account_identity IS NOT NULL;
