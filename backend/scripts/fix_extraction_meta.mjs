import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function main() {
  const res = await pool.query(`
    UPDATE questions 
    SET extraction_meta = jsonb_set(
      COALESCE(extraction_meta, '{}'::jsonb),
      '{hasAnswerKey}',
      'true'::jsonb,
      true
    )
    WHERE assessment_id IN (35, 235)
  `);
  console.log("Updated extraction_meta for rows:", res.rowCount);

  // Check Q13-16, Q40
  const check = await pool.query(`
    SELECT position, correct_index, extraction_meta->>'hasAnswerKey' as has_key 
    FROM questions 
    WHERE assessment_id = 35 AND position IN (13, 14, 15, 16, 40)
  `);
  console.log("Verified sample:", check.rows);

  await pool.end();
}

main().catch(console.error);
