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

const cloudinaryMap = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'cloudinary_diagrams_map.json'), 'utf-8')
);

function getCdnUrl(localImg) {
  if (!localImg) return '';
  if (localImg.startsWith('http://') || localImg.startsWith('https://')) return localImg;
  return cloudinaryMap[localImg] || localImg;
}

function cleanStr(s) {
  if (s == null) return '';
  return String(s)
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[^a-z0-9]/g, '');
}

function findMatch(q, liveQuestions) {
  const qTextClean = cleanStr(q.question_text);
  const qOpt0Clean = q.options && q.options[0] ? cleanStr(q.options[0].text || q.options[0]) : '';
  const qOpt1Clean = q.options && q.options[1] ? cleanStr(q.options[1].text || q.options[1]) : '';

  for (const lq of liveQuestions) {
    const lTextClean = cleanStr(lq.question_text);
    const lOpts = Array.isArray(lq.options) ? lq.options : JSON.parse(lq.options || '[]');
    const lOpt0Clean = lOpts[0] ? cleanStr(lOpts[0].text || lOpts[0]) : '';
    const lOpt1Clean = lOpts[1] ? cleanStr(lOpts[1].text || lOpts[1]) : '';

    // Condition 1: Exact or near-exact question text match (if text is > 25 chars)
    if (qTextClean.length >= 25 && lTextClean.length >= 25) {
      if (qTextClean === lTextClean) return lq;
      if (qTextClean.startsWith(lTextClean.substring(0, 45)) || lTextClean.startsWith(qTextClean.substring(0, 45))) {
        return lq;
      }
    }

    // Condition 2: Question text has common 30-char substring AND at least one option matches
    if (qTextClean.length >= 30 && lTextClean.length >= 30) {
      const sub = qTextClean.substring(0, 30);
      if (lTextClean.includes(sub)) {
        if ((qOpt0Clean && qOpt0Clean === lOpt0Clean) || (qOpt1Clean && qOpt1Clean === lOpt1Clean)) {
          return lq;
        }
      }
    }

    // Condition 3: Both Option 0 and Option 1 match exactly (if lengths > 8)
    if (qOpt0Clean && lOpt0Clean && qOpt0Clean.length > 8 && qOpt0Clean === lOpt0Clean) {
      if (qOpt1Clean && lOpt1Clean && qOpt1Clean.length > 8 && qOpt1Clean === lOpt1Clean) {
        return lq;
      }
    }
  }

  return null;
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

  console.log(`Live Chemistry Total Questions: ${liveQuestions.length}`);

  // 1. Analyze Haloalkanes
  console.log('\n=== PREVIEW: Haloalkanes and Haloarenes ===');
  let haloInsert = [];
  let haloUpdateImage = [];
  let haloSkip = [];

  for (let i = 0; i < HALOALKANES_QUESTIONS.length; i++) {
    const q = HALOALKANES_QUESTIONS[i];
    const cdnUrl = getCdnUrl(q.image_url);
    const matched = findMatch(q, liveQuestions);

    if (matched) {
      if (cdnUrl && (!matched.image_url || matched.image_url.trim() === '')) {
        haloUpdateImage.push({ localIdx: i + 1, liveId: matched.id, cdnUrl, text: q.question_text.substring(0, 60) });
      } else {
        haloSkip.push({ localIdx: i + 1, liveId: matched.id, text: q.question_text.substring(0, 60), liveImage: matched.image_url });
      }
    } else {
      haloInsert.push({ localIdx: i + 1, cdnUrl, text: q.question_text.substring(0, 60) });
    }
  }

  console.log(`Haloalkanes - Insert: ${haloInsert.length}, Update Diagram: ${haloUpdateImage.length}, Skip (already on live): ${haloSkip.length}`);
  console.log(`Total accounted for: ${haloInsert.length + haloUpdateImage.length + haloSkip.length} / ${HALOALKANES_QUESTIONS.length}`);

  // 2. Analyze p-Block
  console.log('\n=== PREVIEW: The p-Block Elements ===');
  let pblockInsert = [];
  let pblockUpdateImage = [];
  let pblockSkip = [];

  // Deduplicate local p-block list first
  const seenTexts = new Set();
  const uniquePblock = [];
  for (const q of allPBlockQuestions) {
    const norm = cleanStr(q.question_text);
    if (!seenTexts.has(norm)) {
      seenTexts.add(norm);
      uniquePblock.push(q);
    }
  }

  for (let i = 0; i < uniquePblock.length; i++) {
    const q = uniquePblock[i];
    const cdnUrl = getCdnUrl(q.image_url);
    const matched = findMatch(q, liveQuestions);

    if (matched) {
      if (cdnUrl && (!matched.image_url || matched.image_url.trim() === '')) {
        pblockUpdateImage.push({ localIdx: i + 1, liveId: matched.id, cdnUrl, text: q.question_text.substring(0, 60) });
      } else {
        pblockSkip.push({ localIdx: i + 1, liveId: matched.id, text: q.question_text.substring(0, 60), liveImage: matched.image_url });
      }
    } else {
      pblockInsert.push({ localIdx: i + 1, cdnUrl, text: q.question_text.substring(0, 60) });
    }
  }

  console.log(`p-Block - Insert: ${pblockInsert.length}, Update Diagram: ${pblockUpdateImage.length}, Skip (already on live): ${pblockSkip.length}`);
  console.log(`Total accounted for: ${pblockInsert.length + pblockUpdateImage.length + pblockSkip.length} / ${uniquePblock.length}`);

  console.log('\nSample Haloalkanes to Insert:', haloInsert.slice(0, 5));
  console.log('\nSample p-Block to Insert:', pblockInsert.slice(0, 5));
  console.log('\nSample Haloalkanes with Diagram Update:', haloUpdateImage.slice(0, 5));
  console.log('\nSample p-Block with Diagram Update:', pblockUpdateImage.slice(0, 5));
}

main().catch(console.error);
