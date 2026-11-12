import fs from 'fs';
import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const questions = JSON.parse(fs.readFileSync('./backend/scripts/pk_all_questions.json', 'utf8'));

async function main() {
  console.log(`Starting upload of ${questions.length} questions for Plant Kingdom (Botany PYQ)...`);

  // 1. Live Server Login
  console.log('Logging in to live server...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;
  if (!token) throw new Error('Failed to login to live server');
  console.log('Live server login successful.');

  // 2. Upload to Live Server in batches of 10
  let liveUploaded = 0;
  const BATCH_SIZE = 10;
  for (let i = 0; i < questions.length; i += BATCH_SIZE) {
    const batch = questions.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (q) => {
      const payload = {
        category: 'PYQ',
        subject: 'Botany',
        subject_id: 10,
        chapter: 'Plant Kingdom',
        chapter_id: 227,
        question_type: 'mcq',
        question_text: q.text,
        options: q.options,
        correct_index: q.correct_index,
        correct_indices: [q.correct_index],
        marks: 4,
        difficulty: 'medium',
        solution: q.solution,
        image_url: q.image_url || '',
        status: 'normal',
        topic: 'Plant Kingdom'
      };

      const res = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        liveUploaded++;
      } else {
        const err = await res.text();
        console.error(`Failed to upload Q${q.q_num} on live:`, err);
      }
    }));
    process.stdout.write(`Live uploaded ${liveUploaded}/${questions.length} questions...\r`);
  }
  console.log(`\nLive Server: Successfully uploaded ${liveUploaded}/${questions.length} questions.`);

  // 3. Upload to Neon DB
  let neonUploaded = 0;
  try {
    for (let i = 0; i < questions.length; i += BATCH_SIZE) {
      const batch = questions.slice(i, i + BATCH_SIZE);
      await Promise.all(batch.map(async (q) => {
        await query(
          `INSERT INTO question_bank (
            category, question_type, question_text, options, correct_index, correct_indices,
            marks, solution, subject_id, chapter_id, difficulty, image_url, subject, topic, chapter, status
          ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)`,
          [
            'PYQ',
            'mcq',
            q.text,
            JSON.stringify(q.options),
            q.correct_index,
            JSON.stringify([q.correct_index]),
            4,
            q.solution,
            15, // Neon DB Botany subject_id
            157, // Neon DB Plant Kingdom chapter_id
            'medium',
            q.image_url || '',
            'Botany',
            'Plant Kingdom',
            'Plant Kingdom',
            'normal'
          ]
        );
        neonUploaded++;
      }));
      process.stdout.write(`Neon DB inserted ${neonUploaded}/${questions.length} questions...\r`);
    }
    console.log(`\nNeon DB: Successfully inserted ${neonUploaded}/${questions.length} questions.`);
  } catch (err) {
    console.warn('\nNeon DB insert error:', err.message);
  }

  // 4. Verify Live Server
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Plant%20Kingdom&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const count = verifyData.questions?.length || 0;
  console.log(`\nVerified Live Server Botany PYQ (Plant Kingdom) count: ${count}`);

  const totalBotanyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const totalBotanyData = await totalBotanyRes.json();
  console.log(`Total Botany PYQ count across all chapters on Live: ${totalBotanyData.questions?.length || 0}`);
}

main().finally(() => process.exit(0));
