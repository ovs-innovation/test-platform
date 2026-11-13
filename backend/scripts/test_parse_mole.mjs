import fs from 'fs';

const raw = fs.readFileSync('backend/scripts/mole_pdf_text.txt', 'utf8');

// Questions start with Q1., Q2., etc.
// Let's test regex splitting
const qMatches = [...raw.matchAll(/Q(\d+)\.\s+([\s\S]*?)(?=Q\d+\.|$)/g)];
console.log('Matches found with simple regex:', qMatches.length);

if (qMatches.length > 0) {
  console.log('First question index:', qMatches[0][1]);
  console.log('First question snippet:', qMatches[0][2].slice(0, 200));
  console.log('Last question index:', qMatches[qMatches.length - 1][1]);
  console.log('Last question snippet:', qMatches[qMatches.length - 1][2].slice(0, 200));
}

