import fs from 'fs';

const raw = fs.readFileSync('./backend/scripts/vector_all_pages_ocr.json', 'utf8').replace(/^\uFEFF/, '');
const pages = JSON.parse(raw);

console.log('Total pages:', pages.length);

let totalAnswers = 0;
const answerOccurrences = [];
const figureMentions = [];

for (const p of pages) {
  for (let lIdx = 0; lIdx < p.lines.length; lIdx++) {
    const line = p.lines[lIdx];
    const text = typeof line === 'string' ? line : line.Text;
    
    if (/ANSWER\s*:\s*([A-D0-9\.\-]+)/i.test(text)) {
      const m = text.match(/ANSWER\s*:\s*([A-D0-9\.\-]+)/i);
      totalAnswers++;
      answerOccurrences.push({
        page: p.page,
        lineIdx: lIdx,
        ans: m[1],
        fullText: text
      });
    }

    if (/\b(figure|diagram|shown below|in the figure|in the diagram)\b/i.test(text)) {
      figureMentions.push({
        page: p.page,
        text: text
      });
    }
  }
}

console.log('Total answers found in OCR:', totalAnswers);
console.log('Sample first 10 answers:', answerOccurrences.slice(0, 10));
console.log('Sample last 10 answers:', answerOccurrences.slice(-10));
console.log('Total figure mentions:', figureMentions.length);
console.log('Figure mentions sample:', figureMentions.slice(0, 5));

