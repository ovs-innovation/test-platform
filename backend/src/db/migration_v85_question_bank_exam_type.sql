-- Migration v85: Add exam_type to question_bank and subjects for NEET & JEE separation
-- 1. Add exam_type column to question_bank table
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS exam_type VARCHAR(50) DEFAULT 'NEET';
CREATE INDEX IF NOT EXISTS idx_question_bank_exam_type ON question_bank(exam_type);

-- 2. Backfill existing questions:
-- All existing questions in the question bank are designated as NEET, except Mathematics which is JEE.
UPDATE question_bank
SET exam_type = 'NEET'
WHERE (exam_type IS NULL OR exam_type = '')
  AND LOWER(COALESCE(category, '')) != 'mathematics'
  AND LOWER(COALESCE(subject, '')) != 'mathematics';

UPDATE question_bank
SET exam_type = 'JEE'
WHERE LOWER(COALESCE(category, '')) = 'mathematics'
   OR LOWER(COALESCE(subject, '')) = 'mathematics';

-- 3. Ensure subjects table has proper exam_type set
UPDATE subjects SET exam_type = 'NEET' WHERE LOWER(name) IN ('botany', 'zoology');
UPDATE subjects SET exam_type = 'JEE' WHERE LOWER(name) = 'mathematics';
UPDATE subjects SET exam_type = 'NEET / JEE' WHERE LOWER(name) IN ('physics', 'chemistry');
