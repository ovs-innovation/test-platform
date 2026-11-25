import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Strict diagram keywords/phrases
const diagPatterns = [
  /as\s+shown\s+in\s+(?:the\s+)?(?:figure|diagram|circuit)/i,
  /in\s+the\s+(?:figure|diagram|circuit|given\s+figure|adjacent\s+figure)/i,
  /shown\s+in\s+(?:the\s+)?(?:figure|diagram|circuit)/i,
  /given\s+in\s+(?:the\s+)?(?:figure|diagram)/i,
  /shown\s+below/i,
  /represented\s+by\s+the\s+(?:graph|figure|diagram)/i,
  /plotted\s+as\s+a\s+function/i,
  /variation\s+of\s+.*(?:graph|curve)/i,
  /figure\s+shows/i,
  /see\s+figure/i,
  /shown\s+in\s+fig/i,
  /circuit\s+diagram/i
];

let matchCount = 0;
const diagQuestions = [];

for (let p = 1; p <= 170; p++) {
  const text = cache[String(p)] || '';
  for (const pat of diagPatterns) {
    if (pat.test(text)) {
      matchCount++;
      diagQuestions.push({ page: p, pattern: pat.source });
      break;
    }
  }
}

console.log(`Pages with diagram pattern: ${diagQuestions.length}`);
console.log(diagQuestions.slice(0, 15));
