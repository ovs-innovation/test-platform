import fs from 'fs';

const ocrCache = JSON.parse(fs.readFileSync('backend/scripts/thermo_ocr_cache.json', 'utf8'));

// Let's inspect each page and find questions
const pageQuestionMap = {};

for (let p = 1; p <= 98; p++) {
  const text = ocrCache[p] || '';
  // Look for ANSWER: or numbers
  const answers = [...text.matchAll(/ANSWER:\s*([A-D0-9\.\-]+)/gi)];
  pageQuestionMap[p] = {
    answerCount: answers.length,
    answers: answers.map(a => a[1])
  };
}

console.log('Pages overview (sample):');
for (let p = 1; p <= 20; p++) {
  console.log(`Page ${p}: ${pageQuestionMap[p].answerCount} answers ->`, pageQuestionMap[p].answers);
}
