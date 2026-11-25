import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));
const pageMap = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_page_map.json'), 'utf8'));

// Fill the 13 manual mappings
const manualPages = {
  11: 4, 15: 5, 17: 6, 23: 8, 48: 29, 71: 44, 107: 66,
  158: 99, 169: 108, 172: 110, 206: 129, 207: 130, 211: 132
};
for (const [k, v] of Object.entries(manualPages)) {
  pageMap[k] = v;
}

// Build question records
const questions = [];

for (let q = 1; q <= 228; q++) {
  const p = pageMap[q] || 1;
  const nextP = pageMap[q + 1] || Math.min(144, p + 1);

  // Combine text from page p and nextP to make sure we don't truncate multi-page questions
  const pad = String(p).padStart(3, '0');
  const padNext = String(nextP).padStart(3, '0');
  let combinedPageText = (cache[pad] || '') + '\n' + (p !== nextP ? (cache[padNext] || '') : '');

  // Locate question start
  // Clean header
  let qText = '';
  let solutionText = '';
  let examSession = 'JEE Main';

  // Official answer from page 145
  const offKey = officialKeys[q] || 'A';
  const isNumerical = /^\d+$/.test(offKey);
  const correctOption = isNumerical ? null : (offKey.toUpperCase().charCodeAt(0) - 65);
  const numericAnswer = isNumerical ? offKey : null;

  // Extract exam session tag like `[4 marks, ...] - 2021 (25 Feb, Shift 1)`
  const examMatch = combinedPageText.match(/(?:\[.*?\]\s*[-–]?\s*)?(\b20\d{2}\s*(?:\([^)]+\))?)/);
  if (examMatch) {
    examSession = `JEE Main ${examMatch[1].trim()}`;
  }

  // Diagram URL
  const imgUrl = diagramUrls[q] || null;

  questions.push({
    qNum: q,
    page: p,
    exam: examSession,
    official_key: offKey,
    correct_option: correctOption,
    numeric_answer: numericAnswer,
    question_type: isNumerical ? 'numerical' : 'mcq',
    marks: 4,
    difficulty: 'medium',
    image_url: imgUrl,
    page_text: (cache[pad] || '').trim()
  });
}

console.log(`Prepared base records for all ${questions.length} questions.`);
fs.writeFileSync(path.resolve(__dirname, 'gravitation_base_records.json'), JSON.stringify(questions, null, 2));
