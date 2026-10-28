import { query } from '../src/config/db.js';
import { signAccessToken } from '../src/utils/token.js';
import { delCache } from '../src/config/redis.js';

async function run() {
  // Clear redis cache for question bank
  await delCache('cache:qb:questions:Physics').catch(() => {});
  await delCache('cache:qb:questions:all').catch(() => {});
  console.log('Cleared redis cache for questions');

  // Find admin user
  const adminRes = await query("SELECT id, role, email, name, institution_id, batch_id FROM users WHERE role = 'admin' LIMIT 1");
  if (adminRes.rowCount === 0) {
    console.error('No admin found');
    process.exit(1);
  }
  const admin = adminRes.rows[0];
  const token = signAccessToken(admin);

  const res = await fetch('http://localhost:5000/api/question-bank?category=Physics&skip_cache=true', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  console.log('Response status:', res.status);
  const data = await res.json();
  const questions = data.questions || [];
  console.log('Total Physics questions fetched:', questions.length);

  const emiQuestions = questions.filter(q => q.chapter === 'Electromagnetic Induction');
  console.log('Total EMI questions (chapter = "Electromagnetic Induction"):', emiQuestions.length);

  const movingCharges = questions.filter(q => q.chapter === 'Moving Charges and Magnetism');
  console.log('Total Moving Charges questions (chapter = "Moving Charges and Magnetism"):', movingCharges.length);

  const magMatter = questions.filter(q => q.chapter === 'Magnetism and Matter');
  console.log('Total Magnetism and Matter questions (chapter = "Magnetism and Matter"):', magMatter.length);

  const oldComposite = questions.filter(q => q.chapter === 'Magnetism & Electromagnetic Induction');
  console.log('Total old composite questions (chapter = "Magnetism & Electromagnetic Induction"):', oldComposite.length);

  // Simulate search in frontend:
  // In frontend QuestionBank.jsx, filtering checks if string matches question_text, chapter, topic, or id
  const searchTerm = 'Electromagnetic Induction'.toLowerCase();
  const searchMatches = questions.filter(q => 
    (q.chapter && q.chapter.toLowerCase().includes(searchTerm)) ||
    (q.topic && q.topic.toLowerCase().includes(searchTerm)) ||
    (q.question_text && q.question_text.toLowerCase().includes(searchTerm))
  );
  console.log(`Searching for "${searchTerm}" in Physics returns: ${searchMatches.length} questions`);

  const searchChapters = [...new Set(searchMatches.map(q => q.chapter))];
  console.log('Distinct chapters in search results:', searchChapters);

  console.log('\nSample match:', {
    id: searchMatches[0]?.id,
    chapter: searchMatches[0]?.chapter,
    topic: searchMatches[0]?.topic,
    text: searchMatches[0]?.question_text?.substring(0, 100)
  });

  process.exit(0);
}

run().catch(console.error);
