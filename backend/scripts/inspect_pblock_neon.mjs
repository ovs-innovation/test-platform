import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const client = await pool.connect();
  try {
    const subRes = await client.query('SELECT id, name FROM subjects ORDER BY id');
    console.log('Subjects:', subRes.rows);
    const chRes = await client.query("SELECT id, subject_id, name FROM chapters WHERE name ILIKE '%block%' ORDER BY id");
    console.log('p-block chapters in Neon:', chRes.rows);

    const qbRes = await client.query("SELECT count(*), chapter FROM question_bank WHERE exam_type = 'JEE' AND category = 'Chemistry' GROUP BY chapter");
    console.log('Current Chemistry chapters in question_bank:', qbRes.rows);
  } finally {
    client.release();
    await pool.end();
  }
}
check().catch(console.error);
