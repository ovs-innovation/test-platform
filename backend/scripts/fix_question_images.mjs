import { pool } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function fix() {
  console.log('=== Checking Local DB for questions with <img in question_text ===');
  const localRes = await pool.query(
    "SELECT id, chapter, question_text, image_url FROM question_bank WHERE question_text LIKE '%<img%'"
  );
  console.log(`Found ${localRes.rows.length} questions in Local DB with <img in question_text:`);

  for (const r of localRes.rows) {
    const imgMatch = r.question_text.match(/<img[^>]+src=["']([^"']+)["'][^>]*\/?>/i);
    if (imgMatch) {
      const extractedUrl = imgMatch[1];
      const cleanedText = r.question_text.replace(/<img[^>]+src=["'][^"']+["'][^>]*\/?>/gi, '').trim();
      console.log(`Fixing Local ID ${r.id}: extracted image_url = ${extractedUrl}`);
      await pool.query(
        "UPDATE question_bank SET question_text = $1, image_url = $2 WHERE id = $3",
        [cleanedText, extractedUrl, r.id]
      );
    }
  }

  console.log('\n=== Checking Live DB for questions with <img in question_text ===');
  const token = await getToken();
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Zoology&limit=300`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const questions = liveData.data?.questions || liveData.questions || [];
  
  const toFix = questions.filter(q => q.question_text && q.question_text.includes('<img'));
  console.log(`Found ${toFix.length} questions in Live API (Zoology) with <img in question_text:`);

  for (const q of toFix) {
    const imgMatch = q.question_text.match(/<img[^>]+src=["']([^"']+)["'][^>]*\/?>/i);
    if (imgMatch) {
      const extractedUrl = imgMatch[1];
      const cleanedText = q.question_text.replace(/<img[^>]+src=["'][^"']+["'][^>]*\/?>/gi, '').trim();
      console.log(`Fixing Live ID ${q.id}: extracted image_url = ${extractedUrl}`);
      
      const updateRes = await fetch(`${LIVE_API}/question-bank/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          question_text: cleanedText,
          image_url: extractedUrl
        })
      });

      if (!updateRes.ok) {
        console.error(`Failed to update Live ID ${q.id}: ${await updateRes.text()}`);
      } else {
        console.log(`Successfully updated Live ID ${q.id}`);
      }
    }
  }

  console.log('\nAll questions in Local and Live DB fixed!');
  await pool.end();
}

fix().catch(async (e) => {
  console.error(e);
  await pool.end();
  process.exit(1);
});
