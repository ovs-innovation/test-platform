-- SQL Migration Script: Update 3 Full-Length Mock Test Pack Cards (v30)
-- Updates JEE Main and NEET-UG mock pack cards to Class 12 One-Year CBT Programs,
-- while preserving NEET-PG Full-Length Mock Test Pack as PG-specific.

BEGIN;

-- 1. Update JEE Main Card (aiets-jee-main-mock-pack)
UPDATE test_series
SET title = 'AIETS JEE Main Class 12 One-Year CBT Program',
    description = 'One-year AIETS CBT program designed for Class 12 JEE aspirants with structured assessments, performance analytics and exam-focused practice.',
    validity_days = 365,
    test_count = 0,
    planned_tests = NULL
WHERE slug = 'aiets-jee-main-mock-pack';

-- 2. Update NEET-UG Card (neet-ug-mock)
UPDATE test_series
SET title = 'AIETS NEET-UG Class 12 One-Year CBT Program',
    description = 'One-year AIETS CBT program designed for Class 12 NEET-UG aspirants with structured assessments, NCERT-focused practice and detailed performance analytics.',
    validity_days = 365,
    test_count = 0,
    planned_tests = NULL
WHERE slug = 'neet-ug-mock';

-- 3. Update NEET-PG Card (neet-pg-mock)
UPDATE test_series
SET title = 'AIETS NEET-PG One-Year CBT Test Series',
    description = 'One-year AIETS CBT test series for NEET-PG aspirants covering all 19 medical subjects with clinical vignettes, structured assessments, grand mocks and performance analytics.',
    validity_days = 365,
    test_count = 0,
    planned_tests = NULL
WHERE slug = 'neet-pg-mock';

COMMIT;
