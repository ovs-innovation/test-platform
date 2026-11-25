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
    WHERE options::text ILIKE '%"(A)"%' OR options::text ILIKE '%"(1)"%'
    LIMIT 5
  `);
  console.log('Questions with (A), (B), (C), (D) as options:', res.rows.length);
  if (res.rows.length > 0) {
    console.log(JSON.stringify(res.rows[0], null, 2));
  }
  await client.release();
  await pool.end();
}

main().catch(console.error);
