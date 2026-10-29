import { DF_BLOCK_QUESTIONS } from './df_block_questions_data.mjs';
import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '') // remove latex commands like \text, \longrightarrow
    .replace(/[^a-z0-9]/g, '')   // remove all spaces and non-alphanumeric chars
    .trim();
}

async function previewDuplicates() {
  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  console.log(`Loaded ${DF_BLOCK_QUESTIONS.length} questions from data file.`);

  // 1. Neon DB check
  const neonRes = await pool.query(
    "SELECT id, chapter, question_text FROM question_bank WHERE category ILIKE 'Chemistry' OR subject ILIKE 'Chemistry'"
  );
  console.log(`Existing Neon DB Chemistry questions: ${neonRes.rows.length}`);

  // 2. Live Platform check
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
  console.log(`Existing Live Platform Chemistry questions: ${liveQs.length}`);

  console.log('\n--- MATCHING RESULTS ---');
  let neonMatches = 0;
  let liveMatches = 0;

  for (const q of DF_BLOCK_QUESTIONS) {
    const normQ = normalizeText(q.question_text);
    // Find match in Neon
    const neonMatch = neonRes.rows.find(n => {
      const normN = normalizeText(n.question_text);
      return normN.includes(normQ.slice(0, 40)) || normQ.includes(normN.slice(0, 40));
    });

    // Find match in Live
    const liveMatch = liveQs.find(l => {
      const normL = normalizeText(l.question_text);
      return normL.includes(normQ.slice(0, 40)) || normQ.includes(normL.slice(0, 40));
    });

    if (neonMatch) neonMatches++;
    if (liveMatch) liveMatches++;

    if (neonMatch || liveMatch) {
      console.log(`[DUPLICATE] Page ${q.page} Q#${q.original_q_no}: "${q.question_text.slice(0, 50)}..."`);
      if (neonMatch) console.log(`   -> Neon DB ID ${neonMatch.id} [Chapter: ${neonMatch.chapter}]`);
      if (liveMatch) console.log(`   -> Live Platform ID ${liveMatch.id} [Chapter: ${liveMatch.chapter}]`);
    } else {
      // console.log(`[NEW] Page ${q.page} Q#${q.original_q_no}: "${q.question_text.slice(0, 45)}..."`);
    }
  }

  console.log(`\nSummary:`);
  console.log(`Total questions in batch: ${DF_BLOCK_QUESTIONS.length}`);
  console.log(`Neon duplicates: ${neonMatches}, New for Neon: ${DF_BLOCK_QUESTIONS.length - neonMatches}`);
  console.log(`Live duplicates: ${liveMatches}, New for Live: ${DF_BLOCK_QUESTIONS.length - liveMatches}`);

  await pool.end();
}

previewDuplicates().catch(console.error);
