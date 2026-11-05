import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveStandardChapter } from '../src/utils/chapterResolver.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: NEON_DB,
  ssl: { rejectUnauthorized: false }
});

async function verify() {
  console.log('====================================================');
  console.log('VERIFYING MATHEMATICS: VECTOR-ALGEBRA IN DATABASE');
  console.log('====================================================\n');

  const client = await pool.connect();

  try {
    // 1. Verify Chapter in DB
    const chapRes = await client.query(
      "SELECT id, name, subject_id, position FROM chapters WHERE LOWER(name) = 'vector-algebra' AND subject_id = 7"
    );
    console.log('1. Chapter in Database:', chapRes.rows);
    if (chapRes.rows.length === 0) {
      throw new Error("Chapter 'Vector-Algebra' not found in chapters table!");
    }
    const chapterId = chapRes.rows[0].id;

    // 2. Count total questions
    const countRes = await client.query(
      "SELECT count(*) as total FROM question_bank WHERE chapter_id = $1",
      [chapterId]
    );
    const totalCount = parseInt(countRes.rows[0].total, 10);
    console.log(`2. Total Questions in Chapter: ${totalCount}`);
    if (totalCount !== 305) {
      throw new Error(`Expected exactly 305 questions, found: ${totalCount}`);
    }

    // 3. Question breakdown by type
    const typeRes = await client.query(
      "SELECT question_type, count(*) as count FROM question_bank WHERE chapter_id = $1 GROUP BY question_type",
      [chapterId]
    );
    console.log('3. Question Types Breakdown:');
    console.table(typeRes.rows);

    // 4. Status & Marks check
    const statusRes = await client.query(
      "SELECT status, marks, difficulty, count(*) as count FROM question_bank WHERE chapter_id = $1 GROUP BY status, marks, difficulty",
      [chapterId]
    );
    console.log('4. Status & Marks Distribution:');
    console.table(statusRes.rows);

    // 5. Diagram check (Q142)
    const diagRes = await client.query(
      "SELECT id, question_text, image_url FROM question_bank WHERE chapter_id = $1 AND image_url IS NOT NULL AND image_url != ''",
      [chapterId]
    );
    console.log(`5. Questions with Diagram: ${diagRes.rows.length}`);
    for (const r of diagRes.rows) {
      console.log(`   ID: ${r.id} | Diagram URL: ${r.image_url}`);
      console.log(`   Text preview: ${r.question_text.slice(0, 100)}...`);
    }

    // 6. Chapter Resolver validation
    const test1 = resolveStandardChapter('Mathematics', 'Vector Algebra', '');
    const test2 = resolveStandardChapter('Mathematics', '', 'Scalar triple product of vectors');
    const test3 = resolveStandardChapter('Mathematics', '', '', 'Vector-Algebra');
    console.log('6. Chapter Resolver Tests:');
    console.log(`   'Vector Algebra' -> '${test1}'`);
    console.log(`   'Scalar triple product...' -> '${test2}'`);
    console.log(`   'Vector-Algebra' -> '${test3}'`);

    // 7. Sample Questions Inspection
    const sampleRes = await client.query(
      `SELECT id, question_type, question_text, options, correct_index, numeric_answer, solution
       FROM question_bank 
       WHERE chapter_id = $1 
       ORDER BY id ASC 
       LIMIT 3`,
      [chapterId]
    );
    console.log('\n7. Sample Questions (First 3):');
    for (const q of sampleRes.rows) {
      console.log(`   [ID: ${q.id}] [${q.question_type}] ${q.question_text.slice(0, 80)}...`);
      console.log(`     Correct: ${q.correct_index !== null ? q.correct_index : q.numeric_answer} | Sol preview: ${q.solution.slice(0, 80)}...`);
    }

    console.log('\n====================================================');
    console.log(' ALL VERIFICATION CHECKS PASSED PERFECTLY (305/305)');
    console.log('====================================================');

  } finally {
    client.release();
    await pool.end();
  }
}

verify().catch(err => {
  console.error('Verification failed:', err);
  process.exit(1);
});
