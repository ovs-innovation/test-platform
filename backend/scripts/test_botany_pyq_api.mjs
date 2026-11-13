import axios from 'axios';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await axios.post(`${LIVE_API}/auth/login`, {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = loginRes.data.token;
  const headers = { Authorization: `Bearer ${token}` };

  console.log('Testing category=PYQ&subject=Botany...');
  try {
    const res = await axios.get(`${LIVE_API}/question-bank?category=PYQ&subject=Botany`, { 
      headers,
      decompress: true
    });
    console.log('Result status:', res.status);
    console.log('Total questions returned:', res.data.questions?.length);
    if (res.data.questions?.length > 0) {
      console.log('First question:', res.data.questions[0].id, res.data.questions[0].chapter, res.data.questions[0].subject);
    }
  } catch (err) {
    console.error('Error fetching Botany PYQ:', err.message, err.response?.status, err.response?.data);
  }
}

main().catch(console.error);

