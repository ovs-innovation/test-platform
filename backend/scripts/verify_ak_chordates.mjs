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
      "SELECT id, name, subject_id, position FROM chapters WHERE name = 'Animal kingdom and Chordates'"
    );
    console.log("Chapter in DB:", chapterRes.rows);
    const chapterId = chapterRes.rows[0].id;

    const countRes = await client.query(
      "SELECT count(*) FROM question_bank WHERE chapter_id = $1",
      [chapterId]
    );
    console.log(`Total questions in question_bank for chapter ${chapterId}:`, countRes.rows[0].count);

    const diagramRes = await client.query(
      "SELECT id, question_text, image_url FROM question_bank WHERE chapter_id = $1 AND image_url != '' ORDER BY id",
      [chapterId]
    );
    console.log(`Questions with diagram (${diagramRes.rows.length}):`);
    diagramRes.rows.forEach(r => {
      console.log(`  - [ID: ${r.id}] ${r.question_text.slice(0, 45)}... => ${r.image_url}`);
    });

    const samplesRes = await client.query(
      "SELECT id, question_text, options, correct_index, solution, image_url FROM question_bank WHERE chapter_id = $1 ORDER BY id LIMIT 3",
      [chapterId]
    );
    console.log("\nSample First 3 Questions:", JSON.stringify(samplesRes.rows, null, 2));

    const lastRes = await client.query(
      "SELECT id, question_text, options, correct_index, solution, image_url FROM question_bank WHERE chapter_id = $1 ORDER BY id DESC LIMIT 1",
      [chapterId]
    );
    console.log("\nLast Question:", JSON.stringify(lastRes.rows, null, 2));
  } finally {
    client.release();
    await pool.end();
  }
}

verify().catch(console.error);

