-- Migration v92: AI Draft Audit Trail, Tracking, and Deduplication Protection
-- Adds audit metadata, tracking of admin approval/modification, and linking to question_bank

ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS bank_question_id BIGINT REFERENCES question_bank(id) ON DELETE SET NULL;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS approved_by INT REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS modified_by INT REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE ai_draft_questions ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS approved_by INT REFERENCES users(id) ON DELETE SET NULL;
ALTER TABLE ai_generation_drafts ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_bank_qid ON ai_draft_questions(bank_question_id);
CREATE INDEX IF NOT EXISTS idx_ai_draft_questions_review_status ON ai_draft_questions(review_status);
