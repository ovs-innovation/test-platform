-- Add raw_password to users and student_profiles
ALTER TABLE users ADD COLUMN IF NOT EXISTS raw_password TEXT;
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS raw_password TEXT;

