-- Question bank + multi-select support

DO $$ BEGIN
  ALTER TYPE question_type ADD VALUE IF NOT EXISTS 'multi_select';
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE questions ADD COLUMN IF NOT EXISTS correct_indices JSONB DEFAULT '[]'::jsonb;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS bank_category VARCHAR(60);
ALTER TABLE answers ADD COLUMN IF NOT EXISTS selected_indices JSONB;

CREATE TABLE IF NOT EXISTS question_bank (
  id               SERIAL PRIMARY KEY,
  category         VARCHAR(60) NOT NULL,
  question_type    question_type NOT NULL DEFAULT 'mcq',
  question_text    TEXT NOT NULL,
  options          JSONB NOT NULL DEFAULT '[]'::jsonb,
  correct_index    INTEGER NOT NULL DEFAULT 0,
  correct_indices  JSONB DEFAULT '[]'::jsonb,
  marks            INTEGER NOT NULL DEFAULT 1 CHECK (marks > 0),
  starter_code     TEXT DEFAULT '',
  test_cases       JSONB DEFAULT '[]'::jsonb,
  language         VARCHAR(30) DEFAULT 'javascript',
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_question_bank_category ON question_bank(category);
