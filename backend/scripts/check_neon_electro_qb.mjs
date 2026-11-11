import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const res = await pool.query("SELECT count(*) FROM question_bank WHERE category = 'PYQ' AND (chapter ILIKE '%electrochem%' OR chapter_id = 126)");
  console.log('Neon question_bank existing Electrochemistry PYQs:', res.rows[0].count);
  await pool.end();
}

main().catch(console.error);
