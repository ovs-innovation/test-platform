import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('backend/.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkColsQB() {
  const client = await pool.connect();
  try {
    const cols = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'question_bank' ORDER BY ordinal_position");
    console.log('Columns in question_bank table:', cols.rows.map(r => `${r.column_name} (${r.data_type})`));

    const sample = await client.query("SELECT * FROM question_bank WHERE exam_type = 'JEE' LIMIT 1");
    console.log('Sample JEE question in question_bank:', sample.rows[0]);

    const count = await client.query("SELECT count(*) FROM question_bank WHERE exam_type = 'JEE' AND category = 'Physics'");
    console.log('Total JEE Physics in question_bank:', count.rows[0].count);

    const gravCount = await client.query("SELECT count(*) FROM question_bank WHERE exam_type = 'JEE' AND (chapter ILIKE '%gravitation%' OR chapter_id = 24)");
    console.log('Total JEE Gravitation in question_bank:', gravCount.rows[0].count);
  } finally {
    client.release();
    await pool.end();
  }
}

checkColsQB().catch(console.error);
