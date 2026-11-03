import { query } from '../src/config/db.js';
import { zoologyBiomoleculesBatch5 } from './data/zoology_biomolecules_batch5.mjs';
import { zoologyBiomoleculesBatch7 } from './data/zoology_biomolecules_batch7.mjs';

const LIVE_API = 'https://edvedum.com/api';
const LOCAL_SUBJECT_ID = 13;
const LOCAL_CHAPTER_ID = 173;
const LIVE_SUBJECT_ID = 2;
const LIVE_CHAPTER_ID = 264;
const CHAPTER_NAME = 'Biomolecules';
const CATEGORY_NAME = 'Zoology';

async function getLiveToken() {
  const res = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const data = await res.json();
  return data.token || data.data?.token || data.accessToken;
}

async function run() {
  const q157 = zoologyBiomoleculesBatch5[11];
  const q197 = zoologyBiomoleculesBatch7[12];
  const targetQs = [q157, q197].map(q => ({
    question_text: q.question_text,
    options: q.options || [q.option_1, q.option_2, q.option_3, q.option_4],
    correct_index: q.correct_index !== undefined ? q.correct_index : (q.correct_option >= 1 && q.correct_option <= 4 ? q.correct_option - 1 : q.correct_option),
    solution: q.explanation || '',
    image_url: q.diagram_url || null,
    category: CATEGORY_NAME,
    subject: CATEGORY_NAME,
    chapter: CHAPTER_NAME,
    topic: CHAPTER_NAME,
    question_type: 'mcq',
    marks: q.marks || 4,
    difficulty: (q.difficulty || 'medium').toLowerCase(),
    status: 'available'
  }));

  // Insert to local DB
  for (const q of targetQs) {
    await query(
      `INSERT INTO question_bank (
        category, subject, chapter, topic, question_text, question_type,
        options, correct_index, solution, marks, difficulty, image_url, status,
        subject_id, chapter_id
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)`,
      [
        q.category,
        q.subject,
        q.chapter,
        q.topic,
        q.question_text,
        q.question_type,
        JSON.stringify(q.options),
        q.correct_index,
        q.solution,
        q.marks,
        q.difficulty,
        q.image_url,
        q.status,
        LOCAL_SUBJECT_ID,
        LOCAL_CHAPTER_ID
      ]
    );
    console.log('Inserted locally:', q.question_text.slice(0, 45));
  }

  // Insert to Live API
  const token = await getLiveToken();
  for (const q of targetQs) {
    const payload = {
      category: q.category,
      subject: q.subject,
      chapter: q.chapter,
      topic: q.topic,
      question_text: q.question_text,
      question_type: q.question_type,
      options: q.options,
      correct_index: q.correct_index,
      solution: q.solution,
      marks: q.marks,
      difficulty: q.difficulty,
      image_url: q.image_url,
      status: q.status,
      subject_id: LIVE_SUBJECT_ID,
      chapter_id: LIVE_CHAPTER_ID
    };
    const res = await fetch(`${LIVE_API}/question-bank`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });
    console.log('Inserted on Live:', res.status, q.question_text.slice(0, 45));
  }

  console.log('Done inserting both questions!');
}

run().catch(console.error);

