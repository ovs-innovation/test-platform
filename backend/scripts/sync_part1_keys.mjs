import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GRAVITATION_PART1 } from './clean_gravitation_part1.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const keys = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_official_keys.json'), 'utf8'));

for (const q of GRAVITATION_PART1) {
  const offKey = keys[q.qNum];
  const offIdx = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 }[offKey];
  q.correct_option = offIdx;
}

const fileContent = `import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const diagramUrls = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'gravitation_diagram_urls.json'), 'utf8'));

export const GRAVITATION_PART1 = ${JSON.stringify(GRAVITATION_PART1, null, 2)};
`;

fs.writeFileSync(path.resolve(__dirname, 'clean_gravitation_part1.mjs'), fileContent);
console.log('Updated clean_gravitation_part1.mjs with 100% official key matching.');
