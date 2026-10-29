import { DF_BLOCK_QUESTIONS } from './df_block_questions_data.mjs';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

function normalize(str) {
  if (typeof str !== 'string') return '';
  return str
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[^a-z0-9]/g, '')
    .trim();
}

function parseOptions(opts) {
  if (!opts) return [];
  if (typeof opts === 'string') {
    try {
      opts = JSON.parse(opts);
    } catch {
      return [];
    }
  }
  if (!Array.isArray(opts)) return [];
  return opts.map(o => (typeof o === 'string' ? o : (o?.text || String(o || ''))));
}

// Calculate similarity between two strings
function similarity(s1, s2) {
  if (!s1 || !s2) return 0;
  if (s1 === s2) return 1;
  const longer = s1.length > s2.length ? s1 : s2;
  const shorter = s1.length > s2.length ? s2 : s1;
  if (longer.length === 0) return 1.0;
  
  if (longer.includes(shorter) && shorter.length >= 25) {
    return shorter.length / longer.length;
  }

  const getGrams = s => {
    const grams = new Set();
    for (let i = 0; i < s.length - 2; i++) grams.add(s.slice(i, i + 3));
    return grams;
  };
  const g1 = getGrams(s1);
  const g2 = getGrams(s2);
  let intersection = 0;
  for (const g of g1) if (g2.has(g)) intersection++;
  return intersection / (g1.size + g2.size - intersection);
}

function areOptionsMatching(opts1, opts2) {
  const parsed1 = parseOptions(opts1);
  const parsed2 = parseOptions(opts2);
  if (!parsed1.length || !parsed2.length) return false;
  const set1 = new Set(parsed1.map(o => normalize(o)).filter(Boolean));
  const set2 = new Set(parsed2.map(o => normalize(o)).filter(Boolean));
  let match = 0;
  for (const o of set1) {
    if (set2.has(o)) match++;
  }
  return match >= 2;
}

function isDuplicate(q, existingList) {
  const normQ = normalize(q.question_text);
  const isGeneric = [
    'whichofthefollowingstatementis',
    'findthecorrectstatement',
    'findtheincorrectstatement',
    'theincorrectstatementamongthe',
    'whichofthefollowingiscorrect',
    'whichofthefollowingisincorrect'
  ].some(prefix => normQ.startsWith(prefix));

  for (const ex of existingList) {
    const normEx = normalize(ex.question_text);
    if (!normEx) continue;
    
    // Exact normalized text match
    if (normQ === normEx) {
      return { match: true, existing: ex, reason: 'Exact text match' };
    }

    if (isGeneric) {
      if (areOptionsMatching(q.options, ex.options)) {
        return { match: true, existing: ex, reason: 'Generic text with matching options' };
      }
      if (normQ.length > 35 && normEx.length > 35 && similarity(normQ, normEx) > 0.85) {
        return { match: true, existing: ex, reason: 'High text similarity' };
      }
    } else {
      // Non-generic question
      const sim = similarity(normQ, normEx);
      if (sim > 0.70) {
        return { match: true, existing: ex, reason: `High text similarity (${(sim * 100).toFixed(0)}%)` };
      }
    }
  }

  return { match: false };
}

async function runCheck() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log('Fetching Neon DB Chemistry questions...');
  const neonRes = await pool.query(
    "SELECT id, chapter, question_text, options FROM question_bank WHERE category ILIKE 'Chemistry' OR subject ILIKE 'Chemistry'"
  );

  console.log('Fetching Live Platform Chemistry questions...');
  let liveQs = [];
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const { token } = await loginRes.json();
    let page = 1;
    while (true) {
      const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=500&page=${page}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      const qs = data.questions || [];
      if (!qs.length) break;
      liveQs.push(...qs);
      if (liveQs.length >= (data.pagination?.total || 0)) break;
      page++;
    }
  } catch (e) {
    console.error('Error fetching live:', e.message);
  }

  console.log(`\n=== Detailed Duplicate Analysis for ${DF_BLOCK_QUESTIONS.length} Questions ===\n`);

  let duplicateCount = 0;
  let newCount = 0;

  const toAdd = [];
  const dups = [];

  for (const q of DF_BLOCK_QUESTIONS) {
    const neonCheck = isDuplicate(q, neonRes.rows);
    const liveCheck = isDuplicate(q, liveQs);

    const isDup = neonCheck.match || liveCheck.match;
    if (isDup) {
      duplicateCount++;
      const matchedWith = liveCheck.match ? liveCheck : neonCheck;
      dups.push({ q, match: matchedWith });
      console.log(`[DUPLICATE] P.${q.page} Q#${q.original_q_no}: "${q.question_text.slice(0, 50)}..."`);
      console.log(`   -> Matched ID ${matchedWith.existing.id} in "${matchedWith.existing.chapter}" (${matchedWith.reason})`);
    } else {
      newCount++;
      toAdd.push(q);
      console.log(`[NEW] P.${q.page} Q#${q.original_q_no}: "${q.question_text.slice(0, 50)}..."`);
    }
  }

  console.log(`\n=== Summary ===`);
  console.log(`Total questions in batch: ${DF_BLOCK_QUESTIONS.length}`);
  console.log(`Already present (Skipped): ${duplicateCount}`);
  console.log(`New questions to add: ${newCount}`);

  await pool.end();
}

runCheck().catch(console.error);
