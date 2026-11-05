import fs from 'fs';

const raw = JSON.parse(fs.readFileSync('./backend/scripts/extracted_305_raw.json', 'utf8'));

for (let i = 0; i < 20; i++) {
  const q = raw[i];
  console.log(`\nQ${q.q_num} [${q.question_type}] (Ans: ${q.expectedAns})`);
  console.log('Text:', q.question_text.slice(0, 120));
  if (q.question_type === 'mcq') {
    console.log('A:', q.optA, '| B:', q.optB, '| C:', q.optC, '| D:', q.optD);
  }
}

