import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { DF_BLOCK_QUESTIONS } from './df_block_questions_data.mjs';

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

const GENERIC_PREFIXES = [
  'whichofthefollowingstatementis',
  'findthecorrectstatement',
  'findtheincorrectstatement',
  'theincorrectstatementamongthe',
  'whichofthefollowingiscorrect',
  'whichofthefollowingisincorrect'
];

function isLiveDuplicate(q, liveQuestions) {
  const normQ = normalize(q.question_text);
  const isGeneric = GENERIC_PREFIXES.some(p => normQ.startsWith(p));

  for (const ex of liveQuestions) {
    const normEx = normalize(ex.question_text);
    if (!normEx) continue;

    // Check if live question is related to d/f block or has ID in known range
    const exChapter = (ex.chapter || '').toLowerCase();
    const isDFRelated = exChapter.includes('d- and f') ||
                        exChapter.includes('d and f') ||
                        exChapter.includes('lanthanoid') ||
                        exChapter.includes('properties of d') ||
                        exChapter.includes('compounds of chromium') ||
                        exChapter.includes('compounds of mercury') ||
                        exChapter.includes('potassium dichromate') ||
                        exChapter.includes('group 12') ||
                        exChapter.includes('hydrides') ||
                        exChapter.includes('nuclei') ||
                        (ex.id >= 5595 && ex.id <= 5635);

    if (!isDFRelated) continue;

    // If it's a generic prompt ("Find the correct statement", etc.), match ONLY if options match
    if (isGeneric) {
      if (areOptionsMatching(q.options, ex.options)) {
        return { match: true, existing: ex, reason: 'Generic question with matching options' };
      }
    } else {
      // Non-generic question: exact match or high similarity
      if (normQ === normEx) {
        return { match: true, existing: ex, reason: 'Exact text match' };
      }
      const sim = similarity(normQ, normEx);
      if (sim > 0.70) {
        return { match: true, existing: ex, reason: `High text similarity (${(sim * 100).toFixed(0)}%)` };
      }
    }
  }

  return { match: false };
}

