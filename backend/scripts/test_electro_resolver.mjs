import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = (data.questions || data.data || []).filter(q =>
    Number(q.subject_id) === 6 || (q.subject || '').toLowerCase() === 'chemistry'
  );

  console.log(`Total Live Chemistry PYQs: ${questions.length}`);

  function getQuestionChapter(q) {
    const raw = (q.chapter_name || q.chapter || q.topic || '').trim();
    if (Number(q.chapter_id) === 13 || Number(q.chapter_id) === 205 || /ionic\s*equilibrium/i.test(raw)) return 'Ionic Equilibrium';
    if (Number(q.chapter_id) === 11 || Number(q.chapter_id) === 139 || Number(q.chapter_id) === 204 || /chemical\s*equilibrium/i.test(raw)) return 'Chemical Equilibrium';
    if (Number(q.chapter_id) === 37 || Number(q.chapter_id) === 150 || /^\s*solutions?\s*$/i.test(raw)) return 'Solutions';
    if (Number(q.chapter_id) === 15 || Number(q.chapter_id) === 126 || /^\s*electrochemistry\s*$/i.test(raw)) return 'Electrochemistry';
    if (Number(q.chapter_id) === 185 || Number(q.chapter_id) === 40 || /redox/i.test(raw)) return 'Redox Reactions';
    if (Number(q.chapter_id) === 96 || Number(q.chapter_id) === 16 || /structure of atom/i.test(raw)) return 'Structure of Atom';
    if (Number(q.chapter_id) === 223 || Number(q.chapter_id) === 95 || /some basic concepts/i.test(raw)) return 'Some Basic Concepts of Chemistry';
    return raw;
  }

  const counts = {};
  for (const q of questions) {
    const ch = getQuestionChapter(q);
    counts[ch] = (counts[ch] || 0) + 1;
  }

  console.log('\n--- Live Chemistry PYQ Chapters Breakdown ---');
  for (const [ch, count] of Object.entries(counts)) {
    console.log(`  ${ch}: ${count} questions`);
  }

  const electroCount = counts['Electrochemistry'] || 0;
  console.log(`\nVerified Electrochemistry: ${electroCount} / 91`);

  if (electroCount === 91) {
    console.log('SUCCESS: All 91 Electrochemistry questions accurately resolved!');
  } else {
    console.error(`WARNING: Expected 91, got ${electroCount}`);
  }
}

main().catch(console.error);

