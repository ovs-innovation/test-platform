import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: NEON_DB,
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

async function check() {
  const client = await connectWithRetry();
  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'mathematics'");
    console.log('Subject:', subRes.rows);
    const subjectId = subRes.rows[0].id;

    const chapRes = await client.query("SELECT id, name, subject_id FROM chapters WHERE subject_id = $1 AND LOWER(name) LIKE '%binom%' ORDER BY name", [subjectId]);
    console.log(`Found matching chapters:`, chapRes.rows);

    const qCount = await client.query("SELECT count(*) FROM question_bank WHERE subject_id = $1 AND LOWER(chapter) LIKE '%binom%'", [subjectId]);
    console.log(`Current Binomial Theorem questions in question_bank: ${qCount.rows[0].count}`);
  } finally {
    client.release();
    await pool.end();
  }
}

check().catch(console.error);

