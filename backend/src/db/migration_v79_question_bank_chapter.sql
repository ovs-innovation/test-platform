-- Migration v79: Add chapter column to question_bank table
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS chapter VARCHAR(160);
