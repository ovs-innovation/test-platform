import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_final_questions.json'), 'utf8'));

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getToken() {
  for (let attempt = 1; attempt <= 5; attempt++) {
    try {
      const res = await fetch(`${LIVE_API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
      });
      if (res.ok) {
        const data = await res.json();
        return data.token || data.accessToken || data.data?.token;
      }
      console.warn(`[Live Login] Attempt ${attempt} failed with status ${res.status}. Retrying in 2s...`);
    } catch (err) {
      console.warn(`[Live Login] Attempt ${attempt} error: ${err.message}. Retrying in 2s...`);
    }
    await sleep(2000);
  }
  throw new Error('Failed to login to Live API after 5 attempts');
}

async function main() {
  console.log(`================================================================`);
  console.log(`  SEED & SYNC: Basics of Organic Chemistry (${questions.length} Questions)`);
  console.log(`================================================================\n`);

  // ----------------------------------------------------
  // 1. LOCAL NEON DB SEEDING
  // ----------------------------------------------------
  console.log('--- 1. Seeding Local Neon Database ---');
  const client = await pool.connect();
  try {
    const localSubjectId = 10; // Chemistry in Local Neon
    const localChapterId = 167; // Chapter ID in Local Neon
    const chapterName = 'Basics of Organic Chemistry';

    // Update chapter name in chapters table
    await client.query(
      "UPDATE chapters SET name = $1 WHERE id = $2",
      [chapterName, localChapterId]
    );
    console.log(`Updated Chapter ID ${localChapterId} name to '${chapterName}' in Local Neon.`);

    // Clean up any previously inserted questions for this chapter in JEE
    const deleteRes = await client.query(`
      DELETE FROM question_bank 
      WHERE (chapter_id = $1 OR LOWER(chapter) = LOWER($2) OR LOWER(chapter) = 'organic chemistry - some basic principles and techniques')
        AND exam_type = 'JEE'
    `, [localChapterId, chapterName]);
    console.log(`Cleaned up ${deleteRes.rowCount} previous JEE questions from Local Neon DB.`);

    let localInserted = 0;
    for (const q of questions) {
      await client.query(`
        INSERT INTO question_bank (
          question_type, question_text, options, correct_index, correct_indices,
          numeric_answer, marks, difficulty, category, status, solution, image_url,
          subject_id, subject, chapter_id, chapter, topic, exam_type, created_at
        ) VALUES (
          $1, $2, $3, $4, $5,
          $6, 4, 'medium', 'PYQ', 'available', $7, $8,
          $9, 'Chemistry', $10, $11, $11, 'JEE', NOW()
        )
      `, [
        q.question_type,
        q.question_text,
        JSON.stringify(q.options || []),
        q.correct_index,
        JSON.stringify(q.correct_indices || []),
        q.numeric_answer,
        q.solution,
        q.image_url || null,
        localSubjectId,
        localChapterId,
        chapterName
      ]);
      localInserted++;
    }
    console.log(`Successfully seeded ${localInserted} / ${questions.length} questions into Local Neon DB.`);

    const countRes = await client.query(
      "SELECT count(1)::int as count FROM question_bank WHERE (chapter_id = $1 OR LOWER(chapter) = LOWER($2)) AND exam_type = 'JEE'",
      [localChapterId, chapterName]
    );
    console.log(`Local Neon DB verified total: ${countRes.rows[0].count} / ${questions.length} questions.`);
  } catch (err) {
    console.error('Error seeding Local Neon DB:', err);
    throw err;
  } finally {
    client.release();
  }

  // ----------------------------------------------------
  // 2. LIVE PRODUCTION SYNC (edvedum.com)
  // ----------------------------------------------------
  console.log('\n--- 2. Syncing to Live Production Server (edvedum.com) ---');
  const token = await getToken();
  const liveSubjectId = 6; // Chemistry on Live API
  const liveChapterId = 249; // Chapter on Live API
  const chapterName = 'Basics of Organic Chemistry';

  // Update live chapter name if possible
  try {
    const updateChapRes = await fetch(`${LIVE_API}/admin/chapters/${liveChapterId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ name: chapterName, subject_id: liveSubjectId })
    });
    console.log(`Live chapter name update status: ${updateChapRes.status}`);
  } catch (err) {
    console.warn('Could not update live chapter name:', err.message);
  }

  // Fetch existing live questions for this chapter
  console.log('Checking existing live questions...');
  let existingLive = [];
  try {
    const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&limit=3000`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      const allLive = data.questions || data.data || [];
      existingLive = allLive.filter(q => 
        Number(q.chapter_id) === Number(liveChapterId) || 
        /basics?\s*of\s*organic|organic chemistry.*basic/i.test(q.chapter || '')
      );
      console.log(`Found ${existingLive.length} existing live questions matching Basics of Organic Chemistry.`);
    }
  } catch (err) {
    console.warn('Could not fetch existing live questions:', err.message);
  }

  // Helper to match questions
  const cleanStr = (s) => (s || '').toLowerCase().replace(/https?:\/\/[^\s\)]+/g, '').replace(/[^a-z0-9]/g, '').slice(0, 70);
  const liveMap = new Map();
  for (const q of existingLive) {
    const k = cleanStr(q.question_text);
    if (k) liveMap.set(k, q);
  }

  let liveInserted = 0;
  let liveUpdated = 0;
  let liveFailed = 0;

  // Sync in batches of 10
  const BATCH_SIZE = 10;
  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);

    await Promise.all(batch.map(async (q) => {
      const payload = {
        subject_id: liveSubjectId,
        chapter_id: liveChapterId,
        subject: 'Chemistry',
        chapter: chapterName,
        topic: chapterName,
        exam_type: 'JEE',
        exam_name: 'JEE Main',
        year: q.year,
        question_type: q.question_type,
        question_text: q.question_text,
        options: q.options || [],
        correct_index: q.correct_index,
        correct_indices: q.correct_indices || [],
        numeric_answer: q.numeric_answer,
        marks: 4,
        difficulty: 'medium',
        category: 'PYQ',
        status: 'available',
        solution: q.solution,
        image_url: q.image_url || ''
      };

      const key = cleanStr(q.question_text);
      const existing = liveMap.get(key);

      let success = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          if (existing) {
            const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(payload)
            });
            if (putRes.ok) {
              liveUpdated++;
              success = true;
              break;
            }
          } else {
            const postRes = await fetch(`${LIVE_API}/question-bank`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(payload)
            });
            if (postRes.ok) {
              liveInserted++;
              success = true;
              break;
            }
          }
        } catch (err) {
          // Retry
        }
        await sleep(1000);
      }

      if (!success) {
        liveFailed++;
        console.warn(`Failed to sync Q${q.question_number} to live!`);
      }
    }));

    const progress = Math.min(i + BATCH_SIZE, questions.length);
    console.log(`Live sync progress: ${progress} / ${questions.length} (Inserted: ${liveInserted}, Updated: ${liveUpdated}, Failed: ${liveFailed})`);
  }

  console.log(`\n=== Live Sync Complete ===`);
  console.log(`Inserted: ${liveInserted}`);
  console.log(`Updated: ${liveUpdated}`);
  console.log(`Failed: ${liveFailed}`);
  console.log(`Total Live synced: ${liveInserted + liveUpdated} / ${questions.length}`);
}

main().catch(console.error).finally(() => pool.end());
