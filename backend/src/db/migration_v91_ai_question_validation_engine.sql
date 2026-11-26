-- Migration v91: AI Question Validation Engine Support
-- Adds dedicated validation status, detailed validation reports, review flags, and duplicate detection references

-- 1. Extend ai_draft_questions with validation status and structured report fields
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS validation_status VARCHAR(50) DEFAULT 'validation_pending';
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS validation_score INT DEFAULT 0;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS validation_report JSONB DEFAULT '{}'::jsonb;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS requires_manual_review BOOLEAN DEFAULT false;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS manual_review_reasons JSONB DEFAULT '[]'::jsonb;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS is_duplicate BOOLEAN DEFAULT false;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS duplicate_of_id BIGINT;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS similarity_score NUMERIC(5,2) DEFAULT 0;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS normalized_signature VARCHAR(255);

-- 2. Extend ai_generation_drafts with validation summary counters
ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS validation_passed_count INT DEFAULT 0;
ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS needs_correction_count INT DEFAULT 0;
ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS rejected_count INT DEFAULT 0;
ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS manual_review_count INT DEFAULT 0;

-- 3. Create indices for validation status queries and deduplication
CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_validation_status ON ai_draft_questions(validation_status);
CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_manual_review ON ai_draft_questions(requires_manual_review);
CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_signature ON ai_draft_questions(normalized_signature);
