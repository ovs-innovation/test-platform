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

async function setupLocal() {
  const client = await pool.connect();
  try {
    const subRes = await client.query("SELECT id FROM subjects WHERE LOWER(name) = 'physics'");
    const localSubjectId = subRes.rows[0].id;

    // Check if chapter 'Rotational Motion' exists
    let chapRes = await client.query(
      "SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(TRIM(name)) = 'rotational motion'",
      [localSubjectId]
    );

    let localChapterId;
    if (chapRes.rows.length > 0) {
      localChapterId = chapRes.rows[0].id;
    } else {
      const insRes = await client.query(
        "INSERT INTO chapters (name, subject_id, position, created_at) VALUES ('Rotational Motion', $1, (SELECT COALESCE(MAX(position), 0) + 1 FROM chapters WHERE subject_id = $1), NOW()) RETURNING id",
        [localSubjectId]
      );
      localChapterId = insRes.rows[0].id;
    }

    console.log(`Local Chapter ID for 'Rotational Motion': ${localChapterId}`);

    // Delete existing PYQ questions for rotational motion variants
    const delRes = await client.query(
      `DELETE FROM question_bank WHERE category = 'PYQ' AND (
        chapter_id = $1 OR 
        LOWER(chapter) IN ('rotational motion', 'rotational mechanics', 'system of particles and rotational motion')
      )`,
      [localChapterId]
    );
    console.log(`Cleaned up ${delRes.rowCount} previous PYQ questions in Local DB.`);
  } finally {
    client.release();
    await pool.end();
  }
}

setupLocal().catch(console.error);

