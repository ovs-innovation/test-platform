import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const reset = process.argv.includes('--reset');

export const syncSequences = async (clientOrPool) => {
  const tablesRes = await clientOrPool.query(`
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND column_default LIKE 'nextval%'
  `);

  for (const row of tablesRes.rows) {
    const tableName = row.table_name;
    const columnName = row.column_name;
    try {
      await clientOrPool.query(`
        SELECT setval(
          pg_get_serial_sequence('${tableName}', '${columnName}'),
          COALESCE((SELECT MAX(${columnName}) FROM ${tableName}), 1),
          true
        )
      `);
    } catch (_) {}
  }
};

const executeMigrationFile = async (filename) => {
  const filePath = path.join(__dirname, filename);
  if (!fs.existsSync(filePath)) return;
  try {
    const sql = fs.readFileSync(filePath, 'utf-8');
    await pool.query(sql);
    // eslint-disable-next-line no-console
    console.log(`[migrate] Executed ${filename} successfully.`);
  } catch (err) {
    const isIgnorable =
      err &&
      (err.code === '42P07' ||
       err.code === '42701' ||
       err.code === '42710' ||
       err.code === '42P06' ||
       (err.message && err.message.includes('already exists')));
    if (isIgnorable) {
      // eslint-disable-next-line no-console
      console.warn(`[migrate warning] ${filename}: ${err.message} (skipped safely).`);
    } else {
      // eslint-disable-next-line no-console
      console.warn(`[migrate warning] ${filename}:`, err.message);
    }
  }
};

const run = async () => {
  try {
    if (reset) {
      // eslint-disable-next-line no-console
      console.log('[migrate] Dropping existing tables (--reset)...');
      await pool.query(`
        DROP VIEW IF EXISTS violation_logs;
        DROP TABLE IF EXISTS otp_verifications, coding_answers, subjective_answers,
          candidate_invites, assessment_sections, violations, scores, answers,
          attempts, questions, question_bank, chapters, subjects, assessments, users CASCADE;
        DROP TYPE IF EXISTS invite_status, question_type, section_type, attempt_status, user_role CASCADE;
      `);
    }

    const allFiles = fs.readdirSync(__dirname);
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
      await executeMigrationFile(file);
    }

    try {
      await syncSequences(pool);
    } catch (seqErr) {
      // eslint-disable-next-line no-console
      console.warn('[migrate] Sequence sync warning:', seqErr.message);
    }

    // eslint-disable-next-line no-console
    console.log('[migrate] Database migration check completed.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[migrate] Unexpected error:', err);
  } finally {
    await pool.end();
  }
};

run();
