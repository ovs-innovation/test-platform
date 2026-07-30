-- Migration v17: Botany & Zoology Subject Split for NEET, eBook Tagging, AIR & Percentile fields

-- 1. Ensure Botany and Zoology subjects exist in subjects table
INSERT INTO subjects (name, slug, icon)
VALUES 
  ('Botany', 'botany', '🌿'),
  ('Zoology', 'zoology', '🦁')
ON CONFLICT (name) DO NOTHING;

-- 2. Extend ebooks table to support subject and chapter tagging for weak topic recommendations
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS subject_id INTEGER REFERENCES subjects(id) ON DELETE SET NULL;
ALTER TABLE ebooks ADD COLUMN IF NOT EXISTS chapter_id INTEGER REFERENCES chapters(id) ON DELETE SET NULL;

-- 3. Extend test_attempts table for AIR and Percentile
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS all_india_rank INTEGER DEFAULT NULL;
ALTER TABLE test_attempts ADD COLUMN IF NOT EXISTS percentile NUMERIC(5,2) DEFAULT NULL;

-- 4. Extend answers table for question level time tracking
ALTER TABLE answers ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER DEFAULT 0;

-- 4. Re-categorize existing Biology questions to Botany / Zoology where possible
UPDATE questions q
SET subject_id = (SELECT id FROM subjects WHERE name = 'Botany' LIMIT 1)
WHERE (
  LOWER(COALESCE(q.bank_category, '')) SIMILAR TO '%(botany|plant|photosynthes|chloroplast|flowering|root|stem|leaf|xylem|phloem|morphology of flowering|anatomy of flowering)%'
  OR LOWER(COALESCE(q.question_text, '')) SIMILAR TO '%(botany|plant|photosynthes|chloroplast|flowering|xylem|phloem|guttation|transpiration)%'
);

UPDATE questions q
SET subject_id = (SELECT id FROM subjects WHERE name = 'Zoology' LIMIT 1)
WHERE (
  LOWER(COALESCE(q.bank_category, '')) SIMILAR TO '%(zoology|animal|human|physiol|nephron|kidney|heart|digestion|circulation|excretion|locomotion|neural|endocrine|reproduction in animals)%'
  OR LOWER(COALESCE(q.question_text, '')) SIMILAR TO '%(zoology|animal|human|nephron|kidney|heart|digestion|circulation|excretion|hormone|insulin|neuron|blood)%'
);

-- 5. Add index on ebooks subject/chapter tags
CREATE INDEX IF NOT EXISTS idx_ebooks_subject ON ebooks(subject_id);
CREATE INDEX IF NOT EXISTS idx_ebooks_chapter ON ebooks(chapter_id);
