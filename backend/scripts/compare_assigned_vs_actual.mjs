import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_jee_final_300.json'), 'utf8'));
const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// On each page, check what questions are ACTUALLY printed on that page
// Compare with what unit was assigned to that page!
for (let i = 0; i < 300; i += 10) {
  const q = questions[i];
  // Find which page ACTUALLY contains "qNum." in cache
  let actualPage = -1;
  for (let p = 1; p <= 170; p++) {
    if (new RegExp(`(^|\\n)\\s*${q.q_num}[\\.\\s\\:\\,]`, 'i').test(cache[String(p)] || '')) {
      actualPage = p;
      break;
    }
  }
  console.log(`Q${q.q_num}: assignedPage=${q.page}, actualPage=${actualPage}`);
}
