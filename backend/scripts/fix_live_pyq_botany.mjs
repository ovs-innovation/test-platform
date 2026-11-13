import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('Logging in to live server...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;
  if (!token) {
    throw new Error('Failed to get auth token');
  }
  console.log('Login successful.');

  // Fetch all PYQ questions
  console.log('Fetching live PYQ questions...');
  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=10000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const qData = await qRes.json();
  const allPyq = qData.questions || [];
  console.log(`Fetched ${allPyq.length} PYQ questions.`);

  // Find questions where subject is 'PYQ' or subject is null
  const needFix = allPyq.filter(q => !q.subject || q.subject.toUpperCase() === 'PYQ');
  console.log(`Found ${needFix.length} questions where subject is PYQ or missing.`);

  // Verify chapter distribution
  const chapterCounts = {};
  for (const q of needFix) {
    chapterCounts[q.chapter || 'NO_CHAPTER'] = (chapterCounts[q.chapter || 'NO_CHAPTER'] || 0) + 1;
  }
  console.log('Chapter distribution of questions needing fix:', chapterCounts);

  // Update them in batches
  let updatedCount = 0;
  const BATCH_SIZE = 10;
  for (let i = 0; i < needFix.length; i += BATCH_SIZE) {
    const batch = needFix.slice(i, i + BATCH_SIZE);
    await Promise.all(batch.map(async (q) => {
      // If Biological Classification, subject is Botany, subject_id is 10, chapter_id is 225
      let targetSubject = 'Botany';
      let targetSubjectId = 10;
      let targetChapterId = 225;

      const updateRes = await fetch(`${LIVE_API}/question-bank/${q.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          subject: targetSubject,
          subject_id: targetSubjectId,
          chapter_id: targetChapterId,
          chapter: q.chapter || 'Biological Classification',
          category: 'PYQ'
        })
      });
      if (updateRes.ok) {
        updatedCount++;
      } else {
        const errText = await updateRes.text();
        console.error(`Failed to update question ${q.id}:`, errText);
      }
    }));
    process.stdout.write(`Updated ${updatedCount}/${needFix.length} questions...\r`);
  }

  console.log(`\nSuccessfully updated ${updatedCount} questions on Live server!`);

  // Verify live PYQ botany count
  const verifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject=Botany&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const verifyData = await verifyRes.json();
  console.log(`Verified Live PYQ Botany count: ${verifyData.questions?.length}`);

  // Also check All Subjects PYQ
  const allVerifyRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&refresh=true`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const allVerifyData = await allVerifyRes.json();
  console.log(`Verified Live PYQ Total count: ${allVerifyData.questions?.length}`);
  const finalSubjectCounts = {};
  for (const q of allVerifyData.questions || []) {
    finalSubjectCounts[q.subject || 'NO_SUBJECT'] = (finalSubjectCounts[q.subject || 'NO_SUBJECT'] || 0) + 1;
  }
  console.log('Final Live PYQ subject distribution:', finalSubjectCounts);
}

main().catch(console.error);

