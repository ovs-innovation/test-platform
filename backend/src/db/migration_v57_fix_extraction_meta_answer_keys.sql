-- Migration v57: Fix extraction_meta hasAnswerKey and needsReview flags for all questions with valid answers
UPDATE questions
SET extraction_meta = jsonb_set(
    jsonb_set(COALESCE(extraction_meta, '{}'::jsonb), '{hasAnswerKey}', 'true'::jsonb, true),
    '{needsReview}', 'false'::jsonb, true
)
WHERE (correct_index IS NOT NULL OR numeric_answer IS NOT NULL OR solution IS NOT NULL OR explanation IS NOT NULL);
