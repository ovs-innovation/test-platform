import { query } from '../src/config/db.js';

async function main() {
  const r = await query(`
    SELECT chapter, count(*)::int as count, min(id) as min_id, max(id) as max_id
    FROM question_bank
    WHERE UPPER(COALESCE(exam_type, 'NEET')) = 'JEE' AND LOWER(category) = 'physics'
    GROUP BY chapter
    ORDER BY chapter;
  `);
  console.log('JEE Physics chapters in DB:', r.rows);

  const sampleLom = await query(`
    SELECT id, question_text, options, image_url
    FROM question_bank
    WHERE UPPER(COALESCE(exam_type, 'NEET')) = 'JEE' 
      AND LOWER(category) = 'physics'
      AND (chapter ILIKE '%law%' OR chapter ILIKE '%motion%')
    ORDER BY id ASC
    LIMIT 5;
  `);
  console.log('Sample LOM questions in JEE Physics:', sampleLom.rows);
  process.exit(0);
}

main().catch(console.error);
