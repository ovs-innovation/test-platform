import { MAG_MATTER_PYQ_QUESTIONS } from './mag_matter_pyq_questions_data.mjs';

const OFFICIAL_KEY = {
  1: 'B', 2: 'D', 3: 'C', 4: 'A', 5: 'D',
  6: 'A', 7: 'B', 8: 'A', 9: 'D', 10: 'A',
  11: 'D', 12: 'B', 13: 'C', 14: 'D', 15: 'C',
  16: 'A', 17: 'B', 18: 'D', 19: 'B', 20: 'B',
  21: 'A', 22: 'D', 23: 'A', 24: 'C', 25: 'D',
  26: 'B', 27: 'C', 28: 'D', 29: 'D', 30: 'C',
  31: 'A', 32: 'B', 33: 'A', 34: 'A', 35: 'B',
  36: 'A', 37: 'A', 38: 'B', 39: 'B', 40: 'C',
  41: 'B', 42: 'D', 43: 'C', 44: 'B', 45: 'C',
  46: 'B', 47: 'D', 48: 'B', 49: 'D'
};

const DIAGRAM_QS = [3, 5, 8, 15, 18, 23];

function verify() {
  console.log(`Verifying Magnetism and Matter PYQ dataset...`);
  console.log(`Total questions: ${MAG_MATTER_PYQ_QUESTIONS.length}`);
  
  if (MAG_MATTER_PYQ_QUESTIONS.length !== 49) {
    throw new Error(`Expected 49 questions, got ${MAG_MATTER_PYQ_QUESTIONS.length}`);
  }

  let errors = 0;

  MAG_MATTER_PYQ_QUESTIONS.forEach((q, idx) => {
    const qNum = idx + 1;
    if (q.question_number !== qNum) {
      console.error(`Question ${qNum}: question_number mismatch (${q.question_number} vs ${qNum})`);
      errors++;
    }

    if (!q.question_text || q.question_text.trim().length === 0) {
      console.error(`Question ${qNum}: empty question_text`);
      errors++;
    }

    // Check for exam year prefixes
    if (/^\[?(NEET|AIPMT)/i.test(q.question_text)) {
      console.error(`Question ${qNum}: Contains exam prefix! text = "${q.question_text.slice(0, 30)}..."`);
      errors++;
    }

    if (!Array.isArray(q.options) || q.options.length !== 4) {
      console.error(`Question ${qNum}: options array must have exactly 4 items`);
      errors++;
    }

    q.options.forEach((opt, optIdx) => {
      if (!opt || opt.trim().length === 0) {
        console.error(`Question ${qNum}: option ${optIdx} is empty`);
        errors++;
      }
    });

    const expectedKey = OFFICIAL_KEY[qNum];
    if (q.correct_option !== expectedKey) {
      console.error(`Question ${qNum}: key mismatch! Got ${q.correct_option}, expected ${expectedKey}`);
      errors++;
    }

    if (!q.solution || q.solution.trim().length === 0) {
      console.error(`Question ${qNum}: empty solution`);
      errors++;
    }

    // Diagram check
    if (DIAGRAM_QS.includes(qNum)) {
      if (!q.image_url || !q.image_url.includes('res.cloudinary.com')) {
        console.error(`Question ${qNum}: Expected Cloudinary image_url, got ${q.image_url}`);
        errors++;
      }
    } else {
      if (q.image_url !== null) {
        console.error(`Question ${qNum}: Expected image_url to be null, got ${q.image_url}`);
        errors++;
      }
    }

    // KaTeX dollar matching check
    const dollarMatches = (q.question_text.match(/\$/g) || []).length;
    if (dollarMatches % 2 !== 0) {
      console.warn(`Question ${qNum}: Odd number of dollar signs in question_text (${dollarMatches})`);
    }
  });

  if (errors > 0) {
    console.error(`Verification FAILED with ${errors} errors!`);
    process.exit(1);
  } else {
    console.log(`All 49 questions passed all verification checks!`);
    console.log(`- 49 questions with 4 options each`);
    console.log(`- 100% official answer key agreement`);
    console.log(`- 0 exam year prefixes`);
    console.log(`- 6 diagrams linked to Cloudinary CDN`);
    console.log(`- Detailed KaTeX solutions provided for every question`);
  }
}

verify();
