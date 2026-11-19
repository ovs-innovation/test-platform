import fs from 'fs';
import { MOTION1D_PART4 } from './motion1d_pyq_part4.mjs';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

const out = [];
for (const q of MOTION1D_PART4) {
  out.push(`=== Q${q.qNum} (Official: ${MOTION1D_OFFICIAL_ANSWERS[q.qNum]}) ===`);
  out.push(`Question: ${q.question.replace(/\s+/g, ' ')}`);
  out.push(`Options: ${JSON.stringify(q.options)}`);
  out.push(`Solution: ${q.solution.replace(/\s+/g, ' ')}`);
  out.push(`Image: ${q.image_url}`);
  out.push('');
}
fs.writeFileSync('backend/scripts/part4_inspection.txt', out.join('\n'));
console.log('Saved to part4_inspection.txt');
