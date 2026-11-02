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
const { token } = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'live_token.json'), 'utf8'));

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

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function main() {
  console.log('Fetching live questions for complete verification...');
  const res = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  let liveQuestions = data.questions || [];

  // ==============================================================
  // 1. FIX LIVE ID 8382 (Should be Haloalkanes Cine Substitution)
  // ==============================================================
  const q8382 = liveQuestions.find(q => q.id === 8382);
  if (q8382) {
    console.log('Fixing Live ID 8382 to Haloalkanes Cine Substitution...');
    const fixed8382 = {
      ...q8382,
      category: 'Chemistry',
      subject_id: 6,
      chapter_id: 34,
      chapter: 'Haloalkanes and Haloarenes',
      topic: 'Reactions of Haloarenes',
      image_url: 'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793269937/edvedum_chemistry/haloalkanes/halo_q1_cine_substitution.png',
      solution: HALOALKANES_QUESTIONS[0].solution
    };
    const putRes = await fetch(`${LIVE_API}/question-bank/8382`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(fixed8382)
    });
    console.log('Fixed ID 8382 status:', putRes.status);
  }

  // Refresh live questions
  const res2 = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  liveQuestions = (await res2.json()).questions || [];

  const haloLive = liveQuestions.filter(q => q.chapter_id === 34 || (q.chapter || '').toLowerCase().includes('haloalkanes'));
  const pblockLive = liveQuestions.filter(q => q.chapter_id === 107 || (q.chapter || '').toLowerCase().includes('p-block') || (q.chapter || '').toLowerCase().includes('p block'));

  console.log(`Current Live Haloalkanes: ${haloLive.length}`);
  console.log(`Current Live p-Block: ${pblockLive.length}`);

  // ==============================================================
  // 2. CHECK ALL 121 HALOALKANES QUESTIONS
  // ==============================================================
  console.log('\nChecking all 121 Haloalkanes questions in live bank...');
  let haloAdded = 0;
  for (let i = 0; i < HALOALKANES_QUESTIONS.length; i++) {
    const localQ = HALOALKANES_QUESTIONS[i];
    const locClean = cleanStr(localQ.question_text);
    const locOpt0 = cleanStr(localQ.options[0]);
    const cdnUrl = getCdnUrl(localQ.image_url);

    // Look for match strictly inside haloLive
    const match = haloLive.find(lq => {
      const lClean = cleanStr(lq.question_text);
      if (locClean.length >= 25 && lClean.length >= 25) {
        if (locClean === lClean || locClean.startsWith(lClean.substring(0, 45)) || lClean.startsWith(locClean.substring(0, 45))) {
          return true;
        }
      }
      const lOpts = Array.isArray(lq.options) ? lq.options : JSON.parse(lq.options || '[]');
      const lOpt0 = cleanStr(lOpts[0]?.text || lOpts[0]);
      if (locOpt0 && lOpt0 && locOpt0.length > 8 && locOpt0 === lOpt0) {
        if (locClean.includes(lClean.substring(0, 25)) || lClean.includes(locClean.substring(0, 25))) {
          return true;
        }
      }
      return false;
    });

    if (!match) {
      console.log(`[MISSING IN LIVE] Halo Q${i + 1}: "${localQ.question_text.substring(0, 50)}..." -> Inserting!`);
      const postPayload = {
        category: 'Chemistry',
        question_type: localQ.question_type || 'mcq',
        question_text: localQ.question_text,
        options: localQ.options,
        correct_index: localQ.correct_index,
        marks: 4,
        difficulty: localQ.difficulty || 'medium',
        solution: localQ.solution || '',
        subject_id: 6,
        chapter_id: 34,
        chapter: 'Haloalkanes and Haloarenes',
        topic: localQ.topic || 'Haloalkanes and Haloarenes',
        image_url: cdnUrl || ''
      };
      const pRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(postPayload)
      });
      if (pRes.ok) {
        const created = await pRes.json();
        console.log(`  -> Inserted successfully as Live ID ${created.question?.id}`);
        haloAdded++;
        haloLive.push(created.question);
      } else {
        console.error(`  -> Insert error: ${pRes.status} ${await pRes.text()}`);
      }
      await sleep(70);
    } else {
      // Ensure diagram is attached if missing
      if (cdnUrl && (!match.image_url || match.image_url.trim() === '')) {
        console.log(`[ATTACH DIAGRAM] Halo Q${i + 1} -> Live ID ${match.id}`);
        await fetch(`${LIVE_API}/question-bank/${match.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            ...match,
            category: 'Chemistry',
            subject_id: 6,
            chapter_id: 34,
            chapter: 'Haloalkanes and Haloarenes',
            image_url: cdnUrl,
            solution: localQ.solution || match.solution || ''
          })
        });
        match.image_url = cdnUrl;
        await sleep(70);
      }
    }
  }

  // ==============================================================
  // 3. CHECK ALL 161 UNIQUE P-BLOCK QUESTIONS
  // ==============================================================
  console.log('\nChecking all unique p-Block questions in live bank...');
  const seenTexts = new Set();
  const uniquePblock = [];
  for (const q of allPBlockQuestions) {
    const norm = cleanStr(q.question_text);
    if (!seenTexts.has(norm)) {
      seenTexts.add(norm);
      uniquePblock.push(q);
    }
  }

  let pblockAdded = 0;
  for (let i = 0; i < uniquePblock.length; i++) {
    const localQ = uniquePblock[i];
    const locClean = cleanStr(localQ.question_text);
    const locOpt0 = cleanStr(localQ.options[0]);
    const cdnUrl = getCdnUrl(localQ.image_url);

    // Look for match inside pblockLive (or live questions that are p-block)
    const match = pblockLive.find(lq => {
      const lClean = cleanStr(lq.question_text);
      if (locClean.length >= 25 && lClean.length >= 25) {
        if (locClean === lClean || locClean.startsWith(lClean.substring(0, 45)) || lClean.startsWith(locClean.substring(0, 45))) {
          return true;
        }
      }
      const lOpts = Array.isArray(lq.options) ? lq.options : JSON.parse(lq.options || '[]');
      const lOpt0 = cleanStr(lOpts[0]?.text || lOpts[0]);
      if (locOpt0 && lOpt0 && locOpt0.length > 8 && locOpt0 === lOpt0) {
        if (locClean.includes(lClean.substring(0, 25)) || lClean.includes(locClean.substring(0, 25))) {
          return true;
        }
      }
      return false;
    });

    if (!match) {
      console.log(`[MISSING IN LIVE] p-Block Q${i + 1}: "${localQ.question_text.substring(0, 50)}..." -> Inserting!`);
      const postPayload = {
        category: 'Chemistry',
        question_type: localQ.question_type || 'mcq',
        question_text: localQ.question_text,
        options: localQ.options,
        correct_index: localQ.correct_index,
        marks: 4,
        difficulty: localQ.difficulty || 'medium',
        solution: localQ.solution || '',
        subject_id: 6,
        chapter_id: 107,
        chapter: 'The p-Block Elements',
        topic: localQ.topic || 'The p-Block Elements',
        image_url: cdnUrl || ''
      };
      const pRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(postPayload)
      });
      if (pRes.ok) {
        const created = await pRes.json();
        console.log(`  -> Inserted successfully as Live ID ${created.question?.id} (image: ${cdnUrl ? 'Cloudinary attached' : 'none'})`);
        pblockAdded++;
        pblockLive.push(created.question);
      } else {
        console.error(`  -> Insert error: ${pRes.status} ${await pRes.text()}`);
      }
      await sleep(70);
    } else {
      // Ensure diagram is attached if missing
      if (cdnUrl && (!match.image_url || match.image_url.trim() === '')) {
        console.log(`[ATTACH DIAGRAM] p-Block Q${i + 1} -> Live ID ${match.id}`);
        await fetch(`${LIVE_API}/question-bank/${match.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify({
            ...match,
            category: 'Chemistry',
            subject_id: 6,
            chapter_id: 107,
            chapter: 'The p-Block Elements',
            image_url: cdnUrl,
            solution: localQ.solution || match.solution || ''
          })
        });
        match.image_url = cdnUrl;
        await sleep(70);
      }
    }
  }

  // ==============================================================
  // 4. FINAL REPORT
  // ==============================================================
  console.log('\n======================================================');
  console.log('FINAL AUDIT & VERIFICATION:');
  const finalRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const finalQs = (await finalRes.json()).questions || [];

  const finalHalo = finalQs.filter(q => q.chapter_id === 34 || (q.chapter || '').toLowerCase().includes('haloalkanes'));
  const finalPblock = finalQs.filter(q => q.chapter_id === 107 || (q.chapter || '').toLowerCase().includes('p-block') || (q.chapter || '').toLowerCase().includes('p block'));

  console.log(`Final Total Live Chemistry Questions: ${finalQs.length}`);
  console.log(`Final Haloalkanes and Haloarenes in Live: ${finalHalo.length} questions (with diagrams: ${finalHalo.filter(q => !!q.image_url).length})`);
  console.log(`Final The p-Block Elements in Live: ${finalPblock.length} questions (with diagrams: ${finalPblock.filter(q => !!q.image_url).length})`);

  // Verify sample diagram URLs
  const sampleImages = [
    'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793269937/edvedum_chemistry/haloalkanes/halo_q1_cine_substitution.png',
    'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793269857/edvedum_chemistry/pblock/pblock_q1_perchloric_acid.png',
    'https://res.cloudinary.com/fyxpnmdh/image/upload/v1793269970/edvedum_chemistry/pblock/pblock_q95_s2cl2_structures.png'
  ];
  console.log('\nTesting CDN diagram URLs accessibility:');
  for (const url of sampleImages) {
    const testR = await fetch(url, { method: 'HEAD' });
    console.log(`  ${url} -> HTTP ${testR.status}`);
  }
}

main().catch(err => {
  console.error('Audit Error:', err);
  process.exit(1);
});
