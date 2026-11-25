import fs from 'fs';
import path from 'path';

const INTERMEDIATE_FILE = 'backend/scripts/nuclear_extracted_intermediate.json';
const OFFICIAL_KEYS_FILE = 'backend/scripts/nuclear_official_answer_key.json';
const FINAL_FILE = 'backend/scripts/nuclear_jee_final_170.json';

const DIAGRAM_MAPPINGS = {
  19: {
    options: [
      { key: 'A', text: '', image_url: '/uploads/nuclear/q19_opt_A.png' },
      { key: 'B', text: '', image_url: '/uploads/nuclear/q19_opt_B.png' },
      { key: 'C', text: '', image_url: '/uploads/nuclear/q19_opt_C.png' },
      { key: 'D', text: '', image_url: '/uploads/nuclear/q19_opt_D.png' }
    ],
    solution_image_url: '/uploads/nuclear/q19_solution.png'
  },
  24: {
    image_url: '/uploads/nuclear/q24_binding_energy.png'
  },
  62: {
    image_url: '/uploads/nuclear/q62_graph.png'
  },
  63: {
    solution_image_url: '/uploads/nuclear/q63_solution.png'
  },
  75: {
    image_url: '/uploads/nuclear/q75_graph.png'
  },
  76: {
    solution_image_url: '/uploads/nuclear/q76_solution.png'
  },
  84: {
    options: [
      { key: 'A', text: '', image_url: '/uploads/nuclear/q84_opt_A.png' },
      { key: 'B', text: '', image_url: '/uploads/nuclear/q84_opt_B.png' },
      { key: 'C', text: '', image_url: '/uploads/nuclear/q84_opt_C.png' },
      { key: 'D', text: '', image_url: '/uploads/nuclear/q84_opt_D.png' }
    ]
  },
  86: {
    options: [
      { key: 'A', text: '', image_url: '/uploads/nuclear/q86_opt_A.png' },
      { key: 'B', text: '', image_url: '/uploads/nuclear/q86_opt_B.png' },
      { key: 'C', text: '', image_url: '/uploads/nuclear/q86_opt_C.png' },
      { key: 'D', text: '', image_url: '/uploads/nuclear/q86_opt_D.png' }
    ]
  },
  90: {
    options: [
      { key: 'A', text: '', image_url: '/uploads/nuclear/q90_opt_A.png' },
      { key: 'B', text: '', image_url: '/uploads/nuclear/q90_opt_B.png' },
      { key: 'C', text: '', image_url: '/uploads/nuclear/q90_opt_C.png' },
      { key: 'D', text: '', image_url: '/uploads/nuclear/q90_opt_D.png' }
    ]
  },
  92: {
    solution_image_url: '/uploads/nuclear/q92_solution.png'
  },
  153: {
    image_url: '/uploads/nuclear/q153_table.png'
  },
  154: {
    options: [
      { key: 'A', text: '', image_url: '/uploads/nuclear/q154_opt_A.png' },
      { key: 'B', text: '', image_url: '/uploads/nuclear/q154_opt_B.png' },
      { key: 'C', text: '', image_url: '/uploads/nuclear/q154_opt_C.png' },
      { key: 'D', text: '', image_url: '/uploads/nuclear/q154_opt_D.png' }
    ],
    solution_image_url: '/uploads/nuclear/q154_solution.png'
  }
};

const OPT_LETTER_TO_INDEX = { 'A': 0, 'B': 1, 'C': 2, 'D': 3 };

