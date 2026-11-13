import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function init() {
  const existing = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = 15 AND name ILIKE 'Molecular Basis of Inheritance'"
  );
  if (existing.rows.length > 0) {
    console.log('Chapter already exists in Neon DB:', existing.rows[0]);
    await pool.end();
    return existing.rows[0].id;
  }

  const res = await pool.query(
    "INSERT INTO chapters (subject_id, name, position) VALUES (15, 'Molecular Basis of Inheritance', 25) RETURNING id, name"
  );
  console.log('Created chapter in Neon DB:', res.rows[0]);
  await pool.end();
  return res.rows[0].id;
}

init().catch(console.error);

