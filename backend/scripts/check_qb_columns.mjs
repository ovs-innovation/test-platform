import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_pnKv5TdUQ7fg@ep-weathered-heart-aqvw9ylo-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function main() {
  const res = await pool.query(`
    SELECT column_name, data_type 
    FROM information_schema.columns 
    WHERE table_name = 'question_bank'
    ORDER BY ordinal_position
  `);
  console.log('Columns of question_bank:');
  console.table(res.rows);
  await pool.end();
}

main().catch(console.error);

