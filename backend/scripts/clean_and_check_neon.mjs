import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function run() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const chem = await pool.query("SELECT id FROM subjects WHERE name ILIKE 'Chemistry'");
  const chemId = chem.rows[0].id;

  // Count questions in 'The d- and f-Block Elements'
  const count = await pool.query("SELECT count(id) FROM question_bank WHERE chapter = 'The d- and f-Block Elements'");
  console.log('Current count in Neon DB for The d- and f-Block Elements:', count.rows[0].count);

  // Clean them out so we do a fresh, 100% correct import
  const del = await pool.query("DELETE FROM question_bank WHERE chapter = 'The d- and f-Block Elements'");
  console.log(`Deleted ${del.rowCount} rows to ensure clean state.`);

  // Ensure dedicated chapter in Neon DB
  let ch = await pool.query("SELECT id, name FROM chapters WHERE subject_id = $1 AND name = 'The d- and f-Block Elements'", [chemId]);
  let chapId;
  if (ch.rows.length === 0) {
    const ins = await pool.query("INSERT INTO chapters (subject_id, name) VALUES ($1, 'The d- and f-Block Elements') RETURNING id, name", [chemId]);
    chapId = ins.rows[0].id;
    console.log('Created dedicated chapter in Neon DB:', ins.rows[0]);
  } else {
    chapId = ch.rows[0].id;
    console.log('Dedicated chapter already exists in Neon DB:', ch.rows[0]);
  }

  await pool.end();
}

run().catch(console.error);
