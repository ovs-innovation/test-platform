import fs from 'fs';

const qItems = JSON.parse(fs.readFileSync('./backend/scripts/biomolecules_q_text_items.json', 'utf8'));

console.log('Sample questions from text extraction:');
for (let q = 1; q <= 10; q++) {
  console.log(`--- Q${q} ---`);
  console.log(qItems[q]);
}

