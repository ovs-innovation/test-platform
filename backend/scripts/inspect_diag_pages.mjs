import fs from 'fs';

const positions = JSON.parse(fs.readFileSync('./backend/scripts/hydrocarbons_q_positions.json', 'utf8'));
const qList = [1, 3, 4, 5, 6, 7, 13, 16, 18, 21, 23, 26, 28, 29, 30, 31, 33, 37, 38, 40, 41, 42, 49, 55, 57, 59, 63, 64, 68, 75, 77, 78, 82];

for (const q of qList) {
  const pos = positions.find(p => p.qNum === q);
  console.log(`Q${q} -> Page ${pos.pageNum}, y=${pos.y.toFixed(1)}`);
}

