import { query } from '../src/config/db.js';

async function main() {
  const r = await query(`
    SELECT id, chapter, category, exam_type, question_text, options, image_url
    FROM question_bank
    WHERE chapter ILIKE '%law%' OR chapter ILIKE '%motion%'
    ORDER BY id ASC
    LIMIT 20;
  `);
  console.log(`Found ${r.rows.length} rows`);
  for (const row of r.rows) {
    console.log(`ID: ${row.id} | Ch: ${row.chapter} | Exam: ${row.exam_type} | Cat: ${row.category}`);
    console.log(`Text: ${row.question_text?.slice(0, 80)}`);
    console.log(`Options:`, row.options);
    console.log(`Img: ${row.image_url}`);
    console.log('---');
  }
  process.exit(0);
}

main().catch(console.error);
