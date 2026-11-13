import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  const client = await pool.connect();
  try {
    const subRes = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) = 'chemistry'");
    console.log('Neon DB Chemistry Subject:', subRes.rows);
    const subId = subRes.rows[0]?.id;

    const chRes = await client.query("SELECT id, name, subject_id FROM chapters WHERE subject_id = $1 ORDER BY id", [subId]);
    console.log('\nNeon DB Chemistry Chapters:');
    for (const r of chRes.rows) {
      if (/basic|concept|mole/i.test(r.name)) {
        console.log(`  MATCH: ID ${r.id}: "${r.name}"`);
      }
    }
    console.log(`Total Chemistry chapters: ${chRes.rows.length}`);
  } finally {
    client.release();
    await pool.end();
  }
}

check().catch(console.error);

