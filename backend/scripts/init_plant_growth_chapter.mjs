import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Plant Growth and Development';

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
  console.log('=== Checking Local Neon DB Botany Subject & Chapter ===');
  const subjRes = await query("SELECT id, name FROM subjects WHERE LOWER(name) LIKE '%botany%'");
  const localSubj = subjRes.rows[0];
  console.log('Local Botany Subject:', localSubj);

  let localChapterId;
  const localChRes = await query("SELECT id, name FROM chapters WHERE subject_id = $1 AND LOWER(TRIM(name)) = LOWER(TRIM($2))", [localSubj.id, CHAPTER_NAME]);
  if (localChRes.rows.length > 0) {
    localChapterId = localChRes.rows[0].id;
    console.log(`Local chapter already exists: [${localChapterId}] ${localChRes.rows[0].name}`);
  } else {
    const maxPos = await query("SELECT COALESCE(MAX(position), 0) + 1 AS next_pos FROM chapters WHERE subject_id = $1", [localSubj.id]);
    const ins = await query("INSERT INTO chapters (subject_id, name, position) VALUES ($1, $2, $3) RETURNING id, name", [localSubj.id, CHAPTER_NAME, maxPos.rows[0].next_pos]);
    localChapterId = ins.rows[0].id;
    console.log(`Created Local chapter: [${localChapterId}] ${ins.rows[0].name}`);
  }

  console.log('\n=== Checking Live Production Botany Subject & Chapter ===');
  const token = await getToken();
  const subjectsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subjectsData = await subjectsRes.json();
  const subjects = subjectsData.subjects || subjectsData.data || subjectsData;
  const botanyLive = subjects.find(s => s.name.toLowerCase().includes('botan'));
  console.log('Live Botany Subject:', botanyLive);

  const liveChapsRes = await fetch(`${LIVE_API}/admin/chapters/${botanyLive.id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveChapsData = await liveChapsRes.json();
  const chapters = liveChapsData.chapters || liveChapsData.data || [];
  let liveChapter = chapters.find(c => c.name.toLowerCase() === CHAPTER_NAME.toLowerCase());
  let liveChapterId;

  if (liveChapter) {
    liveChapterId = liveChapter.id;
    console.log(`Live chapter already exists: [${liveChapterId}] ${liveChapter.name}`);
  } else {
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: botanyLive.id,
        name: CHAPTER_NAME,
        position: chapters.length + 1
      })
    });
    const createData = await createRes.json();
    liveChapterId = createData.chapter?.id || createData.id;
    console.log(`Created Live chapter: [${liveChapterId}] ${CHAPTER_NAME}`);
  }

  console.log(`\nSUMMARY:
  Local: Subject ID ${localSubj.id}, Chapter ID ${localChapterId}
  Live:  Subject ID ${botanyLive.id}, Chapter ID ${liveChapterId}
  Chapter Name: "${CHAPTER_NAME}"`);
}

run().catch(console.error).finally(() => process.exit(0));

