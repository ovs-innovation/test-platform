import fs from 'fs';

const LIVE_API = 'https://edvedum.com/api';
const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));

async function audit() {
  const qbRes = await fetch(`${LIVE_API}/question-bank?category=Chemistry`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await qbRes.json();
  const allQs = data.questions || [];

  console.log(`Total Live Chemistry Questions: ${allQs.length}`);

  // Inspect Live ID 8382
  const q8382 = allQs.find(q => q.id === 8382);
  console.log('\n--- Live ID 8382 ---');
  console.log('Chapter:', q8382?.chapter, 'ChapterID:', q8382?.chapter_id);
  console.log('Text:', q8382?.question_text);
  console.log('Image:', q8382?.image_url);

  // Inspect Live ID 5437
  const q5437 = allQs.find(q => q.id === 5437);
  console.log('\n--- Live ID 5437 ---');
  console.log('Chapter:', q5437?.chapter, 'ChapterID:', q5437?.chapter_id);
  console.log('Text:', q5437?.question_text);
  console.log('Image:', q5437?.image_url);

  // Check how many questions have chapter Haloalkanes
  const halo = allQs.filter(q => q.chapter_id === 34 || (q.chapter || '').toLowerCase().includes('haloalkanes'));
  console.log(`\nTotal Haloalkanes in Live: ${halo.length}`);

  // Check how many questions have chapter p-Block
  const pblock = allQs.filter(q => q.chapter_id === 107 || (q.chapter || '').toLowerCase().includes('p-block') || (q.chapter || '').toLowerCase().includes('p block'));
  console.log(`Total p-Block in Live: ${pblock.length}`);
}

audit().catch(console.error);
