import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'capacitance_ocr_cache.json'), 'utf8'));

// Find which question on which page contains diagram keywords
const qList = [];

for (let p = 1; p <= 144; p++) {
  const text = cache[String(p)] || '';
  const lines = text.split('\n');
  
  // Find each marks line: "[4 marks..."
  // The question text is above the marks line, and the solution is below "ANSWER: ..."
  let currentQText = [];
  let currentSolText = [];
  let readingQuestion = true;

  for (let l = 0; l < lines.length; l++) {
    const line = lines[l].trim();
    if (line.includes('marks') && line.includes('wrong answer') || line.includes('no negative marking')) {
      // End of question text
      const qStr = currentQText.join(' ');
      // Look for question number
      const qNumMatch = qStr.match(/(?:^|\n|\s)(\d{1,3})[\.\:\;\s]/);
      const qNum = qNumMatch ? parseInt(qNumMatch[1], 10) : null;
      
      const hasDiagramKw = /figure|circuit|diagram|graph|plot|shown|network|arrangement/i.test(qStr);

      qList.push({
        page: p,
        qNumCandidate: qNum,
        hasDiagramKw,
        snippet: qStr.slice(0, 120)
      });
      currentQText = [];
      readingQuestion = false;
    } else if (line.startsWith('ANSWER:')) {
      readingQuestion = false;
    } else {
      if (readingQuestion) {
        currentQText.push(line);
      }
    }
  }
}

console.log(`Extracted ${qList.length} question blocks.`);
const withDiag = qList.filter(q => q.hasDiagramKw);
console.log(`Questions with diagram keywords: ${withDiag.length}`);
withDiag.slice(0, 20).forEach(q => console.log(`  Page ${q.page} (Q candidate: ${q.qNumCandidate}): ${q.snippet}`));
