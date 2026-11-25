import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_jee_final_408.json'), 'utf8'));

for (let i = 50; i < 75; i++) {
  const q = questions[i];
  console.log(`Q${q.q_num} [${q.question_type}] Ans: ${q.correct_option || q.numeric_answer}`);
  console.log('  Text:', (q.question_text || '').slice(0, 110));
  console.log('  Opts:', q.options);
}
