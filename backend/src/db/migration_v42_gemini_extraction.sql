-- Migration v42: Add media, tables, and extraction_meta columns to questions table for Gemini Vision extraction

ALTER TABLE questions ADD COLUMN IF NOT EXISTS media JSONB DEFAULT '[]'::jsonb;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS tables JSONB DEFAULT '[]'::jsonb;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS extraction_meta JSONB DEFAULT '{}'::jsonb;
