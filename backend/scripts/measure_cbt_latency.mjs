import { query, pool } from '../src/config/db.js';
import { getOrSetCachedExamPaper, getOrSetQuestionMeta, invalidateExamPaperCache, invalidateQuestionMeta } from '../src/services/examCacheService.js';

async function runBenchmark() {
  console.log('--- CBT Reliability & Latency Benchmark ---');

  // 1. Warm-up DB ping
  const pingStart = Date.now();
  await query('SELECT 1');
  const pingRtt = Date.now() - pingStart;
  console.log(`Neon Remote DB Warm RTT: ${pingRtt} ms`);

  // Find a valid assessment and question
  const aRes = await query('SELECT id FROM assessments ORDER BY id DESC LIMIT 1');
  if (aRes.rowCount === 0) {
    console.log('No assessments found in DB to benchmark.');
    await pool.end();
    return;
  }
  const assessmentId = aRes.rows[0].id;

  const qRes = await query('SELECT id FROM questions WHERE assessment_id = $1 LIMIT 1', [assessmentId]);
  const questionId = qRes.rows[0]?.id;

  // Invalidate any existing cache first
  await invalidateExamPaperCache(assessmentId);
  if (questionId) await invalidateQuestionMeta(questionId);

  // 2. Measure Exam Paper retrieval: Cold DB vs Warm Cache
  const t0 = Date.now();
  const coldPaper = await getOrSetCachedExamPaper(assessmentId);
  const coldDuration = Date.now() - t0;
  console.log(`[Exam Paper] Cold DB query + sanitize (${coldPaper?.questions?.length || 0} questions): ${coldDuration} ms`);

  const t1 = Date.now();
  const warmPaper = await getOrSetCachedExamPaper(assessmentId);
  const warmDuration = Date.now() - t1;
  console.log(`[Exam Paper] Warm Cache hit (${warmPaper?.questions?.length || 0} questions): ${warmDuration} ms`);

  // 3. Measure Question Meta retrieval: Cold DB vs Warm Cache
  if (questionId) {
    const t2 = Date.now();
    const coldMeta = await getOrSetQuestionMeta(questionId);
    const coldMetaDuration = Date.now() - t2;
    console.log(`[Question Meta] Cold DB query (q ${questionId}, type: ${coldMeta.question_type}): ${coldMetaDuration} ms`);

    const t3 = Date.now();
    const warmMeta = await getOrSetQuestionMeta(questionId);
    const warmMetaDuration = Date.now() - t3;
    console.log(`[Question Meta] Warm Cache hit (q ${questionId}): ${warmMetaDuration} ms`);
  }

  // 4. Simulate getAttemptState query pipeline:
  // Old sequential pipeline: 10 sequential roundtrips
  console.log('\n--- Pipeline Comparison ---');
  console.log(`Estimated Old getAttemptState latency (10 sequential roundtrips @ ~${pingRtt}ms): ~${pingRtt * 10} ms`);
  console.log(`Optimized getAttemptState latency (Warm Cache + 1 parallel batch @ ~${pingRtt}ms): ~${warmDuration + pingRtt} ms`);
  const speedup = Math.round(((pingRtt * 10) / (warmDuration + pingRtt)) * 10) / 10;
  console.log(`Predicted Latency Reduction: ~${speedup}x faster (from ~${pingRtt * 10}ms down to ~${warmDuration + pingRtt}ms)`);

  await pool.end();
  process.exit(0);
}

runBenchmark().catch((err) => {
  console.error('Benchmark failed:', err);
  process.exit(1);
});
