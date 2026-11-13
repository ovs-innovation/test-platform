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

async function checkOrphanedPyq() {
  const client = await pool.connect();
  try {
    // Check questions in local DB where category != 'PYQ' but chapter_id is 133 (Biomolecules Chemistry)
    const ch133 = await client.query(`
      SELECT id, question_text, category, subject, chapter_id, chapter, image_url, created_at 
      FROM question_bank 
      WHERE chapter_id = 133 AND category != 'PYQ'
    `);
    console.log(`Local DB chapter 133 non-PYQ questions: ${ch133.rows.length}`);
    for (const r of ch133.rows) {
      console.log(r.id, r.category, r.subject, r.question_text.slice(0, 50));
    }

    // Check all chapters where category != 'PYQ' but subject is set and marks = 4 and question_text matches PYQ patterns
    const recent = await client.query(`
      SELECT id, question_text, category, subject, chapter_id, chapter, image_url, created_at 
      FROM question_bank 
      WHERE category != 'PYQ' AND (
        question_text ILIKE '%NEET%' OR 
        question_text ILIKE '%AIPMT%' OR 
        question_text ILIKE '%RE-NEET%'
      )
      LIMIT 20
    `);
    console.log(`Questions containing NEET/AIPMT with category != 'PYQ': ${recent.rows.length}`);
    for (const r of recent.rows) {
      console.log(r.id, r.category, r.subject, r.question_text.slice(0, 50));
    }
  } finally {
    client.release();
    await pool.end();
  }
}

checkOrphanedPyq().catch(console.error);

