import fs from 'fs';

const questions = JSON.parse(fs.readFileSync('backend/scripts/biotech_app_parsed_questions.json', 'utf8'));

let valid = 0;
for (const q of questions) {
  if (!q.question_text || q.question_text.length < 5) {
    console.error(`Q${q.qNum} invalid question_text:`, q.question_text);
  } else if (!q.options || q.options.length !== 4) {
    console.error(`Q${q.qNum} options count !== 4:`, q.options);
  } else if (q.options.some(o => !o || o.trim().length === 0)) {
    console.error(`Q${q.qNum} has empty option:`, q.options);
  } else if (!['A', 'B', 'C', 'D'].includes(q.correct_option)) {
    console.error(`Q${q.qNum} invalid correct_option:`, q.correct_option);
  } else {
    valid++;
  }
}

console.log(`Validation: ${valid} / ${questions.length} questions valid!`);

