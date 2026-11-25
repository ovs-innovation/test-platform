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
  const client = await pool.connect();
  try {
    const colRes = await client.query(`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'tests'
      ORDER BY ordinal_position
    `);
    console.log('Columns in tests:');
    console.table(colRes.rows);

    const sampleRes = await client.query(`
      SELECT id, test_name, test_type, class_level, target_class, grade, batch_id
      FROM tests
      LIMIT 10
    `).catch(async () => {
      // If some columns don't exist, select all columns from first 2 rows
      const allCols = await client.query(`SELECT * FROM tests LIMIT 3`);
      return allCols;
    });
    console.log('Sample rows keys:', Object.keys(sampleRes.rows[0] || {}));
    console.log('Sample rows:');
    console.log(sampleRes.rows.slice(0, 3));
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
