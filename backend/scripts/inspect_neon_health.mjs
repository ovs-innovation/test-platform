import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  await client.connect();
  const qCount = await client.query('SELECT chapter_id, count(*) FROM questions WHERE chapter_id IN (81) GROUP BY chapter_id');
  console.log('Questions in chapter 81:', qCount.rows);

  // Check if any chapter named 'Human Health%' exists
  const chs = await client.query("SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%Human Health%'");
  console.log('All chapters like Human Health:', chs.rows);

  await client.end();
}
main().catch(console.error);

