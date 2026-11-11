import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

function getQuestionChapter(q) {
  const raw = (q.chapter || q.chapter_name || '').trim();

  // Scoped resolver rules from QuestionBank.jsx
  if (
    Number(q.chapter_id) === 95 ||
    /some basic concepts? of chemistry/i.test(raw) ||
    /mole concept/i.test(raw)
  ) return 'Some Basic Concepts of Chemistry';

  if (
    Number(q.chapter_id) === 96 ||
    Number(q.chapter_id) === 16 ||
    /structure of atoms?/i.test(raw) ||
    /atomic structure/i.test(raw)
  ) return 'Structure of Atom';

  if (
    Number(q.chapter_id) === 83 ||
    Number(q.chapter_id) === 17 ||
    /periodic table|classification of elements/i.test(raw)
  ) return 'Periodic Table and Periodicity';

  if (
    Number(q.chapter_id) === 20 ||
    /chemical\s*bonding|bonding/i.test(raw)
  ) return 'Chemical Bonding';

  if (
    Number(q.chapter_id) === 11 ||
    Number(q.chapter_id) === 139 ||
    /chemical\s*equilibrium/i.test(raw)
  ) return 'Chemical Equilibrium';

  if (
    Number(q.chapter_id) === 13 ||
    Number(q.chapter_id) === 205 ||
    /ionic\s*equilibrium/i.test(raw)
  ) return 'Ionic Equilibrium';

  if (
    (Number(q.id) >= 14327 && Number(q.id) <= 14590) ||
    (Number(q.chapter_id) === 73 && Number(q.id) >= 5797 && Number(q.id) <= 6060) ||
    Number(q.chapter_id) === 146 ||
    /equilibrium/i.test(raw)
  ) return 'Equilibrium';

  if (
    Number(q.chapter_id) === 37 ||
    Number(q.chapter_id) === 150 ||
    /^\s*solutions?\s*$/i.test(raw)
  ) return 'Solutions';

  if (
    Number(q.chapter_id) === 36 ||
    Number(q.chapter_id) === 133 ||
    /^\s*biomolecules?\s*$/i.test(raw)
  ) return 'Biomolecules';

  if (Number(q.chapter_id) === 15 || Number(q.chapter_id) === 126 || /^\s*electrochemistry\s*$/i.test(raw)) return 'Electrochemistry';

  if (
    Number(q.chapter_id) === 14 ||
    Number(q.chapter_id) === 21 ||
    /chemical\s*kinetics|kinetics/i.test(raw)
  ) return 'Chemical Kinetics';

  if (
    Number(q.chapter_id) === 185 ||
    Number(q.chapter_id) === 40 ||
    /redox/i.test(raw)
  ) return 'Redox Reactions';

  if (
    Number(q.chapter_id) === 204 ||
    Number(q.chapter_id) === 151 ||
    /d[- ]?(and|&)?[- ]?f[- ]block/i.test(raw)
  ) return 'The d- and f-Block Elements';

  return raw;
}

async function main() {
  console.log('--- TESTING D AND F BLOCK RESOLVER ON LOCAL & LIVE ---');

  // Check Local Neon DB
  const client = await pool.connect();
  const localRes = await client.query(
    "SELECT count(*)::int as count FROM question_bank WHERE category = 'PYQ' AND (chapter_id = 151 OR LOWER(chapter) LIKE '%d%f%block%')"
  );
  console.log(`Local Neon DB d and f Block PYQ questions count: ${localRes.rows[0].count} / 105`);
  client.release();
  await pool.end();

  // Check Live API
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || data.data || [];

  const chemQs = questions.filter(q => Number(q.subject_id) === 6 || (q.subject || '').toLowerCase() === 'chemistry');
  console.log(`Total live Chemistry PYQs: ${chemQs.length}`);

  const counts = {};
  chemQs.forEach(q => {
    const ch = getQuestionChapter(q);
    counts[ch] = (counts[ch] || 0) + 1;
  });

  console.log('\nLive Resolved Chemistry Chapter Counts:');
  Object.keys(counts).sort().forEach(ch => {
    console.log(`  - ${ch}: ${counts[ch]}`);
  });

  const dfCount = counts['The d- and f-Block Elements'] || 0;
  console.log(`\nThe d- and f-Block Elements resolved count: ${dfCount} / 105`);

  if (dfCount === 105) {
    console.log('SUCCESS: Exactly 105 / 105 d- and f-Block questions resolved on Live platform!');
  } else {
    console.warn(`WARNING: Expected 105, got ${dfCount}`);
  }
}

main().catch(console.error);

