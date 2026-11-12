import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const cols = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'chapters'");
  console.log('Chapters columns:', cols.rows.map(r => r.column_name));

  const insRes = await pool.query("INSERT INTO chapters (name, subject_id) VALUES ($1, $2) RETURNING *", ['Ecosystem', 15]);
  console.log('Inserted Neon Ecosystem chapter:', insRes.rows[0]);

  await pool.end();
}
check().catch(console.error);
