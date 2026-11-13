import axios from 'axios';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await axios.post(`${LIVE_API}/auth/login`, {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = loginRes.data.token;
  const headers = { Authorization: `Bearer ${token}` };

  // 1. Check /api/question-bank?category=PYQ
  const pyqAll = await axios.get(`${LIVE_API}/question-bank?category=PYQ`, { headers });
  console.log('Live Server category=PYQ total:', pyqAll.data.questions?.length);

  // Group by q.subject, q.subject_name, q.subject_id
  const subjCounts = {};
  pyqAll.data.questions?.forEach(q => {
    const s = `${q.subject} | ${q.subject_name} | id:${q.subject_id}`;
    subjCounts[s] = (subjCounts[s] || 0) + 1;
  });
  console.log('Live Server PYQ subject grouping:', subjCounts);

  // 2. Check /api/question-bank?category=PYQ&subject=Botany
  const pyqBotany = await axios.get(`${LIVE_API}/question-bank?category=PYQ&subject=Botany`, { headers });
  console.log('Live Server category=PYQ&subject=Botany total:', pyqBotany.data.questions?.length);

  // 3. Check /api/admin/subjects
  const subjs = await axios.get(`${LIVE_API}/admin/subjects`, { headers });
  console.log('Live Server subjects:', subjs.data);
}

main().catch(console.error);

