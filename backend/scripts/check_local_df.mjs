import { pool, query } from '../src/config/db.js';

async function check() {
  const res = await query(`
    SELECT DISTINCT chapter, count(*) 
    FROM question_bank 
    WHERE chapter ILIKE '%d-%' OR chapter ILIKE '%f-%' OR chapter ILIKE '%d and f%' OR chapter ILIKE '%lanthan%'
    GROUP BY chapter
  `);
  console.log('Matching chapters in local question_bank:', res.rows);

  const sample = await query(`
    SELECT id, question_text, chapter, topic 
    FROM question_bank 
    WHERE question_text ILIKE '%lanthanoid%' OR question_text ILIKE '%lanthanide%' OR question_text ILIKE '%actinoid%'
    LIMIT 10
  `);
  console.log('Sample questions with lanthanoid/lanthanide:', sample.rows);

  await pool.end();
  process.exit(0);
}

check().catch(console.error);
