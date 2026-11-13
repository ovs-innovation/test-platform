import { query } from '../src/config/db.js';

async function main() {
  const res = await query("SELECT category, subject, count(*)::int FROM question_bank WHERE chapter ILIKE '%living world%' GROUP BY category, subject");
  console.log('Categories in Neon DB:', res.rows);
}

main().finally(() => process.exit(0));

