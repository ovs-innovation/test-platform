import { query } from '../src/config/db.js';

async function main() {
  const res = await query(`
    SELECT enumlabel 
    FROM pg_enum 
    JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
    WHERE typname = 'question_type'
  `);
  console.log('Enum question_type values:', res.rows.map(r => r.enumlabel));

  // Also check distinct question_type in question_bank
  const qRes = await query(`SELECT DISTINCT question_type FROM question_bank`);
  console.log('Distinct question_type in question_bank:', qRes.rows.map(r => r.question_type));

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
