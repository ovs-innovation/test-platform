import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 10) {
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
  const c = await connectWithRetry();
  try {
    const res = await c.query("SELECT * FROM chapters WHERE LOWER(name) LIKE '%stat%'");
    console.log('Chapters matching stat:', res.rows);
    const qb = await c.query("SELECT id, question_text, chapter, chapter_id, subject, subject_id FROM question_bank WHERE LOWER(chapter) LIKE '%stat%'");
    console.log('QB matching stat:', qb.rows);
  } finally {
    c.release();
    await pool.end();
  }
}

run().catch(console.error);
