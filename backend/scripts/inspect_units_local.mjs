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

async function run() {
  const client = await pool.connect();
  const res = await client.query(
    "SELECT id, question_text, options, category, subject, chapter FROM question_bank WHERE question_text LIKE '%Consider that%Stefan-Boltzmann%' OR question_text LIKE '%RE-NEET 2026%'"
  );
  console.log('Found matching rows:', res.rows.length);
  for (const r of res.rows) {
    console.log(`ID: ${r.id}, category: ${r.category}, subject: ${r.subject}, chapter: ${r.chapter}`);
    console.log(`Question: ${r.question_text.slice(0, 120)}`);
    console.log(`Options:`, JSON.stringify(r.options));
    console.log('---');
  }
  client.release();
  await pool.end();
}

run().catch(console.error);
