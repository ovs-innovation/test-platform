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
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_name LIKE '%test%' OR table_name LIKE '%batch%' OR table_name LIKE '%assign%'
      ORDER BY table_name
    `);
    console.log('Matching tables:');
    console.table(tables.rows);

    for (const t of ['test_assignments', 'batches', 'test_series', 'test_series_tests']) {
      const cols = await client.query(`
        SELECT column_name, data_type 
        FROM information_schema.columns 
        WHERE table_name = '${t}'
        ORDER BY ordinal_position
      `);
      console.log(`\nColumns in ${t}:`);
      console.table(cols.rows);
    }
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
