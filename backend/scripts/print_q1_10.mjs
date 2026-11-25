import { GRAVITATION_PART1 } from './build_clean_gravitation_part1.mjs';
console.log('Q1 to Q10:');
for (const q of GRAVITATION_PART1) {
  console.log(`Q${q.qNum}: ${q.question.slice(0, 60)} | Opts: ${JSON.stringify(q.options)} | Key: ${q.correct_option}`);
}
