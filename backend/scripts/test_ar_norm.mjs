function normalizeText(q) {
  let text = typeof q === 'string' ? q : (q.question_text || '');
  // Remove directions prefix if present
  text = text.replace(/^Directions:.*?\.\s*/i, '');
  if (q.assertion_text) {
    text = q.assertion_text + ' ' + (q.reason_text || '');
  }
  return text
    .toLowerCase()
    .replace(/\\[a-zA-Z]+/g, '')
    .replace(/[^a-z0-9]/g, '')
    .slice(0, 80);
}

import { kineticsBatch2 } from './kinetics_data_batch2.mjs';

const set = new Set();
kineticsBatch2.slice(0, 14).forEach((q, i) => {
  const norm = normalizeText(q);
  console.log(`AR ${i + 1}: ${norm.slice(0, 45)} (length: ${norm.length})`);
  set.add(norm);
});

console.log('Unique normalized keys:', set.size);
