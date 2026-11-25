import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dump = fs.readFileSync(path.resolve(__dirname, 'missing_between_dump.txt'), 'utf8');
const sections = dump.split('=== MISSING Q');

for (let i = 1; i < sections.length; i++) {
  const lines = sections[i].split('\n');
  const title = lines[0].trim();
  console.log(`\n=================== MISSING Q${title} ===================`);
  // print lines that contain questions, [4 marks], ANSWER
  for (let j = 0; j < lines.length; j++) {
    const l = lines[j];
    if (l.includes('[4 marks') || l.includes('ANSWER:') || l.startsWith('--- Page') || /^[0-9%#$]{1,4}[\.\s]/.test(l.trim())) {
      console.log(`  [L${j}] ${l.trim().slice(0, 100)}`);
    }
  }
}
