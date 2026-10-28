import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });

async function check() {
  const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
  const res = await pool.query(`
    SELECT qb.category, c.name as chapter_name, count(qb.id)
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    GROUP BY qb.category, c.name
    ORDER BY count DESC
    LIMIT 20
  `);
  console.log('Top categories & chapters in question_bank:');
  console.table(res.rows);

  // Check recent chapters added today
  const recent = await pool.query(`
    SELECT qb.category, qb.subject_id, c.name as chapter_name, count(qb.id)
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    WHERE c.name ILIKE '%Magnetism%' OR c.name ILIKE '%Induction%' OR c.name ILIKE '%Current%'
    GROUP BY qb.category, qb.subject_id, c.name
  `);
  console.log('\nRecent Physics chapters:');
  console.table(recent.rows);

  await pool.end();
}

check().catch(console.error);
