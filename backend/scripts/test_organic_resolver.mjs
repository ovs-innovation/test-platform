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

// Emulate frontend resolution logic
const CHEMISTRY_STANDARD_11 = [
  'Some Basic Concepts of Chemistry',
  'Structure of Atom',
  'Periodic Table and Periodicity',
  'Chemical Bonding',
  'Thermodynamics',
  'Chemical Equilibrium',
  'Ionic Equilibrium',
  'Equilibrium',
  'Redox Reactions',
  'The p-Block Elements (Gr. 13 & 14)',
  'Organic Chemistry - Some Basic Principles and Techniques',
  'Solutions',
  'Electrochemistry',
  'Chemical Kinetics',
  'The p-Block Elements',
  'The d- and f-Block Elements',
  'Coordination Compounds',
  'Haloalkanes and Haloarenes',
  'Alcohols, Phenols and Ethers',
  'Aldehydes, Ketones and Carboxylic Acids',
  'Amines',
  'Biomolecules'
];

function normChapterKey(s) {
  if (!s) return '';
  let str = String(s).toLowerCase().replace(/&/g, 'and').replace(/[-:]/g, ' ');
  str = str.replace(/\((?![^)]*\d)[^)]*\)/g, '');
  return str.replace(/[^a-z0-9]/g, '');
}

function formatChapterName(str) {
  if (!str) return 'General';
  const trimmed = String(str).trim();
  const normalized = normChapterKey(trimmed);
  const matched = CHEMISTRY_STANDARD_11.find((ch) => normChapterKey(ch) === normalized);
  if (matched) return matched;
  if (/organic chemistry.*basic|some basic concepts? of organic|principles and techniques|basic principles.*organic/i.test(trimmed)) {
    return 'Organic Chemistry - Some Basic Principles and Techniques';
  }
  return trimmed;
}

function getQuestionChapter(q) {
  const raw = (q.chapter_name || q.chapter || 'General').trim();
  if (
    Number(q.chapter_id) === 167 ||
    Number(q.chapter_id) === 249 ||
    /organic chemistry.*basic|some basic concepts? of organic|principles and techniques|basic principles.*organic/i.test(raw)
  ) {
    return 'Organic Chemistry - Some Basic Principles and Techniques';
  }
  return formatChapterName(raw);
}

async function main() {
  const token = await getToken();
  console.log('Fetching live questions for Chemistry...');
  const res = await fetch(`${LIVE_API}/question-bank?category=PYQ&subject_id=6&limit=3500`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const questions = data.questions || data.data || [];
  console.log(`Total Live Chemistry PYQ questions: ${questions.length}`);

  let count = 0;
  for (const q of questions) {
    const ch = getQuestionChapter(q);
    if (ch === 'Organic Chemistry - Some Basic Principles and Techniques') {
      count++;
    }
  }

  console.log(`Resolved count for 'Organic Chemistry - Some Basic Principles and Techniques': ${count}`);
}

main().catch(console.error);
