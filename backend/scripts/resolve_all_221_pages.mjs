import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_ocr_cache.json'), 'utf8'));
const qLocations = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'basic_chem_page_map_temp.json'), 'utf8'));

// Fill gaps by inspecting between q-1 and q+1
for (let q = 1; q <= 221; q++) {
  if (!qLocations[q]) {
    // Find prev known
    let prevQ = q - 1;
    while (prevQ >= 1 && !qLocations[prevQ]) prevQ--;
    const minP = prevQ >= 1 ? qLocations[prevQ] : 1;

    // Find next known
    let nextQ = q + 1;
    while (nextQ <= 221 && !qLocations[nextQ]) nextQ++;
    const maxP = nextQ <= 221 ? qLocations[nextQ] : 78;

    // Check pages from minP to maxP
    let foundPage = null;
    for (let p = minP; p <= maxP; p++) {
      const text = cache[String(p).padStart(3, '0')] || '';
      // Look for q in text (with various punctuation or line starts)
      const pats = [
        new RegExp(`(?:^|\\n)\\s*${q}[\\.:\\-\\)]`, 'i'),
        new RegExp(`(?:^|\\n)\\s*${q}\\s+[A-Z]`, 'i'),
        new RegExp(`(?:^|\\n)\\s*Q\\.?\\s*${q}[\\.:\\-\\)]`, 'i'),
        new RegExp(`\\b${q}[\\.:\\)]\\s+[A-Z]`, 'i')
      ];
      for (const pat of pats) {
        if (pat.test(text)) {
          foundPage = p;
          break;
        }
      }
      if (foundPage) break;
    }

    if (foundPage) {
      qLocations[q] = foundPage;
    } else {
      // If still not found, search for keywords or assign by interpolation
      qLocations[q] = minP; // initial fallback, to be refined
      console.log(`Q${q} not found by regex between pages ${minP} and ${maxP}, defaulting to ${minP}`);
    }
  }
}

// Convert to pageQuestionRanges { [p]: [startQ, endQ] }
const pageQuestions = {};
for (let p = 1; p <= 78; p++) pageQuestions[p] = [];
for (let q = 1; q <= 221; q++) {
  const p = qLocations[q];
  if (p) pageQuestions[p].push(q);
}

const pageQuestionRanges = {};
for (let p = 1; p <= 78; p++) {
  const qs = pageQuestions[p];
  if (qs.length > 0) {
    pageQuestionRanges[p] = [Math.min(...qs), Math.max(...qs)];
  } else {
    // Page might continue a question from previous page
    pageQuestionRanges[p] = null;
  }
}

console.log('Page question ranges sample:');
for (let p = 1; p <= 15; p++) {
  console.log(`Page ${p}:`, pageQuestionRanges[p]);
}

fs.writeFileSync(path.resolve(__dirname, 'basic_chem_page_map.json'), JSON.stringify(qLocations, null, 2));
fs.writeFileSync(path.resolve(__dirname, 'basic_chem_page_ranges.json'), JSON.stringify(pageQuestionRanges, null, 2));
console.log('Saved basic_chem_page_map.json and basic_chem_page_ranges.json');
