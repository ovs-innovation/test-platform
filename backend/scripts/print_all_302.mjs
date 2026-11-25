import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const answers = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_all_302_answers.json'), 'utf8'));

// Check each answer
for (let i = 0; i < answers.length; i++) {
  const a = answers[i];
  // check if rawAns is empty or weird
  console.log(`[${i + 1}] p${a.page}: rawAns='${a.rawAns}', marks='${a.marksLine}'`);
}
