import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  const client = await pool.connect();
  try {
    const subjects = await client.query("SELECT id, name FROM subjects ORDER BY id");
    console.log('Subjects in Neon DB:', subjects.rows);

    const chs = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%capacit%' OR name ILIKE '%vector%'");
    console.log('Capacitance & Vector chapters:', chs.rows);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
