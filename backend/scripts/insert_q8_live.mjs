import { ITF_QUESTIONS_PART1 } from './itf_questions_part1_data.mjs';

const LIVE_API = 'https://edvedum.com/api';

async function getToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function fixQ8() {
  const q8 = ITF_QUESTIONS_PART1.find(q => q.question_number === 8);
  const token = await getToken();

  const postPayload = {
    category: 'Mathematics',
    subject: 'Mathematics',
    chapter: 'Inverse Trignometry',
    chapter_name: 'Inverse Trignometry',
    chapter_id: 239,
    subject_id: 7,
    question_type: q8.question_type || 'single_choice',
    question_text: q8.question_text,
    options: q8.options || [],
    correct_index: q8.correct_index,
    solution: q8.solution,
    image_url: null,
    topic: q8.topic || 'Inverse Trigonometry',
    difficulty: q8.difficulty || 'medium',
    marks: q8.marks || 4,
    status: 'available'
  };

  const res = await fetch(`${LIVE_API}/question-bank`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(postPayload)
  });

  const data = await res.json();
  console.log('Inserted Q8 to Live:', data);
}

fixQ8().catch(console.error);

