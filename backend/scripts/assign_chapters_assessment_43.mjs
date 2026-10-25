import fetch from 'node-fetch';

const BASE_URL = 'https://edvedum.com/api';
const ASSESSMENT_ID = 43;

export function getChapterForQuestion(num) {
  // Physics (1-45)
  if (num >= 1 && num <= 26) {
    return { subject: 'Physics', chapter: 'Units and Measurements' };
  }
  if (num >= 27 && num <= 45) {
    return { subject: 'Physics', chapter: 'Current Electricity' };
  }

  // Chemistry (46-90)
  if (num >= 46 && num <= 57) {
    return { subject: 'Chemistry', chapter: 'Electrochemistry' };
  }
  if (num >= 58 && num <= 89) {
    return { subject: 'Chemistry', chapter: 'Some Basic Concepts of Chemistry' };
  }
  if (num === 90) {
    return { subject: 'Chemistry', chapter: 'Redox Reactions' };
  }

  // Botany (91-135)
  if ((num >= 91 && num <= 103) || (num >= 113 && num <= 115) || (num >= 124 && num <= 128)) {
    return { subject: 'Botany', chapter: 'The Living World' };
  }
  if ((num >= 104 && num <= 112) || (num >= 116 && num <= 123) || (num >= 129 && num <= 135)) {
    return { subject: 'Botany', chapter: 'Principles of Inheritance and Variation' };
  }

  // Zoology (136-180)
  if ((num >= 136 && num <= 140) || (num >= 143 && num <= 144) || (num >= 146 && num <= 147)) {
    return { subject: 'Zoology', chapter: 'Reproductive Health' };
  }
  if ((num >= 141 && num <= 142) || num === 145 || (num >= 148 && num <= 180)) {
    return { subject: 'Zoology', chapter: 'Animal Kingdom' };
  }

  return { subject: 'General', chapter: 'General Core Concepts' };
}

async function apiCall(endpoint, method = 'GET', body = null, token = null) {
  const headers = {};
  if (body) headers['Content-Type'] = 'application/json';
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg = data?.message || res.statusText || `HTTP ${res.status}`;
    throw new Error(`${method} ${endpoint} failed (${res.status}): ${msg}`);
  }
  return data;
}

async function main() {
  console.log('--- Step 1: Admin Login ---');
  const loginRes = await apiCall('/auth/login', 'POST', {
    email: 'admin@edvedum.com',
    password: 'Admin@12345',
  });
  const token = loginRes.token || loginRes.accessToken;
  console.log('Logged in as:', loginRes.user?.email);

  console.log('\n--- Step 2: Fetching Assessment 43 Questions ---');
  const assessState = await apiCall(`/assessments/${ASSESSMENT_ID}`, 'GET', null, token);
  const questions = assessState.questions || [];
  console.log(`Found ${questions.length} questions in Assessment 43.`);

  // Sort questions by position 1..180
  questions.sort((a, b) => a.position - b.position);

  console.log('\n--- Step 3: Updating Chapter and Topic for all 180 questions ---');
  const batchSize = 5;
  for (let i = 0; i < questions.length; i += batchSize) {
    const chunk = questions.slice(i, i + batchSize);
    await Promise.all(
      chunk.map(async (q) => {
        const mapping = getChapterForQuestion(q.position);
        const mediaStr = q.media ? (typeof q.media === 'string' ? q.media : JSON.stringify(q.media)) : '[]';
        await apiCall(`/questions/${q.id}`, 'PUT', {
          subject: mapping.subject,
          topic: mapping.chapter,
          chapter: mapping.chapter,
          media: mediaStr,
        }, token);
      })
    );
    console.log(`Updated questions ${i + 1} to ${Math.min(i + batchSize, questions.length)} of 180...`);
  }

  console.log('\n--- Step 4: Verification of Chapter Assignments ---');
  const verifyRes = await apiCall(`/assessments/${ASSESSMENT_ID}`, 'GET', null, token);
  const vQuestions = verifyRes.questions || [];
  const summary = {};

  for (const q of vQuestions) {
    const key = `${q.subject} • ${q.topic}`;
    summary[key] = (summary[key] || 0) + 1;
  }

  console.log('Final Chapter-Wise Summary on Live edvedum.com:');
  console.table(summary);

  console.log('\nSample Questions check:');
  console.log('Q1 (1-26):', vQuestions[0].position, vQuestions[0].subject, '•', vQuestions[0].topic);
  console.log('Q27 (27-45):', vQuestions[26].position, vQuestions[26].subject, '•', vQuestions[26].topic);
  console.log('Q46 (46-57):', vQuestions[45].position, vQuestions[45].subject, '•', vQuestions[45].topic);
  console.log('Q58 (58-89):', vQuestions[57].position, vQuestions[57].subject, '•', vQuestions[57].topic);
  console.log('Q90 (90):', vQuestions[89].position, vQuestions[89].subject, '•', vQuestions[89].topic);
  console.log('Q91 (The Living World):', vQuestions[90].position, vQuestions[90].subject, '•', vQuestions[90].topic);
  console.log('Q104 (Principles of Inheritance):', vQuestions[103].position, vQuestions[103].subject, '•', vQuestions[103].topic);
  console.log('Q136 (Reproductive Health):', vQuestions[135].position, vQuestions[135].subject, '•', vQuestions[135].topic);
  console.log('Q141 (Animal Kingdom):', vQuestions[140].position, vQuestions[140].subject, '•', vQuestions[140].topic);
  console.log('Q180 (Animal Kingdom):', vQuestions[179].position, vQuestions[179].subject, '•', vQuestions[179].topic);
}

main().catch(console.error);
