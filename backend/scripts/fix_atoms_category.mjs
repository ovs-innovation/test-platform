import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function fix() {
  console.log('=== Step 1: Fixing category, chapter, topic in Neon DB ===');
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  const client = await pool.connect();
  try {
    const preRes = await client.query(`
      SELECT count(*) as count, category FROM question_bank WHERE chapter_id = 146 GROUP BY category
    `);
    console.log('Neon DB Before update:', preRes.rows);

    const updateRes = await client.query(`
      UPDATE question_bank
      SET category = 'Physics',
          chapter = 'Atoms',
          topic = 'Atoms'
      WHERE chapter_id = 146
    `);
    console.log(`Updated ${updateRes.rowCount} rows in Neon DB to category='Physics', chapter='Atoms', topic='Atoms'.`);

    const postRes = await client.query(`
      SELECT count(*) as count, category FROM question_bank WHERE chapter_id = 146 GROUP BY category
    `);
    console.log('Neon DB After update:', postRes.rows);
  } finally {
    client.release();
    await pool.end();
  }

  // Clear Redis cache if redis is running
  console.log('\n=== Step 2: Clearing Redis Cache ===');
  try {
    const { delCache } = await import('../src/config/redis.js');
    await delCache('cache:qb:questions:Physics');
    await delCache('cache:qb:questions:all');
    await delCache('cache:qb:categories');
    console.log('Redis caches deleted for Physics question bank.');
  } catch (err) {
    console.log('Redis cache clear note:', err.message);
  }

  // Check live edvedum.com
  console.log('\n=== Step 3: Checking Live edvedum.com ===');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    if (loginRes.ok) {
      const token = (await loginRes.json()).token;
      const qBankRes = await fetch(`${LIVE_API}/question-bank?category=Physics`, {
        headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
      });
      const qBankData = await qBankRes.json();
      const atomsQuestions = (qBankData.questions || []).filter(q => q.chapter_id === 199 || (q.chapter && q.chapter.toLowerCase() === 'atoms'));
      console.log(`Live edvedum count for chapter_id 199 / Atoms: ${atomsQuestions.length}`);

      // Check if any on live need chapter='Atoms' or category='Physics' update
      let updatedLive = 0;
      for (const q of atomsQuestions) {
        if (q.category !== 'Physics' || q.chapter !== 'Atoms') {
          const upRes = await fetch(`${LIVE_API}/question-bank/${q.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
              category: 'Physics',
              chapter: 'Atoms',
              topic: 'Atoms'
            })
          });
          if (upRes.ok) updatedLive++;
        }
      }
      if (updatedLive > 0) {
        console.log(`Updated ${updatedLive} live questions to chapter='Atoms' & category='Physics'`);
      } else {
        console.log('All live questions already have proper category and chapter.');
      }
    }
  } catch (err) {
    console.warn('Live edvedum check note:', err.message);
  }

  // Step 4: Test Localhost:5000 API
  console.log('\n=== Step 4: Testing Localhost:5000 /api/question-bank?category=Physics ===');
  try {
    const localRes = await fetch('http://localhost:5000/api/question-bank?category=Physics&skip_cache=true');
    if (localRes.ok) {
      const localData = await localRes.json();
      const localQuestions = localData.questions || [];
      const atomsLocal = localQuestions.filter(q => (q.chapter && q.chapter.toLowerCase() === 'atoms') || q.chapter_id === 146);
      console.log(`Localhost API total Physics questions: ${localQuestions.length}`);
      console.log(`Localhost API 'Atoms' questions count: ${atomsLocal.length}`);
      if (atomsLocal.length > 0) {
        console.log('Sample question:', {
          id: atomsLocal[0].id,
          chapter: atomsLocal[0].chapter,
          category: atomsLocal[0].category,
          text: atomsLocal[0].question_text.slice(0, 60)
        });
      }
    } else {
      console.log(`Localhost returned status ${localRes.status}`);
    }
  } catch (err) {
    console.log('Localhost test note:', err.message);
  }
}

fix().catch(err => {
  console.error('Fix error:', err);
  process.exit(1);
});
