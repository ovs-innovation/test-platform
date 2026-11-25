import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const data = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_dummy_qs_raw.json'), 'utf8'));

const dummyQs = Object.keys(data).map(Number).sort((a,b) => a - b);
const part1Qs = dummyQs.slice(0, 43);
const part2Qs = dummyQs.slice(43);

fs.writeFileSync(
  path.resolve(__dirname, 'dummy_qs_part1_dump.txt'),
  part1Qs.map(q => `=== Q${q} (Key: ${data[q].key}) ===\nQUESTION:\n${data[q].rawQuestion}\nSOLUTION:\n${data[q].rawSolution}\n`).join('\n')
);

fs.writeFileSync(
  path.resolve(__dirname, 'dummy_qs_part2_dump.txt'),
  part2Qs.map(q => `=== Q${q} (Key: ${data[q].key}) ===\nQUESTION:\n${data[q].rawQuestion}\nSOLUTION:\n${data[q].rawSolution}\n`).join('\n')
);

console.log(`Dumped part1 (${part1Qs.length} Qs: ${part1Qs[0]}..${part1Qs[part1Qs.length-1]})`);
console.log(`Dumped part2 (${part2Qs.length} Qs: ${part2Qs[0]}..${part2Qs[part2Qs.length-1]})`);
