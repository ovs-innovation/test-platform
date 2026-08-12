-- Production v26: Add exam_type column to subjects table
ALTER TABLE subjects ADD COLUMN IF NOT EXISTS exam_type VARCHAR(50) DEFAULT 'JEE';
