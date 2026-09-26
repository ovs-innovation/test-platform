-- Migration v50: Order test series - NEET first, then JEE; and within each: RM -> Class 12 -> Two Year
BEGIN;

-- 1. NEET RM Personalised Test Series (First)
UPDATE test_series SET display_order = 10 WHERE id = 51 OR slug = 'neet-rm-personalised-test-series-muc7w7xw';

-- 2. NEET Class 12 One-Year Series (Second)
UPDATE test_series SET display_order = 20 WHERE id = 20 OR slug = 'neet-ug-2027-aiets-comprehensive-test-series';
UPDATE test_series SET display_order = 21 WHERE id = 2 OR slug = 'neet-ug-mock';

-- 3. NEET Two-Year Series (Third)
UPDATE test_series SET display_order = 30 WHERE id = 50 OR slug = 'neet-two-year-personalized-test-series-mucagsu9';
UPDATE test_series SET display_order = 31 WHERE id = 21 OR slug = 'aiets-neet-ug-2028-two-year-online-cbt-program';

-- 4. JEE Class 12 / Dropper Series (Fourth)
UPDATE test_series SET display_order = 40 WHERE id = 24 OR slug = 'aiets-jee-main-2027-comprehensive';
UPDATE test_series SET display_order = 41 WHERE id = 23 OR slug = 'aiets-jee-main-mock-pack';

-- 5. JEE Two-Year Series (Fifth)
UPDATE test_series SET display_order = 50 WHERE id = 44 OR slug = 'jee-two-year-personalized-test-series-muc77wnn';
UPDATE test_series SET display_order = 51 WHERE id = 25 OR slug = 'aiets-jee-main-2028-two-year';

-- 6. NEET-PG (Sixth)
UPDATE test_series SET display_order = 60 WHERE id = 37 OR slug = 'aiets-neet-pg-complete-program';

-- 7. Free Mocks (Seventh)
UPDATE test_series SET display_order = 70 WHERE id = 33 OR slug = 'neet-ug-diagnostic-free';
UPDATE test_series SET display_order = 71 WHERE id = 32 OR slug = 'jee-main-diagnostic-free';

COMMIT;
