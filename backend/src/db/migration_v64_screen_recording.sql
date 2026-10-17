-- Migration v64: Student Screen Recording Proctoring Infrastructure

CREATE TABLE IF NOT EXISTS proctoring_sessions (
  id              SERIAL PRIMARY KEY,
  session_id      VARCHAR(64) UNIQUE NOT NULL,
  attempt_id      INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  candidate_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id   INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  mime_type       VARCHAR(64) NOT NULL DEFAULT 'video/webm',
  status          VARCHAR(32) NOT NULL DEFAULT 'active', -- 'active', 'completed', 'stopped', 'interrupted', 'error'
  total_chunks    INTEGER NOT NULL DEFAULT 0,
  total_bytes     BIGINT NOT NULL DEFAULT 0,
  stop_reason     TEXT,
  started_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  ended_at        TIMESTAMPTZ,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_proctoring_sessions_attempt ON proctoring_sessions(attempt_id);
CREATE INDEX IF NOT EXISTS idx_proctoring_sessions_candidate ON proctoring_sessions(candidate_id);

CREATE TABLE IF NOT EXISTS proctoring_recording_chunks (
  id              SERIAL PRIMARY KEY,
  session_id      VARCHAR(64) NOT NULL REFERENCES proctoring_sessions(session_id) ON DELETE CASCADE,
  attempt_id      INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  chunk_index     INTEGER NOT NULL,
  file_path       TEXT NOT NULL,
  file_url        TEXT NOT NULL,
  file_size_bytes BIGINT NOT NULL,
  mime_type       VARCHAR(64) DEFAULT 'video/webm',
  duration_ms     INTEGER DEFAULT 5000,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (session_id, chunk_index)
);

CREATE INDEX IF NOT EXISTS idx_proctoring_chunks_session ON proctoring_recording_chunks(session_id);
CREATE INDEX IF NOT EXISTS idx_proctoring_chunks_attempt ON proctoring_recording_chunks(attempt_id);
