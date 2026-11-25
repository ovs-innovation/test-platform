import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const detected = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_detected_diagrams.json'), 'utf8'));
const figQuestions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_stem_figure_questions.json'), 'utf8'));
const ocrPages = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_cache.json'), 'utf8'));

// Combine pages
const allPages = new Set();
figQuestions.forEach(fq => allPages.add(fq.page));
detected.forEach(d => allPages.add(d.page));

// Check page 3 (prism ray), page 20, etc.
allPages.add(3);
allPages.add(7);
allPages.add(20);

const sortedPages = Array.from(allPages).sort((a,b)=>a-b);
console.log(`Total candidate diagram pages: ${sortedPages.length}`);

// For each page, find the question number and options
const finalCandidates = [];
for (const p of sortedPages) {
  const text = ocrPages[String(p)] || '';
  const lines = text.split('\n');
  const qNums = [];
  for (const l of lines) {
    const m = l.match(/(?:^|\s)(?:Q\.?\s*)?(\d{1,3})[\.\-\)]\s*([A-Za-z].*)/);
    if (m && parseInt(m[1], 10) >= 1 && parseInt(m[1], 10) <= 298) {
      qNums.push(parseInt(m[1], 10));
    }
  }
  finalCandidates.push({ page: p, qNums: Array.from(new Set(qNums)) });
}

console.log(finalCandidates);
fs.writeFileSync(
  path.resolve(__dirname, 'ray_all_diagram_candidates.json'),
  JSON.stringify(finalCandidates, null, 2)
);
