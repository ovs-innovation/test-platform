import { ELECTROSTATICS_PYQ_QUESTIONS } from './electrostatics_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'A', 2: 'D', 3: 'C', 4: 'C', 5: 'D',
  6: 'B', 7: 'D', 8: 'D', 9: 'D', 10: 'C',
  11: 'B', 12: 'D', 13: 'C', 14: 'C', 15: 'D',
  16: 'D', 17: 'B', 18: 'B', 19: 'C', 20: 'B',
  21: 'B', 22: 'A', 23: 'C', 24: 'C', 25: 'A',
  26: 'A', 27: 'D', 28: 'C', 29: 'A', 30: 'D',
  31: 'A', 32: 'A', 33: 'C', 34: 'A', 35: 'C',
  36: 'C', 37: 'A', 38: 'B', 39: 'A', 40: 'B',
  41: 'A', 42: 'D', 43: 'A', 44: 'B', 45: 'D',
  46: 'B', 47: 'A', 48: 'D', 49: 'D', 50: 'B',
  51: 'A', 52: 'A', 53: 'B', 54: 'D', 55: 'A',
  56: 'C', 57: 'C', 58: 'A', 59: 'C', 60: 'D',
  61: 'D', 62: 'D', 63: 'D', 64: 'C', 65: 'D',
  66: 'C', 67: 'A', 68: 'A', 69: 'D', 70: 'A',
  71: 'C', 72: 'B', 73: 'C', 74: 'B', 75: 'C',
  76: 'C', 77: 'B', 78: 'A', 79: 'B', 80: 'C',
  81: 'A', 82: 'B', 83: 'C', 84: 'D', 85: 'C',
  86: 'A', 87: 'D', 88: 'D', 89: 'B', 90: 'C',
  91: 'B', 92: 'C', 93: 'C', 94: 'A', 95: 'C'
};

const EXPECTED_DIAGRAM_QUESTIONS = [1, 3, 9, 16, 18, 21, 23, 39, 48, 49, 54, 57, 60, 63, 65, 66, 69, 70, 71, 80, 92];

const LETTERS = ['A', 'B', 'C', 'D'];

function verify() {
  console.log('=== VERIFYING ELECTROSTATICS PYQ DATASET ===');
  console.log(`Total questions loaded: ${ELECTROSTATICS_PYQ_QUESTIONS.length}`);

  let errors = 0;

  if (ELECTROSTATICS_PYQ_QUESTIONS.length !== 95) {
    console.error(`ERROR: Expected 95 questions, but found ${ELECTROSTATICS_PYQ_QUESTIONS.length}`);
    errors++;
  }

  const diagramFound = [];

  for (let i = 0; i < ELECTROSTATICS_PYQ_QUESTIONS.length; i++) {
    const q = ELECTROSTATICS_PYQ_QUESTIONS[i];
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
    console.log('>>> ALL CHECKS PASSED PERFECTLY! 95/95 questions verified with 100% key accuracy and zero prefixes. <<<');
  } else {
    console.error(`>>> FAILED WITH ${errors} ERRORS <<<`);
    process.exit(1);
  }
}

verify();

