import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.accessToken || data.data?.token;
}

async function main() {
  console.log('Testing Hydrocarbons Frontend Resolver logic on Live API questions...');

  const token = await getToken();
  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&chapter_id=164&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || data.data || [];

  console.log(`Retrieved ${questions.length} questions from Live API.`);

  // Emulate QuestionBank.jsx getQuestionChapter
  function getQuestionChapter(q) {
    const raw = (q.chapter_name || q.chapter || '').trim();
    if (
      Number(q.chapter_id) === 168 ||
      Number(q.chapter_id) === 164 ||
      /^\s*hydrocarbons?\s*$/i.test(raw)
    ) {
      return 'Hydrocarbons';
    }
    return raw;
  }

  let resolvedCount = 0;
  for (const q of questions) {
    const ch = getQuestionChapter(q);
    if (ch === 'Hydrocarbons') {
      resolvedCount++;
    }
  }

  console.log(`Resolved ${resolvedCount} / ${questions.length} questions as 'Hydrocarbons'.`);
  if (resolvedCount === 103) {
    console.log('SUCCESS: All 103 questions resolve to chapter "Hydrocarbons"!');
  } else {
    console.error(`Mismatch: expected 103, got ${resolvedCount}`);
    process.exit(1);
  }
}

main().catch(console.error);
