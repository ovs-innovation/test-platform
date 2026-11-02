import { query } from '../src/config/db.js';

const r = await query(
  "SELECT id, question_type, LEFT(question_text, 60) as txt FROM question_bank WHERE chapter ILIKE '%basic concepts%' ORDER BY id"
);
console.log('Total count:', r.rows.length);
r.rows.forEach(q => console.log(q.id, q.question_type, q.txt));
process.exit(0);

