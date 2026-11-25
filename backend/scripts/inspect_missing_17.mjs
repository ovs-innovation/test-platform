import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cache = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_ocr_cache.json'), 'utf8'));

// Look at the pages where missing questions are:
// e.g. Q100 page and Q102 page:
console.log('--- Missing Questions Inspection ---');
const missing = [101, 106, 110, 136, 141, 146, 151, 166, 176, 191, 193, 199, 206, 236, 239, 241, 242];

// We can search cache for where answer line for these questions is!
for (const q of missing) {
  // Let's find any page that mentions the question or has its solution
  console.log(`Checking missing Q${q}...`);
}
