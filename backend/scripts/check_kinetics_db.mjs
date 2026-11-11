import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: './backend/.env' });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  const sub = await client.query("SELECT id, name FROM subjects WHERE LOWER(name) LIKE '%chem%'");
  console.log('Local Chemistry subjects:', sub.rows);

  const ch = await client.query("SELECT id, subject_id, name FROM chapters WHERE LOWER(name) LIKE '%kinetic%'");
  console.log('Local Kinetics chapters:', ch.rows);

  const qCount = await client.query("SELECT COUNT(*) FROM question_bank WHERE LOWER(chapter) LIKE '%kinetic%' OR chapter_id IN (SELECT id FROM chapters WHERE LOWER(name) LIKE '%kinetic%')");
  console.log('Local existing questions count for Kinetics:', qCount.rows[0].count);

  const qCategories = await client.query("SELECT category, COUNT(*) FROM question_bank WHERE LOWER(chapter) LIKE '%kinetic%' OR chapter_id IN (SELECT id FROM chapters WHERE LOWER(name) LIKE '%kinetic%') GROUP BY category");
  console.log('Local Kinetics questions by category:', qCategories.rows);

  client.release();
  await pool.end();
}

main().catch(console.error);
