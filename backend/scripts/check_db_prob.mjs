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

async function connectWithRetry(maxRetries = 15) {
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

async function run() {
  const client = await connectWithRetry();
  try {
    const chRes = await client.query(`
      SELECT c.id, c.name, c.subject_id, s.name as subject_name,
        (SELECT count(*) FROM question_bank qb WHERE qb.chapter_id = c.id) as qb_count,
        (SELECT count(*) FROM questions q WHERE q.chapter_id = c.id) as q_count
      FROM chapters c
      LEFT JOIN subjects s ON c.subject_id = s.id
      WHERE LOWER(c.name) LIKE '%prob%' OR LOWER(c.name) LIKE '%para%'
      ORDER BY c.name
    `);
    console.log('Chapters matching prob / para:');
    console.table(chRes.rows);

    const qbRes = await client.query(`
      SELECT chapter, chapter_id, category, count(*) 
      FROM question_bank 
      WHERE LOWER(chapter) LIKE '%prob%' OR LOWER(chapter) LIKE '%para%'
      GROUP BY chapter, chapter_id, category
    `);
    console.log('\nquestion_bank groups:');
    console.table(qbRes.rows);
  } finally {
    client.release();
    await pool.end();
  }
}
run().catch(console.error);
