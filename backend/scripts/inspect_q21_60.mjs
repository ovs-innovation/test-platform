import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('./backend/scripts/extracted_305_raw.json', 'utf8'));

for (let i = 20; i < 60; i++) {
  const q = raw[i];
  console.log(`\n=================== Q${q.q_num} (Page ${q.page}) Ans: ${q.expectedAns} ===================`);
  console.log('TEXT:', q.question_text);
  console.log('OPTS:', [q.optA, q.optB, q.optC, q.optD]);
  console.log('MARKS:', q.marksLine);
  console.log('SOL:', q.solution.split('\n').slice(0, 3).join(' | '));
}

