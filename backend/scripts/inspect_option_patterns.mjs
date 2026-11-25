import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const prelim = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'dual_nature_jee_final_217.json'), 'utf8'));

// Check Q1 to Q10
prelim.slice(0, 10).forEach(q => {
  console.log(`\n=== Q${q.q_num} ===`);
  console.log('Text snippet:', q.question_text.slice(0, 100));
  console.log('Options:', q.options);
});
