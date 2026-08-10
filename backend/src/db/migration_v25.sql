-- Migration v25: Sync Catalogue Test Series (9 Paid + 3 Free)
-- Preserves existing record IDs, enrollments, payments, and linked tests.

-- 1. Update existing legacy production records to match target catalogue specifications
UPDATE test_series
SET title = 'AIETS JEE Main Full-Length Mock Test Pack',
    slug = 'aiets-jee-main-mock-pack',
    description = '8 full-length NTA CBT mock tests for JEE Main with Physics, Chemistry and Mathematics, All India Rank and detailed solutions.',
    price = 999.00,
    is_free = false,
    validity_days = 180,
    exam_type = 'JEE Main',
    is_featured = false,
    test_count = 8,
    planned_tests = 8,
    display_order = 6,
    image_url = '/edvedum/banners/banner-jee-male2.png',
    is_active = true
WHERE title ILIKE 'JEE Main Full Test Series%' OR slug ILIKE 'jee-main-full-test-series%' OR slug = 'jee-main-2026';

UPDATE test_series
SET title = 'AIETS NEET-UG Two-Year Online CBT Program',
    slug = 'aiets-neet-ug-2028-two-year-online-cbt-program',
    description = 'A 24-month AIETS program for Classes XI and XII with 60 structured CBT assessments, rankings, analytics, detailed NCERT solutions and progressive NEET preparation.',
    price = 3999.00,
    is_free = false,
    validity_days = 730,
    exam_type = 'NEET',
    is_featured = false,
    test_count = 60,
    planned_tests = 60,
    display_order = 7,
    image_url = '/edvedum/banners/banner-neet-male.png',
    is_active = true
WHERE title ILIKE 'AIETS Two-Year Online CBT Program%' OR slug = 'aiets-two-year-online-cbt-program';

UPDATE test_series
SET title = 'AIETS NEET-UG 2027 Comprehensive Test Series',
    slug = 'neet-ug-2027-aiets-comprehensive-test-series',
    description = '39 structured CBT assessments for NEET-UG 2027 with NCERT focus, unit, part, cumulative & full-syllabus tests, All India Rank & analytics.',
    price = 1999.00,
    is_free = false,
    validity_days = 365,
    exam_type = 'NEET',
    is_featured = true,
    test_count = 39,
    planned_tests = 39,
    display_order = 3,
    image_url = '/edvedum/banners/banner-neet-mock.png',
    is_active = true
WHERE title ILIKE 'NEET-UG 2027 Comprehensive%' OR slug ILIKE 'neet-ug-2027-comprehensive%';

UPDATE test_series
SET title = 'AIETS NEET-UG Full-Length Mock Test Pack',
    slug = 'neet-ug-mock',
    description = '8 NEET pattern full-length CBT mocks with NCERT-focused Physics, Chemistry & Biology questions, All India Rank & step-by-step solutions.',
    price = 999.00,
    is_free = false,
    validity_days = 180,
    exam_type = 'NEET',
    is_featured = false,
    test_count = 8,
    planned_tests = 8,
    display_order = 8,
    image_url = '/edvedum/banners/banner-neet-bio.png',
    is_active = true
WHERE title ILIKE 'NEET UG Mock Test Pack%' OR slug = 'neet-ug-mock';

UPDATE test_series
SET title = 'AIETS NEET-PG Full-Length Mock Test Pack',
    slug = 'neet-pg-mock',
    description = '8 full-length NEET PG pattern CBT mocks covering all 19 medical subjects with clinical scenarios, image-based questions, All India Rank & explanations.',
    price = 999.00,
    is_free = false,
    validity_days = 180,
    exam_type = 'NEET PG',
    is_featured = false,
    test_count = 8,
    planned_tests = 8,
    display_order = 9,
    image_url = '/edvedum/banners/banner-neet-pg.png',
    is_active = true
WHERE title ILIKE 'NEET PG Mock Test Pack%' OR slug = 'neet-pg-mock';

