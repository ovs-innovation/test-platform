-- ============================================================
-- Interview Assessment Platform - PostgreSQL schema
-- Run with: npm run db:migrate
-- ============================================================

-- Enums -------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('candidate', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE attempt_status AS ENUM ('in_progress', 'submitted', 'auto_submitted');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- users -------------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
  id            SERIAL PRIMARY KEY,
  name          VARCHAR(120) NOT NULL,
  email         VARCHAR(180) NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role          user_role NOT NULL DEFAULT 'candidate',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- assessments -------------------------------------------------
CREATE TABLE IF NOT EXISTS assessments (
  id              SERIAL PRIMARY KEY,
  title           VARCHAR(200) NOT NULL,
  description     TEXT DEFAULT '',
  instructions    TEXT DEFAULT '',
  duration_minutes INTEGER NOT NULL CHECK (duration_minutes > 0),
  passing_marks   INTEGER NOT NULL DEFAULT 0 CHECK (passing_marks >= 0),
  max_violations  INTEGER NOT NULL DEFAULT 3 CHECK (max_violations >= 0),
  result_visible  BOOLEAN NOT NULL DEFAULT TRUE,
  is_published    BOOLEAN NOT NULL DEFAULT FALSE,
  created_by      INTEGER REFERENCES users(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- questions ---------------------------------------------------
-- options stored as JSONB array of strings; correct_index is 0-based.
CREATE TABLE IF NOT EXISTS questions (
  id             SERIAL PRIMARY KEY,
  assessment_id  INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  question_text  TEXT NOT NULL,
  options        JSONB NOT NULL,
  correct_index  INTEGER NOT NULL CHECK (correct_index >= 0),
  marks          INTEGER NOT NULL DEFAULT 1 CHECK (marks > 0),
  position        INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_questions_assessment ON questions(assessment_id);

-- attempts ----------------------------------------------------
-- A candidate can only have ONE attempt per assessment (single attempt only).
CREATE TABLE IF NOT EXISTS attempts (
  id             SERIAL PRIMARY KEY,
  assessment_id  INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  candidate_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  status         attempt_status NOT NULL DEFAULT 'in_progress',
  started_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ends_at        TIMESTAMPTZ NOT NULL,
  submitted_at   TIMESTAMPTZ,
  violation_count INTEGER NOT NULL DEFAULT 0,
  UNIQUE (assessment_id, candidate_id)
);
CREATE INDEX IF NOT EXISTS idx_attempts_candidate ON attempts(candidate_id);

-- answers -----------------------------------------------------
-- Saved in real time; one row per (attempt, question), upserted on save.
CREATE TABLE IF NOT EXISTS answers (
  id             SERIAL PRIMARY KEY,
  attempt_id     INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  question_id    INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_index INTEGER,
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (attempt_id, question_id)
);
CREATE INDEX IF NOT EXISTS idx_answers_attempt ON answers(attempt_id);

-- scores ------------------------------------------------------
CREATE TABLE IF NOT EXISTS scores (
  id             SERIAL PRIMARY KEY,
  attempt_id     INTEGER NOT NULL UNIQUE REFERENCES attempts(id) ON DELETE CASCADE,
  marks_obtained INTEGER NOT NULL DEFAULT 0,
  total_marks    INTEGER NOT NULL DEFAULT 0,
  percentage     NUMERIC(5,2) NOT NULL DEFAULT 0,
  passed         BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- violations --------------------------------------------------
CREATE TABLE IF NOT EXISTS violations (
  id             SERIAL PRIMARY KEY,
  attempt_id     INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  candidate_id   INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  violation_type VARCHAR(60) NOT NULL,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_violations_attempt ON violations(attempt_id);
CREATE INDEX IF NOT EXISTS idx_violations_candidate ON violations(candidate_id);
