import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_pnKv5TdUQ7fg@ep-weathered-heart-aqvw9ylo-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function main() {
  const res = await pool.query(`
    SELECT id, question_text, options, correct_option, category, subject, chapter, chapter_id, subject_id, question_type
    FROM question_bank
    WHERE subject_id = 13 AND category = 'PYQ'
    LIMIT 1
  `);
  console.log('Sample Zoology PYQ question in Neon DB:');
  console.log(res.rows[0]);
  await pool.end();
}

main().catch(console.error);

