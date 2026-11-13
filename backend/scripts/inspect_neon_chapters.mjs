import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT id, name FROM chapters WHERE subject_id = 11 ORDER BY id');
    console.log('Neon DB Physics Chapters:');
    res.rows.forEach(r => console.log(`  id: ${r.id}, name: "${r.name}"`));
  } finally {
    client.release();
    await pool.end();
  }
}
main().catch(console.error);

