import { pool } from '../config/db.js';

const BANK = [
  { category: 'Aptitude', type: 'mcq', q: 'If 5 workers complete a task in 10 days, how many days for 10 workers?', options: ['5', '10', '20', '15'], correct: 0, marks: 2 },
  { category: 'Aptitude', type: 'mcq', q: 'What comes next: 2, 6, 12, 20, ?', options: ['28', '30', '32', '24'], correct: 1, marks: 2 },
  { category: 'JavaScript', type: 'mcq', q: 'Which method creates a new array from elements that pass a test?', options: ['map', 'filter', 'reduce', 'forEach'], correct: 1, marks: 2 },
  { category: 'JavaScript', type: 'mcq', q: 'What is the output of typeof []?', options: ['"array"', '"object"', '"undefined"', '"list"'], correct: 1, marks: 2 },
  { category: 'React', type: 'mcq', q: 'Which hook manages component state?', options: ['useEffect', 'useState', 'useContext', 'useRef'], correct: 1, marks: 2 },
  { category: 'React', type: 'mcq', q: 'What is the virtual DOM?', options: ['A browser API', 'A lightweight JS representation of the DOM', 'A CSS framework', 'A database'], correct: 1, marks: 2 },
  { category: 'HTML', type: 'mcq', q: 'Which tag defines the largest heading?', options: ['<head>', '<h6>', '<h1>', '<header>'], correct: 2, marks: 2 },
  { category: 'HTML', type: 'mcq', q: 'Which attribute makes an input field required?', options: ['mandatory', 'required', 'validate', 'needed'], correct: 1, marks: 2 },
  { category: 'CSS', type: 'mcq', q: 'Which property controls text size?', options: ['font-weight', 'font-size', 'text-size', 'font-style'], correct: 1, marks: 2 },
  { category: 'CSS', type: 'mcq', q: 'Flexbox direction is set with:', options: ['align-items', 'flex-direction', 'justify-content', 'flex-wrap'], correct: 1, marks: 2 },
  { category: 'Node.js', type: 'mcq', q: 'Which module handles file system operations?', options: ['http', 'fs', 'path', 'os'], correct: 1, marks: 2 },
  { category: 'Node.js', type: 'mcq', q: 'Express is used for:', options: ['Database ORM', 'Web server framework', 'CSS preprocessing', 'Testing'], correct: 1, marks: 2 },
];

export const seedQuestionBank = async (client) => {
  const count = await client.query('SELECT COUNT(*)::int AS c FROM question_bank');
  if (count.rows[0].c > 0) return;

  for (const item of BANK) {
    await client.query(
      `INSERT INTO question_bank (category, question_type, question_text, options, correct_index, marks)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [item.category, item.type, item.q, JSON.stringify(item.options), item.correct, item.marks]
    );
  }
  console.log('[seed] Question bank seeded with', BANK.length, 'questions.');
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
