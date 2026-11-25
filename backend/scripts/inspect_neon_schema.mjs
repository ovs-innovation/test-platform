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
  try {
    const colRes = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'questions'
    `);
    console.log('Columns in questions table:', colRes.rows);

    const qCount = await client.query('SELECT count(*) FROM questions WHERE chapter_id = 204');
    console.log('Questions in chapter 204:', qCount.rows[0].count);

    const qSample = await client.query('SELECT * FROM questions WHERE chapter_id = 204 LIMIT 2');
    console.log('Sample question in chapter 204:', qSample.rows);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
