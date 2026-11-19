import { query } from '../src/config/db.js';

async function main() {
  const r = await query(`
    SELECT id, question_text, options, image_url
    FROM question_bank
    WHERE chapter = 'Laws of Motion' AND UPPER(COALESCE(exam_type, 'NEET')) = 'JEE'
    ORDER BY id ASC
    LIMIT 25;
  `);
  console.log(`Found ${r.rows.length} rows`);
  r.rows.forEach((row, i) => {
    console.log(`[#${i+1}] ID: ${row.id} | Img: ${row.image_url}`);
    console.log(`  Text: ${row.question_text?.slice(0, 100)}`);
    console.log(`  Options:`, row.options);
  });
  process.exit(0);
}

main().catch(console.error);
