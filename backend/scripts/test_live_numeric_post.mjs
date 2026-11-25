import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
  });
  const { token } = await loginRes.json();

  // Test 1: question_type = 'numerical'
  const p1 = {
    category: 'Physics',
    subject: 'Physics',
    subject_id: 5,
    chapter: 'Capacitance',
    chapter_id: 311,
    topic: 'Capacitance',
    question_type: 'numerical',
    question_text: 'Test Numerical Question 1',
    numeric_answer: 25,
    numerical_tolerance: 0,
    marks: 4,
    negative_marks: 0,
    exam_type: 'JEE',
    status: 'active'
  };
  const res1 = await fetch(`${LIVE_API}/question-bank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(p1)
  });
  console.log('Test 1 (numerical, no options):', res1.status, await res1.text());

  // Test 2: question_type = 'integer'
  const p2 = { ...p1, question_type: 'integer', question_text: 'Test Integer Question 2' };
  const res2 = await fetch(`${LIVE_API}/question-bank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(p2)
  });
  console.log('Test 2 (integer, no options):', res2.status, await res2.text());

  // Test 3: question_type = 'mcq' with 4 options where correct option is the numeric answer
  // or options: [] with correct_index: 0
  const p3 = { ...p1, options: [], correct_index: 0 };
  const res3 = await fetch(`${LIVE_API}/question-bank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(p3)
  });
  console.log('Test 3 (numerical, options: [], correct_index: 0):', res3.status, await res3.text());
}

main().catch(console.error);
