import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), 'utf8'));

[2, 3, 4, 6, 10, 12].forEach(q => {
  console.log(`\n================ Q${q} ================`);
  console.log(parsed[q].rawQuestion);
});
