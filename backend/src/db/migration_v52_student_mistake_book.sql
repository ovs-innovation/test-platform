-- Migration v52: Student Mistake Book
-- Tracks incorrect and unattempted questions from submitted tests

CREATE TABLE IF NOT EXISTS student_mistake_book (
  id              SERIAL PRIMARY KEY,
  student_id      INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  assessment_id   INTEGER REFERENCES assessments(id) ON DELETE SET NULL,
  attempt_id      INTEGER REFERENCES attempts(id) ON DELETE SET NULL,
  question_id     INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  mistake_type    VARCHAR(20) NOT NULL CHECK (mistake_type IN ('incorrect', 'unattempted')),
  selected_answer JSONB,
  subject         VARCHAR(100),
  topic           VARCHAR(255),
  chapter         VARCHAR(255),
  status          VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'resolved')),
  times_attempted INTEGER NOT NULL DEFAULT 1,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT uq_student_question UNIQUE (student_id, question_id)
);

CREATE INDEX IF NOT EXISTS idx_mistake_book_student_status ON student_mistake_book(student_id, status);
CREATE INDEX IF NOT EXISTS idx_mistake_book_student_subject ON student_mistake_book(student_id, subject);
CREATE INDEX IF NOT EXISTS idx_mistake_book_student_type ON student_mistake_book(student_id, mistake_type);
CREATE INDEX IF NOT EXISTS idx_mistake_book_created_at ON student_mistake_book(created_at DESC);
