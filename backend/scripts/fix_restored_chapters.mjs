import fs from 'fs';
import { HALOALKANES_QUESTIONS } from './haloalkanes_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';
const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));

const cloudinaryMap = JSON.parse(
  fs.readFileSync('scripts/cloudinary_diagrams_map.json', 'utf-8')
);

function getCdnUrl(localImg) {
  if (!localImg) return '';
  if (localImg.startsWith('http://') || localImg.startsWith('https://')) return localImg;
  return cloudinaryMap[localImg] || localImg;
}

function cleanStr(s) {
  if (s == null) return '';
  return String(s).toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function fixAndRestore() {
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await qbRes.json();
  const allQs = data.questions || [];

  // 1. Restore the 9 old questions
  const restoreMap = {
    4927: { chapter_id: 37, chapter: 'Solutions' },
    4935: { chapter_id: 37, chapter: 'Solutions' },
    5082: { chapter_id: 15, chapter: 'Electrochemistry' },
    5086: { chapter_id: 15, chapter: 'Electrochemistry' },
    5159: { chapter_id: 15, chapter: 'Electrochemistry' },
    5258: { chapter_id: 14, chapter: 'Chemical Kinetics' },
    5274: { chapter_id: 14, chapter: 'Chemical Kinetics' },
    5283: { chapter_id: 14, chapter: 'Chemical Kinetics' },
    5326: { chapter_id: 14, chapter: 'Chemical Kinetics' }
  };

  for (const [idStr, info] of Object.entries(restoreMap)) {
    const qId = Number(idStr);
    const existing = allQs.find(q => q.id === qId);
    if (existing) {
      await fetch(`${LIVE_API}/question-bank/${qId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          ...existing,
          category: 'Chemistry',
          subject_id: 6,
          chapter_id: info.chapter_id,
          chapter: info.chapter,
          topic: info.chapter,
          image_url: ''
        })
      });
      console.log(`Restored ID ${qId} -> ${info.chapter}`);
    }
  }

  // 2. Now check the 121 Haloalkanes questions: make sure all exist in chapter 34!
  const res2 = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveHalo = ((await res2.json()).questions || []).filter(
    q => q.chapter_id === 34 || (q.chapter || '').toLowerCase().includes('haloalkanes')
  );

  console.log(`\nVerifying all 121 Haloalkanes questions in live Chapter 34 (current count: ${liveHalo.length})...`);
  let addedHalo = 0;

  for (let i = 0; i < HALOALKANES_QUESTIONS.length; i++) {
    const localQ = HALOALKANES_QUESTIONS[i];
    const locClean = cleanStr(localQ.question_text);
    const cdnUrl = getCdnUrl(localQ.image_url);

    const exists = liveHalo.find(lq => {
      const lClean = cleanStr(lq.question_text);
      if (locClean.length >= 25 && lClean.length >= 25) {
        if (locClean === lClean || locClean.startsWith(lClean.substring(0, 45)) || lClean.startsWith(locClean.substring(0, 45))) {
          return true;
        }
      }
      return false;
    });

    if (!exists) {
      console.log(`Adding missing Haloalkanes Q${i + 1} ("${localQ.question_text.slice(0, 45)}...")...`);
      const pRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({
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
        })
      });
      if (pRes.ok) {
        addedHalo++;
        const created = await pRes.json();
        console.log(`  -> Inserted as Live ID ${created.question?.id} (img: ${cdnUrl ? 'YES' : 'NO'})`);
      }
    }
  }

  console.log(`\nFinished! Added ${addedHalo} missing Haloalkanes questions.`);
}

fixAndRestore().catch(console.error);
