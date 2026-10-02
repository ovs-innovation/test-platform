-- Migration v53: Add translations column to questions table for multilingual exam support (Hindi/English)
ALTER TABLE questions ADD COLUMN IF NOT EXISTS translations JSONB DEFAULT '{}'::jsonb;
