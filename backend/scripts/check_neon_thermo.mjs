import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const client = await pool.connect();
  const resSubj = await client.query("SELECT id, name FROM subjects WHERE name ILIKE '%chem%'");
  console.log('Neon Chemistry Subjects:', resSubj.rows);

  const resChap = await client.query("SELECT id, subject_id, name FROM chapters WHERE name ILIKE '%thermo%'");
  console.log('Neon Thermo Chapters:', resChap.rows);

  const resQ = await client.query("SELECT count(*) FROM question_bank WHERE chapter_id = 22 AND exam_type = 'JEE'");
  console.log('Neon JEE Thermo Questions count in question_bank:', resQ.rows[0].count);

  client.release();
  await pool.end();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
