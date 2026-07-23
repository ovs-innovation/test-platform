-- Migration v12: Add support for JEE & NEET question types: single_choice, multi_select, integer, numerical, assertion_reason

DO $$ BEGIN
  ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'single_choice';
  ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'integer';
  ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'numerical';
  ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'assertion_reason';
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE questions ADD COLUMN IF NOT EXISTS numeric_answer NUMERIC;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS numerical_tolerance NUMERIC DEFAULT 0;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS assertion_text TEXT;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS reason_text TEXT;

ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS numeric_answer NUMERIC;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS numerical_tolerance NUMERIC DEFAULT 0;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS assertion_text TEXT;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS reason_text TEXT;

ALTER TABLE answers ADD COLUMN IF NOT EXISTS numeric_answer NUMERIC;
