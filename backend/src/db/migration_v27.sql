-- Migration v27: Ensure subject and topic fields on questions, question_bank, tests, and assessments

-- 1. Extend questions table with subject and topic columns
ALTER TABLE questions ADD COLUMN IF NOT EXISTS subject VARCHAR(120);
ALTER TABLE questions ADD COLUMN IF NOT EXISTS topic VARCHAR(160);

-- 2. Extend question_bank table with subject and topic columns
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS subject VARCHAR(120);
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS topic VARCHAR(160);

-- 3. Extend tests table with subject and subjects columns
ALTER TABLE tests ADD COLUMN IF NOT EXISTS subject VARCHAR(255);
ALTER TABLE tests ADD COLUMN IF NOT EXISTS subjects JSONB DEFAULT '[]'::jsonb;

-- 4. Extend assessments table with subject column
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS subject VARCHAR(255);

-- 5. Backfill questions subject & topic from linked subjects and chapters tables where available
UPDATE questions q
SET subject = s.name
FROM subjects s
WHERE q.subject_id = s.id AND (q.subject IS NULL OR q.subject = '');

UPDATE questions q
SET topic = c.name
FROM chapters c
WHERE q.chapter_id = c.id AND (q.topic IS NULL OR q.topic = '');

-- Infer subject from bank_category or question_text if subject is still NULL
UPDATE questions
SET subject = CASE
  WHEN LOWER(COALESCE(bank_category, '')) LIKE '%botany%' OR LOWER(COALESCE(question_text, '')) LIKE '%botany%' THEN 'Botany'
  WHEN LOWER(COALESCE(bank_category, '')) LIKE '%zoology%' OR LOWER(COALESCE(question_text, '')) LIKE '%zoology%' THEN 'Zoology'
  WHEN LOWER(COALESCE(bank_category, '')) LIKE '%biology%' OR LOWER(COALESCE(question_text, '')) LIKE '%biology%' OR LOWER(COALESCE(bank_category, '')) LIKE '%bio%' THEN 'Biology'
  WHEN LOWER(COALESCE(bank_category, '')) LIKE '%physics%' OR LOWER(COALESCE(question_text, '')) LIKE '%physics%' THEN 'Physics'
  WHEN LOWER(COALESCE(bank_category, '')) LIKE '%chemistry%' OR LOWER(COALESCE(question_text, '')) LIKE '%chem%' THEN 'Chemistry'
  WHEN LOWER(COALESCE(bank_category, '')) LIKE '%math%' OR LOWER(COALESCE(question_text, '')) LIKE '%math%' THEN 'Mathematics'
  ELSE 'General'
END
WHERE subject IS NULL OR subject = '';

-- Infer topic from bank_category or default if topic is still NULL
UPDATE questions
SET topic = CASE
  WHEN bank_category IS NOT NULL AND bank_category != '' THEN bank_category
  ELSE 'General Concepts'
END
WHERE topic IS NULL OR topic = '';

-- Sync question_bank table subject and topic
UPDATE question_bank qb
SET subject = s.name
FROM subjects s
WHERE qb.subject_id = s.id AND (qb.subject IS NULL OR qb.subject = '');

UPDATE question_bank qb
SET topic = c.name
FROM chapters c
WHERE qb.chapter_id = c.id AND (qb.topic IS NULL OR qb.topic = '');

UPDATE question_bank
SET subject = COALESCE(subject, 'General'),
    topic = COALESCE(topic, 'General Concepts')
WHERE subject IS NULL OR topic IS NULL;

-- 6. Backfill test subjects from test questions
DO $$
BEGIN
  -- Update tests.subject based on actual questions linked to the test
  UPDATE tests t
  SET subject = sub_info.covered_subjects
  FROM (
    SELECT 
      a.id AS assessment_id,
      STRING_AGG(DISTINCT q.subject, ', ' ORDER BY q.subject) AS covered_subjects
    FROM assessments a
    JOIN questions q ON q.assessment_id = a.id
    WHERE q.subject IS NOT NULL AND q.subject != ''
    GROUP BY a.id
  ) sub_info
  JOIN assessments a ON a.id = sub_info.assessment_id
  WHERE (t.test_name = a.title OR t.title = a.title) AND (t.subject IS NULL OR t.subject = '');

  -- Update assessments.subject
  UPDATE assessments a
  SET subject = sub_info.covered_subjects
  FROM (
    SELECT 
      q.assessment_id,
      STRING_AGG(DISTINCT q.subject, ', ' ORDER BY q.subject) AS covered_subjects
    FROM questions q
    WHERE q.subject IS NOT NULL AND q.subject != ''
    GROUP BY q.assessment_id
  ) sub_info
  WHERE a.id = sub_info.assessment_id AND (a.subject IS NULL OR a.subject = '');

EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;
