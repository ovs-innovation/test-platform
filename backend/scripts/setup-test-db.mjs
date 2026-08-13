import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const { Client } = pg;

export const validateTestDatabaseSafety = (nodeEnv, testDbUrl, prodDbUrl = '') => {
  const cleanEnv = (nodeEnv || '').trim();
  if (cleanEnv !== 'test') {
    throw new Error(`SAFETY GUARD FAILURE: Database test setup requires NODE_ENV='test'. Current: '${nodeEnv}'`);
  }

  if (!testDbUrl || typeof testDbUrl !== 'string' || testDbUrl.trim() === '') {
    throw new Error('SAFETY GUARD FAILURE: TEST_DATABASE_URL environment variable is missing or empty.');
  }

  const cleanTestUrl = testDbUrl.trim();
  const cleanProdUrl = (prodDbUrl || '').trim();

  // Abort if TEST_DATABASE_URL equals production DATABASE_URL
  if (cleanProdUrl && cleanTestUrl === cleanProdUrl) {
    throw new Error('SAFETY GUARD TRIGGERED: TEST_DATABASE_URL matches production DATABASE_URL. Aborting test setup.');
  }

  // Strict URL object parsing
  let urlObj;
  try {
    urlObj = new URL(cleanTestUrl);
  } catch (err) {
    throw new Error('SAFETY GUARD TRIGGERED: Invalid or unparseable TEST_DATABASE_URL format.');
  }

  // Hostname validation
  const hostname = (urlObj.hostname || '').toLowerCase();
  if (hostname === 'neon.tech' || hostname.endsWith('.neon.tech')) {
    throw new Error('SAFETY GUARD TRIGGERED: TEST_DATABASE_URL points to a Neon host (*.neon.tech). Production Neon database access is prohibited during testing.');
  }

  // Pathname & Database name decoding
  const rawPath = urlObj.pathname || '';
  const decodedPath = decodeURIComponent(rawPath);
  const dbName = decodedPath.replace(/^\//, '').split('?')[0].trim();

  if (!dbName) {
    throw new Error('SAFETY GUARD FAILURE: Could not extract database name from TEST_DATABASE_URL.');
  }

  // Reject protected database names
  const protectedNames = ['neondb', 'interview_platform', 'production'];
  if (protectedNames.includes(dbName)) {
    throw new Error(`SAFETY GUARD TRIGGERED: Refusing test operation on protected database name '${dbName}'. Target must end with '_test'.`);
  }

  // Require database name to end exactly with _test
  if (!dbName.endsWith('_test')) {
    throw new Error(`SAFETY GUARD TRIGGERED: Database name '${dbName}' does not end with '_test'. Aborting test setup.`);
  }
};

export const initTestDatabase = async () => {
  const nodeEnv = process.env.NODE_ENV || 'test';
  const testDbUrl = process.env.TEST_DATABASE_URL || '';
  const prodDbUrl = process.env.DATABASE_URL || '';

  // Safety Guard Check Before Connection - MUST ABORT IF TEST_DATABASE_URL IS ABSENT
  validateTestDatabaseSafety(nodeEnv, testDbUrl, prodDbUrl);

  const isLocal = testDbUrl.includes('localhost') || testDbUrl.includes('127.0.0.1');
  const testClient = new Client({
    connectionString: testDbUrl,
    ssl: isLocal ? false : { rejectUnauthorized: false },
  });

  await testClient.connect();
  console.log('[test-db] Connected safely to isolated test database.');

  // Run migrations SQL files on test DB
  const dbDir = path.join(__dirname, '../src/db');
  if (fs.existsSync(dbDir)) {
    const allFiles = fs.readdirSync(dbDir);
    const migrationFiles = allFiles
      .filter((f) => f === 'schema.sql' || /^migration_v\d+\.sql$/.test(f))
      .sort((a, b) => {
        if (a === 'schema.sql') return -1;
        if (b === 'schema.sql') return 1;
        const numA = parseInt(a.replace(/[^\d]/g, ''), 10);
        const numB = parseInt(b.replace(/[^\d]/g, ''), 10);
        return numA - numB;
      });

    for (const file of migrationFiles) {
      const filePath = path.join(dbDir, file);
      if (fs.existsSync(filePath)) {
        const sql = fs.readFileSync(filePath, 'utf-8');
        try {
          await testClient.query(sql);
        } catch (_) {
          // ignore duplicate enum/type warnings
        }
      }
    }
  }

  // Clean disposable test records from previous runs cleanly
  await testClient.query(`DELETE FROM users WHERE email LIKE 'disp_%';`);
  await testClient.query(`DELETE FROM institutions WHERE email LIKE 'disp_%' OR code LIKE 'DISP-%';`);
  await testClient.query(`DELETE FROM tests WHERE test_name LIKE 'Disposable%';`);
  await testClient.query(`DELETE FROM batches WHERE name LIKE 'Disposable%' OR batch_name LIKE 'Disposable%';`);

  // Seed Isolated Test Fixtures safely
  await testClient.query(`
    INSERT INTO institutions (id, name, code, email, is_active)
    VALUES (10, 'Test Institution A', 'INST-A', 'admin@instA.com', true),
           (20, 'Test Institution B', 'INST-B', 'admin@instB.com', true)
    ON CONFLICT (id) DO NOTHING;
  `);

  await testClient.query(`
    INSERT INTO users (id, name, email, password_hash, role, institution_id, is_blocked)
    VALUES 
      (101, 'Student A', 'studentA@test.com', '$2a$10$abcdefghijklmnopqrstuuu', 'candidate', 10, false),
      (102, 'Student B', 'studentB@test.com', '$2a$10$abcdefghijklmnopqrstuuu', 'candidate', 10, false),
      (103, 'Blocked Student', 'blocked@test.com', '$2a$10$abcdefghijklmnopqrstuuu', 'candidate', 10, true),
      (201, 'Inst Admin A', 'instAdminA@test.com', '$2a$10$abcdefghijklmnopqrstuuu', 'admin', 10, false),
      (202, 'Inst Admin B', 'instAdminB@test.com', '$2a$10$abcdefghijklmnopqrstuuu', 'admin', 20, false),
      (301, 'Platform Admin', 'admin@test.com', '$2a$10$abcdefghijklmnopqrstuuu', 'admin', null, false)
    ON CONFLICT (id) DO NOTHING;
  `);

  await testClient.query(`
    INSERT INTO student_profiles (user_id, phone, class, target_exam)
    VALUES (101, '9999900101', '12', 'NEET'),
           (102, '9999900102', '12', 'JEE')
    ON CONFLICT (user_id) DO NOTHING;
  `);

  await testClient.query(`
    INSERT INTO institution_admins (id, institution_id, name, email, password_hash, role, is_active)
    VALUES
      (201, 10, 'Inst Admin A', 'instAdminA@test.com', '$2a$10$abcdefghijklmnopqrstuuu', 'institution_admin', true),
      (202, 20, 'Inst Admin B', 'instAdminB@test.com', '$2a$10$abcdefghijklmnopqrstuuu', 'institution_admin', true)
    ON CONFLICT (id) DO NOTHING;
  `);

  await testClient.query(`
    INSERT INTO subjects (id, name, slug)
    VALUES (1, 'Physics', 'physics-test')
    ON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, slug = EXCLUDED.slug;

    INSERT INTO assessments (id, title, duration_minutes, passing_marks, is_published)
    VALUES (500, 'Test Assessment', 60, 0, true)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO questions (id, assessment_id, question_text, options, correct_index, subject_id)
    VALUES (701, 500, 'Q1 Physics', '["A","B","C","D"]'::jsonb, 0, 1),
           (702, 500, 'Q2 Physics', '["A","B","C","D"]'::jsonb, 1, 1)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO attempts (id, assessment_id, candidate_id, status, started_at, ends_at, submitted_at)
    VALUES (501, 500, 101, 'submitted', NOW() - INTERVAL '120 minutes', NOW() - INTERVAL '60 minutes', NOW() - INTERVAL '60 minutes'),
           (502, 500, 102, 'in_progress', NOW(), NOW() + INTERVAL '60 minutes', NULL)
    ON CONFLICT (id) DO NOTHING;

    INSERT INTO answers (id, attempt_id, question_id, selected_index)
    VALUES (801, 501, 701, 0), -- Correct (selected 0 == correct 0)
           (802, 501, 702, 0)  -- Incorrect (selected 0 != correct 1)
    ON CONFLICT (id) DO NOTHING;
  `);

  await testClient.end();
  console.log('[test-db] Test fixtures seeded safely.');
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  initTestDatabase().catch((err) => {
    console.error('[test-db] Setup failed:', err.message);
    process.exit(1);
  });
}
