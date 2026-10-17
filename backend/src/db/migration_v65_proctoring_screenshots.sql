-- Migration v65: Proctoring Automatic Screenshots Infrastructure

CREATE TABLE IF NOT EXISTS proctoring_screenshots (
  id                  SERIAL PRIMARY KEY,
  session_id          VARCHAR(64) REFERENCES proctoring_sessions(session_id) ON DELETE CASCADE,
  attempt_id          INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  candidate_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id       INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  sequence_number     INTEGER NOT NULL, -- 1 through 12
  scheduled_minute    INTEGER NOT NULL, -- 15, 30, 45, 60, ... 180
  captured_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  file_path           TEXT NOT NULL,
  file_url            TEXT NOT NULL,
  file_size_bytes     BIGINT NOT NULL,
  mime_type           VARCHAR(32) NOT NULL DEFAULT 'image/jpeg',
  is_delayed          BOOLEAN NOT NULL DEFAULT FALSE,
  delay_seconds       INTEGER NOT NULL DEFAULT 0,
  status              VARCHAR(32) NOT NULL DEFAULT 'captured', -- 'captured', 'missed', 'failed'
  notes               TEXT,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (attempt_id, sequence_number)
);

CREATE INDEX IF NOT EXISTS idx_proctoring_screenshots_attempt ON proctoring_screenshots(attempt_id);
CREATE INDEX IF NOT EXISTS idx_proctoring_screenshots_session ON proctoring_screenshots(session_id);
CREATE INDEX IF NOT EXISTS idx_proctoring_screenshots_candidate ON proctoring_screenshots(candidate_id);
