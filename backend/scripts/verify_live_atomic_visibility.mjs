import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { query } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';
const CHAPTER_NAME = 'Atomic';

async function main() {
  console.log('=== VERIFYING LIVE VISIBILITY FOR ATOMIC PHYSICS (JEE) ===\n');

  // 1. Direct DB check
  console.log('1. Checking Database:');
  const dbRes = await query(
    `SELECT COUNT(*) as total,
            COUNT(CASE WHEN question_type = 'mcq' THEN 1 END) as mcqs,
            COUNT(CASE WHEN question_type = 'numerical' THEN 1 END) as numericals,
            COUNT(CASE WHEN image_url IS NOT NULL THEN 1 END) as with_diagrams
     FROM question_bank
     WHERE chapter = $1 AND category = 'Physics' AND exam_type = 'JEE'`,
    [CHAPTER_NAME]
  );
  console.log('DB Result:', dbRes.rows[0]);

  // 2. Authenticate and check API
  console.log('\n2. Checking Live Production API:');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' }),
    });
    if (!loginRes.ok) {
      console.warn(`Live login returned ${loginRes.status}: ${await loginRes.text()}`);
      process.exit(0);
    }
    const { token } = await loginRes.json();

    const res = await fetch(`${LIVE_API}/question-bank?category=Physics&chapter=${encodeURIComponent(CHAPTER_NAME)}&exam_type=JEE&refresh=true&limit=200`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) {
      throw new Error(`Live API responded with status ${res.status}: ${await res.text()}`);
    }
    const data = await res.json();
    const questions = data?.questions || [];
    console.log(`- Status: 200 OK`);
    console.log(`- Total Questions returned: ${questions.length} / 146`);

    let mcqCount = 0;
    let numCount = 0;
    let dummyCount = 0;
    let diagramCount = 0;
    const dummyTerms = ['Option A', 'Option B', 'Option C', 'Option D', '(A)', '(B)', '(C)', '(D)'];

    for (const q of questions) {
      if (q.question_type === 'numerical') {
        numCount++;
      } else {
        mcqCount++;
        for (const opt of q.options || []) {
          if (dummyTerms.includes(String(opt.text || opt.option_text).trim())) {
            dummyCount++;
          }
        }
      }
      if (q.image_url) diagramCount++;
    }

    console.log(`- MCQs: ${mcqCount}`);
    console.log(`- Numericals: ${numCount}`);
    console.log(`- Questions with Diagrams: ${diagramCount}`);
    console.log(`- Dummy Options: ${dummyCount}`);
  } catch (err) {
    console.log('Live API check notice:', err.message);
  }

  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
