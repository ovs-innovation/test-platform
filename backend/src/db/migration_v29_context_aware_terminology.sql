-- SQL Migration Script: Context-Aware Exam Terminology Updates (v29)
-- Updates database text fields in test_series, test_packages, assessments, tests, and FAQs
-- based on specific exam categories (JEE, NEET UG, NEET PG, Foundation, Shared).

BEGIN;

-- 1. JEE Main / Advanced Records: Update descriptions & titles to use JEE / JEE Main
UPDATE test_series
SET description = REPLACE(REPLACE(description, 'NEET / JEE CBT', 'JEE CBT'), 'NTA CBT', 'JEE CBT')
WHERE (exam_type ILIKE '%JEE%' OR title ILIKE '%JEE%' OR slug ILIKE '%jee%');

UPDATE test_series
SET description = REPLACE(description, 'NEET / JEE-pattern', 'JEE-pattern')
WHERE (exam_type ILIKE '%JEE%' OR title ILIKE '%JEE%' OR slug ILIKE '%jee%');

UPDATE test_packages
SET description = REPLACE(description, 'NEET / JEE', 'JEE')
WHERE (package_name ILIKE '%JEE%' OR description ILIKE '%JEE%');

UPDATE assessments
SET description = REPLACE(REPLACE(description, 'NEET / JEE CBT', 'JEE CBT'), 'Proctored NTA CBT', 'Proctored JEE CBT')
WHERE (title ILIKE '%JEE%' OR test_type ILIKE '%JEE%');

-- 2. NEET UG Records: Update descriptions & titles to use NEET UG
UPDATE test_series
SET description = REPLACE(REPLACE(description, 'NEET / JEE-pattern', 'NEET UG-pattern'), 'NEET pattern', 'NEET UG pattern')
WHERE (exam_type = 'NEET' OR title ILIKE '%NEET-UG%' OR slug ILIKE '%neet-ug%');

UPDATE test_packages
SET description = REPLACE(description, 'NEET / JEE-Pattern', 'NEET UG-Pattern')
WHERE (package_name ILIKE '%NEET-UG%' OR package_name ILIKE '%NEET UG%');

UPDATE assessments
SET description = REPLACE(description, 'NEET / JEE Pattern', 'NEET UG Pattern')
WHERE (title ILIKE '%NEET%' OR test_type ILIKE '%NEET%');

-- 3. NEET PG Records: Update descriptions to use NEET PG
UPDATE test_series
SET description = REPLACE(description, 'NEET pattern', 'NEET PG pattern')
WHERE (exam_type = 'NEET PG' OR title ILIKE '%NEET-PG%' OR slug ILIKE '%neet-pg%');

-- 4. Shared / Multi-Exam B2B & Platform FAQs: Keep or format as NEET / JEE where multi-exam is supported
UPDATE faqs
SET content = REPLACE(content, 'NTA-style', 'NEET / JEE style')
WHERE category = 'exam' AND content LIKE '%NTA-style%';

COMMIT;
