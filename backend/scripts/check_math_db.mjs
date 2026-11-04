import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

async function check() {
  const subjects = await pool.query("SELECT id, name FROM subjects ORDER BY id");
  console.log('Subjects:', subjects.rows);
  const mathSubject = subjects.rows.find(s => s.name.toLowerCase().includes('math'));
  console.log('Math subject:', mathSubject);
  if (mathSubject) {
    const chapters = await pool.query("SELECT id, name FROM chapters WHERE subject_id = $1 ORDER BY id", [mathSubject.id]);
    console.log(`Chapters for subject ${mathSubject.id} (${mathSubject.name}):`, chapters.rows);
  }
  await pool.end();
}

check().catch(console.error);

