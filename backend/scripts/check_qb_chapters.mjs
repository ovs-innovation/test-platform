import { query } from '../src/config/db.js';

async function run() {
  const chRes = await query(`SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%induct%' OR name ILIKE '%magnet%' ORDER BY id`);
  console.log('Chapters:', chRes.rows);

  const qbRes = await query(`
    SELECT DISTINCT qb.chapter, c.name as c_name, qb.topic, qb.category, count(*) 
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    WHERE qb.chapter_id IN (SELECT id FROM chapters WHERE name ILIKE '%induct%' OR name ILIKE '%magnet%')
       OR qb.chapter ILIKE '%induct%' 
       OR qb.chapter ILIKE '%magnet%'
       OR qb.topic ILIKE '%induct%'
       OR qb.topic ILIKE '%magnet%'
    GROUP BY qb.chapter, c.name, qb.topic, qb.category
  `);
  console.log('QB sample grouped:');
  console.table(qbRes.rows);
  process.exit(0);
}

run().catch(console.error);
