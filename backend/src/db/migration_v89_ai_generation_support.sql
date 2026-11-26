-- Migration v89: AI Question & Test Generation Staging and Schema Support
-- Safe, non-destructive migration extending question_type and adding draft staging tables

-- 1. Safely extend question_type enum if types do not already exist
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'question_type' AND e.enumlabel = 'match_the_following') THEN
    ALTER TYPE question_type ADD VALUE 'match_the_following';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type t JOIN pg_enum e ON t.oid = e.enumtypid WHERE t.typname = 'question_type' AND e.enumlabel = 'passage') THEN
    ALTER TYPE question_type ADD VALUE 'passage';
  END IF;
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- 2. Add passage and matching columns to question_bank
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS passage_id VARCHAR(100);
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS passage_title VARCHAR(255);
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS passage_text TEXT;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS match_pairs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS is_ai_generated BOOLEAN DEFAULT false;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS ai_metadata JSONB DEFAULT '{}'::jsonb;

-- 3. Add passage and matching columns to questions (assessment CBT runtime)
ALTER TABLE questions ADD COLUMN IF NOT EXISTS passage_id VARCHAR(100);
ALTER TABLE questions ADD COLUMN IF NOT EXISTS passage_title VARCHAR(255);
ALTER TABLE questions ADD COLUMN IF NOT EXISTS passage_text TEXT;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS match_pairs JSONB DEFAULT '[]'::jsonb;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS is_ai_generated BOOLEAN DEFAULT false;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS ai_metadata JSONB DEFAULT '{}'::jsonb;

-- 4. Create AI Generation Staging Drafts Table
CREATE TABLE IF NOT EXISTS ai_generation_drafts (
  id BIGSERIAL PRIMARY KEY,
  batch_id VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255),
  exam_type VARCHAR(50) NOT NULL, -- 'NEET', 'JEE'
  class_level VARCHAR(50),        -- 'Class 11', 'Class 12', '11+12'
  subject VARCHAR(100) NOT NULL,
  chapter VARCHAR(255),
  topic VARCHAR(255),
  difficulty VARCHAR(50) DEFAULT 'Medium',
  question_types JSONB DEFAULT '[]'::jsonb,
  diagram_req VARCHAR(50) DEFAULT 'Optional',
  explanation_req VARCHAR(50) DEFAULT 'Detailed Step-by-Step',
  additional_instructions TEXT,
  target_destination VARCHAR(50) DEFAULT 'draft',
  requested_count INT DEFAULT 10,
  total_generated INT DEFAULT 0,
  status VARCHAR(50) DEFAULT 'draft', -- 'draft', 'processing', 'completed', 'partial', 'approved', 'rejected'
  progress_percent INT DEFAULT 0,
  error_message TEXT,
  created_by INT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Create Individual Draft Questions Staging Table
CREATE TABLE IF NOT EXISTS ai_draft_questions (
  id BIGSERIAL PRIMARY KEY,
  draft_id BIGINT REFERENCES ai_generation_drafts(id) ON DELETE CASCADE,
  batch_id VARCHAR(100) NOT NULL,
  question_number INT DEFAULT 1,
  question_type VARCHAR(50) NOT NULL, -- 'single_choice', 'multi_select', 'assertion_reason', 'numerical', 'integer', 'match_the_following', 'passage'
  subject VARCHAR(100) NOT NULL,
  chapter VARCHAR(255),
  topic VARCHAR(255),
  difficulty VARCHAR(50) DEFAULT 'Medium',
  question_text TEXT NOT NULL,
  options JSONB DEFAULT '[]'::jsonb,
  correct_index INT,
  correct_indices JSONB DEFAULT '[]'::jsonb,
  numeric_answer NUMERIC,
  numerical_tolerance NUMERIC DEFAULT 0,
  assertion_text TEXT,
  reason_text TEXT,
  match_pairs JSONB DEFAULT '[]'::jsonb,
  passage_title VARCHAR(255),
  passage_text TEXT,
  solution TEXT NOT NULL,
  marks INT DEFAULT 4,
  negative_marks INT DEFAULT 1,
  content_type VARCHAR(50) DEFAULT 'text', -- 'text', 'diagram', 'graph'
  has_diagram BOOLEAN DEFAULT false,
  diagram_type VARCHAR(50) DEFAULT 'none',
  diagram_description TEXT,
  diagram_svg TEXT,
  image_url TEXT,
  solution_image_url TEXT,
  review_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'regenerated'
  admin_notes TEXT,
  validation_errors JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_draft_id ON ai_draft_questions(draft_id);
CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_batch ON ai_draft_questions(batch_id);
CREATE INDEX IF NOT EXISTS idx_ai_generation_drafts_status ON ai_generation_drafts(status);
