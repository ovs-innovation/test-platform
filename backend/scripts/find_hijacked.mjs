import { query } from '../src/config/db.js';

const r1 = await query(`
  SELECT id, chapter_id, chapter, topic, question_text 
  FROM question_bank 
  WHERE question_text ILIKE '%phenylhydrazine%' 
     OR question_text ILIKE '%freezing point%' 
     OR question_text ILIKE '%Henry law%'
  LIMIT 5
`);
console.log('Sample matching rows:');
r1.rows.forEach(r => {
  console.log({
    id: r.id,
    chapter_id: r.chapter_id,
    chapter: r.chapter,
    topic: r.topic,
    text: r.question_text.substring(0, 70)
  });
});

process.exit(0);

