import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function verify() {
  const client = await pool.connect();
  try {
    const chapterRes = await client.query(
      "SELECT id, name, subject_id, position FROM chapters WHERE name ILIKE 'Animal kingdom and Chordates'"
    );
    console.log('Chapter info:', chapterRes.rows);

    const chapterId = chapterRes.rows[0].id;

    const countRes = await client.query(
      "SELECT question_type, COUNT(*) as count FROM question_bank WHERE chapter_id = $1 GROUP BY question_type",
      [chapterId]
    );
    console.log('Question breakdown by type:', countRes.rows);

    const topicRes = await client.query(
      "SELECT topic, COUNT(*) as count FROM question_bank WHERE chapter_id = $1 GROUP BY topic",
      [chapterId]
    );
    console.log('Question breakdown by topic:', topicRes.rows);

    const diagramRes = await client.query(
      "SELECT id, question_text, image_url FROM question_bank WHERE chapter_id = $1 AND image_url != '' ORDER BY id",
      [chapterId]
    );
    console.log(`Diagram count: ${diagramRes.rows.length}`);
    for (const row of diagramRes.rows) {
      console.log(`  Q id: ${row.id} -> image: ${row.image_url}`);
    }

    const sampleAR = await client.query(
      "SELECT id, question_text, assertion_text, reason_text, correct_index, options FROM question_bank WHERE chapter_id = $1 AND question_type = 'assertion_reason' ORDER BY id LIMIT 3",
      [chapterId]
    );
    console.log('Sample AR questions:', JSON.stringify(sampleAR.rows, null, 2));

  } finally {
    client.release();
    await pool.end();
  }
}

verify().catch(console.error);

