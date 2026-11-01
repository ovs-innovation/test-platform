const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await fetch(`${LIVE_API}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@edvedum.com', password: 'Admin@12345' })
  });
  const { token } = await loginRes.json();

  const res = await fetch(`${LIVE_API}/question-bank?category=Mathematics`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const list = data.data?.questions || data.questions || [];
  const cnList = list.filter(q => /complex/i.test(q.chapter_name || q.chapter || q.topic || ''));

  console.log(`Total live Complex Number questions: ${cnList.length}`);

  // Sample questions with diagrams
  const withImages = cnList.filter(q => q.image_url);
  console.log(`Questions with diagrams: ${withImages.length}`);
  for (const q of withImages) {
    console.log(`- ID ${q.id}: ${q.question_text.slice(0, 45)}... => ${q.image_url}`);
  }

  // Sample some recent questions
  console.log('\nSample of 5 latest questions:');
  for (const q of cnList.slice(-5)) {
    console.log(`[#${q.id}] ${q.question_text.slice(0, 50)}...`);
    console.log(`   Options count: ${q.options?.length}, Correct: ${q.correct_index}`);
    console.log(`   Has solution: ${Boolean(q.solution && q.solution.length > 20)}`);
  }
}

main().catch(console.error);
