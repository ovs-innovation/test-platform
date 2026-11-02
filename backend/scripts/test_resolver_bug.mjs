import { resolveStandardChapter } from '../src/utils/chapterResolver.js';
import { query } from '../src/config/db.js';

// Test Biomolecules question (ID 225)
const q225 = await query("SELECT * FROM question_bank WHERE id = 225");
if (q225.rows.length > 0) {
  const q = q225.rows[0];
  const res = resolveStandardChapter(q.category, q.topic, q.question_text, q.chapter, q.id);
  console.log(`Q225 (${q.chapter}) -> resolved to: "${res}"`);
}

// Test Solutions question with freezing point
const qSol = await query("SELECT * FROM question_bank WHERE chapter = 'Solutions' AND question_text ILIKE '%freezing point%' LIMIT 3");
qSol.rows.forEach(q => {
  const res = resolveStandardChapter(q.category, q.topic, q.question_text, q.chapter, q.id);
  console.log(`Q${q.id} (DB Chapter: ${q.chapter}, Topic: ${q.topic}) -> resolved to: "${res}"`);
});

process.exit(0);

