import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'current_electricity_jee_final_408.json'), 'utf8'));

for (let q = 51; q <= 70; q++) {
  const item = questions.find(x => x.q_num === q);
  console.log(`\n=================== QUESTION ${q} [Ans: ${item?.correct_option || item?.numeric_answer}] ===================`);
  console.log('Text:', item?.question_text);
  console.log('Options:', item?.options);
  console.log('Solution:', item?.solution?.slice(0, 150));
}
