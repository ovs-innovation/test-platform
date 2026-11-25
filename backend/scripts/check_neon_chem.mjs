import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  const res = await client.query(`
    SELECT chapter_id, chapter, count(*) as count 
    FROM question_bank 
    WHERE (subject ILIKE '%chem%' OR category ILIKE '%chem%') AND exam_type = 'JEE'
    GROUP BY chapter_id, chapter
    ORDER BY chapter
  `);
  console.log('Neon DB Chemistry JEE chapters:');
  console.table(res.rows);
  const total = res.rows.reduce((sum, r) => sum + parseInt(r.count, 10), 0);
  console.log('Total Neon Chemistry JEE questions:', total);
  await client.release();
  await pool.end();
}
main().catch(console.error);
