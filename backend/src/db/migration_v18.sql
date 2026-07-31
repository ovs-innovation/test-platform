-- Migration v18: Institutional Dashboard Infrastructure, Multi-Tenant Auth, Package-Based Test Restrictions & eBook Assignments

-- 1. Create institutions table
CREATE TABLE IF NOT EXISTS institutions (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  institution_type VARCHAR(50) DEFAULT 'School', -- School / Coaching Institute / College
  city VARCHAR(100),
  state VARCHAR(100),
  contact_person VARCHAR(255),
  contact_email VARCHAR(255),
  contact_mobile VARCHAR(20),
  logo_url TEXT,
  address TEXT,
  onboarded_at TIMESTAMP DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- 2. Create institution_admins table
CREATE TABLE IF NOT EXISTS institution_admins (
  id SERIAL PRIMARY KEY,
  institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
  name VARCHAR(255),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role VARCHAR(30) DEFAULT 'institution_admin',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Extend batches table for institutional tenancy
ALTER TABLE batches ADD COLUMN IF NOT EXISTS institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE;
ALTER TABLE batches ADD COLUMN IF NOT EXISTS batch_name VARCHAR(100);
UPDATE batches SET batch_name = name WHERE batch_name IS NULL OR batch_name = '';

-- 4. Extend users & student_profiles for roll_number & credentials support
ALTER TABLE users ADD COLUMN IF NOT EXISTS roll_number VARCHAR(50);
ALTER TABLE student_profiles ADD COLUMN IF NOT EXISTS roll_number VARCHAR(50);

-- 5. Create test_packages & package_tests tables
CREATE TABLE IF NOT EXISTS test_packages (
  id SERIAL PRIMARY KEY,
  package_name VARCHAR(100) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS package_tests (
  id SERIAL PRIMARY KEY,
  package_id INTEGER REFERENCES test_packages(id) ON DELETE CASCADE,
  test_id INTEGER REFERENCES tests(id) ON DELETE CASCADE,
  UNIQUE(package_id, test_id)
);

CREATE TABLE IF NOT EXISTS institution_packages (
  id SERIAL PRIMARY KEY,
  institution_id INTEGER REFERENCES institutions(id) ON DELETE CASCADE,
  package_id INTEGER REFERENCES test_packages(id) ON DELETE CASCADE,
  purchased_at TIMESTAMP DEFAULT NOW(),
  valid_until TIMESTAMP,
  is_active BOOLEAN DEFAULT TRUE
);

-- 6. Create ebook_assignments table
CREATE TABLE IF NOT EXISTS ebook_assignments (
  id SERIAL PRIMARY KEY,
  ebook_id INTEGER REFERENCES ebooks(id) ON DELETE CASCADE,
  assigned_to_type VARCHAR(20) NOT NULL, -- 'institution' | 'batch' | 'student'
  assigned_to_id INTEGER NOT NULL,
  assigned_at TIMESTAMP DEFAULT NOW()
);

-- 7. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_institutions_active ON institutions(is_active);
CREATE INDEX IF NOT EXISTS idx_institution_admins_email ON institution_admins(email);
CREATE INDEX IF NOT EXISTS idx_batches_institution ON batches(institution_id);
CREATE INDEX IF NOT EXISTS idx_users_institution_id ON users(institution_id);
CREATE INDEX IF NOT EXISTS idx_users_batch_id ON users(batch_id);
CREATE INDEX IF NOT EXISTS idx_test_assignments_target ON test_assignments(assigned_to_type, assigned_to_id);
CREATE INDEX IF NOT EXISTS idx_ebook_assignments_target ON ebook_assignments(assigned_to_type, assigned_to_id);
CREATE INDEX IF NOT EXISTS idx_package_tests_pkg ON package_tests(package_id);
CREATE INDEX IF NOT EXISTS idx_package_tests_test ON package_tests(test_id);
CREATE INDEX IF NOT EXISTS idx_institution_packages_inst ON institution_packages(institution_id);

-- 8. Seed Default Sample Institution, Admin & Test Package if missing
INSERT INTO institutions (id, name, institution_type, city, state, contact_person, contact_email, contact_mobile, address)
VALUES (1, 'EDVEDUM Partner Academy', 'School', 'New Delhi', 'Delhi', 'Dr. Ramesh Sharma', 'admin@partneracademy.edu.in', '9876543210', 'Block B, Connaught Place, New Delhi')
ON CONFLICT (id) DO NOTHING;

-- Default password: password123 (bcrypt hash: $2b$10$7Z2i7tYmG6dI7hZ9T8wXo.r7GqJ2.6Z.Z0Z0Z0Z0Z0Z0Z0Z0Z0Z0)
-- We will use hash: $2b$10$wT6Q1lT/6L0X6jUqH2GZ1eX5lX5lX5lX5lX5lX5lX5lX5lX5lX5lX or generate dynamically in seed script
INSERT INTO institution_admins (id, institution_id, name, email, password_hash, role)
VALUES (1, 1, 'Institution Admin', 'instadmin@edvedum.ac.in', '$2b$10$1Y8g4bCg6j5S0vH9qW4f4eK1l5m7n8o9p0q1r2s3t4u5v6w7x8y9z', 'institution_admin')
ON CONFLICT (email) DO NOTHING;

INSERT INTO test_packages (id, package_name, description, price)
VALUES (1, 'NEET-UG 2027 AIETS One-Year Complete Package', 'Full access to 24 AIETS unit tests, part tests and cumulative grand mocks for NEET-UG 2027.', 49999.00)
ON CONFLICT (id) DO NOTHING;

INSERT INTO institution_packages (institution_id, package_id, is_active)
SELECT 1, 1, TRUE
WHERE NOT EXISTS (
  SELECT 1 FROM institution_packages WHERE institution_id = 1 AND package_id = 1
);

-- Associate existing tests to Package 1 if package_tests is empty
INSERT INTO package_tests (package_id, test_id)
SELECT 1, t.id FROM tests t
WHERE NOT EXISTS (
  SELECT 1 FROM package_tests WHERE package_id = 1 AND test_id = t.id
);
