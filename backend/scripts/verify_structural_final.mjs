import axios from 'axios';
import fs from 'fs';
import { pool } from '../src/config/db.js';
import { resolveStandardChapter, resolveZoologyStandardChapter } from '../src/utils/chapterResolver.js';

async function verify() {
  console.log('=== VERIFYING LOCAL DB (Neon) ===');
  const localRes = await pool.query(
    "SELECT count(*) as count, min(id) as min_id, max(id) as max_id FROM question_bank WHERE chapter_id = 158"
  );
  console.log(`Local DB: ${localRes.rows[0].count} questions (IDs ${localRes.rows[0].min_id} - ${localRes.rows[0].max_id})`);

  console.log('\n=== VERIFYING LIVE DB ===');
  const tokenData = JSON.parse(fs.readFileSync('backend/scripts/live_token.json'));
  const res = await axios.get('https://edvedum.com/api/question-bank?subject_id=2&limit=10000', {
    headers: { Authorization: 'Bearer ' + tokenData.token }
  });
  const questions = res.data.data?.questions || res.data.questions || [];
  console.log(`Total Live Zoology questions fetched: ${questions.length}`);

  const counts = {};
  const structuralQs = [];

  for (const q of questions) {
    const ch = resolveZoologyStandardChapter(
      q.chapter_name || q.chapter || '',
      q.topic || '',
      q.question_text || '',
      q.id
    );
    counts[ch] = (counts[ch] || 0) + 1;
    if (ch === 'Structural Organisation in Animals') {
      structuralQs.push(q);
    }
  }

  console.log('\nLive Zoology Chapter Breakdown:');
  for (const [ch, cnt] of Object.entries(counts)) {
    console.log(`  ${ch}: ${cnt}`);
  }

  console.log(`\nStructural Organisation in Animals count: ${structuralQs.length}`);
  if (structuralQs.length > 0) {
    const ids = structuralQs.map(q => q.id);
    console.log(`Live IDs range: ${Math.min(...ids)} - ${Math.max(...ids)}`);
    const foreign = structuralQs.filter(q => q.id < 15213 || q.id > 15344);
    console.log(`Foreign questions count: ${foreign.length}`);
    console.log(`Sample Q1: ${structuralQs[0].question_text?.substring(0, 60)}`);
    console.log(`Sample Q4 with image: ${structuralQs[3].question_text?.substring(0, 50)} | image: ${structuralQs[3].image_url}`);
  }

  await pool.end();
}

verify().catch(console.error);
