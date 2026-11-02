import { pool } from '../src/config/db.js';

async function verify() {
  const ch = await pool.query("SELECT id, name, subject_id, position FROM chapters WHERE id = 23");
  console.log('Chapter 23 Info:', ch.rows[0]);

  const countRes = await pool.query(
    "SELECT count(*)::int as total, count(image_url)::int as with_diagram FROM question_bank WHERE chapter_id = 23"
  );
  console.log('Chapter 23 Total in DB:', countRes.rows[0]);

  const sample = await pool.query(
    "SELECT id, topic, question_text, image_url FROM question_bank WHERE chapter_id = 23 ORDER BY id ASC LIMIT 5"
  );
  console.log('Sample Questions:');
  console.table(sample.rows.map(r => ({ id: r.id, topic: r.topic, image: r.image_url, text: r.question_text.slice(0, 45) + '...' })));

  const diagramQs = await pool.query(
    "SELECT id, topic, question_text, image_url FROM question_bank WHERE chapter_id = 23 AND image_url IS NOT NULL"
  );
  console.log('Questions with diagrams:');
  console.table(diagramQs.rows);

  await pool.end();
}

verify().catch(console.error);
