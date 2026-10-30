import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool } from '../config/db.js';
import { reorderNeet180Assessments } from './reorderNeet180.js';
import { uploadAssessment43 } from '../../scripts/upload_assessment_43.mjs';
import { uploadBiomoleculesQuestions } from '../../scripts/import_biomolecules_chemistry.mjs';
import { uploadAminesQuestions } from '../../scripts/import_amines_chemistry.mjs';
import { uploadUnitsMeasurementsQuestions } from '../../scripts/import_units_measurements_physics.mjs';
import { uploadMotionStraightLineQuestions } from '../../scripts/import_motion_straight_line_physics.mjs';
import { uploadMotionInPlaneQuestions } from '../../scripts/import_motion_in_plane_physics.mjs';
import { uploadMotionInPlanePart2Questions } from '../../scripts/import_motion_in_plane_part2.mjs';
import { uploadLawsOfMotionQuestions } from '../../scripts/import_laws_of_motion.mjs';

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
        DROP TABLE IF EXISTS schema_migrations CASCADE;
        DROP VIEW IF EXISTS violation_logs;
        DROP TABLE IF EXISTS otp_verifications, coding_answers, subjective_answers,
          candidate_invites, assessment_sections, violations, scores, answers,
          attempts, questions, question_bank, chapters, subjects, assessments, users CASCADE;
        DROP TYPE IF EXISTS invite_status, question_type, section_type, attempt_status, user_role CASCADE;
      `);
    }

    await pool.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        filename VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    const appliedRes = await pool.query('SELECT filename FROM schema_migrations');
    const appliedFiles = new Set(appliedRes.rows.map((r) => r.filename));

    const allFiles = fs.readdirSync(__dirname);
    const migrationFiles = allFiles
      .filter((f) => f === 'schema.sql' || /^migration_v\d+.*\.sql$/.test(f))
      .sort((a, b) => {
        if (a === 'schema.sql') return -1;
        if (b === 'schema.sql') return 1;
        const numA = parseInt(a.replace(/[^\d]/g, ''), 10);
        const numB = parseInt(b.replace(/[^\d]/g, ''), 10);
        return numA - numB;
      });

    for (const file of migrationFiles) {
      if (appliedFiles.has(file)) {
        continue;
      }
      await executeMigrationFile(file);
      await pool.query(
        'INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT (filename) DO NOTHING',
        [file]
      );
    }


    try {
      await syncSequences(pool);
    } catch (seqErr) {
      // eslint-disable-next-line no-console
      console.warn('[migrate] Sequence sync warning:', seqErr.message);
    }

    // Helper to run seeder once and record in schema_migrations
    // This prevents re-triggering seed scripts on every server boot / idle spin-up,
    // ensuring admin modifications and option edits in Question Bank persist permanently.
    const runSeedOnce = async (seedKey, fn) => {
      if (appliedFiles.has(seedKey)) return;
      try {
        await fn();
        await pool.query(
          'INSERT INTO schema_migrations (filename) VALUES ($1) ON CONFLICT (filename) DO NOTHING',
          [seedKey]
        );
        appliedFiles.add(seedKey);
      } catch (seedErr) {
        // eslint-disable-next-line no-console
        console.warn(`[migrate] Seed "${seedKey}" warning:`, seedErr.message);
      }
    };

    await runSeedOnce('seed_reorder_neet_180', async () => {
      await reorderNeet180Assessments(pool);
    });

    await runSeedOnce('seed_assessment_43', async () => {
      const qCheck = await pool.query('SELECT count(*)::int FROM questions WHERE assessment_id = 43');
      if (qCheck.rows[0].count < 180) {
        // eslint-disable-next-line no-console
        console.log(`[migrate] Assessment 43 has ${qCheck.rows[0].count} questions (<180). Uploading 180 questions...`);
        await uploadAssessment43(pool);
      }
    });

    await runSeedOnce('seed_biomolecules_questions', async () => {
      const qbCheck = await pool.query("SELECT count(*)::int FROM question_bank WHERE category = 'Chemistry' AND (chapter = 'Biomolecules' OR lower(chapter) = 'biomolecules')");
      if (qbCheck.rows[0].count < 45) {
        // eslint-disable-next-line no-console
        console.log(`[migrate] Biomolecules questions count is ${qbCheck.rows[0].count} (<45). Uploading 45 Biomolecules questions...`);
        await uploadBiomoleculesQuestions(pool);
      }
    });

    await runSeedOnce('seed_amines_questions', async () => {
      const aminesCheck = await pool.query("SELECT count(*)::int FROM question_bank WHERE category = 'Chemistry' AND (chapter = 'Amines' OR lower(chapter) = 'amines')");
      if (aminesCheck.rows[0].count < 55) {
        // eslint-disable-next-line no-console
        console.log(`[migrate] Amines questions count is ${aminesCheck.rows[0].count} (<55). Uploading 55 Amines questions...`);
        await uploadAminesQuestions(pool);
      }
    });

    await runSeedOnce('seed_units_measurements_questions', async () => {
      const unitsCheck = await pool.query("SELECT count(*)::int FROM question_bank WHERE category = 'Physics' AND (lower(chapter) = 'unit and measurement' OR chapter_id = 24)");
      if (unitsCheck.rows[0].count < 117) {
        // eslint-disable-next-line no-console
        console.log(`[migrate] Unit and Measurement questions count is ${unitsCheck.rows[0].count} (<117). Uploading 117 Physics questions...`);
        await uploadUnitsMeasurementsQuestions(pool);
      }
    });

    await runSeedOnce('seed_motion_straight_line_questions', async () => {
      const motionCheck = await pool.query("SELECT count(*)::int FROM question_bank WHERE category = 'Physics' AND (lower(chapter) = 'motion in straight line' OR lower(chapter) = 'motion in a straight line' OR chapter_id = 26)");
      if (motionCheck.rows[0].count < 88) {
        // eslint-disable-next-line no-console
        console.log(`[migrate] Motion in straight line questions count is ${motionCheck.rows[0].count} (<88). Uploading 88 Physics questions...`);
        await uploadMotionStraightLineQuestions(pool);
      }
    });

    await runSeedOnce('seed_motion_in_plane_questions', async () => {
      const planeCheck = await pool.query("SELECT count(*)::int FROM question_bank WHERE category = 'Physics' AND (lower(chapter) = 'motion in a plane' OR chapter_id = 27)");
      if (planeCheck.rows[0].count < 133) {
        // eslint-disable-next-line no-console
        console.log(`[migrate] motion in a plane questions count is ${planeCheck.rows[0].count} (<133). Uploading 133 Physics questions...`);
        await uploadMotionInPlaneQuestions(pool);
        await uploadMotionInPlanePart2Questions(pool);
      }
    });

    await runSeedOnce('seed_laws_of_motion_questions', async () => {
      const lawsCheck = await pool.query("SELECT count(*)::int FROM question_bank WHERE category = 'Physics' AND (lower(chapter) = 'laws of motion' OR chapter_id = 25)");
      if (lawsCheck.rows[0].count < 76) {
        // eslint-disable-next-line no-console
        console.log(`[migrate] Laws of Motion questions count is ${lawsCheck.rows[0].count} (<76). Uploading 76 Physics questions...`);
        await uploadLawsOfMotionQuestions(pool);
      }
    });

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
