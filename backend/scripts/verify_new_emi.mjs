import { query } from '../src/config/db.js';
import { delCache } from '../src/config/redis.js';

async function verify() {
  await delCache('cache:qb:questions:Physics').catch(() => {});
  await delCache('cache:qb:questions:all').catch(() => {});

  const emiRes = await query(`
    SELECT count(id) as count 
    FROM question_bank 
    WHERE (chapter_id = 144 OR chapter ILIKE '%electromagnetic induction%') 
      AND category = 'Physics'
  `);
  console.log('Total EMI questions in Neon DB (category=Physics):', emiRes.rows[0].count);

  const totalPhys = await query(`SELECT count(id) as count FROM question_bank WHERE category = 'Physics'`);
  console.log('Total Physics questions in Neon DB:', totalPhys.rows[0].count);

  process.exit(0);
}

verify().catch(console.error);
