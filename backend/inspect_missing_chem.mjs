import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const res = await pool.query(`
    SELECT category, COUNT(*)::int as count, MIN(id) as min_id, MAX(id) as max_id
    FROM question_bank
    GROUP BY category
    ORDER BY category
  `);
  console.log('Categories in Neon DB:', res.rows);
  await pool.end();
}
check().catch(console.error);
