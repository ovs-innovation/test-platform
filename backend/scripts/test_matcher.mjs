import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { HALOALKANES_QUESTIONS } from './haloalkanes_questions_data.mjs';

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

function normalizeKeyWords(s) {
  if (s == null) return '';
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['which', 'following', 'statement', 'correct', 'incorrect', 'reaction', 'product', 'major', 'order', 'among'].includes(w));
}

function isMatch(localQ, liveQ) {
  const lText = cleanStr(liveQ.question_text);
  const qText = cleanStr(localQ.question_text);

  // Exact alphanumeric match
  if (qText.length > 20 && lText.length > 20 && (qText === lText || qText.startsWith(lText.substring(0, 45)) || lText.startsWith(qText.substring(0, 45)))) {
    return true;
  }

  // Check options
  const liveOpts = Array.isArray(liveQ.options) ? liveQ.options : JSON.parse(liveQ.options || '[]');
  const localOpts = localQ.options || [];

  let matchingOpts = 0;
  for (let i = 0; i < Math.min(localOpts.length, liveOpts.length); i++) {
    const locClean = cleanStr(localOpts[i].text || localOpts[i]);
    const livClean = cleanStr(liveOpts[i].text || liveOpts[i]);
    if (locClean && livClean && locClean === livClean && locClean.length > 6) {
      matchingOpts++;
    }
  }
  if (matchingOpts >= 2) return true;

  // Keyword overlap + 1 matching option
  const kwLoc = normalizeKeyWords(localQ.question_text);
  const kwLiv = normalizeKeyWords(liveQ.question_text);
  const overlap = kwLoc.filter(w => kwLiv.includes(w));
  if (overlap.length >= 3 && matchingOpts >= 1) return true;

  // If question text has a distinctive chemical formula / name
  if (overlap.length >= 4 && (qText.substring(0, 20) === lText.substring(0, 20))) return true;

  return false;
}

async function main() {
  let token;
  const tokenFile = path.resolve(__dirname, 'live_token.json');
  if (fs.existsSync(tokenFile)) {
    token = JSON.parse(fs.readFileSync(tokenFile, 'utf8')).token;
  } else {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    token = (await loginRes.json()).token;
  }
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await qbRes.json();
  const allLive = data.questions || [];
  const haloLive = allLive.filter(q => (q.chapter || '').toLowerCase().includes('haloalkanes'));

  console.log(`Checking ${haloLive.length} live Haloalkanes questions...`);
  let matchedCount = 0;
  haloLive.forEach((lq, i) => {
    const matched = HALOALKANES_QUESTIONS.find(hq => isMatch(hq, lq));
    if (matched) {
      matchedCount++;
    } else {
      console.log(`Live [${i+1}] ID ${lq.id} unmatched: "${lq.question_text.replace(/\n/g, ' ').substring(0, 60)}"`);
    }
  });

  console.log(`\nMatched: ${matchedCount} / ${haloLive.length}`);
}

main().catch(console.error);
