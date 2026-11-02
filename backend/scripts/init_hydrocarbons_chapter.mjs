import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Hydrocarbons';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function run() {
  console.log('=== Setting up Hydrocarbons Chapter in Local Neon DB ===');
  // 1. Check or insert in Local Neon DB
  const localExisting = await query("SELECT id, name, subject_id FROM chapters WHERE name = $1 AND subject_id = 10", [CHAPTER_NAME]);
  let localChapterId;
  if (localExisting.rows.length > 0) {
    localChapterId = localExisting.rows[0].id;
    console.log(`Local chapter already exists with ID: ${localChapterId}`);
  } else {
    const maxPos = await query("SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM chapters WHERE subject_id = 10");
    const nextPos = maxPos.rows[0].next_pos;
    const ins = await query(
      "INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, $3) RETURNING *",
      [10, CHAPTER_NAME, nextPos]
    );
    localChapterId = ins.rows[0].id;
    console.log(`Created Local chapter with ID: ${localChapterId}`);
  }

  console.log('\n=== Setting up Hydrocarbons Chapter on Live Production ===');
  const token = await getToken();
  
  // Get live subjects
  const subjectsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subjectsData = await subjectsRes.json();
  const subjects = subjectsData.subjects || subjectsData.data || subjectsData;
  const chemLive = subjects.find(s => s.name.toLowerCase().includes('chem'));
  console.log('Live Chemistry Subject:', chemLive);

  // Check live chapters for Chemistry
  const liveChapsRes = await fetch(`${LIVE_API}/admin/chapters/${chemLive.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChapsData = await liveChapsRes.json();
  const chapters = liveChapsData.chapters || liveChapsData.data || [];
  let liveChapter = chapters.find(c => c.name.toLowerCase() === CHAPTER_NAME.toLowerCase());
  let liveChapterId;

  if (liveChapter) {
    liveChapterId = liveChapter.id;
    console.log(`Live chapter already exists with ID: ${liveChapterId}`);
  } else {
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: chemLive.id,
        name: CHAPTER_NAME,
        position: chapters.length + 1
      })
    });
    const createData = await createRes.json();
    console.log('Created live chapter response:', createData);
    liveChapterId = createData.chapter?.id || createData.id;
    console.log(`Created Live chapter with ID: ${liveChapterId}`);
  }

  console.log(`\nRESULT:
  Local Subject ID: 10
  Local Chapter ID: ${localChapterId}
  Live Subject ID: ${chemLive.id}
  Live Chapter ID: ${liveChapterId}
  Chapter Name: "${CHAPTER_NAME}"`);
}

run().catch(console.error).finally(() => process.exit(0));

