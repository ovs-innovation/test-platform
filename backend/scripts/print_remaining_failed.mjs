import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const failedData = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_47_failed_lines.json'), 'utf8'));

const keys = Object.keys(failedData).map(Number).filter(q => q > 40);

console.log(`Remaining ${keys.length} questions to check.`);
keys.forEach(q => {
  console.log(`\n================ Q${q} ================`);
  const lines = failedData[q];
  // print last 5 lines (options area)
  lines.slice(Math.max(0, lines.length - 6)).forEach(l => console.log('  ' + l));
});
