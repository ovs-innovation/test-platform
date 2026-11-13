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

async function check() {
  await client.connect();
  const res = await client.query("SELECT id, name, subject_id FROM chapters WHERE subject_id = 13 ORDER BY id");
  console.log('Neon DB Zoology Chapters:', JSON.stringify(res.rows, null, 2));
  await client.end();
}
check().catch(console.error);

