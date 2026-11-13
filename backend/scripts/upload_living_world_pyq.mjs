import { livingWorldQuestions } from './the_living_world_pyq_data.mjs';
import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log(`Starting upload of ${livingWorldQuestions.length} questions for The Living World (Botany PYQ)...`);

  // 1. Upload to Live Server
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

  let liveUploaded = 0;
  for (let i = 0; i < livingWorldQuestions.length; i++) {
    const q = livingWorldQuestions[i];
    const payload = {
      category: 'PYQ',
      subject: 'Botany',
      subject_id: 10,
      chapter: 'The Living World',
      chapter_id: 221,
      question_type: 'mcq',
      question_text: q.text,
      options: q.options,
      correct_index: q.correct_index,
      correct_indices: [q.correct_index],
      marks: 4,
      difficulty: 'medium',
      solution: q.solution,
      status: 'normal',
      topic: 'The Living World'
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
  }
  console.log(`Live Server: Successfully added ${liveUploaded}/${livingWorldQuestions.length} questions.`);

  // 2. Upload to Neon DB
  let neonUploaded = 0;
  try {
    for (const q of livingWorldQuestions) {
      await query(
        `INSERT INTO question_bank (
          category, question_type, question_text, options, correct_index, correct_indices,
          marks, solution, subject_id, chapter_id, difficulty, subject, topic, chapter, status
        ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
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
          129, // Neon DB The Living World chapter_id
          'medium',
          'Botany',
          'The Living World',
          'The Living World',
          'normal'
        ]
      );
      neonUploaded++;
    }
    console.log(`Neon DB: Successfully added ${neonUploaded}/${livingWorldQuestions.length} questions.`);
  } catch (err) {
    console.warn('Neon DB insert error:', err.message);
  }

  // 3. Verification on Live Server
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=The%20Living%20World&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const count = verifyData.questions?.length || 0;
  console.log(`Verified Live Server Botany PYQ (The Living World) count: ${count}`);

  const totalBotanyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const totalBotanyData = await totalBotanyRes.json();
  console.log(`Total Botany PYQ count across all chapters: ${totalBotanyData.questions?.length || 0}`);
}

main().finally(() => process.exit(0));

