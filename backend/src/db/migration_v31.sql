-- Migration v31: Permanent update for the 3 One-Year Test Series cards in PostgreSQL database

ALTER TABLE test_series ADD COLUMN IF NOT EXISTS tags jsonb;

-- 1. JEE Main Class 12 One-Year CBT Program (id: 1 or slug: aiets-jee-main-mock-pack)
UPDATE test_series
SET title = 'AIETS JEE Main Class 12 One-Year CBT Program',
    description = 'One-year AIETS CBT program designed for Class 12 JEE aspirants with structured assessments, performance analytics and exam-focused practice.',
    exam_type = 'JEE Main',
    validity_days = 365,
    test_count = 0,
    planned_tests = NULL,
    tags = '["Physics, Chem & Maths", "Class 12", "JEE CBT Interface"]'::jsonb,
    price = 999.00,
    image_url = '/edvedum/jee-student-ai.png',
    updated_at = NOW()
WHERE slug = 'aiets-jee-main-mock-pack' OR id = 1;

-- 2. NEET-UG Class 12 One-Year CBT Program (id: 2 or slug: neet-ug-mock)
UPDATE test_series
SET title = 'AIETS NEET-UG Class 12 One-Year CBT Program',
    description = 'One-year AIETS CBT program designed for Class 12 NEET-UG aspirants with structured assessments, NCERT-focused practice and detailed performance analytics.',
    exam_type = 'NEET',
    validity_days = 365,
    test_count = 0,
    planned_tests = NULL,
    tags = '["Physics, Chem & Bio", "Class 12", "NCERT Focused"]'::jsonb,
    price = 999.00,
    image_url = '/edvedum/neet-student-ai.png',
    updated_at = NOW()
WHERE slug = 'neet-ug-mock' OR id = 2;

-- 3. NEET-PG One-Year CBT Test Series (id: 3 or slug: neet-pg-mock)
UPDATE test_series
SET title = 'AIETS NEET-PG One-Year CBT Test Series',
    description = 'One-year AIETS CBT test series for NEET-PG aspirants covering all 19 medical subjects with clinical vignettes, structured assessments, grand mocks and performance analytics.',
    exam_type = 'NEET PG',
    validity_days = 365,
    test_count = 0,
    planned_tests = NULL,
    tags = '["19 Medical Subjects", "Clinical Vignettes", "Grand Mocks"]'::jsonb,
    price = 999.00,
    image_url = '/edvedum/neetpg-student-ai.png',
    updated_at = NOW()
WHERE slug = 'neet-pg-mock' OR id = 3;
