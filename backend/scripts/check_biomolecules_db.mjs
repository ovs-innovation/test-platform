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

async function checkDb() {
  const client = await pool.connect();
  try {
    const ch = await client.query("SELECT id, name, subject_id FROM chapters WHERE LOWER(name) LIKE '%biomolecule%'");
    console.log('Chapters matching biomolecule in local DB:');
    console.table(ch.rows);

    const qCount = await client.query("SELECT COUNT(*) FROM question_bank WHERE chapter_id = 133 AND category = 'PYQ'");
    console.log(`Current PYQ count in chapter 133: ${qCount.rows[0].count}`);
  } finally {
    client.release();
    await pool.end();
  }
}

checkDb().catch(console.error);
