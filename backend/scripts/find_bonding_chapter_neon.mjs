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
    SELECT id, name, subject_id 
    FROM chapters 
    WHERE name ILIKE '%bonding%'
  `);
  console.log('Neon chapters for Bonding:');
  console.table(res.rows);

  const qbRes = await client.query(`
    SELECT id, chapter_id, chapter, count(*) as cnt
    FROM question_bank
    WHERE (chapter ILIKE '%bonding%' OR chapter_id IN (SELECT id FROM chapters WHERE name ILIKE '%bonding%'))
      AND exam_type = 'JEE'
    GROUP BY id, chapter_id, chapter
    LIMIT 5
  `);
  console.log('Existing Neon questions for Bonding:');
  console.table(qbRes.rows);

  await client.release();
  await pool.end();
}
main().catch(console.error);
