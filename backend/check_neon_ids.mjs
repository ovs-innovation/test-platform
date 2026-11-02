import pg from 'pg';
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const q8191 = await pool.query('SELECT id, category, chapter FROM question_bank WHERE id = 8191');
  console.log('Question 8191 in Neon DB:', q8191.rows);
  const max = await pool.query('SELECT MAX(id) as max_id FROM question_bank');
  console.log('Max ID in Neon DB:', max.rows[0].max_id);
  await pool.end();
}
main();

