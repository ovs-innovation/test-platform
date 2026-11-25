import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveStandardChapter } from '../src/utils/chapterResolver.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function test() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT id, chapter, topic, question_text, category, subject FROM question_bank WHERE exam_type = 'JEE' AND chapter = 'Capacitance'");
    console.log('Total rows fetched from DB:', res.rows.length);
    const resolved = res.rows.map(r => resolveStandardChapter(r.category, r.topic, r.question_text, r.chapter, r.id));
    const distinct = [...new Set(resolved)];
    console.log('Distinct resolved chapters across all rows:', distinct);
  } finally {
    client.release();
    await pool.end();
  }
}
test().catch(console.error);
