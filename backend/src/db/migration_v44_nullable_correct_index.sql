-- Migration v44: Allow correct_index to be NULL when test questions are uploaded without answer keys
ALTER TABLE questions ALTER COLUMN correct_index DROP NOT NULL;
ALTER TABLE questions DROP CONSTRAINT IF EXISTS questions_correct_index_check;
ALTER TABLE questions ADD CONSTRAINT questions_correct_index_check CHECK (correct_index IS NULL OR correct_index >= 0);
