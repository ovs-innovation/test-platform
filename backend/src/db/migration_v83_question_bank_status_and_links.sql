-- Migration v83: Question Bank Status tracking and Provenance Linking to Tests
-- Allows tracking whether questions in the Question Bank have already been selected/used in tests.

-- 1. Ensure status column in question_bank table exists with default 'normal'
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'normal';
CREATE INDEX IF NOT EXISTS idx_question_bank_status ON question_bank(status);

-- 2. Add bank_question_id foreign key column to questions table to track which bank question was used
ALTER TABLE questions ADD COLUMN IF NOT EXISTS bank_question_id INTEGER REFERENCES question_bank(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_questions_bank_question_id ON questions(bank_question_id);

-- 3. Backfill bank_question_id for existing test questions by exact/trimmed question_text match
UPDATE questions q
SET bank_question_id = qb.id
FROM question_bank qb
WHERE q.bank_question_id IS NULL
  AND LOWER(TRIM(q.question_text)) = LOWER(TRIM(qb.question_text));

-- 4. Mark question_bank.status as 'already_chosen' for all bank questions linked to assessments/tests
UPDATE question_bank
SET status = 'already_chosen'
WHERE id IN (
  SELECT DISTINCT bank_question_id 
  FROM questions 
  WHERE bank_question_id IS NOT NULL
)
AND (status IS NULL OR status != 'already_chosen');
