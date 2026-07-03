-- AssessPro v2 upgrade (additive migration)

CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN CREATE TYPE section_type AS ENUM ('aptitude', 'technical_mcq', 'coding', 'subjective');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE question_type AS ENUM ('mcq', 'coding', 'subjective');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN CREATE TYPE invite_status AS ENUM ('pending', 'accessed', 'completed', 'expired');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

CREATE TABLE IF NOT EXISTS assessment_sections (
  id              SERIAL PRIMARY KEY,
  assessment_id   INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  name            VARCHAR(120) NOT NULL,
  section_type    section_type NOT NULL,
  position        INTEGER NOT NULL DEFAULT 0,
  description     TEXT DEFAULT '',
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_sections_assessment ON assessment_sections(assessment_id);

ALTER TABLE questions ADD COLUMN IF NOT EXISTS section_id INTEGER REFERENCES assessment_sections(id) ON DELETE SET NULL;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS question_type question_type NOT NULL DEFAULT 'mcq';
ALTER TABLE questions ADD COLUMN IF NOT EXISTS starter_code TEXT DEFAULT '';
ALTER TABLE questions ADD COLUMN IF NOT EXISTS test_cases JSONB DEFAULT '[]'::jsonb;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS language VARCHAR(30) DEFAULT 'javascript';

CREATE TABLE IF NOT EXISTS candidate_invites (
  id               SERIAL PRIMARY KEY,
  assessment_id    INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  candidate_name   VARCHAR(120) NOT NULL,
  candidate_email  VARCHAR(180) NOT NULL,
  token            UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  status           invite_status NOT NULL DEFAULT 'pending',
  invited_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  accessed_at      TIMESTAMPTZ,
  completed_at     TIMESTAMPTZ,
  expires_at       TIMESTAMPTZ,
  created_by       INTEGER REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE (assessment_id, candidate_email)
);
CREATE INDEX IF NOT EXISTS idx_invites_token ON candidate_invites(token);
CREATE INDEX IF NOT EXISTS idx_invites_email ON candidate_invites(candidate_email);

ALTER TABLE attempts ADD COLUMN IF NOT EXISTS invite_id INTEGER REFERENCES candidate_invites(id) ON DELETE SET NULL;
ALTER TABLE attempts ADD COLUMN IF NOT EXISTS duration_seconds INTEGER;

CREATE TABLE IF NOT EXISTS otp_verifications (
  id           SERIAL PRIMARY KEY,
  email        VARCHAR(180) NOT NULL,
  otp_hash     TEXT NOT NULL,
  invite_token UUID,
  purpose      VARCHAR(40) NOT NULL DEFAULT 'assessment_access',
  expires_at   TIMESTAMPTZ NOT NULL,
  verified_at  TIMESTAMPTZ,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_otp_email ON otp_verifications(email);

CREATE TABLE IF NOT EXISTS coding_answers (
  id           SERIAL PRIMARY KEY,
  attempt_id   INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id  INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  language     VARCHAR(30) NOT NULL DEFAULT 'javascript',
  source_code  TEXT NOT NULL DEFAULT '',
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (attempt_id, question_id)
);
CREATE INDEX IF NOT EXISTS idx_coding_answers_attempt ON coding_answers(attempt_id);

CREATE TABLE IF NOT EXISTS subjective_answers (
  id           SERIAL PRIMARY KEY,
  attempt_id   INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id  INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  answer_text  TEXT NOT NULL DEFAULT '',
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (attempt_id, question_id)
);
CREATE INDEX IF NOT EXISTS idx_subjective_answers_attempt ON subjective_answers(attempt_id);

CREATE OR REPLACE VIEW violation_logs AS
  SELECT id, attempt_id, candidate_id, violation_type, created_at FROM violations;
