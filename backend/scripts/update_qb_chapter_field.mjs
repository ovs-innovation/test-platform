import { query } from '../src/config/db.js';

async function run() {
  const res = await query(`
    UPDATE question_bank 
    SET chapter = 'Electromagnetic Induction', category = 'Physics', topic = 'Electromagnetic Induction'
    WHERE chapter_id = 144 OR chapter ILIKE '%electromagnetic induction%'
    RETURNING id, chapter, category, topic
  `);
  console.log(`Updated ${res.rowCount} rows in Neon DB to chapter='Electromagnetic Induction', category='Physics'`);
  process.exit(0);
}

run().catch(console.error);
