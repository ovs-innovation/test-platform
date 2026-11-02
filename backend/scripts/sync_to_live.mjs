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

// Load Cloudinary mapping
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

function extractKeywords(s) {
  if (!s) return [];
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 3 && !['which', 'following', 'statement', 'correct', 'incorrect', 'reaction', 'product', 'major', 'order', 'among', 'select', 'given', 'reacts'].includes(w));
}

function findExistingMatch(candidate, liveQuestions) {
  const cTextClean = cleanStr(candidate.question_text);
  const cOpts = (candidate.options || []).map(o => cleanStr(typeof o === 'object' ? o.text : o));
  const cKeywords = extractKeywords(candidate.question_text);

  // Extract diagram tag if present (e.g. halo_q9_ or /q9/)
  let candidateTag = null;
  if (candidate.image_url) {
    const m = candidate.image_url.match(/q\d+/);
    if (m) candidateTag = m[0];
  }

  for (const lq of liveQuestions) {
    const lTextClean = cleanStr(lq.question_text);
    const lRawOpts = Array.isArray(lq.options) ? lq.options : JSON.parse(lq.options || '[]');
    const lOpts = lRawOpts.map(o => cleanStr(typeof o === 'object' ? o.text : o));

    // 1. Tag match in image URL (if previous upload saved it as /qXX/)
    if (candidateTag && lq.image_url) {
      const lm = lq.image_url.match(/q\d+/);
      if (lm && lm[0] === candidateTag) {
        return lq;
      }
    }

    // 2. High confidence question text match
    if (cTextClean.length >= 25 && lTextClean.length >= 25) {
      if (cTextClean === lTextClean) return lq;
      if (cTextClean.startsWith(lTextClean.substring(0, 45)) || lTextClean.startsWith(cTextClean.substring(0, 45))) {
        return lq;
      }
    }

    // 3. Substring match + option match
    if (cTextClean.length >= 30 && lTextClean.length >= 30) {
      const sub = cTextClean.substring(0, 30);
      if (lTextClean.includes(sub)) {
        if (cOpts[0] && lOpts[0] && cOpts[0] === lOpts[0]) return lq;
        if (cOpts[1] && lOpts[1] && cOpts[1] === lOpts[1]) return lq;
      }
    }

    // 4. Multiple matching options (> 2 options match exactly)
    let matchingOpts = 0;
    for (const co of cOpts) {
      if (co.length > 6 && lOpts.includes(co)) {
        matchingOpts++;
      }
    }
    if (matchingOpts >= 2) {
      return lq;
    }

    // 5. Keyword overlap + at least 1 matching option
    const lKeywords = extractKeywords(lq.question_text);
    const overlap = cKeywords.filter(w => lKeywords.includes(w));
    if (overlap.length >= 4 && matchingOpts >= 1) {
      return lq;
    }
  }

  return null;
}

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function getAuthToken() {
  const tokenFile = path.resolve(__dirname, 'live_token.json');
  if (fs.existsSync(tokenFile)) {
    try {
      const { token, time } = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
      if (Date.now() - time < 3600000) { // 1 hour validity
        return token;
      }
    } catch (_) {}
  }

  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });

  if (!loginRes.ok) {
    throw new Error(`Login failed (${loginRes.status}): ${await loginRes.text()}`);
  }

  const { token } = await loginRes.json();
  fs.writeFileSync(tokenFile, JSON.stringify({ token, time: Date.now() }));
  return token;
}

