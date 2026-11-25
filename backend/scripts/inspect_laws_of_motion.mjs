import { query } from '../src/config/db.js';

async function main() {
  const r = await query(`
    SELECT id, chapter, category, exam_type, question_text, options, image_url
    FROM question_bank
    WHERE exam_type = 'JEE' AND category = 'Physics' AND chapter ILIKE '%laws of motion%'
    ORDER BY id ASC;
  `);
  console.log(`Found ${r.rows.length} rows in Laws of Motion`);
  let dummyCount = 0;
  for (const row of r.rows) {
    const optsStr = JSON.stringify(row.options);
    const isDummy = optsStr.includes('Option (A)') || optsStr.includes('Option (B)');
    if (isDummy) dummyCount++;
  }
  console.log(`Dummy options count in Laws of Motion: ${dummyCount}`);
  if (r.rows.length > 0) {
    console.log('Sample rows:');
    for (const row of r.rows.slice(0, 5)) {
      console.log(`ID: ${row.id} | Ch: ${row.chapter}`);
      console.log(`Text: ${row.question_text?.slice(0, 80)}`);
      console.log(`Options:`, row.options);
      console.log(`Img: ${row.image_url}`);
      console.log('---');
    }
  }

  // Also check ID 26919, 26920
  const specific = await query(`
    SELECT id, chapter, category, exam_type, question_text, options, image_url
    FROM question_bank
    WHERE id IN (26919, 26920, 26928, 26929);
  `);
  console.log(`Specific IDs (26919, 26920, 26928, 26929) found in question_bank: ${specific.rows.length}`);
  for (const row of specific.rows) {
    console.log(`ID: ${row.id} | Ch: ${row.chapter} | Exam: ${row.exam_type}`);
    console.log(`Text: ${row.question_text?.slice(0, 80)}`);
    console.log(`Options:`, row.options);
    console.log(`Img: ${row.image_url}`);
  }

  process.exit(0);
}

main().catch(console.error);

