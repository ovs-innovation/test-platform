import fs from 'fs';
import { pool } from '../src/config/db.js';

async function check() {
  console.log('=== CHECKING LOCAL DB FOR BOTANY / ORGANISM & POPULATION ===');

  // Subjects
  const subs = await pool.query(
    "SELECT id, name, exam_type FROM subjects WHERE name ILIKE '%botany%' OR name ILIKE '%bio%'"
  );
  console.log('Local Subjects:', subs.rows);

  // Chapters
  const chaps = await pool.query(
    "SELECT id, name, subject_id FROM chapters WHERE name ILIKE '%organism%' OR name ILIKE '%population%'"
  );
  console.log('Local Chapters:', chaps.rows);

  // Existing questions
  const qLocal = await pool.query(
    "SELECT count(*)::int as count FROM question_bank WHERE chapter ILIKE '%organism%' OR chapter ILIKE '%population%'"
  );
  console.log('Local Questions with chapter like organism/population:', qLocal.rows[0].count);

  console.log('\n=== CHECKING LIVE EDVEDUM.COM ===');
  const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));

  const liveSubsRes = await fetch('https://edvedum.com/api/admin/subjects', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveSubsData = await liveSubsRes.json();
  const liveSubs = (liveSubsData.subjects || []).filter(
    s => s.name.toLowerCase().includes('botany') || s.name.toLowerCase().includes('bio')
  );
  console.log('Live Subjects:', liveSubs);

  // Live chapters for each matching subject
  for (const s of liveSubs) {
    const liveChapsRes = await fetch(`https://edvedum.com/api/admin/subjects/${s.id}/chapters`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const liveChapsData = await liveChapsRes.json();
    const matchChaps = (liveChapsData.chapters || []).filter(
      c => c.name.toLowerCase().includes('organism') || c.name.toLowerCase().includes('population')
    );
    console.log(`Live Chapters under ${s.name} (ID ${s.id}):`, matchChaps);
  }

  // Live questions
  const liveQBRes = await fetch('https://edvedum.com/api/question-bank?category=Botany', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveQBData = await liveQBRes.json();
  const liveBotanyQuestions = liveQBData.questions || [];
  const livePopQuestions = liveBotanyQuestions.filter(
    q => (q.chapter || '').toLowerCase().includes('organism') || (q.chapter || '').toLowerCase().includes('population')
  );
  console.log(`Live Botany Questions under Organism/Population: ${livePopQuestions.length} (total Botany on live: ${liveBotanyQuestions.length})`);

  await pool.end();
}

check().catch(console.error);
