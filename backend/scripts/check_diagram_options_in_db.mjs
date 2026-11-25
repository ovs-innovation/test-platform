import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  const res = await client.query(`
    SELECT id, chapter, question_text, options, image_url 
    FROM question_bank 
    WHERE options::text ILIKE '%cloudinary%' OR options::text ILIKE '%<img%' 
    LIMIT 5
  `);
  console.log('Questions with image options in DB:', res.rows.length);
  if (res.rows.length > 0) {
    console.log(JSON.stringify(res.rows[0], null, 2));
  }

  // Also check questions with image_url
  const res2 = await client.query(`
    SELECT id, chapter, question_type, image_url, solution_image_url
    FROM question_bank
    WHERE image_url IS NOT NULL
    LIMIT 5
  `);
  console.log('Sample questions with image_url:', res2.rows);

  await client.release();
  await pool.end();
}

main().catch(console.error);
