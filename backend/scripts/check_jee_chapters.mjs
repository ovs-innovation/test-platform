import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve('backend/.env') });

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

async function check() {
  const client = await pool.connect();
  try {
    const totalRes = await client.query("SELECT count(*) FROM question_bank WHERE exam_type = 'JEE' AND LOWER(category) = 'physics'");
    console.log('Total JEE Physics questions in DB:', totalRes.rows[0].count);

    const chRes = await client.query("SELECT DISTINCT chapter, count(*) as cnt FROM question_bank WHERE exam_type = 'JEE' AND LOWER(category) = 'physics' GROUP BY chapter ORDER BY chapter");
    console.log('Total chapters in DB:', chRes.rows.length);
    chRes.rows.forEach(r => console.log(' - ' + r.chapter + ': ' + r.cnt));

    const dbNameRes = await client.query("SELECT current_database(), current_user, inet_server_addr()");
    console.log('DB Info:', dbNameRes.rows[0]);
  } finally {
    client.release();
    await pool.end();
  }
}
check().catch(console.error);
