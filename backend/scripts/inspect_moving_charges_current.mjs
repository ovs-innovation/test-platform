import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function inspect() {
  const client = new pg.Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();

  const chs = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%moving%' OR name ILIKE '%magnetism%'");
  console.log('Local DB Chapters:', chs.rows);

  const sub = await client.query("SELECT id, name FROM subjects WHERE name ILIKE '%physics%'");
  console.log('Local DB Subjects:', sub.rows);

  if (chs.rows.length > 0) {
    const qCount = await client.query(
      "SELECT count(*) FROM questions WHERE chapter_id = $1",
      [chs.rows.find(c => c.name.toLowerCase().includes('moving'))?.id]
    );
    console.log('Current questions count for Moving Charges in local DB:', qCount.rows[0].count);
  }

  await client.end();
}

inspect().catch(console.error);
