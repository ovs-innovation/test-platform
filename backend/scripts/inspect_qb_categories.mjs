import { query } from '../src/config/db.js';

async function main() {
  const r = await query('SELECT category, exam_type, subject, count(*)::int FROM question_bank GROUP BY category, exam_type, subject ORDER BY 1,2,3;');
  console.log(JSON.stringify(r.rows, null, 2));
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
