import { pool } from '../src/config/db.js';

async function verify() {
  const r = await pool.query(`
    SELECT id, category, subject, chapter, question_text, options, correct_index, marks, difficulty, image_url
    FROM question_bank
    WHERE chapter = 'Motion in straight line'
    ORDER BY id ASC
  `);

  console.log('Total questions in DB for Motion in straight line:', r.rows.length);
  const withImages = r.rows.filter(row => row.image_url);
  console.log('Questions with diagrams in DB:', withImages.length);

  console.log('Sample question 1:', {
    id: r.rows[0]?.id,
    text: r.rows[0]?.question_text?.slice(0, 100),
    options: r.rows[0]?.options,
    correct: r.rows[0]?.correct_index,
    image: r.rows[0]?.image_url
  });

  console.log('Sample diagram question (Q5):', {
    id: r.rows[4]?.id,
    text: r.rows[4]?.question_text?.slice(0, 100),
    image: r.rows[4]?.image_url,
    options: r.rows[4]?.options,
    correct: r.rows[4]?.correct_index
  });

  console.log('Sample Q86 (diagram):', {
    id: r.rows[85]?.id,
    text: r.rows[85]?.question_text?.slice(0, 100),
    image: r.rows[85]?.image_url,
    options: r.rows[85]?.options,
    correct: r.rows[85]?.correct_index
  });

  console.log('Sample Q88 (last):', {
    id: r.rows[87]?.id,
    text: r.rows[87]?.question_text?.slice(0, 100),
    image: r.rows[87]?.image_url,
    options: r.rows[87]?.options,
    correct: r.rows[87]?.correct_index
  });

  await pool.end();
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
