import fs from 'fs';

const qs = JSON.parse(fs.readFileSync('./backend/scripts/morphology_all_questions.json', 'utf8'));

const testNums = [1, 2, 5, 11, 15, 16, 26, 31, 32, 86, 95, 96, 97, 107, 162];

for (const num of testNums) {
  const q = qs.find(x => x.q_num === num);
  console.log(`\n================ Q${q.q_num} (${q.exam}) ================`);
  console.log('Text:', q.text.slice(0, 150));
  console.log('Options:', q.options);
  console.log('Correct:', q.correct_index, '->', q.options[q.correct_index]);
  console.log('Image:', q.image_url);
  console.log('Solution:', q.solution.slice(0, 150));
}

