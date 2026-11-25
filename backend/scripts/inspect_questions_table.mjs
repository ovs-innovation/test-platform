import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('backend/.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkCols() {
  const client = await pool.connect();
  try {
    const cols = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'questions' ORDER BY ordinal_position");
    console.log('Columns in questions table:', cols.rows.map(r => `${r.column_name} (${r.data_type})`));

    const sample = await client.query("SELECT * FROM questions WHERE chapter_id = 24 LIMIT 3");
    console.log('Sample Gravitation in Neon:', sample.rows);

    const count = await client.query("SELECT count(*) FROM questions WHERE chapter_id = 24");
    console.log('Total Gravitation in Neon:', count.rows[0].count);
  } finally {
    client.release();
    await pool.end();
  }
}

checkCols().catch(console.error);
