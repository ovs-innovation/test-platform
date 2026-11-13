import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_pnKv5TdUQ7fg@ep-weathered-heart-aqvw9ylo-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function main() {
  const chRes = await pool.query(`
    SELECT c.id, c.name, c.subject_id, s.name as subject_name
    FROM chapters c
    JOIN subjects s ON c.subject_id = s.id
    WHERE s.name ILIKE '%zoology%' OR c.name ILIKE '%biotechnolog%'
    ORDER BY c.subject_id, c.name
  `);
  console.log('Chapters found:');
  console.table(chRes.rows);
  await pool.end();
}

main().catch(console.error);
