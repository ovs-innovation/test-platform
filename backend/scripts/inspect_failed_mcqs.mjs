import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'p3_parsed_candidates.json'), 'utf8'));
const failedList = [
  203, 205, 208, 209, 213, 214, 216,
  219, 225, 226, 230, 231, 238, 239,
  242, 245, 247, 250, 251, 253, 257,
  259, 261, 263, 266, 267, 271, 274,
  276, 278, 279, 281, 282, 283, 284,
  286, 288, 290, 292, 293, 294, 296,
  297, 299
];

for (const q of failedList.slice(0, 15)) {
  console.log(`\n================ Q${q} (Key: ${data[q].key}) ================`);
  const lines = data[q].rawLines.filter(l => l.trim().length > 0);
  console.log(lines.join('\n'));
}
