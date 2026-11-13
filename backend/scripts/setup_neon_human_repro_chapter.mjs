import dotenv from 'dotenv';
import pg from 'pg';
dotenv.config({ path: 'backend/.env' });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const existing = await pool.query(`
    SELECT * FROM chapters WHERE subject_id = 13 AND name ILIKE '%human reproduction%'
  `);
  console.log('Existing Human Reproduction in Neon DB:', existing.rows);

  if (existing.rows.length === 0) {
    console.log('Inserting "Human Reproduction" into Neon DB chapters table...');
    const insertRes = await pool.query(`
      INSERT INTO chapters (subject_id, name)
      VALUES (13, 'Human Reproduction')
      RETURNING *
    `);
    console.log('Inserted chapter:', insertRes.rows[0]);
  }

  await pool.end();
}

main().catch(console.error);
