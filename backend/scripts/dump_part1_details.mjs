import { MOTION1D_PART1 } from './motion1d_pyq_part1.mjs';
import { MOTION1D_OFFICIAL_ANSWERS } from './motion1d_official_answers.mjs';

for (let i = 0; i < MOTION1D_PART1.length; i++) {
  const q = MOTION1D_PART1[i];
  console.log(`=== Q${q.qNum} (Official Ans: ${MOTION1D_OFFICIAL_ANSWERS[q.qNum]}) ===`);
  console.log('Q:', q.question.replace(/\n/g, ' '));
  console.log('Opts:', q.options);
  console.log('Img:', q.image_url);
}
