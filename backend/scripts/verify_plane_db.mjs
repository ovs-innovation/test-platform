import { redisClient } from '../src/config/redis.js';
import { pool } from '../src/config/db.js';

async function verify() {
  if (redisClient && redisClient.isOpen) {
    const keys = await redisClient.keys('cache:qb*');
    console.log('Redis QB keys found:', keys);
    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log('Deleted Redis QB keys:', keys);
    }
  }

  // Check Physics chapters in DB
  const catRes = await pool.query(`
    SELECT c.id, c.name as chapter_name, s.name as subject_name, count(q.id) as question_count
    FROM chapters c
    JOIN subjects s ON c.subject_id = s.id
    LEFT JOIN question_bank q ON q.chapter_id = c.id
    WHERE s.name = 'Physics'
    GROUP BY c.id, c.name, s.name
    ORDER BY c.position ASC, c.name ASC
  `);
  console.log('Physics Chapters in DB:');
  console.table(catRes.rows);

  // Check questions with diagrams in chapter 135
  const diagRes = await pool.query(`
    SELECT id, substring(question_text, 1, 60) as question_snippet, image_url 
    FROM question_bank 
    WHERE chapter_id = 135 AND image_url IS NOT NULL
    ORDER BY id ASC
  `);
  console.log(`Questions with diagrams in 'motion in a plane' (chapter 135): ${diagRes.rows.length}`);
  console.table(diagRes.rows);

  // Check total Physics questions in question_bank
  const totalRes = await pool.query(`
    SELECT count(*) as total_physics_questions
    FROM question_bank
    WHERE category = 'Physics' OR subject_id = 11
  `);
  console.log('Total Physics questions in DB:', totalRes.rows[0].total_physics_questions);
}

verify().then(async () => {
  await pool.end();
  if (redisClient && redisClient.isOpen) await redisClient.quit();
  process.exit(0);
}).catch(err => {
  console.error('Verify error:', err);
  process.exit(1);
});
