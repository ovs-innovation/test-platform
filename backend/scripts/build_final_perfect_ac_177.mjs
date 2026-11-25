import fs from 'fs';

const p1 = JSON.parse(fs.readFileSync('backend/scripts/ac_part1_questions.json', 'utf8'));
const p2 = JSON.parse(fs.readFileSync('backend/scripts/ac_part2_questions.json', 'utf8'));
const p3 = JSON.parse(fs.readFileSync('backend/scripts/ac_part3_questions.json', 'utf8'));
const p4 = JSON.parse(fs.readFileSync('backend/scripts/ac_part4_questions.json', 'utf8'));

const all177 = [...p1, ...p2, ...p3, ...p4];

console.log(`Loaded parts: ${p1.length} + ${p2.length} + ${p3.length} + ${p4.length} = ${all177.length}`);

if (all177.length !== 177) {
  throw new Error(`Expected exactly 177 questions, got ${all177.length}`);
}

let mcqCount = 0;
let numCount = 0;
let diagCount = 0;
let dummyCount = 0;

all177.forEach((item, index) => {
  const expectedQ = index + 1;
  if (item.question_number !== expectedQ) {
    throw new Error(`Question number mismatch at index ${index}: expected ${expectedQ}, got ${item.question_number}`);
  }

  if (item.diagram_url) diagCount++;

  if (item.question_type === 'numerical') {
    numCount++;
    if (!Array.isArray(item.options) || item.options.length !== 0) {
      throw new Error(`Numerical Q${item.question_number} has non-empty options!`);
    }
    if (typeof item.numeric_answer !== 'number' || isNaN(item.numeric_answer)) {
      throw new Error(`Numerical Q${item.question_number} has invalid numeric_answer: ${item.numeric_answer}`);
    }
    if (item.numerical_tolerance !== 0) {
      throw new Error(`Numerical Q${item.question_number} has non-zero tolerance!`);
    }
  } else if (item.question_type === 'multiple_choice') {
    mcqCount++;
    if (!Array.isArray(item.options) || item.options.length !== 4) {
      throw new Error(`MCQ Q${item.question_number} has ${item.options?.length} options instead of 4!`);
    }
    for (const opt of item.options) {
      if (!opt || opt.trim() === '') {
        throw new Error(`MCQ Q${item.question_number} has blank option!`);
      }
      if (/^(\([A-D]\)|Option\s+[A-D])$/i.test(opt.trim())) {
        dummyCount++;
        console.warn(`WARNING: Potential dummy option in Q${item.question_number}: "${opt}"`);
      }
    }
    if (!['A', 'B', 'C', 'D'].includes(item.correct_answer)) {
      throw new Error(`MCQ Q${item.question_number} has invalid correct_answer: ${item.correct_answer}`);
    }
  } else {
    throw new Error(`Unknown question_type in Q${item.question_number}: ${item.question_type}`);
  }
});

console.log('--- VALIDATION SUMMARY ---');
console.log(`Total questions: ${all177.length} (Expected 177)`);
console.log(`MCQ count: ${mcqCount} (Expected 126)`);
console.log(`Numerical count: ${numCount} (Expected 51)`);
console.log(`Diagram count: ${diagCount} (Expected 34)`);
console.log(`Dummy options count: ${dummyCount} (Expected 0)`);

if (dummyCount > 0) {
  throw new Error(`Found ${dummyCount} dummy options! Must be strictly 0.`);
}

fs.writeFileSync('backend/scripts/ac_jee_final_177.json', JSON.stringify(all177, null, 2));
console.log('Successfully saved to backend/scripts/ac_jee_final_177.json');
