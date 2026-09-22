-- Migration v46: Add duration_text to test_series and update NEET RM duration
ALTER TABLE test_series ADD COLUMN IF NOT EXISTS duration_text TEXT;

-- Update NEET RM series duration text
UPDATE test_series
SET duration_text = 'October 2026 – NEET 2027 (Exam Date to be updated after official announcement)'
WHERE slug LIKE '%neet-rm%' OR title ILIKE '%NEET RM%' OR title ILIKE '%Repeater Medical%';
