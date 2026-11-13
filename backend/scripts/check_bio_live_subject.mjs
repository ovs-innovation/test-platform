import { query } from '../src/config/db.js';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();
  const headers = { Authorization: `Bearer ${token}` };

  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&chapter=Biological%20Classification`, { headers });
  const data = await res.json();
  console.log('Biological Classification questions count:', data.questions?.length);
  if (data.questions?.length > 0) {
    const sample = data.questions[0];
    console.log('Bio question sample on Live:', {
      id: sample.id,
      category: sample.category,
      subject: sample.subject,
      subject_id: sample.subject_id,
      subject_name: sample.subject_name,
      chapter: sample.chapter,
      chapter_id: sample.chapter_id,
      chapter_name: sample.chapter_name
    });

    const subjectsInBio = new Set(data.questions.map(q => q.subject));
    const subjectIdsInBio = new Set(data.questions.map(q => q.subject_id));
    const subjectNamesInBio = new Set(data.questions.map(q => q.subject_name));
    console.log('Subjects in Bio:', Array.from(subjectsInBio));
    console.log('Subject IDs in Bio:', Array.from(subjectIdsInBio));
    console.log('Subject Names in Bio:', Array.from(subjectNamesInBio));
  }
}

main().catch(console.error);

