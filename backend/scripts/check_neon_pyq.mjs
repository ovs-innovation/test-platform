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

async function run() {
  const client = await pool.connect();
  try {
    const res = await client.query(`
      SELECT 
        category,
        subject,
        chapter_id,
        chapter,
        COUNT(*)::int as cnt
      FROM question_bank
      WHERE LOWER(category) = 'pyq'
      GROUP BY category, subject, chapter_id, chapter
      ORDER BY chapter_id, chapter
    `);
    console.log('Neon DB PYQ groups:');
    console.table(res.rows);

    const total = await client.query(`SELECT count(*)::int FROM question_bank WHERE LOWER(category) = 'pyq'`);
    console.log('Total PYQ in Neon DB:', total.rows[0].count);

  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);

