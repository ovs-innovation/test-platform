-- Migration v66: Proctoring Events, Storage Keys, Finalization & Retention

CREATE TABLE IF NOT EXISTS proctoring_events (
  id              SERIAL PRIMARY KEY,
  session_id      VARCHAR(64) REFERENCES proctoring_sessions(session_id) ON DELETE CASCADE,
  attempt_id      INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  candidate_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id   INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  event_type      VARCHAR(64) NOT NULL, -- 'stream_interrupted', 'stream_resumed', 'upload_backpressure', 'network_offline', 'network_online', etc.
  payload         JSONB DEFAULT '{}',
  occurred_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_proctoring_events_attempt ON proctoring_events(attempt_id);
CREATE INDEX IF NOT EXISTS idx_proctoring_events_session ON proctoring_events(session_id);
CREATE INDEX IF NOT EXISTS idx_proctoring_events_type ON proctoring_events(event_type);

-- Extend proctoring_sessions for finalization and media retention
ALTER TABLE proctoring_sessions
  ADD COLUMN IF NOT EXISTS storage_key VARCHAR(255),
  ADD COLUMN IF NOT EXISTS final_video_path TEXT,
  ADD COLUMN IF NOT EXISTS final_video_url TEXT,
  ADD COLUMN IF NOT EXISTS is_finalized BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS retention_until TIMESTAMPTZ NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
  ADD COLUMN IF NOT EXISTS is_purged BOOLEAN NOT NULL DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS purged_at TIMESTAMPTZ;

CREATE INDEX IF NOT EXISTS idx_proctoring_sessions_retention ON proctoring_sessions(retention_until) WHERE is_purged = FALSE;

-- Extend proctoring_recording_chunks for storage keys and purge status
ALTER TABLE proctoring_recording_chunks
  ADD COLUMN IF NOT EXISTS storage_key VARCHAR(255),
  ADD COLUMN IF NOT EXISTS upload_status VARCHAR(32) NOT NULL DEFAULT 'uploaded',
  ADD COLUMN IF NOT EXISTS is_purged BOOLEAN NOT NULL DEFAULT FALSE;

-- Extend proctoring_screenshots for storage keys and purge status
ALTER TABLE proctoring_screenshots
  ADD COLUMN IF NOT EXISTS storage_key VARCHAR(255),
  ADD COLUMN IF NOT EXISTS is_purged BOOLEAN NOT NULL DEFAULT FALSE;
