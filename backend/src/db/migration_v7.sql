-- Production v7: CMS, coupons, faculty, forum, certificates, profiles, topics, solutions

DO $$ BEGIN ALTER TYPE user_role ADD VALUE 'faculty'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$ BEGIN ALTER TYPE user_role ADD VALUE 'parent'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS student_profiles (
  user_id      INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  phone        VARCHAR(20),
  city         VARCHAR(100),
  state        VARCHAR(100),
  target_exam  VARCHAR(100),
  avatar_url   TEXT,
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS topics (
  id         SERIAL PRIMARY KEY,
  chapter_id INTEGER NOT NULL REFERENCES chapters(id) ON DELETE CASCADE,
  name       VARCHAR(200) NOT NULL,
  position   INTEGER NOT NULL DEFAULT 0,
  UNIQUE (chapter_id, name)
);

ALTER TABLE questions ADD COLUMN IF NOT EXISTS solution TEXT;
ALTER TABLE questions ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS solution TEXT;
ALTER TABLE question_bank ADD COLUMN IF NOT EXISTS image_url TEXT;

CREATE TABLE IF NOT EXISTS coupons (
  id             SERIAL PRIMARY KEY,
  code           VARCHAR(50) UNIQUE NOT NULL,
  discount_type  VARCHAR(20) NOT NULL DEFAULT 'percent',
  discount_value NUMERIC(10,2) NOT NULL,
  max_uses       INTEGER,
  used_count     INTEGER NOT NULL DEFAULT 0,
  valid_from     TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  valid_until    TIMESTAMPTZ,
  is_active      BOOLEAN NOT NULL DEFAULT TRUE,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS cms_pages (
  id           SERIAL PRIMARY KEY,
  slug         VARCHAR(100) UNIQUE NOT NULL,
  title        VARCHAR(200) NOT NULL,
  content      TEXT NOT NULL DEFAULT '',
  page_type    VARCHAR(30) NOT NULL DEFAULT 'page',
  excerpt      TEXT,
  is_published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key        VARCHAR(100) PRIMARY KEY,
  value      TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS faculty (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  department VARCHAR(100),
  bio        TEXT,
  is_active  BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS certificates (
  id               SERIAL PRIMARY KEY,
  attempt_id       INTEGER UNIQUE NOT NULL REFERENCES attempts(id) ON DELETE CASCADE,
  user_id          INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  certificate_code VARCHAR(50) UNIQUE NOT NULL,
  issued_at        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_topics (
  id         SERIAL PRIMARY KEY,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title      VARCHAR(200) NOT NULL,
  body       TEXT NOT NULL,
  is_locked  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS forum_replies (
  id         SERIAL PRIMARY KEY,
  topic_id   INTEGER NOT NULL REFERENCES forum_topics(id) ON DELETE CASCADE,
  user_id    INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  body       TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE payments ADD COLUMN IF NOT EXISTS coupon_id INTEGER REFERENCES coupons(id);
ALTER TABLE payments ADD COLUMN IF NOT EXISTS discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0;

INSERT INTO cms_pages (slug, title, content, page_type, excerpt) VALUES
('how-to-prepare-jee', 'How to Prepare for JEE Main 2026', '<p>Start with NCERT fundamentals, then move to PYQs and full-length mocks on AssessPro CBT.</p>', 'blog', 'A step-by-step JEE preparation guide.'),
('nta-cbt-tips', 'NTA CBT Exam Day Tips', '<p>Reach early, verify instructions, use mark-for-review wisely, and manage time per section.</p>', 'blog', 'Essential tips for exam day.'),
('faq-enrollment', 'How do I enroll in a test series?', 'Browse Test Series, click Enroll or Buy Now, and access tests from My Tests.', 'faq', NULL),
('faq-results', 'When will I get my results?', 'Results appear immediately after submission if the test allows result visibility.', 'faq', NULL),
('faq-negative-marking', 'Is negative marking applied?', 'Yes, for tests where the admin has enabled NTA-style negative marking.', 'faq', NULL)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO settings (key, value) VALUES
('site_name', 'AssessPro CBT'),
('support_email', 'support@assesspro.io'),
('theme_default', 'light')
ON CONFLICT (key) DO NOTHING;
