import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allEcologyQuestions } from './ecology_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';

function normalizeQuestion(q) {
  if (q.question_type === 'assertion_reason' || q.assertion_text) {
    const a = (q.assertion_text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const r = (q.reason_text || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    if (a || r) {
      return 'ar_' + a.slice(0, 50) + '_' + r.slice(0, 50);
    }
  }
  let text = (q.question_text || q.question || '').toLowerCase();
  text = text.replace(/in the following questions.*?mark\s*\([1-4]\)\.?/gis, '');
  text = text.replace(/assertion\s*\(a\)\s*:\s*/gi, '');
  text = text.replace(/reason\s*\(r\)\s*:\s*/gi, '');
  text = text.replace(/\\[a-zA-Z]+/g, '');
  text = text.replace(/[^a-z0-9]/g, '');
  
  let opts = q.options;
  if (typeof opts === 'string') {
    try { opts = JSON.parse(opts); } catch (e) {}
  }
  const optSig = (Array.isArray(opts) ? opts : []).map(o => String(o).toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 10)).join('_');
  return text.slice(0, 120) + (optSig ? '__' + optSig : '');
}

async function getLiveToken() {
  const tokenFile = path.join(__dirname, 'live_token.json');
  let token = null;
  if (fs.existsSync(tokenFile)) {
    try {
      const data = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
      token = data.token;
    } catch (e) {}
  }
  if (token) {
    try {
      const testRes = await fetch(`${LIVE_API}/question-bank?category=Botany&limit=1`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (testRes.ok) return token;
    } catch (e) {}
  }
  console.log('Logging in to live edvedum.com...');
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!res.ok) throw new Error(`Live login failed: ${res.status}`);
  const data = await res.json();
  fs.writeFileSync(tokenFile, JSON.stringify({ token: data.token, time: Date.now() }, null, 2));
  return data.token;
}

async function run() {
  console.log('========================================================================');
  console.log('SYNC ECOLOGY (ORGANISMS AND POPULATIONS) QUESTIONS TO LIVE EDVEDUM.COM');
  console.log(`Total questions in dataset: ${allEcologyQuestions.length}`);
  console.log('========================================================================\n');

  const token = await getLiveToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  };

  const liveSubjectId = 10; // Botany
  const chapterName = 'Organisms and Populations';

  // 1. Verify/create chapter on live
  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chapsData = await chapsRes.json();
  const chaps = chapsData.chapters || [];
  let liveChap = chaps.find(c => c.name.toLowerCase() === chapterName.toLowerCase());

  if (!liveChap) {
    console.log(`Creating chapter "${chapterName}" under Botany (${liveSubjectId}) on live...`);
    const createChap = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        subject_id: liveSubjectId,
        name: chapterName,
        position: chaps.length + 1
      })
    });
    const chapData = await createChap.json();
    liveChap = chapData.chapter;
    console.log(`✓ Created live chapter: ID ${liveChap.id} ("${liveChap.name}")`);
  } else {
    console.log(`✓ Found existing live chapter: ID ${liveChap.id} ("${liveChap.name}")`);
  }
  const liveChapterId = liveChap.id;

  // 2. Fetch all existing questions in Botany
  console.log('\nFetching current live Botany questions...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Botany&limit=2500&_t=${Date.now()}`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const qbData = await qbRes.json();
  const allLiveBotany = qbData.questions || [];
  console.log(`Loaded ${allLiveBotany.length} total live Botany questions.`);

  const liveMap = new Map();
  allLiveBotany.forEach(q => {
    const norm = normalizeQuestion(q);
    if (norm && !liveMap.has(norm)) {
      liveMap.set(norm, q);
    }
  });

  let insertedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < allEcologyQuestions.length; i++) {
    const q = allEcologyQuestions[i];
    const qNorm = normalizeQuestion(q);

    const existing = liveMap.get(qNorm);

    if (existing) {
      // Question already exists on live! DO NOT insert a duplicate!
      // Update missing diagram, chapter_id, or solution
      const needsDiagramUpdate = q.image_url && (!existing.image_url || existing.image_url === '');
      const needsChapterUpdate = existing.chapter_id !== liveChapterId || existing.chapter !== chapterName;
      const needsSolutionUpdate = !existing.solution || existing.solution.length < 20;

      if (needsDiagramUpdate || needsChapterUpdate || needsSolutionUpdate) {
        try {
          const updatePayload = {
            ...existing,
            category: 'Botany',
            subject: 'Botany',
            subject_id: liveSubjectId,
            chapter: chapterName,
            chapter_id: liveChapterId,
            image_url: q.image_url || existing.image_url,
            solution: (existing.solution && existing.solution.length >= 20) ? existing.solution : q.solution,
            topic: q.topic || existing.topic || chapterName,
            marks: 4,
            options: (existing.options && existing.options.length === 4) ? existing.options : q.options,
            correct_index: existing.correct_index !== undefined ? existing.correct_index : q.correct_index
          };

          const putRes = await fetch(`${LIVE_API}/question-bank/${existing.id}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(updatePayload)
          });

          if (putRes.ok) {
            console.log(`[UPDATED EXISTING] Q${i + 1} (${q.section}${q.booklet_qno}) -> Live ID: ${existing.id} (Updated chapter/diagram)`);
            updatedCount++;
          } else {
            console.warn(`[WARN] Failed to update Live ID ${existing.id}: ${putRes.status}`);
            skippedCount++;
          }
        } catch (err) {
          console.warn(`[WARN] Error updating Live ID ${existing.id}:`, err.message);
          skippedCount++;
        }
      } else {
        console.log(`[SKIP DUPLICATE] Q${i + 1} (${q.section}${q.booklet_qno}): Already up-to-date on live (ID: ${existing.id})`);
        skippedCount++;
      }
      continue;
    }

    // Insert new question
    try {
      const postPayload = {
        category: 'Botany',
        subject: 'Botany',
        subject_id: liveSubjectId,
        chapter: chapterName,
        chapter_id: liveChapterId,
        topic: q.topic || chapterName,
        question_type: q.question_type || 'mcq',
        question_text: q.question_text,
        options: q.options,
        correct_index: q.correct_index,
        correct_indices: [q.correct_index],
        marks: 4,
        difficulty: q.difficulty || 'medium',
        solution: q.solution || '',
        assertion_text: q.assertion_text || null,
        reason_text: q.reason_text || null,
        image_url: q.image_url || null,
        status: 'normal'
      };

      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers,
        body: JSON.stringify(postPayload)
      });

      if (postRes.ok) {
        const resData = await postRes.json();
        const createdId = resData.question?.id || resData.id || resData.data?.id;
        insertedCount++;
        liveMap.set(qNorm, { id: createdId, ...postPayload });
        const hasImg = q.image_url ? ' [DIAGRAM]' : '';
        console.log(`[INSERTED LIVE] Q${i + 1} (${q.section}${q.booklet_qno}) -> Live ID: ${createdId}${hasImg}`);
      } else {
        console.error(`[ERROR] Insert failed for Q${i + 1}: ${postRes.status} ${await postRes.text()}`);
      }
    } catch (err) {
      console.error(`[ERROR] Insert error for Q${i + 1}:`, err.message);
    }
  }

  console.log(`\n========================================`);
  console.log(`Total questions processed: ${allEcologyQuestions.length}`);
  console.log(`New questions inserted on live: ${insertedCount}`);
  console.log(`Existing questions updated with diagram/chapter: ${updatedCount}`);
  console.log(`Questions skipped (already current): ${skippedCount}`);
  console.log(`========================================\n`);

  // Final count of Organisms and Populations questions on live
  const finalRes = await fetch(`${LIVE_API}/question-bank?category=Botany&limit=2500&_t=${Date.now()}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const finalData = await finalRes.json();
  const finalBotany = finalData.questions || [];
  const finalEcology = finalBotany.filter(q => q.chapter_id === liveChapterId || q.chapter === chapterName);
  const withDiagrams = finalEcology.filter(q => q.image_url && q.image_url.startsWith('http'));

  console.log(`Final Ecology questions on live: ${finalEcology.length}`);
  console.log(`Final Ecology questions with diagrams on live: ${withDiagrams.length}`);
}

run().catch(err => {
  console.error('Live sync failed:', err);
  process.exit(1);
});
