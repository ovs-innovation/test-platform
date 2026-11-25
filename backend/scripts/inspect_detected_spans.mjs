import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const detected = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'mag_detected_diagrams.json'), 'utf8'));

console.log(`Detected items: ${detected.length}`);
for (const d of detected.slice(0, 25)) {
  console.log(`P${d.page}: hasFigWord=${d.hasFigWord}, spans=${d.spans.length}`);
  if (d.spans.length > 0) {
    for (const s of d.spans) {
      console.log(`   span: y=${s.y}, h=${s.h}, x=${s.x}, w=${s.w}`);
    }
  }
}
