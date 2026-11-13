import fs from 'fs';
import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const questions = JSON.parse(fs.readFileSync('./backend/scripts/anatomy_all_questions.json', 'utf8'));

async function main() {
  console.log('--- Completing Anatomy of Flowering Plants upload ---');

  // 1. Live Server Login
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  // Upload missing Q93 on Live Server with question_type: 'mcq'
  const q93 = questions.find(q => q.q_num === 93);
  const q93Payload = {
    category: 'PYQ',
    subject: 'Botany',
    subject_id: 10,
    chapter: 'Anatomy of Flowering Plants',
    chapter_id: 235,
    question_type: 'mcq',
    question_text: q93.text,
    options: q93.options,
    correct_index: q93.correct_index,
    correct_indices: q93.correct_indices,
    marks: 4,
    difficulty: 'medium',
    solution: q93.solution,
    image_url: q93.image_url || '',
    status: 'normal',
    topic: 'Anatomy of Flowering Plants'
  };

  console.log('Uploading Q93 on Live Server...');
  const res93 = await fetch(`${LIVE_API}/question-bank`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(q93Payload)
  });
  if (res93.ok) {
    console.log('Successfully uploaded Q93 to Live Server!');
  } else {
    console.error('Failed to upload Q93 to Live Server:', await res93.text());
  }

  // 2. Clean Neon DB and re-insert all 127
  console.log('Cleaning existing Anatomy entries in Neon DB...');
  await query(`DELETE FROM question_bank WHERE category = 'PYQ' AND subject = 'Botany' AND chapter = 'Anatomy of Flowering Plants'`);

  console.log('Inserting all 127 questions into Neon DB...');
  let neonUploaded = 0;
  const BATCH_SIZE = 10;
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
          'mcq', // all are mcq
          q.text,
          JSON.stringify(q.options),
          q.correct_index,
          JSON.stringify(q.correct_indices),
          4,
          q.solution,
          15, // Neon DB Botany subject_id
          161, // Neon DB Anatomy chapter_id
          'medium',
          q.image_url || '',
          'Botany',
          'Anatomy of Flowering Plants',
          'Anatomy of Flowering Plants',
          'normal'
        ]
      );
      neonUploaded++;
    }));
    process.stdout.write(`Neon DB inserted ${neonUploaded}/${questions.length} questions...\r`);
  }
  console.log(`\nNeon DB: Successfully inserted ${neonUploaded}/${questions.length} questions.`);

  // 3. Verification
  console.log('\n--- Final Verification ---');
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&chapter=Anatomy%20of%20Flowering%20Plants`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  console.log(`Live Server PYQ Botany Anatomy question count: ${verifyData.questions?.length}`);

  const neonCount = await query(
    `SELECT COUNT(*) FROM question_bank WHERE category = 'PYQ' AND subject = 'Botany' AND chapter = 'Anatomy of Flowering Plants'`
  );
  console.log(`Neon DB PYQ Botany Anatomy question count: ${neonCount.rows[0].count}`);
}

main().finally(() => process.exit(0));

