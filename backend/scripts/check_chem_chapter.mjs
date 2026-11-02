import { query } from '../src/config/db.js';

const s = await query("SELECT id, name FROM subjects WHERE name ILIKE '%chem%'");
console.log('Subjects:', JSON.stringify(s.rows));

const c = await query("SELECT id, name FROM chapters WHERE name ILIKE '%basic concepts%' LIMIT 5");
console.log('Chapters:', JSON.stringify(c.rows));

const cnt = await query("SELECT COUNT(*) as total, COUNT(CASE WHEN question_type='assertion_reason' THEN 1 END) as ar FROM question_bank WHERE chapter ILIKE '%basic concepts of chemistry%'");
console.log('Count:', JSON.stringify(cnt.rows));

process.exit(0);
