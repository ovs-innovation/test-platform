import { resolveStandardChapter } from '../src/utils/chapterResolver.js';
import { query } from '../src/config/db.js';

const all = await query("SELECT id, category, topic, question_text, chapter FROM question_bank WHERE category = 'Chemistry'");
let countBasic = 0;
let countSolutions = 0;
let countBiomolecules = 0;
const basicIds = [];

all.rows.forEach(q => {
  const ch = resolveStandardChapter(q.category, q.topic, q.question_text, q.chapter, q.id);
  if (ch === 'Some Basic Concepts of Chemistry') {
    countBasic++;
    basicIds.push(q.id);
  } else if (ch === 'Solutions') {
    countSolutions++;
  } else if (ch === 'Biomolecules') {
    countBiomolecules++;
  }
});

console.log('Results:');
console.log('  Some Basic Concepts of Chemistry:', countBasic);
console.log('  Solutions:', countSolutions);
console.log('  Biomolecules:', countBiomolecules);
console.log('  Min Basic ID:', Math.min(...basicIds), 'Max Basic ID:', Math.max(...basicIds));

process.exit(0);

