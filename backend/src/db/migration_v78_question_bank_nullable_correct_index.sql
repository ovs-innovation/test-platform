-- Migration v78: Allow correct_index to be NULL in question_bank when uploaded without answer keys
ALTER TABLE question_bank ALTER COLUMN correct_index DROP NOT NULL;
ALTER TABLE question_bank DROP CONSTRAINT IF EXISTS question_bank_correct_index_check;
ALTER TABLE question_bank ADD CONSTRAINT question_bank_correct_index_check CHECK (correct_index IS NULL OR correct_index >= 0);
