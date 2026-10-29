import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { query, pool } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function verify() {
  console.log('--- Verifying Solutions in Local DB ---');
  const localCount = await query("SELECT COUNT(id)::int as count FROM question_bank WHERE chapter = 'Solutions'");
  console.log(`Local DB Solutions count: ${localCount.rows[0].count}`);

  const diagramsCount = await query("SELECT COUNT(id)::int as count FROM question_bank WHERE chapter = 'Solutions' AND image_url IS NOT NULL AND image_url != ''");
  console.log(`Local DB Solutions questions with diagrams: ${diagramsCount.rows[0].count}`);

  const sampleQ = await query("SELECT id, question_text, chapter, topic, image_url, correct_index FROM question_bank WHERE chapter = 'Solutions' ORDER BY id ASC LIMIT 2");
  console.log('Sample local questions:', sampleQ.rows);

  console.log('\n--- Verifying Solutions on Live edvedum.com ---');
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const token = (await loginRes.json()).token;

  const liveRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&chapter=Solutions&_t=${Date.now()}`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const liveData = await liveRes.json();
  const liveSolutions = (liveData.questions || []).filter(q => (q.chapter || '').toLowerCase() === 'solutions');
  console.log(`Live platform Solutions questions count: ${liveSolutions.length}`);

  await pool.end();
  process.exit(0);
}

verify().catch(console.error);
