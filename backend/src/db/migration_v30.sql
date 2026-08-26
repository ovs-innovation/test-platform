-- Migration v30: Weak Topic Booster Test Schema Enhancements

-- 1. Extend users and student_profiles table for examType preference ("JEE" | "NEET")
ALTER TABLE users ADD COLUMN IF NOT EXISTS exam_type VARCHAR(20) DEFAULT 'JEE';
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS exam_type VARCHAR(20) DEFAULT 'JEE';

-- Sync exam_type from target_exam if target_exam mentions NEET or JEE
UPDATE users SET exam_type = 'NEET' WHERE LOWER(COALESCE(exam_type, '')) NOT LIKE 'neet%' AND id IN (
  SELECT user_id FROM student_profiles WHERE LOWER(COALESCE(target_exam, '')) LIKE '%neet%'
);

-- 2. Extend questions table for AI generated questions metadata
ALTER TABLE questions ADD COLUMN IF NOT EXISTS source VARCHAR(30) DEFAULT 'bank'; -- 'bank' | 'ai_generated'
ALTER TABLE questions ADD COLUMN IF NOT EXISTS subtopic VARCHAR(160);
ALTER TABLE questions ADD COLUMN IF NOT EXISTS correct_option_index INTEGER;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS explanation TEXT;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS difficulty VARCHAR(20) DEFAULT 'medium'; -- 'easy' | 'medium' | 'hard'

-- Sync correct_option_index with correct_index if correct_option_index is NULL
UPDATE questions SET correct_option_index = correct_index WHERE correct_option_index IS NULL AND correct_index IS NOT NULL;

-- 3. Extend tests table for scheduled AI weak topic booster tests
ALTER TABLE tests ADD COLUMN IF NOT EXISTS type VARCHAR(30) DEFAULT 'regular'; -- 'regular' | 'ai_weak_topic'
ALTER TABLE tests ADD COLUMN IF NOT EXISTS status VARCHAR(30) DEFAULT 'available'; -- 'scheduled' | 'available' | 'completed' | 'expired'
ALTER TABLE tests ADD COLUMN IF NOT EXISTS unlock_at TIMESTAMPTZ;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS source_weak_topics JSONB DEFAULT '[]'::jsonb;

-- Indexes for efficient querying of scheduled tests and background cron job
CREATE INDEX IF NOT EXISTS idx_tests_type_status ON tests(type, status);
CREATE INDEX IF NOT EXISTS idx_tests_unlock_at ON tests(unlock_at) WHERE status = 'scheduled';
CREATE INDEX IF NOT EXISTS idx_tests_expires_at ON tests(expires_at) WHERE status = 'available';

-- 4. Extend test_attempts table for storing individual question responses & before/after accuracy stats
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS question_responses JSONB DEFAULT '[]'::jsonb;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS before_after_topics JSONB DEFAULT '[]'::jsonb;
