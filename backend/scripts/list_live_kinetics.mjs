import fs from 'fs';

const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));

async function list() {
  const res = await fetch('https://edvedum.com/api/question-bank?category=Chemistry', {
    headers: { Authorization: 'Bearer ' + token }
  });
  const data = await res.json();
  const qs = (data.questions || []).filter(
    q => q.chapter_id === 14 || (q.chapter || '').toLowerCase().includes('chemical kinetics')
  );
  console.log('Total live Chemical Kinetics questions:', qs.length);
  qs.forEach((q, i) => {
    const imgStr = q.image_url ? 'YES' : 'NO ';
    const cleanText = (q.question_text || '').replace(/\n/g, ' ').slice(0, 75);
    console.log(`[${i + 1}] ID ${q.id}: img=${imgStr} | ${cleanText}`);
  });
}

list().catch(console.error);
