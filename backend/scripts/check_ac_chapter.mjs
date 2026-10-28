import { query } from '../src/config/db.js';

async function check() {
  const chRes = await query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%alternating%' OR name ILIKE '%ac%' ORDER BY id");
  console.log('Neon DB Alternating Current chapters:');
  console.table(chRes.rows);

  const qbRes = await query(`
    SELECT DISTINCT qb.chapter, c.name as c_name, qb.topic, qb.category, count(qb.id) 
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    WHERE qb.chapter ILIKE '%alternating%' 
       OR c.name ILIKE '%alternating%'
       OR qb.topic ILIKE '%alternating%'
    GROUP BY qb.chapter, c.name, qb.topic, qb.category
  `);
  console.log('QB current rows:');
  console.table(qbRes.rows);
  process.exit(0);
}

check().catch(console.error);