export function enrichAndValidate() {
  if (!fs.existsSync(INTERMEDIATE_FILE)) {
    console.error(`File ${INTERMEDIATE_FILE} does not exist yet.`);
    return;
  }
  const rawList = JSON.parse(fs.readFileSync(INTERMEDIATE_FILE, 'utf8'));
  const officialKeys = JSON.parse(fs.readFileSync(OFFICIAL_KEYS_FILE, 'utf8'));

  const questionMap = new Map();
  for (const q of rawList) {
    if (q && q.question_number) {
      questionMap.set(Number(q.question_number), q);
    }
  }

  console.log(`Auditing and enriching ${questionMap.size} questions...`);

  const missingQuestions = [];
  for (let num = 1; num <= 170; num++) {
    if (!questionMap.has(num)) {
      missingQuestions.push(num);
    }
  }

  if (missingQuestions.length > 0) {
    console.warn(`WARNING: Missing ${missingQuestions.length} questions:`, missingQuestions.join(', '));
  } else {
    console.log(`PERFECT: All 170 questions are present!`);
  }

  const enrichedList = [];
  let dummyOptionsFound = 0;
  let mismatchedAnswers = 0;
  let numericalCount = 0;
  let mcqCount = 0;

  for (let num = 1; num <= 170; num++) {
    const q = questionMap.get(num);
    if (!q) continue;

    const officialAns = String(officialKeys[num] ?? '').trim();
    const isNumerical = /^\d+(\.\d+)?$/.test(officialAns);

    const questionType = isNumerical ? 'numerical' : 'mcq';
    if (isNumerical) numericalCount++;
    else mcqCount++;

    let finalOptions = [];
    let correctIndex = null;
    let numericAnswer = null;

    if (isNumerical) {
      numericAnswer = Number(officialAns);
      correctIndex = null;
      finalOptions = [];
    } else {
      const expectedIndex = OPT_LETTER_TO_INDEX[officialAns.toUpperCase()] ?? 0;
      correctIndex = expectedIndex;
      numericAnswer = null;

      // Check if this question has explicit diagram options
      if (DIAGRAM_MAPPINGS[num] && DIAGRAM_MAPPINGS[num].options) {
        finalOptions = DIAGRAM_MAPPINGS[num].options;
      } else {
        const rawOpts = Array.isArray(q.options) ? q.options : [];
        if (rawOpts.length !== 4) {
          console.warn(`[Q${num}] Unexpected options count: ${rawOpts.length}`);
        }

        finalOptions = rawOpts.map((opt, idx) => {
          let text = typeof opt === 'object' ? (opt.text || '') : String(opt || '');
          text = text.trim();

          // Code-based audit: check for dummy options
          if (/^Option\s*\([A-D]\)$/i.test(text) || /^Option\s*[A-D]$/i.test(text)) {
            dummyOptionsFound++;
            console.error(`[Q${num}] DUMMY OPTION DETECTED: "${text}" at index ${idx}`);
          }

          return {
            key: String.fromCharCode(65 + idx),
            text: text,
            image_url: ''
          };
        });
      }

      if (q.correct_option !== expectedIndex) {
        mismatchedAnswers++;
        // Enforce official answer key
        q.correct_option = expectedIndex;
      }
    }

    // Attach diagrams if any
    let imageUrl = '';
    let solutionImageUrl = '';

    if (DIAGRAM_MAPPINGS[num]) {
      if (DIAGRAM_MAPPINGS[num].image_url) {
        imageUrl = DIAGRAM_MAPPINGS[num].image_url;
      }
      if (DIAGRAM_MAPPINGS[num].solution_image_url) {
        solutionImageUrl = DIAGRAM_MAPPINGS[num].solution_image_url;
      }
    }

    const enrichedQuestion = {
      question_number: num,
      exam_type: 'JEE',
      category: 'Physics',
      subject: 'Physics',
      chapter: 'Nuclear',
      topic: 'Nuclear',
      question_type: questionType,
      question_text: q.question_text.trim(),
      options: finalOptions,
      correct_index: correctIndex,
      correct_indices: correctIndex !== null ? [correctIndex] : [],
      numeric_answer: numericAnswer,
      solution: (q.solution || '').trim(),
      image_url: imageUrl,
      solution_image_url: solutionImageUrl,
      difficulty: 'medium',
      marks: 4,
      status: 'available'
    };

    enrichedList.push(enrichedQuestion);
  }

  enrichedList.sort((a, b) => a.question_number - b.question_number);

  fs.writeFileSync(FINAL_FILE, JSON.stringify(enrichedList, null, 2));

  console.log(`\n================ AUDIT SUMMARY ================`);
  console.log(`Total questions processed: ${enrichedList.length}`);
  console.log(`MCQs count: ${mcqCount}`);
  console.log(`Numerical count: ${numericalCount}`);
  console.log(`Dummy options found: ${dummyOptionsFound}`);
  console.log(`Mismatched answers reconciled to official key: ${mismatchedAnswers}`);
  console.log(`Saved enriched file to: ${FINAL_FILE}`);
  console.log(`===============================================\n`);

  return enrichedList;
}

if (process.argv[1]?.includes('enrich_and_validate_nuclear_jee.mjs')) {
  enrichAndValidate();
}
