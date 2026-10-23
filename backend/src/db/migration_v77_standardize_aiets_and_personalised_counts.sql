-- Migration v77: Standardize AIETS and Personalised Test Series Counts and Descriptions
-- As per curriculum requirements:
-- 1. Every AIETS One Year: 39 CBT tests + 1 Pre NEET/JEE = 40 tests
-- 2. AIETS Two Year: 78 CBT tests + 1 Pre NEET/JEE = 79 tests
-- 3. Every Personalised One Year: 39 CBT tests + 20 Personalised tests + 1 Pre NEET/JEE = 60 tests
-- 4. Every Personalised Two Year: 78 CBT tests + 30 Personalised tests + 1 Pre NEET/JEE = 109 tests

BEGIN;

-- 1. AIETS One-Year Programs (40 Tests total: 39 CBT + 1 Pre NEET/JEE)
UPDATE test_series
SET planned_tests = 40,
    test_count = 40,
    description = 'Includes 39 AIETS CBT tests + 1 Pre-NEET mock test (40 tests total).'
WHERE id = 5 OR slug = 'neet-ug-2027-aiets-comprehensive-test-series';

UPDATE test_series
SET planned_tests = 40,
    test_count = 40,
    description = 'Includes 39 AIETS CBT tests + 1 Pre-NEET mock test (40 tests total).'
WHERE id = 22 OR slug = 'aiets-neet-rm-test-series-mucdzyc2';

UPDATE test_series
SET planned_tests = 40,
    test_count = 40,
    description = 'Includes 39 AIETS CBT tests + 1 Pre-JEE mock test (40 tests total).'
WHERE id = 28 OR slug = 'aiets-for-12th-jee-mul3e926';

UPDATE test_series
SET planned_tests = 40,
    test_count = 40,
    description = 'Includes 39 AIETS CBT tests + 1 Pre-JEE mock test (40 tests total).'
WHERE id = 29 OR slug = 'aiets-for-repeater-jee-mul3gdpv';


-- 2. AIETS Two-Year Programs (79 Tests total: 78 CBT + 1 Pre NEET/JEE)
UPDATE test_series
SET planned_tests = 79,
    test_count = 79,
    description = 'Includes 78 AIETS CBT tests + 1 Pre-NEET mock test across Classes 11 & 12 (79 tests total).'
WHERE id = 24 OR slug = 'aiets-two-year-for-11-12-target-neet-2028-mui3kktq';

UPDATE test_series
SET planned_tests = 79,
    test_count = 79,
    description = 'Includes 78 AIETS CBT tests + 1 Pre-JEE mock test across Classes 11 & 12 (79 tests total).'
WHERE id = 26 OR slug = 'aiets-for-11-12-jee-two-year-mui6wrjl';


-- 3. Personalised One-Year Programs (60 Tests total: 39 CBT + 20 Personalised + 1 Pre NEET/JEE)
UPDATE test_series
SET planned_tests = 60,
    test_count = 60,
    description = 'Includes 39 AIETS CBT tests + 20 personalised tests + 1 Pre-NEET test (60 tests total).'
WHERE id = 20 OR slug = 'neet-class-12-personalised-test-series-muc7uf70';

UPDATE test_series
SET planned_tests = 60,
    test_count = 60,
    description = 'Includes 39 AIETS CBT tests + 20 personalised tests + 1 Pre-NEET test (60 tests total).'
WHERE id = 21 OR slug = 'neet-rm-personalised-test-series-muc7w7xw';

UPDATE test_series
SET planned_tests = 60,
    test_count = 60,
    description = 'Includes 39 AIETS CBT tests + 20 personalised tests + 1 Pre-JEE test (60 tests total).'
WHERE id = 17 OR slug = 'jee-class-12-personalised-test-series-muc7pyej';

UPDATE test_series
SET planned_tests = 60,
    test_count = 60,
    description = 'Includes 39 AIETS CBT tests + 20 personalised tests + 1 Pre-JEE test (60 tests total).'
WHERE id = 18 OR slug = 'jee-rep-personalised-test-series-muc7ru7f';


-- 4. Personalised Two-Year Programs (109 Tests total: 78 CBT + 30 Personalised + 1 Pre NEET/JEE)
UPDATE test_series
SET planned_tests = 109,
    test_count = 109,
    description = 'Includes 78 AIETS CBT tests + 30 personalised tests + 1 Pre-NEET test across Classes 11 & 12 (109 tests total).'
WHERE id = 19 OR slug = 'neet-two-year-personalised-test-series-muc7t9jy';

UPDATE test_series
SET planned_tests = 109,
    test_count = 109,
    description = 'Includes 78 AIETS CBT tests + 30 personalised tests + 1 Pre-JEE test across Classes 11 & 12 (109 tests total).'
WHERE id = 16 OR slug = 'jee-two-year-personalized-test-series-muc7nrkw';

COMMIT;