-- 2. Upsert missing 4 paid series and 3 free diagnostic series by slug
INSERT INTO test_series (title, slug, description, price, is_free, validity_days, exam_type, is_featured, test_count, planned_tests, image_url, display_order, is_active)
VALUES
('AIETS NEET-PG 2027 Comprehensive Test Series', 'aiets-neet-pg-2027-comprehensive', '25 comprehensive CBT assessments for NEET PG 2027 covering 19 medical subjects, clinical vignettes, PYQ patterns, grand tests, All India Rank & explanations.', 1999.00, false, 365, 'NEET PG', true, 25, 25, '/edvedum/banners/banner-neet-pg.png', 1, true),
('AIETS JEE Main 2027 Comprehensive Test Series', 'aiets-jee-main-2027-comprehensive', '30 structured CBT assessments for JEE Main 2027 aspirants. Physics, Chemistry and Mathematics chapter, unit, part and full-syllabus tests with All India Rank & analytics.', 1999.00, false, 365, 'JEE Main', true, 30, 30, '/edvedum/banners/banner-jee-full.png', 2, true),
('AIETS NEET-PG Complete Online CBT Program', 'aiets-neet-pg-complete-program', 'Complete online CBT preparation program for NEET PG with 50 subject-wise and grand tests, clinical image questions, All India Rank & detailed performance analytics.', 3999.00, false, 730, 'NEET PG', false, 50, 50, '/edvedum/banners/banner-neetpg-female.png', 4, true),
('AIETS JEE Main Complete Online CBT Program', 'aiets-jee-main-2028-two-year', '24-month comprehensive online CBT program for Classes XI & XII with 60 structured assessments, ranking, subject analytics & detailed solutions for JEE Main.', 3999.00, false, 730, 'JEE Main', false, 60, 60, '/edvedum/banners/banner-jee-female.png', 5, true),
('JEE Main Full-Length Diagnostic Mock', 'jee-main-diagnostic-free', 'Full-length JEE Main diagnostic mock covering Physics, Chemistry and Mathematics with NTA CBT pattern, All India Rank and instant score analysis.', 0.00, true, 365, 'JEE Main', false, 1, 1, '/edvedum/banners/banner-free-mock.png', 10, true),
('NEET UG Biology & Chemistry Diagnostic Mock', 'neet-ug-diagnostic-free', 'Full-length NEET UG diagnostic mock covering Physics, Chemistry and Biology with NCERT pattern, All India Rank and step solutions.', 0.00, true, 365, 'NEET', false, 1, 1, '/edvedum/banners/banner-neet-bio.png', 11, true),
('NEET PG Clinical & High-Yield Diagnostic Mock', 'neet-pg-clinical-free', 'Full-length NEET PG diagnostic mock featuring clinical scenarios, 19 medical subjects, image-based questions and All India Rank predictor.', 0.00, true, 365, 'NEET PG', false, 1, 1, '/edvedum/banners/banner-neetpg-female.png', 12, true)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  is_free = EXCLUDED.is_free,
  validity_days = EXCLUDED.validity_days,
  exam_type = EXCLUDED.exam_type,
  is_featured = EXCLUDED.is_featured,
  test_count = EXCLUDED.test_count,
  planned_tests = EXCLUDED.planned_tests,
  image_url = EXCLUDED.image_url,
  display_order = EXCLUDED.display_order,
  is_active = true;

-- 3. Deactivate old/duplicate series (e.g. slug = 'free-diagnostic')
UPDATE test_series
SET is_active = false
WHERE slug NOT IN (
  'aiets-neet-pg-2027-comprehensive',
  'aiets-jee-main-2027-comprehensive',
  'neet-ug-2027-aiets-comprehensive-test-series',
  'aiets-neet-pg-complete-program',
  'aiets-jee-main-2028-two-year',
  'aiets-jee-main-mock-pack',
  'aiets-neet-ug-2028-two-year-online-cbt-program',
  'neet-ug-mock',
  'neet-pg-mock',
  'jee-main-diagnostic-free',
  'neet-ug-diagnostic-free',
  'neet-pg-clinical-free'
);
