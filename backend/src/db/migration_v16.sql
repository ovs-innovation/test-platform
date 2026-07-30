-- Migration v16: Reports & Analytics Module Enhancements

-- 1. Extend test_attempts table
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS subject_wise_score JSONB DEFAULT '{}'::jsonb;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS chapter_wise_score JSONB DEFAULT '{}'::jsonb;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS time_spent_per_question JSONB DEFAULT '{}'::jsonb;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS score NUMERIC(10,2) DEFAULT 0;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS max_marks NUMERIC(10,2) DEFAULT 0;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS percentage NUMERIC(5,2) DEFAULT 0;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS institute_rank INTEGER DEFAULT NULL;

-- 2. Extend attempts table (for non-AIETS assessments as well)
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS subject_wise_score JSONB DEFAULT '{}'::jsonb;
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS chapter_wise_score JSONB DEFAULT '{}'::jsonb;
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS time_spent_per_question JSONB DEFAULT '{}'::jsonb;
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS institute_rank INTEGER DEFAULT NULL;

-- 3. Extend users table for Institution & Batch tagging
ALTER TABLE users ADD COLUMN IF NOT EXISTS institution_id INTEGER DEFAULT NULL;
ALTER TABLE users ADD COLUMN IF NOT EXISTS batch_id INTEGER REFERENCES batches(id) ON DELETE SET NULL;

-- 4. Extend student_profiles table for Institution & Batch tagging redundancy/support
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS institution_id INTEGER DEFAULT NULL;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS batch_id INTEGER REFERENCES batches(id) ON DELETE SET NULL;

-- 5. Add indexes for performance optimization on frequent aggregate queries
CREATE INDEX IF NOT EXISTS idx_test_attempts_student ON test_attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_test_attempts_test ON test_attempts(test_id);
CREATE INDEX IF NOT EXISTS idx_users_institution ON users(institution_id);
CREATE INDEX IF NOT EXISTS idx_users_batch ON users(batch_id);
CREATE INDEX IF NOT EXISTS idx_questions_chapter ON questions(chapter_id);
CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject_id);
