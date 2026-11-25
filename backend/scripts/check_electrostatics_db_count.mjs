import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const countRes = await pool.query(
    "SELECT count(*) as total FROM question_bank WHERE exam_type = 'JEE' AND chapter = 'Electrostatics'"
  );
  console.log('Current Electrostatics question count in Neon DB:', countRes.rows[0]);
  await pool.end();
}

main().catch(console.error);
