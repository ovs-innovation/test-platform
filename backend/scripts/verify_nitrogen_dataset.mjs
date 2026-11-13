import { allNitrogenQuestions } from './nitrogen_pyq_questions_data.mjs';

const officialAnswers = {
  1: "A", 2: "B", 3: "C", 4: "B", 5: "A", 6: "A", 7: "C", 8: "A", 9: "C", 10: "C",
  11: "C", 12: "A", 13: "A", 14: "A", 15: "C", 16: "A", 17: "B", 18: "B", 19: "A", 20: "C",
  21: "D", 22: "C", 23: "C", 24: "B", 25: "D", 26: "B", 27: "C", 28: "D", 29: "D", 30: "C",
  31: "A", 32: "C", 33: "B", 34: "C", 35: "C", 36: "C", 37: "C", 38: "D", 39: "C", 40: "D",
  41: "B", 42: "A", 43: "A", 44: "D", 45: "A", 46: "A", 47: "B", 48: "C", 49: "A", 50: "A",
  51: "C", 52: "A", 53: "B", 54: "D", 55: "B", 56: "A", 57: "A", 58: "C", 59: "D", 60: "B",
  61: "C", 62: "B", 63: "A", 64: "B", 65: "C", 66: "B", 67: "D", 68: "C", 69: "D", 70: "D",
  71: "A", 72: "C", 73: "B", 74: "B", 75: "A", 76: "C"
};

console.log(`Verifying ${allNitrogenQuestions.length} questions...`);

let errors = 0;

for (let i = 1; i <= 76; i++) {
  const q = allNitrogenQuestions.find(item => item.question_number === i);
  if (!q) {
    console.error(`Missing Question ${i}`);
    errors++;
    continue;
  }

  const expectedAns = officialAnswers[i];
  if (q.correct_option !== expectedAns) {
    console.error(`Mismatch Q${i}: Got ${q.correct_option}, Expected ${expectedAns}`);
    errors++;
  }

  if (!q.question_text || !q.option_a || !q.option_b || !q.option_c || !q.option_d || !q.solution) {
    console.error(`Incomplete fields in Q${i}`);
    errors++;
  }
}

if (errors === 0) {
  console.log('SUCCESS: All 76 questions verified 100% against official answer key with complete fields!');
} else {
  console.error(`Found ${errors} issues during verification.`);
  process.exit(1);
}

