import { resolveStandardChapter } from '../src/utils/chapterResolver.js';
import { query } from '../src/config/db.js';

async function test() {
  console.log('Testing resolveStandardChapter:');
  console.log('1. EMI exact:', resolveStandardChapter('Physics', 'Electromagnetic Induction', '', 'Electromagnetic Induction'));
  console.log('2. Moving Charges:', resolveStandardChapter('Physics', 'Moving Charges and Magnetism', '', 'Moving Charges and Magnetism'));
  console.log('3. Magnetism & Matter:', resolveStandardChapter('Physics', 'Magnetism and Matter', '', 'Magnetism and Matter'));
  console.log('4. Subtopic Biot-Savart:', resolveStandardChapter('Physics', 'Biot-Savart Law for Finite Straight Wire Segments', 'Calculate magnetic field', 'Moving Charges and Magnetism'));
  console.log('5. Subtopic Faraday:', resolveStandardChapter('Physics', "Faraday's Law and Induced EMF", 'A coil of wire in magnetic field', 'Electromagnetic Induction'));

  // Test from DB with category = 'Physics'
  const res = await query(`
    SELECT qb.id, qb.question_text, qb.topic, qb.chapter, c.name as chapter_name, s.name as subject_name
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    LEFT JOIN subjects s ON qb.subject_id = s.id
    WHERE qb.category = 'Physics' AND (c.name = 'Electromagnetic Induction' OR qb.chapter = 'Electromagnetic Induction')
    LIMIT 5
  `);
  console.log(`Found ${res.rowCount} sample EMI questions from DB:`);
  for (const row of res.rows) {
    const resolved = resolveStandardChapter(
      'Physics',
      row.topic || '',
      row.question_text || '',
      row.chapter || row.chapter_name || ''
    );
    console.log(`ID ${row.id}: topic="${row.topic}", rawChap="${row.chapter}", resolved="${resolved}"`);
  }

  // Count total EMI questions in DB with category='Physics'
  const countRes = await query(`
    SELECT count(*) 
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    WHERE qb.category = 'Physics' AND (c.name = 'Electromagnetic Induction' OR qb.chapter = 'Electromagnetic Induction')
  `);
  console.log(`Total EMI questions with category='Physics' in Neon DB: ${countRes.rows[0].count}`);

  process.exit(0);
}

test().catch(console.error);
