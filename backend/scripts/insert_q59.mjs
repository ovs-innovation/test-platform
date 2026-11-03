import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const LOCAL_SUBJECT_ID = 13;
const LOCAL_CHAPTER_ID = 174;
const LIVE_SUBJECT_ID = 2;
const LIVE_CHAPTER_ID = 4;
const CHAPTER_NAME = 'Neural Control and Coordination';
const CATEGORY_NAME = 'Zoology';

const q59 = {
  question_text: "Find the incorrect match regarding parts of human brain and their functions:",
  options: [
    "Superior colliculi - Visual reflex",
    "Limbic system - Emotion and fear",
    "Medulla oblongata - Gatekeeper of brain",
    "Hypothalamus - Thermostat of body"
  ],
  correct_index: 2,
  solution: "The thalamus (along with the reticular activating system) acts as the relay station and gatekeeper of sensory impulses to the cortex, not medulla oblongata. Medulla oblongata contains centers for respiration, cardiovascular reflexes, and gastric secretions.",
  marks: 4,
  difficulty: "easy",
  image_url: null,
  category: CATEGORY_NAME,
  subject: CATEGORY_NAME,
  chapter: CHAPTER_NAME,
  topic: CHAPTER_NAME,
  question_type: "mcq",
  status: "available"
};

async function getLiveToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function run() {
  console.log('Inserting Q59 into Local DB...');
  await query(
    `INSERT INTO question_bank (
      category, subject, chapter, topic, question_text, question_type,
      options, correct_index, solution, marks, difficulty, image_url, status,
      subject_id, chapter_id
    ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
    [
      q59.category,
      q59.subject,
      q59.chapter,
      q59.topic,
      q59.question_text,
      q59.question_type,
      JSON.stringify(q59.options),
      q59.correct_index,
      q59.solution,
      q59.marks,
      q59.difficulty,
      q59.image_url,
      q59.status,
      LOCAL_SUBJECT_ID,
      LOCAL_CHAPTER_ID
    ]
  );
  console.log('Q59 inserted into Local Neon DB!');

  console.log('Authenticating with Live API...');
  const token = await getLiveToken();
  const payload = {
    ...q59,
    subject_id: LIVE_SUBJECT_ID,
    chapter_id: LIVE_CHAPTER_ID
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
    console.log('Q59 inserted into Live API successfully!');
  } else {
    console.error('Failed to insert Q59 into Live API:', res.status, await res.text());
  }

  // Verification
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=Zoology`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  const verifyQuestions = verifyData.questions || verifyData.data || [];
  const finalLive = verifyQuestions.filter(
    q => (q.chapter_id === LIVE_CHAPTER_ID) || (q.chapter && q.chapter.toLowerCase().includes('neural'))
  );

  const liveMCQs = finalLive.filter(q => q.question_type === 'mcq' || q.question_type === 'single_choice');
  const liveARs = finalLive.filter(q => q.question_type === 'assertion_reason');

  const localCounts = await query(
    "SELECT question_type, count(*) as count FROM question_bank WHERE subject_id = $1 AND (chapter = $2 OR chapter_id = $3) GROUP BY question_type",
    [LOCAL_SUBJECT_ID, CHAPTER_NAME, LOCAL_CHAPTER_ID]
  );
  const localTotal = localCounts.rows.reduce((acc, r) => acc + parseInt(r.count, 10), 0);

  console.log('\n==================================================');
  console.log(`🎯 FINAL VERIFICATION AFTER Q59:`);
  console.log(`LOCAL NEON DB:`);
  localCounts.rows.forEach(r => console.log(`  - ${r.question_type}: ${r.count}`));
  console.log(`  - Total: ${localTotal}`);
  console.log(`LIVE PRODUCTION API:`);
  console.log(`  - MCQs: ${liveMCQs.length}`);
  console.log(`  - ARs: ${liveARs.length}`);
  console.log(`  - Total: ${finalLive.length}`);
  console.log(`==================================================\n`);
}

run().catch(console.error);
