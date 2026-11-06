import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: 'backend/.env' });
const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  try {
    const res = await pool.query(`
      SELECT 
        qb.chapter_id,
        c.name AS chapter_name,
        qb.chapter AS qb_chapter,
        count(*) as count
      FROM question_bank qb
      LEFT JOIN chapters c ON qb.chapter_id = c.id
      WHERE LOWER(qb.category) = 'mathematics'
      GROUP BY qb.chapter_id, c.name, qb.chapter
      ORDER BY count DESC
    `);
    console.table(res.rows);
  } catch (err) {
    console.error('Error:', err);
  } finally {
    await pool.end();
  }
}
check();
