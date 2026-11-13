import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_pnKv5TdUQ7fg@ep-weathered-heart-aqvw9ylo-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function main() {
  // Check if "Biotechnology and its Applications" exists in chapters
  const res = await pool.query(`
    SELECT * FROM chapters WHERE subject_id = 13 AND name ILIKE '%Biotechnology and its Applications%'
  `);
  if (res.rows.length === 0) {
    console.log('Inserting chapter "Biotechnology and its Applications" into Neon DB chapters table...');
    const insertRes = await pool.query(`
      INSERT INTO chapters (name, subject_id)
      VALUES ('Biotechnology and its Applications', 13)
      RETURNING *
    `);
    console.log('Created chapter:', insertRes.rows[0]);
  } else {
    console.log('Chapter already exists:', res.rows[0]);
  }
  await pool.end();
}

main().catch(console.error);

