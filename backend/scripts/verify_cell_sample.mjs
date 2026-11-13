import fs from 'fs';

const qs = JSON.parse(fs.readFileSync('./backend/scripts/cell_all_questions.json', 'utf8'));

const testNums = [1, 6, 15, 27, 42, 86, 88, 96, 100, 117, 178, 195];

for (const num of testNums) {
  const q = qs.find(x => x.q_num === num);
  console.log(`\n================ Q${q.q_num} (${q.exam}) ================`);
  console.log('Text:', q.text.slice(0, 160));
  console.log('Options:', q.options);
  console.log('Correct:', q.correct_index, '->', q.options[q.correct_index]);
  console.log('Image:', q.image_url);
  console.log('Solution:', q.solution.slice(0, 160));
}

