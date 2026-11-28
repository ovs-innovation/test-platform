import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function inspectTable() {
  const res = await pool.query(`
    SELECT id, slug, title, exam_type, exam_year, version, is_default, is_active 
    FROM exam_blueprints
  `);
  console.log('Existing blueprints rows count:', res.rows.length);
  console.log(res.rows);

  const hist = await pool.query(`
    SELECT table_name FROM information_schema.tables WHERE table_name = 'exam_blueprint_history'
  `);
  console.log('History table exists?:', hist.rows.length > 0);

  await pool.end();
}
inspectTable().catch(console.error);
