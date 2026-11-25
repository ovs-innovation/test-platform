import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const questions = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'electrostatics_jee_final_300.json'), 'utf8'));

console.log('Total questions in electrostatics_jee_final_300.json:', questions.length);

[0, 1, 3, 4, 12, 13].forEach(idx => {
  const q = questions[idx];
  console.log(`\n--- Index ${idx} (Q #${idx+1}) ---`);
  console.log('Text:', q.question_text);
  console.log('Options:', q.options);
  console.log('Correct index / key:', q.correct_index, q.correct_key);
  console.log('Image:', q.image_url);
  console.log('Sol:', q.solution ? q.solution.slice(0, 80) : null);
});
