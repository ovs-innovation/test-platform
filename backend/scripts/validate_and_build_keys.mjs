import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Find text around specific questions
function inspectQ(qNum) {
  for (let p = 1; p <= 170; p++) {
    const text = cache[String(p)] || '';
    const regex = new RegExp(`(^|\\n)\\s*${qNum}[\\.\\s\\:\\-]`, 'i');
    if (regex.test(text)) {
      return { page: p, text: text.substring(0, 1500) };
    }
  }
  return null;
}

const checkList = [10, 11, 105, 122, 136, 167, 194, 211, 217, 223, 236, 265, 266, 271, 282, 283];
for (const q of checkList) {
  const res = inspectQ(q);
  console.log(`Q${q}: found on page ${res ? res.page : 'NOT FOUND'}`);
  if (res) {
    // print snippet around answer
    const lines = res.text.split('\n');
    const ansLine = lines.find(l => /answ/i.test(l));
    console.log(`   Q${q} snippet: ${ansLine}`);
  }
}
