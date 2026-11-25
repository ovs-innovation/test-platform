import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), 'utf8'));
const prelim = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_cleaned_prelim.json'), 'utf8'));

const needingOptions = prelim.filter(q => q.question_type === 'mcq' && (!q.options || q.options.length !== 4 || q.options.some(o => !o))).map(q => q.q_num);

console.log(`Needing options: ${needingOptions.length}`);
needingOptions.slice(0, 10).forEach(q => {
  console.log(`\n================ Q${q} ================`);
  console.log(parsed[q].rawQuestion);
});
