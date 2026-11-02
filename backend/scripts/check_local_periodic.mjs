import { pool } from '../src/config/db.js';

async function check() {
  const res = await pool.query(
    "SELECT COUNT(*) FROM question_bank WHERE chapter ILIKE '%periodic%' OR chapter ILIKE '%classification%'"
  );
  console.log('Local Periodic questions count:', res.rows[0].count);

  const chRes = await pool.query(
    "SELECT id, name FROM chapters WHERE name ILIKE '%periodic%' OR name ILIKE '%classification%'"
  );
  console.log('Local Periodic chapters:', chRes.rows);

  process.exit(0);
}

check().catch(console.error);

