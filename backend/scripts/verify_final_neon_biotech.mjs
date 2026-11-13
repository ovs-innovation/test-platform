import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const countRes = await pool.query(`
    SELECT count(*) as total
    FROM question_bank
    WHERE subject = 'Zoology' AND chapter = 'Biotechnology and its Applications' AND category = 'PYQ'
  `);
  console.log('Total verified questions in Neon DB:', countRes.rows[0].total);

  const sampleRes = await pool.query(`
    SELECT id, question_text, options, correct_index, chapter, marks
    FROM question_bank
    WHERE subject = 'Zoology' AND chapter = 'Biotechnology and its Applications' AND category = 'PYQ'
    ORDER BY id ASC
    LIMIT 3
  `);
  console.log('Sample questions:');
  console.log(JSON.stringify(sampleRes.rows, null, 2));

  await pool.end();
}

main().catch(console.error);

