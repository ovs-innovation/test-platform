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
      SELECT id, name, subject_id
      FROM chapters
      WHERE name ILIKE '%semiconductor%'
      ORDER BY id
    `);
    console.log('Chapters in Neon DB matching semiconductor:');
    console.table(res.rows);

  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);

