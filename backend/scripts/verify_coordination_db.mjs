import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function verify() {
  const countRes = await pool.query(`
    SELECT count(*), question_type 
    FROM question_bank 
    WHERE exam_type = 'JEE' AND (chapter_id = 72 OR LOWER(chapter) = 'coordination compounds')
    GROUP BY question_type
  `);
  console.log('Database count by type:', countRes.rows);

  const sampleRes = await pool.query(`
    SELECT id, question_type, question_text, options, correct_index, numeric_answer, image_url, solution_image_url
    FROM question_bank
    WHERE exam_type = 'JEE' AND (chapter_id = 72 OR LOWER(chapter) = 'coordination compounds')
    ORDER BY id ASC
    LIMIT 3
  `);
  console.log('\nSample First 3 Questions in DB:');
  sampleRes.rows.forEach(r => {
    console.log(`\nID: ${r.id}, Type: ${r.question_type}, Correct: ${r.correct_index ?? r.numeric_answer}`);
    console.log(`Text: ${r.question_text.slice(0, 100)}...`);
    console.log(`Options:`, r.options);
    console.log(`Images: Q=${r.image_url}, Sol=${r.solution_image_url}`);
  });

  await pool.end();
}

verify().catch(console.error);
