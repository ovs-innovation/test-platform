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

async function checkDB() {
  const client = await pool.connect();
  const res = await client.query(`
    SELECT id, question_type, exam_type, question_text, options, correct_index, numeric_answer, image_url
    FROM question_bank
    WHERE chapter ILIKE 'Current Electricity'
    ORDER BY id ASC
  `);
  console.log('Total Current Electricity questions in Neon DB:', res.rows.length);
  const jee = res.rows.filter(r => r.exam_type === 'JEE');
  const neet = res.rows.filter(r => r.exam_type !== 'JEE');
  console.log('JEE questions:', jee.length, 'NEET questions:', neet.length);
  if (jee.length > 0) {
    console.log('Sample JEE Q1:', {
      id: jee[0].id,
      text: jee[0].question_text.slice(0, 100),
      options: jee[0].options
    });
    console.log('Sample JEE Q50:', {
      id: jee[49].id,
      text: jee[49].question_text.slice(0, 100),
      options: jee[49].options
    });
    console.log('Sample JEE Q100:', {
      id: jee[99].id,
      text: jee[99].question_text.slice(0, 100),
      options: jee[99].options
    });
  }
  client.release();
  await pool.end();
}

checkDB().catch(console.error);