async function main() {
  console.log('=== STARTING SYNC TO LIVE (edvedum.com) ===');
  const token = await getAuthToken();
  console.log('Admin authenticated with live API.');

  // Fetch all current Chemistry questions
  console.log('Fetching live Chemistry questions...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!qbRes.ok) {
    throw new Error(`Failed to fetch live questions: ${qbRes.status} ${await qbRes.text()}`);
  }
  const qbData = await qbRes.json();
  let liveQuestions = qbData.questions || [];
  console.log(`Current live Chemistry questions: ${liveQuestions.length}`);

  // ==========================================
  // PHASE 1: Sync Haloalkanes and Haloarenes
  // ==========================================
  console.log('\n======================================================');
  console.log(`PHASE 1: Synchronizing Haloalkanes and Haloarenes (${HALOALKANES_QUESTIONS.length} questions)...`);
  console.log('======================================================');

  let haloInserted = 0;
  let haloUpdated = 0;
  let haloSkipped = 0;

  for (let i = 0; i < HALOALKANES_QUESTIONS.length; i++) {
    const q = HALOALKANES_QUESTIONS[i];
    const cdnUrl = getCdnUrl(q.image_url);
    const existing = findExistingMatch(q, liveQuestions);

    if (existing) {
      const needsImageUpdate = cdnUrl && (!existing.image_url || existing.image_url.trim() === '');
      const needsSolutionUpdate = q.solution && (!existing.solution || existing.solution.trim() === '');
      const needsChapterFix = existing.chapter_id !== 34;

      if (needsImageUpdate || needsSolutionUpdate || needsChapterFix) {
        const updatePayload = {
          ...existing,
          category: 'Chemistry',
          subject_id: 6,
          chapter_id: 34,
          chapter: 'Haloalkanes and Haloarenes',
          topic: existing.topic || q.topic || 'Haloalkanes and Haloarenes',
          image_url: cdnUrl || existing.image_url || '',
          solution: q.solution || existing.solution || ''
        };

        const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatePayload)
        });

        if (putRes.ok) {
          haloUpdated++;
          console.log(`[UPDATED] Halo Q${i + 1} -> Live ID ${existing.id} (image: ${cdnUrl ? 'Cloudinary attached' : 'retained'})`);
          existing.image_url = updatePayload.image_url;
          existing.solution = updatePayload.solution;
          existing.chapter_id = 34;
        } else {
          console.warn(`[UPDATE FAILED] Live ID ${existing.id}: ${putRes.status} ${await putRes.text()}`);
        }
      } else {
        haloSkipped++;
        // console.log(`[SKIP DUPLICATE] Halo Q${i + 1} matches Live ID ${existing.id}`);
      }
    } else {
      // Insert new question
      const postPayload = {
        category: 'Chemistry',
        question_type: q.question_type || 'mcq',
        question_text: q.question_text,
        options: q.options,
        correct_index: q.correct_index,
        marks: q.marks || 4,
        difficulty: q.difficulty || 'medium',
        solution: q.solution || '',
        subject_id: 6,
        chapter_id: 34,
        chapter: 'Haloalkanes and Haloarenes',
        topic: q.topic || 'Haloalkanes and Haloarenes',
        image_url: cdnUrl || ''
      };

      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postPayload)
      });

      if (postRes.ok) {
        const created = await postRes.json();
        haloInserted++;
        console.log(`[INSERTED] Halo Q${i + 1} as new Live ID ${created.question?.id} (image: ${cdnUrl ? 'Cloudinary attached' : 'none'})`);
        liveQuestions.push(created.question);
      } else {
        console.error(`[INSERT FAILED] Halo Q${i + 1}: ${postRes.status} ${await postRes.text()}`);
      }
    }

    await sleep(60); // polite throttling
  }

  console.log(`\nHaloalkanes Summary: ${haloInserted} inserted, ${haloUpdated} updated with diagram/solution, ${haloSkipped} skipped as duplicates.`);

  // ==========================================
  // PHASE 2: Sync The p-Block Elements
  // ==========================================
  // Deduplicate local list first
  const seenTexts = new Set();
  const uniquePblock = [];
  for (const q of allPBlockQuestions) {
    const norm = cleanStr(q.question_text);
    if (!seenTexts.has(norm)) {
      seenTexts.add(norm);
      uniquePblock.push(q);
    }
  }

  console.log('\n======================================================');
  console.log(`PHASE 2: Synchronizing The p-Block Elements (${uniquePblock.length} unique questions)...`);
  console.log('======================================================');

  let pblockInserted = 0;
  let pblockUpdated = 0;
  let pblockSkipped = 0;

  for (let i = 0; i < uniquePblock.length; i++) {
    const q = uniquePblock[i];
    const cdnUrl = getCdnUrl(q.image_url);
    const existing = findExistingMatch(q, liveQuestions);

    if (existing) {
      const needsImageUpdate = cdnUrl && (!existing.image_url || existing.image_url.trim() === '');
      const needsSolutionUpdate = q.solution && (!existing.solution || existing.solution.trim() === '');
      const needsChapterFix = existing.chapter_id !== 107;

      if (needsImageUpdate || needsSolutionUpdate || needsChapterFix) {
        const updatePayload = {
          ...existing,
          category: 'Chemistry',
          subject_id: 6,
          chapter_id: 107,
          chapter: 'The p-Block Elements',
          topic: existing.topic || q.topic || 'The p-Block Elements',
          image_url: cdnUrl || existing.image_url || '',
          solution: q.solution || existing.solution || ''
        };

        const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(updatePayload)
        });

        if (putRes.ok) {
          pblockUpdated++;
          console.log(`[UPDATED] p-Block Q${i + 1} -> Live ID ${existing.id} (image: ${cdnUrl ? 'Cloudinary attached' : 'retained'})`);
          existing.image_url = updatePayload.image_url;
          existing.solution = updatePayload.solution;
          existing.chapter_id = 107;
        } else {
          console.warn(`[UPDATE FAILED] Live ID ${existing.id}: ${putRes.status} ${await putRes.text()}`);
        }
      } else {
        pblockSkipped++;
        // console.log(`[SKIP DUPLICATE] p-Block Q${i + 1} matches Live ID ${existing.id}`);
      }
    } else {
      // Insert new question
      const postPayload = {
        category: 'Chemistry',
        question_type: q.question_type || 'mcq',
        question_text: q.question_text,
        options: q.options,
        correct_index: q.correct_index,
        marks: q.marks || 4,
        difficulty: q.difficulty || 'medium',
        solution: q.solution || '',
        subject_id: 6,
        chapter_id: 107,
        chapter: 'The p-Block Elements',
        topic: q.topic || 'The p-Block Elements',
        image_url: cdnUrl || ''
      };

      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(postPayload)
      });

      if (postRes.ok) {
        const created = await postRes.json();
        pblockInserted++;
        console.log(`[INSERTED] p-Block Q${i + 1} as new Live ID ${created.question?.id} (image: ${cdnUrl ? 'Cloudinary attached' : 'none'})`);
        liveQuestions.push(created.question);
      } else {
        console.error(`[INSERT FAILED] p-Block Q${i + 1}: ${postRes.status} ${await postRes.text()}`);
      }
    }

    await sleep(60); // polite throttling
  }

  console.log(`\np-Block Summary: ${pblockInserted} inserted, ${pblockUpdated} updated with diagram/solution, ${pblockSkipped} skipped as duplicates.`);

  // ==========================================
  // FINAL VERIFICATION
  // ==========================================
  console.log('\n======================================================');
  console.log('FINAL VERIFICATION ON LIVE (https://edvedum.com)...');
  console.log('======================================================');

  const finalRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const finalData = await finalRes.json();
  const finalQuestions = finalData.questions || [];

  const finalHalo = finalQuestions.filter(q => (q.chapter || '').toLowerCase().includes('haloalkanes'));
  const finalPblock = finalQuestions.filter(q => (q.chapter || '').toLowerCase().includes('p-block') || (q.chapter || '').toLowerCase().includes('p block'));

  console.log(`Final Live Chemistry Total Questions: ${finalQuestions.length}`);
  console.log(`Final Live Haloalkanes questions: ${finalHalo.length} (with images: ${finalHalo.filter(q => !!q.image_url).length})`);
  console.log(`Final Live p-Block questions: ${finalPblock.length} (with images: ${finalPblock.filter(q => !!q.image_url).length})`);

  console.log('\n=== ALL SYNC OPERATIONS COMPLETED SUCCESSFULLY! ===');
}

main().catch(err => {
  console.error('Fatal Sync Error:', err);
  process.exit(1);
});
