import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function checkIndexes() {
  const res = await pool.query(`
    SELECT indexname, indexdef 
    FROM pg_indexes 
    WHERE tablename = 'question_bank';
  `);
  console.log('Indexes on question_bank:', res.rows);
  await pool.end();
}

checkIndexes().catch(console.error);

