import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.resolve('backend/.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function checkNeon() {
  const client = await pool.connect();
  try {
    const subs = await client.query("SELECT * FROM subjects WHERE name ILIKE '%phys%'");
    console.log('Subjects:', subs.rows);

    const chs = await client.query("SELECT * FROM chapters WHERE subject_id = ANY($1) AND name ILIKE '%gravitation%'", [subs.rows.map(s => s.id)]);
    console.log('Gravitation chapters in Neon:', chs.rows);

    const qCount = await client.query("SELECT count(*) FROM questions WHERE exam_type = 'JEE' AND (category = 'Physics' OR subject_id = 11)");
    console.log('Current JEE Physics questions in Neon:', qCount.rows[0].count);

    const gravQ = await client.query("SELECT count(*) FROM questions WHERE exam_type = 'JEE' AND (chapter ILIKE '%gravitation%' OR chapter_id = 24)");
    console.log('Current JEE Gravitation questions in Neon:', gravQ.rows[0].count);
  } finally {
    client.release();
    await pool.end();
  }
}

checkNeon().catch(console.error);
