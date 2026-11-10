import fs from 'fs';

const text = fs.readFileSync('backend/scripts/rotational_pdf_text.txt', 'utf8');

// Check question regex match
const qMatches = [...text.matchAll(/Q(\d+)\.\s*(RE-NEET\s*\d+|NEET\s*\d+.*?|AIPMT\s*\d+.*?)\n([\s\S]*?)(?=Q\d+\.|\nAnswer Key|\nKeep practising)/g)];

console.log(`Found ${qMatches.length} questions matched in text.`);
if (qMatches.length > 0) {
  console.log('First question:', {
    num: qMatches[0][1],
    exam: qMatches[0][2],
    body: qMatches[0][3].substring(0, 150)
  });
  console.log('Last question:', {
    num: qMatches[qMatches.length - 1][1],
    exam: qMatches[qMatches.length - 1][2],
    body: qMatches[qMatches.length - 1][3].substring(0, 150)
  });
}

