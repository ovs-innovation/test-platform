import { pool } from '../src/config/db.js';

async function check() {
  const client = await pool.connect();
  try {
    const chapters = await client.query(
      "SELECT id, name, subject_id FROM chapters WHERE subject_id = 11 AND (name ILIKE '%thermal%' OR name ILIKE '%matter%') ORDER BY id"
    );
    console.log('Matching Chapters:', chapters.rows);

    const qCount = await client.query(
      "SELECT count(*) FROM question_bank WHERE chapter ILIKE '%thermal%' OR chapter ILIKE '%matter%'"
    );
    console.log('Existing questions in question_bank:', qCount.rows[0]);
  } finally {
    client.release();
    process.exit(0);
  }
}

check().catch(console.error);
