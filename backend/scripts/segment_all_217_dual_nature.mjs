import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_clean_diagram_urls.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_ocr_cache.json'), 'utf8'));

// 13 diagram questions
const diagramMap = {
  13: diagramUrls['dual_nature_q13_diagram.png'],
  14: diagramUrls['dual_nature_q14_diagram.png'],
  15: diagramUrls['dual_nature_q15_diagram.png'],
  27: diagramUrls['dual_nature_q27_diagram.png'],
  35: diagramUrls['dual_nature_q35_diagram.png'],
  62: diagramUrls['dual_nature_q62_diagram.png'],
  75: diagramUrls['dual_nature_q75_diagram.png'],
  76: diagramUrls['dual_nature_q76_diagram.png'],
  153: diagramUrls['dual_nature_q153_diagram.png'],
  164: diagramUrls['dual_nature_q164_diagram.png'],
  172: diagramUrls['dual_nature_q172_diagram.png'],
  195: diagramUrls['dual_nature_q195_diagram.png'],
  210: diagramUrls['dual_nature_q210_diagram.png']
};

// 15 Numerical questions
const NUMERICAL_QUESTIONS = new Set([64, 71, 77, 78, 86, 96, 101, 103, 112, 117, 140, 190, 203, 207, 216]);

// Construct linear text with page tags
let fullLinear = '';
for (let p = 1; p <= 114; p++) {
  fullLinear += `\n--- PAGE ${p} ---\n` + (cache[p] || '');
}

// Map each question number to its start index in fullLinear
const qStarts = {};

// Regex patterns to find Question Q
function findQStart(text, q) {
  // Pattern 1: standard "q. " or "\nq."
  const patterns = [
    new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}\\s*[\\.\\:\\)]\\s*`, 'i'),
  ];

  // Specific OCR substitutions
  if (q === 11) patterns.push(/(?:^|\n)\s*Il\s*[\.\:\)]/i, /(?:^|\n)\s*11\s*[\.\:\)]/i);
  if (q === 51) patterns.push(/(?:^|\n)\s*S51\s*[\.\:\)]/i, /(?:^|\n)\s*51\s*[\.\:\)]/i);
  if (q === 110) patterns.push(/(?:^|\n)\s*M0\s*[\.\:\)]/i, /(?:^|\n)\s*110\s*[\.\:\)]/i);
  if (q === 111) patterns.push(/(?:^|\n)\s*MM\s*[\.\:\)]/i, /(?:^|\n)\s*111\s*[\.\:\)]/i);
  if (q === 113) patterns.push(/(?:^|\n)\s*M3\s*[\.\:\)]/i, /(?:^|\n)\s*113\s*[\.\:\)]/i);
  if (q === 115) patterns.push(/(?:^|\n)\s*M5\s*[\.\:\)]/i, /(?:^|\n)\s*115\s*[\.\:\)]/i);
  if (q === 117) patterns.push(/(?:^|\n)\s*M7\s*[\.\:\)]/i, /(?:^|\n)\s*117\s*[\.\:\)]/i);
  if (q === 119) patterns.push(/(?:^|\n)\s*M9\s*[\.\:\)]/i, /(?:^|\n)\s*119\s*[\.\:\)]/i);
  if (q === 133) patterns.push(/(?:^|\n)\s*133\s*[\.\:\)]/i, /(?:^|\n)\s*B3\s*[\.\:\)]/i);
  if (q === 135) patterns.push(/(?:^|\n)\s*135\s*[\.\:\)]/i, /(?:^|\n)\s*B5\s*[\.\:\)]/i);
  if (q === 159) patterns.push(/(?:^|\n)\s*159\s*[\.\:\)]/i, /(?:^|\n)\s*155\s*[\.\:\)]/i);
  if (q === 182) patterns.push(/(?:^|\n)\s*82\s*[\.\:\)]\s*An electron/i, /(?:^|\n)\s*182\s*[\.\:\)]/i);
  if (q === 185) patterns.push(/(?:^|\n)\s*85\s*[\.\:\)]/i, /(?:^|\n)\s*185\s*[\.\:\)]/i);
  if (q === 190) patterns.push(/(?:^|\n)\s*i308\s*The ratio/i, /(?:^|\n)\s*190\s*[\.\:\)]/i);
  if (q === 191) patterns.push(/(?:^|\n)\s*191\s*[\.\:\)]/i);
  if (q === 192) patterns.push(/(?:^|\n)\s*ea\s*If\s*A\s*and\s*K/i, /(?:^|\n)\s*192\s*[\.\:\)]/i);

  for (const pat of patterns) {
    const m = text.match(pat);
    if (m) {
      return { index: m.index, matchLen: m[0].length };
    }
  }
  return null;
}

// Scan sequentially through fullLinear
let searchPos = 0;
for (let q = 1; q <= 217; q++) {
  const sub = fullLinear.slice(searchPos);
  const found = findQStart(sub, q);
  if (found) {
    const absIdx = searchPos + found.index;
    qStarts[q] = absIdx;
    searchPos = absIdx + found.matchLen;
  } else {
    // Search from 0 if out of order
    const found2 = findQStart(fullLinear, q);
    if (found2) {
      qStarts[q] = found2.index;
    } else {
      console.log(`Could not find start for Q${q}`);
    }
  }
}

console.log(`Located start positions for ${Object.keys(qStarts).length} / 217 questions.`);

// Now extract each question chunk
const chunks = {};
for (let q = 1; q <= 217; q++) {
  const start = qStarts[q];
  const end = q < 217 ? qStarts[q + 1] : fullLinear.length;
  if (start !== undefined && end !== undefined && end > start) {
    chunks[q] = fullLinear.slice(start, end);
  } else {
    console.log(`Invalid range for Q${q}: ${start} -> ${end}`);
  }
}

console.log(`Extracted chunks for ${Object.keys(chunks).length} / 217 questions.`);
fs.writeFileSync(path.resolve(__dirname, 'dual_nature_raw_chunks.json'), JSON.stringify(chunks, null, 2));
