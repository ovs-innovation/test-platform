import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_cache.json'), 'utf8'));

// We want to list every question that has a diagram
// Let's search each page
const questionsWithFigs = [];

for (let p = 1; p <= 202; p++) {
  const text = pages[String(p)] || '';
  // Check if page mentions figure in the question section (before ANSWER)
  const answerIdx = text.search(/ANSWER|Answer/i);
  const qSection = answerIdx !== -1 ? text.slice(0, answerIdx) : text;
  
  if (/(?:figure|shown in|shown below|following figure|given figure|in figure)/i.test(qSection)) {
    // Extract question number or text
    const m = qSection.match(/(?:^|\n)\s*(\d+)\.\s*([^\n]+)/);
    questionsWithFigs.push({
      page: p,
      qGuess: m ? m[1] : null,
      headline: m ? m[2].slice(0, 80) : qSection.slice(0, 80).replace(/\n/g, ' ')
    });
  }
}

console.log(`Found ${questionsWithFigs.length} questions referencing figures/diagrams.`);
questionsWithFigs.forEach(qf => {
  console.log(`P${qf.page} (Q${qf.qGuess || '?'}): ${qf.headline}`);
});
