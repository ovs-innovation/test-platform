import fs from 'fs';

const ocr = JSON.parse(fs.readFileSync('backend/scripts/semi_ocr.json', 'utf8'));
const positions = JSON.parse(fs.readFileSync('backend/scripts/semi_q_positions.json', 'utf8'));

const candidateQuestions = [];
for (let i = 1; i <= 167; i++) {
  const text = (ocr[`Q${i}`] || '').toLowerCase();
  const pos = positions.find(p => p.qNum === i);
  if (
    text.includes('figure') ||
    text.includes('circuit') ||
    text.includes('shown') ||
    text.includes('diagram') ||
    text.includes('gate') ||
    text.includes('characteristic') ||
    text.includes('truth table') ||
    text.includes('following')
  ) {
    candidateQuestions.push({ qNum: i, page: pos?.page, text: text.slice(0, 100) });
  }
}

console.log(`Found ${candidateQuestions.length} candidate questions mentioning visual elements:`);
candidateQuestions.forEach(c => console.log(`Q${c.qNum} (Page ${c.page}): ${c.text.replace(/\n/g, ' ')}`));

