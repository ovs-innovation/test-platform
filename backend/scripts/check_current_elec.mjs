import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function check() {
  const chapRes = await pool.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%Current Electricity%'");
  console.log('Chapters found:', chapRes.rows);

  if (chapRes.rows.length > 0) {
    for (const ch of chapRes.rows) {
      const qRes = await pool.query("SELECT id, question_text FROM question_bank WHERE chapter_id = $1 ORDER BY id ASC", [ch.id]);
      console.log(`Chapter ${ch.name} (ID: ${ch.id}) has ${qRes.rows.length} questions.`);
      if (qRes.rows.length > 0) {
        console.log('First 3:', qRes.rows.slice(0, 3));
        console.log('Last 3:', qRes.rows.slice(-3));
      }
    }
  }
  await pool.end();
}

check().catch(console.error);
