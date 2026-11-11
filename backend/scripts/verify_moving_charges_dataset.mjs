import { MOVING_CHARGES_PYQ_QUESTIONS } from './moving_charges_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'B', 2: 'C', 3: 'D', 4: 'A', 5: 'D',
  6: 'D', 7: 'C', 8: 'C', 9: 'D', 10: 'C',
  11: 'B', 12: 'B', 13: 'A', 14: 'C', 15: 'D',
  16: 'B', 17: 'B', 18: 'C', 19: 'C', 20: 'D',
  21: 'A', 22: 'C', 23: 'B', 24: 'A', 25: 'D',
  26: 'B', 27: 'B', 28: 'C', 29: 'D', 30: 'D',
  31: 'C', 32: 'C', 33: 'B', 34: 'A', 35: 'A',
  36: 'C', 37: 'B', 38: 'B', 39: 'A', 40: 'D',
  41: 'B', 42: 'A', 43: 'D', 44: 'B', 45: 'A',
  46: 'A', 47: 'D', 48: 'B', 49: 'A', 50: 'B',
  51: 'B', 52: 'A', 53: 'C', 54: 'C', 55: 'B',
  56: 'A', 57: 'B', 58: 'C', 59: 'D', 60: 'B',
  61: 'A', 62: 'D', 63: 'B', 64: 'B', 65: 'A',
  66: 'D', 67: 'C', 68: 'A', 69: 'C', 70: 'A',
  71: 'B', 72: 'A', 73: 'B', 74: 'C', 75: 'A',
  76: 'C', 77: 'C', 78: 'A', 79: 'B', 80: 'D',
  81: 'C', 82: 'B', 83: 'A', 84: 'D', 85: 'C',
  86: 'B', 87: 'B', 88: 'C', 89: 'B', 90: 'B',
  91: 'A', 92: 'D', 93: 'C', 94: 'A', 95: 'A',
  96: 'A', 97: 'B', 98: 'A', 99: 'C', 100: 'D',
  101: 'A', 102: 'B', 103: 'D', 104: 'C'
};

const EXPECTED_DIAGRAM_QUESTIONS = [1, 4, 12, 20, 21, 27, 28, 32, 36, 39, 42, 49, 50, 62, 68, 77, 89];

function verify() {
  console.log(`Total questions in dataset: ${MOVING_CHARGES_PYQ_QUESTIONS.length}`);
  if (MOVING_CHARGES_PYQ_QUESTIONS.length !== 104) {
    throw new Error(`Expected 104 questions, got ${MOVING_CHARGES_PYQ_QUESTIONS.length}`);
  }

  let errors = 0;
  let diagramsCount = 0;

  for (let i = 0; i < MOVING_CHARGES_PYQ_QUESTIONS.length; i++) {
    const q = MOVING_CHARGES_PYQ_QUESTIONS[i];
    const qNum = i + 1;

    if (q.question_number !== qNum) {
      console.error(`Mismatch in question_number: expected ${qNum}, got ${q.question_number}`);
      errors++;
    }

    // Check exam year prefix
    if (/\[(RE-NEET|NEET|AIPMT|Out of syllabus)/i.test(q.question_text)) {
      console.error(`Q${qNum} has exam year prefix in question_text: ${q.question_text.slice(0, 30)}`);
      errors++;
    }

    // Check options count
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Q${qNum} does not have exactly 4 options!`);
      errors++;
    }

    // Check answer key
    const expectedAns = OFFICIAL_KEY[qNum];
    if (q.correct_option !== expectedAns) {
      console.error(`Q${qNum} answer key mismatch: expected ${expectedAns}, got ${q.correct_option}`);
      errors++;
    }

    // Check solution
    if (!q.solution || q.solution.trim().length < 10) {
      console.error(`Q${qNum} solution is empty or too short!`);
      errors++;
    }

    // Check diagram
    if (EXPECTED_DIAGRAM_QUESTIONS.includes(qNum)) {
      if (!q.image_url || !q.image_url.startsWith('https://res.cloudinary.com/')) {
        console.error(`Q${qNum} expected Cloudinary diagram, got: ${q.image_url}`);
        errors++;
      } else {
        diagramsCount++;
      }
    } else {
      if (q.image_url) {
        console.warn(`Q${qNum} unexpectedly has image_url: ${q.image_url}`);
      }
    }
  }

  console.log(`Diagrams verified: ${diagramsCount} / 17`);
  if (diagramsCount !== 17) {
    console.error(`Expected 17 diagrams, found ${diagramsCount}`);
    errors++;
  }

  if (errors === 0) {
    console.log('ALL 104 QUESTIONS VERIFIED PERFECTLY! 100% MATCH WITH OFFICIAL ANSWER KEY AND ZERO EXAM YEAR PREFIXES.');
  } else {
    console.error(`Total verification errors: ${errors}`);
    process.exit(1);
  }
}

verify();
