import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { HALOALKANES_QUESTIONS } from './haloalkanes_questions_data.mjs';
import { allPBlockQuestions } from './pblock_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

function cleanStr(s) {
  if (s == null) return '';
  return String(s)
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[^a-z0-9]/g, '');
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

  const haloLive = liveQuestions.filter(q => (q.chapter || '').toLowerCase().includes('haloalkanes'));
  const pblockLive = liveQuestions.filter(q => (q.chapter || '').toLowerCase().includes('p-block') || (q.chapter || '').toLowerCase().includes('p block'));

  console.log(`Live Haloalkanes questions: ${haloLive.length}`);
  console.log(`Live p-Block questions: ${pblockLive.length}`);

  // Match Haloalkanes by option content or substring
  console.log('\n--- Haloalkanes Matching ---');
  let haloFound = 0;
  let haloMissing = [];

  for (let i = 0; i < HALOALKANES_QUESTIONS.length; i++) {
    const localQ = HALOALKANES_QUESTIONS[i];
    const localOpt0 = cleanStr(localQ.options[0]);
    const localOpt1 = cleanStr(localQ.options[1]);
    const localText = cleanStr(localQ.question_text);

    // Try to find matching live question
    const matched = haloLive.find(lq => {
      const lText = cleanStr(lq.question_text);
      const lOpts = Array.isArray(lq.options) ? lq.options : JSON.parse(lq.options || '[]');
      const lOpt0 = cleanStr(lOpts[0]);
      const lOpt1 = cleanStr(lOpts[1]);

      // Match condition 1: text contains or is contained
      if (localText && lText && (localText.includes(lText.substring(0, 30)) || lText.includes(localText.substring(0, 30)))) {
        return true;
      }
      // Match condition 2: options match
      if (localOpt0 && lOpt0 && localOpt0 === lOpt0) {
        return true;
      }
      if (localOpt1 && lOpt1 && localOpt1 === lOpt1) {
        return true;
      }
      return false;
    });

    if (matched) {
      haloFound++;
    } else {
      haloMissing.push({ index: i + 1, text: localQ.question_text.substring(0, 80), image_url: localQ.image_url });
    }
  }

  console.log(`Haloalkanes: ${haloFound} matched with live, ${haloMissing.length} not found on live.`);
  if (haloMissing.length > 0) {
    console.log(`First 5 missing Haloalkanes:`, haloMissing.slice(0, 5));
  }

  // Match p-Block
  console.log('\n--- p-Block Matching ---');
  let pblockFound = 0;
  let pblockMissing = [];
  let pblockMatchesList = [];

  for (let i = 0; i < allPBlockQuestions.length; i++) {
    const localQ = allPBlockQuestions[i];
    const localOpt0 = cleanStr(localQ.options[0]);
    const localText = cleanStr(localQ.question_text);

    const matched = liveQuestions.find(lq => {
      const lText = cleanStr(lq.question_text);
      const lOpts = Array.isArray(lq.options) ? lq.options : JSON.parse(lq.options || '[]');
      const lOpt0 = cleanStr(lOpts[0]);

      if (localText.length > 25 && lText.length > 25) {
        if (localText.includes(lText.substring(0, 40)) || lText.includes(localText.substring(0, 40))) {
          return true;
        }
      }
      if (localOpt0 && lOpt0 && localOpt0.length > 15 && localOpt0 === lOpt0) {
        return true;
      }
      return false;
    });

    if (matched) {
      pblockFound++;
      pblockMatchesList.push({
        idx: i + 1,
        localText: localQ.question_text.substring(0, 50),
        liveId: matched.id,
        liveChapter: matched.chapter,
        liveText: matched.question_text.substring(0, 50)
      });
    } else {
      pblockMissing.push({ index: i + 1, text: localQ.question_text.substring(0, 80), image_url: localQ.image_url });
    }
  }

  console.log(`p-Block: ${pblockFound} matched with live, ${pblockMissing.length} not found on live.`);
  console.log('Sample matched p-Block questions:');
  pblockMatchesList.slice(0, 10).forEach(m => {
    console.log(`  Local Q${m.idx}: "${m.localText}" <--> Live ID ${m.liveId} (${m.liveChapter}): "${m.liveText}"`);
  });
}

main().catch(console.error);
