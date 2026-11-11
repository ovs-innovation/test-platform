import { query } from '../src/config/db.js';

async function main() {
  const chRes = await query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%coordination%'");
  console.log('Local DB Coordination Chapters:', chRes.rows);

  const subRes = await query("SELECT id, name FROM subjects WHERE name ILIKE '%chem%'");
  console.log('Local DB Chemistry Subjects:', subRes.rows);

  // Check how many questions currently exist for coordination
  const qRes = await query("SELECT count(*) FROM questions WHERE chapter_id IN (SELECT id FROM chapters WHERE name ILIKE '%coordination%')");
  console.log('Existing questions count:', qRes.rows[0].count);

  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
