import { query } from '../src/config/db.js';

async function main() {
  const r = await query(`
    SELECT id, chapter, exam_type, category, question_text, image_url 
    FROM question_bank 
    WHERE question_text ILIKE '%cylindrical vessel%' 
       OR question_text ILIKE '%pistons%'
       OR question_text ILIKE '%open water tank%'
       OR question_text ILIKE '%non-mixing%'
    LIMIT 20
  `);
  console.log(`Found ${r.rows.length} rows`);
  for (const row of r.rows) {
    console.log(`ID: ${row.id} | Ch: ${row.chapter} | Exam: ${row.exam_type} | Img: ${row.image_url}`);
    console.log(`  Text: ${row.question_text.slice(0, 120)}`);
  }
  process.exit(0);
}

main().catch(console.error);
