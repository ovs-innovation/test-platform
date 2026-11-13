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

async function findRecentlyModified() {
  const client = await pool.connect();
  try {
    // Check if there are any questions in local DB with chapter_id matching Biomolecules (133), Hydrocarbons (168), etc.
    // where category != 'PYQ'
    const res = await client.query(`
      SELECT id, question_text, category, subject, chapter_id, chapter, image_url, created_at
      FROM question_bank 
      WHERE chapter_id IN (133, 168, 126, 128, 147, 149, 137, 105, 173) 
        AND category != 'PYQ'
    `);
    console.log(`Found ${res.rows.length} questions in local DB with PYQ chapter IDs but category != 'PYQ':`);
    console.table(res.rows);

    // Also check if any question has category != 'PYQ' but has topic/chapter from PYQs
    const res2 = await client.query(`
      SELECT id, question_text, category, subject, chapter_id, chapter, image_url
      FROM question_bank 
      WHERE category != 'PYQ' 
        AND (LOWER(chapter) LIKE '%biomolecule%' OR LOWER(chapter) LIKE '%hydrocarbon%')
    `);
    console.log(`Found ${res2.rows.length} questions with chapter biomolecule/hydrocarbon but category != 'PYQ':`);
    console.table(res2.rows);
  } finally {
    client.release();
    await pool.end();
  }
}

findRecentlyModified().catch(console.error);

