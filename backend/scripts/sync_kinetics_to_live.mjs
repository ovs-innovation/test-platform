import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { allKineticsQuestions } from './kinetics_questions_data.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';

function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '') // remove LaTeX command names
    .replace(/[^a-z0-9]/g, '')   // remove punctuation/spaces
    .slice(0, 60);              // first 60 characters
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

  // Validate token
  if (token) {
    try {
      const testRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=1`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (testRes.ok) {
        console.log('✓ Reusing existing valid live token');
        return token;
      }
    } catch (e) {}
  }

  // Login
  console.log('Logging in to live edvedum.com...');
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!res.ok) {
    throw new Error(`Live login failed: ${res.status} ${await res.text()}`);
  }
  const data = await res.json();
  fs.writeFileSync(tokenFile, JSON.stringify({ token: data.token, time: Date.now() }, null, 2));
  console.log('✓ Obtained and saved new live token');
  return data.token;
}

async function run() {
  console.log('========================================================================');
  console.log('SYNC CHEMICAL KINETICS TO LIVE EDVEDUM.COM');
  console.log(`Total questions in dataset: ${allKineticsQuestions.length}`);
  console.log('========================================================================\n');

  const token = await getLiveToken();

  // 1. Verify Chemistry subject on live
  const subsRes = await fetch(`${LIVE_API}/admin/subjects`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const subs = (await subsRes.json()).subjects || [];
  const chemSub = subs.find(s => s.name.toLowerCase() === 'chemistry');
  const liveSubjectId = chemSub ? chemSub.id : 6;
  console.log(`Live Chemistry Subject ID: ${liveSubjectId}`);

  // 2. Verify Chemical Kinetics chapter on live
  const chapsRes = await fetch(`${LIVE_API}/admin/subjects/${liveSubjectId}/chapters`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const chaps = (await chapsRes.json()).chapters || [];
  let kineticsChap = chaps.find(c => c.name.toLowerCase().includes('chemical kinetics'));
  if (!kineticsChap) {
    console.log('Creating chapter "Chemical Kinetics" on live...');
    const createChap = await fetch(`${LIVE_API}/admin/chapters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        subject_id: liveSubjectId,
        name: 'Chemical Kinetics',
        position: 14
      })
    });
    kineticsChap = (await createChap.json()).chapter;
  }
  const liveChapterId = kineticsChap.id;
  console.log(`Live Chemical Kinetics Chapter ID: ${liveChapterId} ("${kineticsChap.name}")`);

  // 3. Fetch all existing Chemistry questions on live
  console.log('\nFetching current live Chemistry questions...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&_t=${Date.now()}`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const qbData = await qbRes.json();
  const allLiveChem = qbData.questions || [];
  console.log(`Loaded ${allLiveChem.length} total live Chemistry questions.`);

  const liveKineticsList = allLiveChem.filter(
    q => q.chapter_id === liveChapterId || (q.chapter || '').toLowerCase().includes('chemical kinetics')
  );
  console.log(`Found ${liveKineticsList.length} questions currently tagged under Chemical Kinetics on live.`);

  // Build lookup maps for duplicate detection
  // We index all live chemistry questions to prevent cross-chapter collisions as well
  const liveByNormText = new Map();
  for (const q of allLiveChem) {
    const norm = normalizeText(q.question_text);
    if (norm) {
      if (!liveByNormText.has(norm)) {
        liveByNormText.set(norm, q);
      }
    }
  }

  let insertedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < allKineticsQuestions.length; i++) {
    const localQ = allKineticsQuestions[i];
    const localNorm = normalizeText(localQ.question_text);

    // Look for existing match on live
    let existingLiveQ = liveByNormText.get(localNorm);

    // Substring fallback search if no exact norm match
    if (!existingLiveQ && localNorm.length >= 25) {
      const prefix = localNorm.slice(0, 30);
      for (const [key, q] of liveByNormText.entries()) {
        if (key.includes(prefix) || prefix.includes(key.slice(0, 30))) {
          existingLiveQ = q;
          break;
        }
      }
    }

    if (existingLiveQ) {
      // Question ALREADY EXISTS ON LIVE!
      // Do NOT insert again!
      // Check if we need to update image_url or solution
      const needsDiagramUpdate = localQ.image_url && (!existingLiveQ.image_url || existingLiveQ.image_url.startsWith('/uploads/'));
      const needsSolutionUpdate = localQ.solution && (!existingLiveQ.solution || existingLiveQ.solution.length < 15);
      const needsChapterFix = existingLiveQ.chapter_id !== liveChapterId;

      if (needsDiagramUpdate || needsSolutionUpdate || needsChapterFix) {
        console.log(`[UPDATE LIVE ID ${existingLiveQ.id}] Q${i + 1}: Attaching diagram/solution/chapter...`);
        const updatePayload = {
          ...existingLiveQ,
          subject_id: liveSubjectId,
          chapter_id: liveChapterId,
          chapter: 'Chemical Kinetics',
          topic: localQ.topic || existingLiveQ.topic || 'Chemical Kinetics',
          image_url: localQ.image_url || existingLiveQ.image_url || null,
          solution: localQ.solution || existingLiveQ.solution || ''
        };

        try {
          const updateRes = await fetch(`${LIVE_API}/question-bank/${existingLiveQ.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(updatePayload)
          });
          if (updateRes.ok) {
            updatedCount++;
            console.log(`  ✓ Updated ID ${existingLiveQ.id} (image: ${localQ.image_url ? 'YES' : 'NO'})`);
          } else {
            console.warn(`  ✗ Failed to update ID ${existingLiveQ.id}: ${updateRes.status} ${await updateRes.text()}`);
          }
        } catch (err) {
          console.error(`  ✗ Error updating ID ${existingLiveQ.id}: ${err.message}`);
        }
      } else {
        skippedCount++;
        // Clean console log
        const preview = (existingLiveQ.question_text || '').replace(/\s+/g, ' ').slice(0, 50);
        console.log(`[SKIP LIVE DUPLICATE] Q${i + 1}: Already exists (Live ID: ${existingLiveQ.id}) "${preview}..."`);
      }
      continue;
    }

    // Question does NOT exist on live -> Insert as NEW
    const formattedOptions = (localQ.options || []).map(opt =>
      typeof opt === 'string' ? { text: opt } : opt
    );

    const payload = {
      category: 'Chemistry',
      subject: 'Chemistry',
      subject_id: liveSubjectId,
      chapter: 'Chemical Kinetics',
      chapter_id: liveChapterId,
      topic: localQ.topic || 'Chemical Kinetics',
      question_type: localQ.question_type || 'mcq',
      question_text: localQ.question_text,
      options: formattedOptions,
      correct_index: localQ.correct_index,
      marks: localQ.marks || 4,
      difficulty: localQ.difficulty || 'medium',
      solution: localQ.solution || '',
      image_url: localQ.image_url || null,
      status: 'normal'
    };

    try {
      const postRes = await fetch(`${LIVE_API}/question-bank`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (postRes.ok) {
        const created = await postRes.json();
        insertedCount++;
        liveByNormText.set(localNorm, created.question || payload);
        const hasImg = localQ.image_url ? ' [DIAGRAM]' : '';
        const preview = localQ.question_text.replace(/\s+/g, ' ').slice(0, 50);
        console.log(`[INSERTED LIVE] Q${i + 1} -> ID: ${created.question ? created.question.id : 'OK'}${hasImg} | "${preview}..."`);
      } else {
        const errText = await postRes.text();
        console.error(`[LIVE ERROR ${postRes.status}] Q${i + 1}: ${errText.slice(0, 120)}`);
      }
    } catch (postErr) {
      console.error(`[LIVE NETWORK ERROR] Q${i + 1}: ${postErr.message}`);
    }

    // Small delay between requests to be polite to live server
    await new Promise(r => setTimeout(r, 60));
  }

  console.log('\n========================================');
  console.log(`Total questions processed: ${allKineticsQuestions.length}`);
  console.log(`Questions inserted on live: ${insertedCount}`);
  console.log(`Questions updated on live (diagrams/solutions): ${updatedCount}`);
  console.log(`Questions skipped on live (already fully present): ${skippedCount}`);
  console.log('========================================\n');

  // Verify final count on live
  const finalRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&_t=${Date.now()}`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const finalData = await finalRes.json();
  const finalKinetics = (finalData.questions || []).filter(
    q => q.chapter_id === liveChapterId || (q.chapter || '').toLowerCase().includes('chemical kinetics')
  );
  const withDiagrams = finalKinetics.filter(q => q.image_url);
  console.log(`Final live Chemical Kinetics questions: ${finalKinetics.length} (with diagrams: ${withDiagrams.length})`);
}

run().catch(err => {
  console.error('Sync failed:', err);
  process.exit(1);
});
