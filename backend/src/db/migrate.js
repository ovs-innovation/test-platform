import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reset = process.argv.includes('--reset');

const run = async () => {
  try {
    if (reset) {
      // eslint-disable-next-line no-console
      console.log('[migrate] Dropping existing tables (--reset)...');
      await pool.query(`
        DROP VIEW IF EXISTS violation_logs;
        DROP TABLE IF EXISTS otp_verifications, coding_answers, subjective_answers,
          candidate_invites, assessment_sections, violations, scores, answers,
          attempts, questions, assessments, users CASCADE;
        DROP TYPE IF EXISTS invite_status, question_type, section_type, attempt_status, user_role;
      `);
    }

    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await pool.query(schema);
    const migration = fs.readFileSync(path.join(__dirname, 'migration_v2.sql'), 'utf-8');
    await pool.query(migration);
    const migration3 = fs.readFileSync(path.join(__dirname, 'migration_v3.sql'), 'utf-8');
    await pool.query(migration3);
    const migration4 = fs.readFileSync(path.join(__dirname, 'migration_v4.sql'), 'utf-8');
    await pool.query(migration4);
    const migration5 = fs.readFileSync(path.join(__dirname, 'migration_v5.sql'), 'utf-8');
    await pool.query(migration5);
    const migration6 = fs.readFileSync(path.join(__dirname, 'migration_v6.sql'), 'utf-8');
    await pool.query(migration6);
    const migration7 = fs.readFileSync(path.join(__dirname, 'migration_v7.sql'), 'utf-8');
    await pool.query(migration7);
    // eslint-disable-next-line no-console
    console.log('[migrate] Schema applied successfully.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[migrate] Failed:', err.message);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();
