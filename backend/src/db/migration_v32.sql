-- ============================================================
-- Migration v32: Performance Indexing & Redundant Index Cleanup
-- ============================================================

-- 1. Drop redundant / duplicate indexes
DROP INDEX IF EXISTS idx_users_institution_id;
DROP INDEX IF EXISTS idx_users_batch_id;
DROP INDEX IF EXISTS idx_test_attempts_test;
DROP INDEX IF EXISTS idx_enrollments_user;

-- 2. Add missing foreign key & query performance indexes

-- test_assignments(test_id) - FK index for test assignment joins and deletions
CREATE INDEX IF NOT EXISTS idx_test_assignments_test_id ON test_assignments(test_id);

-- ebook_assignments(ebook_id) - FK index for ebook assignment joins and deletions
CREATE INDEX IF NOT EXISTS idx_ebook_assignments_ebook_id ON ebook_assignments(ebook_id);

-- test_series_assessments(assessment_id) - FK index for assessment joins to test series
CREATE INDEX IF NOT EXISTS idx_test_series_assessments_assessment_id ON test_series_assessments(assessment_id);

-- attempts(candidate_id, submitted_at) - Composite index for student attempt histories and rank tracking
CREATE INDEX IF NOT EXISTS idx_attempts_candidate_submitted ON attempts(candidate_id, submitted_at);

-- test_attempts(student_id, submitted_at) - Composite index for student test attempt history & analytics
CREATE INDEX IF NOT EXISTS idx_test_attempts_student_submitted ON test_attempts(student_id, submitted_at);

-- candidate_invites(assessment_id, candidate_email) - Composite index for invite lookups & status aggregation
CREATE INDEX IF NOT EXISTS idx_candidate_invites_assessment_email ON candidate_invites(assessment_id, candidate_email);

-- answers(question_id) - FK index for question item analysis and accuracy calculations
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON answers(question_id);

-- questions(section_id) - FK index for section-wise question retrieval
CREATE INDEX IF NOT EXISTS idx_questions_section_id ON questions(section_id);

-- institution_packages(package_id) - FK index for package access validation joins
CREATE INDEX IF NOT EXISTS idx_institution_packages_package_id ON institution_packages(package_id);

-- forum_replies(topic_id) - FK index for discussion topic replies lookups
CREATE INDEX IF NOT EXISTS idx_forum_replies_topic_id ON forum_replies(topic_id);

-- Ensure test_ai_reports table exists and has unique composite constraint / index
CREATE TABLE IF NOT EXISTS test_ai_reports (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  test_id INT NOT NULL,
  attempt_id INT,
  ai_response JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_student_test_ai UNIQUE (student_id, test_id)
);
CREATE INDEX IF NOT EXISTS idx_test_ai_reports_student_test ON test_ai_reports(student_id, test_id);

-- college_cutoffs(min_score DESC) - Index for college cutoff predictions
CREATE INDEX IF NOT EXISTS idx_college_cutoffs_min_score ON college_cutoffs(min_score DESC);

-- student_enrollments(test_series_id) - FK index for test series enrollment counts & joins
CREATE INDEX IF NOT EXISTS idx_student_enrollments_test_series_id ON student_enrollments(test_series_id);

-- otp_verifications(email, purpose) - Composite index for fast OTP validation queries
CREATE INDEX IF NOT EXISTS idx_otp_verifications_email_purpose ON otp_verifications(email, purpose);
