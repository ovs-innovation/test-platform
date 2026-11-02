import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';

async function getLiveToken() {
  const tokenFile = path.join(__dirname, 'live_token.json');
  let token = null;
  if (fs.existsSync(tokenFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
      token = data.token;
    } catch (e) {}
  }
  if (token) {
    try {
      const testRes = await fetch(`${LIVE_API}/question-bank?category=Botany&limit=1`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (testRes.ok) return token;
    } catch (e) {}
  }
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  const data = await res.json();
  fs.writeFileSync(tokenFile, JSON.stringify({ token: data.token, time: Date.now() }, null, 2));
  return data.token;
}

async function main() {
  const token = await getLiveToken();
  const headers = { Authorization: `Bearer ${token}` };

  // 1. Subjects
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, { headers });
  const subsData = await subsRes.json();
  const subjects = subsData.subjects || [];
  console.log('Live subjects:', subjects.map(s => ({ id: s.id, name: s.name })));

  const botanySub = subjects.find(s => s.name.toLowerCase() === 'botany');
  console.log('Botany subject:', botanySub);

  const botanyId = botanySub ? botanySub.id : 10;

  // 2. Chapters for Botany
  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${botanyId}/chapters`, { headers });
  const chapsData = await chapsRes.json();
  const chapters = chapsData.chapters || [];
  console.log(`Chapters for Botany (ID ${botanyId}):`, chapters.map(c => ({ id: c.id, name: c.name })));

  // 3. Question bank for Botany
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Botany&limit=500`, { headers });
  const qbData = await qbRes.json();
  const questions = qbData.questions || [];
  console.log(`Total Botany questions in live question-bank: ${questions.length}`);

  // Questions with organism / population
  const ecoQs = questions.filter(q => 
    (q.chapter || '').toLowerCase().includes('organism') ||
    (q.chapter || '').toLowerCase().includes('population') ||
    (q.topic || '').toLowerCase().includes('organism') ||
    (q.topic || '').toLowerCase().includes('population')
  );
  console.log(`Found ${ecoQs.length} existing ecology questions on live.`);
  if (ecoQs.length > 0) {
    console.log('Sample existing ecology question on live:', {
      id: ecoQs[0].id,
      chapter: ecoQs[0].chapter,
      chapter_id: ecoQs[0].chapter_id,
      subject_id: ecoQs[0].subject_id,
      question_text: (ecoQs[0].question_text || '').slice(0, 60),
      image_url: ecoQs[0].image_url
    });
  }
}

main().catch(console.error);
