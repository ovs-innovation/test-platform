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

async function check() {
  const client = await pool.connect();
  try {
    const subjects = await client.query("SELECT id, name FROM subjects ORDER BY id");
    console.log("Subjects:", subjects.rows);

    const chapters = await client.query(
      "SELECT id, name, subject_id FROM chapters WHERE subject_id = 2 OR name ILIKE '%animal%' ORDER BY id"
    );
    console.log("Chapters related to Zoology/Animal:", chapters.rows);

    const existingCount = await client.query(
      "SELECT count(*) FROM question_bank WHERE chapter ILIKE '%Animal kingdom%'"
    );
    console.log("Questions in DB matching Animal kingdom:", existingCount.rows[0].count);
  } finally {
    client.release();
    await pool.end();
  }
}

check().catch(console.error);

