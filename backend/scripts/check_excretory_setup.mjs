import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const colRes = await pool.query("SELECT column_name, data_type, column_default FROM information_schema.columns WHERE table_name = 'chapters'");
  console.log('Chapters columns:', colRes.rows);

  let exChapter = await pool.query("SELECT * FROM chapters WHERE subject_id = 13 AND name ILIKE '%Excretory%'");
  if (exChapter.rows.length === 0) {
    console.log('Creating chapter in Neon DB...');
    const inserted = await pool.query("INSERT INTO chapters (subject_id, name) VALUES (13, 'Excretory Products and their Elimination') RETURNING *");
    console.log('Inserted chapter:', inserted.rows[0]);
    exChapter = inserted;
  } else {
    console.log('Existing chapter in Neon DB:', exChapter.rows[0]);
  }

  await pool.end();
}

check().catch(console.error);
