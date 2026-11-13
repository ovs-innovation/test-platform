import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const loginData = await loginRes.json();
  const token = loginData.token || loginData.accessToken || loginData.data?.token;

  // Fetch all PYQ questions from live server
  const liveRes = await fetch(`${LIVE_API}/question-bank?category=PYQ&limit=5000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const questions = liveData.questions || liveData.data || [];
  console.log("Total Live PYQ questions:", questions.length);

  // Group by subject in live PYQ questions
  const subjectMap = {};
  for (const q of questions) {
    const s = q.subject || 'NO_SUBJECT';
    subjectMap[s] = (subjectMap[s] || 0) + 1;
  }
  console.log("Live PYQ grouped by subject:", subjectMap);

  // Look for Biological Classification in live PYQ questions
  const bio = questions.filter(q => (q.chapter || '').toLowerCase().includes('biological'));
  console.log("Biological Classification count in live PYQ:", bio.length);
  if (bio.length > 0) {
    console.log("Sample Biological Classification in live PYQ:", {
      id: bio[0].id,
      subject: bio[0].subject,
      subject_id: bio[0].subject_id,
      category: bio[0].category,
      chapter: bio[0].chapter
    });
  }
}

main().catch(console.error);

