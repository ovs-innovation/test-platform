-- Migration v32: Production Hardening & Performance Indexes
-- Improves query performance for CBT attempts, question lookups, analytics, leaderboards, eBooks, and AI reports.

-- 1. Index answers by question_id for peer analytics and fast question response aggregations
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON answers(question_id);

-- 2. Index scores by marks_obtained DESC for fast leaderboard queries and percentile rankings
CREATE INDEX IF NOT EXISTS idx_scores_marks_desc ON scores(marks_obtained DESC);

-- 3. Index attempts by assessment_id for fast assessment-level attempt scans
CREATE INDEX IF NOT EXISTS idx_attempts_assessment_id ON attempts(assessment_id);

-- 4. Index answers by (attempt_id, question_id) if not already explicitly indexed
CREATE INDEX IF NOT EXISTS idx_answers_attempt_question ON answers(attempt_id, question_id);

-- 5. Safe column guarantees for student avatars (removes runtime DDL)
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS avatar_url TEXT;
ALTER TABLE users ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- 6. Safe schema guarantees for eBooks & assignments module (removes runtime DDL)
CREATE TABLE IF NOT EXISTS ebooks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  subject VARCHAR(100),
  author VARCHAR(200),
  class_level VARCHAR(100),
  pdf_url TEXT,
  pages INT,
  file_size VARCHAR(50),
  subject_id INTEGER REFERENCES subjects(id) ON DELETE SET NULL,
  chapter_id INTEGER REFERENCES chapters(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS subject VARCHAR(100);
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS class_level VARCHAR(100);
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS pages INT;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS file_size VARCHAR(50);
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS subject_id INTEGER REFERENCES subjects(id) ON DELETE SET NULL;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS chapter_id INTEGER REFERENCES chapters(id) ON DELETE SET NULL;

CREATE TABLE IF NOT EXISTS ebook_assignments (
  id SERIAL PRIMARY KEY,
  ebook_id INT REFERENCES ebooks(id) ON DELETE CASCADE,
  assigned_to_type VARCHAR(50) NOT NULL,
  assigned_to_id INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ebook_assignments_target ON ebook_assignments(assigned_to_type, assigned_to_id);

-- 7. Safe schema guarantees for test_ai_reports table (removes runtime DDL)
CREATE TABLE IF NOT EXISTS test_ai_reports (
  id SERIAL PRIMARY KEY,
  student_id INT NOT NULL,
  test_id INT NOT NULL,
  attempt_id INT,
  ai_response JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_student_test_ai UNIQUE (student_id, test_id)
);
