import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), 'utf8'));

for (let q = 1; q <= 25; q++) {
  console.log(`\n================ Q${q} (Key: ${parsed[q].key}) ================`);
  console.log('Raw Question:\n' + parsed[q].rawQuestion);
  console.log('Raw Solution:\n' + parsed[q].rawSolution.slice(0, 150));
}
