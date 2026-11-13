import axios from 'axios';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await axios.post(`${LIVE_API}/auth/login`, {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = loginRes.data.token;
  const headers = { Authorization: `Bearer ${token}` };

  const res = await axios.get(`${LIVE_API}/question-bank?category=PYQ&subject=Botany`, { headers });
  const questions = res.data.questions || [];
  console.log('Total Botany PYQ questions on Live Server:', questions.length);

  const chapterCounts = {};
  questions.forEach(q => {
    const ch = q.chapter || 'Unknown';
    chapterCounts[ch] = (chapterCounts[ch] || 0) + 1;
  });

  console.log('Botany PYQ chapters breakdown on Live Server:');
  console.table(Object.entries(chapterCounts).map(([chapter, count]) => ({ chapter, count })));
}

main().catch(console.error);

