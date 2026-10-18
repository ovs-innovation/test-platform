-- Migration v71: Exclude Student Personal Tests (Weak Topic & Mistake Book) from Admin Panel

-- 1. Ensure 'is_personal' and 'created_by' columns on tests table
ALTER TABLE tests ADD COLUMN IF NOT EXISTS is_personal BOOLEAN DEFAULT FALSE;
ALTER TABLE tests ADD COLUMN IF NOT EXISTS created_by INTEGER REFERENCES users(id) ON DELETE SET NULL;

-- 2. Ensure 'is_personal' column on assessments table
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS is_personal BOOLEAN DEFAULT FALSE;

-- 3. Mark existing personal weak topic and improvement tests in tests table
UPDATE tests
SET is_personal = TRUE
WHERE type = 'ai_weak_topic'
   OR type = 'mistake_book'
   OR type = 'personal'
   OR type = 'student_practice'
   OR test_name ILIKE '%Weak Topic%'
   OR test_name ILIKE '%Mistake Book%'
   OR test_name ILIKE 'AI Booster%'
   OR test_name ILIKE 'AI Improvement%';

-- 4. Mark existing personal tests in assessments table (e.g. from mistake book or student created)
UPDATE assessments
SET is_personal = TRUE,
    test_type = COALESCE(test_type, 'mistake_book')
WHERE created_by IN (SELECT id FROM users WHERE role = 'candidate')
   OR title ILIKE '%Mistake Book%'
   OR title ILIKE '%Weak Topic%'
   OR description ILIKE '%Personalized revision mock exam%';

-- 5. Add indexes for fast querying and filtering of non-personal tests in admin panel
CREATE INDEX IF NOT EXISTS idx_tests_is_personal ON tests(is_personal) WHERE is_personal = FALSE;
CREATE INDEX IF NOT EXISTS idx_assessments_is_personal ON assessments(is_personal) WHERE is_personal = FALSE;
