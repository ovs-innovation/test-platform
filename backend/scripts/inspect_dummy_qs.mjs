import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const parsed = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_parsed_raw.json'), 'utf8'));
const dummyQs = [19, 26, 28, 31, 33, 41, 42, 43, 44, 45, 46, 49, 51, 52, 53, 54, 55, 56, 58, 60, 63, 66, 68, 70, 72, 74, 80, 83, 88, 91, 92, 93, 94, 95, 99, 102, 105, 106, 108, 113, 115, 124, 126, 128, 130, 132, 139, 142, 146, 149, 154, 156, 160, 162, 163, 165, 166, 168, 171, 174, 175, 176, 178, 179, 180, 181, 182, 184, 185, 186, 187, 191, 193, 195, 198, 199, 200, 201, 204, 205, 206, 208, 210, 213, 214, 217];

const out = {};
for (const qNum of dummyQs) {
  const item = parsed[String(qNum)];
  out[qNum] = {
    rawQuestion: item?.rawQuestion,
    rawSolution: item?.rawSolution,
    key: item?.key
  };
}

fs.writeFileSync(path.resolve(__dirname, 'dual_nature_dummy_qs_raw.json'), JSON.stringify(out, null, 2));
console.log(`Saved ${dummyQs.length} dummy questions to dual_nature_dummy_qs_raw.json`);
