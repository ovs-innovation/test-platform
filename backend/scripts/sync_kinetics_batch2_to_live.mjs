import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { kineticsBatch2 } from './kinetics_data_batch2.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const LIVE_API = 'https://edvedum.com/api';

function normalizeText(q) {
  let text = typeof q === 'string' ? q : (q.question_text || '');
  text = text.replace(/^Directions:.*?\.\s*/i, '');
  if (q.assertion_text) {
    text = q.assertion_text + ' ' + (q.reason_text || '');
  }
  return text
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 60);
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
        console.log('✓ Valid live token loaded');
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
  return data.token;
}

async function run() {
  console.log('=== SYNCING CHEMICAL KINETICS BATCH 2 TO LIVE EDVEDUM.COM ===\n');

  const token = await getLiveToken();

  const liveSubjectId = 6;
  const liveChapterId = 14;

  // Fetch current live Chemistry questions
  console.log('Fetching live Chemistry questions...');
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&_t=${Date.now()}`, {
    headers: { Authorization: `Bearer ${token}`, 'Cache-Control': 'no-cache' }
  });
  const qbData = await qbRes.json();
  const allLiveChem = qbData.questions || [];
  console.log(`Loaded ${allLiveChem.length} live Chemistry questions.`);

  const liveKinetics = allLiveChem.filter(
    q => q.chapter_id === liveChapterId || (q.chapter || '').toLowerCase().includes('chemical kinetics')
  );
  console.log(`Current live Chemical Kinetics questions: ${liveKinetics.length}`);

  // Build normalized index of live chemistry questions
  const liveIndex = new Map();
  for (const q of allLiveChem) {
    const norm = normalizeText(q);
    if (norm) {
      if (!liveIndex.has(norm)) {
        liveIndex.set(norm, q);
      }
    }
  }

  let insertedCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (let i = 0; i < kineticsBatch2.length; i++) {
    const localQ = kineticsBatch2[i];
    const localNorm = normalizeText(localQ);

    // Look for existing match
    let existingLiveQ = liveIndex.get(localNorm);

    // Fallback prefix search
    if (!existingLiveQ && localNorm.length >= 20) {
      const prefix = localNorm.slice(0, 30);
      for (const [key, q] of liveIndex.entries()) {
        if (key.includes(prefix) || prefix.includes(key.slice(0, 30))) {
          existingLiveQ = q;
          break;
        }
      }
    }

    if (existingLiveQ) {
      // Question already exists on live!
      // DO NOT INSERT DUPLICATE!
      // Update image_url or solution if needed
      const needsDiagram = localQ.image_url && (!existingLiveQ.image_url || existingLiveQ.image_url.startsWith('/uploads/'));
      const needsSolution = localQ.solution && (!existingLiveQ.solution || existingLiveQ.solution.length < 15);

      if (needsDiagram || needsSolution) {
        console.log(`[UPDATE LIVE ID ${existingLiveQ.id}] Q${i + 1} (${localQ.question_type}): Updating diagram/solution...`);
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
            console.log(`  ✓ Updated ID ${existingLiveQ.id} on live (diagram: ${localQ.image_url ? 'YES' : 'NO'})`);
          } else {
            console.warn(`  ✗ Failed to update ID ${existingLiveQ.id}: ${updateRes.status}`);
          }
        } catch (err) {
          console.error(`  ✗ Error updating ID ${existingLiveQ.id}: ${err.message}`);
        }
      } else {
        skippedCount++;
        const preview = (existingLiveQ.question_text || '').replace(/\s+/g, ' ').slice(0, 50);
        console.log(`[SKIP LIVE DUPLICATE] Q${i + 1}: Already present (Live ID: ${existingLiveQ.id}) "${preview}..."`);
      }
      continue;
    }

    // Question does not exist on live -> Insert as NEW
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
      assertion_text: localQ.assertion_text || null,
      reason_text: localQ.reason_text || null,
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
        liveIndex.set(localNorm, created.question || payload);
        const hasImg = localQ.image_url ? ' [DIAGRAM]' : '';
        const preview = localQ.question_text.replace(/\s+/g, ' ').slice(0, 50);
        console.log(`[INSERTED LIVE] Q${i + 1} (${localQ.question_type}) -> ID: ${created.question ? created.question.id : 'OK'}${hasImg} | "${preview}..."`);
      } else {
        const errText = await postRes.text();
        console.error(`[LIVE ERROR ${postRes.status}] Q${i + 1}: ${errText.slice(0, 120)}`);
      }
    } catch (postErr) {
      console.error(`[LIVE NETWORK ERROR] Q${i + 1}: ${postErr.message}`);
    }

    // Gentle throttle
    await new Promise(r => setTimeout(r, 60));
  }

  console.log('\n========================================');
  console.log(`Total Batch 2 Questions: ${kineticsBatch2.length}`);
  console.log(`Inserted on live: ${insertedCount}`);
  console.log(`Updated on live (diagrams/solutions): ${updatedCount}`);
  console.log(`Skipped on live (already fully present): ${skippedCount}`);
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
  console.error('Live sync failed:', err);
  process.exit(1);
});
