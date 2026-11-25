import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const officialKeys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));
const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_ocr_cache.json'), 'utf8'));

// Helper to clean and format text
function cleanText(str) {
  if (!str) return '';
  return str
    .replace(/AcadXL[™®\s]*/gi, '')
    .replace(/PREVIOUS YEAR QUESTIONS WITH SOLUTIONS.*?\n/gi, '')
    .replace(/EDUCATION WITH DISCIPLINE/gi, '')
    .replace(/Free to download.*?\n/gi, '')
    .replace(/Practise these online.*?\n/gi, '')
    .replace(/Gravitation — JEE Main PYQ Bank.*?\n/gi, '')
    .replace(/Time: \d+ minutes - Maximum marks: \d+ - Questions: \d+/gi, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Map each question number to its page
// Let's create an explicit page map for all 228 questions!
const qPageMap = {};

// We can scan sequentially
let currQ = 1;
for (let p = 1; p <= 144; p++) {
  const pad = String(p).padStart(3, '0');
  const text = cache[pad] || '';
  
  // Find all question numbers on this page
  // Check q in currQ .. currQ + 5
  for (let q = currQ; q <= Math.min(228, currQ + 5); q++) {
    // Regex for q
    let re = new RegExp(`(?:^|\\n)\\s*(?:Q\\.?\\s*)?${q}[\\.:\\-\\)]\\s+`, 'i');
    if (q === 17) re = /(?:^|\n)\s*(?:bo|17)[\.:\-\)]\s+/i;
    if (q === 23) re = /(?:^|\n)\s*(?:2a|23)[\.:\-\)]\s+/i;
    if (q === 33) re = /(?:^|\n)\s*(?:33)[\.:\-\)\s]+/i;
    if (q === 48) re = /(?:^|\n)\s*(?:a|48)[\.:\-\)]\s+A body/i;
    if (q === 51) re = /(?:^|\n)\s*(?:5%|51)[\.:\-\)]\s+/i;
    if (q === 64) re = /(?:^|\n)\s*(?:84|64)[\.:\-\)]\s+/i;
    if (q === 71) re = /(?:^|\n)\s*(?:n PIER|71)[\.:\-\)]\s+/i;
    if (q === 103) re = /(?:^|\n)\s*(?:193|103)[\.:\-\)]\s+/i;
    if (q === 106) re = /(?:^|\n)\s*(?:108|106)[\.:\-\)]\s+The minimum/i;
    if (q === 110) re = /(?:^|\n)\s*(?:M0|110)[\.:\-\)]\s+/i;
    if (q === 111) re = /(?:^|\n)\s*(?:M|111)[\.:\-\)]\s+Inside/i;
    if (q === 112) re = /(?:^|\n)\s*(?:M2|112)[\.:\-\)]\s+/i;
    if (q === 113) re = /(?:^|\n)\s*(?:["']3|113)[\.:\-\)]\s+/i;
    if (q === 114) re = /(?:^|\n)\s*(?:na|114)[\.:\-\)]\s+/i;
    if (q === 115) re = /(?:^|\n)\s*(?:M5|115)[\.:\-\)]\s+/i;
    if (q === 116) re = /(?:^|\n)\s*(?:M86|116)[\.:\-\)]\s+/i;
    if (q === 117) re = /(?:^|\n)\s*(?:M7|117)[\.:\-\)]\s+/i;
    if (q === 118) re = /(?:^|\n)\s*(?:ns|118)[\.:\-\)]\s+/i;
    if (q === 119) re = /(?:^|\n)\s*(?:M9|119)[\.:\-\)]\s+/i;
    if (q === 141) re = /(?:^|\n)\s*(?:181|141)[\.:\-\)]\s+An object/i;
    if (q === 151) re = /(?:^|\n)\s*(?:51|151)[\.:\-\)]\s+The time period/i;
    if (q === 158) re = /(?:^|\n)\s*(?:["']58|158)[\.:\-\)]\s+/i;
    if (q === 164) re = /(?:^|\n)\s*(?:184|164)[\.:\-\)]\s+The weight/i;
    if (q === 169) re = /(?:^|\n)\s*(?:fees|169)[\.:\-\)]\s+/i;
    if (q === 172) re = /(?:^|\n)\s*(?:72|172)[\.:\-\)]\s+.*The radii/i;
    if (q === 174) re = /(?:^|\n)\s*(?:74|174)[\.:\-\)]\s+.*gravitational potential/i;
    if (q === 206) re = /(?:^|\n)\s*(?:208|206)[\.:\-\)]\s+.*satellite of mass/i;
    if (q === 211) re = /(?:^|\n)\s*(?:2M|211)[\.:\-\)]\s+/i;
    if (q === 219) re = /(?:^|\n)\s*219[\.:\-\)\s]+/i;

    if (re.test(text)) {
      qPageMap[q] = p;
      currQ = q + 1;
    }
  }
}

console.log(`Mapped ${Object.keys(qPageMap).length}/228 questions to pages.`);
const missing = [];
for (let q = 1; q <= 228; q++) {
  if (!qPageMap[q]) missing.push(q);
}
if (missing.length > 0) {
  console.log('Unmapped questions:', missing.join(', '));
}

fs.writeFileSync(path.resolve(__dirname, 'gravitation_page_map.json'), JSON.stringify(qPageMap, null, 2));
