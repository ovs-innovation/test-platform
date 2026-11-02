import fs from 'fs';

async function check() {
  const { token } = JSON.parse(fs.readFileSync('scripts/live_token.json', 'utf8'));

  const liveQBRes = await fetch('https://edvedum.com/api/question-bank?category=Botany', {
    headers: { Authorization: `Bearer ${token}` }
  });
  const liveQBData = await liveQBRes.json();
  const liveBotanyQuestions = liveQBData.questions || [];
  const livePopQuestions = liveBotanyQuestions.filter(
    q => (q.chapter || '').toLowerCase().includes('organism') || (q.chapter || '').toLowerCase().includes('population')
  );

  console.log(`Live Botany Questions under Organisms and Populations: ${livePopQuestions.length}`);
  if (livePopQuestions.length > 0) {
    console.log('Sample question:', {
      id: livePopQuestions[0].id,
      subject_id: livePopQuestions[0].subject_id,
      chapter_id: livePopQuestions[0].chapter_id,
      chapter: livePopQuestions[0].chapter,
      topic: livePopQuestions[0].topic,
      image_url: livePopQuestions[0].image_url
    });
  }

  // List all 62 live questions summary
  livePopQuestions.forEach((q, i) => {
    const img = q.image_url ? 'YES' : 'NO ';
    console.log(`[${i + 1}] ID ${q.id} (ch_id: ${q.chapter_id}, '${q.chapter}'): img=${img} | ${q.question_text.slice(0, 60)}...`);
  });
}

check().catch(console.error);
