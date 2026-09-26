-- Migration v49: Correct target_class, program_type and target_year for test series
BEGIN;

-- Class 11 / Two-Year Programs
UPDATE test_series
SET target_class = 'Classes XI & XII',
    program_type = 'Two Year',
    target_year = '2028'
WHERE id IN (21, 25, 44, 50)
   OR slug IN (
     'aiets-neet-ug-2028-two-year-online-cbt-program',
     'aiets-jee-main-2028-two-year',
     'jee-two-year-personalized-test-series-muc77wnn',
     'neet-two-year-personalized-test-series-mucagsu9'
   );

-- Dropper / RM Series
UPDATE test_series
SET target_class = 'Dropper / RM',
    program_type = 'Repeater',
    target_year = '2027'
WHERE id = 51
   OR slug = 'neet-rm-personalised-test-series-muc7w7xw';

-- Class 12 NEET 1-Year Series
UPDATE test_series
SET target_class = 'Class XII',
    program_type = 'One Year',
    target_year = '2027'
WHERE id IN (2, 20)
   OR slug IN ('neet-ug-mock', 'neet-ug-2027-aiets-comprehensive-test-series');

-- Class 12 JEE 1-Year Series (also applicable to Droppers)
UPDATE test_series
SET target_class = 'Class XII & Droppers',
    program_type = 'One Year',
    target_year = '2027'
WHERE id IN (23, 24)
   OR slug IN ('aiets-jee-main-mock-pack', 'aiets-jee-main-2027-comprehensive');

COMMIT;
