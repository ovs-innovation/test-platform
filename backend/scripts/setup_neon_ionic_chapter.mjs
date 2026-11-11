import dotenv from 'dotenv';
import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../.env') });

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const subjects = await pool.query("SELECT * FROM subjects");
  console.log('Subjects:', subjects.rows);

  const ionic = await pool.query("SELECT * FROM chapters WHERE subject_id = 10 AND name ILIKE '%ionic%'");
  console.log('Neon Subject 10 Ionic chapters:', ionic.rows);

  let chapterId;
  if (ionic.rows.length === 0) {
    console.log('Creating Ionic Equilibrium in Neon DB under subject_id 10...');
    const insert = await pool.query(
      "INSERT INTO chapters (subject_id, name, position) VALUES (10, 'Ionic Equilibrium', 0) RETURNING *"
    );
    console.log('Created:', insert.rows[0]);
    chapterId = insert.rows[0].id;
  } else {
    chapterId = ionic.rows[0].id;
  }
  console.log('Neon Chapter ID for Ionic Equilibrium:', chapterId);

  await pool.end();
}

main().catch(console.error);
