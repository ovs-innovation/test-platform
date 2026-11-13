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
      SELECT id, chapter_id, chapter, category, subject, SUBSTRING(question_text, 1, 80) as txt
      FROM question_bank
      WHERE id = 26536
    `);
    console.log('Question 26536:', res.rows[0]);

    // Also let's inspect all questions that have chapter_id = 106
    const q106 = await client.query(`
      SELECT count(*)::int, category, chapter
      FROM question_bank
      WHERE chapter_id = 106
      GROUP BY category, chapter
    `);
    console.log('\nQuestions with chapter_id = 106:');
    console.table(q106.rows);

    // Also let's inspect all questions that have chapter_id = 198
    const q198 = await client.query(`
      SELECT count(*)::int, category, chapter
      FROM question_bank
      WHERE chapter_id = 198
      GROUP BY category, chapter
    `);
    console.log('\nQuestions with chapter_id = 198:');
    console.table(q198.rows);

    // Also let's inspect all questions that have chapter_id = 144
    const q144 = await client.query(`
      SELECT count(*)::int, category, chapter
      FROM question_bank
      WHERE chapter_id = 144
      GROUP BY category, chapter
    `);
    console.log('\nQuestions with chapter_id = 144:');
    console.table(q144.rows);

  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);
