import fs from 'fs';

const text = fs.readFileSync('backend/scripts/emw_pdf_text.txt', 'utf8');

const regex = /Q(\d+)\.\s*/g;
let matches = [];
let m;
while ((m = regex.exec(text)) !== null) {
  matches.push({ qNum: parseInt(m[1]), index: m.index });
}

console.log('Found question headers:', matches.length);
matches.forEach((item, i) => {
  const next = matches[i + 1];
  const qText = text.slice(item.index, next ? next.index : undefined);
  console.log(`Q${item.qNum} (length ${qText.length}): ${qText.slice(0, 80).replace(/\n/g, ' ')}...`);
});

