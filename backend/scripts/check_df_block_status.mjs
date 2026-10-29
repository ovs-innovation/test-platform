import fetch from 'node-fetch';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { pool, query } from '../src/config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const LIVE_API = 'https://edvedum.com/api';

async function checkStatus() {
  console.log('=== Checking Local Database ===');
  const subRes = await query("SELECT id, name FROM subjects WHERE LOWER(name) = 'chemistry' LIMIT 1");
  console.log('Local Chemistry subject:', subRes.rows);

  const chemSubId = subRes.rows[0]?.id;
  const localChapters = await query("SELECT id, name, subject_id FROM chapters WHERE subject_id = $1 ORDER BY name", [chemSubId]);
  console.log('Local Chemistry chapters:');
  localChapters.rows.forEach(c => console.log(`  [${c.id}] ${c.name}`));

  const localDFQuestions = await query("SELECT count(*) as count FROM question_bank WHERE chapter ILIKE '%d%f%' OR chapter ILIKE '%block%'");
  console.log('Local d/f-block questions count:', localDFQuestions.rows[0].count);

  console.log('\n=== Checking Live Platform ===');
  try {
    const loginRes = await fetch(`${LIVE_API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
    });
    const token = (await loginRes.json()).token;

    const chRes = await fetch(`${LIVE_API}/admin/chapters`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const chapters = (await chRes.json()).chapters || [];
    const dfChapters = chapters.filter(c => (c.name || '').toLowerCase().includes('block') || (c.name || '').toLowerCase().includes('d-'));
    console.log('Live d/f block chapters:', dfChapters);

    const qRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry&limit=1000`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const qData = await qRes.json();
    const liveQs = qData.questions || [];
    const dfQs = liveQs.filter(q => (q.chapter || '').toLowerCase().includes('block') || (q.chapter || '').toLowerCase().includes('d-'));
    console.log(`Live total chemistry questions loaded: ${liveQs.length}`);
    console.log(`Live d/f block questions count: ${dfQs.length}`);
    if (dfQs.length > 0) {
      console.log('Sample live d/f questions:', dfQs.slice(0, 3).map(q => ({ id: q.id, text: q.question_text.slice(0, 50), chapter: q.chapter })));
    }
  } catch (err) {
    console.error('Error checking live:', err.message);
  }

  await pool.end();
  process.exit(0);
}

checkStatus().catch(console.error);
