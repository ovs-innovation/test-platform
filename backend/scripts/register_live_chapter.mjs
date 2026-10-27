import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function registerLiveChapter() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const physicsSub = subs.find(s => s.name.toLowerCase() === 'physics');

  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${physicsSub.id}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let thermalChap = chaps.find(c => c.name.toLowerCase() === 'thermal properties of matter');

  if (!thermalChap) {
    console.log("Registering 'Thermal Properties of Matter' via POST /api/admin/chapters...");
    const createRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: physicsSub.id,
        name: 'Thermal Properties of Matter',
        position: 11
      })
    });

    if (createRes.ok) {
      const data = await createRes.json();
      thermalChap = data.chapter;
      console.log('Successfully created chapter on live:', thermalChap);
    } else {
      console.error('Failed to create chapter:', createRes.status, await createRes.text());
    }
  } else {
    console.log('Chapter already registered on live:', thermalChap);
  }

  if (thermalChap) {
    // Now let's update questions in chapter "Thermal Properties of Matter" to have chapter_id = thermalChap.id
    const qRes = await fetch(`${LIVE_API}/question-bank?category=Physics&skip_cache=true`, {
      headers: { 'Authorization': `Bearer ${token}`, 'Cache-Control': 'no-cache' }
    });
    const qData = await qRes.json();
    const questions = qData.questions || [];
    const thermalQuestions = questions.filter(q => q.chapter === 'Thermal Properties of Matter' && q.chapter_id !== thermalChap.id);
    console.log(`Found ${thermalQuestions.length} questions to link with chapter_id ${thermalChap.id}`);

    for (const q of thermalQuestions) {
      await fetch(`${LIVE_API}/question-bank/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...q,
          chapter_id: thermalChap.id,
          subject_id: physicsSub.id
        })
      });
    }
    console.log(`Updated all ${thermalQuestions.length} questions with chapter_id: ${thermalChap.id}`);
  }
}

registerLiveChapter().catch(console.error);
