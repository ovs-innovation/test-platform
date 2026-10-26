import { pool } from '../src/config/db.js';

async function check() {
  const client = await pool.connect();
  try {
    const subjects = await client.query("SELECT id, name FROM subjects WHERE name ILIKE '%physics%'");
    console.log('Subjects:', subjects.rows);

    const chapters = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%work%' OR name ILIKE '%energy%' OR subject_id = ANY($1::int[])", [subjects.rows.map(s => s.id)]);
    console.log('Chapters:', chapters.rows);

    const qbSample = await client.query("SELECT id, category, subject, chapter, topic, question_text FROM question_bank WHERE category ILIKE '%physics%' OR subject ILIKE '%physics%' LIMIT 3");
    console.log('QB sample:', qbSample.rows);

    const chaps = await client.query("SELECT id, chapter, question_text FROM question_bank WHERE chapter ILIKE '%work%' OR chapter ILIKE '%energy%'");
    console.log('Existing work questions in question_bank:', chaps.rows.length);
  } finally {
    client.release();
    process.exit(0);
  }
}

check().catch(console.error);
