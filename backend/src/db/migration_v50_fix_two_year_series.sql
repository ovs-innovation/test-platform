-- Migration v50: Ensure 2-Year (Classes 11 + 12) series have target_class '11 + 12'
BEGIN;

-- Restore Class 12 One-Year series
UPDATE test_series
SET target_class = 'Class XII',
    program_type = 'One Year',
    target_year = '2027'
WHERE id IN (2, 20)
   OR slug IN ('neet-ug-mock', 'neet-ug-2027-aiets-comprehensive-test-series');

UPDATE test_series
SET target_class = 'Class XII & Droppers',
    program_type = 'One Year',
    target_year = '2027'
WHERE id IN (23, 24)
   OR slug IN ('aiets-jee-main-mock-pack', 'aiets-jee-main-2027-comprehensive');

-- Update 2-Year series
UPDATE test_series
SET target_class = '11 + 12',
    program_type = 'Two Year',
    target_year = '2028'
WHERE title ILIKE '%two year%'
   OR title ILIKE '%two-year%'
   OR title ILIKE '%2-year%'
   OR title ILIKE '%2 year%'
   OR title ILIKE '%11&12%'
   OR title ILIKE '%11 + 12%'
   OR title ILIKE '%11+12%'
   OR slug ILIKE '%two-year%'
   OR slug ILIKE '%two_year%'
   OR slug ILIKE '%2-year%'
   OR slug IN (
     'aiets-neet-ug-2028-two-year-online-cbt-program',
     'aiets-jee-main-2028-two-year',
     'jee-two-year-personalized-test-series-muc77wnn',
     'neet-two-year-personalized-test-series-mucagsu9',
     'neet-two-year-personalised-test-series-muc7i9jy'
   );

COMMIT;
