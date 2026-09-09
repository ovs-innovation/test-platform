-- Migration v43: Add chapter column to questions table
ALTER TABLE questions ADD COLUMN IF NOT EXISTS chapter VARCHAR(160);
