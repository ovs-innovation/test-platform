import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: NEON_DB,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const client = await pool.connect();
      return client;
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB connect DNS error: ${err.message}] Retrying in 2s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

async function verify() {
  console.log('=== VERIFYING DATABASE SEED FOR BINOMIAL THEOREM ===\n');
  const client = await connectWithRetry();

  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'mathematics'");
    const subjectId = subRes.rows[0].id;

    const chapRes = await client.query("SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'binomial theorem'", [subjectId]);
    console.log('Chapter:', chapRes.rows);
    const chapterId = chapRes.rows[0].id;

    const countRes = await client.query(
      "SELECT count(*) FROM question_bank WHERE subject_id = $1 AND chapter_id = $2",
      [subjectId, chapterId]
    );
    console.log(`Total questions in question_bank for Binomial Theorem: ${countRes.rows[0].count}`);

    const breakdown = await client.query(
      `SELECT question_type, COUNT(*) as count 
       FROM question_bank 
       WHERE subject_id = $1 AND chapter_id = $2 
       GROUP BY question_type`,
      [subjectId, chapterId]
    );
    console.log('\nBreakdown by question_type:');
    for (const row of breakdown.rows) {
      console.log(`  - ${row.question_type}: ${row.count}`);
    }

    const samples = await client.query(
      `SELECT id, question_type, question_text, correct_index, numeric_answer, marks, difficulty, solution
       FROM question_bank 
       WHERE subject_id = $1 AND chapter_id = $2 
       ORDER BY id ASC 
       LIMIT 3`,
      [subjectId, chapterId]
    );
    console.log('\nSample Questions from DB:');
    samples.rows.forEach((q, idx) => {
      console.log(`\nSample #${idx + 1} (ID: ${q.id}, Type: ${q.question_type}):`);
      console.log(`  Text: ${q.question_text.slice(0, 100)}...`);
      if (q.question_type === 'single_choice') {
        console.log(`  Correct Index: ${q.correct_index} (Option ${['A','B','C','D'][q.correct_index]})`);
      } else {
        console.log(`  Numeric Answer: ${q.numeric_answer}`);
      }
      console.log(`  Solution: ${q.solution.slice(0, 100)}...`);
    });

  } finally {
    client.release();
    await pool.end();
  }
}

verify().catch(console.error);

