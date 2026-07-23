import { pool } from '../config/db.js';

const BANK = [
  // Physics (JEE / NEET)
  { category: 'Physics', type: 'mcq', q: 'A particle moves along a circular path of radius R. In one complete revolution, its displacement is:', options: ['2πR', 'πR', 'Zero', '2R'], correct: 2, marks: 4, solution: 'In one complete revolution, the initial and final positions of the particle coincide, so the net displacement is zero.', difficulty: 'easy' },
  { category: 'Physics', type: 'integer', q: 'A body of mass 2 kg is accelerated from rest to 10 m/s in 5 seconds. What is the net force (in Newtons) acting on the body?', numeric_answer: 4, marks: 4, solution: 'Acceleration a = (10 - 0) / 5 = 2 m/s². Force F = m * a = 2 * 2 = 4 N.', difficulty: 'medium' },
  { category: 'Physics', type: 'numerical', q: 'Calculate the de Broglie wavelength (in Angstroms) of an electron accelerated through a potential difference of 100 V.', numeric_answer: 1.23, tolerance: 0.05, marks: 4, solution: 'λ = 12.27 / sqrt(V) Å = 12.27 / 10 = 1.227 Å ≈ 1.23 Å.', difficulty: 'hard' },
  { category: 'Physics', type: 'assertion_reason', q: 'Work done in a closed path in a conservative gravitational field is zero.', assertion: 'Work done in a closed path in a conservative field is zero.', reason: 'Gravitational force is a conservative force.', options: ['Both Assertion (A) and Reason (R) are true and Reason (R) is the correct explanation of Assertion (A)', 'Both Assertion (A) and Reason (R) are true but Reason (R) is NOT the correct explanation of Assertion (A)', 'Assertion (A) is true but Reason (R) is false', 'Assertion (A) is false but Reason (R) is true'], correct: 0, marks: 4, solution: 'Both statement A and R are true and R explains why work done along a closed path is zero.', difficulty: 'medium' },

  // Chemistry (JEE / NEET)
  { category: 'Chemistry', type: 'mcq', q: 'What is the pH value of pure water at 25°C?', options: ['0', '7', '14', '1'], correct: 1, marks: 4, solution: 'At 25°C, pure water has [H+] = 10⁻⁷ M, hence pH = -log10(10⁻⁷) = 7.', difficulty: 'easy' },
  { category: 'Chemistry', type: 'integer', q: 'What is the total number of valence electrons in a carbon (C) atom?', numeric_answer: 4, marks: 4, solution: 'Carbon has electronic configuration 1s² 2s² 2p², so it has 4 valence electrons.', difficulty: 'easy' },
  { category: 'Chemistry', type: 'multi_select', q: 'Which of the following molecules have tetrahedral geometry?', options: ['CH₄', 'NH₄⁺', 'SF₄', 'CCl₄'], correct_indices: [0, 1, 3], marks: 4, solution: 'CH4, NH4+, and CCl4 are sp3 hybridized with no lone pairs, producing tetrahedral geometry.', difficulty: 'medium' },

  // Mathematics (JEE)
  { category: 'Mathematics', type: 'mcq', q: 'The value of sin²(θ) + cos²(θ) is always equal to:', options: ['0', '1', '2', 'tan(θ)'], correct: 1, marks: 4, solution: 'By Pythagorean trigonometric identity, sin²(θ) + cos²(θ) = 1 for all real values of θ.', difficulty: 'easy' },
  { category: 'Mathematics', type: 'integer', q: 'Evaluate the limit: lim(x->0) (sin(5x) / x).', numeric_answer: 5, marks: 4, solution: 'lim_{x->0} sin(5x)/x = 5 * lim_{x->0} sin(5x)/(5x) = 5 * 1 = 5.', difficulty: 'easy' },

  // Botany (NEET)
  { category: 'Botany', type: 'mcq', q: 'Which pigment is primarily responsible for light absorption during photosynthesis in green plants?', options: ['Hemoglobin', 'Chlorophyll a', 'Carotenoid', 'Melanin'], correct: 1, marks: 4, solution: 'Chlorophyll a is the primary photosynthetic pigment essential for light reaction.', difficulty: 'easy' },

  // Zoology (NEET)
  { category: 'Zoology', type: 'mcq', q: 'Which organelle is known as the powerhouse of the eukaryotic cell?', options: ['Ribosome', 'Mitochondria', 'Nucleus', 'Golgi Apparatus'], correct: 1, marks: 4, solution: 'Mitochondria generate ATP via cellular respiration, earning the name powerhouse of the cell.', difficulty: 'easy' },
];

export const seedQuestionBank = async (client) => {
  await client.query(`
    DELETE FROM question_bank 
    WHERE category IN ('Aptitude', 'Mental Ability & Aptitude', 'JavaScript', 'React', 'HTML', 'CSS', 'Node.js')
  `);

  const count = await client.query('SELECT COUNT(*)::int AS c FROM question_bank');
  if (count.rows[0].c > 0) return;

  for (const item of BANK) {
    await client.query(
      `INSERT INTO question_bank (category, question_type, question_text, options, correct_index, correct_indices, numeric_answer, numerical_tolerance, assertion_text, reason_text, marks, solution, difficulty)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
      [
        item.category,
        item.type || 'mcq',
        item.q,
        JSON.stringify(item.options || []),
        item.correct ?? 0,
        JSON.stringify(item.correct_indices || []),
        item.numeric_answer !== undefined ? item.numeric_answer : null,
        item.tolerance || 0,
        item.assertion || null,
        item.reason || null,
        item.marks || 4,
        item.solution || '',
        item.difficulty || 'medium',
      ]
    );
  }
  console.log('[seed] Question bank seeded with', BANK.length, 'questions across JEE & NEET subjects.');
};

export const runQuestionBankSeed = async () => {
  try {
    await seedQuestionBank(pool);
  } finally {
    await pool.end();
  }
};

if (process.argv[1]?.includes('seedQuestionBank')) {
  runQuestionBankSeed();
}

