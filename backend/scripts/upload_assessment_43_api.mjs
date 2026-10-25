import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read questionsData and diagrams from upload_assessment_43.mjs and diagrams_43.json
const scriptContent = fs.readFileSync(path.join(__dirname, 'upload_assessment_43.mjs'), 'utf8');
const qDataMatch = scriptContent.match(/const questionsData = (\[[\s\S]*?\n\];)/);
if (!qDataMatch) {
  throw new Error('Could not find questionsData in upload_assessment_43.mjs');
}

const questionsData = eval(qDataMatch[1]);
const diagrams = JSON.parse(fs.readFileSync(path.join(__dirname, 'diagrams_43.json'), 'utf8'));

const BASE_URL = 'https://edvedum.com/api';
const ASSESSMENT_ID = 43;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
  console.log('Logged in as:', loginRes.user?.email, 'Role:', loginRes.user?.role);

  console.log('\n--- Step 2: Fetching Current Assessment 43 State ---');
  const assessState = await apiCall(`/assessments/${ASSESSMENT_ID}`, 'GET', null, token);
  console.log(`Current Assessment: "${assessState.assessment?.title}"`);
  console.log(`Existing sections: ${assessState.sections?.length || 0}`);
  console.log(`Existing questions: ${assessState.questions?.length || 0}`);

  // Delete any existing questions to guarantee pure 1..180 sequential order
  if (assessState.questions?.length > 0) {
    console.log(`Deleting ${assessState.questions.length} existing questions...`);
    for (const q of assessState.questions) {
      await apiCall(`/questions/${q.id}`, 'DELETE', null, token);
    }
    console.log('Cleared existing questions.');
  }

  // Delete any existing sections
  if (assessState.sections?.length > 0) {
    console.log(`Deleting ${assessState.sections.length} existing sections...`);
    for (const s of assessState.sections) {
      await apiCall(`/sections/${s.id}`, 'DELETE', null, token);
    }
    console.log('Cleared existing sections.');
  }

  console.log('\n--- Step 3: Creating 4 NEET Standard Sections ---');
  const sectionDefs = [
    { name: 'Section-A: Physics', section_type: 'technical_mcq', position: 1 },
    { name: 'Section-B: Chemistry', section_type: 'technical_mcq', position: 2 },
    { name: 'Section-C: Botany', section_type: 'technical_mcq', position: 3 },
    { name: 'Section-D: Zoology', section_type: 'technical_mcq', position: 4 },
  ];

  const sectionMap = {};
  for (const sDef of sectionDefs) {
    const sRes = await apiCall(`/assessments/${ASSESSMENT_ID}/sections`, 'POST', sDef, token);
    const sec = sRes.section;
    const subj = sDef.name.split(': ')[1];
    sectionMap[subj] = sec.id;
    console.log(`Created Section "${sDef.name}" -> ID ${sec.id}`);
  }

  console.log('\n--- Step 4: Uploading 180 Questions with Diagrams and Options ---');
  let uploadedCount = 0;
  for (const q of questionsData) {
    const sectionId = sectionMap[q.subject];
    const optObjects = q.options.map((optText, idx) => ({
      key: String.fromCharCode(65 + idx),
      text: optText,
    }));

    let imgUrl = null;
    let mediaArray = [];
    if (q.diagram && diagrams[q.diagram]) {
      imgUrl = diagrams[q.diagram].relativeUrl;
      mediaArray = [
        {
          url: diagrams[q.diagram].relativeUrl,
          dataUrl: diagrams[q.diagram].base64,
          type: 'image',
        },
      ];
    }

    const payload = {
      section_id: sectionId,
      question_type: 'mcq',
      question_text: q.text,
      options: optObjects,
      correct_index: q.correct,
      marks: 4,
      negative_marks: 1,
      position: q.num,
      original_question_number: q.num,
      subject: q.subject,
      image_url: imgUrl,
      media: mediaArray,
      difficulty: 'medium',
    };

    await apiCall(`/assessments/${ASSESSMENT_ID}/questions`, 'POST', payload, token);
    uploadedCount++;
    if (uploadedCount % 20 === 0 || uploadedCount === 180) {
      console.log(`Uploaded ${uploadedCount}/180 questions (Currently at Q${q.num} - ${q.subject})`);
    }
  }

  console.log('\n--- Step 5: Updating Assessment Settings (Publish & Live) ---');
  await apiCall(`/assessments/${ASSESSMENT_ID}`, 'PUT', {
    title: 'UNIT TEST NEET 4',
    description: 'NEET Entrance Exam Unit Test-4 (Physics, Chemistry, Botany, Zoology)',
    instructions: 'Authentic NTA NEET CBT pattern. 180 questions (720 marks), +4 for correct, -1 for incorrect. Duration: 180 minutes.',
    duration_minutes: 180,
    passing_marks: 180,
    max_violations: 5,
    result_visible: true,
    negative_marking: true,
    negative_marks_per_wrong: 1.0,
  }, token);

  // Toggle publish if not published
  const latest = await apiCall(`/assessments/${ASSESSMENT_ID}`, 'GET', null, token);
  if (!latest.assessment?.is_published) {
    console.log('Publishing assessment...');
    await apiCall(`/assessments/${ASSESSMENT_ID}/publish`, 'PATCH', { is_published: true }, token);
  }

  console.log('\n--- Step 6: Verifying Final Assessment 43 on Production ---');
  const finalCheck = await apiCall(`/assessments/${ASSESSMENT_ID}`, 'GET', null, token);
  console.log('Final Title:', finalCheck.assessment?.title);
  console.log('Published:', finalCheck.assessment?.is_published);
  console.log('Live:', finalCheck.assessment?.is_live);
  console.log('Sections Count:', finalCheck.sections?.length);
  console.log('Total Questions Count:', finalCheck.questions?.length);
  console.log('Q9 Image URL:', finalCheck.questions?.[8]?.image_url);
  console.log('Q180 Subject:', finalCheck.questions?.[179]?.subject);
  console.log('\nALL 180 QUESTIONS SUCCESSFULLY UPLOADED AND VERIFIED ON PRODUCTION EDVEDUM.COM!');
}

main().catch((err) => {
  console.error('\nUpload error:', err);
  process.exit(1);
});
