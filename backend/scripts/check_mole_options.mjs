import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/mole_pdf_text.txt', 'utf8');
const qMatches = [...raw.matchAll(/Q(\d+)\.\s+([\s\S]*?)(?=Q\d+\.|$)/g)];

let missingOptions = 0;
for (const m of qMatches) {
  const qNum = parseInt(m[1], 10);
  let text = m[2];
  
  // Cut off Open solution / footer if present
  text = text.replace(/Open solution[\s\S]*$/i, '').trim();
  text = text.replace(/Keep practising on the ExamGOAL app[\s\S]*$/i, '').trim();
  text = text.replace(/---\s*PAGE\s*\d+\s*---/g, '').trim();

  // Find options (A), (B), (C), (D)
  const aIdx = text.search(/\(A\)/i);
  const bIdx = text.search(/\(B\)/i);
  const cIdx = text.search(/\(C\)/i);
  const dIdx = text.search(/\(D\)/i);

  if (aIdx === -1 || bIdx === -1 || cIdx === -1 || dIdx === -1) {
    console.log(`Q${qNum} missing options: A=${aIdx}, B=${bIdx}, C=${cIdx}, D=${dIdx}`);
    console.log(text);
    missingOptions++;
  }
}
console.log('Total questions missing options:', missingOptions);

