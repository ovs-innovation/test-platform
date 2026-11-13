import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function main() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const client = await pool.connect();
  try {
    const q106 = await client.query('SELECT id, chapter_id, chapter, question_text FROM question_bank WHERE chapter_id = 106 LIMIT 5');
    console.log('Sample questions in Neon DB with chapter_id = 106:');
    q106.rows.forEach(r => {
      console.log(`[id:${r.id}] chapter_id:${r.chapter_id} chapter:"${r.chapter}" text: ${r.question_text.slice(0, 70)}...`);
    });

    const qElec = await client.query("SELECT id, chapter_id, chapter, question_text FROM question_bank WHERE chapter ILIKE '%electrostatic%' OR chapter_id = 198 LIMIT 5");
    console.log('\nSample questions in Neon DB for Electrostatics:');
    qElec.rows.forEach(r => {
      console.log(`[id:${r.id}] chapter_id:${r.chapter_id} chapter:"${r.chapter}" text: ${r.question_text.slice(0, 70)}...`);
    });
  } finally {
    client.release();
    await pool.end();
  }
}
main().catch(console.error);

