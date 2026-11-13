import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const existing = await pool.query("SELECT * FROM chapters WHERE subject_id = 13 AND (name ILIKE '%Human Health%')");
  console.log('Existing Human Health chapters in Neon DB for subject_id = 13:', existing.rows);

  const exact = existing.rows.find(c => c.name.toLowerCase().trim() === 'human health and diseases');
  if (exact) {
    console.log('Found exact "Human Health and Diseases" chapter:', exact);
  } else {
    console.log('Inserting "Human Health and Diseases" into Neon DB chapters table for subject_id = 13...');
    const insertRes = await pool.query("INSERT INTO chapters (subject_id, name) VALUES (13, 'Human Health and Diseases') RETURNING *");
    console.log('Inserted chapter:', insertRes.rows[0]);
  }

  await pool.end();
}

main().catch(console.error);

