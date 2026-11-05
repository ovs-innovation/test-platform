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
  console.log('=== VERIFYING MATHEMATICS: STRAIGHT LINES IN DATABASE ===\n');
  const client = await connectWithRetry();

  try {
    // 1. Chapter and Subject check
    const chapRes = await client.query(`
      SELECT c.id as chapter_id, c.name as chapter_name, s.id as subject_id, s.name as subject_name
      FROM chapters c
      JOIN subjects s ON c.subject_id = s.id
      WHERE c.id = 79
    `);
    console.log('Chapter info:', chapRes.rows[0]);

    // 2. Count total questions
    const countRes = await client.query(`
      SELECT COUNT(*) as total,
             COUNT(*) FILTER (WHERE question_type = 'single_choice') as mcq_count,
             COUNT(*) FILTER (WHERE question_type = 'numerical') as numerical_count
      FROM question_bank
      WHERE chapter_id = 79
    `);
    console.log('\nQuestions count:', countRes.rows[0]);

    // 3. Check data integrity
    const integrityRes = await client.query(`
      SELECT 
        COUNT(*) FILTER (WHERE question_text IS NULL OR LENGTH(TRIM(question_text)) = 0) as empty_text,
        COUNT(*) FILTER (WHERE solution IS NULL OR LENGTH(TRIM(solution)) = 0) as empty_solution,
        COUNT(*) FILTER (WHERE question_type = 'single_choice' AND (options IS NULL OR jsonb_array_length(options::jsonb) != 4)) as bad_options,
        COUNT(*) FILTER (WHERE question_type = 'single_choice' AND (correct_index IS NULL OR correct_index < 0 OR correct_index > 3)) as bad_correct_index,
        COUNT(*) FILTER (WHERE question_type = 'numerical' AND numeric_answer IS NULL) as bad_numeric_answer
      FROM question_bank
      WHERE chapter_id = 79
    `);
    console.log('\nData integrity check:', integrityRes.rows[0]);

    // 4. Sample questions
    const samples = await client.query(`
      SELECT id, question_type, LEFT(question_text, 80) as question_preview, correct_index, numeric_answer, marks
      FROM question_bank
      WHERE chapter_id = 79
      ORDER BY id ASC
      LIMIT 5
    `);
    console.log('\nFirst 5 questions sample:');
    samples.rows.forEach(r => console.log(r));

    const lastSamples = await client.query(`
      SELECT id, question_type, LEFT(question_text, 80) as question_preview, correct_index, numeric_answer, marks
      FROM question_bank
      WHERE chapter_id = 79
      ORDER BY id DESC
      LIMIT 5
    `);
    console.log('\nLast 5 questions sample:');
    lastSamples.rows.forEach(r => console.log(r));

  } finally {
    client.release();
    await pool.end();
  }
}

verify().catch(err => {
  console.error('Verification error:', err);
  process.exit(1);
});
