import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_jee_official_keys.json'), 'utf8'));
const diagUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'ray_clean_diagram_urls.json'), 'utf8'));

// Split pages
const pageBlocks = linearText.split(/=== PAGE (\d+) ===/).slice(1);
const pages = [];
for (let i = 0; i < pageBlocks.length; i += 2) {
  pages.push({ pageNum: parseInt(pageBlocks[i], 10), text: pageBlocks[i + 1] || '' });
}

console.log(`Loaded ${pages.length} pages.`);

// Let's create an array of all question chunks
// In AcadXL PDFs, each question typically contains:
// Question number and text
// Options (A), (B), (C), (D) or numerical
// Mark tag "[4 marks...]"
// ANSWER: <ans>
// Solution
// Let's inspect where each question is located
const questions = [];

for (let q = 1; q <= 298; q++) {
  const ans = keys[String(q)];
  const isNumeric = !['A', 'B', 'C', 'D'].includes(ans);
  const diagFile = `ray_q${q}_diagram.png`;
  const diagUrl = diagUrls[diagFile] || null;

  questions.push({
    question_number: q,
    answer: ans,
    isNumeric,
    diagram_url: diagUrl
  });
}

console.log(`Prepared base structure for all 298 questions.`);
console.log(`- MCQs: ${questions.filter(q => !q.isNumeric).length}`);
console.log(`- Numericals: ${questions.filter(q => q.isNumeric).length}`);
console.log(`- Diagrams: ${questions.filter(q => q.diagram_url).length}`);

fs.writeFileSync(
  path.resolve(__dirname, 'ray_base_298_manifest.json'),
  JSON.stringify(questions, null, 2)
);
