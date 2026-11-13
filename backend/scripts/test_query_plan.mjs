import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_pnKv5TdUQ7fg@ep-weathered-heart-aqvw9ylo-pooler.c-8.us-east-1.aws.neon.tech/neondb?sslmode=require'
});

async function main() {
  const start = Date.now();
  console.log('Testing query on Neon DB...');
  const res = await pool.query(`
    EXPLAIN ANALYZE
    SELECT 
      qb.id,
      qb.category,
      qb.subject
    FROM question_bank qb
    LEFT JOIN chapters c ON qb.chapter_id = c.id
    LEFT JOIN subjects s ON qb.subject_id = s.id
    LEFT JOIN (
      SELECT 
        q.bank_question_id,
        COUNT(DISTINCT q.assessment_id)::int AS test_count,
        json_agg(
          DISTINCT jsonb_build_object(
            'assessment_id', q.assessment_id,
            'test_name', COALESCE(t.test_name, a.title, 'Test #' || q.assessment_id)
          )
        ) AS used_in_tests
      FROM questions q
      LEFT JOIN assessments a ON q.assessment_id = a.id
      LEFT JOIN tests t ON a.id = t.id
      WHERE q.bank_question_id IS NOT NULL
      GROUP BY q.bank_question_id
    ) tu ON tu.bank_question_id = qb.id
    WHERE LOWER(qb.category) = 'pyq'
      AND (LOWER(qb.subject) = 'physics' OR (qb.subject IS NULL AND LOWER(s.name) = 'physics'))
  `);
  console.log(`Execution time: ${Date.now() - start}ms`);
  console.log(res.rows.map(r => r['QUERY PLAN']).join('\n'));
  await pool.end();
}

main().catch(console.error);

