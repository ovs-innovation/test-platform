import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const qs = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_jee_final_408.json'), 'utf8'));

console.log(`Analyzing ${qs.length} questions...`);

const garbledRegex = /(iy tha|creat diagean|sesigance|beqwesn|dismalricy|oppouste|Brshosrs|klanticel|vanmotes|elgg|feg-Testeu|circur|Tow bang|redstance)/i;

const flagged = [];
for (let i = 0; i < qs.length; i++) {
  const q = qs[i];
  const qNum = i + 1;
  const isGarbled = garbledRegex.test(q.question_text);
  const badOptions = (q.options || []).some(o => /^(100%|200%|300%|50%|Option [A-D]|\([A-D]\))$/.test(String(o).trim()));
  const shortText = q.question_text.length < 30;

  if (isGarbled || badOptions || shortText) {
    flagged.push({
      qNum,
      isGarbled,
      badOptions,
      shortText,
      snippet: q.question_text.substring(0, 80),
      options: q.options
    });
  }
}

console.log(`Total flagged questions needing proper extraction: ${flagged.length} / 408`);
console.log('Sample flagged questions:');
flagged.slice(0, 10).forEach(f => {
  console.log(`Q${f.qNum}: garbled=${f.isGarbled}, badOpts=${f.badOptions}, short=${f.shortText} | "${f.snippet}"`);
});
