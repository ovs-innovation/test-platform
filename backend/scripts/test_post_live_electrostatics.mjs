import fetch from 'node-fetch';
import { ELECTROSTATICS_JEE_QUESTIONS } from './electrostatics_jee_questions_data.mjs';

const LIVE_API = 'https://edvedum.com/api';
const LIVE_SUBJECT_ID = 5; // Physics
const LIVE_CHAPTER_ID = 106; // Electrostatics
const CHAPTER_NAME = 'Electrostatics';

async function testOne() {
  console.log('Logging in to live API...');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  const q = ELECTROSTATICS_JEE_QUESTIONS[0];
  const isNumeric = q.question_type === 'numerical';

  const formattedOptions = (q.options || []).map((optText, optIdx) => ({
    key: ['A', 'B', 'C', 'D'][optIdx] || String.fromCharCode(65 + optIdx),
    text: String(optText).trim(),
    image_url: ''
  }));

  const payload = {
    category: 'Physics',
    subject: 'Physics',
    subject_id: LIVE_SUBJECT_ID,
    chapter: CHAPTER_NAME,
    chapter_id: LIVE_CHAPTER_ID,
    topic: 'Electrostatics',
    question_type: isNumeric ? 'numeric' : 'mcq',
    question_text: q.question_text,
    options: formattedOptions,
    correct_index: isNumeric ? null : (q.correct_index !== null ? Number(q.correct_index) : 0),
    correct_indices: isNumeric ? [] : [q.correct_index !== null ? Number(q.correct_index) : 0],
    numeric_answer: isNumeric ? Number(q.numeric_answer) : null,
    numerical_tolerance: 0,
    marks: 4,
    negative_marks: isNumeric ? 0 : 1,
    difficulty: q.difficulty || 'medium',
    image_url: q.image_url || null,
    solution_image_url: q.solution_image_url || null,
    solution: q.solution || null,
    exam_type: 'JEE',
    status: 'active'
  };

  console.log('Posting 1 question to live API...');
  const postRes = await fetch(`${LIVE_API}/question-bank`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });

  console.log(`Response status: ${postRes.status}`);
  const postData = await postRes.json();
  console.log('Response data:', postData);
}

testOne().catch(console.error);
