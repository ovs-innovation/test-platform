import { ROTATIONAL_PYQ_QUESTIONS } from './rotational_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'D', 2: 'C', 3: 'C', 4: 'B', 5: 'D',
  6: 'B', 7: 'A', 8: 'D', 9: 'A', 10: 'B',
  11: 'A', 12: 'D', 13: 'C', 14: 'B', 15: 'B',
  16: 'B', 17: 'B', 18: 'A', 19: 'B', 20: 'B',
  21: 'A', 22: 'B', 23: 'B', 24: 'C', 25: 'B',
  26: 'D', 27: 'A', 28: 'D', 29: 'B', 30: 'A',
  31: 'C', 32: 'B', 33: 'A', 34: 'D', 35: 'D',
  36: 'C', 37: 'B', 38: 'C', 39: 'C', 40: 'B',
  41: 'A', 42: 'B', 43: 'D', 44: 'A', 45: 'D',
  46: 'B', 47: 'C', 48: 'B', 49: 'C', 50: 'A',
  51: 'B', 52: 'A', 53: 'A', 54: 'D', 55: 'A',
  56: 'B', 57: 'A', 58: 'D', 59: 'D', 60: 'D',
  61: 'A', 62: 'B', 63: 'D', 64: 'D', 65: 'D',
  66: 'A', 67: 'C', 68: 'A', 69: 'C', 70: 'D',
  71: 'B', 72: 'C', 73: 'D', 74: 'C', 75: 'C',
  76: 'C', 77: 'C', 78: 'C', 79: 'A', 80: 'C',
  81: 'C', 82: 'B', 83: 'B', 84: 'D', 85: 'B',
  86: 'A', 87: 'A', 88: 'B', 89: 'D', 90: 'C',
  91: 'A', 92: 'B', 93: 'C', 94: 'D', 95: 'D',
  96: 'D', 97: 'D', 98: 'D', 99: 'A', 100: 'A',
  101: 'D', 102: 'A', 103: 'C', 104: 'B', 105: 'C',
  106: 'C', 107: 'B', 108: 'A'
};

const EXPECTED_DIAGRAM_QUESTIONS = [1, 2, 4, 7, 8, 10, 18, 37, 41, 42, 47, 50, 53, 54, 66, 67, 75, 88, 90, 95, 98];

const LETTERS = ['A', 'B', 'C', 'D'];

function verify() {
  console.log('=== VERIFYING ROTATIONAL MOTION PYQ DATASET ===');
  console.log(`Total questions loaded: ${ROTATIONAL_PYQ_QUESTIONS.length}`);

  let errors = 0;

  if (ROTATIONAL_PYQ_QUESTIONS.length !== 108) {
    console.error(`ERROR: Expected 108 questions, but found ${ROTATIONAL_PYQ_QUESTIONS.length}`);
    errors++;
  }

  const diagramFound = [];

  for (let i = 0; i < ROTATIONAL_PYQ_QUESTIONS.length; i++) {
    const q = ROTATIONAL_PYQ_QUESTIONS[i];
    const expectedQNum = i + 1;

    if (q.qNum !== expectedQNum) {
      console.error(`ERROR: Index ${i} has qNum ${q.qNum}, expected ${expectedQNum}`);
      errors++;
    }

    // Check year prefix
    if (/^\[.*?\]/.test(q.question) || /^(NEET|AIPMT|RE-NEET)\s*\d{4}/i.test(q.question)) {
      console.error(`ERROR: Q${q.qNum} has exam year prefix in question: "${q.question.slice(0, 40)}"`);
      errors++;
    }

    // Check options
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`ERROR: Q${q.qNum} options length is not 4`);
      errors++;
    }

    // Check correctIndex matches official key
    const officialLetter = OFFICIAL_KEY[q.qNum];
    const actualLetter = LETTERS[q.correctIndex];
    if (actualLetter !== officialLetter) {
      console.error(`ERROR: Q${q.qNum} correctIndex gives '${actualLetter}', but official key is '${officialLetter}'`);
      errors++;
    }

    // Check solution
    if (!q.solution || q.solution.trim().length === 0) {
      console.error(`ERROR: Q${q.qNum} has empty solution`);
      errors++;
    }

    // Check diagram
    if (q.imageUrl || q.image_url) {
      diagramFound.push(q.qNum);
    }
  }

  console.log(`Diagram questions found (${diagramFound.length}): ${diagramFound.join(', ')}`);
  for (const expectedDiagQ of EXPECTED_DIAGRAM_QUESTIONS) {
    if (!diagramFound.includes(expectedDiagQ)) {
      console.error(`ERROR: Expected diagram for Q${expectedDiagQ}, but not found in question object!`);
      errors++;
    }
  }

  if (errors === 0) {
    console.log('>>> ALL CHECKS PASSED PERFECTLY! 108/108 questions verified with 100% key accuracy and zero prefixes. <<<');
  } else {
    console.error(`>>> FAILED WITH ${errors} ERRORS <<<`);
    process.exit(1);
  }
}

verify();

