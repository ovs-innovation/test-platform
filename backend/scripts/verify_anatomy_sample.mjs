import fs from 'fs';

const qs = JSON.parse(fs.readFileSync('./backend/scripts/anatomy_all_questions.json', 'utf8'));

const testNums = [1, 2, 6, 7, 11, 17, 20, 93, 94, 99, 127];

for (const num of testNums) {
  const q = qs.find(x => x.q_num === num);
  console.log(`\n================ Q${q.q_num} (${q.exam}) ================`);
  console.log('Text:', q.text.slice(0, 160));
  console.log('Options:', q.options);
  console.log('Correct:', q.correct_index, 'Indices:', q.correct_indices);
  console.log('Image:', q.image_url);
  console.log('Solution:', q.solution.slice(0, 160));
}
