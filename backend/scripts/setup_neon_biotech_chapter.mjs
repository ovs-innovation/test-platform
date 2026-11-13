import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const cols = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'chapters'
  `);
  console.log('Chapters table columns:', cols.rows);

  const existing = await pool.query(`
    SELECT * FROM chapters WHERE subject_id = 13 AND name ILIKE '%biotech%'
  `);
  console.log('Existing biotech chapter in Neon DB:', existing.rows);

  if (existing.rows.length === 0) {
    console.log('Inserting chapter into Neon DB chapters table...');
    const insertRes = await pool.query(`
      INSERT INTO chapters (subject_id, name)
      VALUES (13, 'Biotechnology - Principles and Processes')
      RETURNING *
    `);
    console.log('Inserted chapter:', insertRes.rows[0]);
  }

  await pool.end();
}

main().catch(console.error);

