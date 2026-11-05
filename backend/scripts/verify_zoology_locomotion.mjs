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

async function verify() {
  const client = await pool.connect();
  try {
    console.log('=== VERIFYING ZOOLOGY: LOCOMOTION AND MOVEMENT ===\n');

    // 1. Chapter Details
    const chapRes = await client.query(`
      SELECT c.id, c.name, c.subject_id, s.name as subject_name 
      FROM chapters c 
      JOIN subjects s ON c.subject_id = s.id 
      WHERE c.id = 3 OR c.name ILIKE '%locomotion%'
    `);
    console.log('Chapter:', chapRes.rows);

    const chapterId = chapRes.rows[0]?.id || 3;

    // 2. Question Counts Breakdown
    const counts = await client.query(`
      SELECT question_type, topic, COUNT(*) as count 
      FROM question_bank 
      WHERE chapter_id = $1 
      GROUP BY question_type, topic 
      ORDER BY question_type
    `, [chapterId]);
    console.log('\nCounts by Type & Topic:');
    console.table(counts.rows);

    const total = await client.query(`SELECT COUNT(*) as total FROM question_bank WHERE chapter_id = $1`, [chapterId]);
    console.log('Total Questions in Chapter:', total.rows[0].total);

    // 3. Diagram Questions Check
    const diagQ = await client.query(`
      SELECT id, question_text, image_url 
      FROM question_bank 
      WHERE chapter_id = $1 AND image_url IS NOT NULL AND image_url != ''
      ORDER BY id
    `, [chapterId]);
    console.log(`\nQuestions with Diagrams (${diagQ.rows.length}):`);
    diagQ.rows.forEach(r => {
      console.log(`  ID ${r.id}: ${r.image_url}`);
      console.log(`     Text: ${r.question_text.substring(0, 65)}...`);
    });

    // 4. Sample AR Questions
    const sampleAR = await client.query(`
      SELECT id, question_type, topic, assertion_text, reason_text, correct_index, options 
      FROM question_bank 
      WHERE chapter_id = $1 AND question_type = 'assertion_reason'
      ORDER BY id
      LIMIT 2
    `, [chapterId]);
    console.log('\nSample AR Questions:');
    sampleAR.rows.forEach(r => {
      console.log(`  ID ${r.id} | Correct Index: ${r.correct_index}`);
      console.log(`    Assertion: ${r.assertion_text}`);
      console.log(`    Reason: ${r.reason_text}`);
    });

  } finally {
    client.release();
    await pool.end();
  }
}

verify().catch(console.error);

