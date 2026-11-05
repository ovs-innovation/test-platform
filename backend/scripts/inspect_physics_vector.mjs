import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  try {
    const subs = await client.query(`SELECT id, name FROM subjects WHERE name ILIKE '%phys%'`);
    console.log('Physics subjects:', subs.rows);

    const chaps = await client.query(`SELECT id, name, subject_id, position FROM chapters WHERE name ILIKE '%vector%' OR name ILIKE '%mathematical%'`);
    console.log('Matching chapters:', chaps.rows);

    const allPhys = await client.query(`SELECT id, name, position FROM chapters WHERE subject_id = $1 ORDER BY position, id`, [subs.rows[0].id]);
    console.log('All Physics chapters:');
    console.table(allPhys.rows);

    const qbRes = await client.query(`SELECT count(*), chapter_id, chapter FROM question_bank WHERE chapter ILIKE '%vector%' GROUP BY chapter_id, chapter`);
    console.log('Existing QB rows for Vector:', qbRes.rows);

  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);

