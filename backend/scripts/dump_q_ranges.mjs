import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linearText = fs.readFileSync(path.resolve(__dirname, 'ray_jee_ocr_linear.txt'), 'utf8');

// Let's write a function to search for a question number in the linear text
function findQ(qNum) {
  // Regex to find start of question
  const re = new RegExp(`(?:^|\\n)(?:Q\\.?\\s*)?${qNum}[\\.\\-\\)]\\s*([^\\n]+(?:\\n(?!\\d+[\\.\\-\\)]|=== PAGE)[^\\n]+)*)`, 'i');
  const m = linearText.match(re);
  return m ? m[0].trim() : null;
}

for (let q = 1; q <= 20; q++) {
  const qText = findQ(q);
  console.log(`\n--- Q${q} ---`);
  if (qText) {
    console.log(qText.slice(0, 300));
  } else {
    console.log('Not directly found by regex');
  }
}
