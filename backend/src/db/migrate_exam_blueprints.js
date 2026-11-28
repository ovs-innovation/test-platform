import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

export async function runBlueprintMigration() {
  console.log('=== VERIFYING & UPGRADING EXAM BLUEPRINTS SCHEMA ===');
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // 1. Ensure indexes on exam_blueprints
    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_exam_blueprints_exam_type ON exam_blueprints(exam_type);
      CREATE INDEX IF NOT EXISTS idx_exam_blueprints_exam_year ON exam_blueprints(exam_year);
      CREATE INDEX IF NOT EXISTS idx_exam_blueprints_is_active ON exam_blueprints(is_active);
      CREATE INDEX IF NOT EXISTS idx_exam_blueprints_slug ON exam_blueprints(slug);
      CREATE INDEX IF NOT EXISTS idx_exam_blueprints_is_default ON exam_blueprints(is_default);
    `);

    // 2. Ensure exam_blueprint_history table
    await client.query(`
      CREATE TABLE IF NOT EXISTS exam_blueprint_history (
        id SERIAL PRIMARY KEY,
        blueprint_id INT NOT NULL REFERENCES exam_blueprints(id) ON DELETE CASCADE,
        version INT NOT NULL,
        snapshot JSONB NOT NULL,
        change_summary TEXT,
        changed_by VARCHAR(255) DEFAULT 'system',
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP NOT NULL
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_exam_blueprint_history_bid ON exam_blueprint_history(blueprint_id);
      CREATE INDEX IF NOT EXISTS idx_exam_blueprint_history_ver ON exam_blueprint_history(blueprint_id, version);
    `);

    await client.query('COMMIT');
    console.log('Exam blueprint schema and history table verified successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Migration error:', err);
    throw err;
  } finally {
    client.release();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runBlueprintMigration()
    .then(() => pool.end())
    .catch((err) => {
      console.error(err);
      pool.end();
      process.exit(1);
    });
}
