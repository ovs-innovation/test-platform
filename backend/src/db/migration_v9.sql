-- Production v9: Add available_from and available_until to assessments table for scheduling.
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS available_from TIMESTAMPTZ DEFAULT NULL;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS available_until TIMESTAMPTZ DEFAULT NULL;
