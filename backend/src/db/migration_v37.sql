-- Migration v37: Add solution_image_url column to questions and question_bank tables
ALTER TABLE questions ADD COLUMN IF NOT EXISTS solution_image_url TEXT;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS solution_image_url TEXT;
