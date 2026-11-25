import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GRAVITATION_PART3 } from './clean_gravitation_part3.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));

for (const q of GRAVITATION_PART3) {
  const offKey = keys[q.qNum];
  if (q.question_type === 'numerical') {
    q.numeric_answer = String(offKey);
    q.correct_option = null;
  } else {
    const offIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey];
    q.correct_option = offIdx;
  }
}

const fileContent = `import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

export const GRAVITATION_PART3 = ${JSON.stringify(GRAVITATION_PART3, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, 'clean_gravitation_part3.mjs'), fileContent);
console.log('Updated clean_gravitation_part3.mjs with 100% official key matching.');
