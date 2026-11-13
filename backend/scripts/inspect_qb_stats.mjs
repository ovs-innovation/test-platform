import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function benchmark() {
  const t0 = Date.now();
  const res = await pool.query(`
    SELECT 
      qb.*,
      COALESCE(c.name, NULLIF(qb.chapter, '')) AS chapter,
      c.name AS chapter_name, 
      s.name AS subject_name,
      '[]'::json AS used_in_tests,
      0 AS test_count,
      COALESCE(qb.status, 'available') AS computed_status
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    LEFT JOIN subjects s ON qb.subject_id = s.id
    WHERE LOWER(qb.category) = 'pyq' AND (LOWER(qb.subject) = 'physics' OR (qb.subject IS NULL AND LOWER(s.name) = 'physics'))
    ORDER BY qb.id ASC
  `);
  console.log(`Direct query took: ${Date.now() - t0}ms, returned ${res.rows.length} rows`);
  await pool.end();
}

benchmark().catch(console.error);
