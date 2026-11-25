import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';
const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'goc_final_questions.json'), 'utf8'));

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
  console.log(`  RESYNC GOC TO LIVE: Setting category = 'Chemistry'`);
  console.log(`================================================================\n`);

  const token = await getToken();

  // 1. Delete previous questions (IDs 52054 to 52390)
  console.log('--- Step 1: Deleting previous 337 questions from Live API ---');
  let deletedCount = 0;
  const BATCH_DEL = 20;
  for (let id = 52054; id <= 52390; id += BATCH_DEL) {
    const ids = [];
    for (let j = id; j < id + BATCH_DEL && j <= 52390; j++) ids.push(j);

    await Promise.all(ids.map(async (targetId) => {
      try {
        const delRes = await fetch(`${LIVE_API}/question-bank/${targetId}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        if (delRes.ok) deletedCount++;
      } catch (err) {
        // Ignore
      }
    }));
    console.log(`Deletion progress: ${deletedCount} / 337`);
  }
  console.log(`Deleted ${deletedCount} questions.`);

  // 2. Re-insert all 337 questions with category: 'Chemistry'
  console.log('\n--- Step 2: Inserting 337 questions with category = "Chemistry" ---');
  const liveSubjectId = 6;
  const liveChapterId = 249;
  const chapterName = 'Basics of Organic Chemistry';

  let insertedCount = 0;
  let failedCount = 0;
  const BATCH_INS = 15;

  for (let i = 0; i < questions.length; i += BATCH_INS) {
    const batch = questions.slice(i, i + BATCH_INS);

    await Promise.all(batch.map(async (q) => {
      const payload = {
        subject_id: liveSubjectId,
        chapter_id: liveChapterId,
        category: 'Chemistry', // <--- Sets category to Chemistry
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
        status: 'available',
        solution: q.solution,
        image_url: q.image_url || ''
      };

      let success = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          const postRes = await fetch(`${LIVE_API}/question-bank`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });
          if (postRes.ok) {
            insertedCount++;
            success = true;
            break;
          }
        } catch (err) {
          // retry
        }
        await sleep(500);
      }

      if (!success) {
        failedCount++;
        console.warn(`Failed to insert Q${q.question_number}`);
      }
    }));

    console.log(`Insertion progress: ${Math.min(i + BATCH_INS, questions.length)} / ${questions.length} (inserted: ${insertedCount})`);
  }

  console.log(`\n=== Verification on Live API ===`);
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&exam_type=JEE&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await verifyRes.json();
  const allQs = data.questions || [];
  const goc = allQs.filter(q => Number(q.chapter_id) === 249 || /basics?\s*of\s*organic/i.test(q.chapter || ''));
  console.log(`Total questions in Chemistry (JEE): ${allQs.length}`);
  console.log(`Basics of Organic Chemistry questions now visible in JEE Chemistry: ${goc.length} / 337`);
  if (goc.length > 0) {
    console.log('Sample question #1:', {
      id: goc[0].id,
      category: goc[0].category,
      subject: goc[0].subject,
      chapter: goc[0].chapter,
      chapter_id: goc[0].chapter_id,
      exam_type: goc[0].exam_type,
      text: goc[0].question_text.slice(0, 80)
    });
  }
}

main().catch(console.error);
