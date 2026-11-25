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
  try {
    // Check chapter 204
    const chRes = await client.query('SELECT * FROM chapters WHERE id = 204 OR name ILIKE $1', ['%Chemical Equilibrium%']);
    console.log('Chapters found:', chRes.rows);

    // Count existing questions for chapter 204 or Chemical Equilibrium
    const qCount = await client.query(
      `SELECT count(*) FROM questions WHERE chapter_id = 204 OR (category = 'Chemistry' AND (chapter = 'Chemical Equilibrium' OR chapter ILIKE '%Chemical Equilibrium%'))`
    );
    console.log('Existing questions in Neon:', qCount.rows[0].count);

    const qByExam = await client.query(
      `SELECT exam_type, count(*) FROM questions WHERE chapter_id = 204 OR (category = 'Chemistry' AND chapter ILIKE '%Chemical Equilibrium%') GROUP BY exam_type`
    );
    console.log('Existing questions by exam_type:', qByExam.rows);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
