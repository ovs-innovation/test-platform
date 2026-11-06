import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { resolveStandardChapter } from '../src/utils/chapterResolver.js';

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

async function verify() {
  const client = await connectWithRetry();
  try {
    const res = await client.query(`
      SELECT 
        qb.id,
        qb.category,
        qb.question_type,
        qb.subject,
        qb.chapter,
        qb.chapter_id,
        c.name AS chapter_name,
        s.name AS subject_name,
        qb.status
      FROM question_bank qb
      LEFT JOIN chapters c ON qb.chapter_id = c.id
      LEFT JOIN subjects s ON qb.subject_id = s.id
      WHERE qb.subject_id = 7 AND qb.chapter_id = 105
      ORDER BY qb.id ASC
    `);

    console.log(`Retrieved ${res.rows.length} rows for subject_id=7, chapter_id=105.`);
    
    let resolvedCounts = {};
    for (const r of res.rows) {
      const ch = resolveStandardChapter(
        r.category || r.subject_name || '',
        '',
        '',
        r.chapter_name || r.chapter || '',
        r.id
      );
      resolvedCounts[ch] = (resolvedCounts[ch] || 0) + 1;
    }
    console.log('Resolved chapters breakdown:', resolvedCounts);
  } finally {
    client.release();
    await pool.end();
  }
}

verify().catch(console.error);
