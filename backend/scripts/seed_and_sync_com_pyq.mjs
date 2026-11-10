import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { ALL_COM_PYQ_QUESTIONS } from './com_pyq_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

function formatOption(opt) {
  if (typeof opt !== 'string') return opt;
  let trimmed = opt.trim();
  if (trimmed.includes('$') || trimmed.includes('\\(')) return trimmed;
  if (
    trimmed.includes('\\text') ||
    trimmed.includes('\\frac') ||
    trimmed.includes('\\times') ||
    trimmed.includes('\\alpha') ||
    trimmed.includes('\\beta') ||
    trimmed.includes('\\gamma') ||
    trimmed.includes('\\delta') ||
    trimmed.includes('\\pm') ||
    trimmed.includes('\\Omega') ||
    trimmed.includes('\\mu') ||
    trimmed.includes('\\varepsilon') ||
    trimmed.includes('\\sqrt') ||
    trimmed.includes('\\left') ||
    trimmed.includes('^') ||
    (trimmed.startsWith('[') && trimmed.endsWith(']'))
  ) {
    return `$${trimmed}$`;
  }
  return trimmed;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status} ${await res.text()}`);
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

const cleanStr = (s) => (s || '').toLowerCase().replace(/[^a-z0-9]/g, '');

async function main() {
  console.log(`Starting Center of Mass and Collision PYQ seeding (${ALL_COM_PYQ_QUESTIONS.length} questions)...`);

  // 1. Local Database Seeding
  console.log('\n--- Seeding into Local Neon Database ---');
  const client = await pool.connect();
  const localSubjectId = 11; // Physics
  let localChapterId;

  try {
    // Check or create local chapter
    const chCheck = await client.query(
      "SELECT id FROM chapters WHERE subject_id = $1 AND LOWER(name) LIKE '%center of mass%'",
      [localSubjectId]
    );

    if (chCheck.rows.length > 0) {
      localChapterId = chCheck.rows[0].id;
      console.log(`Found existing local chapter ID: ${localChapterId}`);
    } else {
      const insCh = await client.query(
        "INSERT INTO chapters (subject_id, name, position) VALUES ($1, 'Center of Mass and Collision', 0) RETURNING id",
        [localSubjectId]
      );
      localChapterId = insCh.rows[0].id;
      console.log(`Created new local chapter ID: ${localChapterId}`);
    }

    // Clean up any previous test PYQ insertions for this chapter
    const delRes = await client.query(
      "DELETE FROM question_bank WHERE category = 'PYQ' AND (chapter_id = $1 OR LOWER(chapter) LIKE '%center of mass%')",
      [localChapterId]
    );
    console.log(`Cleaned up ${delRes.rowCount} previous PYQ questions in chapter ${localChapterId}.`);

    let localInserted = 0;

    for (const q of ALL_COM_PYQ_QUESTIONS) {
      const questionText = q.question.trim();
      const optionsArray = q.options.map((opt, oIdx) => {
        if (typeof opt === 'object' && opt !== null) {
          return {
            key: String.fromCharCode(65 + oIdx),
            text: opt.text ? formatOption(opt.text) : '',
            image_url: opt.image_url || ''
          };
        }
        return {
          key: String.fromCharCode(65 + oIdx),
          text: formatOption(opt),
          image_url: ''
        };
      });

      await client.query(
        `INSERT INTO question_bank (
          question_type, question_text, options, correct_index, correct_indices,
          marks, difficulty, category, status, solution, image_url,
          subject_id, subject, chapter_id, chapter, topic, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())`,
        [
          'mcq',
          questionText,
          JSON.stringify(optionsArray),
          q.correct_option,
          JSON.stringify([q.correct_option]),
          4,
          'medium',
          'PYQ',
          'available',
          q.solution,
          q.image_url || null,
          localSubjectId,
          'Physics',
          localChapterId,
          'Center of Mass and Collision',
          'Center of Mass and Collision'
        ]
      );
      localInserted++;
    }
    console.log(`Local DB Complete: ${localInserted} inserted.`);
  } finally {
    client.release();
  }

  // 2. Sync to Live edvedum.com API
  console.log('\n--- Syncing to Live edvedum.com API ---');
  const token = await getToken();
  if (!token) throw new Error('Failed to obtain token from live API');

  // Check or create Live chapter
  const liveSubjectId = 5; // Live Physics ID
  let liveChapterId;

  const liveChRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (liveChRes.ok) {
    const chData = await liveChRes.json();
    const chList = chData.chapters || [];
    const matched = chList.find(c => (c.name || '').toLowerCase().includes('center of mass'));
    if (matched) {
      liveChapterId = matched.id;
      console.log(`Found existing Live chapter ID: ${liveChapterId} (${matched.name})`);
    }
  }

  if (!liveChapterId) {
    console.log('Creating new chapter on Live API: Center of Mass and Collision');
    const createChRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        subject_id: liveSubjectId,
        name: 'Center of Mass and Collision',
        position: 0
      })
    });
    if (!createChRes.ok) {
      throw new Error(`Failed to create chapter on Live: ${createChRes.status} ${await createChRes.text()}`);
    }
    const createdData = await createChRes.json();
    liveChapterId = createdData.chapter?.id || createdData.id;
    console.log(`Created new Live chapter ID: ${liveChapterId}`);
  }

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveQuestions = liveData.questions || [];
  console.log(`Found ${liveQuestions.length} existing Physics PYQ questions on Live.`);

  const liveMap = new Map();
  for (const q of liveQuestions) {
    if (Number(q.chapter_id) === Number(liveChapterId) || (q.chapter || '').toLowerCase().includes('center of mass')) {
      const key = cleanStr(q.question_text);
      if (key && !liveMap.has(key)) liveMap.set(key, q);
    }
  }

  let liveInserted = 0;
  let liveUpdated = 0;

  for (const q of ALL_COM_PYQ_QUESTIONS) {
    const questionText = q.question.trim();
    const optionsArray = q.options.map((opt, oIdx) => {
      if (typeof opt === 'object' && opt !== null) {
        return {
          key: String.fromCharCode(65 + oIdx),
          text: opt.text ? formatOption(opt.text) : '',
          image_url: opt.image_url || ''
        };
      }
      return {
        key: String.fromCharCode(65 + oIdx),
        text: formatOption(opt),
        image_url: ''
      };
    });

    const payload = {
      category: 'PYQ',
      subject: 'Physics',
      chapter: 'Center of Mass and Collision',
      topic: 'Center of Mass and Collision',
      subject_id: liveSubjectId,
      chapter_id: liveChapterId,
      question_type: 'mcq',
      question_text: questionText,
      options: optionsArray,
      correct_index: q.correct_option,
      correct_indices: [q.correct_option],
      solution: q.solution,
      image_url: q.image_url || null,
      difficulty: 'medium',
      marks: 4,
      status: 'available'
    };

    const key = cleanStr(questionText);
    const existing = liveMap.get(key);

    if (existing) {
      const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (putRes.ok) {
        liveUpdated++;
        liveMap.delete(key);
      } else {
        console.error(`[Q${q.qNum}] Failed to update Live question ${existing.id}:`, await putRes.text());
      }
    } else {
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (postRes.ok) {
        const resData = await postRes.json();
        const newId = resData.question?.id || resData.id;
        console.log(`[Q${q.qNum}] Inserted Live ID: ${newId}`);
        liveInserted++;
      } else {
        console.error(`[Q${q.qNum}] Failed to insert Live question:`, await postRes.text());
      }
    }
    await sleep(100);
  }

  console.log(`\nLive API Complete: ${liveInserted} inserted, ${liveUpdated} updated.`);

  // 3. Final Verification on Local DB and Live
  console.log('\n--- Final Verification ---');
  const localCountRes = await pool.query(
    "SELECT count(*) FROM question_bank WHERE category = 'PYQ' AND (chapter = 'Center of Mass and Collision' OR chapter_id = $1)",
    [localChapterId]
  );
  console.log(`Local DB count: ${localCountRes.rows[0].count} / 57`);

  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Physics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || [];
  const comQuestions = verifyQuestions.filter(q =>
    (q.chapter || '').toLowerCase().includes('center of mass') ||
    Number(q.chapter_id) === Number(liveChapterId)
  );
  console.log(`Live API count: ${comQuestions.length} / 57`);

  const diagramQuestions = comQuestions.filter(q => q.image_url);
  console.log(`Live diagram questions count: ${diagramQuestions.length} / 5`);

  await pool.end();
}

main().catch(err => {
  console.error('Fatal error in seed_and_sync_com_pyq:', err);
  process.exit(1);
});

