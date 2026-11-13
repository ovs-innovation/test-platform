import axios from 'axios';

const LIVE_API = 'https://edvedum.com/api';

async function main() {
  const loginRes = await axios.post(`${LIVE_API}/auth/login`, {
    email: 'admin@edvedum.com',
    password: 'Admin@12345'
  });
  const token = loginRes.data.token;
  const headers = { Authorization: `Bearer ${token}` };

  const subjs = await axios.get(`${LIVE_API}/admin/subjects`, { headers });
  console.log('Live Server subjects list:', subjs.data);
}

main().catch(console.error);

