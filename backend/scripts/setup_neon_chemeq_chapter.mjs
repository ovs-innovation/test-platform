import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function check() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM chapters WHERE subject_id = 10 AND LOWER(name) LIKE '%chemical equilibrium%'");
    if (res.rows.length === 0) {
      console.log('No Chemical Equilibrium chapter in Neon DB, creating one...');
      const ins = await client.query("INSERT INTO chapters (subject_id, name, created_at) VALUES (10, 'Chemical Equilibrium', NOW()) RETURNING id, name");
      console.log('Created Neon chapter:', ins.rows[0]);
    } else {
      console.log('Found existing Neon chapter:', res.rows[0]);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

check().catch(console.error);
