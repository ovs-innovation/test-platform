import pg from 'pg';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

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
    const chs = await client.query("SELECT id, name, subject_id FROM chapters WHERE subject_id IN (5, 11) ORDER BY id");
    const chMap = {};
    for (const r of chs.rows) chMap[r.id] = r.name;

    const counts = await client.query(
      "SELECT chapter_id, chapter, count(*)::int as count FROM question_bank WHERE subject_id IN (5, 11) OR category = 'Physics' GROUP BY chapter_id, chapter ORDER BY count DESC"
    );
    console.log('\nquestion_bank counts in Neon DB:');
    for (const r of counts.rows) {
      console.log(`  chapter_id: ${r.chapter_id} (ch_table_name: "${chMap[r.chapter_id]}", qb.chapter: "${r.chapter}"): ${r.count}`);
    }

    const qSample = await client.query(
      "SELECT id, chapter_id, chapter, category, SUBSTRING(question_text, 1, 80) as txt FROM question_bank WHERE question_text ILIKE '%infinitesimally thin tube%' LIMIT 5"
    );
    console.log('\nSample question in Neon DB question_bank:');
    console.log(qSample.rows);

  } finally {
    client.release();
    await pool.end();
  }
}

check().catch(console.error);

