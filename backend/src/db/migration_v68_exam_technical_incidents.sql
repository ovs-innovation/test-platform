-- Migration v68: Live Exam Technical Incident Reporting & Invigilator Alert Infrastructure

CREATE TABLE IF NOT EXISTS exam_technical_incidents (
  id                      SERIAL PRIMARY KEY,
  incident_key            VARCHAR(64) NOT NULL,
  attempt_id              INTEGER NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  assessment_id           INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  candidate_id            INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  institution_id          INTEGER,
  question_id             INTEGER REFERENCES questions(id) ON DELETE SET NULL,
  category                VARCHAR(64) NOT NULL,
  severity                VARCHAR(16) NOT NULL DEFAULT 'medium',
  status                  VARCHAR(32) NOT NULL DEFAULT 'new',
  source                  VARCHAR(32) NOT NULL DEFAULT 'system',
  title                   VARCHAR(255) NOT NULL,
  description             TEXT NOT NULL,
  occurrence_count        INTEGER NOT NULL DEFAULT 1,
  assigned_to             INTEGER REFERENCES users(id) ON DELETE SET NULL,
  assigned_at             TIMESTAMPTZ,
  acknowledged_at         TIMESTAMPTZ,
  last_student_message    TEXT,
  investigation_notes     TEXT,
  resolution_notes        TEXT,
  resolution_category     VARCHAR(64),
  resolved_at             TIMESTAMPTZ,
  resolved_by             INTEGER REFERENCES users(id) ON DELETE SET NULL,
  first_seen_at           TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_seen_at            TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  last_diagnostics        JSONB NOT NULL DEFAULT '{}',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exam_incidents_key ON exam_technical_incidents(incident_key);
CREATE INDEX IF NOT EXISTS idx_exam_incidents_attempt ON exam_technical_incidents(attempt_id);
CREATE INDEX IF NOT EXISTS idx_exam_incidents_assessment ON exam_technical_incidents(assessment_id);
CREATE INDEX IF NOT EXISTS idx_exam_incidents_candidate ON exam_technical_incidents(candidate_id);
CREATE INDEX IF NOT EXISTS idx_exam_incidents_institution ON exam_technical_incidents(institution_id);
CREATE INDEX IF NOT EXISTS idx_exam_incidents_status ON exam_technical_incidents(status);
CREATE INDEX IF NOT EXISTS idx_exam_incidents_severity ON exam_technical_incidents(severity);
CREATE INDEX IF NOT EXISTS idx_exam_incidents_last_seen ON exam_technical_incidents(last_seen_at DESC);

-- Child chronological event log for deduplicated telemetry and idempotency
CREATE TABLE IF NOT EXISTS exam_incident_events (
  id                      SERIAL PRIMARY KEY,
  incident_id             INTEGER NOT NULL REFERENCES exam_technical_incidents(id) ON DELETE CASCADE,
  idempotency_key         VARCHAR(128) UNIQUE,
  event_category          VARCHAR(64) NOT NULL,
  severity                VARCHAR(16) NOT NULL DEFAULT 'medium',
  raw_message             TEXT,
  diagnostics             JSONB NOT NULL DEFAULT '{}',
  client_timestamp        TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_incident_events_incident ON exam_incident_events(incident_id);
CREATE INDEX IF NOT EXISTS idx_incident_events_idempotency ON exam_incident_events(idempotency_key);
CREATE INDEX IF NOT EXISTS idx_incident_events_created ON exam_incident_events(created_at ASC);

-- Immutable audit history for invigilator actions and status transitions
CREATE TABLE IF NOT EXISTS exam_incident_audit_trail (
  id                      SERIAL PRIMARY KEY,
  incident_id             INTEGER NOT NULL REFERENCES exam_technical_incidents(id) ON DELETE CASCADE,
  actor_id                INTEGER REFERENCES users(id) ON DELETE SET NULL,
  actor_role              VARCHAR(32) NOT NULL DEFAULT 'system',
  action                  VARCHAR(64) NOT NULL,
  from_status             VARCHAR(32),
  to_status               VARCHAR(32),
  notes                   TEXT,
  metadata                JSONB DEFAULT '{}',
  created_at              TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_incident_audit_incident ON exam_incident_audit_trail(incident_id);
CREATE INDEX IF NOT EXISTS idx_incident_audit_created ON exam_incident_audit_trail(created_at DESC);
