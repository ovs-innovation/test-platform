import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { HALOALKANES_QUESTIONS } from './haloalkanes_questions_data.mjs';
import { allPBlockQuestions as PBLOCK_QUESTIONS } from './pblock_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

function normalizeText(text) {
  if (!text) return '';
  return text
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, ' ') // remove latex commands
    .replace(/[^a-z0-9]/g, '')   // keep only alphanumeric
    .trim();
}

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const liveQuestions = data.questions || [];

  console.log(`Total live Chemistry questions: ${liveQuestions.length}`);

  // Map of normalized live question text to question object
  const liveMap = new Map();
  for (const q of liveQuestions) {
    const norm = normalizeText(q.question_text);
    if (norm) {
      if (!liveMap.has(norm)) {
        liveMap.set(norm, []);
      }
      liveMap.get(norm).push(q);
    }
  }

  console.log('\n=== Comparing Haloalkanes Questions (Total: ' + HALOALKANES_QUESTIONS.length + ') ===');
  let haloMatches = 0;
  let haloMissing = 0;
  const haloToInsert = [];
  const haloAlreadyLive = [];

  for (let i = 0; i < HALOALKANES_QUESTIONS.length; i++) {
    const q = HALOALKANES_QUESTIONS[i];
    const norm = normalizeText(q.question_text);
    const matched = liveMap.get(norm);
    if (matched && matched.length > 0) {
      haloMatches++;
      haloAlreadyLive.push({ localIdx: i + 1, liveId: matched[0].id, text: q.question_text.substring(0, 60), liveImage: matched[0].image_url });
    } else {
      haloMissing++;
      haloToInsert.push({ localIdx: i + 1, question: q });
    }
  }

  console.log(`Haloalkanes: ${haloMatches} already exist on live, ${haloMissing} missing from live.`);

  console.log('\n=== Comparing p-Block Questions (Total: ' + PBLOCK_QUESTIONS.length + ') ===');
  let pblockMatches = 0;
  let pblockMissing = 0;
  const pblockToInsert = [];
  const pblockAlreadyLive = [];

  for (let i = 0; i < PBLOCK_QUESTIONS.length; i++) {
    const q = PBLOCK_QUESTIONS[i];
    const norm = normalizeText(q.question_text);
    const matched = liveMap.get(norm);
    if (matched && matched.length > 0) {
      pblockMatches++;
      pblockAlreadyLive.push({ localIdx: i + 1, liveId: matched[0].id, text: q.question_text.substring(0, 60), liveImage: matched[0].image_url });
    } else {
      pblockMissing++;
      pblockToInsert.push({ localIdx: i + 1, question: q });
    }
  }

  console.log(`p-Block: ${pblockMatches} already exist on live, ${pblockMissing} missing from live.`);

  // Write comparison summary to a temp file for inspection
  fs.writeFileSync(
    path.resolve(__dirname, 'live_comparison_summary.json'),
    JSON.stringify({
      haloMatches,
      haloMissing,
      pblockMatches,
      pblockMissing,
      sampleHaloLive: haloAlreadyLive.slice(0, 10),
      sampleHaloMissing: haloToInsert.slice(0, 5).map(x => ({ idx: x.localIdx, text: x.question.question_text.substring(0, 60) })),
      samplePblockLive: pblockAlreadyLive.slice(0, 10),
      samplePblockMissing: pblockToInsert.slice(0, 5).map(x => ({ idx: x.localIdx, text: x.question.question_text.substring(0, 60) }))
    }, null, 2)
  );
  console.log('Saved live_comparison_summary.json');
}

main().catch(console.error);
