import pg from 'pg';

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

console.log('=== SUBJECTS ===');
const sRes = await pool.query("SELECT id, name FROM subjects ORDER BY id");
console.log(sRes.rows);

console.log('\n=== CHAPTERS containing health or reproduct ===');
const cRes = await pool.query("SELECT id, subject_id, name FROM chapters WHERE LOWER(name) LIKE '%health%' OR LOWER(name) LIKE '%reproduct%' ORDER BY subject_id, id");
console.log(cRes.rows);

console.log('\n=== QUESTION BANK counts by topic / category / chapter_id for health or reproduct ===');
const qRes = await pool.query(`
  SELECT 
    qb.subject,
    qb.category,
    qb.topic,
    c.name as chapter_name,
    c.subject_id as chapter_subject_id,
    COUNT(*) as total_count
  FROM question_bank qb
  LEFT JOIN chapters c ON c.id = qb.chapter_id
  WHERE LOWER(qb.topic) LIKE '%health%' OR LOWER(qb.topic) LIKE '%reproduct%'
     OR LOWER(qb.category) LIKE '%health%' OR LOWER(qb.category) LIKE '%reproduct%'
     OR LOWER(c.name) LIKE '%health%' OR LOWER(c.name) LIKE '%reproduct%'
  GROUP BY qb.subject, qb.category, qb.topic, c.name, c.subject_id
  ORDER BY total_count DESC
`);
console.log(qRes.rows);

console.log('\n=== QUESTION BANK distinct topics in Zoology / Biology ===');
const topRes = await pool.query(`
  SELECT subject, category, topic, COUNT(*) as c
  FROM question_bank
  WHERE LOWER(subject) IN ('zoology', 'biology') OR LOWER(category) IN ('zoology', 'biology')
  GROUP BY subject, category, topic
  ORDER BY subject, c DESC
`);
console.log(topRes.rows);

await pool.end();

