import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CACHE_FILE = path.resolve(__dirname, 'current_electricity_ocr_cache.json');
const OUT_FILE = path.resolve(__dirname, 'current_electricity_all_408_answers.json');

async function extractAnswers() {
  if (!fs.existsSync(CACHE_FILE)) {
    console.error('Cache file does not exist yet!');
    return;
  }
  const cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  const totalPages = Object.keys(cache).length;
  console.log(`Cache has ${totalPages} pages.`);

  const answers = [];

  for (let p = 1; p <= Math.min(211, totalPages); p++) {
    const text = cache[String(p)] || '';
    const lines = text.split('\n');

    for (let lIdx = 0; lIdx < lines.length; lIdx++) {
      const line = lines[lIdx].trim();
      if (!line) continue;

      // Check if line looks like an ANSWER line
      if (
        /(?:^|\s)(?:answe?r|ansv?e?|ans\b)[^a-zA-Z0-9]*\s*[:=\-]\s*([A-D0-9\.\-]+)/i.test(line) ||
        /^ansv?e?[=:\s]+([A-D0-9\.\-]+)/i.test(line) ||
        /^answ[a-z]{0,3}\s*[:=]\s*([A-D0-9\.\-]+)/i.test(line) ||
        /^answer\s*([A-D0-9\.\-]+)/i.test(line)
      ) {
        let m = line.match(/(?:answe?r|ansv?e?|ans\b)[^a-zA-Z0-9]*\s*[:=\-]?\s*([A-D0-9\.\-]+)/i);
        if (m) {
          let ansVal = m[1].trim().toUpperCase();
          // Clean common OCR misread of A/B/C/D or numbers
          if (ansVal === 'O' || ansVal === '0' || ansVal === 'D)') ansVal = 'D';
          if (ansVal === '8' || ansVal === '8)') ansVal = 'B';
          if (ansVal === '©' || ansVal === '©)') ansVal = 'C';
          answers.push({
            p,
            lIdx,
            line,
            rawAns: m[1],
            cleanAns: ansVal
          });
        }
      }
    }
  }

  console.log(`Found ${answers.length} ANSWER lines across pages 1..211.`);
  fs.writeFileSync(OUT_FILE, JSON.stringify(answers, null, 2));
}

extractAnswers().catch(console.error);
