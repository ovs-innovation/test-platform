-- SQL Migration Script: Replace standalone "NTA" in existing database records with "NEET / JEE"
-- Run this script to update database text fields for test series, test packages, assessments, tests, and FAQs.

BEGIN;

-- 1. Update Test Series descriptions
UPDATE test_series 
SET description = REPLACE(description, 'NTA CBT', 'NEET / JEE CBT')
WHERE description LIKE '%NTA CBT%';

UPDATE test_series 
SET description = REPLACE(description, 'NTA-pattern', 'NEET / JEE-pattern')
WHERE description LIKE '%NTA-pattern%';

UPDATE test_series 
SET description = REPLACE(description, 'NTA-style', 'NEET / JEE-style')
WHERE description LIKE '%NTA-style%';

-- 2. Update Test Packages descriptions
UPDATE test_packages 
SET description = REPLACE(description, 'NTA CBT', 'CBT')
WHERE description LIKE '%NTA CBT%';

-- 3. Update Assessments titles & descriptions
UPDATE assessments 
SET title = REPLACE(title, 'NTA ', 'NEET / JEE ')
WHERE title LIKE '%NTA %';

UPDATE assessments 
SET description = REPLACE(description, 'NTA Pattern', 'NEET / JEE Pattern')
WHERE description LIKE '%NTA Pattern%';

UPDATE assessments 
SET description = REPLACE(description, 'NTA-pattern', 'NEET / JEE-pattern')
WHERE description LIKE '%NTA-pattern%';

UPDATE assessments 
SET description = REPLACE(description, 'NTA CBT', 'NEET / JEE CBT')
WHERE description LIKE '%NTA CBT%';

UPDATE assessments 
SET instructions = REPLACE(instructions, 'NTA-pattern', 'NEET / JEE-pattern')
WHERE instructions LIKE '%NTA-pattern%';

-- 4. Update Legacy Tests table (if present)
UPDATE tests 
SET syllabus = REPLACE(syllabus, 'NTA ', 'NEET / JEE ')
WHERE syllabus LIKE '%NTA %';

UPDATE tests 
SET test_name = REPLACE(test_name, 'NTA ', 'NEET / JEE ')
WHERE test_name LIKE '%NTA %';

-- 5. Update FAQs / Blog Posts text
UPDATE faqs 
SET content = REPLACE(content, 'NTA-style', 'NEET / JEE style')
WHERE content LIKE '%NTA-style%';

UPDATE blogs 
SET title = REPLACE(title, 'NTA CBT', 'NEET / JEE CBT')
WHERE title LIKE '%NTA CBT%';

COMMIT;
