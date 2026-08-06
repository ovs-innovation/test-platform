-- Migration v24: Precomputed Institute & Batch Ranking Table for B2B Students

CREATE TABLE IF NOT EXISTS student_institute_rank (
  student_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  institution_id INTEGER NOT NULL,
  batch_id INTEGER,
  rank INTEGER NOT NULL,
  total_students INTEGER NOT NULL,
  batch_rank INTEGER,
  total_batch_students INTEGER,
  avg_score NUMERIC(5,2) DEFAULT 0,
  tests_attempted INTEGER DEFAULT 0,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_inst_rank_inst ON student_institute_rank(institution_id);
CREATE INDEX IF NOT EXISTS idx_inst_rank_batch ON student_institute_rank(batch_id);
