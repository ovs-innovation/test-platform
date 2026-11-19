import { query } from '../src/config/db.js';

async function main() {
  const r = await query(`
    SELECT id, chapter, question_text, options
    FROM question_bank
    WHERE UPPER(COALESCE(exam_type, 'NEET')) = 'JEE' AND LOWER(category) = 'physics';
  `);
  console.log(`Checking ${r.rows.length} questions in local DB...`);
  let dummyCount = 0;
  for (const row of r.rows) {
    const opts = typeof row.options === 'string' ? JSON.parse(row.options) : row.options;
    if (Array.isArray(opts)) {
      for (const opt of opts) {
        const txt = typeof opt === 'object' && opt !== null ? opt.text : String(opt);
        if (/^Option\s*\([A-D]\)$/i.test(txt?.trim())) {
          dummyCount++;
          console.warn(`[DUMMY OPTION FOUND] ID: ${row.id}, Ch: ${row.chapter}, Text: ${txt}`);
        }
      }
    }
  }
  console.log(`Dummy options found in local DB: ${dummyCount}`);
  process.exit(0);
}

main().catch(console.error);
