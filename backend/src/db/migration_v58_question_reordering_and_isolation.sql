-- Migration v58: Question Reordering, Positioning and Original Number Preservation

ALTER TABLE questions ADD COLUMN IF NOT EXISTS original_question_number INTEGER;

-- Backfill original_question_number where null
UPDATE questions
SET original_question_number = COALESCE(
  NULLIF(regexp_replace(COALESCE(extraction_meta->>'original_question_number', ''), '\D', '', 'g'), '')::int,
  NULLIF(regexp_replace(COALESCE(extraction_meta->>'qNum', ''), '\D', '', 'g'), '')::int,
  position
)
WHERE original_question_number IS NULL;

-- Optimize indexes for question order and section queries
CREATE INDEX IF NOT EXISTS idx_questions_assessment_pos_id ON questions (assessment_id, position ASC, id ASC);
CREATE INDEX IF NOT EXISTS idx_questions_assessment_section_pos ON questions (assessment_id, section_id, position ASC);
