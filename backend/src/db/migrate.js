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
    const migration8 = fs.readFileSync(path.join(__dirname, 'migration_v8.sql'), 'utf-8');
    await pool.query(migration8);
    const migration9 = fs.readFileSync(path.join(__dirname, 'migration_v9.sql'), 'utf-8');
    await pool.query(migration9);
    const migration10 = fs.readFileSync(path.join(__dirname, 'migration_v10.sql'), 'utf-8');
    await pool.query(migration10);
    const migration11 = fs.readFileSync(path.join(__dirname, 'migration_v11.sql'), 'utf-8');
    await pool.query(migration11);
    const migration12 = fs.readFileSync(path.join(__dirname, 'migration_v12.sql'), 'utf-8');
    await pool.query(migration12);
    const migration13 = fs.readFileSync(path.join(__dirname, 'migration_v13.sql'), 'utf-8');
    await pool.query(migration13);
    const migration14 = fs.readFileSync(path.join(__dirname, 'migration_v14.sql'), 'utf-8');
    await pool.query(migration14);
    const migration15 = fs.readFileSync(path.join(__dirname, 'migration_v15.sql'), 'utf-8');
    await pool.query(migration15);
    const migration16 = fs.readFileSync(path.join(__dirname, 'migration_v16.sql'), 'utf-8');
    await pool.query(migration16);
    const migration17 = fs.readFileSync(path.join(__dirname, 'migration_v17.sql'), 'utf-8');
    await pool.query(migration17);
    const migration18 = fs.readFileSync(path.join(__dirname, 'migration_v18.sql'), 'utf-8');
    await pool.query(migration18);
    const migration19 = fs.readFileSync(path.join(__dirname, 'migration_v19.sql'), 'utf-8');
    await pool.query(migration19);
    const migration20 = fs.readFileSync(path.join(__dirname, 'migration_v20.sql'), 'utf-8');
    await pool.query(migration20);
    const migration21 = fs.readFileSync(path.join(__dirname, 'migration_v21.sql'), 'utf-8');
    await pool.query(migration21);
    if (fs.existsSync(path.join(__dirname, 'migration_v22.sql'))) {
      const migration22 = fs.readFileSync(path.join(__dirname, 'migration_v22.sql'), 'utf-8');
      await pool.query(migration22);
    }
    if (fs.existsSync(path.join(__dirname, 'migration_v23.sql'))) {
      const migration23 = fs.readFileSync(path.join(__dirname, 'migration_v23.sql'), 'utf-8');
      await pool.query(migration23);
    }
    if (fs.existsSync(path.join(__dirname, 'migration_v24.sql'))) {
      const migration24 = fs.readFileSync(path.join(__dirname, 'migration_v24.sql'), 'utf-8');
      await pool.query(migration24);
    }
    if (fs.existsSync(path.join(__dirname, 'migration_v25.sql'))) {
      const migration25 = fs.readFileSync(path.join(__dirname, 'migration_v25.sql'), 'utf-8');
      await pool.query(migration25);
    }

    await syncSequences(pool);
    // eslint-disable-next-line no-console
    console.log('[migrate] Database migration and sequence sync successful.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('[migrate] Failed:', err);
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
};

run();
