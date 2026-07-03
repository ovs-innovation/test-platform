-- Production v6: scoring, password reset, payment metadata

ALTER TABLE assessments ADD COLUMN IF NOT EXISTS negative_marking BOOLEAN NOT NULL DEFAULT FALSE;
ALTER TABLE assessments ADD COLUMN IF NOT EXISTS negative_marks_per_wrong NUMERIC(4,2) NOT NULL DEFAULT 0.25;

ALTER TABLE scores ADD COLUMN IF NOT EXISTS rank INTEGER;
ALTER TABLE scores ADD COLUMN IF NOT EXISTS percentile NUMERIC(5,2);
ALTER TABLE scores ADD COLUMN IF NOT EXISTS correct_count INTEGER DEFAULT 0;
ALTER TABLE scores ADD COLUMN IF NOT EXISTS wrong_count INTEGER DEFAULT 0;
ALTER TABLE scores ADD COLUMN IF NOT EXISTS unattempted_count INTEGER DEFAULT 0;

CREATE TABLE IF NOT EXISTS password_resets (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  used_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_password_resets_user ON password_resets(user_id);
