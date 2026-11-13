import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT chapter_id, chapter, count(*)::int
      FROM question_bank
      WHERE category = 'PYQ' AND (subject = 'Chemistry' OR subject_id IN (6, 10))
      GROUP BY chapter_id, chapter
      ORDER BY count DESC
    `);
    console.log('Neon DB Chemistry PYQ counts:');
    console.table(res.rows);
  } finally {
    client.release();
    await pool.end();
  }
}

check().catch(console.error);