async function runImport() {
  console.log(`========================================================================`);
  console.log(`IMPORTING D- AND F-BLOCK QUESTIONS (${DF_BLOCK_QUESTIONS.length} Questions)`);
  console.log(`========================================================================\n`);

  const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  // -------------------------------------------------------------------------
  // STEP 1: Neon DB Setup
  // -------------------------------------------------------------------------
  console.log(`=== Step 1: Connecting to Neon Database ===`);
  const subjRes = await pool.query("SELECT id FROM subjects WHERE name ILIKE 'Chemistry' LIMIT 1");
  if (subjRes.rows.length === 0) throw new Error("Chemistry subject not found in Neon DB");
  const neonSubjId = subjRes.rows[0].id;
  const chapterName = 'The d- and f-Block Elements';

  let chapRes = await pool.query(
    "SELECT id, name FROM chapters WHERE subject_id = $1 AND name = $2 LIMIT 1",
    [neonSubjId, chapterName]
  );
  let neonChapId;
  if (chapRes.rows.length === 0) {
    const insChap = await pool.query(
      "INSERT INTO chapters (subject_id, name) VALUES ($1, $2) RETURNING id, name",
      [neonSubjId, chapterName]
    );
    neonChapId = insChap.rows[0].id;
    console.log(`Created chapter '${chapterName}' in Neon DB (ID: ${neonChapId})`);
  } else {
    neonChapId = chapRes.rows[0].id;
    console.log(`Using existing chapter '${chapRes.rows[0].name}' in Neon DB (ID: ${neonChapId})`);
  }

  const existingNeon = await pool.query(
    "SELECT id, chapter, question_text, options FROM question_bank WHERE chapter = $1",
    [chapterName]
  );
  console.log(`Existing questions in '${chapterName}' in Neon DB: ${existingNeon.rows.length}`);

  // -------------------------------------------------------------------------
  // STEP 2: Live Platform Setup & Existing Questions Fetch
  // -------------------------------------------------------------------------
  console.log(`\n=== Step 2: Authenticating with Live Platform (edvedum.com) ===`);
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) throw new Error(`Live platform login failed: ${await loginRes.text()}`);
  const { token } = await loginRes.json();
  console.log('Logged in successfully to edvedum.com');

  const liveSubsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const liveSubs = (await liveSubsRes.json()).subjects || [];
  const liveChem = liveSubs.find(s => s.name.toLowerCase() === 'chemistry');
  if (!liveChem) throw new Error("Chemistry subject not found on Live platform");
  const liveSubjId = liveChem.id;

  const liveChapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjId}/chapters`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const liveChaps = (await liveChapsRes.json()).chapters || [];
  let liveTargetChap = liveChaps.find(c => c.name.toLowerCase() === 'the d- and f-block elements');
  if (!liveTargetChap) {
    const createChapRes = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ subject_id: liveSubjId, name: chapterName })
    });
    const createData = await createChapRes.json();
    liveTargetChap = createData.chapter;
    console.log(`Created chapter '${chapterName}' on Live platform (ID: ${liveTargetChap?.id})`);
  } else {
    console.log(`Using existing chapter '${liveTargetChap.name}' on Live platform (ID: ${liveTargetChap.id})`);
  }

  let liveExistingQs = [];
  let page = 1;
  while (true) {
    const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=500&page=${page}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const d = await res.json();
    const qs = d.questions || [];
    if (!qs.length) break;
    liveExistingQs.push(...qs);
    if (liveExistingQs.length >= (d.pagination?.total || 0)) break;
    page++;
  }
  console.log(`Total live chemistry questions fetched: ${liveExistingQs.length}`);

  // -------------------------------------------------------------------------
  // STEP 3: Seeding Questions into Neon Database
  // -------------------------------------------------------------------------
  console.log(`\n=== Step 3: Seeding Questions into Neon Database ===`);
  let neonInserted = 0;
  let neonSkipped = 0;

  for (let i = 0; i < DF_BLOCK_QUESTIONS.length; i++) {
    const q = DF_BLOCK_QUESTIONS[i];
    // Check if already in Neon DB
    const normQ = normalize(q.question_text);
    const existingInNeon = existingNeon.rows.find(n => {
      const normN = normalize(n.question_text);
      if (normQ === normN) {
        if (GENERIC_PREFIXES.some(p => normQ.startsWith(p))) {
          return areOptionsMatching(q.options, n.options);
        }
        return true;
      }
      return false;
    });

    if (existingInNeon) {
      neonSkipped++;
      console.log(`[Neon Skip ${neonSkipped}] P.${q.page} Q#${q.original_q_no}: "${q.question_text.slice(0, 45)}..." (ID: ${existingInNeon.id})`);
    } else {
      const qType = q.question_type === 'assertion_reason' ? 'assertion_reason' : 'single_choice';
      await pool.query(
        `INSERT INTO question_bank (
           category, question_type, question_text, options, correct_index, correct_indices,
           numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution,
           subject_id, chapter_id, difficulty, image_url, chapter, topic, subject, status
         ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20)`,
        [
          'Chemistry',
          qType,
          q.question_text,
          JSON.stringify(q.options || []),
          q.correct_index,
          JSON.stringify([q.correct_index]),
          null,
          0,
          q.assertion_text || null,
          q.reason_text || null,
          q.marks || 4,
          q.solution || '',
          neonSubjId,
          neonChapId,
          q.difficulty || 'medium',
          '',
          chapterName,
          q.topic || chapterName,
          'Chemistry',
          'normal'
        ]
      );
      neonInserted++;
      console.log(`[Neon Insert ${neonInserted}/${DF_BLOCK_QUESTIONS.length}] P.${q.page} Q#${q.original_q_no}: "${q.question_text.slice(0, 45)}..."`);
    }
  }

  // -------------------------------------------------------------------------
  // STEP 4: Syncing Non-Duplicate Questions to Live Platform
  // -------------------------------------------------------------------------
  console.log(`\n=== Step 4: Syncing Non-Duplicate Questions to Live Platform ===`);
  let liveInserted = 0;
  let liveSkipped = 0;
  const skippedList = [];
  const insertedList = [];

  for (let i = 0; i < DF_BLOCK_QUESTIONS.length; i++) {
    const q = DF_BLOCK_QUESTIONS[i];
    const dupCheck = isLiveDuplicate(q, liveExistingQs);

    if (dupCheck.match) {
      liveSkipped++;
      skippedList.push({
        q_no: q.original_q_no,
        page: q.page,
        text: q.question_text.slice(0, 50),
        matchedId: dupCheck.existing.id,
        matchedChapter: dupCheck.existing.chapter,
        reason: dupCheck.reason
      });
      console.log(`[Live Skip ${liveSkipped}] P.${q.page} Q#${q.original_q_no}: "${q.question_text.slice(0, 40)}..." (Matched Live ID ${dupCheck.existing.id} in "${dupCheck.existing.chapter}")`);
    } else {
      const payload = {
        category: 'Chemistry',
        subject_id: liveSubjId,
        chapter_id: liveTargetChap.id,
        chapter: chapterName,
        topic: q.topic || chapterName,
        question_type: q.question_type || 'single_choice',
        question_text: q.question_text,
        options: q.options,
        correct_index: q.correct_index,
        correct_indices: [q.correct_index],
        marks: 4,
        difficulty: q.difficulty || 'medium',
        solution: q.solution || '',
        image_url: '',
        solution_image_url: '',
        assertion_text: q.assertion_text || null,
        reason_text: q.reason_text || null
      };

      let uploaded = false;
      let retries = 3;
      while (retries > 0 && !uploaded) {
        try {
          const upRes = await fetch(`${LIVE_API}/question-bank`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
          });

          if (upRes.ok) {
            const upData = await upRes.json();
            uploaded = true;
            liveInserted++;
            insertedList.push({
              q_no: q.original_q_no,
              page: q.page,
              text: q.question_text.slice(0, 50),
              id: upData.question?.id
            });
            console.log(`[Live Insert ${liveInserted}] P.${q.page} Q#${q.original_q_no}: "${q.question_text.slice(0, 40)}..." (ID: ${upData.question?.id || 'OK'})`);
          } else {
            console.warn(`[Live Upload Error] Status ${upRes.status}: ${await upRes.text()}`);
            retries--;
            if (retries > 0) await new Promise(r => setTimeout(r, 1000));
          }
        } catch (err) {
          console.warn(`[Live Network Error]: ${err.message}`);
          retries--;
          if (retries > 0) await new Promise(r => setTimeout(r, 1000));
        }
      }
    }
  }

  // -------------------------------------------------------------------------
  // FINAL SUMMARY
  // -------------------------------------------------------------------------
  console.log(`\n========================================================================`);
  console.log(`FINAL IMPORT SUMMARY`);
  console.log(`========================================================================`);
  console.log(`Total questions in worksheet images: ${DF_BLOCK_QUESTIONS.length}`);
  console.log(`\nNeon Database (${chapterName}):`);
  console.log(`   - Newly Inserted: ${neonInserted}`);
  console.log(`   - Skipped (Already in Neon): ${neonSkipped}`);
  console.log(`\nLive Platform (edvedum.com):`);
  console.log(`   - Newly Inserted: ${liveInserted}`);
  console.log(`   - Skipped (Already Present): ${liveSkipped}`);
  console.log(`========================================================================\n`);

  await pool.end();
}

runImport().catch(err => {
  console.error('Fatal Import Error:', err);
  process.exit(1);
});
