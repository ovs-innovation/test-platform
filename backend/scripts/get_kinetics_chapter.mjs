import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

async function getCh() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
  const res = await pool.query(
    "SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%Chemical Kinetics%' OR name ILIKE '%Kinetics%'"
  );
  console.log('Local Chemical Kinetics chapters:', res.rows);
  const subRes = await pool.query(
    "SELECT id, name FROM subjects WHERE name ILIKE '%Chemistry%'"
  );
  console.log('Local Chemistry subjects:', subRes.rows);
  await pool.end();
}
getCh().catch(console.error);
