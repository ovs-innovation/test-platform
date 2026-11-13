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

function getQuestionChapter(q) {
  const raw = String(q.chapter || q.chapter_name || '').trim();

  if (
    Number(q.chapter_id) === 127 ||
    Number(q.chapter_id) === 67 ||
    Number(q.chapter_id) === 95 ||
    Number(q.chapter_id) === 223 ||
    Number(q.chapter_id) === 84 ||
    /some basic concepts? of chemistry/i.test(raw) ||
    /basic concepts? of chemistry/i.test(raw) ||
    /mole concept/i.test(raw)
  ) return 'Some Basic Concepts of Chemistry';

  if (
    Number(q.chapter_id) === 77 ||
    Number(q.chapter_id) === 96 ||
    Number(q.chapter_id) === 16 ||
    /structure of atoms?/i.test(raw) ||
    /atomic structure/i.test(raw)
  ) return 'Structure of Atom';

  if (
    Number(q.chapter_id) === 10 ||
    Number(q.chapter_id) === 155 ||
    Number(q.chapter_id) === 83 ||
    Number(q.chapter_id) === 68 ||
    (Number(q.id) >= 14591 && Number(q.id) <= 14777) ||
    (Number(q.id) >= 6061 && Number(q.id) <= 6247 && (Number(q.chapter_id) === 155 || /periodic/i.test(q.chapter || ''))) ||
    /classification of elements|periodic\s*table|periodicity/i.test(raw)
  ) return 'Periodic Table and Periodicity';

  if (
    Number(q.chapter_id) === 11 ||
    Number(q.chapter_id) === 139 ||
    Number(q.chapter_id) === 204 ||
    /chemical\s*equilibrium/i.test(raw)
  ) return 'Chemical Equilibrium';

  if (
    Number(q.chapter_id) === 13 ||
    Number(q.chapter_id) === 205 ||
    /ionic\s*equilibrium/i.test(raw)
  ) return 'Ionic Equilibrium';

  if (
    Number(q.chapter_id) === 128 ||
    Number(q.chapter_id) === 185 ||
    Number(q.chapter_id) === 40 ||
    /redox/i.test(raw)
  ) return 'Redox Reactions';

  if (
    Number(q.chapter_id) === 37 ||
    Number(q.chapter_id) === 25 ||
    Number(q.chapter_id) === 18 ||
    Number(q.chapter_id) === 150 ||
    /solutions/i.test(raw)
  ) return 'Solutions';

  if (
    Number(q.chapter_id) === 15 ||
    Number(q.chapter_id) === 126 ||
    Number(q.chapter_id) === 71 ||
    /electrochemistry/i.test(raw)
  ) return 'Electrochemistry';

  return raw || 'Unknown';
}

async function main() {
  console.log('--- Testing Live API PYQ Chapter Counts for Chemistry ---');
  const token = await getToken();
  const qRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await qRes.json();
  const list = data.questions || data.data || [];
  console.log(`Total Live Chemistry PYQ fetched: ${list.length}`);

  const counts = {};
  for (const q of list) {
    const ch = getQuestionChapter(q);
    counts[ch] = (counts[ch] || 0) + 1;
  }

  console.log('Chapter Breakdown:');
  for (const [ch, count] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  - ${ch}: ${count}`);
  }
}

main().catch(console.error);

