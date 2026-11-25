import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('backend/.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkBank() {
  const client = await pool.connect();
  try {
    const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
    console.log('Tables:', tables.rows.map(r => r.table_name));

    if (tables.rows.some(r => r.table_name === 'bank_questions')) {
      const bCols = await client.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'bank_questions'");
      console.log('bank_questions columns:', bCols.rows.map(r => r.column_name));
      const bCount = await client.query("SELECT count(*) FROM bank_questions WHERE subject_id = 11");
      console.log('bank_questions for Physics count:', bCount.rows[0].count);
      const gravCount = await client.query("SELECT count(*) FROM bank_questions WHERE chapter_id = 24 OR chapter ILIKE '%gravitation%'");
      console.log('bank_questions for Gravitation count:', gravCount.rows[0].count);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

checkBank().catch(console.error);
