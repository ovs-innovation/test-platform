-- CBT Platform v5: Test Series, Payments, Hierarchy, Notifications

CREATE TABLE IF NOT EXISTS subjects (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(120) NOT NULL UNIQUE,
  slug       VARCHAR(140) NOT NULL UNIQUE,
  icon       VARCHAR(30) DEFAULT '📚',
  active     BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chapters (
  id         SERIAL PRIMARY KEY,
  subject_id INTEGER NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  name       VARCHAR(160) NOT NULL,
  position   INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (subject_id, name)
);
CREATE INDEX IF NOT EXISTS idx_chapters_subject ON chapters(subject_id);

CREATE TABLE IF NOT EXISTS test_series (
  id             SERIAL PRIMARY KEY,
  title          VARCHAR(200) NOT NULL,
  slug           VARCHAR(220) NOT NULL UNIQUE,
  description    TEXT DEFAULT '',
  price          NUMERIC(10,2) NOT NULL DEFAULT 0 CHECK (price >= 0),
  validity_days  INTEGER NOT NULL DEFAULT 365 CHECK (validity_days > 0),
  image_url      TEXT DEFAULT '',
  exam_type      VARCHAR(60) DEFAULT 'General',
  test_count     INTEGER NOT NULL DEFAULT 0,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  is_featured    BOOLEAN NOT NULL DEFAULT FALSE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS test_series_assessments (
  test_series_id INTEGER NOT NULL REFERENCES test_series(id) ON DELETE CASCADE,
  assessment_id  INTEGER NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  position       INTEGER NOT NULL DEFAULT 0,
  label          VARCHAR(120) DEFAULT '',
  PRIMARY KEY (test_series_id, assessment_id)
);

CREATE TABLE IF NOT EXISTS payments (
  id                  SERIAL PRIMARY KEY,
  user_id             INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_series_id      INTEGER NOT NULL REFERENCES test_series(id) ON DELETE CASCADE,
  amount              NUMERIC(10,2) NOT NULL,
  currency            VARCHAR(10) NOT NULL DEFAULT 'INR',
  status              VARCHAR(30) NOT NULL DEFAULT 'pending',
  razorpay_order_id   VARCHAR(120),
  razorpay_payment_id VARCHAR(120),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_payments_user ON payments(user_id);

CREATE TABLE IF NOT EXISTS student_enrollments (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  test_series_id INTEGER NOT NULL REFERENCES test_series(id) ON DELETE CASCADE,
  payment_id     INTEGER REFERENCES payments(id) ON DELETE SET NULL,
  status         VARCHAR(30) NOT NULL DEFAULT 'active',
  purchased_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  expires_at     TIMESTAMPTZ NOT NULL,
  UNIQUE (user_id, test_series_id)
);
CREATE INDEX IF NOT EXISTS idx_enrollments_user ON student_enrollments(user_id);

CREATE TABLE IF NOT EXISTS notifications (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      VARCHAR(200) NOT NULL,
  body       TEXT DEFAULT '',
  type       VARCHAR(50) DEFAULT 'info',
  read_at    TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_notifications_user ON notifications(user_id);

ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS subject_id INTEGER REFERENCES subjects(id) ON DELETE SET NULL;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS chapter_id INTEGER REFERENCES chapters(id) ON DELETE SET NULL;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS difficulty VARCHAR(20) DEFAULT 'medium';
ALTER TABLE answers ADD COLUMN IF NOT EXISTS marked_for_review BOOLEAN NOT NULL DEFAULT FALSE;
