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

async function check() {
  const client = await pool.connect();
  try {
    // Check questions in Chemistry or other subjects that might have been PYQs
    const res = await client.query(`
      SELECT id, question_text, category, subject, chapter_id, chapter, created_at
      FROM question_bank 
      WHERE (marks = 4 AND category != 'PYQ') 
         OR (category IN ('Chemistry', 'Physics', 'Botany', 'Zoology', 'Mathematics') AND chapter_id IS NOT NULL)
      ORDER BY id DESC
      LIMIT 20
    `);
    console.log('Sample non-PYQ questions with chapters:');
    console.table(res.rows.map(r => ({
      id: r.id,
      text: r.question_text.slice(0, 40),
      category: r.category,
      subject: r.subject,
      chapter_id: r.chapter_id,
      chapter: r.chapter
    })));
  } finally {
    client.release();
    await pool.end();
  }
}

check().catch(console.error);

