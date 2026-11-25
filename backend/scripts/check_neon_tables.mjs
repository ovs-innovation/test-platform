import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const client = await pool.connect();
  try {
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
    console.log('Tables in public schema:', tables.rows.map(r => r.table_name));

    if (tables.rows.some(r => r.table_name === 'question_bank')) {
      const qbCount = await client.query('SELECT count(*) FROM question_bank');
      console.log('Count in question_bank:', qbCount.rows[0].count);
      const qbSample = await client.query('SELECT * FROM question_bank LIMIT 1');
      console.log('Sample question_bank row keys:', Object.keys(qbSample.rows[0] || {}));
    }
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
