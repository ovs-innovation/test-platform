import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const linear = fs.readFileSync(path.resolve(__dirname, 'mag_jee_ocr_linear.txt'), 'utf8');

const targetQs = [41, 42, 47, 162, 164, 166, 168, 177, 224, 259, 260, 261, 262, 263, 264, 265, 266, 267, 268];

for (const q of targetQs) {
  const regex = new RegExp(`(?:^|\\n)\\s*Q?${q}\\.\\s*([^\\n]+(?:\\n[^\\n]+){1,5})`, 'i');
  const m = linear.match(regex);
  if (m) {
    console.log(`=== Q${q} snippet ===`);
    console.log(m[0]);
  } else {
    console.log(`Q${q} not found with strict regex, checking looser search`);
    const idx = linear.indexOf(`${q}.`);
    if (idx !== -1) {
      console.log(`=== Q${q} context ===`);
      console.log(linear.slice(idx - 20, idx + 200));
    }
  }
}
