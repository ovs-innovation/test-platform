-- Migration v22: Ensure institutions table has all columns for Partner Schools & B2B Dashboard
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS code VARCHAR(50);
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS email VARCHAR(255);
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS password_hash TEXT;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS raw_password VARCHAR(255);
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS tagline TEXT;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS logo_badge VARCHAR(20);
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS accent_color VARCHAR(30) DEFAULT '#2563eb';
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS total_licenses INTEGER DEFAULT 200;
ALTER TABLE institutions ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT NOW();

UPDATE institutions SET raw_password = 'password123' WHERE raw_password IS NULL OR raw_password = '';

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'institutions_email_key') THEN
    ALTER TABLE institutions ADD CONSTRAINT institutions_email_key UNIQUE (email);
  END IF;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
