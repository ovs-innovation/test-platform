import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'emi_raw_parsed.json'), 'utf8'));

for (let q = 26; q <= 50; q++) {
  const p = parsed[q];
  console.log(`\n================ Q${q} (Page ${p.page}, Ans: ${p.officialAnswer}) ================`);
  console.log(p.rawQuestionLines.join('\n'));
}
