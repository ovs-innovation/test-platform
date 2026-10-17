-- Migration v63: NEET Botany & Zoology Split and Section-A/B/C/D Alignment

-- 1. Ensure Botany & Zoology exist in subjects table
INSERT INTO subjects (name, slug, icon)
VALUES 
  ('Botany', 'botany', '🌿'),
  ('Zoology', 'zoology', '🦁')
ON CONFLICT (name) DO NOTHING;

-- 2. Standardize NEET 180-question tests: Physics (1-45), Chemistry (46-90), Botany (91-135), Zoology (136-180)
UPDATE questions q
SET 
  subject = CASE 
    WHEN q.position >= 1 AND q.position <= 45 THEN 'Physics'
    WHEN q.position >= 46 AND q.position <= 90 THEN 'Chemistry'
    WHEN q.position >= 91 AND q.position <= 135 THEN 'Botany'
    WHEN q.position >= 136 AND q.position <= 180 THEN 'Zoology'
    ELSE q.subject
  END,
  bank_category = CASE 
    WHEN q.position >= 1 AND q.position <= 45 THEN 'Physics'
    WHEN q.position >= 46 AND q.position <= 90 THEN 'Chemistry'
    WHEN q.position >= 91 AND q.position <= 135 THEN 'Botany'
    WHEN q.position >= 136 AND q.position <= 180 THEN 'Zoology'
    ELSE q.bank_category
  END
WHERE q.assessment_id IN (
  SELECT a.id FROM assessments a
  LEFT JOIN tests t ON t.id = a.id
  WHERE (
    a.title ILIKE '%NEET%' 
    OR COALESCE(t.test_name, '') ILIKE '%NEET%'
    OR COALESCE(t.syllabus, '') ILIKE '%NEET%'
    OR (SELECT COUNT(*) FROM questions q2 WHERE q2.assessment_id = a.id) = 180
  )
) AND (
  SELECT COUNT(*) FROM questions q3 WHERE q3.assessment_id = q.assessment_id
) BETWEEN 170 AND 190;

-- 3. Standardize NEET 200-question tests: Physics (1-50), Chemistry (51-100), Botany (101-150), Zoology (151-200)
UPDATE questions q
SET 
  subject = CASE 
    WHEN q.position >= 1 AND q.position <= 50 THEN 'Physics'
    WHEN q.position >= 51 AND q.position <= 100 THEN 'Chemistry'
    WHEN q.position >= 101 AND q.position <= 150 THEN 'Botany'
    WHEN q.position >= 151 AND q.position <= 200 THEN 'Zoology'
    ELSE q.subject
  END,
  bank_category = CASE 
    WHEN q.position >= 1 AND q.position <= 50 THEN 'Physics'
    WHEN q.position >= 51 AND q.position <= 100 THEN 'Chemistry'
    WHEN q.position >= 101 AND q.position <= 150 THEN 'Botany'
    WHEN q.position >= 151 AND q.position <= 200 THEN 'Zoology'
    ELSE q.bank_category
  END
WHERE q.assessment_id IN (
  SELECT a.id FROM assessments a
  LEFT JOIN tests t ON t.id = a.id
  WHERE (
    a.title ILIKE '%NEET%' 
    OR COALESCE(t.test_name, '') ILIKE '%NEET%'
    OR COALESCE(t.syllabus, '') ILIKE '%NEET%'
    OR (SELECT COUNT(*) FROM questions q2 WHERE q2.assessment_id = a.id) = 200
  )
) AND (
  SELECT COUNT(*) FROM questions q3 WHERE q3.assessment_id = q.assessment_id
) BETWEEN 195 AND 205;

-- 4. For any other NEET tests where questions remain as 'Biology', split into Botany (first half) and Zoology (second half)
WITH bio_ranked AS (
  SELECT 
    q.id,
    ROW_NUMBER() OVER (PARTITION BY q.assessment_id ORDER BY q.position ASC, q.id ASC) AS bio_rank,
    COUNT(*) OVER (PARTITION BY q.assessment_id) AS total_bio
  FROM questions q
  JOIN assessments a ON a.id = q.assessment_id
  LEFT JOIN tests t ON t.id = a.id
  WHERE (
    a.title ILIKE '%NEET%' 
    OR COALESCE(t.test_name, '') ILIKE '%NEET%'
    OR COALESCE(t.syllabus, '') ILIKE '%NEET%'
  )
  AND (LOWER(COALESCE(q.subject, '')) = 'biology' OR LOWER(COALESCE(q.bank_category, '')) = 'biology')
)
UPDATE questions q
SET 
  subject = CASE WHEN br.bio_rank <= CEIL(br.total_bio::numeric / 2.0) THEN 'Botany' ELSE 'Zoology' END,
  bank_category = CASE WHEN br.bio_rank <= CEIL(br.total_bio::numeric / 2.0) THEN 'Botany' ELSE 'Zoology' END
FROM bio_ranked br
WHERE q.id = br.id;
