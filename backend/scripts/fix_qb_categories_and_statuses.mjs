import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const NEON_DB = process.env.DATABASE_URL;
const pool = new pg.Pool({
  connectionString: NEON_DB,
  ssl: { rejectUnauthorized: false }
});

async function connectWithRetry(maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const client = await pool.connect();
      return client;
    } catch (err) {
      if ((err.code === 'ENOTFOUND' || err.code === 'ECONNRESET' || err.message?.includes('ENOTFOUND')) && i < maxRetries - 1) {
        console.warn(`[DB connect DNS error: ${err.message}] Retrying in 2s... (attempt ${i + 1}/${maxRetries})`);
        await new Promise(r => setTimeout(r, 2000));
      } else {
        throw err;
      }
    }
  }
}

async function fixDatabase() {
  const client = await connectWithRetry();
  try {
    console.log('--- STARTING DATABASE CATEGORY AND STATUS NORMALIZATION ---');

    // 1. Standardize Categories
    const mathUpdate = await client.query("UPDATE question_bank SET category = 'Mathematics' WHERE LOWER(category) = 'mathematics' RETURNING id");
    console.log(`Updated ${mathUpdate.rowCount} rows to category = 'Mathematics'`);

    const physUpdate = await client.query("UPDATE question_bank SET category = 'Physics' WHERE LOWER(category) = 'physics' AND category != 'Physics' RETURNING id");
    console.log(`Updated ${physUpdate.rowCount} rows to category = 'Physics'`);

    const zooUpdate = await client.query("UPDATE question_bank SET category = 'Zoology' WHERE LOWER(category) = 'zoology' AND category != 'Zoology' RETURNING id");
    console.log(`Updated ${zooUpdate.rowCount} rows to category = 'Zoology'`);

    const botUpdate = await client.query("UPDATE question_bank SET category = 'Botany' WHERE LOWER(category) = 'botany' AND category != 'Botany' RETURNING id");
    console.log(`Updated ${botUpdate.rowCount} rows to category = 'Botany'`);

    const chemUpdate = await client.query("UPDATE question_bank SET category = 'Chemistry' WHERE LOWER(category) = 'chemistry' AND category != 'Chemistry' RETURNING id");
    console.log(`Updated ${chemUpdate.rowCount} rows to category = 'Chemistry'`);

    // 2. Standardize Status: change 'approved' to 'available'
    const statusUpdate = await client.query("UPDATE question_bank SET status = 'available' WHERE status = 'approved' RETURNING id");
    console.log(`Updated ${statusUpdate.rowCount} rows from status = 'approved' to 'available'`);

    // 3. Verify Categories and Statuses
    const catCheck = await client.query(`
      SELECT category, status, COUNT(*)::int as count 
      FROM question_bank 
      GROUP BY category, status 
      ORDER BY category, status
    `);
    console.log('\n--- VERIFICATION: All Categories and Statuses in question_bank ---');
    console.table(catCheck.rows);

  } finally {
    client.release();
    await pool.end();
  }
}

fixDatabase().catch(console.error);

