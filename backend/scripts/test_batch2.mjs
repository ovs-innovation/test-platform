import { kineticsBatch2 } from './kinetics_data_batch2.mjs';

console.log('Batch 2 total count:', kineticsBatch2.length);
kineticsBatch2.forEach((q, i) => {
  console.log(`[${i + 1}] (${q.question_type}) ${q.topic} | img=${q.image_url ? 'YES' : 'NO'}`);
});
