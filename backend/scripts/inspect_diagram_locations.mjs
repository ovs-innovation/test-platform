import fs from 'fs';
import path from 'path';

const cache = JSON.parse(fs.readFileSync('backend/scripts/electrochem_tsv_cache.json', 'utf8'));

const diagramQuestions = [
  { qNum: 20, page: 4 },
  { qNum: 78, page: 27 },
  { qNum: 79, page: 27 },
  { qNum: 91, page: 32 },
  { qNum: 94, page: 33 },
  { qNum: 116, page: 42 },
  { qNum: 137, page: 48 },
  { qNum: 138, page: 49 },
  { qNum: 142, page: 52 },
  { qNum: 146, page: 54 },
  { qNum: 164, page: 62 },
  { qNum: 167, page: 64 },
  { qNum: 189, page: 70 },
  { qNum: 194, page: 72 },
  { qNum: 195, page: 72 },
  { qNum: 199, page: 73 },
  { qNum: 203, page: 75 },
  { qNum: 207, page: 76 },
  { qNum: 209, page: 77 },
  { qNum: 214, page: 79 },
  { qNum: 217, page: 80 },
  { qNum: 223, page: 83 },
  { qNum: 228, page: 86 },
  { qNum: 233, page: 88 },
  { qNum: 240, page: 95 }
];

console.log('Inspecting lines for diagram questions:');
for (const dq of diagramQuestions) {
  const lines = cache[dq.page]?.lines || [];
  console.log(`\n=== Q${dq.qNum} (Page ${dq.page}) ===`);
  lines.forEach(l => {
    if (l.text.includes(String(dq.qNum)) || l.text.includes('ANSWER') || l.text.includes('marks') || l.text.includes('(A)') || l.text.includes('Fig') || l.text.includes('List') || l.text.includes('Graph')) {
      console.log(`  top: ${l.top}, left: ${l.left}, height: ${l.height} | ${l.text.slice(0, 70)}`);
    }
  });
}
