import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const client = new pg.Client({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
await client.connect();

const countRes = await client.query(`
  SELECT category, exam_type, chapter, count(*) 
  FROM question_bank 
  WHERE exam_type = 'JEE' AND chapter = 'Units and dimensions'
  GROUP BY category, exam_type, chapter
`);
console.log('Group count:', countRes.rows);

const sampleRes = await client.query(`
  SELECT id, question_type, marks, status, left(question_text, 60) as q, correct_index, numeric_answer 
  FROM question_bank 
  WHERE exam_type = 'JEE' AND chapter = 'Units and dimensions'
  ORDER BY id ASC LIMIT 3
`);
console.log('Sample rows:', sampleRes.rows);

await client.end();
