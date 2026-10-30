import { isAR } from './test_comprehensive_ar.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  console.log('========================================================================');
  console.log('   SYNCING ALL ASSERTION-REASON QUESTIONS TO AR TYPE ON LIVE SERVER     ');
  console.log('========================================================================\n');

  console.log('[Auth] Logging into Live API...');
  const loginRes = await fetch(LIVE_API + '/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  if (!loginRes.ok) throw new Error('Live auth failed');
  const { token } = await loginRes.json();
  console.log('[Auth] Logged in successfully.');

  const categories = ['Physics', 'Chemistry', 'Botany', 'Zoology'];
  let totalUpdated = 0;
  let totalAlreadyAR = 0;
  let errors = 0;

  for (const cat of categories) {
    console.log(`\n[${cat}] Fetching questions from live...`);
    const qRes = await fetch(LIVE_API + '/question-bank?category=' + cat, {
      headers: { Authorization: 'Bearer ' + token }
    });
    const qData = await qRes.json();
    const list = qData.questions || qData || [];
    console.log(`[${cat}] Loaded ${list.length} questions.`);

    const arQuestionsToUpdate = list.filter((q) => {
      const isActuallyAR = isAR(q);
      const isTypeAR = (q.question_type || '').toLowerCase().trim() === 'assertion_reason';
      if (isActuallyAR && isTypeAR) totalAlreadyAR++;
      return isActuallyAR && !isTypeAR;
    });

    console.log(`[${cat}] Found ${arQuestionsToUpdate.length} AR questions that need question_type updated.`);

    // Update in batches of 10
    const BATCH_SIZE = 10;
    for (let i = 0; i < arQuestionsToUpdate.length; i += BATCH_SIZE) {
      const batch = arQuestionsToUpdate.slice(i, i + BATCH_SIZE);
      await Promise.all(
        batch.map(async (q) => {
          try {
            const payload = {
              ...q,
              question_type: 'assertion_reason'
            };

            const putRes = await fetch(`${LIVE_API}/question-bank/${q.id}`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + token
              },
              body: JSON.stringify(payload)
            });

            if (putRes.ok) {
              totalUpdated++;
            } else {
              const errText = await putRes.text();
              console.warn(`[WARN] ID ${q.id} (${q.chapter}) update failed: ${errText.slice(0, 80)}`);
              errors++;
            }
          } catch (e) {
            console.error(`[ERR] ID ${q.id} exception:`, e.message);
            errors++;
          }
        })
      );
      process.stdout.write(`  Updated ${Math.min(i + BATCH_SIZE, arQuestionsToUpdate.length)}/${arQuestionsToUpdate.length}\r`);
    }
    console.log(`\n[${cat}] Batch finished.`);
  }

  console.log('\n========================================================================');
  console.log(`[SUMMARY]`);
  console.log(`  Total Live Questions Updated to 'assertion_reason': ${totalUpdated}`);
  console.log(`  Total Already 'assertion_reason':                   ${totalAlreadyAR}`);
  console.log(`  Errors:                                             ${errors}`);
  console.log('========================================================================\n');
}

main().catch(console.error);

