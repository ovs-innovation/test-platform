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
    WHERE image_url IS NOT NULL AND image_url != ''
    LIMIT 10
  `);
  for (const q of res.rows) {
    console.log(`\nID: ${q.id} | Chapter: ${q.chapter}`);
    console.log(`Q: ${q.question_text?.substring(0, 80)}`);
    console.log(`Img: ${q.image_url}`);
    console.log(`Opts: ${JSON.stringify(q.options)}`);
  }
  await client.release();
  await pool.end();
}

main().catch(console.error);
