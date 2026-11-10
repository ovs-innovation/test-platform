import { ALL_POM_PYQ_QUESTIONS } from './pom_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'A', 2: 'B', 3: 'D', 4: 'A', 5: 'D', 6: 'C', 7: 'A', 8: 'A', 9: 'B', 10: 'D',
  11: 'C', 12: 'A', 13: 'B', 14: 'A', 15: 'A', 16: 'B', 17: 'B', 18: 'B', 19: 'A', 20: 'C',
  21: 'C', 22: 'B', 23: 'C', 24: 'D', 25: 'B', 26: 'C', 27: 'C', 28: 'A', 29: 'A', 30: 'C',
  31: 'C', 32: 'D', 33: 'A', 34: 'C', 35: 'C', 36: 'C', 37: 'C', 38: 'B', 39: 'B', 40: 'B',
  41: 'D', 42: 'D', 43: 'D', 44: 'B', 45: 'A', 46: 'A', 47: 'B', 48: 'C', 49: 'D', 50: 'A',
  51: 'B', 52: 'A', 53: 'A', 54: 'B', 55: 'C', 56: 'D', 57: 'A', 58: 'A', 59: 'B', 60: 'C',
  61: 'A', 62: 'D', 63: 'D', 64: 'B', 65: 'B', 66: 'A', 67: 'B', 68: 'A'
};

const DIAGRAM_QS = [1, 2, 5, 6, 18, 27, 37, 51, 57];

function verify() {
  console.log(`Verifying ${ALL_POM_PYQ_QUESTIONS.length} questions...`);
  if (ALL_POM_PYQ_QUESTIONS.length !== 68) {
    throw new Error(`Expected 68 questions, found ${ALL_POM_PYQ_QUESTIONS.length}`);
  }

  let errors = 0;

  ALL_POM_PYQ_QUESTIONS.forEach((q, idx) => {
    const expectedNum = idx + 1;
    if (q.qNum !== expectedNum) {
      console.error(`Mismatch qNum at index ${idx}: expected ${expectedNum}, got ${q.qNum}`);
      errors++;
    }

    // Verify no [YEAR] tags at the beginning of question text
    if (/^\s*\[(NEET|RE-NEET|AIPMT).*?\]/i.test(q.question)) {
      console.error(`Q${q.qNum} has year prefix tag in question text: "${q.question.slice(0, 30)}"`);
      errors++;
    }

    // Verify options count
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Q${q.qNum} has invalid options length: ${q.options?.length}`);
      errors++;
    }

    // Verify correct_option against official key
    const expectedLetter = OFFICIAL_KEY[q.qNum];
    const actualLetter = String.fromCharCode(65 + q.correct_option);
    if (actualLetter !== expectedLetter) {
      console.error(`Q${q.qNum} correct option mismatch: expected ${expectedLetter} (${expectedLetter.charCodeAt(0) - 65}), got ${actualLetter} (${q.correct_option})`);
      errors++;
    }

    // Verify non-empty solution
    if (!q.solution || q.solution.trim().length < 20) {
      console.error(`Q${q.qNum} has very short or empty solution!`);
      errors++;
    }

    // Check diagrams
    if (DIAGRAM_QS.includes(q.qNum)) {
      if (q.qNum === 2 || q.qNum === 57) {
        // Image options
        if (!q.options[0].startsWith('http')) {
          console.error(`Q${q.qNum} expected image URLs in options, got: ${q.options[0]}`);
          errors++;
        }
      } else {
        if (!q.image_url || !q.image_url.startsWith('http')) {
          console.error(`Q${q.qNum} expected image_url, got: ${q.image_url}`);
          errors++;
        }
      }
    }
  });

  if (errors === 0) {
    console.log('ALL 68 QUESTIONS PASSED STRICT VERIFICATION! 100% MATCH WITH OFFICIAL ANSWER KEY!');
  } else {
    throw new Error(`Verification failed with ${errors} errors!`);
  }
}

verify();

