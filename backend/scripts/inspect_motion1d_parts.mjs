import { MOTION1D_PART1 } from './motion1d_pyq_part1.mjs';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

for (const q of MOTION1D_PART1) {
  const isDummy = q.options?.some(o => typeof o === 'string' && o.startsWith('Option ('));
  console.log(`Q${q.qNum} [Ans: ${MOTION1D_OFFICIAL_ANSWERS[q.qNum]}] Dummy: ${isDummy}`);
  if (isDummy) {
    console.log('  Stem snippet:', q.question.replace(/\n/g, ' ').slice(0, 140));
    console.log('  Solution snippet:', q.solution.replace(/\n/g, ' ').slice(0, 140));
  }
}
