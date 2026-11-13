const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  for (const url of [
    `${LIVE_API}/question-bank?category=PYQ&subject=Botany`,
    `${LIVE_API}/question-bank?category=Botany`,
    `${LIVE_API}/question-bank?category=PYQ&subject=Chemistry&limit=5`,
    `${LIVE_API}/question-bank?category=PYQ&limit=5`
  ]) {
    const res = await fetch(url, { headers });
    const data = await res.json();
    console.log(`\nURL: ${url}`);
    console.log('Result total questions:', data.questions?.length);
    if (data.questions?.length > 0) {
      console.log('Sample question 0:', {
        id: data.questions[0].id,
        category: data.questions[0].category,
        subject: data.questions[0].subject,
        subject_id: data.questions[0].subject_id,
        subject_name: data.questions[0].subject_name,
        chapter: data.questions[0].chapter,
        chapter_id: data.questions[0].chapter_id,
        chapter_name: data.questions[0].chapter_name,
      });
    }
  }
}

main().catch(console.error);
