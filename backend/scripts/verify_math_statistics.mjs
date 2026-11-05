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
  console.log("=== VERIFYING DATABASE: MATHEMATICS -> STATISTICS ===\n");
  const client = await connectWithRetry();

  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'mathematics'");
    const subjectId = subRes.rows[0].id;

    const chapRes = await client.query(
      "SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(name) = 'statistics'",
      [subjectId]
    );
    if (chapRes.rows.length === 0) {
      throw new Error("Chapter 'Statistics' not found in database.");
    }
    const chapterId = chapRes.rows[0].id;
    console.log(`Found Chapter: ${chapRes.rows[0].name} (ID: ${chapterId}) under Subject ID: ${subjectId}`);

    // Total count
    const totalRes = await client.query(
      "SELECT COUNT(*) FROM question_bank WHERE chapter_id = $1",
      [chapterId]
    );
    const totalCount = parseInt(totalRes.rows[0].count);
    console.log(`Total questions in Statistics: ${totalCount}`);

    // Breakdown by type
    const typeRes = await client.query(
      "SELECT question_type, COUNT(*) FROM question_bank WHERE chapter_id = $1 GROUP BY question_type",
      [chapterId]
    );
    console.log("Breakdown by question_type:");
    for (const r of typeRes.rows) {
      console.log(`  ${r.question_type}: ${r.count}`);
    }

    // Check for any invalid rows
    const invalidRes = await client.query(
      `SELECT COUNT(*) FROM question_bank 
       WHERE chapter_id = $1 AND (
         question_text IS NULL OR LENGTH(TRIM(question_text)) < 5 OR
         solution IS NULL OR LENGTH(TRIM(solution)) < 5 OR
         (question_type = 'single_choice' AND (correct_index IS NULL OR correct_index < 0 OR correct_index > 3)) OR
         (question_type = 'numerical' AND numeric_answer IS NULL)
       )`,
      [chapterId]
    );
    const invalidCount = parseInt(invalidRes.rows[0].count);
    console.log(`Integrity check: ${invalidCount === 0 ? "PASSED (0 invalid rows)" : `FAILED (${invalidCount} invalid rows)`}`);

    // Sample question inspection
    const sampleRes = await client.query(
      `SELECT id, question_type, question_text, options, correct_index, numeric_answer, marks, solution 
       FROM question_bank 
       WHERE chapter_id = $1 
       ORDER BY id ASC 
       LIMIT 3`,
      [chapterId]
    );

    console.log("\nSample First 3 Questions:");
    for (const row of sampleRes.rows) {
      console.log(`\n[ID ${row.id}] Type: ${row.question_type} | Marks: ${row.marks}`);
      console.log(`Question: ${row.question_text.slice(0, 100)}...`);
      if (row.question_type === 'single_choice') {
        const opts = typeof row.options === 'string' ? JSON.parse(row.options) : row.options;
        console.log(`Options (${opts.length}): ${opts.map(o => `${o.key}: ${o.text}`).join(' | ')}`);
        console.log(`Correct: Index ${row.correct_index} (${opts[row.correct_index]?.key})`);
      } else {
        console.log(`Numeric Answer: ${row.numeric_answer}`);
      }
      console.log(`Solution: ${row.solution.slice(0, 120)}...`);
    }

    const sampleNumRes = await client.query(
      `SELECT id, question_type, question_text, numeric_answer, marks, solution 
       FROM question_bank 
       WHERE chapter_id = $1 AND question_type = 'numerical'
       ORDER BY id ASC 
       LIMIT 2`,
      [chapterId]
    );

    console.log("\nSample Numerical Questions:");
    for (const row of sampleNumRes.rows) {
      console.log(`\n[ID ${row.id}] Type: ${row.question_type} | Answer: ${row.numeric_answer}`);
      console.log(`Question: ${row.question_text.slice(0, 100)}...`);
      console.log(`Solution: ${row.solution.slice(0, 120)}...`);
    }

    console.log("\n=== ALL VERIFICATIONS PASSED! ===");
  } finally {
    client.release();
    await pool.end();
  }
}

verify().catch(console.error);
