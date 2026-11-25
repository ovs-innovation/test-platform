import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function run() {
  const r = await pool.query(`
    SELECT DISTINCT chapter, count(*) as cnt 
    FROM question_bank 
    WHERE category = 'Physics' AND exam_type = 'JEE' 
    GROUP BY chapter 
    ORDER BY chapter
  `);
  console.log('Current JEE Physics chapters in Neon:');
  let total = 0;
  for (const row of r.rows) {
    console.log(` - ${row.chapter}: ${row.cnt}`);
    total += parseInt(row.cnt);
  }
  console.log('Total JEE Physics questions:', total);

  const ch = await pool.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%gravitat%'");
  console.log('Chapters matching gravitation in Neon:', ch.rows);

  const subj = await pool.query("SELECT id, name FROM subjects WHERE name ILIKE '%physic%'");
  console.log('Physics subjects in Neon:', subj.rows);
}

run().then(() => pool.end()).catch(console.error);
