import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/sample_ocr_10.json', 'utf8').replace(/^\uFEFF/, '');
const data = JSON.parse(raw);

for (const p of data) {
  console.log(`=== PAGE ${p.page} ===`);
  const qLines = p.lines.filter(l => /^\s*\d+\s*[\.\)]/.test(l));
  console.log('Detected questions:', qLines);
  const ansLines = p.lines.filter(l => /ANSWER/i.test(l));
  console.log('Answers:', ansLines);
}
